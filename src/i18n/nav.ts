import { route, hasRoute, type Locale } from './routes';
import { PAGES, pageById } from '../lib/pages';
export interface NavLink { href: string; label: string } export interface NavCategory { label: string; links: NavLink[] }
const CORE: Record<Locale, Record<string, string>> = {
  de: { home: 'Pegelstände aktuell', method: 'Methodik', about: 'Über uns', widget: 'Pegel einbinden', contact: 'Kontakt', editorial: 'Redaktionelle Grundsätze', privacy: 'Datenschutz', terms: 'Impressum', cookies: 'Cookies' },
  en: { home: 'River levels today', method: 'Method', about: 'About', widget: 'Embed a gauge', contact: 'Contact', editorial: 'Editorial policy', privacy: 'Privacy', terms: 'Legal notice', cookies: 'Cookies' },
};
type G = 'stationen' | 'fluesse' | 'wissen';
export const GROUPS: Array<{ id: G; label: Record<Locale, string>; short: Record<Locale, string> }> = [
  { id: 'stationen', label: { de: 'Pegel nach Stadt', en: 'Gauges by town' }, short: { de: 'Pegel', en: 'Gauges' } },
  { id: 'fluesse', label: { de: 'Pegelstände nach Fluss', en: 'Levels by river' }, short: { de: 'Flüsse', en: 'Rivers' } },
  { id: 'wissen', label: { de: 'Hochwasser, Niedrigwasser, Pegel lesen', en: 'Floods, low water, reading a gauge' }, short: { de: 'Hochwasser', en: 'Floods' } },
];
const KIND: Record<G, string> = { stationen: 'station', fluesse: 'river', wissen: 'guide' };
export const label = (id: string, lang: Locale) => CORE[lang][id] ?? pageById(id)?.[lang]?.nav ?? id;
const link = (id: string, lang: Locale): NavLink => ({ href: route(id, lang), label: label(id, lang) });
export const inGroup = (g: G, lang: Locale): NavLink[] => PAGES.filter((p) => p.kind === KIND[g] && hasRoute(p.id, lang)).map((p) => link(p.id, lang));
export function navCategories(lang: Locale, short = true): NavCategory[] {
  return GROUPS.map((g) => ({ label: (short ? g.short : g.label)[lang], links: g.id === 'stationen' ? [link('home', lang), ...inGroup(g.id, lang)] : inGroup(g.id, lang) })).filter((c) => c.links.length);
}
export const navDirect = (_lang: Locale): NavLink[] => [];
export const footerColumns = (lang: Locale): NavCategory[] => {
  const site = { label: { de: 'Diese Seite', en: 'This site' }[lang], links: ['home', 'method', 'about', 'contact', 'editorial', 'widget', 'terms', 'privacy', 'cookies'].map((i) => link(i, lang)) };
  return [...GROUPS.map((g) => ({ label: g.label[lang], links: inGroup(g.id, lang) })), site];
};
export const popularLinks = (lang: Locale): NavLink[] => [link('home', lang), ...['st-koeln', 'st-kaub', 'fl-rhein', 'hochwasser-aktuell'].filter((id) => hasRoute(id, lang)).map((id) => link(id, lang))];
