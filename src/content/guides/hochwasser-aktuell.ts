import { definePage } from '../../lib/page-types';
import { STATS } from '../_stats';
import { allCompact } from '../../lib/pegel';
import { rangSpan, type RangFeld } from '../../lib/rang';

/** Textes du classement : écrits avec la momentaufnahme, réécrits par la Rangliste avec la lecture live. */
const R = (f: RangFeld, lang: 'de' | 'en') => rangSpan(f, allCompact().map((s) => ({ s, v: s.v })), lang);

export default definePage({
  id: 'hochwasser-aktuell', kind: 'guide', order: 1, tool: 'rangliste-hoch',
  related: ['hochwassermarken', 'st-koeln', 'st-passau', 'st-dresden'],
  sources: ['pegelonline', 'hochwasserzentralen', 'hnd-bayern', 'pegelonline-api'],
  de: {
    slug: 'hochwasser-aktuell', nav: 'Hochwasser aktuell', card: 'Welche Pegel gerade am höchsten stehen',
    title: 'Hochwasser aktuell: welche Pegel gerade am höchsten stehen',
    description: 'Hochwasser aktuell: Rangliste der Pegel an Rhein, Elbe, Donau, Main, Mosel und Weser nach Abstand zum mittleren Hochwasser, mit Rechner für Ihren Grenzwert.',
    h1: 'Hochwasser aktuell: die höchsten Pegel im Vergleich',
    intro: () => `Hochwasser aktuell: ${R('verdikt', 'de')} Am höchsten im Verhältnis zu seinen Kennwerten steht derzeit ${R('top', 'de')}.`,
    resume: (h) => `Ob ein Fluss Hochwasser führt, lässt sich nicht an der bloßen Zahl ablesen, weil jeder Pegel seinen eigenen Nullpunkt hat. Diese Seite vergleicht deshalb die Pegel untereinander nach ihrer Lage zwischen mittlerem Niedrigwasser (MNW) und mittlerem Hochwasser (MHW): 0 % heißt, der Pegel steht auf MNW, 100 % heißt, er hat das mittlere Hochwasser erreicht, Werte darüber bedeuten mehr Wasser als im typischen Jahreshochwasser. Derzeit liegen ${R('ueber', 'de')} von ${h.n(STATS.mitKenn)} Pegeln mit Kennwerten über MHW, ${R('ueberM1', 'de')} über einer Hochwassermarke I; die Rangliste oben und diese Zahlen werden beim Öffnen der Seite live bei PEGELONLINE gelesen. Die Rangliste ersetzt keine Warnung: Meldestufen, Vorhersagen und Hinweise für Anwohner geben die Länder heraus, gebündelt im Länderübergreifenden Hochwasserportal. Wer wissen will, wann ein bestimmter Wert erreicht sein könnte, findet weiter unten einen Rechner, der die Tendenz der letzten 24 Stunden geradlinig fortschreibt.`,
    body: (h) => `<h2>Hochwasser aktuell: so liest man die Rangliste</h2>
<p>Die Prozentzahl ist ein Vergleichsmaß, kein amtlicher Wert. Sie macht einen Pegel in Passau mit Mittelwasser um ${h.cm(h.k('PASSAU DONAU').mw!)} vergleichbar mit einem in Dresden, wo das Mittelwasser bei ${h.cm(h.k('DRESDEN').mw!)} liegt. Pegel ohne MNW und MHW, etwa die Tidepegel in Hamburg und Bremen oder die Oberpegel der Moselschleusen, erscheinen nicht in der Rangliste.</p>
${h.t('<p>Welche Pegel gerade über ihrem mittleren Hochwasser stehen, zeigt die Rangliste oben; sie wird beim Öffnen der Seite live gelesen und ändert sich mit jeder Messung.</p>', '<p>Which gauges are above their mean high water right now is shown by the ranking above; it is read live when the page opens and changes with every reading.</p>')}
<h2>Wann wäre ein bestimmter Wert erreicht?</h2>
<p>Der Rechner nimmt den aktuellen Wert und den Anstieg der letzten 24 Stunden und schreibt beides geradlinig fort. Das ist keine Vorhersage: Eine Hochwasserwelle steigt selten gleichmäßig, und sie kann jederzeit ihren Scheitel erreichen. Vorhersagen rechnen die Länder mit Niederschlags- und Abflussmodellen.</p>
${h.mini('schwelle')}
<h2>Woher die Warnungen kommen</h2>
<p>Die WSV misst an den Bundeswasserstraßen, die Länder warnen. Bayern veröffentlicht Meldestufen über den ${h.src('hnd-bayern', 'Hochwassernachrichtendienst')}, alle Länder sind über die ${h.src('hochwasserzentralen', 'Hochwasserzentralen')} erreichbar. Am Rhein regeln zusätzlich die ${h.a('hochwassermarken', 'Hochwassermarken')} die Schifffahrt; sie sagen nichts darüber, ob ein Keller nass wird.</p>`,
    faqs: (h) => [
      { q: 'Wo ist gerade Hochwasser in Deutschland?', a: `Die Rangliste oben zeigt es nach dem Abstand zum mittleren Hochwasser. Ob für Ihren Ort eine Warnung gilt, sagt das Hochwasserportal Ihres Landes. Pegel ohne Kennwerte erscheinen nicht in der Rangliste. Die Werte laden beim Öffnen neu, live von PEGELONLINE.` },
      { q: 'Was bedeutet 100 % in der Rangliste?', a: 'Der Pegel steht genau auf seinem mittleren Hochwasser, also dem Wert, den der Fluss an dieser Stelle in einem typischen Jahr einmal erreicht. 0 % entspricht dem mittleren Niedrigwasser. Der Prozentwert ist ein Vergleichsmaß dieser Seite, kein amtlicher Wert. Er macht Pegel mit verschiedenen Nullpunkten vergleichbar.' },
      { q: 'Kann der Rechner sagen, wann das Wasser bei mir ist?', a: 'Nein. Er schreibt den Anstieg der letzten 24 Stunden geradlinig fort und zeigt, wann ein Wert unter dieser Annahme erreicht wäre. Hochwasser verlaufen selten geradlinig; verbindlich sind die Vorhersagen der Länder. Er ist ein Hilfsmittel zum Einordnen. Für Entscheidungen zählen die amtlichen Vorhersagen.' },
    ],
  },
  en: {
    slug: 'flood-levels-now', nav: 'Flood levels now', card: 'Which gauges are highest right now',
    title: 'Flood Levels Now in Germany: Which Gauges Are Highest Today',
    description: 'Flood levels now in Germany: gauges on six rivers ranked by distance to mean high water, with time, 24-hour trend and a calculator for your own level.',
    h1: 'Flood levels now: the highest gauges compared',
    intro: () => `Flood levels now: ${R('verdikt', 'en')} Relative to its reference values, the highest gauge right now is ${R('top', 'en')}.`,
    resume: (h) => `Whether a river is in flood cannot be read from the bare number, because every gauge has its own zero. This page therefore compares gauges by where they sit between mean low water (MNW) and mean high water (MHW): 0% means the gauge is at MNW, 100% means it has reached mean high water, and anything above means more water than at a typical yearly flood. Right now ${R('ueber', 'en')} of ${h.n(STATS.mitKenn)} gauges with reference values are above MHW and ${R('ueberM1', 'en')} above a flood mark I; the ranking above and these figures are read live from PEGELONLINE when the page opens. The ranking does not replace a warning: alert stages, forecasts and advice for residents come from the federal states, collected in the cross-state flood portal. If you want to know when a given level might be reached, a calculator further down extends the trend of the last 24 hours in a straight line.`,
    body: (h) => `<h2>Flood levels now: how to read the ranking</h2>
<p>The percentage is a comparison measure, not an official value. It makes a gauge at Passau, with mean water around ${h.cm(h.k('PASSAU DONAU').mw!)}, comparable with one at Dresden, where mean water is ${h.cm(h.k('DRESDEN').mw!)}. Gauges without MNW and MHW, such as the tidal gauges at Hamburg and Bremen or the upper gauges at the Moselle locks, do not appear in the ranking.</p>
${h.t('<p>Welche Pegel gerade über ihrem mittleren Hochwasser stehen, zeigt die Rangliste oben; sie wird beim Öffnen der Seite live gelesen und ändert sich mit jeder Messung.</p>', '<p>Which gauges are above their mean high water right now is shown by the ranking above; it is read live when the page opens and changes with every reading.</p>')}
<h2>When would a given level be reached?</h2>
<p>The calculator takes the current reading and the rise over the last 24 hours and extends both in a straight line. That is not a forecast: a flood wave rarely rises evenly, and it can crest at any time. The states produce forecasts with rainfall and runoff models.</p>
${h.mini('schwelle')}
<h2>Where warnings come from</h2>
<p>The WSV measures on the federal waterways; the states issue warnings. Bavaria publishes alert stages through its ${h.src('hnd-bayern', 'flood information service')}, and every state is reachable via the ${h.src('hochwasserzentralen', 'state flood centres')}. On the Rhine the ${h.a('hochwassermarken', 'flood marks')} also govern shipping; they say nothing about whether a cellar will flood.</p>`,
    faqs: (h) => [
      { q: 'Where is there flooding in Germany right now?', a: `The ranking above shows it by distance to mean high water. Whether a warning applies to your area is up to your state's flood portal. Gauges without reference values do not appear in the ranking. The values reload live from PEGELONLINE each time you open the page.` },
      { q: 'What does 100% mean in the ranking?', a: 'The gauge stands exactly at its mean high water, the level the river reaches at that spot once in a typical year. 0% corresponds to mean low water. The percentage is a comparison measure of this site, not an official value.' },
      { q: 'Can the calculator tell when the water will reach me?', a: 'No. It extends the rise of the last 24 hours in a straight line and shows when a level would be reached under that assumption. Floods rarely move in straight lines; the states’ forecasts are binding. It is an aid for putting numbers in context.' },
    ],
  },
});
