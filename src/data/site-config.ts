/** Configuration centrale du site (générée par new-site.py). */
export const SITE_URL = "https://pegelheute.de";
export const SITE_NAMES: Record<string, string> = {"de": "Pegel Heute", "en": "Pegel Heute"};
// Partie du nom affichée en couleur dans l'en-tête (RECETTE §10.3), « » pour aucune.
export const BRAND_ACCENT = "Heute";
export const LANG_TAGS: Record<string, string> = {"de": "de-DE", "en": "en-DE"};
export const OG_LOCALES: Record<string, string> = {"de": "de_DE", "en": "en_GB"};
export const LOCALE_TAG = 'de-DE';
export const CURRENCY = 'EUR';
export const YEAR = 2026;
/** Année de création du site — signal d'ancienneté (RECETTE §8.0). */
export const SITE_FOUNDED = '2026';
export const LAST_UPDATED = '2026-11-13';
export const AUTHOR_NAME = 'Radif Partners';
export const AUTHOR_ROLE: Record<string, string> = {"de": "Herausgeber einer unabhängigen Übersicht der Pegelstände an Rhein, Elbe, Donau, Main, Mosel und Weser auf Grundlage der amtlichen Rohdaten von PEGELONLINE", "en": "Publisher of an independent overview of water levels on the Rhine, Elbe, Danube, Main, Moselle and Weser, built on the official PEGELONLINE raw data"};
export const AUTHOR_DESC: Record<string, string> = {"de": "Radif Partners liest die Wasserstände der Bundeswasserstraßen über die offene Schnittstelle PEGELONLINE der Wasserstraßen- und Schifffahrtsverwaltung des Bundes (Lizenz DL-DE->Zero-2.0), stellt jeden Wert mit Uhrzeit, Tendenz über 24 Stunden und den amtlichen Kennwerten der Station (MW, MHW, GlW, Hochwassermarken) dar und erklärt, was die Zahl bedeutet. Wir sind keine Behörde, geben keine Hochwasserwarnung heraus und verweisen für Warnungen auf die Hochwasserzentralen der Länder.", "en": "Radif Partners reads the water levels of Germany's federal waterways through the open PEGELONLINE interface of the Federal Waterways and Shipping Administration (licence DL-DE->Zero-2.0), shows each value with its time, its 24-hour trend and the station's official reference levels (mean water, mean high water, GlW, flood marks) and explains what the number means. We are not an authority, issue no flood warning and refer to the flood centres of the German states for warnings."};
/** Sujets sur lesquels l'editeur est competent (schema.org knowsAbout). Ce sont les
 *  themes reellement traites par le site, pas une liste de mots-cles : un sujet
 *  declare ici sans page qui le couvre est une declaration fausse. */
export const KNOWS_ABOUT: Record<string, string[]> = {"de": ["Pegelstände der Bundeswasserstraßen (PEGELONLINE)", "Gewässerkundliche Hauptwerte MW, MNW, MHW, HHW, NNW", "Gleichwertiger Wasserstand (GlW) und Fahrrinnentiefe am Rhein", "Hochwassermarken I und II und höchster Schifffahrtswasserstand (HSW)", "Pegelnullpunkt und Wasserspiegelhöhe über NHN"], "en": ["Water levels of German federal waterways (PEGELONLINE)", "Hydrological reference values MW, MNW, MHW, HHW, NNW", "Equivalent water level (GlW) and fairway depth on the Rhine", "Flood marks I and II and the highest navigable water level (HSW)", "Gauge datum and water surface elevation above sea level"]};
export const CONTACT_EMAIL = "contact@pegelheute.de";
export const THEME_COLOR = '#0E5A8A';
export const LOGO_SYMBOL = '≈';
export const BING_VERIFY_CODE = '';
export const GOOGLE_VERIFY_CODE = '';
/** Régime : 'none' pour tous les sites (RECETTE §15.6, décision de l'éditeur du 2026-10-06) :
 *  aucun bandeau ; Clarity chargé en mode sans cookie (consentv2 denied) ; GA4 avec cookies si GA4_ID.
 *  'opt-in' / 'notice' ne servent plus qu'aux sites anciens qui les portent encore. */
export const CONSENT_MODE: 'opt-in' | 'notice' | 'none' = 'none';
/** Propriété Google Analytics 4 (décision de l'éditeur du 2026-10-17, RECETTE §15.6) : GA4 normal,
 *  avec cookies _ga / _ga_<ID> (390 jours), sans bandeau, publicité refusée. Créée par
 *  `seo-platform/scripts/create-ga4.ts accounts/372759688` (RECETTE §15.3, étape 15), puis
 *  pages légales régénérées : `python3 scripts/gen-legal-pages.py .`. Vide = pas de GA4. */
export const GA4_ID = 'G-ZHD5G0Q39M';
/** Projet Microsoft Clarity (compte amradif), chargé sans cookie. Vide = aucune mesure. */
export const CLARITY_ID = 'zdgdkgnt53';
export const INDEXNOW_KEY = 'eac2876134028b188afb696c8151029f';

/* ------------------------------------------------------------------------- *
 * IDENTITÉ LÉGALE — À COMPLÉTER AVANT LA MISE EN LIGNE
 * Ces champs alimentent la mention légale du pays, la politique de confidentialité,
 * la page contact et le schema Organization. Un champ vide s'affiche en jaune
 * sur le site. Contrôle : `npm run check:legal`.
 * ------------------------------------------------------------------------- */
export interface LegalHosting { name: string; address: string; phone: string; url: string }
export interface LegalIdentity {
  entityName: string; legalForm: string; street: string; postalCode: string; city: string;
  country: string; phone: string; registerLabel: string; registerNumber: string;
  vatLabel: string; vatNumber: string; jurisdiction: string;
  supervisoryAuthority: string; supervisoryAuthorityUrl: string; hosting: LegalHosting;
}
export const LEGAL: LegalIdentity = {
  entityName: 'Radif Partners',  // éditeur de tous les sites du portefeuille (RECETTE §8)
  legalForm: '',  // vide : comme les autres sites du portefeuille
  street: '49 rue du Ressort',
  postalCode: '63000',
  city: 'Clermont-Ferrand',
  country: "Frankreich / France",
  phone: '',                 // ligne de contact publiée
  registerLabel: "SIREN",
  registerNumber: '',
  vatLabel: "USt-IdNr.",
  vatNumber: '',             // laisser vide si non assujetti
  jurisdiction: "France",
  supervisoryAuthority: "Commission nationale de l'informatique et des libertés (CNIL)",
  supervisoryAuthorityUrl: "https://www.cnil.fr",
  hosting: { name: 'GitHub, Inc. (GitHub Pages)', address: '88 Colin P Kelly Jr Street, San Francisco, CA 94107, United States', phone: '', url: 'https://pages.github.com' },
};

/** Champs sans lesquels le site ne doit pas être mis en ligne. */
export const LEGAL_REQUIRED: Array<keyof LegalIdentity> = ['entityName', 'street', 'postalCode', 'city']; // legalForm vide à dessein, comme les autres sites du portefeuille

/** Profils publics de l'auteur (schema.org sameAs). Laisser vide si aucun. */
export const AUTHOR_SAME_AS: string[] = [];

/** Rythme de revue éditoriale annoncé sur le site, en mois. */
export const REVIEW_CYCLE_MONTHS = 12;
