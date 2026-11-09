# Changes

The set `editor`, by its npm version `@simai-studio/editor`; component
versions in brackets.

## 1.1.0 — unreleased

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
- Built over SIMAI Framework `ui-d6f01121baca` (ui-source `277ef3bf9dfe`,
  npm `@simai-studio/ui@5.20261108.2127`, core.runtime 1.42.0). A minor
  version: the set now needs core.runtime 1.43.0 or newer (it needed 1.25.0),
  since an older pair has no `sf-segmented`, none of these names and no
  shadow places. Built over `ui-d6f01121baca` the shadow places are not
  there yet: the release waits for the pair that carries C20, or is cut
  from the commit before them (then it needs 1.42.0).

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
