// The Layout mode's changes to a Composition Document. sf-composition-overlay
// sends intent only (select, apply, insert, move); the host changes the
// Document, saves it and draws it again. The Framework ships no edit
// operations over a Document (docs/GAPS.md, G-08), so these few live here.
// Each one returns a new Document and leaves the one it is given untouched.

import type {CompositionDocument, CompositionNode} from './seed.ts';

export interface Place {
  node: CompositionNode;
  parent: CompositionNode | null;
  slot: string;
  index: number;
}

/** Where a node stands: its parent, the parent's slot and its index there. */
export function locate(root: CompositionNode, id: string): Place | null {
  if (root.id === id) return {node: root, parent: null, slot: '', index: 0};
  const walk = (parent: CompositionNode): Place | null => {
    for (const [slot, children] of Object.entries(parent.slots ?? {})) {
      for (const [index, node] of children.entries()) {
        if (node.id === id) return {node, parent, slot, index};
        const found = walk(node);
        if (found) return found;
      }
    }
    return null;
  };
  return walk(root);
}

const ids = (node: CompositionNode, into = new Set<string>()) => {
  into.add(node.id);
  for (const child of Object.values(node.slots ?? {}).flat()) ids(child, into);
  return into;
};

/** An id not yet used in the Document: `<base>`, else `<base>-2`, `<base>-3`, … */
export function freshId(document: CompositionDocument, base: string, taken = ids(document.root)): string {
  const stem = base.replace(/-\d+$/u, '');
  let id = stem;
  for (let n = 2; taken.has(id); n += 1) id = `${stem}-${n}`;
  taken.add(id);
  return id;
}

const copy = (document: CompositionDocument) => structuredClone(document);

const children = (parent: CompositionNode, slot: string) => {
  parent.slots ??= {};
  return (parent.slots[slot] ??= []);
};

/** Puts a node into `parent`'s `slot` at `index` (clamped to the slot). */
export function insert(document: CompositionDocument, parentId: string, slot: string, index: number, node: CompositionNode): CompositionDocument {
  const next = copy(document);
  const parent = locate(next.root, parentId)?.node;
  if (!parent) return document;
  const list = children(parent, slot);
  list.splice(Math.max(0, Math.min(index, list.length)), 0, node);
  return next;
}

export function remove(document: CompositionDocument, id: string): CompositionDocument {
  const next = copy(document);
  const at = locate(next.root, id);
  if (!at?.parent) return document;
  children(at.parent, at.slot).splice(at.index, 1);
  return next;
}

/**
 * Moves a node into `parent`'s `slot`, where `position` counts the other
 * children only, as the overlay's move event does.
 */
export function move(document: CompositionDocument, id: string, parentId: string, slot: string, position: number): CompositionDocument {
  const next = copy(document);
  const at = locate(next.root, id);
  const parent = locate(next.root, parentId)?.node;
  if (!at?.parent || !parent || locate(at.node, parentId)) return document;
  children(at.parent, at.slot).splice(at.index, 1);
  const list = children(parent, slot);
  list.splice(Math.max(0, Math.min(position, list.length)), 0, at.node);
  return next;
}

/** One step up (-1) or down (+1) among its siblings. */
export function shift(document: CompositionDocument, id: string, step: -1 | 1): CompositionDocument {
  const at = locate(document.root, id);
  if (!at?.parent) return document;
  const to = at.index + step;
  if (to < 0 || to >= at.parent.slots![at.slot]!.length) return document;
  return move(document, id, at.parent.id, at.slot, to);
}

/** A copy right after the node, with fresh ids all through it. */
export function duplicate(document: CompositionDocument, id: string): {document: CompositionDocument; id: string} | null {
  const at = locate(document.root, id);
  if (!at?.parent) return null;
  const taken = ids(document.root);
  const renew = (node: CompositionNode): CompositionNode => ({
    ...structuredClone(node),
    id: freshId(document, node.id, taken),
    ...(node.slots ? {slots: Object.fromEntries(Object.entries(node.slots).map(([slot, list]) => [slot, list.map(renew)]))} : {}),
  });
  const twin = renew(at.node);
  return {document: insert(document, at.parent.id, at.slot, at.index + 1, twin), id: twin.id};
}

/** What can be done to a node where it stands. */
export function abilities(document: CompositionDocument, id: string) {
  const at = locate(document.root, id);
  const count = at?.parent ? at.parent.slots![at.slot]!.length : 0;
  return {nested: Boolean(at?.parent), first: !at?.parent || at.index === 0, last: !at?.parent || at.index === count - 1};
}

/** The node to select once `id` is gone: the next sibling, else the one before, else the parent. */
export function neighbour(document: CompositionDocument, id: string): string | null {
  const at = locate(document.root, id);
  if (!at?.parent) return null;
  const list = at.parent.slots![at.slot]!;
  return (list[at.index + 1] ?? list[at.index - 1] ?? at.parent).id;
}
