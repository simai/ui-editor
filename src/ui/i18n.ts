// The editor's words: keyed RU/EN dictionaries (locales/*.json → ui). The
// interface language never touches a page's document; the page has its own.

import en from '../../locales/en.json' with {type: 'json'};
import ru from '../../locales/ru.json' with {type: 'json'};

export type Language = 'ru' | 'en';

const UI: Record<Language, Record<string, string>> = {ru: ru.ui, en: en.ui};
const SEED: Record<Language, Record<string, string>> = {ru: ru.seed, en: en.seed};
const KEY = 'ui-editor.language';

let current: Language = 'ru';
const listeners = new Set<(language: Language) => void>();

export const uiLanguage = () => current;

export function t(key: string, params: Record<string, string | number> = {}): string {
  const template = UI[current][key] ?? UI.en[key] ?? key;
  return template.replace(/\{(\w+)\}/gu, (whole, name: string) => String(params[name] ?? whole));
}

/** The words of the seeded pages, in the language they are made in. */
export const seedText = (language: Language, key: string) => SEED[language][key] ?? key;

/** The language kept for this viewer, else the browser's, else Russian. */
export function preferredLanguage(): Language {
  let kept: string | null = null;
  try {
    kept = localStorage.getItem(KEY);
  } catch {
    // A blocked storage keeps the default.
  }
  if (kept === 'ru' || kept === 'en') return kept;
  return navigator.language.toLowerCase().startsWith('ru') ? 'ru' : 'en';
}

export function setUiLanguage(language: Language) {
  current = language;
  document.documentElement.lang = language;
  try {
    localStorage.setItem(KEY, language);
  } catch {
    // Not kept, still applied.
  }
  // The Framework's own words (the overlay's tree, the resizer, the drawer) follow too.
  (globalThis as {SF?: {language?: {use?: (l: string) => void}}}).SF?.language?.use?.(language);
  translate();
  for (const listener of listeners) listener(language);
}

export const onUiLanguage = (listener: (language: Language) => void) => listeners.add(listener);

/** Fill every [data-t] text and [data-t-attr="attr:key;…"] attribute below `root`. */
export function translate(root: ParentNode = document) {
  if (root === document) document.title = t('app.title');
  for (const node of root.querySelectorAll<HTMLElement>('[data-t]')) node.textContent = t(node.dataset.t!);
  for (const node of root.querySelectorAll<HTMLElement>('[data-t-attr]')) {
    // An sf-button moves the data-* its author wrote to its native button;
    // the label belongs to the host, so the attribute goes there.
    const target = node.closest<HTMLElement>('sf-button, sf-button-icon') ?? node;
    for (const pair of node.dataset.tAttr!.split(';')) {
      const [attribute, key] = pair.split(':');
      if (attribute && key) target.setAttribute(attribute, t(key));
    }
  }
}
