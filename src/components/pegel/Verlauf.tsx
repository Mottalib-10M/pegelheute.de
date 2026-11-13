/** Courbe des 30 derniers jours (moyennes de 2 h) avec les repères de la station ; relue en direct après le montage. */
import { useEffect, useState } from 'react';
import { formatNumber, type Lang } from '../../lib/format';
import { liveSerie, quand } from '../../lib/live';
import type { Kenn } from '../../lib/engine/pegel';

interface Props { lang: Lang; uuid: string; serie: Array<[number, number]>; kenn: Kenn; name: string }
const W = 640, H = 240, PL = 44, PR = 8, PT = 10, PB = 26;

export default function Verlauf({ lang, uuid, serie, kenn, name }: Props) {
  const [s, setS] = useState(serie);
  const [live, setLive] = useState(false);
  useEffect(() => {
    const ctl = new AbortController();
    liveSerie(uuid, ctl.signal).then((x) => { if (x && x.length > 10) { setS(x); setLive(true); } }).catch(() => {});
    return () => ctl.abort();
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
  const cap = lang === 'en'
    ? `${name}: last 30 days, 2-hour means. Lowest mean ${n(lo)} cm, highest ${n(hi)} cm. ${live ? 'Read live from PEGELONLINE.' : 'Snapshot taken when the page was built.'} Latest point: ${quand(new Date(t1 * 1000).toISOString(), lang)}.`
    : `${name}: letzte 30 Tage, 2-Stunden-Mittel. Tiefstes Mittel ${n(lo)} cm, höchstes ${n(hi)} cm. ${live ? 'Live von PEGELONLINE gelesen.' : 'Momentaufnahme beim Erstellen der Seite.'} Letzter Punkt: ${quand(new Date(t1 * 1000).toISOString(), lang)}.`;
  return (
    <figure data-chrome className="not-prose my-6 rounded-xl border border-navy-200 bg-white p-3">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={cap}>
        {refs.map(([k, v]) => <g key={k}><line x1={PL} x2={W - PR} y1={Y(v)} y2={Y(v)} stroke="#94a3b8" strokeDasharray="4 4" /><text x={W - PR - 2} y={Y(v) - 3} fontSize="11" textAnchor="end" fill="#475569">{k} {n(v)}</text></g>)}
        {[ymin, (ymin + ymax) / 2, ymax].map((v) => <text key={v} x={PL - 6} y={Y(v) + 4} fontSize="11" textAnchor="end" fill="#475569">{n(Math.round(v))}</text>)}
        <path d={d} fill="none" stroke="#0E5A8A" strokeWidth="2" />
        <text x={PL} y={H - 6} fontSize="11" fill="#475569">−30 {lang === 'en' ? 'days' : 'Tage'}</text>
        <text x={W - PR} y={H - 6} fontSize="11" textAnchor="end" fill="#475569">{lang === 'en' ? 'now' : 'jetzt'}</text>
      </svg>
      <figcaption className="mt-2 text-xs text-navy-600">{cap}</figcaption>
    </figure>
  );
}
