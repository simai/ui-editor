import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import test from 'node:test';

// ui-source tests/smart-studio-metadata-contract.test.mjs checks every owner
// reference fixture under src/smart; the set's component that carries one is
// checked here for the set's sf-editor.
const json = async (path) => JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));

test('the package owner reference fixtures use declared component inputs and meaningful data', async () => {
  for (const name of ['editor']) {
    const manifest = await json(`src/smart/${name}/smart.manifest.json`);
    const fixture = await json(`src/smart/${name}/studio.fixture.json`);
    const properties = manifest.inputs.properties;
    assert.deepEqual(Object.keys(fixture.props).filter((key) => !(key in properties)), [], `${manifest.id} fixture has unknown inputs`);
    const values = [...Object.values(fixture.props), ...(fixture.children ?? []).flatMap((child) => [child.text, ...Object.values(child.props ?? {})])];
    // sf-editor's data is one object, a Composition Document with nodes.
    const meaningful = (value) => value === true || (typeof value === 'number' && Number.isFinite(value)) || (typeof value === 'string' && value.trim().length > 0)
      || (value?.schema === 'simai.composition.document' && Boolean(value.root?.id));
    assert.ok(values.some(meaningful), `${manifest.id} fixture has no meaningful demonstration data`);
  }
});
