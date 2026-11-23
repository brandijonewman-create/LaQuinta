const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  experimental: {
    // Remove if not using Server Components
    serverComponentsExternalPackages: ['mongodb', 'pdfkit'],
  },
  webpack(config, { dev }) {
    if (dev) {
      // Reduce CPU/memory from file watching
      config.watchOptions = {
        poll: 2000, // check every 2 seconds
        aggregateTimeout: 300, // wait before rebuilding
        ignored: ['**/node_modules'],
      };
    }
    return config;
  },
  onDemandEntries: {
    maxInactiveAge: 10000,
    pagesBufferLength: 2,
  },
  async redirects() {
    // Fix Round A item 10: permanent, path-preserving 301s from the seven
    // parked network domains to the canonical apex. These fire only when the
    // request's Host header matches a parked domain, i.e. only once the
    // domain's DNS actually points at this deployment (or its edge proxy).
    const parked = [
      'scottsdalefairwayhomes.com',
      'golfhomesscottadale.com',
      'golfhomesinscottsdale.com',
      'golfhomesofscottsdale.com',
      'scottsdalegolfhome.com',
      'scottsdalegolfhouses.com',
      'golflivingscottsdale.com'
    ];
    const rules = [];
    for (const domain of parked) {
      for (const host of [domain, `www.${domain}`]) {
        rules.push({
          source: '/:path*',
          has: [{ type: 'host', value: host }],
          destination: 'https://scottsdalegolflifestyle.com/:path*',
          permanent: true
        });
      }
    }
    // www -> apex for the canonical domain itself (defense-in-depth; the edge
    // already 308s www to apex — keep that direction).
    rules.push({
      source: '/:path*',
      has: [{ type: 'host', value: 'www.scottsdalegolflifestyle.com' }],
      destination: 'https://scottsdalegolflifestyle.com/:path*',
      permanent: true
    });
    // Site-audit 404 cleanup: these URLs were linked (in error) from older
    // builds and got crawled. 301 them to the pages that actually cover the
    // club. Only slugs WITHOUT a dedicated /golf-clubs/ page are listed here;
    // if a club deep-dive is ever published for one, remove it from this list.
    const clubToCommunity = [
      'ancala', 'dc-ranch', 'desert-mountain', 'eagle-mountain', 'estancia',
      'firerock', 'legend-trail', 'mccormick-ranch', 'mirabel',
      'pinnacle-peak-country-club', 'silverleaf', 'sun-ridge-canyon'
    ];
    for (const slug of clubToCommunity) {
      rules.push({ source: `/golf-clubs/${slug}`, destination: `/communities/${slug}`, permanent: true });
    }
    rules.push({ source: '/golf-clubs/phoenician', destination: '/communities/phoenician-residences', permanent: true });
    // Nov 18 2026: the Exclusive Realtor Partner slot is retired network-wide.
    // Realtor is one directory category like any other.
    rules.push({ source: '/collaborators/exclusive-realtor-partner', destination: '/collaborators', permanent: true });
    rules.push({ source: '/property-spotlight/sample', destination: '/partner-with-us', permanent: true });
    rules.push({ source: '/communities/phoenician', destination: '/communities/phoenician-residences', permanent: true });
    return rules;
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "ALLOWALL" },
          { key: "Content-Security-Policy", value: "frame-ancestors *;" },
          { key: "Access-Control-Allow-Origin", value: process.env.CORS_ORIGINS || "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "*" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
