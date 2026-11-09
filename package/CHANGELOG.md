# Changes

The set `editor`, by its npm version `@simai-studio/editor`; component
versions in brackets.

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
