#!/usr/bin/env node
// Usage: node scripts/run-first-paint.mjs snapshot|check|gate <free output> <package output> [folder ...] [--overlay <directory>]
//
// The first paint of the package components (standard simai.smart-component
// 1.3.9 §5.4, §7.3, gate 24), with ui-source's own tools at the pinned
// revision, from the overlay:
//
//   snapshot  scripts/snapshot-first-paint.mjs: renders every example from the
//             built bytes and writes src/smart/<folder>/static/ here (the
//             static markup, the skeletons, static/sheets.json);
//   check     renders the same into the overlay and compares with the
//             committed snapshots: fails when one is stale, missing or over
//             its size;
//   gate      tests/browser/first-paint-gate.browser.mjs: the first paint
//             holds still through the HTML and sheets, the code and the data
//             (late settings, or the fake port an example declares), at 1280
//             and 390 px.
//
// The tools take the package as a declaration (ui-source first-paint-lib.mjs
// readConfig, since c020caa): this script writes it -- the package output
// served under /distr/smart/ after the free output, as the package's sheets
// address the free ones beside them -- and passes --config. Nothing of the
// tools is copied or edited. <free output> is a product output root
// (core/core, smart/smart, ...) or the `distr` of the ui distribution; a
// distr is laid out as a product root with symbolic links.
//
// Attribute order. A browser serializes an element's attributes in the order
// they were set, and a component that sets two of them in callbacks that race
// (the help and result buttons: title and aria-haspopup) gives either order
// under load. Order carries no meaning in HTML, so the snapshots are written
// and compared with every start tag's attributes in sorted order: snapshot
// sorts what it copies back, and check renders into the overlay with the
// tool's own writer, sorts both sides and compares them here (the tool's
// --check compares bytes). Nothing else of the markup is touched.
import {spawnSync} from 'node:child_process';
import {cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, symlinkSync, writeFileSync} from 'node:fs';
import {join, relative, resolve} from 'node:path';
import {PACKAGE_COMPONENTS, PACKAGE_ROOT, materializeOverlay, packageNameOf} from './overlay.mjs';

const args = process.argv.slice(2);
const at = args.indexOf('--overlay');
const overlay = resolve(at === -1 ? join(PACKAGE_ROOT, '.overlay') : args[at + 1]);
const [mode, freeInput, packageInput, ...folders] = args.filter((value, index) => !value.startsWith('--') && (at === -1 || index !== at + 1));
if (!['snapshot', 'check', 'gate'].includes(mode) || !freeInput || !packageInput) {
  throw new Error('usage: run-first-paint.mjs snapshot|check|gate <free output> <package output> [folder ...] [--overlay <directory>]');
}
const free = resolve(freeInput);
const built = resolve(packageInput);
if (!existsSync(join(built, 'smart', 'rule.js'))) throw new Error(`the package output has no smart/rule.js: ${built}`);
if (!existsSync(overlay)) materializeOverlay(overlay);
if (!existsSync(join(overlay, 'scripts', 'first-paint-lib.mjs'))) throw new Error(`${overlay} holds no ui-source first-paint tools`);
const own = folders.length ? folders : PACKAGE_COMPONENTS;
for (const folder of own) if (!PACKAGE_COMPONENTS.includes(folder)) throw new Error(`${folder} is not a package component`);

// The free output as a product root: as given, or a distr linked into one.
let root = free;
if (!existsSync(join(free, 'core', 'core', 'js', 'core.js'))) {
  if (!existsSync(join(free, 'core', 'js', 'core.js'))) throw new Error(`no core/js/core.js under ${free} (a product output root or a ui distr)`);
  root = join(overlay, '.first-paint-output');
  rmSync(root, {force: true, recursive: true});
  const products = {core: ['core', 'core'], rule: ['core', 'rule'], component: ['component', 'component'], smart: ['smart', 'smart'], utility: ['utility', 'utility']};
  for (const [product, [folder, inner]] of Object.entries(products)) {
    if (!existsSync(join(free, product))) throw new Error(`the free output has no ${product}: ${free}`);
    mkdirSync(join(root, folder), {recursive: true});
    symlinkSync(join(free, product), join(root, folder, inner));
  }
}

// The package, declared.
const config = join(overlay, '.first-paint-config.json');
writeFileSync(config, `${JSON.stringify({packages: {[packageNameOf(join(built, 'smart', 'rule.js'))]: {output: join(built, 'smart'), base: '/distr/smart/'}}}, null, 2)}\n`);

// Every start tag's attributes in sorted order; raw text (script, style,
// textarea, title) and comments stay as they are. Values are kept as written.
function sortAttributes(html) {
  let out = '';
  let i = 0;
  const raw = /^(script|style|textarea|title)$/iu;
  while (i < html.length) {
    const lt = html.indexOf('<', i);
    if (lt === -1) { out += html.slice(i); break; }
    out += html.slice(i, lt);
    if (html.startsWith('<!--', lt)) {
      const end = html.indexOf('-->', lt + 4);
      const stop = end === -1 ? html.length : end + 3;
      out += html.slice(lt, stop); i = stop; continue;
    }
    const name = /^<([A-Za-z][A-Za-z0-9-]*)/u.exec(html.slice(lt, lt + 64));
    if (!name) { out += '<'; i = lt + 1; continue; }
    let j = lt + name[0].length;
    const attributes = [];
    let close = '>';
    for (;;) {
      while (j < html.length && /\s/u.test(html[j])) j += 1;
      if (j >= html.length) break;
      if (html[j] === '>') { j += 1; break; }
      if (html.startsWith('/>', j)) { close = '/>'; j += 2; break; }
      const start = j;
      while (j < html.length && !/[\s=>]/u.test(html[j]) && !html.startsWith('/>', j)) j += 1;
      if (j < html.length && html[j] === '=') {
        j += 1;
        const quote = html[j];
        if (quote === '"' || quote === "'") { const end = html.indexOf(quote, j + 1); j = end === -1 ? html.length : end + 1; }
        else while (j < html.length && !/[\s>]/u.test(html[j])) j += 1;
      }
      attributes.push(html.slice(start, j));
    }
    const key = (attribute) => attribute.split('=')[0].toLowerCase();
    attributes.sort((a, b) => (key(a) < key(b) ? -1 : key(a) > key(b) ? 1 : 0));
    out += `<${name[1]}${attributes.map((attribute) => ` ${attribute}`).join('')}${close}`;
    i = j;
    if (raw.test(name[1])) {
      const end = html.toLowerCase().indexOf(`</${name[1].toLowerCase()}`, i);
      const stop = end === -1 ? html.length : end;
      out += html.slice(i, stop); i = stop;
    }
  }
  return out;
}

const filesOf = (dir) => {
  if (!existsSync(dir)) return [];
  const found = [];
  const walk = (at) => { for (const name of readdirSync(at).sort()) { const path = join(at, name); if (statSync(path).isDirectory()) walk(path); else found.push(relative(dir, path)); } };
  walk(dir);
  return found;
};
const normal = (path) => (path.endsWith('.html') ? sortAttributes(readFileSync(path, 'utf8')) : readFileSync(path, 'utf8'));

const tool = mode === 'gate' ? 'tests/browser/first-paint-gate.browser.mjs' : 'scripts/snapshot-first-paint.mjs';
// A check starts the overlay from the committed snapshots, so the tool's
// writer reports what it rewrites against them.
if (mode === 'check') {
  for (const folder of own) {
    const from = join(PACKAGE_ROOT, 'src', 'smart', folder, 'static');
    const to = join(overlay, 'src', 'smart', folder, 'static');
    rmSync(to, {force: true, recursive: true});
    if (existsSync(from)) cpSync(from, to, {recursive: true});
  }
}
const result = spawnSync(process.execPath, [tool, root, `--config=${config}`, ...own], {cwd: overlay, stdio: mode === 'check' ? ['ignore', 'pipe', 'inherit'] : 'inherit', encoding: 'utf8'});

// A snapshot is written in the overlay's folders; it belongs to this
// repository's, with sorted attributes.
if (mode === 'snapshot') {
  for (const folder of own) {
    const from = join(overlay, 'src', 'smart', folder, 'static');
    const to = join(PACKAGE_ROOT, 'src', 'smart', folder, 'static');
    rmSync(to, {force: true, recursive: true});
    if (existsSync(from)) cpSync(from, to, {recursive: true});
    for (const file of filesOf(to).filter((name) => name.endsWith('.html'))) writeFileSync(join(to, file), sortAttributes(readFileSync(join(to, file), 'utf8')));
  }
}
if (mode === 'check') {
  const tail = (result.stdout ?? '').slice((result.stdout ?? '').lastIndexOf('\n{') + 1);
  let report = {};
  try { report = JSON.parse(tail); } catch { report = {failed: ['the snapshot tool printed no summary'], tooLarge: []}; }
  const stale = [];
  const missing = [];
  for (const folder of own) {
    const committed = join(PACKAGE_ROOT, 'src', 'smart', folder, 'static');
    const rendered = join(overlay, 'src', 'smart', folder, 'static');
    const want = filesOf(rendered);
    const have = new Set(filesOf(committed));
    for (const file of want) {
      const shown = relative(PACKAGE_ROOT, join(committed, file));
      if (!have.has(file)) missing.push(shown);
      else if (normal(join(committed, file)) !== normal(join(rendered, file))) stale.push(shown);
      have.delete(file);
    }
    for (const file of have) stale.push(`${relative(PACKAGE_ROOT, join(committed, file))} (no example)`);
  }
  const summary = {mode: 'check', order: 'attributes sorted', components: own.length, stale, missing, failed: report.failed ?? [], tooLarge: report.tooLarge ?? [], sheetDrift: report.sheetDrift ?? []};
  console.log(JSON.stringify(summary, null, 2));
  process.exitCode = (result.status ?? 1) !== 0 || stale.length || missing.length || summary.failed.length || summary.tooLarge.length ? 1 : 0;
} else {
  process.exitCode = result.status ?? 1;
}
