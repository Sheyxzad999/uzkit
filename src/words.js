import { toCyrillic } from './translit.js';

const ONES = ['', 'bir', 'ikki', 'uch', 'toʻrt', 'besh', 'olti', 'yetti', 'sakkiz', 'toʻqqiz'];
const TENS = ['', 'oʻn', 'yigirma', 'oʻttiz', 'qirq', 'ellik', 'oltmish', 'yetmish', 'sakson', 'toʻqson'];
const SCALES = ['', 'ming', 'million', 'milliard', 'trillion', 'kvadrillion'];

function triple(n) {
  const words = [];
  const h = Math.floor(n / 100), t = Math.floor((n % 100) / 10), o = n % 10;
  if (h) words.push(ONES[h], 'yuz');
  if (t) words.push(TENS[t]);
  if (o) words.push(ONES[o]);
  return words;
}

const out = (text, script) => (script === 'cyrl' ? toCyrillic(text) : text);

/**
 * 123 -> "bir yuz yigirma uch"
 * @param {number} n butun son
 * @param {{ script?: 'latn'|'cyrl' }} [options]
 */
export function numberToWords(n, { script = 'latn' } = {}) {
  if (!Number.isSafeInteger(n)) throw new RangeError(`numberToWords: butun son kutilgan, "${n}" berildi`);
  if (n === 0) return out('nol', script);
  const words = [];
  let rest = Math.abs(n);
  const groups = [];
  while (rest > 0) { groups.push(rest % 1000); rest = Math.floor(rest / 1000); }
  for (let i = groups.length - 1; i >= 0; i--) {
    if (!groups[i]) continue;
    words.push(...triple(groups[i]));
    if (SCALES[i]) words.push(SCALES[i]);
  }
  return out((n < 0 ? 'minus ' : '') + words.join(' '), script);
}

/**
 * 1250000.5 -> "bir million ikki yuz ellik ming soʻm ellik tiyin"
 * @param {number} amount
 * @param {{ script?: 'latn'|'cyrl' }} [options]
 */
export function sumToWords(amount, { script = 'latn' } = {}) {
  const n = Number(amount);
  if (!Number.isFinite(n)) throw new TypeError(`sumToWords: son kutilgan, "${amount}" berildi`);
  const total = Math.round(Math.abs(n) * 100);
  const som = Math.floor(total / 100), tiyin = total % 100;
  let text = (n < 0 ? 'minus ' : '') + numberToWords(som) + ' soʻm';
  if (tiyin) text += ' ' + numberToWords(tiyin) + ' tiyin';
  return out(text, script);
}
