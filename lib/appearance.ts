export type Appearance = 'system' | 'light' | 'dark';
export type ColorSchemeName = 'light' | 'dark';

export function resolveScheme(
  appearance: Appearance,
  systemScheme: ColorSchemeName | null | undefined,
): ColorSchemeName {
  if (appearance === 'light' || appearance === 'dark') return appearance;
  return systemScheme === 'dark' ? 'dark' : 'light';
}

export function isAppearance(value: unknown): value is Appearance {
  return value === 'system' || value === 'light' || value === 'dark';
}
