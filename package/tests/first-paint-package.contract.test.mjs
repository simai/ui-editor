import assert from 'node:assert/strict';
import {existsSync, readFileSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';
import {describe, exampleFiles, givesLateData, sizeProblem} from '../scripts/first-paint-lib.mjs';

// The first paint of the package components (standard simai.smart-component
// 1.3.8 §5.4, gate 24): each example has its committed static markup, written
// by scripts/run-first-paint.mjs snapshot from the built bytes and checked by
// its `check` and `gate` modes. This holds what needs no browser: the files
// are there, and a skeleton.html is the element's own loading render.

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const smart = join(root, 'src', 'smart');
// The set's folders (set.json components[].folder).
const PACKAGE = ['editor'];

test('every example of every package component has its static markup and sheets', () => {
  for (const folder of PACKAGE) {
    const component = describe(smart, folder);
    assert.ok(existsSync(join(component.dir, 'static', 'sheets.json')), `${folder}: static/sheets.json`);
    for (const example of component.examples) {
      const files = exampleFiles(component, example);
      assert.ok(existsSync(files.html), `${folder}/${example.name}: ${files.html}`);
      // An explicitly empty list is data, the empty state: no skeleton for it.
      const late = givesLateData(component, example);
      assert.equal(existsSync(files.skeleton), late, `${folder}/${example.name}: a skeleton exactly when the example gives late data`);
      // The size gate of ui-source's snapshot tool, held here without a browser.
      for (const file of [files.html, files.skeleton].filter((one) => existsSync(one))) {
        assert.equal(sizeProblem(example, readFileSync(file).length), null, file);
      }
    }
  }
});
