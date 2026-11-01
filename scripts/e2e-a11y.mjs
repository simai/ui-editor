#!/usr/bin/env node
// The accessibility gate: axe-core on the editor at 1440 light and dark, on a
// phone (390), at 320×256 (what 400 % zoom gives a 1280 px screen), in forced
// colours and with reduced motion, each in both modes, with a block selected
// (the overlay's toolbar above it) and with the list of types open. Any violation fails the run unless it is in ALLOWED, which holds
// Framework and Pro defects only, each with its issue or fix. The page must
// also never scroll sideways.
//
//   node scripts/build-ui.mjs && node scripts/e2e-a11y.mjs [--chrome <path>]
import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {ROOT, load, startRun} from './e2e-common.mjs';

const axeSource = readFileSync(join(ROOT, 'node_modules/axe-core/axe.min.js'), 'utf8');

/** Framework and Pro defects, each reported or fixed upstream. Nothing of the editor's own goes here. */
const ALLOWED = [];

const run = await startRun();
const {check} = run;

async function audit(name, options) {
  const context = await run.browser.newContext({locale: 'ru-RU', ...options});
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(String(error)));
  await load(page, run.origin);
  await page.addScriptTag({content: axeSource});
  const scan = async (state) => {
    const result = await page.evaluate(async () => {
      const answer = await globalThis.axe.run(document, {resultTypes: ['violations']});
      return answer.violations.map((v) => ({id: v.id, impact: v.impact, targets: v.nodes.map((n) => n.target.join(' '))}));
    });
    const found = result.flatMap((v) => v.targets.map((target) => ({id: v.id, impact: v.impact, target})))
      .filter((v) => !ALLOWED.some((a) => a.id === v.id && a.target.test(v.target) && (!a.only || a.only === name)));
    check(`${name}, ${state}: no axe violation`, found.length === 0, found.map((v) => `${v.id} ${v.target}`).join(' | '));
    const sideways = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    check(`${name}, ${state}: the page does not scroll sideways`, sideways <= 0, `${sideways}px`);
  };
  await scan('Layout');
  if (await page.evaluate(() => getComputedStyle(document.querySelector('#canvas')).display !== 'none')) {
    await page.evaluate(() => document.querySelector('#overlay').select('home-layout-title'));
    await page.waitForTimeout(300);
    await scan('a block selected');
    await page.evaluate(() => globalThis.uiEditor.offerTypes({parent_id: 'home-root', slot: 'default', index: 1}));
    await page.waitForTimeout(300);
    await scan('the list of types open');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);
  }
  await page.evaluate(() => globalThis.uiEditor.setMode('content'));
  await page.waitForTimeout(300);
  await scan('Content');
  check(`${name}: no page errors`, errors.length === 0, errors.join(' | '));
  await context.close();
}

try {
  await audit('1440 light', {viewport: {width: 1440, height: 900}, colorScheme: 'light'});
  await audit('1440 dark', {viewport: {width: 1440, height: 900}, colorScheme: 'dark'});
  await audit('phone 390', {viewport: {width: 390, height: 844}, isMobile: true, hasTouch: true});
  await audit('400 % zoom', {viewport: {width: 320, height: 256}});
  await audit('forced colours', {viewport: {width: 1440, height: 900}, forcedColors: 'active'});
  await audit('reduced motion', {viewport: {width: 1440, height: 900}, reducedMotion: 'reduce'});
} catch (error) {
  check('the run finished', false, error.stack);
} finally {
  await run.finish();
}
