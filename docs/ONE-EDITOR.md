# One block editor: acceptance scenarios

Owner decision, 2026-11-03: the layout editor and the content editor become one
editor. A page is one Document; layout and text are one tree; one undo history
serves typing and structure. The decisions are `control/ui-editor/UNIFIED-BLOCK-EDITOR.md`
in `simai/ui-control`, and the assignment is `ONE-EDITOR-ASSIGNMENT.md`:

- **Part A:** contracts in ui-source;
- **Part B:** the editor, one Smart component in ui-pro;
- **Part C:** this repository.

This page is Part C: the prototype's flows turned into end-to-end scenarios
(C1), run on the released component in this repository's shell (C2).

## How the scenarios run

The scenarios are in `scripts/one-editor/scenarios.mjs`. They act through a
driver: click a text, choose a block, open the +, drag a grip, read a field and
where its value came from, read the Document. They find blocks in the Document
by type and text, never by a fixed id. Pointer acts are real mouse steps (move,
press, move in steps, release), never dispatched events, so a drag that a hand
cannot start fails here too.

| Target | Driver | What happens |
|:---|:---|:---|
| `--target component` (in `npm run e2e` and CI) | `scripts/one-editor/component.mjs` | runs on `sf-editor` 1.0.3 (`package.one_editor` in `framework.lock.json`) in the built shell; a check the component fails is reported with its gap, not failed |
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

## C2: on sf-editor 1.0.0, rechecked on 1.0.2

`pro-c47fe37db37d` on `ui-b8e23367889f`, 2026-11-03. The shell is the host
(`src/ui/app.ts`):
- the page as one Document;
- the demo site's types made by the block author kit's pattern
  (`src/ui/blocks.ts`): header, footer, hero, features, call to action, cards
  and pagination, with their variants, renderers, editor manifests and words;
- the theme and the rights;
- the demo sources through `connectPort` (`src/ui/sources.ts`): news, products
  and offers in the cards shape;
- every `change` kept, a template change copied into every page.

The run on 1.0.0: 22 scenarios, 70 checks pass and 52 are known. Each known
check names its gap in the driver's `differs` (G-20 to G-34, [GAPS.md](GAPS.md)),
a difference of design below, or «not classified yet» (5 checks). None fails the
run; a known check that starts to pass prints ok.

What passes: selection by depth, typing into the Document, Esc and Enter
through the depth (S01); the template locked, its explicit edit and «Готово»
(S09); an author's rights and the lock's reason from the host (S10); the
theme's default and a block's own value (S12); one undo history for typing and
moves (S13); values, not classes, in the Document (S15); Markdown of an area
(S16); the page over a reload (S17); Tab to the canvas (S18).

The driver reads the component the scenarios' way, in its header:
- the names of the demo types (`demo.hero` is `marketing.hero`);
- the page as its main region with the template's parts;
- a heading's `data.level`, a list's `ordered` and its points;
- the prototype's field names, values and origins mapped to sf-editor's:
  «Отступ сверху и снизу» with S/M/L as 5/6/8, «Скрыт» as «Показывать на
  этом экране» the other way round, «Блок» as «этот блок», «Экран» as the
  screen;
- the menu's «Сделать блоком сайта» for «Сделать блок из этого…».

### Rechecked on sf-editor 1.0.2

`pro-bff42cdcb4f4`, 2026-11-04, the same pair. The run: 22 scenarios, 88 checks
pass and 37 are known: 28 by the gaps still open (G-20, G-21, G-23, G-25,
G-26), 4 by the new G-36 to G-38, and 9 differences of design. None fails.

What 1.0.2 adds to what passes: one undo reverts a split, a side drop puts
blocks side by side and adds a column (S05); a phone value leaves the desktop's
(S06); the split hero's empty place prompts and takes a picture again (S11);
↓ chooses from the first block and axe finds nothing in any state (S18); the
grip drag and the grip's menu (S04).

With the seeded look of 2026-11-04 (sections with spacing and backgrounds,
docs/STATUS.md): 91 checks pass and 38 are known (29 by G-20, G-21, G-23,
G-25, G-26; 5 by G-36 to G-38 and the new G-40; 9 differences of design,
two of them new: S06 and S12 find no section without its own spacing). S01's
frame click passes now; S08 goes past «Секция · Фон» and stops at G-40 (which proved the driver's, below).

### Rechecked on sf-editor 1.0.3

`pro-968c4f47c3b8` over `ui-eea8c0a97cc7`, 2026-11-04: 97 checks pass and 34
are known: 29 by G-20, G-21, G-23, G-25 and G-26, one by the new G-41 (S03's
catalogue runs past the window's bottom) and 9 differences of design. None
fails. 1.0.3 closed G-36 (S05, S06), G-37 (the catalogue stands at its +) and
G-38 (S08 passes whole). The driver types in an instance at its first line and
reads its texts from `data.texts`; a value set on the computer may carry the
screen's prefix (`lg:p-y-5`) where the section's other screens differ.

The driver follows 1.0.2's names: a catalogue option is the `li[role=option]`
itself, named by `.sf-editor-option-name[data-label]`; an empty named place
opens the catalogue narrowed to it, so the driver picks the picture there. The
HTML of one block is cut from the page's output by its id. After the
«Результат» dialog the driver goes back to the page, as a person would: the
dialog gives the focus to its button on the bar, where the editor's keys rest.
To grip a list it points at the list's own start beside its items. In the
builder it goes up to the named block (Esc) before exposing its field.

### Differences of design

Not gaps: sf-editor does these on purpose, and the prototype's check does not
apply as written.

| Check | What sf-editor does |
|:---|:---|
| S06: a value nobody set comes from the type | the seeded sections set their spacing (visual parity, 2026-11-04), because the Framework's section prints none by default yet (the brief's item 8); the hero section's spacing is the block's own. Goes when the section has a default and the seed stops setting it |
| S12: a section with no value of its own takes the theme's | the same: every seeded section sets its spacing, so none takes the compact theme's |
| S05: the split leaves the new column empty | it puts a paragraph in the new column, so it can be typed in at once |
| S10: an author inserts only inside the first text area | a columns block's columns are text areas (`layout.area`), so an author writes there too; the prototype's columns were layout only |
| S15: the HTML has `p-y-8` and `gap-5` | those are the prototype's theme defaults; the demo site's theme sets none |
| S21: the paragraph is replaced by the new block | «## », «> » and «1. » change the block in place and keep its id |

The two modes and the G-15 to G-19 workarounds are gone: the scenarios run on
the component, and the rollback is the commit before C2 (pages kept since keep
their `layout` and `content` beside the new `document`, so the old shell still
reads them).
