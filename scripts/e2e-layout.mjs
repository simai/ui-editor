#!/usr/bin/env node
// Step 1, the Layout mode, end to end in headless Chrome: sf-composition-overlay
// 1.3.0 with its toolbar above the selected block and icon actions (drag, up,
// down, duplicate, delete), the keys ⌥↑ ⌥↓ ⌘D ⌫, one insertion point at the
// seam raising a simple list of types, a drag by the grip, and no jump on
// select, move or scroll: the canvas does not scroll by itself, the frame stays
// on its block, the toolbar never covers the selected block. Each change is
// saved in IndexedDB and outlives a reload.
//
//   node scripts/build-ui.mjs && node scripts/e2e-layout.mjs [--chrome <path>]
import {load, startRun} from './e2e-common.mjs';

const run = await startRun();
const {check} = run;
const context = await run.browser.newContext({viewport: {width: 1440, height: 900}, locale: 'ru-RU'});
const page = await context.newPage();
const errors = [];
page.on('pageerror', (error) => errors.push(String(error)));
const settle = (ms = 400) => page.waitForTimeout(ms);
const node = (id) => `#canvas [data-sf-composition-id="${id}"]`;

/** The selected block, its frame and the toolbar, measured in one frame. */
const geometry = (id) => page.evaluate((id) => {
  const box = (element) => {
    if (!element || element.hidden) return null;
    const r = element.getBoundingClientRect();
    return r.width && r.height ? {top: r.top, bottom: r.bottom, left: r.left, right: r.right, width: r.width, height: r.height} : null;
  };
  const block = box(document.querySelector(`#canvas [data-sf-composition-id="${id}"]`));
  const frame = box(document.querySelector('#overlay .sf-composition-overlay-frame--selected'));
  const toolbar = box(document.querySelector('#overlay .sf-composition-overlay-toolbar'));
  const scroller = document.querySelector('#layout-view');
  return {
    selected: globalThis.uiEditor.state.selected,
    block,
    frame,
    toolbar,
    scroll: scroller.scrollTop,
    off: block && frame ? Math.max(Math.abs(frame.left - block.left), Math.abs(frame.top - block.top), Math.abs(frame.width - block.width), Math.abs(frame.height - block.height)) : null,
    covers: Boolean(block && toolbar && toolbar.bottom > block.top + 0.5 && toolbar.top < block.bottom - 0.5 && toolbar.right > block.left && toolbar.left < block.right),
  };
}, id);
/** The ids of one section's children, in the order the canvas draws them. */
const order = (parent) => page.evaluate((parent) => [...document.querySelector(`#canvas [data-sf-composition-id="${parent}"]`).children]
  .map((child) => child.dataset.sfCompositionId).filter(Boolean), parent);
/** The same, from the page saved in IndexedDB. */
const stored = (parent) => page.evaluate((parent) => new Promise((resolve) => {
  const open = indexedDB.open('ui-editor');
  open.onsuccess = () => {
    const request = open.result.transaction('pages').objectStore('pages').get('home');
    request.onsuccess = () => {
      const find = (n) => n.id === parent ? n : Object.values(n.slots ?? {}).flat().map(find).find(Boolean);
      resolve((find(request.result.document.root)?.slots?.default ?? []).map((child) => child.id));
      open.result.close();
    };
  };
}), parent);
const tools = () => page.evaluate(() => [...document.querySelectorAll('#overlay .sf-composition-overlay-toolbar button[data-action]')].map((button) => ({
  id: button.dataset.action,
  label: button.getAttribute('aria-label'),
  disabled: button.disabled,
  height: Math.round(button.getBoundingClientRect().height),
})));
const press = async (id) => {
  const target = await page.locator(node(id)).boundingBox();
  await page.mouse.click(target.x + 12, target.y + Math.min(12, target.height / 2));
  await settle();
};

try {
  await load(page, run.origin);

  // ------------------------------------------------------------ select, no jump
  const before = await geometry('home-layout-title');
  await press('home-layout-title');
  const chosen = await geometry('home-layout-title');
  check('a press selects the block', chosen.selected === 'home-layout-title', String(chosen.selected));
  check('no jump on select: the canvas keeps its scroll and the block its place', chosen.scroll === before.scroll && Math.abs(chosen.block.top - before.block.top) < 0.5, `${before.scroll} → ${chosen.scroll}, ${before.block.top} → ${chosen.block.top}`);
  check('the selection frame stands on the block', chosen.off !== null && chosen.off <= 2, String(chosen.off));
  check('the toolbar stands above the block and does not cover it', chosen.toolbar && !chosen.covers && chosen.toolbar.bottom <= chosen.block.top + 0.5, JSON.stringify({toolbar: chosen.toolbar, block: chosen.block}));
  const bar = await tools();
  check('the toolbar holds the icon actions drag, up, down, duplicate, delete, 32 px each', bar.map((tool) => tool.id).join() === 'drag,move-up,move-down,duplicate,remove' && bar.every((tool) => tool.height === 32), JSON.stringify(bar));
  check('the actions are named in the interface language', bar.map((tool) => tool.label).join() === 'Перетащить,Выше,Ниже,Дублировать,Удалить', bar.map((tool) => tool.label).join());
  check('the first block of its section cannot go up', bar.find((tool) => tool.id === 'move-up').disabled && !bar.find((tool) => tool.id === 'move-down').disabled);

  // ------------------------------------------------------------------ the keys
  await page.keyboard.press('Alt+ArrowDown');
  await settle();
  const down = await geometry('home-layout-title');
  check('⌥↓ moves the block down, still selected', (await order('home-layout')).join() === 'home-layout-text,home-layout-title' && down.selected === 'home-layout-title', (await order('home-layout')).join());
  check('the move is saved in IndexedDB', (await stored('home-layout')).join() === 'home-layout-text,home-layout-title', (await stored('home-layout')).join());
  check('no jump on move: the canvas keeps its scroll, the frame stands on the moved block', down.scroll === chosen.scroll && down.off !== null && down.off <= 2, `${down.scroll}, ${down.off}`);
  check('after the move the toolbar still does not cover the block', down.toolbar && !down.covers, JSON.stringify({toolbar: down.toolbar, block: down.block}));
  await page.keyboard.press('Alt+ArrowUp');
  await settle();
  check('⌥↑ moves it back', (await order('home-layout')).join() === 'home-layout-title,home-layout-text');

  await page.keyboard.press('Meta+d');
  await settle();
  const twin = await page.evaluate(() => globalThis.uiEditor.state.selected);
  check('⌘D puts a copy right after the block and selects it', (await order('home-layout')).join() === `home-layout-title,${twin},home-layout-text` && twin === 'home-layout-title-2', (await order('home-layout')).join());
  await page.keyboard.press('Backspace');
  await settle();
  check('⌫ deletes the selected block and selects the next one', (await order('home-layout')).join() === 'home-layout-title,home-layout-text' && (await page.evaluate(() => globalThis.uiEditor.state.selected)) === 'home-layout-text', (await order('home-layout')).join());

  // -------------------------------------------------------- the toolbar's buttons
  await page.locator('#overlay button[data-action="move-up"]').click();
  await settle();
  check('the up button moves the selected block', (await order('home-layout')).join() === 'home-layout-text,home-layout-title', (await order('home-layout')).join());
  await page.locator('#overlay button[data-action="move-down"]').click();
  await settle();
  check('the down button moves it back', (await order('home-layout')).join() === 'home-layout-title,home-layout-text');
  await page.evaluate(() => document.querySelector('#overlay').select('home-root'));
  await settle();
  check('the page\'s root can be neither moved, copied nor deleted', (await tools()).every((tool) => tool.disabled), JSON.stringify(await tools()));

  // --------------------------------------------------------- insert at the seam
  const seam = await page.evaluate(() => {
    const a = document.querySelector('#canvas [data-sf-composition-id="home-hero"]').getBoundingClientRect();
    const b = document.querySelector('#canvas [data-sf-composition-id="home-layout"]').getBoundingClientRect();
    return {x: a.left + a.width / 2, y: (a.bottom + b.top) / 2};
  });
  await page.mouse.move(seam.x, seam.y - 30);
  await page.mouse.move(seam.x, seam.y, {steps: 4});
  await settle(200);
  const plus = page.locator('#overlay .sf-composition-overlay-insert[data-sf-insert-shown]');
  check('one + shows at the seam under the pointer', (await plus.count()) === 1, String(await plus.count()));
  await plus.first().click();
  await settle();
  // Each item is an icon (its name as text) and a label: the label is the last word.
  const offered = await page.evaluate(() => [...document.querySelectorAll('#insert-menu [role="menuitem"]')].filter((item) => item.getClientRects().length).map((item) => item.textContent.trim().split(/\s+/u).pop()));
  check('the + raises a simple list of the types the place accepts', offered.join() === 'Заголовок,Абзац,Секция', offered.join());
  const under = await page.evaluate(() => {
    const mark = document.querySelector('#overlay .sf-composition-overlay-insert[aria-pressed="true"] .sf-composition-overlay-insert-mark').getBoundingClientRect();
    const list = [...document.querySelectorAll('#insert-menu [role="menuitem"]')].find((item) => item.getClientRects().length).getBoundingClientRect();
    return {mark: mark.left + mark.width / 2, from: list.left, to: list.right, below: list.top >= mark.bottom - 1};
  });
  check('the list opens under the +', under.below && under.from <= under.mark + 1 && under.mark <= under.to + 160, JSON.stringify(under));
  await page.getByRole('menuitem', {name: 'Абзац'}).click();
  await settle();
  const added = await page.evaluate(() => globalThis.uiEditor.state.selected);
  check('the chosen type is inserted at the seam and selected', (await order('home-root')).join() === `home-hero,${added},home-layout,home-content` && /^home-paragraph/u.test(added), (await order('home-root')).join());
  check('the insert is saved in IndexedDB', (await stored('home-root')).includes(added));
  const menuOpen = await page.evaluate(() => [...document.querySelectorAll('#insert-menu [role="menuitem"]')].some((item) => item.getClientRects().length));
  check('the list closes after the choice', !menuOpen);

  // --------------------------------------------------------- drag by the grip
  await press('home-content-title');
  const grip = await page.locator('#overlay button[data-action="drag"]').boundingBox();
  const below = await page.locator(node('home-content-text')).boundingBox();
  await page.mouse.move(grip.x + grip.width / 2, grip.y + grip.height / 2);
  await page.mouse.down();
  await page.mouse.move(grip.x + grip.width / 2, below.y + below.height / 2, {steps: 8});
  await page.mouse.move(below.x + below.width / 2, below.y + below.height - 2, {steps: 4});
  await page.mouse.up();
  await settle();
  check('dragging by the grip moves the block', (await order('home-content')).join() === 'home-content-text,home-content-title', (await order('home-content')).join());

  // -------------------------------------------------------------- scroll, no jump
  await page.setViewportSize({width: 1440, height: 420});
  await settle();
  await press('home-layout-text');
  const still = await geometry('home-layout-text');
  const scrolled = await page.evaluate(() => {
    const scroller = document.querySelector('#layout-view');
    // Instant: a smooth scroll would land after this task.
    scroller.scrollTo({top: scroller.scrollTop + 60, behavior: 'instant'});
    // Measured in the same task as the scroll: no script has run since.
    const block = document.querySelector('#canvas [data-sf-composition-id="home-layout-text"]').getBoundingClientRect();
    const frame = document.querySelector('#overlay .sf-composition-overlay-frame--selected').getBoundingClientRect();
    return {scroll: scroller.scrollTop, room: `${scroller.scrollHeight}/${scroller.clientHeight}`, off: Math.max(Math.abs(frame.top - block.top), Math.abs(frame.left - block.left))};
  });
  check('the canvas scrolls', scrolled.scroll > still.scroll, `${still.scroll} → ${scrolled.scroll}, ${scrolled.room}`);
  check('no jump on scroll: the frame moves with its block in the same frame, with no script', scrolled.off <= 1, String(scrolled.off));
  await settle(200);
  const after = await geometry('home-layout-text');
  check('after the scroll the toolbar still does not cover the block', after.toolbar && !after.covers, JSON.stringify({toolbar: after.toolbar, block: after.block}));
  await page.setViewportSize({width: 1440, height: 900});
  await settle();

  // ------------------------------------------------------------------ a reload
  await load(page, run.origin);
  check('the changed page outlives a reload', (await order('home-root')).length === 4 && (await order('home-content')).join() === 'home-content-text,home-content-title', `${(await order('home-root')).join()} | ${(await order('home-content')).join()}`);

  check('no page errors', errors.length === 0, errors.join(' | '));
} catch (error) {
  check('the run finished', false, error.stack);
}
await run.finish();
