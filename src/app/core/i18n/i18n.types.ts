export type AppLocale = 'en' | 'hi' | 'te';

export const APP_LOCALES: readonly AppLocale[] = ['en', 'hi', 'te'];

export const LOCALE_STORAGE_KEY = 'buildlink.locale';

export function isAppLocale(value: string | null): value is AppLocale {
  return value === 'en' || value === 'hi' || value === 'te';
}

export function flattenDict(obj: Record<string, unknown>, prefix = ''): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      Object.assign(out, flattenDict(v as Record<string, unknown>, key));
    } else if (typeof v === 'string') {
      out[key] = v;
    }
  }
  return out;
}

export function interpolate(template: string, params?: Record<string, string | number>): string {
  if (!params) return template;
  return template.replace(/\{\{(\w+)\}\}/g, (_, name: string) => {
    const value = params[name];
    return value === undefined || value === null ? '' : String(value);
  });
}

export function skillSlug(skill: string): string {
  return skill
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_|_$/g, '')
    .toLowerCase();
}
