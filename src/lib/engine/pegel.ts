/**
 * Moteur pur (aucune donnée importée) : ce que dit un wasserstand face aux Kennwerte de sa station.
 * Utilisé au build (textes, tableaux) et dans le navigateur (outils). Testé dans tests/engine.test.ts.
 */
export interface Kenn { mw?: number; mnw?: number; mhw?: number; hhw?: number; nnw?: number; hsw?: number; m1?: number; m2?: number; glw?: number; tu?: number }
/** Station compacte, telle que les outils la reçoivent. */
export interface St extends Kenn {
  u: string; n: string; w: string; km: number | null;
  /** Wert (cm) et heure ISO de la momentaufnahme du build. */
  v: number; t: string;
  /** Wert 24 h plus tôt (cm), s'il existe. */
  p: number | null;
  /** Pegelnullpunkt (m) et son unité. */
  pnp: number | null; pu: string;
  /** Classement officiel PEGELONLINE face à MNW/MHW : low, normal, high, unknown. */
  s: string;
  /** Date (AAAA-MM-JJ) du plus bas connu (NNW), si PEGELONLINE la publie. */
  nnwd?: string;
}

export type LageId = 'ueberHHW' | 'ueberM2' | 'ueberM1' | 'ueberMHW' | 'unterNNW' | 'unterMNW' | 'ueberMW' | 'unterMW' | 'unbekannt';

/** Lage d'un wert : du plus grave au plus courant. Les marques n'existent pas partout : on teste ce qui existe. */
export function lage(v: number, k: Kenn): LageId {
  if (k.hhw !== undefined && v >= k.hhw) return 'ueberHHW';
  if (k.m2 !== undefined && v >= k.m2) return 'ueberM2';
  if (k.m1 !== undefined && v > k.m1) return 'ueberM1'; // RheinSchPV § 10.01 : « nach Überschreiten » de la marque I
  if (k.mhw !== undefined && v >= k.mhw) return 'ueberMHW';
  if (k.nnw !== undefined && v <= k.nnw) return 'unterNNW';
  if (k.mnw !== undefined && v <= k.mnw) return 'unterMNW';
  if (k.mw !== undefined) return v >= k.mw ? 'ueberMW' : 'unterMW';
  return 'unbekannt';
}

export const LAGE_TEXT: Record<LageId, { de: string; en: string }> = {
  ueberHHW: { de: 'über dem höchsten bekannten Stand (HHW)', en: 'above the highest level on record (HHW)' },
  ueberM2: { de: 'über Hochwassermarke II', en: 'above flood mark II' },
  ueberM1: { de: 'über Hochwassermarke I', en: 'above flood mark I' },
  ueberMHW: { de: 'über mittlerem Hochwasser (MHW)', en: 'above mean high water (MHW)' },
  unterNNW: { de: 'auf oder unter dem niedrigsten bekannten Stand (NNW)', en: 'at or below the lowest level on record (NNW)' },
  unterMNW: { de: 'auf oder unter mittlerem Niedrigwasser (MNW)', en: 'at or below mean low water (MNW)' },
  ueberMW: { de: 'über Mittelwasser (MW)', en: 'above mean water (MW)' },
  unterMW: { de: 'unter Mittelwasser (MW)', en: 'below mean water (MW)' },
  unbekannt: { de: 'ohne amtliche Kennwerte', en: 'no official reference values' },
};

/** Écart sur 24 h, en cm (null sans valeur antérieure). */
export const delta24 = (v: number, p: number | null) => (p === null ? null : Math.round(v - p));

/** Tendance en mots : en dessous de 3 cm sur 24 h, l'écart reste dans le bruit de mesure et des vagues. */
export const SEUIL_STABLE = 3;
export function tendenz(d: number | null): 'steigt' | 'faellt' | 'gleich' | 'unbekannt' {
  if (d === null) return 'unbekannt';
  if (d >= SEUIL_STABLE) return 'steigt';
  if (d <= -SEUIL_STABLE) return 'faellt';
  return 'gleich';
}
export const TENDENZ_TEXT = {
  steigt: { de: 'steigend', en: 'rising' }, faellt: { de: 'fallend', en: 'falling' },
  gleich: { de: 'etwa gleichbleibend', en: 'roughly steady' }, unbekannt: { de: 'Tendenz unbekannt', en: 'trend unknown' },
} as const;

/**
 * Heures jusqu'à un seuil si la variation des dernières 24 h continuait à l'identique (simple prolongement linéaire,
 * pas une prévision). null si le seuil est déjà atteint, ou si l'eau ne va pas dans sa direction.
 */
export function stundenBis(v: number, schwelle: number, d24: number | null): number | null {
  if (d24 === null || d24 === 0) return null;
  const rest = schwelle - v;
  if (rest === 0) return 0;
  if (Math.sign(rest) !== Math.sign(d24)) return null;
  return (rest / d24) * 24;
}

/** Profondeur de chenal approchée (cm) : profondeur de consigne à GlW (TuGLW) + écart du pegel au GlW. */
export function fahrrinne(v: number, glw: number, tu: number) { return tu + (v - glw); }

/** Altitude du plan d'eau (m) : zéro du pegel + wert/100. Un pegel n'est pas une profondeur. */
export const spiegel = (pnp: number, v: number) => Math.round((pnp + v / 100) * 100) / 100;

/** Abstand en cm à un repère (positif = sous le repère). */
export const abstand = (v: number, ref: number | undefined) => (ref === undefined ? null : Math.round(ref - v));

/** Part du chemin entre MNW (0 %) et MHW (100 %) : sert à classer des stations qui n'ont pas la même échelle. */
export function anteil(v: number, k: Kenn): number | null {
  if (k.mnw === undefined || k.mhw === undefined || k.mhw <= k.mnw) return null;
  return (v - k.mnw) / (k.mhw - k.mnw);
}

/** Statut de navigation au regard des marques de la RheinSchPV § 10.01 (là où PEGELONLINE en publie). */
export function schifffahrt(v: number, k: Kenn): 'frei' | 'eingeschraenkt' | 'gesperrt' | 'ohneMarken' {
  if (k.m1 === undefined) return 'ohneMarken';
  if (k.m2 !== undefined && v >= k.m2) return 'gesperrt';
  if (v > k.m1) return 'eingeschraenkt';
  return 'frei';
}

/** Verdict en mots de tous les jours, sans sigle (testeurs naïfs du 2026-11-14) : la première ligne du résultat. */
export const VERDIKT: Record<LageId, { de: string; en: string }> = {
  ueberHHW: { de: 'Extremes Hochwasser: höher als je zuvor gemessen', en: 'Extreme flood: higher than ever measured' },
  ueberM2: { de: 'Hochwasser: über der zweiten Hochwassermarke, Schifffahrt verboten', en: 'Flood: above the second flood mark, shipping prohibited' },
  ueberM1: { de: 'Hochwasser: über der ersten Hochwassermarke, Schifffahrt eingeschränkt', en: 'Flood: above the first flood mark, shipping restricted' },
  ueberMHW: { de: 'Hoch: über dem typischen Jahreshochwasser', en: 'High: above the typical yearly flood' },
  ueberMW: { de: 'Normal: etwas über dem üblichen Stand, kein Hochwasser', en: 'Normal: a little above the usual level, no flood' },
  unterMW: { de: 'Eher niedrig: unter dem üblichen Stand, kein Hochwasser', en: 'Rather low: below the usual level, no flood' },
  unterMNW: { de: 'Niedrig: tiefer als im typischen Jahrestief, kein Hochwasser', en: 'Low: lower than the typical yearly low, no flood' },
  unterNNW: { de: 'Rekordtief: so niedrig wie nie zuvor gemessen oder tiefer', en: 'Record low: as low as ever measured, or lower' },
  unbekannt: { de: 'Keine Einordnung möglich: Für diesen Pegel gibt es keine amtlichen Vergleichswerte', en: 'No rating possible: this gauge has no official reference values' },
};

/** Abstand en cm au plus bas connu (NNW) quand l'eau en est à 10 cm ou moins ; null sinon. */
export const NAHE_NNW = 10;
export function naheRekordtief(v: number, k: Kenn): number | null {
  if (k.nnw === undefined) return null;
  const a = Math.round(v - k.nnw);
  return a > 0 && a <= NAHE_NNW ? a : null;
}
