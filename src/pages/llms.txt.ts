/** llms.txt (RECETTE §21), généré depuis le registre des pages et la momentaufnahme. */
import { PAGES } from '../lib/pages';
import { SITE_URL, LAST_UPDATED, SITE_NAMES } from '../data/site-config';
import { route } from '../i18n/routes';
import { FETCHED_AT, RAW_STATIONS, FEATURED, raw } from '../lib/pegel';
export function GET() {
  const ex = FEATURED.map((f) => { const s = raw(f.api); return `${f.en} ${s.cur.v} cm (${s.cur.t})`; }).join('; ');
  const lines = [
    `# ${SITE_NAMES.de}`, '',
    `> Water levels (Pegelstände) of ${RAW_STATIONS.length} federal gauges on the Rhine, Elbe, Danube, Main, Moselle and Weser, in German and English. Data: PEGELONLINE REST API v2 of the German Federal Waterways and Shipping Administration (WSV), licence DL-DE->Zero-2.0, unchecked raw data, usually every 15 minutes. Pages show each reading with its time, 24-hour change, rating against the station's official reference values (MNW, MW, MHW, NNW, HHW, GlW, flood marks I and II) and a 30-day curve for twelve stations; browsers fetch live values from PEGELONLINE. Rhine flood marks per RheinSchPV § 10.01. Fairway depth approximation = TuGLW + (reading - GlW). No warnings, no forecasts: flood warnings come from the German state flood centres (hochwasserzentralen.de). Snapshot ${FETCHED_AT}: ${ex}. Independent site by Radif Partners. Last updated ${LAST_UPDATED}.`, '',
    '## Start', `- [Pegelstände aktuell](${SITE_URL}${route('home', 'de')})`, `- [River levels today](${SITE_URL}${route('home', 'en')})`, '',
    '## Pages', ...PAGES.flatMap((p) => [`- [${p.de.nav}](${SITE_URL}${route(p.id, 'de')}): ${p.de.card}`, `- [${p.en.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.en.card}`]), '',
    '## About', `- [Methodik](${SITE_URL}${route('method', 'de')})`, `- [Method](${SITE_URL}${route('method', 'en')})`, `- [About](${SITE_URL}${route('about', 'en')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
