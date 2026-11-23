// Exclusive Market Partner slot, La Quinta.
//
// The business model is one realtor per city site. Access is BY INVITATION.
// The featured realtor pays nothing; in exchange they provide their active
// listings, every photo and all the detail, which we feature across the
// site for home search, and, when possible, introductions to home builders
// and other tier-one operators (developers, club GMs, private lenders) who
// fit the same buyer profile. In return every buyer inquiry on the site
// routes to them, their listings are featured, and they own the exclusive
// placement across the site.
//
// When a partner is signed, their details live in this file and every
// page, form, email and PDF that references the partner reads from here
// so that changing the partner is a single-file swap.
//
// Right now the La Quinta slot is OPEN. Consumer components render the
// invitation pitch in place of the partner card, and every inbound lead
// routes to OWNER_EMAIL only (see /app/lib/email.js).
//
// To sign a partner:
//   1. Set `status: 'signed'`
//   2. Fill out the `signed` object below with verified details.
//   3. Wire the partner's active listings (photos and detail) into the
//      homes-for-sale section so buyers can browse them on the site.

export const partner = {
  status: 'open', // 'open' | 'signed'

  // Data used across the site when the slot is OPEN, no realtor's name,
  // photo or contact info anywhere. All "connect / tour / represent" CTAs
  // point at the universal contact form.
  displayName: 'La Quinta Golf Lifestyle',
  headline: 'Exclusive Market Partner slot \u00b7 by invitation',

  // When status === 'signed', these get populated. Left as `null` while open
  // so any accidental read surfaces a null and not a stale name.
  signed: null,
};

// Invitation pitch used by the homepage "For Realtors" section and the
// /#become-our-partner anchor. Edit this file (and only this file) when
// the pitch changes.
export const partnerRecruitment = {
  eyebrow: 'By Invitation \u00b7 La Quinta',
  headline: 'The exclusive La Quinta realtor slot is filled by invitation.',
  subhead:
    'One realtor per city, by invitation. The invited partner provides their active listings, every photo and all the detail, which we feature for home search on the site, and, where possible, introductions to home builders and other tier-one operators. In return every buyer inquiry on the site routes to them, their listings are featured across the guide, and they hold the market exclusively.',
  points: [
    {
      title: 'Every lead. Not a share.',
      body:
        'Every quiz result, every guide download, every contact form on the site is a warm inbound buyer inquiry, and it goes to one person. Yours.',
    },
    {
      title: 'Your listings. Featured across the site.',
      body:
        'Your active listings, every photo and all the detail, power the home-search experience. They are featured on the homepage, on community pages, and inside our editorial guides.',
    },
    {
      title: 'Editorial, not classified.',
      body:
        'You are the licensed professional on a full editorial guide to La Quinta\u2019s golf and gated communities, architects, membership economics, price bands. Buyers arrive informed and ready to tour.',
    },
    {
      title: 'Geographic exclusivity.',
      body:
        'One partner per city site. The La Quinta market is not sub-divided among competing agents or a franchise network.',
    },
    {
      title: 'What we ask in return.',
      body:
        'Your active listings, photos and all the detail, for the on-site home search, and when opportunities arise, warm introductions to home builders and other tier-one operators who fit our buyer profile. That\u2019s it.',
    },
    {
      title: 'Built and maintained for you.',
      body:
        'Content, SEO, hosting, email deliverability, PDF assets, and the quiz funnel are already live. You bring the license, the local relationships, and your listings; the platform is turnkey.',
    },
  ],
  form: {
    subject: 'the La Quinta Exclusive Market Partner slot',
    intro:
      'The slot is by invitation, but if you\u2019d like to be considered, tell us about your practice, California DRE license, brokerage, La Quinta production and the active listings you\u2019d bring. We\u2019ll reach out only if there\u2019s a mutual fit.',
    submitLabel: 'Introduce yourself',
  },
  // A second CTA aimed at home builders and tier-one operators (developers,
  // private lenders, club GMs) who want to be considered for editorial
  // partnerships adjacent to the realtor slot.
  builderCTA: {
    eyebrow: 'Home builders & tier-one operators',
    headline: 'Building or operating in La Quinta?',
    body:
      'We welcome introductions to home builders, developers, private lenders and club operators who fit our buyer profile. Tell us the fit and we\u2019ll take it from there.',
    submitLabel: 'Introduce a builder or operator',
    subject: 'Home builder / tier-one operator introduction',
  },
};

// Helpers used by pages and emails.

export function partnerIsSigned() {
  return partner.status === 'signed';
}
