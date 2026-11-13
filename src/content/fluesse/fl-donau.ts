import { definePage } from '../../lib/page-types';
import { stationsOf } from '../../lib/pegel';
import { perRiver } from '../_stats';
import { lageTable } from '../_river';

const R = 'donau' as const;
const DE = () => stationsOf(R).filter((s) => s.agency !== 'VIA DONAU');
const AT = () => stationsOf(R).filter((s) => s.agency === 'VIA DONAU');

export default definePage({
  id: 'fl-donau', kind: 'river', ref: R, order: 3, tool: 'pegel',
  related: ['st-passau', 'hochwasser-aktuell', 'hochwassermarken', 'pegel-lesen'],
  sources: ['pegelonline', 'hnd-bayern', 'hochwasserzentralen', 'elwis'],
  de: {
    slug: 'donau', nav: 'Donau', card: 'Donaupegel von Ingolstadt bis Passau und Österreich',
    title: 'Pegel Donau aktuell: Donaupegel von Ingolstadt bis Passau',
    description: 'Pegel Donau aktuell: Wasserstände der Donaupegel mit Uhrzeit, Tendenz 24 h und Einordnung, von Ingolstadt über Regensburg und Passau bis nach Österreich.',
    h1: 'Pegel Donau aktuell: die Donaupegel auf einen Blick',
    intro: (h) => { const p = perRiver(R), s = h.k('PASSAU DONAU'); return `Pegel Donau aktuell an ${h.n(p.n)} Messstellen; in Passau ${h.cm(s.v)}, gemessen ${h.when(s.t)}, ${h.trend('PASSAU DONAU')} in 24 Stunden.`; },
    resume: (h) => { const p = perRiver(R); return `PEGELONLINE führt an der Donau ${h.n(p.n)} Pegel: ${h.n(DE().length)} an der deutschen Donau, von Ingolstadt bis Erlau unterhalb von Passau, und ${h.n(AT().length)} österreichische Stationen der via donau, die über dieselbe Schnittstelle veröffentlicht werden. Anders als an Rhein und Elbe zählen die Donau-Kilometer von der Mündung ins Schwarze Meer flussaufwärts; Passau liegt deshalb bei km ${h.n(h.k('PASSAU DONAU').km!, 1)}, Regensburg bei km ${h.n(h.k('REGENSBURG EISERNE BRÜCKE').km!, 1)}. Diese Seite ordnet die Pegel in Fließrichtung, von Ingolstadt nach Österreich. In der Momentaufnahme lagen ${h.n(p.unterMNW)} Donaupegel auf oder unter ihrem mittleren Niedrigwasser und ${h.n(p.ueberMHW)} über dem mittleren Hochwasser. Die österreichischen Stationen haben in PEGELONLINE nur wenige Kennwerte, meist den Regulierungsniederwasserstand und den höchsten Schifffahrtswasserstand; eine Einordnung nach Mittelwasser fehlt dort. Meldestufen für die bayerische Donau gibt der Hochwassernachrichtendienst Bayern heraus. Die Uhrzeit jeder Messung steht im Werkzeug oben neben dem Wert.`; },
    body: (h) => `<h2>Pegel Donau aktuell in Bayern</h2>
<p>Zwischen Kelheim und Passau ist die Donau eine Bundeswasserstraße mit Staustufen; nur zwischen Straubing und Vilshofen fließt sie über weite Strecken frei. Die Tabelle ordnet jeden Pegel mit Mittelwasser ein.</p>
${lageTable(h, R)}
<h2>Hochwasser an der Donau</h2>
<p>Die Rekorde stammen an der bayerischen Donau aus verschiedenen Jahrhunderten: In Regensburg aus dem ${h.date(h.st('REGENSBURG EISERNE BRÜCKE').occ.HHW[0])} mit ${h.cm(h.k('REGENSBURG EISERNE BRÜCKE').hhw!)}, in Hofkirchen aus dem ${h.date(h.st('HOFKIRCHEN').occ.HHW[0])}, in ${h.stLink('passau')} gleich zweimal, 1954 und 2013, mit ${h.cm(h.k('PASSAU DONAU').hhw!)}. Für die Meldestufen ist der ${h.src('hnd-bayern', 'Hochwassernachrichtendienst Bayern')} zuständig; was Meldestufen und Schifffahrtsgrenzen unterscheidet, erklärt ${h.a('hochwassermarken', 'Hochwassermarken und Meldestufen')}.</p>
<h2>Die Donau in Österreich</h2>
<p>Ab Achleiten stehen die Pegel der via donau; Erlau am Grenzabschnitt gehört noch zur deutschen WSV. Ihre Werte zeigt das Werkzeug wie die deutschen, die Einordnung bleibt aber leer, weil die Kennwerte fehlen. Der Nullpunkt wird dort in Metern über Adria angegeben, nicht über NHN.</p>`,
    faqs: (h) => [
      { q: 'Warum zählen die Donau-Kilometer rückwärts?', a: `Weil die Donau von ihrer Mündung ins Schwarze Meer aus kilometriert wird. Passau liegt bei km ${h.n(h.k('PASSAU DONAU').km!, 1)}, Ingolstadt weiter stromauf bei einem höheren Wert. Diese Zählung gilt international für die ganze Donau, von Rumänien bis Baden-Württemberg. Auf dieser Seite stehen die Pegel trotzdem in Fließrichtung, also von Ingolstadt nach Österreich, damit man eine Welle stromab verfolgen kann.` },
      { q: 'Warum stehen österreichische Pegel auf dieser Seite?', a: 'Weil PEGELONLINE die Donaupegel der österreichischen via donau mit veröffentlicht. Sie haben dort nur wenige Kennwerte, deshalb ordnet das Werkzeug sie nicht nach Mittelwasser ein. Für Passau sind sie nützlich, weil Achleiten direkt unterhalb von Passau liegt und zeigt, wie das Wasser aus Inn und Donau gemeinsam weiterläuft. Ihre Werte stammen aus derselben Schnittstelle und tragen dieselbe Uhrzeit.' },
      { q: 'Wer gibt Hochwasserwarnungen für die Donau in Bayern heraus?', a: 'Der Hochwassernachrichtendienst Bayern beim Landesamt für Umwelt. Er veröffentlicht Meldestufen und Vorhersagen; dieses Werkzeug zeigt nur gemessene Werte. Die WSV betreibt viele Pegel an der Donau, warnt aber nicht selbst. Wer in Regensburg, Deggendorf oder Passau wohnt, sollte bei steigendem Wasser die Meldestufen und Vorhersagen des Landes lesen; sie berücksichtigen auch Regen, der noch nicht im Fluss angekommen ist.' },
    ],
  },
  en: {
    slug: 'danube', nav: 'Danube', card: 'Danube gauges from Ingolstadt to Passau and Austria',
    title: 'Danube Water Levels Today: Gauges from Ingolstadt to Passau',
    description: 'Danube water levels today: the Danube gauges with time, 24-hour trend and rating, from Ingolstadt via Regensburg and Passau on into Austria, from official data.',
    h1: 'Danube water levels today: the gauges at a glance',
    intro: (h) => { const p = perRiver(R), s = h.k('PASSAU DONAU'); return `Danube water levels today at ${h.n(p.n)} gauges; Passau read ${h.cm(s.v)} at ${h.when(s.t)}, ${h.trend('PASSAU DONAU')} over 24 hours.`; },
    resume: (h) => { const p = perRiver(R); return `PEGELONLINE lists ${h.n(p.n)} gauges on the Danube: ${h.n(DE().length)} on the German Danube, from Ingolstadt to Erlau below Passau, and ${h.n(AT().length)} Austrian stations run by via donau and published through the same interface. Unlike the Rhine and the Elbe, Danube kilometres are counted upstream from the mouth at the Black Sea, so Passau sits at km ${h.n(h.k('PASSAU DONAU').km!, 1)} and Regensburg at km ${h.n(h.k('REGENSBURG EISERNE BRÜCKE').km!, 1)}. This page lists the gauges in the direction of flow, from Ingolstadt into Austria. In the snapshot ${h.n(p.unterMNW)} Danube gauges were at or below their mean low water and ${h.n(p.ueberMHW)} above mean high water. The Austrian stations carry few reference values in PEGELONLINE, mostly the regulated low water level and the highest navigable level, so there is no rating against mean water for them. Alert stages for the Bavarian Danube come from the Bavarian flood information service.`; },
    body: (h) => `<h2>Danube water levels today in Bavaria</h2>
<p>Between Kelheim and Passau the Danube is a federal waterway with barrages; only between Straubing and Vilshofen does it flow freely for long stretches. The table rates every gauge that has a mean water.</p>
${lageTable(h, R)}
<h2>Floods on the Danube</h2>
<p>The records on the Bavarian Danube come from different centuries: at Regensburg from ${h.date(h.st('REGENSBURG EISERNE BRÜCKE').occ.HHW[0])} at ${h.cm(h.k('REGENSBURG EISERNE BRÜCKE').hhw!)}, at Hofkirchen from ${h.date(h.st('HOFKIRCHEN').occ.HHW[0])}, at ${h.stLink('passau', 'Passau')} twice, in 1954 and 2013, at ${h.cm(h.k('PASSAU DONAU').hhw!)}. Alert stages are the job of the ${h.src('hnd-bayern', 'Bavarian flood information service')}; how alert stages differ from navigation limits is explained in ${h.a('hochwassermarken', 'flood marks and alert stages')}.</p>
<h2>The Danube in Austria</h2>
<p>From Achleiten onwards the gauges belong to via donau; Erlau, on the border stretch, is still a German WSV gauge. The tool shows their readings like the German ones, but the rating stays empty because the reference values are missing. Their datum is given in metres above the Adriatic, not above German sea level (NHN).</p>`,
    faqs: (h) => [
      { q: 'Why do Danube kilometres count backwards?', a: `Because the Danube is measured from its mouth at the Black Sea. Passau is at km ${h.n(h.k('PASSAU DONAU').km!, 1)}, Ingolstadt further upstream at a higher number. The same count is used for the whole river, from Romania up to Baden-Württemberg. On this page the gauges are still listed in the direction of flow, from Ingolstadt into Austria, so you can follow a flood wave downstream.` },
      { q: 'Why are Austrian gauges on this page?', a: 'Because PEGELONLINE also publishes the Danube gauges of the Austrian agency via donau. They carry few reference values there, so the tool does not rate them against mean water. For Passau they are useful, because Achleiten lies just below Passau and shows how the Inn and Danube water moves on together.' },
      { q: 'Who issues flood warnings for the Danube in Bavaria?', a: 'The Bavarian flood information service at the state environment agency. It publishes alert stages and forecasts; this tool shows measured values only. The WSV runs many Danube gauges but does not warn itself. If you live in Regensburg, Deggendorf or Passau, read the state’s alert stages and forecasts when the water rises; they also account for rain that has not yet reached the river.' },
    ],
  },
});
