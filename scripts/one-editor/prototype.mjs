// The driver of the one-editor scenarios over the accepted prototype,
// prototypes/block-editor.html (ui-control 0bb8dc4). It proves the scenarios
// run before the component exists; the component's driver replaces it in C2
// and keeps the same verbs. Acts go through the pointer and the keyboard; only
// reading the Document and what a host grants (rights, theme) reach into the
// prototype, because the prototype has no host.
import {existsSync, readFileSync} from 'node:fs';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {READY_MS, ROOT, explain, watch} from '../e2e-common.mjs';

const URL = pathToFileURL(join(ROOT, 'prototypes/block-editor.html')).href;

export const name = 'prototype';
/** Checks the prototype is known to fail, with why; the component must pass them. */
export const differs = {};
/** What the prototype cannot show; such scenarios are skipped here, never on the component. */
export const lacks = {
  host: 'the prototype has no host: nothing is stored, a reload starts over',
  markdown: 'the prototype prints JSON and HTML, not Markdown',
  axe: 'the prototype is not held to the accessibility gate',
};

/** The pinned Framework's fonts, standing in for Google Fonts (see open). */
const lock = JSON.parse(readFileSync(join(ROOT, 'framework.lock.json'), 'utf8'));
const DISTR = join(ROOT, '.cache', 'framework', lock.ui.npm.version, 'x', 'package', 'distr');
const INTER = ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'greek', 'greek-ext', 'vietnamese'];
const LOCAL_FONTS = Object.fromEntries([
  ...INTER.map((subset) => [`https://fonts.gstatic.com/local/inter-${subset}.woff2`, join(DISTR, 'core', 'fonts', 'inter', `inter-${subset}-wght-normal.woff2`)]),
  ['https://fonts.gstatic.com/local/material-symbols-outlined.woff2', join(DISTR, 'component', 'icons', 'fonts', 'MaterialSymbols-Outlined.woff2')],
]);
for (const file of Object.values(LOCAL_FONTS)) if (!existsSync(file)) throw new Error(`${file} is missing: run npm run framework:fetch first`);
const FONTS_CSS = [
  ...INTER.map((subset) => `@font-face{font-family:'Inter';font-style:normal;font-weight:100 900;font-display:block;src:url(https://fonts.gstatic.com/local/inter-${subset}.woff2) format('woff2')}`),
  `@font-face{font-family:'Material Symbols Outlined';font-style:normal;font-weight:100 700;font-display:block;src:url(https://fonts.gstatic.com/local/material-symbols-outlined.woff2) format('woff2')}`,
  `.material-symbols-outlined{font-family:'Material Symbols Outlined';font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:'liga';-webkit-font-smoothing:antialiased}`,
].join('\n');

export async function open(context) {
  const page = await context.newPage();
  // The first-visit hints would cover the canvas. `words` reads a label
  // without its icon, its shortcut or its origin: the element's own text.
  await page.addInitScript(() => {
    globalThis.words = (element) => [...element.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join('').trim();
    try {
      localStorage.setItem('be-hint-coach', '1');
      localStorage.setItem('be-hint-grip', '1');
    } catch {}
  });
  // The prototype asks Google Fonts for Inter and its icon font. The run
  // stays off the network: the stylesheet is answered here with the same two
  // families from the pinned Framework (its Inter and Material Symbols
  // Outlined, fetched and checked by framework:fetch), and anything else
  // from the network is refused at once. The icons keep their width, so the
  // layout the scenarios click is the same; a gate never waits on a CDN.
  await page.route(/^https?:\/\//u, (route) => {
    const url = route.request().url();
    if (url.startsWith('https://fonts.googleapis.com/css')) return route.fulfill({contentType: 'text/css', body: FONTS_CSS});
    const file = LOCAL_FONTS[url];
    if (file) return route.fulfill({contentType: 'font/woff2', body: readFileSync(file)});
    return route.abort('blockedbyclient');
  });
  watch(page);
  await page.goto(URL, {waitUntil: 'domcontentloaded', timeout: READY_MS});
  try {
    await page.waitForSelector('#frame .n', {timeout: READY_MS});
  } catch (error) {
    throw new Error(`the prototype drew no block in ${READY_MS} ms: ${await explain(page)}`, {cause: error});
  }
  return driver(page);
}

function driver(page) {
  const block = (id) => page.locator(`#frame [data-id="${id}"]`).first();
  const settle = (ms = 150) => page.waitForTimeout(ms);
  // To the middle of the canvas: its bottom edge is under the sticky path bar.
  const reveal = (locator) => locator.evaluate((element) => element.scrollIntoView({block: 'center', behavior: 'instant'}));
  const pop = page.locator('#pop.on');

  const d = {
    page,
    settle,
    /** The page's one Document as composition-document v1 (`slots.default`). */
    doc: () => page.evaluate(() => globalThis.serialize(S.doc)),
    block,
    text: (id) => block(id).locator('.txt[contenteditable="true"]').first(),
    /** The block whose text has the caret, or null. */
    typing: () => page.evaluate(() => (document.activeElement?.classList.contains('txt') ? document.activeElement.closest('.n').dataset.id : null)),
    selected: () => page.evaluate(() => (S.typing ? null : S.sel)),
    press: async (key) => {
      await page.keyboard.press(key);
      await settle();
    },
    type: async (text) => {
      await page.keyboard.type(text);
      await settle(200);
    },
    /** A click on the block's text puts the caret at its end. */
    clickText: async (id) => {
      await reveal(d.text(id));
      const box = await d.text(id).boundingBox();
      // The caret goes after the last letter (End is no caret key on macOS).
      // A click on the first line's start stays clear of the toolbar and the seams;
      // then the end of the text by the keyboard.
      const line = await d.text(id).evaluate((element) => parseFloat(getComputedStyle(element).lineHeight) || 24);
      await page.mouse.click(box.x + 4, box.y + line / 2);
      await page.keyboard.press(process.platform === 'darwin' ? 'Meta+ArrowDown' : 'Control+End');
      await settle();
    },
    /** A click on the block's own frame, outside its text and its children. */
    clickFrame: async (id) => {
      await reveal(block(id));
      const box = await block(id).boundingBox();
      // The left edge at mid-height: the top edge is the seam's + between blocks.
      await page.mouse.click(box.x + 4, box.y + box.height / 2);
      await settle();
    },
    /** Choose any block the way a keyboard user can: through the Structure tab. */
    choose: async (id) => {
      await page.locator('.tabs [data-tab="tree"]').click();
      await page.locator(`#left .tree-row[data-go="${id}"]`).click();
      await page.locator('.tabs [data-tab="blocks"]').click();
      await settle();
    },
    /** Nothing chosen: the page itself. */
    choosePage: async () => {
      if (await page.evaluate(() => S.typing)) await d.press('Escape');
      await page.locator('#path [data-go=""]').click();
      await settle();
    },
    /** Hover a block: the gutter (+ and grip) stands beside it. */
    hover: async (id) => {
      await reveal(block(id));
      const box = await block(id).boundingBox();
      await page.mouse.move(box.x + 8, box.y + Math.min(12, box.height / 2));
      await settle(200);
      return page.evaluate(() => (document.querySelector('#gut').classList.contains('on') ? gutId : null));
    },
    gutterPlus: async (id) => {
      await d.hover(id);
      await page.locator('#gut [data-g="add"]').click();
      await settle();
    },
    gripMenu: async (id) => {
      await d.hover(id);
      await page.locator('#gut [data-g="grip"]').click();
      await settle();
    },
    /** Drag a block by its grip: before or after another block, or to its left or right edge. */
    dragGrip: async (id, target, where) => {
      await d.hover(id);
      const grip = await page.locator('#gut [data-g="grip"]').boundingBox();
      await page.mouse.move(grip.x + grip.width / 2, grip.y + grip.height / 2);
      await page.mouse.down();
      // A hand starts a drag a few pixels away, still on the grip.
      await page.mouse.move(grip.x + grip.width / 2, grip.y + grip.height / 2 + 6, {steps: 3});
      await drop(target, where);
    },
    /** The + at a seam between blocks: index is the place in the parent. */
    seamPlus: async (parent, index) => {
      const seam = page.locator(`#frame .ins[data-parent="${parent}"][data-index="${index}"]`);
      await reveal(seam);
      // The pointer on the seam shows its +, at the seam's middle; the click lands there.
      const box = await seam.boundingBox();
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, {steps: 4});
      await settle(200);
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
      await settle();
    },
    /** The open picker (+ or /): its tabs, the names it lists and the place it names. */
    picker: () => page.evaluate(() => {
      const box = document.querySelector('#pop.on');
      if (!box) return null;
      return {
        section: box.querySelector('[data-back] .nm b')?.textContent ?? null,
        tabs: [...box.querySelectorAll('[data-libtab]')].map((b) => ({name: b.textContent.trim(), pressed: b.getAttribute('aria-pressed') === 'true'})),
        items: [...box.querySelectorAll('.lib-item .nm')].map((n) => n.firstChild.textContent.trim()),
        heads: [...box.querySelectorAll('.grp')].map(words),
      };
    }),
    pickerSection: async (section) => {
      await pop.locator('[data-sub]', {hasText: section}).click();
      await settle();
    },
    /** Pick an entry by name; with a variant, the variant's picture. */
    pick: async (entry, variant) => {
      if (variant) await pop.locator(`.var[title="${variant}"]`).click();
      else await pop.locator('.lib-item[data-entry]', {has: page.locator('.nm', {hasText: entry})}).first().click();
      await settle(250);
    },
    pickerSearch: async (query) => {
      await page.locator('#pq').fill(query);
      await settle();
    },
    /** The library on the left. */
    library: () => page.evaluate(() => {
      const box = document.querySelector('#left');
      return {
        tabs: [...box.querySelectorAll('[data-libtab]')].map((b) => ({name: b.textContent.trim(), pressed: b.getAttribute('aria-pressed') === 'true'})),
        items: [...box.querySelectorAll('.lib-item .nm')].map((n) => n.firstChild.textContent.trim()),
        heads: [...box.querySelectorAll('.grp')].map(words),
        favourites: [...box.querySelectorAll('.star.on')].map((s) => s.closest('.lib-item').querySelector('.nm').firstChild.textContent.trim()),
      };
    }),
    librarySection: async (section) => {
      if (await page.locator('#left [data-back]').count()) await d.libraryBack();
      await page.locator('#left [data-sub]', {hasText: section}).click();
      await settle();
    },
    libraryBack: async () => {
      if (!(await page.locator('#left [data-back]').count())) return;
      await page.locator('#left [data-back]').click();
      await settle();
    },
    librarySearch: async (query) => {
      await page.locator('#q').fill(query);
      await settle();
    },
    focusLibrarySearch: async () => {
      await page.locator('#q').click();
      await settle();
    },
    /** An entry not in view (inside a closed section) is found by the search, as a person would. */
    findEntry: async (entry) => {
      if (await d.libraryItem(entry).count()) return async () => {};
      await d.librarySearch(entry);
      return async () => {
        await page.locator('#q').evaluate((input) => {
          input.value = '';
          input.dispatchEvent(new Event('input', {bubbles: true}));
        });
        await settle();
      };
    },
    // By the whole name: «Список» is not «Список карточек» (a subtitle follows the name with no space).
    libraryItem: (entry) => page.locator('#left .lib-item[data-entry]', {has: page.locator('.nm', {hasText: new RegExp(`^${entry.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&')}(?! )`, 'u')})}).first(),
    favourite: async (entry) => {
      const done = await d.findEntry(entry);
      await d.libraryItem(entry).locator('[data-fav]').click();
      await settle();
      await done();
    },
    /** A click in the library inserts after the chosen block. */
    libraryClick: async (entry) => {
      const done = await d.findEntry(entry);
      await d.libraryItem(entry).locator('.nm').click();
      await settle(250);
      await done();
    },
    libraryDrag: async (entry, target, where) => {
      const done = await d.findEntry(entry);
      await d.libraryItem(entry).scrollIntoViewIfNeeded();
      const box = await d.libraryItem(entry).boundingBox();
      await page.mouse.move(box.x + 30, box.y + box.height / 2);
      await page.mouse.down();
      await drop(target, where);
      await done();
    },
    /** The chosen block's menu (from the toolbar's «Ещё» or the grip). */
    toolbarMenu: async () => {
      await page.locator('#tb [data-act="more"]').click();
      await settle();
    },
    menuItems: () => page.locator('#menu.on button').evaluateAll((all) => all.map(words)),
    menu: async (item) => {
      await page.locator('#menu.on button', {hasText: item}).click();
      await settle(250);
    },
    toolbarAction: async (title) => {
      await page.locator(`#tb button[title^="${title}"], #tb button:has-text("${title}")`).first().click();
      await settle(250);
    },
    /** The right panel: its heading, its tabs, a field's value and where the value came from. */
    panel: () => page.evaluate(() => {
      const box = document.querySelector('#right');
      return {
        title: box.querySelector('.ph b')?.textContent ?? '',
        note: box.querySelector('.ph small')?.textContent ?? '',
        tabs: [...box.querySelectorAll('[data-ptab]')].map((b) => b.textContent.trim()),
        fields: [...box.querySelectorAll('.fld > .lb')].map(words),
      };
    }),
    panelTab: async (tab) => {
      await page.locator('#right [data-ptab]', {hasText: tab}).click();
      await settle();
    },
    field: (label) => page.evaluate((wanted) => {
      const fld = [...document.querySelectorAll('#right .fld')].find((f) => f.querySelector('.lb') && words(f.querySelector('.lb')) === wanted);
      if (!fld) return null;
      const pressed = fld.querySelector('.seg [aria-pressed="true"]');
      const select = fld.querySelector('select');
      const input = fld.querySelector('input');
      const value = pressed ? pressed.textContent.trim() : select ? select.selectedOptions[0]?.textContent.trim() : input?.value;
      const src = fld.querySelector('.src');
      return {value, origin: src ? src.firstChild.nextSibling.textContent.replace(/·/u, '').trim() : null, own: Boolean(src?.classList.contains('own')), disabled: Boolean(fld.querySelector('[disabled]'))};
    }, label),
    setField: async (label, value) => {
      const fld = page.locator('#right .fld', {has: page.locator('.lb', {hasText: label})}).first();
      if (await fld.locator('.seg').count()) await fld.locator('.seg button', {hasText: value}).first().click();
      else if (await fld.locator('select').count()) await fld.locator('select').selectOption({label: value});
      else {
        await fld.locator('input').fill(String(value));
        await fld.locator('input').press('Tab');
      }
      await settle(250);
    },
    resetField: async (label) => {
      await page.locator('#right .fld', {has: page.locator('.lb', {hasText: label})}).locator('[data-reset]').click();
      await settle(250);
    },
    preview: async (state) => {
      await page.locator('#right [data-preview]', {hasText: state}).click();
      await settle();
    },
    /** What the block prints on a site, as the HTML tab shows it. */
    html: async (id) => {
      await d.choose(id);
      await d.panelTab('HTML');
      const html = await page.locator('#right pre').textContent();
      await d.panelTab('Параметры');
      return html;
    },
    screen: async (which) => {
      await page.locator(`#bp [data-bp="${{'телефон': 'phone', 'планшет': 'tablet', 'компьютер': 'desktop'}[which]}"]`).click();
      await settle();
    },
    undo: () => d.press('ControlOrMeta+z'),
    redo: () => d.press('ControlOrMeta+Shift+z'),
    /** What the host grants. The prototype shows an author through its «look as an author» button. */
    grant: async (rights) => {
      if (rights !== 'author') throw new Error(`the prototype shows only an author, not ${rights}`);
      await d.choosePage();
      await page.locator('#asAuthor').click();
      await settle();
    },
    /** The site's theme, set in the host's settings; the prototype imitates the setting. */
    siteTheme: async (theme) => {
      if (theme !== 'компактная') throw new Error(`the prototype has no theme ${theme}`);
      await d.choosePage();
      await page.locator('#asCompact').click();
      await settle();
    },
    /** The template's explicit edit: «Изменить шаблон» on a chosen template part, then «Готово». */
    editTemplate: async (id) => {
      await d.choose(id);
      await page.locator('#tb [data-act="tpl"]').click();
      await settle();
    },
    templateDone: async () => {
      await page.locator('#tplDone').click();
      await settle();
    },
    builder: () => page.evaluate(() => (S.build ? {name: S.build.name, root: S.build.rootId} : null)),
    /** In the builder with nothing chosen: tick what the author may change («Секция · Фон»). */
    expose: async (label) => {
      await page.locator('#right .xrow', {hasText: label}).locator('input').check();
      await settle();
    },
    builderName: async (text) => {
      await page.locator('#right [data-build="name"]').fill(text);
      await settle();
    },
    builderSave: async () => {
      await page.locator('#bSave').click();
      await settle(300);
    },
    /** The text the page shows somewhere: a toast, a banner, a state inside a block. */
    shows: (text) => page.locator('body', {hasText: text}).count().then(Boolean),
    blockText: (id) => block(id).innerText(),
    /** Whether a block is drawn locked for the current rights. */
    locked: (id) => block(id).evaluate((element) => element.classList.contains('locked')),
    editable: (id) => block(id).locator('[contenteditable="true"]').count().then(Boolean),
    /** Classes the canvas puts on a block (its modifiers for the screen shown). */
    classes: (id) => block(id).evaluate((element) => [...element.classList]),
    roleSwitch: () => page.locator('[aria-label*="Роль"], [data-role-switch]').count().then(Boolean),
    /** A block hidden on the screen shown is drawn faded on the canvas. */
    faded: (id) => block(id).evaluate((element) => element.classList.contains('offbp')),
    /** A template part is drawn paler than the page. */
    dimmed: (id) => block(id).evaluate((element) => element.classList.contains('tpl')),
    /** The variants shown as pictures in the library or the picker. */
    variants: () => page.locator('#left .var, #pop.on .var').evaluateAll((all) => all.map((v) => v.title)),
    /** The Data tab's field mapping: the shape's field → the source's field. */
    mapping: () => page.evaluate(() => Object.fromEntries([...document.querySelectorAll('#right [data-map]')].map((s) => [s.dataset.map, s.value]))),
    /** The blocks a + may insert into, for the current rights. */
    seams: () => page.locator('#frame .ins').evaluateAll((all) => [...new Set(all.map((z) => z.dataset.parent))]),
    /** A block's own items (the features' points): hover one, then its bar's action. */
    itemAction: async (id, index, action) => {
      await reveal(block(id));
      await block(id).locator('.f').nth(index).hover();
      await page.locator(`#frame [data-id="${id}"] [data-fi="${action}:${index}"]`).click();
      await settle(250);
    },
    addItem: async (id) => {
      await reveal(block(id));
      await block(id).hover();
      await settle(200);
      await block(id).locator('.fadd').click();
      await settle(250);
    },
    pickIcon: async (id, index, icon) => {
      await reveal(block(id));
      await block(id).locator(`.fic[data-icon="${index}"]`).click();
      await settle();
      await page.locator(`#menu.on [data-pick-icon="${id}:${index}:${icon}"]`).click();
      await settle(250);
    },
    /** The + at the right edge of a columns block. */
    addColumn: async (id) => {
      await reveal(block(id));
      await block(id).hover();
      await settle(200);
      await block(id).locator(':scope > .cadd').click();
      await settle(250);
    },
    /** An empty named place of a block (the split hero's picture) offers its button. */
    slotAdd: async (id) => {
      await block(id).locator('[data-addin]').click();
      await settle(250);
    },
  };

  /** Move the held pointer onto the target and let go: the seam above or below it, or its side. */
  async function drop(target, where) {
    await reveal(block(target));
    const box = await block(target).boundingBox();
    // 25 px inside the side: in the side's drop band, clear of the columns' + at the right edge.
    const x = where === 'left' ? box.x + 25 : where === 'right' ? box.x + box.width - 25 : box.x + box.width / 2;
    const y = where === 'before' ? box.y + 2 : where === 'after' ? box.y + box.height - 2 : box.y + box.height / 2;
    await page.mouse.move(x, y, {steps: 8});
    await settle(150);
    await page.mouse.move(x + 1, y, {steps: 2});
    await page.mouse.up();
    await settle(300);
  }

  return d;
}
