#!/usr/bin/env node
// Step 5, the Content mode, end to end in headless Chrome: the layout shows
// the page's content in its content.outlet; a double click on the outlet, or
// Enter while it is chosen, opens SIMAI Pro's sf-content-editor over the
// content; what is typed is saved in IndexedDB; Esc twice brings the layout
// back with the outlet chosen and the typed text drawn in it.
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

  // ------------------------------------------------------- double click opens
  await page.locator('#canvas [data-sf-outlet] p').first().dblclick();
  await settle(700);
  const opened = await page.evaluate(() => ({
    mode: globalThis.uiEditor.state.mode,
    layout: document.querySelector('#layout-view').hidden,
    editor: !document.querySelector('#content-view').hidden,
    pressed: document.querySelector('#mode').getAttribute('value'),
    title: document.querySelector('#content-editor .sf-content-editor-title')?.textContent,
  }));
  check('a double click on the outlet opens the Content mode', opened.mode === 'content' && opened.layout && opened.editor && opened.pressed === 'content', JSON.stringify(opened));
  check('sf-content-editor holds the page\'s content', opened.title === 'Как устроена страница', JSON.stringify(opened));
  const caret = await typedIn();
  check('the caret stands in the first block', caret.editor && caret.field === 'textbox' && caret.text.startsWith('Этот текст'), JSON.stringify(caret));

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
  await page.keyboard.press('Escape');
  await settle(300);
  await page.keyboard.press('Escape');
  await settle(700);

  // ------------------------------------------------------------ the title
  // A title edit is lost in larena-68015a3b75a0 (docs/GAPS.md, G-13): the
  // page stays valid and keeps its title. With the fix pinned, this checks
  // that the list follows the typed title instead.
  await page.locator('#mode button', {hasText: 'Контент'}).click();
  await settle(700);
  await page.locator('#content-editor .sf-content-editor-title').click();
  await page.keyboard.press('End');
  await page.keyboard.type('!');
  await settle(900);
  const titled = await page.evaluate(() => ({label: document.querySelector('#pages').items[0].label, data: globalThis.uiEditor.state.pages[0].content.root.data}));
  check('a title edit leaves the page valid (G-13)', JSON.stringify(Object.keys(titled.data)) === '["title"]' && titled.label === titled.data.title, JSON.stringify(titled));
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
  check('the typed content outlives a reload', kept.includes('Набрано здесь.') && kept.includes('Новый раздел'));

  check('no page errors', errors.length === 0, errors.join(' | '));
} catch (error) {
  check('the run finished', false, error.stack);
}
await run.finish();
