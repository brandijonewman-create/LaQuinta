import SiteHeader from './site-header';
import SiteFooter from './site-footer';

export default function PageShell({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8f2]">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
