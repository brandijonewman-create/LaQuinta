import CommunityDetail from '@/components/community-detail';
import { SITE, findCommunity } from '@/lib/data';
const SLUG = 'quintero-golf-cc';
const c = findCommunity(SLUG);
export const metadata = {
  title: "Quintero Golf & CC Homes | Scottsdale, AZ",
  description: `Homes for sale at ${c.name}, Peoria. ${c.tagline}. Price range ${c.priceRange}. Only 220 home cap: ultra-low density private golf.`,
  alternates: { canonical: `${SITE.url}/communities/${SLUG}` },
  openGraph: { url: `${SITE.url}/communities/${SLUG}`, images: [c.image] }
};
export default function Page() { return <CommunityDetail slug={SLUG} />; }
