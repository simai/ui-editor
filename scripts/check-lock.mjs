#!/usr/bin/env node
// Offline checks of the pins: framework.lock.json names one exact Framework
// release and one exact Pro package with hashes (never latest), the page loads
// that pair and that package, and the Node pin agrees in .nvmrc, package.json
// and CI. The hashes themselves are checked online by framework-fetch.mjs.
//
//   node scripts/check-lock.mjs
import {readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => readFileSync(join(ROOT, file), 'utf8');
const lock = JSON.parse(read('framework.lock.json'));
const problems = [];
const expect = (ok, what) => { if (!ok) problems.push(what); };

const sha = (value, length) => typeof value === 'string' && new RegExp(`^[0-9a-f]{${length}}$`, 'u').test(value);
expect(lock.schema === 'simai.ui-editor.framework-lock' && lock.version === 1, 'lock: schema simai.ui-editor.framework-lock v1');
expect(sha(lock.ui?.commit, 40), 'lock: ui.commit is a full sha');
expect(lock.pair === `ui-${lock.ui?.commit?.slice(0, 12)}`, 'lock: pair is ui-<first 12 of ui.commit>');
expect(/^\d+\.\d+\.\d+$/u.test(lock.ui?.npm?.version ?? ''), 'lock: npm version is exact');
expect(lock.ui?.npm?.tarball === `https://registry.npmjs.org/${lock.ui?.npm?.package}/-/${lock.ui?.npm?.package?.split('/')[1]}-${lock.ui?.npm?.version}.tgz`, 'lock: tarball URL matches package and version');
expect(/^sha512-[A-Za-z0-9+/]{86}==$/u.test(lock.ui?.npm?.integrity ?? ''), 'lock: npm integrity is sha512');
expect(sha(lock.ui?.npm?.shasum, 40) && sha(lock.ui?.npm?.tarball_sha256, 64), 'lock: shasum and tarball sha256');
expect(sha(lock.ui?.package_manifest?.sha256, 64), 'lock: package-manifest sha256');
expect(sha(lock.ui_source?.commit, 40), 'lock: ui_source.commit is a full sha');
expect(lock.package?.name === 'larena' && /^larena-[0-9a-f]{12}$/u.test(lock.package?.release ?? ''), 'lock: the Pro package is one exact larena release');
expect(lock.package?.release === `larena-${lock.package?.source?.commit?.slice(0, 12)}` && sha(lock.package?.source?.commit, 40), 'lock: the package release is larena-<first 12 of its source commit>');
expect(lock.package?.tar === `https://github.com/${lock.package?.repository}/releases/download/${lock.package?.release}/package-larena.tar`, 'lock: the package tar is the release asset');
expect(sha(lock.package?.tar_sha256, 64) && sha(lock.package?.receipt_sha256, 64), 'lock: package tar and receipt sha256');
expect(!/latest|\/main\b/u.test(JSON.stringify([lock.ui, lock.package])), 'lock: no floating latest or main');

const page = read('src/ui/index.html');
expect(page.includes(`<meta name="sf-release" content="${lock.pair}">`), `src/ui/index.html: sf-release is the pinned pair (${lock.pair})`);
expect(page.includes(`packages: {larena: {base: '${lock.package?.base}'}}`), 'src/ui/index.html: declares the pinned package at its base');

const node = read('.nvmrc').trim();
const pkg = JSON.parse(read('package.json'));
expect(/^\d+\.\d+\.\d+$/u.test(node), '.nvmrc: exact Node version');
expect(read('.github/workflows/quality.yml').includes(`node-version: "${node}"`), `quality.yml: node-version "${node}"`);
expect(pkg.engines?.node === '>=24.11 <25' && node.startsWith('24.'), 'package.json engines: >=24.11 <25 and a Node 24 pin');
for (const [name, version] of Object.entries({...pkg.dependencies, ...pkg.devDependencies})) {
  expect(/^\d+\.\d+\.\d+$/u.test(version), `package.json: ${name} is pinned exactly`);
}

if (problems.length) {
  console.error(problems.map((problem) => `FAIL ${problem}`).join('\n'));
  process.exit(1);
}
console.log(`lock: ok, Framework ${lock.pair} (${lock.ui.npm.package}@${lock.ui.npm.version}), ${lock.package.release}, Node ${node}`);
