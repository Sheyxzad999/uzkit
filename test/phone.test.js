import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isValidPhone, normalizePhone, formatPhone, getOperator } from '../src/index.js';

test('normalizePhone turli formatlarni qabul qiladi', () => {
  for (const v of ['+998 90 123 45 67', '998901234567', '90-123-45-67', '(90) 123 45 67', 901234567]) {
    assert.equal(normalizePhone(v), '+998901234567');
  }
});

test('noto‘g‘ri raqamlar', () => {
  for (const v of ['', null, undefined, '12345', '+998 12 123 45 67', '+7 900 123 45 67']) {
    assert.equal(isValidPhone(v), false);
    assert.equal(normalizePhone(v), null);
  }
});

test('formatPhone', () => {
  assert.equal(formatPhone('998931234567'), '+998 93 123 45 67');
  assert.equal(formatPhone('abc'), null);
});

test('getOperator', () => {
  assert.equal(getOperator('+998901234567'), 'Beeline');
  assert.equal(getOperator('+998941234567'), 'Ucell');
  assert.equal(getOperator('+998971234567'), 'Mobiuz');
  assert.equal(getOperator('+998991234567'), 'Uzmobile');
  assert.equal(getOperator('+998331234567'), 'Humans');
});
