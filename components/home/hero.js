import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <img
        src="https://images.pexels.com/photos/6794794/pexels-photo-6794794.jpeg"
        alt="A La Quinta desert valley at golden hour with palm trees and the Santa Rosa mountains aglow"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 hero-overlay" />

      <div className="relative h-full container flex flex-col justify-end pb-20 lg:pb-28">
        <div className="max-w-3xl animate-fade-up">
          <div className="flex items-center mb-6">
            <span className="editorial-rule" />
            <span className="text-xs uppercase tracking-[0.32em] text-gold">
              La Quinta, California
            </span>
          </div>

          <h1 className="font-serif text-white text-balance text-5xl md:text-6xl lg:text-7xl leading-[1.03] font-medium">
            The private golf communities and desert lifestyle of La Quinta.
          </h1>

          <p className="text-sand-50/85 text-lg md:text-xl mt-8 max-w-2xl leading-relaxed">
            A lifestyle guide to La Quinta&rsquo;s seven private golf communities,
            the architects behind their fairways, and the daily life around them.
            Listings and representation are provided by Kathy Schowe, our
            Exclusive Market Partner.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-none bg-sand-50 text-palm hover:bg-white h-12 px-7 text-sm uppercase tracking-[0.18em]"
            >
              <Link href="/communities">Explore Communities</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-none border-white/70 bg-transparent text-white hover:bg-white hover:text-palm h-12 px-7 text-sm uppercase tracking-[0.18em]"
            >
              <Link href="/community-quiz">Take the Quiz</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
