/** Mobil operator kodlari (+998 XX ...) */
export const OPERATORS = Object.freeze({
  90: 'Beeline', 91: 'Beeline',
  93: 'Ucell', 94: 'Ucell', 50: 'Ucell',
  97: 'Mobiuz', 88: 'Mobiuz',
  99: 'Uzmobile', 95: 'Uzmobile', 77: 'Uzmobile',
  33: 'Humans',
  98: 'Perfectum',
});

/** Raqamdan 9 xonali milliy qismini ajratadi (masalan "901234567") yoki null. */
function national(input) {
  if (input == null) return null;
  const digits = String(input).replace(/\D/g, '');
  let n = null;
  if (digits.length === 12 && digits.startsWith('998')) n = digits.slice(3);
  else if (digits.length === 9) n = digits;
  if (!n || !(n.slice(0, 2) in OPERATORS)) return null;
  return n;
}

/** Raqam to'g'ri O'zbekiston mobil raqamimi? */
export function isValidPhone(input) {
  return national(input) !== null;
}

/** Istalgan ko'rinishdagi raqamni "+998901234567" ga keltiradi. Noto'g'ri bo'lsa null. */
export function normalizePhone(input) {
  const n = national(input);
  return n && '+998' + n;
}

/** "+998 90 123 45 67" ko'rinishida chiqaradi. Noto'g'ri bo'lsa null. */
export function formatPhone(input) {
  const n = national(input);
  if (!n) return null;
  return `+998 ${n.slice(0, 2)} ${n.slice(2, 5)} ${n.slice(5, 7)} ${n.slice(7)}`;
}

/** Operator nomi ("Beeline", "Ucell", ...) yoki null. */
export function getOperator(input) {
  const n = national(input);
  return n && OPERATORS[n.slice(0, 2)];
}
