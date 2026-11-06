// What every end-to-end run shares: a free port, the static server over dist/,
// headless Chrome and a list of named checks that fails the run at the end.
import {spawn} from 'node:child_process';
import {createServer} from 'node:net';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright-core';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

export const argument = (name, fallback) => {
  const at = process.argv.indexOf(name);
  return at > 0 ? process.argv[at + 1] : fallback;
};

export async function startRun() {
  const chrome = argument('--chrome', process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome');
  const port = await new Promise((resolve) => {
    const probe = createServer().listen(0, '127.0.0.1', () => {
      const {port: free} = probe.address();
      probe.close(() => resolve(free));
    });
  });
  const server = spawn(process.execPath, [join(ROOT, 'scripts/serve.mjs'), '--port', String(port)], {stdio: ['ignore', 'pipe', 'inherit']});
  await new Promise((resolve) => server.stdout.once('data', resolve));
  const browser = await chromium.launch({executablePath: chrome, headless: true});
  const steps = [];
  return {
    origin: `http://127.0.0.1:${port}`,
    browser,
    check(name, pass, detail = '') {
      steps.push({name, pass: Boolean(pass), detail: String(detail)});
      console.log(`${pass ? 'ok  ' : 'FAIL'} ${name}${detail ? ` (${detail})` : ''}`);
    },
    /** A check a pinned release fails by a known gap (docs/GAPS.md): reported, not failing the run, and named when it passes so the gap can close. */
    known(gap, name, pass, detail = '') {
      steps.push({name, pass: true, detail: String(detail)});
      console.log(`${pass ? `ok   (${gap} closed?)` : `gap  ${gap}:`} ${name}${detail ? ` (${detail})` : ''}`);
    },
    async finish() {
      await browser.close();
      server.kill();
      if (readyTimes.length) {
        const sorted = [...readyTimes].sort((x, y) => x - y);
        console.log(`ready: ${sorted.length} loads, median ${sorted[Math.floor(sorted.length / 2)]} ms, slowest ${sorted.at(-1)} ms (soft: typical under ${READY_TYPICAL_MS} ms, a hang after ${READY_MS} ms)`);
      }
      const failed = steps.filter((step) => !step.pass);
      console.log(failed.length ? `e2e: ${failed.length} FAILED` : `e2e: ${steps.length} steps passed`);
      process.exit(failed.length ? 1 : 0);
    },
  };
}

/**
 * How long a load may take to reach body[data-ready] before the run calls it
 * a hang: wide enough for a loaded machine (a gate beside other work). The
 * typical time is measured apart (`readyTimes`) and only reported.
 */
export const READY_MS = 15000;
/** The typical time a load reaches ready on an idle machine (about 0.5 s): above it, the run notes it. */
export const READY_TYPICAL_MS = 2000;
export const readyTimes = [];

/**
 * Keeps what a page says while it loads: console errors, page errors and
 * failed requests, for the explanation of a timeout. Watched once per page.
 */
const watched = new WeakMap();
export function watch(page) {
  if (watched.has(page)) return watched.get(page);
  const seen = {console: [], errors: [], failed: []};
  page.on('console', (message) => message.type() === 'error' && seen.console.push(message.text()));
  page.on('pageerror', (error) => seen.errors.push(String(error)));
  page.on('requestfailed', (request) => {
    const why = request.failure()?.errorText ?? 'failed';
    // A request the run refused on purpose (the prototype's CDN) explains nothing.
    if (!why.includes('BLOCKED_BY_CLIENT')) seen.failed.push(`${request.method()} ${request.url()}: ${why}`);
  });
  page.on('response', (response) => response.status() >= 400 && seen.failed.push(`${response.request().method()} ${response.url()}: HTTP ${response.status()}`));
  watched.set(page, seen);
  return seen;
}

/** What a page looks like now, for a timeout's message: its state, body dataset and what it said. */
export async function explain(page) {
  const seen = watch(page);
  const state = await page.evaluate(() => ({
    url: location.href,
    readyState: document.readyState,
    body: document.body ? {...document.body.dataset} : null,
    undefined: [...new Set([...document.querySelectorAll(':not(:defined)')].map((element) => element.localName))].slice(0, 10),
  })).catch((error) => ({unreadable: String(error).slice(0, 200)}));
  return JSON.stringify({...state, console: seen.console.slice(-5), errors: seen.errors.slice(-5), failed: seen.failed.slice(-8)});
}

/** Waits for body[data-ready]; a timeout says why. The time since `since` is kept as a soft metric. */
export async function ready(page, since = Date.now()) {
  watch(page);
  try {
    await page.waitForSelector('body[data-ready="true"]', {timeout: READY_MS});
  } catch (error) {
    throw new Error(`body[data-ready] not reached in ${READY_MS} ms: ${await explain(page)}`, {cause: error});
  }
  const took = Date.now() - since;
  readyTimes.push(took);
  if (took > READY_TYPICAL_MS) console.log(`note: a load took ${took} ms to reach ready (typical under ${READY_TYPICAL_MS} ms)`);
  return took;
}

/** Reloads and waits for ready, with the same explanation on a timeout. */
export async function reload(page) {
  watch(page);
  const since = Date.now();
  await page.reload({timeout: READY_MS});
  return ready(page, since);
}

/** Open the editor and wait until it has drawn its first page. */
export async function load(page, origin) {
  watch(page);
  const since = Date.now();
  await page.goto(`${origin}/`, {timeout: READY_MS});
  await ready(page, since);
  await page.waitForTimeout(600);
}
