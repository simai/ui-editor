# Changes

The set `editor`, by its npm version `@simai-studio/editor`; component
versions in brackets.

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
