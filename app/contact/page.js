import PageShell from '@/components/page-shell';
import ContactForm from '@/components/contact-form';
import { SITE } from '@/lib/data';
import { breadcrumbSchema, JsonLd } from '@/lib/seo';

export const metadata = {
  title: 'Contact | Scottsdale Golf Lifestyle',
  description: 'Contact the Scottsdale Golf Lifestyle editorial team: corrections, collaboration inquiries, privacy requests, and reader questions.',
  alternates: { canonical: `${SITE.url}/contact` },
  openGraph: { url: `${SITE.url}/contact`, images: [{ url: `${SITE.url}/opengraph-image`, width: 1200, height: 630, alt: 'Scottsdale Golf Lifestyle' }] },
  robots: { index: true, follow: true }
};

export default function ContactPage() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Contact', path: '/contact' }
      ])} />
      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <div className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-3">Connect</div>
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight">Contact the editorial team</h1>
          <p className="mt-5 max-w-xl text-emerald-50/80">
            Corrections, collaboration inquiries, privacy requests, or a question about a community we cover.
            The form below is the fastest way to reach us.
          </p>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-6 py-14">
        <ContactForm />
        <p className="mt-8 text-xs text-[#062840]/55 leading-relaxed">
          Scottsdale Golf Lifestyle is operated by 7671 Enterprises, LLC DBA Golf Lifestyle Network, owner and operator.
          It is built in partnership with Arizona-licensed real estate professionals. We are not a real estate brokerage.
          Privacy requests (access, correction, deletion, CCPA, GDPR) submitted here are handled per our <a href="/privacy" className="underline">Privacy Policy</a>.
        </p>
      </section>
    </PageShell>
  );
}
