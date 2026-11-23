import CommunityDetail from '@/components/community-detail';
import { SITE, findCommunity } from '@/lib/data';
const SLUG = 'whisper-rock';
const c = findCommunity(SLUG);
export const metadata = { title: `${c.name} Homes for Sale | Scottsdale, AZ`, description: `Homes for sale in ${c.name}, North Scottsdale. ${c.tagline}. Price range ${c.priceRange}.`, alternates: { canonical: `${SITE.url}/communities/${SLUG}` },
  openGraph: { url: `${SITE.url}/communities/${SLUG}`, images: [c.image] } };
export default function Page() { return <CommunityDetail slug={SLUG} />; }
