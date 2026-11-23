import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { businessHref, cityBySlug } from '@/lib/directory';
import PartnerLink from './partner-link';

const paid = (b) => ['full', 'featured', 'premier'].includes(b.level);

export function PartnerBadge() {
  return (
    <span className="text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-full border border-[#BA9273] text-[#BA9273]">
      Partner
    </span>
  );
}

export function SampleBadge() {
  return (
    <span className="text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
      Sample
    </span>
  );
}

export default function ListingCard({ b }) {
  const featured = b.level === 'featured';
  const premier = b.level === 'premier';
  const city = cityBySlug[b.city];
  return (
    <div
      className={`p-6 rounded-xl border shadow-sm ${
        premier
          ? 'md:col-span-2 lg:col-span-3 bg-[#062840] text-amber-50 border-[#BA9273] ring-2 ring-[#BA9273]/60 p-8'
          : featured ? 'bg-white border-[#BA9273] ring-1 ring-[#BA9273]/40' : 'bg-white border-[#062840]/10'
      }`}
    >
      <div className="flex items-center gap-2 flex-wrap mb-2">
        {premier && <span className="text-[10px] uppercase tracking-[0.2em] text-amber-300">Premier</span>}
        {featured && <span className="text-[10px] uppercase tracking-[0.2em] text-[#BA9273]">Featured</span>}
        {paid(b) && <PartnerBadge />}
        {b.sample && <SampleBadge />}
      </div>
      <h3 className={`font-serif ${premier ? 'text-3xl text-amber-50' : 'text-xl text-[#062840]'}`}>
        <Link href={businessHref(b)} className="hover:text-[#BA9273]">{b.name}</Link>
      </h3>
      {city && (
        <div className={`text-xs mt-1 flex items-center gap-1 ${premier ? 'text-amber-100/80' : 'text-[#062840]/60'}`}>
          <MapPin className="h-3 w-3" /> {city.name}, AZ
        </div>
      )}
      {b.description && <p className={`mt-3 ${premier ? 'text-base text-amber-50/90 max-w-3xl' : 'text-sm text-[#062840]/80'}`}>{b.description}</p>}
      {paid(b) && (
        <div className="mt-4 flex gap-4 flex-wrap text-sm">
          {b.website && <PartnerLink href={b.website} kind="website" partner={b.slug} className="text-[#BA9273] hover:text-[#062840]">Website</PartnerLink>}
          {b.phone && <PartnerLink href={`tel:${b.phone.replace(/[^\d+]/g, '')}`} kind="phone" partner={b.slug} className="text-[#BA9273] hover:text-[#062840]">{b.phone}</PartnerLink>}
          {b.email && <PartnerLink href={`mailto:${b.email}`} kind="email" partner={b.slug} className="text-[#BA9273] hover:text-[#062840]">Email</PartnerLink>}
        </div>
      )}
    </div>
  );
}
