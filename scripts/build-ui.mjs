#!/usr/bin/env node
// Build the static editor into dist/.
//
//   node scripts/framework-fetch.mjs   # once: the verified Framework in .cache/
//   node scripts/build-ui.mjs
//
// dist/ is a static site: index.html, app.js (one esbuild bundle of src/ui),
// app.css, the demo picture under demo/, the pinned Framework distr/ under fw/ and the pinned Pro package
// under pkg/. Relative paths only, so it works at a site root and in a subfolder.
import {cpSync, existsSync, mkdirSync, readFileSync, rmSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {build} from 'esbuild';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const lock = JSON.parse(readFileSync(join(ROOT, 'framework.lock.json'), 'utf8'));
const cache = join(ROOT, '.cache', 'framework', lock.ui.npm.version);
const framework = join(cache, 'x', 'package', 'distr');
const pro = join(cache, lock.package.release, 'x', 'smart');
if (!existsSync(framework) || !existsSync(pro)) {
  console.error('The Framework is not fetched yet: run node scripts/framework-fetch.mjs');
  process.exit(1);
}
const out = join(ROOT, 'dist');
rmSync(out, {recursive: true, force: true});
mkdirSync(out, {recursive: true});
await build({
  entryPoints: [join(ROOT, 'src/ui/app.ts')],
  bundle: true,
  format: 'esm',
  target: 'es2022',
  outfile: join(out, 'app.js'),
  sourcemap: true,
  legalComments: 'none',
  logLevel: 'warning',
});
cpSync(join(ROOT, 'src/ui/index.html'), join(out, 'index.html'));
cpSync(join(ROOT, 'src/ui/app.css'), join(out, 'app.css'));
// The demo site's picture, which its blocks and sources show.
cpSync(join(ROOT, 'src/ui/demo'), join(out, 'demo'), {recursive: true});
cpSync(framework, join(out, 'fw'), {recursive: true});
cpSync(pro, join(out, lock.package.base), {recursive: true});
console.log(`editor: dist/ built against ${lock.pair} and ${lock.package.release}`);
