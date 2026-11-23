// Long-form editorial for /compare/[slug] pages.
//
// PURPOSE (AdSense quality pass, June 2025): comparison pages previously
// rendered ~250 words of unique content (spec table + verdict). Each entry
// below adds ~600-750 words of original analysis so every comparison page
// stands on its own as a substantive editorial article.
//
// EDITORIAL RULES:
//  - No invented prices, fees, or dues beyond figures already published
//    elsewhere on this site (lib/data.js).
//  - Qualitative, defensible characterizations only.
//  - Keyed by COMPARISON_PAIRS.slug.

export const COMPARE_EDITORIAL = {

  'grayhawk-vs-troon-north': {
    sections: [
      {
        heading: 'Two different ideas of North Scottsdale',
        paragraphs: [
          'Grayhawk and Troon North sit barely fifteen minutes apart, but they were built around two different theories of what a golf community should be. Grayhawk, in the 85255 corridor near the Loop 101, was master-planned as a complete neighborhood first and a golf destination second: tree-lined streets, connected walking paths, village retail within the community, and a resident mix that skews noticeably younger and more family-driven than most of north Scottsdale.',
          'Troon North, further north in 85262, inverts that formula. The Monument and Pinnacle courses are the organizing principle, and the homes were arranged around them: larger lots, more dramatic boulder-strewn topography, and far less of the village-center busyness. Where Grayhawk hums, Troon North is quiet. Buyers consistently describe the difference in exactly those terms after touring both on the same day.'
        ]
      },
      {
        heading: 'The golf: access versus drama',
        paragraphs: [
          'Both communities offer public-access golf, which immediately separates them from the equity-club tier (Estancia, Silverleaf, Desert Mountain) where six-figure initiation is the price of admission. Grayhawk\u2019s Talon and Raptor courses are championship-caliber daily-fee layouts with serious tournament pedigree, and the practice and clubhouse scene reflects a busy, social, semi-resort operation.',
          'Troon North\u2019s Monument and Pinnacle are routinely ranked among the best public courses in the country, and they play through a landscape Grayhawk simply cannot match: granite outcroppings, saguaro forests, and elevation movement that makes nearly every hole a postcard. If the course itself is the reason you are moving to Scottsdale, Troon North usually wins this category outright. If you want good golf woven into a fuller neighborhood life, Grayhawk\u2019s model is the better fit.'
        ]
      },
      {
        heading: 'Homes, lots, and architecture',
        paragraphs: [
          'Grayhawk\u2019s housing stock is broader at the entry point: townhomes, patio homes, and production single-family homes share the community with its luxury custom enclaves, which is why its published range starts well under $1M. Architecture trends toward polished Santa Barbara and desert-contemporary production styles, with the premium product concentrated in the gated Talon and Raptor retreat sections.',
          'Troon North starts higher and climbs much higher. Lots are generally larger, the custom-home percentage is greater, and the architectural character is bolder: organic desert-contemporary homes built into hillsides, walls of glass aimed at Pinnacle Peak, and a stronger presence of true architect-designed one-offs. Buyers prioritizing privacy and a signature home tend to land here; buyers prioritizing lock-and-leave convenience often land in Grayhawk.'
        ]
      },
      {
        heading: 'Which buyer should pick which',
        paragraphs: [
          'Choose Grayhawk if you are relocating with a family, want walkable amenities and a sociable neighborhood rhythm, or want the lowest realistic entry price into a name-brand north Scottsdale golf community. It is also the more practical commuter base: the 101 is minutes away, and Kierland, Scottsdale Quarter, and the airport corridor are all close.',
          'Choose Troon North if golf quality and desert setting outrank convenience on your list, if you want a larger lot with mountain or boulder views, or if you are a snowbird buyer who wants the classic high-Sonoran experience without committing to a private-club initiation. Many buyers who start by touring Grayhawk for practicality end up in Troon North because the land simply moved them, and the reverse migration happens just as often when school calendars enter the picture.'
        ]
      }
    ]
  },

  'dc-ranch-vs-silverleaf': {
    sections: [
      {
        heading: 'One master plan, two different worlds',
        paragraphs: [
          'This is the comparison that confuses out-of-state buyers most, because Silverleaf technically sits inside the DC Ranch master plan. Both share the same 4,400-acre footprint at the base of the McDowell Mountains, the same general address, and the same developer DNA. But the moment you pass through Silverleaf\u2019s dedicated guard gate, the difference is unmistakable: lot sizes jump, architecture standards tighten dramatically, and the entire pace of the community changes.',
          'DC Ranch proper is organized as a series of village neighborhoods with a genuine community fabric: parks, paths, community centers, and the Market Street district with restaurants and everyday retail a golf-cart ride away. Silverleaf is quieter and more rarefied: a 1,500-acre enclave climbing into the canyons and ridgelines of the McDowells, where homes are individually commissioned estates rather than neighborhood collections.'
        ]
      },
      {
        heading: 'Club access and the social ladder',
        paragraphs: [
          'DC Ranch residents orient around the Country Club at DC Ranch, a private club whose Tom Lehman and John Fought course climbs from the villages into the McDowell foothills, supported by a full campus of dining, fitness, and racquet amenities. It is one of Scottsdale\u2019s most established private-club scenes, and membership, while selective, operates at a meaningfully lower cost of entry than Silverleaf\u2019s.',
          'The Silverleaf Club, anchored by Tom Weiskopf\u2019s celebrated canyon course, is among the most coveted private memberships in the Southwest, with initiation published elsewhere on this site at $250K+ and a sponsorship culture to match. The two clubs are separate institutions; buying in one community does not create access to the other club. For many buyers this single fact decides the comparison.'
        ]
      },
      {
        heading: 'Real estate: breadth versus ceiling',
        paragraphs: [
          'DC Ranch offers the broader market: roughly $1.1M to $9.5M across courtyard homes, village single-family homes, and substantial custom estates in its gated Country Club neighborhoods. It is possible to enter DC Ranch at a price that buys only a lot in Silverleaf.',
          'Silverleaf starts around $3.5M and runs to the very top of the Scottsdale market: its Upper Canyon estates and ridgeline parcels transact at prices that routinely set records for the city. Architectural review is famously rigorous: Mediterranean, Spanish Colonial, and rural ranch vocabularies executed at a level that has made the community a reference point for luxury desert architecture nationally. You are not just buying a home; you are buying into a curated architectural portfolio.'
        ]
      },
      {
        heading: 'Which buyer should pick which',
        paragraphs: [
          'Choose DC Ranch if you want a complete, livable luxury neighborhood: schools nearby, daily errands inside the gate, a private club you can realistically join, and a deep resale market across multiple price bands. It is one of the most consistently liquid luxury submarkets in Scottsdale precisely because it serves families, executives, and snowbirds simultaneously.',
          'Choose Silverleaf if you are operating at the top of the market and want the strongest combination of exclusivity, architecture, and mountain setting Scottsdale offers. It is the community buyers graduate into, often after years in DC Ranch proper, and that internal upgrade path is itself one of the most telling facts in this comparison.'
        ]
      }
    ]
  },

  'desert-mountain-vs-estancia': {
    sections: [
      {
        heading: 'Scale versus intimacy',
        paragraphs: [
          'Desert Mountain and Estancia are both equity-club communities in Scottsdale\u2019s far-north high desert, both carry six-figure initiation, and both attract buyers for whom golf is central to daily life. From there, almost everything diverges. Desert Mountain spans roughly 8,000 acres: a small town behind a gate, with seven courses, nine restaurants, a 60,000-square-foot sports campus, and more than twenty miles of private hiking trails.',
          'Estancia is 640 acres with about 290 homesites wrapped around a single Tom Fazio course on the north face of Pinnacle Peak. It is one of the most intentionally small luxury communities in Arizona. Members know one another. The clubhouse is one building, not a campus. For the right buyer that restraint is exactly the point; for the wrong buyer it can feel limiting within a season.'
        ]
      },
      {
        heading: 'The golf experience',
        paragraphs: [
          'Desert Mountain\u2019s argument is variety: seven distinct courses, six of them Jack Nicklaus Signature designs, which the club describes as the largest private Nicklaus collection anywhere, meaning members can play a different layout every day of the week and tee-time pressure spreads across an enormous inventory of golf. The community also supports an unusually active tournament, instruction, and social-golf calendar because of that capacity.',
          'Estancia\u2019s argument is quality-density: one course, but a course consistently ranked the best private layout in Arizona. Fazio was given a granite-strewn site most architects only dream about, and the result is treated by course-design critics as one of his finest works anywhere. Rounds are unhurried, the course is rarely crowded, and conditioning is maintained at a level a 36-hole-plus operation cannot economically match.'
        ]
      },
      {
        heading: 'Homes and the ownership profile',
        paragraphs: [
          'Desert Mountain\u2019s real-estate market is correspondingly large: published locally at roughly $1.6M to $18M across villages that vary widely in elevation, age, and architectural style. That breadth gives buyers genuine choice and gives the community a steady resale rhythm; there is almost always meaningful inventory somewhere in the community.',
          'Estancia inventory is scarce by design, with only ~290 homesites, single-digit availability is normal, and the published range of roughly $2.8M to $22M reflects custom and semi-custom estates of consistently high architectural caliber. Buyers often wait for the right house rather than choosing among options. Patience is part of the purchase.'
        ]
      },
      {
        heading: 'Which buyer should pick which',
        paragraphs: [
          'Choose Desert Mountain if you want maximum golf variety, a deep amenity program that fills non-golf hours: dining, fitness, tennis, hiking, and a larger social ecosystem where new members integrate quickly through sheer volume of programming. It also suits households where one spouse golfs heavily and the other wants a full club life beyond the course.',
          'Choose Estancia if you value privacy, scarcity, and a single world-class course over breadth, and if a smaller, quieter membership culture appeals more than a busy campus. The honest test: visualize a Tuesday in February. If your ideal Tuesday involves choosing among seven courses and three dinner venues, Desert Mountain. If it involves a 9:40 tee time on a near-empty Fazio masterpiece and a quiet clubhouse lunch, Estancia.'
        ]
      }
    ]
  },

  'troon-north-vs-desert-mountain': {
    sections: [
      {
        heading: 'The defining fork in north Scottsdale golf',
        paragraphs: [
          'This is the classic north-Scottsdale decision because the two communities sit in the same 85262 high-desert corridor, share similar topography, and yet represent the two opposite ownership models in golf real estate. Troon North is built around public-access golf: anyone can play the Monument and Pinnacle courses, and homeownership requires no club commitment whatsoever.',
          'Desert Mountain is the opposite: a fully private community where the seven-course Nicklaus portfolio, the restaurants, and the trail system all sit behind an equity-membership structure. The homes share a desert vocabulary; the financial and social structures around them could not be more different.'
        ]
      },
      {
        heading: 'What the money buys in each model',
        paragraphs: [
          'At Troon North, your housing dollar carries the full weight of the purchase: there is no initiation gate, no mandatory club dues tied to golf, and you can play two of America\u2019s most acclaimed public courses essentially as often as your wallet and the starter allow. The trade-off is that peak-season tee sheets fill with resort guests, green fees float with demand, and there is no members-only clubhouse culture to plug into.',
          'At Desert Mountain, ownership is typically paired with a club membership whose initiation runs well into six figures: a sum that buys guaranteed access, member-rate golf across seven courses, and a complete private-club social infrastructure. Buyers who run the ten-year math often find the gap narrower than the sticker shock suggests, particularly for households playing 100+ rounds a year.'
        ]
      },
      {
        heading: 'Setting, homes, and daily rhythm',
        paragraphs: [
          'Both communities deliver the high-Sonoran landscape: boulders, saguaros, big elevation, and night skies that the central Scottsdale corridor cannot offer. Troon North\u2019s published range of roughly $1.4M to $12M includes townhome and patio-home products alongside major custom estates, making it the more accessible entry into this terrain.',
          'Desert Mountain\u2019s villages span an even wider arc, older southwestern homes in its earliest villages through brand-new desert-contemporary construction, at roughly $1.6M to $18M. Daily rhythm is the underrated difference: Desert Mountain life tends to organize itself around the club, while Troon North life organizes itself around the home, with golf as a frequent but optional excursion.'
        ]
      },
      {
        heading: 'Which buyer should pick which',
        paragraphs: [
          'Choose Troon North if you want elite desert golf without an initiation event, if you split time between multiple homes and cannot justify equity dues, or if you simply prefer the independence of the daily-fee model. It is also the stronger fit for buyers who host a rotating cast of golfing guests, since visitors can book the same courses you play.',
          'Choose Desert Mountain if you are settling in for the long term, want golf-every-day capacity with member pacing, and value the full private-community apparatus: gated security across a vast acreage, club dining as your default kitchen, and a built-in social network. Snowbirds with a six-month season and serious golf appetites are the community\u2019s archetypal buyer for good reason.'
        ]
      }
    ]
  },

  'grayhawk-vs-dc-ranch': {
    sections: [
      {
        heading: 'The most-asked comparison in Scottsdale',
        paragraphs: [
          'Grayhawk and DC Ranch face each other across the 85255 corridor, and they are the two communities out-of-state families shortlist most often, both reachable to top-rated schools, both master-planned with genuine neighborhood infrastructure, both anchored by name-brand golf. The decision usually comes down to club model, lot character, and budget ceiling.',
          'Broadly: Grayhawk is the more open, more affordable, more public-facing of the two; DC Ranch is the more private, more vertically integrated luxury ecosystem, with guard gates, a private country club, and the McDowell Mountains rising directly behind its eastern neighborhoods.'
        ]
      },
      {
        heading: 'Golf and club life',
        paragraphs: [
          'Grayhawk\u2019s Talon and Raptor courses are public-access: a genuine advantage for households that golf occasionally or host visiting players, since there is no initiation barrier and no dues obligation riding on the home purchase. The golf operation doubles as a social hub, with busy practice facilities and one of the area\u2019s liveliest 19th-hole scenes.',
          'DC Ranch routes its golf life through the private Country Club at DC Ranch: an 18-hole Tom Lehman and John Fought design, full clubhouse campus, and a membership process that is selective and costs real money. For committed club families that is a feature: the membership is the social network. For buyers who golf eight times a year, it can be an expensive abstraction, and Grayhawk\u2019s model will feel more rational.'
        ]
      },
      {
        heading: 'Homes, streets, and setting',
        paragraphs: [
          'Grayhawk\u2019s pricing starts in the high six figures and tops out around $4.2M, with a heavy concentration of well-built production homes, townhomes, and patio products, which keeps its price-per-square-foot consistently below DC Ranch\u2019s and makes it the practical choice at most family budgets.',
          'DC Ranch runs roughly $1.1M to $9.5M, with larger average lots, a higher custom-home share, and the visual advantage of sitting at the mountain\u2019s base: many streets look straight up at the McDowells. Its village architecture is tightly governed and ages gracefully, which shows up in long-run resale performance at the top of the community.'
        ]
      },
      {
        heading: 'Which buyer should pick which',
        paragraphs: [
          'Choose Grayhawk if budget efficiency, public-access golf, and a sociable, slightly younger neighborhood energy matter most, or if this is a second home you want to lock and leave without a club obligation idling in the background. Its location at the 101 also makes it the better commuter and travel base.',
          'Choose DC Ranch if you want the guard-gated, private-club version of the same family-oriented lifestyle and your budget reaches comfortably into the community\u2019s mid-range. The honest dividing line is usually the club: families who will genuinely use a country club three days a week buy DC Ranch and never look back; families who won\u2019t are usually happier, and wealthier, in Grayhawk.'
        ]
      }
    ]
  },

  'boulders-vs-troon-north': {
    sections: [
      {
        heading: 'Two icons of the same era, two different lifestyles',
        paragraphs: [
          'The Boulders and Troon North both came of age as the definitive desert-golf addresses of their generation, and both trade on the same raw material: granite boulder formations that are among the most photogenic landscapes in American golf. The difference is what was built around the rocks.',
          'The Boulders grew up around a destination resort, now flying a Curio Collection flag, with a famous spa, resort dining, and a steady current of hotel guests mixing into daily life. Troon North grew up as a residential golf community first: no hotel at its center, a quieter daily rhythm, and a stronger sense that the streets belong to the people who live on them.'
        ]
      },
      {
        heading: 'Golf and amenities',
        paragraphs: [
          'The Boulders offers two Jay Morrish courses threading through its signature rock formations: shorter on raw championship teeth than Troon North\u2019s pair, but among the most visually distinctive rounds in Arizona, and supported by the full resort amenity stack: spa, tennis, multiple restaurants, and concierge-grade services available steps from home.',
          'Troon North\u2019s Monument and Pinnacle courses (Tom Weiskopf with Jay Morrish) are the stronger pure-golf product: perennial top-100 public rankings and a layout scale the Boulders does not attempt. But amenities beyond golf are leaner; residents drive to Carefree, Cave Creek, or south into Scottsdale for most dining and services.'
        ]
      },
      {
        heading: 'Location and real estate',
        paragraphs: [
          'The Boulders sits at the Carefree edge of the map, and that matters: Carefree and Cave Creek\u2019s small-town cores: galleries, cafés, a slower desert-village pace, are minutes away, while the conveniences of central Scottsdale are a genuine drive. Its housing mix of casitas, patio homes, and custom estates (published locally at roughly $950K to $7M) includes some of the most distinctive lock-and-leave product in north-area golf.',
          'Troon North is closer to Scottsdale\u2019s services and skews larger in lot and home scale, with a range running to $12M. Buyers comparing the two often notice the difference most at night: the Boulders has the gentle hum of a working resort; Troon North goes dark and silent under one of the best night skies in the metro area.'
        ]
      },
      {
        heading: 'Which buyer should pick which',
        paragraphs: [
          'Choose the Boulders if resort living is the attraction: spa culture, on-property dining, turnkey casita ownership, and the charm of Carefree as your hometown. It is particularly strong for snowbirds who want services without staffing a household, and for buyers who entertain guests that appreciate a hotel within walking distance.',
          'Choose Troon North if you want the superior golf, a more residential atmosphere, and bolder custom architecture on bigger land. The communities photograph similarly; they live differently. A two-night stay at the Boulders resort followed by an afternoon driving Troon North\u2019s neighborhoods remains the single most clarifying due-diligence exercise for this comparison.'
        ]
      }
    ]
  },

  'silverleaf-vs-estancia': {
    sections: [
      {
        heading: 'The top of the pyramid',
        paragraphs: [
          'Silverleaf and Estancia occupy the summit of Scottsdale\u2019s private-club real estate, and they are compared less on amenities than on philosophy. Both are guard-gated, both carry initiation published elsewhere on this site at $250K+, both involve sponsorship-driven membership processes, and both sell genuine scarcity. What differs is temperament.',
          'Silverleaf is the polished flagship: 1,500 acres climbing the McDowells inside the DC Ranch master plan, with estate architecture that has become nationally referenced and a social profile to match. Estancia, on 640 acres at Pinnacle Peak\u2019s northern base, is deliberately quieter: fewer homes, a more restrained aesthetic, and a culture that prizes understatement over presence.'
        ]
      },
      {
        heading: 'The clubs and the courses',
        paragraphs: [
          'Silverleaf\u2019s club is built around Tom Weiskopf\u2019s canyon course: a dramatic private routing folded into arroyos and ridgelines, paired with a clubhouse scene that is among the most active in luxury Scottsdale. The club functions as a social center of gravity for a community whose residents skew toward prominent relocators from California and the Northeast.',
          'Estancia\u2019s club is built around Tom Fazio\u2019s masterwork, widely treated as the best private course in Arizona, and the club culture mirrors the course: serious about golf, light on spectacle. Membership rolls are smaller, the calendar is quieter, and many members cite precisely that restraint as the reason they chose Estancia over flashier alternatives.'
        ]
      },
      {
        heading: 'Architecture and inventory',
        paragraphs: [
          'Silverleaf\u2019s published range of roughly $3.5M to $28M spans parade-level estates in the Upper Canyon down to its more attainable (a relative term) village homes. The architectural review process is famously exacting, enforcing Mediterranean, Spanish, and ranch-revival vocabularies executed with museum-grade craft: a consistency that protects values and defines the community\u2019s identity.',
          'Estancia runs roughly $2.8M to $22M across just ~290 homesites, with architecture that leans organic and desert-modern: homes designed to disappear into the granite rather than announce themselves. Inventory in both communities is chronically thin, but Estancia\u2019s smaller base makes its market the scarcer of the two; certain lot positions effectively never trade.'
        ]
      },
      {
        heading: 'Which buyer should pick which',
        paragraphs: [
          'Choose Silverleaf if you want the fuller ecosystem: the DC Ranch master plan\u2019s conveniences outside your gate, a more active club social calendar, and architecture with formal grandeur. It is the choice of buyers who want their community to be a statement as well as a residence.',
          'Choose Estancia if seclusion and golf purity outrank scene, if the ideal evening is a quiet dinner after eighteen on a course critics rank above every other private layout in the state. Households frequently split exactly along this line during tours, which is itself the most useful diagnostic: Silverleaf impresses guests; Estancia tends to quietly claim its owners.'
        ]
      }
    ]
  },

  'mirabel-vs-desert-mountain': {
    sections: [
      {
        heading: 'Neighbors with opposite footprints',
        paragraphs: [
          'Mirabel and Desert Mountain sit nearly side-by-side in Scottsdale\u2019s far-north high desert, share the same elevation band and saguaro-studded terrain, and draw from the same buyer pool of serious club golfers. The comparison is really about scale: Mirabel is roughly 700 acres organized around a single course; Desert Mountain is more than ten times that size with seven.',
          'Mirabel\u2019s identity is its turn-of-the-century western-ranch aesthetic and a tight-knit, first-name-basis member culture. Desert Mountain\u2019s identity is breadth: a complete private resort-scale ecosystem where the question is never whether there is something to do, but which of several options to choose.'
        ]
      },
      {
        heading: 'One course versus seven',
        paragraphs: [
          'Mirabel\u2019s Tom Fazio course is notable for something rare in desert golf: a genuinely walkable routing, compact and continuous in a way most target-golf layouts are not. With a single course and an intentionally limited membership, tee sheets stay open, pace stays brisk, and the golf experience feels like a private course in the literal sense.',
          'Desert Mountain counters with the largest collection of Jack Nicklaus designs in one community anywhere: seven courses ranging from championship tests to a celebrated short course, plus practice and instruction infrastructure on a different order of magnitude. Members who value variety, organized competition, and the ability to host large golf groups will find Mirabel\u2019s single-course model confining; members who value intimacy will find Desert Mountain\u2019s scale impersonal. Neither reaction is wrong.'
        ]
      },
      {
        heading: 'Cost of entry and community life',
        paragraphs: [
          'As published elsewhere on this site, Mirabel\u2019s initiation has historically run meaningfully below the large equity clubs (on the order of ~$150K), with correspondingly shorter membership timelines: a real consideration for buyers who want to be playing member golf the season they close. Homes run roughly $1.9M to $15M across custom and semi-custom desert architecture.',
          'Desert Mountain\u2019s membership economics are larger, but so is what they fund: nine restaurants, a 60,000-square-foot sports campus, twenty-plus miles of private trails, and a programming calendar that operates year-round. Its real-estate market ($1.6M\u2013$18M) offers far more inventory choice across villages of different ages and styles, and a correspondingly busier resale market.'
        ]
      },
      {
        heading: 'Which buyer should pick which',
        paragraphs: [
          'Choose Mirabel if you want to actually know your fellow members, walk your home course in the cool months, and join a club where the membership process moves at human speed. It is the connoisseur\u2019s pick: quieter, more personal, and anchored by a Fazio course that course-design devotees rate far above its public profile.',
          'Choose Desert Mountain if you want the full-immersion private community: golf variety no club in America matches, amenities that replace half your errands, and a social ecosystem big enough that every interest finds its group. The simplest sorting question we know: do you want a club that feels like a favorite restaurant, or one that feels like a great small city? Mirabel is the former; Desert Mountain is, proudly, the latter.'
        ]
      }
    ]
  }
};

export function getCompareEditorial(slug) {
  return COMPARE_EDITORIAL[slug] || null;
}
