import { ne, type LocaleStrings } from './ne';
import { en } from './en';
import type { Language } from '../core/types';

export const locales: Record<Language, LocaleStrings> = {
  ne,
  en,
};

export function getLocaleString(lang: Language, key: keyof LocaleStrings): string {
  const currentLocale = locales[lang] || locales.ne;
  return currentLocale[key] || locales.ne[key] || '';
}

export type { LocaleStrings };
