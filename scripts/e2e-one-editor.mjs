#!/usr/bin/env node
// The one block editor's acceptance scenarios (scripts/one-editor/scenarios.mjs,
// docs/ONE-EDITOR.md), each on a fresh page.
//
// --target component (the default): against the one editor of the pinned Pro
//   package (`package.one_editor` in framework.lock.json), in this
//   repository's shell.
// --target prototype: against prototypes/block-editor.html, the accepted
//   behaviour, to prove the scenarios themselves.
// A check a driver is known to fail (its `differs`: the prototype's defects,
// the component's gaps in docs/GAPS.md) is reported, not failed; a scenario
// that stops at a known gap likewise.
//
//   node scripts/e2e-one-editor.mjs [--target component|prototype] [--only S05] [--chrome <path>]
import {existsSync, readFileSync} from 'node:fs';
import {join} from 'node:path';
import {ROOT, argument} from './e2e-common.mjs';
import {scenarios} from './one-editor/scenarios.mjs';

const target = argument('--target', 'component');
const only = argument('--only', null);
const chosen = scenarios.filter((s) => !only || only.split(',').includes(s.id));

if (target === 'component') {
  const lock = JSON.parse(readFileSync(join(ROOT, 'framework.lock.json'), 'utf8'));
  const tag = lock.package.one_editor;
  if (!tag || !existsSync(join(ROOT, 'scripts/one-editor/component.mjs'))) {
    for (const s of chosen) console.log(`skip ${s.id} ${s.name}`);
    const why = tag ? `the driver for ${tag} in ${lock.package.release} is not written yet (C2)` : `${lock.package.release} has no one editor yet (Part B of the one-editor assignment)`;
    console.log(`e2e: ${chosen.length} scenarios skipped: ${why}`);
    process.exit(0);
  }
}

const {startRun} = await import('./e2e-common.mjs');
const driver = await import(target === 'prototype' ? './one-editor/prototype.mjs' : './one-editor/component.mjs');
const run = await startRun();
const counts = {passed: 0, skipped: 0, known: []};
for (const s of chosen) {
  const missing = (s.needs ?? []).filter((need) => driver.lacks?.[need]);
  if (missing.length) {
    counts.skipped += 1;
    console.log(`skip ${s.id} ${s.name} (${missing.map((need) => driver.lacks[need]).join('; ')})`);
    continue;
  }
  console.log(`---- ${s.id} ${s.name}`);
  const context = await run.browser.newContext({viewport: {width: 1440, height: 900}, locale: 'ru-RU'});
  const errors = [];
  try {
    const d = await driver.open(context, run.origin);
    d.page.on('pageerror', (error) => errors.push(String(error)));
    await s.run(d, (name, pass, detail) => {
      const known = driver.differs?.[`${s.id}: ${name}`];
      if (known && !pass) {
        counts.known.push(`${s.id}: ${name}`);
        console.log(`known ${s.id}: ${name} (${known})${detail ? ` [${String(detail).slice(0, 300)}]` : ""}`);
      } else run.check(`${s.id}: ${name}`, pass, detail);
    });
    run.check(`${s.id}: no page errors`, errors.length === 0, errors.join(' | '));
    counts.passed += 1;
  } catch (error) {
    const known = driver.differs?.[`${s.id}: the scenario finished`];
    const detail = error.stack.split('\n').slice(0, 3).join(' ');
    if (known) {
      counts.known.push(`${s.id}: the scenario finished`);
      console.log(`known ${s.id}: the scenario finished (${known}; ${detail.slice(0, 160)})`);
    } else run.check(`${s.id}: the scenario finished`, false, detail);
  }
  await context.close();
}
console.log(`one editor on the ${driver.name}: ${counts.passed} scenarios run, ${counts.skipped} skipped, ${counts.known.length} known differences`);
await run.finish();
