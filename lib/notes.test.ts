import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { DAILY_NOTES, dayOfYear, noteForDate } from './notes';

describe('dayOfYear', () => {
  it('counts January 1 as day 1', () => {
    assert.equal(dayOfYear(new Date(2026, 0, 1)), 1);
  });

  it('stays in order across the spring time change', () => {
    assert.equal(dayOfYear(new Date(2026, 2, 8)), 67);
    assert.equal(dayOfYear(new Date(2026, 2, 9)), 68);
  });

  it('accounts for leap day', () => {
    assert.equal(dayOfYear(new Date(2024, 2, 1)), 61);
    assert.equal(dayOfYear(new Date(2025, 2, 1)), 60);
  });
});

describe('noteForDate', () => {
  it('keeps the same note for the whole day', () => {
    const morning = noteForDate(new Date(2026, 10, 15, 8));
    const night = noteForDate(new Date(2026, 10, 15, 21));
    assert.equal(morning.text, night.text);
    assert.ok(morning.text.length > 0);
    assert.equal(morning.credit, 'A Finley note');
  });

  it('moves to the next note on the next day', () => {
    const notes = [
      { text: 'First', credit: 'A Finley note' },
      { text: 'Second', credit: 'A Finley note' },
    ];
    assert.equal(noteForDate(new Date(2026, 0, 1), notes).text, 'First');
    assert.equal(noteForDate(new Date(2026, 0, 2), notes).text, 'Second');
    assert.equal(noteForDate(new Date(2026, 0, 3), notes).text, 'First');
  });

  it('ships a small set of family notes', () => {
    assert.ok(DAILY_NOTES.length >= 7);
    for (const note of DAILY_NOTES) {
      assert.equal(note.credit, 'A Finley note');
      assert.ok(note.text.length > 10);
    }
  });
});
