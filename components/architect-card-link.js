'use client';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

/**
 * Wraps a Next.js Link to fire a GA4 `architect_card_click` event
 * before the client-side navigation happens. Useful from the
 * /architects index page so that we capture top-of-funnel intent
 * even before the destination page mounts and fires its own
 * `architect_page_view`.
 */
export default function ArchitectCardLink({ slug, name, position, children, className = '' }) {
  function onClick() {
    trackEvent('architect_card_click', {
      architect_slug: slug,
      architect_name: name,
      list_position: typeof position === 'number' ? position : -1,
      source_list: 'architects-index'
    });
  }
  return (
    <Link href={`/architects/${slug}`} onClick={onClick} className={className}>
      {children}
    </Link>
  );
}
