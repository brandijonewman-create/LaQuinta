import PageHero from '@/components/shared/page-hero';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import ComingSoon from '@/components/shared/coming-soon';

export const metadata = {
  title: 'La Quinta Home Valuation',
  description: 'Request a no-cost honest range valuation for a La Quinta golf home. Powered by a partner licensed California agent.',
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
        <div className="mt-10 max-w-3xl">
          <ComingSoon
            note="The valuation request form goes live alongside the licensed-agent partnership. We will not publish an automated valuation that could be misleading."
          />
        </div>
      </section>
    </>
  );
}
