import './globals.css';
import { Playfair_Display, Inter } from 'next/font/google';
import { Providers } from './providers';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import GAScripts from '@/components/analytics/ga-scripts';
import AdSenseLoader from '@/components/analytics/adsense-loader';
import { site, owner } from '@/lib/site-config';
import { ADSENSE_PUB_ID } from '@/lib/analytics';
import { organizationSchema, websiteSchema, JsonLd } from '@/lib/json-ld';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
});

const otherMeta = ADSENSE_PUB_ID
  ? { 'google-adsense-account': ADSENSE_PUB_ID }
  : undefined;

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: owner.name }],
  creator: owner.name,
  publisher: site.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.url,
    siteName: site.name,
    title: site.name,
    description: site.description,
  },
  // Hard rule: suppress Next's auto-emitted twitter:* tags.
  twitter: null,
  robots: { index: true, follow: true },
  alternates: { canonical: site.url },
  other: otherMeta,
};

export const viewport = {
  themeColor: '#FAF6EE',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <AdSenseLoader />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <Providers>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </Providers>
        <GAScripts />
      </body>
    </html>
  );
}
