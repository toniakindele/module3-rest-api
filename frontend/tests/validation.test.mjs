import test from 'node:test';
import assert from 'node:assert/strict';
import { isValidTitle } from '../src/validation.mjs';

test('A normal title is accepted', () => {
  const result = isValidTitle('Start a coding club');
  assert.equal(result, true);
});

test('An empty string is rejected', () => {
  const result = isValidTitle('');
  assert.equal(result, false);
});

test('A spaces-only string is rejected', () => {
  const result = isValidTitle('      ');
  assert.equal(result, false);
});
