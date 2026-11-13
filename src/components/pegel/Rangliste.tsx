/** Classement des pegels par leur place entre MNW (0 %) et MHW (100 %) : où l'eau est haute, où elle est basse, en direct. */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import { formatNumber, formatPercent, type Lang } from '../../lib/format';
import { liveWaters, quand } from '../../lib/live';
import { anteil, lage, LAGE_TEXT, type St } from '../../lib/engine/pegel';

interface Props { lang: Lang; stations: St[]; rivers: Record<string, string>; idPrefix?: string; initialOrder?: 'hoch' | 'tief' }

export default function Rangliste({ lang, stations, rivers, idPrefix = 'rl', initialOrder = 'hoch' }: Props) {
  const en = lang === 'en';
  const [fluss, setFluss] = useState('alle');
  const [ordre, setOrdre] = useState<string>(initialOrder);
  const [live, setLive] = useState<Record<string, { v: number; t: string; s: string }>>({});
  useEffect(() => {
    const ctl = new AbortController();
    liveWaters(Object.keys(rivers), ctl.signal).then(setLive).catch(() => {});
    return () => ctl.abort();
  }, []);
  const rows = useMemo(() => stations
    .filter((s) => fluss === 'alle' || s.w === fluss)
    .map((s) => { const v = live[s.u]?.v ?? s.v; return { s, v, t: live[s.u]?.t ?? s.t, a: anteil(v, s) }; })
    .filter((r) => r.a !== null)
    .sort((a, b) => (ordre === 'hoch' ? b.a! - a.a! : a.a! - b.a!))
    .slice(0, 12), [stations, fluss, ordre, live]);
  const n = Object.keys(live).length;
  const opts = [{ value: 'alle', label: en ? 'All six rivers' : 'Alle sechs Flüsse' }, ...Object.entries(rivers).map(([k, v]) => ({ value: k, label: v }))];
  const ord = [{ value: 'hoch', label: en ? 'Highest first (closest to MHW)' : 'Höchste zuerst (nahe MHW)' }, { value: 'tief', label: en ? 'Lowest first (closest to MNW)' : 'Niedrigste zuerst (nahe MNW)' }];
  const H = en ? ['#', 'Gauge', 'River', 'Level', 'Between MNW and MHW', 'Where it stands'] : ['#', 'Pegel', 'Fluss', 'Stand', 'Zwischen MNW und MHW', 'Einordnung'];
  const top = rows[0];
  return (
    <div className="not-prose rounded-xl border border-accent-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
          <SelectField id={`${idPrefix}-fluss`} label={en ? 'River' : 'Fluss'} value={fluss} onChange={setFluss} options={opts} />
          <SelectField id={`${idPrefix}-ordre`} label={en ? 'Order' : 'Reihenfolge'} value={ordre} onChange={setOrdre} options={ord} />
        </form>
        <div data-resultat aria-live="polite" className="rounded-lg bg-navy-50 p-4">
          {top && <>
            <p className="text-sm font-medium text-navy-600">{ordre === 'hoch' ? (en ? 'Highest relative level' : 'Relativ höchster Stand') : (en ? 'Lowest relative level' : 'Relativ niedrigster Stand')}</p>
            <p className="tabular-nums mt-1 text-3xl font-bold text-navy-900">{top.s.n}: {formatNumber(top.v, 0, lang)} cm</p>
            <p className="mt-1 text-sm text-navy-700">{formatPercent(top.a!, 0, lang)} {en ? 'of the way from MNW to MHW' : 'des Wegs von MNW zu MHW'} · {LAGE_TEXT[lage(top.v, top.s)][lang]}</p>
            <p className="mt-1 text-xs text-navy-600">{quand(top.t, lang)} · {n ? (en ? 'live from PEGELONLINE' : 'live von PEGELONLINE') : (en ? 'snapshot taken when the page was built' : 'Momentaufnahme beim Erstellen der Seite')}</p>
          </>}
        </div>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="journal empile w-full text-sm">
          <thead><tr>{H.map((h) => <th key={h} scope="col" className="px-3 py-2 text-left font-semibold text-navy-900">{h}</th>)}</tr></thead>
          <tbody>{rows.map((r, i) => {
            const cells = [String(i + 1), r.s.n, rivers[r.s.w] ?? r.s.w, `${formatNumber(r.v, 0, lang)} cm`, formatPercent(r.a!, 0, lang), LAGE_TEXT[lage(r.v, r.s)][lang]];
            return <tr key={r.s.u}>{cells.map((c, j) => <td key={j} data-label={H[j]} className="tabular-nums border-b border-navy-100 px-3 py-2 text-navy-800">{c}</td>)}</tr>;
          })}</tbody>
        </table>
      </div>
    </div>
  );
}
