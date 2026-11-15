import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { emptyLists, starterLists } from './groceries';
import {
  APPEARANCE_KEY,
  LISTS_KEY,
  loadAppearance,
  loadLists,
  saveAppearance,
  saveLists,
  type KeyValueStore,
} from './storage';

function memoryStore(seed: Record<string, string> = {}): KeyValueStore & {
  data: Record<string, string>;
} {
  const data = { ...seed };
  return {
    data,
    async getItem(key) {
      return Object.prototype.hasOwnProperty.call(data, key) ? data[key] : null;
    },
    async setItem(key, value) {
      data[key] = value;
    },
  };
}

describe('list storage', () => {
  it('offers the starter lists when nothing is saved yet', async () => {
    const lists = await loadLists(memoryStore());
    assert.deepEqual(lists, starterLists());
  });

  it('round-trips edits, including a list that was cleared', async () => {
    const store = memoryStore();
    const cleared = emptyLists();
    await saveLists(store, cleared);
    assert.deepEqual(await loadLists(store), cleared);
    assert.ok(store.data[LISTS_KEY]?.includes('"grocery"'));
  });

  it('falls back to the starter lists when the saved value is unusable', async () => {
    const broken = memoryStore({ [LISTS_KEY]: '{not json' });
    const wrongShape = memoryStore({ [LISTS_KEY]: JSON.stringify({ grocery: 'milk' }) });
    assert.deepEqual(await loadLists(broken), starterLists());
    assert.deepEqual(await loadLists(wrongShape), starterLists());
  });
});

describe('appearance storage', () => {
  it('defaults to matching the phone', async () => {
    assert.equal(await loadAppearance(memoryStore()), 'system');
  });

  it('remembers a chosen appearance and ignores junk', async () => {
    const store = memoryStore();
    await saveAppearance(store, 'dark');
    assert.equal(await loadAppearance(store), 'dark');
    assert.equal(store.data[APPEARANCE_KEY], '"dark"');

    const junk = memoryStore({ [APPEARANCE_KEY]: '"sepia"' });
    assert.equal(await loadAppearance(junk), 'system');
  });
});
