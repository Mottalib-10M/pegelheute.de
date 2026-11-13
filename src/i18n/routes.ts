import { makeRouter, type RouteDef } from './routes-core';
import { PAGES } from '../lib/pages';
/** Deutsch zuerst, Englisch auf jeder Seite (RECETTE §3 : langue locale + anglais). */
export const LOCALES = ['de', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'de';
const R = (id: string, de: string, en: string, noindex = false) => ({ id, paths: { de: `/de/${de}/`, en: `/en/${en}/` }, ...(noindex ? { noindex } : {}) });
const CORE: RouteDef<Locale>[] = [
  { id: 'home', paths: { de: '/de/', en: '/en/' } },
  R('method', 'methodik', 'method'),
  R('about', 'ueber-uns', 'about'),
  R('widget', 'widget', 'widget', true),
  R('contact', 'kontakt', 'contact', true),
  R('editorial', 'redaktionelle-grundsaetze', 'editorial-policy', true),
  R('privacy', 'datenschutz', 'privacy', true),
  R('terms', 'impressum', 'legal-notice', true),
  R('cookies', 'cookies', 'cookies', true),
];
export const ROUTES: RouteDef<Locale>[] = [CORE[0], ...PAGES.map((p) => ({ id: p.id, paths: { de: `/de/${p.path.de}/`, en: `/en/${p.path.en}/` } })), ...CORE.slice(1)];
export const { NOINDEX_PATHS, route, hasRoute, altPaths } = makeRouter(LOCALES, ROUTES);
