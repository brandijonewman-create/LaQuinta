import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import ValuationForm from '@/components/forms/valuation-form';
import Disclaimer from '@/components/shared/disclaimer';

export const metadata = {
  title: 'La Quinta Home Valuation',
  description: 'Request an honest range valuation for a La Quinta golf home. Delivered by a California-licensed partner agent. No automated AVM.',
  alternates: { canonical: '/home-valuation' },
};

export default function ValuationPage() {
  return (
    <>
      <PageHero
        eyebrow="Home Valuation"
        title="Honest range valuation for your La Quinta home."
        subtitle="A no-cost range opinion delivered by a partner California-licensed agent. No automated AVM gimmicks."
      />
      <section className="container py-16 lg:py-24">
        <Breadcrumbs items={[{ label: 'Home Valuation' }]} />
        <div className="max-w-2xl mt-8 mb-10"><Disclaimer /></div>
        <ValuationForm />
      </section>
    </>
  );
}
