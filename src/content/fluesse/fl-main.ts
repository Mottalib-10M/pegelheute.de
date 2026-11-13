import { definePage } from '../../lib/page-types';
import { compactOf } from '../../lib/pegel';
import { perRiver } from '../_stats';
import { lageTable } from '../_river';

const R = 'main' as const;
const M1 = () => compactOf(R).filter((s) => s.m1 !== undefined);

export default definePage({
  id: 'fl-main', kind: 'river', ref: R, order: 4, tool: 'pegel',
  related: ['st-wuerzburg', 'st-mainz', 'hochwassermarken', 'pegel-lesen'],
  sources: ['pegelonline', 'hnd-bayern', 'hochwasserzentralen', 'elwis'],
  de: {
    slug: 'main', nav: 'Main', card: 'Mainpegel von Trunstadt bis Raunheim',
    title: 'Pegel Main aktuell: Mainpegel von Bamberg bis Frankfurt',
    description: 'Pegel Main aktuell: Wasserstände aller Mainpegel mit Uhrzeit, Tendenz 24 h, Einordnung und Marke I, von Trunstadt bei Bamberg über Würzburg bis nach Frankfurt.',
    h1: 'Pegel Main aktuell: alle Mainpegel auf einen Blick',
    intro: (h) => { const p = perRiver(R), s = h.k('FRANKFURT OSTHAFEN'); return `Pegel Main aktuell an ${h.n(p.n)} Messstellen; in Frankfurt (Osthafen) ${h.cm(s.v)}, gemessen ${h.when(s.t)}, ${h.trend('FRANKFURT OSTHAFEN')} in 24 Stunden.`; },
    resume: (h) => { const p = perRiver(R), m = M1(); return `PEGELONLINE führt am Main ${h.n(p.n)} Pegel, von Trunstadt unterhalb von Bamberg bis Raunheim kurz vor der Mündung in den Rhein. Die Main-Kilometer zählen von der Mündung bei Mainz flussaufwärts; Frankfurt (Osthafen) liegt bei km ${h.n(h.k('FRANKFURT OSTHAFEN').km!, 1)}, ${h.stLink('wuerzburg')} bei km ${h.n(h.k('WÜRZBURG').km!, 1)}. Der Main ist auf dieser ganzen Strecke durch Wehre gestaut; im Alltag liegen die Pegel deshalb dicht an ihrem Mittelwasser, und ein Wert unter dem mittleren Niedrigwasser kann auch mit dem Stauziel einer Schleuse zu tun haben. In der Momentaufnahme lagen ${h.n(p.unterMNW)} Mainpegel auf oder unter ihrem mittleren Niedrigwasser und ${h.n(p.ueberMHW)} über dem mittleren Hochwasser. ${h.n(m.length)} Pegel haben in PEGELONLINE eine Marke I, ab der für die Schifffahrt besondere Regeln gelten, und einen höchsten Schifffahrtswasserstand. Meldestufen geben Bayern und Hessen heraus. Die Uhrzeit jeder Messung steht neben dem Wert.`; },
    body: (h) => { const m = M1(); return `<h2>Pegel Main aktuell: Einordnung jeder Station</h2>
<p>Weil der Main gestaut ist, sind die Abstände klein: In Würzburg trennen mittleres Niedrigwasser und Mittelwasser ${h.cm(h.k('WÜRZBURG').mw! - h.k('WÜRZBURG').mnw!)}. Die Tabelle zeigt jeden Pegel mit Mittelwasser in Fließrichtung, von Trunstadt nach Raunheim.</p>
${lageTable(h, R)}
<h2>Marke I und Schifffahrt am Main</h2>
${h.table([h.t('Pegel', 'Gauge'), 'km', h.t('Marke I', 'Mark I'), h.t('Höchster Schifffahrtswasserstand', 'Highest navigable level'), h.t('Momentaufnahme', 'Snapshot')], m.map((s) => [s.n, h.n(s.km!, 1), h.cm(s.m1!), s.hsw !== undefined ? h.cm(s.hsw) : '–', h.cm(s.v)]), h.t(`Laut PEGELONLINE, Stand ${h.snap}; verbindlich sind die Bekanntmachungen in ELWIS.`, `According to PEGELONLINE, as of ${h.snap}; ELWIS notices are binding.`))}
<p>Was Marken und Meldestufen voneinander unterscheidet, erklärt ${h.a('hochwassermarken', 'Hochwassermarken und Meldestufen')}.</p>
<h2>Hochwasser am Main</h2>
<p>Am Untermain stammen die Höchststände meist vom ${h.date(h.st('FRANKFURT OSTHAFEN').occ.HHW[0])}: In Frankfurt erreichte der Main ${h.cm(h.k('FRANKFURT OSTHAFEN').hhw!)}. Weiter oben, in Steinbach und Obernau, ist der Februar 1970 der Rekord, in Würzburg das Magdalenenhochwasser von 1342. Meldungen für Hessen und Bayern sind über die ${h.src('hochwasserzentralen', 'Hochwasserzentralen')} erreichbar.</p>`; },
    faqs: (h) => { const p = perRiver(R); return [
      { q: 'Wie viele Mainpegel zeigt diese Seite?', a: `${h.n(p.n)} Pegel der WSV mit aktuellem Wasserstand, von Trunstadt (Main-km ${h.n(h.k('TRUNSTADT').km!, 1)}) bis Raunheim (km ${h.n(h.k('RAUNHEIM').km!, 1)}). Die meisten liegen in Bayern, einige in Hessen, Wertheim in Baden-Württemberg. Für jeden Pegel steht in der Tabelle die Momentaufnahme mit Einordnung; das Werkzeug oben lädt beim Öffnen die aktuellen Werte und zeigt die Änderung der letzten 24 Stunden.` },
      { q: 'Warum zählen die Main-Kilometer von Mainz aus?', a: 'Weil der Main von seiner Mündung in den Rhein flussaufwärts kilometriert wird. Ein höherer Wert liegt deshalb weiter stromauf. Frankfurt liegt deshalb bei einem kleinen Wert, Würzburg und Schweinfurt bei mehreren Hundert Kilometern. Auf dieser Seite stehen die Pegel trotzdem in Fließrichtung, damit man eine Hochwasserwelle stromab verfolgen kann.' },
      { q: 'Kann ein Mainpegel wegen einer Schleuse sinken?', a: 'Ja. Die Wehre halten ein Stauziel; wird es verändert, etwa bei Bauarbeiten oder vor einem Hochwasser, ändert sich auch der Pegel, ohne dass mehr oder weniger Wasser kommt. Ein plötzlicher Sprung um einige Zentimeter ist deshalb nicht immer ein Wetterzeichen.' },
    ]; },
  },
  en: {
    slug: 'main', nav: 'Main', card: 'Main gauges from Trunstadt to Raunheim',
    title: 'Main River Levels Today: Gauges from Bamberg to Frankfurt',
    description: 'Main river levels today: every federal Main gauge with time, 24-hour trend, rating and mark I, from Trunstadt near Bamberg via Würzburg down to Frankfurt.',
    h1: 'Main river levels today: every gauge at a glance',
    intro: (h) => { const p = perRiver(R), s = h.k('FRANKFURT OSTHAFEN'); return `Main river levels today at ${h.n(p.n)} gauges; Frankfurt (Osthafen) read ${h.cm(s.v)} at ${h.when(s.t)}, ${h.trend('FRANKFURT OSTHAFEN')} over 24 hours.`; },
    resume: (h) => { const p = perRiver(R), m = M1(); return `PEGELONLINE lists ${h.n(p.n)} gauges on the Main, from Trunstadt just below Bamberg to Raunheim just before the river joins the Rhine. Main kilometres are counted upstream from the mouth at Mainz; Frankfurt (Osthafen) is at km ${h.n(h.k('FRANKFURT OSTHAFEN').km!, 1)}, ${h.stLink('wuerzburg', 'Würzburg')} at km ${h.n(h.k('WÜRZBURG').km!, 1)}. Over this whole stretch the Main is held back by weirs, so on an ordinary day the gauges sit close to their mean water, and a reading below mean low water can have to do with a lock's target level. In the snapshot ${h.n(p.unterMNW)} Main gauges were at or below their mean low water and ${h.n(p.ueberMHW)} above mean high water. ${h.n(m.length)} gauges carry a mark I in PEGELONLINE, from which special shipping rules apply, and a highest navigable level. Alert stages come from Bavaria and Hesse.`; },
    body: (h) => { const m = M1(); return `<h2>Main river levels today: rating each station</h2>
<p>Because the Main is impounded, the gaps are small: at Würzburg mean low water and mean water are ${h.cm(h.k('WÜRZBURG').mw! - h.k('WÜRZBURG').mnw!)} apart. The table shows every gauge with a mean water in the direction of flow, from Trunstadt to Raunheim.</p>
${lageTable(h, R)}
<h2>Mark I and shipping on the Main</h2>
${h.table([h.t('Pegel', 'Gauge'), 'km', h.t('Marke I', 'Mark I'), h.t('Höchster Schifffahrtswasserstand', 'Highest navigable level'), h.t('Momentaufnahme', 'Snapshot')], m.map((s) => [s.n, h.n(s.km!, 1), h.cm(s.m1!), s.hsw !== undefined ? h.cm(s.hsw) : '–', h.cm(s.v)]), h.t(`Laut PEGELONLINE, Stand ${h.snap}; verbindlich sind die Bekanntmachungen in ELWIS.`, `According to PEGELONLINE, as of ${h.snap}; ELWIS notices are binding.`))}
<p>How marks and alert stages differ is explained in ${h.a('hochwassermarken', 'flood marks and alert stages')}.</p>
<h2>Floods on the Main</h2>
<p>On the Lower Main most records date from ${h.date(h.st('FRANKFURT OSTHAFEN').occ.HHW[0])}: at Frankfurt the Main reached ${h.cm(h.k('FRANKFURT OSTHAFEN').hhw!)}. Further up, at Steinbach and Obernau, February 1970 holds the record, and at Würzburg the Magdalene flood of 1342. Notices for Hesse and Bavaria are linked from the ${h.src('hochwasserzentralen', 'state flood centres')}.</p>`; },
    faqs: (h) => { const p = perRiver(R); return [
      { q: 'How many Main gauges does this page show?', a: `${h.n(p.n)} WSV gauges with a current reading, from Trunstadt (Main km ${h.n(h.k('TRUNSTADT').km!, 1)}) to Raunheim (km ${h.n(h.k('RAUNHEIM').km!, 1)}). Most lie in Bavaria, some in Hesse, and Wertheim in Baden-Württemberg. The table gives each gauge’s snapshot with a rating, and the tool above loads current values and the change over the last 24 hours.` },
      { q: 'Why are Main kilometres counted from Mainz?', a: 'Because the Main is measured upstream from where it joins the Rhine. A higher number therefore lies further upstream. Frankfurt therefore has a small number, Würzburg and Schweinfurt several hundred kilometres. The gauges on this page are still listed in the direction of flow, so you can follow a flood wave downstream.' },
      { q: 'Can a lock make a Main gauge drop?', a: 'Yes. The weirs hold a target level; when it is changed, for works or ahead of a flood, the gauge changes too, without more or less water arriving. A sudden jump of a few centimetres is therefore not always a weather sign.' },
    ]; },
  },
});
