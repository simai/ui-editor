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

**Skeleton, not a release.** Nothing here is tagged, staged or published:
there is no `dist/`, `package.json` is `private`, and the release route
(`editor-<12>`, npm `@simai-studio/editor`) waits for the dispatcher and the
owner, as for `view`.

## Built against a pinned ui-source

The component imports the free SIMAI Framework by relative path
(`../../core/js/smart-base`). It is built and tested in an **overlay**:
ui-source at the revision `framework.lock.json` pins (from git, never a
working tree), with this folder's `src/` and `tests/` laid over it. A file
here may not replace a ui-source file.

The pin is `ec2f29dfa5df`, the source of the released pair
`ui-62b1d9b6dc8d` (core.runtime 1.28.0). The passport names the same commit.
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
