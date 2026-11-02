#!/usr/bin/env node
// The owner's review of sf-content-editor 1.0.1, end to end in headless Chrome,
// with the editor in place in the layout's outlet:
// the gutter stands outside the text at 1440, 1024 and 375 px; the + menu
// opens at its +, the / menu at the caret near the top and the bottom of the
// scroller; a picture dropped or pasted on the page is kept in IndexedDB,
// chosen, and its parameters fill the Properties panel, where the fit changes
// the picture and moves nothing else; a reload shows it in the editor and on
// the layout's canvas. A picture left without a file outlives a reload: the
// canvas draws a note in its place and the block still takes a file. Enter in
// the + menu search takes the first match, the gutter stands at a picture's
// top, and /div finds the divider in the Russian interface. A File block
// takes any file, from its zone or dropped on the page, and outlives a reload
// empty or filled.
//
//   node scripts/build-ui.mjs && node scripts/e2e-content-ux.mjs [--chrome <path>]
import {load, startRun} from './e2e-common.mjs';

const run = await startRun();
const {check} = run;
const errors = [];

async function open(width) {
  const context = await run.browser.newContext({viewport: {width, height: 900}, locale: 'ru-RU'});
  const page = await context.newPage();
  page.on('pageerror', (error) => errors.push(`${width}: ${error}`));
  await load(page, run.origin);
  await page.evaluate(() => globalThis.uiEditor.setMode('content'));
  await page.waitForTimeout(900);
  return page;
}

/** The gutter beside a block's first line: where its buttons stand against the text. */
async function gutterAt(page, id) {
  const field = page.locator(`#content-editor .sf-content-editor-field[data-sf-node="${id}"]`).first();
  // In place the content stands below the layout's blocks, maybe under the fold.
  await field.scrollIntoViewIfNeeded();
  const box = await field.boundingBox();
  await page.mouse.move(box.x + 10, box.y + 4);
  await page.waitForTimeout(300);
  return measureGutter(page, id);
}

const measureGutter = (page, id) => page.evaluate((id) => {
  const editor = document.querySelector('#content-editor');
  const field = editor.querySelector(`.sf-content-editor-field[data-sf-node="${id}"]`);
  const box = field.getBoundingClientRect();
  const range = document.createRange();
  range.selectNodeContents(field);
  const first = range.getClientRects()[0] ?? box;
  const button = (name) => editor.querySelector(`.sf-content-editor-${name} button`);
  const shown = (element) => Boolean(element) && getComputedStyle(element).display !== 'none' && element.getBoundingClientRect().width > 0;
  const grip = button('grip').getBoundingClientRect();
  const plus = button('plus').getBoundingClientRect();
  // The block's highlight reaches past its text; the gutter stands outside it.
  const highlight = field.closest('.sf-content-editor-blocks > .sf-content-editor-block').getBoundingClientRect();
  // The first button of the gutter is centred on the line: the + on a narrow sheet, where it stands above the grip.
  const lead = plus.top < grip.top ? plus : grip;
  return {
    sheet: Math.round(editor.querySelector('.sf-content-editor-sheet').getBoundingClientRect().width),
    shown: editor.querySelector('.sf-content-editor-gutter').classList.contains('is-shown'),
    plus: shown(button('plus')),
    stacked: plus.bottom <= grip.top,
    side: plus.right <= grip.left,
    gap: Math.round(Math.min(first.left, box.left) - grip.right),
    clear: Math.round(highlight.left - Math.max(plus.right, grip.right)),
    off: Math.round(Math.abs(lead.top + lead.height / 2 - (first.top + first.height / 2))),
  };
}, id);

/** A small picture as a file from the system. */
const PICTURE = `(async (width, height, name) => {
  const canvas = Object.assign(document.createElement('canvas'), {width, height});
  const draw = canvas.getContext('2d');
  draw.fillStyle = '#4a7';
  draw.fillRect(0, 0, width, height);
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
  return new File([blob], name, {type: 'image/png'});
})`;

const mediaCount = (page) => page.evaluate(() => new Promise((resolve) => {
  const request = indexedDB.open('ui-editor');
  request.onsuccess = () => {
    const count = request.result.transaction('media').objectStore('media').count();
    count.onsuccess = () => {
      resolve(count.result);
      request.result.close();
    };
  };
}));

/** The caret at the end of a block's text, not of its first visual line as End puts it. */
async function caretAtEnd(page, id) {
  await page.locator(`#content-editor .sf-content-editor-field[data-sf-node="${id}"]`).click();
  await page.evaluate(() => {
    const range = document.createRange();
    range.selectNodeContents(document.activeElement);
    range.collapse(false);
    getSelection().removeAllRanges();
    getSelection().addRange(range);
  });
}

const contentBlocks = (page) => page.evaluate(() => globalThis.uiEditor.state.pages[0].content.root.slots.default.map((node) => ({id: node.id, type: node.type, src: node.data?.src, props: node.props})));

try {
  // -------------------------------------------------------------- the gutter
  for (const width of [1440, 1024, 375]) {
    const page = await open(width);
    for (const [id, name] of [['home-h2', 'heading'], ['home-p1', 'paragraph'], ['home-li1', 'list item']]) {
      const at = await gutterAt(page, id);
      check(`${width} px: the gutter stands outside the ${name}'s text and 4 px outside its highlight, on its first line`, at.shown && at.gap >= 0 && at.clear >= 4 && at.off <= 2, JSON.stringify(at));
      // A sheet under 640 px stands the + above the grip, whose menu also adds below.
      if (id === 'home-p1') check(`${width} px: the + ${at.sheet < 640 ? 'stands above the grip on a narrow sheet' : 'stands beside the grip'}`, at.plus && (at.sheet < 640 ? at.stacked : at.side), JSON.stringify(at));
    }
    await page.context().close();
  }

  const page = await open(1440);

  // ------------------------------------------------------------- the + menu
  await page.locator('#content-editor .sf-content-editor-block[data-sf-node="home-p1"]').hover();
  await page.waitForTimeout(200);
  await page.locator('#content-editor .sf-content-editor-plus button').click();
  await page.waitForTimeout(500);
  const plus = await page.evaluate(() => {
    const anchor = document.querySelector('#content-editor .sf-content-editor-plus button').getBoundingClientRect();
    const menu = document.querySelector('#content-editor .sf-content-editor-menu .sf-context-menu').getBoundingClientRect();
    // In place the content stands under the layout's blocks, low in the
    // scroller: a menu with no room below flips above its +.
    const below = menu.top >= anchor.bottom - 1;
    return {dx: Math.round(menu.left - anchor.left), dy: below ? Math.round(menu.top - anchor.bottom) : Math.round(anchor.top - menu.bottom), below, search: document.activeElement?.matches('.sf-context-menu-search-input') ?? false};
  });
  check('the + menu opens at its +, under it or above it, within 12 px of its corner, with its search field focused', Math.hypot(plus.dx, plus.dy) <= 12 && plus.search, JSON.stringify(plus));
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  check('Esc closes it and the focus goes back to the +', await page.evaluate(() => document.activeElement === document.querySelector('#content-editor .sf-content-editor-plus button')));

  // ------------------------------------------------------------- the / menu
  const slashAt = () => page.evaluate(() => {
    const list = document.querySelector('#content-editor .sf-content-editor-slash');
    const field = document.activeElement;
    const range = getSelection().rangeCount ? getSelection().getRangeAt(0) : null;
    const caret = [...(range?.getClientRects() ?? [])].at(-1) ?? field.getBoundingClientRect();
    const box = list.getBoundingClientRect();
    const below = Math.round(box.top - caret.bottom);
    const above = Math.round(caret.top - box.bottom);
    const room = Math.round(document.querySelector('#layout-view').getBoundingClientRect().bottom - caret.bottom);
    return {shown: !list.hidden && box.height > 0, below, above, room, near: (below >= 0 && below <= 16) || (above >= 0 && above <= 16), left: Math.round(box.left - caret.left)};
  });
  await caretAtEnd(page, 'home-p1');
  await page.keyboard.press('Enter');
  await page.keyboard.type('/');
  await page.waitForTimeout(500);
  const top = await slashAt();
  check('near the top of the scroller the / menu stands at the caret', top.shown && top.near && Math.abs(top.left) <= 16, JSON.stringify(top));
  await page.keyboard.press('Escape');
  await page.keyboard.press('Backspace');
  await page.keyboard.press('Backspace');


  // --------------------------------------------------------- a dropped picture
  const dropped = await page.evaluate(async (make) => {
    const file = await eval(make)(400, 200, 'green.png');
    const editor = document.querySelector('#content-editor');
    const target = editor.querySelector('.sf-content-editor-block[data-sf-node="home-h2"]');
    target.scrollIntoView({block: 'center'});
    await new Promise((resolve) => setTimeout(resolve, 600));
    const y = target.getBoundingClientRect().top + 2;
    const data = new DataTransfer();
    data.items.add(file);
    target.dispatchEvent(new DragEvent('dragover', {bubbles: true, cancelable: true, clientX: 600, clientY: y, dataTransfer: data}));
    const line = !editor.querySelector('.sf-content-editor-drop').hidden;
    target.dispatchEvent(new DragEvent('drop', {bubbles: true, cancelable: true, clientX: 600, clientY: y, dataTransfer: data}));
    return {line};
  }, PICTURE);
  await page.waitForTimeout(900);
  const afterDrop = await contentBlocks(page);
  check('a picture dropped from the system shows the drop line and lands at it, before the heading', dropped.line && afterDrop[1]?.type === 'content.figure' && afterDrop[2]?.id === 'home-h2', JSON.stringify(afterDrop.map((block) => block.type)));
  check('the file is kept in IndexedDB and the block names it', (await mediaCount(page)) === 1 && /^media:/.test(afterDrop[1]?.src ?? ''), afterDrop[1]?.src);
  const panel = await page.evaluate(() => ({
    hidden: document.querySelector('#props-block').hidden,
    type: document.querySelector('#props-block-type').textContent,
    fields: [...document.querySelectorAll('#props-fields [data-param]')].map((field) => `${field.localName}:${field.dataset.param}`),
    hint: document.querySelector('#props-fields [data-param="alt"]')?.getAttribute('hint'),
    toolbar: !document.querySelector('#content-editor .sf-content-editor-quick').hidden,
  }));
  check('the chosen picture shows the quick toolbar and fills the Properties panel', !panel.hidden && panel.toolbar && panel.type === 'Картинка' && panel.fields.join() === 'sf-input:alt,sf-dropdown:ratio,sf-dropdown:fit', JSON.stringify(panel));
  check('a picture with no description says so in the panel', Boolean(panel.hint), panel.hint);

  const tops = () => page.evaluate(() => [...document.querySelectorAll('#content-editor .sf-content-editor-blocks > .sf-content-editor-block')].map((block) => Math.round(block.getBoundingClientRect().top)));
  // The tops are taken with the list open: the focus has left the editor
  // already, and an empty caption it showed while focused is folded.
  await page.locator('#props-fields [data-param="fit"]').click();
  await page.waitForTimeout(300);
  const before = await tops();
  await page.locator('[role="option"][data-value="contain"]:visible').first().click();
  await page.waitForTimeout(500);
  const fitted = await page.evaluate(() => getComputedStyle(document.querySelector('#content-editor .sf-content-editor-frame img')).objectFit);
  const afterFit = await contentBlocks(page);
  check('the fit chosen in the panel changes the picture and is saved', fitted === 'contain' && afterFit[1]?.props?.fit === 'contain', `${fitted} ${JSON.stringify(afterFit[1]?.props)}`);
  check('and moves nothing else', JSON.stringify(await tops()) === JSON.stringify(before), JSON.stringify([before, await tops()]));
  check('the quick toolbar follows the panel', await page.evaluate(() => document.querySelector('#content-editor .sf-content-editor-quick button[data-param="fit"][data-value="contain"]')?.getAttribute('aria-pressed') === 'true'));

  // --------------------------------------------------------- a pasted picture
  await caretAtEnd(page, 'home-p2');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(300);
  await page.evaluate(async (make) => {
    const data = new DataTransfer();
    data.items.add(await eval(make)(40, 20, 'clip.png'));
    document.activeElement.dispatchEvent(new ClipboardEvent('paste', {bubbles: true, cancelable: true, clipboardData: data}));
  }, PICTURE);
  await page.waitForTimeout(900);
  const afterPaste = await contentBlocks(page);
  check('a picture pasted on an empty line takes its place and is kept', afterPaste.at(-1)?.type === 'content.figure' && /^media:/.test(afterPaste.at(-1)?.src ?? '') && (await mediaCount(page)) === 2, JSON.stringify(afterPaste.slice(-2)));

  // ---------------------------------------------------------------- a reload
  await load(page, run.origin);
  const canvas = await page.evaluate(async () => {
    const images = [...document.querySelectorAll('#canvas [data-sf-outlet] img')];
    await Promise.all(images.map((image) => image.decode().catch(() => null)));
    return {problems: document.querySelector('#canvas-problems').hidden, sizes: images.map((image) => image.naturalWidth)};
  });
  check('after a reload the layout\'s canvas draws both pictures from the store', canvas.problems && canvas.sizes.join() === '400,40', JSON.stringify(canvas));
  await page.evaluate(() => globalThis.uiEditor.setMode('content'));
  await page.waitForTimeout(900);
  const shown = await page.evaluate(async () => {
    const images = [...document.querySelectorAll('#content-editor .sf-content-editor-frame img')];
    await Promise.all(images.map((image) => image.decode().catch(() => null)));
    return images.map((image) => image.naturalWidth);
  });
  check('and so does the editor', shown.join() === '400,40', JSON.stringify(shown));

  // ------------------------------------ an empty picture outlives a reload
  // A picture inserted from the + menu and left without a file is stored as
  // it is; the canvas draws a note in its place, never drops the page, and
  // the Content mode still offers the block a file.
  await page.locator('#content-editor .sf-content-editor-block[data-sf-node="home-h2"]').hover();
  await page.waitForTimeout(200);
  await page.locator('#content-editor .sf-content-editor-plus button').click();
  await page.waitForTimeout(400);
  await page.keyboard.type('Карт', {delay: 40});
  await page.waitForTimeout(300);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(800);
  const menuAfter = await page.evaluate(() => ({
    open: (document.querySelector('#content-editor .sf-content-editor-menu .sf-context-menu')?.getBoundingClientRect().height ?? 0) > 0,
    plus: document.activeElement === document.querySelector('#content-editor .sf-content-editor-plus button'),
  }));
  check('Enter in the + menu search takes the first match; the menu closes and the focus is not left on the +', !menuAfter.open && !menuAfter.plus, JSON.stringify(menuAfter));
  const waiting = (await contentBlocks(page)).find((block) => block.type === 'content.figure' && !block.src);
  check('the picture waits for its file, stored without one', Boolean(waiting), JSON.stringify(await contentBlocks(page)));
  await load(page, run.origin);
  const kept = await page.evaluate((id) => ({
    problems: document.querySelector('#canvas-problems').hidden,
    blocks: document.querySelectorAll('#canvas [data-sf-outlet] [data-sf-composition-id]').length,
    note: document.querySelector(`#canvas [data-sf-composition-id="${id}"]`)?.textContent.trim() ?? '',
    wide: document.documentElement.scrollWidth <= innerWidth,
  }), waiting?.id);
  check('after a reload the canvas draws the page, with a note where the picture waits', kept.problems && kept.blocks > 3 && kept.note.includes('Картинка ждёт файла') && kept.wide, JSON.stringify(kept));
  await page.evaluate(() => globalThis.uiEditor.setMode('content'));
  await page.waitForTimeout(900);
  await page.locator(`#content-editor .sf-content-editor-block[data-sf-node="${waiting?.id}"] sf-file-upload input[type="file"]`).setInputFiles({name: 'late.png', mimeType: 'image/png', buffer: Buffer.from(await page.evaluate(async (make) => [...new Uint8Array(await (await eval(make)(120, 60, 'late.png')).arrayBuffer())], PICTURE))});
  await page.waitForTimeout(900);
  const filled = (await contentBlocks(page)).find((block) => block.id === waiting?.id);
  check('and the block still takes a file, kept in IndexedDB', /^media:/.test(filled?.src ?? '') && (await mediaCount(page)) === 3, JSON.stringify(filled));

  // Beside a picture the gutter stands at the block's top, not on its caption.
  const figure = page.locator(`#content-editor .sf-content-editor-blocks > .sf-content-editor-block[data-sf-node="${waiting?.id}"]`);
  await figure.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const figureBox = await figure.boundingBox();
  await page.mouse.move(figureBox.x + 120, figureBox.y + figureBox.height - 6);
  await page.waitForTimeout(400);
  const gripOff = await page.evaluate((id) => Math.round(document.querySelector('#content-editor .sf-content-editor-grip button').getBoundingClientRect().top - document.querySelector(`#content-editor .sf-content-editor-blocks > [data-sf-node="${id}"]`).getBoundingClientRect().top), waiting?.id);
  check('beside a picture the gutter stands at its top', Math.abs(gripOff) <= 4, String(gripOff));

  // ------------------------------------------------- /div in the Russian interface
  await caretAtEnd(page, 'home-p2');
  await page.keyboard.press('Enter');
  await page.keyboard.type('/div', {delay: 40});
  await page.waitForTimeout(400);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(600);
  const afterDiv = await contentBlocks(page);
  const at = afterDiv.findIndex((block) => block.id === 'home-p2');
  check('/div finds the divider in the Russian interface, and the line with the / becomes it', afterDiv[at + 1]?.type === 'content.divider', JSON.stringify(afterDiv.slice(at).map((block) => block.type)));

  // ---------------------------------------------------------------- files
  // File from the + menu is an empty file block: a zone for any file, stored
  // without an address; a reload keeps the page (a note on the canvas) and
  // the block. A file picked in its zone and a document dropped on the page
  // are kept in IndexedDB, stored with an address the canvas downloads from.
  await page.locator('#content-editor .sf-content-editor-block[data-sf-node="home-h2"]').hover();
  await page.waitForTimeout(200);
  await page.locator('#content-editor .sf-content-editor-plus button').click();
  await page.waitForTimeout(400);
  await page.keyboard.type('Файл', {delay: 40});
  await page.waitForTimeout(300);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(800);
  const fileNodes = () => page.evaluate(() => globalThis.uiEditor.state.pages[0].content.root.slots.default.filter((node) => node.type === 'content.file').map((node) => ({id: node.id, ...node.data})));
  const emptyFile = (await fileNodes()).find((node) => !node.href);
  const anyType = await page.evaluate((id) => {
    const zone = document.querySelector(`#content-editor [data-sf-zone="${id}"] sf-file-upload`);
    return Boolean(zone) && !zone.hasAttribute('accept');
  }, emptyFile?.id);
  check('File in the + menu makes an empty file block, a zone for any file', Boolean(emptyFile) && anyType, JSON.stringify(await fileNodes()));
  await load(page, run.origin);
  const fileKept = await page.evaluate((id) => ({
    problems: document.querySelector('#canvas-problems').hidden,
    note: document.querySelector(`#canvas [data-sf-composition-id="${id}"]`)?.textContent.trim() ?? '',
  }), emptyFile?.id);
  check('after a reload the canvas draws the page, with a note where the file waits', fileKept.problems && fileKept.note.includes('Файл ждёт загрузки'), JSON.stringify(fileKept));
  await page.evaluate(() => globalThis.uiEditor.setMode('content'));
  await page.waitForTimeout(900);
  const fileInput = page.locator(`#content-editor [data-sf-zone="${emptyFile?.id}"] sf-file-upload input[type="file"]`);
  check('and the editor still shows its zone', (await fileInput.count()) === 1);
  await fileInput.setInputFiles({name: 'Отчёт.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4 a report')});
  await page.waitForTimeout(900);
  const picked = (await fileNodes()).find((node) => node.id === emptyFile?.id);
  check('a file picked in the zone is kept and stored with its address, name, type and size', /^media:/.test(picked?.value ?? '') && picked.href === `./media/${picked.value.slice(6)}` && picked.label === 'Отчёт.pdf' && picked.mime === 'application/pdf' && picked.size === 17 && (await mediaCount(page)) === 4, JSON.stringify(picked));
  check('the block draws the download row: the kind\'s icon, the name, the size', await page.evaluate((id) => {
    const row = document.querySelector(`#content-editor [data-sf-node="${id}"] .sf-content-editor-file-row`);
    return row?.querySelector('.sf-content-editor-file-icon')?.getAttribute('icon') === 'picture_as_pdf' && row.querySelector('.sf-content-editor-file-name').textContent === 'Отчёт.pdf' && /17/.test(row.querySelector('.sf-content-editor-file-size')?.textContent ?? '');
  }, emptyFile?.id));
  await page.evaluate(() => {
    const editor = document.querySelector('#content-editor');
    const target = editor.querySelector('.sf-content-editor-block[data-sf-node="home-h2"]');
    target.scrollIntoView({block: 'center'});
    const y = target.getBoundingClientRect().top + 2;
    const data = new DataTransfer();
    data.items.add(new File(['a,b\n1,2'], 'plan.csv', {type: 'text/csv'}));
    target.dispatchEvent(new DragEvent('dragover', {bubbles: true, cancelable: true, clientX: 600, clientY: y, dataTransfer: data}));
    target.dispatchEvent(new DragEvent('drop', {bubbles: true, cancelable: true, clientX: 600, clientY: y, dataTransfer: data}));
  });
  await page.waitForTimeout(900);
  const afterFileDrop = await contentBlocks(page);
  const dropAt = afterFileDrop.findIndex((block) => block.id === 'home-h2');
  const csv = (await fileNodes()).find((node) => node.label === 'plan.csv');
  check('a file that is not a picture, dropped on the page, makes a file block at the drop line and is kept', afterFileDrop[dropAt - 1]?.type === 'content.file' && /^media:/.test(csv?.value ?? '') && (await mediaCount(page)) === 5, JSON.stringify(afterFileDrop.slice(Math.max(0, dropAt - 2), dropAt + 1).map((block) => block.type)));
  await load(page, run.origin);
  const links = await page.evaluate(async () => Promise.all([...document.querySelectorAll('#canvas [data-sf-outlet] a.sf-download-file')].map(async (link) => ({name: link.download, blob: link.href.startsWith('blob:'), bytes: (await (await fetch(link.href)).blob()).size}))));
  check('after a reload the canvas offers both files to download, from the store', JSON.stringify(links.map((link) => [link.name, link.blob, link.bytes]).sort()) === JSON.stringify([['plan.csv', true, 7], ['Отчёт.pdf', true, 17]]), JSON.stringify(links));
  await page.evaluate(() => globalThis.uiEditor.setMode('content'));
  await page.waitForTimeout(900);
  const rows = await page.evaluate(() => [...document.querySelectorAll('#content-editor .sf-content-editor-file-name')].map((name) => name.textContent).sort());
  check('and the editor shows both rows', JSON.stringify(rows) === JSON.stringify(['plan.csv', 'Отчёт.pdf']), JSON.stringify(rows));

  // ------------------------------------- the / menu near the scroller's bottom
  await caretAtEnd(page, 'home-p2');
  for (let n = 0; n < 14; n += 1) await page.keyboard.press('Enter');
  await page.waitForTimeout(700);
  await page.keyboard.type('/');
  await page.waitForTimeout(500);
  const bottom = await slashAt();
  check('near the bottom of the scroller the / menu stands at the caret too, above it', bottom.shown && bottom.room < 200 && bottom.above >= 0 && bottom.above <= 16, JSON.stringify(bottom));

  check('no page errors', errors.length === 0, errors.join(' | '));
} catch (error) {
  check('the run finished', false, error.stack);
}
await run.finish();
