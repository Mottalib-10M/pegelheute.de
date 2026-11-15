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
import { ensureLive, getLive, quand } from '../../lib/live';
import { useLiveReader } from '../../lib/use-live';
import { abstand, delta24, fahrrinne, lage, LAGE_TEXT, naheRekordtief, schifffahrt, spiegel, stundenBis, tendenz, TENDENZ_TEXT, VERDIKT, type St } from '../../lib/engine/pegel';

interface Props { lang: Lang; stations: St[]; initial: string; idPrefix?: string; rivers: Record<string, string>; fetchedAt: string; methodHref: string; warnHref: string; hideSelect?: boolean;
  /** Embed : `?station=koeln` choisit la station après le montage (slug → uuid). */
  slugs?: Record<string, string> }

const L = {
  de: { station: 'Pegel', schwelle: 'Ihr Wert zum Vergleich', schwelleHelpMhw: (n: string, x: string) => `Vorbelegt als Beispiel: mittleres Hochwasser in ${n} (${x}), der Stand, den der Fluss hier in einem typischen Jahr einmal erreicht. Tragen Sie Ihren eigenen Wert ein, z. B. ab wann Ihr Steg oder Ihre Zufahrt nass wird.`, schwelleHelpMw: (n: string, x: string) => `Vorbelegt als Beispiel: ${x}, ein Meter über dem üblichen Stand in ${n}. Tragen Sie Ihren eigenen Wert ein, z. B. ab wann Ihr Steg oder Ihre Zufahrt nass wird.`, schwelleHelp: 'Tragen Sie Ihren eigenen Wert ein, z. B. ab wann Ihr Steg oder Ihre Zufahrt nass wird.', head: 'Wasserstand', live: 'live von PEGELONLINE gelesen', loading: 'aktueller Wert wird bei PEGELONLINE abgefragt …', snap: 'Stand beim Erstellen der Seite', fail: 'PEGELONLINE gerade nicht erreichbar: Stand beim Erstellen der Seite', messung: 'Stand:', t24: 'Änderung in 24 Stunden', lage: 'Einordnung', mehr: 'Alle Vergleichswerte anzeigen', mw: 'Üblicher Stand, Mittelwasser (MW)', mhw: 'Typisches Jahreshochwasser, mittleres Hochwasser (MHW)', m1: 'Erste Hochwassermarke für Schiffe (Marke I)', m2: 'Zweite Hochwassermarke, Schifffahrt verboten (Marke II)', rinne: 'Tiefe der Fahrrinne für Schiffe, Näherung', nhn: 'Höhe des Wasserspiegels über dem Meer (NHN)', ihr: 'Abstand zu Ihrem Wert', bis: 'Ihr Wert, bei gleicher Änderung wie in den letzten 24 Stunden', nie: 'wird bei dieser Tendenz nicht erreicht', spaet: 'nicht in den nächsten 3 Tagen', schon: 'bereits erreicht', unter: 'darunter', ueber: 'darüber', inStd: (x: string) => `in ≈ ${x} Std.`, km: 'km', note: 'Ungeprüfte Rohdaten der Wasserstraßen- und Schifffahrtsverwaltung (WSV). Keine Hochwasserwarnung und keine Vorhersage: Warnungen geben die Hochwasserzentralen der Länder heraus.', rechtNote: 'Hochwassermarken: Rheinschifffahrtspolizeiverordnung, § 10.01.', method: 'So rechnen wir', warn: 'Amtliche Warnungen', frei: 'Schifffahrt: keine Hochwasserbeschränkung (Stand unter der ersten Hochwassermarke)', einge: 'Schifffahrt eingeschränkt: Stand zwischen der ersten und der zweiten Hochwassermarke', gesperrt: 'Schifffahrt verboten: Stand auf oder über der zweiten Hochwassermarke', marke: 'Erste Hochwassermarke überschritten', rekord: (x: string, d: string) => `Rekordtief: Der Stand liegt auf oder unter dem niedrigsten je gemessenen Wert (${x}${d ? `, ${d}` : ''}).`, fast: (a: string, x: string, d: string) => `Fast Rekordtief: nur ${a} über dem niedrigsten je gemessenen Stand (${x}${d ? `, ${d}` : ''}).`, in24: 'in 24 Stunden', cm: 'cm' },
  en: { station: 'Gauge', schwelle: 'Your own level to compare', schwelleHelpMhw: (n: string, x: string) => `Pre-filled as an example: mean high water at ${n} (${x}), the level the river reaches here once in a typical year. Enter your own level, e.g. the reading at which your jetty or access road gets wet.`, schwelleHelpMw: (n: string, x: string) => `Pre-filled as an example: ${x}, one metre above the usual level at ${n}. Enter your own level, e.g. the reading at which your jetty or access road gets wet.`, schwelleHelp: 'Enter your own level, e.g. the reading at which your jetty or access road gets wet.', head: 'Water level', live: 'read live from PEGELONLINE', loading: 'fetching the current value from PEGELONLINE …', snap: 'value when this page was built', fail: 'PEGELONLINE not reachable right now: value when this page was built', messung: 'As of', t24: 'Change over 24 hours', lage: 'Where it stands', mehr: 'Show all reference values', mw: 'Usual level, mean water (MW)', mhw: 'Typical yearly flood, mean high water (MHW)', m1: 'First flood mark for shipping (mark I)', m2: 'Second flood mark, shipping prohibited (mark II)', rinne: 'Depth of the shipping channel, approximation', nhn: 'Height of the water surface above sea level (NHN)', ihr: 'Distance to your level', bis: 'Your level, at the same change as over the last 24 hours', nie: 'not reached at this trend', spaet: 'not within the next 3 days', schon: 'already reached', unter: 'below', ueber: 'above', inStd: (x: string) => `in ≈ ${x} h`, km: 'km', note: 'Unchecked raw data from the German waterways administration (WSV). No flood warning and no forecast: warnings are issued by the flood centres of the German states.', rechtNote: 'Flood marks: Rhine Shipping Police Regulations, § 10.01.', method: 'How we calculate', warn: 'Official warnings', frei: 'Shipping: no high-water restriction (level below the first flood mark)', einge: 'Shipping restricted: level between the first and the second flood mark', gesperrt: 'Shipping prohibited: level at or above the second flood mark', marke: 'First flood mark exceeded', rekord: (x: string, d: string) => `Record low: the level is at or below the lowest reading ever measured (${x}${d ? `, ${d}` : ''}).`, fast: (a: string, x: string, d: string) => `Almost a record low: only ${a} above the lowest level ever measured (${x}${d ? `, ${d}` : ''}).`, in24: 'over 24 hours', cm: 'cm' },
} as const;

/** Valeur d'exemple du champ « Ihr Wert » : l'hochwasser typique de la station (MHW), sinon un mètre au-dessus du MW.
 *  Plus la marque I de la RheinSchPV : c'est une règle de navigation, pas un seuil pour un riverain (testeurs 2026-11-14). */
const defSchwelle = (s: St) => s.mhw ?? s.m1 ?? (s.mw !== undefined ? s.mw + 100 : s.v + 100);
const datum = (iso: string | undefined, lang: Lang) => (iso ? new Date(`${iso}T12:00:00Z`).toLocaleDateString(lang === 'en' ? 'en-GB' : 'de-DE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }) : '');

export default function PegelTool({ lang, stations, initial, idPrefix = 'pt', rivers, fetchedAt, methodHref, warnHref, hideSelect = false, slugs }: Props) {
  const T = L[lang];
  const n = (x: number) => formatNumber(x, 0, lang);
  const cmT = (x: number) => `${n(x)} ${T.cm}`;
  const [sel, setSel] = useState(initial);
  const st = useMemo(() => stations.find((s) => s.u === sel) ?? stations[0], [sel, stations]);
  const [schwelle, setSchwelle] = useState(() => defSchwelle(st));
  const [eigen, setEigen] = useState(false);
  const [etat, setEtat] = useState<'snap' | 'loading' | 'live' | 'fail'>('snap');
  const lire = useLiveReader();

  useEffect(() => {
    if (!slugs) return;
    const q = new URLSearchParams(location.search).get('station');
    const u = q ? slugs[q.toLowerCase()] : undefined;
    const ns = u ? stations.find((s) => s.u === u) : undefined;
    if (ns) { setSel(ns.u); setSchwelle(defSchwelle(ns)); setEigen(false); }
  }, []);
  useEffect(() => {
    let stop = false;
    setEtat(getLive(st.u) ? 'live' : 'loading');
    ensureLive(st.u).then((x) => { if (!stop) setEtat(x ? 'live' : 'fail'); });
    return () => { stop = true; };
  }, [st.u]);

  // Une seule valeur par station : celle du magasin live partagé avec le chapeau, les textes et les calculateurs.
  const lv = lire(st.u);
  const v = lv?.v ?? st.v;
  const t = lv?.t ?? st.t;
  const p = lv ? lv.p : st.p;
  const d = delta24(v, p);
  const lg = lage(v, st);
  const tend = tendenz(d);
  const rhein = st.w === 'RHEIN';
  const sf = rhein ? schifffahrt(v, st) : 'ohneMarken';
  const options = stations.map((s) => ({ value: s.u, label: `${s.n} (${rivers[s.w] ?? s.w}${s.km !== null ? `, ${T.km} ${formatNumber(s.km, s.km % 1 ? 1 : 0, lang)}` : ''})` }));
  const ab = (ref: number | undefined) => { const a = abstand(v, ref); return a === null ? null : a >= 0 ? `${cmT(a)} ${T.unter}` : `${cmT(-a)} ${T.ueber}`; };
  const sgn = (x: number) => (x > 0 ? `+${cmT(x)}` : x < 0 ? `−${cmT(Math.abs(x))}` : `±0 ${T.cm}`);
  const verdikt = `${VERDIKT[lg][lang]}${d === null ? '' : `; ${TENDENZ_TEXT[tend][lang]} (${sgn(d)} ${T.in24})`}.`;
  const haupt: Array<[string, string]> = [];
  haupt.push([T.t24, d === null ? TENDENZ_TEXT.unbekannt[lang] : `${sgn(d)} (${TENDENZ_TEXT[tend][lang]})`]);
  const aIhr = abstand(v, schwelle)!;
  haupt.push([T.ihr, aIhr === 0 ? T.schon : aIhr > 0 ? `${cmT(aIhr)} ${T.unter}` : `${cmT(-aIhr)} ${T.ueber}`]);
  if (aIhr > 0) {
    const h = stundenBis(v, schwelle, d);
    haupt.push([T.bis, h === null ? T.nie : h > 72 ? T.spaet : T.inStd(n(Math.max(1, Math.round(h))))]);
  }
  const mehr: Array<[string, string]> = [[T.lage, LAGE_TEXT[lg][lang]]];
  if (st.mw !== undefined) mehr.push([T.mw, `${cmT(st.mw)}: ${ab(st.mw)}`]);
  if (st.mhw !== undefined) mehr.push([T.mhw, `${cmT(st.mhw)}: ${ab(st.mhw)}`]);
  if (st.m1 !== undefined) mehr.push([T.m1, `${cmT(st.m1)}: ${ab(st.m1)}`]);
  if (st.m2 !== undefined) mehr.push([T.m2, `${cmT(st.m2)}: ${ab(st.m2)}`]);
  if (st.glw !== undefined && st.tu !== undefined) mehr.push([T.rinne, `${formatNumber(fahrrinne(v, st.glw, st.tu) / 100, 2, lang)} m`]);
  if (st.pnp !== null) mehr.push([T.nhn, `${formatNumber(spiegel(st.pnp, v), 2, lang)} m`]);
  const nah = naheRekordtief(v, st);
  const alert = sf === 'gesperrt' ? T.gesperrt : sf === 'eingeschraenkt' ? T.einge : !rhein && st.m1 !== undefined && v >= st.m1 ? T.marke
    : lg === 'unterNNW' ? T.rekord(cmT(st.nnw!), datum(st.nnwd, lang)) : nah !== null ? T.fast(cmT(nah), cmT(st.nnw!), datum(st.nnwd, lang)) : null;
  const etatTxt = etat === 'live' ? T.live : etat === 'loading' ? T.loading : etat === 'fail' ? T.fail : T.snap;
  const schwelleHelp = eigen ? T.schwelleHelp : st.mhw !== undefined && schwelle === st.mhw ? T.schwelleHelpMhw(st.n, cmT(st.mhw)) : st.mw !== undefined && schwelle === st.mw + 100 ? T.schwelleHelpMw(st.n, cmT(schwelle)) : T.schwelleHelp;
  const row = ([l, x]: [string, string]) => <tr key={l}><td className="py-1.5 pr-3 text-navy-600">{l}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{x}</td></tr>;

  return (
    <div data-pegel-tool className="not-prose rounded-xl border border-accent-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
          {!hideSelect && <SelectField id={`${idPrefix}-station`} label={T.station} value={st.u} onChange={(u) => { setSel(u); const ns = stations.find((s) => s.u === u); if (ns) { setSchwelle(defSchwelle(ns)); setEigen(false); } }} options={options} />}
          <NumberField id={`${idPrefix}-schwelle`} label={T.schwelle} value={schwelle} onChange={(x) => { setSchwelle(x); setEigen(true); }} unit={T.cm} max={2000} help={schwelleHelp} lang={lang} />
          {rhein && sf === 'frei' && <p className="text-sm text-navy-700">{T.frei}</p>}
        </form>
        <div data-resultat aria-live="polite" className="rounded-lg bg-navy-50 p-4">
          <p className="text-sm font-medium text-navy-600">{T.head} {st.n}</p>
          <p data-wert={st.u} className="tabular-nums mt-1 text-3xl font-bold text-navy-900">{cmT(v)}</p>
          <p className="mt-1 text-xs text-navy-600">{T.messung} <span data-zeit>{quand(t, lang)}</span> · <span data-etat={etat}>{etatTxt}</span></p>
          <p data-verdikt className="mt-2 text-sm font-semibold text-navy-900">{verdikt}</p>
          {alert && <p data-alerte role="note" className="mt-2 border-l-4 border-amber-500 pl-2 text-sm font-semibold text-navy-900">{alert}</p>}
          <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">{haupt.map(row)}</tbody></table>
          <details className="mt-2 rounded-md border border-navy-200 bg-white px-2 py-1">
            <summary className="cursor-pointer text-sm font-medium text-navy-700">{T.mehr}</summary>
            <table className="mt-1 w-full text-sm"><tbody className="divide-y divide-navy-200">{mehr.map(row)}</tbody></table>
          </details>
          <p className="mt-2 text-xs text-navy-500 hyphens-auto [overflow-wrap:anywhere]">{T.note}{rhein && st.m1 !== undefined ? ` ${T.rechtNote}` : ''} <a href={methodHref} className="underline">{T.method}</a> · <a href={warnHref} className="underline" target="_blank" rel="noopener nofollow">{T.warn}</a></p>
        </div>
      </div>
      <span hidden data-build={fetchedAt} />
    </div>
  );
}
