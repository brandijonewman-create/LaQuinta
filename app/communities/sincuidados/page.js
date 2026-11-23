import CommunityDetail from '@/components/community-detail';
import { SITE, findCommunity } from '@/lib/data';
const SLUG = 'sincuidados';
const c = findCommunity(SLUG);
export const metadata = {
  title: `${c.name} Homes for Sale | Scottsdale, AZ`,
  description: `Homes for sale in ${c.name}, north Scottsdale. ${c.tagline}. Price range ${c.priceRange}. Just 99 homesites on 90 boulder-strewn acres next to Troon Country Club.`,
  alternates: { canonical: `${SITE.url}/communities/${SLUG}` },
  openGraph: { url: `${SITE.url}/communities/${SLUG}`, images: [c.image] }
};
export default function Page() { return <CommunityDetail slug={SLUG} />; }
