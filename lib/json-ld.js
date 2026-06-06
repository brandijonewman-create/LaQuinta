// Centralized JSON-LD schema generators.
// All schemas use the public site URL as @id so they cross-link consistently.

import { site, owner, market, communities, architects, MARKET_DISCLAIMER } from '@/lib/site-config';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${site.url}#organization`,
    name: site.name,
    url: site.url,
    logo: `${site.url}/icon.png`,
    founder: { '@type': 'Person', name: owner.name },
    description: site.description,
    areaServed: {
      '@type': 'City',
      name: 'La Quinta',
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: market.county,
      },
    },
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}#website`,
    name: site.name,
    url: site.url,
    publisher: { '@id': `${site.url}#organization` },
    inLanguage: 'en-US',
  };
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url ? `${site.url}${item.url}` : undefined,
    })),
  };
}

export function placeSchema(community) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: community.name,
    address: {
      '@type': 'PostalAddress',
      addressLocality: community.city,
      addressRegion: 'CA',
      addressCountry: 'US',
      postalCode: '92253',
    },
    containedInPlace: {
      '@type': 'City',
      name: 'La Quinta',
    },
    description: community.tagline,
    url: `${site.url}/communities/${community.slug}`,
  };
}

export function personSchema(person) {
  if (!person) return null;
  const pageSlug = person.page || person.slug;
  const samePagePeople = []; // computed below by caller if needed
  const url = `${site.url}/collaborators/${pageSlug}#${person.anchor || person.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': url,
    name: person.name,
    jobTitle: person.jobTitle,
    description: person.bio,
    image: person.headshot,
    url: person.url || url,
    affiliation: person.affiliation
      ? { '@type': 'Organization', name: person.affiliation }
      : undefined,
    mainEntityOfPage: {
      '@type': 'ProfilePage',
      '@id': url,
    },
  };
}

export function articleSchema(post, pathPrefix = 'blog', author = null) {
  const fm = post.frontmatter;
  // If a Person collaborator authored this post, attribute as Person and link
  // their canonical profile URL via @id so Google can tie content to author
  // identity (E-E-A-T). Otherwise default to the site's owner & creator.
  const articleAuthor = author
    ? {
        '@type': 'Person',
        '@id': `${site.url}/collaborators/${author.page || author.slug}#${author.anchor || author.slug}`,
        name: author.name,
        jobTitle: author.jobTitle,
        affiliation: author.affiliation
          ? { '@type': 'Organization', name: author.affiliation }
          : undefined,
        image: author.headshot,
        url: `${site.url}/collaborators/${author.page || author.slug}`,
      }
    : { '@type': 'Person', name: owner.name };

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: fm.title,
    description: fm.excerpt,
    image: fm.cover ? [fm.cover] : [],
    datePublished: fm.date,
    dateModified: fm.date,
    author: articleAuthor,
    publisher: {
      '@type': 'Organization',
      name: site.name,
      logo: { '@type': 'ImageObject', url: `${site.url}/icon.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${site.url}/${pathPrefix}/${post.slug}` },
  };
}

export function faqSchema(faqs) {
  if (!Array.isArray(faqs) || faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

// Helper: emit a JSON-LD <script> tag
export function JsonLd({ data }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
