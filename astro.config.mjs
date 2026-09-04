import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import tailwindcss from '@tailwindcss/vite';
const projectId = process.env.PUBLIC_SANITY_PROJECT_ID || 'placeholder';
const dataset = process.env.PUBLIC_SANITY_DATASET || 'production';
export default defineConfig({
  site:
    process.env.SITE_URL || 'https://agencia-yoop.mmpguty-5.chatgpt.site',
  output: 'static',
  integrations: [
    sanity({
      projectId,
      dataset,
      apiVersion: '2026-09-03',
      useCdn: true,
      studioBasePath: '/admin',
      studioRouterHistory: 'hash',
    }),
    react(),
  ],
  vite: { plugins: [tailwindcss()] },
});
