// The pictures a page's content names, kept in this browser's IndexedDB: store
// `media` of database `ui-editor` (src/ui/pages.ts), one record per file
// {id, blob, name, type, created}. A picture block's data.src holds the value
// `media:<id>`; the editor and the canvas show it from an object URL made for
// this tab. When IndexedDB is refused the files live in memory for the tab.
// A server store takes this interface's place later; the content keeps values.

import {MEDIA, openDatabase, request} from './pages.ts';

export interface MediaStore {
  readonly persistent: boolean;
  /** Keeps the file; the value goes into the content, the href shows it now. */
  put(file: Blob & {name?: string}): Promise<{value: string; href: string}>;
  /** The hrefs of the values this store knows; other values are left out. */
  resolve(values: Iterable<string>): Promise<Record<string, string>>;
}

interface MediaRecord {
  id: string;
  blob: Blob;
  name: string;
  type: string;
  created: string;
}

const PREFIX = 'media:';

export const isMedia = (value: unknown): value is string => typeof value === 'string' && value.startsWith(PREFIX);

function store(keep: (record: MediaRecord) => Promise<void>, read: (id: string) => Promise<MediaRecord | undefined>, persistent: boolean): MediaStore {
  const hrefs = new Map<string, string>();
  const href = (id: string, blob: Blob) => {
    let url = hrefs.get(id);
    if (!url) hrefs.set(id, (url = URL.createObjectURL(blob)));
    return url;
  };
  return {
    persistent,
    async put(file) {
      const id = crypto.randomUUID();
      await keep({id, blob: file, name: file.name ?? '', type: file.type, created: new Date().toISOString()});
      return {value: `${PREFIX}${id}`, href: href(id, file)};
    },
    async resolve(values) {
      const found: Record<string, string> = {};
      for (const value of new Set(values)) {
        if (!isMedia(value)) continue;
        const id = value.slice(PREFIX.length);
        const known = hrefs.get(id);
        const record = known ? null : await read(id).catch(() => undefined);
        if (known) found[value] = known;
        else if (record) found[value] = href(id, record.blob);
      }
      return found;
    },
  };
}

export async function openMediaStore(): Promise<MediaStore> {
  let db: IDBDatabase;
  try {
    db = await openDatabase();
  } catch {
    const files = new Map<string, MediaRecord>();
    return store(async (record) => void files.set(record.id, record), async (id) => files.get(id), false);
  }
  return store(
    async (record) => {
      const tx = db.transaction(MEDIA, 'readwrite');
      tx.objectStore(MEDIA).put(record);
      await new Promise<void>((resolve, reject) => {
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(tx.error);
      });
    },
    (id) => request(db.transaction(MEDIA).objectStore(MEDIA).get(id) as IDBRequest<MediaRecord | undefined>),
    true,
  );
}
