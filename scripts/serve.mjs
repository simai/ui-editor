#!/usr/bin/env node
// Serve the built editor (dist/) on loopback, UTF-8, for local use and tests.
//
//   node scripts/serve.mjs [--port 4730] [--base /sub/]
//
// --base serves the same files under a subfolder, to check that the static
// build works outside the site root.
import {createServer} from 'node:http';
import {existsSync, readFileSync, statSync} from 'node:fs';
import {dirname, extname, join, normalize, sep} from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const argument = (name, fallback) => {
  const at = process.argv.indexOf(name);
  return at > 0 ? process.argv[at + 1] : fallback;
};
const port = Number(argument('--port', '4730'));
const base = argument('--base', '/');
const TYPES = {'.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.map': 'application/json; charset=utf-8', '.svg': 'image/svg+xml; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2'};
if (!existsSync(ROOT)) {
  console.error('dist/ is missing: run node scripts/build-ui.mjs');
  process.exit(1);
}
createServer((request, response) => {
  let path = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
  if (!path.startsWith(base)) {
    response.writeHead(404).end();
    return;
  }
  path = path.slice(base.length - 1);
  if (path.endsWith('/')) path += 'index.html';
  const file = normalize(join(ROOT, path));
  if (!file.startsWith(ROOT + sep) || !existsSync(file) || !statSync(file).isFile()) {
    response.writeHead(404, {'content-type': 'text/plain; charset=utf-8'}).end('not found');
    return;
  }
  response.writeHead(200, {'content-type': TYPES[extname(file)] ?? 'application/octet-stream', 'cache-control': 'no-store'});
  response.end(readFileSync(file));
}).listen(port, '127.0.0.1', () => console.log(`editor: http://127.0.0.1:${port}${base}`));
