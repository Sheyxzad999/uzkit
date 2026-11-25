const CURRENCY = { latn: 'soʻm', cyrl: 'сўм', ru: 'сум' };

/**
 * 1250000 -> "1 250 000 soʻm"
 * @param {number} amount
 * @param {{ currency?: boolean, separator?: string, decimals?: number, script?: 'latn'|'cyrl'|'ru' }} [options]
 */
export function formatSum(amount, { currency = true, separator = ' ', decimals, script = 'latn' } = {}) {
  const n = Number(amount);
  if (!Number.isFinite(n)) throw new TypeError(`formatSum: son kutilgan, "${amount}" berildi`);
  const d = decimals ?? (Number.isInteger(n) ? 0 : 2);
  const [int, frac] = Math.abs(n).toFixed(d).split('.');
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  const body = (n < 0 ? '-' : '') + grouped + (frac ? ',' + frac : '');
  return currency ? `${body} ${CURRENCY[script] ?? CURRENCY.latn}` : body;
}

/** "1 250 000,50 so'm" -> 1250000.5. O'qib bo'lmasa null. */
export function parseSum(text) {
  if (typeof text === 'number') return Number.isFinite(text) ? text : null;
  const cleaned = String(text ?? '').replace(/[^\d,.-]/g, '').replace(',', '.');
  if (!/\d/.test(cleaned)) return null;
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : null;
}
