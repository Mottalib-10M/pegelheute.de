import { definePage } from '../../lib/page-types';

const A = 'MAGDEBURG-STROMBRÜCKE';
export default definePage({
  id: 'st-magdeburg', kind: 'station', ref: 'magdeburg', order: 10, tool: 'pegel',
  related: ['st-dresden', 'fl-elbe', 'pegel-lesen', 'hochwasser-aktuell'],
  sources: ['pegelonline', 'hochwasserzentralen', 'pegelonline-api', 'wsv'],
  de: {
    slug: 'magdeburg', nav: 'Pegel Magdeburg', card: 'Elbe an der Strombrücke: Wert und Tendenz',
    title: 'Pegel Magdeburg aktuell: Elbe an der Strombrücke heute',
    description: 'Pegel Magdeburg aktuell: Elbwasserstand an der Strombrücke mit Uhrzeit, Tendenz 24 h, Einordnung nach Mittelwasser, Rekord von 2013 und Verlauf von 30 Tagen.',
    h1: 'Pegel Magdeburg aktuell: die Elbe an der Strombrücke',
    intro: (h) => { const s = h.k(A); return `Pegel Magdeburg aktuell: ${h.vv(s)} an der Strombrücke, Elbe-km ${h.n(s.km!, 1)}, gemessen ${h.wt(s)}, ${h.trend(A)} in 24 Stunden.`; },
    resume: (h) => { const s = h.k(A), b = h.k('MAGDEBURG-BUCKAU'); return `Magdeburg hat mehrere Elbpegel. Der hier gezeigte Hauptwert stammt von der Strombrücke am km ${h.n(s.km!, 1)}; gut einen Kilometer stromauf misst der Pegel Magdeburg-Buckau, der aktuell ${h.vv(b)} zeigt. Beide haben eigene Nullpunkte, ihre Zahlen lassen sich also nicht direkt vergleichen. An der Strombrücke zeigte die Elbe ${h.vv(s)}, ${h.lage(A)}. Das Mittelwasser der Jahre 2010 bis 2020 liegt bei ${h.cm(s.mw!)}, das mittlere Niedrigwasser bei ${h.cm(s.mnw!)}, das mittlere Hochwasser bei ${h.cm(s.mhw!)}. Den höchsten bekannten Stand von ${h.cm(s.hhw!)} erreichte die Elbe beim Junihochwasser 2013, den niedrigsten von ${h.cm(s.nnw!)} im Dürresommer 2019. Für die Schifffahrt nennt PEGELONLINE einen höchsten Schifffahrtswasserstand von ${h.cm(s.hsw!)}. Warnungen für Sachsen-Anhalt gibt der Landeshochwassermeldedienst heraus. Ein Anstieg in Dresden erreicht Magdeburg erst Tage später.`; },
    body: (h) => { const s = h.k(A), r = h.st(A), b = h.k('MAGDEBURG-BUCKAU'); return `<h2>Pegel Magdeburg aktuell: Strombrücke oder Buckau?</h2>
<p>Wer „Pegel Magdeburg“ sucht, findet in PEGELONLINE ${h.a('fl-elbe', 'mehrere Elbpegel')}. Buckau am km ${h.n(b.km!, 1)} hat ein Mittelwasser von ${h.cm(b.mw!)}, die Strombrücke von ${h.cm(s.mw!)}. Für die Einordnung zählt immer der Vergleich mit den Kennwerten derselben Station, nie der Vergleich zweier Zahlen von verschiedenen Pegeln.</p>
${h.kenn(A)}
<h2>Dürre 2019 und Flut 2013</h2>
<p>Am ${h.date(r.occ.NNW[0])} fiel die Elbe an der Strombrücke auf ${h.cm(s.nnw!)}; am ${h.date(r.occ.HHW[0])} stand sie bei ${h.cm(s.hhw!)}. Die Spanne beträgt ${h.cm(s.hhw! - s.nnw!)}. In den letzten 30 Tagen lagen die 2-Stunden-Mittel zwischen ${h.lo(A)} und ${h.hi(A)}.</p>
<h2>Woher das Wasser kommt</h2>
<p>Oberhalb von Magdeburg münden Mulde und Saale in die Elbe. Ein Anstieg in ${h.stLink('dresden')} erreicht Magdeburg erst Tage später. Die amtlichen Warnungen für Sachsen-Anhalt finden Sie über die ${h.src('hochwasserzentralen', 'Hochwasserzentralen')}.</p>`; },
    faqs: (h) => { const s = h.k(A), r = h.st(A); return [
      { q: 'Welcher Pegel in Magdeburg ist der richtige?', a: `Für die meisten Fragen die Strombrücke am Elbe-km ${h.n(s.km!, 1)}. Buckau liegt gut einen Kilometer stromauf und hat einen anderen Nullpunkt; beide Werte sind nur mit den eigenen Kennwerten vergleichbar. Rothensee stromab ist ein dritter Pegel im Stadtgebiet, vor allem für den Hafen.` },
      { q: 'Wie hoch war die Elbe in Magdeburg 2013?', a: `${h.cm(s.hhw!)} an der Strombrücke am ${h.date(r.occ.HHW[0])}, der höchste Stand in PEGELONLINE. Das mittlere Hochwasser liegt bei ${h.cm(s.mhw!)}. Das Hochwasser kam damals aus Saale und Mulde ebenso wie aus Sachsen. Der Rekord liegt mehrere Meter über dem Mittelwasser; bei solchen Ständen gelten für die Schifffahrt seit langem Einschränkungen.` },
      { q: 'Wann war die Elbe in Magdeburg am niedrigsten?', a: `Am ${h.date(r.occ.NNW[0])} mit ${h.cm(s.nnw!)}. Das mittlere Niedrigwasser beträgt ${h.cm(s.mnw!)}. Damals lag ein ungewöhnlich trockener Sommer hinter der Region, und auch die Zuflüsse aus Tschechien waren schwach. Bei so niedrigen Ständen fallen in Magdeburg Felsen im Flussbett trocken, und die Schifffahrt auf der Elbe kommt weitgehend zum Erliegen.` },
    ]; },
  },
  en: {
    slug: 'magdeburg', nav: 'Magdeburg gauge', card: 'Elbe at the Strombrücke: reading and trend',
    title: 'Magdeburg Elbe Level Today: Pegel Magdeburg, Trend, Records',
    description: 'Magdeburg Elbe level today: the Strombrücke reading with its time, 24-hour trend, rating against mean water, the 2013 record and a curve of the last 30 days.',
    h1: 'Magdeburg Elbe level today (Pegel Magdeburg)',
    intro: (h) => { const s = h.k(A); return `Magdeburg Elbe level today: ${h.vv(s)} at the Strombrücke, Elbe km ${h.n(s.km!, 1)}, read at ${h.wt(s)}, ${h.trend(A)} over 24 hours.`; },
    resume: (h) => { const s = h.k(A), b = h.k('MAGDEBURG-BUCKAU'); return `Magdeburg has several Elbe gauges. The main value shown here comes from the Strombrücke at km ${h.n(s.km!, 1)}; a little over a kilometre upstream, the Magdeburg-Buckau gauge currently reads ${h.vv(b)}. Each has its own zero, so their numbers cannot be compared directly. At the Strombrücke the Elbe read ${h.vv(s)}, ${h.lage(A)}. Mean water over 2010 to 2020 is ${h.cm(s.mw!)}, mean low water ${h.cm(s.mnw!)} and mean high water ${h.cm(s.mhw!)}. The Elbe reached its highest known level of ${h.cm(s.hhw!)} in the June 2013 flood and its lowest of ${h.cm(s.nnw!)} in the drought summer of 2019. For shipping PEGELONLINE gives a highest navigable water level of ${h.cm(s.hsw!)}. Warnings for Saxony-Anhalt come from the state flood reporting service.`; },
    body: (h) => { const s = h.k(A), r = h.st(A), b = h.k('MAGDEBURG-BUCKAU'); return `<h2>Magdeburg Elbe level today: Strombrücke or Buckau?</h2>
<p>Searching for the Magdeburg gauge turns up ${h.a('fl-elbe', 'several Elbe gauges')} in PEGELONLINE. Buckau at km ${h.n(b.km!, 1)} has a mean water of ${h.cm(b.mw!)}, the Strombrücke ${h.cm(s.mw!)}. To rate a reading, always compare it with the reference values of the same station, never with a number from a different gauge.</p>
${h.kenn(A)}
<h2>The 2019 drought and the 2013 flood</h2>
<p>On ${h.date(r.occ.NNW[0])} the Elbe at the Strombrücke fell to ${h.cm(s.nnw!)}; on ${h.date(r.occ.HHW[0])} it stood at ${h.cm(s.hhw!)}. The range is ${h.cm(s.hhw! - s.nnw!)}. Over the last 30 days the 2-hour means stayed between ${h.lo(A)} and ${h.hi(A)}.</p>
<h2>Where the water comes from</h2>
<p>Above Magdeburg the Mulde and the Saale join the Elbe. A rise at ${h.stLink('dresden', 'Dresden')} reaches Magdeburg only days later. Official warnings for Saxony-Anhalt are linked from the ${h.src('hochwasserzentralen', 'state flood centres')}.</p>`; },
    faqs: (h) => { const s = h.k(A), r = h.st(A); return [
      { q: 'Which Magdeburg gauge should I read?', a: `For most questions the Strombrücke at Elbe km ${h.n(s.km!, 1)}. Buckau lies just over a kilometre upstream with a different zero; each value only compares with its own reference values. Rothensee, downstream, is a third gauge in the city, mainly used for the port.` },
      { q: 'How high was the Elbe at Magdeburg in 2013?', a: `${h.cm(s.hhw!)} at the Strombrücke on ${h.date(r.occ.HHW[0])}, the highest level in PEGELONLINE. Mean high water is ${h.cm(s.mhw!)}. The flood came from the Saale and the Mulde as much as from Saxony. The record lies several metres above mean water.` },
      { q: 'When was the Elbe at Magdeburg at its lowest?', a: `On ${h.date(r.occ.NNW[0])}, at ${h.cm(s.nnw!)}. Mean low water is ${h.cm(s.mnw!)}. It followed an unusually dry summer, with weak inflow from the Czech Republic as well. At such levels rocks in the riverbed at Magdeburg fall dry and shipping on the Elbe largely stops.` },
    ]; },
  },
});
