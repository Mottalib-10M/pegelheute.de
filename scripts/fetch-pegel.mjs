#!/usr/bin/env node
/**
 * Momentaufnahme PEGELONLINE (WSV, Lizenz DL-DE->Zero-2.0) für den Build : src/data/pegel.json.
 * Rejouable : `node scripts/fetch-pegel.mjs`. Keine Rohdatei wird aufbewahrt, nur das Aggregat.
 *  - Stammdaten, aktueller Wert und Kennwerte aller Pegel mit Wasserstand (W) an Rhein, Elbe, Donau, Main, Mosel, Weser
 *  - Wert vor 24 Stunden je Pegel (Tendenz)
 *  - 30-Tage-Verlauf (2-Stunden-Mittel) der zwölf Stationen mit eigener Seite
 * Die Seite fragt im Browser die aktuellen Werte erneut bei PEGELONLINE ab ; diese Datei ist nur der erste Stand.
 */
import { writeFileSync } from 'node:fs';
const API = 'https://www.pegelonline.wsv.de/webservices/rest-api/v2';
const WATERS = ['RHEIN', 'ELBE', 'DONAU', 'MAIN', 'MOSEL', 'WESER'];
export const FEATURED = ['KÖLN', 'KAUB', 'MAXAU', 'DÜSSELDORF', 'KOBLENZ', 'MAINZ', 'BONN', 'EMMERICH', 'DRESDEN', 'MAGDEBURG-STROMBRÜCKE', 'PASSAU DONAU', 'WÜRZBURG'];
const get = async (u) => { for (let i = 0; i < 4; i++) { try { const r = await fetch(u); if (r.ok) return r.json(); } catch {} await new Promise((s) => setTimeout(s, 1500)); } throw new Error('fetch ' + u); };
const enc = encodeURIComponent;
const list = await get(`${API}/stations.json?waters=${WATERS.join(',')}&includeTimeseries=true&includeCurrentMeasurement=true&includeCharacteristicValues=true`);
const stations = [];
for (const s of list) {
  const W = (s.timeseries || []).find((t) => t.shortname === 'W');
  if (!W || !W.currentMeasurement) continue;
  const cv = {}; const occ = {}; const span = {};
  for (const c of W.characteristicValues || []) {
    cv[c.shortname] = c.value;
    if (c.occurrences?.length) occ[c.shortname] = c.occurrences;
    if (c.timespanStart) span[c.shortname] = [c.timespanStart, c.timespanEnd];
  }
  stations.push({ uuid: s.uuid, number: s.number, name: s.shortname, water: s.water.shortname, km: s.km ?? null, agency: s.agency, lat: s.latitude ?? null, lon: s.longitude ?? null,
    pnp: W.gaugeZero ? { v: W.gaugeZero.value, unit: W.gaugeZero.unit, from: W.gaugeZero.validFrom } : null,
    cv, occ, span, cur: { t: W.currentMeasurement.timestamp, v: W.currentMeasurement.value, mnwMhw: W.currentMeasurement.stateMnwMhw, nswHsw: W.currentMeasurement.stateNswHsw } });
}
// Wert vor 24 h
let i = 0;
async function worker() {
  while (i < stations.length) {
    const s = stations[i++];
    try {
      const m = await get(`${API}/stations/${s.uuid}/W/measurements.json?start=P1D`);
      if (m.length) { s.prev = { t: m[0].timestamp, v: m[0].value }; }
    } catch { s.prev = null; }
  }
}
await Promise.all(Array.from({ length: 6 }, worker));
// 30 Tage, 2-Stunden-Mittel, für die zwölf Stationen
const series = {};
for (const name of FEATURED) {
  const s = stations.find((x) => x.name === name);
  if (!s) throw new Error('station manquante ' + name);
  const m = await get(`${API}/stations/${s.uuid}/W/measurements.json?start=P30D`);
  const b = new Map();
  for (const p of m) { const k = Math.floor(Date.parse(p.timestamp) / 7.2e6) * 7.2e6; const a = b.get(k) ?? [0, 0]; a[0] += p.value; a[1]++; b.set(k, a); }
  series[s.uuid] = [...b.entries()].sort((x, y) => x[0] - y[0]).map(([k, [sum, n]]) => [k / 1000, Math.round(sum / n)]);
  s.min30 = Math.min(...m.map((p) => p.value)); s.max30 = Math.max(...m.map((p) => p.value)); s.n30 = m.length; s.from30 = m[0]?.timestamp;
}
const out = { source: 'PEGELONLINE REST-API v2, Wasserstraßen- und Schifffahrtsverwaltung des Bundes (WSV), Lizenz DL-DE->Zero-2.0', fetchedAt: new Date().toISOString(), waters: WATERS, stations, series };
writeFileSync(new URL('../src/data/pegel.json', import.meta.url), JSON.stringify(out));
// Petit extrait pour les mini-calculs des guides (bundle navigateur) : stations du Rhin à repères + stations à page.
const keep = stations.filter((s) => FEATURED.includes(s.name) || (s.water === 'RHEIN' && (s.cv.M_I !== undefined || s.cv.GlW !== undefined)));
const mini = keep.map((s) => ({ name: s.name, w: s.water, km: s.km, v: s.cur.v, pnp: s.pnp?.v ?? null, pu: s.pnp?.unit ?? '', glw: s.cv.GlW ?? null, tu: s.cv.TuGLW ?? null, m1: s.cv.M_I ?? null, m2: s.cv.M_II ?? null }));
writeFileSync(new URL('../src/data/mini.json', import.meta.url), JSON.stringify({ fetchedAt: out.fetchedAt, stations: mini }));
console.log(`${stations.length} Pegel, ${stations.filter((s) => s.prev).length} mit Wert vor 24 h, ${Object.keys(series).length} Verläufe`);
