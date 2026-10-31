#!/usr/bin/env node
// Fails when a file that git tracks (or would track) holds a local path or
// something shaped like a secret, or when a required repository file is
// missing.
//
//   node scripts/check-hygiene.mjs
//
// It complements, not replaces, a full secret scanner such as gitleaks.
import {execFileSync} from 'node:child_process';
import {existsSync, readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const REQUIRED = ['README.md', 'LICENSE.md', 'AUTHORS', 'CLAUDE.md', 'docs/STATUS.md', 'docs/GAPS.md', 'framework.lock.json', '.nvmrc', 'package-lock.json', '.github/workflows/quality.yml'];
const files = execFileSync('git', ['-C', ROOT, 'ls-files', '--cached', '--others', '--exclude-standard'], {encoding: 'utf8'}).split('\n').filter(Boolean);
const TEXT = /\.(m?js|ts|jsonl?|md|html|css|ya?ml|cff|txt|sh|py|eml)$|^(AUTHORS|\.gitignore|\.nvmrc)$/u;
const LOCAL = [
  [/\/Users\/[A-Za-z0-9._-]+/u, 'a macOS home path'],
  [/\/home\/[a-z][a-z0-9_-]*\//u, 'a Linux home path'],
  [/\/private\/(?:tmp|var)\//u, 'a temporary path'],
  [/[A-Z]:\\Users\\/u, 'a Windows home path'],
  [/file:\/\/\//u, 'a file URL'],
  [/\b[a-z0-9-]+\.test\//u, 'a local .test host'],
];
const SECRET = [
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/u, 'a private key'],
  [/\bAKIA[0-9A-Z]{16}\b/u, 'an AWS key id'],
  [/\bgh[pousr]_[A-Za-z0-9]{30,}/u, 'a GitHub token'],
  [/\bgithub_pat_[A-Za-z0-9_]{30,}/u, 'a GitHub token'],
  [/\bxox[abpr]-[A-Za-z0-9-]{10,}/u, 'a Slack token'],
  [/\bsk-[A-Za-z0-9]{32,}/u, 'an API key'],
  [/\b(?:password|passwd|secret|api[_-]?key|token)\s*[:=]\s*['"][^'"\s]{8,}['"]/iu, 'a credential assignment'],
];
const problems = [];
for (const file of REQUIRED) if (!existsSync(join(ROOT, file))) problems.push(`${file}: a required file is missing`);
for (const file of files) {
  if (/(^|\/)\.env(\.|$)/u.test(file)) problems.push(`${file}: an environment file is tracked`);
  if (!TEXT.test(file.split('/').pop())) continue;
  const lines = readFileSync(join(ROOT, file), 'utf8').split('\n');
  lines.forEach((line, index) => {
    for (const [pattern, what] of [...LOCAL, ...SECRET]) if (pattern.test(line)) problems.push(`${file}:${index + 1}: ${what}`);
  });
}
// A page nobody can reach from the front page is a page nobody reads: every
// docs/*.md must be reachable from README.md by following relative Markdown
// links (through docs/STATUS.md and the other pages, so a chain counts).
// (ui-mail found five such pages on 2026-10-29.)
const reachable = new Set();
const linksOf = (file) => [...readFileSync(join(ROOT, file), 'utf8').matchAll(/\]\(([^)\s#]+\.md)(?:#[^)]*)?\)/gu)]
  .map((match) => join(dirname(file), match[1]).replace(/\\/gu, '/'))
  .filter((path) => !path.startsWith('..'));
const walk = (file) => {
  if (reachable.has(file) || !existsSync(join(ROOT, file))) return;
  reachable.add(file);
  for (const link of linksOf(file)) walk(link);
};
walk('README.md');
for (const file of files.filter((name) => /^docs\/[^/]+\.md$/u.test(name))) {
  if (!reachable.has(file)) problems.push(`${file}: nothing links to it from README.md -- a page nobody can reach`);
}

if (problems.length) {
  console.error(problems.map((problem) => `FAIL ${problem}`).join('\n'));
  process.exit(1);
}
console.log(`hygiene: ok, ${files.length} files, required files present, no local paths, no secret-shaped strings, ${reachable.size} pages reachable from README`);
