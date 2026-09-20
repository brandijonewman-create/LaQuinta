const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com', pathname: '/**' },
    ],
  },
  experimental: {
    // Remove if not using Server Components
    serverComponentsExternalPackages: ['mongodb'],
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
  // Force www → apex on the production domain. Cloudflare fronts this site,
  // so the redirect is also enforceable at the edge; this fallback ensures
  // Next.js origins never serve a 200 on the www host. Cache should be
  // purged at Cloudflare after deploy so the previously-cached 200s on
  // https://www.laquintagolflifestyle.com/* are evicted.
  async redirects() {
    // Communities that were previously indexed by Google but are not part
    // of our current 7-community roster. 301 to the /communities index so
    // organic traffic lands somewhere useful instead of a 404. Keep this
    // list in sync with the "Other La Quinta communities" note on
    // /communities.
    const retiredCommunitySlugs = [
      'rancho-la-quinta-country-club',
      'mountain-view-country-club',
      'coral-mountain-club',
      'the-citrus-club',
      'la-quinta-resort-club',
      'duna-la-quinta',
      'trilogy-at-la-quinta',
    ];

    const retiredCommunityRedirects = retiredCommunitySlugs.map((slug) => ({
      source: `/communities/${slug}`,
      destination: '/communities',
      statusCode: 301,
    }));

    return [
      {
        source: '/:path*',
        has: [
          { type: 'host', value: 'www.laquintagolflifestyle.com' },
        ],
        destination: 'https://laquintagolflifestyle.com/:path*',
        statusCode: 301,
      },
      ...retiredCommunityRedirects,
    ];
  },
};

module.exports = nextConfig;
