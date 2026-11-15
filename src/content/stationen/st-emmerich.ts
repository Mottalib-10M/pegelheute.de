import { range30 } from '../../lib/helpers';
import { definePage } from '../../lib/page-types';

const A = 'EMMERICH';
export default definePage({
  id: 'st-emmerich', kind: 'station', ref: 'emmerich', order: 8, tool: 'pegel',
  related: ['st-duesseldorf', 'niedrigwasser-rhein', 'pegel-lesen', 'fl-rhein'],
  sources: ['pegelonline', 'rheinschpv', 'elwis', 'pegelonline-api'],
  de: {
    slug: 'emmerich', nav: 'Pegel Emmerich', card: 'Letzter deutscher Rheinpegel vor den Niederlanden',
    title: 'Pegel Emmerich aktuell: der Rhein an der Grenze heute',
    description: 'Pegel Emmerich aktuell: Rheinwasserstand an der Grenze mit Uhrzeit, Tendenz über 24 Stunden, Abstand zum Rekordtief, Fahrrinne, Marken und 30-Tage-Verlauf.',
    h1: 'Pegel Emmerich aktuell: der Rhein an der Grenze',
    intro: (h) => { const s = h.k(A); return `Pegel Emmerich aktuell: ${h.vv(s)} am Rhein-km ${h.n(s.km!, 1)}, gemessen ${h.wt(s)}, ${h.trend(A)} in 24 Stunden.`; },
    resume: (h) => { const s = h.k(A), r = h.st(A); const unter = range30(s.u).lo < s.nnw!; return `Emmerich ist der letzte Rheinpegel der WSV vor der niederländischen Grenze, und hier fallen die Werte am tiefsten: Der niedrigste bekannte Stand in PEGELONLINE liegt bei ${h.cm(s.nnw!)}, also unter dem Nullpunkt der Latte. Ein negativer Wert bedeutet nicht, dass der Rhein leer ist, sondern nur, dass der Wasserspiegel unter diesem Bezugspunkt liegt. Aktuell zeigt Emmerich ${h.vv(s)} (Stand: ${h.wt(s)}), ${h.lage(A)}; das Mittelwasser liegt bei ${h.cm(s.mw!)}, das mittlere Niedrigwasser bei ${h.cm(s.mnw!)}. ${unter ? `In den letzten 30 Tagen sank das 2-Stunden-Mittel zeitweise auf ${h.lo(A)} und damit unter diesen bisher niedrigsten Kennwert.` : `In den letzten 30 Tagen lag das tiefste 2-Stunden-Mittel bei ${h.lo(A)}.`} Für den Abschnitt Rees bis zur Spyck’schen Fähre ist Emmerich Richtpegel der Hochwassermarken: ${h.cm(s.m1!)} und ${h.cm(s.m2!)}. Für die Fahrrinne nennt PEGELONLINE hier einen gleichwertigen Wasserstand von ${h.cm(s.glw!)} und darunter eine Solltiefe von ${h.cm(s.tu!)}.`; },
    body: (h) => { const s = h.k(A), r = h.st(A); return `<h2>Pegel Emmerich aktuell: was ein Wert unter null heißt</h2>
<p>Jeder Pegel misst gegen einen festen Nullpunkt. In Emmerich liegt er bei ${h.n(s.pnp!, 2)} m über NHN; ein Stand von ${h.vv(s)} entspricht damit einem Wasserspiegel von ${h.nhn(s)} über NHN. Die Fahrrinne ist beim gleichwertigen Wasserstand von ${h.cm(s.glw!)} ${h.cm(s.tu!)} tief; beim aktuellen Stand bleiben näherungsweise ${h.rinne(s)}. Wie man eine Pegelangabe in Höhe umrechnet, erklärt ${h.a('pegel-lesen', 'Pegel richtig lesen')}.</p>
${h.kenn(A)}
<h2>Rekorde in Emmerich</h2>
<p>Den höchsten Stand von ${h.cm(s.hhw!)} verzeichnet PEGELONLINE am ${h.date(r.occ.HHW[0])}, den niedrigsten von ${h.cm(s.nnw!)} am ${h.date(r.occ.NNW[0])}. Das Hochwasser von 1926 lag ${h.cm(s.hhw! - s.m2!)} über der heutigen Marke II (${h.cm(s.m2!)}).</p>
<h2>Unterhalb von Emmerich</h2>
<p>Hinter der Grenze heißt der Rhein Bovenrijn und teilt sich bald in Waal und Pannerdensch Kanaal. Die niederländischen Werte gehören nicht zu PEGELONLINE. Stromauf liegen Rees und ${h.stLink('duesseldorf')}.</p>`; },
    faqs: (h) => { const s = h.k(A); return [
      { q: 'Warum kann der Pegel Emmerich negativ sein?', a: `Weil der Pegel nicht die Wassertiefe misst, sondern die Höhe über dem Nullpunkt der Latte bei ${h.n(s.pnp!, 2)} m über NHN. Sinkt der Wasserspiegel darunter, wird der Wert negativ; beim Rekordtief blieben in der Fahrrinne rechnerisch noch ${h.m(s.tu! + s.nnw! - s.glw!)}. Das ist am Niederrhein nicht ungewöhnlich.` },
      { q: 'Ist Emmerich der letzte Pegel vor den Niederlanden?', a: `Ja, unter den Pegeln der WSV in PEGELONLINE. Emmerich liegt am Rhein-km ${h.n(s.km!, 1)}, wenige Kilometer vor der Grenze. Gleich hinter der Grenze misst der niederländische Pegel Lobith, dessen Werte ebenfalls in PEGELONLINE stehen, aber ohne deutsche Kennwerte. Für die Schifffahrt am Niederrhein ist Emmerich der Richtpegel bis zur Spyck’schen Fähre.` },
      { q: 'Welche Hochwassermarken gelten in Emmerich?', a: `Marke I bei ${h.cm(s.m1!)} und Marke II bei ${h.cm(s.m2!)}, für den Abschnitt Rees bis zur Spyck’schen Fähre. Ab Marke I fahren Schiffe in Strommitte mit höchstens 20 km/h, ab Marke II ruht die Schifffahrt. Fähren dürfen weiter übersetzen.` },
    ]; },
  },
  en: {
    slug: 'emmerich', nav: 'Emmerich gauge', card: 'Last German Rhine gauge before the Netherlands',
    title: 'Emmerich Rhine Level Today: Pegel Emmerich at the Border',
    description: 'Emmerich Rhine level today: the reading at the Dutch border with its time, 24-hour trend, distance to the record low, fairway depth, marks and 30 days.',
    h1: 'Emmerich Rhine level today (Pegel Emmerich)',
    intro: (h) => { const s = h.k(A); return `Emmerich Rhine level today: ${h.vv(s)} at Rhine km ${h.n(s.km!, 1)}, read at ${h.wt(s)}, ${h.trend(A)} over 24 hours.`; },
    resume: (h) => { const s = h.k(A), r = h.st(A); const unter = range30(s.u).lo < s.nnw!; return `Emmerich is the last WSV Rhine gauge before the Dutch border, and readings fall lowest here: the lowest level on record in PEGELONLINE is ${h.cm(s.nnw!)}, below the zero of the staff. A negative value does not mean the Rhine is empty, only that the water surface is below that reference point. Emmerich currently reads ${h.vv(s)} (as of ${h.wt(s)}), ${h.lage(A)}; mean water is ${h.cm(s.mw!)} and mean low water ${h.cm(s.mnw!)}. ${unter ? `Over the last 30 days the 2-hour mean dropped at times to ${h.lo(A)}, below that recorded low.` : `Over the last 30 days the lowest 2-hour mean was ${h.lo(A)}.`} For the section from Rees to the Spyck ferry, Emmerich is the reference gauge for flood marks: ${h.cm(s.m1!)} and ${h.cm(s.m2!)}. For the fairway PEGELONLINE gives an equivalent low water level of ${h.cm(s.glw!)} here and a target depth of ${h.cm(s.tu!)} below it.`; },
    body: (h) => { const s = h.k(A), r = h.st(A); return `<h2>Emmerich Rhine level today: what a reading below zero means</h2>
<p>Every gauge measures against a fixed zero. At Emmerich it is ${h.n(s.pnp!, 2)} m above sea level, so a reading of ${h.vv(s)} means a water surface at ${h.nhn(s)} above sea level. At the equivalent low water level of ${h.cm(s.glw!)} the fairway is ${h.cm(s.tu!)} deep; at the current level roughly ${h.rinne(s)} remains. How to turn a reading into a height is explained in ${h.a('pegel-lesen', 'reading a gauge')}.</p>
${h.kenn(A)}
<h2>Records at Emmerich</h2>
<p>PEGELONLINE records the highest level, ${h.cm(s.hhw!)}, on ${h.date(r.occ.HHW[0])} and the lowest, ${h.cm(s.nnw!)}, on ${h.date(r.occ.NNW[0])}. The 1926 flood stood ${h.cm(s.hhw! - s.m2!)} above today's mark II (${h.cm(s.m2!)}).</p>
<h2>Below Emmerich</h2>
<p>Past the border the Rhine becomes the Bovenrijn and soon splits into the Waal and the Pannerdensch Kanaal. Dutch readings are not part of PEGELONLINE. Upstream lie Rees and ${h.stLink('duesseldorf', 'Düsseldorf')}.</p>`; },
    faqs: (h) => { const s = h.k(A); return [
      { q: 'Why can the Emmerich gauge read below zero?', a: `Because a gauge does not measure water depth but the height above the staff zero at ${h.n(s.pnp!, 2)} m above sea level. When the surface falls below it the value turns negative; at the record low the fairway still held, by this arithmetic, ${h.m(s.tu! + s.nnw! - s.glw!)}.` },
      { q: 'Is Emmerich the last gauge before the Netherlands?', a: `Yes, among the WSV gauges in PEGELONLINE. Emmerich lies at Rhine km ${h.n(s.km!, 1)}, a few kilometres from the border. Just past the border the Dutch gauge at Lobith takes over; its values are also in PEGELONLINE, but without German reference values. For shipping on the Lower Rhine, Emmerich is the reference gauge down to the Spyck ferry.` },
      { q: 'Which flood marks apply at Emmerich?', a: `Mark I at ${h.cm(s.m1!)} and mark II at ${h.cm(s.m2!)}, for the section from Rees to the Spyck ferry. From mark I vessels keep to mid-river at no more than 20 km/h; from mark II shipping stops. Ferries may keep crossing.` },
    ]; },
  },
});
