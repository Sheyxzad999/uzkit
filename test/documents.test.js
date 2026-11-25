import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseCarPlate, isValidCarPlate, isValidPassport, parsePinfl, isValidPinfl } from '../src/index.js';

test('parseCarPlate', () => {
  assert.deepEqual(parseCarPlate('60a123bc'), {
    region: '60', regionName: 'Andijon viloyati', type: 'individual', formatted: '60 A 123 BC',
  });
  assert.deepEqual(parseCarPlate('01 123 ABC'), {
    region: '01', regionName: 'Toshkent shahri', type: 'legal', formatted: '01 123 ABC',
  });
  assert.equal(parseCarPlate('99 A 123 BC'), null);
  assert.equal(isValidCarPlate('salom'), false);
});

test('isValidPassport', () => {
  assert.equal(isValidPassport('AA1234567'), true);
  assert.equal(isValidPassport('ad 1234567'), true);
  assert.equal(isValidPassport('A1234567'), false);
});

test('parsePinfl', () => {
  assert.deepEqual(parsePinfl('31505901234567'), { gender: 'male', birthDate: '1990-05-15' });
  assert.deepEqual(parsePinfl('60101051234567'), { gender: 'female', birthDate: '2005-01-01' });
  assert.equal(parsePinfl('33102901234567'), null); // 31-fevral yo'q
  assert.equal(isValidPinfl('123'), false);
});
