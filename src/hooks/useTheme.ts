import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'tw-dark' : 'tw-light';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useTheme = create<Record<string, any>>()(
  immer((set, get) => ({
    theme,
    changeTheme: (): void =>
      set((state) => {
        if (get().theme === 'tw-light') {
          state.theme = 'tw-dark';
        } else {
          state.theme = 'tw-light';
        }
      }),
    getTheme: (): string => get().theme,
  })),
);
