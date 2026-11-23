'use client';
// Tracked contact link for paid partners: logs partner, contact type and page in GA4.
import { trackEvent } from '@/lib/analytics';

export default function PartnerLink({ href, kind, partner, children, className }) {
  const external = kind === 'website';
  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: '_blank', rel: 'sponsored noopener' } : {})}
      onClick={() =>
        trackEvent('partner_contact', {
          partner,
          contact_type: kind,
          page_path: typeof window !== 'undefined' ? window.location.pathname : '',
        })
      }
    >
      {children}
    </a>
  );
}
