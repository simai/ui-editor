# Gaps

What the editor needs and the pinned releases do not give yet. Each gap names
who owns it and what the editor does meanwhile. A Framework defect has a
`simai/ui-source` issue; an editor part is ordered from `simai/ui-pro`. A gap
closes when a pinned release brings the part and the workaround goes.

Pinned: Framework `ui-a7c68408a293` (`@simai-studio/ui@5.20261031.2233`),
Pro package `larena-7bc706e9a07f` ([`framework.lock.json`](../framework.lock.json)).

| Id | Gap | Owner | Meanwhile | Closes when |
|:---|:---|:---|:---|:---|
| G-01 | `sf-resizer` inside `sf-drawer` stands off the panel's edge: the panel keeps a scrollbar's room at both sides | Framework, [simai/ui-source#59](https://github.com/simai/ui-source/issues/59) (open) | `src/ui/app.css` lets the panel overflow and scrolls its body instead, as ui-mail does | a release fixes #59; the two rules go |
| G-02 | No `sf-content-editor`: the Content mode has nothing to type in | ui-pro (plan step 5) | the Content mode shows an `sf-empty-state` placeholder | ui-pro releases it in a `larena` package |
| G-03 | `layout.page` renders `<main>`, so a page document on the editor's canvas nests a second main landmark | Framework, [simai/ui-source#60](https://github.com/simai/ui-source/issues/60) | the seeded documents have a `layout.section` root | render can draw a page without a top-level landmark |
| G-04 | `layout.columns` names the asset `composition/layout`, but no stylesheet ships for `.sf-composition-columns` | Framework, [simai/ui-source#61](https://github.com/simai/ui-source/issues/61) | the seeded documents use no columns | the stylesheet ships |
| G-05 | No properties panel for a selected node: the overlay selects, moves, copies and deletes, but nothing edits a node's data and props | Framework or ui-pro, to order (overlay 1.3.0 brought the toolbar, not a panel) | the right panel names the selected node's type and id | the overlay or ui-pro ships the panel |
| G-06 | No page-list part: rename, delete, order, a page's state. `sf-menu` lists the pages, but draws an item without `href` as plain text | ui-pro (an editor part), to order | each item gets `href="#page=<id>"` and the editor cancels `sf-menu-navigate` | ui-pro ships a page list over a storage port |
| G-07 | No storage port for documents: the Framework keeps view preferences (`SF.Preferences`), not documents | ui-pro or the Framework, to agree (the email editor's port is the nearest model) | `src/ui/pages.ts` keeps pages in IndexedDB (`ui-editor` / `pages`), in memory when IndexedDB is refused | a port is released and the store moves behind it |
| G-08 | No edit operations over a Composition Document: the overlay sends intent (apply, move, insert) and the host changes the Document, but `SF.Composition` has no move, insert, remove or copy | Framework, to agree (the overlay's docs make it the host's) | `src/ui/document.ts`: locate, insert, remove, move, shift, duplicate with fresh ids, each returning a new Document | the Framework ships Document operations, or the overlay's docs settle that they stay the host's |
| G-09 | The overlay's action keys (⌥↑ ⌥↓ ⌘D ⌫) do nothing after a block is chosen by pointer on a `for` canvas: focus stays on the scroller, and the overlay listens on its tree and toolbar only | Framework, [simai/ui-source#62](https://github.com/simai/ui-source/issues/62) | `src/ui/app.ts` hands such a key from the canvas scroller to the overlay's tree (`[role="tree"]`) as a new `keydown` | a release takes the keys after a pointer selection; the handler goes |
| G-10 | `sf-tooltip` stands off its anchor inside `[data-sf-overlay-container]`: `contain: layout` makes the container the containing block of `position: fixed`, so the toolbar's tooltips stood a top bar low, over their buttons, and the grip could not be dragged | Framework, [simai/ui-source#63](https://github.com/simai/ui-source/issues/63) | the editor area is no container; `src/ui/app.css` puts the panels under the top bar with `--sf-drawer-block-start` and `--sf-drawer-dock-block-start` | not needed back: the drawer's own variables are the documented way; the issue stays for other hosts |
| G-11 | No block picker: the seam's + needs a list of what can go there | ui-pro (plan step 5) | the + opens `sf-context-menu` with the starter types (heading, paragraph, section) that the parent's slot accepts by `SF.Composition.BUILTIN_TYPE_MANIFESTS`; `layout.columns` is left out while it has no stylesheet (G-04) | ui-pro releases the picker |
| G-12 | `sf-composition-overlay-insert` names the place, not the + that was pressed, so a host cannot anchor its list to it | Framework, minor (not filed) | the editor finds the overlay's insertion button whose `data-key` is `<parent>\|<slot>\|<index>` and opens the list under its round mark (`.sf-composition-overlay-insert-mark`), internals that may change | the event carries its anchor, or the overlay opens a host list itself |

## What `ui-a7c68408a293` and `larena-7bc706e9a07f` closed

Repinned 2026-11-01 from `ui-2194bce0e673` and `larena-5a2ae14a0ea0`.

- Plan step 1 arrived: `sf-composition-overlay` 1.3.0 draws the toolbar above
  the selected block with icon actions and keys, one + at the seam under the
  pointer, gliding moves and no script on scroll. The Layout mode uses it
  (`scripts/e2e-layout.mjs`).
- Plan step 2's inline component atom arrived (`content.heading` and
  `content.paragraph` 1.1.0, `sf-inline-editor` 1.2.0). The editor takes it
  with `sf-content-editor` (G-02); nothing here uses it yet.
- Still open on this pair, checked again: #59 (without the two rules of G-01
  each handle stands 15 px off its edge), #60 (`layout.page` still renders
  `<main>`), #61 (no stylesheet for `.sf-composition-columns` in the package).
