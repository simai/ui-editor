// The single-page mode (owner, 2026-11-05; docs/HOST-EMBED.md): the host demo
// embeds the editor in an iframe, loads one page, edits it and takes it back
// on save. Also the same-page API, a Document the editor refuses, the guard
// on unsaved changes, and that the list mode stays the default.
//
//   node scripts/e2e-embed.mjs [--chrome <path>] [--loads <n>]

import {argument, load, startRun} from './e2e-common.mjs';

const run = await startRun();
const {check} = run;

/**
 * Watches every frame of the editor's document from its first: whether the
 * pages panel is painted, whether an element is painted before its component
 * is defined (a raw, unstyled control), and every uncaught error. It runs in
 * each frame before the page's own scripts.
 */
function watchFrames() {
  const editor = /\/(index\.html)?$/u.test(location.pathname);
  const seen = {frames: 0, panel: [], raw: [], errors: []};
  globalThis.__watch = seen;
  addEventListener('error', (event) => seen.errors.push(String(event.message)));
  addEventListener('unhandledrejection', (event) => seen.errors.push(String(event.reason?.message ?? event.reason)));
  if (!editor) return;
  const painted = (node) => {
    const box = node.getBoundingClientRect();
    return box.width > 0 && box.height > 0 && node.checkVisibility({visibilityProperty: true, opacityProperty: true});
  };
  const started = performance.now();
  const frame = () => {
    seen.frames += 1;
    const at = Math.round(performance.now() - started);
    if (/mode=page/u.test(location.search)) {
      for (const selector of ['#left-panel', '#pages-pane', '#new-page', '#storage-state', '#toggle-left']) {
        const node = document.querySelector(selector);
        if (node && [node, ...node.querySelectorAll('*')].some(painted)) seen.panel.push(`${at}ms ${selector}`);
      }
    }
    // Before the shell is ready its components' styles may not be there yet: nothing may show.
    if (document.body && document.body.dataset.ready !== 'true') {
      const early = [...document.body.querySelectorAll('*')].find(painted);
      if (early) seen.raw.push(`${at}ms before ready: ${early.localName}${early.id ? `#${early.id}` : ''}`);
    }
    for (const raw of document.querySelectorAll(':not(:defined)')) {
      if ([raw, ...raw.querySelectorAll('*')].some(painted)) seen.raw.push(`${at}ms ${raw.localName}${raw.id ? `#${raw.id}` : ''}`);
    }
    if (performance.now() - started < 12000) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

/**
 * Loads of the host demo made hostile to timing: the editor's bundle comes
 * late by a different delay each time, the CPU runs four times slower, and
 * every other load reuses the cache. Each must reach «page loaded» with no
 * error, and no frame may paint the pages panel or a raw control.
 */
const LOADS = Number(argument('--loads', '6'));
{
  const delays = [0, 150, 400, 900, 1600, 2500];
  const failures = [];
  let context = null;
  for (let n = 0; n < LOADS; n += 1) {
    const warm = n % 2 === 1;
    if (!warm || !context) {
      await context?.close();
      context = await run.browser.newContext({viewport: {width: 1440, height: 900}, locale: 'ru-RU'});
      await context.addInitScript(watchFrames);
    }
    const page = await context.newPage();
    const delay = delays[n % delays.length];
    await page.route('**/app.js', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, delay));
      await route.continue();
    });
    const cdp = await context.newCDPSession(page);
    await cdp.send('Emulation.setCPUThrottlingRate', {rate: 4});
    const errors = [];
    page.on('pageerror', (error) => errors.push(String(error)));
    page.on('console', (message) => message.type() === 'error' && errors.push(message.text()));
    await page.goto(`${run.origin}/examples/host-embed.html`);
    const reached = await page.waitForFunction(() => document.getElementById('state').textContent.startsWith('page loaded'), null, {timeout: 30000}).then(() => true, () => false);
    await page.waitForTimeout(400);
    const frame = page.frame({url: /mode=page/u});
    const watched = frame ? await frame.evaluate(() => globalThis.__watch) : {frames: 0, panel: ['no frame'], raw: [], errors: []};
    const all = [...errors, ...watched.errors];
    const what = `load ${n + 1} (${warm ? 'warm' : 'cold'}, app.js +${delay} ms, CPU ×4)`;
    if (!reached || all.length || watched.panel.length || watched.raw.length) failures.push(`${what}: ${JSON.stringify({reached, errors: all.slice(0, 2), panel: watched.panel.slice(0, 2), raw: watched.raw.slice(0, 2)})}`);
    await page.close();
  }
  await context?.close();
  check(`${LOADS} cold and warm loads, the bundle late and the CPU slowed: each reaches «page loaded» with no console error, and no frame paints the pages panel or a raw control`, failures.length === 0, failures.slice(0, 3).join(' | '));
}

/** The page panel's publishing, as a person reads it: the status under the title, the note, and whether «Опубликовать» is on. */
const publishing = (target) => target.evaluate(() => {
  const right = document.querySelector('#page-editor .sf-editor-right');
  const button = right?.querySelector('[data-key="publish"] sf-button[scheme="primary"]');
  return {
    status: right?.querySelector('.sf-editor-panel-sub')?.textContent.trim(),
    note: right?.querySelector('[data-key="publish"] .sf-editor-hint')?.textContent.trim(),
    on: Boolean(button) && !button.hasAttribute('disabled') && !button.querySelector('button')?.disabled,
  };
});
const STATES = {
  new: {status: 'черновик · ещё не опубликована', note: 'Страница ещё не опубликована: посетители её не видят.', on: true},
  changes: {status: 'черновик · изменения не опубликованы', note: 'Пока изменения не опубликованы, посетители видят прошлую версию.', on: true},
  live: {status: 'опубликована', note: 'Опубликована. Изменений нет.', on: false},
};
const isState = (seen, name) => seen.status === STATES[name].status && seen.note === STATES[name].note && seen.on === STATES[name].on;

// ---------------------------------------------------------------- the host demo, in an iframe
{
  const context = await run.browser.newContext({viewport: {width: 1440, height: 900}, locale: 'ru-RU'});
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(String(error)));
  page.on('console', (message) => message.type() === 'error' && errors.push(message.text()));
  await page.goto(`${run.origin}/examples/host-embed.html`);
  await page.waitForFunction(() => document.getElementById('state').textContent.startsWith('page loaded'));
  const frame = page.frame({url: /mode=page/});
  await frame.waitForSelector('#page-editor .sf-editor-page h1');
  await page.waitForTimeout(600);

  const shell = await frame.evaluate(() => ({
    mode: document.body.dataset.mode,
    absent: ['#left-panel', '#toggle-left', '#new-page', '#pages', '#storage-state'].filter((selector) => document.querySelector(selector)),
    canvas: Math.round(document.querySelector('.canvas-area').getBoundingClientRect().width),
    width: innerWidth,
    heading: document.querySelector('#page-editor .sf-editor-title-name')?.textContent.trim(),
    save: {shown: !document.querySelector('#save').hidden, disabled: document.querySelector('#save').hasAttribute('disabled')},
  }));
  check('?mode=page: the pages panel, its toggle, «Новая страница» and the storage note are not there', shell.mode === 'page' && shell.absent.length === 0, JSON.stringify(shell.absent));
  check('the canvas takes the whole width', shell.canvas === shell.width, `${shell.canvas} of ${shell.width}`);
  check("the host's page is loaded, its name on the bar", shell.heading === 'Главная', shell.heading);
  check('«Сохранить» is there, and off while nothing changed', shell.save.shown && shell.save.disabled, JSON.stringify(shell.save));

  // An edit: the hero's heading gets a word more.
  const heading = frame.locator('#page-editor .sf-editor-page h1').first();
  const box = await heading.boundingBox();
  await page.mouse.click(box.x + 4, box.y + Math.min(10, box.height / 2));
  await page.keyboard.press('Meta+ArrowDown');
  await page.keyboard.type(' сегодня');
  await page.waitForTimeout(500);
  const dirty = await page.evaluate(() => window.hostDemo.dirty);
  const enabled = await frame.evaluate(() => !document.querySelector('#save').hasAttribute('disabled'));
  check('an edit makes the page dirty: the host is told, «Сохранить» turns on', dirty && enabled, JSON.stringify({dirty, enabled}));

  await frame.evaluate(() => document.querySelector('#page-editor .sf-editor-canvas')?.focus({preventScroll: true}));
  await page.keyboard.press('Escape');
  await frame.locator('#save button').click();
  await page.waitForFunction(() => window.hostDemo.saves.length === 1);
  await page.waitForTimeout(300);
  const saved = await page.evaluate(() => window.hostDemo.saves[0]);
  const edited = await frame.evaluate(() => document.getElementById('page-editor').model.toJSON());
  const text = JSON.stringify(saved.document);
  check('save hands the host the edited Document: the payload equals what the editor holds', JSON.stringify(saved.document) === JSON.stringify(edited) && text.includes('сегодня'), `${text.length} bytes`);
  check('with the settings and the revision it was loaded with', saved.settings?.name === 'Главная' && saved.settings.address === '/' && saved.revision === 1 && saved.protocol === 1, JSON.stringify({settings: saved.settings, revision: saved.revision}));
  // The editor's model holds what was saved; it checks it with the site's types.
  const valid = await frame.evaluate(() => document.getElementById('page-editor').model.validate());
  check('the saved Document is a valid composition-document v1', valid.valid, JSON.stringify(valid.diagnostics?.slice(0, 3)));
  const after = await page.evaluate(() => ({dirty: window.hostDemo.dirty, state: document.getElementById('state').textContent}));
  const off = await frame.evaluate(() => document.querySelector('#save').hasAttribute('disabled'));
  check("the host's answer (`sf-editor:saved`) makes the page clean again", !after.dirty && off, JSON.stringify(after));
  await page.keyboard.press('Meta+s');
  await page.waitForTimeout(300);
  check('⌘S saves too', (await page.evaluate(() => window.hostDemo.saves.length)) === 2);

  // The page panel (sf-editor 1.2.0): nothing chosen, the host's settings on the right.
  // Esc goes a level up from the canvas, to nothing chosen.
  await frame.evaluate(() => document.querySelector('#page-editor .sf-editor-canvas')?.focus({preventScroll: true}));
  for (let i = 0; i < 4; i += 1) await page.keyboard.press('Escape');
  await frame.waitForSelector('#page-editor .sf-editor-right [data-key="address"] input', {timeout: 10000});
  const panel = await frame.evaluate(() => {
    const right = document.querySelector('#page-editor .sf-editor-right');
    return {keys: [...right.querySelectorAll('[data-key]')].map((e) => e.dataset.key), name: right.querySelector('[data-key="name"] input')?.value, history: right.querySelector('[data-key="publish"]')?.innerText.includes('История · 1')};
  });
  const never = await publishing(frame);
  check('publishing, never published: «ещё не опубликована», visitors do not see it, «Опубликовать» on', isState(never, 'new'), JSON.stringify(never));
  check("nothing chosen: the page panel shows the host's settings, name to history", ['name', 'address', 'template', 'theme', 'publish'].every((key) => panel.keys.includes(key)) && panel.name === 'Главная' && panel.history, JSON.stringify(panel));
  const address = frame.locator('#page-editor .sf-editor-right [data-key="address"] input');
  await address.fill('/home');
  await address.press('Enter');
  await address.evaluate((input) => input.blur());
  await page.waitForTimeout(300);
  check('an edit in the page panel makes the page dirty', await page.evaluate(() => window.hostDemo.dirty));
  await frame.locator('#save button').click();
  await page.waitForFunction(() => window.hostDemo.saves.length === 3, null, {timeout: 10000});
  const withAddress = await page.evaluate(() => window.hostDemo.saves[2].settings);
  check('…and goes back to the host in the next save', withAddress.address === '/home' && withAddress.name === 'Главная', JSON.stringify(withAddress));
  await frame.locator('#page-editor .sf-editor-right [data-key="publish"] sf-button[scheme="primary"] button').click();
  await page.waitForFunction(() => window.hostDemo.actions.length === 1, null, {timeout: 10000});
  await page.waitForTimeout(300);
  const action = await page.evaluate(() => window.hostDemo.actions[0]);
  const answered = await frame.evaluate(() => ({history: document.querySelector('#page-editor .sf-editor-right [data-key="publish"]')?.innerText.includes('История · 2'), status: document.querySelector('#page-editor .sf-editor-right .sf-editor-panel-sub')?.textContent.trim()}));
  check('«Опубликовать» goes to the host as `sf-editor:page-action`, with the settings and the revision', action.action === 'publish' && action.protocol === 1 && action.settings.address === '/home' && action.revision === 4, JSON.stringify({action: action.action, protocol: action.protocol, revision: action.revision}));
  check("the host's `sf-editor:settings` answer shows in the panel and leaves the page clean", answered.history && answered.status === 'опубликована' && !(await page.evaluate(() => window.hostDemo.dirty)), JSON.stringify(answered));
  const live = await publishing(frame);
  check('publishing, published with nothing new: «Опубликована. Изменений нет.», «Опубликовать» off', isState(live, 'live'), JSON.stringify(live));
  await address.fill('/home-2');
  await address.press('Enter');
  await address.evaluate((input) => input.blur());
  await page.waitForTimeout(300);
  const changed = await publishing(frame);
  check('publishing, published with changes: «изменения не опубликованы», visitors see the last version, «Опубликовать» on', isState(changed, 'changes'), JSON.stringify(changed));
  await frame.locator('#save button').click();
  await page.waitForFunction(() => window.hostDemo.saves.length === 4, null, {timeout: 10000});
  await page.waitForTimeout(300);
  const saved4 = await publishing(frame);
  check('…and a save keeps them unpublished until the host publishes', isState(saved4, 'changes') && (await page.evaluate(() => window.hostDemo.saves[3].settings.changes)) === true, JSON.stringify(saved4));

  const stored = await frame.evaluate(async () => (await indexedDB.databases()).map((d) => d.name));
  check('nothing is written to IndexedDB in this mode', !stored.includes('ui-editor'), stored.join() || 'none');
  check('no page or console errors', errors.length === 0, errors.join(' | '));
  await context.close();
}

// ---------------------------------------------------------------- the same-page API, a refused Document, the guard
{
  const context = await run.browser.newContext({viewport: {width: 1280, height: 800}, locale: 'ru-RU'});
  const page = await context.newPage();
  await page.goto(`${run.origin}/index.html?mode=page`);
  await page.waitForSelector('body[data-ready="true"]');
  const page0 = await (await fetch(`${run.origin}/examples/page.ru.json`)).json();
  const refused = await page.evaluate(() => globalThis.uiEditor.load({document: {schema: 'simai.composition.document', schema_version: 9, root: {}}}));
  check('a Document that is not composition-document v1 is refused with its diagnostics', !refused.ok && refused.diagnostics.length > 0 && !(await page.evaluate(() => document.body.dataset.loaded)), refused.diagnostics.map((d) => d.code).join());
  const loaded = await page.evaluate((payload) => globalThis.uiEditor.load(payload), page0);
  await page.waitForSelector('#page-editor .sf-editor-page h1');
  check('uiEditor.load takes a page on the same page', loaded.ok, JSON.stringify(loaded.diagnostics));
  await page.evaluate(() => {
    window.heard = [];
    addEventListener('sf-editor:save', (event) => window.heard.push(event.detail));
  });
  await page.evaluate(() => globalThis.uiEditor.setSettings({name: 'Главная страница'}));
  await page.waitForTimeout(400);
  check('a settings change is the host\'s: dirty, and the bar shows the new name', await page.evaluate(() => globalThis.uiEditor.dirty && document.querySelector('.sf-editor-title-name')?.textContent.trim() === 'Главная страница'));
  await page.evaluate(() => globalThis.uiEditor.save());
  const heard = await page.evaluate(() => window.heard);
  check('the window hears `sf-editor:save` with the page and its settings', heard.length === 1 && heard[0].settings.name === 'Главная страница' && heard[0].document.root, JSON.stringify(heard[0]?.settings));

  // Unsaved: leaving asks first.
  const heading = page.locator('#page-editor .sf-editor-page h1').first();
  const box = await heading.boundingBox();
  await page.mouse.click(box.x + 4, box.y + Math.min(10, box.height / 2));
  await page.keyboard.type('!');
  await page.waitForTimeout(300);
  let asked = false;
  page.on('dialog', async (dialog) => {
    asked = dialog.type() === 'beforeunload';
    await dialog.dismiss();
  });
  await page.close({runBeforeUnload: true});
  await new Promise((resolve) => setTimeout(resolve, 500));
  check('with unsaved changes, leaving the page asks first', asked);
  await context.close();
}

// ---------------------------------------------------------------- the list mode stays the default
{
  const context = await run.browser.newContext({viewport: {width: 1680, height: 900}, locale: 'ru-RU'});
  await context.addInitScript(watchFrames);
  const page = await context.newPage();
  await page.route('**/app.js', async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    await route.continue();
  });
  await load(page, run.origin);
  const watched = await page.evaluate(() => globalThis.__watch);
  check('the list mode paints no raw control either, its bundle late', watched.raw.length === 0 && watched.errors.length === 0, JSON.stringify({raw: watched.raw.slice(0, 3), errors: watched.errors.slice(0, 2)}));
  const list = await page.evaluate(() => ({mode: document.body.dataset.mode ?? 'list', pages: Boolean(document.querySelector('#pages')), save: Boolean(document.querySelector('#save'))}));
  check('without ?mode=page the editor is the standalone list mode, with no «Сохранить»', list.mode === 'list' && list.pages && !list.save, JSON.stringify(list));
  // The page panel in the list mode: the local page's settings, kept in IndexedDB.
  await page.evaluate(() => document.querySelector('#page-editor .sf-editor-canvas')?.focus({preventScroll: true}));
  for (let i = 0; i < 4; i += 1) await page.keyboard.press('Escape');
  await page.waitForSelector('#page-editor .sf-editor-right [data-key="name"] input', {timeout: 10000});
  const name = page.locator('#page-editor .sf-editor-right [data-key="name"] input');
  await name.fill('Главная, новая');
  await name.press('Enter');
  await name.evaluate((input) => input.blur());
  await page.waitForTimeout(400);
  const renamed = await page.evaluate(async () => ({list: document.querySelector('#pages').items[0].label, heading: document.querySelector('#page-editor').getAttribute('heading'), kept: globalThis.uiEditor.state.pages[0]}));
  check('list mode: a name edited in the page panel renames the page in the list and on the bar', renamed.list === 'Главная, новая' && renamed.heading === 'Главная, новая' && renamed.kept.title === 'Главная, новая', JSON.stringify({list: renamed.list, heading: renamed.heading}));
  const renamedState = await publishing(page);
  check('list mode: an edit of a published page shows its changes as unpublished', isState(renamedState, 'changes'), JSON.stringify(renamedState));
  await page.locator('#page-editor .sf-editor-right [data-key="publish"] sf-button[scheme="primary"] button').click();
  await page.waitForTimeout(300);
  const listLive = await publishing(page);
  check('list mode: «Опубликовать» makes it «Опубликована. Изменений нет.», the button off', isState(listLive, 'live'), JSON.stringify(listLive));
  await page.reload();
  await page.waitForSelector('body[data-ready="true"]');
  const reloaded = await page.evaluate(() => ({title: globalThis.uiEditor.state.pages[0].title, settings: globalThis.uiEditor.state.pages[0].settings}));
  check('…and its settings live with the local page: after a reload it keeps the name and «опубликована»', reloaded.title === 'Главная, новая' && reloaded.settings?.published === true && reloaded.settings.address === '/', JSON.stringify(reloaded));
  await context.close();
}

await run.finish();
