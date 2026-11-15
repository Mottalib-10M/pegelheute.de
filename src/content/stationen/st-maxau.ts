import { definePage } from '../../lib/page-types';

const A = 'MAXAU';
export default definePage({
  id: 'st-maxau', kind: 'station', ref: 'maxau', order: 1, tool: 'pegel',
  related: ['st-mainz', 'fl-rhein', 'hochwassermarken', 'pegel-lesen'],
  sources: ['pegelonline', 'rheinschpv', 'hochwasserzentralen', 'pegelonline-api'],
  de: {
    slug: 'maxau', nav: 'Pegel Maxau', card: 'Oberrhein bei Karlsruhe: Wert und Marken',
    title: 'Pegel Maxau aktuell: Oberrhein bei Karlsruhe heute',
    description: 'Pegel Maxau aktuell: Rheinwasserstand bei Karlsruhe mit Uhrzeit, Tendenz 24 h, Abstand zu Mittelwasser, Hochwassermarken I und II und Verlauf von 30 Tagen.',
    h1: 'Pegel Maxau aktuell: der Oberrhein bei Karlsruhe',
    intro: (h) => { const s = h.k(A); return `Pegel Maxau aktuell: ${h.vv(s)} am Rhein-km ${h.n(s.km!, 1)}, gemessen ${h.wt(s)}, ${h.trend(A)} in 24 Stunden.`; },
    resume: (h) => { const s = h.k(A); return `Maxau ist der Rheinpegel von Karlsruhe und der Richtpegel für die Hochwassermarken zwischen den Schleusen Iffezheim und Germersheim. Seine Zahlen wirken hoch: Das Mittelwasser liegt hier bei ${h.cm(s.mw!)}, mehr als in Köln (${h.cm(h.k('KÖLN').mw!)}), weil jeder Pegel seinen eigenen Nullpunkt hat. Aktuell zeigt Maxau ${h.vv(s)} (Stand: ${h.wt(s)}), ${h.lage(A)}. Unter ${h.cm(s.mnw!)} ist der Oberrhein niedriger als im typischen Jahrestief, über ${h.cm(s.mhw!)} höher als beim typischen Jahreshochwasser. Ab ${h.cm(s.m1!)} gelten für Schiffe Fahrt in Strommitte und höchstens 20 km/h, ab ${h.cm(s.m2!)} ist die Schifffahrt auf dem Abschnitt verboten. Der höchste bekannte Stand liegt bei ${h.cm(s.hhw!)}. Den Abstand zu all diesen Werten rechnet das Werkzeug oben für den aktuellen Wert aus, mit Uhrzeit der Messung.`; },
    body: (h) => { const s = h.k(A), r = h.st(A); return `<h2>Pegel Maxau aktuell lesen</h2>
<p>Wer aus Köln oder Kaub kommt, erschrickt bei Maxau oft: ${h.vv(s)} klingen nach viel Wasser. Entscheidend ist der Vergleich mit den eigenen Kennwerten der Station. In Maxau liegt sogar der gleichwertige Wasserstand, ein Niedrigwasser-Bezug für die Schifffahrt, bei ${h.cm(s.glw!)}; in Kaub sind es ${h.cm(h.k('KAUB').glw!)}.</p>
${h.kenn(A)}
<h2>Hochwasser am Oberrhein</h2>
<p>Den höchsten Stand verzeichnet PEGELONLINE für den ${h.date(r.occ.HHW[0])} mit ${h.cm(s.hhw!)}; das sind nur ${h.cm(s.hhw! - s.m2!)} über der Marke II. Die Spanne zwischen Mittelwasser und Höchststand ist in Maxau kleiner als am Niederrhein: ${h.cm(s.hhw! - s.mw!)}, in Köln ${h.cm(h.k('KÖLN').hhw! - h.k('KÖLN').mw!)}. Warnungen für Karlsruhe und die Rheinauen gibt die Hochwasservorhersagezentrale Baden-Württemberg heraus, erreichbar über die ${h.src('hochwasserzentralen', 'Hochwasserzentralen')}.</p>
<h2>Die letzten 30 Tage</h2>
<p>In den letzten 30 Tagen reichten die 2-Stunden-Mittel von ${h.lo(A)} bis ${h.hi(A)}. Stromab folgen Speyer und Mannheim, dann ${h.stLink('mainz')} hinter der Mainmündung.</p>`; },
    faqs: (h) => { const s = h.k(A); return [
      { q: 'Warum sind die Werte in Maxau so hoch?', a: `Weil der Nullpunkt der Latte in Maxau tiefer unter dem üblichen Wasserspiegel liegt als anderswo. Der Wert ist eine Ablesung, keine Tiefe. Normal ist in Maxau ein Stand um ${h.cm(s.mw!)}, das Mittelwasser der Jahre 2010 bis 2020. Vergleichen Sie immer mit den Kennwerten.` },
      { q: 'Ab welchem Pegel Maxau ist die Schifffahrt gesperrt?', a: `Ab ${h.cm(s.m2!)}, der Hochwassermarke II, zwischen den Schleusen Iffezheim und Germersheim. Ab ${h.cm(s.m1!)} (Marke I) müssen Schiffe bereits in der Strommitte fahren und dürfen höchstens 20 km/h schnell sein. Fähren dürfen weiter übersetzen. Für Anwohner gelten die Warnungen des Landes.` },
      { q: 'Welcher Wasserspiegel entspricht dem Pegel Maxau?', a: `Der Nullpunkt liegt bei ${h.n(s.pnp!, 2)} m über NHN. Ein Stand von ${h.cm(s.mw!)} entspricht also einem Wasserspiegel von ${h.n(Math.round(s.pnp! * 100 + s.mw!) / 100, 2)} m über NHN. Die Tiefe des Rheins ergibt sich daraus nicht, denn die Flusssohle liegt an jeder Stelle anders. Der Rechner im Ratgeber „Pegel richtig lesen“ macht diese Umrechnung für jeden Wert.` },
    ]; },
  },
  en: {
    slug: 'maxau', nav: 'Maxau gauge', card: 'Upper Rhine at Karlsruhe: reading and marks',
    title: 'Maxau Rhine Level Today: Pegel Maxau near Karlsruhe',
    description: 'Maxau Rhine level today: the Upper Rhine reading at Karlsruhe with its time, 24-hour trend, distance to mean water, flood marks I and II and the last 30 days.',
    h1: 'Maxau Rhine level today: the Upper Rhine at Karlsruhe',
    intro: (h) => { const s = h.k(A); return `Maxau Rhine level today: ${h.vv(s)} at Rhine km ${h.n(s.km!, 1)}, read at ${h.wt(s)}, ${h.trend(A)} over 24 hours.`; },
    resume: (h) => { const s = h.k(A); return `Maxau is the Rhine gauge of Karlsruhe and the reference gauge for the flood marks between the Iffezheim locks and Germersheim. Its numbers look high: mean water here is ${h.cm(s.mw!)}, more than at Cologne (${h.cm(h.k('KÖLN').mw!)}), because every gauge has its own zero. Maxau currently reads ${h.vv(s)} (as of ${h.wt(s)}), ${h.lage(A)}. Below ${h.cm(s.mnw!)} the Upper Rhine is lower than at a typical yearly low, above ${h.cm(s.mhw!)} higher than at a typical yearly flood. From ${h.cm(s.m1!)} vessels must keep to mid-river at no more than 20 km/h, and from ${h.cm(s.m2!)} navigation on the section is prohibited. The highest level on record is ${h.cm(s.hhw!)}. The tool above works out the distance to each of these values for the current reading, with the time it was measured.`; },
    body: (h) => { const s = h.k(A), r = h.st(A); return `<h2>Reading the Maxau Rhine level today</h2>
<p>People used to Cologne or Kaub are often startled by Maxau: ${h.vv(s)} sounds like a lot of water. What counts is the comparison with the station's own reference values. At Maxau even the equivalent low water level, a low-water reference for shipping, is ${h.cm(s.glw!)}; at Kaub it is ${h.cm(h.k('KAUB').glw!)}.</p>
${h.kenn(A)}
<h2>Floods on the Upper Rhine</h2>
<p>PEGELONLINE records the highest level on ${h.date(r.occ.HHW[0])} at ${h.cm(s.hhw!)}, only ${h.cm(s.hhw! - s.m2!)} above mark II. The range between mean water and the record is smaller at Maxau than on the Lower Rhine: ${h.cm(s.hhw! - s.mw!)}, against ${h.cm(h.k('KÖLN').hhw! - h.k('KÖLN').mw!)} at Cologne. Warnings for Karlsruhe and the Rhine meadows come from the Baden-Württemberg flood forecasting centre, reachable through the ${h.src('hochwasserzentralen', 'state flood centres')}.</p>
<h2>The last 30 days</h2>
<p>Over the last 30 days the 2-hour means ranged from ${h.lo(A)} to ${h.hi(A)}. Downstream come Speyer and Mannheim, then ${h.stLink('mainz', 'Mainz')} below the mouth of the Main.</p>`; },
    faqs: (h) => { const s = h.k(A); return [
      { q: 'Why are the readings at Maxau so high?', a: `Because the zero of the staff at Maxau sits further below the usual water surface than elsewhere. The value is a reading, not a depth. Normal at Maxau is a level around ${h.cm(s.mw!)}, the mean water of 2010 to 2020.` },
      { q: 'At what Maxau reading is shipping stopped?', a: `At ${h.cm(s.m2!)}, flood mark II, between the Iffezheim locks and Germersheim. From ${h.cm(s.m1!)} (mark I) vessels must already keep to mid-river at no more than 20 km/h. Ferries may keep crossing. Residents go by the warnings of their state, not by the shipping marks.` },
      { q: 'What water surface height matches the Maxau reading?', a: `The gauge datum is ${h.n(s.pnp!, 2)} m above sea level. A reading of ${h.cm(s.mw!)} therefore means a water surface at ${h.n(Math.round(s.pnp! * 100 + s.mw!) / 100, 2)} m above sea level. The depth of the Rhine does not follow from it, because the riverbed lies differently at each spot. The calculator in the guide on reading a gauge does this conversion for any value.` },
    ]; },
  },
});
