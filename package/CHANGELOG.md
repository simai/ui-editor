# Changes

The set `editor`, by its npm version `@simai-studio/editor`; component
versions in brackets.

## 1.6.3 — 2026-11-28

- `sf-editor` 1.6.3 also takes `simai.document-port` 1.0.3 (draft 3 with valid
  Composition case documents): it supports 1.0.0–1.0.3. The new edition changes
  no intent, answer or schema; its pages have `layout.regions` as their root,
  which the editor already draws. Still over SIMAI Framework `ui-4f5678e8c0ed`.

## 1.6.2 — 2026-11-28

- `sf-editor` 1.6.2: a page the SIMAI Framework render refuses (an invalid
  Document) is no longer drawn as an empty canvas you can type on. A bar
  names the reason and the page opens read-only, so nothing is saved over
  the stored page.
- `media:<id>` pictures are drawn through the render's `media(ref)` option
  with the host's `editor.media.url`; an unknown reference keeps the
  picture's placeholder.
- No more «no word … the key is shown» warnings for the Framework's
  catalogue words while its editor dictionary is still loading.
- Built over SIMAI Framework `ui-4f5678e8c0ed` (group build 20).
- This content was prepared as 1.6.1; that number was already taken by the
  lock-only re-release below, so it is released as 1.6.2.

## 1.6.1 — 2026-11-27

- The components of 1.6.0 (`sf-editor` 1.6.0), rebuilt over SIMAI Framework
  `ui-4f5678e8c0ed` (group build 20, ui-source `1b1b9ea75610`; npm
  `@simai-studio/ui@5.20261127.1637`, core.runtime 1.70.0): a site serves a
  set only over its own exact pair. No behaviour changed.

## 1.6.0 — 2026-11-27

- `sf-editor` 1.6.0 takes the page's storage through SIMAI Framework's
  `simai.document-port` 1.0.2, by `connectPort` beside the source port: it
  loads the page, saves every change as a draft against the revision, keeps
  the unsaved input when the storage is unreachable or the session ended,
  and on a conflict offers «Оставить мои» or «Взять сохранённую».
- `editor.media` {upload, url}: an image field uploads a file through the
  host and keeps its `media:<id>` reference; the canvas draws it from `url`.
- `readonly`, and by itself without `rights.save`: the page opens for reading
  only.
- Built over SIMAI Framework `ui-73df5d1b4d4c`, as 1.5.2.

## 1.5.2 — 2026-11-26

- Built over SIMAI Framework `ui-73df5d1b4d4c` (group build 19, ui-source
  `5e30b946fd0e`; npm `@simai-studio/ui@5.20261125.1855`, core.runtime
  1.69.0). `sf-editor` 1.5.2 is the same editor as 1.5.0; the number is
  above the simai/ui-pro copy's 1.5.1. The set still needs core.runtime
  1.43.0 or newer.

## 1.5.0 — 2026-11-22

- `sf-editor` 1.5.0: takes back the simai/ui-pro copy's 1.3.3 and 1.4.0
  (ui-pro f6c4382). Keys are named in the platform's marks through the
  Framework's sf-kbd helper (C04, DF-12): ⌘Z and ⌥↑ on a Mac, Ctrl+Z and
  Alt+↑ elsewhere. The library's favourite star is the Framework's toggle
  look of sf-button-icon (C393), with aria-pressed.
- Built over SIMAI Framework `ui-9ceecc24c988` (group build 15, ui-source
  `e7ea89e07a3a`; npm `@simai-studio/ui@5.20261121.928`, core.runtime
  1.65.0). The set still needs core.runtime 1.43.0 or newer.

## 1.4.0 — 2026-11-19

- `sf-editor` 1.2.4: over SIMAI Framework `ui-7fb26d395af2` a segmented
  track folds into its dropdown when its labels do not fit (sf-segmented
  1.6.0, C47). The heading level row keeps H1–H3 as a track at 1440:
  «More» is a compact button (⋯) that opens the editor's menu with H4–H6,
  and shows the chosen deeper level (H5) when there is one, instead of a
  dropdown field whose label and chevron took the track's room.
- The probes follow the pair: a card title is 14 on a phone (C34, C89); the
  accent section's roles are read outside the bg-primary place, whose own
  primary and on-primary are its ink and fill (C42 (4)); the parity probe
  measures the control a person sees when the level track is folded.
- `sf-editor` 1.2.5: the editor's menu (the block's ⋯, the heading level's
  H4–H6) is drawn only while open (`sf-menu-context` with `popup`); before,
  a closed menu that had entries stayed drawn at the window's bottom.
- `sf-editor` 1.3.0 (K-07, C102): the Structure tab is the Framework tree
  `sf-tree` (2.1.2) instead of the editor's own list with role tree: one Tab
  stop, the arrows walk the blocks, ArrowRight and ArrowLeft open and close a
  branch, Space or a press chooses the block, a closed branch stays closed. A
  locked block shows a lock icon. The set now requires `cl-tree`.
- `sf-editor` 1.3.1 (form study FM-1, FM-2, FM-5; C52, C153 (1), C22): the
  parameter groups, the page panel and the data groups are compact regions
  (`data-sf-density="compact"`); their fields take the default size instead
  of `size="1/2"` by hand. Fields stand `--sf-space-1` apart, groups
  `--sf-space-3` over a line. A field's label is in the text colour and
  regular, one step under the value as in `sf-form`, 14 on a phone.
- `sf-editor` 1.4.0: takes back the simai/ui-pro copy (1.2.6, 1.3.2) and
  TL-4 of the toolbar study (C184 (1)(3)). The bar and the chosen block's
  tool row are toolbars: one Tab stop each, ← → walk the buttons and wrap,
  Home and End go to the ends; the screen switch and a host's slot controls
  stay their own stops. On a grip ↓, the menu key and Shift+F10 open the
  block's menu (C164 (2)). The editor relates `cl-empty-state` (lazy), the
  error state of a failed fragment; the set now requires it.
  Right to left, the path chevrons and separators point the right way:
  the editor no longer turns `chevron_right` a second time over the
  Framework's icon layer.
- Built over SIMAI Framework `ui-dc9fc39aeb26` (ui-source `1dd18375cbc2`),
  which carries `simai.document-port` 1.0.0, `sf-form` and core's roving
  helper (npm `@simai-studio/ui@5.20261118.1205`, core.runtime 1.61.0). A
  Russian page includes `distr/core/lang/ru.js` (README). The set still
  needs core.runtime 1.43.0 or newer.

## 1.1.1 — 2026-11-09

- `sf-editor` 1.2.3: over SIMAI Framework `ui-b4a77681f0a7` the 1/3 control
  is 28 on a desktop (C27). The gutter's + and grip keep following
  `--sf-ui-1/3--control-height` (28 on a desktop, the phone step on a
  phone), with no local size. The gutter stands in the canvas's start inset,
  which grows with the ladder, never at a negative offset: it stays inside
  the window at 1280, 1440 and 390. At 1440 the sheet is 788 wide beside
  the larger room. The gap between the gutter and its block is a space
  token (`--sf-space-1/4`) instead of a number in the script; the drawing is
  the same.
- The parity probe reads the 1/3 control and the gutter's room from the
  tokens: + and the grip are a 1/3 control high, the sheet fills the canvas
  beside the room, and the gutter stays inside the window at 1440 and 390.
- Built over SIMAI Framework `ui-b4a77681f0a7` (ui-source `a29cc9989beb`,
  npm `@simai-studio/ui@5.20261109.1121`, core.runtime 1.47.0). The set
  still needs core.runtime 1.43.0 or newer.

## 1.1.0 — 2026-11-09

- `sf-editor` 1.2.2: the editor writes the names of SIMAI Framework
  `ui-d6f01121baca` instead of their dated aliases, which leave on
  2027-01-01: `sf-segmented` (appearance `track`) for `sf-button-group`
  (appearance `segmented`), relation `cl-segmented` for `cl-button-group`;
  appearance `ghost` for `link` on `sf-button`; the theme roles
  `--sf-surface-page`, `--sf-surface-area`,
  `--sf-on-surface-container-variant`, `--sf-surface-state-hover`,
  `--sf-primary-state-select` and `--sf-shadow-card` for `--sf-surface-0`,
  `--sf-surface-1`, `--sf-on-surface-container--variant`,
  `--sf-surface-transparent-hover`, `--sf-primary-transparent-select` and
  `--sf-elevation-1--shadow`. The editor draws the same.
- Shadows by place (C20): the four floating panels (help, the floating block
  toolbar, the catalogue, the lock note) stand on the overlay place, `--sf-surface-popup`,
  `--sf-shadow-overlay` and `--sf-on-surface-popup-variant`, for the
  `--sf-elevation-2` roles; the page sheet takes `--sf-shadow-raised` for
  `--sf-shadow-card`. The former names stay until 2027-01-01. The panels
  take C20's overlay look (approved by the owner).
- The reference names one `args` object per action (standard §4.4, the
  pair's generator); the actions already took it beside the fields in order.
  First-paint snapshots retaken over the pair.
- Built over SIMAI Framework `ui-cb287da78ab1` (ui-source `44a5efda6649`,
  npm `@simai-studio/ui@5.20261109.559`, core.runtime 1.45.0), the first
  pair that carries the shadow places (C20). A minor version: the set now
  needs core.runtime 1.43.0 or newer (it needed 1.25.0), since an older pair
  has no `sf-segmented`, none of these names and no shadow places.

## 1.0.1 — 2026-11-08

- `sf-editor` 1.2.1: the canvas draws the page with Composition render
  `options.embedded`, so the page's main landmark is not nested in the
  editor's own (SIMAI Framework ui-source #60); the HTML a site prints keeps
  its landmarks.
- Built over SIMAI Framework `ui-0c23f6a0af12` (ui-source `da48ba8fde77`,
  npm `@simai-studio/ui@5.20261108.1449`, core.runtime 1.39.0); still runs
  with core.runtime 1.25.0 or newer (an older pair ignores the option).

## 1.0.0 — 2026-11-06

- First version of the set: `sf-editor` (1.2.0), the one block editor,
  moved from the SIMAI Pro package (ui-pro `4032e9f6f316`, the release
  `pro-4032e9f6f316`) with no change in behaviour.
- Built over SIMAI Framework `ui-1e5ec795a1ce` (ui-source `54c89e61ef9b`,
  core.runtime 1.30.0), the first pair whose name registry names this set as
  the owner of `sf-editor`; needs core.runtime 1.25.0 or newer.
- `sf-editor-inline` and `sf-editor-overlay` stay the Framework's;
  `sf-editor-content` is retired on the Framework side as a dated alias of
  `sf-editor`.
