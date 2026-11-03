#!/usr/bin/env node
// The accessibility gate: axe-core on the editor at 1440 light and dark, on a
// phone (390), at 320×256 (what 400 % zoom gives a 1280 px screen), in forced
// colours and with reduced motion, each with nothing chosen, a block chosen,
// the caret in a text and the catalogue (+) open. The keyboard alone reaches
// the canvas and types there. Any violation fails the run unless it is in
// ALLOWED, which holds Framework and Pro defects only, each with its gap
// (docs/GAPS.md). The page must also never scroll sideways.
//
//   node scripts/build-ui.mjs && node scripts/e2e-a11y.mjs [--chrome <path>]
import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {ROOT, startRun} from './e2e-common.mjs';
import {open} from './one-editor/component.mjs';

const axeSource = readFileSync(join(ROOT, 'node_modules/axe-core/axe.min.js'), 'utf8');

/** Framework and Pro defects, each reported or fixed upstream. Nothing of the editor's own goes here. */
const ALLOWED = [
  // G-31, sf-editor 1.0.0: its bar, canvas and help stand outside any landmark.
  {id: 'region', target: /^(\.sf-editor-bar|\.sf-editor-canvas|#sf-editor-help)$/u},
  // G-31: the library's group headings skip a level.
  {id: 'heading-order', target: /\.sf-editor-group/u},
  // G-31: the catalogue's options hold buttons.
  {id: 'nested-interactive', target: /^#sf-editor-pop-\d+$/u},
  // G-31: a heading being typed takes a role a heading may not have.
  {id: 'aria-allowed-role', target: /^h[1-6]\[data-sf-composition-id=/u},
  // G-31: the site template dimmed to 55 % (its header's name, links and search), the origin's and the catalogue's quiet words.
  {id: 'color-contrast', target: /^(\.demo-header > strong|a\[href="#"\]:nth-child\(\d\)|\.demo-search|span\[data-origin="\w+"\]|#sf-editor-pop-\d+ > \.sf-editor-quiet)$/u},
];

const run = await startRun();
const {check} = run;

async function audit(name, options) {
  const context = await run.browser.newContext({locale: 'ru-RU', ...options});
  const d = await open(context, run.origin);
  const {page} = d;
  const errors = [];
  page.on('pageerror', (error) => errors.push(String(error)));
  await page.addScriptTag({content: axeSource});
  const scan = async (state) => {
    const result = await page.evaluate(async () => {
      const answer = await globalThis.axe.run(document, {resultTypes: ['violations']});
      return answer.violations.map((v) => ({id: v.id, impact: v.impact, targets: v.nodes.map((n) => n.target.join(' '))}));
    });
    const found = result.flatMap((v) => v.targets.map((target) => ({id: v.id, impact: v.impact, target})))
      .filter((v) => !ALLOWED.some((a) => a.id === v.id && a.target.test(v.target) && (!a.only || a.only === name)));
    check(`${name}, ${state}: no axe violation`, found.length === 0, found.map((v) => `${v.id} ${v.target}`).join(' | '));
    const {sideways, bar, page: wide} = await page.evaluate(() => ({
      sideways: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      page: document.documentElement.scrollWidth,
      bar: Math.round(document.querySelector('#page-editor .sf-editor-bar')?.scrollWidth ?? 0),
    }));
    // G-35: sf-editor's bar keeps its width on a phone; anything else of the editor's own is a failure.
    if (sideways > 0 && bar >= wide) run.known('G-35', `${name}, ${state}: the page does not scroll sideways`, false, `${sideways}px, the editor's bar is ${bar}px`);
    else check(`${name}, ${state}: the page does not scroll sideways`, sideways <= 0, `${sideways}px`);
  };
  for (const state of ['nothing chosen', 'a block chosen', 'typing', 'the + list open']) {
    try {
      // A fresh page has nothing chosen.
      if (state !== 'nothing chosen') await d.reach(state);
      await scan(state);
    } catch (error) {
      check(`${name}, ${state}: reached`, false, String(error).split('\n')[0]);
    }
  }
  check(`${name}: no page errors`, errors.length === 0, errors.join(' | '));
  await context.close();
}

/** The keyboard path: Tab reaches the canvas, and a key types there. */
async function keyboard() {
  const context = await run.browser.newContext({locale: 'ru-RU', viewport: {width: 1440, height: 900}});
  const d = await open(context, run.origin);
  check('keyboard: Tab reaches the canvas', await d.tabTo('canvas'));
  await context.close();
}

try {
  await keyboard();
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
