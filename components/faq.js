import { JsonLd } from '@/lib/seo';

export default function FAQ({ items = [], heading = 'Frequently asked questions' }) {
  if (!items.length) return null;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(it => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a }
    }))
  };
  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      <JsonLd data={schema} />
      <div className="text-xs uppercase tracking-[0.3em] text-emerald-700 mb-2">FAQ</div>
      <h2 className="font-serif text-3xl text-[#062840] mb-6">{heading}</h2>
      <div className="space-y-3">
        {items.map((it, i) => (
          <details key={i} className="group bg-white rounded-xl border border-emerald-900/10 p-5 shadow-sm open:shadow-md transition">
            <summary className="cursor-pointer font-serif text-lg text-[#062840] flex justify-between items-center list-none">
              <span>{it.q}</span>
              <span className="ml-4 text-amber-600 transition-transform group-open:rotate-45 text-xl leading-none">+</span>
            </summary>
            <p className="mt-3 text-emerald-900/80 leading-relaxed">{it.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
