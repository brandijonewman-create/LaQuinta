import PageShell from '@/components/page-shell';
import { SITE } from '@/lib/data';
import { breadcrumbSchema, JsonLd } from '@/lib/seo';

export const metadata = {
  title: 'Terms of Use: Scottsdale Golf Lifestyle',
  description: 'Terms of use for Scottsdale Golf Lifestyle website and services.',
  alternates: { canonical: `${SITE.url}/terms` },
  openGraph: { url: `${SITE.url}/terms`, images: [{ url: `${SITE.url}/opengraph-image`, width: 1200, height: 630, alt: 'Scottsdale Golf Lifestyle' }] },
  robots: { index: true, follow: true }
};

const LAST_UPDATED = 'June 2025';

export default function Page() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Terms of Use', path: '/terms' }
      ])} />
      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-3">Legal</div>
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight">Terms of Use</h1>
          <p className="mt-4 text-emerald-50/70 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>
      <article className="max-w-3xl mx-auto px-6 py-14 prose prose-emerald">
        <p><em>This is a placeholder terms-of-use document. Before launch, please have an attorney tailor it to your specific business operations and jurisdiction.</em></p>

        <h2>1. Acceptance of terms</h2>
        <p>The Site {SITE.url} (the &ldquo;Site&rdquo;) is operated by <strong>7671 Enterprises, LLC DBA Golf Lifestyle Network</strong> (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). Scottsdale Golf Lifestyle is operated by 7671 Enterprises, LLC DBA Golf Lifestyle Network, owner and operator. It is built in partnership with Arizona-licensed real estate professionals. We are not a real estate brokerage. By accessing or using the Site, you agree to be bound by these Terms of Use and our <a href="/privacy">Privacy Policy</a>. If you do not agree, please do not use the Site.</p>

        <h2>2. Informational content only</h2>
        <p>All content on the Site: including community profiles, market reports, listings, guides, blog posts, and downloadable PDFs, is provided for general informational purposes only. Nothing on the Site constitutes legal, tax, financial, or real-estate-transaction advice. Always consult licensed Arizona professionals before making decisions.</p>

        <h2>3. Property listings</h2>
        <p>Listings, prices, square footage, photographs, and availability are gathered from sources we believe reliable but are not guaranteed. Confirm all details with a licensed real-estate professional or the listing brokerage before relying on them.</p>

        <h2>4. The Collaborative</h2>
        <p>Businesses featured in our <a href="/collaborators">Collaborative</a> are independent third parties. We do not employ, supervise, license, or insure them. Any transaction you enter with a featured collaborator is solely between you and that business; we make no warranties about their work and disclaim liability for any acts or omissions on their part.</p>

        <h2>5. Sponsored content &amp; promotions</h2>
        <p>The Site may display promotions for our featured collaborators and partners, always identified by name. The presence of a promotion is not an endorsement. We are not responsible for the products, services, or claims of promoted businesses.</p>

        <h2>6. Intellectual property</h2>
        <p>All original text, graphics, logos, and downloadable content on the Site are the property of Scottsdale Golf Lifestyle or its licensors and are protected by copyright. Third-party images are used under their respective licenses, with attribution where required (e.g. Creative Commons photographs). You may not reproduce or republish material from the Site without our written permission.</p>

        <h2>7. User-submitted information</h2>
        <p>When you submit information through a Site form (contact, saved search, guide download, partner inquiry), you grant us permission to contact you regarding your inquiry and to store that information per our Privacy Policy. Do not submit confidential information through public forms.</p>

        <h2>8. Disclaimers</h2>
        <p>The Site is provided &ldquo;as is&rdquo; without warranties of any kind, express or implied, including warranties of merchantability, fitness for a particular purpose, or non-infringement. To the maximum extent permitted by law, we disclaim all liability arising from your use of the Site.</p>

        <h2>9. Limitation of liability</h2>
        <p>To the maximum extent permitted by applicable law, 7671 Enterprises, LLC DBA Golf Lifestyle Network (operator of Scottsdale Golf Lifestyle), its owners, employees, and contributors shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the Site.</p>

        <h2>10. Governing law</h2>
        <p>These terms are governed by the laws of the State of Arizona, without regard to its conflict-of-laws principles. Disputes will be resolved exclusively in the courts of Maricopa County, Arizona.</p>

        <h2>11. Changes</h2>
        <p>We may update these terms at any time. Continued use of the Site after a revision constitutes acceptance.</p>

        <h2>12. Contact us</h2>
        <p>Questions about these terms? Reach us through the <a href="/contact">contact form</a> on the Site.</p>
      </article>
    </PageShell>
  );
}
