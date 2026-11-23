import CommunityDetail from '@/components/community-detail';
import { SITE, findCommunity } from '@/lib/data';
const SLUG = 'carefree-resort-cc';
const c = findCommunity(SLUG);
export const metadata = {
  title: "Carefree Resort & Golf Homes | Scottsdale, AZ",
  description: `Homes for sale at ${c.name}. ${c.tagline}. Price range ${c.priceRange}. 36 holes of semi-private golf, walkable Carefree town center.`,
  alternates: { canonical: `${SITE.url}/communities/${SLUG}` },
  openGraph: { url: `${SITE.url}/communities/${SLUG}`, images: [c.image] }
};
export default function Page() { return <CommunityDetail slug={SLUG} />; }
