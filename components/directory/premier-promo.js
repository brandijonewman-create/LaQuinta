import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Holds the Premier Partner place at the top of a page while the spot is open.
// category and city are optional: with both it sells one spot, with a category
// only it sells that category's spot in each city, with neither it sells Premier
// across the guide.
export default function PremierPromo({ category, city, className = '' }) {
  const heading = category
    ? city
      ? `Be the Premier Partner for ${category.title} in ${city.name}.`
      : `Be the Premier Partner for ${category.title} in your city.`
    : 'Own the top of your category.';
  const body = category
    ? 'One business per category in each city holds this place, first on the page and above every other listing. Founding rate, locked for life.'
    : 'One Premier Partner per category in each of our five cities, shown first on every page. Founding rate, locked for life.';

  return (
    <div className={`rounded-xl border border-[#BA9273] ring-2 ring-[#BA9273]/40 bg-[#062840] text-amber-50 p-8 md:p-10 md:flex md:items-center md:justify-between gap-8 ${className}`}>
      <div className="max-w-3xl">
        <div className="text-[10px] uppercase tracking-[0.3em] text-amber-300">Premier Partner · Spot open</div>
        <h2 className="mt-3 font-serif text-2xl md:text-3xl leading-snug">{heading}</h2>
        <p className="mt-3 text-amber-50/85">{body}</p>
      </div>
      <Link
        href="/partner-with-us#plans"
        className="mt-6 md:mt-0 shrink-0 inline-flex items-center gap-2 bg-amber-300 hover:bg-amber-200 text-[#062840] px-6 py-3 text-sm font-semibold tracking-wide rounded-full"
      >
        {category ? 'Claim this spot' : 'See Premier Partner'} <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
