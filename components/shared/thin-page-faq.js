// Renders a public FAQ list styled to match the editorial column across the
// site. Callers pass an array of { q, a } objects; the FAQPage JSON-LD is
// emitted separately by each page using faqSchema() from lib/json-ld.
//
// Rendered as a semantic <dl> for accessibility.

export default function ThinPageFaq({ faqs = [], heading = 'Frequently asked' }) {
  if (!Array.isArray(faqs) || faqs.length === 0) return null;
  return (
    <section className="container pb-16 lg:pb-24">
      <div className="max-w-3xl border-t border-border pt-10">
        <h2 className="font-serif text-3xl text-palm mb-6">{heading}</h2>
        <dl className="space-y-6">
          {faqs.map((f, i) => (
            <div key={i} className="border-b border-border pb-6 last:border-0">
              <dt className="font-serif text-xl text-palm">{f.q}</dt>
              <dd className="text-foreground/75 leading-relaxed mt-2">{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
