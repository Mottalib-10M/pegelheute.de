/**
 * Textes de la page « Hochwasser aktuell » qui dépendent du classement : écrits au build avec la momentaufnahme,
 * puis réécrits par la Rangliste avec la même lecture live (testeurs naïfs du 2026-11-14 : le chapeau citait
 * Hofkirchen quand le classement live mettait Pfelling en tête).
 */
import { anteil, lage, type St } from './engine/pegel';
import { formatNumber, formatPercent, type Lang } from './format';

export type RangFeld = 'verdikt' | 'top' | 'ueber' | 'ueberM1';
const HOCH = ['ueberMHW', 'ueberM1', 'ueberM2', 'ueberHHW'];
export function rangText(f: RangFeld, vals: Array<{ s: St; v: number }>, lang: Lang): string | null {
  const en = lang === 'en';
  const ueber = vals.filter((x) => HOCH.includes(lage(x.v, x.s))).length;
  const ranked = vals.map((x) => ({ ...x, a: anteil(x.v, x.s) })).filter((x) => x.a !== null).sort((a, b) => b.a! - a.a!);
  const top = ranked[0];
  const n = (x: number) => formatNumber(x, 0, lang);
  switch (f) {
    case 'verdikt': return ueber === 0
      ? (en ? 'No flood at the moment: no gauge is above its mean high water, the level of a typical yearly flood.' : 'Derzeit kein Hochwasser: Kein Pegel liegt über seinem mittleren Hochwasser, dem Stand eines typischen Jahreshochwassers.')
      : (en ? `${n(ueber)} ${ueber === 1 ? 'gauge is' : 'gauges are'} above mean high water, the level of a typical yearly flood.` : `${n(ueber)} ${ueber === 1 ? 'Pegel liegt' : 'Pegel liegen'} über dem mittleren Hochwasser, dem Stand eines typischen Jahreshochwassers.`);
    case 'top': return top ? (en ? `${top.s.n} at ${n(top.v)} cm (${formatPercent(top.a!, 0, lang)} of the way from typical low to typical flood)` : `${top.s.n} mit ${n(top.v)} cm (${formatPercent(top.a!, 0, lang)} des Wegs vom typischen Tief zum typischen Hochwasser)`) : null;
    case 'ueber': return n(ueber);
    case 'ueberM1': return n(vals.filter((x) => x.s.m1 !== undefined && x.v > x.s.m1).length);
  }
}
/** Le <span> écrit au build. */
export const rangSpan = (f: RangFeld, vals: Array<{ s: St; v: number }>, lang: Lang) => `<span data-rang="${f}">${rangText(f, vals, lang) ?? ''}</span>`;
