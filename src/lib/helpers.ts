/** Outils d'écriture (`Helpers`) passés au corps de chaque page, dans sa langue. */
import { route, ROUTES } from '../i18n/routes';
import type { Helpers, MiniOpts } from './page-types';
import { formatNumber, type Lang } from './format';
import P from '../data/params-2026.json';
import { raw, compact, FETCHED_AT, featuredById } from './pegel';
import { delta24, lage, LAGE_TEXT, tendenz, TENDENZ_TEXT } from './engine/pegel';
import { quand } from './live';
import { liveSpan } from './live-fmt';
import { series } from './pegel';
import type { St } from './engine/pegel';

const esc = (s: string | number) => String(s).replace(/&(?!(?:[a-z]+|#\d+);)/g, '&amp;').replace(/</g, '&lt;');
type Src = { url: string; label: Record<Lang, string> };
const RAW = (P as unknown as { sources: Record<string, Src> }).sources;
export const SOURCES = (lang: Lang): Record<string, { url: string; label: string }> =>
  Object.fromEntries(Object.entries(RAW).map(([k, v]) => [k, { url: v.url, label: v.label[lang] }]));
export const sourceList = (keys: string[], lang: Lang) => { const S = SOURCES(lang); return keys.map((k) => { if (!S[k]) throw new Error(`Unknown source ${k}`); return { name: S[k].label, url: S[k].url }; }); };
export function table(headers: string[], rows: Array<Array<string | number>>, caption: string | undefined, lang: Lang) {
  return `<div class="not-prose my-6 overflow-x-auto"><table class="journal w-full text-sm${headers.length >= 3 ? ' empile' : ''}">${caption ? `<caption class="mb-2 text-left text-sm text-navy-700">${caption}</caption>` : ''}<thead><tr>${headers.map((h) => `<th scope="col" class="px-3 py-2 text-left font-semibold text-navy-900">${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td data-label="${esc(headers[i] ?? '')}" class="tabular-nums border-b border-navy-100 px-3 py-2 text-navy-800">${typeof c === 'number' ? esc(formatNumber(c, 0, lang)) : c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
export const ext = (url: string, text: string) => `<a href="${url}" target="_blank" rel="nofollow noopener noreferrer">${text}</a>`;
export function link(id: string, text: string, lang: Lang) {
  if (!ROUTES.some((r) => r.id === id)) { throw new Error(`Unknown page id in link: ${id}`); }
  return `<a href="${route(id, lang)}">${text}</a>`;
}
export const box = (title: string, html: string) => `<aside class="boxnote not-prose"><p class="boxnote-title">${title}</p><div class="text-navy-800">${html}</div></aside>`;
export const mini = (kind: string, arg?: MiniOpts) => `<!--mini:${kind}${arg === undefined ? '' : `|${Buffer.from(JSON.stringify(arg)).toString('base64')}`}-->`;
export const srcLink = (key: string, lang: Lang, text?: string) => { const s = SOURCES(lang)[key]; if (!s) throw new Error(`Unknown source ${key}`); return ext(s.url, text ?? s.label); };
const MOIS = { de: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'], en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] };
export function dateTxt(iso: string, lang: Lang): string {
  const [y, mo, d] = iso.split('-').map(Number);
  if (!mo) return String(y);
  const M = MOIS[lang][mo - 1];
  if (!d) return `${M} ${y}`;
  return lang === 'en' ? `${d} ${M} ${y}` : `${d}. ${M} ${y}`;
}
export function helpers(lang: Lang): Helpers {
  const n = (x: number, d = 0) => formatNumber(x, d, lang);
  return {
    lang, t: (de, en) => (lang === 'de' ? de : en), n,
    cm: (x) => `${n(x)} cm`, m: (x) => `${n(x / 100, 2)} m`,
    st: (api) => raw(api), k: (api) => compact(raw(api)),
    lage: (api) => { const s = compact(raw(api)); return liveSpan(s.u, 'lage', rec(s), lang, { k: kennOf(s) }); },
    trend: (api) => { const s = compact(raw(api)); return liveSpan(s.u, 'd', rec(s), lang); },
    vv: (s) => liveSpan(s.u, 'v', rec(s), lang),
    lg: (s) => liveSpan(s.u, 'lage', rec(s), lang, { k: kennOf(s) }),
    vm: (s) => liveSpan(s.u, 'm', rec(s), lang),
    wt: (s) => liveSpan(s.u, 't', rec(s), lang),
    nhn: (s) => liveSpan(s.u, 'nhn', rec(s), lang, { pnp: s.pnp! }),
    rinne: (s) => liveSpan(s.u, 'rinne', rec(s), lang, { ref: s.glw!, tu: s.tu! }),
    vs: (s, ref) => liveSpan(s.u, 'vs', rec(s), lang, { ref }),
    lo: (api) => { const s = compact(raw(api)); const r = range30(s.u); return liveSpan(s.u, 'lo', rec(s), lang, { lo: r.lo }); },
    hi: (api) => { const s = compact(raw(api)); const r = range30(s.u); return liveSpan(s.u, 'hi', rec(s), lang, { hi: r.hi }); },
    date: (iso) => dateTxt(iso, lang), when: (iso) => quand(iso, lang), snap: quand(FETCHED_AT, lang),
    a: (id, text) => link(id, text, lang), src: (key, text) => srcLink(key, lang, text), ext,
    table: (hd, rows, cap) => table(hd, rows, cap, lang), box, mini,
    kenn: (api) => kennTable(api, lang),
    stLink: (id, text) => link(`st-${id}`, text ?? `${lang === 'de' ? 'Pegel ' : ''}${featuredById(id)[lang]}`, lang),
  };
}

const rec = (s: St) => ({ v: s.v, t: s.t, p: s.p });
/** Kennwerte d'une station pour l'einordnung côté navigateur (data-k). */
export const kennOf = (s: St) => Object.fromEntries(Object.entries({ mw: s.mw, mnw: s.mnw, mhw: s.mhw, hhw: s.hhw, nnw: s.nnw, m1: s.m1, m2: s.m2 }).filter(([, x]) => x !== undefined));
/** Plage des 30 derniers jours, en moyennes de 2 h : les mêmes chiffres que la courbe (Verlauf). */
export function range30(u: string) { const v = series(u).map((x) => x[1]); return { lo: Math.min(...v), hi: Math.max(...v) }; }

const KENN: Array<[string, { de: string; en: string }]> = [
  ['NNW', { de: 'Niedrigster bekannter Stand (NNW)', en: 'Lowest level on record (NNW)' }],
  ['MNW', { de: 'Mittleres Niedrigwasser (MNW)', en: 'Mean low water (MNW)' }],
  ['GlW', { de: 'Gleichwertiger Wasserstand (GlW)', en: 'Equivalent low water level (GlW)' }],
  ['MW', { de: 'Mittelwasser (MW)', en: 'Mean water (MW)' }],
  ['M_I', { de: 'Hochwassermarke I', en: 'Flood mark I' }],
  ['MHW', { de: 'Mittleres Hochwasser (MHW)', en: 'Mean high water (MHW)' }],
  ['M_II', { de: 'Hochwassermarke II', en: 'Flood mark II' }],
  ['HSW', { de: 'Höchster Schifffahrtswasserstand (HSW)', en: 'Highest navigable level (HSW)' }],
  ['HHW', { de: 'Höchster bekannter Stand (HHW)', en: 'Highest level on record (HHW)' }],
];
export function kennTable(api: string, lang: Lang): string {
  const s = raw(api);
  const rows: Array<Array<string | number>> = [];
  for (const [k, l] of KENN) {
    const v = s.cv[k];
    if (v === undefined) continue;
    const occ = s.occ[k] ? s.occ[k].map((o) => dateTxt(o, lang)).join(lang === 'de' ? ' und ' : ' and ') : s.span[k] ? `${s.span[k][0].slice(0, 4)}–${s.span[k][1].slice(0, 4)}` : '–';
    // Testeurs du 2026-11-14 : « +71 cm » se lisait à l'envers ; en mots, et relu avec la valeur live.
    rows.push([l[lang], `${formatNumber(v, 0, lang)} cm`, liveSpan(s.uuid, 'ab', { v: s.cur.v, t: s.cur.t, p: s.prev?.v ?? null }, lang, { ref: v }), occ]);
  }
  if (s.cv.TuGLW !== undefined) rows.push([lang === 'de' ? 'Solltiefe der Fahrrinne bei GlW (TuGLW)' : 'Fairway target depth at GlW (TuGLW)', `${formatNumber(s.cv.TuGLW, 0, lang)} cm`, '–', '–']);
  const hd = lang === 'de' ? ['Kennwert', 'Wert', 'Lage zum aktuellen Stand', 'Datum oder Zeitraum'] : ['Reference value', 'Value', 'Compared with the current level', 'Date or period'];
  const r0 = { v: s.cur.v, t: s.cur.t, p: s.prev?.v ?? null };
  const cap = lang === 'de' ? `Amtliche Kennwerte laut PEGELONLINE; aktueller Stand ${liveSpan(s.uuid, 'v', r0, lang)}, Stand: ${liveSpan(s.uuid, 't', r0, lang)}.` : `Official reference values from PEGELONLINE; current level ${liveSpan(s.uuid, 'v', r0, lang)}, as of ${liveSpan(s.uuid, 't', r0, lang)}.`;
  return table(hd, rows, cap, lang);
}
