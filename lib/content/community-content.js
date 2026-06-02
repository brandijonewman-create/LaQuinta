// Extended placeholder content per community.
// Numeric figures use 'TBD' until the owner provides verified copy.
// FAQs are honest — no fabricated price points, no invented owner names.

const defaultImage = 'https://images.pexels.com/photos/10831185/pexels-photo-10831185.jpeg';

const DEFAULT_FAQ = [
  {
    q: 'Is this site affiliated with the club?',
    a: 'No. La Quinta Golf Lifestyle is an independent guide. We have no formal affiliation with any private club referenced on the site.',
  },
  {
    q: 'Can you list a home in this community for me?',
    a: 'No. We do not list, broker, or sell real estate. A live IDX listings feed will appear on the site only when a verified California CARETS/CRMLS feed and a licensed-agent partner are in place.',
  },
];

export const communityContent = {
  'the-madison-club': {
    image: 'https://images.pexels.com/photos/14869685/pexels-photo-14869685.jpeg',
    tagline: 'A Tom Fazio routing inside one of La Quinta\u2019s most discreet private gates.',
    overview:
      'The Madison Club is a Tom Fazio-designed private community in the southern half of La Quinta. The full long-form profile — including membership cadence, real-estate character, and the club\u2019s social rhythm — is in development.',
    quickFacts: [
      { label: 'City', value: 'La Quinta, CA' },
      { label: 'Architect', value: 'Tom Fazio' },
      { label: 'Course type', value: '18-hole private' },
      { label: 'Membership', value: 'Equity — TBD' },
      { label: 'Founded', value: 'TBD' },
    ],
    sections: [
      { heading: 'The course', body: 'TBD — verified Fazio routing notes in development.' },
      { heading: 'Membership & access', body: 'TBD — we will not publish a fabricated initiation figure.' },
      { heading: 'The real estate', body: 'TBD — lot character, architectural language, and typical price range.' },
    ],
    faqs: [
      {
        q: 'Is The Madison Club accepting new members?',
        a: 'Membership status changes; verify directly with the club. We do not publish member-status figures we have not confirmed.',
      },
      {
        q: 'What is the architectural style at The Madison Club?',
        a: 'The community is dominated by large-scale custom Spanish-Mediterranean and contemporary California estates on substantial lots.',
      },
      ...DEFAULT_FAQ,
    ],
  },
  'the-hideaway': {
    image: 'https://images.unsplash.com/photo-1621881806763-1b8128f374a7',
    tagline: 'Two courses, one gate — Pete Dye and Clive Clark in La Quinta.',
    overview:
      'The Hideaway is a 36-hole private community with separate Pete Dye and Clive Clark routings. Full long-form profile in development.',
    quickFacts: [
      { label: 'City', value: 'La Quinta, CA' },
      { label: 'Architects', value: 'Pete Dye · Clive Clark' },
      { label: 'Course type', value: 'Two 18-hole private courses' },
      { label: 'Membership', value: 'Equity — TBD' },
      { label: 'Founded', value: 'TBD' },
    ],
    sections: [
      { heading: 'The two courses', body: 'TBD — Dye vs. Clark comparison in development.' },
      { heading: 'Membership & access', body: 'TBD.' },
      { heading: 'The real estate', body: 'TBD.' },
    ],
    faqs: [
      {
        q: 'How are the two Hideaway courses different?',
        a: 'The Pete Dye course leans into the architect\u2019s signature visual intimidation; the Clive Clark course is widely considered the more member-friendly daily play. Verified course-by-course notes in development.',
      },
      ...DEFAULT_FAQ,
    ],
  },
  'pga-west': {
    image: 'https://images.pexels.com/photos/8334036/pexels-photo-8334036.jpeg',
    tagline: 'Six courses, four architects, a deep PGA Tour history.',
    overview:
      'PGA West is the largest private-and-resort golf community in La Quinta, with multiple courses by Pete Dye, Jack Nicklaus, Greg Norman, and Tom Weiskopf. Full multi-architect breakdown in development.',
    quickFacts: [
      { label: 'City', value: 'La Quinta, CA' },
      { label: 'Architects', value: 'Dye, Nicklaus, Norman, Weiskopf' },
      { label: 'Course count', value: 'Six 18-hole courses' },
      { label: 'Membership', value: 'Multiple tiers — TBD' },
      { label: 'Founded', value: '1986' },
    ],
    sections: [
      { heading: 'The six courses', body: 'TBD — dedicated breakdown of Stadium, Nicklaus Tournament, Norman, Weiskopf, Greg Norman Private, and Jack Nicklaus Private.' },
      { heading: 'Membership tiers', body: 'TBD — we will not publish numbers we have not independently confirmed.' },
      { heading: 'The real estate', body: 'TBD — from entry-level condos to estate homes, PGA West has the widest range of any La Quinta community.' },
    ],
    faqs: [
      {
        q: 'How many courses are there at PGA West?',
        a: 'Six 18-hole courses across resort and private membership. Three are private-only; the others have resort access.',
      },
      {
        q: 'Who designed the PGA West Stadium course?',
        a: 'Pete Dye. The Stadium course was completed in 1986 and remains one of the most photographed resort courses in American golf.',
      },
      {
        q: 'Does PGA West offer non-resident memberships?',
        a: 'PGA West has historically offered multiple membership tiers including non-resident options; specifics change. Verify current availability directly with the club.',
      },
      ...DEFAULT_FAQ,
    ],
  },
  'the-tradition-golf-club': {
    image: 'https://images.unsplash.com/photo-1590912550141-1448da2bd5da',
    tagline: 'Arnold Palmer\u2019s only Coachella Valley design, set against the cove.',
    overview:
      'The Tradition is Arnold Palmer\u2019s only Coachella Valley design. Full long-form profile in development.',
    quickFacts: [
      { label: 'City', value: 'La Quinta, CA' },
      { label: 'Architect', value: 'Arnold Palmer' },
      { label: 'Course type', value: '18-hole private' },
      { label: 'Membership', value: 'Equity — TBD' },
      { label: 'Founded', value: '1997' },
    ],
    sections: [
      { heading: 'The course', body: 'TBD.' },
      { heading: 'Membership & access', body: 'TBD.' },
      { heading: 'The real estate', body: 'TBD.' },
    ],
    faqs: [
      {
        q: 'Is The Tradition the only Arnold Palmer design in the Coachella Valley?',
        a: 'Yes — it is Palmer\u2019s only Coachella Valley design.',
      },
      ...DEFAULT_FAQ,
    ],
  },
  'andalusia-country-club': {
    image: 'https://images.pexels.com/photos/8065818/pexels-photo-8065818.jpeg',
    tagline: 'A Rees Jones design at the southern edge of La Quinta.',
    overview:
      'Andalusia Country Club is a Rees Jones-designed private community known for modern Spanish architecture. Full long-form profile in development.',
    quickFacts: [
      { label: 'City', value: 'La Quinta, CA' },
      { label: 'Architect', value: 'Rees Jones' },
      { label: 'Course type', value: '18-hole private' },
      { label: 'Membership', value: 'Equity — TBD' },
      { label: 'Founded', value: 'TBD' },
    ],
    sections: [
      { heading: 'The course', body: 'TBD.' },
      { heading: 'Membership & access', body: 'TBD.' },
      { heading: 'The real estate', body: 'TBD — modern Spanish-Mediterranean homes are the dominant architectural language.' },
    ],
    faqs: [
      {
        q: 'What is the architectural style at Andalusia?',
        a: 'Modern Spanish-Mediterranean is the dominant language, with newer contemporary California homes appearing in later phases.',
      },
      ...DEFAULT_FAQ,
    ],
  },
  'the-quarry-at-la-quinta': {
    image: 'https://images.pexels.com/photos/14869685/pexels-photo-14869685.jpeg',
    tagline: 'A Tom Fazio routing on an old rock quarry site.',
    overview:
      'The Quarry at La Quinta is a Tom Fazio-designed private community on a former rock quarry. Full long-form profile in development.',
    quickFacts: [
      { label: 'City', value: 'La Quinta, CA' },
      { label: 'Architect', value: 'Tom Fazio' },
      { label: 'Course type', value: '18-hole private' },
      { label: 'Membership', value: 'Equity — TBD' },
      { label: 'Founded', value: 'TBD' },
    ],
    sections: [
      { heading: 'The course', body: 'TBD.' },
      { heading: 'Membership & access', body: 'TBD.' },
      { heading: 'The real estate', body: 'TBD.' },
    ],
    faqs: [
      {
        q: 'Why is it called The Quarry?',
        a: 'The property was a working rock quarry before Fazio routed the course through and around the existing topography.',
      },
      ...DEFAULT_FAQ,
    ],
  },
  'la-quinta-country-club': {
    image: 'https://images.pexels.com/photos/10831185/pexels-photo-10831185.jpeg',
    tagline: 'The original La Quinta club — founded 1959.',
    overview:
      'La Quinta Country Club is the original private club in La Quinta, founded in 1959, walking distance to the La Quinta Resort and the Cove. Full long-form profile in development.',
    quickFacts: [
      { label: 'City', value: 'La Quinta, CA' },
      { label: 'Architect', value: 'Lawrence Hughes (historic)' },
      { label: 'Course type', value: '18-hole private' },
      { label: 'Membership', value: 'Equity — TBD' },
      { label: 'Founded', value: '1959' },
    ],
    sections: [
      { heading: 'The course', body: 'TBD.' },
      { heading: 'Membership & access', body: 'TBD.' },
      { heading: 'The real estate', body: 'TBD — the surrounding neighborhood is one of La Quinta\u2019s most established.' },
    ],
    faqs: [
      {
        q: 'Is La Quinta Country Club the oldest private club in the city?',
        a: 'Yes — it was founded in 1959 and predates every other private club in La Quinta.',
      },
      ...DEFAULT_FAQ,
    ],
  },
};

export function getCommunityContent(slug) {
  return communityContent[slug] || {
    image: defaultImage,
    tagline: 'Coming soon.',
    overview: 'Long-form profile in development.',
    quickFacts: [],
    sections: [],
    faqs: DEFAULT_FAQ,
  };
}
