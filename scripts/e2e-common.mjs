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
      const failed = steps.filter((step) => !step.pass);
      console.log(failed.length ? `e2e: ${failed.length} FAILED` : `e2e: ${steps.length} steps passed`);
      process.exit(failed.length ? 1 : 0);
    },
  };
}

/** Open the editor and wait until it has drawn its first page. */
export async function load(page, origin) {
  await page.goto(`${origin}/`);
  await page.waitForSelector('body[data-ready="true"]');
  await page.waitForTimeout(600);
}
