import { DIRECTORY_LIVE } from '@/lib/directory';

// Phase 1: built, not live. Every /guide page stays out of search until launch.
export const metadata = DIRECTORY_LIVE ? {} : { robots: { index: false, follow: false } };

export default function GuideLayout({ children }) {
  return children;
}
