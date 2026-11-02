#!/usr/bin/env node
// Step 5, the Content mode, end to end in headless Chrome: the layout shows
// the page's content in its content.outlet; a click on the chosen outlet, or
// Enter while it is chosen, opens SIMAI Pro's sf-content-editor in place, in
// the outlet on the canvas; what is typed is saved in IndexedDB; Esc twice, or
// a press on the layout, brings the layout back with the typed text drawn in
// the outlet. The owner's decision of 2026-11-03: an area for the content
// added in the Layout mode is typed in there, moved, and outlives a reload.
//
//   node scripts/build-ui.mjs && node scripts/e2e-content.mjs [--chrome <path>]
import {load, startRun} from './e2e-common.mjs';

const run = await startRun();
const {check} = run;
const context = await run.browser.newContext({viewport: {width: 1440, height: 900}, locale: 'ru-RU'});
const page = await context.newPage();
const errors = [];
page.on('pageerror', (error) => errors.push(String(error)));
const settle = (ms = 400) => page.waitForTimeout(ms);
const mode = () => page.evaluate(() => globalThis.uiEditor.state.mode);
const outletText = () => page.evaluate(() => document.querySelector('#canvas [data-sf-outlet]')?.textContent ?? '');
/** The open page's content as saved in IndexedDB. */
const stored = () => page.evaluate(() => new Promise((resolve) => {
  const open = indexedDB.open('ui-editor');
  open.onsuccess = () => {
    const request = open.result.transaction('pages').objectStore('pages').get('home');
    request.onsuccess = () => {
      resolve(request.result);
      open.result.close();
    };
  };
}));
const typedIn = () => page.evaluate(() => {
  const active = document.activeElement;
  return {editor: Boolean(active?.closest('sf-content-editor')), field: active?.getAttribute('role'), text: active?.textContent ?? ''};
});

try {
  await load(page, run.origin);
  check('sf-content-editor loads with the page, before the first switch', await page.evaluate(() => Boolean(customElements.get('sf-content-editor'))));

  // ---------------------------------------------------------------- the outlet
  const outlet = await page.evaluate(() => {
    const element = document.querySelector('#canvas [data-sf-outlet]');
    return {id: element?.dataset.sfCompositionId, title: element?.getAttribute('title'), heading: element?.querySelector('article > h1')?.textContent};
  });
  check('the layout shows the content in its outlet, under the content\'s title', outlet.id === 'home-outlet' && outlet.heading === 'Как устроена страница' && Boolean(outlet.title), JSON.stringify(outlet));
  await page.locator('#canvas [data-sf-outlet] p').first().click();
  await settle();
  check('a click inside the outlet chooses the outlet as one block', (await page.evaluate(() => globalThis.uiEditor.state.selected)) === 'home-outlet');
  check('the properties panel names it', (await page.evaluate(() => document.querySelector('#props-type').textContent)) === 'Содержимое страницы');

  // ------------------------------------------------- a click on it opens it
  await page.locator('#canvas [data-sf-outlet] p').first().click();
  await settle(700);
  const opened = await page.evaluate(() => ({
    mode: globalThis.uiEditor.state.mode,
    layout: getComputedStyle(document.querySelector('#layout-view')).display !== 'none',
    inPlace: Boolean(document.querySelector('#canvas [data-sf-composition-id="home-outlet"] > #content-editor')),
    around: document.querySelector('#canvas [data-sf-composition-id="home-title"]')?.textContent,
    pressed: document.querySelector('#mode').getAttribute('value'),
    title: document.querySelector('#content-editor .sf-content-editor-title')?.textContent,
  }));
  check('a click on the chosen outlet opens the Content mode in place, the layout around it in view', opened.mode === 'content' && opened.layout && opened.inPlace && opened.around === 'Редактор страниц SIMAI' && opened.pressed === 'content', JSON.stringify(opened));
  check('sf-content-editor holds the page\'s content', opened.title === 'Как устроена страница', JSON.stringify(opened));
  const caret = await typedIn();
  check('the caret stands in the block clicked', caret.editor && caret.field === 'textbox' && caret.text.startsWith('Этот текст'), JSON.stringify(caret));

  // -------------------------------------------------------------------- typing
  await page.keyboard.press('End');
  await page.keyboard.type(' Набрано здесь.');
  await page.keyboard.press('Enter');
  await page.keyboard.type('## Новый раздел');
  await settle(900);
  const saved = await stored();
  const blocks = saved.content.root.slots.default;
  check('typing is saved in IndexedDB', JSON.stringify(blocks[0]).includes('Набрано здесь.'), JSON.stringify(blocks[0]).slice(0, 160));
  check('Enter makes a new block and "## " a heading', blocks[1]?.type === 'content.heading' && JSON.stringify(blocks[1]).includes('Новый раздел'), JSON.stringify(blocks[1]));
  check('the layout is not touched by typing', saved.layout.root.slots.default.length === 4);

  // ------------------------------------------------------- Esc twice returns
  await page.keyboard.press('Escape');
  await settle(300);
  check('the first Esc chooses the block and stays in the Content mode', (await mode()) === 'content');
  await page.keyboard.press('Escape');
  await settle(700);
  const back = await page.evaluate(() => ({
    mode: globalThis.uiEditor.state.mode,
    selected: globalThis.uiEditor.state.selected,
    focus: document.activeElement?.getAttribute('role'),
    overlay: !document.querySelector('#overlay').hidden,
  }));
  check('the second Esc brings the layout back with the outlet chosen and focused', back.mode === 'layout' && back.selected === 'home-outlet' && back.focus === 'tree' && back.overlay, JSON.stringify(back));
  const drawn = await outletText();
  check('the outlet shows what was typed', drawn.includes('Набрано здесь.') && drawn.includes('Новый раздел'));

  // ------------------------------------------------------------- Enter opens
  await page.keyboard.press('Enter');
  await settle(700);
  check('Enter on the chosen outlet opens the Content mode again', (await mode()) === 'content' && (await typedIn()).editor);
  await page.locator('#canvas [data-sf-composition-id="home-layout-title"]').click();
  await settle(700);
  const pressed = await page.evaluate(() => ({mode: globalThis.uiEditor.state.mode, selected: globalThis.uiEditor.state.selected, editor: Boolean(document.querySelector('#canvas #content-editor'))}));
  check('a press on the layout outside the outlet brings the layout back, the block pressed chosen', pressed.mode === 'layout' && pressed.selected === 'home-layout-title' && !pressed.editor, JSON.stringify(pressed));

  // ------------------------------------------------------------ the title
  await page.locator('#mode button', {hasText: 'Контент'}).click();
  await settle(700);
  // The click lands after the title's last letter: End is no caret key on macOS.
  const titleBox = await page.locator('#content-editor .sf-content-editor-title').boundingBox();
  await page.locator('#content-editor .sf-content-editor-title').click({position: {x: titleBox.width - 2, y: titleBox.height / 2}});
  await page.keyboard.type('!');
  await settle(900);
  const titled = await page.evaluate(() => ({label: document.querySelector('#pages').items[0].label, data: globalThis.uiEditor.state.pages[0].content.root.data}));
  check('a typed title is saved as data.title, and the page list follows it', JSON.stringify(titled.data) === '{"title":"Как устроена страница!"}' && titled.label === 'Как устроена страница!', JSON.stringify(titled));
  await page.locator('#mode button', {hasText: 'Макет'}).click();
  await settle(700);
  check('the layout draws the page with no diagnostics', await page.evaluate(() => document.querySelector('#canvas-problems').hidden));
  await page.locator('#mode button', {hasText: 'Контент'}).click();
  await settle(700);

  // ------------------------------------------------------------- other pages
  await page.locator('#pages a').nth(1).click();
  await settle(700);
  const about = await page.evaluate(() => ({mode: globalThis.uiEditor.state.mode, title: document.querySelector('#content-editor .sf-content-editor-title')?.textContent}));
  check('choosing another page in the Content mode shows its content', about.mode === 'content' && about.title === 'О компании', JSON.stringify(about));

  // ---------------------------------------------------------------- a reload
  await load(page, run.origin);
  const kept = await outletText();
  check('the typed content outlives a reload', kept.includes('Набрано здесь.') && kept.includes('Новый раздел') && kept.includes('Как устроена страница!'));

  // ------------------------------------- an area for the content, added in the layout
  await page.locator('#canvas [data-sf-outlet] p').first().click();
  await settle();
  await page.keyboard.press('Backspace');
  await settle(500);
  check('the layout\'s area for the content can be deleted; the content stays', (await stored()).layout.root.slots.default.every((node) => node.type !== 'content.outlet') && (await stored()).content.root.slots.default.length > 0);
  const seam = await page.evaluate(() => {
    const a = document.querySelector('#canvas [data-sf-composition-id="home-hero"]').getBoundingClientRect();
    const b = document.querySelector('#canvas [data-sf-composition-id="home-layout"]').getBoundingClientRect();
    return {x: a.left + a.width / 2, y: (a.bottom + b.top) / 2};
  });
  await page.mouse.move(seam.x, seam.y - 30);
  await page.mouse.move(seam.x, seam.y, {steps: 4});
  await settle(200);
  await page.locator('#overlay .sf-composition-overlay-insert[data-sf-insert-shown]').first().click();
  await settle();
  await page.getByRole('menuitem', {name: 'Содержимое страницы'}).click();
  await settle(600);
  const area = await page.evaluate(() => globalThis.uiEditor.state.selected);
  const order = async () => (await stored()).layout.root.slots.default.map((node) => node.id).join();
  check('the + offers an area for the content while the layout has none, and puts it at the seam, chosen', /^home-outlet/u.test(area) && (await order()) === `home-hero,${area},home-layout,home-content`, `${area} ${await order()}`);
  await page.locator(`#canvas [data-sf-composition-id="${area}"] h1`).click();
  await settle(700);
  check('a click on the new area opens its content in place', (await page.evaluate((id) => Boolean(document.querySelector(`#canvas [data-sf-composition-id="${id}"] > #content-editor`)), area)) && (await mode()) === 'content');
  await page.evaluate(() => document.querySelector('#content-editor').edit({id: 'home-p2'}));
  await settle(200);
  await page.keyboard.press('Enter');
  await page.keyboard.type('## Заголовок в области');
  await page.keyboard.press('Enter');
  await page.keyboard.type('Абзац в области.');
  await settle(900);
  const typed = (await stored()).content.root.slots.default;
  const headingAt = typed.findIndex((node) => node.type === 'content.heading' && JSON.stringify(node).includes('Заголовок в области'));
  check('a heading and a paragraph typed in the area are saved in the page\'s content', headingAt > 0 && typed[headingAt + 1]?.type === 'content.paragraph' && JSON.stringify(typed[headingAt + 1]).includes('Абзац в области.'), JSON.stringify(typed.slice(-3)).slice(0, 300));
  await page.keyboard.press('Escape');
  await settle(300);
  await page.keyboard.press('Escape');
  await settle(700);
  check('Esc twice brings the layout back with the area chosen', (await mode()) === 'layout' && (await page.evaluate(() => globalThis.uiEditor.state.selected)) === area);
  await page.keyboard.press('Alt+ArrowDown');
  await settle(600);
  check('⌥↓ moves the area in the layout', (await order()) === `home-hero,home-layout,${area},home-content`, await order());
  await load(page, run.origin);
  const reloaded = await page.evaluate(() => ({
    order: globalThis.uiEditor.state.pages.find((p) => p.id === 'home').layout.root.slots.default.map((node) => node.id).join(),
    text: document.querySelector('#canvas [data-sf-outlet]')?.textContent ?? '',
  }));
  check('after a reload the layout keeps the area where it was moved, and the area the typed content', reloaded.order === `home-hero,home-layout,${area},home-content` && reloaded.text.includes('Заголовок в области') && reloaded.text.includes('Абзац в области.'), JSON.stringify(reloaded).slice(0, 300));

  check('no page errors', errors.length === 0, errors.join(' | '));
} catch (error) {
  check('the run finished', false, error.stack);
}
await run.finish();
