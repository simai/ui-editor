// The editor shell: the page list on the left and SIMAI Pro's sf-editor, the
// one block editor, for the open page (the owner's decision of 2026-11-03).
// A page is one Composition Document: layout and text are one tree, and the
// editor edits it by depth, with its own library, structure and parameter
// panels. The shell is its host (sf-editor's component.json): it gives the
// page, the demo site's own blocks (src/ui/blocks.ts), the site's theme and
// the person's rights, answers the source port with the demo sources
// (src/ui/sources.ts), and keeps every Document the editor sends in `change`.
// Everything on screen is a Framework or Pro component; this file only wires them.
//
// Two launch modes, one editor (owner, 2026-11-05): the standalone list mode,
// the default, keeps the demo pages in this browser; `?mode=page` opens one
// page a host gives and takes back (src/ui/host.ts, docs/HOST-EMBED.md).

import {onUiLanguage, preferredLanguage, setUiLanguage, t, translate, uiLanguage, type Language} from './i18n.ts';
import {EDITOR_MANIFESTS, RENDERERS, WORDS, blockTypes} from './blocks.ts';
import {listenToHost, pageMode, type Diagnostic, type HostLink, type LoadPayload, type PageSettings} from './host.ts';
import {openPageStore, type Page, type PageStore} from './pages.ts';
import {SEED_VERSION, blankPage, seedDocuments, type CompositionDocument} from './seed.ts';
import {startShell, type Shell} from './shell.ts';
import {sourcePort} from './sources.ts';

/** The site's theme as the host gives it: read only in the editor, changed in the site's settings. */
interface Theme {
  name: string;
  label: string;
  settings_url: string;
  defaults: Record<string, Record<string, unknown>>;
}
interface Rights {
  layout: boolean;
  template: boolean;
  builder: boolean;
}
interface ChangeDetail {
  document: CompositionDocument;
  reason: string;
  scope: 'page' | 'template';
}
interface SiteBlock {
  type: string;
  version: string;
}
interface Editor extends HTMLElement {
  model?: {toJSON(): CompositionDocument};
  document: CompositionDocument | null;
  types: unknown[];
  renderers: Record<string, unknown>;
  editorManifests: unknown[];
  siteBlocks: SiteBlock[];
  words: Record<string, Record<string, string>>;
  rights: Rights;
  theme: Theme;
  connectPort(port: unknown): unknown;
}

const USED = ['sf-editor', 'sf-menu', 'sf-button-group', 'sf-drawer', 'sf-resizer', 'sf-button-icon', 'sf-button'];
const $ = <T extends HTMLElement = HTMLElement>(selector: string) => document.querySelector<T>(selector)!;
const editor = () => $<Editor>('#page-editor');

/** The site's themes, as its settings would hold them: the second level of a value's origin. */
const THEMES: Record<string, Theme['defaults']> = {
  default: {},
  compact: {'layout.section': {padding_y: 6}, 'demo.cards': {gap: 3}},
};
/** Who may change what. The reference editor's person is the site's designer; a host gives an author `layout: false`. */
const DESIGNER: Rights = {layout: true, template: true, builder: true};

const state: {store: PageStore | null; pages: Page[]; current: string | null; theme: string; rights: Rights; siteBlocks: SiteBlock[]} = {
  store: null,
  pages: [],
  current: null,
  theme: 'default',
  rights: DESIGNER,
  siteBlocks: [],
};
let shell: Shell | null = null;

const page = () => state.pages.find((p) => p.id === state.current) ?? null;

function showPages() {
  // sf-menu draws an item without href as plain text; the href makes it a
  // link a person can reach, and the editor takes the navigation itself.
  $<HTMLElement & {items: unknown}>('#pages').items = state.pages.map((p) => ({id: p.id, label: p.title, href: `#page=${encodeURIComponent(p.id)}`, icon: 'description', current: p.id === state.current}));
}

/** The open page's name heads sf-editor's bar and its settings. */
function showTitle() {
  const title = page()?.title;
  if (title) editor().setAttribute('heading', title);
  else editor().removeAttribute('heading');
}

const themeOf = (name: string): Theme => ({name, label: t(`theme.${name}`), settings_url: '#settings/theme', defaults: THEMES[name] ?? {}});

/** What the host gives the editor beside the page: its blocks, their words, the theme and the rights. */
function giveSite(language: Language) {
  const element = editor();
  element.types = blockTypes(language);
  element.renderers = RENDERERS;
  element.editorManifests = EDITOR_MANIFESTS;
  element.words = WORDS;
  element.siteBlocks = state.siteBlocks;
  element.theme = themeOf(state.theme);
  element.rights = state.rights;
}

async function save(changed: Page) {
  await state.store!.put(changed);
  state.pages = state.pages.map((p) => (p.id === changed.id ? changed : p));
}

/** Keeps what the editor sent. A change to the template (header and footer) is every page's: it goes into each. */
async function keep(detail: ChangeDetail) {
  const current = page();
  if (!current) return;
  const updated = new Date().toISOString();
  await save({...current, document: detail.document, updated, seed: undefined});
  if (detail.scope !== 'template') return;
  const regions = (document: CompositionDocument) => document.root.slots?.regions ?? [];
  const template = regions(detail.document).filter((region) => region.props?.name !== 'main');
  for (const other of state.pages.filter((p) => p.id !== current.id)) {
    const root = other.document.root;
    const next = regions(other.document).map((region) => template.find((part) => part.props?.name === region.props?.name) ?? region);
    await save({...other, document: {...other.document, root: {...root, slots: {...root.slots, regions: next}}}, updated, seed: undefined});
  }
}

async function openPage(id: string) {
  const next = state.pages.find((p) => p.id === id);
  if (!next) return;
  state.current = id;
  showPages();
  showTitle();
  editor().document = next.document;
}

async function newPage() {
  const store = state.store!;
  let n = state.pages.length + 1;
  while (state.pages.some((p) => p.id === `page-${n}`)) n += 1;
  const id = `page-${n}`;
  const title = t('pages.untitled', {n});
  const at = new Date().toISOString();
  const made = blankPage(id, title, uiLanguage());
  // A new page takes the site template the other pages have.
  const template = state.pages[0]?.document.root.slots?.regions;
  if (template) {
    const regions = made.document.root.slots!.regions!.map((region) => (region.props?.name === 'main' ? region : template.find((part) => part.props?.name === region.props?.name) ?? region));
    made.document.root.slots!.regions = regions;
  }
  await store.put({...made, created: at, updated: at});
  state.pages = await store.list();
  await openPage(id);
}

/**
 * A demo page nobody changed is the seed's, in the interface's language: when
 * the seed is newer than the page (a newer build) or the language changes, it
 * is seeded again. A page anyone edited keeps its words. A page kept before
 * the seed was marked counts as nobody's while it was never written after it
 * was made (`updated` is `created`).
 */
async function followSeed(language: Language, force = false) {
  const seeds = new Map(seedDocuments(language).map((seed) => [seed.id, seed]));
  let changed = false;
  for (const kept of state.pages) {
    const fresh = seeds.get(kept.id);
    const untouched = kept.seed !== undefined || (kept.created !== undefined && kept.updated === kept.created);
    if (!fresh || !untouched || (!force && kept.seed === SEED_VERSION)) continue;
    if (kept.seed === SEED_VERSION && kept.document.locale === language) continue;
    await save({...kept, title: fresh.title, document: fresh.document, seed: SEED_VERSION});
    changed = true;
  }
  if (!changed) return;
  showPages();
  showTitle();
  const current = page();
  if (current) editor().document = current.document;
}

function wordsOfComponents() {
  $('#language').setAttribute('value', uiLanguage());
}

/** What the editor holds in the single-page mode: the host's page, its settings and whether it changed. */
const one: {document: CompositionDocument | null; settings: PageSettings; revision: string | number | null; dirty: boolean; host: HostLink | null} = {
  document: null,
  settings: {},
  revision: null,
  dirty: false,
  host: null,
};

/** Checks a Document the host gives against composition-document v1, with the site's types. */
function validateDocument(document: unknown): Diagnostic[] {
  const composition = (globalThis as {SF?: {Composition?: {validate(d: unknown, r: unknown): {valid: boolean; diagnostics?: Diagnostic[]}; extendRegistry(m: unknown[], r: unknown): unknown}}}).SF?.Composition;
  if (!composition) return [{code: 'framework_missing', path: '$', message: 'SF.Composition is not loaded'}];
  const result = composition.validate(document, composition.extendRegistry(blockTypes(uiLanguage()), RENDERERS));
  return result.valid ? [] : (result.diagnostics ?? [{code: 'document_invalid', path: '$'}]);
}

function setDirty(dirty: boolean) {
  if (one.dirty === dirty) return;
  one.dirty = dirty;
  $('#save').toggleAttribute('disabled', !dirty);
  document.body.dataset.dirty = String(dirty);
  one.host?.post({type: 'sf-editor:dirty', dirty});
}

const pageName = () => (typeof one.settings.name === 'string' && one.settings.name) || '';

/** The host's page: checked, then given to the editor. A Document that fails is refused whole, and the host is told why. */
function loadPage(payload: LoadPayload): {ok: boolean; diagnostics: Diagnostic[]} {
  if (payload?.language === 'ru' || payload?.language === 'en') setUiLanguage(payload.language);
  const diagnostics = validateDocument(payload?.document);
  if (diagnostics.length) {
    one.host?.post({type: 'sf-editor:error', code: 'document_invalid', diagnostics});
    return {ok: false, diagnostics};
  }
  one.document = payload.document;
  one.settings = {...(payload.settings ?? {})};
  one.revision = payload.revision ?? null;
  editor().document = payload.document;
  showSettings();
  one.dirty = true;
  setDirty(false);
  document.body.dataset.loaded = 'true';
  one.host?.post({type: 'sf-editor:loaded', revision: one.revision});
  return {ok: true, diagnostics: []};
}

/**
 * The page's settings (name, address, template, publication, history) are
 * the host's: until the Framework's page-settings panel ships, the editor
 * shows the name on its bar and carries the rest through. This is the hook
 * that panel will fill.
 */
function showSettings() {
  const name = pageName();
  if (name) editor().setAttribute('heading', name);
  else editor().removeAttribute('heading');
}

/** Hands the page back: the host decides where it goes and answers `sf-editor:saved` with its new revision. */
function savePage() {
  if (!one.document) return null;
  const payload = {type: 'sf-editor:save' as const, document: editor().model?.toJSON() ?? one.document, settings: {...one.settings}, revision: one.revision};
  one.host?.post(payload);
  return payload;
}

async function startPage() {
  // No page list, no local store: the host's page is the only one.
  for (const selector of ['#left-panel', '#storage-state', '#toggle-left']) document.querySelector(selector)?.remove();
  $('#save').hidden = false;
  document.body.dataset.mode = 'page';
  setUiLanguage(preferredLanguage());
  wordsOfComponents();
  onUiLanguage((language) => {
    wordsOfComponents();
    giveSite(language);
  });
  const element = editor();
  giveSite(uiLanguage());
  element.connectPort({...sourcePort(uiLanguage), saveBlock: async (manifest: SiteBlock) => void (state.siteBlocks = [...state.siteBlocks.filter((b) => b.type !== manifest.type || b.version !== manifest.version), manifest])});
  element.addEventListener('change', (event) => {
    one.document = (event as CustomEvent<ChangeDetail>).detail.document;
    setDirty(true);
  });
  $('#language').addEventListener('change', (event) => setUiLanguage((event as CustomEvent<{value: Language}>).detail.value));
  $('#save').addEventListener('click', () => void savePage());
  addEventListener('keydown', (event) => {
    if (event.code !== 'KeyS' || !(event.metaKey || event.ctrlKey) || event.shiftKey || event.altKey) return;
    event.preventDefault();
    savePage();
  });
  // Unsaved changes are not lost by leaving: the browser asks first.
  addEventListener('beforeunload', (event) => {
    if (!one.dirty) return;
    event.preventDefault();
    event.returnValue = '';
  });
  one.host = listenToHost({
    load: (payload) => void loadPage(payload),
    save: () => void savePage(),
    saved: (revision) => {
      one.revision = revision;
      setDirty(false);
    },
  });
  translate();
  document.body.dataset.ready = 'true';
  one.host.post({type: 'sf-editor:ready'});
}

async function start() {
  // The Loader defines each element when it meets its tag. A property set
  // before that stays on the bare element and the component never reads it,
  // so the shell waits for every element it writes to.
  await Promise.all(USED.map((tag) => customElements.whenDefined(tag)));
  if (pageMode()) return startPage();
  $('#save').remove();
  setUiLanguage(preferredLanguage());
  wordsOfComponents();
  onUiLanguage((language) => {
    wordsOfComponents();
    giveSite(language);
    void followSeed(language, true);
  });

  const store = await openPageStore();
  state.store = store;
  $('#storage-state').hidden = store.persistent;
  let pages = await store.list();
  if (pages.length === 0) {
    const at = Date.now();
    for (const [index, seed] of seedDocuments(uiLanguage()).entries()) {
      const time = new Date(at + index).toISOString();
      await store.put({...seed, created: time, updated: time, seed: SEED_VERSION});
    }
    pages = await store.list();
  }
  state.pages = pages;
  await followSeed(uiLanguage());

  shell = startShell();
  $('#toggle-left').addEventListener('click', () => shell!.togglePanel('left'));
  $('#language').addEventListener('change', (event) => setUiLanguage((event as CustomEvent<{value: Language}>).detail.value));
  $('#new-page').addEventListener('click', () => void newPage());
  $('#pages').addEventListener('sf-menu-navigate', (event) => {
    event.preventDefault();
    void openPage((event as CustomEvent<{id: string}>).detail.id);
  });

  const element = editor();
  giveSite(uiLanguage());
  element.connectPort({...sourcePort(uiLanguage), saveBlock: async (manifest: SiteBlock) => void (state.siteBlocks = [...state.siteBlocks.filter((b) => b.type !== manifest.type || b.version !== manifest.version), manifest])});
  element.addEventListener('change', (event) => void keep((event as CustomEvent<ChangeDetail>).detail));
  element.addEventListener('sf-editor-block-save', (event) => {
    const {manifest} = (event as CustomEvent<{manifest: SiteBlock}>).detail;
    state.siteBlocks = [...state.siteBlocks.filter((b) => b.type !== manifest.type || b.version !== manifest.version), manifest];
    element.siteBlocks = state.siteBlocks;
  });

  await openPage(pages[0]!.id);
  translate();
  document.body.dataset.ready = 'true';
}

void start();

/** The host's settings, which a real site keeps elsewhere: the theme and the person's rights. The end-to-end runs set them here. */
const host = {
  setTheme(name: string) {
    state.theme = name in THEMES ? name : 'default';
    editor().theme = themeOf(state.theme);
  },
  setRights(rights: Partial<Rights>) {
    state.rights = {...DESIGNER, ...rights};
    // The host says who changes what is locked, in its own words.
    editor().rights = {...state.rights, ...(state.rights.layout ? {} : {reasons: {layout: t('rights.layout')}})} as Rights;
  },
};

/** The single-page mode's API for a host on the same page (docs/HOST-EMBED.md). */
const embed = {
  load: (payload: LoadPayload) => loadPage(payload),
  save: () => savePage(),
  /** The host's answer to a save: its new revision, and the page is clean again. */
  saved(revision: string | number | null) {
    one.revision = revision;
    setDirty(false);
  },
  /** A change of the page's settings, for the page-settings panel when it ships. */
  setSettings(patch: PageSettings) {
    one.settings = {...one.settings, ...patch};
    showSettings();
    setDirty(true);
  },
  get dirty() {
    return one.dirty;
  },
};

// For the end-to-end runs and the console: the state, read only, and the host's settings.
// Descriptors, not a spread: `dirty` is read when asked, not when the object is made.
(globalThis as {uiEditor?: unknown}).uiEditor = Object.defineProperties({state, openPage, host}, Object.getOwnPropertyDescriptors(embed));
