// The page list, kept in this browser's IndexedDB: database `ui-editor`, store
// `pages`, one record per page {id, title, document, created, updated},
// listed in the order they were made. A record kept before the one editor has
// {layout, content} and no document: the reader composes its document
// (src/ui/seed.ts, composePage) and the next write adds it, leaving the two
// old documents in place. Version 2 of the database started the list
// again: the pages of version 1 had one layout document and no content, and
// were the seeded demo pages. Version 3 added the store `media`, the pictures
// the content editor kept; the one editor keeps none, and the store stays for a
// rollback. When IndexedDB
// is refused (a private window, a blocked origin) the list lives in memory for
// the tab and the shell says so.

import {composePage, type CompositionDocument} from './seed.ts';

export interface Page {
  id: string;
  /** The page's title in the list. */
  title: string;
  /** The page: one Composition Document (`ui-layout`), layout and text in one tree. */
  document: CompositionDocument;
  /** A page kept before the one editor: its frame with one `content.outlet`, kept as it was so a rollback reads it. */
  layout?: CompositionDocument;
  /** …and what that outlet held. */
  content?: CompositionDocument;
  /** ISO time the page was made: the list's order, which an edit keeps. Pages kept before step 1 have none. */
  created?: string;
  /** ISO time of the last write. */
  updated: string;
  /**
   * The seed version a demo page was made from, while nobody has changed it
   * (src/ui/seed.ts, SEED_VERSION). An edit drops it; a page that keeps it
   * follows a newer seed and the interface's language.
   */
  seed?: number;
}

export interface PageStore {
  readonly persistent: boolean;
  list(): Promise<Page[]>;
  put(page: Page): Promise<void>;
}

const DB = 'ui-editor';
const STORE = 'pages';
export const MEDIA = 'media';

export const request = <T>(r: IDBRequest<T>) => new Promise<T>((resolve, reject) => {
  r.onsuccess = () => resolve(r.result);
  r.onerror = () => reject(r.error);
});

let opening: Promise<IDBDatabase> | null = null;

/** The editor's database, opened once for the tab: the page list and the media share it. */
export function openDatabase(): Promise<IDBDatabase> {
  opening ??= open();
  return opening;
}

function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const r = indexedDB.open(DB, 3);
    r.onupgradeneeded = (event) => {
      const names = r.result.objectStoreNames;
      if (event.oldVersion < 2) {
        if (names.contains(STORE)) r.result.deleteObjectStore(STORE);
        r.result.createObjectStore(STORE, {keyPath: 'id'});
      }
      if (!names.contains(MEDIA)) r.result.createObjectStore(MEDIA, {keyPath: 'id'});
    };
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
    r.onblocked = () => reject(new Error('indexeddb_blocked'));
  });
}

/** A page as the editor reads it: with its one Document, composed for a record kept before it. */
const current = (page: Page): Page => (page.document || !page.layout || !page.content ? page : {...page, document: composePage(page.id, page.layout, page.content, page.layout.locale === 'en' ? 'en' : 'ru')});
const inOrder = (pages: Page[]) => pages.map(current).sort((a, b) => (a.created ?? a.updated).localeCompare(b.created ?? b.updated) || a.id.localeCompare(b.id));

function memoryStore(): PageStore {
  const pages = new Map<string, Page>();
  return {
    persistent: false,
    list: async () => inOrder([...pages.values()].map((page) => structuredClone(page))),
    put: async (page) => void pages.set(page.id, structuredClone(page)),
  };
}

export async function openPageStore(): Promise<PageStore> {
  let db: IDBDatabase;
  try {
    db = await openDatabase();
  } catch {
    return memoryStore();
  }
  return {
    persistent: true,
    list: async () => inOrder(await request(db.transaction(STORE).objectStore(STORE).getAll() as IDBRequest<Page[]>)),
    put: async (page) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).put(page);
      await new Promise<void>((resolve, reject) => {
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(tx.error);
      });
    },
  };
}
