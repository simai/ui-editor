#!/usr/bin/env node
// The shell, end to end in headless Chrome: the seeded page as one Composition
// Document drawn by sf-editor, the 32 px top bar, the page list's panel
// resizing with sf-resizer and closing by its toggle and ⌘\, the page list in
// IndexedDB, a page kept before the one editor, the site template shared by
// every page, and the RU/EN dictionaries. The editor itself is the one-editor
// scenarios (scripts/e2e-one-editor.mjs).
//
//   node scripts/build-ui.mjs && node scripts/e2e-shell.mjs [--chrome <path>]
import {startRun} from './e2e-common.mjs';
import {open as openEditor} from './one-editor/component.mjs';

const run = await startRun();
const {check} = run;
const context = await run.browser.newContext({viewport: {width: 1440, height: 900}, locale: 'ru-RU'});
const d = await openEditor(context, run.origin);
const {page} = d;
const errors = [];
page.on('pageerror', (error) => errors.push(String(error)));
const settle = (ms = 400) => page.waitForTimeout(ms);
const open = () => d.reload();

const panel = () => page.evaluate(() => {
  const box = document.querySelector('#pages-pane')?.closest('.sf-drawer-panel');
  const rect = box?.getBoundingClientRect();
  const toggle = document.querySelector('#toggle-left');
  return {
    // A closed panel is moved off the screen or hidden.
    left: rect && getComputedStyle(box).visibility !== 'hidden' && rect.right > 0 && rect.left < innerWidth ? Math.round(rect.width) : 0,
    editor: Math.round(document.querySelector('.canvas-area').getBoundingClientRect().width),
    icon: toggle.getAttribute('icon'),
    pressed: toggle.getAttribute('aria-pressed'),
  };
});
const drag = async (selector, by) => {
  const box = await page.locator(selector).boundingBox();
  const x = box.x + box.width / 2;
  await page.mouse.move(x, 500);
  await page.mouse.down();
  await page.mouse.move(x + by, 500, {steps: 6});
  await page.mouse.up();
  await settle();
};
const menu = () => page.evaluate(() => document.querySelector('#pages').items.map((item) => ({id: item.id, label: item.label, current: Boolean(item.current)})));
const stored = () => page.evaluate(() => new Promise((resolve) => {
  const r = indexedDB.open('ui-editor');
  r.onsuccess = () => {
    const all = r.result.transaction('pages').objectStore('pages').getAll();
    all.onsuccess = () => resolve(all.result);
  };
}));
const opened = () => page.evaluate(() => document.querySelector('#page-editor').model.toJSON());

try {
  // ---------------------------------------------------------------- the page
  const drawn = await page.evaluate(() => {
    const doc = document.querySelector('#page-editor').model.toJSON();
    const ids = [];
    const walk = (node) => { ids.push(node.id); Object.values(node.slots ?? {}).flat().forEach(walk); };
    walk(doc.root);
    const canvas = document.querySelector('#page-editor .sf-editor-page');
    return {
      kind: `${doc.schema} ${doc.profile} ${doc.root.type}`,
      regions: doc.root.slots.regions.map((region) => `${region.props.name}:${region.props.landmark}`).join(),
      ids: ids.length,
      missing: ids.filter((id) => !canvas.querySelector(`[data-sf-composition-id="${CSS.escape(id)}"]`)),
    };
  });
  check('the seeded page is one Composition Document (ui-layout), the site template around its main region', drawn.kind === 'simai.composition.document ui-layout layout.regions' && drawn.regions === 'header:banner,main:main,footer:contentinfo', JSON.stringify(drawn));
  check('sf-editor draws every node of it', drawn.missing.length === 0, `${drawn.ids - drawn.missing.length}/${drawn.ids}, missing ${drawn.missing.join()}`);

  // ---------------------------------------------------------------- the top bar
  const bar = await page.evaluate(() => {
    // A component's control is its first box: the button, or the segmented track.
    const controls = [...document.querySelectorAll('#top-bar > sf-button-icon, #top-bar > sf-button, #top-bar > sf-button-group')].map((host) => host.firstElementChild).filter((node) => node?.getClientRects().length);
    return {count: controls.length, heights: [...new Set(controls.map((node) => Math.round(node.getBoundingClientRect().height)))]};
  });
  check('every control of the top bar is 32 px high', bar.count === 2 && bar.heights.length === 1 && bar.heights[0] === 32, `${bar.count} controls, ${bar.heights.join()}`);

  // ---------------------------------------------------------------- the width
  const start = await panel();
  check('the page list starts open, with the icon that closes it', start.left > 0 && start.icon === 'left_panel_close' && start.pressed === 'true', JSON.stringify(start));
  const edge = await page.evaluate(() => {
    const at = document.querySelector('#resizer-left').getBoundingClientRect();
    return Math.abs(at.left + at.width / 2 - document.querySelector('#resizer-left').closest('.sf-drawer-panel').getBoundingClientRect().right);
  });
  check('sf-resizer stands on the panel\'s edge', edge <= 1, String(edge));
  await drag('#resizer-left', 60);
  const wider = await panel();
  check('the panel follows a drag of its edge, and the editor gives way', wider.left === start.left + 60 && wider.editor === start.editor - 60, `${start.left} → ${wider.left}, editor ${wider.editor}`);
  await page.focus('#resizer-left');
  await page.keyboard.press('ArrowRight');
  await settle(150);
  const key = await panel();
  check('the arrow keys move the handle', key.left > wider.left, `${wider.left} → ${key.left}`);
  await open();
  check('the width is remembered', (await panel()).left === key.left, String((await panel()).left));
  await page.locator('#resizer-left').dblclick();
  await settle();
  check('a double click puts the default width back', (await panel()).left === start.left, String((await panel()).left));

  // ---------------------------------------------------------------- closing
  await page.focus('#new-page button');
  await page.keyboard.press('Meta+Backslash');
  await settle(500);
  const closed = await panel();
  check('⌘\\ closes the panel: the editor has the whole width, the icon turns', closed.left === 0 && closed.editor === 1440 && closed.icon === 'left_panel_open' && closed.pressed === 'false', JSON.stringify(closed));
  check('the focus does not go away with the panel: it stands on the toggle', await page.evaluate(() => Boolean(document.activeElement?.closest('#toggle-left'))));
  const stops = await page.evaluate(() => [...document.querySelectorAll('#pages-pane *')].filter((node) => node.tabIndex >= 0 && node.getClientRects().length && getComputedStyle(node).visibility !== 'hidden' && !node.closest('[inert]')).length);
  check('a closed panel holds no tab stop', stops === 0, String(stops));
  await open();
  check('a closed panel stays closed on the next visit', (await panel()).left === 0);
  await page.locator('#toggle-left button').first().click();
  await settle(500);
  check('the toggle opens it again, at its width', (await panel()).left === start.left);

  // ---------------------------------------------------------------- keeping
  const paragraph = 'home-2-2-1-2';
  await d.clickText(paragraph);
  await d.type(' Проверка.');
  await d.press('Escape');
  await settle(600);
  const kept = (await stored()).find((p) => p.id === 'home');
  check('every change the editor sends is kept in IndexedDB', JSON.stringify(kept.document).includes('Проверка.'));
  await open();
  check('the change outlives a reload', JSON.stringify(await opened()).includes('Проверка.'));

  // ---------------------------------------------------------------- choosing a page
  await page.locator('#pages a').filter({hasText: 'О компании'}).first().click();
  await settle();
  const chosen = {document: (await opened()).id, current: await page.evaluate(() => globalThis.uiEditor.state.current)};
  check('choosing a page in the list opens it in the editor', chosen.document === 'about' && chosen.current === 'about', JSON.stringify(chosen));
  await page.locator('#pages a').filter({hasText: 'Главная'}).first().click();
  await settle();
  check('and back: the page keeps what was typed', JSON.stringify(await opened()).includes('Проверка.'));

  // ---------------------------------------------------------------- the template
  const footer = await page.evaluate(() => {
    const doc = document.querySelector('#page-editor').model.toJSON();
    const region = doc.root.slots.regions.find((r) => r.props.name === 'footer');
    return region.slots.default[0].slots.default[0].id;
  });
  await d.editTemplate(footer);
  await d.clickText(footer);
  await d.type(' Общий подвал.');
  await d.press('Escape');
  await d.templateDone();
  await settle(600);
  const everywhere = (await stored()).filter((p) => JSON.stringify(p.document.root.slots.regions.find((r) => r.props.name === 'footer')).includes('Общий подвал.')).map((p) => p.id);
  check('a change to the template goes into every page', everywhere.sort().join() === 'about,home', everywhere.join());

  // ---------------------------------------------------------------- the page list
  const seeded = await menu();
  const links = await page.evaluate(() => document.querySelectorAll('#pages a').length);
  check('the page list is drawn as links', links === 2, String(links));
  check('the page list starts with the two seeded pages, the first one current', seeded.length === 2 && seeded[0].current && !seeded[1].current, JSON.stringify(seeded));
  await page.locator('#pages a').filter({hasText: seeded[1].label}).first().click();
  await settle();
  const about = {document: (await opened()).id, current: await page.evaluate(() => globalThis.uiEditor.state.current)};
  // After «Изменить шаблон» sf-editor 1.0.0 fails every render, and a page set later is not drawn (G-27).
  run.known('G-27', 'after a template edit, choosing a page opens it in the editor', about.document === 'about' && about.current === 'about', JSON.stringify(about));
  await page.locator('#new-page').click();
  await settle();
  const added = await menu();
  check('a new page joins the list and opens', added.length === 3 && added[2].current && added[2].label === 'Новая страница 3', JSON.stringify(added));
  check('a new page takes the site template', JSON.stringify(await opened()).includes('Общий подвал.'));
  check('the page list is kept in IndexedDB', (await stored()).map((p) => p.id).includes('page-3'));
  await open();
  check('the list outlives a reload', (await menu()).length === 3);

  // ---------------------------------------------------------------- a page kept before the one editor
  await page.evaluate(() => new Promise((resolve) => {
    const text = (value) => [{type: 'text', value}];
    const r = indexedDB.open('ui-editor');
    r.onsuccess = () => {
      const tx = r.result.transaction('pages', 'readwrite');
      tx.objectStore('pages').put({
        id: 'old', title: 'Старая', created: '2099-01-01T00:00:00.000Z', updated: '2099-01-01T00:00:00.000Z',
        layout: {schema: 'simai.composition.document.v1', id: 'old-layout', profile: 'ui-layout', locale: 'ru', root: {id: 'old-root', type: 'layout.section', slots: {default: [{id: 'old-outlet', type: 'content.outlet'}]}}},
        content: {schema: 'simai.composition.document.v1', id: 'old-content', profile: 'structured-content', root: {id: 'old-doc', type: 'content.document', slots: {default: [{id: 'old-p', type: 'content.paragraph', data: {content: text('Старый текст')}}]}}},
      });
      tx.oncomplete = () => resolve();
    };
  }));
  await open();
  await page.locator('#pages a').filter({hasText: 'Старая'}).first().click();
  await settle();
  const old = JSON.stringify(await opened());
  check('a page kept as a layout and its content opens as one Document, the content in a text area where the outlet stood', old.includes('"id":"old-outlet","type":"layout.area"') && old.includes('Старый текст'), old.slice(0, 200));

  // ---------------------------------------------------------------- the words
  await page.locator('#language button', {hasText: 'EN'}).click();
  await settle();
  const english = await page.evaluate(() => ({
    lang: document.documentElement.lang,
    title: document.querySelector('#pages-pane .pane-title').textContent,
    toggle: document.querySelector('#toggle-left').getAttribute('aria-label'),
    resizer: document.querySelector('#resizer-left').getAttribute('label'),
    editor: document.querySelector('#page-editor').getAttribute('label'),
  }));
  check('EN changes the interface words, the components\' too', english.lang === 'en' && english.title === 'Pages' && english.toggle === 'Pages panel' && english.resizer === 'Width of the pages panel' && english.editor === 'Page canvas', JSON.stringify(english));
  await open();
  check('the language is remembered', await page.evaluate(() => document.documentElement.lang === 'en'));
  await page.locator('#language button', {hasText: 'RU'}).click();
  await settle();
  check('the page list stays on screen through a language switch', (await page.evaluate(() => document.querySelectorAll('#pages a').length)) === 4);
  check('RU brings the Russian words back', await page.evaluate(() => document.documentElement.lang === 'ru' && document.querySelector('#pages-pane .pane-title').textContent === 'Страницы'));

  // ---------------------------------------------------------------- a narrow screen
  await page.setViewportSize({width: 900, height: 800});
  await settle(600);
  const narrow = await panel();
  check('below 1024 px the panel starts closed and the editor has the room', narrow.left === 0 && narrow.editor === 900, JSON.stringify(narrow));
  await page.locator('#toggle-left button').first().click();
  await settle(500);
  const over = await panel();
  check('the toggle slides the panel over the editor', over.left > 0 && over.editor === 900, JSON.stringify(over));
  check('no page errors', errors.length === 0, errors.join(' | '));
} catch (error) {
  check('the run finished', false, error.stack);
} finally {
  await run.finish();
}
