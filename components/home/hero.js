import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <img
        src="https://images.pexels.com/photos/10831185/pexels-photo-10831185.jpeg"
        alt="Coachella Valley fairway framed by the Santa Rosa mountains at golden hour"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 hero-overlay" />

      <div className="relative h-full container flex flex-col justify-end pb-20 lg:pb-28">
        <div className="max-w-3xl animate-fade-up">
          <div className="flex items-center mb-6">
            <span className="editorial-rule" />
            <span className="text-xs uppercase tracking-[0.32em] text-gold">
              The Coachella Valley · Editorial
            </span>
          </div>

          <h1 className="font-serif text-white text-balance text-5xl md:text-6xl lg:text-7xl leading-[1.03] font-medium">
            Golf homes, private clubs, and the desert lifestyle of California.
          </h1>

          <p className="text-sand-50/85 text-lg md:text-xl mt-8 max-w-2xl leading-relaxed">
            An independent editorial guide to the signature golf communities of La Quinta,
            Indian Wells, Rancho Mirage, and Palm Desert — from the architects who shaped
            their fairways to the way these places are lived in.
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
