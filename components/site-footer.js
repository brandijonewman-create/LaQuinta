import Link from 'next/link';
import { SITE } from '@/lib/data';
import { MapPin } from 'lucide-react';

export default function SiteFooter() {
  return (
    <footer className="bg-[#062840] text-emerald-50/80 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-12 gap-10">
        {/* Brand + contact */}
        <div className="md:col-span-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center text-[#062840] font-serif font-bold text-xl">S</div>
            <div>
              <div className="font-serif text-xl text-amber-50">Scottsdale Golf Lifestyle</div>
              <div className="text-xs uppercase tracking-[0.25em] text-emerald-200/60">Luxury Real Estate</div>
            </div>
          </div>
          <p className="text-sm leading-relaxed max-w-md text-emerald-50/65">A curated platform for luxury golf-course real estate in Scottsdale, Arizona, and a collaborative of the trusted service professionals every Scottsdale homeowner eventually needs.</p>
        </div>

        {/* Explore */}
        <div className="md:col-span-3">
          <div className="font-serif text-amber-100 mb-4">Explore</div>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-amber-300" href="/scottsdale-golf-community-index-2026">2026 Community Index</Link></li>
            <li><Link className="hover:text-amber-300" href="/community-quiz">Community Quiz</Link></li>
            <li><Link className="hover:text-amber-300" href="/scottsdale-communities">Communities by Lifestyle</Link></li>
            <li><Link className="hover:text-amber-300" href="/scottsdale-lifestyle-map">Lifestyle Map</Link></li>
            <li><Link className="hover:text-amber-300" href="/communities">Golf Communities</Link></li>
            <li><Link className="hover:text-amber-300" href="/architects">Course Architects</Link></li>
            <li><Link className="hover:text-amber-300" href="/golf-clubs">Private Clubs</Link></li>
            <li><Link className="hover:text-amber-300" href="/relocating-to-scottsdale">Relocating Guide</Link></li>
          </ul>
        </div>

        {/* Learn */}
        <div className="md:col-span-3">
          <div className="font-serif text-amber-100 mb-4">Learn</div>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-amber-300" href="/blog">Journal</Link></li>
            <li><Link className="hover:text-amber-300" href="/market-reports">Market Reports</Link></li>
            <li><Link className="hover:text-amber-300" href="/scottsdale-club-membership-costs-2026">Club Membership Costs</Link></li>
            <li><Link className="hover:text-amber-300" href="/scottsdale-snowbird-guide">Snowbird Guide</Link></li>
            <li><Link className="hover:text-amber-300" href="/guides/scottsdale-buyers-guide-2026">Buyer&rsquo;s Guide</Link></li>
            <li><Link className="hover:text-amber-300" href="/scottsdale-home-value">Home Valuation</Link></li>
            <li><Link className="hover:text-amber-300" href="/collaborators">Collaborators</Link></li>
          </ul>
        </div>

        {/* Connect */}
        <div className="md:col-span-2">
          <div className="font-serif text-amber-100 mb-4">Connect</div>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-amber-300" href="/about">About</Link></li>
            <li><Link className="hover:text-amber-300" href="/contact">Contact</Link></li>
            <li><Link className="hover:text-amber-300" href="/collaborators">The Collaborative</Link></li>
            <li><Link className="hover:text-amber-300" href="/partner-with-us">Partner With Us</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-emerald-50/10 py-5 px-6 max-w-7xl mx-auto">
        <div className="text-xs text-emerald-50/40 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>&copy; {new Date().getFullYear()} 7671 Enterprises, LLC DBA Golf Lifestyle Network. All rights reserved.</div>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-amber-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-amber-300">Terms of Use</Link>
            <Link href="/disclosure" className="hover:text-amber-300">Disclosure</Link>
            <span>Equal Housing Opportunity</span>
          </div>
        </div>
        <div className="mt-3 text-[10px] text-emerald-50/30 leading-relaxed">
          Scottsdale Golf Lifestyle is operated by 7671 Enterprises, LLC DBA Golf Lifestyle Network, owner and operator. It is built in partnership with Arizona-licensed real estate professionals. We are not a real estate brokerage. See our <Link href="/privacy" className="underline hover:text-amber-300">Privacy Policy</Link> for details on cookies and analytics.
        </div>
      </div>
    </footer>
  );
}
