import CommunityDetail from '@/components/community-detail';
import { SITE, findCommunity } from '@/lib/data';
const SLUG = 'dove-valley-ranch';
const c = findCommunity(SLUG);
export const metadata = {
  title: `${c.name} Homes for Sale | Scottsdale, AZ`,
  description: `Homes for sale in ${c.name}, Cave Creek. ${c.tagline}. Price range ${c.priceRange}. Public Robert Trent Jones II championship course.`,
  alternates: { canonical: `${SITE.url}/communities/${SLUG}` },
  openGraph: { url: `${SITE.url}/communities/${SLUG}`, images: [c.image] }
};
export default function Page() { return <CommunityDetail slug={SLUG} />; }
