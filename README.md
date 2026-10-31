# SIMAI Editor

The reference page editor for SIMAI Framework and SIMAI Pro, in the line of
`simai/ui-admin` and `simai/ui-chat`. It proves the editing components on real
pages before products take them: the email editor (`simai/ui-mail`), Larena's
layout editor and documentation editing in Docara.

**Status: started 2026-10-31. Nothing is built yet.** The repository is private
until it passes acceptance.

## Two modes, one core

- **Layout.** Arrange and configure the parts of a page: the selection frame, a
  toolbar above the block, insertion between blocks and a properties panel
  (`sf-composition-overlay`).
- **Content.** Write: a flow of typing, Enter for a new block, `/` for the block
  menu, a bar over selected text and block parameters (`sf-content-editor`, to be
  built in ui-pro).

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
| [`prototypes/block-canvas.html`](prototypes/block-canvas.html) | Behaviour accepted for the layout mode (toolbar above the block) |
| [`prototypes/content-editor.html`](prototypes/content-editor.html) | Behaviour accepted for the content mode, with parameters and JSON, Markdown and HTML |

The prototypes are behaviour references in plain code, not code to copy.

## Licence

Free for small businesses (PolyForm Small Business 1.0.0) and for
non-commercial use (PolyForm Noncommercial 1.0.0); everyone else needs the SIMAI
Commercial License. See [LICENSE.md](LICENSE.md). The SIMAI Framework it builds
on is Apache-2.0. The author and sole rightholder is Rim Zabarov
([AUTHORS](AUTHORS)).
