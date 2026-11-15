/** Classement des pegels par leur place entre MNW (0 %) et MHW (100 %) : où l'eau est haute, où elle est basse, en direct. */
import { useEffect, useState } from 'react';
import SelectField from '../ui/SelectField';
import { formatNumber, formatPercent, type Lang } from '../../lib/format';
import { ensureAll, quand } from '../../lib/live';
import { useLiveReader } from '../../lib/use-live';
import { anteil, lage, LAGE_TEXT, type St } from '../../lib/engine/pegel';
import { rangText, type RangFeld } from '../../lib/rang';

interface Props { lang: Lang; stations: St[]; rivers: Record<string, string>; idPrefix?: string; initialOrder?: 'hoch' | 'tief' }

export default function Rangliste({ lang, stations, rivers, idPrefix = 'rl', initialOrder = 'hoch' }: Props) {
  const en = lang === 'en';
  const [fluss, setFluss] = useState('alle');
  const [ordre, setOrdre] = useState<string>(initialOrder);
  // Même magasin que les textes de la page : le chapeau de « Hochwasser aktuell » cite le même premier pegel.
  const lire = useLiveReader();
  useEffect(() => { ensureAll(); }, []);
  const rows = stations
    .filter((s) => fluss === 'alle' || s.w === fluss)
    .map((s) => { const x = lire(s.u); const v = x?.v ?? s.v; return { s, v, t: x?.t ?? s.t, a: anteil(v, s) }; })
    .filter((r) => r.a !== null)
    .sort((a, b) => (ordre === 'hoch' ? b.a! - a.a! : a.a! - b.a!))
    .slice(0, 12);
  const n = stations.filter((s) => lire(s.u)).length;
  // Le texte de la page (chapeau, résumé) suit la même lecture : premier pegel et nombre au-dessus du MHW.
  useEffect(() => {
    if (!n) return;
    const vals = stations.map((s) => ({ s, v: lire(s.u)?.v ?? s.v }));
    document.querySelectorAll<HTMLElement>('[data-rang]').forEach((el) => { const x = rangText(el.dataset.rang as RangFeld, vals, lang); if (x !== null) el.textContent = x; });
  });
  const opts = [{ value: 'alle', label: en ? 'All six rivers' : 'Alle sechs Flüsse' }, ...Object.entries(rivers).map(([k, v]) => ({ value: k, label: v }))];
  const ord = [{ value: 'hoch', label: en ? 'Highest first (closest to MHW)' : 'Höchste zuerst (nahe MHW)' }, { value: 'tief', label: en ? 'Lowest first (closest to MNW)' : 'Niedrigste zuerst (nahe MNW)' }];
  const H = en ? ['Rank', 'Gauge', 'River', 'Level', 'Between typical low (0%) and typical flood (100%)', 'Where it stands'] : ['Platz', 'Pegel', 'Fluss', 'Stand', 'Zwischen typischem Tief (0 %) und typischem Hochwasser (100 %)', 'Einordnung'];
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
            <p className="mt-1 text-sm text-navy-700">{formatPercent(top.a!, 0, lang)} {en ? 'of the way from the typical yearly low (MNW) to the typical yearly flood (MHW)' : 'des Wegs vom typischen Jahrestief (MNW) zum typischen Jahreshochwasser (MHW)'} · {LAGE_TEXT[lage(top.v, top.s)][lang]}</p>
            <p className="mt-1 text-xs text-navy-600">{quand(top.t, lang)} · {n ? (en ? 'live from PEGELONLINE' : 'live von PEGELONLINE') : (en ? 'value when the page was built' : 'Stand beim Erstellen der Seite')}</p>
            <p className="mt-2 text-xs text-navy-600">{en ? 'Where mean water sits between MNW and MHW differs from gauge to gauge: a gauge with a lower percentage can therefore already be above its mean water while another with a higher percentage is still below it.' : 'Wo das Mittelwasser zwischen MNW und MHW liegt, ist von Pegel zu Pegel verschieden: Ein Pegel mit kleinerem Prozentwert kann deshalb schon über seinem Mittelwasser stehen, während ein anderer mit größerem Prozentwert noch darunter liegt.'}</p>
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
