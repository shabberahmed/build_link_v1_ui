import { ApplicationRef, Injectable, inject, signal } from '@angular/core';
import { EN_DICT } from './dictionaries/en';
import { HI_DICT } from './dictionaries/hi';
import { TE_DICT } from './dictionaries/te';
import {
  AppLocale,
  flattenDict,
  interpolate,
  isAppLocale,
  LOCALE_STORAGE_KEY,
  skillSlug
} from './i18n.types';

const TABLES: Record<AppLocale, Record<string, string>> = {
  en: flattenDict(EN_DICT as unknown as Record<string, unknown>),
  hi: flattenDict(HI_DICT as unknown as Record<string, unknown>),
  te: flattenDict(TE_DICT as unknown as Record<string, unknown>)
};

const BCP47: Record<AppLocale, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  te: 'te-IN'
};

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly appRef = inject(ApplicationRef);
  private readonly _locale = signal<AppLocale>(this.readStored());
  readonly locale = this._locale.asReadonly();

  constructor() {
    this.applyDocumentLang(this._locale());
  }

  setLocale(locale: AppLocale): void {
    this._locale.set(locale);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      /* ignore quota / private mode */
    }
    this.applyDocumentLang(locale);
    queueMicrotask(() => this.appRef.tick());
  }

  t(key: string, params?: Record<string, string | number>): string {
    this._locale();
    const table = TABLES[this._locale()];
    const en = TABLES.en;
    const raw = table[key] ?? en[key] ?? key;
    return interpolate(raw, params);
  }

  label(kind: string, value: string | undefined | null): string {
    if (!value) return '';
    if (value === 'ALL') return this.t('common.all');
    return this.t(`enum.${kind}.${value}`);
  }

  skill(name: string): string {
    const key = `enum.skill.${skillSlug(name)}`;
    const translated = this.t(key);
    return translated === key ? name : translated;
  }

  spec(name: string): string {
    const key = `enum.spec.${skillSlug(name)}`;
    const translated = this.t(key);
    return translated === key ? name : translated;
  }

  entity(kind: string, id: string, field: string, fallback?: string): string {
    const key = `mock.${kind}.${id}.${field}`;
    const translated = this.t(key);
    if (translated !== key) return translated;
    return fallback ?? '';
  }

  dateLocale(): string {
    return BCP47[this._locale()];
  }

  private readStored(): AppLocale {
    try {
      const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
      if (isAppLocale(stored)) return stored;
    } catch {
      /* ignore */
    }
    return 'en';
  }

  private applyDocumentLang(locale: AppLocale): void {
    document.documentElement.lang = locale === 'en' ? 'en' : locale;
    const titles: Record<AppLocale, string> = {
      en: 'BuildLink — Site office',
      hi: 'BuildLink — साइट कार्यालय',
      te: 'BuildLink — సైట్ కార్యాలయం'
    };
    document.title = titles[locale];
  }
}
