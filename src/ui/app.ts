// The editor shell: one page from the page list, its layout rendered by
// SF.Composition.render onto the canvas with its content in the layout's
// content.outlet. The Layout mode draws sf-composition-overlay over it, with
// its toolbar above the selected block and one insertion point at the seam; the
// editor turns the overlay's intent into a changed layout, saves it and draws
// it again. The Content mode is SIMAI Pro's sf-content-editor over the page's
// content: it sends the changed content, the editor saves it. A double click or
// Enter on the outlet opens the Content mode; Esc twice there brings the
// layout back with the outlet selected. In the Content mode the Properties
// panel holds the chosen block's parameters, which the editor sends, and the
// pictures put on the page are kept by the editor's media store (src/ui/media.ts).
// Everything on screen is a Framework or Pro component; this file only wires them.

import {onUiLanguage, preferredLanguage, setUiLanguage, t, translate, uiLanguage, type Language} from './i18n.ts';
import {isMedia, openMediaStore, type MediaStore} from './media.ts';
import {openPageStore, type Page, type PageStore} from './pages.ts';
import {abilities, duplicate, freshId, locate, move, neighbour, remove, shift, insert} from './document.ts';
import {blankPage, seedDocuments, starterNode, STARTER_TYPES, type CompositionDocument, type CompositionNode} from './seed.ts';
import {startShell, type Shell} from './shell.ts';

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
  sources: Record<string, string>;
  edit(params?: {id?: string}): {outcome: string};
  setParameter(params: {id: string; key: string; value?: string}): {outcome: string};
  answerFile(params: {block: string; value?: string; href?: string; reason?: string}): {outcome: string};
}
/** A block's parameter as sf-content-editor describes it (its `params` event). */
interface ParamField {
  key: string;
  kind: string;
  label: string;
  value: unknown;
  choices?: {value: string; label: string}[];
  warning?: string;
}
interface BlockParams {
  id: string;
  label: string;
  fields: ParamField[];
  open: boolean;
}
interface ContextMenu extends HTMLElement {
  entries: unknown[];
  openFor(anchor: Element): unknown;
}

const USED = ['sf-composition-overlay', 'sf-context-menu', 'sf-menu', 'sf-button-group', 'sf-drawer', 'sf-resizer', 'sf-icon-button', 'sf-button'];
const $ = <T extends HTMLElement = HTMLElement>(selector: string) => document.querySelector<T>(selector)!;
const sf = () => (globalThis as unknown as {SF: {Composition: Composition}}).SF;

const state: {store: PageStore | null; media: MediaStore | null; pages: Page[]; current: string | null; mode: Mode; selected: string | null; inserting: InsertTarget | null; params: BlockParams | null} = {
  store: null,
  media: null,
  pages: [],
  current: null,
  mode: 'layout',
  selected: null,
  inserting: null,
  params: null,
};
let shell: Shell | null = null;

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

/** The Properties panel: the chosen layout block in the Layout mode, the chosen content block's parameters in the Content mode. */
function showProperties() {
  const content = state.mode === 'content';
  const current = page();
  const node = !content && current && state.selected ? (locate(current.layout.root, state.selected)?.node ?? null) : null;
  const params = content ? state.params : null;
  $('#props-empty').hidden = Boolean(node || params);
  $('#props-empty').textContent = t(content ? 'props.emptyContent' : 'props.empty');
  $('#props').hidden = !node;
  $('#props-later').hidden = content;
  $('#props-block').hidden = !params;
  if (node) {
    $('#props-type').textContent = typeLabel(node.type);
    $('#props-id').textContent = node.id;
  }
  if (params) showParams(params);
}

const contentEditor = () => $<ContentEditor>('#content-editor');

/** One Framework field per parameter; a change goes back to the editor, which writes it and sends the block again. */
function paramControl(id: string, field: ParamField) {
  const tag = field.kind === 'toggle' ? 'sf-switch' : field.kind === 'choice' ? 'sf-dropdown' : 'sf-input';
  const control = document.createElement(tag);
  control.dataset.param = field.key;
  control.setAttribute('size', '1/2');
  control.setAttribute('label', field.label);
  if (tag === 'sf-input') control.setAttribute('input-type', field.kind === 'integer' ? 'number' : 'text');
  control.addEventListener('change', (event) => {
    event.stopPropagation();
    const target = control as HTMLElement & {checked?: boolean; value?: unknown};
    const detail = (event as CustomEvent<{value?: unknown; checked?: boolean}>).detail;
    const value = tag === 'sf-switch' ? String(detail?.checked ?? target.checked ?? false) : String(detail?.value ?? target.value ?? '');
    contentEditor().setParameter({id, key: field.key, value});
  });
  return control;
}

/** Writes the field's value and words; a field the person is typing in keeps what is typed. */
function fillControl(control: HTMLElement, field: ParamField) {
  const target = control as HTMLElement & {checked?: boolean; value?: unknown; options?: unknown};
  control.setAttribute('label', field.label);
  control.setAttribute('hint', field.warning ?? '');
  if (control.tagName === 'SF-SWITCH') {
    control.toggleAttribute('checked', field.value === true);
    target.checked = field.value === true;
    return;
  }
  const value = field.value === null || field.value === undefined ? '' : String(field.value);
  if (control.tagName === 'SF-DROPDOWN') {
    // A Framework element takes properties once it is defined (start()).
    void customElements.whenDefined('sf-dropdown').then(() => {
      target.options = (field.choices ?? []).map((choice) => ({value: choice.value, text: choice.label}));
      target.value = value;
      control.setAttribute('value', value);
    });
    return;
  }
  if (control.contains(document.activeElement)) return;
  control.setAttribute('value', value);
  void customElements.whenDefined('sf-input').then(() => (target.value = value));
}

function showParams(params: BlockParams) {
  $('#props-block-type').textContent = params.label;
  const box = $('#props-fields');
  const shape = `${params.id}|${params.fields.map((field) => `${field.key}:${field.kind}`).join(',')}`;
  if (box.dataset.shape !== shape) {
    box.dataset.shape = shape;
    box.replaceChildren(...params.fields.map((field) => paramControl(params.id, field)));
    if (!params.fields.length) {
      const none = document.createElement('p');
      none.className = 'muted text-1/2 m-0';
      none.textContent = t('props.noFields');
      box.append(none);
    }
  }
  for (const field of params.fields) {
    const control = box.querySelector<HTMLElement>(`[data-param="${field.key}"]`);
    if (control) fillControl(control, field);
  }
}

/** The media values a content names: the pictures' src. */
function mediaOf(content: CompositionDocument) {
  const found: string[] = [];
  const walk = (node: CompositionNode) => {
    const src = (node.data as {src?: unknown} | undefined)?.src;
    if (isMedia(src)) found.push(src);
    Object.values(node.slots ?? {}).flat().forEach(walk);
  };
  walk(content.root);
  return found;
}

const MEDIA_PATH = './media/';

/** The content as the canvas draws it, and this tab's address of each picture
    in it. SF.Composition.render refuses blob: addresses as unsafe, so a media
    value is drawn as a relative path and the image takes its address after
    (docs/GAPS.md, G-14). */
async function shownContent(content: CompositionDocument) {
  const sources = await state.media!.resolve(mediaOf(content));
  const hrefs = new Map<string, string>();
  if (!Object.keys(sources).length) return {content, hrefs};
  const shown = structuredClone(content);
  const walk = (node: CompositionNode) => {
    const data = node.data as {src?: unknown} | undefined;
    if (data && isMedia(data.src) && sources[data.src]) {
      const path = `${MEDIA_PATH}${data.src.slice('media:'.length)}`;
      hrefs.set(path, sources[data.src]!);
      data.src = path;
    }
    Object.values(node.slots ?? {}).flat().forEach(walk);
  };
  walk(shown.root);
  return {content: shown, hrefs};
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
  const shown = await shownContent(current.content);
  const result = await sf().Composition.render(current.layout, {content: shown.content});
  problems.hidden = result.diagnostics.length === 0;
  problems.textContent = result.diagnostics.length ? t('canvas.invalid', {n: result.diagnostics.map((d) => `${d.code} ${d.path}`).join(', ')}) : '';
  // The renderer escapes every value it writes; the HTML is the Framework's.
  canvas.innerHTML = result.html;
  for (const image of canvas.querySelectorAll<HTMLImageElement>(`img[src^="${MEDIA_PATH}"]`)) {
    const href = shown.hrefs.get(image.getAttribute('src')!);
    // A local file costs no network: it loads at once, not when scrolled to.
    if (href) Object.assign(image, {loading: 'eager', src: href});
  }
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
  if (!current || editor.document === current.content) return;
  // The pictures' addresses come before the document, so it draws them at once.
  editor.sources = await state.media!.resolve(mediaOf(current.content));
  editor.document = current.content;
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
  // The Content view is never `hidden`: the Loader fetches no code for an
  // element in a closed container, and sf-content-editor would arrive only on
  // the first switch, a second or two of an empty area. It is shown by mode
  // (src/ui/app.css), so the editor loads with the page.
  // The overlay belongs to the Layout mode; it stays attached, hidden.
  $('#overlay').hidden = mode !== 'layout';
  document.body.dataset.mode = mode;
  showProperties();
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
  state.media = await openMediaStore();
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

  shell = startShell(() => requestAnimationFrame(() => $<Overlay>('#overlay').refresh()));
  $('#toggle-left').addEventListener('click', () => shell!.togglePanel('left'));
  $('#toggle-right').addEventListener('click', () => shell!.togglePanel('right'));
  $('#mode').addEventListener('change', (event) => void setMode((event as CustomEvent<{value: Mode}>).detail.value));
  const editor = $<ContentEditor>('#content-editor');
  editor.addEventListener('change', (event) => {
    const detail = (event as CustomEvent<{document?: CompositionDocument}>).detail;
    if (detail?.document) void changeContent(detail.document);
  });
  // Esc on chosen blocks: the editor is left, and the layout comes back.
  editor.addEventListener('sf-content-editor-leave', () => void setMode('layout'));
  // The chosen block's parameters; «Parameters…» and the toolbar's more button open the panel.
  editor.addEventListener('sf-content-editor-params', (event) => {
    const detail = (event as CustomEvent<BlockParams>).detail;
    state.params = detail.id ? detail : null;
    showProperties();
    if (detail.open && !shell!.isOpen('right')) shell!.togglePanel('right');
    if (detail.open) requestAnimationFrame(() => $('#props-fields').querySelector<HTMLElement>('input, button, [role="combobox"], [role="switch"]')?.focus());
  });
  // A picture put on the page: kept in the media store, its value goes back to the block.
  editor.addEventListener('sf-content-editor-file', (event) => {
    const {file, block} = (event as CustomEvent<{file: File; block: string}>).detail;
    state.media!.put(file).then(
      ({value, href}) => editor.answerFile({block, value, href}),
      () => editor.answerFile({block, reason: t('media.refused')}),
    );
  });
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
