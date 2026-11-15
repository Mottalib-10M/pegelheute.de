import { definePage } from '../../lib/page-types';
import { allCompact, compactOf } from '../../lib/pegel';

const RM = () => compactOf('rhein').filter((s) => s.m1 !== undefined && s.m2 !== undefined);
const MIT_M1 = () => allCompact().filter((s) => s.m1 !== undefined);

export default definePage({
  id: 'hochwassermarken', kind: 'guide', order: 4, tool: 'mini:marke',
  related: ['hochwasser-aktuell', 'st-koeln', 'st-maxau', 'fl-rhein'],
  sources: ['rheinschpv', 'pegelonline', 'hochwasserzentralen', 'elwis'],
  de: {
    slug: 'hochwassermarken', nav: 'Hochwassermarken', card: 'Marke I und II am Rhein, Meldestufen der Länder',
    title: 'Hochwassermarken am Rhein: Marke I und II und Meldestufen',
    description: 'Hochwassermarken am Rhein: was ab Marke I und II für Schiffe gilt, welche 16 Richtpegel zählen, Rechner für den Abstand und Unterschied zu den Meldestufen.',
    h1: 'Hochwassermarken am Rhein: Marke I, Marke II, Meldestufen',
    intro: (h) => { const k = h.k('KÖLN'); return `Hochwassermarken am Rhein: In Köln liegt Marke I bei ${h.cm(k.m1!)}, Marke II bei ${h.cm(k.m2!)}; aktuell zeigt der Pegel ${h.vv(k)} (Stand: ${h.wt(k)}).`; },
    resume: (h) => `Hochwassermarken am Rhein sind Grenzwerte für die Schifffahrt, keine Warnstufen für Anwohner. Die Rheinschifffahrtspolizeiverordnung legt in § 10.01 für ${h.n(RM().length)} Abschnitte je einen Richtpegel mit zwei Marken fest. Ab Marke I halten sich Schiffe in der Talfahrt möglichst in der Strommitte und in der Bergfahrt im mittleren Drittel, fahren höchstens 20 km/h gegenüber dem Ufer, müssen über Funk erreichbar sein, und schnelle Fahrzeuge dürfen nicht fahren; in der Gebirgsstrecke zwischen Bingen und St. Goar gilt für die Talfahrt 24 km/h. Ab Marke II ist die Schifffahrt auf dem Abschnitt verboten mit Ausnahme des Übersetzverkehrs, also der Fähren. Das Verbot endet, wenn der Richtpegel wieder unter Marke II fällt. Für Anwohner gelten andere Zahlen: Die Länder geben eigene Meldestufen heraus, die an andere Pegelwerte geknüpft sind und Hinweise zu Schutzmaßnahmen enthalten. Auch an Mosel, Main und Weser führt PEGELONLINE Marken, ${h.n(MIT_M1().length)} Pegel insgesamt haben eine Marke I; dort gelten die jeweiligen Schifffahrtsvorschriften.`,
    body: (h) => `<h2>Hochwassermarken am Rhein: die 16 Abschnitte</h2>
<p>Die Tabelle zeigt jeden Richtpegel mit seinen Marken nach ${h.src('rheinschpv', 'RheinSchPV § 10.01')} und den aktuellen Stand. Der Rechner oben auf der Seite zeigt, wie weit ein frei gewählter Pegelwert von beiden Marken entfernt ist.</p>
${h.table([h.t('Richtpegel', 'Reference gauge'), 'km', h.t('Marke I', 'Mark I'), h.t('Marke II', 'Mark II'), h.t('Aktueller Stand', 'Current level')], RM().map((s) => [s.n, h.n(s.km!, 1), h.cm(s.m1!), h.cm(s.m2!), h.vv(s)]), h.t('Marken laut PEGELONLINE und Rheinschifffahrtspolizeiverordnung; aktueller Stand beim Öffnen der Seite live gelesen.', 'Marks per PEGELONLINE and the Rhine Shipping Police Regulations; current level read live when the page opens.'))}
<p><a href="#rechner">${h.t('Zum Rechner oben ↑', 'Back to the calculator at the top ↑')}</a></p>
<h2>Marken und Meldestufen sind nicht dasselbe</h2>
<p>Eine Marke regelt, ob und wie Schiffe fahren dürfen. Eine Meldestufe sagt, wie ernst die Lage für Ufer, Straßen und Häuser ist. In Köln etwa kann eine Uferstraße überflutet sein, bevor Marke II erreicht ist. Warnungen, Meldestufen und Vorhersagen finden Sie bei den Ländern über die ${h.src('hochwasserzentralen', 'Hochwasserzentralen')}; die aktuelle Rangliste aller Pegel steht unter ${h.a('hochwasser-aktuell', 'Hochwasser aktuell')}.</p>
<h2>Was die Marken nicht sagen</h2>
<p>Die Marken sagen nichts darüber, ob eine bestimmte Straße oder ein Keller betroffen ist. Diese Seite schätzt das nicht ab. Für die Schifffahrt verbindlich sind die Bekanntmachungen in ${h.src('elwis', 'ELWIS')}, die bei Hochwasser auch Sperrungen einzelner Strecken melden.</p>`,
    faqs: (h) => [
      { q: 'Was gilt ab Hochwassermarke I?', a: 'Talfahrer halten sich möglichst in der Strommitte, Bergfahrer im mittleren Drittel, höchstens 20 km/h gegenüber dem Ufer, mit Funkbereitschaft; schnelle Fahrzeuge dürfen nicht fahren. Zwischen Bingen und St. Goar darf die Talfahrt 24 km/h fahren. Außerdem müssen alle Fahrzeuge funkbereit sein.' },
      { q: 'Was gilt ab Hochwassermarke II?', a: 'Die Schifffahrt auf dem Abschnitt ist verboten, ausgenommen der Übersetzverkehr der Fähren. Das Verbot gilt, bis der Richtpegel wieder unter Marke II sinkt. Welche Marke gilt, hängt vom Abschnitt ab: Für jeden der Abschnitte ist ein eigener Richtpegel festgelegt, in Köln etwa für die Strecke von Mondorf bis Dormagen.' },
      { q: 'Wie viele Richtpegel hat der Rhein?', a: `${h.n(RM().length)}, von Basel-Rheinhalle bis Emmerich. Jeder gilt für einen festgelegten Abschnitt, etwa Köln für Mondorf bis Dormagen. Die Marken liegen an jedem Richtpegel bei anderen Werten, weil jeder Pegel einen eigenen Nullpunkt hat. In Bingen ist Marke II schon bei wenigen Metern erreicht, in Duisburg-Ruhrort erst bei über elf Metern. Die Tabelle auf dieser Seite nennt alle Werte.` },
    ],
  },
  en: {
    slug: 'flood-marks-shipping', nav: 'Flood marks', card: 'Marks I and II on the Rhine, state alert stages',
    title: 'Rhine Flood Marks Explained: Mark I, Mark II, Alert Stages',
    description: 'Rhine flood marks explained: what applies to shipping from mark I and II, the 16 reference gauges, a distance calculator and how state alert stages differ.',
    h1: 'Rhine flood marks explained: mark I, mark II, alert stages',
    intro: (h) => { const k = h.k('KÖLN'); return `Rhine flood marks explained: at Cologne mark I is ${h.cm(k.m1!)} and mark II ${h.cm(k.m2!)}; the gauge currently reads ${h.vv(k)} (as of ${h.wt(k)}).`; },
    resume: (h) => `Rhine flood marks are limits for shipping, not warning levels for residents. The Rhine police regulations set out in § 10.01 one reference gauge with two marks for each of ${h.n(RM().length)} sections. From mark I vessels keep as close to mid-river as possible going downstream and to the middle third going upstream, travel at no more than 20 km/h relative to the bank, be reachable by radio, and fast craft may not sail; in the gorge between Bingen and St. Goar downstream traffic may do 24 km/h. From mark II navigation on the section is prohibited except for ferry crossings. The ban ends when the reference gauge drops back below mark II. Residents go by other numbers: the states publish their own alert stages, tied to different gauge values and with advice on protective measures. PEGELONLINE also lists marks on the Moselle, Main and Weser; ${h.n(MIT_M1().length)} gauges in all have a mark I, and the shipping rules for each waterway apply there.`,
    body: (h) => `<h2>Rhine flood marks: the 16 sections</h2>
<p>The table shows every reference gauge with its marks under ${h.src('rheinschpv', 'RheinSchPV § 10.01')} and the current level. The calculator at the top of the page shows how far a reading of your choice is from both marks.</p>
${h.table([h.t('Richtpegel', 'Reference gauge'), 'km', h.t('Marke I', 'Mark I'), h.t('Marke II', 'Mark II'), h.t('Aktueller Stand', 'Current level')], RM().map((s) => [s.n, h.n(s.km!, 1), h.cm(s.m1!), h.cm(s.m2!), h.vv(s)]), h.t('Marken laut PEGELONLINE und Rheinschifffahrtspolizeiverordnung; aktueller Stand beim Öffnen der Seite live gelesen.', 'Marks per PEGELONLINE and the Rhine Shipping Police Regulations; current level read live when the page opens.'))}
<p><a href="#rechner">${h.t('Zum Rechner oben ↑', 'Back to the calculator at the top ↑')}</a></p>
<h2>Marks and alert stages are not the same thing</h2>
<p>A mark governs whether and how vessels may sail. An alert stage says how serious things are for banks, roads and houses. At Cologne, for instance, a riverside road can be under water before mark II is reached. Warnings, alert stages and forecasts come from the states via the ${h.src('hochwasserzentralen', 'state flood centres')}; the current ranking of all gauges is under ${h.a('hochwasser-aktuell', 'flood levels now')}.</p>
<h2>What the marks do not tell you</h2>
<p>The marks say nothing about whether a particular street or cellar is affected. This page does not estimate that. For shipping the notices in ${h.src('elwis', 'ELWIS')} are binding; in a flood they also announce closures of individual stretches.</p>`,
    faqs: (h) => [
      { q: 'What applies from flood mark I?', a: 'Downstream traffic keeps as close to mid-river as possible, upstream traffic to the middle third, at no more than 20 km/h relative to the bank, with radio watch; fast craft may not sail. Between Bingen and St. Goar downstream traffic may do 24 km/h.' },
      { q: 'What applies from flood mark II?', a: 'Navigation on the section is prohibited except for ferry crossings. The ban lasts until the reference gauge drops back below mark II. Which mark applies depends on the section: each section has its own reference gauge, Cologne for instance for the stretch from Mondorf to Dormagen.' },
      { q: 'How many reference gauges does the Rhine have?', a: `${h.n(RM().length)}, from Basel-Rheinhalle to Emmerich. Each covers a defined section, such as Cologne for Mondorf to Dormagen. The marks sit at different values at each gauge, because every gauge has its own zero. At Bingen mark II is reached at a few metres, at Duisburg-Ruhrort only above eleven. The table on this page lists them all.` },
    ],
  },
});
