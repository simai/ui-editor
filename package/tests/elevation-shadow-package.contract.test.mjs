import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync, readdirSync} from 'node:fs';
import {resolve} from 'node:path';

// The shadow rule of ui-source (contracts/elevation-shadow.json schema 2,
// tests/elevation-shadow.contract.test.mjs) over the package stylesheets:
// shadows by place (C20, owner 2026-11-08). A component reads one of four
// shadows, --sf-shadow-flat, -raised, -overlay or -modal, and nothing else: no
// numbered level (--sf-elevation-N--shadow, --sf-ui-shadow-N), no C16 step
// name (--sf-shadow-card, -popup, -popup-nested), no colour of its own. An
// overlay or a window stands on the popup surface. The free test walks
// src/smart of ui-source only, so the package half is written here.
//
// Until C20 the rule was elevation steps (a step's shadow with its surface);
// the page sheet (.sf-editor-frame) was exempt there because it keeps the page
// surface. By place it is raised, which takes no surface of its own.
const root = resolve(import.meta.dirname, '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');
// The set's folders (set.json components[].folder).
const PACKAGE = ['editor'];

const files = (directory, pattern) => {
  const found = [];
  const walk = (dir) => {
    for (const entry of readdirSync(resolve(root, dir), {withFileTypes: true})) {
      const path = `${dir}/${entry.name}`;
      if (entry.isDirectory()) walk(path);
      else if (pattern.test(entry.name)) found.push(path);
    }
  };
  walk(directory);
  return found;
};
const styles = PACKAGE.flatMap((name) => files(`src/smart/${name}`, /\.s?css$/u));
const strip = (css) => css.replace(/\/\*[\s\S]*?\*\//gu, '').replace(/^\s*\/\/.*$/gmu, '');

test('shadows: a package component reads one of the four places and nothing else', () => {
  const former = /--sf-(?:ui-shadow-(?:[1-5]|top)|elevation-[1-5]--(?:shadow|surface)|on-elevation-[1-5]--variant|shadow-card|shadow-popup(?:-nested)?|shadow--color-[a-z]+|shadow--rim)\b/gu;
  const offenders = [];
  for (const path of styles) {
    const css = strip(read(path));
    for (const [name] of css.matchAll(former)) offenders.push(`${path}: ${name}`);
    for (const line of css.split('\n')) {
      if (!/box-shadow\s*:/u.test(line)) continue;
      if (/rgba?\(|#[0-9a-f]{3}|color-mix\(/iu.test(line) && !/inset|--sf-focus|ring/u.test(line)) offenders.push(`${path}: ${line.trim()}`);
      if (/box-shadow\s*:\s*var\(--sf-blur-/u.test(line)) offenders.push(`${path}: ${line.trim()}`);
    }
  }
  assert.deepEqual(offenders, [], 'read --sf-shadow-flat, -raised, -overlay or -modal');
});

test('shadows: a package overlay or window stands on the popup surface', () => {
  const offenders = [];
  for (const path of styles) {
    const css = strip(read(path));
    if (/var\(--sf-shadow-(?:overlay|modal)\)/u.test(css) && !/var\(--sf-surface-popup(?:-nested)?[,)]/u.test(css)) {
      offenders.push(`${path}: an overlay or a window without the popup surface`);
    }
  }
  assert.deepEqual(offenders, []);
});
