// The demo site's own blocks: what a host gives sf-editor beside the SIMAI
// Framework's types (its `types`, `renderers`, `editor-manifests` and
// `words`). They are made the way the Framework's block author kit shows
// (simai/ui-source kits/block): a composition type manifest, an editor
// manifest of its parameters and a renderer. Layout parameters name the
// Framework utility they become (x-simai-utility); a block never fetches, it
// draws the data the host's source port gives it. Their words are in
// locales/*.json (`blocks`), keyed by the manifests' label keys.
//
// The namespace is `demo`: these are the reference editor's demo blocks, not a
// product's. The catalogue places them by `catalogue.group` (marketing, data,
// page-parts), as the prototype's sections do.

import en from '../../locales/en.json' with {type: 'json'};
import ru from '../../locales/ru.json' with {type: 'json'};

type Json = Record<string, unknown>;
interface Node {
  id: string;
  type: string;
  props?: Json;
  data?: Json;
}
interface RenderInput {
  node: Node;
  slots: Record<string, string>;
  resolvedBindings?: Record<string, {items?: {title: string; text?: string; url?: string; image?: {src: string; alt?: string}; date?: string}[]; page?: number; pages?: number}>;
  bindingStates?: Record<string, string>;
  locale?: string;
}

const escape = (value: unknown) => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const safeUrl = (value: unknown) => (typeof value === 'string' && /^(?:\/(?!\/)|\.{0,2}\/|#|https?:)/u.test(value) && !value.includes('\\') ? value : null);
const id = (node: Node) => `data-sf-composition-id="${escape(node.id)}"`;
const text = (value: string) => [{type: 'text', value}];
const word = (locale: string | undefined, key: string) => ((locale === 'en' ? en : ru).blocks as Record<string, string>)[key] ?? key;

const closedObject = (properties: Json = {}, required: string[] = []) => ({type: 'object', additionalProperties: false, ...(required.length ? {required} : {}), properties});
const utility = (klass: string, extra: Json) => ({...extra, 'x-simai-utility': {class: klass, responsive: true}});

function manifest(type: string, rest: Json): Json {
  return {
    schema: 'simai.composition.type-manifest',
    schema_version: 1,
    type,
    version: '1.0.0',
    category: 'content',
    mode: 'leaf',
    profiles: ['ui-layout'],
    data_schema: closedObject(),
    props_schema: closedObject(),
    presentation: {views: ['default'], presets: [], modifiers: []},
    slots: {},
    renderer: {kind: 'registered', name: type},
    assets: [],
    capabilities: ['html'],
    ...rest,
  };
}

/** One editor field over a prop: its label key is `<type>.<key>`. */
function field(type: string, key: string, property: Json, extra: Json = {}): Json {
  return {
    key,
    plane: 'props',
    target: key,
    property,
    group: 'basic',
    visibility: 'visible',
    label_key: `${type}.${key}`,
    capability_hints: [`composition.props.${key}`],
    permission_hints: ['composition.node.update'],
    owner: 'ui-editor/demo',
    ...extra,
  };
}
const editor = (type: string, fields: Json[]): Json => ({schema: 'simai.composition.editor-manifest', schema_version: 1, type, type_version: '1.0.0', fields});

export const heading = (level: number, value: string) => ({type: 'content.heading', data: {level, content: text(value)}});
export const paragraph = (value: string) => ({type: 'content.paragraph', data: {content: text(value)}});
/** A paragraph in the lead size: the Framework paragraph's `lead` modifier. */
export const lead = (value: string) => ({...paragraph(value), presentation: {modifiers: ['lead']}});
/** The demo picture every placeholder shows: a file of the editor's own, served beside it. */
export const PICTURE = './demo/picture.svg';
export const picture = (alt: string, ratio?: string) => ({type: 'content.figure', data: {src: PICTURE, alt}, ...(ratio ? {props: {ratio}} : {})});

// ------------------------------------------------------------ the types

const HEADER = manifest('demo.header', {
  props_schema: closedObject({look: {enum: ['row', 'center']}, search: {type: 'boolean'}}),
  catalogue: {group: 'page-parts', label_key: 'demo.header.name', keywords: {ru: ['шапка', 'меню', 'навигация'], en: ['header', 'menu', 'navigation']}},
  variants: [
    {id: 'menu', label_key: 'demo.header.menu', props: {look: 'row'}},
    {id: 'search', label_key: 'demo.header.with_search', props: {look: 'row', search: true}},
    {id: 'center', label_key: 'demo.header.centre', props: {look: 'center'}},
  ],
});

const FOOTER = manifest('demo.footer', {
  mode: 'composite',
  slots: {default: {min: 0, max: 10, categories: ['content', 'smart'], groups: ['text'], label_key: 'demo.footer.text'}},
  catalogue: {group: 'page-parts', label_key: 'demo.footer.name', keywords: {ru: ['подвал'], en: ['footer']}},
});

/** The types, with their variants' starting words in the page's language. */
export function blockTypes(language: 'ru' | 'en'): Json[] {
  const w = (key: string) => word(language, key);
  const hero = (align: string, extra: Json = {}) => ({
    id: align,
    label_key: `demo.hero.${align}`,
    props: {align},
    data: {action: w('demo.hero.action_text')},
    slots: {default: [heading(1, w('demo.hero.title')), lead(w('demo.hero.lead'))], ...extra},
  });
  return [HEADER, {...FOOTER, variants: [{id: 'plain', label_key: 'demo.footer.name', slots: {default: [paragraph(w('demo.footer.line'))]}}]}, {...HERO, variants: [hero('left'), hero('center'), hero('split', {media: [picture('', '4/3')]})]}, FEATURES,
    {...CTA, variants: [{id: 'plain', label_key: 'demo.cta.plain', slots: {default: [heading(2, w('demo.cta.title')), paragraph(w('demo.cta.lead'))]}}]}, CARDS, PAGINATION];
}

const HERO = manifest('demo.hero', {
  mode: 'composite',
  // The call to action: the label of the hero's primary sf-button.
  data_schema: closedObject({action: {type: 'string', maxLength: 60}}),
  props_schema: closedObject({align: {enum: ['left', 'center', 'split']}}),
  slots: {
    default: {min: 0, max: 20, categories: ['content', 'smart'], groups: ['text'], label_key: 'demo.hero.text'},
    media: {min: 0, max: 1, categories: ['content'], groups: ['media'], label_key: 'demo.hero.media', empty_key: 'demo.hero.media_empty'},
  },
  catalogue: {group: 'marketing', label_key: 'demo.hero.name', keywords: {ru: ['первый экран', 'баннер', 'обложка'], en: ['hero', 'banner', 'cover']}},
});

/** Three in a row, apart: the demo grids' defaults. */
const GRID = {cols: 3, gap: 5};

const FEATURE = closedObject({icon: {type: 'string', minLength: 1, maxLength: 64}, title: {type: 'string', minLength: 1, maxLength: 200}, text: {type: 'string', maxLength: 1000}}, ['icon', 'title']);
const FEATURES = manifest('demo.features', {
  data_schema: closedObject({items: {type: 'array', minItems: 1, maxItems: 12, items: FEATURE}}),
  props_schema: closedObject({
    cols: utility('grid-col-{value}', {type: 'integer', minimum: 1, maximum: 4}),
    gap: utility('gap-{value}', {type: 'integer', minimum: 0, maximum: 8}),
  }),
  // Printed when a node leaves them unset (parameter_defaults): the grid has
  // no look of its own without its classes.
  parameter_defaults: GRID,
  catalogue: {group: 'marketing', label_key: 'demo.features.name', keywords: {ru: ['преимущества', 'фичи', 'особенности'], en: ['features', 'benefits']}},
});

const CTA = manifest('demo.cta', {
  mode: 'composite',
  slots: {default: {min: 0, max: 10, categories: ['content', 'smart'], groups: ['text'], label_key: 'demo.cta.text'}},
  catalogue: {group: 'marketing', label_key: 'demo.cta.name', keywords: {ru: ['призыв', 'кнопка', 'cta'], en: ['call to action', 'cta']}},
});

const CARDS = manifest('demo.cards', {
  props_schema: closedObject({
    cols: utility('grid-col-{value}', {type: 'integer', minimum: 1, maximum: 4}),
    gap: utility('gap-{value}', {type: 'integer', minimum: 0, maximum: 8}),
  }),
  // Printed when a node leaves them unset (parameter_defaults): the grid has
  // no look of its own without its classes.
  parameter_defaults: GRID,
  catalogue: {group: 'data', label_key: 'demo.cards.name', keywords: {ru: ['карточки', 'новости', 'товары', 'каталог'], en: ['cards', 'news', 'products']}},
  variants: [
    {id: 'top', label_key: 'demo.cards.top', props: {cols: {xs: 1, md: 2, lg: 3}}},
    {id: 'text', label_key: 'demo.cards.text', props: {cols: {xs: 1, md: 2, lg: 4}}},
  ],
  data_bindings: {items: {shapes: ['cards'], empty_key: 'demo.cards.empty'}},
  runtime: {publishes: {pagination: {shape: 'pagination', binding: 'items'}}},
});

const PAGINATION = manifest('demo.pagination', {
  props_schema: closedObject({mode: {enum: ['pages', 'more']}}),
  catalogue: {group: 'data', label_key: 'demo.pagination.name', keywords: {ru: ['пагинация', 'страницы', 'показать ещё'], en: ['pagination', 'pages', 'more']}},
  runtime: {accepts: {pagination: {shape: 'pagination'}}},
});

export const EDITOR_MANIFESTS = [
  editor('demo.header', [
    field('demo.header', 'look', {type: 'string', version: 2}, {constraints: {min_length: 1, max_length: 16}, choices: ['row', 'center'], default: 'row'}),
    field('demo.header', 'search', {type: 'boolean', version: 1}, {default: false}),
  ]),
  editor('demo.hero', [
    field('demo.hero', 'align', {type: 'string', version: 2}, {constraints: {min_length: 1, max_length: 16}, choices: ['left', 'center', 'split'], default: 'left'}),
    field('demo.hero', 'action', {type: 'string', version: 2}, {plane: 'data', constraints: {max_length: 60}, capability_hints: ['composition.data.action']}),
  ]),
  editor('demo.features', [
    field('demo.features', 'cols', {type: 'integer', version: 1}, {constraints: {min: 1, max: 4}, default: 3}),
    field('demo.features', 'gap', {type: 'integer', version: 1}, {constraints: {min: 0, max: 8}, default: 5, group: 'advanced'}),
  ]),
  editor('demo.cards', [
    field('demo.cards', 'cols', {type: 'integer', version: 1}, {constraints: {min: 1, max: 4}, default: 3}),
    field('demo.cards', 'gap', {type: 'integer', version: 1}, {constraints: {min: 0, max: 8}, default: 5, group: 'advanced'}),
  ]),
  editor('demo.pagination', [field('demo.pagination', 'mode', {type: 'string', version: 2}, {constraints: {min_length: 1, max_length: 16}, choices: ['pages', 'more'], default: 'pages'})]),
];

// ------------------------------------------------------------ the renderers

const FEATURE_DEFAULTS = (locale?: string) => [
  {icon: 'bolt', title: word(locale, 'demo.features.fast'), text: word(locale, 'demo.features.fast_text')},
  {icon: 'layers', title: word(locale, 'demo.features.blocks'), text: word(locale, 'demo.features.blocks_text')},
  {icon: 'lock', title: word(locale, 'demo.features.safe'), text: word(locale, 'demo.features.safe_text')},
];

// Every look below is a SIMAI Framework utility or a Smart element (sf-input,
// sf-button, sf-icon). A block that changes with the width asks its own
// width (query-container and the cq- utilities), not the window's: the
// canvas draws a phone inside a computer's window. The sides (p-x-6) are the
// Framework section's own on every screen, so a header, a section and a
// footer line up.
const SIDES = 'p-x-6';

export const RENDERERS: Record<string, (input: RenderInput) => string> = {
  'demo.header': ({node, locale}) => {
    const centre = node.props?.look === 'center';
    const search = escape(word(locale, 'demo.header.search'));
    const links = ['demo.header.products', 'demo.header.prices', 'demo.header.contacts'].map((key) => `<a href="#" class="color-on-surface-variant decoration-none">${escape(word(locale, key))}</a>`).join('');
    const logo = `<a href="#" class="demo-logo flex items-cross-center gap-1/2 text-3 weight-7 color-on-surface decoration-none"><span class="w-c2 h-c2 radius-1/2 bg-primary" aria-hidden="true"></span>SIMAI</a>`;
    const nav = `<nav class="hidden cq-sm:flex gap-2 text-1/2" aria-label="${escape(word(locale, 'demo.header.nav'))}">${links}</nav>`;
    // A Smart element's own tag is display: contents; the utilities that show
    // and size it stand on a wrapper. The menu and the field on a header from
    // 32rem, the search button alone on a narrower one.
    const find = node.props?.search
      ? `<span class="demo-search hidden cq-sm:block w-e6 m-inline-start-auto"><sf-input size="1/2" appearance="filled" input-type="search" icon-start="search" placeholder="${search}" aria-label="${search}"></sf-input></span><span class="cq-sm:hidden m-inline-start-auto"><sf-button-icon icon="search" appearance="ghost" scheme="on-surface" size="1/2" aria-label="${search}"></sf-button-icon></span>`
      : '';
    const row = centre ? `flex flex-col items-cross-center gap-1` : 'flex items-cross-center gap-3';
    return `<div class="demo-header query-container border-bottom-1 border-outline-variant" ${id(node)}><div class="${row} p-y-2 ${SIDES}">${logo}${nav}${find}</div></div>`;
  },
  'demo.footer': ({node, slots, locale}) =>
    `<div class="demo-footer flex flex-wrap items-cross-center justify-between gap-2 p-y-2 ${SIDES} border-top-1 border-outline-variant text-1 color-on-surface-variant" ${id(node)}><div data-sf-composition-slot="default">${slots.default ?? ''}</div><span>${escape(word(locale, 'demo.footer.links'))}</span></div>`,
  'demo.hero': ({node, slots}) => {
    const split = node.props?.align === 'split';
    const centre = node.props?.align === 'center';
    const action = typeof node.data?.action === 'string' && node.data.action ? `<div><sf-button size="2" text="${escape(node.data.action)}"></sf-button></div>` : '';
    // The split hero stands in one row while both halves get their room (text
    // 224 px, picture 192 px, and they share what is left) and one under the
    // other on a narrower page: the hero's own width decides, not the window's.
    const media = split ? `<div class="demo-hero-media grow w-f2 min-w-0 radius-2 overflow-hidden" data-sf-composition-slot="media">${slots.media ?? ''}</div>` : '';
    // The hero's text is its lead paragraph: the `lead` modifier prints text-large.
    const text = `<div class="demo-hero-text flex flex-col gap-3${split ? ' grow w-f4 min-w-0' : ''}${centre ? ' items-cross-center' : ''}">${slots.default ?? ''}${action}</div>`;
    return `<div class="demo-hero${split ? ' flex flex-wrap items-cross-center gap-6' : ' flex flex-col'}${centre ? ' text-center items-cross-center' : ''}" ${id(node)}>${text}${media}</div>`;
  },
  'demo.features': ({node, locale}) => {
    const items = (node.data?.items as {icon: string; title: string; text?: string}[] | undefined) ?? FEATURE_DEFAULTS(locale);
    const cells = items
      .map((item) => `<div class="demo-feature flex flex-col gap-1"><span class="flex items-center justify-center w-d0 h-d0 radius-2 bg-primary color-on-primary" aria-hidden="true"><sf-icon icon="${escape(item.icon)}"></sf-icon></span><strong class="text-2 weight-6">${escape(item.title)}</strong>${item.text ? `<p class="m-0 color-on-surface-variant">${escape(item.text)}</p>` : ''}</div>`)
      .join('');
    return `<div class="demo-features grid" ${id(node)}>${cells}</div>`;
  },
  'demo.cta': ({node, slots}) => `<div class="demo-cta flex flex-col gap-1 p-4" ${id(node)}>${slots.default ?? ''}</div>`,
  'demo.cards': ({node, resolvedBindings = {}, bindingStates = {}, locale}) => {
    const state = bindingStates.items ?? 'loading';
    const settings = (node as {extensions?: Record<string, Record<string, {empty_text?: string}>>}).extensions?.['simai.composition:data']?.items;
    let body: string;
    if (state === 'ready' || state === 'preview') {
      body = (resolvedBindings.items?.items ?? []).map((item) => {
        const href = safeUrl(item.url);
        const src = item.image && safeUrl(item.image.src);
        const title = href ? `<a href="${escape(href)}" class="color-on-surface decoration-none">${escape(item.title)}</a>` : escape(item.title);
        const image = src ? `<img class="aspect-16x9 object-cover w-full" src="${escape(src)}" alt="${escape(item.image?.alt ?? '')}" loading="lazy">` : '';
        const date = item.date ? `<small class="text-small color-on-surface-variant">${escape(item.date)}</small>` : '';
        return `<article class="demo-card flex flex-col radius-2 overflow-hidden border border-outline-variant bg-surface-0">${image}<div class="flex flex-col gap-1/2 p-2">${date}<h3 class="m-0 text-2 weight-6">${title}</h3>${item.text ? `<p class="m-0 color-on-surface-variant">${escape(item.text)}</p>` : ''}</div></article>`;
      }).join('');
    } else if (state === 'empty') body = `<p class="demo-state p-4 radius-2 bg-surface-container text-center color-on-surface-variant">${escape(settings?.empty_text ?? word(locale, 'demo.cards.empty'))}</p>`;
    else if (state === 'error') body = `<p class="demo-state p-4 radius-2 bg-error-container text-center color-on-error-container" role="status">${escape(word(locale, 'demo.cards.failed'))}</p>`;
    else body = '<div class="demo-card demo-card--loading radius-2 bg-surface-container h-g0" aria-busy="true"></div>';
    return `<div class="demo-cards grid" data-state="${escape(state)}" ${id(node)}>${body}</div>`;
  },
  'demo.pagination': ({node, resolvedBindings = {}, locale}) => {
    const at = resolvedBindings.pagination;
    const page = at?.page ?? 1;
    const pages = Math.max(1, at?.pages ?? 1);
    const buttons = node.props?.mode === 'more'
      ? `<sf-button size="1/2" appearance="outline" text="${escape(word(locale, 'demo.pagination.more'))}"></sf-button>`
      : Array.from({length: pages}, (_, index) => `<sf-button size="1/2" appearance="${index + 1 === page ? 'default' : 'outline'}" text="${index + 1}"${index + 1 === page ? ' aria-current="page"' : ''}></sf-button>`).join('');
    return `<nav class="demo-pagination flex justify-center gap-1/2 p-t-2" aria-label="${escape(word(locale, 'demo.pagination.name'))}" ${id(node)}>${buttons}</nav>`;
  },
};

/** The blocks' words for sf-editor's `words`: {ru: {...}, en: {...}}. */
export const WORDS = {ru: ru.blocks, en: en.blocks};
