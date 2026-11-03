# One block editor: acceptance scenarios

Owner decision, 2026-11-03: the layout editor and the content editor become one
editor. A page is one Document; layout and text are one tree; one undo history
serves typing and structure. The decisions are `control/ui-editor/UNIFIED-BLOCK-EDITOR.md`
in `simai/ui-control`, and the assignment is `ONE-EDITOR-ASSIGNMENT.md`:

- **Part A:** contracts in ui-source;
- **Part B:** the editor, one Smart component in ui-pro;
- **Part C:** this repository.

This page is Part C1: the prototype's flows turned into end-to-end scenarios
against the future component.

## How the scenarios run

The scenarios are in `scripts/one-editor/scenarios.mjs`. They act through a
driver: click a text, choose a block, open the +, drag a grip, read a field and
where its value came from, read the Document. They find blocks in the Document
by type and text, never by a fixed id. Pointer acts are real mouse steps (move,
press, move in steps, release), never dispatched events, so a drag that a hand
cannot start fails here too.

| Target | Driver | What happens |
|:---|:---|:---|
| `--target component` (in `npm run e2e`) | `scripts/one-editor/component.mjs`, written in C2 | skipped until `framework.lock.json` names the component (`package.one_editor`) and its driver exists |
| `--target prototype` (in `npm run e2e`) | `scripts/one-editor/prototype.mjs` | runs on [`prototypes/block-editor.html`](../prototypes/block-editor.html), the accepted behaviour (ui-control `0bb8dc4`), to prove the scenarios themselves |

```sh
node scripts/e2e-one-editor.mjs --target prototype [--only S05]
```

On the prototype:
- 19 scenarios run, with 146 checks;
- 3 need what only a host or the component has, and are skipped there.

## The scenarios

| Id | What it proves | From |
|:---|:---|:---|
| S01 | Selection by depth: a click on text types; Esc goes text → block → area → section; Enter goes back down; a click on a frame chooses; hover shows the gutter | B, help |
| S02 | One catalogue, one list with no tabs (owner, second and third reviews): favourites and recent above the sections Текст, Медиа, Элементы, Макет, Части страницы, Маркетинг, Данные, Формы, Сохранённые; the new blocks in Макет and Элементы; the button in Элементы and in Текст, listed once by search; variants as pictures, «back», search over every section naming each result's section; Backspace in the search edits the search only; a click in the library inserting after the chosen block | B, help |
| S03 | Insert three ways: the + between sections opens on the sections and puts a block in a section of its own; inside a text area it opens straight on Текст and hides what the area cannot take; `/` in an empty line opens on Текст, filters by name or synonym, and replaces the whole line; a drag from the library to the drop line | B, help |
| S04 | Move: the gutter grip, Alt+↑↓ on a chosen block, Alt+Shift+↑↓ from text with the caret kept; a click on the grip chooses the block and opens its menu | B, help |
| S05 | Columns: «Разделить на колонки» from the menu, one column on the phone, one undo reverts the split; a side drop puts two blocks side by side; inside a column it adds a column | B, help |
| S06 | Parameters: each value names its origin (тип, тема, вариант, этот блок, экран); «сбросить» returns the inherited one; a phone value leaves the desktop's; the HTML prints `grid-col-1 md:grid-col-2` | B, «Попробуйте» 4 |
| S07 | Data: the host's source, another source fills the same cards, the host's field mapping, the binding in the Document, «Пусто» and «Ошибка» inside the block, the pagination bound to the list | B, «Попробуйте» 3 |
| S08 | Block builder: a site block from a section, the author's one exposed parameter, the instance stored as type, version and what differs, a change reaching the instance with the author's text kept | B, «Попробуйте» 6 |
| S09 | The site template: dimmed, locked on the page, typed in only after «Изменить шаблон», locked again by «Готово» | B, «Попробуйте» 2 |
| S10 | Rights from the host: no role switch; an author types in text areas, the rest is locked, the + only inside areas, a click on a locked part says who changes it | B, «Попробуйте» 1 |
| S11 | Named places: the split hero's picture is a block of its own, removed, and its empty place offers «Картинка или видео» | Part A 5, «Попробуйте» 5 |
| S12 | The theme is the site's: the page names it and links to the site's settings; the theme's default reaches a section, and a value set in a block stays | B, «Попробуйте» 7 |
| S13 | One undo history: typed, then moved; the first undo takes back the move, the second the typing; redo | B, help |
| S14 | Several text areas: a section with an area added at a seam, the empty area's own + inserting into it, a heading and a paragraph typed there, Esc to its section, Alt+↑ moves it | G-18, the owner's scenario |
| S15 | Output: the Document keeps values, the HTML prints Framework modifiers with no inline style, an unknown own modifier is reported and dropped | B, Part A 2–3 |
| S16 | Markdown of a text area | B (the prototype has none) |
| S17 | The host keeps the page over a reload | C2, the owner's scenario (the prototype has no host) |
| S18 | Keyboard and accessibility: Tab to the canvas, arrows between blocks, Enter and Esc keep the focus; axe finds nothing with nothing chosen, a block chosen, typing, the + list open and the Data tab | the a11y suite (the prototype is not held to it) |
| S19 | A block's own items: the features' points move left and right, duplicate, go, «Добавить пункт» with the caret in the new title, an icon picked from a set, one undo | owner, second review |
| S20 | Columns' +: a column added at the right edge, a duplicated column, the + gone at four, a removed column; `cols` follows the count; one undo | owner, second review |
| S21 | Markdown habits: «## », «### », «# », «> », «1. », «- » at a paragraph's start turn it into that block; Enter on an empty last point leaves the list; one undo returns the paragraph; the list's «Вид» numbers it | owner, second review |
| S22 | Visibility per screen: «Показывать на этом экране» off on the phone fades the block on the canvas, prints `hidden md:block`, and keeps a value in the Document | owner, third review |

## What the prototype did differently

C1's reports found five defects of the prototype; ui-control fixed them all:
- the grip drag (`4e623b9`);
- «/» with a search replacing the whole line, and the help's tablet modifier
  (`7edfcb1`);
- Backspace in the library's search deleting the chosen block, and an empty
  text area's own + covered by its parent's next seam (`347071e`).

The prototype driver's `differs` map is empty; a check the prototype fails
again fails the run.

## C2: what the component's driver needs

C2 writes `scripts/one-editor/component.mjs` with the same verbs and sets
`package.one_editor` in the lock. It needs these from Parts A and B:

- **The Document:** the editor's one Document, read back as
  `composition-document` v1, the way `globalThis.serialize(S.doc)` gives it
  here.
- **A host grant of rights,** so S10 can run without a role switch.
- **The site's theme set by the host,** for S12.
- **The source port with demo sources,** for S07.
- **Markdown of a text area,** for S16.
- **A change event the host can store,** for S17.
- **The interface words of the scenarios.** They are the prototype's Russian
  words: «Разделить на колонки», «Сделать блок из этого…», the section names,
  the origin names. The component's RU dictionary should keep them, or the driver
  maps them.

The two modes and the G-15 to G-19 workarounds stay until these scenarios pass
on the component ([GAPS.md](GAPS.md)).
