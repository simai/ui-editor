// sf-editor, light: a short page with a heading, two paragraphs and two
// columns, no site template and no data sources. The editor keeps nothing:
// every change is a change event with the whole Document, which a real host
// saves; here the line under the editor counts the blocks.
const page = {
  schema: 'simai.composition.document',
  schema_version: 1,
  id: 'light',
  profile: 'ui-layout',
  locale: 'ru',
  root: {
    id: 'root',
    type: 'layout.page',
    slots: {
      default: [
        {id: 's1', type: 'layout.section', props: {width: 'normal'}, slots: {default: [
          {id: 'a1', type: 'layout.area', slots: {default: [
            {id: 'h1', type: 'content.heading', data: {level: 1, content: [{type: 'text', value: 'Страница из блоков'}]}},
            {id: 'p1', type: 'content.paragraph', data: {content: [{type: 'text', value: 'Щёлкните по тексту, чтобы печатать, или рядом с ним, чтобы выбрать блок.'}]}},
            {id: 'p2', type: 'content.paragraph', data: {content: [{type: 'text', value: 'Esc поднимает на уровень выше, Enter опускает ниже, + между блоками добавляет новый.'}]}},
          ]}},
        ]}},
        {id: 's2', type: 'layout.section', props: {width: 'normal'}, slots: {default: [
          {id: 'c1', type: 'layout.columns', props: {columns: {xs: 1, md: 2}}, slots: {columns: [
            {id: 'a2', type: 'layout.area', slots: {default: [
              {id: 'h2', type: 'content.heading', data: {level: 2, content: [{type: 'text', value: 'Слева'}]}},
              {id: 'p3', type: 'content.paragraph', data: {content: [{type: 'text', value: 'Колонка на компьютере, строка на телефоне.'}]}},
            ]}},
            {id: 'a3', type: 'layout.area', slots: {default: [
              {id: 'h3', type: 'content.heading', data: {level: 2, content: [{type: 'text', value: 'Справа'}]}},
              {id: 'p4', type: 'content.paragraph', data: {content: [{type: 'text', value: 'Перетащите блок за ручку к краю соседнего.'}]}},
            ]}},
          ]}},
        ]}},
      ],
    },
  },
};

/** The number of blocks in a Document, every slot walked. */
const count = (node) => 1 + Object.values(node.slots ?? {}).flat().reduce((sum, child) => sum + count(child), 0);

const initializeEditor = async () => {
  await customElements.whenDefined('sf-editor');
  const editor = document.querySelector('#light-editor');
  if (!editor || editor.dataset.exampleReady === 'true') return;
  editor.dataset.exampleReady = 'true';
  editor.rights = {layout: true, template: false, builder: false};
  editor.document = page;
  const log = document.querySelector('#light-editor-log');
  editor.addEventListener('change', (event) => {
    const document = event.detail?.document;
    if (document?.root) log.textContent = `Изменено: блоков на странице ${count(document.root) - 1}.`;
  });
};

initializeEditor();
