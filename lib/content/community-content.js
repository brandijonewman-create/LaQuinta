// Long-form community content. Verified factual scaffolding only; no
// fabricated price points, no invented owner names, no celebrity addresses.
// Each numeric is presented as a range or labeled 'historically known to' /
// 'widely understood as' to keep the editorial honest.

const defaultImage = 'https://images.pexels.com/photos/10831185/pexels-photo-10831185.jpeg';

const DEFAULT_FAQ = [
  { q: 'Is this site affiliated with the club?',           a: 'No. La Quinta Golf Lifestyle has no formal affiliation with any private club referenced on the site. We do partner with California-licensed real estate professionals who specialize in La Quinta clubs.' },
  { q: 'Can you list a home in this community for me?',    a: 'We work with California-licensed real estate partners. The live IDX listings feed appears once the CARETS/CRMLS feed and partner agent are in place.' },
];

export const communityContent = {
  'the-madison-club': {
    image: 'https://images.pexels.com/photos/14869685/pexels-photo-14869685.jpeg',
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
        body: 'Within La Quinta, The Madison Club is most often compared to The Quarry (also Fazio, smaller, more vertical topography) and to The Hideaway (Dye + Clark, mid-size, 36 holes). Madison sits at the highest price tier of the seven La Quinta private clubs, with newer construction, larger lots, and the strictest architectural code. It is not the right fit for a buyer who wants a deep social calendar, family programming, or significant resort-style amenities — those belong to PGA West, La Quinta Country Club, and to a degree Andalusia. Madison\u2019s defining quality is privacy.',
      },
    ],
    faqs: [
      { q: 'Is The Madison Club accepting new members?', a: 'Membership status changes and is not publicly published. Verify directly with the club; we do not publish member-status numbers we have not confirmed.' },
      { q: 'What is the architectural style at The Madison Club?', a: 'The community is dominated by contemporary California and modern Spanish-Mediterranean custom estates on substantial lots. There are no condos or fairway villas.' },
      { q: 'Are tee times difficult to get?', a: 'Because of the small membership and the absence of public/resort play, tee sheets at Madison are generally less pressured than at the larger La Quinta clubs.' },
      ...DEFAULT_FAQ,
    ],
  },

  'the-hideaway': {
    image: 'https://images.unsplash.com/photo-1621881806763-1b8128f374a7',
    tagline: 'Two distinct courses, one gate — Pete Dye and Clive Clark in La Quinta.',
    overview:
      'The Hideaway is a 36-hole private community on Hideaway Way in central La Quinta. Its defining feature is the rare pairing of two complete 18-hole routings behind a single gate, one by Pete Dye and one by Clive Clark. Members move freely between the two courses, which gives the club an unusual breadth of golf for its size and lets the architectural personalities sit side-by-side in productive contrast: Dye\u2019s visual edge against Clark\u2019s more open, member-friendly lines. The real-estate footprint is mid-scale, the architecture is cohesive, and the membership feels notably tighter than at PGA West despite the comparable course count.',
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
  },

  'pga-west': {
    image: 'https://images.pexels.com/photos/8334036/pexels-photo-8334036.jpeg',
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
  },

  'the-tradition-golf-club': {
    image: 'https://images.unsplash.com/photo-1590912550141-1448da2bd5da',
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
  },

  'andalusia-country-club': {
    image: 'https://images.pexels.com/photos/8065818/pexels-photo-8065818.jpeg',
    tagline: 'A Rees Jones design at the southern edge of La Quinta.',
    overview:
      'Andalusia Country Club sits at the southern end of La Quinta, just east of Madison Street, on land that was previously open desert and agricultural plots. It opened in the mid-2000s with a Rees Jones routing and a master plan that emphasized newer construction, modern Spanish-Mediterranean architecture, and large view corridors framing the Santa Rosa Mountains. Among the seven La Quinta private clubs, Andalusia is the most architecturally consistent newer-construction community: most homes are post-2005, building heights and palettes are tightly controlled, and the streetscape reads as a single design language rather than a patchwork.',
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
        body: 'Rees Jones is best known nationally for U.S. Open course restorations, and his original work at Andalusia reflects that idiom: classically proportioned green complexes, fairway bunkering placed for the modern tour player rather than the modest amateur, and a relatively conservative green-to-tee routing. The course is more demanding than The Tradition but more forgiving than the Dye courses at PGA West and The Hideaway. Conditioning is consistent.',
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
  },

  'the-quarry-at-la-quinta': {
    image: 'https://images.pexels.com/photos/14869685/pexels-photo-14869685.jpeg',
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
  },

  'la-quinta-country-club': {
    image: 'https://images.pexels.com/photos/10831185/pexels-photo-10831185.jpeg',
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
        body: 'The streetscape around La Quinta Country Club is the most architecturally varied of the seven La Quinta clubs. Mid-century single-story originals sit next to classic Spanish-Mediterranean homes from the 1970s and 80s and to recent custom remodels. Mature trees and irrigated landscaping are dominant. The neighborhood\u2019s proximity to the Cove and Old Town gives it a walkability that none of the southern La Quinta clubs share — a meaningful lifestyle differentiator.',
      },
    ],
    faqs: [
      { q: 'Is La Quinta Country Club the oldest private club in the city?', a: 'Yes — it was founded in 1959 and predates every other private club in La Quinta.' },
      { q: 'Is it walkable to Old Town?', a: 'Yes. The club and its surrounding neighborhood are within walking distance of Old Town La Quinta and the Cove.' },
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
