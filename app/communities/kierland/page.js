import CommunityDetail from '@/components/community-detail';
import { SITE, findCommunity } from '@/lib/data';
const SLUG = 'kierland';
const c = findCommunity(SLUG);
export const metadata = {
  title: `${c.name} Homes for Sale | Scottsdale, AZ`,
  description: `Homes for sale in ${c.name}, North Scottsdale. ${c.tagline}. Price range ${c.priceRange}. Walking distance to Scottsdale Quarter & Kierland Commons.`,
  alternates: { canonical: `${SITE.url}/communities/${SLUG}` },
  openGraph: { url: `${SITE.url}/communities/${SLUG}`, images: [c.image] }
};
export default function Page() { return <CommunityDetail slug={SLUG} />; }
