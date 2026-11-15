import { definePage } from '../../lib/page-types';

const A = 'BONN';
export default definePage({
  id: 'st-bonn', kind: 'station', ref: 'bonn', order: 5, tool: 'pegel',
  related: ['st-koeln', 'st-koblenz', 'hochwassermarken', 'fl-rhein'],
  sources: ['pegelonline', 'rheinschpv', 'hochwasserzentralen', 'pegelonline-api'],
  de: {
    slug: 'bonn', nav: 'Pegel Bonn', card: 'Rhein in Bonn: Wert, Tendenz, Extremwerte',
    title: 'Pegel Bonn aktuell: Rheinwasserstand in Bonn heute',
    description: 'Pegel Bonn aktuell: Rheinwasserstand in Bonn mit Uhrzeit, Tendenz über 24 Stunden, Abstand zu Mittel- und Hochwasser, Fahrrinne und Verlauf von 30 Tagen.',
    h1: 'Pegel Bonn aktuell: der Rhein in Bonn heute',
    intro: (h) => { const s = h.k(A); return `Pegel Bonn aktuell: ${h.vv(s)} am Rhein-km ${h.n(s.km!, 1)}, gemessen ${h.wt(s)}, ${h.trend(A)} in 24 Stunden.`; },
    resume: (h) => { const s = h.k(A), o = h.k('OBERWINTER'); return `Bonn hat einen eigenen Rheinpegel am km ${h.n(s.km!, 1)}, aber keine eigenen Hochwassermarken: Für den Abschnitt zwischen Bad Breisig und Mondorf, in dem Bonn liegt, ist der Pegel Oberwinter Richtpegel der Schifffahrt, mit Marke I bei ${h.cm(o.m1!)} und Marke II bei ${h.cm(o.m2!)}. Der Bonner Wert ist trotzdem der, den Anwohner und Ausflügler nachschlagen. Gerade steht das Wasser in Bonn bei ${h.vv(s)} (Stand: ${h.wt(s)}), ${h.lage(A)}. Zum Vergleich: Das Mittelwasser liegt bei ${h.cm(s.mw!)}, das mittlere Hochwasser bei ${h.cm(s.mhw!)}. Der höchste bekannte Stand beträgt ${h.cm(s.hhw!)}, der niedrigste ${h.cm(s.nnw!)}. Weil Bonn knapp ${h.n(Math.round(h.k('KÖLN').km! - s.km!))} Kilometer oberhalb von Köln liegt, kündigt der Bonner Pegel an, was in Köln wenige Stunden später ankommt. Für Warnungen in Bonn ist das Land Nordrhein-Westfalen zuständig, erreichbar über die Hochwasserzentralen der Länder.`; },
    body: (h) => { const s = h.k(A), r = h.st(A), o = h.k('OBERWINTER'); return `<h2>Pegel Bonn aktuell und der Richtpegel Oberwinter</h2>
<p>Für Schiffe zählt bei Hochwasser nicht Bonn, sondern Oberwinter am km ${h.n(o.km!, 1)}. Aktuell zeigt Oberwinter ${h.vv(o)} (Stand: ${h.wt(o)}); seine Marken liegen bei ${h.cm(o.m1!)} und ${h.cm(o.m2!)} (${h.src('rheinschpv', 'RheinSchPV § 10.01')}). Wer am Bonner Ufer den Rhein beobachtet, liest den Bonner Wert gegen die eigenen Kennwerte der Station.</p>
${h.kenn(A)}
<h2>Bonn als Vorbote für Köln</h2>
<p>Der Rhein braucht von Bonn nach ${h.stLink('koeln')} nur einige Stunden. Steigt Bonn schnell, steigt Köln kurz danach; das Werkzeug zeigt die Änderung der letzten 24 Stunden für beide. Weiter oben liegt ${h.stLink('koblenz')}, wo die Mosel hinzukommt.</p>
<h2>Extreme in Bonn</h2>
<p>PEGELONLINE führt den höchsten Stand vom ${h.date(r.occ.HHW[0])} mit ${h.cm(s.hhw!)} und den niedrigsten vom ${h.date(r.occ.NNW[0])} mit ${h.cm(s.nnw!)}. In den letzten 30 Tagen reichten die 2-Stunden-Mittel von ${h.lo(A)} bis ${h.hi(A)}.</p>`; },
    faqs: (h) => { const s = h.k(A), o = h.k('OBERWINTER'); return [
      { q: 'Hat der Pegel Bonn Hochwassermarken?', a: `Nein, nicht in PEGELONLINE. Für den Rheinabschnitt um Bonn gilt der Pegel Oberwinter als Richtpegel: Marke I bei ${h.cm(o.m1!)}, Marke II bei ${h.cm(o.m2!)}. Bonn selbst hat Kennwerte wie das mittlere Hochwasser von ${h.cm(s.mhw!)}. Für Anwohner gelten die Warnungen des Landes.` },
      { q: 'Wie lange braucht das Wasser von Bonn nach Köln?', a: `Einige Stunden: Zwischen den beiden Pegeln liegen ${h.n(Math.round(h.k('KÖLN').km! - s.km!))} Flusskilometer. Wie schnell eine Welle läuft, hängt von der Wassermenge ab; eine feste Zeit veröffentlicht PEGELONLINE nicht. Vergleichen Sie im Werkzeug die Tendenz beider Pegel. Die Uhrzeit jeder Messung steht im Werkzeug.` },
      { q: 'Welcher Rheinpegel in Bonn ist normal?', a: `Das Mittelwasser der Jahre 2010 bis 2020 liegt in Bonn bei ${h.cm(s.mw!)}. Unter ${h.cm(s.mnw!)} ist der Rhein niedriger als im typischen Jahrestief. Über dem mittleren Hochwasser ist der Rhein höher als im typischen Jahreshochwasser. Das Werkzeug ordnet den aktuellen Wert zwischen diesen Kennwerten ein.` },
    ]; },
  },
  en: {
    slug: 'bonn', nav: 'Bonn gauge', card: 'Rhine at Bonn: reading, trend, extremes',
    title: 'Bonn Rhine Level Today: Pegel Bonn, Trend and Records',
    description: 'Bonn Rhine level today: the reading with its time, 24-hour trend, distance to mean and high water, fairway depth and the last 30 days, upstream of Cologne.',
    h1: 'Bonn Rhine level today (Pegel Bonn)',
    intro: (h) => { const s = h.k(A); return `Bonn Rhine level today: ${h.vv(s)} at Rhine km ${h.n(s.km!, 1)}, read at ${h.wt(s)}, ${h.trend(A)} over 24 hours.`; },
    resume: (h) => { const s = h.k(A), o = h.k('OBERWINTER'); return `Bonn has its own Rhine gauge at km ${h.n(s.km!, 1)} but no flood marks of its own: for the section between Bad Breisig and Mondorf, which includes Bonn, the Oberwinter gauge is the reference for shipping, with mark I at ${h.cm(o.m1!)} and mark II at ${h.cm(o.m2!)}. The Bonn reading is still the one residents and day-trippers look up. It currently reads ${h.vv(s)} (as of ${h.wt(s)}), ${h.lage(A)}; mean water is ${h.cm(s.mw!)} and mean high water ${h.cm(s.mhw!)}. The highest level on record is ${h.cm(s.hhw!)}, the lowest ${h.cm(s.nnw!)}. Because Bonn lies some ${h.n(Math.round(h.k('KÖLN').km! - s.km!))} kilometres above Cologne, the Bonn gauge announces what reaches Cologne a few hours later. Warnings for Bonn are issued by North Rhine-Westphalia and linked from the cross-state flood centres portal.`; },
    body: (h) => { const s = h.k(A), r = h.st(A), o = h.k('OBERWINTER'); return `<h2>Bonn Rhine level today and the Oberwinter reference gauge</h2>
<p>For shipping at high water, what counts is not Bonn but Oberwinter at km ${h.n(o.km!, 1)}. Oberwinter currently reads ${h.vv(o)} (as of ${h.wt(o)}); its marks are ${h.cm(o.m1!)} and ${h.cm(o.m2!)} (${h.src('rheinschpv', 'RheinSchPV § 10.01')}). If you watch the river from the Bonn bank, read the Bonn value against the station's own reference values.</p>
${h.kenn(A)}
<h2>Bonn as an early sign for Cologne</h2>
<p>The Rhine takes only a few hours from Bonn to ${h.stLink('koeln', 'Cologne')}. If Bonn rises fast, Cologne follows shortly after; the tool shows the 24-hour change for both. Further up lies ${h.stLink('koblenz', 'Koblenz')}, where the Moselle joins.</p>
<h2>Extremes at Bonn</h2>
<p>PEGELONLINE lists the highest level on ${h.date(r.occ.HHW[0])} at ${h.cm(s.hhw!)} and the lowest on ${h.date(r.occ.NNW[0])} at ${h.cm(s.nnw!)}. Over the last 30 days the 2-hour means ranged from ${h.lo(A)} to ${h.hi(A)}.</p>`; },
    faqs: (h) => { const s = h.k(A), o = h.k('OBERWINTER'); return [
      { q: 'Does the Bonn gauge have flood marks?', a: `No, not in PEGELONLINE. For the Rhine section around Bonn the Oberwinter gauge is the reference: mark I at ${h.cm(o.m1!)}, mark II at ${h.cm(o.m2!)}. Bonn itself has reference values such as a mean high water of ${h.cm(s.mhw!)}.` },
      { q: 'How long does water take from Bonn to Cologne?', a: `A few hours: the two gauges are ${h.n(Math.round(h.k('KÖLN').km! - s.km!))} river kilometres apart. How fast a wave travels depends on the flow; PEGELONLINE publishes no fixed time. Compare the trend of both gauges in the tool. The time of each reading is shown in the tool.` },
      { q: 'What is a normal Rhine level at Bonn?', a: `Mean water over 2010 to 2020 at Bonn is ${h.cm(s.mw!)}. Below ${h.cm(s.mnw!)} the Rhine is lower than at a typical yearly low. Above mean high water the Rhine is higher than at a typical yearly flood. The tool places the current reading between these reference values.` },
    ]; },
  },
});
