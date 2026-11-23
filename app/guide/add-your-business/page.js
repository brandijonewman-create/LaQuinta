import PageShell from '@/components/page-shell';
import AddBusinessForm from '@/components/directory/add-business-form';
import { pageMeta, breadcrumbSchema, JsonLd } from '@/lib/seo';
import { GUIDE_BASE } from '@/lib/directory';
import { AREA_TEXT } from '@/lib/directory/content';

export const metadata = pageMeta(`${GUIDE_BASE}/add-your-business`, {
  title: 'Add Your Business Free | Scottsdale Golf Lifestyle Guide',
  description: `Add a free listing for your business in ${AREA_TEXT}. Verified local businesses only.`,
});

export default function AddYourBusiness() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Guide', path: GUIDE_BASE },
        { name: 'Add your business', path: `${GUIDE_BASE}/add-your-business` },
      ])} />
      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-20">
          <div className="text-xs uppercase tracking-[0.3em] text-amber-300 mb-4">The Guide</div>
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight">Add your business free</h1>
          <p className="mt-5 text-amber-100/90 text-lg">
            Reach the golf households of {AREA_TEXT}. Free listings show your business name and a short description.
          </p>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-6 py-12">
        <AddBusinessForm />
      </section>
    </PageShell>
  );
}
