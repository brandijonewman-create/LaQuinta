// Exclusive Market Partner slot — La Quinta.
//
// The business model is one realtor per city site. When a partner is signed,
// their details live in this file and every page, form, email and PDF that
// references the partner reads from here so that changing the partner is a
// single-file swap.
//
// Right now the La Quinta slot is OPEN and the site is being actively marketed
// to prospective partners. When `status === 'open'`, consumer components
// render the "Become La Quinta Golf Lifestyle's Realtor" recruitment pitch
// in place of the partner card, and every inbound lead routes to OWNER_EMAIL
// only (see /app/lib/email.js).
//
// To sign a partner:
//   1. Set `status: 'signed'`
//   2. Fill out the `signed` object below with verified details (name, DRE
//      license, brokerage, phone — all verifiable against the CA DRE public
//      register).
//   3. Remove or update `CONTACT_TEST_MODE` in .env so partner notification
//      emails start flowing.

export const partner = {
  status: 'open', // 'open' | 'signed'

  // Data used across the site when the slot is OPEN — no realtor's name,
  // photo or contact info anywhere. All "connect / tour / represent" CTAs
  // point at the universal contact form.
  displayName: 'La Quinta Golf Lifestyle',
  headline: 'Exclusive Market Partner slot · open',

  // When status === 'signed', these get populated. Left as `null` while open
  // so any accidental read surfaces a null and not a stale name.
  signed: null,
};

// Recruitment-pitch config used by the homepage "Become Our Realtor" section
// and the /#become-our-partner anchor. Edit this file (and only this file)
// when the pitch changes.
export const partnerRecruitment = {
  eyebrow: 'Realtor Opportunity · La Quinta',
  headline: 'Become La Quinta Golf Lifestyle\u2019s Exclusive Realtor.',
  subhead:
    'One realtor per city. Every buyer inquiry from this site routes to you \u2014 no lead-share, no ad auction, no round-robin.',
  points: [
    {
      title: 'Every lead. Not a share.',
      body:
        'Every quiz result, every guide download, every contact form on the site is a warm inbound buyer inquiry, and it goes to one person. Yours.',
    },
    {
      title: 'Editorial, not classified.',
      body:
        'You are the licensed professional on a full editorial guide to La Quinta\u2019s seven private clubs \u2014 architects, membership economics, price bands. Buyers arrive informed and ready to tour.',
    },
    {
      title: 'Geographic exclusivity.',
      body:
        'One partner per city site. The La Quinta market is not sub-divided among competing agents or a franchise network.',
    },
    {
      title: 'Built and maintained for you.',
      body:
        'Content, SEO, hosting, email deliverability, PDF assets, and the quiz funnel are already live. You bring the license and the market fluency; the platform is turnkey.',
    },
  ],
  form: {
    subject: 'the La Quinta Exclusive Market Partner slot',
    intro:
      'Send us a note. We\u2019ll reply within one business day with the current terms, the traffic and lead history, and a short conversation to confirm fit.',
    submitLabel: 'Request the partnership brief',
  },
};

// Helpers used by pages and emails.

export function partnerIsSigned() {
  return partner.status === 'signed';
}
