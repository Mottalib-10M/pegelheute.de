/**
 * Données du build : momentaufnahme PEGELONLINE (src/data/pegel.json, scripts/fetch-pegel.mjs).
 * Côté serveur seulement : les îles React reçoivent des listes compactes (type St), jamais le fichier entier.
 */
import RAW from '../data/pegel.json';
import type { St } from './engine/pegel';

interface RawSt { uuid: string; number: string; name: string; water: string; km: number | null; agency: string; lat: number | null; lon: number | null;
  pnp: { v: number; unit: string; from: string } | null; cv: Record<string, number>; occ: Record<string, string[]>; span: Record<string, [string, string]>;
  cur: { t: string; v: number; mnwMhw: string; nswHsw: string }; prev?: { t: string; v: number } | null; min30?: number; max30?: number; n30?: number; from30?: string }
const D = RAW as unknown as { fetchedAt: string; stations: RawSt[]; series: Record<string, Array<[number, number]>> };
export const FETCHED_AT = D.fetchedAt;
export const RAW_STATIONS = D.stations;

export type RiverId = 'rhein' | 'elbe' | 'donau' | 'main' | 'mosel' | 'weser';
export const RIVERS: Array<{ id: RiverId; api: string; de: string; en: string; slug: { de: string; en: string } }> = [
  { id: 'rhein', api: 'RHEIN', de: 'Rhein', en: 'Rhine', slug: { de: 'rhein', en: 'rhine' } },
  { id: 'elbe', api: 'ELBE', de: 'Elbe', en: 'Elbe', slug: { de: 'elbe', en: 'elbe' } },
  { id: 'donau', api: 'DONAU', de: 'Donau', en: 'Danube', slug: { de: 'donau', en: 'danube' } },
  { id: 'main', api: 'MAIN', de: 'Main', en: 'Main', slug: { de: 'main', en: 'main' } },
  { id: 'mosel', api: 'MOSEL', de: 'Mosel', en: 'Moselle', slug: { de: 'mosel', en: 'moselle' } },
  { id: 'weser', api: 'WESER', de: 'Weser', en: 'Weser', slug: { de: 'weser', en: 'weser' } },
];
export const riverById = (id: RiverId) => RIVERS.find((r) => r.id === id)!;
export const riverOfApi = (api: string) => RIVERS.find((r) => r.api === api)!;

/** Les douze stations qui ont leur page : celles que l'on cherche par leur nom (relevé KP du 2026-11-13). */
export const FEATURED: Array<{ id: string; api: string; river: RiverId; de: string; en: string; slug: { de: string; en: string } }> = [
  { id: 'maxau', api: 'MAXAU', river: 'rhein', de: 'Maxau', en: 'Maxau', slug: { de: 'maxau', en: 'maxau' } },
  { id: 'mainz', api: 'MAINZ', river: 'rhein', de: 'Mainz', en: 'Mainz', slug: { de: 'mainz', en: 'mainz' } },
  { id: 'kaub', api: 'KAUB', river: 'rhein', de: 'Kaub', en: 'Kaub', slug: { de: 'kaub', en: 'kaub' } },
  { id: 'koblenz', api: 'KOBLENZ', river: 'rhein', de: 'Koblenz', en: 'Koblenz', slug: { de: 'koblenz', en: 'koblenz' } },
  { id: 'bonn', api: 'BONN', river: 'rhein', de: 'Bonn', en: 'Bonn', slug: { de: 'bonn', en: 'bonn' } },
  { id: 'koeln', api: 'KÖLN', river: 'rhein', de: 'Köln', en: 'Cologne', slug: { de: 'koeln', en: 'cologne' } },
  { id: 'duesseldorf', api: 'DÜSSELDORF', river: 'rhein', de: 'Düsseldorf', en: 'Düsseldorf', slug: { de: 'duesseldorf', en: 'duesseldorf' } },
  { id: 'emmerich', api: 'EMMERICH', river: 'rhein', de: 'Emmerich', en: 'Emmerich', slug: { de: 'emmerich', en: 'emmerich' } },
  { id: 'dresden', api: 'DRESDEN', river: 'elbe', de: 'Dresden', en: 'Dresden', slug: { de: 'dresden', en: 'dresden' } },
  { id: 'magdeburg', api: 'MAGDEBURG-STROMBRÜCKE', river: 'elbe', de: 'Magdeburg', en: 'Magdeburg', slug: { de: 'magdeburg', en: 'magdeburg' } },
  { id: 'passau', api: 'PASSAU DONAU', river: 'donau', de: 'Passau', en: 'Passau', slug: { de: 'passau', en: 'passau' } },
  { id: 'wuerzburg', api: 'WÜRZBURG', river: 'main', de: 'Würzburg', en: 'Würzburg', slug: { de: 'wuerzburg', en: 'wuerzburg' } },
];
export const featuredById = (id: string) => FEATURED.find((f) => f.id === id)!;

const KEEP_UPPER = new Set(['UP', 'OP', 'AMS', 'SKA', 'BHV', 'OW', 'UW', 'AP', 'II', 'I']);
/** « MAGDEBURG-STROMBRÜCKE » → « Magdeburg-Strombrücke » ; les sigles (UP, OP, AMS…) restent en capitales. */
const NOMS: Record<string, string> = { 'MAGDEBURG-STROMBRÜCKE': 'Magdeburg-Strombrücke', 'PASSAU DONAU': 'Passau Donau', 'HANN.MUENDEN': 'Hann. Münden', 'BHV ALTER LEUCHTTURM': 'Bremerhaven Alter Leuchtturm', 'GROSSE WESERBRÜCKE': 'Bremen Große Weserbrücke' };
export function nom(raw: string): string {
  if (NOMS[raw]) return NOMS[raw];
  const f = FEATURED.find((x) => x.api === raw);
  if (f) return f.de;
  return raw.split(/(\s+|-)/).map((w) => (KEEP_UPPER.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())).join('');
}

/** Pegel im Oberwasser einer Staustufe (« … OW », « … OP ») : leur niveau suit la consigne du barrage, pas le débit.
 *  Leurs MNW/MW/MHW ne servent donc ni à l'einordnung ni au classement (Weserwehr OW : MNW 440, MHW 487). */
const OBERWASSER = /\s(OW|OP)$/;
export function compact(s: RawSt): St {
  const c = OBERWASSER.test(s.name) ? { ...s.cv, MNW: undefined, MW: undefined, MHW: undefined } as Record<string, number | undefined> : s.cv;
  return { u: s.uuid, n: nom(s.name), w: s.water, km: s.km, v: s.cur.v, t: s.cur.t, p: s.prev?.v ?? null, pnp: s.pnp?.v ?? null, pu: s.pnp?.unit ?? '', s: s.cur.mnwMhw,
    mw: c.MW, mnw: c.MNW, mhw: c.MHW, hhw: c.HHW, nnw: c.NNW, hsw: c.HSW, m1: c.M_I, m2: c.M_II, glw: c.GlW, tu: c.TuGLW, ...(s.occ.NNW?.[0] ? { nnwd: s.occ.NNW[0] } : {}) };
}
export const byKm = (a: { km: number | null }, b: { km: number | null }) => (a.km ?? 1e9) - (b.km ?? 1e9);
/** Ordre d'écoulement (amont → aval) : Donau et Mosel comptent les km depuis l'embouchure ; la Weser a deux comptages
 *  (Ober-/Mittelweser depuis Hann. Münden, Unterweser à marée depuis Bremen), la partie à marée vient après. */
const flussPos = (r: RiverId, s: RawSt) => {
  const km = s.km ?? 1e6;
  if (r === 'donau' || r === 'mosel') return -km;
  if (r === 'weser' && s.cv.MThw !== undefined) return 1e4 + (km > 300 ? -1 : km); // Weserwehr UW (km de la Mittelweser) précède Bremen
  return km;
};
export const stationsOf = (r: RiverId) => RAW_STATIONS.filter((s) => s.water === riverById(r).api).sort((a, b) => flussPos(r, a) - flussPos(r, b));
export const compactOf = (r: RiverId) => stationsOf(r).map(compact);
export const allCompact = () => RIVERS.flatMap((r) => compactOf(r.id));
export const raw = (api: string) => { const s = RAW_STATIONS.find((x) => x.name === api); if (!s) throw new Error('station ' + api); return s; };
export const series = (uuid: string) => D.series[uuid] ?? [];
