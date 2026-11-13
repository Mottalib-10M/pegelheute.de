import type { Locale } from './routes';
const de = {
  updatedOn: 'Aktualisiert am', editorialPolicy: 'Redaktionelle Grundsätze', contactLabel: 'Kontakt', reviewedBy: 'Erstellt von',
  skipToContent: 'Zum Inhalt', mainNav: 'Hauptnavigation', breadcrumbLabel: 'Brotkrumen', breadcrumbHome: 'Start', menuOpen: 'Menü öffnen',
  faqTitle: 'Häufige Fragen', relatedCalculators: 'Weitere Pegel und Werkzeuge', sourcesTitle: 'Amtliche Quellen dieser Seite', writtenBy: 'Erstellt von',
  asOf: 'Stand', lastUpdated: 'Texte und Kennwerte geprüft am',
  footerValidated: 'Wasserstände: PEGELONLINE, Wasserstraßen- und Schifffahrtsverwaltung des Bundes (WSV), Datenlizenz Deutschland – Zero – Version 2.0 (www.govdata.de/dl-de/zero-2-0); ungeprüfte Rohdaten, Darstellung und Berechnungen Radif Partners',
  footerBrowser: 'Die Werte lädt Ihr Browser direkt bei PEGELONLINE · was Sie eingeben, bleibt in Ihrem Browser · kein Konto',
  footerDisclaimer: 'Unabhängige Seite von Radif Partners, kein Angebot der WSV, der Hochwasserzentralen der Länder oder einer anderen Behörde. Keine Hochwasserwarnung, keine Vorhersage: Die Seite ersetzt keine amtliche Warnung, bei Hochwasser gelten allein die Warnungen der zuständigen Stellen.',
  footerPopular: 'Meistgesucht',
  notFound: 'Unter dieser Adresse gibt es keine Seite. Die Startseite zeigt die Pegelstände an Rhein, Elbe, Donau, Main, Mosel und Weser.',
  readMore: 'Weiterlesen',
};
const en: typeof de = {
  updatedOn: 'Updated on', editorialPolicy: 'Editorial policy', contactLabel: 'Contact', reviewedBy: 'Prepared by',
  skipToContent: 'Skip to content', mainNav: 'Main navigation', breadcrumbLabel: 'Breadcrumb', breadcrumbHome: 'Home', menuOpen: 'Open menu',
  faqTitle: 'Common questions', relatedCalculators: 'More gauges and tools', sourcesTitle: 'Official sources for this page', writtenBy: 'Prepared by',
  asOf: 'As of', lastUpdated: 'texts and reference values checked on',
  footerValidated: 'Water levels: PEGELONLINE, Federal Waterways and Shipping Administration (WSV), Data licence Germany – Zero – version 2.0 (www.govdata.de/dl-de/zero-2-0); unchecked raw data, presentation and calculations by Radif Partners',
  footerBrowser: 'Your browser loads the values straight from PEGELONLINE · what you type stays in your browser · no account',
  footerDisclaimer: 'Independent site by Radif Partners, not a service of the WSV, the German state flood centres or any other authority. No flood warning and no forecast: the site does not replace official warnings, and in a flood only the warnings of the competent authorities count.',
  footerPopular: 'Most searched',
  notFound: 'Nothing lives at this address. The home page shows the water levels on the Rhine, Elbe, Danube, Main, Moselle and Weser.',
  readMore: 'Read more',
};
const ALL = { de, en };
export function t(lang: Locale) { return ALL[lang] ?? de; }
