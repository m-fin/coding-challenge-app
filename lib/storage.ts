import { isAppearance, type Appearance } from './appearance';
import {
  starterLists,
  type GroceryItem,
  type GroceryLists,
} from './groceries';

export const LISTS_KEY = 'finley.lists.v1';
export const APPEARANCE_KEY = 'finley.appearance.v1';

export type KeyValueStore = {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
};

function readItem(value: unknown): GroceryItem | null {
  if (typeof value !== 'object' || value === null) return null;
  const item = value as Record<string, unknown>;
  if (typeof item.id !== 'string' || item.id.length === 0) return null;
  if (typeof item.name !== 'string' || item.name.trim().length === 0) return null;
  if (typeof item.done !== 'boolean') return null;
  return { id: item.id, name: item.name, done: item.done };
}

function readList(value: unknown): GroceryItem[] | null {
  if (!Array.isArray(value)) return null;
  const items: GroceryItem[] = [];
  for (const entry of value) {
    const item = readItem(entry);
    if (!item) return null;
    items.push(item);
  }
  return items;
}

function readLists(value: unknown): GroceryLists | null {
  if (typeof value !== 'object' || value === null) return null;
  const record = value as Record<string, unknown>;
  const grocery = readList(record.grocery);
  const costco = readList(record.costco);
  if (!grocery || !costco) return null;
  return { grocery, costco };
}

export async function loadLists(store: KeyValueStore): Promise<GroceryLists> {
  const raw = await store.getItem(LISTS_KEY);
  if (raw == null) return starterLists();
  try {
    return readLists(JSON.parse(raw)) ?? starterLists();
  } catch {
    return starterLists();
  }
}

export async function saveLists(store: KeyValueStore, lists: GroceryLists): Promise<void> {
  await store.setItem(LISTS_KEY, JSON.stringify(lists));
}

export async function loadAppearance(store: KeyValueStore): Promise<Appearance> {
  const raw = await store.getItem(APPEARANCE_KEY);
  if (raw == null) return 'system';
  try {
    const parsed: unknown = JSON.parse(raw);
    return isAppearance(parsed) ? parsed : 'system';
  } catch {
    return 'system';
  }
}

export async function saveAppearance(store: KeyValueStore, appearance: Appearance): Promise<void> {
  await store.setItem(APPEARANCE_KEY, JSON.stringify(appearance));
}
