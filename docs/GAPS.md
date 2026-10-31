# Gaps

What the editor needs and the pinned releases do not give yet. Each gap names
who owns it and what the editor does meanwhile. A Framework defect has a
`simai/ui-source` issue; an editor part is ordered from `simai/ui-pro`. A gap
closes when a pinned release brings the part and the workaround goes.

Pinned: Framework `ui-2194bce0e673` (`@simai-studio/ui@5.20261031.1043`),
Pro package `larena-5a2ae14a0ea0` ([`framework.lock.json`](../framework.lock.json)).

| Id | Gap | Owner | Meanwhile | Closes when |
|:---|:---|:---|:---|:---|
| G-01 | `sf-resizer` inside `sf-drawer` stands off the panel's edge: the panel keeps a scrollbar's room at both sides | Framework, [simai/ui-source#59](https://github.com/simai/ui-source/issues/59) (open) | `src/ui/app.css` lets the panel overflow and scrolls its body instead, as ui-mail does | a release fixes #59; the two rules go |
| G-02 | No `sf-content-editor`: the Content mode has nothing to type in | ui-pro (plan step 5) | the Content mode shows an `sf-empty-state` placeholder | ui-pro releases it in a `larena` package |
| G-03 | `layout.page` renders `<main>`, so a page document on the editor's canvas nests a second main landmark | Framework, [simai/ui-source#60](https://github.com/simai/ui-source/issues/60) | the seeded documents have a `layout.section` root | render can draw a page without a top-level landmark |
| G-04 | `layout.columns` names the asset `composition/layout`, but no stylesheet ships for `.sf-composition-columns` | Framework, [simai/ui-source#61](https://github.com/simai/ui-source/issues/61) | the seeded documents use no columns | the stylesheet ships |
| G-05 | No properties panel for a selected node: the overlay selects, but nothing edits a node's data and props | Framework (plan step 1, the overlay's toolbar and panel) | the right panel names the selected node's type and id | the overlay or ui-pro ships the panel |
| G-06 | No page-list part: rename, delete, order, a page's state. `sf-menu` lists the pages, but draws an item without `href` as plain text | ui-pro (an editor part), to order | each item gets `href="#page=<id>"` and the editor cancels `sf-menu-navigate` | ui-pro ships a page list over a storage port |
| G-07 | No storage port for documents: the Framework keeps view preferences (`SF.Preferences`), not documents | ui-pro or the Framework, to agree (the email editor's port is the nearest model) | `src/ui/pages.ts` keeps pages in IndexedDB (`ui-editor` / `pages`), in memory when IndexedDB is refused | a port is released and the store moves behind it |

The overlay's toolbar above the block and its insertion places (plan step 1)
are not gaps: they arrive with the Framework release that the SIMAI Framework
thread is preparing, and the editor takes them by a repin.
