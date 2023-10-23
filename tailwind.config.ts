import type { Config } from 'tailwindcss';

export default {
  prefix: 'tw-',
  darkMode: 'class',
  content: ['./index.html', '!./src/**/*.test.*', './src/**/*.tsx'],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
