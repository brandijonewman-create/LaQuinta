import Link from 'next/link';
import { NAV_FOOTER, site, owner, MARKET_DISCLAIMER } from '@/lib/site-config';

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-palm text-sand-50 mt-24">
      <div className="container py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="font-serif text-2xl leading-tight">{site.name}</div>
            <div className="text-xs uppercase tracking-[0.28em] text-gold/90 mt-2">
              La Quinta, CA · A lifestyle guide, in partnership with Kathy Schowe
            </div>
            <p className="text-sm text-sand-50/75 mt-6 max-w-sm leading-relaxed">
              {site.tagline}
            </p>
            <p className="text-xs text-sand-50/55 mt-6 leading-relaxed">
              A lifestyle guide. {owner.name}, {owner.title}.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(NAV_FOOTER).map(([group, links]) => (
              <div key={group}>
                <div className="text-xs uppercase tracking-[0.22em] text-gold/90 mb-4">
                  {group}
                </div>
                <ul className="space-y-2.5">
                  {links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-sand-50/80 hover:text-sand-50 transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-sand-50/15">
          <p className="text-[11px] leading-relaxed text-sand-50/55 max-w-4xl">
            <span className="text-gold/90 uppercase tracking-[0.22em] mr-2">Disclosure</span>
            {site.name} is a lifestyle guide operated by {owner.name}. We are not a real estate brokerage. Current listings, private showings, and buyer representation are provided by our California-licensed Exclusive Market Partner. Any community, club, or market figure referenced is informational only.{' '}
            {MARKET_DISCLAIMER}
          </p>
          <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="text-[11px] text-sand-50/50">
              © {year} {site.name}. All rights reserved.
            </div>
            <div className="text-[11px] text-sand-50/50">
              {site.domain}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
