# SIMAI Editor

The reference page editor for SIMAI Framework and SIMAI Pro, in the line of
`simai/ui-admin` and `simai/ui-chat`. It proves the editing components on real
pages before products take them: the email editor (`simai/ui-mail`), Larena's
layout editor and documentation editing in Docara.

**Status: one block editor, C2, 2026-11-05** on Framework `ui-c759b3cb3e31`
and Pro `pro-4032e9f6f316`: a page is one Composition Document, layout and
text in one tree, edited by SIMAI Pro's `sf-editor` 1.2.0 (the owner's decision
of 2026-11-03). The shell gives it the page, the demo site's own blocks, the
site's theme, the person's rights and the demo data sources, and keeps every
change it sends. The two modes are gone. The acceptance scenarios run on the
component ([`docs/ONE-EDITOR.md`](docs/ONE-EDITOR.md)); what it does not do yet
is listed as gaps, scenario by scenario ([`docs/GAPS.md`](docs/GAPS.md)). The
repository is private until it passes acceptance.

Two launch modes, one editor (the owner's decision of 2026-11-05): the
standalone list mode with the demo pages is the default; `?mode=page` opens
one page that a host gives and takes back on save
([`docs/HOST-EMBED.md`](docs/HOST-EMBED.md)).

## One editor, one Document

A page is a SIMAI Framework Composition Document (profile `ui-layout`): the
site template's header and footer regions around the page's main region, with
sections, columns and text areas (`layout.area`) as blocks and the text inside
them. One editor edits it by depth: a click on text types, Esc climbs to the
block, its area, its section. One undo history serves typing and structure.
Who may change the layout and the template is the host's grant; an author
writes in the text areas.

## Rules

- **The set's components live in `package/` only.** Since the component sets
  decision (owner, 2026-11-03) this repository holds the set `editor`
  (`sf-editor`, [`package/README.md`](package/README.md)); it is written there
  and nowhere else. The editor screen outside `package/` stays an assembly of
  SIMAI Framework parts and the set. A missing universal part is ordered from
  the Framework; a Framework gap goes to `simai/ui-source` as an issue.
- **JSON is the store.** HTML and Markdown are conversions. Markdown in Docara's
  syntax is written for documentation through Docara's own adapter, which keeps
  the source bytes.
- Commits, code and docs are in English; interface text is RU/EN through
  dictionaries.

## What is here

| Path | What it is |
|:---|:---|
| [`package/`](package) | The component set `editor` (`sf-editor`): passport, source, tests and gates; a skeleton, not released yet |
| [`docs/STATUS.md`](docs/STATUS.md) | Decisions, plan and what each step must prove |
| [`docs/GAPS.md`](docs/GAPS.md) | What the pinned releases do not give yet, and who owns it |
| [`docs/HOST-EMBED.md`](docs/HOST-EMBED.md) | The single-page mode for hosts: the launch modes and the load/save contract |
| [`examples/`](examples) | The smallest host of the single-page mode |
| [`docs/ONE-EDITOR.md`](docs/ONE-EDITOR.md) | The one block editor's acceptance scenarios, run on the prototype and on `sf-editor` |
| [`src/ui/`](src/ui) | The shell: the page, its wiring to `sf-editor`, the demo site's blocks and data sources, the page store and the seeded pages |
| [`locales/`](locales) | The RU/EN dictionaries |
| [`framework.lock.json`](framework.lock.json) | The pinned Framework release and Pro package, with their hashes |
| [`scripts/`](scripts) | Fetch and verify the pins, build, serve, the checks and the end-to-end runs |
| [`prototypes/block-canvas.html`](prototypes/block-canvas.html) | Behaviour accepted for the former layout mode (toolbar above the block) |
| [`prototypes/content-editor.html`](prototypes/content-editor.html) | Behaviour accepted for the former content mode, with parameters and JSON, Markdown and HTML |
| [`prototypes/block-editor.html`](prototypes/block-editor.html) | Behaviour accepted for the one block editor (ui-control `0bb8dc4`, 2026-11-03), the scenarios' reference |

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
