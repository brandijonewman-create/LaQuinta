import PageShell from '@/components/page-shell';
import { SITE } from '@/lib/data';
import { breadcrumbSchema, JsonLd } from '@/lib/seo';

export const metadata = {
  title: 'Privacy Policy: Scottsdale Golf Lifestyle',
  description: 'Privacy policy for Scottsdale Golf Lifestyle. How we collect, use, and protect your information.',
  alternates: { canonical: `${SITE.url}/privacy` },
  openGraph: { url: `${SITE.url}/privacy`, images: [{ url: `${SITE.url}/opengraph-image`, width: 1200, height: 630, alt: 'Scottsdale Golf Lifestyle' }] },
  robots: { index: true, follow: true }
};

const LAST_UPDATED = 'November 2025';

export default function Page() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Privacy Policy', path: '/privacy' }
      ])} />
      <section className="bg-[#062840] text-amber-50">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-3">Legal</div>
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight">Privacy Policy</h1>
          <p className="mt-4 text-emerald-50/70 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>
      <article className="max-w-3xl mx-auto px-6 py-14 prose prose-emerald">
        <h2>1. Who we are</h2>
        <p>Scottsdale Golf Lifestyle (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates the website {SITE.url} (&ldquo;the Site&rdquo;). You can reach us through the <a href="/contact">contact form</a> on the Site.</p>

        <h2>2. Information we collect</h2>
        <p>We collect information you voluntarily provide when you fill out a contact, lead, saved-search, or guide-download form on the Site. This typically includes your name, email address, phone number, and any property preferences you share. We also collect non-personally-identifying information automatically (browser type, referring pages, time of visit) through standard analytics tools.</p>

        <h2>3. How we use your information</h2>
        <ul>
          <li>To respond to your inquiry and provide the information you requested.</li>
          <li>To send occasional updates about Scottsdale real estate, community guides, and saved-search matches you have opted into.</li>
          <li>To share your contact information with trusted collaborator businesses only when you have specifically requested information about their service category.</li>
          <li>To measure traffic and improve the Site through Google Analytics.</li>
        </ul>

        <h2>4. Third-party services</h2>
        <p>We use the following third-party services that may receive limited information about your visit:</p>
        <ul>
          <li><strong>Google Analytics</strong>: aggregated traffic measurement</li>
          <li><strong>Mapbox</strong>: renders interactive maps; usage limited to standard tile-server logs</li>
          <li><strong>HighLevel</strong>: the CRM platform that stores contact information you submit through our forms</li>
        </ul>

        <h2>5. Cookies</h2>
        <p>This Site uses cookies and similar technologies for analytics and to remember your preferences. Most browsers allow you to refuse or delete cookies; doing so may limit some Site functionality.</p>

        <h2>6. Your choices</h2>
        <ul>
          <li><strong>Unsubscribe.</strong> Every email we send includes a one-click unsubscribe link.</li>
          <li><strong>Access, correction, deletion.</strong> Contact us through the <a href="/contact">contact form</a> on the Site to access, correct, or request deletion of personal information we hold about you.</li>
          <li><strong>Do Not Sell or Share (CCPA).</strong> California residents may request that we do not &ldquo;sell&rdquo; or &ldquo;share&rdquo; personal information by submitting a request through the same contact form.</li>
        </ul>

        <h2>7. Consent &amp; users in the European Economic Area, United Kingdom, and Switzerland (GDPR)</h2>
        <p>If you visit this Site from the EEA, the UK, or Switzerland, we (and our service providers, including Google) rely on your <strong>consent</strong> as the lawful basis for placing non-essential cookies. When a consent banner is shown, it will ask you to:</p>
        <ul>
          <li>Consent to the use of cookies and processing of personal data for analytics and measurement; or</li>
          <li>Decline, in which case we will use only strictly-necessary cookies.</li>
        </ul>
        <p>You may withdraw or change your consent at any time by clicking the &ldquo;Manage privacy choices&rdquo; (or similar) link displayed by the consent banner, by clearing cookies for this Site in your browser, or by contacting us through the <a href="/contact">contact form</a> on the Site.</p>
        <p><strong>Your GDPR / UK-GDPR rights.</strong> You have the right to access, rectify, erase, restrict, or port the personal data we hold about you, and the right to object to processing based on legitimate interests. To exercise any of these rights, contact us through the <a href="/contact">contact form</a> on the Site. You also have the right to lodge a complaint with your local data-protection authority.</p>
        <p><strong>Data controller &amp; transfers.</strong> Scottsdale Golf Lifestyle is the data controller for information submitted through this Site. Because our service providers (Google, our CRM provider, Mapbox, etc.) are based in the United States, personal data of EEA/UK/Swiss visitors may be transferred to the U.S. under Standard Contractual Clauses and the EU&ndash;U.S. Data Privacy Framework where applicable.</p>

        <h2>8. Real estate disclosures</h2>
        <p>Information on the Site is provided for general informational purposes and does not constitute a representation, warranty, or guarantee of fact. Property listings, prices, and availability are subject to change without notice. Always verify with a licensed Arizona real-estate professional before making purchasing decisions. Scottsdale Golf Lifestyle is not a substitute for legal, tax, or financial advice.</p>

        <h2>9. Children</h2>
        <p>The Site is not directed to children under 13 and we do not knowingly collect information from them.</p>

        <h2>10. Changes to this policy</h2>
        <p>We may update this policy from time to time. The &ldquo;Last updated&rdquo; date at the top reflects the most recent revision. Material changes will be highlighted on the Site.</p>

        <h2>11. Contact us</h2>
        <p>Questions about this policy? Reach us through the <a href="/contact">contact form</a> on the Site.</p>
      </article>
    </PageShell>
  );
}
