export default function EditorialIntro() {
  return (
    <section className="bg-sand-50 border-y border-border">
      <div className="container py-20 lg:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <div className="editorial-eyebrow mb-6">
            <span className="editorial-rule" />
            From the Editor
          </div>
          <p className="font-serif text-2xl md:text-3xl text-palm leading-[1.35] text-balance">
            “The Coachella Valley isn’t a tax move. It’s a lifestyle move—one
            shaped by 120 private courses, a hundred years of mid-century
            architecture, and a winter season unlike anywhere else in the
            American West.”
          </p>
          <div className="mt-8 text-xs uppercase tracking-[0.28em] text-foreground/60">
            Brandi Jo Newman · Owner and Creator
          </div>
        </div>
      </div>
    </section>
  );
}
