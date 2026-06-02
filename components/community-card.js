import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function CommunityCard({ community, image, blurb }) {
  return (
    <Link href={`/communities/${community.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-sand-100">
        <img
          src={image}
          alt={community.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
        <div className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.28em] text-gold bg-ink/40 backdrop-blur-sm px-3 py-1.5">
          {community.city}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="font-serif text-2xl text-white">{community.name}</div>
          {community.architect && (
            <div className="text-[11px] uppercase tracking-[0.22em] text-sand-50/80 mt-1">
              {community.architect}
            </div>
          )}
        </div>
      </div>
      {blurb && (
        <p className="text-sm text-foreground/70 leading-relaxed mt-4">{blurb}</p>
      )}
      <div className="mt-3 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.22em] text-terracotta group-hover:text-palm transition-colors">
        Read profile <ArrowUpRight size={13} />
      </div>
    </Link>
  );
}
