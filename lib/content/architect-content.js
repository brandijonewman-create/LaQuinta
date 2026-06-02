// Placeholder long-form content per architect. Full profiles ship in Phase 5.

export const architectContent = {
  'pete-dye': {
    tenure: '1925–2020',
    discipline: 'Strategic, penal modernist',
    summary:
      'Pete Dye reshaped American course architecture starting in the 1960s, introducing railroad ties, pot bunkers, and visual intimidation as design vocabulary. In La Quinta his Stadium course at PGA West remains one of the most photographed and feared resort courses in the country, while The Hideaway shows his quieter, member-focused side.',
  },
  'tom-fazio': {
    tenure: 'b. 1945',
    discipline: 'Polished, view-corridor traditional',
    summary:
      'Tom Fazio is the most commercially dominant private-club architect of the last forty years. His La Quinta projects — The Madison Club and The Quarry at La Quinta — lean into framed mountain views and forgiving fairway widths, paired with carefully sculpted bunkering.',
  },
  'jack-nicklaus': {
    tenure: 'b. 1940',
    discipline: 'Strategic, championship traditional',
    summary:
      'Jack Nicklaus turned to course design alongside his playing career and has authored over 300 courses worldwide. At PGA West his Nicklaus Tournament course brought a more conservative, second-shot-strategic counterpoint to Dye\u2019s Stadium.',
  },
  'greg-norman': {
    tenure: 'b. 1955',
    discipline: 'Visually bold, links-influenced',
    summary:
      'Greg Norman\u2019s design office took on its first major U.S. projects in the 1990s. His PGA West Norman Course brought a stripped-back, fescue-edged sensibility unusual for the Coachella Valley\u2019s lush resort tradition.',
  },
  'arnold-palmer': {
    tenure: '1929–2016',
    discipline: 'Classic, playable traditional',
    summary:
      'Arnold Palmer\u2019s design firm completed hundreds of courses; The Tradition Golf Club is his only Coachella Valley design. The routing is intentionally walkable and member-friendly — a contrast to PGA West\u2019s tournament ambitions.',
  },
  'tom-weiskopf': {
    tenure: '1942–2022',
    discipline: 'Player-architect, big-shouldered traditional',
    summary:
      'Tom Weiskopf, the 1973 Open Champion, brought a championship-tested eye to design. His Weiskopf Private at PGA West is one of two PGA West courses restricted to members only.',
  },
  'rees-jones': {
    tenure: 'b. 1941',
    discipline: 'Restoration-minded, championship traditional',
    summary:
      'Rees Jones, son of architect Robert Trent Jones Sr., is best known for U.S. Open course restorations. Andalusia Country Club in La Quinta is his Coachella Valley signature — modern Spanish architecture wrapped around a Jones routing.',
  },
};

export function getArchitectContent(slug) {
  return architectContent[slug] || {
    tenure: 'TBD',
    discipline: 'TBD',
    summary: 'Profile in development.',
  };
}
