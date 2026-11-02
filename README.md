# SIMAI Editor

The reference page editor for SIMAI Framework and SIMAI Pro, in the line of
`simai/ui-admin` and `simai/ui-chat`. It proves the editing components on real
pages before products take them: the email editor (`simai/ui-mail`), Larena's
layout editor and documentation editing in Docara.

**Status: step 5, the Content mode, built 2026-11-01** on Framework
`ui-2d39b617a719` and Pro `pro-1fcb47404ee8`: a page is a layout with one
content outlet and its content; the Layout mode selects, moves, copies, deletes
and inserts blocks, and the outlet opens SIMAI Pro's `sf-content-editor` for
typing in place, inside the outlet with the layout around it (a click on the
chosen outlet, a double click or Enter; Esc twice or a press on the layout
returns). Blocks, and the outlet itself, are inserted at the seam. The repository is private until it passes acceptance.

## Two modes, one core

- **Layout.** Arrange and configure the parts of a page: the selection frame, a
  toolbar above the block, insertion between blocks and a properties panel
  (`sf-composition-overlay`).
- **Content.** Write: a flow of typing, Enter for a new block, `/` for the block
  menu, a bar over selected text and block parameters (`sf-content-editor` from
  SIMAI Pro).

Both edit one format, the SIMAI Framework Composition Document: profile
`ui-layout` for layouts, `structured-content` for content. A layout holds content
through one node, so an author never breaks the layout.

## Rules

- **No components here.** Screens are assemblies of SIMAI Framework and SIMAI Pro
  components (owner decision D31, 2026-10-26). A missing component is ordered from
  the Framework if it is universal, from ui-pro if it belongs to the editor. A
  Framework gap goes to `simai/ui-source` as an issue.
- **JSON is the store.** HTML and Markdown are conversions. Markdown in Docara's
  syntax is written for documentation through Docara's own adapter, which keeps
  the source bytes.
- Commits, code and docs are in English; interface text is RU/EN through
  dictionaries.

## What is here

| Path | What it is |
|:---|:---|
| [`docs/STATUS.md`](docs/STATUS.md) | Decisions, plan and what each step must prove |
| [`docs/GAPS.md`](docs/GAPS.md) | What the pinned releases do not give yet, and who owns it |
| [`src/ui/`](src/ui) | The shell: the page, its wiring, the Layout mode's changes to a layout, the page store and the seeded pages (a layout and its content each) |
| [`locales/`](locales) | The RU/EN dictionaries |
| [`framework.lock.json`](framework.lock.json) | The pinned Framework release and Pro package, with their hashes |
| [`scripts/`](scripts) | Fetch and verify the pins, build, serve, the checks and the end-to-end runs |
| [`prototypes/block-canvas.html`](prototypes/block-canvas.html) | Behaviour accepted for the layout mode (toolbar above the block) |
| [`prototypes/content-editor.html`](prototypes/content-editor.html) | Behaviour accepted for the content mode, with parameters and JSON, Markdown and HTML |

The prototypes are behaviour references in plain code, not code to copy.

## Run it

Node 24 (`.nvmrc`) and Google Chrome for the end-to-end runs.

```sh
npm ci
node scripts/framework-fetch.mjs   # download the pins and check every hash
node scripts/build-ui.mjs          # dist/: a static site
node scripts/serve.mjs             # http://127.0.0.1:4730/
npm run check && npm run typecheck && npm run e2e
```

CI (`.github/workflows/quality.yml`) runs the same chain.

## Licence

Free for small businesses (PolyForm Small Business 1.0.0) and for
non-commercial use (PolyForm Noncommercial 1.0.0); everyone else needs the SIMAI
Commercial License. See [LICENSE.md](LICENSE.md). The SIMAI Framework it builds
on is Apache-2.0. The author and sole rightholder is Rim Zabarov
([AUTHORS](AUTHORS)).
