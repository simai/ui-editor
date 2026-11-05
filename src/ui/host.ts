// The single-page mode (owner, 2026-11-05): a host (Bitrix, Larena, mail)
// opens the editor on one page it owns. The editor keeps no pages of its own
// and writes nothing to the browser's storage; the host gives the page and
// takes it back on save. The contract is docs/HOST-EMBED.md.
//
//   index.html?mode=page                  any host, the first load message wins
//   index.html?mode=page&host=<origin>    only that origin may load and is told
//
// In an iframe the host speaks by postMessage; on the same page it calls
// globalThis.uiEditor (load, save, setSettings) and listens to the window's
// `sf-editor:save` and `sf-editor:dirty` events.

import type {CompositionDocument} from './seed.ts';

export const PROTOCOL = 1;

/** The page's own settings, the host's: the editor carries them and returns them with the page. */
export type PageSettings = Record<string, unknown> & {name?: string; address?: string; template?: string; published?: boolean; history?: unknown};

export interface LoadPayload {
  document: CompositionDocument;
  settings?: PageSettings;
  revision?: string | number | null;
  language?: 'ru' | 'en';
}

export interface SavePayload {
  type: 'sf-editor:save';
  protocol: number;
  document: CompositionDocument;
  settings: PageSettings;
  /** The host's revision the edits were made on; the host answers `sf-editor:saved` with the new one. */
  revision: string | number | null;
}

export interface Diagnostic {
  code: string;
  path: string;
  message?: string;
}

/** Whether the editor was opened in the single-page mode. */
export const pageMode = () => new URLSearchParams(location.search).get('mode') === 'page';

/** The origin the host named, or null when any parent may load. */
const namedHost = () => {
  const host = new URLSearchParams(location.search).get('host');
  try {
    return host ? new URL(host).origin : null;
  } catch {
    return null;
  }
};

export interface HostLink {
  /** Tells the host what changed; the host page is answered where it loaded from. */
  post(message: Record<string, unknown>): void;
}

/**
 * Listens for the host's messages. A message is taken from the window's
 * parent only, and only from the named origin when `host` is given; the first
 * load fixes the origin every later message must come from and every answer
 * goes to.
 */
export function listenToHost(handlers: {load(payload: LoadPayload): void; save(): void; saved(revision: string | number | null): void}): HostLink {
  const named = namedHost();
  let origin: string | null = named;
  const parent = window.parent !== window ? window.parent : null;
  addEventListener('message', (event) => {
    if (!parent || event.source !== parent) return;
    if (origin && event.origin !== origin) return;
    const data = event.data as {type?: string} & Partial<LoadPayload> & {revision?: string | number | null};
    if (!data || typeof data !== 'object') return;
    if (data.type === 'sf-editor:load') {
      origin = event.origin;
      handlers.load(data as LoadPayload);
    } else if (data.type === 'sf-editor:save-request') handlers.save();
    else if (data.type === 'sf-editor:saved') handlers.saved(data.revision ?? null);
  });
  const link: HostLink = {
    post(message) {
      const full = {protocol: PROTOCOL, ...message};
      // A same-page host hears the window's event; an embedding one, the message.
      dispatchEvent(new CustomEvent(String(message.type), {detail: full}));
      // Until a host has loaded, only `ready` goes out, and it carries nothing of the page.
      if (parent && (origin || message.type === 'sf-editor:ready')) parent.postMessage(full, origin ?? '*');
    },
  };
  return link;
}
