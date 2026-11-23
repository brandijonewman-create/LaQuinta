import Image from 'next/image';
import Link from 'next/link';
import { Bed, Bath, Maximize, MapPin } from 'lucide-react';

export default function ListingCard({ listing }) {
  return (
    <Link href={`/homes/${listing.id}`} id={listing.id} className="block group overflow-hidden rounded-xl bg-white border border-emerald-900/10 shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-[4/3] overflow-hidden bg-emerald-50"><Image src={listing.image} alt={listing.address} className="object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" fill sizes="(max-width: 768px) 100vw, 50vw" />
        <div className="absolute top-3 left-3 bg-amber-300 text-[#062840] text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded">{listing.status}</div>
        <div className="absolute bottom-3 right-3 bg-[#062840]/85 backdrop-blur text-amber-100 text-xs px-2.5 py-1 rounded">{listing.communityName}</div>
      </div>
      <div className="p-5">
        <div className="font-serif text-2xl text-[#062840] mb-1">${listing.price.toLocaleString()}</div>
        <div className="flex items-center gap-1 text-sm text-emerald-900/60 mb-3"><MapPin className="h-3.5 w-3.5" /> {listing.address}</div>
        <div className="flex items-center gap-4 text-sm text-emerald-900/80 border-t border-emerald-900/10 pt-3">
          <span className="flex items-center gap-1"><Bed className="h-4 w-4" /> {listing.beds} bd</span>
          <span className="flex items-center gap-1"><Bath className="h-4 w-4" /> {listing.baths} ba</span>
          <span className="flex items-center gap-1"><Maximize className="h-4 w-4" /> {listing.sqft.toLocaleString()} sqft</span>
        </div>
        <p className="text-xs text-emerald-900/60 mt-3 line-clamp-2">{listing.description}</p>
        <div className="mt-3 text-[11px] text-emerald-900/40">MLS# {listing.mlsId} &middot; Built {listing.yearBuilt}</div>
      </div>
    </Link>
  );
}
