import type { ColorSchemeName } from '@/lib/appearance';

export const palette: Record<
  ColorSchemeName,
  {
    background: string;
    surface: string;
    surfaceMuted: string;
    text: string;
    muted: string;
    line: string;
    accent: string;
    onAccent: string;
    accentSoft: string;
    sage: string;
    check: string;
    onCheck: string;
    gold: string;
    tabBar: string;
  }
> = {
  light: {
    background: '#F3EBDD',
    surface: '#FFF9F1',
    surfaceMuted: '#E9DFD0',
    text: '#2C241C',
    muted: '#5E5348',
    line: '#E3D4C2',
    accent: '#8C3A22',
    onAccent: '#FFF8F2',
    accentSoft: '#F6DDD2',
    sage: '#1E5A3C',
    check: '#1E5A3C',
    onCheck: '#F4FBF6',
    gold: '#7A4E10',
    tabBar: '#FFF9F1',
  },
  dark: {
    background: '#14110E',
    surface: '#241C17',
    surfaceMuted: '#2E261F',
    text: '#F6EFE4',
    muted: '#CDBFAE',
    line: '#3C322A',
    accent: '#F0A07A',
    onAccent: '#2A160F',
    accentSoft: '#3A271F',
    sage: '#A9D3B6',
    check: '#A9D3B6',
    onCheck: '#14241A',
    gold: '#E7C48A',
    tabBar: '#1C1713',
  },
};

export type Palette = (typeof palette)['light'];

export const familyTints: Record<
  ColorSchemeName,
  Record<'accent' | 'sage' | 'gold', { background: string; text: string }>
> = {
  light: {
    accent: { background: '#F6DDD2', text: '#8C3A22' },
    sage: { background: '#D7E7DC', text: '#1E5A3C' },
    gold: { background: '#F3E3C4', text: '#7A4E10' },
  },
  dark: {
    accent: { background: '#3C261E', text: '#F0A07A' },
    sage: { background: '#1C3326', text: '#A9D3B6' },
    gold: { background: '#3A2E1A', text: '#E7C48A' },
  },
};

export type FamilyTint = keyof (typeof familyTints)['light'];
