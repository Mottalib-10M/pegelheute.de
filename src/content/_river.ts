/** Tableaux partagés des pages de fleuve : tout vient de la momentaufnahme. */
import type { Helpers } from '../lib/page-types';
import { compactOf, type RiverId } from '../lib/pegel';
import { LAGE_TEXT, lage } from '../lib/engine/pegel';

/** Pegel mit Mittelwasser : Wert, MW, Einordnung. */
export function lageTable(h: Helpers, r: RiverId, filter: (n: string) => boolean = () => true) {
  const L = compactOf(r).filter((s) => s.mw !== undefined && filter(s.n));
  return h.table(
    [h.t('Pegel', 'Gauge'), 'km', h.t('Mittelwasser', 'Mean water'), h.t('Momentaufnahme', 'Snapshot'), h.t('Einordnung', 'Rating')],
    L.map((s) => [s.n, h.n(s.km!, 1), h.cm(s.mw!), h.cm(s.v), LAGE_TEXT[lage(s.v, s)][h.lang]]),
    h.t(`Pegel mit amtlichem Mittelwasser, Momentaufnahme ${h.snap}.`, `Gauges with an official mean water, snapshot of ${h.snap}.`),
  );
}
/** Pegel mit Höchststand : HHW et date. */
export function rekordTable(h: Helpers, r: RiverId, max = 12) {
  const L = compactOf(r).filter((s) => s.hhw !== undefined).sort((a, b) => b.hhw! - a.hhw!).slice(0, max);
  return L;
}
export const ofRiver = compactOf;
