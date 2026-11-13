/** Formatage localisé, une locale par langue de page (MASTERFACTORY §4) : de-DE, en-GB. Chaque fonction prend la langue. */
import { CURRENCY } from '../data/site-config';

export type Lang = 'de' | 'en';
/** Formatage : anglais britannique (point décimal) sur les pages /en/, allemand sinon. LANG_TAGS (en-DE) ne sert qu'au hreflang. */
export const TAG = (l: string) => (l.startsWith('en') ? 'en-GB' : 'de-DE');
const cache = new Map<string, Intl.NumberFormat>();
function nf(lang: string, opts: Intl.NumberFormatOptions): Intl.NumberFormat {
  const k = lang + JSON.stringify(opts);
  if (!cache.has(k)) cache.set(k, new Intl.NumberFormat(TAG(lang), opts));
  return cache.get(k)!;
}
export function formatMoney(value: number, decimals = 0, lang: Lang = 'de'): string {
  return nf(lang, { style: 'currency', currency: CURRENCY, minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value);
}
export function formatNumber(value: number, decimals = 0, lang: Lang = 'de'): string {
  return nf(lang, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value);
}
/** Nombre tiré des paramètres dans un texte : décimales utiles seulement (§4.1). */
export function formatDecimal(value: number, max = 2, lang: Lang = 'de'): string {
  return nf(lang, { maximumFractionDigits: max }).format(value);
}
export function formatPercent(value: number, decimals = 1, lang: Lang = 'de'): string {
  return nf(lang, { style: 'percent', minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value).replace(/(\d)\s?%/, lang === 'en' ? '$1%' : '$1 %');
}
export function parseLocaleNumber(input: string): number {
  const cleaned = input.replace(/[^\d.,-]/g, '');
  const lastComma = cleaned.lastIndexOf(','), lastDot = cleaned.lastIndexOf('.');
  let s = cleaned;
  if (/^-?\d{1,3}(,\d{3})+$/.test(cleaned)) s = cleaned.replace(/,/g, '');
  else if (lastComma > lastDot) s = cleaned.replace(/\./g, '').replace(',', '.');
  else if (/^-?\d{1,3}(\.\d{3})+$/.test(cleaned)) s = cleaned.replace(/\./g, '');
  else s = cleaned.replace(/,/g, '');
  const n = parseFloat(s);
  return isNaN(n) ? 0 : n;
}
/** Date en toutes lettres dans la langue de la page : « 6. Mai 2027 », « 6 May 2027 ». Fuseau UTC forcé. */
export function displayDate(iso: string, langTag: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(TAG(langTag), { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}
