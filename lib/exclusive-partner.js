// Exclusive Market Partner — La Quinta.
//
// One realtor per city site. Every page, form, email and PDF that references
// the partner reads from THIS file so that changing the partner is a single-
// file swap. When we launch additional city sites in the portfolio (Palm
// Desert, Rancho Mirage, Bermuda Dunes, PGA West, etc.), each city site will
// ship its own copy of this file with that city's partner.
//
// Facts here MUST be verifiable against the California DRE public register.

export const partner = {
  // Verified from CA DRE public license search (License #01780607).
  status: 'signed', // 'seeking' | 'signed'
  fullLegalName: 'Kathryn Ann Schowe',
  displayName: 'Kathy Schowe',
  headline: 'Exclusive Market Partner · La Quinta Golf Lifestyle',

  dreLicense: '01780607',
  dreLicenseExpires: '2026-11-06',
  licensedSince: 2007,

  brokerage: {
    name: 'California Lifestyle Realty',
    legalEntity: 'HP LQ Brokerage Inc.',
    brokerLicense: '02173353',
    address: '50905 Avenida Bermudas, La Quinta, CA 92253',
  },

  contact: {
    phone: '760-333-8886',
    phoneTel: '+17603338886',
    email: 'schoweproperties@gmail.com',
    website: 'https://schoweproperties.com',
  },

  // Scheduling link. Kathy does not yet publish a Calendly-style link, so we
  // route "book a showing" to her website. She can drop in a real scheduler
  // (Calendly / Cal.com / TidyCal) later — one-line change.
  scheduler: {
    url: 'https://schoweproperties.com',
    label: 'Book a tour with Kathy',
    fallback: 'Or call directly: 760-333-8886',
  },

  associations: ['California Desert Association of REALTORS'],
  specialties: [
    'La Quinta Country Club',
    'The Tradition Golf Club',
    'The Hideaway',
    'The Madison Club',
    'Andalusia Country Club',
    'Coachella Valley luxury and golf real estate',
  ],

  // Headshot. We are NOT hot-linking her photo from third-party sites. When
  // she supplies a signed-off headshot, drop it into /public/partner/ and
  // update this path.
  headshot: {
    src: null,
    alt: 'Kathy Schowe, Exclusive Market Partner for La Quinta Golf Lifestyle',
    // Until an approved headshot is delivered, we render an initials avatar.
    initials: 'KS',
  },

  // Editorial bio — this is what appears next to her on every page and inside
  // the welcome email. Kept short. Anything longer sits on her own dedicated
  // profile page.
  bioShort:
    'Kathy Schowe has represented buyers and sellers in La Quinta and the greater Coachella Valley since 2007. She works out of California Lifestyle Realty on Avenida Bermudas in the heart of La Quinta and specializes in the city\u2019s private golf communities — La Quinta Country Club, The Tradition, Andalusia, The Madison Club, and The Hideaway.',
};

// Helpers used by pages and emails.

export function partnerFullName() {
  return partner.displayName;
}

export function partnerLine() {
  return `${partner.displayName} · DRE #${partner.dreLicense} · ${partner.brokerage.name}`;
}

export function partnerIsSigned() {
  return partner.status === 'signed';
}
