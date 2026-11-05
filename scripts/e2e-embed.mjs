// The single-page mode (owner, 2026-11-05; docs/HOST-EMBED.md): the host demo
// embeds the editor in an iframe, loads one page, edits it and takes it back
// on save. Also the same-page API, a Document the editor refuses, the guard
// on unsaved changes, and that the list mode stays the default.
//
//   node scripts/e2e-embed.mjs [--chrome <path>]

import {load, startRun} from './e2e-common.mjs';

const run = await startRun();
const {check} = run;

// ---------------------------------------------------------------- the host demo, in an iframe
{
  const context = await run.browser.newContext({viewport: {width: 1440, height: 900}, locale: 'ru-RU'});
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(String(error)));
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

  const stored = await frame.evaluate(async () => (await indexedDB.databases()).map((d) => d.name));
  check('nothing is written to IndexedDB in this mode', !stored.includes('ui-editor'), stored.join() || 'none');
  check('no page errors', errors.length === 0, errors.join(' | '));
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
  const page = await context.newPage();
  await load(page, run.origin);
  const list = await page.evaluate(() => ({mode: document.body.dataset.mode ?? 'list', pages: Boolean(document.querySelector('#pages')), save: Boolean(document.querySelector('#save'))}));
  check('without ?mode=page the editor is the standalone list mode, with no «Сохранить»', list.mode === 'list' && list.pages && !list.save, JSON.stringify(list));
  await context.close();
}

await run.finish();
