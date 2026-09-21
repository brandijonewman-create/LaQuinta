// Long-form community content. Verified factual scaffolding only; no
// fabricated price points, no invented owner names, no celebrity addresses.
// Each numeric is presented as a range or labeled 'historically known to' /
// 'widely understood as' to keep the editorial honest.

const defaultImage = '/images/communities/la-quinta-country-club.jpg';

const DEFAULT_FAQ = [
  { q: 'Is this site affiliated with the club?',           a: 'No. La Quinta Golf Lifestyle has no formal affiliation with any private club referenced on the site. We do partner with California-licensed real estate professionals who specialize in La Quinta clubs.' },
  { q: 'Can you list a home in this community for me?',    a: 'We work with California-licensed real estate partners. The live IDX listings feed appears once the CARETS/CRMLS feed and partner agent are in place.' },
];

export const communityContent = {
  'the-madison-club': {
    image: '/images/communities/the-madison-club.jpg',
    tagline: 'A Tom Fazio routing inside one of La Quinta\u2019s most discreet private gates.',
    overview:
      'The Madison Club sits at the southern edge of La Quinta, off Madison Street, on land that was previously raw desert and citrus groves. It opened in the mid-2000s with a Tom Fazio routing that prioritized broad fairways, generous lake margins, and dramatic view corridors framing both the Santa Rosa Mountains to the south and the Coral Reef range to the north. From the start the community was designed to be small and architecturally cohesive — the streetscape is built around a single design code, lot sizes are large by Coachella Valley standards, and the membership is intentionally capped at a number that keeps tee-sheet pressure low even at peak season.',
    quickFacts: [
      { label: 'City',         value: 'La Quinta, CA' },
      { label: 'Architect',    value: 'Tom Fazio' },
      { label: 'Course type',  value: '18-hole private' },
      { label: 'Course style', value: 'Wide fairways, framed views' },
      { label: 'Membership',   value: 'Equity, by invitation' },
      { label: 'Real estate',  value: 'Custom estates on large lots' },
    ],
    sections: [
      {
        heading: 'The course',
        body: 'Fazio\u2019s routing at The Madison Club is one of his more restrained Coachella Valley designs. Fairways are wide, recoveries from the rough are usually playable, and the visual drama comes from elevation work around the greens and from the way the routing repeatedly reveals the mountains on the second shot rather than the tee shot. The course can stretch over 7,200 yards from the back tees but plays comfortably under 6,400 from a member-friendly box. Conditioning is typically described by visiting professionals as some of the most consistent in the valley — the agronomy budget reflects the small membership and the absence of resort play.',
      },
      {
        heading: 'Membership & access',
        body: 'Madison Club membership is equity and historically by invitation. The club has never marketed itself publicly in the way larger Coachella Valley operations do, and the membership roster is not published. We deliberately do not publish a current initiation fee — those figures move and we have not independently verified the current number. Anyone seriously considering joining should expect to be sponsored by an existing member and to go through a vetting process. Day-play access for non-members is essentially non-existent; this is a member-and-guest operation.',
      },
      {
        heading: 'The real estate',
        body: 'Lot sizes at The Madison Club are large by Coachella Valley standards — typically a third to over a half acre, with several estate-scale parcels along the south boundary. The architectural language is dominated by contemporary California and modern Spanish-Mediterranean, with most homes designed by established Coachella Valley architects and built since the late 2000s. There is no condo or villa stock. Buyer profile is overwhelmingly seasonal — most homes are second or third residences for owners who keep primary addresses in coastal California, the Bay Area, or out of state — and the community is materially quieter in the summer months.',
      },
      {
        heading: 'How it compares',
        body: 'Within La Quinta, The Madison Club is most often compared to The Quarry (also Fazio, smaller, more vertical topography) and to The Hideaway (Dye + Clark, mid-size, 36 holes). Madison sits at the highest price tier of the La Quinta private clubs, with newer construction, larger lots, and the strictest architectural code. It is not the right fit for a buyer who wants a deep social calendar, family programming, or significant resort-style amenities \u2014 those belong to La Quinta Country Club, Andalusia, and the larger resort-scale communities in the valley. Madison\u2019s defining quality is privacy.',
      },
    ],
    faqs: [
      { q: 'Is The Madison Club accepting new members?', a: 'Membership status changes and is not publicly published. Verify directly with the club; we do not publish member-status numbers we have not confirmed.' },
      { q: 'What is the architectural style at The Madison Club?', a: 'The community is dominated by contemporary California and modern Spanish-Mediterranean custom estates on substantial lots. There are no condos or fairway villas.' },
      { q: 'Are tee times difficult to get?', a: 'Because of the small membership and the absence of public/resort play, tee sheets at Madison are generally less pressured than at the larger La Quinta clubs.' },
      ...DEFAULT_FAQ,
    ],
    membership: {
      structure: 'Equity — full golf. Sponsored, invitation-oriented process.',
      initiationTier: 'Flagship — the highest observed tier among La Quinta private clubs.',
      duesTier: 'High',
      waitlist: 'Historically closed to open enrollment. Access is sponsored and vetted.',
      transferTerms: 'Not publicly published. Verify directly with the membership office.',
      guestPolicy: 'Strict member-and-guest. Non-member day play is essentially unavailable.',
      buyerFit: 'Best for a buyer who prizes privacy, a small tight membership, and a strict architectural code over programming and family calendar.',
    },
    architectContext: {
      primary: 'Tom Fazio',
      era: 'Opened mid-2000s',
      otherCoachellaWork: 'Also designed The Quarry at La Quinta — same architect, deliberately different idiom.',
      designSignature: 'Wide fairways, framed second-shot views, restrained bunker language.',
      playCharacter: 'Playable from member tees; stretches to 7,200+ yards from the tips.',
    },
    priceContext: {
      bandTier: 'Flagship — highest per-lot values in La Quinta.',
      typicalRange: 'Custom estates commonly trade in the low-eight figures and higher; ultra-flagship parcels have transacted well into the double-digit millions.',
      lotSize: 'One-third to over one-half acre; several estate-scale parcels along the south boundary.',
      dominantVintage: 'Predominantly post-2005 custom builds.',
      dominantStyle: 'Contemporary California and modern Spanish-Mediterranean.',
      inventoryVelocity: 'Very low — single-digit resales per year.',
      entryProduct: 'No condos or fairway villas. Custom single-family only.',
    },
    touringChecklist: [
      'Confirm the architectural code before pricing any planned remodel — it is one of the strictest in La Quinta.',
      'Ask which side of the routing the lot backs onto; mountain and afternoon-sun exposure vary materially.',
      'Verify HOA-versus-club-dues split; some services buyers assume are member-included are HOA-scoped.',
      'Ask about sponsor requirements for the membership vetting process before writing an offer.',
    ],
    searchIntents: [
      'The Madison Club homes for sale',
      'The Madison Club initiation fee',
      'Tom Fazio Madison Club',
      'The Madison Club membership requirements',
    ],
  },

  'the-hideaway': {
    image: '/images/communities/the-hideaway.jpg',
    tagline: 'Two distinct courses, one gate — Pete Dye and Clive Clark in La Quinta.',
    overview:
      'The Hideaway is a 36-hole private community on Hideaway Way in central La Quinta. Its defining feature is the rare pairing of two complete 18-hole routings behind a single gate, one by Pete Dye and one by Clive Clark. Members move freely between the two courses, which gives the club an unusual breadth of golf for its size and lets the architectural personalities sit side-by-side in productive contrast: Dye\u2019s visual edge against Clark\u2019s more open, member-friendly lines. The real-estate footprint is mid-scale, the architecture is cohesive, and the membership feels notably tighter than at the larger resort-scale Coachella Valley clubs despite the comparable course count.',
    quickFacts: [
      { label: 'City',         value: 'La Quinta, CA' },
      { label: 'Architects',   value: 'Pete Dye · Clive Clark' },
      { label: 'Course type',  value: 'Two 18-hole private courses' },
      { label: 'Course style', value: 'Strategic (Dye) + playable (Clark)' },
      { label: 'Membership',   value: 'Equity' },
      { label: 'Real estate',  value: 'Custom estates + fairway homes' },
    ],
    sections: [
      {
        heading: 'The two courses',
        body: 'The Pete Dye course at The Hideaway is the more visually intimidating of the two — bunkers cut hard against fairway lines, water in play on the closing holes, and the visual misdirection Dye built his reputation on. The Clive Clark course, completed slightly later, is widely regarded as the friendlier daily-play option: wider landing areas, more conservative green complexes, and an emphasis on playability. Members typically rotate, but most settle into a personal preference quickly. The conditioning standard across both courses is consistent year-round.',
      },
      {
        heading: 'Membership & access',
        body: 'The Hideaway is equity, with a defined cap that keeps tee-sheet pressure manageable across 36 holes. Like Madison Club it is not a resort or daily-fee operation, and outside play is limited. Initiation and dues figures are not published here — verify directly. The membership skews seasonal, with a higher proportion of active golfers than at clubs known more for the lifestyle than the play. Family programming exists but the dominant rhythm is the morning golf round.',
      },
      {
        heading: 'The real estate',
        body: 'Hideaway homes are predominantly custom-built single-family estates, with a smaller secondary band of fairway homes on more modest lots. The architectural language leans contemporary California with Spanish-Mediterranean accents. Lot sizes vary widely — some of the original Dye-side estate lots are substantial, while the Clark-side homes are more uniformly mid-scale. Inventory turns slowly; a typical year sees a single-digit number of resales across the community.',
      },
    ],
    faqs: [
      { q: 'Which Hideaway course is harder?', a: 'The Pete Dye course is widely considered the more demanding of the two. The Clive Clark course is the more member-friendly daily play.' },
      { q: 'Can a member play both courses?', a: 'Yes. Members rotate freely between the two routings; most settle into a personal preference within the first season.' },
      ...DEFAULT_FAQ,
    ],
    membership: {
      structure: 'Equity — full golf.',
      initiationTier: 'High.',
      duesTier: 'High.',
      waitlist: 'Verify directly. Not a resort-facing operation.',
      transferTerms: 'Not publicly published; verify with the membership office.',
      guestPolicy: 'Member-and-guest with limited outside play.',
      buyerFit: 'Best for an active-golf buyer who wants breadth (two full 18s) with a tighter club feel than the larger resort-scale Coachella Valley clubs.',
    },
    architectContext: {
      primary: 'Pete Dye (Dye Course) and Clive Clark (Clark Course).',
      era: 'Dye course completed 2003; Clark course completed 2005.',
      otherCoachellaWork: 'Pete Dye also designed courses elsewhere in the Coachella Valley; Clive Clark\u2019s desert work is more limited.',
      designSignature: 'Dye: strategic misdirection, hard-cut bunker edges, water in play on closers. Clark: wider corridors, more open green fronts.',
      playCharacter: 'Dye plays visually intimidating from any tee; Clark plays as a member-friendly rotation option.',
    },
    priceContext: {
      bandTier: 'High — mid-scale to estate.',
      typicalRange: 'Custom estates commonly in the mid-seven to low-eight figures. Fairway homes at more modest points.',
      lotSize: 'Wide variation — original Dye-side estate lots run large; Clark-side homes are more uniformly mid-scale.',
      dominantVintage: '2003\u20132015 for most inventory; ongoing custom remodels.',
      dominantStyle: 'Contemporary California with Spanish-Mediterranean accents.',
      inventoryVelocity: 'Low — single-digit resales per year in a typical cycle.',
      entryProduct: 'Fairway single-family homes; no condo stock.',
    },
    touringChecklist: [
      'Ask whether the lot backs onto Dye or Clark — the daily-play character is materially different.',
      'Verify irrigation and turf policy; conditioning cost is a real line item at 36 holes.',
      'Confirm access rights to both courses under the specific membership tier.',
      'Check remodel restrictions early — architectural code is enforced.',
    ],
    searchIntents: [
      'The Hideaway La Quinta homes for sale',
      'Pete Dye Hideaway course',
      'Clive Clark La Quinta',
      'The Hideaway membership initiation',
    ],
  },

  'pga-west': {
    image: '/images/communities/pga-west.jpg',
    tagline: 'Six courses, four architects, a deep PGA Tour history.',
    overview:
      'PGA West opened in 1986 and remains the largest golf-real-estate community in La Quinta and one of the largest in the United States. The community spans both sides of Madison Street and now includes six 18-hole courses by four of the most consequential American course architects of the late 20th century: Pete Dye (Stadium and the Dunes), Jack Nicklaus (Nicklaus Tournament and a private Nicklaus course), Greg Norman (Norman Course), and Tom Weiskopf (Weiskopf Private). Three are private, three are resort — the precise mix has shifted over time. The real-estate footprint is correspondingly broad, ranging from entry-level fairway condos to multi-million-dollar custom estates.',
    quickFacts: [
      { label: 'City',         value: 'La Quinta, CA' },
      { label: 'Architects',   value: 'Dye · Nicklaus · Norman · Weiskopf' },
      { label: 'Course count', value: 'Six 18-hole courses' },
      { label: 'Course style', value: 'Tournament to member-friendly' },
      { label: 'Membership',   value: 'Multiple tiers (incl. non-resident)' },
      { label: 'Real estate',  value: 'Condos to estate homes — widest range' },
      { label: 'Founded',      value: '1986' },
    ],
    sections: [
      {
        heading: 'The six courses',
        body: 'The Stadium course (Dye, 1986) is the headliner — it has hosted PGA Tour events for decades, including The American Express, and is famously punitive from the back tees. The Nicklaus Tournament course is the more traditional companion, with a Jack Nicklaus design philosophy that rewards second-shot positioning over heroic recovery. The Greg Norman course and the Tom Weiskopf private bring distinctly different idioms again — Norman\u2019s links-influenced fescue edges, Weiskopf\u2019s big-shouldered championship traditional. The Dunes and the Greg Norman Private complete the six. For a member, the practical effect is that PGA West offers more variety of golf than any other single Coachella Valley address.',
      },
      {
        heading: 'Membership tiers',
        body: 'PGA West has historically operated multiple membership tiers, including resident and non-resident options, social-only, and full golf with varying access patterns across the six courses. The tier structure has evolved across ownership changes and we deliberately do not publish current initiation figures here — they move and they require direct verification with the club. The flexibility, however, is real: PGA West can accommodate a buyer who wants weekday-only access, a buyer who wants tournament-grade play, and a buyer who simply wants the social and amenity calendar.',
      },
      {
        heading: 'The real estate',
        body: 'PGA West has the widest price band of any La Quinta private community by a significant margin. The entry point is a Coachella Valley anomaly: well-maintained one-bedroom and two-bedroom condos in the older sections of the community trade at price points that are simply not available in newer private golf communities anywhere in the valley. From there, the inventory steps up through fairway villas, resale single-family in the older neighborhoods, and finally to estate homes on the southern side. Buyer profiles span retirees, snowbird families, and active second-home owners.',
      },
      {
        heading: 'Resort and event context',
        body: 'Because three PGA West courses retain resort access, the community functions differently than a purely private club. There is daily-fee play, a PGA Tour event on the calendar, and a level of operational scale that simply does not exist at Madison Club, Hideaway, Andalusia, or Quarry. For some buyers that is the appeal — a busy clubhouse, programming, hotel-style amenities. For others it is the reason to look elsewhere in La Quinta. Either way it is the defining characteristic.',
      },
    ],
    faqs: [
      { q: 'How many courses are there at PGA West?', a: 'Six 18-hole courses across resort and private membership. Three are private-only; the others retain resort access.' },
      { q: 'Who designed the PGA West Stadium course?', a: 'Pete Dye. The Stadium course was completed in 1986 and has hosted PGA Tour events including The American Express.' },
      { q: 'Does PGA West offer non-resident memberships?', a: 'PGA West has historically offered multiple membership tiers including non-resident options. Specifics change — verify availability directly with the club.' },
      { q: 'Is PGA West a good fit for a first golf-community buyer?', a: 'PGA West has the widest entry-price band in La Quinta and the most flexible membership structure, which makes it a common first-purchase community in the valley.' },
      ...DEFAULT_FAQ,
    ],
    membership: {
      structure: 'Multiple tiers — full golf, social, resident and non-resident. Some tiers include the resort courses; others are private-only.',
      initiationTier: 'Mid to high — the most flexible cost structure among La Quinta private clubs.',
      duesTier: 'Mid to high; varies by tier.',
      waitlist: 'Generally more open than at Madison or Hideaway; specific tier availability moves — verify directly.',
      transferTerms: 'Vary by tier. Verify current transfer and refund terms with the membership office.',
      guestPolicy: 'Three courses retain resort access — non-member day play is possible on those routings; private-course access is member-restricted.',
      buyerFit: 'Best for a buyer who wants access flexibility, tournament-grade play options, and the widest real-estate entry point in La Quinta.',
    },
    architectContext: {
      primary: 'Pete Dye (Stadium 1986, Dunes), Jack Nicklaus (Tournament course + private Nicklaus), Greg Norman (Norman Course), Tom Weiskopf (Weiskopf Private).',
      era: '1986 through late-2000s across the six courses.',
      otherCoachellaWork: 'Dye also designed The Hideaway (Dye Course); Nicklaus is credited with Coral Mountain and other Coachella Valley courses; Norman and Weiskopf have limited additional Coachella Valley work.',
      designSignature: 'Stadium (Dye): punitive from the tips, tour-tested. Nicklaus Tournament: second-shot positioning. Norman: links-influenced fescue edges. Weiskopf: big-shouldered championship traditional.',
      playCharacter: 'The Stadium has hosted PGA Tour events including The American Express; the other five range from tour-grade to notably member-friendly.',
    },
    priceContext: {
      bandTier: 'Widest observed range of any La Quinta private community.',
      typicalRange: 'One-bedroom and two-bedroom condos in the older sections have transacted at points not available in newer private communities anywhere in the valley (mid-six figures observed on recent listings). Fairway villas and older single-family in the mid to high six figures. Estate homes on the southern side reach into the seven and low-eight figures.',
      lotSize: 'Full range — from condo footprint to estate parcels.',
      dominantVintage: 'Late-1980s original construction through recent custom rebuilds.',
      dominantStyle: 'Broad mix — Spanish-Mediterranean, contemporary California, older ranch-derived villa architecture.',
      inventoryVelocity: 'High in the entry-condo band; moderate mid-band; low in estate.',
      entryProduct: 'Condos in older sections — the true entry-price product of the La Quinta private clubs.',
    },
    touringChecklist: [
      'Confirm which of the six courses your membership tier accesses, and how tee-time priority works across them.',
      'Ask about the resort/private mix in your section \u2014 daily-fee play density varies materially by course.',
      'Verify HOA structure by sub-community; PGA West has multiple internal HOAs with different scopes.',
      'For condos, check the reserve study and any recent special assessments.',
      'For estate lots on the southern side, verify current architectural code and setback rules.',
    ],
    searchIntents: [
      'PGA West homes for sale',
      'PGA West Stadium Course',
      'PGA West Nicklaus Tournament homes',
      'PGA West condo prices',
      'PGA West membership tiers',
      'PGA West non-resident membership',
    ],
  },

  'the-tradition-golf-club': {
    image: '/images/communities/the-tradition-golf-club.jpg',
    tagline: 'Arnold Palmer\u2019s only Coachella Valley design — walkable, mature, member-friendly.',
    overview:
      'The Tradition Golf Club opened in 1997 on the western side of La Quinta, near the foot of the Santa Rosa Mountains and the historic Cove neighborhood. It is Arnold Palmer\u2019s only Coachella Valley design. The defining quality of the routing is that it was conceived to be walkable — unusual for a desert golf community — with restrained elevation changes, short transitions between greens and tees, and a member-friendly approach to bunker placement. The community is mid-size, the membership is tight, and the streetscape feels older and more settled than any of the newer La Quinta clubs.',
    quickFacts: [
      { label: 'City',         value: 'La Quinta, CA' },
      { label: 'Architect',    value: 'Arnold Palmer' },
      { label: 'Course type',  value: '18-hole private, walkable' },
      { label: 'Membership',   value: 'Equity' },
      { label: 'Real estate',  value: 'Custom estates + mid-scale single-family' },
      { label: 'Founded',      value: '1997' },
    ],
    sections: [
      {
        heading: 'The course',
        body: 'Palmer\u2019s routing at The Tradition is intentionally restrained — it does not chase tournament-grade difficulty and does not feature the heroic carries common to younger Coachella Valley courses. Fairway corridors are wide enough to be forgiving from the member tees, green complexes are generally open in front to allow ground-game approaches, and the routing is walkable on cool days. Conditioning is maintained at a high standard despite the comparative simplicity of the design.',
      },
      {
        heading: 'Membership & access',
        body: 'The Tradition is equity and has a notably tighter feel than the larger La Quinta clubs. The membership cap is modest, the social calendar exists but is not the dominant focus, and the dominant rhythm is morning golf. The club does not have resort play. Verify current membership status, initiation, and dues directly with the club.',
      },
      {
        heading: 'The real estate',
        body: 'Tradition\u2019s real estate is a mix of estate-scale customs and more modest single-family homes from the late 1990s and early 2000s. Architectural language skews traditional Spanish-Mediterranean with some classical California influence. Lot sizes are mid-scale; mature landscaping is a defining feature of the streetscape and one of the most-cited differences from newer communities.',
      },
    ],
    faqs: [
      { q: 'Is The Tradition the only Arnold Palmer design in the Coachella Valley?', a: 'Yes. The Tradition is Palmer\u2019s only Coachella Valley design.' },
      { q: 'Can the course be walked?', a: 'Yes — the routing was designed to be walkable, which is unusual for a desert golf community.' },
      ...DEFAULT_FAQ,
    ],
    membership: {
      structure: 'Equity — full golf.',
      initiationTier: 'Mid to high — verify directly.',
      duesTier: 'Mid.',
      waitlist: 'Verify directly.',
      transferTerms: 'Not publicly published.',
      guestPolicy: 'Member-and-guest, no resort play.',
      buyerFit: 'Best for a buyer who wants a walkable course, a mature streetscape, and a tighter membership than the larger resort-scale communities in the valley.',
    },
    architectContext: {
      primary: 'Arnold Palmer.',
      era: 'Opened 1997.',
      otherCoachellaWork: 'The Tradition is Palmer\u2019s only Coachella Valley design.',
      designSignature: 'Wide corridors, open green fronts, walkable routing — a deliberately restrained desert design.',
      playCharacter: 'Not a tournament-grade course; a member-play-first design that rewards conservative shot selection.',
    },
    priceContext: {
      bandTier: 'Mid to high.',
      typicalRange: 'Mid-scale single-family in the mid to high seven figures; estate customs into the low-eight figures.',
      lotSize: 'Mid-scale, mature landscaping.',
      dominantVintage: 'Late-1990s to early-2000s original construction with a strong recent remodel wave.',
      dominantStyle: 'Traditional Spanish-Mediterranean with some classical California influence.',
      inventoryVelocity: 'Low — mature community, slow resale.',
      entryProduct: 'Mid-scale single-family; no condo or villa stock.',
    },
    touringChecklist: [
      'Ask about tree maturity per lot — the streetscape\u2019s mature landscaping is a differentiator but varies materially.',
      'Verify the walkability appeal on the specific hole exposures your lot backs onto.',
      'Check remodel scope — many homes have been extensively updated.',
      'Confirm HOA rules on exterior color and landscape palette before pricing any refresh.',
    ],
    searchIntents: [
      'The Tradition Golf Club La Quinta',
      'Arnold Palmer La Quinta course',
      'The Tradition homes for sale',
      'walkable golf community La Quinta',
    ],
  },

  'andalusia-country-club': {
    image: '/images/communities/andalusia-country-club.jpg',
    tagline: 'A Rees Jones design at the southern edge of La Quinta.',
    overview:
      'Andalusia Country Club sits at the southern end of La Quinta, just east of Madison Street, on land that was previously open desert and agricultural plots. It opened in the mid-2000s with a Rees Jones routing and a master plan that emphasized newer construction, modern Spanish-Mediterranean architecture, and large view corridors framing the Santa Rosa Mountains. Among the La Quinta private clubs, Andalusia is the most architecturally consistent newer-construction community: most homes are post-2005, building heights and palettes are tightly controlled, and the streetscape reads as a single design language rather than a patchwork.',
    quickFacts: [
      { label: 'City',         value: 'La Quinta, CA' },
      { label: 'Architect',    value: 'Rees Jones' },
      { label: 'Course type',  value: '18-hole private' },
      { label: 'Course style', value: 'Modern championship traditional' },
      { label: 'Membership',   value: 'Equity' },
      { label: 'Real estate',  value: 'Modern Spanish-Mediterranean estates' },
    ],
    sections: [
      {
        heading: 'The course',
        body: 'Rees Jones is best known nationally for U.S. Open course restorations, and his original work at Andalusia reflects that idiom: classically proportioned green complexes, fairway bunkering placed for the modern tour player rather than the modest amateur, and a relatively conservative green-to-tee routing. The course is more demanding than The Tradition but more forgiving than the Dye courses at The Hideaway. Conditioning is consistent.',
      },
      {
        heading: 'Membership & access',
        body: 'Andalusia is equity. The membership has historically been more family-skewed than at Madison Club or Hideaway, with a more active social calendar and stronger junior programming. Like every La Quinta private it is materially quieter in the summer months. Initiation and dues are not published here — verify directly.',
      },
      {
        heading: 'The real estate',
        body: 'Andalusia\u2019s defining real-estate quality is consistency: lot orientations, building heights, exterior palettes, and landscape language are all tightly controlled, and the result is a community that reads as a single coherent piece of architecture from the curb. The dominant home style is modern Spanish-Mediterranean with newer contemporary California influences appearing in the later phases. Lot sizes are mid- to large-scale; most homes are post-2005 custom builds with a smaller secondary band of fairway villas.',
      },
    ],
    faqs: [
      { q: 'What is the architectural style at Andalusia?', a: 'Modern Spanish-Mediterranean dominates, with newer contemporary California homes appearing in later phases. Building palettes and heights are tightly controlled across the community.' },
      { q: 'Is Andalusia family-friendly?', a: 'The membership has historically skewed more family-oriented than at Madison Club or Hideaway, with active junior programming.' },
      ...DEFAULT_FAQ,
    ],
    membership: {
      structure: 'Equity — full golf.',
      initiationTier: 'Mid to high.',
      duesTier: 'Mid to high.',
      waitlist: 'Verify directly.',
      transferTerms: 'Not publicly published.',
      guestPolicy: 'Member-and-guest, no resort play.',
      buyerFit: 'Best for a family-oriented buyer who wants newer construction, tighter architectural cohesion, and an active social and junior calendar.',
    },
    architectContext: {
      primary: 'Rees Jones.',
      era: 'Opened mid-2000s.',
      otherCoachellaWork: 'Rees Jones\u2019 Coachella Valley portfolio is limited; his national reputation is anchored in U.S. Open venue restorations.',
      designSignature: 'Classically proportioned green complexes; modern-tour bunker placement; a conservative green-to-tee routing.',
      playCharacter: 'More demanding than The Tradition; more forgiving than the Dye courses at The Hideaway.',
    },
    priceContext: {
      bandTier: 'Mid to high.',
      typicalRange: 'Mid-scale single-family in the mid to high seven figures; estate customs into the low to mid-eight figures.',
      lotSize: 'Mid to large-scale.',
      dominantVintage: 'Predominantly post-2005 custom builds, with a smaller secondary band of fairway villas.',
      dominantStyle: 'Modern Spanish-Mediterranean, with newer contemporary California influences in later phases. Tightly controlled palettes.',
      inventoryVelocity: 'Moderate.',
      entryProduct: 'Fairway villas; primary product is estate single-family.',
    },
    touringChecklist: [
      'Confirm the phase your lot is in — architectural language shifts across phases.',
      'Ask about junior programming and family calendar if that fits your buyer profile.',
      'Verify HOA restrictions on rental usage if you plan to lease seasonally.',
      'Check afternoon sun exposure — south-facing lots read differently at 4pm than at showing time.',
    ],
    searchIntents: [
      'Andalusia Country Club La Quinta',
      'Rees Jones La Quinta',
      'Andalusia homes for sale',
      'Andalusia Country Club membership',
    ],
  },

  'the-quarry-at-la-quinta': {
    image: '/images/communities/the-madison-club.jpg',
    tagline: 'A Tom Fazio routing on a former rock quarry — dramatic topography, very tight membership.',
    overview:
      'The Quarry at La Quinta opened in the mid-1990s on a property that had been a working rock quarry. Tom Fazio routed the course through and around the existing topography, using the dramatic rock walls and elevation changes as the visual signature of the design — a different approach from his more polished, view-framed work at The Madison Club. The community is intentionally small, the membership is one of the tightest in the Coachella Valley, and the real-estate footprint is correspondingly modest in absolute terms but high in per-lot value.',
    quickFacts: [
      { label: 'City',         value: 'La Quinta, CA' },
      { label: 'Architect',    value: 'Tom Fazio' },
      { label: 'Course type',  value: '18-hole private' },
      { label: 'Membership',   value: 'Equity, very tight cap' },
      { label: 'Real estate',  value: 'Custom estates, small inventory' },
    ],
    sections: [
      {
        heading: 'The course',
        body: 'Where Fazio\u2019s Madison routing is about wide fairways and framed views, his Quarry routing is about topography. The course uses the surviving quarry walls as visual backstops, and several holes play through narrow corridors created by the original excavation. The result is one of the more vertical and visually distinctive courses in the Coachella Valley — not as long as Madison from the tips, but more variable in shot demands.',
      },
      {
        heading: 'Membership & access',
        body: 'The Quarry has historically maintained one of the tightest membership caps among La Quinta private clubs, which keeps the daily play feel notably more like a small club than any of the larger La Quinta operations. There is no resort access. Verify initiation, dues, and current member status directly with the club.',
      },
      {
        heading: 'The real estate',
        body: 'Quarry real estate is modest in unit count but skews high in per-lot value. The dominant architectural language is Spanish-Mediterranean with custom California influences; most homes are 1990s-to-2000s vintage with a strong recent renovation wave. Inventory turns slowly; year-on-year resale counts are routinely in the single digits.',
      },
    ],
    faqs: [
      { q: 'Why is it called The Quarry?', a: 'The property was a working rock quarry before Fazio routed the course through and around the existing topography.' },
      { q: 'How does The Quarry compare to The Madison Club?', a: 'Same architect (Fazio), very different idiom. Madison is wider, flatter, view-framed; The Quarry is more vertical, narrower, and built around topography.' },
      ...DEFAULT_FAQ,
    ],
    membership: {
      structure: 'Equity — full golf.',
      initiationTier: 'High to flagship — tight membership.',
      duesTier: 'High.',
      waitlist: 'Very tight cap; historically limited access. Verify directly.',
      transferTerms: 'Not publicly published.',
      guestPolicy: 'Member-and-guest, no resort play.',
      buyerFit: 'Best for a buyer who prizes a small-club feel and a visually distinctive course over broader amenities and community scale.',
    },
    architectContext: {
      primary: 'Tom Fazio.',
      era: 'Opened mid-1990s.',
      otherCoachellaWork: 'Also designed The Madison Club — same architect, materially different idiom.',
      designSignature: 'Routed through and around a former rock quarry; dramatic elevation change; narrow corridors created by the original excavation walls.',
      playCharacter: 'Not as long as Madison from the tips, more variable in shot demands, and one of the more vertical courses in the Coachella Valley.',
    },
    priceContext: {
      bandTier: 'High.',
      typicalRange: 'Custom estates commonly in the mid to high seven figures; higher on flagship parcels.',
      lotSize: 'Mid to large; small overall inventory.',
      dominantVintage: '1990s-to-2000s vintage with a strong recent renovation wave.',
      dominantStyle: 'Spanish-Mediterranean with custom California influences.',
      inventoryVelocity: 'Very low — single-digit resales per year.',
      entryProduct: 'Custom single-family only.',
    },
    touringChecklist: [
      'Ask about the visual context of each hole from your lot — the quarry walls are a defining visual element and exposure varies dramatically.',
      'Confirm recent renovation scope; many homes have been substantially updated.',
      'Verify architectural code for any planned addition.',
      'Ask about member-guest policy timing if you plan to host frequently.',
    ],
    searchIntents: [
      'The Quarry La Quinta homes',
      'Tom Fazio The Quarry',
      'The Quarry membership',
      'The Quarry vs Madison Club',
    ],
  },

  'la-quinta-country-club': {
    image: '/images/communities/la-quinta-country-club.jpg',
    tagline: 'The original La Quinta club — founded 1959, walking distance to the Cove and the Resort.',
    overview:
      'La Quinta Country Club is the oldest private club in the city of La Quinta and one of the oldest in the Coachella Valley. It opened in 1959 with a Lawrence Hughes routing and grew alongside the La Quinta Resort and the historic Cove neighborhood. The defining qualities of the club today are its location — walking distance to the Cove, Old Town, and the Resort — and the mature streetscape that surrounds it. The membership skews more multi-generational than at the newer La Quinta clubs, and the architectural fabric of the surrounding neighborhood is a mix of mid-century, classic Spanish, and more recent custom remodels.',
    quickFacts: [
      { label: 'City',         value: 'La Quinta, CA' },
      { label: 'Architect',    value: 'Lawrence Hughes (1959)' },
      { label: 'Course type',  value: '18-hole private' },
      { label: 'Course style', value: 'Classic mid-century traditional' },
      { label: 'Membership',   value: 'Equity' },
      { label: 'Real estate',  value: 'Mid-century + classic Spanish, mature lots' },
      { label: 'Founded',      value: '1959' },
    ],
    sections: [
      {
        heading: 'The course',
        body: 'The Hughes routing is a classic mid-century traditional design — modest elevation changes, tree-lined corridors that have matured into one of the most visually settled member experiences in La Quinta, and green complexes that reward conservative second shots. The course has been periodically refreshed but the underlying routing is original. It is shorter than most of the newer La Quinta courses, which is a feature for many members and a drawback for those who want championship-grade length.',
      },
      {
        heading: 'Membership & access',
        body: 'La Quinta Country Club has historically been more family-multigenerational than most of the newer La Quinta privates, and the social calendar is correspondingly active. Initiation has historically been the most accessible among the La Quinta private clubs, though we will not publish a current figure without verification.',
      },
      {
        heading: 'The real estate',
        body: 'The streetscape around La Quinta Country Club is the most architecturally varied of the La Quinta clubs. Mid-century single-story originals sit next to classic Spanish-Mediterranean homes from the 1970s and 80s and to recent custom remodels. Mature trees and irrigated landscaping are dominant. The neighborhood\u2019s proximity to the Cove and Old Town gives it a walkability that none of the southern La Quinta clubs share — a meaningful lifestyle differentiator.',
      },
    ],
    faqs: [
      { q: 'Is La Quinta Country Club the oldest private club in the city?', a: 'Yes — it was founded in 1959 and predates every other private club in La Quinta.' },
      { q: 'Is it walkable to Old Town?', a: 'Yes. The club and its surrounding neighborhood are within walking distance of Old Town La Quinta and the Cove.' },
      ...DEFAULT_FAQ,
    ],
    membership: {
      structure: 'Equity — full golf.',
      initiationTier: 'Mid — historically the most accessible among La Quinta private clubs, but verify current figures directly.',
      duesTier: 'Mid.',
      waitlist: 'Verify directly.',
      transferTerms: 'Not publicly published.',
      guestPolicy: 'Member-and-guest; no resort play.',
      buyerFit: 'Best for a multi-generational buyer who wants an active social calendar, walkable neighborhood context (Cove and Old Town), and a mature streetscape rather than newer construction.',
    },
    architectContext: {
      primary: 'Lawrence Hughes (original 1959 routing).',
      era: 'Opened 1959 — the oldest private club in the city of La Quinta.',
      otherCoachellaWork: 'Hughes designed a number of classic mid-century Coachella Valley courses. The routing has been periodically refreshed but the underlying design is original.',
      designSignature: 'Classic mid-century traditional: modest elevation changes, tree-lined corridors, member-friendly green fronts.',
      playCharacter: 'Shorter than most newer La Quinta courses; a member-play-first design.',
    },
    priceContext: {
      bandTier: 'Entry to mid — the most accessible entry point among the La Quinta private clubs.',
      typicalRange: 'Mid-century single-story originals and classic Spanish homes in the high-six to mid-seven figures; recent custom remodels in the high-seven-figure range.',
      lotSize: 'Mid-scale, mature landscaping.',
      dominantVintage: 'Mid-1960s through 1980s original construction, with a significant recent remodel wave.',
      dominantStyle: 'Varied — mid-century, classic Spanish-Mediterranean, and contemporary remodels.',
      inventoryVelocity: 'Moderate to high; largest active resale market of the La Quinta private clubs.',
      entryProduct: 'Original mid-century single-family — the most accessible price entry point in La Quinta private-club real estate.',
    },
    touringChecklist: [
      'Ask about original vs. remodel scope — the community\u2019s inventory is a wide mix.',
      'Check permitting and setback for any planned addition; the older layout has tighter setbacks than the newer La Quinta clubs.',
      'Verify HOA structure by sub-neighborhood — the surrounding neighborhood is a patchwork.',
      'Walk the neighborhood to Old Town — walkability is a signature differentiator here.',
    ],
    searchIntents: [
      'La Quinta Country Club homes for sale',
      'La Quinta Country Club membership',
      'Cove La Quinta homes',
      'La Quinta Country Club initiation',
    ],
  },

  // ------------------------------------------------------------------
  // Additional La Quinta communities. Conservative copy — architects,
  // eras and price ranges are only stated when publicly verifiable.
  // ------------------------------------------------------------------

  'rancho-la-quinta-country-club': {
    image: '/images/communities/rancho-la-quinta-country-club.jpg',
    tagline: 'Two private 18-hole courses inside one Trans West-developed guard-gated country club.',
    overview: 'Rancho La Quinta Country Club sits on the north side of La Quinta off Washington Street. It was developed by Trans West Housing beginning in the early 1990s and grew across the decade as two full 18-hole private courses came online — the Jones Course (Robert Trent Jones Jr., opened 1993) and the Pate Course (Jerry Pate, opened later in the 1990s). The club is member-owned, guard-gated, and organized as a full-service country club with a clubhouse, tennis, pickleball, fitness and dining. Real estate spans attached casitas near the entrance to larger single-family estates on the fairways of both courses, which gives the community one of the wider price bands among La Quinta private clubs. Buyers tend to be a mix of seasonal second-home owners and full-time residents; the daily lifestyle inside the gate is meaningfully more social and family-oriented than the flagship private clubs to the south.',
    quickFacts: [
      { label: 'City',        value: 'La Quinta, CA 92253' },
      { label: 'Courses',     value: 'Two private 18s (Jones · Pate)' },
      { label: 'Structure',   value: 'Member-owned country club' },
      { label: 'Access',      value: 'Guard-gated, private' },
      { label: 'Real estate', value: 'Casitas to fairway estates' },
    ],
    sections: [
      {
        heading: 'The two courses',
        body: 'The Jones Course is the older of the two — a Robert Trent Jones Jr. design that opened in 1993 and reads more traditional in its bunkering and green complexes. The Pate Course, added later in the 1990s by Jerry Pate, plays firmer and lower, with more water in play on the interior holes. Members typically rotate between the two, and the two-course footprint is one of the strongest arguments for Rancho La Quinta versus single-course private clubs in the same price band.',
      },
      {
        heading: 'The real estate mix',
        body: 'Rancho La Quinta has one of the widest product mixes of any La Quinta private club — from attached casitas near the front gate to substantial single-family estates on the outer fairways. That breadth is why the community shows up in a wider price band than most of the flagship clubs on this site, and why it is often a fit for buyers who want a country-club lifestyle without the entry point of Madison, Hideaway or Andalusia.',
      },
    ],
    faqs: [
      { q: 'How many golf courses does Rancho La Quinta have?', a: 'Two private 18-hole courses — one designed by Robert Trent Jones Jr. and one by Jerry Pate. Members have access to both.' },
      { q: 'Is Rancho La Quinta a private or semi-private club?', a: 'It is a private member-owned country club. Access to the courses, tennis, fitness and dining is member-and-guest.' },
      ...DEFAULT_FAQ,
    ],
    searchIntents: [
      'Rancho La Quinta Country Club homes for sale',
      'Rancho La Quinta membership',
      'Robert Trent Jones Jr. La Quinta',
      'Rancho La Quinta HOA fees',
    ],
  },

  'mountain-view-country-club': {
    image: '/images/communities/mountain-view-country-club.jpg',
    tagline: 'An Arnold Palmer routing behind a Toll Brothers–developed gate at the south end of La Quinta.',
    overview: 'Mountain View Country Club is a guard-gated golf community on the south side of La Quinta, off Jefferson Street, originally developed by Toll Brothers and organized around an 18-hole Arnold Palmer Signature course. The club has historically operated on a semi-private basis, with a bulkier residential footprint than the flagship La Quinta clubs and a more programmed social calendar. Homes are predominantly Mediterranean-and-Spanish-influenced single-family, built from the mid-2000s onward on the fairways and interior streets. The community reads more suburban-lifestyle than the flagship clubs — larger amenity building, deep tennis and pickleball programming, and a fitness center that is used year-round — while still delivering the mountain-and-fairway setting that defines this end of the valley.',
    quickFacts: [
      { label: 'City',        value: 'La Quinta, CA 92253' },
      { label: 'Course',      value: '18-hole Arnold Palmer Signature' },
      { label: 'Access',      value: 'Guard-gated' },
      { label: 'Structure',   value: 'Historically semi-private' },
      { label: 'Real estate', value: 'Mediterranean single-family' },
    ],
    sections: [
      {
        heading: 'The course',
        body: 'The Palmer routing at Mountain View is a wide-fairway, mountain-framed layout with generous landing areas and greens that are more receptive than the tighter Dye courses elsewhere in the valley. It plays as a members\u2019 course first — the tee sheet is not resort-pressured — and is one of the more approachable Palmer designs in the Coachella Valley.',
      },
    ],
    faqs: [
      { q: 'Is Mountain View Country Club private?', a: 'Historically it has operated on a semi-private basis. Membership tiers change over time — verify the current structure directly with the club.' },
      { q: 'Who designed the course at Mountain View?', a: 'The 18-hole course is an Arnold Palmer Signature design.' },
      ...DEFAULT_FAQ,
    ],
    searchIntents: [
      'Mountain View Country Club La Quinta homes',
      'Arnold Palmer La Quinta course',
      'Toll Brothers La Quinta',
      'Mountain View membership fees',
    ],
  },

  'the-citrus-club': {
    image: '/images/communities/the-citrus-club.jpg',
    tagline: 'A Pete Dye routing on original citrus-grove land, close to the La Quinta core.',
    overview: 'The Citrus Club — often referenced simply as "The Citrus" — is a private golf community in central La Quinta built on land that was originally grove agriculture, which the architecture and streetscape still reference. The 18-hole course is a Pete Dye design opened in the late 1980s and reads as one of his more restrained Coachella Valley routings: tree-lined fairways rather than open desert, smaller greens than the resort-scale Dye courses, and shot values that reward positioning over distance. The residential ring around the course is a mix of vintage single-family homes on generous lots and later-added estate infill. The buyer profile skews long-tenure — Citrus is not a rapid-turnover community — and the club\u2019s culture is quieter and more traditional than the newer flagship clubs to the south.',
    quickFacts: [
      { label: 'City',        value: 'La Quinta, CA 92253' },
      { label: 'Course',      value: '18-hole private (Pete Dye)' },
      { label: 'Era',         value: 'Course opened late 1980s' },
      { label: 'Access',      value: 'Guard-gated, private' },
      { label: 'Real estate', value: 'Vintage single-family + estate infill' },
    ],
    sections: [
      {
        heading: 'A different Dye',
        body: 'The Citrus is not the Dye of PGA West Stadium — no railroad ties, no vertical bunker faces, no waterline drama on the closing hole. It is a Dye routing that plays inside the mature planting of an old grove property, with tree lines defining hole corridors rather than sand and water. That character makes it one of La Quinta\u2019s quieter member courses.',
      },
    ],
    faqs: [
      { q: 'Who designed The Citrus Club course?', a: 'The 18-hole course is a Pete Dye design opened in the late 1980s.' },
      { q: 'Is The Citrus Club a full private club?', a: 'Yes — the community is guard-gated and the course operates as a private member-and-guest facility.' },
      ...DEFAULT_FAQ,
    ],
    searchIntents: [
      'The Citrus Club La Quinta homes',
      'Pete Dye Citrus La Quinta',
      'Citrus Club membership',
      'Citrus La Quinta HOA',
    ],
  },

  'la-quinta-resort-club': {
    image: '/images/communities/la-quinta-resort-club.jpg',
    tagline: 'The 1926 resort at the base of the Santa Rosas — condo residences, casitas and the Dunes and Mountain courses.',
    overview: 'La Quinta Resort & Club is the historic core of golf-and-hospitality real estate in the Coachella Valley. The resort itself opened in 1926 and is today operated as part of the Waldorf Astoria / Hilton portfolio; the residential product inside and around the resort footprint is a distinct category from the private clubs elsewhere on this site. Residences include the resort\u2019s own casitas and condominium plans, plus the adjacent Legacy Villas and Santa Rosa Cove communities. Two of the historically resort-facing courses at this end of La Quinta — the Dunes and Mountain layouts — are Pete Dye designs and remain the most photographed golf views in the city. Buyers here are typically buying a lifestyle rather than a single-detached estate: walkable to the resort core and Old Town La Quinta, resort-services access, and a rental-friendly HOA structure.',
    quickFacts: [
      { label: 'Resort opened', value: '1926' },
      { label: 'Operator',      value: 'Waldorf Astoria / Hilton' },
      { label: 'Courses',       value: 'Dunes & Mountain (Pete Dye)' },
      { label: 'Product type',  value: 'Casitas, condos, villas' },
      { label: 'Location',      value: 'Walkable to Old Town La Quinta' },
    ],
    sections: [
      {
        heading: 'The Pete Dye courses at the resort',
        body: 'The Mountain and Dunes courses at La Quinta Resort are both Pete Dye designs and are among the earliest signature-architect layouts in La Quinta. They are the reason the Palm Springs–area professional golf calendar has historically ended at this end of the valley, and they remain the visual identity of the resort core.',
      },
      {
        heading: 'What the residential product is (and isn\u2019t)',
        body: 'Buyers at La Quinta Resort & Club are almost never buying a large detached primary estate — this is a casita, condo and villa market with strong short-term-rental character. The right buyer is a seasonal second-home owner who wants resort access, a rentable footprint, and walkability to Old Town rather than a private-club country-club life.',
      },
    ],
    faqs: [
      { q: 'Can I buy real estate at La Quinta Resort?', a: 'Yes — the resort footprint and its adjacent HOAs include casitas, condominium plans and villa product owned as private residences. Ownership structures and short-term-rental rules vary by HOA and should be verified before offer.' },
      { q: 'Are the Dunes and Mountain courses public?', a: 'Historically both have operated on a resort-access model — playable for guests of the resort. Verify current access and any member-priority policy directly with the resort.' },
      ...DEFAULT_FAQ,
    ],
    searchIntents: [
      'La Quinta Resort real estate',
      'Legacy Villas La Quinta',
      'Dunes Course La Quinta',
      'La Quinta Resort casita for sale',
    ],
  },

  'duna-la-quinta': {
    image: '/images/communities/duna-la-quinta.jpg',
    tagline: 'Guard-gated condos and casitas on the historic Dunes Course side of La Quinta Resort.',
    overview: 'Duna La Quinta is one of the older guard-gated HOA communities in La Quinta, sitting along the historic Dunes Course footprint on the resort side of the city. The community is predominantly attached casitas and condominium plans built in the 1980s, with subsequent remodels and infill. HOA scope is comparatively broad by La Quinta standards — exterior maintenance, common landscaping, pools and gate — which is a signature reason the community reads as one of the more affordable inside-the-rope La Quinta addresses. Buyers are typically seasonal second-home owners, snowbirds and lock-and-leave investors rather than full-time custom-home buyers.',
    quickFacts: [
      { label: 'City',        value: 'La Quinta, CA 92253' },
      { label: 'Access',      value: 'Guard-gated' },
      { label: 'Product',     value: 'Casitas & condominium plans' },
      { label: 'Era',         value: 'Original build 1980s' },
      { label: 'HOA scope',   value: 'Broad — exterior + amenities' },
    ],
    faqs: [
      { q: 'Is Duna La Quinta a golf community?', a: 'Duna La Quinta is adjacent to the Dunes Course area of La Quinta Resort. It is an HOA residential community; club access to any golf facility is separate from home ownership and must be verified.' },
      { q: 'What kind of homes are inside Duna La Quinta?', a: 'The community is predominantly attached casita and condominium product built in the 1980s, with subsequent remodels.' },
      ...DEFAULT_FAQ,
    ],
    searchIntents: [
      'Duna La Quinta condos for sale',
      'Duna La Quinta HOA fees',
      'La Quinta Dunes Course community',
      'Duna La Quinta short term rental',
    ],
  },

  'trilogy-at-la-quinta': {
    image: '/images/communities/trilogy-at-la-quinta.jpg',
    tagline: 'Shea Homes\u2019 55+ active-adult community with a Gary Panks–designed course.',
    overview: 'Trilogy at La Quinta is a Shea Homes 55+ active-adult master-planned community on the south side of La Quinta, developed in the mid-2000s. The community is organized around an 18-hole Gary Panks–designed course, a large clubhouse-and-fitness complex, tennis and pickleball programming, and an intentionally social calendar. Homes are predominantly single-story detached plans with two- to three-car garages, built on modest lots for lock-and-leave ownership. Because it is age-restricted, Trilogy behaves differently on resale than the non-age-restricted La Quinta clubs — buyer pool is narrower, but demand from Coachella Valley snowbirds is deep. It is one of the strongest arguments in La Quinta for an active-adult buyer who wants gate, course and social calendar without private-club initiation.',
    quickFacts: [
      { label: 'City',         value: 'La Quinta, CA 92253' },
      { label: 'Type',         value: '55+ active-adult, master-planned' },
      { label: 'Developer',    value: 'Shea Homes' },
      { label: 'Course',       value: '18-hole (Gary Panks)' },
      { label: 'Access',       value: 'Guard-gated' },
    ],
    faqs: [
      { q: 'Is Trilogy at La Quinta age-restricted?', a: 'Yes. Trilogy is a 55+ active-adult community and the age restriction is enforced through the HOA.' },
      { q: 'Do homeowners at Trilogy have golf access?', a: 'The community includes an 18-hole Gary Panks–designed course. Golf-membership terms are separate from home ownership; verify current dues and access with the club.' },
      ...DEFAULT_FAQ,
    ],
    searchIntents: [
      'Trilogy at La Quinta homes for sale',
      '55+ community La Quinta',
      'Shea Homes La Quinta',
      'Trilogy La Quinta HOA fees',
    ],
  },

  'coral-mountain-club': {
    image: '/images/communities/coral-mountain-club.jpg',
    tagline: 'Small residential enclave at the base of the Coral Reef Mountains in south La Quinta.',
    overview: 'Coral Mountain is a small residential area at the far south end of La Quinta, tucked below the Coral Reef Mountains that give the neighborhood its name. The area has been the subject of multiple master-plan proposals over the years — including a Jack Nicklaus–routed private club and a later resort/surf proposal that was denied by the city in 2022. Today the built residential footprint is limited, and buyers interested in the area should treat "Coral Mountain" primarily as a location and mountain-framing rather than a fully-formed private-club community. The setting is dramatic: quiet, isolated at valley scale, with unusually direct exposure to the Santa Rosa and Coral Reef ranges.',
    quickFacts: [
      { label: 'City',        value: 'La Quinta, CA 92253' },
      { label: 'Character',   value: 'Small residential enclave' },
      { label: 'Setting',     value: 'Base of the Coral Reef Mountains' },
      { label: 'Status',      value: 'Partial buildout' },
    ],
    faqs: [
      { q: 'Is Coral Mountain a private golf club?', a: 'A private-club plan was proposed for Coral Mountain but the built residential footprint is limited. Buyers should verify the current status of any club or amenity plan directly before writing an offer.' },
      { q: 'What happened to the Coral Mountain resort proposal?', a: 'A resort-with-surf-lagoon proposal for the site was denied by the City of La Quinta in 2022. Subsequent proposals for the property have continued to evolve.' },
      ...DEFAULT_FAQ,
    ],
    searchIntents: [
      'Coral Mountain La Quinta homes',
      'Coral Mountain Club status',
      'Coral Mountain surf park',
      'south La Quinta real estate',
    ],
  },

  'santa-rosa-cove': {
    image: '/images/communities/santa-rosa-cove.jpg',
    tagline: 'A guard-gated HOA on the resort side of La Quinta, walkable to Old Town.',
    overview: 'Santa Rosa Cove is one of the original guard-gated residential communities on the resort side of La Quinta, adjacent to La Quinta Resort & Club. The community is a mix of condominium plans and single-family homes built in phases beginning in the late 1970s and 1980s, with more recent remodel activity across the inventory. HOA scope includes gate, common landscaping and pools; short-term-rental rules are HOA-controlled and vary by phase. The community\u2019s defining benefit is location: buyers here are effectively walking-distance to the resort core, the historic Dunes and Mountain course frontages, and the Old Town La Quinta shopping and dining district.',
    quickFacts: [
      { label: 'City',       value: 'La Quinta, CA 92253' },
      { label: 'Access',     value: 'Guard-gated HOA' },
      { label: 'Era',        value: 'Original build late 1970s/1980s' },
      { label: 'Product',    value: 'Condominiums & single-family' },
      { label: 'Location',   value: 'Walkable to Old Town + resort' },
    ],
    faqs: [
      { q: 'Are short-term rentals allowed in Santa Rosa Cove?', a: 'Short-term rental rules are HOA-controlled and vary by phase and by governing document. Verify the current STR policy for the specific address before making an offer.' },
      { q: 'Does Santa Rosa Cove include La Quinta Resort access?', a: 'Home ownership does not automatically include resort or golf access. Any resort or club access is negotiated separately from real-estate ownership.' },
      ...DEFAULT_FAQ,
    ],
    searchIntents: [
      'Santa Rosa Cove La Quinta homes',
      'Santa Rosa Cove HOA',
      'La Quinta Resort residences',
      'Santa Rosa Cove short term rental',
    ],
  },

  'griffin-ranch': {
    image: '/images/communities/griffin-ranch.jpg',
    tagline: 'A Trans West–developed gated estate community on historic ranch land in La Quinta.',
    overview: 'Griffin Ranch is a guard-gated luxury residential community in La Quinta developed by Trans West Housing on a parcel with genuine ranching history — the Merv Griffin estate is the namesake reference, and the entry landscape retains legacy plantings from that era. It is not a golf community; the amenities are focused on a private clubhouse, fitness, tennis and pickleball rather than a course. Homes are predominantly larger single-family estates on generous lots, built from the late 2000s onward, with a Mediterranean-and-Spanish architectural code. The community is a common option for La Quinta buyers who want a true estate footprint, security and quiet without paying private-golf-club initiation dues.',
    quickFacts: [
      { label: 'City',        value: 'La Quinta, CA 92253' },
      { label: 'Developer',   value: 'Trans West Housing' },
      { label: 'Access',      value: 'Guard-gated' },
      { label: 'Golf',        value: 'No — non-golf luxury community' },
      { label: 'Real estate', value: 'Larger single-family estates' },
    ],
    faqs: [
      { q: 'Is Griffin Ranch a golf community?', a: 'No. Griffin Ranch is a non-golf gated luxury residential community. Amenities include a clubhouse, fitness, tennis and pickleball.' },
      { q: 'Who developed Griffin Ranch?', a: 'The community was developed by Trans West Housing on land historically associated with the Merv Griffin ranch.' },
      ...DEFAULT_FAQ,
    ],
    searchIntents: [
      'Griffin Ranch La Quinta homes',
      'Merv Griffin estate La Quinta',
      'non-golf gated community La Quinta',
      'Trans West La Quinta',
    ],
  },

  'codorniz': {
    image: '/images/communities/codorniz.jpg',
    tagline: 'A small Mediterranean-style gated community with tight-knit HOA character.',
    overview: 'Codorniz is a small gated residential community in La Quinta built in a Mediterranean-and-Spanish architectural language, with attached and detached casita-style plans clustered around common courtyards and pool amenities. The community is comparatively compact — one of the smaller HOAs on this side of La Quinta — and reads more village-scaled than the master-planned communities to the south. Buyers here tend to be lock-and-leave second-home owners and downsizers who want the desert-Mediterranean aesthetic without the maintenance load of a large detached estate.',
    quickFacts: [
      { label: 'City',       value: 'La Quinta, CA 92253' },
      { label: 'Access',     value: 'Gated HOA' },
      { label: 'Style',      value: 'Mediterranean / Spanish casita' },
      { label: 'Character',  value: 'Small, village-scaled' },
    ],
    faqs: [
      { q: 'What is Codorniz\u2019s architectural style?', a: 'Predominantly Mediterranean-and-Spanish, with casita-style plans organized around common courtyards.' },
      { q: 'Is Codorniz a golf community?', a: 'No. Codorniz is a small gated residential HOA. Any golf access is negotiated separately by the buyer.' },
      ...DEFAULT_FAQ,
    ],
    searchIntents: [
      'Codorniz La Quinta homes',
      'Codorniz HOA fees',
      'small gated community La Quinta',
      'La Quinta casita for sale',
    ],
  },

  'legacy-villas': {
    image: '/images/communities/legacy-villas.jpg',
    tagline: 'Resort-adjacent villa product built in the 2000s next to La Quinta Resort & Club.',
    overview: 'Legacy Villas at La Quinta is a resort-adjacent villa community sitting immediately next to La Quinta Resort & Club. The product is predominantly attached villa plans built in the mid-to-late 2000s in a Mediterranean-Spanish architectural language, with HOA amenities that mirror the resort feel — pools, spa areas, fitness and manicured common landscaping. Because the community is designed for seasonal ownership and rental income, HOA rules and short-term-rental policy are meaningful factors on any transaction. Buyers tend to be second-home owners looking for a rentable footprint with walk-to-resort access, rather than full-time primary-residence buyers.',
    quickFacts: [
      { label: 'City',       value: 'La Quinta, CA 92253' },
      { label: 'Product',    value: 'Attached villa plans' },
      { label: 'Era',        value: 'Original build mid-to-late 2000s' },
      { label: 'Location',   value: 'Adjacent to La Quinta Resort' },
      { label: 'Buyer fit',  value: 'Seasonal / rentable second home' },
    ],
    faqs: [
      { q: 'Are short-term rentals allowed at Legacy Villas?', a: 'Legacy Villas has historically supported seasonal-rental ownership, but STR policies are HOA-controlled and change. Verify current STR rules for the specific unit before making an offer.' },
      { q: 'Does buying at Legacy Villas include resort access?', a: 'Home ownership does not automatically include resort membership. Resort and golf access are negotiated separately.' },
      ...DEFAULT_FAQ,
    ],
    searchIntents: [
      'Legacy Villas La Quinta for sale',
      'La Quinta Resort villas',
      'Legacy Villas rental',
      'La Quinta villa condo',
    ],
  },

  'enclave-mountain-estates': {
    image: '/images/communities/enclave-mountain-estates.jpg',
    tagline: 'A small custom-estate enclave with direct mountain exposure in La Quinta.',
    overview: 'Enclave Mountain Estates is a small custom-lot community in La Quinta focused on larger detached estates with direct exposure to the Santa Rosa Mountains. Product is predominantly custom single-family — homes here are architect-designed rather than production-plan — which gives the community more architectural variety than the master-planned gated communities on the same side of town. Because inventory is limited and each home is individually programmed, resale velocity is slower than the larger HOAs and the buyer pool is narrower and higher-intent.',
    quickFacts: [
      { label: 'City',        value: 'La Quinta, CA 92253' },
      { label: 'Character',   value: 'Custom-lot estate enclave' },
      { label: 'Product',     value: 'Detached custom single-family' },
      { label: 'Setting',     value: 'Direct Santa Rosa Mountain exposure' },
    ],
    faqs: [
      { q: 'Is Enclave Mountain Estates a production-home community?', a: 'No. The community is a custom-lot enclave — homes are architect-designed rather than developer plan-built.' },
      { q: 'Is there a golf course inside Enclave Mountain Estates?', a: 'No. The community is non-golf. Golf-club membership is negotiated separately from home ownership.' },
      ...DEFAULT_FAQ,
    ],
    searchIntents: [
      'Enclave Mountain Estates La Quinta',
      'custom estate La Quinta',
      'mountain view estate La Quinta',
      'La Quinta luxury custom home',
    ],
  },

  'the-cove-at-la-quinta': {
    image: '/images/communities/the-cove-at-la-quinta.jpg',
    tagline: 'The historic non-gated hillside neighborhood south of Old Town La Quinta.',
    overview: 'The Cove at La Quinta is the historic hillside residential neighborhood immediately south of Old Town La Quinta, tucked against the Santa Rosa Mountains and framed on the west by Bear Creek. It is not gated. The neighborhood is a genuine time-capsule of Coachella Valley residential history — original 1930s–1970s cottages sit next to fully-renovated luxury remodels and new-construction modern homes, sometimes on the same block. The Cove\u2019s defining benefits are its walkability to Old Town La Quinta, direct access to Bear Creek Trail and the Fritz Burns Park network, and the neighborhood-scale character that the master-planned gated communities elsewhere in La Quinta deliberately do not offer. It is the most character-forward address in the city for a buyer who wants La Quinta without a private-club or HOA structure.',
    quickFacts: [
      { label: 'City',        value: 'La Quinta, CA 92253' },
      { label: 'Type',        value: 'Non-gated historic neighborhood' },
      { label: 'Vintage',     value: '1930s–present (wide mix)' },
      { label: 'Location',    value: 'Walkable to Old Town La Quinta' },
      { label: 'Access',      value: 'Bear Creek Trail + Fritz Burns Park' },
    ],
    sections: [
      {
        heading: 'A neighborhood, not a community',
        body: 'The Cove is the one address in this guide that is deliberately not gated, not master-planned, and not HOA-scoped in the way the private clubs are. Streets are city streets, architecture is a wide mix, and neighbors range from third-generation locals to newly-arrived remodelers. That is the point — the Cove is the historic residential fabric of La Quinta, and its character is exactly what buyers who want a lifestyle village rather than a private-club estate come for.',
      },
    ],
    faqs: [
      { q: 'Is The Cove a gated community?', a: 'No. The Cove is a non-gated historic residential neighborhood south of Old Town La Quinta. Streets are city-maintained and there is no perimeter gate.' },
      { q: 'What vintage of homes are in The Cove?', a: 'A very wide mix — original 1930s–1970s cottages sit alongside recent luxury remodels and new construction, sometimes on the same block.' },
      ...DEFAULT_FAQ,
    ],
    searchIntents: [
      'The Cove La Quinta homes',
      'La Quinta Cove neighborhood',
      'Old Town La Quinta homes',
      'Bear Creek Trail La Quinta homes',
    ],
  },

  'painted-cove': {
    image: '/images/communities/painted-cove.jpg',
    tagline: 'A small gated residential HOA in La Quinta.',
    overview: 'Painted Cove is a small gated residential HOA in La Quinta with a Mediterranean-Spanish architectural language and a compact detached-and-attached home mix. The community is comparatively low-profile — small enough that resale inventory is thin — and reads as a fit for a buyer who wants gate, HOA maintenance and desert-Mediterranean architecture without the scale of a resort-tier villa community. HOA scope, short-term-rental rules and any amenity access should be verified per address, as these vary by phase and governing document.',
    quickFacts: [
      { label: 'City',    value: 'La Quinta, CA 92253' },
      { label: 'Access',  value: 'Gated HOA' },
      { label: 'Style',   value: 'Mediterranean / Spanish' },
      { label: 'Scale',   value: 'Small — thin resale inventory' },
    ],
    faqs: [
      { q: 'Is Painted Cove a golf community?', a: 'No. Painted Cove is a residential HOA. Any golf-club access is negotiated separately from home ownership.' },
      { q: 'What is the HOA scope at Painted Cove?', a: 'HOA scope, short-term-rental rules and amenity access should be verified per address, as they vary by phase and governing document.' },
      ...DEFAULT_FAQ,
    ],
    searchIntents: [
      'Painted Cove La Quinta homes',
      'Painted Cove HOA',
      'small gated community La Quinta',
    ],
  },

  'la-quinta-fairways': {
    image: '/images/communities/la-quinta-fairways.jpg',
    tagline: 'A guard-gated HOA of single-family homes along a La Quinta fairway.',
    overview: 'La Quinta Fairways is a guard-gated HOA community of single-family homes in La Quinta, laid out along and around a public fairway edge on the resort-course side of the city. The community reads more traditional than the newer master-planned gated communities to the south — larger front-yard footprints, mature planting, and an HOA scope focused on gate, common landscaping and pool. Homes are predominantly single-story detached with two- to three-car garages, and turnover is steady rather than high-velocity. Buyers here tend to be seasonal second-home owners who want a gate and a fairway view without private-club initiation.',
    quickFacts: [
      { label: 'City',        value: 'La Quinta, CA 92253' },
      { label: 'Access',      value: 'Guard-gated HOA' },
      { label: 'Product',     value: 'Single-family detached' },
      { label: 'Setting',     value: 'Fairway edge' },
    ],
    faqs: [
      { q: 'Does buying in La Quinta Fairways include golf access?', a: 'No. La Quinta Fairways is a residential HOA. Golf-course access is separate from home ownership and negotiated with the applicable club.' },
      { q: 'Is La Quinta Fairways guard-gated?', a: 'Yes — the community has a manned gate and HOA-scoped common areas.' },
      ...DEFAULT_FAQ,
    ],
    searchIntents: [
      'La Quinta Fairways homes for sale',
      'La Quinta Fairways HOA',
      'fairway home La Quinta',
    ],
  },

  'estancia-la-quinta': {
    image: '/images/communities/estancia-la-quinta.jpg',
    tagline: 'A gated residential community with contemporary Mediterranean architecture.',
    overview: 'Estancia La Quinta is a gated residential community in La Quinta with a contemporary Mediterranean architectural language. Product is predominantly detached single-family plans on modest lots, developer-built with an HOA overseeing common landscaping, gate, and shared amenities. The community reads as a fit for buyers who want gate, maintenance-managed exterior and desert-Mediterranean design without the size or price band of the flagship private-club communities. Buyer profile skews seasonal second-home ownership and long-tenure primary residency.',
    quickFacts: [
      { label: 'City',       value: 'La Quinta, CA 92253' },
      { label: 'Access',     value: 'Gated HOA' },
      { label: 'Style',      value: 'Contemporary Mediterranean' },
      { label: 'Product',    value: 'Detached single-family plans' },
    ],
    faqs: [
      { q: 'Is Estancia La Quinta a golf community?', a: 'No. Estancia La Quinta is a residential HOA. Golf-club access is separate from ownership.' },
      { q: 'What kind of homes are in Estancia La Quinta?', a: 'The community is predominantly detached single-family plans in a contemporary Mediterranean design language.' },
      ...DEFAULT_FAQ,
    ],
    searchIntents: [
      'Estancia La Quinta homes for sale',
      'Estancia La Quinta HOA fees',
      'Mediterranean home La Quinta',
    ],
  },

  'palmilla': {
    image: '/images/communities/palmilla.jpg',
    tagline: 'A gated custom-and-plan estate community in La Quinta.',
    overview: 'Palmilla is a gated residential community in La Quinta with a Mediterranean-and-Spanish architectural code, sitting in the residential ring that connects the resort side of the city with the private-club corridor to the south. Product is a mix of larger production-plan homes and custom estates on generous lots, with HOA-scoped exterior common areas and a manned or key-card gate. Buyers here tend to be seasonal owners and downsizers looking for detached estate feel without the initiation cost of a private country club — a familiar La Quinta buyer archetype.',
    quickFacts: [
      { label: 'City',       value: 'La Quinta, CA 92253' },
      { label: 'Access',     value: 'Gated HOA' },
      { label: 'Style',      value: 'Mediterranean / Spanish' },
      { label: 'Product',    value: 'Plan + custom detached estates' },
    ],
    faqs: [
      { q: 'Is Palmilla a golf community?', a: 'No. Palmilla is a residential HOA. Golf-club access is negotiated separately from home ownership.' },
      { q: 'Are Palmilla homes production or custom?', a: 'The community has both — larger production-plan homes and a smaller number of true custom estates on the more generous lots.' },
      ...DEFAULT_FAQ,
    ],
    searchIntents: [
      'Palmilla La Quinta homes for sale',
      'Palmilla La Quinta HOA',
      'gated estate La Quinta',
    ],
  },

  'haciendas-at-la-quinta': {
    image: '/images/communities/haciendas-at-la-quinta.jpg',
    tagline: 'A gated residential community with hacienda-style architecture in La Quinta.',
    overview: 'Haciendas at La Quinta is a gated residential HOA in La Quinta with a hacienda / Spanish-Colonial architectural language — courtyard entries, arched arcades, and a warmer terracotta-and-stucco palette than the more contemporary communities on the south side of the city. Homes are predominantly detached single-family plans on modest-to-mid-sized lots, developer-built with HOA-scoped common landscaping and gate. The community appeals to buyers who want the visual identity of traditional Coachella Valley architecture rather than the desert-modern language of the newer flagship clubs.',
    quickFacts: [
      { label: 'City',      value: 'La Quinta, CA 92253' },
      { label: 'Access',    value: 'Gated HOA' },
      { label: 'Style',     value: 'Hacienda / Spanish-Colonial' },
      { label: 'Product',   value: 'Detached single-family plans' },
    ],
    faqs: [
      { q: 'Is Haciendas at La Quinta a private-club community?', a: 'No. Haciendas at La Quinta is a residential HOA. Any club access is negotiated separately.' },
      { q: 'What is the architectural style at Haciendas?', a: 'Hacienda / Spanish-Colonial — courtyard entries and traditional terracotta-and-stucco material palette.' },
      ...DEFAULT_FAQ,
    ],
    searchIntents: [
      'Haciendas at La Quinta homes',
      'Spanish colonial home La Quinta',
      'Haciendas HOA fees',
    ],
  },

  'piazza-serena': {
    image: '/images/communities/piazza-serena.jpg',
    tagline: 'A gated Mediterranean-style residential community in La Quinta.',
    overview: 'Piazza Serena is a gated residential community in La Quinta with a Mediterranean architectural language. Product is a mix of detached single-family plans on modest lots, HOA-scoped for gate, common landscaping and amenities. The community is comparatively low-profile among La Quinta HOAs — thinner resale inventory than the master-planned communities, and a quieter internal streetscape. Buyer fit is seasonal ownership, downsizing and lock-and-leave second-home use.',
    quickFacts: [
      { label: 'City',       value: 'La Quinta, CA 92253' },
      { label: 'Access',     value: 'Gated HOA' },
      { label: 'Style',      value: 'Mediterranean' },
      { label: 'Character',  value: 'Small — thinner resale inventory' },
    ],
    faqs: [
      { q: 'Is Piazza Serena a golf community?', a: 'No. Piazza Serena is a residential HOA. Golf-club access is negotiated separately from home ownership.' },
      { q: 'Are homes at Piazza Serena detached or attached?', a: 'Predominantly detached single-family plans on modest lots.' },
      ...DEFAULT_FAQ,
    ],
    searchIntents: [
      'Piazza Serena La Quinta homes',
      'Piazza Serena HOA',
      'gated Mediterranean La Quinta',
    ],
  },

  'watercolors-at-la-quinta': {
    image: '/images/communities/watercolors-at-la-quinta.jpg',
    tagline: 'A gated residential community in La Quinta.',
    overview: 'Watercolors at La Quinta is a gated residential HOA in La Quinta. Product is a mix of detached single-family plans with a contemporary desert-and-Mediterranean architectural language, developer-built with HOA-scoped common landscaping and amenities. Because governing documents, age-restriction status and HOA scope vary and can change, buyers should verify current HOA rules, age-restriction policy (if any) and short-term-rental status per address before writing an offer. The community appeals to buyers who want gate, exterior-managed maintenance and a lower entry point than the master-planned private-club communities.',
    quickFacts: [
      { label: 'City',       value: 'La Quinta, CA 92253' },
      { label: 'Access',     value: 'Gated HOA' },
      { label: 'Product',    value: 'Detached single-family plans' },
    ],
    faqs: [
      { q: 'Is Watercolors at La Quinta age-restricted?', a: 'Age-restriction status can change with the governing documents. Verify the current policy directly with the HOA before writing an offer.' },
      { q: 'Is Watercolors a golf community?', a: 'No. Watercolors is a residential HOA. Any golf access is negotiated separately from home ownership.' },
      ...DEFAULT_FAQ,
    ],
    searchIntents: [
      'Watercolors La Quinta homes',
      'Watercolors HOA fees',
      'gated community La Quinta',
    ],
  },

  'bella-vista': {
    image: '/images/communities/bella-vista.jpg',
    tagline: 'A gated residential community in La Quinta with mountain-framing views.',
    overview: 'Bella Vista at La Quinta is a gated residential HOA in La Quinta with a Mediterranean-and-Spanish architectural language and detached single-family plans built on modest-to-mid-sized lots. HOA scope covers gate, common landscaping and shared amenities. The community\u2019s defining benefit is its view corridor — most streets are oriented to capture direct Santa Rosa Mountain framing, which is what buyers here are ultimately paying for. Product mix is predominantly single-story with two- to three-car garages, appropriate for lock-and-leave second-home ownership.',
    quickFacts: [
      { label: 'City',       value: 'La Quinta, CA 92253' },
      { label: 'Access',     value: 'Gated HOA' },
      { label: 'Style',      value: 'Mediterranean / Spanish' },
      { label: 'Setting',    value: 'Mountain-framed view corridors' },
    ],
    faqs: [
      { q: 'Is Bella Vista at La Quinta a golf community?', a: 'No. Bella Vista is a residential HOA. Golf-club access is negotiated separately from home ownership.' },
      { q: 'What kind of homes are at Bella Vista?', a: 'Predominantly detached single-family plans, most single-story, on modest-to-mid-sized lots with mountain view orientation.' },
      ...DEFAULT_FAQ,
    ],
    searchIntents: [
      'Bella Vista La Quinta homes',
      'Bella Vista HOA fees',
      'mountain view home La Quinta',
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
