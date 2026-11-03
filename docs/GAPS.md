# Gaps

What the editor needs and the pinned releases do not give yet. Each gap names
who owns it and what the editor does meanwhile. A Framework defect has a
`simai/ui-source` issue; an editor part is ordered from `simai/ui-pro`. A gap
closes when a pinned release brings the part and the workaround goes.

Pinned: Framework `ui-b8e23367889f` (`@simai-studio/ui@5.20261103.1629`),
Pro package `pro-bff42cdcb4f4` (`sf-editor` 1.0.2, [`framework.lock.json`](../framework.lock.json)).

| Id | Gap | Owner | Meanwhile | Closes when |
|:---|:---|:---|:---|:---|
| G-01 | `sf-resizer` inside `sf-drawer` stands off the panel's edge: the panel keeps a scrollbar's room at both sides | Framework, [simai/ui-source#59](https://github.com/simai/ui-source/issues/59) (open) | `src/ui/app.css` lets the panel overflow and scrolls its body instead, as ui-mail does | a release fixes #59; the two rules go |
| G-04 | `layout.columns` names the asset `composition/layout`, but no stylesheet ships for `.sf-composition-columns` (still none in `ui-b8e23367889f`) | Framework, [simai/ui-source#61](https://github.com/simai/ui-source/issues/61) | the seeded columns are drawn by sf-editor with the grid utilities it prints | the stylesheet ships |
| G-06 | No page-list part: rename, delete, order, a page's state. `sf-menu` lists the pages, but draws an item without `href` as plain text | ui-pro (an editor part), to order | each item gets `href="#page=<id>"` and the shell cancels `sf-menu-navigate` | ui-pro ships a page list over a storage port |
| G-07 | No storage port for documents: the Framework keeps view preferences (`SF.Preferences`), not documents | ui-pro or the Framework, to agree | `src/ui/pages.ts` keeps pages in IndexedDB (`ui-editor` / `pages`), in memory when IndexedDB is refused; the shell copies a template change into every page | a port is released and the store moves behind it |

### sf-editor in this shell (C2, rechecked on 1.0.2)

Found by the one-editor scenarios (`scripts/e2e-one-editor.mjs`, the
component driver's `differs` names each failing check's gap) and the shell's
own runs; open on `sf-editor` 1.0.2. All are ui-pro's (`simai/ui-pro`,
sf-editor) unless the row says otherwise; none has a workaround in the shell.

| Id | Gap | Scenarios | Closes when |
|:---|:---|:---|:---|
| G-20 | The catalogue has two tabs (Текст, Блоки) and the fixed groups; there is no one list with the sections Текст, Медиа, Элементы, Макет, Части страницы, Маркетинг, Данные, Формы, Сохранённые, no «back», and search does not name a result's section. The built-in types have no button, icon button, label, icon, container, grid or empty space, and no section «с областью текста», so the + between sections cannot open on sections | S02 (9 checks), S03 (3), S14 | the owner's one-list catalogue, with Part A's Элементы and Макет types |
| G-21 | `layout.section` has no variants, so no value can come from a variant («вариант») and «сбросить» has nothing to return to | S06 (2) | the built-in section has variants (Part A) |
| G-23 | The Data tab has a mapping preset («Как задано в источнике»), not the shape's fields mapped to the source's; a pagination seeded beside a list follows none («Блок в этой секции» is empty) and the Document has no binding to say it | S07 (3) | the field mapping, and the Document's form of a runtime binding a host can seed |
| G-25 | No editing of a block's own items in place (the features' points, a columns block's + at the right edge, «Добавить пункт», icons) | S19, S20 | the owner's second review is built |
| G-26 | Content blocks (a paragraph) have no visibility per screen; only sections and areas have «Скрыт» | S22 | every block has it |
| G-36 | A value equal to the type's default prints no class, even where a wider screen differs: columns `{xs: 1, md: 2}` print `md:grid-col-2` without `grid-col-1`, so on a phone the grid has one implicit `auto` column, which a wide child can stretch, not `grid-col-1` (`minmax(0, 1fr)`) | S05, S06 | the smallest screen's value is printed when a wider one differs |
| G-37 | The + opens its catalogue at the window's top-left corner: it is anchored to the `sf-button-icon` host, which is `display: contents` and has no box. In this shell the corner is under the left panel, so the options there cannot be pressed | S03 (stops at the + inside a text area) | the catalogue stands beside the + |
| G-38 | «Сделать блоком сайта» on a section makes a block of the section's content only (the hero): the builder has no section, so the section's own parameters («Фон») cannot be offered to the author | S08 (stops at «Секция · Фон») | a block made of a container keeps the container, or the difference is agreed |

## What sf-editor 1.0.2 closed

Repinned 2026-11-04 to `pro-bff42cdcb4f4` (`sf-editor` 1.0.2) on the same
pair. Its fixes and the workarounds that went with them:

- **G-22**: a screen value equal to the type's default is kept for that screen
  (S06: the phone has 1, the desktop keeps 2).
- **G-24**: the split hero's empty `media` place draws the host's prompt
  («Картинка или видео»); a press opens the catalogue narrowed to that place,
  and the picked picture goes into it (S11).
- **G-27**: after «Изменить шаблон» the editor still draws; the shell's check of
  choosing a page is a plain check again.
- **G-28**: «Результат» opens on the first press; the driver's second press went.
- **G-29**: refused classes are named.
- **G-30**: ↓ on the canvas with nothing chosen chooses the first block.
- **G-31**: axe finds nothing in any state; `scripts/e2e-a11y.mjs` allows nothing.
- **G-32**: the gutter no longer covers a block's text; the driver presses the
  line's start.
- **G-33**: «Разделить на колонки» is one undo step. Checked as written: one
  Ctrl+Z on the canvas reverts the split. The dialog «Результат» gives the focus
  back to its button on the bar, where the editor's keys rest by design, so
  after reading the output the driver goes back to the page first, as a person
  would.
- **G-34**: a side drop from the library puts the block beside the other one,
  and a side drop inside a column adds a column (S05).
- **G-35**: on a phone and at 400 % zoom the page does not scroll sideways.

The four checks left unclassified by C2 were checked by hand:

- **S04** (the grip drag of a list) was the driver's: a list's own 20 px beside
  its items was stepped over, so the hover found an item. The driver now tries
  a block's start; S04 passes.
- **S01** (a click on a section's frame) is a difference of design: a section
  draws no padding unless a value or the theme gives one, so in the default
  theme its area fills it and there is no frame of its own to press; Esc or the
  path chooses it.
- **S03** stops at G-37, **S08** at G-38.

## What sf-editor 1.0.0 closed (C2)

Repinned 2026-11-03 to `pro-c47fe37db37d` on `ui-b8e23367889f`. The one editor
replaced the Layout and Content modes, and with them:

- **G-15 to G-19** and their workarounds: the content's own sheet styles, the
  overlay parked while typing, the second-click listeners, one outlet per
  layout, two histories. A page is one Document; text areas are `layout.area`
  blocks, as many as it needs, and one undo serves typing and structure (S13).
- **G-05** (no properties panel), **G-08** (no Document operations, and
  `src/ui/document.ts`): sf-editor edits the Document and has its parameters panel.
- **G-03**: the page's root is `layout.regions`, its main region the page's
  `main` landmark; the shell has none of its own.
- **G-09 to G-12**, the overlay's: the overlay is not used.
- **G-14** and `src/ui/media.ts`: the one editor keeps no files (files are
  only in `sf-editor-content`, as the Framework's letter says).

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

## What `ui-3b75bb31a203` and `larena-68015a3b75a0` closed

Repinned 2026-11-01 from `ui-a7c68408a293` and `larena-7bc706e9a07f`.

- G-02 closed: plan step 5's `sf-content-editor` arrived in the `larena`
  package. The Content mode types in it, and `content.outlet` with
  `render(layout, {content})` puts the content in the layout.
- #59 to #63 are still open in simai/ui-source; their workarounds stay.

## What `larena-27366c53cfdf` closed

Repinned 2026-11-01 from `larena-68015a3b75a0`, on the same Framework pair.

- G-13 closed: `sf-content-editor` 1.0.1 writes a title edit to `data.title`,
  and its title is a textbox, not an `h1` (simai/ui-pro `c992336`, `4ac22ac`).
  The editor's guard and the a11y gate's allowance are gone;
  `scripts/e2e-content.mjs` checks that a typed title is saved and the page
  list follows it.

## What `ui-a823cf887c20` and `larena-779d07ef29e3` closed

Repinned 2026-11-01 from `ui-3b75bb31a203` and `larena-27366c53cfdf`.

- The owner's review of `sf-content-editor` 1.0.1 (simai/ui-pro `71b22c2`,
  1.1.0): the gutter stands outside the text, menus open at their trigger and
  the `/` menu at the caret, parameters go to the host's Properties panel
  (`parameters="host"`), and pictures can be dropped or pasted on the page.
- G-05 is closed for the Content mode: the right panel edits the chosen
  block's parameters. It stays open for the Layout mode.
- The editor keeps dropped and pasted pictures in IndexedDB (`ui-editor` /
  `media`, `src/ui/media.ts`); a picture outlives a reload in the editor and on
  the canvas. G-14 is new: the canvas draws them through a swap.
- Filed with the release: simai/ui-source #68 (`openFor` on a
  `display: contents` host anchors at 0,0; ui-pro anchors to the inner button),
  #69 (no menu offset: 4 px, not the specified 8), #70 (the Loader leaves
  elements in a closed `sf-popover` undefined; ui-pro renders the form on open)
  and #71 (G-14). #59 to #63 are still open; their workarounds stay.

## What `pro-1fcb47404ee8` closed

Repinned 2026-11-02 from `larena-f8939812c7f9`, with the Framework moved to
`ui-2d39b617a719`. The Pro package is now named `pro` (the owner's decision of
2026-11-02): its release and receipt come from `simai/ui-pro`, the page
declares `packages.pro` and the package is served from `pkg/pro/`. Released
`larena-<12>` ids above stay as they were.

- `sf-content-editor` 1.2.1 (simai/ui-pro `1a16a17`): steps take
  `sf-procedure`'s geometry, and the example names the 1.2 parameters.
- `sf-content-editor` 1.2.2 (simai/ui-pro `53b6aa6`), the owner's remarks on
  the docs example:
  - the + and the grip stand 4px outside a block's highlight, with their icons
    centred;
  - under 640px of sheet the + stands above the grip instead of going;
  - the quick toolbar covers no block's text;
  - the grip menu's keys are one size step smaller.

## What `larena-f8939812c7f9` closed

Repinned 2026-11-02 from `larena-86cd44526d9c`, with the Framework moved to
`ui-1232b187244c`, the pair that brings `content.file` 1.0.0.

- `sf-content-editor` 1.2.0 (simai/ui-pro `f893981`, the dispatcher's task):
  the File block. File is a kind in the + and / menus; an empty File block is
  the drop zone for any file; a document dropped on the page becomes a File
  block at the drop line; the block stores href, label, mime and size and draws
  the download-file row. The editor keeps the file in IndexedDB like a picture
  (G-14 covers file links too), and an empty File block outlives a reload as a
  note on the canvas.

## What `larena-86cd44526d9c` closed

Repinned 2026-11-01 from `larena-779d07ef29e3`, on the same Framework pair.

- `sf-content-editor` 1.1.1 (simai/ui-pro `86cd445`), the dispatcher's three
  small items on 1.1.0: Enter in the + menu search takes the first match and
  the new block keeps the focus; a kind is found by its English names in every
  language (`/div` in Russian); the gutter stands at a picture's top.
- Filed with it: simai/ui-source#72 (Enter in an `sf-context-menu` search field
  does nothing; ui-pro takes the first row meanwhile).
