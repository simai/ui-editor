// The page list, kept in this browser's IndexedDB: database `ui-editor`, store
// `pages`, one record per page {id, title, layout, content, created, updated},
// listed in the order they were made. Version 2 of the database starts the list
// again: the pages of version 1 had one layout document and no content, and
// were the seeded demo pages. When IndexedDB
// is refused (a private window, a blocked origin) the list lives in memory for
// the tab and the shell says so.

import type {CompositionDocument} from './seed.ts';

export interface Page {
  id: string;
  /** The page's title in the list: its content's `data.title`. */
  title: string;
  /** The page's frame (`ui-layout`), with one `content.outlet`. */
  layout: CompositionDocument;
  /** What the outlet holds (`structured-content`, root `content.document`). */
  content: CompositionDocument;
  /** ISO time the page was made: the list's order, which an edit keeps. Pages kept before step 1 have none. */
  created?: string;
  /** ISO time of the last write. */
  updated: string;
}

export interface PageStore {
  readonly persistent: boolean;
  list(): Promise<Page[]>;
  put(page: Page): Promise<void>;
}

const DB = 'ui-editor';
const STORE = 'pages';

const request = <T>(r: IDBRequest<T>) => new Promise<T>((resolve, reject) => {
  r.onsuccess = () => resolve(r.result);
  r.onerror = () => reject(r.error);
});

function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const r = indexedDB.open(DB, 2);
    r.onupgradeneeded = () => {
      if (r.result.objectStoreNames.contains(STORE)) r.result.deleteObjectStore(STORE);
      r.result.createObjectStore(STORE, {keyPath: 'id'});
    };
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
    r.onblocked = () => reject(new Error('indexeddb_blocked'));
  });
}

const inOrder = (pages: Page[]) => pages.sort((a, b) => (a.created ?? a.updated).localeCompare(b.created ?? b.updated) || a.id.localeCompare(b.id));

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
    db = await open();
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
