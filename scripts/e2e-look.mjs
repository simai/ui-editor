// The look of the seeded home page against the prototype's page part (owner,
// 2026-11-04; ui-control control/ui-editor/visual-parity-2026-11-04, host
// items 10-12). Each check measures what the prototype shows: the demo
// blocks' parts and sizes, the page's sides, the seeded words in the
// interface's language and the thin host bar.
//
//   node scripts/e2e-look.mjs [--chrome <path>] [--shots <dir>]
//
// --shots writes the 1440 light and dark and the phone screenshots of the
// page there, for a side-by-side look.

import {argument, load, startRun} from './e2e-common.mjs';

const run = await startRun();
const {check} = run;
const shots = argument('--shots', '');

/** The canvas's sheet and what the run measures in it, at the screen the editor shows. */
const measure = (page) =>
  page.evaluate(() => {
    const sheet = document.querySelector('.sf-editor-page');
    const box = (node) => node?.getBoundingClientRect();
    const style = (node) => (node ? getComputedStyle(node) : null);
    const edge = box(sheet);
    const header = sheet.querySelector('.demo-header');
    const mark = header?.querySelector('.demo-logo span');
    const hero = sheet.querySelector('.demo-hero');
    const heroText = hero?.querySelector('.demo-hero-text');
    const heroMedia = hero?.querySelector('.demo-hero-media');
    const figure = heroMedia?.querySelector('.sf-figure-media') ?? heroMedia?.querySelector('img');
    const button = hero?.querySelector('sf-button button');
    const lead = heroText?.querySelector('p');
    const cards = [...sheet.querySelectorAll('.demo-card')];
    const features = [...sheet.querySelectorAll('.demo-feature')];
    const tile = features[0]?.firstElementChild;
    const footer = sheet.querySelector('.demo-footer');
    const search = header?.querySelector('sf-input');
    const visible = (node) => Boolean(node && node.getClientRects().length && style(node).visibility !== 'hidden');
    // Every line of text on the page keeps off the sheet's sides.
    const texts = [...sheet.querySelectorAll('h1, h2, h3, p, li, a, strong, small')].filter((node) => visible(node) && node.textContent.trim());
    const nearest = Math.min(...texts.map((node) => Math.min(box(node).left - edge.left, edge.right - box(node).right)));
    const rows = (nodes) => new Set(nodes.map((node) => Math.round(box(node).top))).size;
    return {
      sheet: Math.round(edge.width),
      mark: mark ? {size: `${Math.round(box(mark).width)}x${Math.round(box(mark).height)}`, fill: style(mark).backgroundColor, primary: style(button ?? mark).backgroundColor} : null,
      links: header ? [...header.querySelectorAll('nav a')].filter(visible).length : 0,
      search: {field: visible(search?.querySelector('input')), type: search?.getAttribute('input-type'), button: visible(header?.querySelector('sf-button-icon button'))},
      headerFits: header ? header.firstElementChild.scrollWidth <= header.clientWidth + 1 : false,
      lead: lead ? parseFloat(style(lead).fontSize) : 0,
      body: parseFloat(style(sheet.querySelector('main p:not(.demo-hero p)')).fontSize),
      button: button ? {fill: style(button).backgroundColor, text: button.textContent.trim()} : null,
      picture: figure ? {ratio: Math.round((box(figure).width / box(figure).height) * 100) / 100, radius: parseFloat(style(heroMedia).borderTopLeftRadius)} : null,
      split: heroText && heroMedia ? (box(heroMedia).left >= box(heroText).right ? 'row' : 'stacked') : '',
      cards: {count: cards.length, rows: rows(cards), radius: cards[0] ? parseFloat(style(cards[0]).borderTopLeftRadius) : 0, border: cards[0] ? parseFloat(style(cards[0]).borderTopWidth) : 0, gap: cards[1] ? Math.round(box(cards[1]).left - box(cards[0]).right) : 0},
      features: {count: features.length, rows: rows(features), tile: tile ? `${Math.round(box(tile).width)}x${Math.round(box(tile).height)}` : ''},
      footer: footer ? {line: parseFloat(style(footer).borderTopWidth), parts: footer.children.length} : null,
      nearest: Math.round(nearest),
      // The page's words, without the icons' ligatures (an icon's name is its glyph).
      words: (() => {
        const copy = sheet.cloneNode(true);
        copy.querySelectorAll('sf-icon, sf-button-icon, [aria-hidden="true"], .sf-icon, [class*="lock"]').forEach((node) => node.remove());
        return copy.textContent;
      })(),
    };
  });

const screen = async (page, which) => {
  await page.evaluate((name) => document.querySelector('sf-editor').setScreen(name), which);
  await page.waitForTimeout(900);
};

for (const scheme of ['light', 'dark']) {
  const context = await run.browser.newContext({viewport: {width: 1440, height: 900}, colorScheme: scheme, locale: 'ru-RU'});
  const page = await context.newPage();
  await page.addInitScript(() => localStorage.setItem('ui-editor.language', 'ru'));
  await load(page, run.origin);
  await page.waitForTimeout(900);
  const at = `1440 ${scheme}`;
  if (shots) await page.screenshot({path: `${shots}/home-1440-${scheme}.png`});
  const desk = await measure(page);

  // ---------------------------------------------------------------- 10: the demo blocks
  check(`${at}: the header has a logo mark (24 px, the primary colour) and a menu`, desk.mark?.size === '24x24' && desk.mark.fill === desk.mark.primary && desk.links === 3, JSON.stringify({...desk.mark, links: desk.links}));
  check(`${at}: the header fits the sheet, its search an sf-input search field`, desk.headerFits && desk.search.field && desk.search.type === 'search' && !desk.search.button, JSON.stringify(desk.search));
  check(`${at}: the hero's text is in the lead size, larger than body text`, desk.lead > desk.body, `${desk.lead} px, body ${desk.body} px`);
  check(`${at}: the hero has a primary sf-button`, desk.button?.text === 'Подробнее' && desk.button.fill === desk.mark?.primary, JSON.stringify(desk.button));
  check(`${at}: the hero's picture is 4:3 with rounded corners, beside the text`, desk.picture?.ratio === 1.33 && desk.picture.radius >= 8 && desk.split === 'row', JSON.stringify({...desk.picture, split: desk.split}));
  check(`${at}: the news cards stand three in a row, rounded, outlined and apart`, desk.cards.count === 3 && desk.cards.rows === 1 && desk.cards.radius >= 8 && desk.cards.border >= 1 && desk.cards.gap >= 16, JSON.stringify(desk.cards));
  check(`${at}: the features stand three in a row, each with a 40 px icon tile`, desk.features.count === 3 && desk.features.rows === 1 && desk.features.tile === '40x40', JSON.stringify(desk.features));
  check(`${at}: the footer is a line apart, with its text and its links`, desk.footer?.line >= 1 && desk.footer.parts === 2, JSON.stringify(desk.footer));
  check(`${at}: no text touches the sheet's sides`, desk.nearest >= 16, `${desk.nearest} px`);

  // ---------------------------------------------------------------- 11: the words
  const latin = (desk.words.match(/[A-Za-z][A-Za-z+]*/g) ?? []).filter((word) => !['SIMAI', 'Framework', 'Cmd+Z', 'Esc', 'Enter'].includes(word));
  check(`${at}: every seeded word on the page is Russian`, latin.length === 0, latin.join(' ') || 'none');


  await screen(page, 'phone');
  if (shots) await (await page.$('.sf-editor-page')).screenshot({path: `${shots}/home-phone-${scheme}.png`});
  const phone = await measure(page);
  check(`${at}, phone: the header keeps the logo and the search button, the menu folds`, phone.links === 0 && phone.search.button && phone.headerFits, JSON.stringify({links: phone.links, ...phone.search}));
  check(`${at}, phone: the hero's picture stands under its text`, phone.split === 'stacked', phone.split);
  check(`${at}, phone: cards and features stand one under another`, phone.cards.rows === 3 && phone.features.rows === 3, `cards ${phone.cards.rows}, features ${phone.features.rows} rows`);
  check(`${at}, phone: no text touches the sheet's sides`, phone.nearest >= 16, `${phone.nearest} px`);
  await context.close();
}

// ---------------------------------------------------------------- 11: the language follows
{
  const context = await run.browser.newContext({viewport: {width: 1440, height: 900}, locale: 'ru-RU'});
  const page = await context.newPage();
  await page.addInitScript(() => localStorage.getItem('ui-editor.language') || localStorage.setItem('ui-editor.language', 'ru'));
  await load(page, run.origin);
  const heading = () => page.evaluate(() => document.querySelector('.sf-editor-page h1')?.textContent.trim());
  const ru = await heading();
  await page.locator('#language button', {hasText: 'EN'}).click();
  await page.waitForTimeout(900);
  const en = await heading();
  const pages = await page.evaluate(() => [...document.querySelectorAll('#pages a')].map((a) => a.textContent.replace('description', '').trim()).join(', '));
  check('a seeded page nobody changed follows the interface into English', /^[A-Za-z ,]+$/.test(en ?? '') && en !== ru && pages === 'Home, About', `${ru} → ${en}; ${pages}`);
  await page.locator('#language button', {hasText: 'RU'}).click();
  await page.waitForTimeout(900);
  check('and back into Russian', (await heading()) === ru, await heading());
  await page.reload();
  await page.waitForSelector('body[data-ready="true"]');
  await page.waitForTimeout(600);
  check('the page it follows is kept: a reload shows it', (await heading()) === ru, await heading());
  await context.close();
}

// ---------------------------------------------------------------- 11: an older build's pages
// A browser that kept the demo pages of an earlier build: a page nobody wrote
// after it was made follows the newer seed; a page someone edited stays.
{
  const context = await run.browser.newContext({viewport: {width: 1440, height: 900}, locale: 'ru-RU'});
  const page = await context.newPage();
  await page.addInitScript(() => localStorage.setItem('ui-editor.language', 'ru'));
  await load(page, run.origin);
  await page.evaluate(async () => {
    const db = await new Promise((resolve, reject) => {
      const r = indexedDB.open('ui-editor');
      r.onsuccess = () => resolve(r.result);
      r.onerror = () => reject(r.error);
    });
    const store = () => db.transaction('pages', 'readwrite').objectStore('pages');
    const pages = await new Promise((resolve) => (store().getAll().onsuccess = (event) => resolve(event.target.result)));
    // The older build's pages: no seed mark, English words, the old hero; «О компании» edited after it was made.
    const stale = (kept, text, edited) => {
      const document = JSON.parse(JSON.stringify(kept.document).replaceAll('Страница из блоков, в одном редакторе', 'A page of blocks').replaceAll('О компании', text));
      return {id: kept.id, title: kept.title, document, created: kept.created, updated: edited ? new Date(Date.parse(kept.created) + 60000).toISOString() : kept.created};
    };
    for (const kept of pages) store().put(stale(kept, kept.id === 'about' ? 'Our company, edited' : 'About', kept.id === 'about'));
    await new Promise((resolve) => setTimeout(resolve, 200));
  });
  await page.reload();
  await page.waitForSelector('body[data-ready="true"]');
  await page.waitForTimeout(600);
  const home = await page.evaluate(() => document.querySelector('.sf-editor-page h1')?.textContent.trim());
  check("an older build's demo page nobody changed takes the new seed", home === 'Страница из блоков, в одном редакторе', home);
  await page.evaluate(() => globalThis.uiEditor.openPage('about'));
  await page.waitForTimeout(600);
  const about = await page.evaluate(() => document.querySelector('.sf-editor-page h1')?.textContent.trim());
  check('a demo page someone edited keeps its words', about === 'Our company, edited', about);
  await context.close();
}

// ---------------------------------------------------------------- 12: one bar a person works with
{
  const context = await run.browser.newContext({viewport: {width: 1440, height: 900}, locale: 'ru-RU'});
  const page = await context.newPage();
  await load(page, run.origin);
  const bars = await page.evaluate(() => ({host: Math.round(document.querySelector('#top-bar').getBoundingClientRect().height), editor: Math.round(document.querySelector('.sf-editor-bar').getBoundingClientRect().height)}));
  check("the host's bar is a thin strip over the editor's own bar", bars.host <= 32 && bars.host < bars.editor, JSON.stringify(bars));
  await context.close();
}

await run.finish();
