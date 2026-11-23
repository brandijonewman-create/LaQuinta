import CommunityDetail from '@/components/community-detail';
import { SITE, findCommunity } from '@/lib/data';
const SLUG = 'tatum-ranch';
const c = findCommunity(SLUG);
export const metadata = {
  title: `${c.name} Homes for Sale | Scottsdale, AZ`,
  description: `Homes for sale in ${c.name}. ${c.tagline}. Price range ${c.priceRange}. One of the best entry points into golf-community living below $1M.`,
  alternates: { canonical: `${SITE.url}/communities/${SLUG}` },
  openGraph: { url: `${SITE.url}/communities/${SLUG}`, images: [c.image] }
};
export default function Page() { return <CommunityDetail slug={SLUG} />; }
