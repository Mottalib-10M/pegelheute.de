/** Tableau des pegels d'un ou plusieurs cours d'eau : rendu au build (momentaufnahme), puis valeurs relues en une requête. */
import { useEffect, useState } from 'react';
import { formatNumber, type Lang } from '../../lib/format';
import { ensureAll, quand } from '../../lib/live';
import { useLiveReader } from '../../lib/use-live';
import { lage, LAGE_TEXT, type St } from '../../lib/engine/pegel';

interface Props { lang: Lang; stations: St[]; waters: string[]; links?: Record<string, string>; rivers?: Record<string, string>; caption: string }

export default function PegelTabelle({ lang, stations, waters, links = {}, rivers, caption }: Props) {
  // Même magasin que l'outil et les textes de la page : une seule valeur par station (testeurs du 2026-11-14).
  const lire = useLiveReader();
  const [fini, setFini] = useState(false);
  useEffect(() => { ensureAll().then(() => setFini(true)); }, [waters.join(',')]);
  const en = lang === 'en';
  const H = en ? ['Gauge', ...(rivers ? ['River'] : []), 'km', 'Level (cm)', 'Reading', 'Where it stands'] : ['Pegel', ...(rivers ? ['Fluss'] : []), 'km', 'Stand (cm)', 'Messzeit', 'Einordnung'];
  const n = stations.filter((s) => lire(s.u)).length;
  const null0 = en ? ' A reading of 0 cm or less does not mean the river is dry: the gauge zero is a fixed reference height, not the river bed.' : ' 0 cm oder weniger heißt nicht, dass kein Wasser fließt: Der Pegelnullpunkt ist eine feste Bezugshöhe, nicht der Flussgrund.';
  const hatNull = stations.some((s) => (lire(s.u)?.v ?? s.v) <= 0);
  const note = (n ? (en ? `Values read live from PEGELONLINE (${formatNumber(n, 0, lang)} gauges).` : `Werte live von PEGELONLINE gelesen (${formatNumber(n, 0, lang)} Pegel).`) : fini ? (en ? 'PEGELONLINE not reachable right now: values when the page was built, with their time.' : 'PEGELONLINE gerade nicht erreichbar: Werte beim Erstellen der Seite, mit Uhrzeit.') : (en ? 'Values when the page was built, with their time; current values are loading from PEGELONLINE.' : 'Werte beim Erstellen der Seite, mit Uhrzeit; aktuelle Werte werden bei PEGELONLINE abgefragt.')) + (hatNull ? null0 : '');
  return (
    <div className="not-prose my-6 overflow-x-auto">
      <table className="journal empile w-full text-sm">
        <caption className="mb-2 text-left text-sm text-navy-700">{caption} <span className="text-navy-500">{note}</span></caption>
        <thead><tr>{H.map((h) => <th key={h} scope="col" className="px-3 py-2 text-left font-semibold text-navy-900">{h}</th>)}</tr></thead>
        <tbody>
          {stations.map((s) => {
            const x = lire(s.u);
            const v = x?.v ?? s.v; const t = x?.t ?? s.t;
            const lg = lage(v, s);
            const cells = [
              links[s.u] ? <a href={links[s.u]} className="font-medium text-accent-700 underline">{s.n}</a> : s.n,
              ...(rivers ? [rivers[s.w] ?? s.w] : []),
              s.km === null ? '–' : formatNumber(s.km, s.km % 1 ? 1 : 0, lang),
              formatNumber(v, 0, lang),
              quand(t, lang),
              lg === 'unterNNW' ? <strong className="text-amber-800">{en ? 'Record low: ' : 'Rekordtief: '}{LAGE_TEXT[lg][lang]}</strong> : LAGE_TEXT[lg][lang],
            ];
            return <tr key={s.u} data-lv-row={s.u}>{cells.map((c, i) => <td key={i} data-label={H[i]} className="tabular-nums border-b border-navy-100 px-3 py-2 text-navy-800">{c}</td>)}</tr>;
          })}
        </tbody>
      </table>
    </div>
  );
}
