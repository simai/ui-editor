# Embedding the editor on one page

The owner's decision of 2026-11-05: a host (Bitrix, Larena, the mail editor)
opens the editor for one concrete page. The page list belongs to the
standalone app only. One editor, two launch modes, no second app:

| Mode | How it starts | What it keeps |
|:---|:---|:---|
| List (default, the standalone demo) | `index.html` | the demo pages, in this browser's IndexedDB |
| Page (for hosts) | `index.html?mode=page` | nothing: the host gives the page and takes it back |

The mode is read from the address in the page's head, before the first
paint: the page mode never paints the page list, not for a frame, and no
part of the shell shows before its components are defined and styled.
Nothing is rebuilt. Proved by
`scripts/e2e-embed.mjs`; the smallest host is
[`examples/host-embed.html`](../examples/host-embed.html) (built to
`dist/examples/`, with the seeded home page as `page.ru.json` and
`page.en.json`).

## What the page mode shows

sf-editor alone: its library, canvas and parameters, with the host's
«Сохранить» and the language switch in its bar and the page's name as its
heading. The pages panel, its toggle, «Новая страница» and the note about
browser storage are not in the page at all, and the canvas takes the width.
Nothing is written to IndexedDB or kept between visits, except the editor's
own view preferences (panel widths).

## The contract, version 1

Every message carries `protocol: 1`. In an iframe the host and the editor
speak by `postMessage`; on the same page the host calls `globalThis.uiEditor`
and listens to the window's events of the same names.

### Origins

- `index.html?mode=page&host=<origin>`: only that origin may load the page,
  and every answer goes to it. A host should always name itself.
- Without `host`, the first `sf-editor:load` from the window's parent fixes
  the origin; later messages from another origin are ignored.
- Only messages from the window's parent are taken. Until a page is loaded,
  only `sf-editor:ready` goes out, and it carries nothing of a page.

### Host → editor

| `type` | Fields | What it does |
|:---|:---|:---|
| `sf-editor:load` | `document`, `settings?`, `revision?`, `language?` (`ru`, `en`) | Checks `document` against composition-document v1 with the site's types (`SF.Composition.validate`). A valid one replaces what the editor shows and the page is clean; an invalid one is refused whole and answered with `sf-editor:error` |
| `sf-editor:save-request` | — | Asks the editor to save, as «Сохранить» does |
| `sf-editor:saved` | `revision` | The host kept the page: the editor takes the new revision and the page is clean again |

### Editor → host

| `type` | Fields | When |
|:---|:---|:---|
| `sf-editor:ready` | — | The editor is drawn and waits for a page |
| `sf-editor:loaded` | `revision` | A page was loaded |
| `sf-editor:error` | `code` (`document_invalid`), `diagnostics` (`{code, path, message}`) | A page was refused |
| `sf-editor:dirty` | `dirty` | The page changed since it was loaded or saved, or became clean |
| `sf-editor:save` | `document`, `settings`, `revision` | «Сохранить», ⌘S / Ctrl+S, or `sf-editor:save-request`. `document` is the edited composition-document v1; `revision` is the one the edits were made on, for the host to detect a conflict. The host decides where the page goes and answers `sf-editor:saved` |

### The same-page API

```js
const result = uiEditor.load({document, settings, revision}); // {ok, diagnostics}
addEventListener('sf-editor:save', (event) => keep(event.detail)); // the payload above
uiEditor.save();             // the payload, also dispatched as the event
uiEditor.saved(revision);    // the host kept it
uiEditor.setSettings(patch); // the page settings changed (dirty)
uiEditor.dirty;              // true while there are unsaved changes
```

## Page settings

The page's own settings are the host's: name, address, template, publication
and history, or whatever else the host keeps for a page. The editor takes
them from `settings` in `sf-editor:load`, shows the name on its bar and hands
the whole object back with every save. Until the Framework ships the
page-settings panel (Framework 1.1.x), the editor has no fields for them: the
panel will fill the hook that `uiEditor.setSettings` is today, and its edits
will come back the same way.

## Unsaved changes

While the page is dirty, leaving the editor's window asks first
(`beforeunload`), and the host is told by `sf-editor:dirty`, so it can guard
its own navigation around the iframe.
