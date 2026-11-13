/**
 * Une page = UN fichier de contenu (src/content/{stationen,fluesse,guides}/<id>.ts), allemand et anglais côte à côte.
 * Tout chiffre vient de la momentaufnahme PEGELONLINE via les helpers (h.st, h.cm…) : jamais tapé à la main.
 */
import type { Lang } from './format';
import type { St } from './engine/pegel';

export interface FAQ { q: string; a: string }
export interface MiniOpts { t?: string; d?: Record<string, number>; e?: string }
export interface RawLike { name: string; water: string; km: number | null; agency: string; pnp: { v: number; unit: string; from: string } | null; cv: Record<string, number>; occ: Record<string, string[]>; span: Record<string, [string, string]>; cur: { t: string; v: number; mnwMhw: string }; prev?: { t: string; v: number } | null; min30?: number; max30?: number }
export interface Helpers {
  lang: Lang;
  /** Choisit le texte de la langue. */
  t: (de: string, en: string) => string;
  /** Entier ou décimal formaté dans la langue. */
  n: (x: number, d?: number) => string;
  /** « 82 cm », « 1.069 cm ». */
  cm: (x: number) => string;
  /** « 3,41 m » depuis des cm. */
  m: (x: number) => string;
  /** Station brute (nom API : « KÖLN »). */
  st: (api: string) => RawLike;
  k: (api: string) => St;
  /** Lage en mots. */
  lage: (api: string) => string;
  /** « +13 cm (steigend) ». */
  trend: (api: string) => string;
  /** Date en toutes lettres (« 17. August 2002 ») ; accepte AAAA, AAAA-MM et AAAA-MM-JJ. */
  date: (iso: string) => string;
  /** Heure et date de la momentaufnahme. */
  when: (iso: string) => string;
  snap: string;
  a: (id: string, text: string) => string;
  src: (key: string, text?: string) => string;
  ext: (url: string, text: string) => string;
  table: (headers: string[], rows: Array<Array<string | number>>, caption?: string) => string;
  box: (title: string, html: string) => string;
  mini: (kind: string, opts?: MiniOpts) => string;
  /** Tableau des Kennwerte officiels d'une station (PEGELONLINE). */
  kenn: (api: string) => string;
  /** Chemin vers une autre langue n'est jamais utile ici : lien vers la page d'une station à page. */
  stLink: (id: string, text?: string) => string;
}
export interface LangPage {
  /** Segment final de l'URL. */
  slug: string;
  nav: string; card: string;
  /** 50 à 60 caractères, terme clé d'abord (§11). */
  title: string;
  /** 150 à 160 caractères. */
  description: string;
  h1: string;
  intro: (h: Helpers) => string;
  /** UN paragraphe de 120 mots ou plus : la réponse directe, chiffrée (§21). */
  resume: (h: Helpers) => string;
  faqs: (h: Helpers) => FAQ[];
  body: (h: Helpers) => string;
}
export type Kind = 'station' | 'river' | 'guide';
export interface PageDef {
  id: string; kind: Kind; order: number;
  /** Station (id de FEATURED) ou fleuve (RiverId) concernés. */
  ref?: string;
  /** Outil en tête : 'pegel' (outil principal), 'rangliste-hoch', 'rangliste-tief', ou un mini (« mini:nhn »). */
  tool: string;
  related: string[];
  sources: string[];
  de: LangPage; en: LangPage;
  /** Chemin sans /de/ ni /en/, calculé par le registre. */
  path: { de: string; en: string };
}
export type PageInput = Omit<PageDef, 'path'>;
export const definePage = (p: PageInput): PageInput => p;
