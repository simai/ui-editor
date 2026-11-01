// The editor shell: one page from the page list, its layout rendered by
// SF.Composition.render onto the canvas with its content in the layout's
// content.outlet. The Layout mode draws sf-composition-overlay over it, with
// its toolbar above the selected block and one insertion point at the seam; the
// editor turns the overlay's intent into a changed layout, saves it and draws
// it again. The Content mode is SIMAI Pro's sf-content-editor over the page's
// content: it sends the changed content, the editor saves it. A double click or
// Enter on the outlet opens the Content mode; Esc twice there brings the
// layout back with the outlet selected. Everything on screen is a Framework or
// Pro component; this file only wires them.

import {onUiLanguage, preferredLanguage, setUiLanguage, t, translate, uiLanguage, type Language} from './i18n.ts';
import {openPageStore, type Page, type PageStore} from './pages.ts';
import {abilities, duplicate, freshId, locate, move, neighbour, remove, shift, insert} from './document.ts';
import {blankPage, seedDocuments, starterNode, STARTER_TYPES, type CompositionDocument, type CompositionNode} from './seed.ts';
import {startShell} from './shell.ts';

type Mode = 'layout' | 'content';
interface TypeManifest {
  type: string;
  category: string;
  slots: Record<string, {categories: string[]}>;
}
interface Composition {
  BUILTIN_TYPE_MANIFESTS: TypeManifest[];
  render(document: CompositionDocument, context?: {content?: CompositionDocument}): Promise<{html: string; diagnostics: {code: string; path: string}[]}>;
}
interface Action {
  id: string;
  label: string;
  icon: string;
  shortcut?: string;
  disabled?: boolean;
  tone?: 'danger';
}
interface InsertTarget {
  parent_id: string;
  slot: string;
  index: number;
}
interface Overlay extends HTMLElement {
  setDocument(document: CompositionDocument, options?: {describe?: (node: CompositionNode) => {label: string}}): unknown;
  setActions(actions: Action[]): unknown;
  setInsertionTarget(target: InsertTarget | null): unknown;
  select(id: string | null, options?: {focus?: boolean; emit?: boolean}): unknown;
  refresh(): unknown;
}
interface ContentEditor extends HTMLElement {
  document: CompositionDocument;
  edit(params?: {id?: string}): {outcome: string};
}
interface ContextMenu extends HTMLElement {
  entries: unknown[];
  openFor(anchor: Element): unknown;
}

const USED = ['sf-composition-overlay', 'sf-context-menu', 'sf-menu', 'sf-button-group', 'sf-drawer', 'sf-resizer', 'sf-icon-button', 'sf-button'];
const $ = <T extends HTMLElement = HTMLElement>(selector: string) => document.querySelector<T>(selector)!;
const sf = () => (globalThis as unknown as {SF: {Composition: Composition}}).SF;

const state: {store: PageStore | null; pages: Page[]; current: string | null; mode: Mode; selected: string | null; inserting: InsertTarget | null} = {
  store: null,
  pages: [],
  current: null,
  mode: 'layout',
  selected: null,
  inserting: null,
};

const page = () => state.pages.find((p) => p.id === state.current) ?? null;

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
  const node = current && state.selected ? (locate(current.layout.root, state.selected)?.node ?? null) : null;
  $('#props-empty').hidden = Boolean(node);
  $('#props').hidden = !node;
  if (node) {
    $('#props-type').textContent = typeLabel(node.type);
    $('#props-id').textContent = node.id;
  }
}

/** The toolbar over the selected block: icons, keys, and what cannot be done where it stands. */
function showActions() {
  const current = page();
  const can = current && state.selected ? abilities(current.layout, state.selected) : {nested: false, first: true, last: true};
  $<Overlay>('#overlay').setActions([
    {id: 'drag', label: t('action.drag'), icon: 'drag_indicator', disabled: !can.nested},
    {id: 'move-up', label: t('action.up'), icon: 'arrow_upward', shortcut: '⌥↑', disabled: can.first},
    {id: 'move-down', label: t('action.down'), icon: 'arrow_downward', shortcut: '⌥↓', disabled: can.last},
    {id: 'duplicate', label: t('action.duplicate'), icon: 'content_copy', shortcut: '⌘D', disabled: !can.nested},
    {id: 'remove', label: t('action.remove'), icon: 'delete', shortcut: '⌫', tone: 'danger', disabled: !can.nested},
  ]);
}

function select(id: string | null) {
  state.selected = id;
  showProperties();
  showActions();
}

async function renderCanvas(keep: string | null = null) {
  const current = page();
  const canvas = $('#canvas');
  const problems = $('#canvas-problems');
  if (!current) {
    canvas.replaceChildren();
    return;
  }
  const result = await sf().Composition.render(current.layout, {content: current.content});
  problems.hidden = result.diagnostics.length === 0;
  problems.textContent = result.diagnostics.length ? t('canvas.invalid', {n: result.diagnostics.map((d) => `${d.code} ${d.path}`).join(', ')}) : '';
  // The renderer escapes every value it writes; the HTML is the Framework's.
  canvas.innerHTML = result.html;
  canvas.dataset.document = current.id;
  canvas.querySelector('[data-sf-outlet]')?.setAttribute('title', t('outlet.open'));
  const overlay = $<Overlay>('#overlay');
  // The outlet's blocks are the content's, not the layout's: the overlay knows
  // the layout only, and chooses the outlet as one block.
  overlay.setDocument(current.layout, {describe: (node) => ({label: typeLabel(node.type)})});
  const kept = keep && locate(current.layout.root, keep) ? keep : null;
  overlay.select(kept, {emit: false});
  select(kept);
}

async function save(changed: Page) {
  state.pages = state.pages.map((p) => (p.id === changed.id ? changed : p));
  await state.store!.put(changed);
}

/** Saves the changed layout of the open page, draws it and selects `selected`. */
async function change(layout: CompositionDocument, selected: string | null) {
  const current = page();
  if (!current || layout === current.layout) return;
  await save({...current, layout, updated: new Date().toISOString()});
  await renderCanvas(selected);
}

/** Saves the content sf-content-editor sent; the page list follows its title. The canvas is drawn again on the way back to the layout. */
async function changeContent(content: CompositionDocument) {
  const current = page();
  if (!current) return;
  // sf-content-editor of larena-68015a3b75a0 writes a title edit to
  // data["undefined"], which content.document's closed schema refuses: the
  // key is dropped and the title stays (docs/GAPS.md, G-13).
  const data = content.root.data as Record<string, unknown> | undefined;
  if (data && 'undefined' in data) {
    content = structuredClone(content);
    delete (content.root.data as Record<string, unknown>).undefined;
  }
  const title = String((content.root.data as {title?: unknown} | undefined)?.title ?? '').trim() || current.title;
  await save({...current, content, title, updated: new Date().toISOString()});
  if (title !== current.title) showPages();
}

/** The layout's outlet: where the content stands. */
const outletOf = (current: Page | null) => {
  let found: string | null = null;
  const walk = (node: CompositionNode) => {
    if (node.type === 'content.outlet') found ??= node.id;
    Object.values(node.slots ?? {}).flat().forEach(walk);
  };
  if (current) walk(current.layout.root);
  return found;
};

function apply(action: string, id: string) {
  const current = page();
  if (!current || !locate(current.layout.root, id)) return;
  const document = current.layout;
  if (action === 'move-up' || action === 'move-down') void change(shift(document, id, action === 'move-up' ? -1 : 1), id);
  else if (action === 'duplicate') {
    const twin = duplicate(document, id);
    if (twin) void change(twin.document, twin.id);
  } else if (action === 'remove') void change(remove(document, id), neighbour(document, id));
}

/** The starter types that the parent's slot accepts, by the Framework's own type manifests. */
function typesFor(target: InsertTarget) {
  const current = page();
  const parent = current ? locate(current.layout.root, target.parent_id)?.node : null;
  const manifests = sf().Composition.BUILTIN_TYPE_MANIFESTS;
  const accepts = manifests.find((m) => m.type === parent?.type)?.slots[target.slot]?.categories ?? [];
  return STARTER_TYPES.filter((type) => accepts.includes(manifests.find((m) => m.type === type)?.category ?? ''));
}

const TYPE_ICONS: Record<string, string> = {'content.heading': 'title', 'content.paragraph': 'notes', 'layout.section': 'view_agenda'};

/** The seam's + raises a simple list of types; the block picker proper is ui-pro's (plan step 5, docs/GAPS.md G-11). */
function offerTypes(target: InsertTarget) {
  const overlay = $<Overlay>('#overlay');
  const types = typesFor(target);
  if (types.length === 0) return void overlay.setInsertionTarget(null);
  state.inserting = target;
  const menu = $<ContextMenu>('#insert-menu');
  menu.entries = [
    {type: 'heading', text: t('insert.heading')},
    ...types.map((type) => ({id: type, text: typeLabel(type), icon: TYPE_ICONS[type]})),
  ];
  // The overlay keeps the chosen place marked and its + on screen; the list
  // opens under the + (the button is the whole seam line, the mark its circle).
  // The insert event names the place only (G-12).
  const key = `${target.parent_id}|${target.slot}|${target.index}`;
  const place = [...overlay.querySelectorAll<HTMLElement>('button[data-key]')].find((button) => button.dataset.key === key);
  menu.openFor(place?.querySelector('.sf-composition-overlay-insert-mark') ?? place ?? overlay);
}


function insertType(type: (typeof STARTER_TYPES)[number]) {
  const current = page();
  const target = state.inserting;
  state.inserting = null;
  $<Overlay>('#overlay').setInsertionTarget(null);
  if (!current || !target) return;
  const language = current.layout.locale === 'en' ? 'en' : 'ru';
  const node = starterNode(type, (base) => freshId(current.layout, `${current.id}-${base}`), language);
  void change(insert(current.layout, target.parent_id, target.slot, target.index, node), node.id);
}

async function openPage(id: string) {
  if (!state.pages.some((p) => p.id === id)) return;
  state.current = id;
  showPages();
  await renderCanvas();
  if (state.mode === 'content') await showContent();
}

/** Hands the open page's content to sf-content-editor; a Document it sent itself it keeps, with its caret. */
async function showContent() {
  await customElements.whenDefined('sf-content-editor');
  const editor = $<ContentEditor>('#content-editor');
  const current = page();
  if (current && editor.document !== current.content) editor.document = current.content;
}

async function newPage() {
  const store = state.store!;
  let n = state.pages.length + 1;
  while (state.pages.some((p) => p.id === `page-${n}`)) n += 1;
  const id = `page-${n}`;
  const title = t('pages.untitled', {n});
  const at = new Date().toISOString();
  const created: Page = {...blankPage(id, title, uiLanguage()), created: at, updated: at};
  await store.put(created);
  state.pages = await store.list();
  await openPage(id);
}

async function setMode(mode: Mode) {
  const was = state.mode;
  state.mode = mode;
  $('#mode').setAttribute('value', mode);
  $('#layout-view').hidden = mode !== 'layout';
  $('#content-view').hidden = mode !== 'content';
  // The overlay belongs to the Layout mode; it stays attached, hidden.
  $('#overlay').hidden = mode !== 'layout';
  document.body.dataset.mode = mode;
  if (mode === 'content') {
    await showContent();
    // The caret goes to the first block once the editor has drawn the page.
    if (was !== 'content') requestAnimationFrame(() => $<ContentEditor>('#content-editor').edit());
  } else if (was === 'content') {
    // Back from the content: the canvas shows what was typed, the outlet chosen.
    const outlet = outletOf(page());
    await renderCanvas(outlet);
    // Once the overlay has measured the canvas again, the outlet takes the
    // focus in its tree, where Enter opens the content again.
    // The tree is focused by hand: select() moves no focus to a block that is
    // already chosen.
    if (outlet) requestAnimationFrame(() => $('#overlay').querySelector<HTMLElement>('[role="tree"]')?.focus({preventScroll: true}));
  } else requestAnimationFrame(() => $<Overlay>('#overlay').refresh());
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
    void renderCanvas(state.selected);
  });

  const store = await openPageStore();
  state.store = store;
  $('#storage-state').hidden = store.persistent;
  let pages = await store.list();
  if (pages.length === 0) {
    const at = Date.now();
    for (const [index, seed] of seedDocuments(uiLanguage()).entries()) {
      const time = new Date(at + index).toISOString();
      await store.put({...seed, created: time, updated: time});
    }
    pages = await store.list();
  }
  state.pages = pages;

  const shell = startShell(() => requestAnimationFrame(() => $<Overlay>('#overlay').refresh()));
  $('#toggle-left').addEventListener('click', () => shell.togglePanel('left'));
  $('#toggle-right').addEventListener('click', () => shell.togglePanel('right'));
  $('#mode').addEventListener('change', (event) => void setMode((event as CustomEvent<{value: Mode}>).detail.value));
  const editor = $<ContentEditor>('#content-editor');
  editor.addEventListener('change', (event) => {
    const detail = (event as CustomEvent<{document?: CompositionDocument}>).detail;
    if (detail?.document) void changeContent(detail.document);
  });
  // Esc on chosen blocks: the editor is left, and the layout comes back.
  editor.addEventListener('sf-content-editor-leave', () => void setMode('layout'));
  $('#language').addEventListener('change', (event) => setUiLanguage((event as CustomEvent<{value: Language}>).detail.value));
  $('#new-page').addEventListener('click', () => void newPage());
  $('#pages').addEventListener('sf-menu-navigate', (event) => {
    event.preventDefault();
    void openPage((event as CustomEvent<{id: string}>).detail.id);
  });
  const overlay = $<Overlay>('#overlay');
  overlay.addEventListener('sf-composition-overlay-select', (event) => select((event as CustomEvent<{id: string | null}>).detail.id));
  overlay.addEventListener('sf-composition-overlay-apply', (event) => {
    const {action, ids} = (event as CustomEvent<{action: string; ids: string[]}>).detail;
    if (ids[0]) apply(action, ids[0]);
  });
  overlay.addEventListener('sf-composition-overlay-move', (event) => {
    const {id, parent, position, slot} = (event as CustomEvent<{id: string; parent: string; position: number; slot?: string}>).detail;
    const current = page();
    if (current) void change(move(current.layout, id, parent, slot ?? locate(current.layout.root, id)?.slot ?? 'default', position), id);
  });
  overlay.addEventListener('sf-composition-overlay-insert', (event) => {
    const {parent, slot, index} = (event as CustomEvent<{parent: string; slot: string; index: number}>).detail;
    offerTypes({parent_id: parent, slot, index});
  });
  // The action keys (⌥↑ ⌥↓ ⌘D ⌫) work while focus is in the overlay's tree or
  // toolbar; a click on a block leaves it on the canvas scroller. Until the
  // overlay takes them there too (docs/GAPS.md, G-09), the scroller hands such
  // a key to the tree, and the overlay decides whether it is an action's.
  // The outlet opens the content: a double click on it, or Enter while it is chosen.
  $('#canvas').addEventListener('dblclick', (event) => {
    if ((event.target as Element).closest('[data-sf-outlet]')) void setMode('content');
  });
  $('#layout-view').addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' || event.altKey || event.metaKey || event.ctrlKey || event.shiftKey || !state.selected || state.selected !== outletOf(page())) return;
    if ((event.target as Element).closest('button:not([role="treeitem"]), input, [contenteditable]')) return;
    event.preventDefault();
    event.stopPropagation();
    void setMode('content');
  }, {capture: true});
  $('#layout-view').addEventListener('keydown', (event) => {
    if (!state.selected || overlay.contains(event.target as Node)) return;
    if (!(event.altKey || event.metaKey || event.ctrlKey || event.key === 'Backspace' || event.key === 'Delete')) return;
    const tree = overlay.querySelector('[role="tree"]');
    const {key, code, altKey, metaKey, ctrlKey, shiftKey} = event;
    if (tree && !tree.dispatchEvent(new KeyboardEvent('keydown', {key, code, altKey, metaKey, ctrlKey, shiftKey, bubbles: true, cancelable: true}))) event.preventDefault();
  });
  const menu = $('#insert-menu');
  menu.addEventListener('sf-context-menu-select', (event) => insertType((event as CustomEvent<{id: (typeof STARTER_TYPES)[number]}>).detail.id));
  // The list closes on a choice too, maybe before its select event: the place
  // stays in state.inserting until a choice or the next +.
  menu.addEventListener('sf-context-menu-close', () => overlay.setInsertionTarget(null));
  // A panel that resizes, opens or closes moves the canvas: the overlay measures again.
  new ResizeObserver(() => $<Overlay>('#overlay').refresh()).observe($('.canvas-area'));

  await setMode('layout');
  await openPage(pages[0]!.id);
  translate();
  document.body.dataset.ready = 'true';
}

void start();

// For the end-to-end runs and the console: the state, read only.
(globalThis as {uiEditor?: unknown}).uiEditor = {state, openPage, setMode, offerTypes};
