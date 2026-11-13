/** Tableau des pegels d'un ou plusieurs cours d'eau : rendu au build (momentaufnahme), puis valeurs relues en une requête. */
import { useEffect, useState } from 'react';
import { formatNumber, type Lang } from '../../lib/format';
import { liveWaters, quand } from '../../lib/live';
import { lage, LAGE_TEXT, type St } from '../../lib/engine/pegel';

interface Props { lang: Lang; stations: St[]; waters: string[]; links?: Record<string, string>; rivers?: Record<string, string>; caption: string }

export default function PegelTabelle({ lang, stations, waters, links = {}, rivers, caption }: Props) {
  const [live, setLive] = useState<Record<string, { v: number; t: string; s: string }>>({});
  useEffect(() => {
    const ctl = new AbortController();
    liveWaters(waters, ctl.signal).then(setLive).catch(() => {});
    return () => ctl.abort();
  }, [waters.join(',')]);
  const en = lang === 'en';
  const H = en ? ['Gauge', ...(rivers ? ['River'] : []), 'km', 'Level (cm)', 'Reading', 'Where it stands'] : ['Pegel', ...(rivers ? ['Fluss'] : []), 'km', 'Stand (cm)', 'Messzeit', 'Einordnung'];
  const n = Object.keys(live).length;
  const note = n ? (en ? `Values read live from PEGELONLINE (${formatNumber(n, 0, lang)} gauges).` : `Werte live von PEGELONLINE gelesen (${formatNumber(n, 0, lang)} Pegel).`) : (en ? 'Snapshot taken when the page was built; live values load from PEGELONLINE.' : 'Momentaufnahme beim Erstellen der Seite; Live-Werte werden bei PEGELONLINE abgefragt.');
  return (
    <div className="not-prose my-6 overflow-x-auto">
      <table className="journal empile w-full text-sm">
        <caption className="mb-2 text-left text-sm text-navy-700">{caption} <span className="text-navy-500">{note}</span></caption>
        <thead><tr>{H.map((h) => <th key={h} scope="col" className="px-3 py-2 text-left font-semibold text-navy-900">{h}</th>)}</tr></thead>
        <tbody>
          {stations.map((s) => {
            const x = live[s.u];
            const v = x?.v ?? s.v; const t = x?.t ?? s.t;
            const cells = [
              links[s.u] ? <a href={links[s.u]} className="font-medium text-accent-700 underline">{s.n}</a> : s.n,
              ...(rivers ? [rivers[s.w] ?? s.w] : []),
              s.km === null ? '–' : formatNumber(s.km, s.km % 1 ? 1 : 0, lang),
              formatNumber(v, 0, lang),
              quand(t, lang),
              LAGE_TEXT[lage(v, s)][lang],
            ];
            return <tr key={s.u}>{cells.map((c, i) => <td key={i} data-label={H[i]} className="tabular-nums border-b border-navy-100 px-3 py-2 text-navy-800">{c}</td>)}</tr>;
          })}
        </tbody>
      </table>
    </div>
  );
}
