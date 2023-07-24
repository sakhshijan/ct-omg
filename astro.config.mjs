import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import relativeLinks from "astro-relative-links";

// https://astro.build/config
export default defineConfig({
  output: 'static',
  vite: {
    build: {
      cssCodeSplit: false
      // rollupOptions: {
      //     output: {
      //         entryFileNames: 'scripts/[name].js',
      //         chunkFileNames: 'chunks/[name].js',
      //         assetFileNames: 'assets/[name][extname]'
      //     }
      // }
    }
  },

  integrations: [tailwind(), relativeLinks()]
});