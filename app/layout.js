import './globals.css';
import Script from 'next/script';
import { headers } from 'next/headers';
import { SITE } from '@/lib/data';
import { localBusinessSchema } from '@/lib/seo';
import GARouteTracker from '@/components/ga-route-tracker';

// Safety net against the Next.js SSG s-maxage=31536000 issue: every page in this
// app gets a max 24-hour cache life so future content/data changes never get
// stuck on Cloudflare edges for more than a day. Pages that want to revalidate
// sooner can override this with their own `revalidate` export.
export const revalidate = 86400;

// Detect production hostname so the preview/staging environments never get
// indexed by search engines. The canonical SITE.url is already locked to the
// production domain, but this is defense-in-depth.
// NOTE: Both the new (scottsdalegolflifestyle.com) and the legacy
// (golfhomesofscottsdale.com) domains are listed so the site continues to be
// indexable during the DNS / domain migration window. Once the legacy domain
// is fully redirected to the new one, the two `golfhomesofscottsdale.com`
// entries below can be removed.
const PRODUCTION_HOSTS = new Set([
  'scottsdalegolflifestyle.com',
  'www.scottsdalegolflifestyle.com',
  'golfhomesofscottsdale.com',
  'www.golfhomesofscottsdale.com'
]);

function isProductionHost() {
  try {
    const h = headers();
    const host = (h.get('x-forwarded-host') || h.get('host') || '').split(':')[0].toLowerCase();
    if (!host) return true; // SSG fallback \u2014 default to prod (canonical lives here)
    return PRODUCTION_HOSTS.has(host);
  } catch {
    return true;
  }
}

export function generateMetadata() {
  const prod = isProductionHost();
  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: 'Scottsdale Golf Lifestyle | Luxury Golf Real Estate',
      // No brand-suffix template: page titles already include positioning,
      // and the 25-char "| Scottsdale Golf Lifestyle" suffix was pushing every
      // title past Google's ~60-char SERP truncation cutoff. Pages that want
      // the brand in the title now include it themselves.
      template: '%s'
    },
    description: 'The definitive guide to luxury golf real estate in Scottsdale, Arizona. Explore homes for sale in Grayhawk, DC Ranch, Troon North and Scottsdale\u2019s premier golf communities.',
    openGraph: {
      type: 'website',
      siteName: SITE.name,
      title: 'Scottsdale Golf Lifestyle | Luxury Golf Real Estate',
      description: 'Homes for sale in Scottsdale\u2019s premier golf communities: Grayhawk, DC Ranch, Troon North & more.'
      // og:url intentionally omitted; each page sets its own canonical via
      // `alternates.canonical` and per-page openGraph.url where needed.
      // og:image intentionally omitted; Next.js automatically uses the
      // dynamic /app/opengraph-image.js as the site-wide fallback.
    },
    // Twitter cards are stripped from HTML responses by /middleware.js
    // (Next.js 14's Metadata API auto-derives twitter:* tags from openGraph
    // and provides no clean Metadata-API-level escape hatch \u2014 setting
    // twitter: null is clobbered by postProcessMetadata. The middleware is
    // the canonical workaround for the strict no-social-media policy.)
    robots: prod
      ? { index: true,  follow: true  }
      : { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } }
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%23BA9273'/%3E%3Ctext x='50' y='66' text-anchor='middle' font-size='56' font-family='serif' font-weight='bold' fill='%23062840'%3ES%3C/text%3E%3C/svg%3E" />
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${SITE.ga4}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          // send_page_view: false — the initial page_view (and every subsequent
          // SPA route change) is fired by <GARouteTracker /> instead, otherwise
          // Next.js App Router client-side navigations would not be reported
          // and GA4 would undercount real traffic by 40–70%.
          gtag('config', '${SITE.ga4}', { send_page_view: false });`}
        </Script>
        {/* SPA route-change page_view tracker (must mount after gtag init) */}
        <GARouteTracker />
      </body>
    </html>
  );
}
