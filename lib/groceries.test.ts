import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  addItem,
  clearChecked,
  displayItems,
  emptyLists,
  listStatus,
  removeItem,
  starterLists,
  toggleItem,
} from './groceries';

const blank = emptyLists();

describe('addItem', () => {
  it('trims the name and appends an unchecked item', () => {
    const next = addItem(blank, 'grocery', '  Milk  ', 'milk');
    assert.deepEqual(next.grocery, [{ id: 'milk', name: 'Milk', done: false }]);
    assert.deepEqual(blank.grocery, []);
  });

  it('ignores a blank name and keeps the same lists', () => {
    assert.equal(addItem(blank, 'costco', '   ', 'nope'), blank);
  });

  it('caps a very long name at 80 characters', () => {
    const next = addItem(blank, 'grocery', 'a'.repeat(90), 'long');
    assert.equal(next.grocery[0]?.name.length, 80);
  });
});

describe('toggleItem and removeItem', () => {
  it('checks and unchecks one item', () => {
    const lists = addItem(blank, 'costco', 'Paper towels', 'towels');
    const checked = toggleItem(lists, 'costco', 'towels');
    assert.equal(checked.costco[0]?.done, true);
    assert.equal(toggleItem(checked, 'costco', 'towels').costco[0]?.done, false);
  });

  it('leaves the lists alone when the id is missing', () => {
    const lists = addItem(blank, 'grocery', 'Eggs', 'eggs');
    assert.equal(toggleItem(lists, 'grocery', 'missing'), lists);
    assert.equal(removeItem(lists, 'grocery', 'missing'), lists);
  });

  it('removes one item without touching the other list', () => {
    const withGrocery = addItem(blank, 'grocery', 'Eggs', 'eggs');
    const lists = addItem(withGrocery, 'costco', 'Chicken', 'chicken');
    const next = removeItem(lists, 'grocery', 'eggs');
    assert.deepEqual(next.grocery, []);
    assert.equal(next.costco.length, 1);
  });
});

describe('clearChecked', () => {
  it('drops finished items and keeps the rest in order', () => {
    let lists = addItem(blank, 'grocery', 'Milk', 'milk');
    lists = addItem(lists, 'grocery', 'Eggs', 'eggs');
    lists = toggleItem(lists, 'grocery', 'milk');
    const next = clearChecked(lists, 'grocery');
    assert.deepEqual(next.grocery, [{ id: 'eggs', name: 'Eggs', done: false }]);
  });
});

describe('displayItems and listStatus', () => {
  it('shows unfinished items before finished ones', () => {
    const items = [
      { id: 'a', name: 'Milk', done: true },
      { id: 'b', name: 'Eggs', done: false },
      { id: 'c', name: 'Bread', done: true },
    ];
    assert.deepEqual(
      displayItems(items).map((item) => item.id),
      ['b', 'a', 'c'],
    );
  });

  it('describes an empty list, a finished list, and what is left', () => {
    assert.equal(listStatus([]), 'Nothing yet');
    assert.equal(listStatus([{ id: 'a', name: 'Milk', done: true }]), 'All set');
    assert.equal(listStatus([{ id: 'a', name: 'Milk', done: false }]), '1 left');
    assert.equal(
      listStatus([
        { id: 'a', name: 'Milk', done: false },
        { id: 'b', name: 'Eggs', done: false },
      ]),
      '2 left',
    );
  });
});

describe('starterLists', () => {
  it('starts both family stores with a few items', () => {
    const lists = starterLists();
    assert.ok(lists.grocery.length >= 3);
    assert.ok(lists.costco.length >= 2);
    assert.ok(lists.grocery.every((item) => item.done === false));
  });
});
