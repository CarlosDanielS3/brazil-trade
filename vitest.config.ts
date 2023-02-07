import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    dir: './tests',
    root: './',
    alias: {
      "@": path.resolve(__dirname, "./src"),
      '@test': './tests',
      '@helper': './src/infrastructure/common/helper',
    },

  },
});
