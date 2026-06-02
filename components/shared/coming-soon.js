import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ComingSoon({ note, ctaHref = '/', ctaLabel = 'Back to home' }) {
  return (
    <div className="border border-dashed border-border bg-sand-50 p-10 md:p-14 text-center">
      <div className="text-xs uppercase tracking-[0.28em] text-terracotta mb-3">Coming soon</div>
      <p className="text-foreground/75 max-w-2xl mx-auto leading-relaxed">
        {note}
      </p>
      <Button asChild variant="outline" className="rounded-none mt-6 border-palm text-palm hover:bg-palm hover:text-sand-50">
        <Link href={ctaHref}>{ctaLabel}</Link>
      </Button>
    </div>
  );
}
