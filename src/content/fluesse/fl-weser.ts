import { definePage } from '../../lib/page-types';
import { compact, nom, stationsOf } from '../../lib/pegel';
import { perRiver } from '../_stats';
import { lageTable } from '../_river';

const R = 'weser' as const;
const BINNEN = () => stationsOf(R).filter((s) => s.cv.MThw === undefined);
const TIDE = () => stationsOf(R).filter((s) => s.cv.MThw !== undefined);
const MARK = () => stationsOf(R).filter((s) => s.cv.M_I !== undefined);

export default definePage({
  id: 'fl-weser', kind: 'river', ref: R, order: 6, tool: 'pegel',
  related: ['pegel-lesen', 'hochwassermarken', 'hochwasser-aktuell', 'fl-elbe'],
  sources: ['pegelonline', 'hochwasserzentralen', 'elwis', 'pegelonline-api'],
  de: {
    slug: 'weser', nav: 'Weser', card: 'Weserpegel von Hann. Münden bis Bremerhaven',
    title: 'Pegel Weser aktuell: von Hann. Münden bis nach Bremerhaven',
    description: 'Pegel Weser aktuell: Wasserstände der Weserpegel mit Uhrzeit, Tendenz 24 h, Einordnung und Marken an Ober- und Mittelweser, dazu die Tidepegel bis Bremerhaven.',
    h1: 'Pegel Weser aktuell: Ober-, Mittel- und Unterweser',
    intro: (h) => { const p = perRiver(R), s = h.k('PORTA'); return `Pegel Weser aktuell an ${h.n(p.n)} Messstellen; in Porta Westfalica ${h.vv(s)}, gemessen ${h.wt(s)}, ${h.trend('PORTA')} in 24 Stunden.`; },
    resume: (h) => { const p = perRiver(R), m = MARK(); return `Die Weser hat in PEGELONLINE zwei Gesichter. Ober- und Mittelweser fließen von Hann. Münden, wo Werra und Fulda zusammentreffen, bis zum Weserwehr in Bremen; dort gibt es ${h.n(BINNEN().length)} Pegel mit Kennwerten wie Mittelwasser und Hochwassermarken. Unterhalb des Wehrs beginnt die Unterweser, die den Gezeiten folgt; ihre ${h.n(TIDE().length)} Tidepegel bis Bremerhaven haben Tidekennwerte statt Mittelwasser. Die beiden Teile haben getrennte Kilometrierungen: Die Oberweser zählt ab Hann. Münden, die Unterweser ab der Großen Weserbrücke in Bremen. Diese Seite ordnet zuerst die Binnenpegel, dann die Tidepegel. Beim Erstellen der Seite (Stand: ${h.snap}) lagen ${h.n(p.unterMNW)} Weserpegel auf oder unter ihrem mittleren Niedrigwasser und ${h.n(p.ueberMHW)} über dem mittleren Hochwasser. ${h.n(m.length)} Binnenpegel führen Marken I, II und III. Den höchsten Stand verzeichnen viele Pegel der Oberweser im Februar 1946, die meisten Tidepegel bei der Sturmflut vom Dezember 2013.`; },
    body: (h) => { const m = MARK(); return `<h2>Pegel Weser aktuell an Ober- und Mittelweser</h2>
<p>Die Tabelle ordnet jeden Binnenpegel mit Mittelwasser ein, von Hann. Münden stromab. An der Mittelweser liegen Staustufen; einige Pegel dort, etwa Nienburg oder Hoya, schwanken deshalb wenig.</p>
${lageTable(h, R)}
<h2>Marken an der Weser</h2>
${h.table([h.t('Pegel', 'Gauge'), 'km', h.t('Marke I', 'Mark I'), h.t('Marke II', 'Mark II'), h.t('Marke III', 'Mark III'), h.t('Aktueller Stand', 'Current level')], m.map((s) => [nom(s.name), h.n(s.km!, 1), h.cm(s.cv.M_I), s.cv.M_II !== undefined ? h.cm(s.cv.M_II) : '–', s.cv.M_III !== undefined ? h.cm(s.cv.M_III) : '–', h.vv(compact(s))]), h.t(`Laut PEGELONLINE, Stand ${h.snap}; maßgeblich für die Schifffahrt sind die Bekanntmachungen in ELWIS.`, `According to PEGELONLINE, as of ${h.snap}; ELWIS notices are binding for shipping.`))}
<p>Was die Marken von den Meldestufen der Länder unterscheidet, erklärt ${h.a('hochwassermarken', 'Hochwassermarken und Meldestufen')}.</p>
<h2>Die Unterweser und die Gezeiten</h2>
<p>Von Bremen bis Bremerhaven steigt und fällt die Weser mit der Tide. In Bremerhaven (Alter Leuchtturm) liegt das mittlere Tidehochwasser bei ${h.cm(h.st('BHV ALTER LEUCHTTURM').cv.MThw)}, das mittlere Tideniedrigwasser bei ${h.cm(h.st('BHV ALTER LEUCHTTURM').cv.MTnw)}. Weil der Wert sich stündlich ändert, zeigt das Werkzeug für diese Pegel keine Einordnung. Warnungen bei Sturmflut gibt das ${h.src('hochwasserzentralen', 'Hochwasserportal der Länder')} weiter.</p>`; },
    faqs: (h) => [
      { q: 'Warum hat die Weser zwei Kilometrierungen?', a: 'Weil Ober- und Mittelweser ab Hann. Münden gezählt werden und die Unterweser ab der Großen Weserbrücke in Bremen neu beginnt. Ein Kilometerwert allein sagt deshalb nicht, wo an der Weser ein Pegel liegt. Diese Seite ordnet deshalb nach Abschnitt. Zuerst Ober- und Mittelweser.' },
      { q: 'Wann war das höchste Weserhochwasser?', a: `An vielen Pegeln der Oberweser im Februar 1946; in Hann. Münden erreichte die Weser ${h.cm(h.st('HANN.MUENDEN').cv.HHW)}. An der Unterweser stammen die höchsten Tidehochwasser von der Sturmflut im Dezember 2013. Die Tidepegel nennen Tidehochwasser. Für die Unterweser warnt bei Sturmflut das Bundesamt für Seeschifffahrt und Hydrographie.` },
      { q: 'Warum zeigen die Bremer Pegel keine Einordnung?', a: 'Weil sie Tidepegel sind. Statt Mittelwasser hat PEGELONLINE dort mittleres Tidehoch- und Tideniedrigwasser; der Wert wechselt zweimal am Tag zwischen beiden. Sturmflutwarnungen gibt das Bundesamt für Seeschifffahrt und Hydrographie heraus. Das Werkzeug zeigt aber Wert, Uhrzeit und Tendenz. PEGELONLINE führt die Tidekennwerte für jede dieser Stationen.' },
    ],
  },
  en: {
    slug: 'weser', nav: 'Weser', card: 'Weser gauges from Hann. Münden to Bremerhaven',
    title: 'Weser Water Levels Today: Hann. Münden to Bremerhaven',
    description: 'Weser water levels today: readings with time, 24-hour trend, rating and marks on the Upper and Middle Weser, plus the tidal gauges down to Bremerhaven.',
    h1: 'Weser water levels today: Upper, Middle and Lower Weser',
    intro: (h) => { const p = perRiver(R), s = h.k('PORTA'); return `Weser water levels today at ${h.n(p.n)} gauges; Porta Westfalica read ${h.vv(s)} at ${h.wt(s)}, ${h.trend('PORTA')} over 24 hours.`; },
    resume: (h) => { const p = perRiver(R), m = MARK(); return `The Weser has two faces in PEGELONLINE. The Upper and Middle Weser run from Hann. Münden, where the Werra and the Fulda meet, to the Weser weir in Bremen; there are ${h.n(BINNEN().length)} gauges there with reference values such as mean water and flood marks. Below the weir the Lower Weser begins and follows the tides; its ${h.n(TIDE().length)} tidal gauges down to Bremerhaven have tidal values instead of mean water. The two parts have separate kilometre counts: the Upper Weser from Hann. Münden, the Lower Weser from the Große Weserbrücke in Bremen. This page lists the inland gauges first, then the tidal ones. When the page was built (as of ${h.snap}), ${h.n(p.unterMNW)} Weser gauges were at or below their mean low water and ${h.n(p.ueberMHW)} above mean high water. ${h.n(m.length)} inland gauges carry marks I, II and III. Many Upper Weser gauges record their highest level in February 1946, most tidal gauges in the storm surge of December 2013.`; },
    body: (h) => { const m = MARK(); return `<h2>Weser water levels today on the Upper and Middle Weser</h2>
<p>The table rates every inland gauge that has a mean water, from Hann. Münden downstream. The Middle Weser has barrages, so some gauges there, such as Nienburg or Hoya, vary little.</p>
${lageTable(h, R)}
<h2>Marks on the Weser</h2>
${h.table([h.t('Pegel', 'Gauge'), 'km', h.t('Marke I', 'Mark I'), h.t('Marke II', 'Mark II'), h.t('Marke III', 'Mark III'), h.t('Aktueller Stand', 'Current level')], m.map((s) => [nom(s.name), h.n(s.km!, 1), h.cm(s.cv.M_I), s.cv.M_II !== undefined ? h.cm(s.cv.M_II) : '–', s.cv.M_III !== undefined ? h.cm(s.cv.M_III) : '–', h.vv(compact(s))]), h.t(`Laut PEGELONLINE, Stand ${h.snap}; maßgeblich für die Schifffahrt sind die Bekanntmachungen in ELWIS.`, `According to PEGELONLINE, as of ${h.snap}; ELWIS notices are binding for shipping.`))}
<p>How the marks differ from the states' alert stages is explained in ${h.a('hochwassermarken', 'flood marks and alert stages')}.</p>
<h2>The Lower Weser and the tides</h2>
<p>From Bremen to Bremerhaven the Weser rises and falls with the tide. At Bremerhaven (Alter Leuchtturm) mean high tide is ${h.cm(h.st('BHV ALTER LEUCHTTURM').cv.MThw)} and mean low tide ${h.cm(h.st('BHV ALTER LEUCHTTURM').cv.MTnw)}. Because the value changes by the hour, the tool gives no rating for these gauges. Storm surge warnings are relayed by the ${h.src('hochwasserzentralen', 'states’ flood portal')}.</p>`; },
    faqs: (h) => [
      { q: 'Why does the Weser have two kilometre counts?', a: 'Because the Upper and Middle Weser are counted from Hann. Münden and the Lower Weser starts again from the Große Weserbrücke in Bremen. A kilometre value alone therefore does not tell you where on the Weser a gauge lies. This page therefore sorts by section.' },
      { q: 'When was the highest Weser flood?', a: `At many Upper Weser gauges in February 1946; at Hann. Münden the Weser reached ${h.cm(h.st('HANN.MUENDEN').cv.HHW)}. On the Lower Weser the highest tides date from the storm surge of December 2013. The tidal gauges give high tide values. Storm surges on the Lower Weser are a matter for the federal maritime agency.` },
      { q: 'Why do the Bremen gauges show no rating?', a: 'Because they are tidal gauges. Instead of mean water PEGELONLINE gives mean high and low tide there; the reading swings between the two twice a day. Storm surge warnings come from the federal maritime agency. The tool still shows the reading, time and trend.' },
    ],
  },
});
