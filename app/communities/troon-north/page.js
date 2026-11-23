import CommunityDetail from '@/components/community-detail';
import { SITE, findCommunity } from '@/lib/data';

const SLUG = 'troon-north';
const c = findCommunity(SLUG);
export const metadata = {
  title: `${c.name} Homes for Sale | Scottsdale, AZ`,
  description: `Homes for sale in ${c.name}, Scottsdale. ${c.tagline}. Current price range ${c.priceRange}. Monument & Pinnacle top-100 public courses.`,
  alternates: { canonical: `${SITE.url}/communities/${SLUG}` },
  openGraph: { url: `${SITE.url}/communities/${SLUG}`, images: [c.image] }
};
export default function Page() { return <CommunityDetail slug={SLUG} />; }
