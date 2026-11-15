import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { countdownCopy, daysUntil, nextThanksgiving, thanksgivingDate } from './thanksgiving';

describe('thanksgivingDate', () => {
  it('finds the fourth Thursday in November', () => {
    assert.equal(thanksgivingDate(2023).getDate(), 23);
    assert.equal(thanksgivingDate(2024).getDate(), 28);
    assert.equal(thanksgivingDate(2025).getDate(), 27);
    assert.equal(thanksgivingDate(2026).getDate(), 26);
    assert.equal(thanksgivingDate(2027).getDate(), 25);
    assert.equal(thanksgivingDate(2026).getDay(), 4);
  });
});

describe('nextThanksgiving', () => {
  it('counts this year while Thanksgiving is still ahead', () => {
    const target = nextThanksgiving(new Date(2026, 10, 15, 23, 30));
    assert.equal(target.getFullYear(), 2026);
    assert.equal(target.getMonth(), 10);
    assert.equal(target.getDate(), 26);
  });

  it('stays on Thanksgiving during the day itself', () => {
    const target = nextThanksgiving(new Date(2026, 10, 26, 18));
    assert.equal(target.getFullYear(), 2026);
    assert.equal(target.getDate(), 26);
  });

  it('rolls to next year the day after', () => {
    const target = nextThanksgiving(new Date(2026, 10, 27, 0, 30));
    assert.equal(target.getFullYear(), 2027);
    assert.equal(target.getMonth(), 10);
    assert.equal(target.getDate(), 25);
  });
});

describe('daysUntil', () => {
  it('counts whole local days and ignores the clock time', () => {
    const today = new Date(2026, 10, 15, 23, 59);
    const target = new Date(2026, 10, 26, 1);
    assert.equal(daysUntil(today, target), 11);
    assert.equal(daysUntil(target, target), 0);
  });
});

describe('countdownCopy', () => {
  it('describes a normal countdown with the date', () => {
    const copy = countdownCopy(new Date(2026, 10, 15));
    assert.deepEqual(copy, {
      headline: '11',
      unit: 'days',
      detail: 'Thursday, November 26',
    });
  });

  it('speaks differently the day before and the day of', () => {
    assert.equal(countdownCopy(new Date(2026, 10, 25)).headline, '1');
    assert.equal(countdownCopy(new Date(2026, 10, 25)).unit, 'day');
    assert.equal(countdownCopy(new Date(2026, 10, 26)).headline, 'Today');
    assert.match(countdownCopy(new Date(2026, 10, 26)).detail, /Thanksgiving/);
  });
});
