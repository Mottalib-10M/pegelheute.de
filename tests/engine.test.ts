/** Moteur pegel : cas vérifiés à la main sur les kennwerte publiés par PEGELONLINE et la RheinSchPV § 10.01. */
import { describe, expect, it } from 'vitest';
import { abstand, anteil, delta24, fahrrinne, lage, schifffahrt, spiegel, stundenBis, tendenz } from '../src/lib/engine/pegel';
import { allCompact, compactOf, FEATURED, raw } from '../src/lib/pegel';

// Köln : M_I 620, M_II 830 (RheinSchPV § 10.01, Mondorf–Dormagen)
const KOELN = { mw: 310, mnw: 136, mhw: 690, hhw: 1069, nnw: 69, m1: 620, m2: 830, glw: 139, tu: 250 };

describe('lage', () => {
  it('classe du plus grave au plus courant', () => {
    expect(lage(1100, KOELN)).toBe('ueberHHW');
    expect(lage(830, KOELN)).toBe('ueberM2');
    expect(lage(700, KOELN)).toBe('ueberM1');
    expect(lage(60, KOELN)).toBe('unterNNW');
    expect(lage(100, KOELN)).toBe('unterMNW');
    expect(lage(320, KOELN)).toBe('ueberMW');
    expect(lage(200, KOELN)).toBe('unterMW');
    expect(lage(200, {})).toBe('unbekannt');
  });
  it('marque I : « nach Überschreiten », pas à égalité', () => {
    expect(lage(620, KOELN)).not.toBe('ueberM1');
    expect(schifffahrt(620, KOELN)).toBe('frei');
    expect(schifffahrt(621, KOELN)).toBe('eingeschraenkt');
  });
  it('marque II : « erreicht oder überschreitet »', () => {
    expect(schifffahrt(830, KOELN)).toBe('gesperrt');
    expect(schifffahrt(500, { mw: 1 })).toBe('ohneMarken');
  });
});

describe('calculs', () => {
  it('tendance sur 24 h avec seuil de 3 cm', () => {
    expect(delta24(250, 230)).toBe(20);
    expect(delta24(250, null)).toBeNull();
    expect(tendenz(20)).toBe('steigt');
    expect(tendenz(-5)).toBe('faellt');
    expect(tendenz(2)).toBe('gleich');
    expect(tendenz(null)).toBe('unbekannt');
  });
  it('prolongement linéaire jusqu’au seuil', () => {
    expect(stundenBis(450, 620, 60)).toBeCloseTo(68, 5);
    expect(stundenBis(450, 620, -10)).toBeNull();
    expect(stundenBis(450, 620, 0)).toBeNull();
  });
  it('chenal, plan d’eau, distances, part', () => {
    expect(fahrrinne(78, 78, 190)).toBe(190); // Kaub au GlW : la profondeur de consigne
    expect(fahrrinne(58, 78, 190)).toBe(170);
    expect(spiegel(34.97, 245)).toBe(37.42);
    expect(abstand(500, 620)).toBe(120);
    expect(abstand(500, undefined)).toBeNull();
    expect(anteil(136, KOELN)).toBe(0);
    expect(anteil(690, KOELN)).toBe(1);
    expect(anteil(300, { mnw: 400, mhw: 400 })).toBeNull();
  });
});

describe('données PEGELONLINE', () => {
  it('les douze stations à page existent avec un relevé', () => {
    for (const f of FEATURED) {
      const s = raw(f.api);
      expect(s, f.api).toBeTruthy();
      expect(typeof s.cur.v).toBe('number');
    }
  });
  it('les seize Richtpegel du Rhin portent les marques de la RheinSchPV', () => {
    const m = compactOf('rhein').filter((s) => s.m1 !== undefined && s.m2 !== undefined);
    expect(m.length).toBe(16);
    const k = m.find((s) => s.n === 'Kaub')!;
    expect([k.m1, k.m2]).toEqual([460, 640]);
  });
  it('Donau et Mosel dans le sens du courant', () => {
    const d = compactOf('donau');
    expect(d[0].km!).toBeGreaterThan(d[d.length - 1].km!);
    const m = compactOf('mosel');
    expect(m[0].km!).toBeGreaterThan(m[m.length - 1].km!);
  });
  it('un Oberwasser ne se classe pas', () => {
    const ow = allCompact().find((s) => /OW$/.test(s.n));
    if (ow) expect(anteil(ow.v, ow)).toBeNull();
  });
});
