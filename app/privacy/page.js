import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import { site } from '@/lib/site-config';

export const metadata = {
  title: 'Privacy Policy',
  description: `Privacy policy for ${site.name}.`,
  robots: { index: true, follow: true },
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" subtitle="How we handle data on this site." />
      <section className="container py-16 lg:py-24 max-w-3xl">
        <Breadcrumbs items={[{ label: 'Privacy' }]} />
        <div className="prose-editorial mt-10 space-y-6 text-foreground/80 leading-relaxed">
          <p>
            {site.name} is an editorial site about La Quinta golf real estate. We collect only the information you voluntarily submit through site forms (community quiz, valuation request, lead-magnet downloads). That information is stored in our database and is used solely to follow up on your request.
          </p>
          <p>
            We use Google Analytics 4 to understand site traffic in aggregate. We do not sell your information.
          </p>
          <p className="italic text-foreground/65 text-sm">
            Full legal language ships before public launch. This is a placeholder consistent with how the site actually operates.
          </p>
        </div>
      </section>
    </>
  );
}
