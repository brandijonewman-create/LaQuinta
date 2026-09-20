import { site } from '@/lib/site-config';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/downloads/la-quinta-market-report-'],
        // Only the lead-gated community-guide PDFs are blocked; quarterly
        // market-report PDFs are allowed so Google can index them.
        disallow: ['/downloads/community-guide-', '/api/'],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
