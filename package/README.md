# The component set `editor`

This folder is the source of the component set `editor` (standard
`simai.component-set` 1.0.0 of SIMAI Framework), product «SIMAI Editor», Pro
licence: its passport `set.json`, the page editor under `src/smart/`, its
tests and the scripts that test, probe and stage it. The rest of this
repository is the reference editor screen, an assembly that uses the set.

| Folder | Element | What it is |
|:---|:---|:---|
| `src/smart/editor` | `sf-editor` | the one block editor: layout and text in one Composition Document edited by depth, with its library, catalogue, parameters, data bindings, block builder and page panel |

`sf-editor-inline` and `sf-editor-overlay` stay in the family `editor` but
belong to the Framework, not to this set. `sf-editor-content` is retired on
the Framework side as a dated alias of `sf-editor`.

The component came byte for byte from `simai/ui-pro`
`components/src/smart/editor` at `4032e9f6f316` (`sf-editor` 1.2.0, the
release `pro-4032e9f6f316`), with its unit test (`tests/editor-model.test.mjs`)
and its browser probes (`tests/browser/editor-*.browser.mjs`). Its history
before the move is there. The `pro` bundle keeps shipping it until it is
rebuilt from the sets; from this move on it is written here only.

**Version 1.0.0, released 2026-11-06** ([CHANGELOG.md](CHANGELOG.md)) through
the dispatcher's release route as `view`'s releases were: the build committed
under `dist/` with its receipt, the release lock `contracts/releases/editor-<12>.lock.json`,
the tag `editor-<12>` with a GitHub release, and `npm publish` of
`@simai-studio/editor` from the staged folder (`node scripts/stage-npm.mjs`).
Paid sets publish on the public npm registry (owner, 2026-11-05); nothing here
is published by this repository's own hand. One line connects it:

```html
<script src="https://cdn.jsdelivr.net/npm/@simai-studio/ui@5.20261106.1146/distr/core/js/core.min.js" data-sf-sets="editor@1.0.0"></script>
```

## Built against a pinned ui-source

The component imports the free SIMAI Framework by relative path
(`../../core/js/smart-base`). It is built and tested in an **overlay**:
ui-source at the revision `framework.lock.json` pins (from git, never a
working tree), with this folder's `src/` and `tests/` laid over it. A file
here may not replace a ui-source file.

The pin is `54c89e61ef9b`, the source of the released pair
`ui-1e5ec795a1ce` (core.runtime 1.30.0), the first whose name registry
names this set as the owner of `sf-editor`. The passport names the same
commit.

The editor screen beside this folder is pinned separately
(`framework.lock.json` at the repository root) to released pairs and to the
`pro` package until the set has a release of its own.

```bash
node scripts/test.mjs                                   # unit and contract suite in the overlay
node scripts/check-registry.mjs                         # passport against the name registry at ui-source main
node scripts/run-manifest-probes.mjs <free> <set build> # every probe.json, real Loader, set declared
node scripts/run-browser-probes.mjs <free> <set build>  # tests/browser/*.browser.mjs in a real browser
node scripts/run-first-paint.mjs check|gate <free> <set build>
```

`<free>` is the `distr` of the released pair, `<set build>` the build output
holding `smart/` (`wave-1/output/package/editor`). `scripts/gates.sh
<new workspace>` runs the whole chain over the commit at HEAD: two
byte-identical builds, the receipt, the suite, the registry, the manifest
and browser probes and the first paint. It reads the sibling checkouts
`../ui-source`, `../ui` and `../ui-builder` beside this repository, takes
Playwright from this repository's `node_modules` (`npm ci` at the root) and
fetches the browser that version names into `.playwright-browsers`
(ignored). CI runs the same chain (`.github/workflows/set-gates.yml`) when
`package/` changes.

The scripts and the passport and package-wide tests are copied from the
reference set `simai/ui-view` (`docs/SET-TEMPLATE.md` there says which parts
are generic); the set's literals are `editor`.
