import CommunityDetail from '@/components/community-detail';
import { SITE, findCommunity } from '@/lib/data';
const SLUG = 'westbrook-village';
const c = findCommunity(SLUG);
export const metadata = {
  title: `${c.name} Homes for Sale | Scottsdale, AZ`,
  description: `Homes for sale in ${c.name}, Peoria. ${c.tagline}. Price range ${c.priceRange}. Two private 18-hole courses included with HOA.`,
  alternates: { canonical: `${SITE.url}/communities/${SLUG}` },
  openGraph: { url: `${SITE.url}/communities/${SLUG}`, images: [c.image] }
};
export default function Page() { return <CommunityDetail slug={SLUG} />; }
