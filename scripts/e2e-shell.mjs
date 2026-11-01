#!/usr/bin/env node
// Step 0, the shell, end to end in headless Chrome: the seeded page drawn by
// SF.Composition.render, the 32 px top bar, both side panels resizing with
// sf-resizer and closing by their toggles and ⌘\ / ⌥⌘\, the Layout and Content
// modes, the page list in IndexedDB and the RU/EN dictionaries.
// The Content mode itself is scripts/e2e-content.mjs.
//
//   node scripts/build-ui.mjs && node scripts/e2e-shell.mjs [--chrome <path>]
import {load, startRun} from './e2e-common.mjs';

const run = await startRun();
const {check} = run;
const context = await run.browser.newContext({viewport: {width: 1440, height: 900}, locale: 'ru-RU'});
const page = await context.newPage();
const errors = [];
page.on('pageerror', (error) => errors.push(String(error)));
const settle = (ms = 400) => page.waitForTimeout(ms);
const open = () => load(page, run.origin);

const panels = () => page.evaluate(() => {
  const width = (inside) => {
    const box = document.querySelector(inside)?.closest('.sf-drawer-panel');
    const rect = box?.getBoundingClientRect();
    // A closed panel is moved off the screen or hidden.
    return rect && getComputedStyle(box).visibility !== 'hidden' && rect.right > 0 && rect.left < innerWidth ? Math.round(rect.width) : 0;
  };
  const toggle = (side) => document.querySelector(`#toggle-${side}`);
  return {
    left: width('#pages-pane'),
    right: width('#props-pane'),
    canvas: Math.round(document.querySelector('.canvas-area').getBoundingClientRect().width),
    leftIcon: toggle('left').getAttribute('icon'),
    rightIcon: toggle('right').getAttribute('icon'),
    leftPressed: toggle('left').getAttribute('aria-pressed'),
    rightPressed: toggle('right').getAttribute('aria-pressed'),
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

try {
  await open();

  // ---------------------------------------------------------------- the canvas
  const drawn = await page.evaluate(async () => {
    const {state} = globalThis.uiEditor;
    const current = state.pages.find((p) => p.id === state.current);
    const expected = await globalThis.SF.Composition.render(current.layout, {content: current.content});
    const ids = [];
    const walk = (node) => { ids.push(node.id); Object.values(node.slots ?? {}).flat().forEach(walk); };
    walk(current.layout.root);
    walk(current.content.root);
    const canvas = document.querySelector('#canvas');
    return {
      // The editor adds only the outlet's hint (its title) to what render drew.
      same: (() => { const copy = canvas.cloneNode(true); copy.querySelector('[data-sf-outlet]')?.removeAttribute('title'); return copy.innerHTML === expected.html; })(),
      diagnostics: expected.diagnostics.length,
      ids: ids.length,
      marked: canvas.querySelectorAll('[data-sf-composition-id]').length,
      outlets: canvas.querySelectorAll('[data-sf-outlet]').length,
      inOutlet: canvas.querySelector('[data-sf-outlet] [data-sf-composition-id="home-document"]') !== null,
      layout: `${current.layout.schema} ${current.layout.profile}`,
      content: `${current.content.schema} ${current.content.profile} ${current.content.root.type}`,
    };
  });
  check('the seeded page is a layout (ui-layout) and its content (structured-content, content.document)', drawn.layout === 'simai.composition.document.v1 ui-layout' && drawn.content === 'simai.composition.document.v1 structured-content content.document', JSON.stringify(drawn));
  check('the canvas holds exactly what SF.Composition.render draws, the content in the layout\'s one outlet, with no diagnostics', drawn.same && drawn.diagnostics === 0 && drawn.marked === drawn.ids && drawn.outlets === 1 && drawn.inOutlet, `${drawn.marked}/${drawn.ids} nodes`);

  // ---------------------------------------------------------------- the top bar
  const bar = await page.evaluate(() => {
    // A component's control is its first box: the button, or the segmented track.
    const controls = [...document.querySelectorAll('#top-bar > sf-icon-button, #top-bar > sf-button, #top-bar > sf-button-group')].map((host) => host.firstElementChild).filter((node) => node?.getClientRects().length);
    return {count: controls.length, heights: [...new Set(controls.map((node) => Math.round(node.getBoundingClientRect().height)))]};
  });
  check('every control of the top bar is 32 px high', bar.count === 4 && bar.heights.length === 1 && bar.heights[0] === 32, `${bar.count} controls, ${bar.heights.join()}`);

  // ---------------------------------------------------------------- the widths
  const start = await panels();
  check('both panels start open, with the icon that closes them', start.left > 0 && start.right > 0 && start.leftIcon === 'left_panel_close' && start.rightIcon === 'right_panel_close' && start.leftPressed === 'true' && start.rightPressed === 'true', JSON.stringify(start));
  const edges = await page.evaluate(() => {
    const at = (id) => document.querySelector(id).getBoundingClientRect();
    const panel = (id) => document.querySelector(id).closest('.sf-drawer-panel').getBoundingClientRect();
    return [Math.abs(at('#resizer-left').left + at('#resizer-left').width / 2 - panel('#resizer-left').right), Math.abs(at('#resizer-right').left + at('#resizer-right').width / 2 - panel('#resizer-right').left)];
  });
  check('each sf-resizer stands on its panel\'s edge', edges.every((off) => off <= 1), edges.join());
  await drag('#resizer-left', 60);
  const wider = await panels();
  check('the left panel follows a drag of its edge, and the canvas gives way', wider.left === start.left + 60 && wider.canvas === start.canvas - 60, `${start.left} → ${wider.left}, canvas ${wider.canvas}`);
  await drag('#resizer-right', -60);
  const both = await panels();
  check('the right panel follows a drag of its edge, and the canvas gives way', both.right === start.right + 60 && both.canvas === start.canvas - 120, `${start.right} → ${both.right}, canvas ${both.canvas}`);
  await page.focus('#resizer-right');
  await page.keyboard.press('ArrowLeft');
  await settle(150);
  const key = await panels();
  check('the arrow keys move a handle', key.right > both.right, `${both.right} → ${key.right}`);
  await open();
  const after = await panels();
  check('the widths are remembered', after.left === wider.left && after.right === key.right, `${after.left}, ${after.right}`);
  await page.locator('#resizer-right').dblclick();
  await settle();
  check('a double click puts the default width back', (await panels()).right === start.right, String((await panels()).right));

  // ---------------------------------------------------------------- the overlay
  const target = await page.locator('#canvas [data-sf-composition-id="home-layout-title"]').boundingBox();
  await page.mouse.click(target.x + 20, target.y + target.height / 2);
  await settle();
  const chosen = await page.evaluate(() => {
    const frame = document.querySelector('#overlay .sf-composition-overlay-frame--selected');
    const node = document.querySelector('#canvas [data-sf-composition-id="home-layout-title"]').getBoundingClientRect();
    const a = frame && !frame.hidden ? frame.getBoundingClientRect() : null;
    return {
      selected: globalThis.uiEditor.state.selected,
      off: a ? Math.max(Math.abs(a.left - node.left), Math.abs(a.top - node.top), Math.abs(a.width - node.width)) : null,
      type: document.querySelector('#props-type').textContent,
      id: document.querySelector('#props-id').textContent,
    };
  });
  check('a press on a block selects it through sf-composition-overlay', chosen.selected === 'home-layout-title', JSON.stringify(chosen));
  check('the selection frame stands on the block', chosen.off !== null && chosen.off <= 2, String(chosen.off));
  check('the properties panel names the chosen part', chosen.type === 'Заголовок' && chosen.id === 'home-layout-title', `${chosen.type} ${chosen.id}`);

  // ---------------------------------------------------------------- closing
  const before = await panels();
  await page.focus('#new-page button');
  await page.keyboard.press('Meta+Alt+Backslash');
  await settle(500);
  const right = await panels();
  check('⌥⌘\\ closes the right panel: the canvas takes the room, the icon turns', right.right === 0 && right.canvas === before.canvas + before.right && right.rightIcon === 'right_panel_open' && right.rightPressed === 'false', JSON.stringify(right));
  await page.keyboard.press('Meta+Backslash');
  await settle(500);
  const closed = await panels();
  check('⌘\\ closes the left panel: the canvas has the whole width', closed.left === 0 && closed.right === 0 && closed.canvas === 1440 && closed.leftIcon === 'left_panel_open' && closed.leftPressed === 'false', JSON.stringify(closed));
  check('the focus does not go away with the panel: it stands on the toggle', await page.evaluate(() => Boolean(document.activeElement?.closest('#toggle-left'))));
  const stops = await page.evaluate(() => [...document.querySelectorAll('#pages-pane *, #props-pane *')].filter((node) => node.tabIndex >= 0 && node.getClientRects().length && getComputedStyle(node).visibility !== 'hidden' && !node.closest('[inert]')).length);
  check('a closed panel holds no tab stop', stops === 0, String(stops));
  const frameOff = await page.evaluate(() => {
    const frame = document.querySelector('#overlay .sf-composition-overlay-frame--selected');
    const node = document.querySelector('#canvas [data-sf-composition-id="home-layout-title"]').getBoundingClientRect();
    if (!frame || frame.hidden) return null;
    const a = frame.getBoundingClientRect();
    return Math.max(Math.abs(a.left - node.left), Math.abs(a.top - node.top), Math.abs(a.width - node.width));
  });
  check('the selection frame follows the block when the panels close', frameOff !== null && frameOff <= 2, String(frameOff));
  await open();
  const kept = await panels();
  check('closed panels stay closed on the next visit', kept.left === 0 && kept.right === 0 && kept.leftIcon === 'left_panel_open', JSON.stringify(kept));
  await page.locator('#toggle-left button').first().click();
  await page.locator('#toggle-right button').first().click();
  await settle(500);
  const reopened = await panels();
  check('the toggles open them again, at their widths', reopened.left === after.left && reopened.right === start.right && reopened.leftIcon === 'left_panel_close', JSON.stringify(reopened));

  // ---------------------------------------------------------------- the modes
  await page.locator('#mode button', {hasText: 'Контент'}).click();
  await settle();
  const content = await page.evaluate(() => ({
    mode: globalThis.uiEditor.state.mode,
    canvas: document.querySelector('#layout-view').hidden,
    editor: getComputedStyle(document.querySelector('#content-view')).display !== 'none' && document.querySelector('#content-editor')?.localName,
    overlay: document.querySelector('#overlay').hidden,
  }));
  check('the Content mode shows sf-content-editor, and the overlay goes', content.mode === 'content' && content.canvas && content.editor === 'sf-content-editor' && content.overlay, JSON.stringify(content));
  await page.locator('#mode button', {hasText: 'Макет'}).click();
  await settle();
  const layout = await page.evaluate(() => ({mode: globalThis.uiEditor.state.mode, canvas: !document.querySelector('#layout-view').hidden, overlay: !document.querySelector('#overlay').hidden}));
  check('the Layout mode brings the canvas and the overlay back', layout.mode === 'layout' && layout.canvas && layout.overlay, JSON.stringify(layout));

  // ---------------------------------------------------------------- the page list
  const seeded = await menu();
  const links = await page.evaluate(() => document.querySelectorAll('#pages a').length);
  check('the page list is drawn as links on the first load', links === 2, String(links));
  check('the page list starts with the two seeded pages, the first one current', seeded.length === 2 && seeded[0].current && !seeded[1].current, JSON.stringify(seeded));
  await page.locator('#pages a').filter({hasText: seeded[1].label}).first().click();
  await settle();
  const about = await page.evaluate(() => ({current: globalThis.uiEditor.state.current, drawn: document.querySelector('#canvas').dataset.document}));
  check('choosing a page in the list draws it', about.current === 'about' && about.drawn === 'about', JSON.stringify(about));
  await page.locator('#new-page').click();
  await settle();
  const added = await menu();
  check('a new page joins the list and opens', added.length === 3 && added[2].current && added[2].label === 'Новая страница 3', JSON.stringify(added));
  const stored = await page.evaluate(() => new Promise((resolve) => {
    const r = indexedDB.open('ui-editor');
    r.onsuccess = () => {
      const all = r.result.transaction('pages').objectStore('pages').getAll();
      all.onsuccess = () => resolve(all.result.map((p) => p.id));
    };
  }));
  check('the page list is kept in IndexedDB', stored.length === 3 && stored.includes('page-3'), stored.join());
  await open();
  check('the list outlives a reload', (await menu()).length === 3);

  // ---------------------------------------------------------------- the words
  await page.locator('#language button', {hasText: 'EN'}).click();
  await settle();
  const english = await page.evaluate(() => ({
    lang: document.documentElement.lang,
    title: document.querySelector('#pages-pane .pane-title').textContent,
    mode: [...document.querySelectorAll('#mode button')].map((b) => b.textContent.trim()).join('|'),
    toggle: document.querySelector('#toggle-left').getAttribute('aria-label'),
    resizer: document.querySelector('#resizer-left').getAttribute('label'),
  }));
  check('EN changes the interface words, the components\' too', english.lang === 'en' && english.title === 'Pages' && english.mode.includes('Layout') && english.mode.includes('Content') && english.toggle === 'Pages panel' && english.resizer === 'Width of the pages panel', JSON.stringify(english));
  await open();
  check('the language is remembered', await page.evaluate(() => document.documentElement.lang === 'en' && document.querySelector('#props-pane .pane-title').textContent === 'Properties'));
  await page.locator('#language button', {hasText: 'RU'}).click();
  await settle();
  const shown = await page.evaluate(() => document.querySelectorAll('#pages a').length);
  check('the page list stays on screen through a language switch', shown === 3, String(shown));
  check('RU brings the Russian words back', await page.evaluate(() => document.documentElement.lang === 'ru' && document.querySelector('#pages-pane .pane-title').textContent === 'Страницы'));

  // ---------------------------------------------------------------- a narrow screen
  await page.setViewportSize({width: 900, height: 800});
  await settle(600);
  const narrow = await panels();
  check('below 1024 px both panels start closed and the canvas has the room', narrow.left === 0 && narrow.right === 0 && narrow.canvas === 900, JSON.stringify(narrow));
  await page.locator('#toggle-left button').first().click();
  await settle(500);
  const over = await panels();
  check('a toggle slides its panel over the canvas', over.left > 0 && over.canvas === 900, JSON.stringify(over));
  check('no page errors', errors.length === 0, errors.join(' | '));
} catch (error) {
  check('the run finished', false, error.stack);
} finally {
  await run.finish();
}
