/** Chiffres de la momentaufnahme pour les textes (accueil, guides) : jamais tapés à la main. */
import { allCompact, compactOf, RAW_STATIONS, type RiverId } from '../lib/pegel';
import { anteil, lage } from '../lib/engine/pegel';
const ALL = allCompact();
const withA = ALL.map((s) => ({ s, a: anteil(s.v, s) })).filter((x) => x.a !== null) as Array<{ s: (typeof ALL)[number]; a: number }>;
export const STATS = {
  total: ALL.length,
  mitKenn: withA.length,
  hoechster: [...withA].sort((a, b) => b.a - a.a)[0],
  tiefster: [...withA].sort((a, b) => a.a - b.a)[0],
  unterMNW: ALL.filter((s) => ['unterMNW', 'unterNNW'].includes(lage(s.v, s))).length,
  ueberMHW: ALL.filter((s) => ['ueberMHW', 'ueberM1', 'ueberM2', 'ueberHHW'].includes(lage(s.v, s))).length,
  ueberM1: ALL.filter((s) => s.m1 !== undefined && s.v > s.m1).length,
  mitMarken: ALL.filter((s) => s.m1 !== undefined).length,
  mitGlw: ALL.filter((s) => s.glw !== undefined).length,
  amtlichLow: ALL.filter((s) => s.s === 'low').length,
  amtlichHigh: ALL.filter((s) => s.s === 'high').length,
};
export const perRiver = (r: RiverId) => {
  const L = compactOf(r);
  return { n: L.length, unterMNW: L.filter((s) => ['unterMNW', 'unterNNW'].includes(lage(s.v, s))).length, ueberMHW: L.filter((s) => ['ueberMHW', 'ueberM1', 'ueberM2', 'ueberHHW'].includes(lage(s.v, s))).length, ohneKenn: L.filter((s) => s.mw === undefined).length,
    first: L[0], last: L[L.length - 1] };
};
export const N_RAW = RAW_STATIONS.length;
