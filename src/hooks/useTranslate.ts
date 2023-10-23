import en from '../i18n/en.json';
import es from '../i18n/es.json';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const Langs = ['en', 'es'] as const;
const lang: (typeof Langs)[number] = 'en';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useTranslate = create<Record<string, any>>()(
  immer((set, get) => ({
    lang,
    setLang: (newLang: (typeof Langs)[number]): void => set((state) => (state.lang = newLang)),
    getLang: (): string => get().lang,
    en,
    es,
    getSection: (section: string): Record<string, string> => {
      const langObj = get()[lang];

      if (langObj[section]) return langObj[section];
      return {};
    },
  })),
);
