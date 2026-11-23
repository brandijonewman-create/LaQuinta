import CommunityDetail from '@/components/community-detail';
import { SITE, findCommunity } from '@/lib/data';

const SLUG = 'dc-ranch';
const c = findCommunity(SLUG);
export const metadata = {
  title: `${c.name} Homes for Sale | Scottsdale, AZ`,
  description: `Homes for sale in ${c.name}, Scottsdale. ${c.tagline}. Current price range ${c.priceRange}. Home of The Country Club at DC Ranch.`,
  alternates: { canonical: `${SITE.url}/communities/${SLUG}` },
  openGraph: { url: `${SITE.url}/communities/${SLUG}`, images: [c.image] }
};
export default function Page() { return <CommunityDetail slug={SLUG} />; }
