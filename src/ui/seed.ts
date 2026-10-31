// The pages a first visit starts with: Composition Documents of profile
// `ui-layout` built only from the Framework's builtin types. The root is a
// `layout.section`, not a `layout.page`: the page type renders a <main>, and
// the canvas already stands inside the editor's own main (docs/GAPS.md, G-03).

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

export function seedDocuments(language: Language): {id: string; title: string; document: CompositionDocument}[] {
  const s = (key: string) => seedText(language, key);
  const doc = (id: string, root: CompositionNode): CompositionDocument => ({schema: 'simai.composition.document.v1', id, profile: 'ui-layout', locale: language, root});
  return [
    {
      id: 'home',
      title: s('home.title'),
      document: doc('home', section('home-root', [
        section('home-hero', [heading('home-title', 1, s('home.title')), paragraph('home-lead', s('home.lead'))]),
        section('home-layout', [heading('home-layout-title', 2, s('home.layoutTitle')), paragraph('home-layout-text', s('home.layoutText'))]),
        section('home-content', [heading('home-content-title', 2, s('home.contentTitle')), paragraph('home-content-text', s('home.contentText'))]),
      ])),
    },
    {
      id: 'about',
      title: s('about.title'),
      document: doc('about', section('about-root', [heading('about-title', 1, s('about.title')), paragraph('about-text', s('about.text'))])),
    },
  ];
}

/** An empty page: one section with a heading, so the overlay has a place to insert. */
export function blankDocument(id: string, title: string, language: Language): CompositionDocument {
  return {schema: 'simai.composition.document.v1', id, profile: 'ui-layout', locale: language, root: section(`${id}-root`, [heading(`${id}-title`, 1, title)])};
}

/** The types the Layout mode's simple list offers, until ui-pro's block picker (plan step 5). */
export const STARTER_TYPES = ['content.heading', 'content.paragraph', 'layout.section'] as const;

/** A new node of one of STARTER_TYPES, with words in the page's language. */
export function starterNode(type: (typeof STARTER_TYPES)[number], id: (base: string) => string, language: Language): CompositionNode {
  const s = (key: string) => seedText(language, key);
  if (type === 'content.heading') return heading(id('heading'), 2, s('starter.heading'));
  if (type === 'content.paragraph') return paragraph(id('paragraph'), s('starter.paragraph'));
  return section(id('section'), [paragraph(id('paragraph'), s('starter.paragraph'))]);
}
