import Link from 'next/link';
import PageShell from '@/components/page-shell';
import QuizClient from './QuizClient';
import { SITE } from '@/lib/data';
import { breadcrumbSchema, JsonLd } from '@/lib/seo';
import { Sparkles, MapPin, TrendingUp, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Which Scottsdale Golf Community Fits You? Free Quiz',
  description: 'Take our 5-question quiz to discover which of the 46 Scottsdale golf communities best fits your investment range, golf preferences, lifestyle, and security needs. Free, no obligation, results in 2 minutes.',
  alternates: { canonical: `${SITE.url}/community-quiz` },
  openGraph: { url: `${SITE.url}/community-quiz`, title: 'Which Scottsdale Golf Community Is Right for You?', images: [{ url: `${SITE.url}/opengraph-image`, width: 1200, height: 630, alt: 'Scottsdale Golf Lifestyle' }] }
};

export default function CommunityQuizPage() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Community Quiz', path: '/community-quiz' }
      ])} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Quiz',
        name: 'Which Scottsdale Golf Community Is Right for You?',
        about: 'Scottsdale, Arizona luxury golf real-estate communities',
        educationalLevel: 'beginner',
        url: `${SITE.url}/community-quiz`
      }} />

      {/* Hero */}
      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20 text-center">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-amber-300 mb-4"><Sparkles className="h-3.5 w-3.5" /> 2-Minute Quiz</div>
          <h1 className="font-serif text-4xl md:text-6xl tracking-tight leading-[1.05]">Which Scottsdale golf community<br/><em className="text-amber-300 not-italic">is right for you?</em></h1>
          <p className="mt-6 text-emerald-50/85 text-lg max-w-2xl mx-auto">
            12 featured communities. 5 questions. We&rsquo;ll surface your top match plus two runners-up, with a clear, defensible reason for each.
          </p>
        </div>
      </section>

      {/* Quiz */}
      <section className="max-w-3xl mx-auto px-6 -mt-10 md:-mt-12 pb-16 relative z-10">
        <QuizClient />
      </section>

      {/* Trust strip */}
      <section className="max-w-5xl mx-auto px-6 pb-20 grid md:grid-cols-3 gap-8">
        <div className="text-center">
          <MapPin className="h-7 w-7 text-[#BA9273] mx-auto mb-3" />
          <h3 className="font-serif text-xl text-[#062840] mb-1">12 featured communities</h3>
          <p className="text-sm text-[#062840]/65">The marquee Scottsdale-area golf communities, scored on five publicly observable axes.</p>
        </div>
        <div className="text-center">
          <TrendingUp className="h-7 w-7 text-[#BA9273] mx-auto mb-3" />
          <h3 className="font-serif text-xl text-[#062840] mb-1">Transparent matching</h3>
          <p className="text-sm text-[#062840]/65">No black-box AI, each match shows the exact reasons it surfaced.</p>
        </div>
        <div className="text-center">
          <ShieldCheck className="h-7 w-7 text-[#BA9273] mx-auto mb-3" />
          <h3 className="font-serif text-xl text-[#062840] mb-1">No spam, ever</h3>
          <p className="text-sm text-[#062840]/65">We email the guide once. No drip campaigns, no cold calls.</p>
        </div>
      </section>

      {/* Editorial context */}
      <section className="bg-emerald-50/40 border-y border-[#062840]/10">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <div className="text-xs uppercase tracking-[0.3em] text-[#BA9273] mb-3">How the matching works</div>
          <h2 className="font-serif text-3xl text-[#062840]">A transparent scoring engine, not magic.</h2>
          <p className="mt-4 text-[#062840]/80 leading-relaxed">
            Your answers map to five attributes we&rsquo;ve indexed on every featured Scottsdale golf community: geography,
            architectural era, club character, real-estate footprint, and intended-use fit. Communities are
            ranked by total weighted match, and we surface the top match plus two runners-up with the exact reasons each one
            surfaced. You can sanity-check the logic, retake the quiz, or skip straight to the
            <Link href="/laquinta-golf-community-index-2026" className="text-[#BA9273] underline ml-1">2026 Community Index</Link>
            if you&rsquo;d rather browse all 46 yourself.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
