import { definePage } from '../../lib/page-types';
import { compactOf } from '../../lib/pegel';
import { perRiver } from '../_stats';
import { lageTable } from '../_river';

const R = 'elbe' as const;
const TIDE = () => compactOf(R).filter((s) => s.mw === undefined && (s.km ?? 0) > 586).length;

export default definePage({
  id: 'fl-elbe', kind: 'river', ref: R, order: 2, tool: 'pegel',
  related: ['st-dresden', 'st-magdeburg', 'hochwasser-aktuell', 'pegel-lesen'],
  sources: ['pegelonline', 'hochwasserzentralen', 'wsv', 'elwis'],
  de: {
    slug: 'elbe', nav: 'Elbe', card: 'Alle Elbpegel von Schöna bis Cuxhaven',
    title: 'Pegel Elbe aktuell: alle Elbpegel von Schöna bis Cuxhaven',
    description: 'Pegel Elbe aktuell: Wasserstände aller Elbpegel mit Uhrzeit, Tendenz 24 h und Einordnung nach Mittelwasser, von der tschechischen Grenze bis nach Cuxhaven.',
    h1: 'Pegel Elbe aktuell: alle Elbpegel auf einen Blick',
    intro: (h) => { const p = perRiver(R), d = h.k('DRESDEN'); return `Pegel Elbe aktuell an ${h.n(p.n)} Messstellen; in Dresden ${h.vv(d)}, gemessen ${h.wt(d)}, ${h.trend('DRESDEN')} in 24 Stunden.`; },
    resume: (h) => { const p = perRiver(R); return `Die Elbe ist in PEGELONLINE mit ${h.n(p.n)} Pegeln vertreten, von Schöna an der tschechischen Grenze bis Cuxhaven an der Mündung. Die Elbe-Kilometer beginnen an der Grenze bei km 0 und steigen stromab; Dresden liegt bei km ${h.n(h.k('DRESDEN').km!, 1)}, Magdeburg bei km ${h.n(h.k('MAGDEBURG-STROMBRÜCKE').km!, 1)}, Hamburg St. Pauli bei km ${h.n(h.k('HAMBURG ST. PAULI').km!, 1)}. Unterhalb des Wehrs Geesthacht steht die Elbe unter dem Einfluss der Gezeiten; dort steigt und fällt der Pegel zweimal am Tag, und Mittelwasser wie im Binnenland gibt es nicht. ${h.n(TIDE())} Pegel dieser Tidestrecke haben deshalb keine Einordnung nach Mittelwasser. Beim Erstellen der Seite (Stand: ${h.snap}) lagen ${h.n(p.unterMNW)} Elbpegel auf oder unter ihrem mittleren Niedrigwasser und ${h.n(p.ueberMHW)} über dem mittleren Hochwasser. Hochwassermarken wie am Rhein kennt die Elbe nicht; für die Schifffahrt nennt PEGELONLINE an einigen Pegeln einen höchsten Schifffahrtswasserstand. Die Uhrzeit jeder Messung steht im Werkzeug neben dem Wert.`; },
    body: (h) => `<h2>Pegel Elbe aktuell im Binnenland</h2>
<p>Die Tabelle ordnet jeden Binnenpegel mit Mittelwasser ein. Zwischen Schöna und Geesthacht ist die Elbe frei fließend, ohne Staustufen; deshalb schwanken die Werte hier stärker als am gestauten Main. Lange Trockenperioden lassen die Elbe besonders in Sachsen und Sachsen-Anhalt tief fallen.</p>
${lageTable(h, R)}
<h2>Hochwasser an der Elbe</h2>
<p>Die großen Hochwasser von 2002 und 2013 stehen in den Kennwerten vieler Pegel: In ${h.stLink('dresden')} erreichte die Elbe ${h.cm(h.k('DRESDEN').hhw!)}, in ${h.stLink('magdeburg')} ${h.cm(h.k('MAGDEBURG-STROMBRÜCKE').hhw!)}, in Wittenberge ${h.cm(h.k('WITTENBERGE').hhw!)}. Amtliche Warnungen geben die Länder heraus, die über die ${h.src('hochwasserzentralen', 'Hochwasserzentralen')} verlinkt sind; wie die Lage an allen Flüssen gerade aussieht, zeigt ${h.a('hochwasser-aktuell', 'Hochwasser aktuell')}.</p>
<h2>Die Tideelbe in Hamburg</h2>
<p>An den Pegeln unterhalb von Geesthacht zeigt das Werkzeug den Wert, aber keine Einordnung nach Mittelwasser. Der Wasserstand folgt dort den Gezeiten der Nordsee; für Hamburg gibt PEGELONLINE Tidekennwerte wie das mittlere Tidehochwasser an. Wie man Pegelzahlen in Meereshöhen umrechnet, erklärt ${h.a('pegel-lesen', 'Pegel richtig lesen')}.</p>`,
    faqs: (h) => { const p = perRiver(R); return [
      { q: 'Wie viele Elbpegel gibt es in PEGELONLINE?', a: `${h.n(p.n)} Pegel mit aktuellem Wasserstand, von Schöna (Elbe-km ${h.n(h.k('SCHÖNA').km!, 1)}) bis Cuxhaven Steubenhöft (km ${h.n(h.k('CUXHAVEN STEUBENHÖFT').km!)}). Davon liegen die meisten im Binnenland, ein größerer Teil aber an der Tideelbe unterhalb von Geesthacht. Für jeden Pegel zeigt die Tabelle auf dieser Seite den aktuellen Wert, beim Öffnen live von PEGELONLINE gelesen.` },
      { q: 'Warum hat der Pegel Hamburg keine Einordnung nach Mittelwasser?', a: 'Weil die Elbe in Hamburg den Gezeiten folgt. Statt Mittelwasser führt PEGELONLINE dort Tidekennwerte, etwa mittleres Tidehochwasser und Tideniedrigwasser. Ein Vergleich mit Mittelwasser würde dort zweimal am Tag zwischen „niedrig“ und „hoch“ springen. Für Sturmfluten in Hamburg sind die Warnungen des Bundesamts für Seeschifffahrt und Hydrographie zuständig.' },
      { q: 'Wo beginnt die Elbe-Kilometrierung?', a: 'An der deutsch-tschechischen Grenze bei km 0. Die Strecke in Tschechien hat eine eigene Zählung. Von dort steigen die Kilometer bis zur Mündung bei Cuxhaven. Dresden liegt deshalb bei einem kleinen Wert, Hamburg bei über 600 Kilometern. Auf dieser Seite stehen die Pegel in derselben Reihenfolge, von der Grenze zur Nordsee.' },
    ]; },
  },
  en: {
    slug: 'elbe', nav: 'Elbe', card: 'Every Elbe gauge from Schöna to Cuxhaven',
    title: 'Elbe Water Levels Today: Every Gauge from Schöna to Cuxhaven',
    description: 'Elbe water levels today: every federal Elbe gauge with time, 24-hour trend and rating against mean water, from the Czech border to the mouth at Cuxhaven.',
    h1: 'Elbe water levels today: every gauge at a glance',
    intro: (h) => { const p = perRiver(R), d = h.k('DRESDEN'); return `Elbe water levels today at ${h.n(p.n)} gauges; Dresden read ${h.vv(d)} at ${h.wt(d)}, ${h.trend('DRESDEN')} over 24 hours.`; },
    resume: (h) => { const p = perRiver(R); return `The Elbe appears in PEGELONLINE with ${h.n(p.n)} gauges, from Schöna on the Czech border to Cuxhaven at the mouth. Elbe kilometres start at the border at km 0 and rise downstream; Dresden is at km ${h.n(h.k('DRESDEN').km!, 1)}, Magdeburg at km ${h.n(h.k('MAGDEBURG-STROMBRÜCKE').km!, 1)}, Hamburg St. Pauli at km ${h.n(h.k('HAMBURG ST. PAULI').km!, 1)}. Below the Geesthacht weir the Elbe is tidal; the level rises and falls twice a day and there is no inland-style mean water. ${h.n(TIDE())} gauges on this tidal stretch therefore have no rating against mean water. When the page was built (as of ${h.snap}), ${h.n(p.unterMNW)} Elbe gauges were at or below their mean low water and ${h.n(p.ueberMHW)} above mean high water. The Elbe has no flood marks like the Rhine; for shipping, PEGELONLINE gives a highest navigable water level at some gauges. The time of each reading is shown in the tool next to the value.`; },
    body: (h) => `<h2>Elbe water levels today inland</h2>
<p>The table rates every inland gauge that has a mean water. Between Schöna and Geesthacht the Elbe flows freely, with no weirs, so readings swing more than on the impounded Main. Long dry spells drive the Elbe especially low in Saxony and Saxony-Anhalt.</p>
${lageTable(h, R)}
<h2>Floods on the Elbe</h2>
<p>The great floods of 2002 and 2013 are written into the reference values of many gauges: the Elbe reached ${h.cm(h.k('DRESDEN').hhw!)} at ${h.stLink('dresden', 'Dresden')}, ${h.cm(h.k('MAGDEBURG-STROMBRÜCKE').hhw!)} at ${h.stLink('magdeburg', 'Magdeburg')} and ${h.cm(h.k('WITTENBERGE').hhw!)} at Wittenberge. Official warnings come from the states, linked from the ${h.src('hochwasserzentralen', 'state flood centres')}; for the picture across all rivers right now see ${h.a('hochwasser-aktuell', 'flood levels now')}.</p>
<h2>The tidal Elbe at Hamburg</h2>
<p>At gauges below Geesthacht the tool shows the reading but no rating against mean water. The level there follows the North Sea tides; for Hamburg PEGELONLINE gives tidal reference values such as mean high tide. How to turn gauge readings into heights above sea level is explained in ${h.a('pegel-lesen', 'reading a gauge')}.</p>`,
    faqs: (h) => { const p = perRiver(R); return [
      { q: 'How many Elbe gauges does PEGELONLINE have?', a: `${h.n(p.n)} gauges with a current water level, from Schöna (Elbe km ${h.n(h.k('SCHÖNA').km!, 1)}) to Cuxhaven Steubenhöft (km ${h.n(h.k('CUXHAVEN STEUBENHÖFT').km!)}). Most are inland, but a sizeable share sits on the tidal Elbe below Geesthacht. The table on this page shows each gauge’s current reading, read live from PEGELONLINE when you open it.` },
      { q: 'Why does the Hamburg gauge have no mean-water rating?', a: 'Because the Elbe at Hamburg is tidal. Instead of mean water, PEGELONLINE lists tidal values there, such as mean high tide and mean low tide. A mean-water comparison would flip between “low” and “high” twice a day. Storm surge warnings for Hamburg come from the federal maritime agency.' },
      { q: 'Where does Elbe kilometre counting start?', a: 'At the German-Czech border, at km 0. The Czech stretch has its own count. From there the kilometres rise to the mouth at Cuxhaven, so Dresden has a small number and Hamburg one above 600. The gauges on this page follow the same order, from the border to the North Sea.' },
    ]; },
  },
});
