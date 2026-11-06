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
heading. When no block is chosen, the right panel is the page panel
(sf-editor 1.2.0): the page's name, address, site template, the site theme
(read only), publishing and history, from the host's `settings`. The pages panel, its toggle, «Новая страница» and the note about
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
| `sf-editor:settings` | `settings` (a patch) | The host changed the page's settings itself, for example after a page action (`published`, `history`): the page panel shows them; the page stays as clean or dirty as it was |

### Editor → host

| `type` | Fields | When |
|:---|:---|:---|
| `sf-editor:ready` | — | The editor is drawn and waits for a page |
| `sf-editor:loaded` | `revision` | A page was loaded |
| `sf-editor:error` | `code` (`document_invalid`), `diagnostics` (`{code, path, message}`) | A page was refused |
| `sf-editor:dirty` | `dirty` | The page changed since it was loaded or saved, or became clean |
| `sf-editor:page-action` | `action` (`publish`, `history`), `settings`, `revision`, `dirty` | A press of «Опубликовать» or «История» in the page panel. Publishing and versions are the host's: it publishes (saving first if `dirty` says so) or opens its history, and may answer `sf-editor:settings` |
| `sf-editor:save` | `document`, `settings`, `revision` | «Сохранить», ⌘S / Ctrl+S, or `sf-editor:save-request`. `document` is the edited composition-document v1; `revision` is the one the edits were made on, for the host to detect a conflict. The host decides where the page goes and answers `sf-editor:saved` |

### The same-page API

```js
const result = uiEditor.load({document, settings, revision}); // {ok, diagnostics}
addEventListener('sf-editor:save', (event) => keep(event.detail)); // the payload above
uiEditor.save();             // the payload, also dispatched as the event
uiEditor.saved(revision);    // the host kept it
uiEditor.setSettings(patch); // the page's settings changed in the editor (dirty)
uiEditor.hostSettings(patch); // the host changed them itself (stays clean)
addEventListener('sf-editor:page-action', (event) => act(event.detail)); // publish, history
uiEditor.dirty;              // true while there are unsaved changes
```

## Page settings

The page's own settings are the host's. The editor takes them from
`settings` in `sf-editor:load`, shows them in the page panel and the name on
its bar, and hands the whole object back with every save, with the panel's
edits in it. Keys it does not know are carried through untouched.

| Key | Type | In the page panel |
|:---|:---|:---|
| `name` | string | «Название», editable; the bar's heading |
| `address` | string | «Адрес», editable |
| `template` | string | «Шаблон сайта», a list; the value the host keeps |
| `templates` | `[{value, text}]` | the list's choices; without it, the demo site's `default` and `none` |
| `published` | boolean | a version of the page is live |
| `changes` | boolean | the page differs from its live version; the editor sets it on the first edit, and it goes back with every save until the host publishes and answers `changes: false` |

Publishing reads as one of three states, the same in the status under the
panel's title, the note and the button:

| State | When | Status | Note | «Опубликовать» |
|:---|:---|:---|:---|:---|
| never published | `published` is not true | черновик · ещё не опубликована | Страница ещё не опубликована: посетители её не видят. | on |
| changes | `published`, and `changes` or an unsaved edit | черновик · изменения не опубликованы | Пока изменения не опубликованы, посетители видят прошлую версию. | on |
| live | `published`, no changes | опубликована | Опубликована. Изменений нет. | off |
| `history` | number or `{count}` | «История · N»; without it, no history button |

An edit of name, address or template is a change of the page: it marks the
page dirty (`sf-editor:dirty`) and goes back in the next `sf-editor:save`.
«Опубликовать» and «История» change nothing in the editor: they go to the
host as `sf-editor:page-action`, and the host answers with
`sf-editor:settings` when its settings change (the host demo publishes at
once and counts versions). These messages are additive: the contract stays
version 1.

In the list mode the same panel shows the local page's settings, kept with
it in IndexedDB: an edit renames the page in the list and marks its changes,
and «Опубликовать» only marks it published with no changes, since the demo
keeps no versions (no history button there). A seeded page nobody changed
counts as published.

## Unsaved changes

While the page is dirty, leaving the editor's window asks first
(`beforeunload`), and the host is told by `sf-editor:dirty`, so it can guard
its own navigation around the iframe.
