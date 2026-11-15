/** Les îles React relisent le magasin live partagé (src/lib/live.ts) : une seule valeur par station sur la page.
 *  Hydratation (RECETTE §17.5) : le premier rendu reste celui du build ; le magasin n'est lu qu'après le montage. */
import { useEffect, useState, useSyncExternalStore } from 'react';
import { getLive, liveVersion, subscribe, type Rec } from './live';
export const useLiveVersion = () => useSyncExternalStore(subscribe, liveVersion, () => 0);
/** Lecteur du magasin : undefined avant le montage. */
export function useLiveReader(): (u: string) => Rec | undefined {
  useLiveVersion();
  const [monte, setMonte] = useState(false);
  useEffect(() => setMonte(true), []);
  return (u) => (monte ? getLive(u) : undefined);
}
