/**
 * Une seule valeur par station (testeurs naïfs du 2026-11-14) : le chapeau donnait 82 cm du 13 novembre pendant
 * que la boîte live donnait 116 cm du 14, et le calculateur des Hochwassermarken repartait de 82 cm.
 *
 * Ce test sert dist/, remplace PEGELONLINE par une réponse simulée (chaque station = momentaufnahme + 34 cm, mesurée
 * le 14 novembre 2026 à 16:15 heure de Berlin ; Köln passe de 82 à 116 cm, +26 cm en 24 h) et vérifie dans un vrai
 * navigateur que, sur chaque page testée :
 *   - le chapeau, la boîte live, les textes et les tableaux montrent la même valeur et la même heure pour Köln ;
 *   - aucun <span data-lv> ne garde la valeur du build ;
 *   - le calculateur des Hochwassermarken part de la valeur live (116), pas de la momentaufnahme (82) ;
 *   - le chapeau de « Hochwasser aktuell » cite le même premier pegel que la Rangliste.
 * Usage : node tests/e2e-une-valeur.mjs  (après npm run build ; Playwright global comme check-layout.mjs).
 */
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, resolve } from 'node:path';
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require(join(execSync('npm root -g').toString().trim(), 'playwright'))); }

const ROOT = resolve(new URL('..', import.meta.url).pathname, 'dist');
const DATA = JSON.parse(readFileSync(new URL('../src/data/pegel.json', import.meta.url), 'utf8'));
const KOELN = DATA.stations.find((s) => s.name === 'KÖLN');
const T = '2026-11-14T15:15:00+00:00';          // 16:15 Uhr in Berlin
const T0 = '2026-11-13T15:15:00+00:00';
const PLUS = 34, DELTA = 26;
const live = (s) => s.cur.v + PLUS;
const EXPECT_V = `${live(KOELN)} cm`;            // 116 cm
const EXPECT_T = '14. November 2026, 16:15 Uhr';

const LOCAL = ['http:', '', 'localhost'].join('/');
const API_HOST = 'www.pegelonline.wsv.de';
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.ico': 'image/x-icon' };
const server = createServer(async (req, res) => {
  let f = join(ROOT, decodeURIComponent(new URL(req.url, LOCAL).pathname));
  try { if ((await stat(f)).isDirectory()) f = join(f, 'index.html'); } catch { f += '.html'; }
  try { res.writeHead(200, { 'content-type': TYPES[extname(f)] || 'application/octet-stream' }); res.end(await readFile(f)); } catch { res.writeHead(404); res.end(); }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const BASE = `http://127.0.0.1:${server.address().port}`;

/** Réponse simulée de l'API REST v2 de PEGELONLINE. */
function api(url) {
  const u = new URL(url);
  if (u.pathname.endsWith('/stations.json')) {
    return DATA.stations.map((s) => ({ uuid: s.uuid, timeseries: [{ shortname: 'W', currentMeasurement: { timestamp: T, value: live(s), stateMnwMhw: 'normal' } }] }));
  }
  const m = u.pathname.match(/stations\/([^/]+)\/W\/measurements\.json$/);
  if (m) {
    const s = DATA.stations.find((x) => x.uuid === m[1]);
    if (!s) return [];
    if (u.searchParams.get('start') === 'P1D') return [{ timestamp: T0, value: live(s) - DELTA }, { timestamp: T, value: live(s) }];
    const serie = DATA.series[s.uuid] ?? [];
    return serie.map(([t, v]) => ({ timestamp: new Date(t * 1000).toISOString(), value: v + PLUS }));
  }
  return [];
}

const fails = [];
const check = (ok, msg) => { if (!ok) fails.push(msg); };
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.route((u) => u.hostname === API_HOST, (r) => r.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify(api(r.request().url())) }));

const norm = (x) => (x ?? '').replace(/\s+/g, ' ').trim();
async function etat(path) {
  await page.goto(BASE + path, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  return page.evaluate((u) => ({
    spans: [...document.querySelectorAll('[data-lv]')].map((e) => ({ u: e.dataset.lv, f: e.dataset.f, txt: e.textContent, live: e.dataset.live === '1' })),
    tool: document.querySelector(`[data-pegel-tool] [data-wert="${u}"]`)?.textContent ?? null,
    toolZeit: document.querySelector('[data-pegel-tool] [data-zeit]')?.textContent ?? null,
    verdikt: document.querySelector('[data-pegel-tool] [data-verdikt]')?.textContent ?? null,
  }), KOELN.uuid);
}

for (const path of ['/de/', '/de/rhein/koeln/', '/de/rhein/', '/en/rhine/cologne/', '/de/hochwassermarken/', '/de/pegel-lesen/']) {
  const e = await etat(path);
  const k = e.spans.filter((s) => s.u === KOELN.uuid);
  const stale = e.spans.filter((s) => !s.live);
  check(stale.length === 0, `${path} : ${stale.length} valeur(s) du build jamais remplacée(s) (${stale.slice(0, 3).map((s) => `${s.f}=${s.txt}`).join(', ')})`);
  for (const s of k.filter((x) => x.f === 'v')) check(norm(s.txt) === EXPECT_V, `${path} : Köln affiché ${norm(s.txt)} dans le texte, attendu ${EXPECT_V}`);
  if (path.startsWith('/de/')) for (const s of k.filter((x) => x.f === 't')) check(norm(s.txt) === EXPECT_T, `${path} : heure ${norm(s.txt)} dans le texte, attendu ${EXPECT_T}`);
  for (const s of k.filter((x) => x.f === 'd')) check(norm(s.txt).startsWith(`+${DELTA}`), `${path} : tendance ${norm(s.txt)} dans le texte, attendu +${DELTA} cm`);
  if (e.tool !== null) {
    check(norm(e.tool) === EXPECT_V, `${path} : boîte live ${norm(e.tool)}, attendu ${EXPECT_V}`);
    if (path.startsWith('/de/')) check(norm(e.toolZeit) === EXPECT_T, `${path} : heure de la boîte live ${norm(e.toolZeit)}, attendu ${EXPECT_T}`);
    check(norm(e.verdikt).includes(`+${DELTA}`), `${path} : verdict de la boîte « ${norm(e.verdikt)} » sans la tendance +${DELTA} cm`);
    const chapeau = k.find((s) => s.f === 'v');
    if (chapeau) check(norm(chapeau.txt) === norm(e.tool), `${path} : chapeau ${norm(chapeau.txt)} ≠ boîte live ${norm(e.tool)}`);
  }
  if (path === '/de/' || path === '/de/rhein/koeln/') check(k.some((s) => s.f === 'v') && e.tool !== null, `${path} : chapeau ou boîte live introuvable`);
}

// Calculateur des Hochwassermarken : il part de la valeur live de Köln.
await page.goto(BASE + '/de/hochwassermarken/', { waitUntil: 'networkidle' });
await page.waitForTimeout(400);
const w = await page.locator('input[id$="-marke-w"]').first().inputValue();
check(w === String(live(KOELN)), `/de/hochwassermarken/ : le calculateur part de ${w} cm, attendu ${live(KOELN)} (valeur live)`);
const chap = norm(await page.locator(`header [data-lv="${KOELN.uuid}"][data-f="v"]`).first().textContent());
check(chap === `${w} cm`, `/de/hochwassermarken/ : chapeau ${chap} ≠ calculateur ${w} cm`);

// Hochwasser aktuell : le chapeau cite le premier de la Rangliste live.
await page.goto(BASE + '/de/hochwasser-aktuell/', { waitUntil: 'networkidle' });
await page.waitForTimeout(400);
const top = norm(await page.locator('[data-rang="top"]').first().textContent());
const boite = norm(await page.locator('[data-resultat] p.text-3xl').first().textContent());
const nomBoite = boite.split(':')[0];
check(top.startsWith(`${nomBoite} mit ${boite.split(':')[1].trim()}`), `/de/hochwasser-aktuell/ : chapeau « ${top} » ≠ Rangliste « ${boite} »`);

await browser.close();
server.close();
if (fails.length) { console.error(`e2e une valeur par station : ${fails.length} défaut(s)\n- ${fails.join('\n- ')}`); process.exit(1); }
console.log(`e2e une valeur par station : chapeau, textes, boîte live et calculateur = ${EXPECT_V} (${EXPECT_T}) sur 8 pages, 0 défaut`);
