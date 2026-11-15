/**
 * Une seule valeur par station (testeurs naïfs du 2026-11-14). Réponse PEGELONLINE simulée : Köln passe de la
 * momentaufnahme (82 cm) à 116 cm. Le chapeau écrit par le build est réécrit avec la lecture live, et la boîte live,
 * le texte et le calculateur lisent la même entrée du magasin. Le test e2e (tests/e2e-une-valeur.mjs) vérifie la
 * même chose dans un navigateur.
 */
import { describe, expect, it } from 'vitest';
import { helpers } from '../src/lib/helpers';
import { compact, raw } from '../src/lib/pegel';
import { applyLive } from '../src/lib/live-dom';
import { getLive, putLive, putMany } from '../src/lib/live';
import { feldText } from '../src/lib/live-fmt';
import { naheRekordtief, VERDIKT, lage } from '../src/lib/engine/pegel';
import { rangText } from '../src/lib/rang';
import { getSpec } from '../src/lib/mini-specs';
import { HOME } from '../src/content/home';

/** Mini-DOM : les <span data-lv> d'un fragment HTML, avec dataset et textContent comme dans le navigateur. */
function fragment(html: string) {
  const els = [...html.matchAll(/<span ([^>]*data-lv=[^>]*)>([^<]*)<\/span>/g)].map((m) => {
    const dataset: Record<string, string> = {};
    for (const a of m[1].matchAll(/data-([a-z]+)="([^"]*)"/g)) dataset[a[1]] = a[2].replace(/&quot;/g, '"').replace(/&amp;/g, '&');
    return { dataset, textContent: m[2] };
  });
  return { els, root: { querySelectorAll: () => ({ forEach: (f: (e: unknown) => void) => els.forEach(f) }) } as unknown as ParentNode };
}

const K = compact(raw('KÖLN'));
const LIVE = { v: K.v + 34, t: '2026-11-14T15:15:00+00:00', p: K.v + 34 - 26 };

describe('une valeur par station', () => {
  it('le chapeau de l’accueil prend la valeur, l’heure et la tendance live', () => {
    const h = helpers('de');
    const intro = HOME.de.intro(h);
    const { els, root } = fragment(intro);
    const v = els.find((e) => e.dataset.f === 'v')!;
    expect(v.textContent.replace(/\s/g, ' ')).toBe(`${K.v} cm`);
    putLive(K.u, LIVE);
    applyLive(root, 'de');
    expect(v.textContent.replace(/\s/g, ' ')).toBe('116 cm');
    expect(els.find((e) => e.dataset.f === 't')!.textContent).toBe('14. November 2026, 16:15 Uhr');
    expect(els.find((e) => e.dataset.f === 'd')!.textContent.replace(/\s/g, ' ')).toBe('+26 cm (steigend)');
  });

  it('chapeau, boîte live et calculateur lisent la même valeur', () => {
    putLive(K.u, LIVE);
    const boite = getLive(K.u)!.v;
    const chapeau = feldText('v', getLive(K.u)!, 'de');
    const spec = getSpec('marke', 'de');
    const st = spec.inputs.find((i) => i.id === 'st')!.def;
    expect(spec.live!.uuid({ st })).toBe(K.u);
    expect(boite).toBe(116);
    expect(chapeau!.replace(/\s/g, ' ')).toBe(`${boite} cm`);
  });

  it('une lecture plus ancienne ne remplace pas une plus récente, et garde la tendance', () => {
    putLive(K.u, LIVE);
    putMany({ [K.u]: { v: 50, t: '2026-11-14T14:00:00+00:00' } });
    expect(getLive(K.u)!.v).toBe(116);
    putMany({ [K.u]: { v: 118, t: '2026-11-14T15:30:00+00:00' } });
    expect(getLive(K.u)!.v).toBe(118);
    expect(getLive(K.u)!.p).toBe(LIVE.p);
  });

  it('le tableau des Kennwerte dit « über / unter dem aktuellen Stand », sans signe', () => {
    expect(feldText('ab', { v: 419, t: LIVE.t, p: null }, 'de', { ref: 490 })).toMatch(/^71.cm über dem aktuellen Stand$/);
    expect(feldText('ab', { v: 419, t: LIVE.t, p: null }, 'de', { ref: 372 })).toMatch(/^47.cm unter dem aktuellen Stand$/);
  });

  it('le chapeau de « Hochwasser aktuell » et la Rangliste ont le même premier pegel', () => {
    const vals = [{ s: { ...K, mnw: 100, mhw: 600 }, v: 500 }, { s: { ...K, n: 'Pfelling', mnw: 200, mhw: 400 }, v: 390 }];
    expect(rangText('top', vals, 'de')).toMatch(/^Pfelling mit 390/);
    expect(rangText('verdikt', vals, 'de')).toMatch(/^Derzeit kein Hochwasser/);
  });

  it('verdict en mots simples et alerte près du record bas', () => {
    expect(VERDIKT[lage(116, K)].de).toMatch(/kein Hochwasser/);
    expect(naheRekordtief(48, { nnw: 45 })).toBe(3);
    expect(naheRekordtief(80, { nnw: 45 })).toBeNull();
    expect(naheRekordtief(44, { nnw: 45 })).toBeNull();
  });
});
