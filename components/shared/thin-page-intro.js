// Renders a long-form intro paragraph. The copy in
// /app/lib/content/thin-page-copy.js is written as one long paragraph per
// page (buyer-friendly, single-scroll reading), so we render it as-is inside
// an `editorial` prose column. We deliberately do not auto-split on periods
// or blank lines — the source is authored as continuous prose.

export default function ThinPageIntro({ children }) {
  return (
    <section className="container py-14 lg:py-20">
      <div className="max-w-3xl">
        <p className="text-foreground/85 text-base md:text-lg leading-[1.85]">
          {children}
        </p>
      </div>
    </section>
  );
}
