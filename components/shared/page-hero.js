// Reusable page hero. Two variants:
//   simple — cream background, used for most utility/stub pages.
//   image  — full-bleed image with overlay, used for communities, architects.

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  variant = 'simple',
  align = 'left',
}) {
  if (variant === 'image' && image) {
    return (
      <section className="relative h-[64svh] min-h-[460px] w-full overflow-hidden">
        <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative h-full container flex flex-col justify-end pb-14 lg:pb-20">
          <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
            {eyebrow && (
              <div className="flex items-center mb-5">
                <span className="editorial-rule" />
                <span className="text-xs uppercase tracking-[0.32em] text-gold">{eyebrow}</span>
              </div>
            )}
            <h1 className="font-serif text-white text-balance text-4xl md:text-5xl lg:text-6xl leading-[1.05] font-medium">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sand-50/85 text-base md:text-lg mt-5 max-w-2xl leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-sand-50 border-b border-border">
      <div className="container pt-32 lg:pt-36 pb-14 lg:pb-20">
        <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
          {eyebrow && (
            <div className="editorial-eyebrow mb-5">
              <span className="editorial-rule" />
              {eyebrow}
            </div>
          )}
          <h1 className="font-serif text-palm text-balance text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
            {title}
          </h1>
          {subtitle && (
            <p className="text-foreground/70 text-base md:text-lg mt-5 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
