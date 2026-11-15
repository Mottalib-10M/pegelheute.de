import { definePage } from '../../lib/page-types';

const A = 'DRESDEN';
export default definePage({
  id: 'st-dresden', kind: 'station', ref: 'dresden', order: 9, tool: 'pegel',
  related: ['st-magdeburg', 'fl-elbe', 'hochwasser-aktuell', 'pegel-lesen'],
  sources: ['pegelonline', 'hochwasserzentralen', 'pegelonline-api', 'wsv'],
  de: {
    slug: 'dresden', nav: 'Pegel Dresden', card: 'Elbe in Dresden: Wert, Hochwasser 2002, Tendenz',
    title: 'Pegel Dresden aktuell: Elbe in Dresden heute und Tendenz',
    description: 'Pegel Dresden aktuell: Wasserstand der Elbe mit Uhrzeit, Tendenz über 24 Stunden, Abstand zu Mittelwasser und Schifffahrtsgrenze, Rekord 2002 und 30 Tage.',
    h1: 'Pegel Dresden aktuell: die Elbe in Dresden heute',
    intro: (h) => { const s = h.k(A); return `Pegel Dresden aktuell: ${h.vv(s)} am Elbe-km ${h.n(s.km!, 1)}, gemessen ${h.wt(s)}, ${h.trend(A)} in 24 Stunden.`; },
    resume: (h) => { const s = h.k(A), r = h.st(A); return `Der Dresdner Elbpegel steht am km ${h.n(s.km!, 1)}, gezählt ab der tschechischen Grenze. Kaum ein deutscher Pegel ist so bekannt: Am ${h.date(r.occ.HHW[0])} erreichte er ${h.cm(s.hhw!)}, den höchsten Stand in PEGELONLINE. Im Alltag ist die Elbe hier oft flach. Das Mittelwasser der Jahre 2010 bis 2020 beträgt ${h.cm(s.mw!)}, das mittlere Niedrigwasser ${h.cm(s.mnw!)}; aktuell zeigt Dresden ${h.vv(s)} (Stand: ${h.wt(s)}), ${h.lage(A)}. Für die Schifffahrt gibt PEGELONLINE einen höchsten Schifffahrtswasserstand von ${h.cm(s.hsw!)} an; darüber gelten auf der Elbe Einschränkungen nach den Vorschriften der Wasserstraßen- und Schifffahrtsverwaltung. Hochwassermarken wie am Rhein führt Dresden nicht. Warnungen für Sachsen gibt das Landeshochwasserzentrum heraus, erreichbar über die Hochwasserzentralen. Dieses Werkzeug misst nur und warnt nicht. Was in Dresden ankommt, zeigt sich zuerst in Schöna an der Grenze.`; },
    body: (h) => { const s = h.k(A), r = h.st(A), p = h.k('PIRNA'), m = h.k('MEISSEN'); return `<h2>Pegel Dresden aktuell zwischen Pirna und Meißen</h2>
<p>Was in Dresden ankommt, kündigt sich stromauf an: In Pirna zeigt der Pegel aktuell ${h.vv(p)}, in Schöna an der Grenze ${h.vv(h.k('SCHÖNA'))}. Stromab folgt Meißen mit ${h.vv(m)}. Alle Elbpegel stehen auf der Seite ${h.a('fl-elbe', 'Pegel an der Elbe')}.</p>
${h.kenn(A)}
<h2>Niedrigwasser an der Elbe in Dresden</h2>
<p>Den niedrigsten Stand von ${h.cm(s.nnw!)} verzeichnet PEGELONLINE gleich zweimal, ${h.date(r.occ.NNW[0])} und ${h.date(r.occ.NNW[1])}. Liegt der Pegel unter ${h.cm(s.mnw!)}, steht die Elbe in Dresden niedriger als im typischen Jahrestief. In den letzten 30 Tagen lagen die Dresdner 2-Stunden-Mittel zwischen ${h.lo(A)} und ${h.hi(A)}.</p>
<h2>Hochwasser in Dresden einordnen</h2>
<p>Zwischen Mittelwasser und Rekord liegen in Dresden ${h.cm(s.hhw! - s.mw!)}. Das mittlere Hochwasser von ${h.cm(s.mhw!)} erreicht die Elbe in einem typischen Jahr einmal. Wie sich die Lage an allen Pegeln gerade darstellt, zeigt ${h.a('hochwasser-aktuell', 'Hochwasser aktuell')}; amtliche Warnstufen nennt Sachsen über die ${h.src('hochwasserzentralen', 'Hochwasserzentralen')}.</p>`; },
    faqs: (h) => { const s = h.k(A), r = h.st(A); return [
      { q: 'Wie hoch war die Elbe in Dresden 2002?', a: `${h.cm(s.hhw!)} am ${h.date(r.occ.HHW[0])}, der höchste Stand in PEGELONLINE. Das Mittelwasser liegt bei ${h.cm(s.mw!)}. Der Scheitel kam erst Tage nach den Unwettern im Erzgebirge, weil die Elbe zusätzlich Wasser aus Tschechien brachte. Zwischen Mittelwasser und diesem Rekord liegen in Dresden mehrere Meter, mehr als an den meisten anderen Pegeln dieser Seite.` },
      { q: 'Hat der Pegel Dresden Hochwassermarken?', a: `Nicht wie am Rhein. PEGELONLINE nennt für Dresden einen höchsten Schifffahrtswasserstand von ${h.cm(s.hsw!)}. Die Alarmstufen für Dresden legt das Land Sachsen fest. Wer in Dresden wissen will, ob Ufer oder Straßen betroffen sind, liest diese Alarmstufen beim Landeshochwasserzentrum, nicht die Schifffahrtswerte.` },
      { q: 'Welcher Elbpegel in Dresden gilt als niedrig?', a: `Ein Stand unter ${h.cm(s.mnw!)}, dem mittleren Niedrigwasser der Jahre 2010 bis 2020. Der niedrigste bekannte Wert beträgt ${h.cm(s.nnw!)}. In trockenen Sommern fällt die Elbe in Dresden oft wochenlang unter diesen Wert. Die Tendenz im Werkzeug zeigt dann meist nur wenige Zentimeter Änderung pro Tag, weil kaum Regen nachkommt.` },
    ]; },
  },
  en: {
    slug: 'dresden', nav: 'Dresden gauge', card: 'Elbe at Dresden: reading, 2002 flood, trend',
    title: 'Dresden Elbe Level Today: Pegel Dresden, Trend, Records',
    description: 'Dresden Elbe level today: the reading with its time, 24-hour trend, distance to mean water and the highest navigable level, the 2002 record and 30 days.',
    h1: 'Dresden Elbe level today (Pegel Dresden)',
    intro: (h) => { const s = h.k(A); return `Dresden Elbe level today: ${h.vv(s)} at Elbe km ${h.n(s.km!, 1)}, read at ${h.wt(s)}, ${h.trend(A)} over 24 hours.`; },
    resume: (h) => { const s = h.k(A), r = h.st(A); return `The Dresden Elbe gauge stands at km ${h.n(s.km!, 1)}, counted from the Czech border. Few German gauges are as well known: on ${h.date(r.occ.HHW[0])} it reached ${h.cm(s.hhw!)}, the highest level in PEGELONLINE. Day to day, the Elbe here is often shallow. Mean water over 2010 to 2020 is ${h.cm(s.mw!)} and mean low water ${h.cm(s.mnw!)}; Dresden currently reads ${h.vv(s)} (as of ${h.wt(s)}), ${h.lage(A)}. For shipping PEGELONLINE gives a highest navigable water level of ${h.cm(s.hsw!)}; above it restrictions apply on the Elbe under the rules of the federal waterways administration. Dresden has no flood marks like those on the Rhine. Warnings for Saxony come from the state flood centre, reachable through the flood centres portal. This tool measures; it does not warn.`; },
    body: (h) => { const s = h.k(A), r = h.st(A), p = h.k('PIRNA'), m = h.k('MEISSEN'); return `<h2>Dresden Elbe level today between Pirna and Meissen</h2>
<p>What reaches Dresden shows up upstream first: Pirna currently reads ${h.vv(p)} (as of ${h.wt(p)}) and Schöna at the border ${h.vv(h.k('SCHÖNA'))}. Downstream comes Meissen at ${h.vv(m)}. Every Elbe gauge is listed on ${h.a('fl-elbe', 'Elbe gauges')}.</p>
${h.kenn(A)}
<h2>Low water on the Elbe at Dresden</h2>
<p>PEGELONLINE records the lowest level of ${h.cm(s.nnw!)} twice, on ${h.date(r.occ.NNW[0])} and ${h.date(r.occ.NNW[1])}. Below ${h.cm(s.mnw!)} the Elbe at Dresden is lower than at a typical yearly low. Over the last 30 days Dresden's 2-hour means stayed between ${h.lo(A)} and ${h.hi(A)}.</p>
<h2>Putting a Dresden flood in context</h2>
<p>Mean water and the record are ${h.cm(s.hhw! - s.mw!)} apart at Dresden. The mean high water of ${h.cm(s.mhw!)} is what the Elbe reaches once in a typical year. For the picture at every gauge right now see ${h.a('hochwasser-aktuell', 'flood levels now')}; official warning stages for Saxony are published via the ${h.src('hochwasserzentralen', 'state flood centres')}.</p>`; },
    faqs: (h) => { const s = h.k(A), r = h.st(A); return [
      { q: 'How high was the Elbe at Dresden in 2002?', a: `${h.cm(s.hhw!)} on ${h.date(r.occ.HHW[0])}, the highest level in PEGELONLINE. Mean water is ${h.cm(s.mw!)}. The crest came days after the storms in the Ore Mountains, because the Elbe also brought water from the Czech Republic. Mean water and the record are several metres apart at Dresden, more than at most gauges on this site.` },
      { q: 'Does the Dresden gauge have flood marks?', a: `Not like the Rhine. PEGELONLINE gives Dresden a highest navigable water level of ${h.cm(s.hsw!)}. Alert stages for Dresden are set by the state of Saxony. To know whether banks or roads are affected, read those stages at the state flood centre, not the shipping values.` },
      { q: 'What counts as a low Elbe at Dresden?', a: `A reading below ${h.cm(s.mnw!)}, the mean low water of 2010 to 2020. The lowest known value is ${h.cm(s.nnw!)}. In dry summers the Elbe at Dresden often stays below it for weeks. The tool’s trend then usually shows only a few centimetres of change per day, because little rain comes in.` },
    ]; },
  },
});
