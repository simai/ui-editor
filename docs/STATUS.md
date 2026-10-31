# Status

## Owner decisions

| Date | Decision |
|:---|:---|
| 2026-10-31 | The block toolbar sits above the block (prototype `block-canvas.html`) |
| 2026-10-31 | One core, two modes: layout and content |
| 2026-10-31 | JSON is the main store of content, with HTML support and conversion; content builds on the Framework's layout standard |
| 2026-10-31 | The editor also edits Docara's blocks, and saves Markdown in Docara's syntax for documentation |
| 2026-10-31 | Everything runs on Framework components; universal parts go to the free Framework, editor parts to Pro |
| 2026-10-31 | The plan below; this repository; one shared PHP renderer for Docara and Larena |

The full reasoning, the Framework and Docara threads' answers and the open
points are kept in the dispatcher's control plane:
`control/ui-mail/CONTENT-STANDARD-PROPOSAL.md` (section 9) and
`control/ui-mail/BLOCK-CANVAS-SPEC.md` in `simai/ui-control`.

## Plan

| Step | Owner | What it delivers | Done when |
|:---|:---|:---|:---|
| 1 | Framework | Selection, toolbar and insert in `sf-composition-overlay`, letters patched block by block | probes show no reload and no jump; existing callers unchanged |
| 2 | Framework | Inline model keeps unknown nodes (the `toSegments` fix), an inline component atom | an edit next to an unknown node keeps it |
| 3 | Framework | Content types of the first edition and missing display parts (card, figure, vertical numbered list) | each type renders, validates and edits |
| 4 | Framework, then a new package | A conformance kit (Document to HTML), then one PHP renderer shared by Docara and Larena | the PHP renderer passes the kit; package name and place agreed with the owner |
| 5 | ui-pro and this repository | `sf-content-editor` and the block picker in ui-pro, proved here on real pages | both modes work together on a page here |
| 6 | Docara | A source-preserving Markdown adapter | Docara's own test: a real page saves byte for byte, one edit changes one range |
| 7 | Larena | Larena's storage | agreed with the Larena thread |

This repository starts with the shell (panels that resize and close, the page
list, the two modes switching) over pinned Framework and Pro releases, and takes
each part as it is released.

## Step 0: the shell

Built 2026-11-01 on Framework `ui-2194bce0e673` (`@simai-studio/ui@5.20261031.1043`)
and Pro `larena-5a2ae14a0ea0`, the newest released pair on that day.

| What | Proved by |
|:---|:---|
| The pins match their hashes: the npm tarball, every file of the package manifest, the Pro tar, its receipt naming this pair and the pinned sources | `scripts/framework-fetch.mjs` |
| One exact pair, never latest; the page loads that pair and that package; Node pinned alike in `.nvmrc`, `package.json` and CI | `scripts/check-lock.mjs` |
| No local paths, no secret-shaped strings, the required files, every doc reachable from the README | `scripts/check-hygiene.mjs` |
| The seeded page is a Composition Document (`ui-layout`) and the canvas holds exactly what `SF.Composition.render` draws | `scripts/e2e-shell.mjs` |
| A top bar of 32 px controls; both panels resize with `sf-resizer` (drag, arrows, double click, remembered) and close by their `left_panel_*` / `right_panel_*` toggles and ⌘\ / ⌥⌘\, remembered, with no tab stop left in a closed panel | `scripts/e2e-shell.mjs` |
| Layout mode: `sf-composition-overlay` selects a block and its frame stands on it, also after the panels close; Content mode: a placeholder until `sf-content-editor` | `scripts/e2e-shell.mjs` |
| The page list in IndexedDB: seeded, opened, a new page added, kept over a reload | `scripts/e2e-shell.mjs` |
| RU/EN dictionaries, the components' words too, kept over a reload | `scripts/e2e-shell.mjs` |
| axe-core finds nothing at 1440 light and dark, 390, 400 % zoom, forced colours and reduced motion, in both modes and with a block selected | `scripts/e2e-a11y.mjs` |

## Step 1: the Layout mode on the overlay

Built 2026-11-01 on Framework `ui-a7c68408a293` (`@simai-studio/ui@5.20261031.2233`,
ui-source `c2949690`) and Pro `larena-7bc706e9a07f`, the pair that brought
`sf-composition-overlay` 1.3.0. The shell's proofs above hold on this pair.

| What | Proved by |
|:---|:---|
| The repin: both pins match their hashes, and the Pro tar is the one its release receipt names (`output.archive_sha256`) | `scripts/framework-fetch.mjs` |
| The toolbar stands above the selected block (`placement="top"`) and never covers it: on select, after a move and after a scroll | `scripts/e2e-layout.mjs` |
| Icon actions, 32 px: drag, up, down, duplicate, delete, named in the interface language; what cannot be done where the block stands is dimmed (the first block cannot go up, the root cannot move) | `scripts/e2e-layout.mjs` |
| ⌥↓ and ⌥↑ move, ⌘D copies with fresh ids, ⌫ deletes and selects the next block; the buttons do the same; a drag by the grip moves | `scripts/e2e-layout.mjs` |
| One + at the seam under the pointer raises, under it, a simple list of the types the place accepts; the chosen one is inserted there and selected | `scripts/e2e-layout.mjs` |
| No jump: select and move keep the canvas's scroll and the frame on its block; on scroll the frame moves with its block in the same frame, with no script | `scripts/e2e-layout.mjs` |
| Every change is saved in IndexedDB and outlives a reload; an edit keeps the page list's order | `scripts/e2e-layout.mjs` |
| axe-core finds nothing with the toolbar shown and with the list of types open, at every size and scheme of step 0 | `scripts/e2e-a11y.mjs` |

What is missing is in [GAPS.md](GAPS.md).
