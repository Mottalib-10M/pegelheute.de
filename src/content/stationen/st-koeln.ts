import { definePage } from '../../lib/page-types';

const A = 'KÖLN';
export default definePage({
  id: 'st-koeln', kind: 'station', ref: 'koeln', order: 6, tool: 'pegel',
  related: ['st-bonn', 'st-duesseldorf', 'fl-rhein', 'hochwassermarken'],
  sources: ['pegelonline', 'rheinschpv', 'hochwasserzentralen', 'elwis'],
  de: {
    slug: 'koeln', nav: 'Pegel Köln', card: 'Rhein-km 688: Wert, Tendenz, Marken I und II',
    title: 'Pegel Köln aktuell: Rheinpegel heute, Tendenz, Marken',
    description: 'Pegel Köln aktuell: Wasserstand des Rheins am km 688 mit Uhrzeit, Tendenz über 24 Stunden, Abstand zu Mittelwasser, Hochwassermarke I und II und Verlauf.',
    h1: 'Pegel Köln aktuell: der Rhein in Köln heute',
    intro: (h) => { const s = h.k(A); return `Pegel Köln aktuell: ${h.cm(s.v)} am Rhein-km 688, gemessen ${h.when(s.t)}, ${h.trend(A)} in 24 Stunden.`; },
    resume: (h) => { const s = h.k(A); return `Der Kölner Pegel steht am Rhein-km 688; PEGELONLINE führt ihn unter dem WSV-Standort Köln. In der Momentaufnahme zeigte er ${h.cm(s.v)}, das ist ${h.lage(A)}; das Mittelwasser der Jahre 2010 bis 2020 liegt bei ${h.cm(s.mw!)}, das mittlere Niedrigwasser bei ${h.cm(s.mnw!)}, das mittlere Hochwasser bei ${h.cm(s.mhw!)}. Für die Schifffahrt ist Köln Richtpegel für den Abschnitt Mondorf bis Dormagen: Ab ${h.cm(s.m1!)} gilt Hochwassermarke I mit Fahrt in Strommitte und höchstens 20 km/h, ab ${h.cm(s.m2!)} ist die Schifffahrt dort verboten. Der höchste bekannte Stand in PEGELONLINE beträgt ${h.cm(s.hhw!)}. Ein Pegelwert ist keine Wassertiefe: Der Nullpunkt der Kölner Latte liegt bei ${h.n(s.pnp!, 2)} m über NHN, der Wasserspiegel lag damit bei rund ${h.n(Math.round(s.pnp! * 100 + s.v) / 100, 2)} m. Warnungen für Köln gibt das Land Nordrhein-Westfalen heraus; dieses Werkzeug misst nur.`; },
    body: (h) => { const s = h.k(A), r = h.st(A); return `<h2>Pegel Köln aktuell einordnen</h2>
<p>Köln ist der meistgesuchte Pegel am Rhein, und er wird oft falsch gelesen. Ein Wert von ${h.cm(s.v)} heißt nicht, dass dort ${h.cm(s.v)} Wasser stehen: Die Fahrrinne ist bei gleichwertigem Wasserstand (${h.cm(s.glw!)}) noch ${h.cm(s.tu!)} tief. Was der Wert sagt, steht in der Tabelle: wie weit er von den langjährigen Mitteln und den Marken entfernt ist.</p>
${h.kenn(A)}
<h2>Zwischen Bonn und Düsseldorf</h2>
<p>Köln liegt zwischen ${h.stLink('bonn')} (Rhein-km ${h.n(h.k('BONN').km!, 1)}) und ${h.stLink('duesseldorf')} (km ${h.n(h.k('DÜSSELDORF').km!, 1)}). Eine Welle aus dem Oberrhein oder der Mosel erreicht Bonn vor Köln; wer in Köln wissen will, was kommt, schaut deshalb auch auf Bonn und weiter oben auf ${h.stLink('koblenz')}. Der 30-Tage-Verlauf oben zeigt, ob der Rhein in Köln zuletzt gestiegen oder gefallen ist; die einzelnen Messwerte dieser 30 Tage reichten von ${h.cm(r.min30!)} bis ${h.cm(r.max30!)}.</p>
<h2>Hochwasser und Niedrigwasser in Köln</h2>
<p>Den höchsten Stand führt PEGELONLINE mit ${h.cm(s.hhw!)} vom ${h.date(r.occ.HHW[0])}, den niedrigsten mit ${h.cm(s.nnw!)} vom ${h.date(r.occ.NNW[0])}. Zwischen beiden liegen ${h.m(s.hhw! - s.nnw!)}. Für Anwohner zählen die Schutzmaßnahmen der Stadt, nicht die Schifffahrtsmarken; Warnungen kommen aus dem Hochwasserportal des Landes Nordrhein-Westfalen, das Sie über die Hochwasserzentralen erreichen.</p>`; },
    faqs: (h) => { const s = h.k(A); return [
      { q: 'Welcher Pegelstand ist in Köln normal?', a: `Das Mittel aller Tageswerte von 2010 bis 2020 liegt am Pegel Köln bei ${h.cm(s.mw!)}. Unter ${h.cm(s.mnw!)} ist der Rhein niedriger als im typischen Jahrestief, über ${h.cm(s.mhw!)} höher als beim typischen Jahreshochwasser. Das Werkzeug ordnet den aktuellen Wert ein.` },
      { q: 'Ab wann wird die Schifffahrt in Köln gesperrt?', a: `Ab ${h.cm(s.m2!)} am Pegel Köln, der Hochwassermarke II. Dann ist die Schifffahrt zwischen Mondorf und Dormagen verboten, außer dem Übersetzverkehr. Ab ${h.cm(s.m1!)} (Marke I) gelten bereits Fahrt in Strommitte und höchstens 20 km/h (RheinSchPV § 10.01). Fähren dürfen weiter fahren.` },
      { q: 'Wie tief ist der Rhein in Köln bei niedrigem Pegel?', a: `Die Fahrrinne ist beim gleichwertigen Wasserstand von ${h.cm(s.glw!)} noch ${h.cm(s.tu!)} tief. Steht der Pegel darunter, wird sie entsprechend flacher; das Werkzeug rechnet die Näherung für den aktuellen Wert aus. Maßgeblich sind die Angaben der WSV in ELWIS. Der Rechner oben zeigt die Näherung.` },
    ]; },
  },
  en: {
    slug: 'cologne', nav: 'Cologne gauge', card: 'Rhine km 688: reading, trend, marks I and II',
    title: 'Cologne Rhine Level Today: Pegel Köln, Trend and Marks',
    description: 'Cologne Rhine level today: the Pegel Köln reading at Rhine km 688 with its time, 24-hour trend, distance to mean water, flood marks I and II and a 30-day curve.',
    h1: 'Cologne Rhine level today (Pegel Köln)',
    intro: (h) => { const s = h.k(A); return `Cologne Rhine level today: ${h.cm(s.v)} at Rhine km 688, read at ${h.when(s.t)}, ${h.trend(A)} over 24 hours.`; },
    resume: (h) => { const s = h.k(A); return `The Cologne gauge stands at Rhine km 688; PEGELONLINE lists it under the WSV's Cologne office. In the snapshot it read ${h.cm(s.v)}, which is ${h.lage(A)}; mean water over 2010 to 2020 is ${h.cm(s.mw!)}, mean low water ${h.cm(s.mnw!)} and mean high water ${h.cm(s.mhw!)}. For shipping, Cologne is the reference gauge for the section from Mondorf to Dormagen: from ${h.cm(s.m1!)} flood mark I applies, with vessels in mid-river at no more than 20 km/h, and from ${h.cm(s.m2!)} navigation there is prohibited. The highest level on record in PEGELONLINE is ${h.cm(s.hhw!)}. A reading is not a depth: the zero of the Cologne staff lies ${h.n(s.pnp!, 2)} m above sea level, so the water surface stood at about ${h.n(Math.round(s.pnp! * 100 + s.v) / 100, 2)} m.`; },
    body: (h) => { const s = h.k(A), r = h.st(A); return `<h2>Reading the Cologne Rhine level today</h2>
<p>Cologne is the most searched gauge on the Rhine, and it is often misread. A reading of ${h.cm(s.v)} does not mean ${h.cm(s.v)} of water: at the equivalent low water level (${h.cm(s.glw!)}) the fairway is still ${h.cm(s.tu!)} deep. What the reading does tell you is in the table: how far it sits from the long-term means and from the marks.</p>
${h.kenn(A)}
<h2>Between Bonn and Düsseldorf</h2>
<p>Cologne lies between ${h.stLink('bonn', 'Bonn')} (Rhine km ${h.n(h.k('BONN').km!, 1)}) and ${h.stLink('duesseldorf', 'Düsseldorf')} (km ${h.n(h.k('DÜSSELDORF').km!, 1)}). A wave from the Upper Rhine or the Moselle reaches Bonn before Cologne, so anyone in Cologne who wants to know what is coming also watches Bonn and, further up, ${h.stLink('koblenz', 'Koblenz')}. The 30-day curve above shows whether the river recently rose or fell; the individual readings over those 30 days ranged from ${h.cm(r.min30!)} to ${h.cm(r.max30!)}.</p>
<h2>Floods and low water in Cologne</h2>
<p>PEGELONLINE lists the highest level as ${h.cm(s.hhw!)} on ${h.date(r.occ.HHW[0])} and the lowest as ${h.cm(s.nnw!)} on ${h.date(r.occ.NNW[0])}, ${h.m(s.hhw! - s.nnw!)} apart. For residents, the city's flood defences matter, not the shipping marks; warnings come from the flood portal of North Rhine-Westphalia, reachable through the state flood centres.</p>`; },
    faqs: (h) => { const s = h.k(A); return [
      { q: 'What is a normal Rhine level in Cologne?', a: `The mean of all daily values from 2010 to 2020 at the Cologne gauge is ${h.cm(s.mw!)}. Below ${h.cm(s.mnw!)} the river is lower than at a typical yearly low; above ${h.cm(s.mhw!)} higher than at a typical yearly flood.` },
      { q: 'When is shipping stopped at Cologne?', a: `At ${h.cm(s.m2!)} on the Cologne gauge, flood mark II. Navigation between Mondorf and Dormagen is then prohibited except for ferries. From ${h.cm(s.m1!)} (mark I) vessels must already keep to mid-river at no more than 20 km/h (RheinSchPV § 10.01).` },
      { q: 'How deep is the Rhine at Cologne when the gauge is low?', a: `At the equivalent low water level of ${h.cm(s.glw!)} the fairway is still ${h.cm(s.tu!)} deep. Below that it becomes correspondingly shallower; the tool works out the approximation for the current reading. The WSV figures in ELWIS are binding. The calculator above shows the approximation.` },
    ]; },
  },
});
