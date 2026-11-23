// Editorial "lifestyle" pages, freely readable neighborhood, amenity and
// district features that support La Quinta buyer research. These are
// intentionally NOT lead-gated (they're the top of the SEO funnel).

const FRITZ_BURNS_INTRO = 'Fritz Burns Park is the daily-use community park at the north edge of the Cove in La Quinta, off Avenida Bermudas, a walk-able open-space, tennis and pickleball complex with a public pool and shaded turf that anchors the residential fabric of the historic hillside neighborhood south of Old Town. For buyers researching La Quinta, the park is one of the most-cited quality-of-life amenities on the west side of the city, it is the reason many Cove homes are priced with a walk-to-park premium, and it is the practical answer to the "what do you actually do here on a Tuesday morning" question that most seasonal buyers eventually ask.';

const BEAR_CREEK_INTRO = 'The Bear Creek Trail is the north-south recreational corridor that runs along the base of the Santa Rosa Mountains through La Quinta, following the historic Bear Creek flood-control alignment. It is one of the two most-used pedestrian, running and cycling routes in the city (the other being the Coachella Valley\u2019s CV Link), and it is the walkability argument that separates the Cove and the resort-side of La Quinta from the newer master-planned communities to the south. The trail is paved, well-drained, and open from before dawn through late evening, its accessibility is one of the reasons real-estate values on the trail-adjacent streets have held up over multiple market cycles.';

const OLD_TOWN_INTRO = 'Old Town La Quinta is the pedestrian retail-and-dining core of the city, laid out around a Spanish-and-Mediterranean village plan on Main Street between Calle Estado and Calle Tampico. It is not a historic district in the deed-restricted sense, the buildings were developed in the late 1990s and early 2000s in a purpose-built village aesthetic, but the ensemble reads as the closest thing La Quinta has to a downtown, with independent restaurants, wine bars, a Saturday farmers\u2019 market in season, and public events across the calendar year. For buyers, its practical importance is walkability: the Cove and much of the resort-side residential product is within a short walk or a five-minute drive, and Old Town is the answer to the "will I ever get out of the gate" concern.';

export const LIFESTYLE_PAGES = {
  'fritz-burns-park': {
    title: 'Fritz Burns Park, La Quinta',
    tagline: 'The daily-use community park at the north edge of the Cove.',
    metaTitle: 'Fritz Burns Park, La Quinta, Editorial Neighborhood Guide',
    metaDescription: 'An editorial guide to Fritz Burns Park in La Quinta, the public pool, tennis, pickleball, turf and shade complex at the north edge of the Cove neighborhood, and why it matters for buyer real-estate research.',
    heroImage: '/images/hero/homepage-hero.jpg',
    eyebrow: 'La Quinta Lifestyle · Parks',
    intro: FRITZ_BURNS_INTRO,
    sections: [
      {
        heading: 'What\u2019s inside the park',
        body: 'The park\u2019s active-use footprint runs across a public swimming pool, several tennis courts, a pickleball complex that has expanded materially over recent years, open turf usable for informal recreation, and shaded picnic areas that are heavily used by families through the winter and shoulder seasons. In practice, it functions as the "third place" of the Cove neighborhood, a place residents go when they aren\u2019t at home and aren\u2019t at Old Town.',
      },
      {
        heading: 'Why it matters for buyers',
        body: 'Two things. First, the park is one of the reasons walkability is a defensible price attribute in this part of La Quinta, a Cove home with a five- or ten-minute walk to Fritz Burns often prices at a meaningful premium versus otherwise-similar inventory that is car-dependent. Second, the pickleball and tennis programming inside the park has become a genuine social hub, and for seasonal buyers who want in-place recreation rather than club membership, this is a material factor.',
      },
      {
        heading: 'Practical notes',
        body: 'Access is public. Parking is on-street on Avenida Bermudas and adjacent side streets. Pool schedules, tennis court reservations and event calendars are managed by the City of La Quinta and its programming partners, confirm current hours and any reservation requirements with the City before making it part of a buyer\u2019s decision framework.',
      },
    ],
    faqs: [
      {
        q: 'Where is Fritz Burns Park in La Quinta?',
        a: 'The park sits at the north edge of the Cove neighborhood off Avenida Bermudas, walkable to Old Town La Quinta.',
      },
      {
        q: 'Is the swimming pool at Fritz Burns Park public?',
        a: 'Yes. The public pool is operated by the City of La Quinta with seasonal hours, confirm the current schedule with the City.',
      },
      {
        q: 'Does the park have pickleball courts?',
        a: 'Yes. Pickleball has been a growing part of the park\u2019s programming, and the court footprint has expanded materially over recent years.',
      },
    ],
    related: [
      { label: 'The Cove at La Quinta', href: '/communities/the-cove-at-la-quinta' },
      { label: 'Old Town La Quinta',    href: '/lifestyle/old-town-la-quinta' },
      { label: 'Bear Creek Trail',      href: '/lifestyle/bear-creek-trail' },
    ],
  },

  'bear-creek-trail': {
    title: 'Bear Creek Trail, La Quinta',
    tagline: 'The Santa Rosa foothill trail that runs the length of the west side of La Quinta.',
    metaTitle: 'Bear Creek Trail, La Quinta, Editorial Neighborhood Guide',
    metaDescription: 'An editorial guide to the Bear Creek Trail in La Quinta, the paved north-south recreational corridor along the Santa Rosa Mountains, and why it anchors the Cove\u2019s walkability premium.',
    heroImage: '/images/hero/homepage-hero.jpg',
    eyebrow: 'La Quinta Lifestyle · Trails',
    intro: BEAR_CREEK_INTRO,
    sections: [
      {
        heading: 'What the trail actually is',
        body: 'Bear Creek Trail is a paved multi-use path built along the historic Bear Creek flood-control channel at the base of the Santa Rosa Mountains. It is open to pedestrians and cyclists, is well-signed, and connects the north end of La Quinta near Old Town with the residential streets of the Cove and the mountain-base terminus points to the south. It is not a wilderness trail, the surface is engineered and the alignment is close to residential streets, but the elevation and the mountain wall give it the character of one.',
      },
      {
        heading: 'Why it matters for real estate',
        body: 'The trail is the single most-cited "amenity within walking distance" argument on Cove listings, and its accessibility is one reason older Cove inventory has appreciated on comps that traditional golf-community pricing wouldn\u2019t predict. Buyers who make morning walks or cycling a daily habit consistently rank trail-adjacent addresses ahead of otherwise-similar interior-lot homes.',
      },
      {
        heading: 'What to check on a tour',
        body: 'Ask the listing agent how the specific address connects to the trail, some Cove homes are three houses off a trail entrance and some are five blocks. Ask about morning noise, cyclists, and any known trail-widening or resurfacing projects. Ask about lighting and evening use patterns, especially in the summer months when the trail is most crowded early and late in the day.',
      },
    ],
    faqs: [
      {
        q: 'Is Bear Creek Trail paved?',
        a: 'Yes. Bear Creek Trail is paved multi-use pathway suitable for walking, running and cycling.',
      },
      {
        q: 'How long is Bear Creek Trail?',
        a: 'The trail runs the length of the west side of La Quinta along the Santa Rosa foothill line, connecting the Old Town/Cove area with the mountain-base terminus points to the south.',
      },
      {
        q: 'Is the trail lit at night?',
        a: 'Lighting varies by segment. Verify current lighting and evening use patterns with the City of La Quinta before planning after-dark use.',
      },
    ],
    related: [
      { label: 'The Cove at La Quinta', href: '/communities/the-cove-at-la-quinta' },
      { label: 'Fritz Burns Park',      href: '/lifestyle/fritz-burns-park' },
      { label: 'Old Town La Quinta',    href: '/lifestyle/old-town-la-quinta' },
    ],
  },

  'old-town-la-quinta': {
    title: 'Old Town La Quinta',
    tagline: 'The pedestrian village retail-and-dining core of the city.',
    metaTitle: 'Old Town La Quinta, Editorial District Guide',
    metaDescription: 'An editorial guide to Old Town La Quinta, the pedestrian retail-and-dining village on Main Street that anchors walkability for the Cove, La Quinta Country Club and resort-side residential product.',
    heroImage: '/images/hero/homepage-hero.jpg',
    eyebrow: 'La Quinta Lifestyle · Districts',
    intro: OLD_TOWN_INTRO,
    sections: [
      {
        heading: 'What Old Town is (and isn\u2019t)',
        body: 'Old Town La Quinta is a purpose-built pedestrian village that opened in the late 1990s and grew across the early 2000s. It reads as historic because of the Spanish-and-Mediterranean material palette and the compact village plan, but it is not a preserved historic district in the deed-restricted sense. What it is, functionally, is the walkable retail-and-dining core of a city that would otherwise be a suburban master-planned car-dependent grid.',
      },
      {
        heading: 'The dining and event calendar',
        body: 'Old Town anchors independent restaurants, wine bars, a rotating retail mix, and a seasonal farmers\u2019 market on Sunday mornings from late fall through spring. The city\u2019s outdoor events, art walks, seasonal concerts, holiday programming, typically stage on or around Main Street. Summer is quieter (Coachella Valley summer volume drops materially city-wide) but the district reactivates by October.',
      },
      {
        heading: 'Why it matters for buyers',
        body: 'For a La Quinta buyer, Old Town is the primary answer to walkability. The Cove is a five- to fifteen-minute walk depending on address. La Quinta Country Club is a fifteen-minute walk or a five-minute drive. Resort-side residential (Santa Rosa Cove, Duna La Quinta, Legacy Villas) is a comparable easy drive. If evening walkability to restaurants matters to how the buyer will actually live in the home, Old Town is the reason to look at Cove, LQCC and resort-side product before considering the newer gated communities to the south.',
      },
    ],
    faqs: [
      {
        q: 'Is Old Town La Quinta a historic district?',
        a: 'It reads as historic because of the Spanish-and-Mediterranean village architecture, but Old Town is a purpose-built pedestrian retail district developed in the late 1990s and early 2000s. It is not a deed-restricted historic district.',
      },
      {
        q: 'What is at Old Town La Quinta?',
        a: 'Independent restaurants, wine bars, a rotating retail mix, and a seasonal Sunday-morning farmers\u2019 market from late fall through spring, plus the city\u2019s outdoor art walks, seasonal concerts and holiday programming.',
      },
      {
        q: 'Which La Quinta communities are walkable to Old Town?',
        a: 'The Cove and La Quinta Country Club neighborhoods are the most walkable to Old Town. Resort-side communities (Santa Rosa Cove, Duna La Quinta, Legacy Villas) are a short drive.',
      },
    ],
    related: [
      { label: 'The Cove at La Quinta',       href: '/communities/the-cove-at-la-quinta' },
      { label: 'La Quinta Country Club',      href: '/communities/la-quinta-country-club' },
      { label: 'Fritz Burns Park',            href: '/lifestyle/fritz-burns-park' },
    ],
  },
};

export function getLifestylePage(slug) {
  return LIFESTYLE_PAGES[slug] || null;
}

export function getLifestyleSlugs() {
  return Object.keys(LIFESTYLE_PAGES);
}
