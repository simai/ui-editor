// The pages a first visit starts with. A page is one Composition Document
// (profile `ui-layout`): layout and text are one tree, edited by sf-editor
// (the owner's one-block-editor decision of 2026-11-03). The root is
// `layout.regions` with the site template around the page: a header region
// (banner), the page's own main region and a footer region (contentinfo).
// The demo site's own blocks (`demo.*`) are src/ui/blocks.ts.
//
// Pages kept before the one editor had two documents, a layout with one
// `content.outlet` and the content it shows; `composePage` makes the one
// Document from them, with the content in a text area where the outlet was.

import {heading, lead, paragraph, picture} from './blocks.ts';
import {seedText, type Language} from './i18n.ts';

export interface CompositionNode {
  id: string;
  type: string;
  data?: Record<string, unknown>;
  props?: Record<string, unknown>;
  slots?: Record<string, CompositionNode[]>;
  bindings?: Record<string, unknown>[];
  extensions?: Record<string, unknown>;
}

export interface CompositionDocument {
  schema: 'simai.composition.document' | 'simai.composition.document.v1';
  schema_version?: number;
  id: string;
  profile: 'ui-layout' | 'structured-content';
  locale?: string;
  root: CompositionNode;
}

/**
 * The demo pages' version. Raise it when the seeded pages change: a demo page
 * nobody changed is seeded again (src/ui/app.ts, followSeed). 2: the look of
 * the prototype (2026-11-04). 3: sections keep the Framework section's own
 * spacing, and the soft and accent ones come from its variants (sf-editor 1.1.0).
 */
export const SEED_VERSION = 3;

export interface SeedPage {
  id: string;
  title: string;
  document: CompositionDocument;
}

type Part = Omit<CompositionNode, 'id' | 'slots'> & {slots?: Record<string, Part[]>};

/** Gives every node of a part an id from the page's id and its place: home-3-1-2. */
function withIds(part: Part, id: string): CompositionNode {
  const node: CompositionNode = {...part, id} as CompositionNode;
  if (part.slots) {
    let n = 0;
    node.slots = Object.fromEntries(Object.entries(part.slots).map(([slot, children]) => [slot, children.map((child) => withIds(child, `${id}-${(n += 1)}`))]));
  }
  return node;
}

/**
 * A section takes the Framework section's own spacing and width (its
 * parameter defaults); one made from a variant says so, and keeps the
 * variant's values (the soft and the accent background).
 */
const VARIANTS: Record<string, Record<string, unknown>> = {soft: {background: 'container'}, accent: {background: 'primary'}};
const section = (children: Part[], variant?: keyof typeof VARIANTS, props?: Record<string, unknown>): Part => ({
  type: 'layout.section',
  ...(variant || props ? {props: {...(variant ? VARIANTS[variant] : {}), ...props}} : {}),
  ...(variant ? {extensions: {'simai.composition:variant': {id: variant}}} : {}),
  slots: {default: children},
});
const area = (children: Part[]): Part => ({type: 'layout.area', slots: {default: children}});
const list = (items: string[]): Part => ({type: 'content.list', slots: {items: items.map((value) => ({type: 'content.list-item', data: {content: [{type: 'text', value}]}}))}});

/** The site template around a page's main region: the same on every page. */
function regions(id: string, language: Language, main: Part[]): CompositionNode {
  return withIds({
    type: 'layout.regions',
    slots: {regions: [
      {type: 'layout.region', props: {name: 'header', landmark: 'banner'}, slots: {default: [{type: 'demo.header', props: {look: 'row', search: true}}]}},
      {type: 'layout.region', props: {name: 'main', landmark: 'main'}, slots: {default: main}},
      {type: 'layout.region', props: {name: 'footer', landmark: 'contentinfo'}, slots: {default: [{type: 'demo.footer', slots: {default: [paragraph(seedText(language, 'footer'))]}}]}},
    ]},
  }, id);
}

export function pageDocument(id: string, language: Language, main: Part[]): CompositionDocument {
  return {schema: 'simai.composition.document', schema_version: 1, id, profile: 'ui-layout', locale: language, root: regions(id, language, main)};
}

export function seedDocuments(language: Language): SeedPage[] {
  const s = (key: string) => seedText(language, key);
  return [
    {
      id: 'home',
      title: s('home.pageTitle'),
      document: pageDocument('home', language, [
        section([{type: 'demo.hero', props: {align: 'split'}, data: {action: s('home.heroAction')}, slots: {default: [heading(1, s('home.heroTitle')), lead(s('home.heroLead'))], media: [picture(s('picture'), '4/3')]}}], 'soft'),
        section([area([heading(2, s('home.areaTitle')), paragraph(s('home.areaText')), list([s('home.li1'), s('home.li2'), s('home.li3')]), {type: 'content.alert', props: {status: 'info', appearance: 'flat'}, slots: {default: [paragraph(s('home.alert'))]}}])], undefined, {width: 'narrow'}),
        section([
          heading(2, s('home.newsTitle')),
          {type: 'demo.cards', props: {cols: {xs: 1, md: 2, lg: 3}}, bindings: [{owner: 'host', ref: 'news', target: 'items'}], extensions: {'simai.composition:data': {items: {shape: 'cards', preset: 'default', limit: 3}}}},
          {type: 'demo.pagination', props: {mode: 'pages'}},
        ]),
        section([{type: 'layout.columns', props: {columns: {xs: 2}}, slots: {columns: [area([picture(s('picture'))]), area([heading(3, s('home.columnsTitle')), paragraph(s('home.columnsText'))])]}}]),
        section([{type: 'demo.features', props: {cols: {xs: 1, md: 3}}}], 'accent'),
      ]),
    },
    {
      id: 'about',
      title: s('about.title'),
      document: pageDocument('about', language, [section([area([heading(1, s('about.title')), paragraph(s('about.text'))])])]),
    },
  ];
}

/** An empty page: the site template, and one section with an empty text area. */
export function blankPage(id: string, title: string, language: Language): SeedPage {
  return {id, title, document: pageDocument(id, language, [section([area([heading(1, title), paragraph('')])])])};
}

/** The one Document of a page kept as a layout and its content: the content's blocks in a text area where the outlet stood. */
export function composePage(id: string, layout: CompositionDocument, content: CompositionDocument, language: Language): CompositionDocument {
  const blocks = content.root.slots?.default ?? [];
  const swap = (node: CompositionNode): CompositionNode => {
    if (node.type === 'content.outlet') return {id: node.id, type: 'layout.area', slots: {default: blocks}};
    if (!node.slots) return node;
    return {...node, slots: Object.fromEntries(Object.entries(node.slots).map(([slot, children]) => [slot, children.map(swap)]))};
  };
  const main = swap(layout.root);
  const document = pageDocument(id, language, []);
  const mainRegion = document.root.slots!.regions![1]!;
  mainRegion.slots = {default: [main]};
  return document;
}
