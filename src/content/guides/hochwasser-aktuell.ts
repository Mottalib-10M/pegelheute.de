import { definePage } from '../../lib/page-types';
import { STATS } from '../_stats';
import { allCompact, riverOfApi } from '../../lib/pegel';
import { anteil } from '../../lib/engine/pegel';
import { formatPercent } from '../../lib/format';

/** Pegel über MHW, höchster Anteil zuerst. */
const HOCH = () => allCompact().map((s) => ({ s, a: anteil(s.v, s) })).filter((x) => x.a !== null && x.s.mhw !== undefined && x.s.v > x.s.mhw).sort((a, b) => b.a! - a.a!);

export default definePage({
  id: 'hochwasser-aktuell', kind: 'guide', order: 1, tool: 'rangliste-hoch',
  related: ['hochwassermarken', 'st-koeln', 'st-passau', 'st-dresden'],
  sources: ['pegelonline', 'hochwasserzentralen', 'hnd-bayern', 'pegelonline-api'],
  de: {
    slug: 'hochwasser-aktuell', nav: 'Hochwasser aktuell', card: 'Welche Pegel gerade am höchsten stehen',
    title: 'Hochwasser aktuell: welche Pegel gerade am höchsten stehen',
    description: 'Hochwasser aktuell: Rangliste der Pegel an Rhein, Elbe, Donau, Main, Mosel und Weser nach Abstand zum mittleren Hochwasser, mit Rechner für Ihren Grenzwert.',
    h1: 'Hochwasser aktuell: die höchsten Pegel im Vergleich',
    intro: (h) => { const t = STATS.hoechster; return `Hochwasser aktuell: Am höchsten im Verhältnis zu seinen Kennwerten stand in der Momentaufnahme ${t.s.n} mit ${h.cm(t.s.v)}; ${h.n(STATS.ueberMHW)} Pegel lagen über dem mittleren Hochwasser.`; },
    resume: (h) => `Ob ein Fluss Hochwasser führt, lässt sich nicht an der bloßen Zahl ablesen, weil jeder Pegel seinen eigenen Nullpunkt hat. Diese Seite vergleicht deshalb die Pegel untereinander nach ihrer Lage zwischen mittlerem Niedrigwasser (MNW) und mittlerem Hochwasser (MHW): 0 % heißt, der Pegel steht auf MNW, 100 % heißt, er hat das mittlere Hochwasser erreicht, Werte darüber bedeuten mehr Wasser als im typischen Jahreshochwasser. In der Momentaufnahme von ${h.snap} lagen ${h.n(STATS.ueberMHW)} von ${h.n(STATS.mitKenn)} Pegeln mit Kennwerten über MHW, ${h.n(STATS.ueberM1)} über einer Hochwassermarke I. Die Rangliste oben lädt beim Öffnen die aktuellen Werte aus PEGELONLINE. Sie ersetzt keine Warnung: Meldestufen, Vorhersagen und Hinweise für Anwohner geben die Länder heraus, gebündelt im Länderübergreifenden Hochwasserportal. Wer wissen will, wann ein bestimmter Wert erreicht sein könnte, findet weiter unten einen Rechner, der die Tendenz der letzten 24 Stunden geradlinig fortschreibt.`,
    body: (h) => { const L = HOCH().slice(0, 10); return `<h2>Hochwasser aktuell: so liest man die Rangliste</h2>
<p>Die Prozentzahl ist ein Vergleichsmaß, kein amtlicher Wert. Sie macht einen Pegel in Passau mit Mittelwasser um ${h.cm(h.k('PASSAU DONAU').mw!)} vergleichbar mit einem in Dresden, wo das Mittelwasser bei ${h.cm(h.k('DRESDEN').mw!)} liegt. Pegel ohne MNW und MHW, etwa die Tidepegel in Hamburg und Bremen oder die Oberpegel der Moselschleusen, erscheinen nicht in der Rangliste.</p>
${L.length ? h.table([h.t('Pegel', 'Gauge'), h.t('Fluss', 'River'), h.t('Momentaufnahme', 'Snapshot'), 'MHW', h.t('Lage', 'Position')], L.map((x) => [x.s.n, riverOfApi(x.s.w)[h.lang], h.cm(x.s.v), h.cm(x.s.mhw!), formatPercent(x.a!, 0, h.lang)]), h.t(`Pegel über dem mittleren Hochwasser, Momentaufnahme ${h.snap}.`, `Gauges above mean high water, snapshot of ${h.snap}.`)) : `<p>${h.t(`In der Momentaufnahme von ${h.snap} lag kein Pegel mit Kennwerten über seinem mittleren Hochwasser.`, `In the snapshot of ${h.snap} no gauge with reference values was above its mean high water.`)}</p>`}
<h2>Wann wäre ein bestimmter Wert erreicht?</h2>
<p>Der Rechner nimmt den aktuellen Wert und den Anstieg der letzten 24 Stunden und schreibt beides geradlinig fort. Das ist keine Vorhersage: Eine Hochwasserwelle steigt selten gleichmäßig, und sie kann jederzeit ihren Scheitel erreichen. Vorhersagen rechnen die Länder mit Niederschlags- und Abflussmodellen.</p>
${h.mini('schwelle')}
<h2>Woher die Warnungen kommen</h2>
<p>Die WSV misst an den Bundeswasserstraßen, die Länder warnen. Bayern veröffentlicht Meldestufen über den ${h.src('hnd-bayern', 'Hochwassernachrichtendienst')}, alle Länder sind über die ${h.src('hochwasserzentralen', 'Hochwasserzentralen')} erreichbar. Am Rhein regeln zusätzlich die ${h.a('hochwassermarken', 'Hochwassermarken')} die Schifffahrt; sie sagen nichts darüber, ob ein Keller nass wird.</p>`; },
    faqs: (h) => [
      { q: 'Wo ist gerade Hochwasser in Deutschland?', a: `Die Rangliste oben zeigt es nach dem Abstand zum mittleren Hochwasser. In der Momentaufnahme lagen ${h.n(STATS.ueberMHW)} Pegel darüber. Ob für Ihren Ort eine Warnung gilt, sagt das Hochwasserportal Ihres Landes. Pegel ohne Kennwerte erscheinen nicht in der Rangliste. Die Werte laden beim Öffnen neu.` },
      { q: 'Was bedeutet 100 % in der Rangliste?', a: 'Der Pegel steht genau auf seinem mittleren Hochwasser, also dem Wert, den der Fluss an dieser Stelle in einem typischen Jahr einmal erreicht. 0 % entspricht dem mittleren Niedrigwasser. Der Prozentwert ist ein Vergleichsmaß dieser Seite, kein amtlicher Wert. Er macht Pegel mit verschiedenen Nullpunkten vergleichbar.' },
      { q: 'Kann der Rechner sagen, wann das Wasser bei mir ist?', a: 'Nein. Er schreibt den Anstieg der letzten 24 Stunden geradlinig fort und zeigt, wann ein Wert unter dieser Annahme erreicht wäre. Hochwasser verlaufen selten geradlinig; verbindlich sind die Vorhersagen der Länder. Er ist ein Hilfsmittel zum Einordnen. Für Entscheidungen zählen die amtlichen Vorhersagen.' },
    ],
  },
  en: {
    slug: 'flood-levels-now', nav: 'Flood levels now', card: 'Which gauges are highest right now',
    title: 'Flood Levels Now in Germany: Which Gauges Are Highest Today',
    description: 'Flood levels now in Germany: gauges on six rivers ranked by distance to mean high water, with time, 24-hour trend and a calculator for your own level.',
    h1: 'Flood levels now: the highest gauges compared',
    intro: (h) => { const t = STATS.hoechster; return `Flood levels now: relative to its reference values, the highest gauge in the snapshot was ${t.s.n} at ${h.cm(t.s.v)}; ${h.n(STATS.ueberMHW)} gauges were above mean high water.`; },
    resume: (h) => `Whether a river is in flood cannot be read from the bare number, because every gauge has its own zero. This page therefore compares gauges by where they sit between mean low water (MNW) and mean high water (MHW): 0% means the gauge is at MNW, 100% means it has reached mean high water, and anything above means more water than at a typical yearly flood. In the snapshot of ${h.snap}, ${h.n(STATS.ueberMHW)} of ${h.n(STATS.mitKenn)} gauges with reference values were above MHW and ${h.n(STATS.ueberM1)} above a flood mark I. The ranking above loads current values from PEGELONLINE when you open the page. It does not replace a warning: alert stages, forecasts and advice for residents come from the federal states, collected in the cross-state flood portal. If you want to know when a given level might be reached, a calculator further down extends the trend of the last 24 hours in a straight line.`,
    body: (h) => { const L = HOCH().slice(0, 10); return `<h2>Flood levels now: how to read the ranking</h2>
<p>The percentage is a comparison measure, not an official value. It makes a gauge at Passau, with mean water around ${h.cm(h.k('PASSAU DONAU').mw!)}, comparable with one at Dresden, where mean water is ${h.cm(h.k('DRESDEN').mw!)}. Gauges without MNW and MHW, such as the tidal gauges at Hamburg and Bremen or the upper gauges at the Moselle locks, do not appear in the ranking.</p>
${L.length ? h.table([h.t('Pegel', 'Gauge'), h.t('Fluss', 'River'), h.t('Momentaufnahme', 'Snapshot'), 'MHW', h.t('Lage', 'Position')], L.map((x) => [x.s.n, riverOfApi(x.s.w)[h.lang], h.cm(x.s.v), h.cm(x.s.mhw!), formatPercent(x.a!, 0, h.lang)]), h.t(`Pegel über dem mittleren Hochwasser, Momentaufnahme ${h.snap}.`, `Gauges above mean high water, snapshot of ${h.snap}.`)) : `<p>${h.t(`In der Momentaufnahme von ${h.snap} lag kein Pegel mit Kennwerten über seinem mittleren Hochwasser.`, `In the snapshot of ${h.snap} no gauge with reference values was above its mean high water.`)}</p>`}
<h2>When would a given level be reached?</h2>
<p>The calculator takes the current reading and the rise over the last 24 hours and extends both in a straight line. That is not a forecast: a flood wave rarely rises evenly, and it can crest at any time. The states produce forecasts with rainfall and runoff models.</p>
${h.mini('schwelle')}
<h2>Where warnings come from</h2>
<p>The WSV measures on the federal waterways; the states issue warnings. Bavaria publishes alert stages through its ${h.src('hnd-bayern', 'flood information service')}, and every state is reachable via the ${h.src('hochwasserzentralen', 'state flood centres')}. On the Rhine the ${h.a('hochwassermarken', 'flood marks')} also govern shipping; they say nothing about whether a cellar will flood.</p>`; },
    faqs: (h) => [
      { q: 'Where is there flooding in Germany right now?', a: `The ranking above shows it by distance to mean high water. In the snapshot ${h.n(STATS.ueberMHW)} gauges were above it. Whether a warning applies to your area is up to your state's flood portal. Gauges without reference values do not appear in the ranking.` },
      { q: 'What does 100% mean in the ranking?', a: 'The gauge stands exactly at its mean high water, the level the river reaches at that spot once in a typical year. 0% corresponds to mean low water. The percentage is a comparison measure of this site, not an official value.' },
      { q: 'Can the calculator tell when the water will reach me?', a: 'No. It extends the rise of the last 24 hours in a straight line and shows when a level would be reached under that assumption. Floods rarely move in straight lines; the states’ forecasts are binding. It is an aid for putting numbers in context.' },
    ],
  },
});
