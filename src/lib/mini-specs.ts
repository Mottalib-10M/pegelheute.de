/** Mini-simulateurs des guides (RECETTE §9.3) : chacun appelle le moteur (engine/pegel.ts), jamais un second calcul.
 *  Données : src/data/mini.json, extrait de la momentaufnahme PEGELONLINE (scripts/fetch-pegel.mjs). */
import type { MiniSpec } from './mini-types';
import M from '../data/mini.json';
import { abstand, fahrrinne, schifffahrt, spiegel, stundenBis } from './engine/pegel';
import { formatNumber } from './format';

type Mi = { name: string; w: string; km: number; v: number; pnp: number | null; pu: string; glw: number | null; tu: number | null; m1: number | null; m2: number | null };
const ST = (M as { stations: Mi[] }).stations;
const NOMS: Record<string, string> = { KÖLN: 'Köln', DÜSSELDORF: 'Düsseldorf', WÜRZBURG: 'Würzburg', 'MAGDEBURG-STROMBRÜCKE': 'Magdeburg-Strombrücke', 'PASSAU DONAU': 'Passau Donau', 'DUISBURG-RUHRORT': 'Duisburg-Ruhrort', 'Basel-Rheinhalle': 'Basel-Rheinhalle' };
const nm = (s: Mi) => NOMS[s.name] ?? s.name.charAt(0) + s.name.slice(1).toLowerCase();
const rk = (s: Mi, en: boolean) => `${nm(s)} (${en ? 'Rhine' : 'Rhein'} km ${formatNumber(s.km, s.km % 1 ? 1 : 0, en ? 'en' : 'de')})`;
const RHEIN_GLW = ST.filter((s) => s.w === 'RHEIN' && s.glw !== null && s.tu !== null).sort((a, b) => a.km - b.km);
const RHEIN_M = ST.filter((s) => s.w === 'RHEIN' && s.m1 !== null && s.name !== 'Basel-Rheinhalle').sort((a, b) => a.km - b.km);
const MIT_PNP = ST.filter((s) => s.pnp !== null && ['KÖLN', 'KAUB', 'MAXAU', 'DÜSSELDORF', 'KOBLENZ', 'MAINZ', 'BONN', 'EMMERICH', 'DRESDEN', 'MAGDEBURG-STROMBRÜCKE', 'PASSAU DONAU', 'WÜRZBURG'].includes(s.name));
const idx = (list: Mi[], name: string) => Math.max(0, list.findIndex((s) => s.name === name));
const cm = (x: number, en: boolean) => `${formatNumber(x, 0, en ? 'en' : 'de')} cm`;
const m2 = (x: number, en: boolean) => `${formatNumber(x, 2, en ? 'en' : 'de')} m`;

const SPECS: Record<string, (lang: string) => MiniSpec> = {
  /** Pegel → altitude du plan d'eau (pegel-lesen). */
  nhn: (lang) => {
    const en = lang === 'en';
    return {
      title: en ? 'Gauge reading → height of the water surface' : 'Pegelwert → Höhe des Wasserspiegels',
      cta: en ? 'Read the live value of your gauge' : 'Live-Wert Ihres Pegels ansehen',
      exemple: en ? 'Example for Cologne at the reading of the snapshot' : 'Beispiel für Köln mit dem Wert der Momentaufnahme',
      inputs: [
        { id: 'st', label: en ? 'Gauge' : 'Pegel', def: idx(MIT_PNP, 'KÖLN'), options: MIT_PNP.map((s, i) => ({ value: String(i), label: nm(s) })) },
        { id: 'w', label: en ? 'Reading' : 'Pegelwert', def: MIT_PNP[idx(MIT_PNP, 'KÖLN')]?.v ?? 100, unit: 'cm', max: 1500 },
      ],
      run: (v) => {
        const s = MIT_PNP[v.st] ?? MIT_PNP[0];
        const h = spiegel(s.pnp!, v.w);
        return { head: [en ? 'Water surface' : 'Wasserspiegel', `${m2(h, en)} ${en ? 'above sea level' : 'ü. NHN'}`],
          rows: [[en ? 'Gauge datum (PNP)' : 'Pegelnullpunkt (PNP)', `${formatNumber(s.pnp!, 3, en ? 'en' : 'de')} m`], [en ? 'Reading' : 'Pegelwert', cm(v.w, en)], [en ? 'Water depth' : 'Wassertiefe', en ? 'not readable from the gauge' : 'nicht am Pegel ablesbar']],
          note: en ? 'Water surface = gauge datum + reading ÷ 100. The datum is the zero of the staff, not the river bed.' : 'Wasserspiegel = Pegelnullpunkt + Pegelwert ÷ 100. Der Nullpunkt ist der Nullpunkt der Latte, nicht die Flusssohle.' };
      },
    };
  },
  /** Profondeur de chenal approchée sur le Rhin (niedrigwasser-rhein). */
  fahrrinne: (lang) => {
    const en = lang === 'en';
    const k = idx(RHEIN_GLW, 'KAUB');
    return {
      title: en ? 'Rhine fairway depth from the gauge reading' : 'Fahrrinnentiefe am Rhein aus dem Pegelwert',
      cta: en ? 'Kaub gauge live' : 'Pegel Kaub live',
      exemple: en ? 'Example for Kaub at the reading of the snapshot' : 'Beispiel für Kaub mit dem Wert der Momentaufnahme',
      inputs: [
        { id: 'st', label: en ? 'Gauge' : 'Pegel', def: k, options: RHEIN_GLW.map((s, i) => ({ value: String(i), label: rk(s, en) })) },
        { id: 'w', label: en ? 'Reading' : 'Pegelwert', def: RHEIN_GLW[k]?.v ?? 100, unit: 'cm', max: 1500 },
      ],
      run: (v) => {
        const s = RHEIN_GLW[v.st] ?? RHEIN_GLW[0];
        const f = fahrrinne(v.w, s.glw!, s.tu!);
        const d = v.w - s.glw!;
        return { head: [en ? 'Fairway depth, approximation' : 'Fahrrinnentiefe, Näherung', m2(f / 100, en)],
          alert: d < 0 ? (en ? `Below GlW by ${cm(-d, en)}: less than the target depth of the fairway` : `${cm(-d, en)} unter GlW: weniger als die Solltiefe der Fahrrinne`) : undefined,
          rows: [[en ? 'Target depth at GlW (TuGLW)' : 'Solltiefe bei GlW (TuGLW)', cm(s.tu!, en)], [en ? 'GlW of this gauge' : 'GlW dieses Pegels', cm(s.glw!, en)], [en ? 'Reading minus GlW' : 'Pegel minus GlW', `${d >= 0 ? '+' : '−'}${cm(Math.abs(d), en)}`]],
          note: en ? 'Simplification: assumes the water at the shallow spot moves like the gauge. Not for navigating a vessel: ELWIS is the reference.' : 'Vereinfachung: setzt voraus, dass sich der Wasserspiegel an der Engstelle wie am Pegel bewegt. Nicht für die Schiffsführung: maßgeblich ist ELWIS.' };
      },
    };
  },
  /** Distance aux marques de crue de la RheinSchPV (hochwassermarken). */
  marke: (lang) => {
    const en = lang === 'en';
    const k = idx(RHEIN_M, 'KÖLN');
    return {
      title: en ? 'How far to Rhine flood marks I and II?' : 'Wie weit bis Hochwassermarke I und II am Rhein?',
      cta: en ? 'Cologne gauge live' : 'Pegel Köln live',
      exemple: en ? 'Example for Cologne at the reading of the snapshot' : 'Beispiel für Köln mit dem Wert der Momentaufnahme',
      inputs: [
        { id: 'st', label: en ? 'Reference gauge' : 'Richtpegel', def: k, options: RHEIN_M.map((s, i) => ({ value: String(i), label: rk(s, en) })) },
        { id: 'w', label: en ? 'Reading' : 'Pegelwert', def: RHEIN_M[k]?.v ?? 100, unit: 'cm', max: 1500 },
      ],
      run: (v) => {
        const s = RHEIN_M[v.st] ?? RHEIN_M[0];
        const k2 = { m1: s.m1 ?? undefined, m2: s.m2 ?? undefined };
        const st = schifffahrt(v.w, k2);
        const a1 = abstand(v.w, k2.m1)!, a2 = abstand(v.w, k2.m2);
        const txt = { frei: en ? 'No high-water restriction' : 'Keine Hochwasserbeschränkung', eingeschraenkt: en ? 'Restricted (between mark I and II)' : 'Eingeschränkt (zwischen Marke I und II)', gesperrt: en ? 'Prohibited (mark II reached)' : 'Verboten (Marke II erreicht)', ohneMarken: '–' }[st];
        return { head: [en ? 'Shipping on this section' : 'Schifffahrt auf diesem Abschnitt', txt],
          rows: [[en ? 'Mark I' : 'Marke I', cm(s.m1!, en)], [en ? 'Distance to mark I' : 'Abstand zu Marke I', a1 > 0 ? cm(a1, en) : (en ? 'reached' : 'erreicht')], [en ? 'Mark II' : 'Marke II', s.m2 === null ? '–' : cm(s.m2, en)], [en ? 'Distance to mark II' : 'Abstand zu Marke II', a2 === null ? '–' : a2 > 0 ? cm(a2, en) : (en ? 'reached' : 'erreicht')]],
          note: en ? 'Marks and rules: RheinSchPV § 10.01, values as published by PEGELONLINE.' : 'Marken und Regeln: RheinSchPV § 10.01, Werte wie bei PEGELONLINE veröffentlicht.' };
      },
    };
  },
  /** Prolongement de la tendance jusqu'à un seuil (hochwasser-aktuell). */
  schwelle: (lang) => {
    const en = lang === 'en';
    return {
      title: en ? 'When would the water reach my level?' : 'Wann wäre mein Wert erreicht?',
      cta: en ? 'Check a gauge live' : 'Pegel live prüfen',
      exemple: en ? 'Example: 450 cm now, rising 60 cm a day, level of concern 620 cm' : 'Beispiel: jetzt 450 cm, 60 cm Anstieg pro Tag, kritischer Wert 620 cm',
      inputs: [
        { id: 'w', label: en ? 'Current reading' : 'Aktueller Pegelwert', def: 450, unit: 'cm', max: 1500 },
        { id: 'd', label: en ? 'Rise over the last 24 hours' : 'Anstieg in den letzten 24 Stunden', def: 60, unit: 'cm', max: 500 },
        { id: 's', label: en ? 'Your level of concern' : 'Ihr kritischer Wert', def: 620, unit: 'cm', max: 1500 },
      ],
      run: (v) => {
        const h = stundenBis(v.w, v.s, v.d);
        const rest = v.s - v.w;
        const head = rest <= 0 ? (en ? 'already reached' : 'bereits erreicht') : h === null ? (en ? 'not in sight' : 'nicht in Sicht') : `≈ ${formatNumber(Math.max(1, Math.round(h)), 0, en ? 'en' : 'de')} ${en ? 'hours' : 'Stunden'}`;
        return { head: [en ? 'At the same rise' : 'Bei gleichem Anstieg', head],
          rows: [[en ? 'Still to go' : 'Noch bis zum Wert', rest > 0 ? cm(rest, en) : '–'], [en ? 'Rise per hour' : 'Anstieg pro Stunde', `${formatNumber(v.d / 24, 1, en ? 'en' : 'de')} cm`]],
          alert: en ? 'A straight-line extension, not a forecast: crests flatten, and forecasts come from the state flood centres.' : 'Eine gerade Verlängerung, keine Vorhersage: Wellen flachen ab, Vorhersagen machen die Hochwasserzentralen.' };
      },
    };
  },
};

export function getSpec(kind: string, lang: string): MiniSpec {
  const f = SPECS[kind];
  if (!f) throw new Error(`mini-specs : aucun mini-simulateur « ${kind} » — à décrire dans src/lib/mini-specs.ts`);
  return f(lang);
}
