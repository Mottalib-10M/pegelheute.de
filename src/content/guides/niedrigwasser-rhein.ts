import { definePage } from '../../lib/page-types';
import { compactOf } from '../../lib/pegel';

const GLW = () => compactOf('rhein').filter((s) => s.glw !== undefined && s.tu !== undefined);
const UNTER = () => GLW().filter((s) => s.v < s.glw!);

export default definePage({
  id: 'niedrigwasser-rhein', kind: 'guide', order: 2, tool: 'mini:fahrrinne',
  related: ['st-kaub', 'st-duesseldorf', 'st-emmerich', 'fl-rhein'],
  sources: ['pegelonline', 'elwis', 'pegelonline-api', 'wsv'],
  de: {
    slug: 'niedrigwasser-rhein', nav: 'Niedrigwasser Rhein', card: 'Gleichwertiger Wasserstand, Fahrrinne und Kaub bei Trockenheit',
    title: 'Niedrigwasser Rhein: GlW, Fahrrinne und Pegel Kaub heute',
    description: 'Niedrigwasser am Rhein: Rechner für die Fahrrinnentiefe aus dem Pegelwert, GlW aller Rheinpegel und die Lage in Kaub, Düsseldorf und Emmerich mit Uhrzeit.',
    h1: 'Niedrigwasser Rhein: Fahrrinne aus dem Pegelwert rechnen',
    intro: (h) => { const k = h.k('KAUB'); return `Niedrigwasser Rhein: Kaub zeigt ${h.vv(k)} (Stand: ${h.wt(k)}), das sind ${h.vs(k, k.glw!)} dem gleichwertigen Wasserstand (GlW) von ${h.cm(k.glw!)}.`; },
    resume: (h) => { const k = h.k('KAUB'); return `Bei Niedrigwasser am Rhein zählt für die Schifffahrt nicht der Pegelwert allein, sondern sein Abstand zum gleichwertigen Wasserstand, kurz GlW. Der GlW ist ein festgelegter niedriger Bezugswasserstand je Pegel; die WSV gibt in PEGELONLINE dazu an, wie tief die Fahrrinne bei diesem Stand mindestens sein soll. Am Pegel Kaub sind das ${h.cm(k.tu!)} unter einem GlW von ${h.cm(k.glw!)}, am Niederrhein ${h.cm(h.k('EMMERICH').tu!)}. Steht der Pegel über dem GlW, ist die Rinne näherungsweise um diesen Betrag tiefer, steht er darunter, entsprechend flacher. Der Rechner oben rechnet genau diese Näherung für jeden Rheinpegel mit GlW. Beim Erstellen der Seite (Stand: ${h.snap}) lagen ${h.n(UNTER().length)} der ${h.n(GLW().length)} Rheinpegel mit GlW unter ihm. Die tatsächliche Tiefe an einer Stelle hängt von Sohle, Baggerungen und Strömung ab; verbindlich sind die Angaben der WSV in ELWIS. Mit dem Wasserstand sinkt auch die Ladung, die ein Schiff aufnehmen darf, weshalb Frachtpreise bei Niedrigwasser steigen.`; },
    body: (h) => `<h2>Niedrigwasser Rhein: alle Pegel mit GlW</h2>
<p>Die Tabelle zeigt für jeden Rheinpegel, für den PEGELONLINE einen GlW führt, den Abstand des aktuellen Stands dazu und die genäherte Fahrrinnentiefe.</p>
${h.table([h.t('Pegel', 'Gauge'), 'km', 'GlW', h.t('Aktueller Stand', 'Current level'), h.t('Abstand zum GlW', 'Distance to GlW'), h.t('Fahrrinne genähert', 'Fairway, approx.')], GLW().map((s) => [s.n, h.n(s.km!, 1), h.cm(s.glw!), h.vv(s), h.vs(s, s.glw!), h.rinne(s)]), h.t('Aktueller Stand beim Öffnen der Seite live gelesen; Näherung Solltiefe + (Pegel − GlW).', 'Current level read live when the page opens; approximation target depth + (reading − GlW).'))}
<h2>Warum gerade Kaub?</h2>
<p>Zwischen Oestrich und Kaub liegt die geringste Solltiefe der Fahrrinne am deutschen Rhein. Wer Fracht von Rotterdam nach Mainz, Mannheim oder Basel bringt, muss durch diesen Abschnitt; deshalb richten sich Abladetiefen und Frachtzuschläge nach dem ${h.stLink('kaub')}. Am Niederrhein sind ${h.stLink('duesseldorf')} und ${h.stLink('emmerich')} die meistbeachteten Werte.</p>
<h2>Was der Rechner nicht weiß</h2>
<p>Die Näherung geht davon aus, dass jeder Zentimeter Pegel einen Zentimeter Tiefe bedeutet. Das stimmt in der Nähe des GlW gut, weiter weg weniger. Untiefen, Baustellen und Sperrungen meldet die WSV in den Nachrichten für die Binnenschifffahrt in ${h.src('elwis', 'ELWIS')}; dort stehen auch die amtlichen Fahrrinnentiefen.</p>`,
    faqs: (h) => [
      { q: 'Was ist der gleichwertige Wasserstand (GlW)?', a: 'Ein für jeden Pegel festgelegter niedriger Bezugswasserstand. Auf ihn bezieht die WSV die Solltiefe der Fahrrinne, damit Tiefenangaben am ganzen Rhein vergleichbar sind. Der GlW wird in Abständen neu festgelegt. Er entspricht einem niedrigen Stand, der statistisch nur an wenigen Tagen im Jahr unterschritten wird.' },
      { q: 'Ab wann ist Niedrigwasser am Rhein kritisch?', a: `Für die Schifffahrt, sobald die Pegel deutlich unter den GlW fallen und Schiffe weniger laden müssen. In Kaub liegt der GlW bei ${h.cm(h.k('KAUB').glw!)}. Eine feste amtliche Grenze, ab der der Rhein gesperrt wird, gibt es bei Niedrigwasser nicht. Die Reedereien entscheiden selbst.` },
      { q: 'Wie genau ist die berechnete Fahrrinnentiefe?', a: 'Sie ist eine Näherung: Solltiefe plus Abstand des Pegels zum GlW. Die tatsächliche Tiefe kann abweichen; amtliche Werte stehen in ELWIS. Für eine grobe Einschätzung, ob der Rhein gerade flach oder tief ist, reicht sie aus. Für die Planung einer Ladung oder einer Fahrt sind die amtlichen Angaben zu nehmen.' },
    ],
  },
  en: {
    slug: 'rhine-low-water', nav: 'Rhine low water', card: 'GlW, fairway depth and Kaub in a drought',
    title: 'Rhine Low Water Today: GlW, Fairway Depth and Kaub Gauge',
    description: 'Rhine low water today: a fairway depth calculator from the gauge reading, the GlW of every Rhine gauge, and Kaub, Düsseldorf and Emmerich with their times.',
    h1: 'Rhine low water: fairway depth from the gauge reading',
    intro: (h) => { const k = h.k('KAUB'); return `Rhine low water: Kaub reads ${h.vv(k)} (as of ${h.wt(k)}), ${h.vs(k, k.glw!)} the equivalent low water level (GlW) of ${h.cm(k.glw!)}.`; },
    resume: (h) => { const k = h.k('KAUB'); return `At Rhine low water what matters for shipping is not the reading alone but its distance to the equivalent low water level, GlW for short. The GlW is a fixed low reference level for each gauge, and the WSV gives in PEGELONLINE how deep the fairway should at least be at that level. At the Kaub gauge that is ${h.cm(k.tu!)} below a GlW of ${h.cm(k.glw!)}; on the Lower Rhine ${h.cm(h.k('EMMERICH').tu!)}. When the gauge is above GlW the channel is roughly that much deeper; when it is below, that much shallower. The calculator above does exactly this approximation for every Rhine gauge with a GlW. When the page was built (as of ${h.snap}), ${h.n(UNTER().length)} of the ${h.n(GLW().length)} Rhine gauges with a GlW were below it. The actual depth at a spot depends on the bed, dredging and current; the WSV figures in ELWIS are binding. As the water falls, so does the cargo a barge may carry, which is why freight rates rise at low water.`; },
    body: (h) => `<h2>Rhine low water: every gauge with a GlW</h2>
<p>The table shows, for each Rhine gauge for which PEGELONLINE lists a GlW, the current level's distance to it and the approximate fairway depth.</p>
${h.table([h.t('Pegel', 'Gauge'), 'km', 'GlW', h.t('Aktueller Stand', 'Current level'), h.t('Abstand zum GlW', 'Distance to GlW'), h.t('Fahrrinne genähert', 'Fairway, approx.')], GLW().map((s) => [s.n, h.n(s.km!, 1), h.cm(s.glw!), h.vv(s), h.vs(s, s.glw!), h.rinne(s)]), h.t('Aktueller Stand beim Öffnen der Seite live gelesen; Näherung Solltiefe + (Pegel − GlW).', 'Current level read live when the page opens; approximation target depth + (reading − GlW).'))}
<h2>Why Kaub?</h2>
<p>Between Oestrich and Kaub lies the smallest fairway target depth on the German Rhine. Cargo from Rotterdam to Mainz, Mannheim or Basel has to pass this stretch, so loading depths and low-water surcharges follow the ${h.stLink('kaub', 'Kaub gauge')}. On the Lower Rhine the most watched readings are ${h.stLink('duesseldorf', 'Düsseldorf')} and ${h.stLink('emmerich', 'Emmerich')}.</p>
<h2>What the calculator does not know</h2>
<p>The approximation assumes each centimetre on the gauge means a centimetre of depth. That holds well near the GlW and less well further away. Shoals, works and closures are announced by the WSV in its notices to inland shipping in ${h.src('elwis', 'ELWIS')}, which also carries the official fairway depths.</p>`,
    faqs: (h) => [
      { q: 'What is the equivalent low water level (GlW)?', a: 'A low reference level fixed for each gauge. The WSV ties the fairway target depth to it so that depth figures are comparable along the whole Rhine. It is revised from time to time and matches a low level that, statistically, is undercut on only a few days a year.' },
      { q: 'When does Rhine low water become critical?', a: `For shipping, once gauges fall well below GlW and barges must load less. At Kaub the GlW is ${h.cm(h.k('KAUB').glw!)}. There is no fixed official level at which the Rhine is closed for low water. Operators decide for themselves. ELWIS carries the notices.` },
      { q: 'How accurate is the calculated fairway depth?', a: 'It is an approximation: target depth plus the gauge’s distance to GlW. The actual depth can differ; official values are in ELWIS. It is enough for a rough idea of whether the Rhine is shallow or deep right now. For planning a cargo or a voyage, use the official figures.' },
    ],
  },
});
