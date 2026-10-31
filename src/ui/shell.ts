// The editor shell's side panels, on sf-drawer:
//
//   ≥ 1024 px  both panels docked: Страницы at the start, Свойства at the end;
//              each resizes by its edge (sf-resizer) and closes by its toggle
//              in the top bar or by ⌘\ and ⌥⌘\; the canvas takes the room, and
//              the choice is remembered for this viewer (SF.Preferences);
//   <  1024 px  both slide over the canvas, one at a time, and start closed.
//
// The widths are sf-resizer's own and are remembered by it (storage-key).

export type Layout = 'wide' | 'narrow';
export type Side = 'left' | 'right';

export const layoutOf = (width: number): Layout => (width >= 1024 ? 'wide' : 'narrow');

const PANELS_KEY = 'ui-editor/panels';
type Preferences = {read(key: string): unknown; write(key: string, value: unknown): boolean};
const preferences = () => (globalThis as {SF?: {Preferences?: Preferences}}).SF?.Preferences;

type Drawer = HTMLElement & {open?(): void; close?(): void};

export interface Shell {
  readonly layout: Layout;
  togglePanel(side: Side): void;
  isOpen(side: Side): boolean;
}

export function startShell(onPanels: () => void = () => {}): Shell {
  const $ = <T extends HTMLElement>(selector: string) => document.querySelector<T>(selector)!;
  const drawers: Record<Side, Drawer> = {left: $<Drawer>('#left-panel'), right: $<Drawer>('#right-panel')};
  const kept = preferences()?.read(PANELS_KEY) as Partial<Record<Side, boolean>> | null | undefined;
  // Docked panels the person closed, kept across visits.
  const closed: Record<Side, boolean> = {left: kept?.left === true, right: kept?.right === true};
  // Sliding panels the person opened in this visit.
  const wanted: Record<Side, boolean> = {left: false, right: false};
  let layout = layoutOf(innerWidth);
  let applying = false;

  const isOpen = (side: Side) => drawers[side].hasAttribute('open');
  const set = (side: Side, open: boolean) => {
    const drawer = drawers[side];
    const docked = layout === 'wide';
    drawer.toggleAttribute('docked', docked);
    drawer.setAttribute('show-close', String(!docked));
    if (docked) drawer.removeAttribute('modal');
    else drawer.setAttribute('modal', 'false');
    if (open && !isOpen(side)) (drawer.open ? drawer.open() : drawer.setAttribute('open', ''));
    else if (!open && isOpen(side)) (drawer.close ? drawer.close() : drawer.removeAttribute('open'));
  };

  function apply() {
    applying = true;
    for (const side of ['left', 'right'] as const) {
      set(side, layout === 'wide' ? !closed[side] : wanted[side]);
      const toggle = $(`#toggle-${side}`);
      const open = isOpen(side);
      toggle.setAttribute('aria-pressed', String(open));
      toggle.setAttribute('icon', `${side}_panel_${open ? 'close' : 'open'}`);
    }
    document.body.dataset.layout = layout;
    applying = false;
  }

  // A sliding panel the person closes (Escape, its close button) stays closed;
  // a docked one closes by its toggle only, so anything else puts it back.
  document.addEventListener('sf-drawer-closed', (event) => {
    if (applying) return;
    const side = (Object.keys(drawers) as Side[]).find((s) => drawers[s] === event.target);
    if (!side) return;
    if (layout === 'narrow') wanted[side] = false;
    apply();
  });

  addEventListener('resize', () => {
    const next = layoutOf(innerWidth);
    if (next === layout) return;
    layout = next;
    wanted.left = false;
    wanted.right = false;
    apply();
  });

  // ⌘\ and ⌥⌘\ (Ctrl on other systems). event.code, not event.key: ⌥ changes
  // the character a key types.
  addEventListener('keydown', (event) => {
    if (event.code !== 'Backslash' || !(event.metaKey || event.ctrlKey) || event.shiftKey) return;
    event.preventDefault();
    shell.togglePanel(event.altKey ? 'right' : 'left');
  });

  const shell: Shell = {
    get layout() {
      return layout;
    },
    isOpen,
    togglePanel(side) {
      const open = isOpen(side);
      // The focus does not go away with the panel: it stands on the way back.
      const panel = $(side === 'left' ? '#pages-pane' : '#props-pane').closest('.sf-drawer-panel');
      if (open && panel?.contains(document.activeElement)) $(`#toggle-${side}`).querySelector('button')?.focus();
      if (layout === 'wide') {
        closed[side] = open;
        preferences()?.write(PANELS_KEY, {...closed});
      } else {
        wanted.left = side === 'left' ? !open : false;
        wanted.right = side === 'right' ? !open : false;
      }
      apply();
      onPanels();
    },
  };
  apply();
  return shell;
}
