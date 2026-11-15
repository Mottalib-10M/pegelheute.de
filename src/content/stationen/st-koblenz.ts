import { definePage } from '../../lib/page-types';

const A = 'KOBLENZ';
export default definePage({
  id: 'st-koblenz', kind: 'station', ref: 'koblenz', order: 4, tool: 'pegel',
  related: ['st-kaub', 'st-bonn', 'fl-mosel', 'fl-rhein'],
  sources: ['pegelonline', 'rheinschpv', 'hochwasserzentralen', 'elwis'],
  de: {
    slug: 'koblenz', nav: 'Pegel Koblenz', card: 'Rhein am Deutschen Eck, Mosel nebenan',
    title: 'Pegel Koblenz aktuell: Rhein am Deutschen Eck heute',
    description: 'Pegel Koblenz aktuell: Rheinwasserstand in Koblenz mit Uhrzeit, Tendenz über 24 Stunden, Einordnung, Fahrrinne, Marken I und II und Verlauf von 30 Tagen.',
    h1: 'Pegel Koblenz aktuell: der Rhein am Deutschen Eck',
    intro: (h) => { const s = h.k(A); return `Pegel Koblenz aktuell: ${h.vv(s)} am Rhein-km ${h.n(s.km!, 1)}, gemessen ${h.wt(s)}, ${h.trend(A)} in 24 Stunden.`; },
    resume: (h) => { const s = h.k(A); return `In Koblenz trifft die Mosel auf den Rhein, doch der Rheinpegel Koblenz und die Pegel der Mosel sind getrennte Stationen. Der hier gezeigte Wert ist der des Rheins am km ${h.n(s.km!, 1)}. Aktuell steht er bei ${h.vv(s)} (Stand: ${h.wt(s)}), ${h.lage(A)}; das Mittelwasser liegt bei ${h.cm(s.mw!)}, das mittlere Niedrigwasser bei ${h.cm(s.mnw!)}. Koblenz ist Richtpegel für den Abschnitt Bad Salzig bis Engers: Ab ${h.cm(s.m1!)} gilt die Hochwassermarke I, ab ${h.cm(s.m2!)} ist die Schifffahrt dort verboten. Besonders weit ist hier die Spanne der Extreme: Der niedrigste bekannte Stand beträgt ${h.cm(s.nnw!)}, der höchste ${h.cm(s.hhw!)}. Wer wissen will, was bei Hochwasser aus der Mosel kommt, liest zusätzlich die Moselpegel, etwa Cochem oder Trier, auf der Seite der Mosel.`; },
    body: (h) => { const s = h.k(A), r = h.st(A); return `<h2>Pegel Koblenz aktuell: Rhein, nicht Mosel</h2>
<p>Die Suche nach „Pegel Koblenz“ meint oft beides. Für die Mosel führt PEGELONLINE eigene Stationen, die auf der Seite ${h.a('fl-mosel', 'Pegel an der Mosel')} stehen. Der Rheinpegel Koblenz zeigt den Rhein, der aus dem Mittelrheintal kommt; stromauf liegt ${h.stLink('kaub')}, stromab ${h.stLink('bonn')}.</p>
${h.kenn(A)}
<h2>Niedrigwasser und Hochwasser in Koblenz</h2>
<p>Am ${h.date(r.occ.NNW[0])} fiel der Rhein in Koblenz auf ${h.cm(s.nnw!)}, den niedrigsten Stand in PEGELONLINE; am ${h.date(r.occ.HHW[0])} erreichte er ${h.cm(s.hhw!)}. Zwischen Marke I und Marke II liegen ${h.cm(s.m2! - s.m1!)}. Die Fahrrinne ist beim gleichwertigen Wasserstand von ${h.cm(s.glw!)} noch ${h.cm(s.tu!)} tief; das Werkzeug oben rechnet die Näherung für den aktuellen Wert.</p>
<h2>Die letzten 30 Tage</h2>
<p>In den letzten 30 Tagen lagen die 2-Stunden-Mittel zwischen ${h.lo(A)} und ${h.hi(A)}. Für Warnungen ist das Land Rheinland-Pfalz zuständig, erreichbar über die ${h.src('hochwasserzentralen', 'Hochwasserzentralen')}.</p>`; },
    faqs: (h) => { const s = h.k(A); return [
      { q: 'Zeigt der Pegel Koblenz den Rhein oder die Mosel?', a: `Den Rhein, am Rhein-km ${h.n(s.km!, 1)}. Die Mosel hat eigene Pegel in PEGELONLINE, die auf unserer Moselseite aufgeführt sind. Bei Hochwasser lohnt es sich, beide zu lesen, weil die Mosel den Rhein unterhalb von Koblenz zusätzlich anhebt. Die Moselpegel sind getrennt.` },
      { q: 'Wann ist am Pegel Koblenz Hochwassermarke II erreicht?', a: `Bei ${h.cm(s.m2!)}. Dann ist die Schifffahrt zwischen Bad Salzig und Engers verboten. Ab ${h.cm(s.m1!)}, der Marke I, gelten Fahrt in Strommitte und höchstens 20 km/h. Für Anwohner am Deutschen Eck gelten die Warnungen des Landes Rheinland-Pfalz, nicht die Marken für Schiffe.` },
      { q: 'Wie niedrig war der Rhein in Koblenz schon?', a: `Der niedrigste bekannte Stand in PEGELONLINE beträgt ${h.cm(s.nnw!)}. Das mittlere Niedrigwasser der Jahre 2010 bis 2020 liegt bei ${h.cm(s.mnw!)}. Bei so niedrigen Ständen werden im Rhein bei Koblenz Felsen und Kiesbänke sichtbar, und Schiffe dürfen nur einen Teil ihrer Ladung aufnehmen. Das Werkzeug oben zeigt, wie weit der aktuelle Wert davon entfernt ist.` },
    ]; },
  },
  en: {
    slug: 'koblenz', nav: 'Koblenz gauge', card: 'Rhine at the Deutsches Eck, Moselle next door',
    title: 'Koblenz Rhine Level Today: Pegel Koblenz, Trend, Marks',
    description: 'Koblenz Rhine level today: the reading with its time, 24-hour trend, rating, fairway depth, flood marks I and II and a 30-day curve at the Moselle confluence.',
    h1: 'Koblenz Rhine level today (Pegel Koblenz)',
    intro: (h) => { const s = h.k(A); return `Koblenz Rhine level today: ${h.vv(s)} at Rhine km ${h.n(s.km!, 1)}, read at ${h.wt(s)}, ${h.trend(A)} over 24 hours.`; },
    resume: (h) => { const s = h.k(A); return `At Koblenz the Moselle meets the Rhine, but the Koblenz Rhine gauge and the Moselle gauges are separate stations. The value shown here is the Rhine at km ${h.n(s.km!, 1)}. It currently reads ${h.vv(s)} (as of ${h.wt(s)}), ${h.lage(A)}; mean water is ${h.cm(s.mw!)} and mean low water ${h.cm(s.mnw!)}. Koblenz is the reference gauge for the section from Bad Salzig to Engers: flood mark I applies from ${h.cm(s.m1!)} and navigation there is prohibited from ${h.cm(s.m2!)}. The range of extremes is especially wide here: the lowest level on record is ${h.cm(s.nnw!)}, the highest ${h.cm(s.hhw!)}. To see what the Moselle will add in a flood, also read the Moselle gauges, such as Cochem or Trier, on the Moselle page.`; },
    body: (h) => { const s = h.k(A), r = h.st(A); return `<h2>Koblenz Rhine level today: the Rhine, not the Moselle</h2>
<p>A search for the Koblenz gauge often means both rivers. PEGELONLINE runs separate stations for the Moselle, listed on ${h.a('fl-mosel', 'Moselle gauges')}. The Koblenz Rhine gauge shows the Rhine coming out of the Middle Rhine gorge; upstream lies ${h.stLink('kaub', 'Kaub')}, downstream ${h.stLink('bonn', 'Bonn')}.</p>
${h.kenn(A)}
<h2>Low water and floods at Koblenz</h2>
<p>On ${h.date(r.occ.NNW[0])} the Rhine at Koblenz dropped to ${h.cm(s.nnw!)}, the lowest level in PEGELONLINE; on ${h.date(r.occ.HHW[0])} it reached ${h.cm(s.hhw!)}. Marks I and II are ${h.cm(s.m2! - s.m1!)} apart. At the equivalent low water level of ${h.cm(s.glw!)} the fairway is still ${h.cm(s.tu!)} deep; the tool above works out the approximation for the current reading.</p>
<h2>The last 30 days</h2>
<p>Over the last 30 days the 2-hour means stayed between ${h.lo(A)} and ${h.hi(A)}. Warnings are the responsibility of Rhineland-Palatinate, reachable through the ${h.src('hochwasserzentralen', 'state flood centres')}.</p>`; },
    faqs: (h) => { const s = h.k(A); return [
      { q: 'Does the Koblenz gauge show the Rhine or the Moselle?', a: `The Rhine, at Rhine km ${h.n(s.km!, 1)}. The Moselle has its own gauges in PEGELONLINE, listed on our Moselle page. In a flood it pays to read both, because the Moselle adds to the Rhine below Koblenz. The Moselle gauges are separate.` },
      { q: 'When is flood mark II reached at Koblenz?', a: `At ${h.cm(s.m2!)}. Navigation between Bad Salzig and Engers is then prohibited. From ${h.cm(s.m1!)}, mark I, vessels keep to mid-river at no more than 20 km/h. Residents by the Deutsches Eck go by the warnings of Rhineland-Palatinate, not by the shipping marks.` },
      { q: 'How low has the Rhine at Koblenz been?', a: `The lowest level on record in PEGELONLINE is ${h.cm(s.nnw!)}. Mean low water over 2010 to 2020 is ${h.cm(s.mnw!)}. At such levels rocks and gravel banks appear in the Rhine near Koblenz, and barges may take only part of their cargo. The tool above shows how far the current reading is from that.` },
    ]; },
  },
});
