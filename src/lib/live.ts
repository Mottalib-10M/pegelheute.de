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
