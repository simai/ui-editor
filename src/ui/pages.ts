// The page list, kept in this browser's IndexedDB: database `ui-editor`, store
// `pages`, one record per page {id, title, document, updated}. When IndexedDB
// is refused (a private window, a blocked origin) the list lives in memory for
// the tab and the shell says so.

import type {CompositionDocument} from './seed.ts';

export interface Page {
  id: string;
  title: string;
  document: CompositionDocument;
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
    const r = indexedDB.open(DB, 1);
    r.onupgradeneeded = () => r.result.createObjectStore(STORE, {keyPath: 'id'});
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
    r.onblocked = () => reject(new Error('indexeddb_blocked'));
  });
}

const byUpdate = (pages: Page[]) => pages.sort((a, b) => a.updated.localeCompare(b.updated) || a.id.localeCompare(b.id));

function memoryStore(): PageStore {
  const pages = new Map<string, Page>();
  return {
    persistent: false,
    list: async () => byUpdate([...pages.values()].map((page) => structuredClone(page))),
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
    list: async () => byUpdate(await request(db.transaction(STORE).objectStore(STORE).getAll() as IDBRequest<Page[]>)),
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
