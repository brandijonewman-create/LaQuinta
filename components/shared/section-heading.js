export default function SectionHeading({ eyebrow, title, subtitle, align = 'left', className = '' }) {
  return (
    <div className={`${align === 'center' ? 'text-center mx-auto' : ''} max-w-2xl ${className}`}>
      {eyebrow && (
        <div className="editorial-eyebrow mb-4">
          <span className="editorial-rule" />
          {eyebrow}
        </div>
      )}
      <h2 className="font-serif text-3xl md:text-4xl text-palm leading-[1.1]">{title}</h2>
      {subtitle && (
        <p className="text-foreground/70 mt-4 text-base md:text-lg leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
