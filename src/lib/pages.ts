/** Registre : chaque fichier de src/content/{stationen,fluesse,guides} est chargé ici ; il fixe aussi les chemins. */
import type { PageDef, PageInput } from './page-types';
import { FEATURED, RIVERS } from './pegel';

const base = (file: string) => file.split('/').pop()!.replace(/\.ts$/, '');
const g = import.meta.glob<{ default: PageInput }>(['../content/stationen/*.ts', '../content/fluesse/*.ts', '../content/guides/*.ts'], { eager: true });
const ORDER = { river: 0, station: 1, guide: 2 } as const;
export const PAGES: PageDef[] = Object.entries(g).map(([f, m]) => {
  const p = m.default;
  if (p.id !== base(f)) throw new Error(`${f}: id "${p.id}" differs from the file name`);
  let path: { de: string; en: string };
  if (p.kind === 'station') {
    const s = FEATURED.find((x) => x.id === p.ref)!; const r = RIVERS.find((x) => x.id === s.river)!;
    path = { de: `${r.slug.de}/${s.slug.de}`, en: `${r.slug.en}/${s.slug.en}` };
  } else if (p.kind === 'river') {
    const r = RIVERS.find((x) => x.id === p.ref)!;
    path = { de: r.slug.de, en: r.slug.en };
  } else path = { de: p.de.slug, en: p.en.slug };
  return { ...p, path };
}).sort((a, b) => ORDER[a.kind] - ORDER[b.kind] || a.order - b.order || a.id.localeCompare(b.id));
export const pageById = (id: string) => PAGES.find((p) => p.id === id);
