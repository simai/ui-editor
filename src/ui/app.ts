// The editor shell, step 0: one page from the page list, rendered by
// SF.Composition.render onto the canvas; the Layout mode draws
// sf-composition-overlay over it; the Content mode shows a placeholder until
// sf-content-editor is released in SIMAI Pro. Everything on screen is a
// Framework or Pro component; this file only wires them.

import {onUiLanguage, preferredLanguage, setUiLanguage, t, translate, uiLanguage, type Language} from './i18n.ts';
import {openPageStore, type Page, type PageStore} from './pages.ts';
import {blankDocument, seedDocuments, type CompositionDocument, type CompositionNode} from './seed.ts';
import {startShell} from './shell.ts';

type Mode = 'layout' | 'content';
interface Composition {
  render(document: CompositionDocument): Promise<{html: string; diagnostics: {code: string; path: string}[]}>;
}
interface Overlay extends HTMLElement {
  setDocument(document: CompositionDocument, options?: {describe?: (node: CompositionNode) => {label: string}}): unknown;
  select(id: string | null, options?: {focus?: boolean; emit?: boolean}): unknown;
  refresh(): unknown;
}

const USED = ['sf-composition-overlay', 'sf-menu', 'sf-button-group', 'sf-drawer', 'sf-resizer', 'sf-icon-button', 'sf-button'];
const $ = <T extends HTMLElement = HTMLElement>(selector: string) => document.querySelector<T>(selector)!;
const sf = () => (globalThis as unknown as {SF: {Composition: Composition}}).SF;

const state: {store: PageStore | null; pages: Page[]; current: string | null; mode: Mode; selected: string | null} = {
  store: null,
  pages: [],
  current: null,
  mode: 'layout',
  selected: null,
};

const page = () => state.pages.find((p) => p.id === state.current) ?? null;

function findNode(node: CompositionNode, id: string): CompositionNode | null {
  if (node.id === id) return node;
  for (const child of Object.values(node.slots ?? {}).flat()) {
    const found = findNode(child, id);
    if (found) return found;
  }
  return null;
}

const typeLabel = (type: string) => {
  const label = t(`type.${type}`);
  return label === `type.${type}` ? type : label;
};

function showPages() {
  // sf-menu draws an item without href as plain text; the href makes it a
  // link a person can reach, and the editor takes the navigation itself.
  $<HTMLElement & {items: unknown}>('#pages').items = state.pages.map((p) => ({id: p.id, label: p.title, href: `#page=${encodeURIComponent(p.id)}`, icon: 'description', current: p.id === state.current}));
}

function showProperties() {
  const current = page();
  const node = current && state.selected ? findNode(current.document.root, state.selected) : null;
  $('#props-empty').hidden = Boolean(node);
  $('#props').hidden = !node;
  if (node) {
    $('#props-type').textContent = typeLabel(node.type);
    $('#props-id').textContent = node.id;
  }
}

async function renderCanvas() {
  const current = page();
  const canvas = $('#canvas');
  const problems = $('#canvas-problems');
  if (!current) {
    canvas.replaceChildren();
    return;
  }
  const result = await sf().Composition.render(current.document);
  problems.hidden = result.diagnostics.length === 0;
  problems.textContent = result.diagnostics.length ? t('canvas.invalid', {n: result.diagnostics.map((d) => `${d.code} ${d.path}`).join(', ')}) : '';
  // The renderer escapes every value it writes; the HTML is the Framework's.
  canvas.innerHTML = result.html;
  canvas.dataset.document = current.id;
  const overlay = $<Overlay>('#overlay');
  overlay.setDocument(current.document, {describe: (node) => ({label: typeLabel(node.type)})});
  state.selected = null;
  showProperties();
}

async function openPage(id: string) {
  if (!state.pages.some((p) => p.id === id)) return;
  state.current = id;
  showPages();
  await renderCanvas();
}

async function newPage() {
  const store = state.store!;
  let n = state.pages.length + 1;
  while (state.pages.some((p) => p.id === `page-${n}`)) n += 1;
  const id = `page-${n}`;
  const title = t('pages.untitled', {n});
  const created: Page = {id, title, document: blankDocument(id, title, uiLanguage()), updated: new Date().toISOString()};
  await store.put(created);
  state.pages = await store.list();
  await openPage(id);
}

function setMode(mode: Mode) {
  state.mode = mode;
  $('#mode').setAttribute('value', mode);
  $('#layout-view').hidden = mode !== 'layout';
  $('#content-view').hidden = mode !== 'content';
  // The overlay belongs to the Layout mode; it stays attached, hidden.
  $('#overlay').hidden = mode !== 'layout';
  document.body.dataset.mode = mode;
  if (mode === 'layout') requestAnimationFrame(() => $<Overlay>('#overlay').refresh());
}

function wordsOfComponents() {
  $('#mode').setAttribute('items', JSON.stringify([
    {value: 'layout', label: t('mode.layout'), icon: 'dashboard'},
    {value: 'content', label: t('mode.content'), icon: 'edit_note'},
  ]));
  $('#language').setAttribute('value', uiLanguage());
}

async function start() {
  // The Loader defines each element when it meets its tag. A property set
  // before that stays on the bare element and the component never reads it,
  // so the shell waits for every element it writes to. (sf-empty-state, in the
  // hidden Content view, is defined when it shows, and takes attributes only.)
  await Promise.all(USED.map((tag) => customElements.whenDefined(tag)));
  setUiLanguage(preferredLanguage());
  wordsOfComponents();
  onUiLanguage(() => {
    wordsOfComponents();
    void renderCanvas();
  });

  const store = await openPageStore();
  state.store = store;
  $('#storage-state').hidden = store.persistent;
  let pages = await store.list();
  if (pages.length === 0) {
    const at = Date.now();
    for (const [index, seed] of seedDocuments(uiLanguage()).entries()) {
      await store.put({...seed, updated: new Date(at + index).toISOString()});
    }
    pages = await store.list();
  }
  state.pages = pages;

  const shell = startShell(() => requestAnimationFrame(() => $<Overlay>('#overlay').refresh()));
  $('#toggle-left').addEventListener('click', () => shell.togglePanel('left'));
  $('#toggle-right').addEventListener('click', () => shell.togglePanel('right'));
  $('#mode').addEventListener('change', (event) => setMode((event as CustomEvent<{value: Mode}>).detail.value));
  $('#language').addEventListener('change', (event) => setUiLanguage((event as CustomEvent<{value: Language}>).detail.value));
  $('#new-page').addEventListener('click', () => void newPage());
  $('#pages').addEventListener('sf-menu-navigate', (event) => {
    event.preventDefault();
    void openPage((event as CustomEvent<{id: string}>).detail.id);
  });
  $('#overlay').addEventListener('sf-composition-overlay-select', (event) => {
    state.selected = (event as CustomEvent<{id: string | null}>).detail.id;
    showProperties();
  });
  // A panel that resizes, opens or closes moves the canvas: the overlay measures again.
  new ResizeObserver(() => $<Overlay>('#overlay').refresh()).observe($('.canvas-area'));

  setMode('layout');
  await openPage(pages[0]!.id);
  translate();
  document.body.dataset.ready = 'true';
}

void start();

// For the end-to-end runs and the console: the state, read only.
(globalThis as {uiEditor?: unknown}).uiEditor = {state, openPage, setMode};
