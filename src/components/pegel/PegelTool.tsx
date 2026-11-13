/**
 * L'outil principal : choisir un pegel, lire le wert (momentaufnahme du build, puis lecture directe de PEGELONLINE
 * dans le navigateur), la tendance 24 h, la lage face aux Kennwerte, et le temps jusqu'à un seuil personnel si la
 * variation des 24 dernières heures continuait (prolongement, pas une prévision).
 * Hydratation (RECETTE §17.5) : le premier rendu n'utilise que les props ; la lecture directe arrive après le montage.
 */
import { useEffect, useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { formatNumber, type Lang } from '../../lib/format';
import { liveStation, quand, type Live } from '../../lib/live';
import { abstand, delta24, fahrrinne, lage, LAGE_TEXT, schifffahrt, spiegel, stundenBis, tendenz, TENDENZ_TEXT, type St } from '../../lib/engine/pegel';

interface Props { lang: Lang; stations: St[]; initial: string; idPrefix?: string; rivers: Record<string, string>; fetchedAt: string; methodHref: string; warnHref: string; hideSelect?: boolean;
  /** Embed : `?station=koeln` choisit la station après le montage (slug → uuid). */
  slugs?: Record<string, string> }

const L = {
  de: { station: 'Pegel', schwelle: 'Ihr Wert zum Vergleich', schwelleHelp: 'z. B. der Stand, ab dem Ihr Ufer, Ihr Steg oder Ihre Zufahrt nass wird', head: 'Wasserstand', live: 'Live von PEGELONLINE gelesen', loading: 'Aktueller Wert wird bei PEGELONLINE abgefragt …', snap: 'Momentaufnahme beim Erstellen der Seite', fail: 'PEGELONLINE gerade nicht erreichbar: Momentaufnahme beim Erstellen der Seite', messung: 'Messwert von', t24: 'Änderung in 24 Stunden', lage: 'Einordnung', mw: 'Abstand zu Mittelwasser (MW)', mhw: 'Abstand zu mittlerem Hochwasser (MHW)', m1: 'Abstand zu Hochwassermarke I', m2: 'Abstand zu Hochwassermarke II', rinne: 'Fahrrinnentiefe, Näherung', nhn: 'Wasserspiegel', ihr: 'Abstand zu Ihrem Wert', bis: 'Bei gleicher Änderung wie in den letzten 24 h erreicht in', nie: 'Bei der jetzigen Tendenz nicht in Sicht', schon: 'Bereits erreicht', unter: 'darunter', ueber: 'darüber', std: 'Std.', tage: 'Tagen', km: 'km', note: 'Ungeprüfte Rohdaten der WSV. Keine Hochwasserwarnung und keine Vorhersage: Warnungen geben die Hochwasserzentralen der Länder heraus.', method: 'So rechnen wir', warn: 'Amtliche Warnungen', frei: 'Schifffahrt: keine Hochwasserbeschränkung (unter Marke I)', einge: 'Schifffahrt eingeschränkt: Stand zwischen Marke I und II (RheinSchPV § 10.01)', gesperrt: 'Schifffahrt verboten: Stand auf oder über Marke II (RheinSchPV § 10.01)', marke: 'Hochwassermarke I überschritten', cm: 'cm' },
  en: { station: 'Gauge', schwelle: 'Your own level to compare', schwelleHelp: 'e.g. the reading at which your bank, jetty or access road gets wet', head: 'Water level', live: 'Read live from PEGELONLINE', loading: 'Fetching the current value from PEGELONLINE …', snap: 'Snapshot taken when this page was built', fail: 'PEGELONLINE not reachable right now: snapshot taken when this page was built', messung: 'Reading from', t24: 'Change over 24 hours', lage: 'Where it stands', mw: 'Distance to mean water (MW)', mhw: 'Distance to mean high water (MHW)', m1: 'Distance to flood mark I', m2: 'Distance to flood mark II', rinne: 'Fairway depth, approximation', nhn: 'Water surface', ihr: 'Distance to your level', bis: 'At the same change as over the last 24 h, reached in', nie: 'Not in sight at the current trend', schon: 'Already reached', unter: 'below', ueber: 'above', std: 'h', tage: 'days', km: 'km', note: 'Unchecked raw data from the WSV. No flood warning and no forecast: warnings are issued by the flood centres of the German states.', method: 'How we calculate', warn: 'Official warnings', frei: 'Shipping: no high-water restriction (below mark I)', einge: 'Shipping restricted: level between mark I and II (RheinSchPV § 10.01)', gesperrt: 'Shipping prohibited: level at or above mark II (RheinSchPV § 10.01)', marke: 'Flood mark I exceeded', cm: 'cm' },
} as const;

const defSchwelle = (s: St) => s.m1 ?? s.mhw ?? (s.mw !== undefined ? s.mw + 100 : s.v + 100);

export default function PegelTool({ lang, stations, initial, idPrefix = 'pt', rivers, fetchedAt, methodHref, warnHref, hideSelect = false, slugs }: Props) {
  const T = L[lang];
  const n = (x: number) => formatNumber(x, 0, lang);
  const sgn = (x: number) => (x > 0 ? `+${n(x)}` : x < 0 ? `−${n(Math.abs(x))}` : '±0');
  const [sel, setSel] = useState(initial);
  const st = useMemo(() => stations.find((s) => s.u === sel) ?? stations[0], [sel, stations]);
  const [schwelle, setSchwelle] = useState(() => defSchwelle(st));
  const [live, setLive] = useState<Record<string, Live>>({});
  const [etat, setEtat] = useState<'snap' | 'loading' | 'live' | 'fail'>('snap');

  useEffect(() => {
    if (!slugs) return;
    const q = new URLSearchParams(location.search).get('station');
    const u = q ? slugs[q.toLowerCase()] : undefined;
    const ns = u ? stations.find((s) => s.u === u) : undefined;
    if (ns) { setSel(ns.u); setSchwelle(defSchwelle(ns)); }
  }, []);
  useEffect(() => {
    const ctl = new AbortController();
    setEtat('loading');
    liveStation(st.u, ctl.signal).then((x) => { if (x) { setLive((o) => ({ ...o, [st.u]: x })); setEtat('live'); } else setEtat('fail'); }).catch(() => { if (!ctl.signal.aborted) setEtat('fail'); });
    return () => ctl.abort();
  }, [st.u]);

  const lv = live[st.u];
  const v = lv?.v ?? st.v;
  const t = lv?.t ?? st.t;
  const p = lv ? lv.p : st.p;
  const d = delta24(v, p);
  const lg = lage(v, st);
  const tend = tendenz(d);
  const rhein = st.w === 'RHEIN';
  const sf = rhein ? schifffahrt(v, st) : 'ohneMarken';
  const options = stations.map((s) => ({ value: s.u, label: `${s.n} (${rivers[s.w] ?? s.w}${s.km !== null ? `, ${T.km} ${formatNumber(s.km, s.km % 1 ? 1 : 0, lang)}` : ''})` }));
  const ab = (ref: number | undefined) => { const a = abstand(v, ref); return a === null ? null : a >= 0 ? `${n(a)} ${T.cm} ${T.unter}` : `${n(-a)} ${T.cm} ${T.ueber}`; };
  const rows: Array<[string, string]> = [];
  rows.push([T.t24, d === null ? TENDENZ_TEXT.unbekannt[lang] : `${sgn(d)} ${T.cm} (${TENDENZ_TEXT[tend][lang]})`]);
  rows.push([T.lage, LAGE_TEXT[lg][lang]]);
  if (st.mw !== undefined) rows.push([T.mw, ab(st.mw)!]);
  if (st.mhw !== undefined) rows.push([T.mhw, ab(st.mhw)!]);
  if (st.m1 !== undefined) rows.push([T.m1, ab(st.m1)!]);
  if (st.m2 !== undefined) rows.push([T.m2, ab(st.m2)!]);
  if (st.glw !== undefined && st.tu !== undefined) rows.push([T.rinne, `${formatNumber(fahrrinne(v, st.glw, st.tu) / 100, 2, lang)} m`]);
  if (st.pnp !== null) rows.push([T.nhn, `${formatNumber(spiegel(st.pnp, v), 2, lang)} m ${st.pu.replace('m. ü. ', 'ü. ')}`]);
  const aIhr = abstand(v, schwelle)!;
  rows.push([T.ihr, aIhr === 0 ? T.schon : aIhr > 0 ? `${n(aIhr)} ${T.cm} ${T.unter}` : `${n(-aIhr)} ${T.cm} ${T.ueber}`]);
  const h = aIhr > 0 ? stundenBis(v, schwelle, d) : null;
  if (aIhr > 0) rows.push([T.bis, h === null ? T.nie : h < 72 ? `≈ ${n(Math.max(1, Math.round(h)))} ${T.std}` : `≈ ${n(Math.round(h / 24))} ${T.tage}`]);
  const alert = sf === 'gesperrt' ? T.gesperrt : sf === 'eingeschraenkt' ? T.einge : !rhein && st.m1 !== undefined && v >= st.m1 ? T.marke : null;
  const etatTxt = etat === 'live' ? T.live : etat === 'loading' ? T.loading : etat === 'fail' ? T.fail : T.snap;

  return (
    <div data-pegel-tool className="not-prose rounded-xl border border-accent-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
          {!hideSelect && <SelectField id={`${idPrefix}-station`} label={T.station} value={st.u} onChange={(u) => { setSel(u); const ns = stations.find((s) => s.u === u); if (ns) setSchwelle(defSchwelle(ns)); }} options={options} />}
          <NumberField id={`${idPrefix}-schwelle`} label={T.schwelle} value={schwelle} onChange={setSchwelle} unit={T.cm} max={2000} help={T.schwelleHelp} lang={lang} />
          {rhein && sf === 'frei' && <p className="text-sm text-navy-700">{T.frei}</p>}
        </form>
        <div data-resultat aria-live="polite" className="rounded-lg bg-navy-50 p-4">
          <p className="text-sm font-medium text-navy-600">{T.head} {st.n}</p>
          <p className="tabular-nums mt-1 text-3xl font-bold text-navy-900">{n(v)} {T.cm}</p>
          <p className="mt-1 text-xs text-navy-600">{T.messung} {quand(t, lang)} · <span data-etat={etat}>{etatTxt}</span></p>
          {alert && <p data-alerte role="note" className="mt-2 border-l-4 border-amber-500 pl-2 text-sm font-semibold text-navy-900">{alert}</p>}
          <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
            {rows.map(([l, x]) => <tr key={l}><td className="py-1.5 pr-3 text-navy-600">{l}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{x}</td></tr>)}
          </tbody></table>
          <p className="mt-2 text-xs text-navy-500">{T.note} <a href={methodHref} className="underline">{T.method}</a> · <a href={warnHref} className="underline" target="_blank" rel="noopener nofollow">{T.warn}</a></p>
        </div>
      </div>
      <span hidden data-build={fetchedAt} />
    </div>
  );
}
