import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { greetingForHour } from './greeting';
import { resolveScheme } from './appearance';

describe('resolveScheme', () => {
  it('follows the phone until someone picks light or dark', () => {
    assert.equal(resolveScheme('system', 'dark'), 'dark');
    assert.equal(resolveScheme('system', 'light'), 'light');
    assert.equal(resolveScheme('system', null), 'light');
    assert.equal(resolveScheme('dark', 'light'), 'dark');
    assert.equal(resolveScheme('light', 'dark'), 'light');
  });
});

describe('greetingForHour', () => {
  it('greets the Finleys by time of day', () => {
    assert.equal(greetingForHour(8), 'Good morning, Finleys');
    assert.equal(greetingForHour(12), 'Good afternoon, Finleys');
    assert.equal(greetingForHour(16), 'Good afternoon, Finleys');
    assert.equal(greetingForHour(17), 'Good evening, Finleys');
  });
});
