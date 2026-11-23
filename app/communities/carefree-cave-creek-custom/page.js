import CommunityDetail from '@/components/community-detail';
import { SITE, findCommunity } from '@/lib/data';
const SLUG = 'carefree-cave-creek-custom';
const c = findCommunity(SLUG);
export const metadata = {
  title: `${c.name} | Scottsdale Golf Homes`,
  description: `${c.tagline}. Price range ${c.priceRange}. 1+ acre lots, often no HOA: freedom to build a true legacy estate.`,
  alternates: { canonical: `${SITE.url}/communities/${SLUG}` },
  openGraph: { url: `${SITE.url}/communities/${SLUG}`, images: [c.image] }
};
export default function Page() { return <CommunityDetail slug={SLUG} />; }
