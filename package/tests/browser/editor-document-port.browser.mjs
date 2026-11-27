#!/usr/bin/env node
// sf-editor 1.6.0 over simai.document-port 1.0.2 in a browser: the port is handed by
// connect-port, the page loads from it, typing is saved as a draft against the
// revision, a conflict offers Keep mine / Take the saved version, and a reader
// without rights.save gets the page read only. The host is in memory.
// Usage: node this-file /absolute/path/to/output
// sf-editor 1.1.0 on the built bytes: the visual parity with the accepted
// prototype (ui-control prototypes/block-editor.html, brief
// control/ui-editor/visual-parity-2026-11-04), each item measured in a real
// browser at 1440 (light and dark) and 390:
// 1 density: the editor's own words are 14/20 or 12/16, never the page's 16;
// 2 the catalogue: Framework sections in the Framework's order, each with an
//   icon and a count, opened in place with «Back»; search names the section;
//   no name spills out of its row;
// 3 variant previews drawn from each variant's tree differ from each other;
// 4 the parameter panel: icon, name and section; Parameters / JSON / HTML;
//   fields under Content, Layout and More, each with its origin dot, reset
//   and Framework binding; the type's effective value; a short empty state;
// 5 the chosen block: a frame and a floating bar above it, at its end edge;
//   + and the grip in the gutter, a 1/3 control of the ladder (C27: 28 on a
//   desktop, the phone step on a phone), with a first-use hint until used;
// 6 the canvas: the sheet fills the canvas beside the gutter's room, which
//   follows the 1/3 control, with a shadow, on a quieter background; the
//   gutter stays inside the window at 1440 and 390; the template lock is a chip in the corner; the
//   status bar is 32 high at 12px;
// 7 the bar: one row, the screens in the centre, help, output and theme as
//   32 px icon buttons, «Edit template» a link, the host's slotted controls
//   (slots start and actions) in the same row;
// G-40 text typed in a site block's instance is kept in data.texts, through
//   drawing again and undo;
// G-41 the + catalogue low in the window stays inside it, its list scrolled.
import {resolve, join} from 'node:path';
import {existsSync, readdirSync, readFileSync, statSync} from 'node:fs';
import {chromium} from 'playwright';

if (!process.argv[2]) throw new Error('Build output root is required');
const out = resolve(process.argv[2]);
const parts = ['icon', 'button', 'button-icon', 'segmented', 'tabs', 'input', 'dropdown', 'switch', 'skeleton', 'menu-context', 'modal', 'editor-inline', 'tree-item', 'tree'];
const sheets = ['buttons', 'icon-buttons', 'button-group', 'inputs', 'dropdown', 'switch', 'skeleton', 'modal', 'menu', 'context-menu', 'tabs', 'tab', 'icons', 'tree', 'tree-item']
  .map((name) => `component/component/${name}/css/${name}.css`).filter((path) => existsSync(join(out, path)));
const styles = [
  'core/core/css/core.css', 'core/core/css/utility.full.css', ...sheets,
  ...parts.map((name) => `smart/smart/${name}/css/${name}.css`).filter((path) => existsSync(join(out, path))),
  'smart/smart/editor/css/editor.css',
].map((path) => join(out, path));
const russian = join(out, 'core/core/lang/ru.js');
const modules = [
  'core/core/js/core.js', 'core/core/js/smart-base.js',
  ...parts.map((name) => `smart/smart/${name}/js/${name}.js`),
  'smart/smart/editor/js/editor.js',
].map((path) => join(out, path));
// The fonts the sheets name (the icon font among them): icons draw without the
// Loader since ui-source 2f1865e8, so the page must get the glyphs, not the ligature words.
const fonts = new Map();
const scan = (dir) => {
  if (!existsSync(dir)) return;
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) scan(path);
    else if (/\.(woff2?|ttf)$/u.test(name)) fonts.set(name, path);
  }
};
scan(join(out, 'core'));
scan(join(out, 'component'));
const absent = [...styles, ...modules].filter((path) => !existsSync(path));
if (absent.length) throw new Error(`${absent.length} build asset(s) not found under ${out}: ${absent.join(', ')}`);

const t = (value) => [{type: 'text', value}];
// The Framework's catalogue order (core.runtime CATALOGUE_GROUPS).
const failures = [];
const check = (label, condition, got) => { if (!condition) failures.push({case: label, got}); };
const browser = await chromium.launch();
const MOD = process.platform === 'darwin' ? 'Meta' : 'Control';
const END = MOD === 'Meta' ? 'Meta+ArrowDown' : 'Control+End';

const STORED = {
  schema: 'simai.composition.document', schema_version: 1, id: 'delivery', profile: 'ui-layout', locale: 'ru',
  root: {id: 'root', type: 'layout.page', slots: {default: [
    {id: 's1', type: 'layout.section', slots: {default: [{id: 'a1', type: 'layout.area', slots: {default: [
      {id: 'h1', type: 'content.heading', data: {level: 2, content: t('Доставка и оплата')}},
      {id: 'p1', type: 'content.paragraph', data: {content: t('Привезём заказ за два дня.')}},
      {id: 'f1', type: 'content.figure', data: {src: 'media:7', alt: 'Склад'}},
    ]}}]}},
  ]}},
};

async function open({rights = {save: true}, stored = STORED, ready = '#editor [data-sf-composition-id="p1"]'} = {}) {
  const tab = await browser.newPage({viewport: {width: 1440, height: 900}, colorScheme: 'light'});
  tab.errors = [];
  tab.on('pageerror', (error) => { if (!/Automatic publicPath/u.test(error.message)) tab.errors.push(error.message); });
  const markup = '<!doctype html><html class="theme-light" lang="ru"><head><meta charset="utf-8"><title>sf-editor</title></head><body style="margin:0;height:100vh"><div id="box" style="height:100vh"></div></body></html>';
  await tab.route('https://editor.probe/**', (route) => {
    const name = new URL(route.request().url()).pathname.split('/').pop();
    if (/\.(woff2?|ttf)$/u.test(name)) {
      const file = fonts.get(name);
      return file ? route.fulfill({status: 200, contentType: 'font/woff2', body: readFileSync(file)}) : route.fulfill({status: 404, body: ''});
    }
    return route.fulfill({status: 200, contentType: 'text/html; charset=utf-8', body: markup});
  });
  await tab.goto('https://editor.probe/');
  for (const style of styles) await tab.addStyleTag({path: style}).catch(() => {});
  if (existsSync(russian)) await tab.addScriptTag({path: russian});
  for (const module of modules) await tab.addScriptTag({path: module, type: 'module'}).catch(() => {});
  await tab.waitForFunction(() => Boolean(customElements.get('sf-editor')));
  await tab.evaluate(({stored, rights}) => {
    // A host in memory, answering as the port's kit describes.
    const store = {revision: '1', values: {ru: stored}};
    const host = window.host = {
      id: 'simai.document-port', capabilities: [], sent: [], store,
      async send(intent, payload) {
        host.sent.push({intent, payload: JSON.parse(JSON.stringify(payload))});
        if (intent === 'document.load') return {answer: 'applied', data: {target: {level: 'page', ref: 'page:1'}, revision: store.revision, languages: ['ru', 'en'], values: JSON.parse(JSON.stringify(store.values)), rights, limits: {max_nodes: 200, max_bytes: 262144}}};
        if (intent === 'document.save') {
          if (payload.expected_revision !== store.revision) return {answer: 'conflict', reason: 'stale-revision', current_revision: store.revision, current: {revision: store.revision, languages: ['ru', 'en'], values: JSON.parse(JSON.stringify(store.values))}};
          Object.assign(store.values, JSON.parse(JSON.stringify(payload.values)));
          store.revision = String(Number(store.revision) + 1);
          return {answer: 'applied', data: {revision: store.revision}};
        }
        return {answer: 'refused', reason: 'unknown-intent'};
      },
    };
    const editor = document.createElement('sf-editor');
    editor.id = 'editor';
    window.uploads = [];
    editor.media = {
      async upload(file) { window.uploads.push(file.name); return {answer: 'applied', data: {ref: 'media:8', url: '/media/8.png'}}; },
      url: (ref) => (ref === 'media:9' ? null : `/media/${ref.slice(6)}.png`),
    };
    document.getElementById('box').append(editor);
    window.connected = editor.connectPort(host);
  }, {stored, rights});
  await tab.waitForSelector(ready, {timeout: 10000});
  return tab;
}

const status = (tab) => tab.evaluate(() => document.querySelector('#editor .sf-editor-save')?.textContent.trim() ?? '');
const textOf = (node) => (node?.data?.content ?? []).map((part) => part.value ?? '').join('');

try {
  // 1. Load and save.
  const tab = await open();
  check('connect-port takes the document port', (await tab.evaluate(() => window.connected?.outcome)) === 'applied', await tab.evaluate(() => window.connected));
  check('the page is loaded from the port', (await tab.evaluate(() => document.querySelector('#editor [data-sf-composition-id="p1"]')?.textContent.trim())) === 'Привезём заказ за два дня.');
  check('the save line says saved after the load', await status(tab) === 'Сохранено', await status(tab));
  const p1 = await tab.locator('#editor [data-sf-composition-id="p1"]').boundingBox();
  await tab.mouse.click(p1.x + p1.width - 4, p1.y + p1.height / 2);
  await tab.waitForTimeout(100);
  await tab.keyboard.press(END);
  await tab.keyboard.type(' Бесплатно.');
  await tab.waitForTimeout(1600);
  const saved = await tab.evaluate(() => ({sent: window.host.sent.filter(({intent}) => intent === 'document.save'), revision: window.host.store.revision, ru: window.host.store.values.ru}));
  const last = saved.sent.at(-1)?.payload;
  check('typing is saved as a draft of the page language against the loaded revision', last && last.expected_revision === '1' && Object.keys(last.values).join() === 'ru' && typeof last.client_key === 'string', last);
  const stored = saved.ru?.root?.slots?.default?.[0]?.slots?.default?.[0]?.slots?.default?.[1];
  check('the stored value has the typed text', textOf(stored) === 'Привезём заказ за два дня. Бесплатно.', textOf(stored));
  await tab.keyboard.press('Escape');
  await tab.waitForTimeout(100);
  check('after the save the line says saved again', await status(tab) === 'Сохранено', await status(tab));

  // 2. Conflict: the page changes elsewhere, the next save meets it.
  await tab.evaluate(() => {
    const store = window.host.store;
    store.values.ru = JSON.parse(JSON.stringify(store.values.ru));
    store.values.ru.root.slots.default[0].slots.default[0].slots.default[0].data.content = [{type: 'text', value: 'Чужой заголовок'}];
    store.revision = '9';
  });
  await tab.mouse.click(p1.x + p1.width - 4, p1.y + p1.height / 2);
  await tab.waitForTimeout(100);
  await tab.keyboard.press(END);
  await tab.keyboard.type('!');
  await tab.keyboard.press('Escape');
  await tab.waitForTimeout(1600);
  const bar = await tab.evaluate(() => {
    const element = document.querySelector('#editor .sf-editor-conflict');
    return element ? {role: element.getAttribute('role'), text: element.textContent.replace(/\s+/gu, ' ').trim(), buttons: [...element.querySelectorAll('sf-button')].map((button) => button.getAttribute('text'))} : null;
  });
  check('a conflict is shown as an alert with the two choices', bar && bar.role === 'alert' && bar.buttons.join('|') === 'Оставить мои|Взять сохранённую', bar);
  check('the save line says the page was changed elsewhere', /изменили в другом месте/u.test(await status(tab)), await status(tab));
  await tab.locator('#editor .sf-editor-conflict sf-button').nth(1).click();
  await tab.waitForTimeout(300);
  check('take the saved version shows the stored page', (await tab.evaluate(() => document.querySelector('#editor [data-sf-composition-id="h1"]')?.textContent.trim())) === 'Чужой заголовок');
  check('the conflict bar is gone after the choice', (await tab.evaluate(() => Boolean(document.querySelector('#editor .sf-editor-conflict')))) === false);
  check('no page errors', tab.errors.length === 0, tab.errors);
  await tab.close();

  // 4. Media: the canvas draws a media reference from the host's url(ref); the
  // image field uploads a file through editor.media and takes its reference.
  const media = await open();
  const image = await media.evaluate(() => document.querySelector('#editor [data-sf-composition-id="f1"] img')?.getAttribute('src') ?? '');
  check('a media reference is drawn from the host url, and the page is drawn with it', image === '/media/7.png', image);
  await media.evaluate(() => document.getElementById('editor').select({id: 'f1'}));
  await media.waitForTimeout(300);
  const upload = media.locator('#editor .sf-editor-upload input[type=file]');
  check('an image field has an upload when the host gives editor.media', (await upload.count()) === 1, await upload.count());
  if (await upload.count()) {
    await upload.setInputFiles({name: 'photo.png', mimeType: 'image/png', buffer: Buffer.from([137, 80, 78, 71])});
    await media.waitForTimeout(1600);
    const after = await media.evaluate(() => ({uploads: window.uploads, src: window.host.store.values.ru.root.slots.default[0].slots.default[0].slots.default[2].data.src}));
    check('the uploaded file goes to upload(file) and its media reference is saved', after.uploads.join() === 'photo.png' && after.src === 'media:8', after);
  }
  check('no page errors with media', media.errors.length === 0, media.errors);
  await media.close();

  // 3. A reader without rights.save: read only.
  const reader = await open({rights: {save: false}});
  const view = await reader.evaluate(() => ({
    readonly: document.querySelector('#editor .sf-editor')?.classList.contains('sf-editor--readonly'),
    mark: document.querySelector('#editor .sf-editor-readonly-mark > span')?.textContent.trim(),
    undo: Boolean(document.querySelector('#editor sf-button-icon[icon="undo"]')),
    library: Boolean(document.querySelector('#editor .sf-editor-left sf-tabs')),
  }));
  check('a reader without rights.save gets the page read only, without undo and the library', view.readonly && view.mark === 'Только просмотр' && !view.undo && !view.library, view);
  const r1 = await reader.locator('#editor [data-sf-composition-id="p1"]').boundingBox();
  await reader.mouse.click(r1.x + r1.width - 4, r1.y + r1.height / 2);
  await reader.keyboard.type('x');
  await reader.waitForTimeout(1200);
  check('a reader types nothing and nothing is saved', (await reader.evaluate(() => window.host.sent.filter(({intent}) => intent === 'document.save').length)) === 0
    && (await reader.evaluate(() => document.querySelector('#editor [data-sf-composition-id="p1"]')?.textContent.trim())) === 'Привезём заказ за два дня.');
  check('no page errors for the reader', reader.errors.length === 0, reader.errors);
  await reader.close();

  // 5. 1.6.1: a media reference the host does not know draws the picture's
  // placeholder through the render's media option, and the page is drawn.
  const unknown = JSON.parse(JSON.stringify(STORED));
  unknown.root.slots.default[0].slots.default[0].slots.default[2].data.src = 'media:9';
  const placeholder = await open({stored: unknown});
  const mark = await placeholder.evaluate(() => document.querySelector('#editor [data-sf-media-unresolved]')?.getAttribute('data-sf-media-unresolved') ?? '');
  check('an unknown media reference draws the placeholder, the page all the same', mark === 'media:9', mark);
  await placeholder.close();

  // 6. 1.6.1 (Larena 11-27): a Document the render refuses (inline {text}
  // without type) is named in a bar and open read-only; typing saves nothing.
  const invalid = {schema: 'simai.composition.document', schema_version: 1, id: 'page', profile: 'ui-layout', locale: 'ru',
    root: {id: 'root', type: 'layout.page', slots: {default: [{id: 'main-1', type: 'content.paragraph', data: {content: [{text: 'Правка из второй вкладки'}]}}]}}};
  const refused = await open({stored: invalid, ready: '#editor .sf-editor-refused'});
  const refusal = await refused.evaluate(() => ({
    text: document.querySelector('#editor .sf-editor-refused')?.textContent.trim() ?? '',
    role: document.querySelector('#editor .sf-editor-refused')?.getAttribute('role'),
    readonly: document.querySelector('#editor .sf-editor')?.classList.contains('sf-editor--readonly'),
  }));
  check('a refused page names the refusal in an alert and is read only', refusal.role === 'alert' && refusal.readonly && /schema_one_of/u.test(refusal.text) && /content\[0\]/u.test(refusal.text), refusal);
  await refused.locator('#editor .sf-editor-canvas').click();
  await refused.keyboard.type('x');
  await refused.waitForTimeout(1200);
  const saves = await refused.evaluate(() => window.host.sent.filter(({intent}) => intent === 'document.save').length);
  check('nothing is saved over a refused page', saves === 0, saves);
  check('no page errors on a refused page', refused.errors.length === 0, refused.errors);
  await refused.close();
} finally {
  await browser.close();
}

if (failures.length) {
  console.error(JSON.stringify(failures, null, 1));
  process.exit(1);
}
console.log('editor document port: every check passed');
