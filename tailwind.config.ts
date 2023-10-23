import type { Config } from 'tailwindcss';

export default {
  prefix: 'tw-',
  content: ['./index.html', '!./src/**/*.test.*', './src/**/*.tsx'],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
