export type ListId = 'grocery' | 'costco';

export type GroceryItem = {
  id: string;
  name: string;
  done: boolean;
};

export type GroceryLists = Record<ListId, GroceryItem[]>;

export const LIST_LABELS: Record<ListId, string> = {
  grocery: 'Grocery Store',
  costco: 'Costco',
};

export const MAX_ITEM_LENGTH = 80;

export function emptyLists(): GroceryLists {
  return { grocery: [], costco: [] };
}

export function starterLists(): GroceryLists {
  return {
    grocery: [
      { id: 'starter-cranberries', name: 'Cranberries', done: false },
      { id: 'starter-butter', name: 'Butter', done: false },
      { id: 'starter-celery', name: 'Celery', done: false },
      { id: 'starter-pie', name: 'Pie crust', done: false },
    ],
    costco: [
      { id: 'starter-towels', name: 'Paper towels', done: false },
      { id: 'starter-chicken', name: 'Rotisserie chicken', done: false },
      { id: 'starter-water', name: 'Sparkling water', done: false },
    ],
  };
}

export function createId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function addItem(lists: GroceryLists, listId: ListId, name: string, id: string): GroceryLists {
  const trimmed = name.trim().slice(0, MAX_ITEM_LENGTH);
  if (!trimmed) return lists;
  return {
    ...lists,
    [listId]: [...lists[listId], { id, name: trimmed, done: false }],
  };
}

export function toggleItem(lists: GroceryLists, listId: ListId, id: string): GroceryLists {
  if (!lists[listId].some((item) => item.id === id)) return lists;
  return {
    ...lists,
    [listId]: lists[listId].map((item) => (item.id === id ? { ...item, done: !item.done } : item)),
  };
}

export function removeItem(lists: GroceryLists, listId: ListId, id: string): GroceryLists {
  if (!lists[listId].some((item) => item.id === id)) return lists;
  return {
    ...lists,
    [listId]: lists[listId].filter((item) => item.id !== id),
  };
}

export function clearChecked(lists: GroceryLists, listId: ListId): GroceryLists {
  if (!lists[listId].some((item) => item.done)) return lists;
  return {
    ...lists,
    [listId]: lists[listId].filter((item) => !item.done),
  };
}

export function displayItems(items: GroceryItem[]): GroceryItem[] {
  return [...items.filter((item) => !item.done), ...items.filter((item) => item.done)];
}

export function listStatus(items: GroceryItem[]): string {
  if (items.length === 0) return 'Nothing yet';
  const left = items.filter((item) => !item.done).length;
  if (left === 0) return 'All set';
  if (left === 1) return '1 left';
  return `${left} left`;
}
