import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * The production domain has not been supplied.
 * Set SITE_URL (for example SITE_URL=https://example.com) before a public build to
 * enable canonical URLs, Open Graph URLs and the generated sitemap. When it is
 * unset, those URL-dependent tags are omitted rather than invented.
 */
const rawSite = process.env.SITE_URL?.trim();
let site;
if (rawSite) {
  try {
    site = new URL(rawSite).origin;
  } catch {
    throw new Error(`SITE_URL is not a valid absolute URL: ${rawSite}`);
  }
}

export default defineConfig({
  output: 'static',
  site,
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  integrations: site ? [sitemap()] : [],
  devToolbar: { enabled: false },
});
