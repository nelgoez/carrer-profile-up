'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import en from '../messages/en.json';
import es from '../messages/es.json';

type Messages = typeof en;
type Locale = 'en' | 'es';

const messagesMap: Record<Locale, Messages> = { en, es };

interface LocaleContextValue {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (path: string) => string
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function resolve(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    }
    else { return path; }
  }
  return typeof current === 'string' ? current : path;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    const stored = localStorage.getItem('locale');
    if (stored === 'en' || stored === 'es') { setLocale(stored); }
  }, []);

  useEffect(() => {
    localStorage.setItem('locale', locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const t = (path: string) => resolve(messagesMap[locale] as unknown as Record<string, unknown>, path);

  return <LocaleContext.Provider value={{ locale, setLocale, t }}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) { throw new Error('useLocale must be used within LocaleProvider'); }
  return ctx;
}
