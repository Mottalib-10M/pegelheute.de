import { definePage } from '../../lib/page-types';

const A = 'MAINZ';
export default definePage({
  id: 'st-mainz', kind: 'station', ref: 'mainz', order: 2, tool: 'pegel',
  related: ['st-kaub', 'st-maxau', 'fl-main', 'fl-rhein'],
  sources: ['pegelonline', 'rheinschpv', 'hochwasserzentralen', 'elwis'],
  de: {
    slug: 'mainz', nav: 'Pegel Mainz', card: 'Rhein unterhalb der Mainmündung',
    title: 'Pegel Mainz aktuell: Rheinwasserstand heute und Tendenz',
    description: 'Pegel Mainz aktuell: Rheinwasserstand in Mainz mit Uhrzeit, Tendenz über 24 Stunden, Einordnung, Hochwassermarken I und II und Verlauf der letzten 30 Tage.',
    h1: 'Pegel Mainz aktuell: der Rhein in Mainz heute',
    intro: (h) => { const s = h.k(A); return `Pegel Mainz aktuell: ${h.vv(s)} am Rhein-km ${h.n(s.km!, 1)}, gemessen ${h.wt(s)}, ${h.trend(A)} in 24 Stunden.`; },
    resume: (h) => { const s = h.k(A); return `Der Mainzer Pegel liegt am Rhein-km ${h.n(s.km!, 1)} und damit unterhalb der Stelle, an der der Main in den Rhein fließt. Sein Wert spiegelt deshalb beide Flüsse: Ein Hochwasser am Main hebt den Rhein in Mainz, auch wenn der Oberrhein ruhig ist. Aktuell zeigt Mainz ${h.vv(s)} (Stand: ${h.wt(s)}), ${h.lage(A)}; das Mittelwasser der Jahre 2010 bis 2020 beträgt ${h.cm(s.mw!)}, das mittlere Hochwasser ${h.cm(s.mhw!)}. Für den Abschnitt Gernsheim bis Eltville ist Mainz Richtpegel der Rheinschifffahrt: Ab ${h.cm(s.m1!)} gilt Hochwassermarke I, ab ${h.cm(s.m2!)} ist die Schifffahrt dort verboten. Der höchste Stand in PEGELONLINE beträgt ${h.cm(s.hhw!)}, der niedrigste ${h.cm(s.nnw!)}. Bei Niedrigwasser zeigt das Werkzeug zusätzlich die Fahrrinnentiefe als Näherung über den gleichwertigen Wasserstand von ${h.cm(s.glw!)}. Warnungen gibt das Land Rheinland-Pfalz heraus.`; },
    body: (h) => { const s = h.k(A), r = h.st(A); const m = h.k('WÜRZBURG'); return `<h2>Pegel Mainz aktuell: Rhein und Main zusammen</h2>
<p>Wer den Mainzer Wert verstehen will, schaut auf zwei Flüsse. Der Rhein bringt das Wasser aus dem Oberrhein, das sich in ${h.stLink('maxau')} ablesen lässt, der Main das aus Franken und Hessen; ein Mainpegel mit eigener Seite ist ${h.stLink('wuerzburg')}, wo der Pegel aktuell ${h.vv(m)} zeigt. Die Seite ${h.a('fl-main', 'Pegel am Main')} listet alle Mainpegel bis zur Mündung.</p>
${h.kenn(A)}
<h2>Hochwasser und Schifffahrt bei Mainz</h2>
<p>Den höchsten bekannten Stand von ${h.cm(s.hhw!)} verzeichnet PEGELONLINE für den ${h.date(r.occ.HHW[0])}. Zwischen Marke I (${h.cm(s.m1!)}) und Marke II (${h.cm(s.m2!)}) liegen in Mainz ${h.cm(s.m2! - s.m1!)}; in dieser Spanne fahren Schiffe in Strommitte und höchstens 20 km/h (${h.src('rheinschpv', 'RheinSchPV § 10.01')}). Warnungen für Mainz gibt das Land Rheinland-Pfalz heraus, für das Wiesbadener Ufer das Land Hessen.</p>
<h2>Die letzten 30 Tage</h2>
<p>In den letzten 30 Tagen lagen die 2-Stunden-Mittel zwischen ${h.lo(A)} und ${h.hi(A)}. Stromab beginnt hinter Bingen der Mittelrhein mit dem Pegel ${h.stLink('kaub')}.</p>`; },
    faqs: (h) => { const s = h.k(A); return [
      { q: 'Welcher Pegel ist in Mainz normal?', a: `Das Mittelwasser am Pegel Mainz liegt bei ${h.cm(s.mw!)}. Unter ${h.cm(s.mnw!)} (mittleres Niedrigwasser) ist der Rhein ungewöhnlich niedrig, über ${h.cm(s.mhw!)} (mittleres Hochwasser) ungewöhnlich hoch. Das Werkzeug oben ordnet den aktuellen Wert zwischen diesen Kennwerten ein und zeigt die Uhrzeit der Messung.` },
      { q: 'Warum steigt der Rhein in Mainz, obwohl es am Oberrhein trocken ist?', a: 'Weil der Pegel Mainz unterhalb der Mainmündung liegt. Regen in Franken oder im Spessart hebt den Main und damit auch den Rhein in Mainz. Ein Blick auf die Mainpegel, etwa Würzburg oder Frankfurt Osthafen, erklärt dann den Anstieg. Der Mainpegel Frankfurt Osthafen zeigt einen solchen Anstieg meist früher.' },
      { q: 'Ab wann gilt in Mainz Hochwassermarke I?', a: `Ab ${h.cm(s.m1!)} am Pegel Mainz, für den Abschnitt Gernsheim bis Eltville. Ab ${h.cm(s.m2!)} (Marke II) ist die Schifffahrt dort verboten, ausgenommen der Übersetzverkehr. Ab Marke I fahren Schiffe in Strommitte mit höchstens 20 km/h. Für Anwohner in Mainz sind die Warnungen des Landes Rheinland-Pfalz maßgeblich.` },
    ]; },
  },
  en: {
    slug: 'mainz', nav: 'Mainz gauge', card: 'Rhine below the mouth of the Main',
    title: 'Mainz Rhine Level Today: Pegel Mainz, Trend and Marks',
    description: 'Mainz Rhine level today: the reading with its time, 24-hour trend, rating against mean water, flood marks I and II and a 30-day curve just below the Main.',
    h1: 'Mainz Rhine level today (Pegel Mainz)',
    intro: (h) => { const s = h.k(A); return `Mainz Rhine level today: ${h.vv(s)} at Rhine km ${h.n(s.km!, 1)}, read at ${h.wt(s)}, ${h.trend(A)} over 24 hours.`; },
    resume: (h) => { const s = h.k(A); return `The Mainz gauge sits at Rhine km ${h.n(s.km!, 1)}, below the point where the Main flows into the Rhine. Its reading therefore reflects both rivers: a flood on the Main raises the Rhine at Mainz even when the Upper Rhine is calm. Mainz currently reads ${h.vv(s)} (as of ${h.wt(s)}), ${h.lage(A)}; mean water over 2010 to 2020 is ${h.cm(s.mw!)} and mean high water ${h.cm(s.mhw!)}. For the section from Gernsheim to Eltville, Mainz is the reference gauge for Rhine shipping: flood mark I applies from ${h.cm(s.m1!)} and navigation there is prohibited from ${h.cm(s.m2!)}. The highest level in PEGELONLINE is ${h.cm(s.hhw!)}, the lowest ${h.cm(s.nnw!)}. At low water the tool also shows the fairway depth as an approximation from the equivalent low water level of ${h.cm(s.glw!)}.`; },
    body: (h) => { const s = h.k(A), r = h.st(A); const m = h.k('WÜRZBURG'); return `<h2>Mainz Rhine level today: the Rhine and the Main together</h2>
<p>To understand the Mainz reading, watch two rivers. The Rhine brings the water of the Upper Rhine, which you can read at ${h.stLink('maxau', 'Maxau')}; the Main brings water from Franconia and Hesse, and one Main gauge with its own page is ${h.stLink('wuerzburg', 'Würzburg')}, where the gauge currently shows ${h.vv(m)}. The page ${h.a('fl-main', 'Main gauges')} lists every gauge down to the mouth.</p>
${h.kenn(A)}
<h2>Floods and shipping near Mainz</h2>
<p>PEGELONLINE records the highest level, ${h.cm(s.hhw!)}, on ${h.date(r.occ.HHW[0])}. Mark I (${h.cm(s.m1!)}) and mark II (${h.cm(s.m2!)}) are ${h.cm(s.m2! - s.m1!)} apart at Mainz; in that band vessels keep to mid-river at no more than 20 km/h (${h.src('rheinschpv', 'RheinSchPV § 10.01')}). Warnings for Mainz come from Rhineland-Palatinate, for the Wiesbaden bank from Hesse.</p>
<h2>The last 30 days</h2>
<p>Over the last 30 days the 2-hour means stayed between ${h.lo(A)} and ${h.hi(A)}. Downstream, past Bingen, the Middle Rhine begins with the ${h.stLink('kaub', 'Kaub gauge')}.</p>`; },
    faqs: (h) => { const s = h.k(A); return [
      { q: 'What is a normal level at Mainz?', a: `Mean water at the Mainz gauge is ${h.cm(s.mw!)}. Below ${h.cm(s.mnw!)} (mean low water) the Rhine is unusually low, above ${h.cm(s.mhw!)} (mean high water) unusually high. The tool above places the current reading between these values and shows the time it was taken.` },
      { q: 'Why does the Rhine rise at Mainz when the Upper Rhine is dry?', a: 'Because the Mainz gauge lies below the mouth of the Main. Rain in Franconia or the Spessart raises the Main and with it the Rhine at Mainz. A look at the Main gauges, such as Würzburg or Frankfurt Osthafen, then explains the rise.' },
      { q: 'When does flood mark I apply at Mainz?', a: `From ${h.cm(s.m1!)} on the Mainz gauge, for the section from Gernsheim to Eltville. From ${h.cm(s.m2!)} (mark II) navigation there is prohibited, except for ferries. From mark I vessels keep to mid-river at no more than 20 km/h. For residents in Mainz the warnings of Rhineland-Palatinate apply.` },
    ]; },
  },
});
