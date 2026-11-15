import { definePage } from '../../lib/page-types';

const A = 'WÜRZBURG';
export default definePage({
  id: 'st-wuerzburg', kind: 'station', ref: 'wuerzburg', order: 12, tool: 'pegel',
  related: ['fl-main', 'st-mainz', 'pegel-lesen', 'hochwassermarken'],
  sources: ['pegelonline', 'hnd-bayern', 'pegelonline-api', 'elwis'],
  de: {
    slug: 'wuerzburg', nav: 'Pegel Würzburg', card: 'Main in Würzburg: Wert, Marke I, Hochwasser 1342',
    title: 'Pegel Würzburg aktuell: Main in Würzburg heute, Tendenz',
    description: 'Pegel Würzburg aktuell: Mainwasserstand mit Uhrzeit, Tendenz über 24 Stunden, Abstand zu Mittelwasser und Marke I, Rekord von 1342 und Verlauf von 30 Tagen.',
    h1: 'Pegel Würzburg aktuell: der Main in Würzburg heute',
    intro: (h) => { const s = h.k(A); return `Pegel Würzburg aktuell: ${h.vv(s)} am Main-km ${h.n(s.km!, 1)}, gemessen ${h.wt(s)}, ${h.trend(A)} in 24 Stunden.`; },
    resume: (h) => { const s = h.k(A), r = h.st(A); return `Der Main ist zwischen Bamberg und Mainz durch Wehre und Schleusen gestaut. Deshalb schwankt der Würzburger Pegel im Alltag wenig: Das Mittelwasser der Jahre 2010 bis 2020 liegt bei ${h.cm(s.mw!)}, das mittlere Niedrigwasser bei ${h.cm(s.mnw!)}, nur ${h.cm(s.mw! - s.mnw!)} darunter. Aktuell zeigt Würzburg ${h.vv(s)} (Stand: ${h.wt(s)}), ${h.lage(A)}. Bei Hochwasser steigt der Main dagegen kräftig. PEGELONLINE nennt für Würzburg eine Marke I bei ${h.cm(s.m1!)} und einen höchsten Schifffahrtswasserstand von ${h.cm(s.hsw!)}; das mittlere Hochwasser beträgt ${h.cm(s.mhw!)}. Der höchste Stand in der Liste ist historisch: ${h.cm(s.hhw!)} im ${h.date(r.occ.HHW[0])}, beim Magdalenenhochwasser. Der Pegel steht am Main-km ${h.n(s.km!, 1)}, gezählt von der Mündung in den Rhein bei Mainz aufwärts. Meldestufen für Würzburg gibt der Hochwassernachrichtendienst Bayern heraus. Die Uhrzeit jeder Messung steht im Werkzeug neben dem Wert.`; },
    body: (h) => { const s = h.k(A), r = h.st(A), sw = h.k('SCHWEINFURT NEUER HAFEN'), st = h.k('STEINBACH'); return `<h2>Pegel Würzburg aktuell im gestauten Main</h2>
<p>Stromauf misst Schweinfurt (Neuer Hafen) ${h.vv(sw)}, stromab Steinbach ${h.vv(st)}. Jeder dieser Pegel hat eigene Marken: In Schweinfurt liegt die Marke I bei ${h.cm(sw.m1!)}, in Würzburg bei ${h.cm(s.m1!)}. Alle Mainpegel bis Frankfurt stehen auf ${h.a('fl-main', 'Pegel am Main')}.</p>
${h.kenn(A)}
<h2>Vom Magdalenenhochwasser bis heute</h2>
<p>Der Rekord aus dem ${h.date(r.occ.HHW[0])} liegt ${h.cm(s.hhw! - s.mhw!)} über dem mittleren Hochwasser. Bis heute ist dieser Wert nicht annähernd erreicht worden: Selbst das mittlere Hochwasser liegt bei ${h.cm(s.mhw!)}. Den niedrigsten Stand von ${h.cm(s.nnw!)} verzeichnet PEGELONLINE am ${h.date(r.occ.NNW[0])}.</p>
<h2>Die letzten 30 Tage</h2>
<p>In den letzten 30 Tagen reichten die 2-Stunden-Mittel von ${h.lo(A)} bis ${h.hi(A)}. Ausschläge nach unten können auch von der Steuerung der Stauhaltungen kommen, nicht nur vom Wetter. Wo der Main in den Rhein mündet, misst ${h.stLink('mainz')}.</p>`; },
    faqs: (h) => { const s = h.k(A), r = h.st(A); return [
      { q: 'Warum schwankt der Main in Würzburg so wenig?', a: `Weil Wehre den Main aufstauen. Zwischen mittlerem Niedrigwasser (${h.cm(s.mnw!)}) und Mittelwasser (${h.cm(s.mw!)}) liegen in Würzburg nur ${h.cm(s.mw! - s.mnw!)}. An einem frei fließenden Fluss wie der Elbe ist diese Spanne viel größer. Bei Hochwasser öffnen die Wehre allerdings, und dann steigt auch der Main in Würzburg um mehrere Meter.` },
      { q: 'Was bedeutet Marke I am Pegel Würzburg?', a: `PEGELONLINE führt für Würzburg eine Marke I bei ${h.cm(s.m1!)}. Ab dieser Höhe gelten für die Schifffahrt auf dem Main besondere Regeln; ab ${h.cm(s.hsw!)}, dem höchsten Schifffahrtswasserstand, weitere Einschränkungen. Verbindlich sind die Bekanntmachungen in ELWIS. Für Anwohner gelten die Meldestufen Bayerns.` },
      { q: 'Wann war das größte Mainhochwasser in Würzburg?', a: `Im ${h.date(r.occ.HHW[0])}, mit ${h.cm(s.hhw!)} laut PEGELONLINE. Dieser Wert ist rekonstruiert, nicht von einer heutigen Messstation gemessen. Am Main brachten in jüngerer Zeit vor allem die Winter 1970 und 2003 hohe Stände; in Würzburg blieb der Wert von 1342 aber unerreicht.` },
    ]; },
  },
  en: {
    slug: 'wuerzburg', nav: 'Würzburg gauge', card: 'Main at Würzburg: reading, mark I, the 1342 flood',
    title: 'Würzburg Main Level Today: Pegel Würzburg, Trend, Records',
    description: 'Würzburg Main level today: the reading with its time, 24-hour trend, distance to mean water and mark I, the 1342 record and a curve of the last 30 days.',
    h1: 'Würzburg Main level today (Pegel Würzburg)',
    intro: (h) => { const s = h.k(A); return `Würzburg Main level today: ${h.vv(s)} at Main km ${h.n(s.km!, 1)}, read at ${h.wt(s)}, ${h.trend(A)} over 24 hours.`; },
    resume: (h) => { const s = h.k(A), r = h.st(A); return `Between Bamberg and Mainz the Main is held back by weirs and locks. That is why the Würzburg gauge moves little day to day: mean water over 2010 to 2020 is ${h.cm(s.mw!)} and mean low water ${h.cm(s.mnw!)}, only ${h.cm(s.mw! - s.mnw!)} below. Würzburg currently reads ${h.vv(s)} (as of ${h.wt(s)}), ${h.lage(A)}. In a flood, though, the Main rises sharply. PEGELONLINE gives Würzburg a mark I at ${h.cm(s.m1!)} and a highest navigable water level of ${h.cm(s.hsw!)}; mean high water is ${h.cm(s.mhw!)}. The highest level on the list is historical: ${h.cm(s.hhw!)} in ${h.date(r.occ.HHW[0])}, the St Mary Magdalene flood. The gauge stands at Main km ${h.n(s.km!, 1)}, counted upstream from the mouth in the Rhine at Mainz. Alert stages for Würzburg come from the Bavarian flood information service.`; },
    body: (h) => { const s = h.k(A), r = h.st(A), sw = h.k('SCHWEINFURT NEUER HAFEN'), st = h.k('STEINBACH'); return `<h2>Würzburg Main level today on an impounded river</h2>
<p>Upstream, Schweinfurt (Neuer Hafen) reads ${h.vv(sw)}; downstream, Steinbach reads ${h.vv(st)}. Each gauge has its own marks: mark I is ${h.cm(sw.m1!)} at Schweinfurt and ${h.cm(s.m1!)} at Würzburg. Every Main gauge down to Frankfurt is listed on ${h.a('fl-main', 'Main gauges')}.</p>
${h.kenn(A)}
<h2>From the Magdalene flood to today</h2>
<p>The record from ${h.date(r.occ.HHW[0])} is ${h.cm(s.hhw! - s.mhw!)} above mean high water. Nothing since has come close: even mean high water is ${h.cm(s.mhw!)}. PEGELONLINE records the lowest level, ${h.cm(s.nnw!)}, on ${h.date(r.occ.NNW[0])}.</p>
<h2>The last 30 days</h2>
<p>Over the last 30 days the 2-hour means ranged from ${h.lo(A)} to ${h.hi(A)}. Dips can also come from how the impoundments are operated, not only from the weather. Where the Main meets the Rhine, ${h.stLink('mainz', 'Mainz')} takes the reading.</p>`; },
    faqs: (h) => { const s = h.k(A), r = h.st(A); return [
      { q: 'Why does the Main at Würzburg vary so little?', a: `Because weirs hold the Main back. At Würzburg mean low water (${h.cm(s.mnw!)}) and mean water (${h.cm(s.mw!)}) are only ${h.cm(s.mw! - s.mnw!)} apart. On a free-flowing river like the Elbe that gap is much larger. In a flood, though, the weirs open and the Main at Würzburg rises by several metres too.` },
      { q: 'What does mark I mean at the Würzburg gauge?', a: `PEGELONLINE gives Würzburg a mark I at ${h.cm(s.m1!)}. From that height special rules apply to shipping on the Main, and from ${h.cm(s.hsw!)}, the highest navigable level, further restrictions. The notices in ELWIS are binding. Residents go by the Bavarian alert stages.` },
      { q: 'When was the biggest Main flood at Würzburg?', a: `In ${h.date(r.occ.HHW[0])}, at ${h.cm(s.hhw!)} according to PEGELONLINE. That value is reconstructed, not measured by a modern gauge. On the Main the winters of 1970 and 2003 brought the highest recent levels; at Würzburg the 1342 value was never matched.` },
    ]; },
  },
});
