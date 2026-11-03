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
| 2026-11-03 | Text typed in a layout's area, in place |
| 2026-11-03 | One block editor: layout and text in one editor over one Document; ui-editor writes its acceptance scenarios now and replaces the two modes after the ui-pro release |

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


## Step 5, here: the Content mode on `sf-content-editor`

Built 2026-11-01 on Framework `ui-3b75bb31a203` (`@simai-studio/ui@5.20261101.414`,
ui-source `b5a55fd0`) and Pro `larena-68015a3b75a0` (simai/ui-pro `68015a3`), the
pair that brought `sf-content-editor`. The proofs of steps 0 and 1 hold on it.

| What | Proved by |
|:---|:---|
| The repin: both pins match their hashes, the Pro tar is the one its receipt names, built for this pair from the pinned sources | `scripts/framework-fetch.mjs` |
| A page is two Documents: a layout (`ui-layout`) with one `content.outlet`, and its content (`structured-content`, root `content.document` under the page's title); the canvas is exactly `render(layout, {content})`, the content in the outlet | `scripts/e2e-shell.mjs` |
| In the Layout mode the outlet is one block: a click inside it chooses it, the properties panel names it | `scripts/e2e-content.mjs` |
| A double click on the outlet, or Enter while it is chosen, opens the Content mode with the caret in the first block (in place since 2026-11-03, below) | `scripts/e2e-content.mjs` |
| Typing, Enter for a new block and `## ` for a heading are saved in IndexedDB as the page's content; the layout is untouched | `scripts/e2e-content.mjs` |
| The first Esc chooses the block; the second brings the Layout mode back with the outlet chosen and focused, the typed text drawn in it | `scripts/e2e-content.mjs` |
| Another page chosen in the Content mode shows its content; the content outlives a reload | `scripts/e2e-content.mjs` |
| axe-core finds nothing in the Content mode at every size and scheme of step 0 | `scripts/e2e-a11y.mjs` |
| Repinned to `larena-27366c53cfdf` (`sf-content-editor` 1.0.1): a typed title is saved as the content's `data.title` and the page list follows it; the editor loads with the page, so the first switch is never blank | `scripts/e2e-content.mjs` |
| Repinned to `ui-a823cf887c20` and `larena-779d07ef29e3` (`sf-content-editor` 1.1.0, the owner's review): the gutter stands outside the text at 1440, 1024 and 375 px, the grip alone under a 640 px sheet; the + menu opens within 12 px of its button and the `/` menu at the caret, above it near the bottom; Esc gives the focus back | `scripts/e2e-content-ux.mjs` |
| The chosen block's parameters are in the right panel (`parameters="host"`); a change there is written and the quick toolbar follows it; a picture without alt says so | `scripts/e2e-content-ux.mjs` |
| A picture dropped on the page or pasted on an empty line is kept in IndexedDB (`media`) and outlives a reload in the editor and on the canvas | `scripts/e2e-content-ux.mjs` |
| A picture left without a file outlives a reload: the canvas draws a note in its place (any content block that fails the check is drawn so, never the page dropped), and the Content mode still offers the block a file | `scripts/e2e-content-ux.mjs` |
| Repinned to `larena-86cd44526d9c` (`sf-content-editor` 1.1.1): Enter in the + menu search takes the first match, the menu closes and the focus is not left on the +; beside a picture the gutter stands at its top; `/div` finds the divider in the Russian interface and the line becomes it | `scripts/e2e-content-ux.mjs` |
| Repinned to `larena-f8939812c7f9` on `ui-1232b187244c`. The File block (`content.file`, `sf-content-editor` 1.2.0): File in the + menu is a zone for any file; a file picked there or a document dropped on the page is kept in IndexedDB and stored with its address, name, type and size; an empty File block outlives a reload as a note on the canvas; after a reload the canvas offers the files to download from the store | `scripts/e2e-content-ux.mjs` |
| Repinned to `pro-1fcb47404ee8` on `ui-2d39b617a719`. The package is named `pro`: it is declared as `packages.pro` and served from `pkg/pro/`. `sf-content-editor` 1.2.2: the + and the grip stand clear of a block's highlight, the + stays on a narrow sheet, and the quick toolbar covers no text | `scripts/e2e-content-ux.mjs`, `scripts/check-lock.mjs` |
| Repinned to `pro-c47fe37db37d` on `ui-b8e23367889f` (2026-11-03): the package brings `sf-editor` 1.0.0, the one block editor, and `sf-editor-content` 1.3.0 (`sf-content-editor` stays its alias); the two modes pass unchanged | `scripts/framework-fetch.mjs`, `npm run e2e` |
| The content is typed in place (the owner's decision of 2026-11-03): the Content mode puts `sf-content-editor` in the outlet on the canvas, the layout around it in view; a click on the chosen outlet opens it at the block clicked, a press on the layout outside it brings the layout back with that block chosen. A layout with no outlet types in the editor's own view | `scripts/e2e-content.mjs`, `scripts/e2e-shell.mjs` |
| The seam's + offers the area for the content (`content.outlet`) while the layout has none; a heading and a paragraph typed in the new area are saved in the page's content, the area moves with ⌥↓, and after a reload the layout keeps it where it was moved and it shows what was typed | `scripts/e2e-content.mjs` |
| The keyboard alone: Tab to the page's tree, the arrows to the outlet, Enter to type in place, Esc twice back to the tree with the outlet chosen; axe-core finds nothing in the Content mode in place at every size and scheme | `scripts/e2e-a11y.mjs` |

## The one block editor, C1: acceptance scenarios

Written 2026-11-03 from the accepted prototype (ui-control `5003b6b`, then
`cadcfa8` after the owner's second and third reviews, then `0bb8dc4` with
its fixes and the width parts, copied to
`prototypes/block-editor.html`) and Part B of the assignment.

| What | Proved by |
|:---|:---|
| 22 scenarios over a driver: selection by depth, one catalogue, three ways to insert, moving, columns, parameter origins per screen, data, the block builder, the template, host rights, named places, the site's theme, one undo, several text areas, output (JSON, HTML modifiers, Markdown), the host's store, keyboard and axe, a block's own items, the columns' +, Markdown habits, visibility per screen | `scripts/one-editor/scenarios.mjs`, listed in [ONE-EDITOR.md](ONE-EDITOR.md) |
| On the prototype: 19 scenarios run, 146 checks pass; 3 skipped (Markdown output, host store, axe); no known differences left | `scripts/e2e-one-editor.mjs --target prototype` |
| On the component: all 22 skipped until the lock names it (C2, below) | `scripts/e2e-one-editor.mjs` |

The side panels at about 800 px wide stand over the canvas edge, and that is
intended: below 1024 px both panels start closed and slide over the canvas one
at a time (`src/ui/shell.ts`), so the canvas keeps its whole width; at 1024 px
and wider both are docked beside it.

## The one block editor, C2: sf-editor replaces the two modes

Built 2026-11-03 on `pro-c47fe37db37d` (`sf-editor` 1.0.0) over
`ui-b8e23367889f`. The Layout and Content modes, their tests
(`e2e-layout`, `e2e-content`, `e2e-content-ux`) and the G-15 to G-19
workarounds are gone; the proofs of the steps above stand for the commits
before C2. The rollback is to revert C2: a page kept before it keeps its
`layout` and `content` beside the composed `document`.

| What | Proved by |
|:---|:---|
| A page is one Composition Document (`ui-layout`): the site template's header and footer regions around the page's main region; sf-editor draws every node | `scripts/e2e-shell.mjs` |
| The host gives the demo site's types (variants, renderers, editor manifests, words), the theme and the rights, and answers the source port with three demo sources | `scripts/e2e-one-editor.mjs` (S07, S09, S10, S12) |
| Every change sf-editor sends is kept in IndexedDB and outlives a reload; a template change goes into every page; a new page takes the template; a page kept as a layout and its content opens as one Document | `scripts/e2e-shell.mjs` |
| The top bar, the page list's panel (resize, ⌘\, remembered, no tab stop when closed, sliding below 1024 px), RU/EN | `scripts/e2e-shell.mjs` |
| The acceptance scenarios on the component, on `sf-editor` 1.0.2 (`pro-bff42cdcb4f4`, 2026-11-04): 22 run, 91 checks pass, 38 known (each named by its gap or a difference of design), none failed; with the seeded look of 2026-11-04 | `scripts/e2e-one-editor.mjs`, [ONE-EDITOR.md](ONE-EDITOR.md) |
| axe-core at every size and scheme with nothing chosen, a block chosen, typing and the + open: no violation and nothing allowed; the page never scrolls sideways | `scripts/e2e-a11y.mjs` |

Repinned 2026-11-04 to `pro-bff42cdcb4f4` (`sf-editor` 1.0.2) on the same
pair: it closed G-22, G-24 and G-27 to G-35, and their workarounds went (the
second press of «Результат», the press past the gutter, the allowed axe
findings, the known checks in the shell and a11y runs). What is missing is in
[GAPS.md](GAPS.md).

## The look of the page (owner, 2026-11-04)

The owner found the real editor less good-looking than the prototype
(ui-control `control/ui-editor/visual-parity-2026-11-04`). Items 1 to 9 are
the Framework's (sf-editor's chrome, the section's defaults, the built-in
Элементы and Макет types); items 10 to 12 are the host's, done here:

| Item | What changed | Proved by |
|:---|:---|:---|
| 10 | The demo blocks draw as the prototype's, with Framework utilities and Smart elements only: the header has a logo mark, a menu and an `sf-input` search (a search button on a narrow header); the hero a lead size, a primary `sf-button` (the block's `action`) and a 4:3 picture with rounded corners; cards and features in rounded, outlined grids; a footer with its links. A block that changes with the width asks its own width (`query-container`, `cq-`), since the canvas draws a phone inside a computer's window. The seeded sections take the prototype's spacing, a soft hero and a primary features section | `scripts/e2e-look.mjs` (1440 light and dark, the phone screen) |
| 11 | Every seeded word is Russian when the interface is; a seeded page nobody changed follows a language switch | `scripts/e2e-look.mjs` |
| 12 | The host's bar is a thin strip (32 px, 24 px controls) over the editor's own bar | `scripts/e2e-look.mjs`, `scripts/e2e-shell.mjs` |

Found on the way: G-39 (the paragraph's `lead` prints nothing), and G-36
reaches the demo blocks' `cols` and `gap` ([GAPS.md](GAPS.md)). What still
differs from the prototype is the Framework's part: the editor's panels take
the width, so the sheet is 556 px, not 792; the template lock stands on a line
of its own; body text is 16 px in the canvas.

