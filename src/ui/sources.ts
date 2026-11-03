// The demo site's data sources, given to sf-editor through its source port
// (connect-port {sources, fields, preview}). A real host answers from Bitrix,
// Larena or its own store; this one answers from rows in the dictionaries
// (locales/*.json, `sources`). The editor checks every answer
// (SF.Composition.createSourcePort) and a block never fetches.

import en from '../../locales/en.json' with {type: 'json'};
import ru from '../../locales/ru.json' with {type: 'json'};
import {PICTURE} from './blocks.ts';
import type {Language} from './i18n.ts';

interface Row {
  title: string;
  text: string;
  date: string;
}
interface Source {
  /** The source's own field names, as its host calls them. */
  fields: [string, string][];
  /** Shape field → source field: the preset the source offers. */
  preset: Record<string, string>;
  rows: Row[];
}
interface Binding {
  ref?: string;
}
interface Settings {
  preset?: string;
  mapping?: Record<string, string>;
  limit?: number;
}

const SOURCES: Record<string, Omit<Source, 'rows'>> = {
  news: {
    fields: [['NAME', 'NAME'], ['PREVIEW_TEXT', 'PREVIEW_TEXT'], ['PREVIEW_PICTURE', 'PREVIEW_PICTURE'], ['DATE_ACTIVE_FROM', 'DATE_ACTIVE_FROM'], ['DETAIL_PAGE_URL', 'DETAIL_PAGE_URL']],
    preset: {title: 'NAME', text: 'PREVIEW_TEXT', image: 'PREVIEW_PICTURE', date: 'DATE_ACTIVE_FROM', url: 'DETAIL_PAGE_URL'},
  },
  products: {
    fields: [['title', 'title'], ['description', 'description'], ['cover', 'cover'], ['price', 'price'], ['url', 'url']],
    preset: {title: 'title', text: 'description', image: 'cover', date: 'price', url: 'url'},
  },
  promo: {
    fields: [['title', 'title'], ['body', 'body'], ['banner', 'banner'], ['until', 'until'], ['url', 'url']],
    preset: {title: 'title', text: 'body', image: 'banner', date: 'until', url: 'url'},
  },
};

const dictionary = (language: Language) => (language === 'en' ? en : ru).sources as {labels: Record<string, string>; rows: Record<string, Row[]>};

/** A source's records under its own field names. */
function records(name: string, language: Language): Record<string, string>[] {
  const fields = SOURCES[name]!.fields.map(([key]) => key);
  return (dictionary(language).rows[name] ?? []).map((row, index) => ({
    [fields[0]!]: row.title,
    [fields[1]!]: row.text,
    [fields[2]!]: PICTURE,
    [fields[3]!]: row.date,
    [fields[4]!]: `/${name}/${index + 1}/`,
  }));
}

/** The port the host connects: what the editor asks, answered in the page's language. */
export function sourcePort(language: () => Language) {
  return {
    sources: async (shape: string) => (shape === 'cards'
      ? Object.entries(SOURCES).map(([id, source]) => ({id, label: dictionary(language()).labels[id] ?? id, shapes: ['cards'], presets: [{id: 'default', label: dictionary(language()).labels.preset ?? 'default', shape: 'cards', mapping: source.preset}]}))
      : []),
    fields: async (source: string) => (SOURCES[source]?.fields ?? []).map(([key, label]) => ({key, label})),
    preview: async (binding: Binding, {settings = {}}: {settings?: Settings; shape?: string} = {}) => {
      const source = binding.ref ? SOURCES[binding.ref] : undefined;
      if (!source) return {items: []};
      const mapping = settings.preset || !settings.mapping ? source.preset : settings.mapping;
      const all = records(binding.ref!, language());
      const per = Math.max(1, settings.limit ?? 3);
      const items = all.slice(0, per).map((record) => {
        const value = (field: string) => (mapping[field] ? record[mapping[field]!] : undefined);
        const image = value('image');
        return {
          title: value('title') ?? '—',
          ...(value('text') ? {text: value('text')} : {}),
          ...(value('url') ? {url: value('url')} : {}),
          ...(image ? {image: {src: image, alt: ''}} : {}),
          ...(value('date') ? {date: value('date')} : {}),
        };
      });
      return {items, total: all.length, page: 1, pages: Math.max(1, Math.ceil(all.length / per)), per_page: per};
    },
  };
}
