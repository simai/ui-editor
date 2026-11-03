// The driver of the one-editor scenarios over SIMAI Pro's sf-editor, in this
// repository's shell (the C2 host): the built editor served from dist/, a
// fresh page store, the demo site's blocks and sources. It keeps the
// prototype driver's verbs (scripts/one-editor/prototype.mjs). Acts go
// through the pointer and the keyboard, by real mouse steps. Only reading the
// Document, what the host grants (rights, theme) and what the editor says it
// has chosen reach into the page.
//
// The scenarios speak the prototype's words. Two of them the driver states
// the scenarios' way when it reads the Document:
// - the demo site's types are named by the prototype's (`demo.hero` is
//   `marketing.hero`, `content.figure` is `content.image`), and a text area
//   that stands in a columns block is a `layout.column`;
// - the page is its main region (a `layout.page`), with the site template's
//   parts before and after its sections, marked `extensions.template`, and a
//   text block's inline content is its `data.text`.
// The UI is sf-editor's own: where it has no counterpart of a prototype act
// (sections in the catalogue, a seam's + at a place's start, a block's own
// items), the verb does what a person could and the check says what is missing.
import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {ROOT, load} from '../e2e-common.mjs';

export const name = 'component';
/**
 * Checks sf-editor 1.0.2 fails in this shell: each names its gap in
 * docs/GAPS.md or a difference of design (docs/ONE-EDITOR.md). Reported by
 * the run, not failed; a check here that passes is printed as ok, so its line
 * can go.
 */
export const differs = {
  "S02: Favourites stand above the sections": "G-20: the catalogue: two tabs and fixed groups, no sections Элементы and Макет",
  "S02: a block may stand in two sections: the button shows in Текст too": "G-20: the catalogue: two tabs and fixed groups, no sections Элементы and Макет",
  "S02: a section lists its types": "G-20: the catalogue: two tabs and fixed groups, no sections Элементы and Макет",
  "S02: its sections are Текст, Медиа, Элементы, Макет, Части страницы, Маркетинг, Данные, Формы, Сохранённые": "G-20: the catalogue: two tabs and fixed groups, no sections Элементы and Макет",
  "S02: search covers every section and names each result's section": "G-20: the catalogue: two tabs and fixed groups, no sections Элементы and Макет",
  "S02: search lists a block in two sections once": "G-20: the catalogue: two tabs and fixed groups, no sections Элементы and Макет",
  "S02: the library is one list, with no tabs": "G-20: the catalogue: two tabs and fixed groups, no sections Элементы and Макет",
  "S02: «back» returns to the sections": "G-20: the catalogue: two tabs and fixed groups, no sections Элементы and Макет",
  "S02: Макет holds the section, the columns, the text area, the container, the grid and the empty space": "G-20: the catalogue: two tabs and fixed groups, no sections Элементы and Макет",
  "S02: Элементы holds the button, the icon button, the label and the icon": "G-20: the catalogue: two tabs and fixed groups, no sections Элементы and Макет",
  "S03: a block between sections stands in a section of its own, at that seam": "G-20: the catalogue: two tabs and fixed groups, no sections Элементы and Макет",
  "S03: between sections the + opens on the list of sections": "G-20: the catalogue: two tabs and fixed groups, no sections Элементы and Макет",
  "S03: inside a text area the + opens straight on Текст": "G-20: the catalogue: two tabs and fixed groups, no sections Элементы and Макет",
  "S03: the scenario finished": "G-37: the + opens its catalogue at the window's top-left corner, under the host's left panel",
  "S14: a page holds a second text area": "G-20: the catalogue: two tabs and fixed groups, no sections Элементы and Макет",
  "S14: the scenario finished": "G-20: the catalogue: two tabs and fixed groups, no sections Элементы and Макет",
  "S06: a value from the variant says so": "G-21: layout.section has no variants",
  "S06: «сбросить» returns the inherited value": "G-21: layout.section has no variants",
  "S07: its Data tab names the list it reads": "G-23: the Data tab: a preset, no field mapping; a seeded pagination follows no list",
  "S07: its fields are mapped by the host's preset": "G-23: the Data tab: a preset, no field mapping; a seeded pagination follows no list",
  "S07: the pagination is bound to the list, not to a source": "G-23: the Data tab: a preset, no field mapping; a seeded pagination follows no list",
  "S19: the scenario finished": "G-25: no editing of a block's own items in place",
  "S20: the scenario finished": "G-25: no editing of a block's own items in place",
  "S22: every block offers «Показывать на этом экране»": "G-26: content blocks have no visibility per screen",
  "S22: the scenario finished": "G-26: content blocks have no visibility per screen",
  "S15: the HTML has the section's modifiers and the own one, no inline style, no unknown class": "a difference: differs by design, docs/ONE-EDITOR.md",
  "S05: the menu splits the block into two columns, the block in the left one": "a difference: differs by design, docs/ONE-EDITOR.md",
  "S10: an author inserts only inside text areas": "a difference: differs by design, docs/ONE-EDITOR.md",
  "S21: «###» turns the paragraph into content.heading 3": "a difference: differs by design, docs/ONE-EDITOR.md",
  "S21: «##» turns the paragraph into content.heading 2": "a difference: differs by design, docs/ONE-EDITOR.md",
  "S21: «#» turns the paragraph into content.heading 1": "a difference: differs by design, docs/ONE-EDITOR.md",
  "S21: «1.» turns the paragraph into content.list": "a difference: differs by design, docs/ONE-EDITOR.md",
  "S21: «>» turns the paragraph into content.quote": "a difference: differs by design, docs/ONE-EDITOR.md",
  "S08: the scenario finished": "G-38: a site block made of a section holds only its content: the section's own parameters cannot be offered to the author",
  "S05: new columns stand one under another on the phone": "G-36: a value equal to the type default prints no class: columns {xs 1, md 2} print md:grid-col-2 without grid-col-1",
  "S06: a value nobody set comes from the type": "a difference: the seeded sections set their spacing until the Framework section prints it by default, docs/ONE-EDITOR.md",
  "S12: a section with no value of its own takes the theme's": "a difference: the seeded sections set their spacing until the Framework section prints it by default, docs/ONE-EDITOR.md",
  "S08: the author types in it, and the Document keeps only what differs": "G-40: text typed in a site block's instance is not kept: the instance stays {type, version}",
  "S06: the HTML prints Framework modifiers, mobile first, a prefix only where the value changes": "G-36: a value equal to the type default prints no class: columns {xs 1, md 2} print md:grid-col-2 without grid-col-1",
};
export const lacks = {};

const axeSource = readFileSync(join(ROOT, 'node_modules/axe-core/axe.min.js'), 'utf8');

/** sf-editor's names → the prototype's, for the scenarios. */
const TYPES = {
  'demo.hero': 'marketing.hero',
  'demo.features': 'marketing.features',
  'demo.cta': 'marketing.cta',
  'demo.cards': 'data.cards',
  'demo.pagination': 'data.pagination',
  'demo.header': 'parts.header',
  'demo.footer': 'parts.footer',
  'content.figure': 'content.image',
};
const SCREENS = {'компьютер': 0, 'планшет': 1, 'телефон': 2};
/**
 * The prototype's field names → sf-editor's (the first that the panel has).
 * «Показывать на этом экране» is sf-editor's «Скрыт» the other way round.
 */
const LABELS = {
  'Отступы сверху и снизу': ['Отступ сверху и снизу'],
  'Колонок': ['Колонок', 'Колонки'],
  'Свои модификаторы': ['Дополнительные классы'],
  'Связан со списком': ['Блок в этой секции'],
  'Показывать на этом экране': ['Скрыт', 'Скрыть'],
  'Вид': ['Нумерованный'],
};
const INVERTED = new Set(['Показывать на этом экране']);
/** The prototype's values → sf-editor's, per field: its padding steps S, M, L are the scale's 5, 6, 8; its tones are the scheme's. */
const VALUES = {
  'Отступы сверху и снизу': {S: '5', M: '6', L: '8'},
  'Фон': {'Мягкий': 'Дополнительный', 'Акцент': 'Основной'},
  'Вид': {'1, 2, 3': 'Да', '•': 'Нет'},
};
/** The prototype's menu items → sf-editor's. */
const MENU = {'Сделать блок из этого…': 'Сделать блоком сайта', 'Изменить блок': 'Изменить блок сайта везде'};
/** What the prototype says → what sf-editor or the host says for it. */
const SAYS = {'Настройки сайта': 'Настройки темы'};
/** sf-editor's names of the chosen block → the prototype's. */
const TITLES = {'Изображение': 'Картинка'};
const back = (label, value) => Object.entries(VALUES[label] ?? {}).find(([, own]) => own === value)?.[0] ?? value;

export async function open(context, origin) {
  const page = await context.newPage();
  // A fresh store and Russian words for every scenario.
  await page.addInitScript(() => {
    try {
      if (!sessionStorage.getItem('one-editor-run')) {
        sessionStorage.setItem('one-editor-run', '1');
        indexedDB.deleteDatabase('ui-editor');
        localStorage.clear();
        localStorage.setItem('ui-editor.language', 'ru');
      }
    } catch {}
  });
  // A part the component lacks is waited for briefly: the check says what is missing.
  page.setDefaultTimeout(5000);
  await load(page, origin);
  await page.waitForSelector('#page-editor .sf-editor-page [data-sf-composition-id]');
  return driver(page, origin);
}

function driver(page, origin) {
  const ed = '#page-editor';
  const block = (id) => page.locator(`${ed} .sf-editor-page [data-sf-composition-id="${id}"]`).first();
  const settle = (ms = 150) => page.waitForTimeout(ms);
  const reveal = (locator) => locator.evaluate((element) => element.scrollIntoView({block: 'center', behavior: 'instant'})).catch(() => {});
  const pop = page.locator(`${ed} .sf-editor-pop`);
  const left = page.locator(`${ed} .sf-editor-left`);
  const right = page.locator(`${ed} .sf-editor-right`);
  const model = (fn, arg) => page.evaluate(([source, value]) => {
    const editor = document.getElementById('page-editor');
    return new Function('editor', 'value', `return (${source})(editor, value);`)(editor, value);
  }, [fn.toString(), arg]);
  const exact = (text) => new RegExp(`^\\s*${text.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&')}\\s*$`, 'u');

  const d = {
    page,
    settle,
    /** The page as the scenarios read it (see the header). */
    doc: () => model((editor, types) => {
      const inline = (content) => (Array.isArray(content) ? content.map((part) => (part.value ?? inline(part.children))).join('') : '');
      const map = (node, parent, template) => {
        const type = types[node.type] ?? (node.type === 'layout.area' && parent?.type === 'layout.columns' ? 'layout.column' : node.type);
        let data = node.data?.content ? {...node.data, text: inline(node.data.content)} : node.data;
        if (node.type === 'content.list') data = {...data, items: (node.slots?.items ?? []).map((item) => inline(item.data?.content))};
        const props = node.type === 'content.heading' && node.data?.level ? {...node.props, level: String(node.data.level)} : node.type === 'content.list' && (node.data?.ordered || node.props?.ordered || node.data?.style === 'ordered') ? {...node.props, kind: 'ordered'} : node.props;
        const slots = node.slots ? Object.fromEntries(Object.entries(node.slots).map(([slot, list]) => [slot, list.map((child) => map(child, node, false))])) : undefined;
        return {...node, type, ...(data ? {data} : {}), ...(props ? {props} : {}), ...(slots ? {slots} : {}), ...(template ? {extensions: {...node.extensions, template: true}} : {})};
      };
      const doc = editor.model.toJSON();
      const regions = doc.root.slots?.regions ?? [];
      const main = regions.find((region) => region.props?.name === 'main');
      if (!main) return map(doc.root, null, false);
      const parts = (name) => (regions.find((region) => region.props?.name === name)?.slots?.default ?? []).map((node) => map(node, null, true));
      return {id: main.id, type: 'layout.page', slots: {default: [...parts('header'), ...(main.slots?.default ?? []).map((node) => map(node, main, false)), ...parts('footer')]}};
    }, TYPES),
    block,
    /** The block whose text has the caret, or null. */
    typing: () => model((editor) => {
      const id = editor.model.typing?.id ?? null;
      const parent = id ? editor.model.place(id)?.parent : null;
      // The caret in a quote's or a list's own text is in that block, as the scenarios read it.
      return parent && ['content.quote', 'content.list'].includes(parent.type) && parent.slots && Object.values(parent.slots).flat().length === 1 ? parent.id : id;
    }),
    selected: () => model((editor) => (editor.model.typing ? null : editor.model.selected ?? null)),
    press: async (key) => {
      await page.keyboard.press(key);
      await settle();
    },
    type: async (text) => {
      await page.keyboard.type(text);
      await settle(250);
    },
    /** A click on the block's text puts the caret at its end. */
    clickText: async (id) => {
      await reveal(block(id));
      const box = await block(id).boundingBox();
      // The pointer comes onto the line first and shows the gutter beside it, then presses the line's start.
      const y = box.y + Math.min(10, box.height / 2);
      await page.mouse.move(box.x + 4, y, {steps: 3});
      await settle(150);
      await page.mouse.click(box.x + 4, y);
      await page.keyboard.press(process.platform === 'darwin' ? 'Meta+ArrowDown' : 'Control+End');
      await settle();
    },
    /** A click on the block's own frame, outside its text: its left edge at mid-height. */
    clickFrame: async (id) => {
      const [x, y] = await ownPoint(id, 'edge');
      await page.mouse.click(x, y);
      await settle();
    },
    /** Choose any block the way a keyboard user can: through the Structure tab. */
    choose: async (id) => {
      if (await d.typing()) await d.press('Escape');
      const index = await model((editor, wanted) => editor.view().tree.findIndex((row) => row.id === wanted), id);
      await left.locator('[role="tab"]', {hasText: 'Структура'}).click();
      await settle();
      if (index >= 0) await left.locator('.sf-editor-tree-row').nth(index).locator('button').click();
      await left.locator('[role="tab"]', {hasText: 'Блоки'}).click();
      // The keys act on the chosen block where a person works on it: the canvas.
      await page.evaluate(() => document.querySelector('#page-editor .sf-editor-canvas')?.focus({preventScroll: true}));
      await settle();
    },
    /** Nothing chosen: the page itself, from the path. */
    choosePage: async () => {
      if (await d.typing()) await d.press('Escape');
      await page.locator(`${ed} .sf-editor-path sf-button`).first().locator('button').click();
      await settle();
    },
    /** Hover a block: the gutter (+ and grip) stands beside it. */
    hover: async (id) => {
      const [x, y] = await ownPoint(id);
      await page.mouse.move(x, y, {steps: 3});
      await settle(200);
      return model((editor) => (editor.querySelector('.sf-editor-gutter')?.hidden ? null : editor.gutterId || null));
    },
    gutterPlus: async (id) => {
      await d.hover(id);
      await page.locator(`${ed} .sf-editor-plus button`).click();
      await settle();
    },
    gripMenu: async (id) => {
      await d.hover(id);
      await page.locator(`${ed} .sf-editor-grip button`).click();
      await settle();
    },
    /** Drag a block by its grip: before or after another block, or to its left or right edge. */
    dragGrip: async (id, target, where) => {
      await d.hover(id);
      const grip = await page.locator(`${ed} .sf-editor-grip button`).boundingBox();
      await page.mouse.move(grip.x + grip.width / 2, grip.y + grip.height / 2);
      await page.mouse.down();
      await page.mouse.move(grip.x + grip.width / 2 + 6, grip.y + grip.height / 2 + 6, {steps: 3});
      await drop(target, where);
    },
    /**
     * The + for a place in a parent. sf-editor's + stands in the gutter of a
     * block and inserts after it; an empty place is pressed itself. A place
     * at the start of a parent that has blocks has no + (reported by the check).
     */
    seamPlus: async (parent, index) => {
      const {nodes} = await import('./scenarios.mjs');
      const children = nodes(await d.doc()).filter((n) => n.parent === parent).map((n) => n.id);
      if (!children.length) {
        const empty = page.locator(`${ed} [data-sf-editor-empty="${parent}"]`).first();
        await reveal(empty);
        await empty.click();
      } else await d.gutterPlus(children[Math.max(0, index - 1)]);
      await settle(200);
    },
    /** The open catalogue (+ or /): its tabs, the names it lists and the place it names. */
    picker: () => page.evaluate(() => {
      const box = document.querySelector('#page-editor .sf-editor-pop');
      if (!box) return null;
      return {
        section: null,
        tabs: [...box.querySelectorAll('sf-button-group button')].map((b) => ({name: b.textContent.trim(), pressed: b.getAttribute('aria-pressed') === 'true' || b.getAttribute('aria-checked') === 'true'})),
        items: [...box.querySelectorAll('li[role="option"] .sf-editor-option-name')].map((name) => name.dataset.label ?? name.textContent.trim()),
        heads: [...box.querySelectorAll('li[role="option"] .sf-editor-option-note')].map((s) => s.textContent.trim()),
      };
    }),
    /** A section of the catalogue: sf-editor has two tabs (Текст, Блоки); a section by another name is not there. */
    pickerSection: async (section) => {
      const tab = pop.locator('sf-button-group button', {hasText: exact(section)});
      if (await tab.count()) await tab.first().click();
      await settle();
    },
    /** Pick an entry by name; with a variant, the variant (its type's name beside it). An option is the li itself. */
    pick: async (entry, variant) => {
      const options = pop.locator('li[role="option"]');
      const wanted = variant
        ? options.filter({has: page.locator(`.sf-editor-option-name[data-label="${variant}"]`)}).filter({has: page.locator('.sf-editor-option-note', {hasText: exact(entry)})})
        : options.filter({has: page.locator(`.sf-editor-option-name[data-label="${entry}"]`)});
      if (await wanted.count()) await wanted.first().click();
      await settle(300);
    },
    pickerSearch: async (query) => {
      await pop.locator('input').fill(query);
      await settle();
    },
    /** The library on the left. */
    library: () => page.evaluate(() => {
      const box = document.querySelector('#page-editor .sf-editor-left');
      const name = (item) => item.querySelector('.sf-editor-item-name')?.getAttribute('text') ?? '';
      return {
        tabs: [...box.querySelectorAll('.sf-editor-kinds button')].map((b) => ({name: b.textContent.replace(/\d+/gu, '').trim(), pressed: b.getAttribute('aria-pressed') === 'true' || b.getAttribute('aria-checked') === 'true'})),
        items: [...box.querySelectorAll('.sf-editor-item')].map(name),
        heads: [...box.querySelectorAll('.sf-editor-group > h3')].map((h) => h.textContent.trim()),
        favourites: [...new Set([...box.querySelectorAll('.sf-editor-item')].filter((item) => item.querySelector('.sf-editor-star [aria-pressed="true"], .sf-editor-star[aria-pressed="true"]')).map(name))],
      };
    }),
    /** A section of the library: one of sf-editor's two tabs, by name. */
    librarySection: async (section) => {
      const tab = left.locator('.sf-editor-kinds button', {hasText: section});
      if (await tab.count()) await tab.first().click();
      await settle();
    },
    libraryBack: async () => {},
    librarySearch: async (query) => {
      await left.locator('.sf-editor-search input').fill(query);
      await settle();
    },
    focusLibrarySearch: async () => {
      await left.locator('.sf-editor-search input').click();
      await settle();
    },
    /** An entry not in view (in the other tab) is found by the search, as a person would. */
    findEntry: async (entry) => {
      if (await d.libraryItem(entry).count()) return async () => {};
      await d.librarySearch(entry);
      return async () => d.librarySearch('');
    },
    libraryItem: (entry) => left.locator('.sf-editor-item').filter({has: page.locator(`sf-button.sf-editor-item-name[text="${entry}"]`)}).first(),
    favourite: async (entry) => {
      const done = await d.findEntry(entry);
      await d.libraryItem(entry).locator('.sf-editor-star button').click();
      await settle();
      await done();
    },
    /** A click in the library inserts after the chosen block. */
    libraryClick: async (entry) => {
      const done = await d.findEntry(entry);
      const box = await d.libraryItem(entry).boundingBox();
      await page.mouse.click(box.x + 20, box.y + 20);
      await settle(300);
      await done();
    },
    libraryDrag: async (entry, target, where) => {
      const done = await d.findEntry(entry);
      await d.libraryItem(entry).scrollIntoViewIfNeeded();
      const box = await d.libraryItem(entry).boundingBox();
      await page.mouse.move(box.x + 20, box.y + 20);
      await page.mouse.down();
      await page.mouse.move(box.x + 30, box.y + 30, {steps: 3});
      await drop(target, where);
      await done();
    },
    /** The chosen block's menu: sf-editor has no toolbar; a press on the grip opens it. */
    toolbarMenu: async () => {
      const id = await d.selected();
      if (id) await d.gripMenu(id);
    },
    menuItems: () => page.locator(`${ed} .sf-editor-menu [role="menuitem"]`).evaluateAll((all) => all.map((item) => (item.querySelector('.sf-context-menu-label, [class*="label"]') ?? item).textContent.trim())).then((items) => items.map((own) => Object.entries(MENU).find(([, mine]) => mine === own)?.[0] ?? own)),
    menu: async (item) => {
      await page.locator(`${ed} .sf-editor-menu [role="menuitem"]`, {hasText: MENU[item] ?? item}).first().click();
      await settle(300);
    },
    toolbarAction: async (title) => {
      await right.locator(`sf-button[text^="${title}"] button`).first().click();
      await settle(300);
    },
    /** The right panel: its heading, its tabs and its fields' labels. */
    panel: () => page.evaluate(() => {
      const box = document.querySelector('#page-editor .sf-editor-right');
      return {
        title: box.querySelector('.sf-editor-panel-title')?.textContent.trim() ?? '',
        note: box.querySelector('.sf-editor-locked-note')?.textContent.trim() ?? '',
        tabs: [...box.querySelectorAll('[role="tab"]')].map((b) => b.textContent.trim()),
        fields: [...box.querySelectorAll('.sf-editor-field')].map((f) => f.querySelector('[label]')?.getAttribute('label') ?? ''),
      };
    }).then((seen) => ({...seen, title: TITLES[seen.title] ?? seen.title, fields: seen.fields.map((own) => Object.entries(LABELS).find(([, list]) => list.includes(own))?.[0] ?? own)})),
    panelTab: async (tab) => {
      await right.locator('[role="tab"]', {hasText: tab}).first().click();
      await settle();
    },
    field: async (label) => {
      const own = await ownLabel(label);
      if (!own) return null;
      const found = await page.evaluate((wanted) => {
        const control = [...document.querySelectorAll('#page-editor .sf-editor-right [label]')].find((c) => c.getAttribute('label') === wanted && /^SF-(SWITCH|DROPDOWN|INPUT|SELECT|TEXTAREA|BUTTON-GROUP)$/u.test(c.tagName));
        if (!control) return null;
        const fld = control.closest('.sf-editor-field') ?? control.parentElement;
        let value;
        if (control.tagName === 'SF-SWITCH') value = control.checked ? 'Да' : 'Нет';
        else if (control.tagName === 'SF-DROPDOWN') value = (control.options ?? control.items ?? []).find((o) => String(o.value) === String(control.value))?.text ?? (control.options ?? control.items ?? []).find((o) => String(o.value) === String(control.value))?.label ?? String(control.value ?? '');
        else value = String(control.value ?? '');
        const origin = fld.querySelector('.sf-editor-field-meta .sf-editor-origin');
        return {value, origin: origin?.textContent.trim().toLowerCase() ?? null, own: origin?.dataset.origin === 'block', disabled: Boolean(fld.querySelector('[disabled]'))};
      }, own);
      if (!found) return null;
      let value = back(label, found.value);
      if (INVERTED.has(label)) value = value === 'Да' ? 'Нет' : 'Да';
      // sf-editor names a value of this block «Блок» and of this screen the screen's kind («Экран»).
      const origin = found.origin === 'блок' ? 'этот блок' : found.origin === 'экран' ? screen : found.origin;
      return {...found, value, origin};
    },
    setField: async (label, value) => {
      const own = await ownLabel(label);
      let wanted = VALUES[label]?.[value] ?? value;
      if (INVERTED.has(label)) wanted = wanted === 'Да' ? 'Нет' : 'Да';
      const control = right.locator(`[label="${own}"]`).first();
      const tag = await control.evaluate((element) => element.tagName);
      if (tag === 'SF-SWITCH') {
        const on = await control.evaluate((element) => Boolean(element.checked));
        if (on !== (wanted === 'Да' || wanted === true)) await control.locator('input, [role="switch"]').first().click();
      } else if (tag === 'SF-DROPDOWN' || tag === 'SF-SELECT') {
        await control.locator('button, [role="combobox"]').first().click();
        await settle();
        await page.locator('[role="option"]:visible', {hasText: exact(String(wanted))}).first().click();
      } else {
        await control.locator('input, textarea').first().fill(String(wanted));
        await control.locator('input, textarea').first().press('Tab');
      }
      await settle(300);
    },
    resetField: async (label) => {
      const own = await ownLabel(label);
      await right.locator('.sf-editor-field').filter({has: page.locator(`[label="${own}"]`)}).locator('.sf-editor-field-meta sf-button button').first().click();
      await settle(300);
    },
    preview: async (state) => {
      await right.locator('sf-button-group button', {hasText: state}).first().click();
      await settle();
    },
    /** What the page prints on a site: the «Результат» dialog's HTML. sf-editor prints the whole page; a block's part is cut from it. */
    html: async (id) => {
      const whole = await d.output('HTML');
      if (!id) return whole;
      return page.evaluate(([text, wanted]) => new DOMParser().parseFromString(text, 'text/html').querySelector(`[data-sf-composition-id="${wanted}"]`)?.outerHTML ?? '', [whole, id]);
    },
    markdown: async () => d.output('Markdown'),
    output: async (tab) => {
      const opened = () => page.evaluate(() => (document.querySelector('.sf-editor-output-body')?.getBoundingClientRect().width ?? 0) > 0);
      await page.locator(`${ed} .sf-editor-bar-end sf-button`).last().locator('button').click();
      await settle(400);
      if (!(await opened())) throw new Error('«Результат» did not open the dialog');
      // sf-modal shows its content outside the editor's element.
      await page.locator(`.sf-editor-output-body sf-tabs sf-button[text="${tab}"] button`).first().click();
      await page.locator(`.sf-editor-output-text[aria-label="${tab}"]`).waitFor();
      await settle(300);
      const text = await page.locator('.sf-editor-output-text').first().textContent();
      await page.keyboard.press('Escape');
      await settle();
      // The dialog gives focus back to «Результат» on the bar, where the editor's keys rest; a person goes back to the page.
      await page.evaluate(() => document.querySelector('#page-editor .sf-editor-canvas')?.focus({preventScroll: true}));
      return text ?? '';
    },
    screen: async (which) => {
      screen = which;
      await page.locator(`${ed} .sf-editor-bar .sf-editor-screens button`).nth(SCREENS[which]).click();
      await settle(300);
    },
    undo: () => d.press('ControlOrMeta+z'),
    redo: () => d.press('ControlOrMeta+Shift+z'),
    /** What the host grants: an author writes only in text areas. */
    grant: async (rights) => {
      await page.evaluate((wanted) => globalThis.uiEditor.host.setRights(wanted === 'author' ? {layout: false, builder: false} : {}), rights);
      await settle(300);
    },
    /** The site's theme, set in the host's settings. */
    siteTheme: async (theme) => {
      await page.evaluate((wanted) => globalThis.uiEditor.host.setTheme(wanted === 'компактная' ? 'compact' : 'default'), theme);
      await settle(300);
    },
    /** The template's explicit edit: «Изменить шаблон» in the bar, then «Готово». */
    editTemplate: async (id) => {
      await d.choose(id);
      await page.locator(`${ed} .sf-editor-bar-start sf-button`, {hasText: 'Изменить шаблон'}).locator('button').click();
      await settle();
    },
    templateDone: async () => {
      await page.locator(`${ed} .sf-editor-bar-start sf-button`).filter({hasText: 'Готово'}).locator('button').click();
      await settle();
    },
    builder: () => model((editor) => (editor.builder ? {name: editor.builder.name ?? '', root: editor.builder.from ?? editor.builder.root ?? editor.model.selected ?? null} : null)),
    /** In the builder: tick what the author may change («Секция · Фон» names the field). */
    /** «Секция · Фон»: the builder opens on the copy's first block; a person goes up to the named block (Esc), then exposes its field. */
    expose: async (label) => {
      const [owner, field] = label.includes(' · ') ? label.split(' · ') : [null, label];
      await page.evaluate(() => document.querySelector('#page-editor .sf-editor-canvas')?.focus({preventScroll: true}));
      for (let i = 0; owner && i < 3 && !(await d.panel()).title.startsWith(owner); i += 1) await d.press('Escape');
      await right.locator('.sf-editor-field').filter({has: page.locator(`[label="${field}"]`)}).locator('sf-switch.sf-editor-expose').locator('input, [role="switch"]').first().click();
      await settle();
    },
    builderName: async (text) => {
      await page.locator(`${ed} .sf-editor-builder-bar sf-input input`).fill(text);
      await settle();
    },
    builderSave: async () => {
      await page.locator(`${ed} .sf-editor-builder-bar sf-button`).last().locator('button').click();
      await settle(400);
    },
    /** The text the page shows somewhere: a note, a status, a state inside a block. */
    shows: (text) => page.locator('body', {hasText: SAYS[text] ?? text}).count().then(Boolean),
    blockText: (id) => block(id).innerText(),
    locked: (id) => block(id).evaluate((element) => Boolean(element.closest('.sf-editor-locked'))),
    /** Whether a person can type in a block: it holds text the rights leave open. */
    editable: (id) => model((editor, wanted) => {
      const texts = [];
      const walk = (node) => {
        if (editor.model.isText(node.id)) texts.push(node.id);
        for (const list of Object.values(node.slots ?? {})) list.forEach(walk);
      };
      const node = editor.model.node(wanted);
      if (node) walk(node);
      return texts.some((text) => !editor.model.lockOf(text));
    }, id),
    classes: (id) => block(id).evaluate((element) => [...element.classList]),
    roleSwitch: () => page.locator('[aria-label*="Роль"], [data-role-switch]').count().then(Boolean),
    faded: (id) => block(id).evaluate((element) => Boolean(element.closest('.sf-editor-hidden-here'))),
    dimmed: (id) => model((editor, wanted) => editor.model.lockOf(wanted) === 'template', id),
    /** The variants shown in the library or the catalogue: entries of a type's variant. */
    variants: () => page.evaluate(() => [
      ...[...document.querySelectorAll('#page-editor .sf-editor-left .sf-editor-item')].filter((item) => item.dataset.item?.includes('#')).map((item) => item.querySelector('.sf-editor-item-name')?.getAttribute('text')),
      ...[...document.querySelectorAll('#page-editor .sf-editor-pop li[role="option"]')].filter((option) => option.dataset.item?.includes('#')).map((option) => option.querySelector('.sf-editor-option-name')?.dataset.label),
    ]),
    /** The Data tab's field mapping: the shape's field → the source's field. */
    mapping: () => page.evaluate(() => Object.fromEntries([...document.querySelectorAll('#page-editor .sf-editor-mapping sf-dropdown')].map((s) => [s.getAttribute('label'), String(s.value ?? '')]))),
    /** The blocks a + may insert into, for the current rights: the parents of the blocks that get a gutter, and the empty places. */
    seams: () => model((editor) => {
      const out = new Set();
      for (const element of editor.querySelectorAll('.sf-editor-page [data-sf-composition-id]')) {
        const at = editor.model.place(element.getAttribute('data-sf-composition-id'));
        if (at?.parent && editor.model.choosable(at.node) && !editor.model.placeLock(at.parent.id)) out.add(at.parent.id);
      }
      for (const empty of editor.querySelectorAll('[data-sf-editor-empty]')) if (!editor.model.placeLock(empty.dataset.sfEditorEmpty)) out.add(empty.dataset.sfEditorEmpty);
      return [...out];
    }),
    /** A block's own items: sf-editor 1.0.2 edits none in place, so these do nothing. */
    itemAction: async () => {},
    addItem: async () => {},
    pickIcon: async () => {},
    /** A column more: «Добавить колонку» in the chosen columns block's panel. */
    addColumn: async (id) => {
      await d.choose(id);
      await right.locator('.sf-editor-actions sf-button', {hasText: 'колонк'}).locator('button').first().click();
      await settle(300);
    },
    /** An empty named place of a block (the split hero's picture): pressing it opens the catalogue narrowed to what the place takes; the picture is picked from it. */
    slotAdd: async (id) => {
      await block(id).locator('[data-sf-editor-empty]').first().click();
      await settle(300);
      const options = pop.locator('li[role="option"]');
      const picture = options.filter({has: page.locator('.sf-editor-option-name[data-label="Изображение"]')});
      if (await picture.count()) await picture.first().click();
      else if (await options.count()) await options.first().click();
      await settle(300);
    },
    reload: async () => {
      await page.reload();
      await page.waitForSelector('body[data-ready="true"]');
      await page.waitForSelector(`${ed} .sf-editor-page [data-sf-composition-id]`);
      await settle(400);
    },
    tabTo: async (target) => {
      if (target !== 'canvas') return false;
      await page.mouse.click(1, 1);
      for (let i = 0; i < 60; i += 1) {
        await page.keyboard.press('Tab');
        if (await d.focusOnCanvas()) return true;
      }
      return false;
    },
    focusOnCanvas: () => page.evaluate(() => Boolean(document.activeElement?.closest('#page-editor .sf-editor-canvas'))),
    /** Bring the editor to a state for the accessibility scan. */
    reach: async (state) => {
      const first = await model((editor) => editor.view().tree.find((row) => editor.model.isText(row.id) && !editor.model.lockOf(row.id))?.id);
      if (state === 'nothing chosen') await d.choosePage();
      else if (state === 'a block chosen') await d.choose(first);
      else if (state === 'typing') await d.clickText(first);
      else if (state === 'the + list open') {
        await d.press('Escape');
        await d.gutterPlus(first);
      } else if (state === 'the Data tab') {
        await d.press('Escape');
        const cards = await model((editor) => editor.view().tree.find((row) => editor.model.node(row.id)?.type === 'demo.cards')?.id);
        await d.choose(cards);
        await d.panelTab('Данные');
      }
      await settle(300);
    },
    axe: async () => {
      if (!(await page.evaluate(() => Boolean(globalThis.axe)))) await page.addScriptTag({content: axeSource});
      return page.evaluate(async () => {
        const answer = await globalThis.axe.run(document, {resultTypes: ['violations']});
        return answer.violations.flatMap((v) => v.nodes.map((n) => `${v.id} ${n.target.join(' ')}`));
      });
    },
  };

  let screen = 'компьютер';
  /** The first of sf-editor's names for a prototype's field that the right panel has. */
  const ownLabel = (label) => page.evaluate((list) => list.find((own) => document.querySelector(`#page-editor .sf-editor-right [label="${own}"]`)) ?? null, LABELS[label] ?? [label]);

  /**
   * A point of the block itself, not of a block inside it nor of the gutter:
   * its frame's edges first, then anywhere on it. A block that its children
   * fill has none, and the block's middle is used.
   */
  async function ownPoint(id, fallback = 'middle') {
    await reveal(block(id));
    const box = await block(id).boundingBox();
    // Its edges first, and its start beside the children (a list's markers stand there).
    const edges = [[0.5, 2], [0.5, box.height - 2], [box.width - 2, 0.5], [0.85, 2], [0.15, box.height - 2], [4, 0.25], [4, 0.5], [4, 0.75]];
    const grid = [];
    for (let fy = 0.05; fy < 1; fy += 0.15) for (let fx = 0.05; fx < 1; fx += 0.15) grid.push([fx, fy]);
    const points = [...edges, ...grid].map(([fx, fy]) => [box.x + (fx <= 1 ? box.width * fx : fx), box.y + (fy <= 1 ? box.height * fy : fy)]);
    const at = await page.evaluate(([wanted, list]) => list.find(([x, y]) => {
      const hit = document.elementFromPoint(x, y);
      return hit && !hit.closest('.sf-editor-gutter') && hit.closest('[data-sf-composition-id]')?.getAttribute('data-sf-composition-id') === wanted;
    }) ?? null, [id, points]);
    // With no point of its own, the block's right edge (a frame click) or its middle (a hover).
    return at ?? (fallback === 'edge' ? [box.x + box.width - 2, box.y + box.height / 2] : [box.x + box.width / 2, box.y + box.height / 2]);
  }

  /** Move the held pointer onto the target and let go: above or below it, or at its side. */
  async function drop(target, where) {
    await reveal(block(target));
    const box = await block(target).boundingBox();
    const x = where === 'left' ? box.x + Math.min(20, box.width * 0.08) : where === 'right' ? box.x + box.width - Math.min(20, box.width * 0.08) : box.x + box.width / 2;
    const y = where === 'before' ? box.y + 3 : where === 'after' ? box.y + box.height - 3 : box.y + box.height / 2;
    await page.mouse.move(x, y, {steps: 8});
    await settle(150);
    await page.mouse.move(x + 1, y, {steps: 2});
    await page.mouse.up();
    await settle(300);
  }

  void origin;
  return d;
}
