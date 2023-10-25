import en from '../i18n/en.json';
import es from '../i18n/es.json';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface TranslateSlice {
  language: (typeof Langs)[number];
  setLang: (newLang: (typeof Langs)[number]) => void;
  getLang: () => (typeof Langs)[number];
  getSection: (section: string, lang: (typeof Langs)[number]) => Record<string, string>;
  en: Record<string, any>;
  es: Record<string, any>;
}

const Langs = ['en', 'es'] as const;
const language: (typeof Langs)[number] =
  window.navigator.language.substring(0, 2) === 'es' ? 'es' : 'en';

export const useTranslate = create<TranslateSlice>()(
  immer((set, get) => ({
    language,
    setLang: (newLang) =>
      set((state) => {
        state.language = newLang;
      }),
    getLang: () => get().language,
    en,
    es,
    getSection: (section, lang) => {
      const langObj = get()[lang];

      if (langObj[section]) return langObj[section];
      return {};
    },
  })),
);
