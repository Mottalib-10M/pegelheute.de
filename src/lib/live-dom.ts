/**
 * Côté navigateur : remplace chaque <span data-lv> du HTML (momentaufnahme du build) par la lecture live de la
 * même station, prise dans le magasin partagé de src/lib/live.ts. Ainsi le chapeau, les textes, les tableaux de
 * Kennwerte, la boîte live et les calculateurs montrent tous la même valeur, à la même heure.
 */
import { ensureAll, ensureLive, ensureSerie, getLive, getSerie, subscribe } from './live';
import { feldText, type Feld } from './live-fmt';
import type { Lang } from './format';

export function applyLive(root: ParentNode, lang: Lang): number {
  let n = 0;
  root.querySelectorAll<HTMLElement>('[data-lv]').forEach((el) => {
    const u = el.dataset.lv!;
    const f = el.dataset.f as Feld;
    const x = getLive(u);
    if (!x) return;
    const s = getSerie(u);
    const txt = feldText(f, x, lang, {
      ref: el.dataset.ref !== undefined ? Number(el.dataset.ref) : undefined,
      k: el.dataset.k ? JSON.parse(el.dataset.k) : undefined,
      pnp: el.dataset.pnp !== undefined ? Number(el.dataset.pnp) : undefined,
      tu: el.dataset.tu !== undefined ? Number(el.dataset.tu) : undefined,
      lo: s?.lo, hi: s?.hi,
    });
    if (txt !== null && el.textContent !== txt) { el.textContent = txt; n++; }
    if (txt !== null) el.dataset.live = '1';
  });
  return n;
}

/** Lance la lecture de chaque station citée dans la page, puis tient les textes à jour. */
export function initLiveDom(doc: Document = document) {
  const lang: Lang = doc.documentElement.lang.startsWith('en') ? 'en' : 'de';
  const run = () => applyLive(doc, lang);
  subscribe(run);
  // La tendance demande la série de 24 h de la station ; le reste vient d'une seule requête pour les six fleuves.
  const avecTendance = new Set<string>(), autres = new Set<string>();
  doc.querySelectorAll<HTMLElement>('[data-lv]').forEach((el) => (el.dataset.f === 'd' ? avecTendance : autres).add(el.dataset.lv!));
  avecTendance.forEach((u) => { ensureLive(u); });
  if ([...autres].some((u) => !avecTendance.has(u))) ensureAll();
  // La plage des 30 jours citée dans le texte (lo/hi) suit la même série que la courbe.
  new Set([...doc.querySelectorAll<HTMLElement>('[data-lv][data-f="lo"], [data-lv][data-f="hi"]')].map((el) => el.dataset.lv!)).forEach((u) => { ensureSerie(u); });
  run();
}
