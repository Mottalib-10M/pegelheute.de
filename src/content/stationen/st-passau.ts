import { definePage } from '../../lib/page-types';

const A = 'PASSAU DONAU';
export default definePage({
  id: 'st-passau', kind: 'station', ref: 'passau', order: 11, tool: 'pegel',
  related: ['fl-donau', 'hochwasser-aktuell', 'hochwassermarken', 'pegel-lesen'],
  sources: ['pegelonline', 'hnd-bayern', 'hochwasserzentralen', 'pegelonline-api'],
  de: {
    slug: 'passau', nav: 'Pegel Passau', card: 'Donau in Passau: Wert, Hochwasser 1954 und 2013',
    title: 'Pegel Passau aktuell: Donau in Passau heute und Tendenz',
    description: 'Pegel Passau aktuell: Donauwasserstand mit Uhrzeit, Tendenz über 24 Stunden, Abstand zu Mittelwasser und Schifffahrtsgrenze, Rekorde von 1954 und 2013.',
    h1: 'Pegel Passau aktuell: die Donau in Passau heute',
    intro: (h) => { const s = h.k(A); return `Pegel Passau aktuell: ${h.cm(s.v)} an der Donau, gemessen ${h.when(s.t)}, ${h.trend(A)} in 24 Stunden.`; },
    resume: (h) => { const s = h.k(A), r = h.st(A), i = h.k('PASSAU ILZSTADT'); return `In Passau fließen Inn und Ilz in die Donau, und PEGELONLINE führt dort zwei Donaupegel: Passau Donau am Donau-km ${h.n(s.km!, 1)} und Passau Ilzstadt am km ${h.n(i.km!, 1)}, der in der Momentaufnahme ${h.cm(i.v)} zeigte. Die Kilometer zählen an der Donau von der Mündung ins Schwarze Meer aufwärts. Am Pegel Passau Donau stand das Wasser bei ${h.cm(s.v)}, ${h.lage(A)}; das Mittelwasser der Jahre 2010 bis 2020 liegt bei ${h.cm(s.mw!)}, das mittlere Hochwasser bei ${h.cm(s.mhw!)}. Den höchsten bekannten Stand von ${h.cm(s.hhw!)} verzeichnet PEGELONLINE zweimal, ${h.date(r.occ.HHW[0])} und ${h.date(r.occ.HHW[1])}. Ab ${h.cm(s.hsw!)}, dem höchsten Schifffahrtswasserstand, ist die Schifffahrt auf der Donau eingeschränkt. Die Meldestufen für Passau und die Vorhersagen gibt der Hochwassernachrichtendienst Bayern heraus; dieses Werkzeug zeigt nur den gemessenen Wert.`; },
    body: (h) => { const s = h.k(A), r = h.st(A), hk = h.k('HOFKIRCHEN'); return `<h2>Pegel Passau aktuell und Hofkirchen stromauf</h2>
<p>Ein Donauhochwasser in Passau kündigt sich in Hofkirchen an, rund ${h.n(Math.round(hk.km! - s.km!))} Kilometer stromauf. Dort zeigte die Momentaufnahme ${h.cm(hk.v)} bei einem Mittelwasser von ${h.cm(hk.mw!)}. Das Wasser des Inns misst PEGELONLINE nicht; für Inn und Ilz sind die bayerischen Pegel des ${h.src('hnd-bayern', 'Hochwassernachrichtendienstes')} zuständig.</p>
${h.kenn(A)}
<h2>1954 und 2013: zweimal derselbe Rekord</h2>
<p>Am ${h.date(r.occ.HHW[0])} und am ${h.date(r.occ.HHW[1])} erreichte die Donau ${h.cm(s.hhw!)}. Das sind ${h.cm(s.hhw! - s.mw!)} über dem Mittelwasser und ${h.cm(s.hhw! - s.hsw!)} über dem höchsten Schifffahrtswasserstand. Was die Meldestufen bedeuten, erklärt ${h.a('hochwassermarken', 'Hochwassermarken und Meldestufen')}.</p>
<h2>Niedrigwasser und 30-Tage-Verlauf</h2>
<p>Den niedrigsten Stand von ${h.cm(s.nnw!)} verzeichnet PEGELONLINE am ${h.date(r.occ.NNW[0])}. In den 30 Tagen vor der Momentaufnahme reichten die Messwerte von ${h.cm(r.min30!)} bis ${h.cm(r.max30!)}. Alle Donaupegel von Ingolstadt bis nach Österreich stehen auf ${h.a('fl-donau', 'Pegel an der Donau')}.</p>`; },
    faqs: (h) => { const s = h.k(A), r = h.st(A); return [
      { q: 'Wie hoch war die Donau in Passau 2013?', a: `${h.cm(s.hhw!)} am ${h.date(r.occ.HHW[1])}, gleich hoch wie am ${h.date(r.occ.HHW[0])}. Das mittlere Hochwasser liegt bei ${h.cm(s.mhw!)}. In der Altstadt standen damals ganze Straßenzüge unter Wasser. Der Wert gilt für den Pegel Passau Donau; der Pegel Ilzstadt nennt einen etwas anderen Höchststand, weil er an einer anderen Stelle misst und einen eigenen Nullpunkt hat.` },
      { q: 'Ab welchem Pegel ruht die Schifffahrt in Passau?', a: `Der höchste Schifffahrtswasserstand am Pegel Passau Donau beträgt ${h.cm(s.hsw!)}. Darüber gelten Einschränkungen; die verbindlichen Regeln stehen in den Schifffahrtsvorschriften und in ELWIS. Für Anwohner sind diese Werte nicht gedacht: Ob die Altstadt überflutet wird, sagen die Meldestufen des Hochwassernachrichtendienstes Bayern, die an anderen Zahlen hängen.` },
      { q: 'Warum hat Passau zwei Donaupegel?', a: 'Passau Donau und Passau Ilzstadt liegen an verschiedenen Stellen der Altstadt, vor und nach der Einmündung von Inn und Ilz. Jeder hat eigene Kennwerte; vergleichen Sie einen Wert nur mit denen seiner Station. Der Inn bringt oft mehr Wasser als die Donau selbst, deshalb können beide Pegel bei Hochwasser unterschiedlich reagieren.' },
    ]; },
  },
  en: {
    slug: 'passau', nav: 'Passau gauge', card: 'Danube at Passau: reading, 1954 and 2013 floods',
    title: 'Passau Danube Level Today: Pegel Passau, Trend, Records',
    description: 'Passau Danube level today: the reading with its time, 24-hour trend, distance to mean water and the navigation limit, the 1954 and 2013 records, 30 days.',
    h1: 'Passau Danube level today (Pegel Passau)',
    intro: (h) => { const s = h.k(A); return `Passau Danube level today: ${h.cm(s.v)}, read at ${h.when(s.t)}, ${h.trend(A)} over 24 hours.`; },
    resume: (h) => { const s = h.k(A), r = h.st(A), i = h.k('PASSAU ILZSTADT'); return `At Passau the Inn and the Ilz flow into the Danube, and PEGELONLINE lists two Danube gauges there: Passau Donau at Danube km ${h.n(s.km!, 1)} and Passau Ilzstadt at km ${h.n(i.km!, 1)}, which read ${h.cm(i.v)} in the snapshot. Danube kilometres are counted upstream from the mouth at the Black Sea. At the Passau Donau gauge the water stood at ${h.cm(s.v)}, ${h.lage(A)}; mean water over 2010 to 2020 is ${h.cm(s.mw!)} and mean high water ${h.cm(s.mhw!)}. PEGELONLINE lists the highest known level of ${h.cm(s.hhw!)} twice, on ${h.date(r.occ.HHW[0])} and ${h.date(r.occ.HHW[1])}. From ${h.cm(s.hsw!)}, the highest navigable water level, navigation on the Danube is restricted. Alert stages and forecasts for Passau come from the Bavarian flood information service; this tool shows only the measured value.`; },
    body: (h) => { const s = h.k(A), r = h.st(A), hk = h.k('HOFKIRCHEN'); return `<h2>Passau Danube level today and Hofkirchen upstream</h2>
<p>A Danube flood at Passau shows up first at Hofkirchen, some ${h.n(Math.round(hk.km! - s.km!))} kilometres upstream. There the snapshot read ${h.cm(hk.v)} against a mean water of ${h.cm(hk.mw!)}. PEGELONLINE does not measure the Inn; for the Inn and the Ilz the Bavarian gauges of the ${h.src('hnd-bayern', 'flood information service')} apply.</p>
${h.kenn(A)}
<h2>1954 and 2013: the same record twice</h2>
<p>On ${h.date(r.occ.HHW[0])} and on ${h.date(r.occ.HHW[1])} the Danube reached ${h.cm(s.hhw!)}. That is ${h.cm(s.hhw! - s.mw!)} above mean water and ${h.cm(s.hhw! - s.hsw!)} above the highest navigable level. What the alert stages mean is explained in ${h.a('hochwassermarken', 'flood marks and alert stages')}.</p>
<h2>Low water and the 30-day curve</h2>
<p>PEGELONLINE records the lowest level, ${h.cm(s.nnw!)}, on ${h.date(r.occ.NNW[0])}. In the 30 days before the snapshot the readings ranged from ${h.cm(r.min30!)} to ${h.cm(r.max30!)}. Every Danube gauge from Ingolstadt into Austria is listed on ${h.a('fl-donau', 'Danube gauges')}.</p>`; },
    faqs: (h) => { const s = h.k(A), r = h.st(A); return [
      { q: 'How high was the Danube at Passau in 2013?', a: `${h.cm(s.hhw!)} on ${h.date(r.occ.HHW[1])}, the same as on ${h.date(r.occ.HHW[0])}. Mean high water is ${h.cm(s.mhw!)}. Whole streets of the old town were under water. The value applies to the Passau Donau gauge; the Ilzstadt gauge gives a slightly different record because it measures at another spot with its own zero.` },
      { q: 'At what Passau reading does shipping stop?', a: `The highest navigable water level at the Passau Donau gauge is ${h.cm(s.hsw!)}. Above it restrictions apply; the binding rules are in the shipping regulations and in ELWIS. These values are not meant for residents: whether the old town floods is told by the Bavarian alert stages, which hang on other numbers.` },
      { q: 'Why does Passau have two Danube gauges?', a: 'Passau Donau and Passau Ilzstadt sit at different points of the old town, before and after the Inn and the Ilz join. Each has its own reference values; compare a reading only with those of its station. The Inn often carries more water than the Danube itself.' },
    ]; },
  },
});
