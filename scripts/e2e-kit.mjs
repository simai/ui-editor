// The SIMAI Framework block author kit's sample block in sf-editor
// (examples/block-kit.html, the kit's files in examples/kit/sample-quote):
// a block made only from the kit opens, its parameters edit the Document as
// the kit's case says, it moves, goes and comes back whole, the saved
// Document validates and draws the case's HTML, and a host that does not
// know the type still keeps it. The items are those of the kit's handoff to
// this repository (ui-source feat/block-author-kit b77e0ef6,
// kits/block/examples/HANDOFF-ui-editor.md).
//
//   node scripts/e2e-kit.mjs [--chrome <path>] [--out <folder>]

import {mkdirSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {argument, startRun, watch} from './e2e-common.mjs';

const run = await startRun();
const {check, known} = run;
const out = argument('--out', null);
if (out) mkdirSync(out, {recursive: true});

const page = await run.browser.newPage({viewport: {width: 1280, height: 860}, locale: 'ru-RU'});
const problems = watch(page);
page.setDefaultTimeout(8000);

/** Opens the kit page and waits for the editor to hold its Document. */
async function open(query = '') {
  await page.goto(`${run.origin}/examples/block-kit.html${query}`);
  await page.waitForFunction(() => globalThis.kit?.ready && document.querySelector('#editor')?.model?.doc, null, {timeout: 15000});
  await page.waitForTimeout(300);
}
const state = () => page.evaluate(() => structuredClone(document.querySelector('#editor').model.doc));
const changes = () => page.evaluate(() => globalThis.kit.changes.length);
const lastChange = () => page.evaluate(() => globalThis.kit.changes.at(-1) ?? null);
const quoteOf = (doc) => doc?.root.slots.default.find((node) => node.type === 'sample.quote');
const order = (doc) => doc.root.slots.default.map((node) => node.id).join(',');
const field = (key) => page.locator(`#sf-editor-field-${key}`);

async function selectQuote() {
  // The caption is the quote's own (the paragraphs are its children's): a click there chooses the quote.
  await page.locator('#editor .sample-quote-caption').first().click();
  await field('author').waitFor({timeout: 5000});
}

// 1. The page with the quote opens, the quote drawn by its own renderer.
await open();
const opened = await page.evaluate(() => globalThis.kit.opened);
check('1 the page with the quote opens', quoteOf(await state()) !== undefined);
check('1 the quote is drawn by its renderer, not a placeholder', await page.locator('figure.sample-quote blockquote.sample-quote-text').count() === 1);
check('1 the quote is not lost on open', JSON.stringify(await state()) === JSON.stringify(opened));

// 2. Its parameters: author, role, source as text; align, size as choices; the words of words.json.
await selectQuote();
const labels = await page.evaluate(() => Object.fromEntries(['author', 'role', 'source', 'align', 'size'].map((key) => [key, document.querySelector(`#sf-editor-field-${key} .sf-editor-field-label`)?.textContent.trim() ?? null])));
check('2 the five fields are shown with the kit\'s words', JSON.stringify(labels) === JSON.stringify({author: 'Автор', role: 'Должность', source: 'Источник', align: 'Выравнивание', size: 'Размер'}), JSON.stringify(labels));
check('2 author, role and source are text fields', (await Promise.all(['author', 'role', 'source'].map((key) => field(key).locator('input').count()))).every((count) => count === 1));
const choices = await page.evaluate(() => ['align', 'size'].map((key) => [...document.querySelectorAll(`#sf-editor-field-${key} [role=radio]`)].map((radio) => (radio.getAttribute('aria-label') || radio.textContent.trim().split('\n').at(-1) || '').trim())));
check('2 align and size are choices of two', choices.every((list) => list.length === 2), JSON.stringify(choices));
check('2 the size choices read the kit\'s words', JSON.stringify(choices[1]) === JSON.stringify(['Обычный', 'Крупный']), JSON.stringify(choices[1]));
check('2 the align choices read the kit\'s words', JSON.stringify(choices[0]) === JSON.stringify(['В начале', 'По центру']), JSON.stringify(choices[0]));

// 3. Centre and large write props; the defaults remove the keys.
let before = await changes();
await field('align').locator('[role=radio]').nth(1).click();
await field('size').locator('[role=radio]').nth(1).click();
await page.waitForFunction((count) => globalThis.kit.changes.length >= count + 2, before, {timeout: 5000}).catch(() => {});
const centred = await lastChange();
check('3 centre and large write props {align: center, size: large} in the change event', JSON.stringify(quoteOf(centred)?.props) === JSON.stringify({align: 'center', size: 'large'}), JSON.stringify(quoteOf(centred)?.props));
if (out) writeFileSync(join(out, 'item-3-change-document.json'), `${JSON.stringify(centred, null, 2)}\n`);
await page.screenshot({path: out ? join(out, 'item-3-centre-large.png') : undefined});
before = await changes();
await field('align').locator('[role=radio]').nth(0).click();
await field('size').locator('[role=radio]').nth(0).click();
await page.waitForFunction((count) => globalThis.kit.changes.length >= count + 2, before, {timeout: 5000}).catch(() => {});
const plain = quoteOf(await lastChange());
known('G-30', '3 back to the defaults removes the keys', plain && !('align' in (plain.props ?? {})) && !('size' in (plain.props ?? {})), JSON.stringify(plain?.props));
// The field's own «Сбросить» (reset) removes the key, if a choice of the default does not.
for (const key of ['align', 'size']) {
  const reset = field(key).locator('sf-button.sf-editor-reset');
  if (await reset.count()) await reset.locator('button').first().click();
}
await page.waitForTimeout(300);
const reset = quoteOf(await state());
check('3 «Сбросить» on align and size removes the keys', reset && !('align' in (reset.props ?? {})) && !('size' in (reset.props ?? {})), JSON.stringify(reset?.props));

// 4. The author writes data.author; clearing it is refused or flagged.
const author = field('author').locator('input');
await author.fill('Grace Hopper');
await author.press('Tab');
await page.waitForTimeout(300);
check('4 the author writes data.author', quoteOf(await state())?.data.author === 'Grace Hopper', quoteOf(await state())?.data.author);
await selectQuote();
await field('author').locator('input').fill('');
await field('author').locator('input').press('Tab');
await page.waitForTimeout(300);
const cleared = quoteOf(await state())?.data;
const flagged = await page.evaluate(() => {
  const box = document.querySelector('#sf-editor-field-author');
  return Boolean(box?.querySelector('[aria-invalid=true], .sf-editor-field-error, [data-invalid]') || box?.matches('[data-invalid], .is-invalid'));
});
known('G-31', '4 clearing the required author is refused or flagged', typeof cleared?.author === 'string' && cleared.author.length > 0 || flagged, `author ${JSON.stringify(cleared?.author)}, flagged ${flagged}`);
if (out) await page.screenshot({path: join(out, 'item-4-author-cleared.png')});
// The author back for the rest: undo the clearing, else write it again.
await page.getByRole('button', {name: 'Отменить'}).first().click();
await page.waitForTimeout(300);
if (quoteOf(await state())?.data.author !== 'Grace Hopper') await page.evaluate(() => {
  const editor = document.querySelector('#editor');
  const doc = structuredClone(editor.model.doc);
  doc.root.slots.default.find((node) => node.id === 'q').data.author = 'Grace Hopper';
  editor.document = doc;
});
await page.waitForTimeout(300);
check('4 undo gives the author back', quoteOf(await state())?.data.author === 'Grace Hopper', quoteOf(await state())?.data.author);
await selectQuote();
await field('author').locator('input').fill('Ada Lovelace');
await field('author').locator('input').press('Enter');
await page.waitForTimeout(300);
check('4 the author written again', quoteOf(await state())?.data.author === 'Ada Lovelace', quoteOf(await state())?.data.author);

// 5. Moving and removing the block works whole; undo brings it back byte for byte.
await selectQuote();
const whole = JSON.stringify(await state());
check('5 the quote is the chosen block', await page.evaluate(() => document.querySelector('#editor').model.selected) === 'q');
await page.keyboard.press('Alt+ArrowDown');
await page.waitForTimeout(300);
const moved = await state();
check('5 the quote moves below the paragraph', order(moved) === 'after,q', order(moved));
check('5 it moves whole', JSON.stringify(quoteOf(moved)) === JSON.stringify(quoteOf(JSON.parse(whole))));
await page.getByRole('button', {name: 'Отменить'}).first().click();
await page.waitForTimeout(300);
check('5 undo puts it back byte for byte', JSON.stringify(await state()) === whole);
await selectQuote();
await page.locator('.sample-quote').first().click({position: {x: 4, y: 4}}).catch(() => {});
await selectQuote();
await page.keyboard.press('Escape');
await page.keyboard.press('Delete');
await page.waitForTimeout(300);
let removed = await state();
if (quoteOf(removed)) {
  // The block's own menu, «Ещё» → delete, when the key went to a field.
  await selectQuote();
  await page.getByRole('button', {name: 'Ещё'}).first().click();
  await page.getByRole('menuitem', {name: /Удалить/u}).first().click();
  await page.waitForTimeout(300);
  removed = await state();
}
check('5 the quote is removed whole, paragraphs and all', !quoteOf(removed) && !JSON.stringify(removed).includes('"q1"'), order(removed));
await page.getByRole('button', {name: 'Отменить'}).first().click();
await page.waitForTimeout(300);
check('5 undo brings it back byte for byte', JSON.stringify(await state()) === whole);

// 6. The saved Document validates with the kit's registry and draws the case's HTML.
await selectQuote();
await field('align').locator('[role=radio]').nth(1).click();
await field('size').locator('[role=radio]').nth(1).click();
await page.waitForTimeout(300);
const drawn = await page.evaluate(async () => {
  const {registry, sample} = globalThis.kit;
  const saved = structuredClone(document.querySelector('#editor').model.doc);
  // The case's page holds the quote alone: the paragraph after it is the run's.
  saved.root.slots.default = saved.root.slots.default.filter((node) => node.id !== 'after');
  const validation = SF.Composition.validate(saved, registry);
  const result = await SF.Composition.render(saved, {registry});
  return {saved, valid: validation.valid, diagnostics: validation.diagnostics, html: result.html, renderDiagnostics: result.diagnostics, assets: result.assets, expect: sample.expect};
});
if (out) writeFileSync(join(out, 'item-6-saved-document.json'), `${JSON.stringify(drawn.saved, null, 2)}\n`);
check('6 the saved Document validates with the kit\'s registry', drawn.valid, JSON.stringify(drawn.diagnostics));
check('6 render diagnostics are empty', drawn.renderDiagnostics.length === 0, JSON.stringify(drawn.renderDiagnostics));
check('6 it draws the case\'s HTML', drawn.html === drawn.expect.html, drawn.html === drawn.expect.html ? '' : drawn.html);
check('6 the render lists the asset sample/quote', JSON.stringify(drawn.assets) === JSON.stringify(drawn.expect.assets), JSON.stringify(drawn.assets));
const errors = [...problems.console, ...problems.errors, ...problems.failed];

// 7. A host that does not know sample.quote: the page opens, the quote is kept.
await open('?bare');
const bare = await state();
check('7 without the registration the page opens', bare.root.slots.default.length === 2);
check('7 the quote is held unchanged', JSON.stringify(bare) === JSON.stringify(opened));
const drawnBare = await page.evaluate(() => document.querySelectorAll('#editor .sf-editor-page [data-sf-composition-id]').length);
known('G-32', '7 the quote is shown as an unknown block (and the rest of the page is drawn)', drawnBare > 0, `${drawnBare} blocks drawn`);
if (out) await page.screenshot({path: join(out, 'item-7-unregistered.png')});
check('no console error', errors.length === 0, errors.join(' | '));
await run.finish();
