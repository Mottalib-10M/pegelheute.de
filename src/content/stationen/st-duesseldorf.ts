import { definePage } from '../../lib/page-types';

const A = 'DÜSSELDORF';
export default definePage({
  id: 'st-duesseldorf', kind: 'station', ref: 'duesseldorf', order: 7, tool: 'pegel',
  related: ['st-koeln', 'st-emmerich', 'niedrigwasser-rhein', 'fl-rhein'],
  sources: ['pegelonline', 'rheinschpv', 'hochwasserzentralen', 'elwis'],
  de: {
    slug: 'duesseldorf', nav: 'Pegel Düsseldorf', card: 'Niederrhein: Wert, Marken, Niedrigwasser',
    title: 'Pegel Düsseldorf aktuell: Rheinpegel heute und Tendenz',
    description: 'Pegel Düsseldorf aktuell: Rheinwasserstand mit Uhrzeit, Tendenz über 24 Stunden, Einordnung, Fahrrinne, Hochwassermarken I und II und Verlauf von 30 Tagen.',
    h1: 'Pegel Düsseldorf aktuell: der Niederrhein heute',
    intro: (h) => { const s = h.k(A); return `Pegel Düsseldorf aktuell: ${h.vv(s)} am Rhein-km ${h.n(s.km!, 1)}, gemessen ${h.wt(s)}, ${h.trend(A)} in 24 Stunden.`; },
    resume: (h) => { const s = h.k(A); return `Der Düsseldorfer Pegel misst den Niederrhein am km ${h.n(s.km!, 1)} und ist Richtpegel für den Abschnitt Dormagen bis Krefeld. Seine Werte fallen bei Niedrigwasser besonders tief: Das mittlere Niedrigwasser der Jahre 2010 bis 2020 liegt bei ${h.cm(s.mnw!)}, der niedrigste bekannte Stand bei ${h.cm(s.nnw!)}. Aktuell zeigt Düsseldorf ${h.vv(s)} (Stand: ${h.wt(s)}), ${h.lage(A)}. Das Mittelwasser beträgt ${h.cm(s.mw!)}. Bei Hochwasser gilt ab ${h.cm(s.m1!)} die Marke I mit Fahrt in Strommitte und höchstens 20 km/h, ab ${h.cm(s.m2!)} ruht die Schifffahrt zwischen Dormagen und Krefeld. Der Rekord von ${h.cm(s.hhw!)} stammt aus dem Winter 1925/26. Für die Fahrrinne nennt PEGELONLINE einen gleichwertigen Wasserstand von ${h.cm(s.glw!)} und darunter eine Solltiefe von ${h.cm(s.tu!)}; das Werkzeug rechnet daraus die Näherung für den aktuellen Wert.`; },
    body: (h) => { const s = h.k(A), r = h.st(A); return `<h2>Pegel Düsseldorf aktuell bei Niedrigwasser</h2>
<p>Steht der Düsseldorfer Pegel unter dem GlW von ${h.cm(s.glw!)}, ist die Fahrrinne flacher als ihre Solltiefe. Aktuell (Stand: ${h.wt(s)}) liegt er ${h.vs(s, s.glw!)} dem GlW; näherungsweise bleiben ${h.rinne(s)} Fahrrinne. Am Ufer fallen dann Buhnenfelder trocken, und Sandbänke werden sichtbar. Der Ratgeber ${h.a('niedrigwasser-rhein', 'Niedrigwasser am Rhein')} stellt alle Rheinpegel mit GlW nebeneinander.</p>
${h.kenn(A)}
<h2>Hochwassermarken zwischen Dormagen und Krefeld</h2>
<p>Marke I (${h.cm(s.m1!)}) und Marke II (${h.cm(s.m2!)}) liegen in Düsseldorf ${h.cm(s.m2! - s.m1!)} auseinander (${h.src('rheinschpv', 'RheinSchPV § 10.01')}). Der Höchststand von ${h.cm(s.hhw!)} am ${h.date(r.occ.HHW[0])} lag ${h.cm(s.hhw! - s.m2!)} über der Marke II.</p>
<h2>Die letzten 30 Tage</h2>
<p>In den letzten 30 Tagen reichten die 2-Stunden-Mittel von ${h.lo(A)} bis ${h.hi(A)}. Stromauf liegt ${h.stLink('koeln')}, stromab ${h.stLink('emmerich')} an der Grenze.</p>`; },
    faqs: (h) => { const s = h.k(A), r = h.st(A); return [
      { q: 'Was war der niedrigste Pegel in Düsseldorf?', a: `PEGELONLINE führt ${h.cm(s.nnw!)} am ${h.date(r.occ.NNW[0])}. Das mittlere Niedrigwasser der Jahre 2010 bis 2020 beträgt ${h.cm(s.mnw!)}. Damals lagen am Ufer weite Kiesflächen frei, und Schiffe konnten nur einen Teil ihrer Ladung aufnehmen. Ein Stand nahe diesem Wert bedeutet für die Schifffahrt eine deutlich flachere Fahrrinne als ihre Solltiefe.` },
      { q: 'Ab welchem Pegel ist der Rhein bei Düsseldorf gesperrt?', a: `Ab ${h.cm(s.m2!)} am Pegel Düsseldorf, der Hochwassermarke II für den Abschnitt Dormagen bis Krefeld. Fähren dürfen weiter übersetzen. Schon ab Marke I gelten Fahrt in Strommitte und höchstens 20 km/h. Für Anwohner sind die Warnungen des Landes Nordrhein-Westfalen maßgeblich.` },
      { q: 'Wie tief ist die Fahrrinne bei Düsseldorf?', a: `Beim gleichwertigen Wasserstand von ${h.cm(s.glw!)} soll sie ${h.cm(s.tu!)} tief sein. Jeder Zentimeter Pegel darüber oder darunter verändert die Tiefe näherungsweise um einen Zentimeter. Die amtlichen Tiefen veröffentlicht die WSV in ELWIS. Das Werkzeug oben rechnet die Näherung für den aktuellen Pegelwert.` },
    ]; },
  },
  en: {
    slug: 'duesseldorf', nav: 'Düsseldorf gauge', card: 'Lower Rhine: reading, marks, low water',
    title: 'Düsseldorf Rhine Level Today: Pegel Düsseldorf and Trend',
    description: 'Düsseldorf Rhine level today: the Lower Rhine reading with its time, 24-hour trend, rating, fairway depth, flood marks I and II and a curve of 30 days.',
    h1: 'Düsseldorf Rhine level today (Pegel Düsseldorf)',
    intro: (h) => { const s = h.k(A); return `Düsseldorf Rhine level today: ${h.vv(s)} at Rhine km ${h.n(s.km!, 1)}, read at ${h.wt(s)}, ${h.trend(A)} over 24 hours.`; },
    resume: (h) => { const s = h.k(A); return `The Düsseldorf gauge measures the Lower Rhine at km ${h.n(s.km!, 1)} and is the reference gauge for the section from Dormagen to Krefeld. Its readings drop especially low in dry spells: mean low water over 2010 to 2020 is ${h.cm(s.mnw!)} and the lowest level on record ${h.cm(s.nnw!)}. Düsseldorf currently reads ${h.vv(s)} (as of ${h.wt(s)}), ${h.lage(A)}. Mean water is ${h.cm(s.mw!)}. In a flood, mark I applies from ${h.cm(s.m1!)}, with vessels keeping to mid-river at no more than 20 km/h, and from ${h.cm(s.m2!)} shipping stops between Dormagen and Krefeld. The record of ${h.cm(s.hhw!)} dates from the winter of 1925/26. For the fairway PEGELONLINE gives an equivalent low water level of ${h.cm(s.glw!)} and a target depth of ${h.cm(s.tu!)} below it; the tool turns this into an approximation for the current reading.`; },
    body: (h) => { const s = h.k(A), r = h.st(A); return `<h2>Düsseldorf Rhine level today at low water</h2>
<p>When the Düsseldorf gauge is below its GlW of ${h.cm(s.glw!)}, the fairway is shallower than its target depth. It currently stands ${h.vs(s, s.glw!)} it (as of ${h.wt(s)}), leaving roughly ${h.rinne(s)} of fairway. Along the banks the groyne fields dry out and sandbanks appear. The guide ${h.a('niedrigwasser-rhein', 'Rhine low water')} lines up every Rhine gauge with a GlW.</p>
${h.kenn(A)}
<h2>Flood marks between Dormagen and Krefeld</h2>
<p>Mark I (${h.cm(s.m1!)}) and mark II (${h.cm(s.m2!)}) are ${h.cm(s.m2! - s.m1!)} apart at Düsseldorf (${h.src('rheinschpv', 'RheinSchPV § 10.01')}). The record of ${h.cm(s.hhw!)} on ${h.date(r.occ.HHW[0])} was ${h.cm(s.hhw! - s.m2!)} above mark II.</p>
<h2>The last 30 days</h2>
<p>Over the last 30 days the 2-hour means ranged from ${h.lo(A)} to ${h.hi(A)}. Upstream lies ${h.stLink('koeln', 'Cologne')}, downstream ${h.stLink('emmerich', 'Emmerich')} at the border.</p>`; },
    faqs: (h) => { const s = h.k(A), r = h.st(A); return [
      { q: 'What was the lowest level at Düsseldorf?', a: `PEGELONLINE lists ${h.cm(s.nnw!)} on ${h.date(r.occ.NNW[0])}. Mean low water over 2010 to 2020 is ${h.cm(s.mnw!)}. Wide gravel banks lay bare along the shore, and barges could take only part of their cargo. A level near this value means a fairway well below its target depth.` },
      { q: 'At what level is the Rhine closed at Düsseldorf?', a: `From ${h.cm(s.m2!)} on the Düsseldorf gauge, flood mark II for the section from Dormagen to Krefeld. Ferries may keep crossing. From mark I vessels already keep to mid-river at no more than 20 km/h. For residents the warnings of North Rhine-Westphalia apply.` },
      { q: 'How deep is the fairway near Düsseldorf?', a: `At the equivalent low water level of ${h.cm(s.glw!)} it should be ${h.cm(s.tu!)} deep. Each centimetre on the gauge above or below changes the depth by roughly one centimetre. The WSV publishes official depths in ELWIS. The tool above works out the approximation for the current reading.` },
    ]; },
  },
});
