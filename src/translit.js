const APOS = "'ʻʼ’‘`´";
const isLetter = (c) => !!c && /\p{L}/u.test(c);
const isUpper = (c) => isLetter(c) && c !== c.toLowerCase();

const L2C = {
  a: 'а', b: 'б', c: 'с', d: 'д', f: 'ф', g: 'г', h: 'ҳ', i: 'и', j: 'ж', k: 'к',
  l: 'л', m: 'м', n: 'н', o: 'о', p: 'п', q: 'қ', r: 'р', s: 'с', t: 'т', u: 'у',
  v: 'в', w: 'в', x: 'х', y: 'й', z: 'з',
};
const Y_PAIRS = { a: 'я', e: 'е', o: 'ё', u: 'ю' };

/** Lotin yozuvidagi o'zbekcha matnni kirillga o'giradi. */
export function toCyrillic(text) {
  const s = String(text);
  let out = '';
  for (let i = 0; i < s.length; ) {
    const ch = s[i];
    const lo = ch.toLowerCase();
    const next = s[i + 1] || '';
    const nlo = next.toLowerCase();
    const put = (c) => { out += isUpper(ch) ? c.toUpperCase() : c; };

    if ((lo === 'o' || lo === 'g') && next && APOS.includes(next)) {
      put(lo === 'o' ? 'ў' : 'ғ'); i += 2; continue;
    }
    if (lo === 's' && nlo === 'h') { put('ш'); i += 2; continue; }
    if (lo === 'c' && nlo === 'h') { put('ч'); i += 2; continue; }
    if (lo === 's' && next && APOS.includes(next) && (s[i + 2] || '').toLowerCase() === 'h') {
      // Is'hoq -> Исҳоқ
      put('с'); out += isUpper(s[i + 2]) ? 'Ҳ' : 'ҳ'; i += 3; continue;
    }
    if (lo === 'y' && Y_PAIRS[nlo]) {
      const after = s[i + 2] || '';
      if (!(nlo === 'o' && after && APOS.includes(after))) { // yo'l -> йўл
        put(Y_PAIRS[nlo]); i += 2; continue;
      }
    }
    if (lo === 'e') { put(isLetter(s[i - 1]) ? 'е' : 'э'); i++; continue; }
    if (APOS.includes(ch)) {
      out += isLetter(s[i - 1]) && isLetter(next) ? 'ъ' : ch; i++; continue;
    }
    if (L2C[lo]) { put(L2C[lo]); i++; continue; }
    out += ch; i++;
  }
  return out;
}

const C2L = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', ё: 'yo', ж: 'j', з: 'z', и: 'i', й: 'y',
  к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u',
  ф: 'f', х: 'x', ч: 'ch', ш: 'sh', щ: 'sh', ы: 'i', ь: '', э: 'e', ю: 'yu', я: 'ya',
  қ: 'q', ҳ: 'h',
};
const VOWELS = 'аеёиоуэюяўыъь';

/**
 * Kirill yozuvidagi o'zbekcha matnni lotinga o'giradi.
 * @param {string} text
 * @param {{ apostrophe?: string }} [options] oʻ/gʻ uchun belgi (standart: "ʻ")
 */
export function toLatin(text, { apostrophe = 'ʻ' } = {}) {
  const s = String(text);
  const tutuq = apostrophe === 'ʻ' ? 'ʼ' : apostrophe;
  let out = '';
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    const lo = ch.toLowerCase();
    const prev = s[i - 1];
    let r;
    if (lo === 'ў') r = 'o' + apostrophe;
    else if (lo === 'ғ') r = 'g' + apostrophe;
    else if (lo === 'ъ') r = tutuq;
    else if (lo === 'е') r = !isLetter(prev) || VOWELS.includes(prev.toLowerCase()) ? 'ye' : 'e';
    else if (lo === 'ц') r = isLetter(prev) && VOWELS.includes(prev.toLowerCase()) ? 'ts' : 's';
    else r = C2L[lo];

    if (r === undefined) { out += ch; continue; }
    if (!isUpper(ch) || !r) { out += r; continue; }
    const next = s[i + 1];
    const wordIsUpper = isUpper(next) || (isUpper(prev) && !isLetter(next));
    out += wordIsUpper ? r.toUpperCase() : r[0].toUpperCase() + r.slice(1);
  }
  return out;
}

/** Matn kirill yozuvidami? (harflarning yarmidan ko'pi kirill bo'lsa) */
export function isCyrillic(text) {
  const letters = String(text).match(/\p{L}/gu) || [];
  const cyr = letters.filter((c) => /\p{Script=Cyrillic}/u.test(c)).length;
  return letters.length > 0 && cyr / letters.length > 0.5;
}

/** Matnni teskari yozuvga avtomatik o'giradi. */
export function transliterate(text, options) {
  return isCyrillic(text) ? toLatin(text, options) : toCyrillic(text);
}
