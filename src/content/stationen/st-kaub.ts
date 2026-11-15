import { definePage } from '../../lib/page-types';

const A = 'KAUB';
export default definePage({
  id: 'st-kaub', kind: 'station', ref: 'kaub', order: 3, tool: 'pegel',
  related: ['niedrigwasser-rhein', 'st-koblenz', 'st-mainz', 'fl-rhein'],
  sources: ['pegelonline', 'rheinschpv', 'elwis', 'pegelonline-api'],
  de: {
    slug: 'kaub', nav: 'Pegel Kaub', card: 'Mittelrhein: Wert, gleichwertiger Wasserstand, Fahrrinne, Marken',
    title: 'Pegel Kaub aktuell: Rheinpegel heute, GlW und Fahrrinne',
    description: 'Pegel Kaub aktuell: Wasserstand am Mittelrhein mit Uhrzeit, Tendenz über 24 Stunden, Abstand zum GlW, Näherung der Fahrrinnentiefe und Hochwassermarken.',
    h1: 'Pegel Kaub aktuell: der Mittelrhein heute',
    intro: (h) => { const s = h.k(A); return `Pegel Kaub aktuell: ${h.vv(s)}, gemessen ${h.wt(s)}, ${h.trend(A)} in 24 Stunden; der gleichwertige Wasserstand liegt bei ${h.cm(s.glw!)}.`; },
    resume: (h) => { const s = h.k(A); return `Kaub ist der Pegel, nach dem sich die Rheinschifffahrt bei Niedrigwasser richtet. Er liegt am Rhein-km ${h.n(s.km!, 1)} im Mittelrhein, im engen Abschnitt zwischen Bingen und St. Goar, in dem die Fahrrinne flacher ist als stromab: PEGELONLINE gibt hier eine verkehrsgesicherte Tiefe von ${h.cm(s.tu!)} unter dem gleichwertigen Wasserstand an, in Köln sind es ${h.cm(h.k('KÖLN').tu!)}. Aktuell zeigt Kaub ${h.vv(s)} (Stand: ${h.wt(s)}), also ${h.vs(s, s.glw!)} dem GlW von ${h.cm(s.glw!)}; daraus ergibt sich eine Fahrrinnentiefe von näherungsweise ${h.rinne(s)}. Je weniger Wasser über dem GlW steht, desto weniger Ladung dürfen Schiffe aufnehmen. Den tiefsten Stand führt PEGELONLINE mit ${h.cm(s.nnw!)}, den höchsten mit ${h.cm(s.hhw!)}. Für den Abschnitt Lorch bis Bad Salzig ist Kaub außerdem Richtpegel der Hochwassermarken: ${h.cm(s.m1!)} und ${h.cm(s.m2!)}.`; },
    body: (h) => { const s = h.k(A), r = h.st(A); return `<h2>Pegel Kaub aktuell und die Fahrrinne</h2>
<p>Für Binnenschiffer zählt am Pegel Kaub weniger der Wert selbst als der Abstand zum GlW. Der gleichwertige Wasserstand ist ein festgelegter niedriger Bezugsstand; auf ihn bezieht die WSV die Solltiefe der Fahrrinne. Liegt Kaub ${h.cm(20)} unter dem GlW, fehlen der Fahrrinne rechnerisch ebenfalls ${h.cm(20)} an ihrer Solltiefe. Das Werkzeug oben zeigt diese Näherung für den aktuellen Wert, der Ratgeber ${h.a('niedrigwasser-rhein', 'Niedrigwasser am Rhein')} vergleicht alle Rheinpegel mit GlW.</p>
${h.kenn(A)}
<h2>Die letzten 30 Tage in Kaub</h2>
<p>In den letzten 30 Tagen lag das tiefste 2-Stunden-Mittel bei ${h.lo(A)}, das höchste bei ${h.hi(A)}. Ein Pegel unter ${h.cm(s.mnw!)}, dem mittleren Niedrigwasser, heißt, dass der Mittelrhein niedriger steht als im typischen Jahrestief. Den bisher niedrigsten Wert von ${h.cm(s.nnw!)} verzeichnet PEGELONLINE für den ${h.date(r.occ.NNW[0])}.</p>
<h2>Hochwasser im Mittelrhein</h2>
<p>Auf dem Abschnitt zwischen Lorch und Bad Salzig gilt ab ${h.cm(s.m1!)} in Kaub die Hochwassermarke I, ab ${h.cm(s.m2!)} ist die Schifffahrt verboten (${h.src('rheinschpv', 'RheinSchPV § 10.01')}). In der Gebirgsstrecke zwischen Bingen und St. Goar darf die Talfahrt bei Hochwasser 24 statt 20 km/h fahren. Der höchste bekannte Stand, ${h.cm(s.hhw!)}, stammt vom ${h.date(r.occ.HHW[0])}. Stromauf liegt ${h.stLink('mainz')}, stromab ${h.stLink('koblenz')}.</p>`; },
    faqs: (h) => { const s = h.k(A); return [
      { q: 'Warum ist der Pegel Kaub so wichtig?', a: `Weil der Rhein zwischen Oestrich und Kaub die geringste Solltiefe der Fahrrinne am deutschen Rhein hat: ${h.cm(s.tu!)} beim gleichwertigen Wasserstand, stromauf und stromab ${h.cm(h.k('MAINZ').tu!)} bis ${h.cm(h.k('EMMERICH').tu!)}. Wie viel ein Schiff laden darf, hängt deshalb am Wasser über dem GlW von ${h.cm(s.glw!)} in Kaub.` },
      { q: 'Wie tief ist der Rhein bei Pegel Kaub 50 cm?', a: `Näherungsweise ${h.m(s.tu! + 50 - s.glw!)} in der Fahrrinne: ${h.cm(s.tu!)} Solltiefe beim GlW von ${h.cm(s.glw!)}, minus ${h.cm(s.glw! - 50)}, die der Pegel darunter liegt. Die tatsächliche Tiefe an einer Stelle kann davon abweichen; maßgeblich sind die Angaben in ELWIS. Der Rechner oben macht das für jeden Wert.` },
      { q: 'Was ist der niedrigste Pegel in Kaub?', a: `PEGELONLINE nennt als niedrigsten bekannten Stand (NNW) ${h.cm(s.nnw!)}. Das mittlere Niedrigwasser der Jahre 2010 bis 2020 liegt bei ${h.cm(s.mnw!)}, das Mittelwasser bei ${h.cm(s.mw!)}. Ein Stand nahe diesem Wert bedeutet stark eingeschränkte Ladung für die Rheinschifffahrt. Den Abstand zum GlW zeigt das Werkzeug oben.` },
    ]; },
  },
  en: {
    slug: 'kaub', nav: 'Kaub gauge', card: 'Middle Rhine: reading, GlW, fairway, marks',
    title: 'Kaub Rhine Level Today: Pegel Kaub, GlW and Fairway Depth',
    description: 'Kaub Rhine level today: the Middle Rhine reading with its time, 24-hour trend, distance to the GlW low-water level, approximate fairway depth and marks.',
    h1: 'Kaub Rhine level today (Pegel Kaub)',
    intro: (h) => { const s = h.k(A); return `Kaub Rhine level today: ${h.vv(s)}, read at ${h.wt(s)}, ${h.trend(A)} over 24 hours; the equivalent low water level (GlW) is ${h.cm(s.glw!)}.`; },
    resume: (h) => { const s = h.k(A); return `Kaub is the gauge Rhine shipping watches at low water. It sits at Rhine km ${h.n(s.km!, 1)} on the Middle Rhine, in the narrow stretch between Bingen and St. Goar where the fairway is shallower than downstream: PEGELONLINE gives a guaranteed depth of ${h.cm(s.tu!)} below the equivalent low water level here, against ${h.cm(h.k('KÖLN').tu!)} at Cologne. Kaub currently reads ${h.vv(s)} (as of ${h.wt(s)}), ${h.vs(s, s.glw!)} its GlW of ${h.cm(s.glw!)}, which gives a fairway depth of roughly ${h.rinne(s)}. The less water above GlW, the less cargo a barge may carry. PEGELONLINE lists the lowest level as ${h.cm(s.nnw!)} and the highest as ${h.cm(s.hhw!)}. For the section from Lorch to Bad Salzig, Kaub is also the reference gauge for the flood marks: ${h.cm(s.m1!)} and ${h.cm(s.m2!)}.`; },
    body: (h) => { const s = h.k(A), r = h.st(A); return `<h2>Kaub Rhine level today and the fairway</h2>
<p>For barge operators, what matters at Kaub is less the reading than its distance to GlW. The equivalent water level is a fixed low reference level to which the WSV ties the target depth of the fairway. If Kaub is ${h.cm(20)} below GlW, the fairway is also, by this arithmetic, ${h.cm(20)} short of its target depth. The tool above shows the approximation for the current reading; the guide ${h.a('niedrigwasser-rhein', 'Rhine low water')} compares every Rhine gauge that has a GlW.</p>
${h.kenn(A)}
<h2>The last 30 days at Kaub</h2>
<p>Over the last 30 days the lowest 2-hour mean was ${h.lo(A)} and the highest ${h.hi(A)}. A reading below ${h.cm(s.mnw!)}, the mean low water, means the Middle Rhine is lower than at a typical yearly low. PEGELONLINE records the lowest value so far, ${h.cm(s.nnw!)}, on ${h.date(r.occ.NNW[0])}.</p>
<h2>Floods on the Middle Rhine</h2>
<p>Between Lorch and Bad Salzig, flood mark I applies from ${h.cm(s.m1!)} at Kaub and navigation is prohibited from ${h.cm(s.m2!)} (${h.src('rheinschpv', 'RheinSchPV § 10.01')}). In the gorge between Bingen and St. Goar, downstream traffic may travel at 24 rather than 20 km/h at high water. The highest level on record, ${h.cm(s.hhw!)}, dates from ${h.date(r.occ.HHW[0])}. Upstream lies ${h.stLink('mainz', 'Mainz')}, downstream ${h.stLink('koblenz', 'Koblenz')}.</p>`; },
    faqs: (h) => { const s = h.k(A); return [
      { q: 'Why does the Kaub gauge matter so much?', a: `Because the Rhine between Oestrich and Kaub has the smallest fairway target depth on the German Rhine: ${h.cm(s.tu!)} at the equivalent low water level, against ${h.cm(h.k('MAINZ').tu!)} to ${h.cm(h.k('EMMERICH').tu!)} up- and downstream. How much a barge may load therefore depends on the water above the GlW of ${h.cm(s.glw!)} at Kaub.` },
      { q: 'How deep is the Rhine when Kaub reads 50 cm?', a: `Roughly ${h.m(s.tu! + 50 - s.glw!)} in the fairway: ${h.cm(s.tu!)} target depth at the GlW of ${h.cm(s.glw!)}, minus the ${h.cm(s.glw! - 50)} the gauge is below it. The actual depth at a given spot can differ; the ELWIS figures are binding. The calculator above does this for any value.` },
      { q: 'What is the lowest level ever at Kaub?', a: `PEGELONLINE gives ${h.cm(s.nnw!)} as the lowest level on record (NNW). Mean low water over 2010 to 2020 is ${h.cm(s.mnw!)}, mean water ${h.cm(s.mw!)}. A level near this value means sharply reduced cargo for Rhine shipping. The tool above shows the distance to GlW.` },
    ]; },
  },
});
