// The pages a first visit starts with. A page is two Composition Documents of
// the Framework's builtin types: its layout (profile `ui-layout`), which holds
// one `content.outlet`, and its content (profile `structured-content`, root
// `content.document`), which SF.Composition.render draws in the outlet's place
// and sf-content-editor types in. The layout's root is a `layout.section`, not
// a `layout.page`: the page type renders a <main>, and the canvas already
// stands inside the editor's own main (docs/GAPS.md, G-03).

import {seedText, type Language} from './i18n.ts';

export interface CompositionNode {
  id: string;
  type: string;
  data?: Record<string, unknown>;
  props?: Record<string, unknown>;
  slots?: Record<string, CompositionNode[]>;
}

export interface CompositionDocument {
  schema: 'simai.composition.document.v1';
  schema_version?: number;
  id: string;
  profile: 'ui-layout' | 'structured-content';
  locale?: string;
  root: CompositionNode;
}

const text = (value: string) => [{type: 'text', value}];
const heading = (id: string, level: number, value: string): CompositionNode => ({id, type: 'content.heading', data: {level, content: text(value)}});
const paragraph = (id: string, value: string): CompositionNode => ({id, type: 'content.paragraph', data: {content: text(value)}});
const section = (id: string, children: CompositionNode[]): CompositionNode => ({id, type: 'layout.section', slots: {default: children}});
const outlet = (id: string): CompositionNode => ({id, type: 'content.outlet'});
const item = (id: string, value: string): CompositionNode => ({id, type: 'content.list-item', data: {content: text(value)}});

export interface SeedPage {
  id: string;
  title: string;
  layout: CompositionDocument;
  content: CompositionDocument;
}

/** A page's content: a `content.document` under the page's title. */
export function contentDocument(id: string, title: string, language: Language, blocks: CompositionNode[]): CompositionDocument {
  return {schema: 'simai.composition.document.v1', id: `${id}-content`, profile: 'structured-content', locale: language, root: {id: `${id}-document`, type: 'content.document', data: {title}, slots: {default: blocks}}};
}

export function seedDocuments(language: Language): SeedPage[] {
  const s = (key: string) => seedText(language, key);
  const doc = (id: string, root: CompositionNode): CompositionDocument => ({schema: 'simai.composition.document.v1', id, profile: 'ui-layout', locale: language, root});
  return [
    {
      id: 'home',
      title: s('home.pageTitle'),
      layout: doc('home', section('home-root', [
        section('home-hero', [heading('home-title', 1, s('home.title')), paragraph('home-lead', s('home.lead'))]),
        section('home-layout', [heading('home-layout-title', 2, s('home.layoutTitle')), paragraph('home-layout-text', s('home.layoutText'))]),
        section('home-content', [heading('home-content-title', 2, s('home.contentTitle')), paragraph('home-content-text', s('home.contentText'))]),
        outlet('home-outlet'),
      ])),
      content: contentDocument('home', s('home.pageTitle'), language, [
        paragraph('home-p1', s('home.p1')),
        heading('home-h2', 2, s('home.h2')),
        {id: 'home-list', type: 'content.list', slots: {items: [item('home-li1', s('home.li1')), item('home-li2', s('home.li2')), item('home-li3', s('home.li3'))]}},
        paragraph('home-p2', s('home.p2')),
      ]),
    },
    {
      id: 'about',
      title: s('about.title'),
      layout: doc('about', section('about-root', [outlet('about-outlet')])),
      content: contentDocument('about', s('about.title'), language, [paragraph('about-text', s('about.text'))]),
    },
  ];
}

/** An empty page: a layout of one section around the outlet, and content of one empty paragraph under the title. */
export function blankPage(id: string, title: string, language: Language): SeedPage {
  return {
    id,
    title,
    layout: {schema: 'simai.composition.document.v1', id, profile: 'ui-layout', locale: language, root: section(`${id}-root`, [outlet(`${id}-outlet`)])},
    content: contentDocument(id, title, language, [{id: `${id}-p1`, type: 'content.paragraph', data: {content: []}}]),
  };
}

/** The types the Layout mode's simple list offers, until ui-pro's block picker
    (plan step 5): the outlet is the area where the page's content stands. */
export const STARTER_TYPES = ['content.heading', 'content.paragraph', 'layout.section', 'content.outlet'] as const;

/** A new node of one of STARTER_TYPES, with words in the page's language. */
export function starterNode(type: (typeof STARTER_TYPES)[number], id: (base: string) => string, language: Language): CompositionNode {
  const s = (key: string) => seedText(language, key);
  if (type === 'content.heading') return heading(id('heading'), 2, s('starter.heading'));
  if (type === 'content.paragraph') return paragraph(id('paragraph'), s('starter.paragraph'));
  if (type === 'content.outlet') return outlet(id('outlet'));
  return section(id('section'), [paragraph(id('paragraph'), s('starter.paragraph'))]);
}
