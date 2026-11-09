import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync, readdirSync} from 'node:fs';
import {resolve} from 'node:path';

// The elevation rule of ui-source (contracts/elevation-shadow.json,
// tests/elevation-shadow.contract.test.mjs) over the package stylesheets: whatever
// floats takes its step's surface and shadow together, and a step shadow used
// alone is an exemption with a reason. The package exemption left the free contract
// with the component, so it is written here.
const root = resolve(import.meta.dirname, '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');
// The set's folders (set.json components[].folder).
const PACKAGE = ['editor'];
const exemptions = [
];
// A step's shadow on a surface that must stay another one. The set moved
// sf-editor byte for byte from ui-pro 4032e9f (move, then improve), where no
// package-wide elevation test covered it; what it does on purpose is written here.
// A step is a numbered level (--sf-elevation-N--shadow with --sf-elevation-N--surface)
// or, since the C16 names of pair ui-d6f01121baca, a named one: --sf-shadow-card,
// -popup and -popup-nested with --sf-surface-card, -popup and -popup-nested.
const stepExemptions = [
  {file: 'src/smart/editor/js/templates/default.css', step: 'card', reason: 'the page sheet (.sf-editor-frame) is the site page itself, so it keeps the page surface (--sf-surface-page) and only lifts it off the canvas with the card shadow (step 1)'},
];

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

test('elevation: a package component does not float on a step shadow alone', () => {
  const allowed = new Set(exemptions.map(({file, token}) => `${file} ${token}`));
  const used = new Set();
  const offenders = [];
  for (const path of PACKAGE.flatMap((name) => files(`src/smart/${name}`, /\.s?css$/u))) {
    const source = read(path);
    for (const [token] of source.matchAll(/--sf-ui-shadow-[1-5]\b/gu)) {
      const id = `${path} ${token}`;
      if (allowed.has(id)) used.add(id);
      else offenders.push(id);
    }
    const steps = [
      ...[...source.matchAll(/--sf-elevation-([1-5])--shadow\b/gu)].map(([, step]) => [step, `--sf-elevation-${step}--surface`]),
      ...[...source.matchAll(/--sf-shadow-(card|popup-nested|popup)\b/gu)].map(([, step]) => [step, `--sf-surface-${step}`]),
    ];
    for (const [step, surface] of steps) {
      if (new RegExp(`${surface}(?![\\w-])`, 'u').test(source)) continue;
      if (stepExemptions.some((one) => one.file === path && one.step === step)) used.add(`${path} step ${step}`);
      else offenders.push(`${path}: step ${step} shadow without its surface`);
    }
  }
  assert.deepEqual(offenders, [], 'take --sf-elevation-N--shadow with --sf-elevation-N--surface, or exempt with a reason');
  for (const id of allowed) assert.ok(used.has(id), `${id}: exempt but no longer used; remove the exemption`);
  for (const {reason} of exemptions) assert.ok(reason.length > 40);
  for (const {file, step, reason} of stepExemptions) {
    assert.ok(used.has(`${file} step ${step}`), `${file} step ${step}: exempt but no longer used; remove the exemption`);
    assert.ok(reason.length > 40);
  }
});
