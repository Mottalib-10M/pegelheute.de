/**
 * Une valeur de station dans le texte (testeurs naïfs du 2026-11-14) : le build écrit la momentaufnahme dans un
 * <span data-lv="uuid" data-f="…">, et le navigateur remplace ce texte par la lecture live dès qu'elle arrive
 * (src/lib/live-dom.ts). Le même formateur sert aux deux : le chapeau, le tableau des Kennwerte, la boîte live et
 * les calculateurs ne peuvent donc pas afficher deux valeurs différentes pour la même station.
 */
import { formatNumber, type Lang } from './format';
import { delta24, lage, LAGE_TEXT, spiegel, tendenz, TENDENZ_TEXT, type Kenn } from './engine/pegel';
import { quand } from './live';

export type Feld = 'v' | 'm' | 'rinne' | 't' | 'd' | 'lage' | 'ab' | 'vs' | 'nhn' | 'lo' | 'hi';
export interface Lecture { v: number; t: string; p: number | null }
export interface Extra { ref?: number; tu?: number; k?: Kenn; pnp?: number; lo?: number; hi?: number }

const cm = (x: number, lang: Lang) => `${formatNumber(x, 0, lang)} cm`;
/** Texte d'un champ pour une lecture donnée ; null quand le champ ne dépend pas d'elle (lo, hi sans série). */
export function feldText(f: Feld, x: Lecture, lang: Lang, e: Extra = {}): string | null {
  const en = lang === 'en';
  switch (f) {
    case 'v': return cm(x.v, lang);
    case 'm': return `${formatNumber(x.v / 100, 2, lang)}\u00a0m`;
    /** Fahrrinnentiefe genähert : TuGLW + (Pegel − GlW), en m. */
    case 'rinne': return e.ref === undefined || e.tu === undefined ? null : `${formatNumber((e.tu + x.v - e.ref) / 100, 2, lang)}\u00a0m`;
    case 't': return quand(x.t, lang);
    case 'd': { const d = delta24(x.v, x.p); return d === null ? TENDENZ_TEXT.unbekannt[lang] : `${d > 0 ? '+' : d < 0 ? '−' : '±'}${cm(Math.abs(d), lang)} (${TENDENZ_TEXT[tendenz(d)][lang]})`; }
    case 'lage': return LAGE_TEXT[lage(x.v, e.k ?? {})][lang];
    /** Écart d'un repère au niveau : « 71 cm über dem aktuellen Stand » (le repère est au-dessus de l'eau). */
    case 'ab': { if (e.ref === undefined) return null; const a = e.ref - x.v; return a === 0 ? (en ? 'equal to the current level' : 'gleich dem aktuellen Stand') : `${cm(Math.abs(a), lang)} ${a > 0 ? (en ? 'above' : 'über') : (en ? 'below' : 'unter')} ${en ? 'the current level' : 'dem aktuellen Stand'}`; }
    /** Le niveau face à un repère : « 12 cm über », « 30 cm unter » (l'eau est au-dessus ou au-dessous). */
    case 'vs': { if (e.ref === undefined) return null; const a = x.v - e.ref; return `${cm(Math.abs(a), lang)} ${a >= 0 ? (en ? 'above' : 'über') : (en ? 'below' : 'unter')}`; }
    case 'nhn': return e.pnp === undefined ? null : `${formatNumber(spiegel(e.pnp, x.v), 2, lang)} m`;
    case 'lo': return e.lo === undefined ? null : cm(e.lo, lang);
    case 'hi': return e.hi === undefined ? null : cm(e.hi, lang);
  }
}

const attr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
/** Le <span> écrit au build, avec le texte de la momentaufnahme comme repli. */
export function liveSpan(u: string, f: Feld, x: Lecture, lang: Lang, e: Extra = {}): string {
  const extra = [e.ref !== undefined ? ` data-ref="${e.ref}"` : '', e.k ? ` data-k="${attr(JSON.stringify(e.k))}"` : '', e.pnp !== undefined ? ` data-pnp="${e.pnp}"` : '', e.tu !== undefined ? ` data-tu="${e.tu}"` : ''].join('');
  return `<span data-lv="${u}" data-f="${f}"${extra}>${feldText(f, x, lang, e) ?? ''}</span>`;
}
