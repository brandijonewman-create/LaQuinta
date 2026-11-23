import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin } from 'lucide-react';
import PageShell from '@/components/page-shell';
import FAQ from '@/components/faq';
import ListingCard, { PartnerBadge, SampleBadge } from '@/components/directory/listing-card';
import PremierPromo from '@/components/directory/premier-promo';
import PartnerLink from '@/components/directory/partner-link';
import { SITE } from '@/lib/data';
import { pageMeta, breadcrumbSchema, JsonLd } from '@/lib/seo';
import {
  CITIES, GUIDE_BASE, resolveGuideSlug, pageTitle, categoryBySlug, cityBySlug,
  categoryHref, categoryCityHref,
} from '@/lib/directory';
import { categoryIntro, categoryFaq, AREA_TEXT } from '@/lib/directory/content';
import { getListings, getBusiness, isPaid } from '@/lib/directory/data';

// 289 category pages, 1,445 category-city pages and every business page
// render on request from one template, like the rest of the site.

export async function generateMetadata({ params }) {
  const r = resolveGuideSlug(params.slug);
  const path = `${GUIDE_BASE}/${params.slug}`;
  if (r.type === 'category' || r.type === 'category-city') {
    const title = pageTitle(r);
    const meta = pageMeta(path, { title, description: categoryIntro(r.category, r.city).slice(0, 155) });
    // Honest empty state: a category page with no listings yet stays out of search.
    const listings = await getListings({ category: r.category.slug, city: r.city?.slug });
    return listings.length ? meta : { ...meta, robots: { index: false, follow: true } };
  }
  if (r.type === 'business') {
    const b = await getBusiness(params.slug);
    if (!b) return {};
    const city = cityBySlug[b.city];
    const cat = categoryBySlug[b.categories[0]];
    return pageMeta(path, {
      title: `${b.name}: ${cat?.name || 'Local business'} in ${city?.name || 'Scottsdale'}, AZ`,
      description: b.description || `${b.name} in ${city?.name}, Arizona.`,
    });
  }
  return {};
}

const PAGE_SIZE = 48;

export default async function GuidePage({ params, searchParams }) {
  const r = resolveGuideSlug(params.slug);
  const page = Math.max(1, parseInt(searchParams?.page, 10) || 1);
  if (r.type === 'category' || r.type === 'category-city') return <CategoryPage category={r.category} city={r.city} page={page} />;
  if (r.type === 'business') {
    const b = await getBusiness(params.slug);
    if (!b) return notFound();
    return <BusinessPage b={b} />;
  }
  return notFound();
}

async function CategoryPage({ category, city, page = 1 }) {
  const all = await getListings({ category: category.slug, city: city?.slug });
  // Premier Partners sit in their own band under the hero and city picker on
  // every page; the paged grid holds everyone else.
  const premiers = all.filter((b) => b.level === 'premier');
  const rest = all.filter((b) => b.level !== 'premier');
  // Promotion box holds the Premier place while a spot is open: this city's
  // spot, or on an all-cities page, any city's spot.
  const premierSpotOpen = city ? premiers.length === 0 : new Set(premiers.map((b) => b.city)).size < CITIES.length;
  const pages = Math.max(1, Math.ceil(rest.length / PAGE_SIZE));
  if (page > pages) return notFound();
  const listings = rest.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const base = city ? categoryCityHref(category, city) : categoryHref(category);
  const title = pageTitle({ category, city });
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Guide', path: GUIDE_BASE },
    { name: category.title, path: categoryHref(category) },
    ...(city ? [{ name: city.name, path: categoryCityHref(category, city) }] : []),
  ];

  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      {all.length > 0 && (
        <JsonLd data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: title,
          numberOfItems: all.length,
          itemListElement: [
            ...premiers.map((b, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE.url}${GUIDE_BASE}/${b.slug}`, name: b.name })),
            ...listings.map((b, i) => ({ '@type': 'ListItem', position: premiers.length + (page - 1) * PAGE_SIZE + i + 1, url: `${SITE.url}${GUIDE_BASE}/${b.slug}`, name: b.name })),
          ],
        }} />
      )}

      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <Link href={city ? categoryHref(category) : GUIDE_BASE} className="inline-block text-xs uppercase tracking-[0.3em] text-amber-300 mb-4 hover:text-amber-100">
            &larr; {city ? `All ${category.title}` : 'The Guide'}
          </Link>
          <h1 className="font-serif text-4xl md:text-6xl tracking-tight leading-[1.05]">{title}</h1>
          <p className="mt-5 text-amber-100/90 text-lg max-w-3xl">{categoryIntro(category, city)}</p>
          {all.length > 0 && <p className="mt-4 text-sm text-amber-200/80">{all.length.toLocaleString()} {all.length === 1 ? 'business' : 'businesses'} listed</p>}
        </div>
      </section>

      <nav className="max-w-7xl mx-auto px-6 pt-10 flex flex-wrap gap-2" aria-label="Cities">
        {CITIES.map((c) => {
          const active = city?.slug === c.slug;
          return (
            <Link key={c.slug} href={categoryCityHref(category, c)}
              className={`px-4 py-1.5 rounded-full text-sm border ${active ? 'bg-[#062840] text-white border-[#062840]' : 'border-[#062840]/20 text-[#062840] hover:border-[#BA9273]'}`}>
              {c.name}
            </Link>
          );
        })}
      </nav>

      <section className="max-w-7xl mx-auto px-6 pt-10" aria-labelledby={premiers.length ? 'premier-heading' : undefined}>
        {premiers.length > 0 && (
          <>
            <h2 id="premier-heading" className="text-xs uppercase tracking-[0.3em] text-[#BA9273] mb-4">
              Premier {premiers.length === 1 ? 'Partner' : 'Partners'}
            </h2>
            <div className="grid gap-5">
              {premiers.map((b) => <ListingCard key={b.slug} b={b} />)}
            </div>
          </>
        )}
        {premierSpotOpen && <PremierPromo category={category} city={city} className={premiers.length ? 'mt-5' : ''} />}
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10">
        {listings.length > 0 ? (
          <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {listings.map((b) => <ListingCard key={b.slug} b={b} />)}
          </div>
          {pages > 1 && (
            <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Pages">
              {page > 1 && <Link href={page === 2 ? base : `${base}?page=${page - 1}`} className="px-4 py-2 rounded-full border border-[#062840]/20 text-[#062840] hover:border-[#BA9273]">&larr; Previous</Link>}
              <span className="px-4 py-2 text-sm text-[#062840]/70">Page {page} of {pages}</span>
              {page < pages && <Link href={`${base}?page=${page + 1}`} className="px-4 py-2 rounded-full border border-[#062840]/20 text-[#062840] hover:border-[#BA9273]">Next &rarr;</Link>}
            </nav>
          )}
          </>
        ) : (
          <div className="bg-white rounded-xl border border-[#062840]/10 p-10 text-center">
            <h2 className="font-serif text-2xl text-[#062840]">Listings are on the way</h2>
            <p className="mt-3 text-[#062840]/75 max-w-xl mx-auto">
              We are adding verified {category.title.toLowerCase()} {city ? `in ${city.name}` : `across ${AREA_TEXT}`} now.
              Run one? Add your business free and be among the first listed.
            </p>
            <Link href={`${GUIDE_BASE}/add-your-business`} className="mt-6 inline-block px-6 py-3 rounded-full bg-[#BA9273] text-white hover:bg-[#a67f61]">
              Add your business
            </Link>
          </div>
        )}
      </section>

      {category.includes.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-4">
          <div className="text-xs uppercase tracking-[0.3em] text-[#BA9273] mb-2">Also covers</div>
          <p className="text-[#062840]/80">{category.includes.join(' · ')}</p>
        </section>
      )}

      <FAQ items={categoryFaq(category, city)} />
    </PageShell>
  );
}

function BusinessPage({ b }) {
  const city = cityBySlug[b.city];
  const cats = b.categories.map((s) => categoryBySlug[s]).filter(Boolean);
  const primary = cats[0];
  const paid = isPaid(b);
  const path = `${GUIDE_BASE}/${b.slug}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: b.name,
    url: `${SITE.url}${path}`,
    description: b.description,
    areaServed: CITIES.map((c) => ({ '@type': 'City', name: `${c.name}, AZ` })),
    ...(b.address && {
      address: { '@type': 'PostalAddress', streetAddress: b.address.street, addressLocality: b.address.city, addressRegion: b.address.state, postalCode: b.address.zip },
    }),
    ...(paid && b.website && { sameAs: [b.website] }),
    ...(paid && b.phone && { telephone: b.phone }),
  };

  return (
    <PageShell>
      {!b.sample && <JsonLd data={schema} />}
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Guide', path: GUIDE_BASE },
        ...(primary ? [{ name: primary.title, path: categoryHref(primary) }] : []),
        { name: b.name, path },
      ])} />

      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          {primary && (
            <Link href={city ? categoryCityHref(primary, city) : categoryHref(primary)} className="inline-block text-xs uppercase tracking-[0.3em] text-amber-300 mb-4 hover:text-amber-100">
              &larr; {primary.title}{city ? ` in ${city.name}` : ''}
            </Link>
          )}
          <div className="flex gap-2 mb-3">{paid && <PartnerBadge />}{b.sample && <SampleBadge />}</div>
          <h1 className="font-serif text-4xl md:text-6xl tracking-tight leading-[1.05]">{b.name}</h1>
          {city && <div className="mt-4 flex items-center gap-2 text-amber-100/90"><MapPin className="h-4 w-4" /> {city.name}, Arizona</div>}
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-6 py-14">
        {b.description && <p className="text-[#062840]/85 text-lg leading-relaxed">{b.description}</p>}

        <div className="mt-6 flex flex-wrap gap-2">
          {cats.map((c) => (
            <Link key={c.slug} href={categoryHref(c)} className="px-3 py-1 rounded-full text-sm border border-[#062840]/20 text-[#062840] hover:border-[#BA9273]">{c.title}</Link>
          ))}
        </div>

        {paid ? (
          <div className="mt-10 bg-white rounded-xl border border-[#BA9273]/50 p-6">
            <h2 className="font-serif text-2xl text-[#062840] mb-4">Contact {b.name}</h2>
            <div className="flex flex-col gap-3 text-[#062840]">
              {b.website && <PartnerLink href={b.website} kind="website" partner={b.slug} className="text-[#BA9273] hover:text-[#062840]">Visit website</PartnerLink>}
              {b.phone && <PartnerLink href={`tel:${b.phone.replace(/[^\d+]/g, '')}`} kind="phone" partner={b.slug} className="text-[#BA9273] hover:text-[#062840]">{b.phone}</PartnerLink>}
              {b.email && <PartnerLink href={`mailto:${b.email}`} kind="email" partner={b.slug} className="text-[#BA9273] hover:text-[#062840]">{b.email}</PartnerLink>}
            </div>
          </div>
        ) : (
          <div className="mt-10 bg-emerald-50/60 rounded-xl border border-[#062840]/10 p-6">
            <h2 className="font-serif text-xl text-[#062840]">Is this your business?</h2>
            <p className="mt-2 text-[#062840]/80">Upgrade to show your website, phone and email, and reach the golf households reading this guide.</p>
            <Link href="/partner-with-us" className="mt-4 inline-block text-[#BA9273] hover:text-[#062840]">See listing options</Link>
          </div>
        )}

        {paid && b.articleSlugs?.length > 0 && (
          <div className="mt-10">
            <h2 className="font-serif text-2xl text-[#062840] mb-3">Featured in our articles</h2>
            <ul className="space-y-2">
              {b.articleSlugs.map((s) => <li key={s}><Link href={`/blog/${s}`} className="text-[#BA9273] hover:text-[#062840]">{s.replace(/-/g, ' ')}</Link></li>)}
            </ul>
          </div>
        )}
      </article>
    </PageShell>
  );
}
