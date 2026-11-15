/** Lecture directe de PEGELONLINE depuis le navigateur (CORS ouvert : Access-Control-Allow-Origin *). */
export const API = 'https://www.pegelonline.wsv.de/webservices/rest-api/v2';
export interface Live { v: number; t: string; p: number | null; pt: string | null }

/** Dernier wert et wert d'il y a 24 h d'une station. */
export async function liveStation(uuid: string, signal?: AbortSignal): Promise<Live | null> {
  const r = await fetch(`${API}/stations/${uuid}/W/measurements.json?start=P1D`, { signal });
  if (!r.ok) return null;
  const m = (await r.json()) as Array<{ timestamp: string; value: number }>;
  if (!m.length) return null;
  const last = m[m.length - 1];
  const lim = Date.parse(last.timestamp) - 24 * 3600e3;
  const first = m.find((x) => Date.parse(x.timestamp) >= lim) ?? m[0];
  const ok = Date.parse(last.timestamp) - Date.parse(first.timestamp) >= 23 * 3600e3;
  return { v: last.value, t: last.timestamp, p: ok ? first.value : null, pt: ok ? first.timestamp : null };
}

/** Werte actuels de toutes les stations de plusieurs cours d'eau, en une requête. */
export async function liveWaters(waters: string[], signal?: AbortSignal): Promise<Record<string, { v: number; t: string; s: string }>> {
  const r = await fetch(`${API}/stations.json?waters=${waters.join(',')}&timeseries=W&includeTimeseries=true&includeCurrentMeasurement=true`, { signal });
  if (!r.ok) return {};
  const list = (await r.json()) as Array<{ uuid: string; timeseries?: Array<{ shortname: string; currentMeasurement?: { timestamp: string; value: number; stateMnwMhw: string } }> }>;
  const out: Record<string, { v: number; t: string; s: string }> = {};
  for (const s of list) {
    const c = s.timeseries?.find((t) => t.shortname === 'W')?.currentMeasurement;
    if (c) out[s.uuid] = { v: c.value, t: c.timestamp, s: c.stateMnwMhw };
  }
  return out;
}

/** Série de 30 jours ramenée à des moyennes de 2 h, comme la momentaufnahme du build. */
export async function liveSerie(uuid: string, signal?: AbortSignal): Promise<Array<[number, number]> | null> {
  const r = await fetch(`${API}/stations/${uuid}/W/measurements.json?start=P30D`, { signal });
  if (!r.ok) return null;
  const m = (await r.json()) as Array<{ timestamp: string; value: number }>;
  const b = new Map<number, [number, number]>();
  for (const p of m) { const k = Math.floor(Date.parse(p.timestamp) / 7.2e6) * 7.2e6; const a = b.get(k) ?? [0, 0]; a[0] += p.value; a[1]++; b.set(k, a); }
  return [...b.entries()].sort((x, y) => x[0] - y[0]).map(([k, [s, n]]) => [k / 1000, Math.round(s / n)]);
}

/** Heure et date en heure allemande, identiques au build et dans le navigateur (fuseau fixé). */
export function quand(iso: string, lang: string): string {
  const d = new Date(iso);
  const tag = lang === 'en' ? 'en-GB' : 'de-DE';
  const h = d.toLocaleTimeString(tag, { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Berlin' });
  const j = d.toLocaleDateString(tag, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Berlin' });
  return lang === 'en' ? `${h} on ${j}` : `${j}, ${h} Uhr`;
}

/**
 * Une seule valeur par station sur toute la page (testeurs naïfs du 2026-11-14) : chaque lecture live
 * (outil, tableau, rangliste, courbe) passe par ce magasin partagé ; le chapeau, les textes, la tendance
 * et les calculateurs lisent la même entrée. La plus récente gagne ; la valeur d'il y a 24 h suit.
 */
export interface Rec { v: number; t: string; p: number | null }
type Store = { data: Record<string, Rec>; pending: Record<string, Promise<Rec | null>>; subs: Set<() => void>; serie: Record<string, { lo: number; hi: number }>; ver: number };
const G = globalThis as unknown as { __pegelLive?: Store };
const store = (): Store => (G.__pegelLive ??= { data: {}, pending: {}, subs: new Set(), serie: {}, ver: 0 });

export const getLive = (u: string): Rec | undefined => store().data[u];
export const getSerie = (u: string) => store().serie[u];
const notify = () => { store().ver++; for (const f of [...store().subs]) f(); };
/** Enregistre une lecture ; garde la plus récente. Une lecture sans valeur 24 h garde celle déjà connue. */
export function putLive(u: string, x: { v: number; t: string; p?: number | null }) {
  const S = store();
  const old = S.data[u];
  if (old && Date.parse(old.t) > Date.parse(x.t)) { if (old.p === null && x.p != null) { old.p = x.p; notify(); } return; }
  if (old && old.t === x.t && old.v === x.v && (x.p === undefined || x.p === old.p)) return;
  S.data[u] = { v: x.v, t: x.t, p: x.p !== undefined ? x.p : old?.p ?? null };
  notify();
}
export function putMany(m: Record<string, { v: number; t: string }>) {
  const S = store();
  let ch = false;
  for (const [u, x] of Object.entries(m)) {
    const old = S.data[u];
    if (old && Date.parse(old.t) >= Date.parse(x.t)) continue;
    S.data[u] = { v: x.v, t: x.t, p: old?.p ?? null }; ch = true;
  }
  if (ch) notify();
}
export function putSerie(u: string, lo: number, hi: number) { store().serie[u] = { lo, hi }; notify(); }
/** Numéro de version du magasin (useSyncExternalStore). */
export const liveVersion = () => store().ver;
export function subscribe(f: () => void) { store().subs.add(f); return () => { store().subs.delete(f); }; }
/** Série de 30 jours d'une station, une seule requête par page : la courbe et la plage citée dans le texte
 *  (champs `lo`/`hi`) la partagent. Lancée par live-dom dès le chargement, pas seulement quand la courbe
 *  devient visible : sinon le texte au-dessus de la courbe gardait la plage du build (e2e, 2026-11-14). */
const series: Record<string, Promise<Array<[number, number]> | null>> = {};
export function ensureSerie(u: string): Promise<Array<[number, number]> | null> {
  return (series[u] ??= liveSerie(u).then((x) => {
    if (!x || x.length <= 10) return null;
    const v = x.map((p) => p[1]);
    putSerie(u, Math.min(...v), Math.max(...v));
    return x;
  }).catch(() => null));
}
/** Lecture live d'une station, une seule requête par station et par page. */
export function ensureLive(u: string): Promise<Rec | null> {
  const S = store();
  return (S.pending[u] ??= liveStation(u).then((x) => { if (x) putLive(u, x); return getLive(u) ?? null; }).catch(() => null));
}
/** Toutes les stations des six fleuves en une requête (une seule par page). */
export const ALL_WATERS = ['RHEIN', 'ELBE', 'DONAU', 'MAIN', 'MOSEL', 'WESER'];
let allPending: Promise<void> | undefined;
export function ensureAll(): Promise<void> {
  return (allPending ??= liveWaters(ALL_WATERS).then((m) => putMany(m)).catch(() => {}));
}
