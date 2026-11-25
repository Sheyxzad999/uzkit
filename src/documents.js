/** Avtomobil raqamlaridagi viloyat kodlari */
export const REGIONS = Object.freeze({
  '01': 'Toshkent shahri',
  10: 'Toshkent viloyati',
  20: 'Sirdaryo viloyati',
  25: 'Jizzax viloyati',
  30: 'Samarqand viloyati',
  40: 'Fargʻona viloyati',
  50: 'Namangan viloyati',
  60: 'Andijon viloyati',
  70: 'Qashqadaryo viloyati',
  75: 'Surxondaryo viloyati',
  80: 'Buxoro viloyati',
  85: 'Navoiy viloyati',
  90: 'Xorazm viloyati',
  95: 'Qoraqalpogʻiston Respublikasi',
});

const clean = (v) => String(v ?? '').toUpperCase().replace(/[\s-]/g, '');

/**
 * Avtomobil raqamini tahlil qiladi: "01A123BC" yoki "01 123 ABC".
 * @returns {{ region: string, regionName: string, type: 'individual'|'legal', formatted: string } | null}
 */
export function parseCarPlate(input) {
  const s = clean(input);
  let m = s.match(/^(\d{2})([A-Z])(\d{3})([A-Z]{2})$/);
  let type = 'individual', formatted;
  if (m) formatted = `${m[1]} ${m[2]} ${m[3]} ${m[4]}`;
  else {
    m = s.match(/^(\d{2})(\d{3})([A-Z]{3})$/);
    if (!m) return null;
    type = 'legal';
    formatted = `${m[1]} ${m[2]} ${m[3]}`;
  }
  const regionName = REGIONS[m[1]];
  if (!regionName) return null;
  return { region: m[1], regionName, type, formatted };
}

/** Avtomobil raqami to'g'rimi? */
export function isValidCarPlate(input) {
  return parseCarPlate(input) !== null;
}

/** Pasport yoki ID-karta seriya va raqami: "AA1234567", "AD 1234567". */
export function isValidPassport(input) {
  return /^[A-Z]{2}\d{7}$/.test(clean(input));
}

/**
 * JShShIR (PINFL) ni tahlil qiladi: 14 raqam, jins va tug'ilgan sana.
 * Faqat formatni tekshiradi, nazorat raqamini emas.
 * @returns {{ gender: 'male'|'female', birthDate: string } | null}
 */
export function parsePinfl(input) {
  const s = String(input ?? '').replace(/\s/g, '');
  if (!/^[1-6]\d{13}$/.test(s)) return null;
  const g = Number(s[0]);
  const century = 1800 + Math.floor((g - 1) / 2) * 100;
  const day = Number(s.slice(1, 3)), month = Number(s.slice(3, 5));
  const year = century + Number(s.slice(5, 7));
  const d = new Date(Date.UTC(year, month - 1, day));
  if (d.getUTCFullYear() !== year || d.getUTCMonth() !== month - 1 || d.getUTCDate() !== day) return null;
  const pad = (x) => String(x).padStart(2, '0');
  return { gender: g % 2 ? 'male' : 'female', birthDate: `${year}-${pad(month)}-${pad(day)}` };
}

/** JShShIR (PINFL) formati to'g'rimi? */
export function isValidPinfl(input) {
  return parsePinfl(input) !== null;
}
