#!/usr/bin/env node
// Download the pinned SIMAI Framework release into .cache/ and prove it is the
// one framework.lock.json names: the npm tarball's sha512 integrity and sha1
// shasum, the package's own release and commit, the sha256 of its
// package-manifest.json, and then every file the manifest lists.
//
//   node scripts/framework-fetch.mjs [--json]
//
// Exits non-zero on any mismatch. Writes nothing outside .cache/.

import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const lock = JSON.parse(readFileSync(join(root, 'framework.lock.json'), 'utf8'));
const args = new Set(process.argv.slice(2));
const report = { pair: lock.pair, checks: [] };

function check(name, pass, detail) {
  report.checks.push({ name, pass, detail });
  if (!pass) {
    finish(1);
  }
}

function finish(code) {
  const failed = report.checks.filter((c) => !c.pass);
  if (args.has('--json')) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    for (const c of report.checks) console.log(`${c.pass ? 'ok  ' : 'FAIL'} ${c.name}${c.detail ? ` (${c.detail})` : ''}`);
    console.log(failed.length ? 'Framework fetch: FAILED' : `Framework fetch: ${lock.pair} verified`);
  }
  process.exit(code);
}

const digest = (algorithm, bytes, encoding = 'hex') => createHash(algorithm).update(bytes).digest(encoding);

async function download(url) {
  const response = await fetch(url, { redirect: 'follow' });
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  return Buffer.from(await response.arrayBuffer());
}

function extract(archive, into, gzip) {
  rmSync(into, { recursive: true, force: true });
  mkdirSync(into, { recursive: true });
  // --no-same-owner and no absolute names: tar refuses paths outside `into`.
  execFileSync('tar', [gzip ? '-xzf' : '-xf', archive, '-C', into, '--no-same-owner'], { stdio: 'pipe' });
}

const npm = lock.ui.npm;
const uiDir = join(root, '.cache', 'framework', npm.version);
const tarball = join(uiDir, 'package.tgz');
mkdirSync(uiDir, { recursive: true });

const bytes = existsSync(tarball) ? readFileSync(tarball) : await download(npm.tarball);
if (!existsSync(tarball)) writeFileSync(tarball, bytes);

check('npm integrity sha512', `sha512-${digest('sha512', bytes, 'base64')}` === npm.integrity, npm.version);
check('npm shasum sha1', digest('sha1', bytes) === npm.shasum);
check('tarball sha256', digest('sha256', bytes) === npm.tarball_sha256);

extract(tarball, join(uiDir, 'x'), true);
const pkgDir = join(uiDir, 'x', 'package');
const pkg = JSON.parse(readFileSync(join(pkgDir, 'package.json'), 'utf8'));
check('package names the pinned release', pkg.simai?.release === lock.pair && pkg.simai?.commit === lock.ui.commit, pkg.simai?.release);
check('package licence', pkg.license === npm.license, pkg.license);

const manifestBytes = readFileSync(join(pkgDir, lock.ui.package_manifest.path));
check('package-manifest.json sha256', digest('sha256', manifestBytes) === lock.ui.package_manifest.sha256);
const manifest = JSON.parse(manifestBytes.toString('utf8'));
const entries = Object.entries(manifest.files);
check('package-manifest file count', entries.length === lock.ui.package_manifest.files, String(entries.length));

const mismatched = [];
for (const [path, sri] of entries) {
  const file = join(pkgDir, path);
  if (relative(pkgDir, file).startsWith('..') || !existsSync(file)) {
    mismatched.push(`${path}: missing`);
    continue;
  }
  if (`sha256-${digest('sha256', readFileSync(file), 'base64')}` !== sri) mismatched.push(path);
}
check('every manifest file matches', mismatched.length === 0, mismatched.slice(0, 5).join(', ') || `${entries.length} files`);

// The component package: the tar the lock names, and a receipt that says it was
// built for this pair from the pinned source.
const componentPackage = lock.package;
const packageDir = join(root, '.cache', 'framework', npm.version, componentPackage.release);
mkdirSync(packageDir, { recursive: true });
const pinned = async (url, file) => {
  const path = join(packageDir, file);
  if (!existsSync(path)) writeFileSync(path, await download(url));
  return readFileSync(path);
};
const tarBytes = await pinned(componentPackage.tar, 'package.tar');
check('package tar sha256', digest('sha256', tarBytes) === componentPackage.tar_sha256, componentPackage.release);
const receiptBytes = await pinned(componentPackage.receipt, 'package-receipt.json');
check('package receipt sha256', digest('sha256', receiptBytes) === componentPackage.receipt_sha256);
const receipt = JSON.parse(receiptBytes.toString('utf8'));
check('package is built for this pair', receipt.framework?.release === lock.pair, receipt.framework?.release);
check('package is built from the pinned Framework source', receipt.framework?.source?.revision === lock.ui_source.commit, receipt.framework?.source?.revision);
check('package comes from the pinned source', receipt.package_source?.revision === componentPackage.source.commit && receipt.package_source?.repository === componentPackage.source.repository);
extract(join(packageDir, 'package.tar'), join(packageDir, 'x'), false);
check('package holds its rule file', existsSync(join(packageDir, 'x', 'smart', 'rule.js')));

finish(0);
