// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://poemasbiblicos.github.io',

  integrations: [
    sitemap({
      entryLimit: 10000,
    })
  ],
  trailingSlash: 'always',
});