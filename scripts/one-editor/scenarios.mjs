// The one block editor's acceptance scenarios (owner decision 2026-11-03,
// Part C1 of ONE-EDITOR-ASSIGNMENT): the flows of the prototype's «Попробуйте»
// list and of Part B's list, written against a driver, so the same scenarios
// run on the accepted prototype now and on the ui-pro component after its
// release. docs/ONE-EDITOR.md lists them with their sources.
//
// A scenario names what it needs beyond a page (`needs`); a driver that lacks
// it skips the scenario and says why. Blocks are found in the Document by type
// and text, never by a fixed id: the component will mint its own.

/** Every node of the Document with its parent's id and its place. */
export function nodes(doc) {
  const out = [];
  const walk = (node, parent, index) => {
    out.push({...node, parent, index});
    for (const [slot, children] of Object.entries(node.slots ?? {})) children.forEach((child, i) => walk(child, node.id, i, slot));
  };
  walk(doc, null, 0);
  return out;
}
const plain = (html) => String(html ?? '').replace(/<[^>]+>/gu, '').replace(/&nbsp;/gu, ' ');
const textOf = (node) => plain(node?.data?.text);
const find = async (d, test) => nodes(await d.doc()).find(test);
const all = async (d, test) => nodes(await d.doc()).filter(test);
const childIds = async (d, id) => nodes(await d.doc()).filter((n) => n.parent === id).map((n) => n.id);
/** The text area (`layout.area`) the page was seeded with, its heading and first paragraph. */
async function area(d) {
  const list = nodes(await d.doc());
  const box = list.find((n) => n.type === 'layout.area');
  const inside = list.filter((n) => n.parent === box.id);
  return {
    id: box.id,
    section: box.parent,
    heading: inside.find((n) => n.type === 'content.heading'),
    paragraph: inside.find((n) => n.type === 'content.paragraph'),
    list: inside.find((n) => n.type === 'content.list'),
    children: inside.map((n) => n.id),
  };
}
const sectionOf = async (d, type) => (await find(d, (n) => n.type === type))?.parent;

export const scenarios = [
  {
    id: 'S01',
    name: 'Selection by depth: a click on text types, Esc goes up, Enter goes down, a click on a frame chooses',
    from: ['B: select by depth, with Esc and Enter', 'help: «Щелчок по тексту», «Esc — на уровень выше, Enter — внутрь»'],
    async run(d, check) {
      const a = await area(d);
      await d.clickText(a.paragraph.id);
      check('a click on text puts the caret in it', (await d.typing()) === a.paragraph.id);
      await d.type(' Дописано.');
      check('typing goes into the Document at once', textOf(await find(d, (n) => n.id === a.paragraph.id)).endsWith('Дописано.'));
      await d.press('Escape');
      check('Esc from text chooses its block', (await d.typing()) === null && (await d.selected()) === a.paragraph.id);
      await d.press('Escape');
      check('Esc again chooses the text area', (await d.selected()) === a.id);
      await d.press('Escape');
      check('Esc again chooses the section', (await d.selected()) === a.section);
      await d.press('Enter');
      check('Enter on the section goes into its first child', (await d.selected()) === a.id);
      await d.press('Enter');
      check('Enter on the area goes into its first block', (await d.selected()) === a.children[0]);
      await d.press('Enter');
      check('Enter on a text block puts the caret in its text', (await d.typing()) === a.children[0]);
      await d.press('Escape');
      await d.clickFrame(a.section);
      check('a click on a block\'s frame, outside its text, chooses that block', (await d.selected()) === a.section);
      const cards = await find(d, (n) => n.type === 'data.cards');
      check('hover shows the gutter beside the block under the pointer', (await d.hover(cards.id)) === cards.id);
    },
  },
  {
    id: 'S02',
    name: 'One catalogue: recent, favourites and sections in one list, variants, search over every section',
    from: ['B: one catalogue: sections, variants, search, favourites and recent', 'owner, second review 2026-11-03: no Text/Blocks tabs, one list of sections'],
    async run(d, check) {
      let lib = await d.library();
      check('the library is one list, with no tabs', lib.tabs.length === 0, JSON.stringify(lib.tabs));
      check('its sections are Текст, Медиа, Элементы, Макет, Части страницы, Маркетинг, Данные, Формы, Сохранённые', ['Текст', 'Медиа', 'Элементы', 'Макет', 'Части страницы', 'Маркетинг', 'Данные', 'Формы', 'Сохранённые'].every((x) => lib.items.includes(x)), lib.items.join());
      check('Favourites stand above the sections', lib.heads.indexOf('Избранное') >= 0 && lib.heads.indexOf('Избранное') < lib.heads.indexOf('Разделы'), lib.heads.join());
      await d.librarySection('Маркетинг');
      lib = await d.library();
      check('a section lists its types', lib.items.includes('Первый экран'), lib.items.join());
      check('and shows their variants as pictures', (await d.variants()).includes('С картинкой справа'));
      await d.libraryBack();
      check('«back» returns to the sections', (await d.library()).items.includes('Маркетинг'));
      await d.librarySection('Макет');
      lib = await d.library();
      check('Макет holds the section, the columns, the text area, the container, the grid and the empty space', ['Секция', 'Колонки', 'Область текста', 'Контейнер', 'Сетка', 'Пустое место'].every((x) => lib.items.includes(x)), lib.items.join());
      await d.librarySection('Элементы');
      lib = await d.library();
      check('Элементы holds the button, the icon button, the label and the icon', ['Кнопка', 'Кнопка-значок', 'Метка', 'Значок'].every((x) => lib.items.includes(x)), lib.items.join());
      await d.librarySection('Текст');
      check('a block may stand in two sections: the button shows in Текст too', (await d.library()).items.includes('Кнопка'));
      await d.libraryBack();
      await d.librarySearch('кнопка');
      lib = await d.library();
      check('search covers every section and names each result\'s section', lib.items.includes('Кнопка') && lib.items.includes('Призыв к действию') && lib.heads.includes('Элементы') && lib.heads.includes('Маркетинг'), JSON.stringify(lib));
      check('search lists a block in two sections once', lib.items.filter((x) => x === 'Кнопка').length === 1, lib.items.join());
      await d.librarySearch('разделитель');
      check('search finds the divider', (await d.library()).items.includes('Разделитель'));
      await d.librarySearch('');
      await d.librarySection('Текст');
      await d.favourite('Цитата');
      await d.libraryBack();
      lib = await d.library();
      check('a star puts a block in Favourites', lib.favourites.includes('Цитата') && lib.heads.includes('Избранное'), JSON.stringify(lib));
      const a = await area(d);
      await d.choose(a.paragraph.id);
      await d.focusLibrarySearch();
      await d.type('аб');
      await d.press('Backspace');
      await d.press('Backspace');
      check('Backspace in the library\'s search edits the search, not the page', Boolean(await find(d, (n) => n.id === a.paragraph.id)));
      await d.choose(a.paragraph.id);
      await d.libraryClick('Заметка');
      const after = await childIds(d, a.id);
      const inserted = await find(d, (n) => n.parent === a.id && n.type === 'content.alert' && n.index === after.indexOf(a.paragraph.id) + 1);
      check('a click in the library inserts the block after the chosen one', Boolean(inserted), after.join());
      await d.press('Escape');
      check('what was inserted shows in Recent', (await d.library()).heads.includes('Недавние'));
    },
  },
  {
    id: 'S03',
    name: 'Insert three ways: + offers what fits the place, / in text, drag from the library',
    from: ['B: insert by + between blocks, / in text, and drag from the library', 'help: «+ между блоками предлагает то, что подходит месту»'],
    async run(d, check) {
      const root = (await d.doc()).id;
      const a = await area(d);
      const sections = await childIds(d, root);
      await d.seamPlus(root, sections.indexOf(a.section) + 1);
      let picker = await d.picker();
      check('between sections the + opens on the list of sections', picker?.section === null && picker.items.includes('Маркетинг'), JSON.stringify(picker));
      await d.pickerSection('Маркетинг');
      await d.pick('Призыв к действию');
      const cta = await find(d, (n) => n.type === 'marketing.cta');
      check('a block between sections stands in a section of its own, at that seam', cta && (await childIds(d, root)).indexOf(cta.parent) === sections.indexOf(a.section) + 1, JSON.stringify({parent: cta?.parent, index: cta?.index, at: (await childIds(d, root)).indexOf(cta?.parent), want: sections.indexOf(a.section) + 1, root, rootKids: await childIds(d, root)}));
      await d.press('Escape');
      await d.press('Escape');

      await d.seamPlus(a.id, 1);
      picker = await d.picker();
      check('inside a text area the + opens straight on Текст', picker?.section === 'Текст' && picker.items.includes('Абзац'), JSON.stringify(picker));
      check('what the place cannot accept is not offered', !picker.items.includes('Секция') && !picker.items.includes('Первый экран') && !picker.items.includes('Шапка сайта'), picker.items.join());
      await d.pick('Цитата');
      const quote = await find(d, (n) => n.parent === a.id && n.type === 'content.quote');
      check('the + inserts at its seam and the caret waits in the new block', quote?.index === 1 && (await d.typing()) === quote.id, JSON.stringify(quote));

      await d.clickText(a.paragraph.id);
      await d.press('Enter');
      const empty = await d.typing();
      check('Enter at the end of a paragraph opens a new one with the caret', empty && empty !== a.paragraph.id);
      await d.type('/');
      check('/ in an empty line opens straight on Текст', (await d.picker())?.section === 'Текст', JSON.stringify(await d.picker()));
      // A synonym in Latin letters: the list knows a block by its other names too.
      await d.type('alert');
      check('typing after / filters the list, by name or synonym', (await d.picker())?.items[0] === 'Заметка', JSON.stringify(await d.picker()));
      const notes = new Set((await all(d, (n) => n.type === 'content.alert')).map((n) => n.id));
      await d.press('Enter');
      const note = await find(d, (n) => n.parent === a.id && n.type === 'content.alert' && !notes.has(n.id));
      check('Enter turns the empty line into the chosen block', note && !(await find(d, (n) => n.id === empty)), JSON.stringify(note));
      await d.press('Escape');

      const heading = a.heading;
      await d.libraryDrag('Список', heading.id, 'after');
      const list = (await all(d, (n) => n.parent === a.id && n.type === 'content.list')).find((n) => n.id !== a.list.id);
      check('a block dragged from the library lands where the drop line showed', list && list.index === (await childIds(d, a.id)).indexOf(heading.id) + 1, JSON.stringify(list) + ' ' + nodes(await d.doc()).filter((n) => n.parent === a.id).map((n) => n.type).join());
    },
  },
  {
    id: 'S04',
    name: 'Move any block: the gutter grip, Alt+arrows when chosen, Alt+Shift+arrows from text; a click on the grip opens the menu',
    from: ['B: move any block by a gutter grip, Alt+arrows, or Alt+Shift+arrows from text', 'help: «Слева от любого блока — + и ручка»'],
    async run(d, check) {
      const a = await area(d);
      await d.dragGrip(a.list.id, a.heading.id, 'before');
      check('dragging the grip moves the block to the drop line', (await childIds(d, a.id))[0] === a.list.id, (await childIds(d, a.id)).join());
      await d.choose(a.list.id);
      const at = (await childIds(d, a.id)).indexOf(a.list.id);
      await d.press('Alt+ArrowDown');
      check('Alt+↓ moves the chosen block down', (await childIds(d, a.id)).indexOf(a.list.id) === at + 1 && (await d.selected()) === a.list.id);
      await d.clickText(a.paragraph.id);
      const before = (await childIds(d, a.id)).indexOf(a.paragraph.id);
      await d.press('Alt+Shift+ArrowUp');
      check('Alt+Shift+↑ from text moves the block and keeps the caret in it', (await childIds(d, a.id)).indexOf(a.paragraph.id) === before - 1 && (await d.typing()) === a.paragraph.id);
      await d.press('Escape');
      await d.gripMenu(a.heading.id);
      const items = await d.menuItems();
      check('a click on the grip chooses the block and opens its menu', (await d.selected()) === a.heading.id && items.includes('Удалить'), items.join());
      await d.press('Escape');
    },
  },
  {
    id: 'S05',
    name: 'Columns: «Разделить на колонки» from the menu or a side drop; one on the phone; one undo reverts the split',
    from: ['B: split into columns from the menu or by a side drop', 'help: «Колонки: тяните блок к левому или правому краю другого»'],
    async run(d, check) {
      const news = await find(d, (n) => n.type === 'content.heading' && textOf(n) === 'Новости');
      await d.choose(news.id);
      await d.toolbarMenu();
      await d.menu('Разделить на колонки');
      let columns = await find(d, (n) => n.type === 'layout.columns' && n.parent === news.parent);
      const split = columns && nodes(await d.doc()).filter((n) => n.parent === columns.id);
      check('the menu splits the block into two columns, the block in the left one', split?.length === 2 && (await childIds(d, split[0].id))[0] === news.id && (await childIds(d, split[1].id)).length === 0, JSON.stringify(columns));
      check('new columns stand one under another on the phone', /\bgrid-col-1 md:grid-col-2\b/u.test(await d.html(columns.id)));
      await d.undo();
      check('one undo reverts the split', (await find(d, (n) => n.id === news.id)).parent === news.parent && !(await find(d, (n) => n.type === 'layout.columns' && n.parent === news.parent)));

      await d.libraryDrag('Цитата', news.id, 'right');
      columns = await find(d, (n) => n.type === 'layout.columns' && n.parent === news.parent);
      const sides = columns && nodes(await d.doc()).filter((n) => n.parent === columns.id);
      check('a block dropped at the right edge of another stands beside it', sides?.length === 2 && (await childIds(d, sides[0].id))[0] === news.id && (await find(d, (n) => n.parent === sides[1].id))?.type === 'content.quote', JSON.stringify(columns));
      const quote = await find(d, (n) => n.parent === sides[1].id);
      await d.libraryDrag('Заметка', quote.id, 'right');
      check('a side drop inside a column adds a column', (await childIds(d, columns.id)).length === 3);
    },
  },
  {
    id: 'S06',
    name: 'Parameters: each value names its origin, «сбросить» returns the inherited one, values per screen become modifiers',
    from: ['B: a parameter panel that shows each value\'s origin (type → theme → variant → block → screen) and a per-screen switch', 'try: «Переключите телефон вверху и задайте колонкам 1»'],
    async run(d, check) {
      const hero = await sectionOf(d, 'marketing.hero');
      await d.choose(hero);
      let fld = await d.field('Фон');
      check('a value from the variant says so', fld?.value === 'Мягкий' && fld.origin === 'вариант', JSON.stringify(fld));
      await d.setField('Фон', 'Акцент');
      fld = await d.field('Фон');
      check('a value set here says «этот блок»', fld?.value === 'Акцент' && fld.origin === 'этот блок' && fld.own, JSON.stringify(fld));
      await d.resetField('Фон');
      check('«сбросить» returns the inherited value', (await d.field('Фон'))?.origin === 'вариант');
      check('a value nobody set comes from the type', (await d.field('Отступы сверху и снизу'))?.origin === 'тип');

      const columns = await find(d, (n) => n.type === 'layout.columns');
      await d.choose(columns.id);
      await d.screen('телефон');
      await d.setField('Колонок', '1');
      fld = await d.field('Колонок');
      check('on the phone a value is set for the phone only', fld?.value === '1' && fld.origin === 'телефон', JSON.stringify(fld));
      await d.screen('компьютер');
      check('the desktop keeps its value', (await d.field('Колонок'))?.value === '2');
      const html = await d.html(columns.id);
      check('the HTML prints Framework modifiers, mobile first, a prefix only where the value changes', /\bgrid-col-1 md:grid-col-2\b/u.test(html) && !/lg:grid-col/u.test(html), html.split('\n')[0]);
    },
  },
  {
    id: 'S07',
    name: 'Data: the source, the field mapping, the states inside the block, the runtime binding',
    from: ['B: a Data tab: source, mapping, states, runtime binding', 'try: «Выберите Список карточек → вкладка Данные»'],
    async run(d, check) {
      const cards = await find(d, (n) => n.type === 'data.cards');
      await d.choose(cards.id);
      check('a data block has the Data tab', (await d.panel()).tabs.includes('Данные'));
      await d.panelTab('Данные');
      check('the source is the host\'s', (await d.field('Источник'))?.value.startsWith('Новости'));
      await d.setField('Источник', 'Товары — Larena · модель Product');
      check('another source fills the same cards', (await d.blockText(cards.id)).includes('Лицензия SIMAI Pro'));
      const map = await d.mapping();
      check('its fields are mapped by the host\'s preset', map.title === 'title' && map.image === 'cover', JSON.stringify(map));
      check('the binding is stored in the Document', (await find(d, (n) => n.id === cards.id)).bindings[0].ref === 'products');
      await d.preview('Пусто');
      check('«Пусто» shows the author\'s text inside the block', (await d.blockText(cards.id)).includes('Здесь пока ничего нет'));
      await d.preview('Ошибка');
      const heading = await find(d, (n) => n.type === 'content.heading' && textOf(n) === 'Новости');
      check('an error stays inside its block, the page still draws', (await d.blockText(cards.id)).includes('Источник не ответил') && (await d.blockText(heading.id)).includes('Новости'));
      await d.preview('Данные');
      const pagination = await find(d, (n) => n.type === 'data.pagination');
      check('the pagination is bound to the list, not to a source', pagination.bindings?.[0]?.owner === 'section' && pagination.bindings[0].ref === cards.id && pagination.bindings[0].target === 'pagination', JSON.stringify(pagination.bindings));
      await d.choose(pagination.id);
      await d.panelTab('Данные');
      check('its Data tab names the list it reads', (await d.field('Связан со списком'))?.value.startsWith('Список карточек'));
      await d.panelTab('Параметры');
    },
  },
  {
    id: 'S08',
    name: 'Block builder: a site block from existing blocks, closed on the page, changed everywhere',
    from: ['B: the block builder: compose, set the grid, expose parameters, save a site block, change it everywhere', 'try: «Выберите первый экран → меню → Сделать блок из этого…»'],
    async run(d, check) {
      const hero = await sectionOf(d, 'marketing.hero');
      await d.choose(hero);
      await d.toolbarMenu();
      check('a container\'s menu offers to make a block of it', (await d.menuItems()).includes('Сделать блок из этого…'));
      await d.menu('Сделать блок из этого…');
      check('the builder opens on a copy of it', Boolean(await d.builder()));
      await d.expose('Секция · Фон');
      await d.builderName('Наш первый экран');
      await d.builderSave();
      await d.librarySection('Маркетинг');
      check('the site block is in the library', (await d.library()).items.includes('Наш первый экран'));
      const features = await sectionOf(d, 'marketing.features');
      await d.choose(features);
      await d.libraryClick('Наш первый экран');
      const instance = await find(d, (n) => /^site\./u.test(n.type));
      // The prototype keeps `version`; sf-editor keeps the composed type's version in its extension.
      const version = instance?.version ?? instance?.extensions?.['simai.composition:composed']?.version;
      check('an instance is stored as its type and version, nothing else', Boolean(version) && !instance.slots && !instance.data, JSON.stringify(instance));
      await d.choose(instance.id);
      check('the author sees only the exposed parameter', (await d.panel()).fields.join() === 'Фон', (await d.panel()).fields.join());
      await d.clickText(instance.id);
      await d.type(' — наш');
      await d.press('Escape');
      // The prototype keeps the instance's texts in `data.text` as HTML; sf-editor in `data.texts`, by part, as inline content.
      const kept = (await find(d, (n) => n.id === instance.id)).data ?? {};
      const words = (t) => (Array.isArray(t) ? t.map((run) => run.value ?? '').join('') : plain(t));
      check('the author types in it, and the Document keeps only what differs', Object.values(kept.text ?? kept.texts ?? {}).some((t) => words(t).endsWith('— наш')), JSON.stringify(kept));
      await d.toolbarMenu();
      await d.menu('Изменить блок');
      const root = (await d.builder()).root;
      await d.choose(root);
      await d.setField('Отступы сверху и снизу', 'S');
      await d.builderSave();
      // A value set on the computer: the prototype prints p-y-5, sf-editor the screen's prefix where the section's other screens differ.
      check('a change to the block reaches its instance', (await d.classes(instance.id)).some((c) => /(^|:)p-y-5$/u.test(c)), (await d.classes(instance.id)).join(' '));
      check('the author\'s text stays', (await d.blockText(instance.id)).includes('— наш'));
    },
  },
  {
    id: 'S09',
    name: 'The site template: dimmed with the page, changed only through «Изменить шаблон»',
    from: ['B: treat the site template (header and footer) as a separate, explicit edit', 'try: «Шапка и подвал бледнее — это шаблон»'],
    async run(d, check) {
      const header = await find(d, (n) => n.type === 'parts.header');
      const footer = await find(d, (n) => n.type === 'parts.footer');
      check('the template is stored as the site\'s', header.extensions?.template && footer.extensions?.template);
      check('the header and footer are drawn paler', (await d.dimmed(header.id)) && (await d.dimmed(footer.id)));
      check('the template cannot be typed in on the page', !(await d.editable(footer.id)));
      await d.editTemplate(header.id);
      check('«Изменить шаблон» says the change reaches every page', await d.shows('на всех'));
      check('in the template edit the footer is typed in and the page is not', (await d.editable(footer.id)) && !(await d.editable((await area(d)).paragraph.id)));
      await d.templateDone();
      check('«Готово» locks the template again', !(await d.editable(footer.id)));
    },
  },
  {
    id: 'S10',
    name: 'Rights from the host: an author types in text areas only; the rest is locked and says who changes it',
    from: ['B: take rights from the host, with no role switch; the author writes only in layout.area', 'try: «Посмотреть глазами автора»'],
    async run(d, check) {
      const a = await area(d);
      const hero = await sectionOf(d, 'marketing.hero');
      check('the editor has no role switch', !(await d.roleSwitch()));
      await d.grant('author');
      check('an author types in the text area', await d.editable(a.paragraph.id));
      check('the layout around it is locked', (await d.locked(hero)) && !(await d.editable(hero)));
      const seams = await d.seams();
      const inArea = new Set(nodes(await d.doc()).filter((n) => n.id === a.id || n.parent === a.id).map((n) => n.id));
      check('an author inserts only inside text areas', seams.length > 0 && seams.every((id) => inArea.has(id)), seams.join());
      await d.clickFrame(hero);
      check('a click on a locked part says who changes it', await d.shows('Её меняет дизайнер'));
    },
  },
  {
    id: 'S11',
    name: 'Named places: the split hero\'s picture is a real block, removed and added back',
    from: ['B (Part A 5): named slots', 'try: «Первый экран: картинка справа — обычный блок»'],
    async run(d, check) {
      const hero = await find(d, (n) => n.type === 'marketing.hero');
      const image = await find(d, (n) => n.parent === hero.id && n.type === 'content.image');
      await d.choose(image.id);
      check('the picture is chosen as a block of its own', (await d.panel()).title === 'Картинка');
      await d.press('Backspace');
      check('it can be removed', !(await find(d, (n) => n.parent === hero.id && n.type === 'content.image')));
      check('the empty place offers «Картинка или видео»', (await d.blockText(hero.id)).includes('Картинка или видео'));
      await d.slotAdd(hero.id);
      check('the place takes a picture again', Boolean(await find(d, (n) => n.parent === hero.id && n.type === 'content.image')));
    },
  },
  {
    id: 'S12',
    name: 'The theme is the site\'s: its defaults reach every block but values set in a block',
    from: ['B: read the theme from the host\'s settings; the editor never edits it', 'try: «Показать с компактной темой»'],
    async run(d, check) {
      const a = await area(d);
      const features = await sectionOf(d, 'marketing.features');
      await d.choose(features);
      await d.setField('Отступы сверху и снизу', 'L');
      await d.choosePage();
      check('the page names the site\'s theme and links to the site\'s settings, with no theme editor', (await d.shows('Тема сайта')) && (await d.shows('Настройки сайта')));
      await d.siteTheme('компактная');
      await d.choose(a.section);
      const fld = await d.field('Отступы сверху и снизу');
      check('a section with no value of its own takes the theme\'s', fld?.value === 'M' && fld.origin === 'тема', JSON.stringify(fld));
      await d.choose(features);
      check('a value set in the block stays', (await d.field('Отступы сверху и снизу'))?.value === 'L');
    },
  },
  {
    id: 'S13',
    name: 'One undo history for typing and structure, in order, and redo',
    from: ['B: keep one undo history for typing and structure', 'help: «Cmd+Z отменяет всё по порядку»'],
    async run(d, check) {
      const a = await area(d);
      const original = textOf(a.paragraph);
      await d.clickText(a.paragraph.id);
      await d.type(' Шаг.');
      await d.press('Escape');
      const at = (await childIds(d, a.id)).indexOf(a.paragraph.id);
      await d.press('Alt+ArrowDown');
      check('typed, then moved', (await childIds(d, a.id)).indexOf(a.paragraph.id) === at + 1);
      await d.undo();
      check('the first undo takes back the move, the typing stays', (await childIds(d, a.id)).indexOf(a.paragraph.id) === at && textOf(await find(d, (n) => n.id === a.paragraph.id)).endsWith('Шаг.'));
      await d.undo();
      check('the second undo takes back the typing', textOf(await find(d, (n) => n.id === a.paragraph.id)) === original);
      await d.redo();
      check('redo brings the typing back', textOf(await find(d, (n) => n.id === a.paragraph.id)).endsWith('Шаг.'));
    },
  },
  {
    id: 'S14',
    name: 'Several text areas on one page: a section with an area is added, typed in and moved',
    from: ['G-18: several areas per page', 'the owner\'s scenario of 2026-11-03: add an area, type a heading and a paragraph, move it'],
    async run(d, check) {
      const root = (await d.doc()).id;
      const features = await sectionOf(d, 'marketing.features');
      await d.seamPlus(root, (await childIds(d, root)).indexOf(features));
      await d.pickerSection('Макет');
      await d.pick('Секция', 'С областью текста');
      const areas = await all(d, (n) => n.type === 'layout.area');
      check('a page holds a second text area', areas.length === 2, areas.length);
      const fresh = areas.find((n) => !(n.slots?.default ?? []).length);
      await d.seamPlus(fresh.id, 0);
      await d.pick('Заголовок');
      const heading = await d.typing();
      check('the + inside the empty area inserts into it', (await find(d, (n) => n.id === heading))?.parent === fresh.id);
      await d.type('Заголовок в области');
      await d.press('Enter');
      await d.type('Абзац в области.');
      const typed = await find(d, (n) => n.id === heading);
      const next = (await all(d, (n) => n.parent === typed?.parent))[typed?.index + 1];
      check('a heading and a paragraph typed there are in the one Document', typed?.type === 'content.heading' && textOf(typed) === 'Заголовок в области' && next?.type === 'content.paragraph' && textOf(next) === 'Абзац в области.', JSON.stringify([typed, next]));
      const section = fresh.parent;
      for (let i = 0; i < 3 && (await d.selected()) !== section; i += 1) await d.press('Escape');
      const at = (await childIds(d, root)).indexOf(section);
      check('Esc climbs to its section', (await d.selected()) === section);
      await d.press('Alt+ArrowUp');
      check('Alt+↑ moves the section with its text', (await childIds(d, root)).indexOf(section) === at - 1);
    },
  },
  {
    id: 'S15',
    name: 'Output: JSON keeps values, HTML prints Framework modifiers with no inline styles, own modifiers are checked',
    from: ['B: output JSON and HTML (modifiers)', 'Part A 2–3: layout parameters as modifiers, own modifiers'],
    async run(d, check) {
      const doc = await d.doc();
      check('the Document stores values, never class strings', !JSON.stringify(doc).includes('grid-col-'));
      const section = await sectionOf(d, 'data.cards');
      await d.choose(section);
      await d.setField('Свои модификаторы', 'lg:p-x-4 bogus-class');
      check('an unknown class is reported to the editor', await d.shows('Нет в SIMAI Framework: bogus-class'));
      const html = await d.html(section);
      check('the HTML has the section\'s modifiers and the own one, no inline style, no unknown class', /\bp-y-8\b/u.test(html) && /\bgap-5\b/u.test(html) && /\blg:p-x-4\b/u.test(html) && !/style=/u.test(html) && !html.includes('bogus-class'), html.split('\n').slice(0, 3).join(' '));
    },
  },
  {
    id: 'S19',
    name: 'A block\'s own items: the features\' points move, duplicate, go and come, and take an icon from a set',
    from: ['owner, second review 2026-11-03: feature items (icon picker, left/right/duplicate/delete, «Добавить пункт»)'],
    async run(d, check) {
      const features = await find(d, (n) => n.type === 'marketing.features');
      const items = async () => (await find(d, (n) => n.id === features.id)).data.items;
      const first = await items();
      await d.itemAction(features.id, 0, 'right');
      let now = await items();
      check('«Правее» swaps a point with the next', now[0].title === first[1].title && now[1].title === first[0].title, now.map((i) => i.title).join());
      await d.itemAction(features.id, 1, 'left');
      check('«Левее» puts it back', (await items()).map((i) => i.title).join() === first.map((i) => i.title).join());
      await d.itemAction(features.id, 0, 'dup');
      now = await items();
      check('«Дублировать» copies a point next to it', now.length === first.length + 1 && now[1].title === first[0].title);
      await d.itemAction(features.id, 1, 'del');
      check('«Удалить» removes a point', (await items()).length === first.length);
      await d.addItem(features.id);
      now = await items();
      check('«Добавить пункт» adds an empty point and the caret waits in its title', now.length === first.length + 1 && now.at(-1).title === '' && (await d.typing()) === features.id);
      await d.type('Новый пункт');
      check('what is typed is the new point\'s title', plain((await items()).at(-1).title) === 'Новый пункт');
      await d.press('Escape');
      await d.pickIcon(features.id, 0, 'rocket_launch');
      check('a point\'s icon is picked from the set', (await items())[0].icon === 'rocket_launch');
      await d.undo();
      check('one undo takes the icon back', (await items())[0].icon === first[0].icon);
    },
  },
  {
    id: 'S20',
    name: 'Columns: the + at the right edge adds a column; a duplicate or a removal keeps the count',
    from: ['owner, second review 2026-11-03: the columns\' +, duplicating and removing a column updates the count'],
    async run(d, check) {
      const columns = await find(d, (n) => n.type === 'layout.columns');
      const state = async () => {
        const node = await find(d, (n) => n.id === columns.id);
        return {count: node.slots.default.length, cols: node.props?.cols};
      };
      await d.addColumn(columns.id);
      let now = await state();
      check('the + adds a column and the count follows', now.count === 3 && now.cols === '3', JSON.stringify(now));
      const added = await d.selected();
      check('the new column is chosen', (await find(d, (n) => n.id === added))?.type === 'layout.column');
      await d.press('ControlOrMeta+d');
      now = await state();
      check('a duplicated column is a fourth, the count follows', now.count === 4 && now.cols === '4', JSON.stringify(now));
      check('at four columns the + goes', !(await d.block(columns.id).locator(':scope > .cadd').count()));
      await d.press('Backspace');
      now = await state();
      check('a removed column takes the count down', now.count === 3 && now.cols === '3', JSON.stringify(now));
      await d.undo();
      check('one undo brings it back', (await state()).count === 4);
    },
  },
  {
    id: 'S21',
    name: 'Markdown habits: «- », «1. », «# », «## », «### » and «> » at a paragraph\'s start turn it into that block; Enter on an empty last point leaves a list',
    from: ['owner, second review 2026-11-03: Markdown shortcuts, one undo returns the paragraph, the list\'s «Вид»'],
    async run(d, check) {
      const a = await area(d);
      const fresh = async (mark) => {
        await d.clickText(a.paragraph.id);
        await d.press('Enter');
        const id = await d.typing();
        await d.type(mark);
        return id;
      };
      const shaped = async (old) => {
        const ids = await childIds(d, a.id);
        const now = await d.typing();
        return {gone: !ids.includes(old), node: await find(d, (n) => n.id === now)};
      };
      for (const [mark, type, test] of [
        ['## ', 'content.heading', (n) => n.props?.level === '2'],
        ['### ', 'content.heading', (n) => n.props?.level === '3'],
        ['# ', 'content.heading', (n) => n.props?.level === '1'],
        ['> ', 'content.quote', () => true],
        ['1. ', 'content.list', (n) => n.props?.kind === 'ordered'],
      ]) {
        const old = await fresh(mark);
        const got = await shaped(old);
        check(`«${mark.trim()}» turns the paragraph into ${type}${type === 'content.heading' ? ' ' + mark.trim().length : ''}`, got.gone && got.node?.type === type && test(got.node), JSON.stringify(got.node));
        await d.press('Escape');
      }
      const old = await fresh('- ');
      const list = (await shaped(old)).node;
      check('«- » turns it into a bulleted list with the caret in it', list?.type === 'content.list' && (list.props?.kind ?? 'bullet') === 'bullet', JSON.stringify(list));
      await d.type('Пункт');
      await d.press('Enter');
      await d.press('Enter');
      const after = await d.typing();
      const items = (await find(d, (n) => n.id === list.id)).data.items;
      check('Enter on an empty last point leaves the list for a new paragraph', after !== list.id && (await find(d, (n) => n.id === after))?.type === 'content.paragraph' && items.map(plain).join() === 'Пункт', items.join());
      await d.type('# ');
      const heading = await d.typing();
      await d.undo();
      const back = await find(d, (n) => n.id === after);
      check('one undo returns the paragraph', back?.type === 'content.paragraph' && !(await find(d, (n) => n.id === heading && n.type === 'content.heading')), JSON.stringify(back));
      await d.choose(list.id);
      await d.setField('Вид', '1, 2, 3');
      check('the list\'s «Вид» makes it numbered', (await find(d, (n) => n.id === list.id)).props?.kind === 'ordered' && /<ol/u.test(await d.html(list.id)));
    },
  },
  {
    id: 'S22',
    name: 'Visibility per screen: a block hidden on the phone is faded on the canvas and hidden by modifiers in the HTML',
    from: ['owner, third review 2026-11-03: every block has «Показывать на этом экране»'],
    async run(d, check) {
      const a = await area(d);
      await d.choose(a.paragraph.id);
      check('every block offers «Показывать на этом экране»', (await d.panel()).fields.includes('Показывать на этом экране'), (await d.panel()).fields.join());
      await d.screen('телефон');
      await d.setField('Показывать на этом экране', 'Нет');
      check('hidden on the phone, the block stays on the canvas, faded', await d.faded(a.paragraph.id));
      await d.screen('компьютер');
      check('on the desktop it is drawn as usual', !(await d.faded(a.paragraph.id)));
      const html = await d.html(a.paragraph.id);
      check('the HTML hides it on the phone and shows it from the tablet up, by modifiers', /\bhidden md:block\b/u.test(html), html.split('\n')[0]);
      check('the Document keeps the value, not the classes', !JSON.stringify(await find(d, (n) => n.id === a.paragraph.id)).includes('hidden'));
    },
  },
  {
    id: 'S16',
    name: 'Markdown: a text area converts to Markdown',
    from: ['B: output Markdown for text areas'],
    needs: ['markdown'],
    async run(d, check) {
      const md = await d.markdown((await area(d)).id);
      check('the area\'s heading is a Markdown heading and its list a Markdown list', /^## Как здесь работать$/mu.test(md) && /^- /mu.test(md), md.slice(0, 200));
    },
  },
  {
    id: 'S17',
    name: 'The host keeps the page: after a reload the layout, the texts and the bindings are as they were',
    from: ['C2: the page store through the host', 'the owner\'s scenario of 2026-11-03: reload, content kept, layout kept'],
    needs: ['host'],
    async run(d, check) {
      const a = await area(d);
      await d.clickText(a.paragraph.id);
      await d.type(' Сохранено.');
      await d.press('Escape');
      await d.press('Alt+ArrowUp');
      const before = await d.doc();
      await d.reload();
      check('a reload brings the same Document back', JSON.stringify(await d.doc()) === JSON.stringify(before));
    },
  },
  {
    id: 'S18',
    name: 'Keyboard and accessibility: Tab to the canvas, arrows between blocks, Enter in, Esc out; axe finds nothing in each state',
    from: ['the a11y suite of ui-editor', 'help: «↑ ↓ — соседний блок»'],
    needs: ['axe'],
    async run(d, check) {
      check('Tab reaches the canvas', await d.tabTo('canvas'));
      await d.press('ArrowDown');
      const first = await d.selected();
      await d.press('ArrowDown');
      check('↓ chooses the next block', (await d.selected()) !== first);
      await d.press('Enter');
      await d.press('Escape');
      check('Enter and Esc keep the focus on the canvas', await d.focusOnCanvas());
      for (const state of ['nothing chosen', 'a block chosen', 'typing', 'the + list open', 'the Data tab']) {
        await d.reach(state);
        const found = await d.axe();
        check(`axe: ${state}`, found.length === 0, found.join(' | '));
      }
    },
  },
];
