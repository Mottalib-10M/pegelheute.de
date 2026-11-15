import { definePage } from '../../lib/page-types';
import { compact, nom, stationsOf } from '../../lib/pegel';
import { perRiver } from '../_stats';

const R = 'mosel' as const;
const OP = () => stationsOf(R).filter((s) => / OP$/.test(s.name));
const UP = () => stationsOf(R).filter((s) => / UP$/.test(s.name));
const MARK = () => stationsOf(R).filter((s) => s.cv.M_I !== undefined);

export default definePage({
  id: 'fl-mosel', kind: 'river', ref: R, order: 5, tool: 'pegel',
  related: ['st-koblenz', 'hochwassermarken', 'pegel-lesen', 'fl-rhein'],
  sources: ['pegelonline', 'hochwasserzentralen', 'elwis', 'pegelonline-api'],
  de: {
    slug: 'mosel', nav: 'Mosel', card: 'Moselpegel von Perl bis Koblenz',
    title: 'Pegel Mosel aktuell: Cochem, Trier und alle Moselpegel',
    description: 'Pegel Mosel aktuell: Wasserstände der Moselpegel von Perl über Trier und Cochem bis Koblenz, mit Uhrzeit, Tendenz 24 h, Marken und Ober- und Unterpegeln.',
    h1: 'Pegel Mosel aktuell: Cochem, Trier und die Schleusenpegel',
    intro: (h) => { const p = perRiver(R), s = h.k('Cochem'); return `Pegel Mosel aktuell an ${h.n(p.n)} Messstellen; in Cochem ${h.vv(s)}, gemessen ${h.wt(s)}, ${h.trend('Cochem')} in 24 Stunden.`; },
    resume: (h) => { const p = perRiver(R), c = h.k('Cochem'), t = h.k('Trier UP'); return `Die Mosel ist zwischen Perl und Koblenz durch Staustufen gegliedert, und PEGELONLINE misst an fast jeder davon zweimal: am Oberpegel (OP) oberhalb und am Unterpegel (UP) unterhalb des Wehrs. ${h.n(OP().length)} Oberpegel und ${h.n(UP().length)} Unterpegel ergeben zusammen mit den freien Pegeln ${h.n(p.n)} Messstellen. Die Oberpegel zeigen hohe Zahlen, weil sie das gestaute Wasser messen; sie eignen sich nicht, um Hochwasser einzuschätzen. Dafür taugen die Unterpegel und die Hauptpegel ${h.stLink('koblenz', 'stromab in Koblenz')} sowie Cochem und Trier. Cochem steht aktuell bei ${h.vv(c)}, mit einem Mittelwasser von ${h.cm(c.mw!)} und Marke I bei ${h.cm(c.m1!)}; Trier (Unterpegel) zeigt ${h.vv(t)} bei Mittelwasser ${h.cm(t.mw!)}. Die Mosel-Kilometer zählen von der Mündung in Koblenz flussaufwärts. In Cochem, Zeltingen und Trier stammt der höchste Stand vom Dezember 1993.`; },
    body: (h) => { const m = MARK(); return `<h2>Pegel Mosel aktuell: Oberpegel und Unterpegel</h2>
<p>Ein Oberpegel zeigt fast immer einen großen Wert, der vor allem vom Stauziel des Wehrs abhängt und wenig über den Abfluss sagt. Wer wissen will, ob die Mosel steigt, schaut auf die Unterpegel oder auf die Tendenz: Das Werkzeug zeigt für jeden Pegel die Änderung der letzten 24 Stunden.</p>
<h2>Marken an der Mosel</h2>
<p>PEGELONLINE führt an einigen Moselpegeln Marken I, II und III. Für die Schifffahrt auf der Mosel gelten eigene Vorschriften; maßgeblich sind die Bekanntmachungen in ${h.src('elwis', 'ELWIS')}.</p>
${h.table([h.t('Pegel', 'Gauge'), 'km', h.t('Marke I', 'Mark I'), h.t('Marke II', 'Mark II'), h.t('Marke III', 'Mark III'), h.t('Aktueller Stand', 'Current level')], m.map((s) => [nom(s.name), h.n(s.km!, 1), h.cm(s.cv.M_I), s.cv.M_II !== undefined ? h.cm(s.cv.M_II) : '–', s.cv.M_III !== undefined ? h.cm(s.cv.M_III) : '–', h.vv(compact(s))]), h.t(`Laut PEGELONLINE, Stand ${h.snap}.`, `According to PEGELONLINE, as of ${h.snap}.`))}
<h2>Hochwasser an der Mosel</h2>
<p>In Cochem erreichte die Mosel am ${h.date(h.st('Cochem').occ.HHW[0])} ${h.cm(h.k('Cochem').hhw!)}, in Trier ${h.cm(h.k('Trier UP').hhw!)}. Die Mosel bringt bei Hochwasser viel Wasser in den Rhein; deshalb lohnt bei ${h.stLink('koblenz')} der Blick auf beide Flüsse. Warnungen für Rheinland-Pfalz und das Saarland sind über die ${h.src('hochwasserzentralen', 'Hochwasserzentralen')} erreichbar; Grevenmacher und Stadtbredimus liegen an der Grenze zu Luxemburg.</p>`; },
    faqs: (h) => [
      { q: 'Was ist der Unterschied zwischen Oberpegel und Unterpegel?', a: 'Der Oberpegel (OP) misst oberhalb eines Wehrs im gestauten Wasser, der Unterpegel (UP) unterhalb. Für die Frage, ob die Mosel Hochwasser führt, ist der Unterpegel aussagekräftiger. Am Oberpegel bleibt der Wert lange gleich, solange die Staustufe ihr Stauziel hält. Die Tendenz zeigt das deutlich.' },
      { q: 'Ab welchem Pegel Cochem gilt Marke I?', a: `PEGELONLINE führt für Cochem Marke I bei ${h.cm(h.k('Cochem').m1!)} und Marke II bei ${h.cm(h.k('Cochem').m2!)}. Verbindlich für die Schifffahrt sind die Bekanntmachungen in ELWIS. Cochem ist einer der wenigen Moselpegel mit vollständigen Kennwerten. Wer in der Altstadt am Ufer wohnt, sollte die Warnungen des Landes Rheinland-Pfalz lesen.` },
      { q: 'Wo beginnt die Mosel-Kilometrierung?', a: `An der Mündung in Koblenz. Der Pegel Perl an der französischen Grenze liegt bei km ${h.n(h.k('Perl').km!, 1)}. Von der Mündung zählt man flussaufwärts. Cochem liegt deshalb bei rund 50 Kilometern, Trier bei knapp 200. Die Pegel stehen auf dieser Seite in Fließrichtung, von Perl nach Koblenz.` },
    ],
  },
  en: {
    slug: 'moselle', nav: 'Moselle', card: 'Moselle gauges from Perl to Koblenz',
    title: 'Moselle Water Levels Today: Cochem, Trier and Every Gauge',
    description: 'Moselle water levels today: every Moselle gauge from Perl via Trier and Cochem to Koblenz, with time, 24-hour trend, marks and upper and lower gauges.',
    h1: 'Moselle water levels today: Cochem, Trier and the lock gauges',
    intro: (h) => { const p = perRiver(R), s = h.k('Cochem'); return `Moselle water levels today at ${h.n(p.n)} gauges; Cochem read ${h.vv(s)} at ${h.wt(s)}, ${h.trend('Cochem')} over 24 hours.`; },
    resume: (h) => { const p = perRiver(R), c = h.k('Cochem'), t = h.k('Trier UP'); return `Between Perl and Koblenz the Moselle is divided by barrages, and PEGELONLINE measures at almost each of them twice: at the upper gauge (OP) above and at the lower gauge (UP) below the weir. ${h.n(OP().length)} upper and ${h.n(UP().length)} lower gauges, plus the free-flowing ones, make ${h.n(p.n)} stations. The upper gauges show high numbers because they measure the impounded water; they are no use for judging a flood. For that, use the lower gauges and the main gauges at Cochem and Trier, and ${h.stLink('koblenz', 'Koblenz downstream')}. Cochem currently reads ${h.vv(c)} (as of ${h.wt(c)}), against a mean water of ${h.cm(c.mw!)} and mark I at ${h.cm(c.m1!)}; Trier (lower gauge) read ${h.vv(t)} against a mean water of ${h.cm(t.mw!)}. Moselle kilometres are counted upstream from the mouth at Koblenz. At Cochem, Zeltingen and Trier the highest level dates from December 1993.`; },
    body: (h) => { const m = MARK(); return `<h2>Moselle water levels today: upper and lower gauges</h2>
<p>An upper gauge almost always shows a large value, which depends mainly on the weir's target level and says little about the flow. To see whether the Moselle is rising, look at the lower gauges or at the trend: the tool shows the 24-hour change for every gauge.</p>
<h2>Marks on the Moselle</h2>
<p>PEGELONLINE gives marks I, II and III for some Moselle gauges. Shipping on the Moselle follows its own regulations; the notices in ${h.src('elwis', 'ELWIS')} are binding.</p>
${h.table([h.t('Pegel', 'Gauge'), 'km', h.t('Marke I', 'Mark I'), h.t('Marke II', 'Mark II'), h.t('Marke III', 'Mark III'), h.t('Aktueller Stand', 'Current level')], m.map((s) => [nom(s.name), h.n(s.km!, 1), h.cm(s.cv.M_I), s.cv.M_II !== undefined ? h.cm(s.cv.M_II) : '–', s.cv.M_III !== undefined ? h.cm(s.cv.M_III) : '–', h.vv(compact(s))]), h.t(`Laut PEGELONLINE, Stand ${h.snap}.`, `According to PEGELONLINE, as of ${h.snap}.`))}
<h2>Floods on the Moselle</h2>
<p>At Cochem the Moselle reached ${h.cm(h.k('Cochem').hhw!)} on ${h.date(h.st('Cochem').occ.HHW[0])}, at Trier ${h.cm(h.k('Trier UP').hhw!)}. In a flood the Moselle pours a lot of water into the Rhine, which is why it pays to watch both rivers at ${h.stLink('koblenz', 'Koblenz')}. Warnings for Rhineland-Palatinate and Saarland are linked from the ${h.src('hochwasserzentralen', 'state flood centres')}; Grevenmacher and Stadtbredimus lie on the border with Luxembourg.</p>`; },
    faqs: (h) => [
      { q: 'What is the difference between an upper and a lower gauge?', a: 'The upper gauge (OP) measures above a weir in the impounded water, the lower gauge (UP) below it. To tell whether the Moselle is in flood, the lower gauge says more. At an upper gauge the value stays flat for long periods while the barrage holds its target level.' },
      { q: 'At what Cochem reading does mark I apply?', a: `PEGELONLINE gives Cochem mark I at ${h.cm(h.k('Cochem').m1!)} and mark II at ${h.cm(h.k('Cochem').m2!)}. The ELWIS notices are binding for shipping. Cochem is one of the few Moselle gauges with a full set of reference values. If you live by the river in the old town, read the warnings of Rhineland-Palatinate.` },
      { q: 'Where does Moselle kilometre counting start?', a: `At the mouth in Koblenz. The Perl gauge on the French border is at km ${h.n(h.k('Perl').km!, 1)}. Kilometres count upstream from the mouth, so Cochem sits at around 50 and Trier at just under 200. On this page the gauges run in the direction of flow, from Perl to Koblenz.` },
    ],
  },
});
