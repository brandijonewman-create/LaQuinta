// Editorial-friendly image placeholder. Renders a labeled, aspect-aware panel
// so MDX articles can mark exactly where real property photos should go
// without ever using a misleading stock image.
//
// Usage in MDX:
//   <Placeholder caption="Front facade · arched portico" />
//   <Placeholder caption="Pool & waterfall" ratio="4/3" />
//   <Placeholder caption="Primary suite" ratio="16/9" />
//
// Ratio defaults to 3/2 (typical real-estate hero crop).

const RATIOS = {
  '16/9': 'aspect-[16/9]',
  '3/2':  'aspect-[3/2]',
  '4/3':  'aspect-[4/3]',
  '1/1':  'aspect-square',
  '5/4':  'aspect-[5/4]',
};

export default function Placeholder({ caption = 'Photo placeholder', ratio = '3/2' }) {
  const aspectClass = RATIOS[ratio] || RATIOS['3/2'];
  return (
    <figure className="my-10 not-prose">
      <div
        className={`relative w-full ${aspectClass} bg-sand-100 border border-border rounded-lg overflow-hidden`}
        role="img"
        aria-label={caption}
      >
        {/* Subtle diagonal hatch so it reads as an intentional placeholder, not a broken image */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, transparent 0px, transparent 14px, rgba(6,40,64,0.06) 14px, rgba(6,40,64,0.06) 15px)',
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <div className="text-[10px] uppercase tracking-[0.32em] text-palm/55 mb-2">
            Photo Placeholder
          </div>
          <div className="font-serif text-palm/80 text-lg md:text-xl leading-snug max-w-md">
            {caption}
          </div>
        </div>
      </div>
      <figcaption className="text-[11px] uppercase tracking-[0.22em] text-foreground/45 mt-3">
        {caption}
      </figcaption>
    </figure>
  );
}
