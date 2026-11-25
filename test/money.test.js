import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatSum, parseSum, numberToWords, sumToWords } from '../src/index.js';

test('formatSum', () => {
  assert.equal(formatSum(1250000), '1 250 000 soʻm');
  assert.equal(formatSum(1250000.5), '1 250 000,50 soʻm');
  assert.equal(formatSum(-500), '-500 soʻm');
  assert.equal(formatSum(999), '999 soʻm');
  assert.equal(formatSum(1000, { currency: false }), '1 000');
  assert.equal(formatSum(1000, { script: 'cyrl' }), '1 000 сўм');
  assert.equal(formatSum(1000, { script: 'ru', separator: '.' }), '1.000 сум');
  assert.throws(() => formatSum('abc'), TypeError);
});

test('parseSum', () => {
  assert.equal(parseSum("1 250 000 so'm"), 1250000);
  assert.equal(parseSum('1 250 000,50'), 1250000.5);
  assert.equal(parseSum('-500 сўм'), -500);
  assert.equal(parseSum(42), 42);
  assert.equal(parseSum('narx yoʻq'), null);
});

test('numberToWords', () => {
  assert.equal(numberToWords(0), 'nol');
  assert.equal(numberToWords(7), 'yetti');
  assert.equal(numberToWords(15), 'oʻn besh');
  assert.equal(numberToWords(123), 'bir yuz yigirma uch');
  assert.equal(numberToWords(2024), 'ikki ming yigirma toʻrt');
  assert.equal(numberToWords(1000000), 'bir million');
  assert.equal(numberToWords(1250000), 'bir million ikki yuz ellik ming');
  assert.equal(numberToWords(-40), 'minus qirq');
  assert.equal(numberToWords(1999, { script: 'cyrl' }), 'бир минг тўққиз юз тўқсон тўққиз');
  assert.throws(() => numberToWords(1.5), RangeError);
});

test('sumToWords', () => {
  assert.equal(sumToWords(1250000), 'bir million ikki yuz ellik ming soʻm');
  assert.equal(sumToWords(15000.5), 'oʻn besh ming soʻm ellik tiyin');
  assert.equal(sumToWords(100, { script: 'cyrl' }), 'бир юз сўм');
});
