// Note section. File kept named editorial-intro.js for path stability,
// but all user-facing 'editorial' framing has been removed.
export default function EditorialIntro() {
  return (
    <section className="bg-sand-50 border-y border-border">
      <div className="container py-20 lg:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <div className="editorial-eyebrow mb-6">
            <span className="editorial-rule" />
            Why La Quinta
          </div>
          <p className="font-serif text-2xl md:text-3xl text-palm leading-[1.35] text-balance">
            &ldquo;La Quinta isn&rsquo;t a tax move. It&rsquo;s a lifestyle move
            &mdash; shaped by twenty-three golf courses inside the city limits,
            a hundred years of California desert architecture, and a winter season
            unlike anywhere else in the American West.&rdquo;
          </p>
          <div className="mt-8 text-xs uppercase tracking-[0.28em] text-foreground/60">
            7671 Enterprises LLC &middot; Owner &amp; Operator
          </div>
        </div>
      </div>
    </section>
  );
}
