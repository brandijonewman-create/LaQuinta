'use client';

import { useEffect, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

// PropertyGallery
// ----------------
// A clickable image gallery for property posts.
// • Renders a hero image with a "View all photos" badge.
// • On click, opens a fullscreen lightbox cycling through every slide.
// • Each slide is either { src, caption } (real photo) or { placeholder: true, caption }
//   so an article can mix real photography with editorial placeholders for shots
//   that haven't been taken yet — never any fake/misleading stock.
// • Keyboard nav: ←  →  Esc.

export default function PropertyGallery({ slides = [] }) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const total = slides.length;
  const lead = slides[0];

  const close = useCallback(() => setOpen(false), []);
  const next  = useCallback(() => setIdx((i) => (i + 1) % total), [total]);
  const prev  = useCallback(() => setIdx((i) => (i - 1 + total) % total), [total]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    // Prevent background scroll while lightbox is open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, next, prev, close]);

  function openAt(i) {
    setIdx(i);
    setOpen(true);
  }

  if (!lead) return null;

  return (
    <figure className="my-10 not-prose">
      {/* Hero / cover slide */}
      <button
        type="button"
        onClick={() => openAt(0)}
        className="group relative block w-full overflow-hidden rounded-lg border border-border bg-sand-100 cursor-zoom-in"
        aria-label="Open property photo gallery"
      >
        <div className="aspect-[16/10]">
          {lead.placeholder ? (
            <PlaceholderTile caption={lead.caption} />
          ) : (
            <img
              src={lead.src}
              alt={lead.caption || 'Property hero image'}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
          )}
        </div>
        <div className="absolute bottom-4 right-4 inline-flex items-center gap-2 bg-palm/90 backdrop-blur-sm text-sand-50 text-[11px] uppercase tracking-[0.22em] px-4 py-2.5 transition-colors group-hover:bg-palm">
          <ImageIcon size={14} /> View all {total} photos
        </div>
      </button>

      {lead.caption ? (
        <figcaption className="text-[11px] uppercase tracking-[0.22em] text-foreground/45 mt-3">
          {lead.caption}
        </figcaption>
      ) : null}

      {/* Thumbnail strip (desktop only — clickable shortcuts into the gallery) */}
      <div className="hidden md:grid mt-4 grid-cols-6 gap-2">
        {slides.slice(1, 7).map((s, i) => (
          <button
            key={i}
            type="button"
            onClick={() => openAt(i + 1)}
            className="aspect-[5/4] overflow-hidden rounded-md border border-border bg-sand-100 hover:border-palm transition-colors"
            aria-label={`Open ${s.caption || 'photo'} in gallery`}
          >
            {s.placeholder ? (
              <PlaceholderTile caption={s.caption} small />
            ) : (
              <img src={s.src} alt={s.caption || 'Property photo'} className="w-full h-full object-cover" />
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Property photo gallery"
          className="fixed inset-0 z-[100] bg-palm/95 backdrop-blur-sm flex flex-col"
          onClick={close}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-4 text-sand-50">
            <div className="text-[11px] uppercase tracking-[0.28em] text-gold">
              Photo {idx + 1} / {total}
            </div>
            <button
              type="button"
              onClick={close}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-sand-50/80 hover:text-gold transition-colors"
              aria-label="Close gallery"
            >
              Close <X size={16} />
            </button>
          </div>

          {/* Slide */}
          <div
            className="flex-1 flex items-center justify-center px-4 md:px-16 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={prev}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 p-2 md:p-3 text-sand-50/70 hover:text-gold transition-colors"
              aria-label="Previous photo"
            >
              <ChevronLeft size={32} />
            </button>

            <div className="w-full max-w-5xl max-h-[78vh] flex items-center justify-center">
              {slides[idx].placeholder ? (
                <div className="w-full aspect-[3/2] max-h-[78vh] bg-sand-100/10 border border-sand-50/15 rounded-lg flex flex-col items-center justify-center text-center px-8">
                  <div className="text-[10px] uppercase tracking-[0.32em] text-gold mb-3">
                    Photo Placeholder
                  </div>
                  <div className="font-serif text-sand-50 text-2xl md:text-3xl leading-snug max-w-2xl">
                    {slides[idx].caption}
                  </div>
                </div>
              ) : (
                <img
                  src={slides[idx].src}
                  alt={slides[idx].caption || 'Property photo'}
                  className="max-w-full max-h-[78vh] object-contain rounded-lg shadow-2xl"
                />
              )}
            </div>

            <button
              type="button"
              onClick={next}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 p-2 md:p-3 text-sand-50/70 hover:text-gold transition-colors"
              aria-label="Next photo"
            >
              <ChevronRight size={32} />
            </button>
          </div>

          {/* Caption */}
          <div className="px-6 pb-6 pt-4 text-center" onClick={(e) => e.stopPropagation()}>
            <div className="text-sand-50/90 font-serif text-lg">
              {slides[idx].caption || '\u00A0'}
            </div>
          </div>
        </div>
      ) : null}
    </figure>
  );
}

function PlaceholderTile({ caption, small = false }) {
  return (
    <div
      className="relative w-full h-full bg-sand-100 flex items-center justify-center text-center px-4 overflow-hidden"
      role="img"
      aria-label={caption}
    >
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent 0px, transparent 14px, rgba(6,40,64,0.06) 14px, rgba(6,40,64,0.06) 15px)',
        }}
        aria-hidden="true"
      />
      <div className="relative">
        <div className={`uppercase tracking-[0.28em] text-palm/55 ${small ? 'text-[8px]' : 'text-[10px]'} mb-1.5`}>
          Photo Placeholder
        </div>
        <div className={`font-serif text-palm/80 leading-snug ${small ? 'text-[11px]' : 'text-lg md:text-xl'}`}>
          {caption}
        </div>
      </div>
    </div>
  );
}
