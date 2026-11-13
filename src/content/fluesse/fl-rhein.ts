import { definePage } from '../../lib/page-types';
import { compactOf } from '../../lib/pegel';
import { perRiver } from '../_stats';

const R = 'rhein' as const;
const MARKEN = () => compactOf(R).filter((s) => s.m1 !== undefined && s.m2 !== undefined);
const GLW = () => compactOf(R).filter((s) => s.glw !== undefined && s.tu !== undefined);

export default definePage({
  id: 'fl-rhein', kind: 'river', ref: R, order: 1, tool: 'pegel',
  related: ['st-koeln', 'st-kaub', 'niedrigwasser-rhein', 'hochwassermarken'],
  sources: ['pegelonline', 'rheinschpv', 'elwis', 'hochwasserzentralen'],
  de: {
    slug: 'rhein', nav: 'Rhein', card: 'Alle Rheinpegel von Konstanz bis zur Grenze',
    title: 'Pegel Rhein aktuell: alle Rheinpegel von Basel bis Emmerich',
    description: 'Pegel Rhein aktuell: alle Rheinpegel mit Wert, Uhrzeit, Tendenz 24 h und Einordnung, die 16 Richtpegel der Hochwassermarken und die Fahrrinne bei Niedrigwasser.',
    h1: 'Pegel Rhein aktuell: alle Rheinpegel auf einen Blick',
    intro: (h) => { const p = perRiver(R), k = h.k('KÖLN'); return `Pegel Rhein aktuell an ${h.n(p.n)} Messstellen; in Köln ${h.cm(k.v)}, gemessen ${h.when(k.t)}, ${h.trend('KÖLN')} in 24 Stunden.`; },
    resume: (h) => { const p = perRiver(R), m = MARKEN(), g = GLW(); return `PEGELONLINE führt am Rhein ${h.n(p.n)} Pegel, vom Bodensee bei Konstanz bis hinter die niederländische Grenze. Der Rhein-Kilometer beginnt in Konstanz und steigt stromab; Köln liegt bei km ${h.n(h.k('KÖLN').km!)}, Emmerich bei km ${h.n(h.k('EMMERICH').km!, 1)}. In der Momentaufnahme lagen ${h.n(p.unterMNW)} Rheinpegel auf oder unter ihrem mittleren Niedrigwasser und ${h.n(p.ueberMHW)} über dem mittleren Hochwasser. Für die Schifffahrt zählen zwei Gruppen von Pegeln: ${h.n(m.length)} Richtpegel mit Hochwassermarken I und II, nach denen Geschwindigkeit und Sperrung geregelt sind, und ${h.n(g.length)} Pegel mit einem gleichwertigen Wasserstand (GlW), auf den die Solltiefe der Fahrrinne bezogen ist. Jeder Pegel hat einen eigenen Nullpunkt; ein Wert von 200 cm in Maxau und in Köln bedeutet deshalb nicht dasselbe. Entscheidend ist der Abstand zu den Kennwerten der jeweiligen Station, und genau den rechnet das Werkzeug oben.`; },
    body: (h) => { const m = MARKEN(), g = GLW(); return `<h2>Pegel Rhein aktuell: die Richtpegel der Hochwassermarken</h2>
<p>Die Rheinschifffahrtspolizeiverordnung legt für jeden Abschnitt einen Richtpegel fest. Erreicht er Marke I, fahren Schiffe in Strommitte und höchstens 20 km/h; bei Marke II ist die Schifffahrt auf dem Abschnitt verboten, Fähren ausgenommen (${h.src('rheinschpv', 'RheinSchPV § 10.01')}). Die Tabelle zeigt die Marken und den Abstand der Momentaufnahme zu Marke I.</p>
${h.table([h.t('Richtpegel', 'Reference gauge'), 'km', h.t('Marke I', 'Mark I'), h.t('Marke II', 'Mark II'), h.t('Momentaufnahme', 'Snapshot'), h.t('Abstand zu Marke I', 'Distance to mark I')], m.map((s) => [s.n, h.n(s.km!, 1), h.cm(s.m1!), h.cm(s.m2!), h.cm(s.v), h.cm(s.v - s.m1!)]), h.t(`Hochwassermarken laut PEGELONLINE, Stand ${h.snap}.`, `Flood marks according to PEGELONLINE, as of ${h.snap}.`))}
<p>Was die Marken für Anwohner bedeuten und was nicht, erklärt ${h.a('hochwassermarken', 'Hochwassermarken und Meldestufen')}.</p>
<h2>Niedrigwasser am Rhein: GlW und Fahrrinne</h2>
<p>Bei Trockenheit wird der gleichwertige Wasserstand zur wichtigsten Zahl. Die WSV bezieht die Solltiefe der Fahrrinne auf ihn; liegt ein Pegel darunter, ist die Rinne flacher. Die Tabelle rechnet die Näherung Solltiefe plus Abstand zum GlW für jeden Pegel mit GlW.</p>
${h.table([h.t('Pegel', 'Gauge'), 'km', 'GlW', h.t('Solltiefe unter GlW', 'Target depth below GlW'), h.t('Fahrrinne genähert', 'Fairway, approx.')], g.map((s) => [s.n, h.n(s.km!, 1), h.cm(s.glw!), h.cm(s.tu!), h.m(s.tu! + s.v - s.glw!)]), h.t(`Näherung aus der Momentaufnahme ${h.snap}; maßgeblich sind die Angaben in ELWIS.`, `Approximation from the snapshot of ${h.snap}; the ELWIS figures are binding.`))}
<p>Der Ratgeber ${h.a('niedrigwasser-rhein', 'Niedrigwasser am Rhein')} rechnet die Tiefe für einen frei gewählten Pegelwert.</p>
<h2>Oberrhein, Mittelrhein, Niederrhein</h2>
<p>Am Oberrhein zwischen Basel und Bingen stehen die Pegel ${h.stLink('maxau')} und ${h.stLink('mainz')}; der Mittelrhein bis Bonn hat ${h.stLink('kaub')} und ${h.stLink('koblenz')}; am Niederrhein folgen ${h.stLink('bonn')}, ${h.stLink('koeln')}, ${h.stLink('duesseldorf')} und ${h.stLink('emmerich')}. Die vollständige Liste mit Live-Werten steht unten.</p>`; },
    faqs: (h) => { const p = perRiver(R); return [
      { q: 'Wie viele Pegel hat der Rhein in PEGELONLINE?', a: `${h.n(p.n)} Pegel mit aktuellem Wasserstand, von Konstanz bis Pannerdense Kop in den Niederlanden. Einige Stationen im Grenzgebiet werden von Nachbarländern betrieben und haben keine deutschen Kennwerte. Die Tabelle auf dieser Seite listet alle mit Wert und Einordnung. Die Werte laden beim Öffnen neu.` },
      { q: 'Welcher Rheinpegel ist für die Schifffahrt maßgeblich?', a: 'Bei Hochwasser der Richtpegel des jeweiligen Abschnitts nach RheinSchPV § 10.01. Bei Niedrigwasser schauen Reedereien vor allem auf Kaub und Duisburg-Ruhrort, weil dort die Abladetiefe begrenzt wird. Am Niederrhein beachten viele zusätzlich Emmerich. Die amtlichen Bekanntmachungen stehen in ELWIS. Das Werkzeug zeigt für jeden davon den Abstand zum GlW.' },
      { q: 'Warum zählt der Rhein-Kilometer ab Konstanz?', a: `Weil die Kilometrierung an der Rheinbrücke in Konstanz beginnt und stromab steigt. Der Pegel Emmerich liegt bei km ${h.n(h.k('EMMERICH').km!, 1)}. Der Abschnitt vom Bodensee bis Basel heißt Hochrhein. Ab Basel folgt der Oberrhein, ab Bingen der Mittelrhein, ab Bonn der Niederrhein. Die Pegel stehen auf dieser Seite in derselben Reihenfolge.` },
    ]; },
  },
  en: {
    slug: 'rhine', nav: 'Rhine', card: 'Every Rhine gauge from Konstanz to the border',
    title: 'Rhine Water Levels Today: Every Gauge from Basel to Emmerich',
    description: 'Rhine water levels today: every federal Rhine gauge with reading, time, trend and rating, the 16 reference gauges for flood marks and the low-water fairway.',
    h1: 'Rhine water levels today: every gauge at a glance',
    intro: (h) => { const p = perRiver(R), k = h.k('KÖLN'); return `Rhine water levels today at ${h.n(p.n)} gauges; Cologne read ${h.cm(k.v)} at ${h.when(k.t)}, ${h.trend('KÖLN')} over 24 hours.`; },
    resume: (h) => { const p = perRiver(R), m = MARKEN(), g = GLW(); return `PEGELONLINE lists ${h.n(p.n)} gauges on the Rhine, from Lake Constance at Konstanz to just past the Dutch border. Rhine kilometres start at Konstanz and rise downstream; Cologne is at km ${h.n(h.k('KÖLN').km!)}, Emmerich at km ${h.n(h.k('EMMERICH').km!, 1)}. In the snapshot ${h.n(p.unterMNW)} Rhine gauges were at or below their mean low water and ${h.n(p.ueberMHW)} above mean high water. Two groups of gauges matter for shipping: ${h.n(m.length)} reference gauges with flood marks I and II, which set speed limits and closures, and ${h.n(g.length)} gauges with an equivalent low water level (GlW), to which the fairway's target depth is tied. Each gauge has its own zero, so 200 cm at Maxau and at Cologne do not mean the same thing. What counts is the distance to that station's reference values, which is exactly what the tool above works out.`; },
    body: (h) => { const m = MARKEN(), g = GLW(); return `<h2>Rhine water levels today: the reference gauges for flood marks</h2>
<p>The Rhine police regulations assign a reference gauge to each section. When it reaches mark I, vessels keep to mid-river at no more than 20 km/h; at mark II navigation on the section is prohibited, ferries excepted (${h.src('rheinschpv', 'RheinSchPV § 10.01')}). The table shows the marks and the snapshot's distance to mark I.</p>
${h.table([h.t('Richtpegel', 'Reference gauge'), 'km', h.t('Marke I', 'Mark I'), h.t('Marke II', 'Mark II'), h.t('Momentaufnahme', 'Snapshot'), h.t('Abstand zu Marke I', 'Distance to mark I')], m.map((s) => [s.n, h.n(s.km!, 1), h.cm(s.m1!), h.cm(s.m2!), h.cm(s.v), h.cm(s.v - s.m1!)]), h.t(`Hochwassermarken laut PEGELONLINE, Stand ${h.snap}.`, `Flood marks according to PEGELONLINE, as of ${h.snap}.`))}
<p>What the marks mean for residents, and what they do not, is covered in ${h.a('hochwassermarken', 'flood marks and alert stages')}.</p>
<h2>Low water on the Rhine: GlW and the fairway</h2>
<p>In a dry spell the equivalent low water level becomes the key number. The WSV ties the fairway's target depth to it; when a gauge drops below, the channel is shallower. The table works out the approximation target depth plus distance to GlW for every gauge that has one.</p>
${h.table([h.t('Pegel', 'Gauge'), 'km', 'GlW', h.t('Solltiefe unter GlW', 'Target depth below GlW'), h.t('Fahrrinne genähert', 'Fairway, approx.')], g.map((s) => [s.n, h.n(s.km!, 1), h.cm(s.glw!), h.cm(s.tu!), h.m(s.tu! + s.v - s.glw!)]), h.t(`Näherung aus der Momentaufnahme ${h.snap}; maßgeblich sind die Angaben in ELWIS.`, `Approximation from the snapshot of ${h.snap}; the ELWIS figures are binding.`))}
<p>The guide ${h.a('niedrigwasser-rhein', 'Rhine low water')} works out the depth for any reading you enter.</p>
<h2>Upper, Middle and Lower Rhine</h2>
<p>On the Upper Rhine between Basel and Bingen sit the ${h.stLink('maxau', 'Maxau')} and ${h.stLink('mainz', 'Mainz')} gauges; the Middle Rhine down to Bonn has ${h.stLink('kaub', 'Kaub')} and ${h.stLink('koblenz', 'Koblenz')}; on the Lower Rhine follow ${h.stLink('bonn', 'Bonn')}, ${h.stLink('koeln', 'Cologne')}, ${h.stLink('duesseldorf', 'Düsseldorf')} and ${h.stLink('emmerich', 'Emmerich')}. The full list with live values is below.</p>`; },
    faqs: (h) => { const p = perRiver(R); return [
      { q: 'How many Rhine gauges does PEGELONLINE have?', a: `${h.n(p.n)} gauges with a current water level, from Konstanz to Pannerdense Kop in the Netherlands. A few border stations are run by neighbouring countries and carry no German reference values. The table on this page lists them all with value and rating.` },
      { q: 'Which Rhine gauge matters for shipping?', a: 'At high water, the reference gauge for each section under RheinSchPV § 10.01. At low water operators mainly watch Kaub and Duisburg-Ruhrort, where the loading depth is limited. On the Lower Rhine many also watch Emmerich. The official notices are published in ELWIS.' },
      { q: 'Why do Rhine kilometres start at Konstanz?', a: `Because the kilometre count begins at the Rhine bridge in Konstanz and rises downstream. The Emmerich gauge sits at km ${h.n(h.k('EMMERICH').km!, 1)}. The stretch from Lake Constance to Basel is the High Rhine. From Basel comes the Upper Rhine, from Bingen the Middle Rhine and from Bonn the Lower Rhine. The gauges on this page follow the same order.` },
    ]; },
  },
});
