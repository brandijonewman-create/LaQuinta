import Link from 'next/link';
import { BLOG_POSTS as ALL_POSTS } from '@/lib/blog';
import { COMMUNITIES, COMPARISON_PAIRS, MARKET_REPORTS, ARCHITECTS, GOLF_CLUBS, findCommunity, coursesByArchitect } from '@/lib/data';
import { ArrowRight, BookOpen, BarChart3, Scale, Building2, Compass, Trophy } from 'lucide-react';

/**
 * Smart related-content recommendations to strengthen internal linking.
 *
 * Strategy:
 *   - On a community detail page, surface (1) related communities, (2) related
 *     comparisons featuring this community, (3) market reports, (4) on-topic blog posts.
 *   - On a blog post, surface (1) other related blog posts, (2) the community page
 *     for any community mentioned in the post, (3) the latest market report.
 *   - On a comparison page, surface (1) both community pages, (2) other comparisons
 *     involving either community, (3) the buyer's guide.
 *   - On a market report, surface (1) other reports, (2) hero community pages.
 *
 * Always renders 4–6 link cards. Skips anything matching `excludePath`.
 *
 * Props:
 *   pageType: 'community' | 'blog' | 'comparison' | 'market-report' | 'generic'
 *   community?: string                       // slug for community page
 *   communities?: string[]                   // slugs for comparison page
 *   tags?: string[]                          // optional content tags from blog post
 *   excludePath?: string
 */
export default function RelatedContent({
  pageType = 'generic',
  community = null,
  communities = [],
  architect = null,
  tags = [],
  excludePath = ''
}) {
  const items = buildRelated({ pageType, community, communities, architect, tags, excludePath });
  if (!items.length) return null;

  return (
    <section className="bg-emerald-50/30 border-y border-emerald-900/10">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="text-xs uppercase tracking-[0.3em] text-emerald-700 mb-2">Keep reading</div>
        <h2 className="font-serif text-3xl text-[#062840] tracking-tight mb-8">Related content</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.slice(0, 6).map(item => {
            const Icon = item.icon || BookOpen;
            return (
              <Link key={item.href} href={item.href} className="group block bg-white border border-emerald-900/10 hover:border-amber-300 hover:shadow-md rounded-xl p-6 transition">
                <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-wider text-amber-700">
                  <Icon className="h-3.5 w-3.5" /> {item.kind}
                </div>
                <div className="font-serif text-lg text-[#062840] leading-snug mb-2">{item.title}</div>
                {item.blurb && <div className="text-sm text-emerald-900/70 leading-relaxed line-clamp-2">{item.blurb}</div>}
                <div className="mt-3 inline-flex items-center gap-1 text-xs text-emerald-700 group-hover:text-amber-700 transition">
                  Read <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function buildRelated({ pageType, community, communities, architect, tags, excludePath }) {
  const out = [];
  const seen = new Set([excludePath]);
  const push = (it) => {
    if (!it || !it.href || seen.has(it.href)) return;
    seen.add(it.href);
    out.push(it);
  };

  // ---- Architect page: surface designer's courses, related communities, peer architects ----
  if (pageType === 'architect' && architect) {
    const a = ARCHITECTS.find(x => x.slug === architect);
    if (a) {
      const courses = coursesByArchitect(a) || [];
      const clubSlugs = new Set(courses.map(c => c.clubSlug).filter(Boolean));

      // Communities anchored by this architect's courses
      COMMUNITIES.filter(c => clubSlugs.has(c.slug)).slice(0, 2).forEach(c => push({
        kind: 'Community',
        icon: Building2,
        title: c.name,
        blurb: c.tagline,
        href: `/communities/${c.slug}`
      }));

      // Golf clubs hosting this architect's courses
      GOLF_CLUBS?.filter(c => clubSlugs.has(c.slug)).slice(0, 2).forEach(c => push({
        kind: 'Golf club',
        icon: Trophy,
        title: c.name,
        blurb: c.tagline || c.description,
        href: `/golf-clubs/${c.slug}`
      }));

      // Peer architects (other Scottsdale designers)
      ARCHITECTS.filter(x => x.slug !== architect).slice(0, 2).forEach(x => push({
        kind: 'Architect',
        icon: Compass,
        title: x.name,
        blurb: x.tagline,
        href: `/architects/${x.slug}`
      }));

      // Editorial coverage on architecture
      const archPost = ALL_POSTS?.find(p => /architecture|design|architect/i.test(p.title || ''));
      if (archPost) push({
        kind: 'Journal',
        icon: BookOpen,
        title: archPost.title,
        blurb: archPost.excerpt,
        href: `/blog/${archPost.slug}`
      });
    }
  }

  // ---- Comparisons involving a focal community / communities ----
  const focal = community ? [community] : communities;
  if (focal.length) {
    COMPARISON_PAIRS
      .filter(p => focal.includes(p.a) || focal.includes(p.b))
      .slice(0, 3)
      .forEach(p => {
        const a = findCommunity(p.a);
        const b = findCommunity(p.b);
        if (a && b) push({
          kind: 'Comparison',
          icon: Scale,
          title: `${a.name} vs. ${b.name}`,
          blurb: p.intent,
          href: `/compare/${p.slug}`
        });
      });
  }

  // ---- Other communities in same price tier ----
  if (community) {
    const focalC = findCommunity(community);
    if (focalC) {
      const nearbyByPrice = COMMUNITIES
        .filter(c => c.slug !== community && Math.abs((c.priceMin || 0) - (focalC.priceMin || 0)) < 1_500_000)
        .slice(0, 2);
      nearbyByPrice.forEach(c => push({
        kind: 'Community',
        icon: Building2,
        title: c.name,
        blurb: c.tagline,
        href: `/communities/${c.slug}`
      }));
    }
  } else if (communities.length) {
    communities.slice(0, 2).forEach(slug => {
      const c = findCommunity(slug);
      if (c) push({
        kind: 'Community',
        icon: Building2,
        title: c.name,
        blurb: c.tagline,
        href: `/communities/${c.slug}`
      });
    });
  }

  // ---- Blog posts that mention the focal community ----
  if (focal.length && ALL_POSTS?.length) {
    ALL_POSTS
      .filter(post => {
        const slug = post.slug || '';
        const text = (post.excerpt || '') + ' ' + (post.title || '') + ' ' + (post.paragraphs || []).join(' ');
        return focal.some(f => slug.includes(f) || text.toLowerCase().includes(f.replace(/-/g, ' ')));
      })
      .slice(0, 2)
      .forEach(post => push({
        kind: 'Journal',
        icon: BookOpen,
        title: post.title,
        blurb: post.excerpt,
        href: `/blog/${post.slug}`
      }));
  }

  // ---- Blog page: surface communities mentioned in the post + related comparisons + market report ----
  if (pageType === 'blog' && tags?.length) {
    tags.slice(0, 3).forEach(slug => {
      const c = findCommunity(slug);
      if (c) push({
        kind: 'Community',
        icon: Building2,
        title: c.name,
        blurb: c.tagline,
        href: `/communities/${c.slug}`
      });
    });
    // Related comparisons mentioning any tagged community
    COMPARISON_PAIRS
      .filter(p => tags.some(t => p.a === t || p.b === t))
      .slice(0, 2)
      .forEach(p => {
        const a = findCommunity(p.a);
        const b = findCommunity(p.b);
        if (a && b) push({
          kind: 'Comparison',
          icon: Scale,
          title: `${a.name} vs. ${b.name}`,
          blurb: p.intent,
          href: `/compare/${p.slug}`
        });
      });
  }

  // ---- Always include the latest market report ----
  if (MARKET_REPORTS?.length) {
    const mr = MARKET_REPORTS[0];
    push({
      kind: 'Market report',
      icon: BarChart3,
      title: mr.title,
      blurb: mr.summary,
      href: `/market-reports/${mr.slug}`
    });
  }

  // ---- Backfill with general high-value pages ----
  const backfill = [
    { kind: 'Guide',   icon: BookOpen,   title: 'Scottsdale Buyer’s Guide 2026',     blurb: 'Free 11-page PDF: communities, taxes, club economics, relocation timeline.', href: '/guides/scottsdale-buyers-guide-2026' },
    { kind: 'Glossary',icon: BookOpen,   title: 'Scottsdale Real-Estate Glossary',    blurb: '40+ terms every buyer eventually has to look up, defined in plain English.', href: '/glossary' },
    { kind: 'Guide',   icon: BookOpen,   title: 'Relocating to Scottsdale',           blurb: 'Schools, taxes, weather, daily life: the relocation primer.', href: '/relocating-to-scottsdale' }
  ];
  backfill.forEach(push);

  return out;
}
