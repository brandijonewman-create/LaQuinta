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

  // Scheduling link. Placeholder Calendly URL until Kathy provides a live
  // scheduler. Once she shares a real Calendly / Cal.com / TidyCal link,
  // replace `url` below \u2014 one-line change and every "Book a tour" button
  // and welcome email updates automatically.
  scheduler: {
    url: 'https://calendly.com/kathy-schowe/tour-request',
    isPlaceholder: true,
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

  // Headshot sourced from Kathy\u2019s published California Lifestyle Realty
  // agent profile (californialifestylerealty.com/wp-content/uploads/2018/01/
  // website-schowe.jpg) and stored locally so we do not hot-link. Replace
  // with a newer signed-off headshot at the same path any time.
  headshot: {
    src: '/partner/kathy-schowe.jpg',
    alt: 'Kathy Schowe, Exclusive Market Partner for La Quinta Golf Lifestyle',
    // Fallback initials if the image ever fails to load.
    initials: 'KS',
  },

  // Editorial bio \u2014 appears next to Kathy on every page and inside the
  // welcome email. Verified against her published California Lifestyle Realty
  // agent profile.
  bioShort:
    'Kathy Schowe studied Business Marketing at Texas Tech, played collegiate golf, and moved to California in 1989 to play professionally. She joined La Quinta Country Club in 2000 and has represented La Quinta buyers and sellers since 2007, closing more than 67 homes between 2020 and 2024. She lives in La Quinta full-time and works out of California Lifestyle Realty on Avenida Bermudas.',
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
