// The page panel (sf-editor 1.2.0): when no block is chosen, the editor's
// right panel shows the open page's settings: name, address, the site
// template, the theme (read only), publishing and history. The editor keeps
// none of it: the shell gives `pageSettings`, and every edit or press comes
// back as `sf-editor-page-change` {key, value} or `sf-editor-page-action`
// {action}; the shell keeps the change and gives the settings again.
//
// The settings themselves are the host's (src/ui/host.ts, PageSettings):
// in the list mode they live with the local page, in the page mode the host
// gives them in `sf-editor:load` and takes them back in `sf-editor:save`.

import {t} from './i18n.ts';
import type {PageSettings} from './host.ts';

/** What sf-editor's page panel reads (its `page-settings`). */
export interface PanelView {
  name: string;
  address: string;
  template: {value: string; options: {value: string; text: string}[]};
  publish: {label?: string; disabled: boolean; note: string};
  history?: {count?: number};
  status: string;
}

export interface PageChange {
  key: 'name' | 'address' | 'template';
  value: string;
}

export interface PageAction {
  action: 'publish' | 'history';
}

/** The demo site's templates; a host may name its own in `settings.templates`. */
const TEMPLATES = ['default', 'none'];

/** The panel's view of the host's settings: the words are the interface's, the values the host's. */
export function panelView(settings: PageSettings): PanelView {
  const own = Array.isArray(settings.templates) ? (settings.templates as {value: unknown; text?: unknown}[]) : null;
  const options = own
    ? own.map((option) => ({value: String(option.value), text: String(option.text ?? option.value)}))
    : TEMPLATES.map((value) => ({value, text: t(`page.template.${value}`)}));
  const history = settings.history;
  const count = typeof history === 'number' ? history : (history as {count?: unknown} | undefined)?.count;
  const published = settings.published === true;
  return {
    name: String(settings.name ?? ''),
    address: String(settings.address ?? ''),
    template: {value: String(settings.template ?? options[0]?.value ?? ''), options},
    publish: {disabled: published, note: t('page.publishNote')},
    ...(history === undefined ? {} : {history: Number.isFinite(count) ? {count: Number(count)} : {}}),
    status: t(published ? 'page.status.live' : 'page.status.draft'),
  };
}
