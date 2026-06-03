// Long-form architect bios.
//
// Top 4 (Dye, Fazio, Nicklaus, Palmer) get full prose summaries.
// Norman, Weiskopf, Jones, Hills, Robinson remain at scaffold level until
// further verification passes.

export const architectContent = {
  'pete-dye': {
    tenure: '1925–2020',
    discipline: 'Strategic, penal modernist',
    summary:
      'Pete Dye reshaped American course architecture starting in the 1960s. He introduced railroad ties as a structural element on bulkheads, popularized pot bunkers in American design, and built a visual vocabulary of intentional misdirection — fairways that look narrower than they play, greens that hide their interior contours from the tee. His most consequential California desert work is the Stadium course at PGA West (1986), which was conceived from the start as a tournament-ready stage and has hosted PGA Tour events under several names. Dye also designed the Pete Dye course at The Hideaway, which is a quieter, more member-focused expression of the same instincts. La Quinta has the densest concentration of his Coachella Valley work, and his influence on younger desert architects — even those who reacted against him — is impossible to overstate.',
  },
  'tom-fazio': {
    tenure: 'b. 1945',
    discipline: 'Polished, view-corridor traditional',
    summary:
      'Tom Fazio is the most commercially dominant private-club architect of the last forty years. His routings are characterized by wide fairways, sculpted bunkering, generous lake margins, and an obsessive attention to the second-shot view corridor — typically he wants the mountains, water, or hero-shot element revealed after the tee shot rather than before it. His La Quinta projects are The Madison Club (mid-2000s, contemporary California estate community) and The Quarry at La Quinta (mid-1990s, built on a former rock quarry and notably more vertical than Madison). Between the two, La Quinta has one of the largest concentrations of Fazio Coachella Valley work, and the contrast between his Madison routing and his Quarry routing is one of the most instructive case studies in his catalog.',
  },
  'jack-nicklaus': {
    tenure: 'b. 1940',
    discipline: 'Strategic, championship traditional',
    summary:
      'Jack Nicklaus turned to course design alongside his playing career and has authored over 300 courses worldwide through Nicklaus Design. His Coachella Valley work includes the Nicklaus Tournament course at PGA West and a separate private Nicklaus course also within the community. The signature Nicklaus design instinct — reward the second-shot decision more than the recovery — sits in deliberate contrast to Pete Dye\u2019s Stadium course across the property, which made PGA West unusually pedagogically interesting: a single community with both design philosophies playable on the same morning.',
  },
  'arnold-palmer': {
    tenure: '1929–2016',
    discipline: 'Classic, playable traditional',
    summary:
      'Arnold Palmer founded one of the most prolific course-design firms of the late 20th century. The Tradition Golf Club in La Quinta is his only Coachella Valley design. Where the PGA West courses chase tournament difficulty, the Palmer routing at The Tradition was conceived to be walkable, member-friendly, and visually restrained — a deliberate counterpoint to the heroic-scale desert designs that came to define the valley. Palmer\u2019s instinct was that a private club is fundamentally about repeat play, and his Tradition routing reflects that bias toward sustained enjoyment over single-round drama.',
  },
  'greg-norman': {
    tenure: 'b. 1955',
    discipline: 'Visually bold, links-influenced',
    summary:
      'Greg Norman\u2019s design office took on its first major U.S. projects in the 1990s and developed a recognizable idiom — fescue-edged margins, stripped-back native landscaping, and visual lines borrowed from the great links courses of Australia and the UK. His PGA West Norman Course brought that sensibility to the Coachella Valley and stands apart aesthetically from the more polished resort-traditional courses around it.',
  },
  'tom-weiskopf': {
    tenure: '1942–2022',
    discipline: 'Player-architect, championship traditional',
    summary:
      'Tom Weiskopf, the 1973 Open Champion, brought a championship-tested eye to design. His Weiskopf Private at PGA West is one of two PGA West courses restricted to members only. The course is generally considered the most strategically demanding of the PGA West private routings.',
  },
  'rees-jones': {
    tenure: 'b. 1941',
    discipline: 'Restoration-minded, championship traditional',
    summary:
      'Rees Jones, son of architect Robert Trent Jones Sr., is best known nationally for U.S. Open course restorations. Andalusia Country Club in La Quinta is his Coachella Valley signature — a routing that reflects his classical proportioning of green complexes and his measured approach to fairway bunkering, paired with the community\u2019s tightly controlled modern Spanish-Mediterranean architecture.',
  },
  'arthur-hills': {
    tenure: 'b. 1930',
    discipline: 'Site-responsive traditional',
    summary:
      'Arthur Hills built a career on routings that worked with the site rather than against it. His Coachella Valley work is concentrated outside La Quinta proper, but appears alongside Tom Fazio at the BIGHORN Mountains course in Palm Desert.',
  },
  'tom-doak': {
    tenure: 'b. 1961',
    discipline: 'Minimalist',
    summary:
      'Tom Doak is the leading American practitioner of minimalist course design — the philosophy that the best courses move the least dirt and reveal the existing landscape rather than impose on it. His Coachella Valley signature is Stone Eagle in Palm Desert; he has no La Quinta work to date, but his influence on younger designers is visible throughout the desert.',
  },
  'ted-robinson-sr': {
    tenure: '1923–2008',
    discipline: 'Mid-century resort traditional',
    summary:
      'Ted Robinson Sr. designed many of the Coachella Valley\u2019s defining mid-century resort courses, including significant work at Mission Hills (Rancho Mirage), historically associated with the Dinah Shore tournament. His direct La Quinta footprint is limited, but his influence on the desert resort-golf idiom is foundational.',
  },
};

export function getArchitectContent(slug) {
  return architectContent[slug] || {
    tenure: 'TBD',
    discipline: 'TBD',
    summary: 'Profile in development.',
  };
}
