import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function ArchitectCard({ architect }) {
  return (
    <Link
      href={`/architects/${architect.slug}`}
      className="group block border-t border-border pt-6"
    >
      <div className="text-[10px] uppercase tracking-[0.28em] text-terracotta">
        Course Architect
      </div>
      <h3 className="font-serif text-2xl md:text-3xl text-palm mt-3 group-hover:text-terracotta transition-colors">
        {architect.name}
      </h3>
      {architect.signatureCourses?.length > 0 && (
        <p className="text-sm text-foreground/65 mt-3 leading-relaxed">
          La Quinta work: {architect.signatureCourses.join(' · ')}
        </p>
      )}
      <div className="mt-5 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.22em] text-foreground/70 group-hover:text-palm transition-colors">
        Architect profile <ArrowUpRight size={13} />
      </div>
    </Link>
  );
}
