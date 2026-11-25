import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toCyrillic, toLatin, isCyrillic, transliterate } from '../src/index.js';

test('toCyrillic', () => {
  const cases = {
    'Salom, dunyo!': 'Салом, дунё!',
    "O'zbekiston": 'Ўзбекистон',
    'Oʻzbekiston': 'Ўзбекистон',
    "G'alaba": 'Ғалаба',
    'Shaxzod': 'Шахзод',
    'choy': 'чой',
    'yangi yil': 'янги йил',
    "yo'l": 'йўл',
    'ekran': 'экран',
    'telefon': 'телефон',
    "ma'no": 'маъно',
    "Is'hoq": 'Исҳоқ',
    'yuz': 'юз',
    'SHAXZOD': 'ШАХЗОД',
  };
  for (const [lat, cyr] of Object.entries(cases)) assert.equal(toCyrillic(lat), cyr, lat);
});

test('toLatin', () => {
  const cases = {
    'Салом, дунё!': 'Salom, dunyo!',
    'Ўзбекистон': 'Oʻzbekiston',
    'Ғалаба': 'Gʻalaba',
    'Шахзод': 'Shaxzod',
    'ШАХЗОД': 'SHAXZOD',
    'Ер': 'Yer',
    'телефон': 'telefon',
    'маъно': 'maʼno',
    'цирк': 'sirk',
    'Ш': 'Sh',
  };
  for (const [cyr, lat] of Object.entries(cases)) assert.equal(toLatin(cyr), lat, cyr);
});

test('toLatin oddiy apostrof bilan', () => {
  assert.equal(toLatin('Ўзбекистон', { apostrophe: "'" }), "O'zbekiston");
});

test('ikki tomonga o‘girish', () => {
  for (const s of ['Oʻzbekiston Respublikasi', 'Toshkent shahri', 'Andijon viloyati']) {
    assert.equal(toLatin(toCyrillic(s)), s);
  }
});

test('isCyrillic va transliterate', () => {
  assert.equal(isCyrillic('Салом'), true);
  assert.equal(isCyrillic('Salom'), false);
  assert.equal(isCyrillic('123'), false);
  assert.equal(transliterate('Салом'), 'Salom');
  assert.equal(transliterate('Salom'), 'Салом');
});
