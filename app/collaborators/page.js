import { notFound } from 'next/navigation';

// Collaborators section DEACTIVATED.
// This index route intentionally returns 404. The underlying data
// (lib/collaborators) and UI components are left in place so the section
// can be re-enabled later by restoring this file from git history.

export const metadata = {
  robots: { index: false, follow: false },
};

export default function CollaboratorsIndexPage() {
  notFound();
}
