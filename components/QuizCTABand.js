'use client';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

// Promotional band that funnels traffic to /community-quiz.
//
// On click, appends ?from=<current-page-path> to the quiz link so we can
// attribute which page sent each lead through the funnel. We resolve the
// href just-in-time on the click event instead of in useEffect to avoid
// SSR/hydration friction.
//
// Variant controls the visual treatment:
//   'navy'   — dark, used inside light pages for emphasis (default)
//   'subtle' — cream + gold, used between editorial sections
//   'inline' — compact card variant for narrow contexts (sidebars, end-of-blog)
function quizHrefFor(pathname) {
  if (!pathname || pathname === '/community-quiz') return '/community-quiz';
  return `/community-quiz?from=${encodeURIComponent(pathname)}`;
}

function handleQuizClick(e) {
  if (typeof window === 'undefined') return;
  try {
    const path = window.location.pathname || '';
    const target = e.currentTarget;
    if (target && target.tagName === 'A') {
      target.setAttribute('href', quizHrefFor(path));
    }
  } catch (_) { /* fall back to default href */ }
}

export default function QuizCTABand({
  variant = 'navy',
  title = 'Not sure which Scottsdale community fits you?',
  subtitle = 'Take the 2-minute quiz: 5 questions, one top match plus two runners-up, scored on five publicly observable axes.',
  cta = 'Take the quiz',
  className = ''
}) {
  if (variant === 'subtle') {
    return (
      <section className={`bg-emerald-50/50 border-y border-[#062840]/10 ${className}`}>
        <div className="max-w-5xl mx-auto px-6 py-10 md:py-12 flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#BA9273] mb-2">
              <Sparkles className="h-3.5 w-3.5" /> 2-minute quiz
            </div>
            <h2 className="font-serif text-2xl md:text-3xl text-[#062840] leading-snug">{title}</h2>
            <p className="mt-2 text-sm md:text-base text-[#062840]/70 max-w-2xl">{subtitle}</p>
          </div>
          <Link
            href="/community-quiz"
            onMouseEnter={handleQuizClick}
            onFocus={handleQuizClick}
            onClick={handleQuizClick}
            className="inline-flex items-center gap-2 rounded-full bg-[#062840] hover:bg-[#08344f] text-amber-100 px-6 py-3 text-sm font-semibold transition flex-shrink-0"
          >
            {cta} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 via-white to-amber-50 p-6 md:p-7 ${className}`}>
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-amber-700 mb-2">
          <Sparkles className="h-3.5 w-3.5" /> 2-minute quiz
        </div>
        <h3 className="font-serif text-xl md:text-2xl text-[#062840] leading-snug">{title}</h3>
        <p className="mt-2 text-sm text-[#062840]/70">{subtitle}</p>
        <Link
          href="/community-quiz"
          onMouseEnter={handleQuizClick}
          onFocus={handleQuizClick}
          onClick={handleQuizClick}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#062840] hover:bg-[#08344f] text-amber-100 px-5 py-2.5 text-sm font-semibold transition"
        >
          {cta} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  // default: navy
  return (
    <section className={`bg-[#062840] text-amber-50 ${className}`}>
      <div className="max-w-5xl mx-auto px-6 py-14 md:py-16 flex flex-col md:flex-row items-center gap-6 md:gap-10">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-amber-300 mb-2">
            <Sparkles className="h-3.5 w-3.5" /> 2-minute quiz
          </div>
          <h2 className="font-serif text-3xl md:text-4xl leading-tight">{title}</h2>
          <p className="mt-3 text-emerald-50/80 text-base md:text-lg max-w-2xl leading-relaxed">{subtitle}</p>
        </div>
        <Link
          href="/community-quiz"
          onMouseEnter={handleQuizClick}
          onFocus={handleQuizClick}
          onClick={handleQuizClick}
          className="inline-flex items-center gap-2 rounded-full bg-amber-300 hover:bg-amber-200 text-[#062840] px-7 py-3.5 text-sm font-semibold transition flex-shrink-0 shadow-lg shadow-amber-900/20"
        >
          {cta} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
