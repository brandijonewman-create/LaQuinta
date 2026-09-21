import { notFound } from 'next/navigation';

// Collaborators section DEACTIVATED.
// These detail routes intentionally return 404 and none are pre-rendered.
// The underlying data (lib/collaborators) and UI components are left in
// place so the section can be re-enabled later by restoring this file.

export function generateStaticParams() {
  return [];
}

export const metadata = {
  robots: { index: false, follow: false },
};

export default function CollaboratorPage() {
  notFound();
}
