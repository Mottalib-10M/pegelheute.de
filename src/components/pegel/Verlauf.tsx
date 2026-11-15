/** Courbe des 30 derniers jours (moyennes de 2 h) avec les repères de la station ; relue en direct après le montage. */
import { useEffect, useState } from 'react';
import { formatNumber, type Lang } from '../../lib/format';
import { ensureSerie, quand } from '../../lib/live';
import { useLiveReader } from '../../lib/use-live';
import type { Kenn } from '../../lib/engine/pegel';

interface Props { lang: Lang; uuid: string; serie: Array<[number, number]>; kenn: Kenn; name: string }
// Testeurs naïfs du 2026-11-14 : sur téléphone, les chiffres de 11 unités sur 640 tombaient à 6 px. Repère plus
// étroit, police de 14 : ≈ 12 px à 360 px de large ; étiquettes à gauche, détourées de blanc, jamais coupées.
const W = 400, H = 240, PL = 40, PR = 6, PT = 10, PB = 24, FS = 14;

export default function Verlauf({ lang, uuid, serie, kenn, name }: Props) {
  const [s0, setS] = useState(serie);
  // Le dernier point suit la lecture live de la page (même valeur et même heure que la boîte live), même avant
  // que la série de 30 jours ne soit relue.
  const lire = useLiveReader();
  const lv = lire(uuid);
  const ajout = !!lv && s0.length > 0 && Date.parse(lv.t) / 1000 > s0[s0.length - 1][0];
  const s: Array<[number, number]> = ajout ? [...s0, [Date.parse(lv!.t) / 1000, lv!.v]] : s0;
  const [live, setLive] = useState(false);
  useEffect(() => {
    let stop = false;
    ensureSerie(uuid).then((x) => { if (x && !stop) { setS(x); setLive(true); } });
    return () => { stop = true; };
  }, [uuid]);
  if (s.length < 2) return null;
  const vals = s.map((x) => x[1]);
  const lo = Math.min(...vals), hi = Math.max(...vals);
  // Repères affichés : ceux qui tombent près de la plage des 30 jours (sinon la courbe deviendrait plate).
  const refs = ([['MNW', kenn.mnw], ['MW', kenn.mw], ['GlW', kenn.glw], ['MHW', kenn.mhw], ['M I', kenn.m1]] as Array<[string, number | undefined]>)
    .filter((r): r is [string, number] => r[1] !== undefined && r[1] >= lo - (hi - lo + 40) && r[1] <= hi + (hi - lo + 40));
  const ymin = Math.min(lo, ...refs.map((r) => r[1])) - 5, ymax = Math.max(hi, ...refs.map((r) => r[1])) + 5;
  const t0 = s[0][0], t1 = s[s.length - 1][0];
  const X = (t: number) => PL + ((t - t0) / Math.max(1, t1 - t0)) * (W - PL - PR);
  const Y = (v: number) => PT + (1 - (v - ymin) / Math.max(1, ymax - ymin)) * (H - PT - PB);
  const d = s.map(([t, v], i) => `${i ? 'L' : 'M'}${X(t).toFixed(1)},${Y(v).toFixed(1)}`).join('');
  const n = (x: number) => formatNumber(x, 0, lang);
  const unterNnw = kenn.nnw !== undefined && lo < kenn.nnw;
  const cap = lang === 'en'
    ? `${name}: last 30 days, 2-hour means. Lowest mean ${n(lo)} cm, highest ${n(hi)} cm. ${unterNnw ? `The lowest mean is below the lowest level on record (NNW, ${n(kenn.nnw!)} cm): these are unchecked raw data, and the official record is only updated after review. ` : ''}${live ? 'Read live from PEGELONLINE.' : ajout ? 'Curve as of when the page was built, latest point read live from PEGELONLINE.' : 'Values when the page was built.'} Latest point: ${quand(new Date(t1 * 1000).toISOString(), lang)}.`
    : `${name}: letzte 30 Tage, 2-Stunden-Mittel. Tiefstes Mittel ${n(lo)} cm, höchstes ${n(hi)} cm. ${unterNnw ? `Das tiefste Mittel liegt unter dem niedrigsten bekannten Stand (NNW, ${n(kenn.nnw!)} cm): Es sind ungeprüfte Rohdaten, der amtliche Rekord wird erst nach Prüfung fortgeschrieben. ` : ''}${live ? 'Live von PEGELONLINE gelesen.' : ajout ? 'Kurve vom Erstellen der Seite, letzter Punkt live von PEGELONLINE.' : 'Stand beim Erstellen der Seite.'} Letzter Punkt: ${quand(new Date(t1 * 1000).toISOString(), lang)}.`;
  return (
    <figure data-chrome className="not-prose my-6 rounded-xl border border-navy-200 bg-white p-3">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={cap}>
        {refs.map(([k, v]) => <line key={k} x1={PL} x2={W - PR} y1={Y(v)} y2={Y(v)} stroke="#94a3b8" strokeDasharray="4 4" />)}
        {[ymin, (ymin + ymax) / 2, ymax].map((v) => <text key={v} x={PL - 4} y={Y(v) + 5} fontSize={FS} textAnchor="end" fill="#334155">{n(Math.round(v))}</text>)}
        <path d={d} fill="none" stroke="#0E5A8A" strokeWidth="2" />
        {refs.map(([k, v]) => <text key={k} x={PL + 4} y={Y(v) - 4} fontSize={FS} fontWeight="600" fill="#334155" stroke="#fff" strokeWidth="4" paintOrder="stroke">{k} {n(v)}</text>)}
        <text x={PL} y={H - 4} fontSize={FS} fill="#334155">−30 {lang === 'en' ? 'days' : 'Tage'}</text>
        <text x={W - PR} y={H - 4} fontSize={FS} textAnchor="end" fill="#334155">{lang === 'en' ? 'now' : 'jetzt'}</text>
      </svg>
      <figcaption className="mt-2 text-xs text-navy-600">{cap}</figcaption>
    </figure>
  );
}
