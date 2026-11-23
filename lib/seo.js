import { SITE } from './data';

/**
 * Build a canonical-aware metadata object for a page.
 * Ensures both <link rel="canonical"> and <meta property="og:url"> resolve to
 * the production domain (scottsdalegolflifestyle.com) regardless of which
 * environment is rendering the page.
 *
 * @param {string} path  Page path starting with "/" (e.g. "/communities/grayhawk")
 * @param {object} meta  { title, description, ogTitle?, ogDescription?, ogType? }
 */
export function pageMeta(path, meta = {}) {
  const url = `${SITE.url}${path}`;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: url },
    openGraph: {
      type: meta.ogType || 'website',
      url,
      title: meta.ogTitle || meta.title,
      description: meta.ogDescription || meta.description
    }
  };
}


export function localBusinessSchema() {
  // Organization graph for the site. Declares the publisher (7671 Enterprises LLC)
  // as the legal owner/operator, and Scottsdale Golf Lifestyle as the brand it
  // publishes. Search engines use this to attribute content to the correct
  // legal entity (improves E-E-A-T and entity recognition).
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE.url}/#publisher`,
        name: '7671 Enterprises, LLC DBA Golf Lifestyle Network',
        legalName: '7671 Enterprises, LLC DBA Golf Lifestyle Network',
        url: SITE.url,
        brand: { '@id': `${SITE.url}/#organization` }
      },
      {
        '@type': 'Organization',
        '@id': `${SITE.url}/#organization`,
        name: SITE.name,
        alternateName: 'Scottsdale Golf Lifestyle',
        url: SITE.url,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE.url}/opengraph-image`,
          width: 1200,
          height: 630
        },
        parentOrganization: { '@id': `${SITE.url}/#publisher` },
        areaServed: [
          { '@type': 'City', name: 'Scottsdale' },
          { '@type': 'AdministrativeArea', name: 'Maricopa County, Arizona' }
        ]
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        publisher: { '@id': `${SITE.url}/#publisher` },
        inLanguage: 'en-US'
      }
    ]
  };
}

export function realEstateListingSchema(listing) {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: `${listing.address}, Scottsdale AZ`,
    url: `${SITE.url}/homes-for-sale/${listing.price < 1000000 ? 'under-1m' : '1m-to-3m'}/#${listing.id}`,
    datePosted: '2026-04-01',
    image: listing.image,
    description: listing.description,
    offers: {
      '@type': 'Offer',
      price: listing.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: listing.address,
      addressLocality: 'Scottsdale',
      addressRegion: 'AZ',
      postalCode: '85255',
      addressCountry: 'US'
    },
    numberOfRooms: listing.beds,
    numberOfBathroomsTotal: listing.baths,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: listing.sqft,
      unitCode: 'FTK'
    },
    yearBuilt: listing.yearBuilt
  };
}

export function placeSchema(community) {
  // Schema.org Place with GeoShape polygon — gives Google a precise
  // geographic footprint for this named neighborhood / community.
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    '@id': `${SITE.url}/communities/${community.slug}#place`,
    name: community.name,
    description: community.tagline || community.description,
    url: `${SITE.url}/communities/${community.slug}`,
    image: community.image && community.image.startsWith('/') ? `${SITE.url}${community.image}` : community.image,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Scottsdale',
      addressRegion: 'AZ',
      addressCountry: 'US'
    },
    containedInPlace: {
      '@type': 'City',
      name: 'Scottsdale',
      address: { '@type': 'PostalAddress', addressLocality: 'Scottsdale', addressRegion: 'AZ', addressCountry: 'US' }
    }
  };
  if (community.lat && community.lng) {
    data.geo = community.polygonString
      ? {
          '@type': 'GeoShape',
          polygon: community.polygonString,
          // Also provide a centroid hint for crawlers that only read GeoCoordinates
          box: undefined
        }
      : { '@type': 'GeoCoordinates', latitude: community.lat, longitude: community.lng };
  }
  return data;
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.path}`
    }))
  };
}

export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
