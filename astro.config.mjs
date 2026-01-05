import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://www.lumoai.com.br',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
