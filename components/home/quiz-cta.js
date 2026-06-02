import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function QuizCta() {
  return (
    <section className="relative overflow-hidden bg-palm text-sand-50">
      <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle_at_30%_20%,#C8A24A,transparent_50%),radial-gradient(circle_at_75%_80%,#B45D3C,transparent_55%)]" />
      <div className="relative container py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <div className="text-xs uppercase tracking-[0.32em] text-gold mb-5">
              <span className="editorial-rule bg-gold" />
              Find Your Community
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-balance">
              Twenty-two private clubs. Six cities. One quiz to narrow the field.
            </h2>
            <p className="text-sand-50/75 mt-6 max-w-2xl text-base md:text-lg leading-relaxed">
              Eight questions — architecture, scale, social scene, price band, and
              membership style — and we’ll match you to the three Coachella Valley
              communities most aligned with how you actually want to live.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Button
              asChild
              size="lg"
              className="rounded-none bg-gold text-palm hover:bg-sand-50 h-14 px-9 text-sm uppercase tracking-[0.2em] font-semibold"
            >
              <Link href="/community-quiz">Start the Quiz</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
