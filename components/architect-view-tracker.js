'use client';
import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

/**
 * Fires a GA4 `architect_page_view` event once on mount.
 * Drop into a server-rendered architect detail page to capture engagement
 * with the architect deep-dive content as a conversion signal.
 *
 * @param {string} slug      - The architect slug (e.g. "tom-fazio")
 * @param {string} name      - The architect display name
 * @param {number} courses   - The count of Scottsdale courses by this architect
 */
export default function ArchitectViewTracker({ slug, name, courses }) {
  useEffect(() => {
    trackEvent('architect_page_view', {
      architect_slug: slug,
      architect_name: name,
      course_count: courses || 0
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
