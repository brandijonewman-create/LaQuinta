'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { CATEGORIES, CATEGORY_GROUPS, CITIES } from '@/lib/directory';

const select = 'w-full bg-white/95 text-[#062840] px-5 py-4 text-[15px] border-0 focus:outline-none focus:ring-2 focus:ring-amber-300 appearance-none';

// Hero search: pick a service and a city, go straight to that page.
export default function GuideSearch() {
  const router = useRouter();
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');

  function go(e) {
    e.preventDefault();
    if (!category) return;
    router.push(city ? `/guide/${category}-${city}` : `/guide/${category}`);
  }

  return (
    <form onSubmit={go} className="mt-10 grid gap-px md:grid-cols-[1.4fr_1fr_auto] max-w-3xl bg-white/20 shadow-2xl" role="search">
      <label className="sr-only" htmlFor="guide-category">Select a service</label>
      <select id="guide-category" className={select} value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select a service</option>
        {CATEGORY_GROUPS.map((g) => (
          <optgroup key={g.slug} label={g.name}>
            {CATEGORIES.filter((c) => c.group === g.slug).map((c) => <option key={c.slug} value={c.slug}>{c.title}</option>)}
          </optgroup>
        ))}
      </select>
      <label className="sr-only" htmlFor="guide-city">Select a city</label>
      <select id="guide-city" className={select} value={city} onChange={(e) => setCity(e.target.value)}>
        <option value="">All five cities</option>
        {CITIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
      </select>
      <button disabled={!category} className="inline-flex items-center justify-center gap-2 bg-[#BA9273] hover:bg-[#a67f61] disabled:opacity-80 text-white px-8 py-4 text-[13px] uppercase tracking-[0.2em] font-semibold">
        <Search className="h-4 w-4" /> Find
      </button>
    </form>
  );
}
