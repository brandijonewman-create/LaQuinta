import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumbs({ items = [] }) {
  if (!items.length) return null;
  return (
    <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.22em] text-foreground/55">
      <ol className="flex items-center flex-wrap gap-1.5">
        <li>
          <Link href="/" className="hover:text-palm transition-colors">Home</Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight size={11} className="opacity-50" />
            {item.href ? (
              <Link href={item.href} className="hover:text-palm transition-colors">{item.label}</Link>
            ) : (
              <span className="text-foreground/80">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
