import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const Themes = ['tw-dark', 'tw-light'] as const;

interface ThemeSlice {
  theme: (typeof Themes)[number];
  changeTheme: () => void;
  getTheme: () => (typeof Themes)[number];
}

const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? Themes[0] : Themes[1];

export const useTheme = create<ThemeSlice>()(
  immer((set, get) => ({
    theme,
    changeTheme: () =>
      set((state) => {
        if (get().theme === Themes[1]) {
          state.theme = Themes[0];
        } else {
          state.theme = Themes[1];
        }
      }),
    getTheme: () => get().theme,
  })),
);
