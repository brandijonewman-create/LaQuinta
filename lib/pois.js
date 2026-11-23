// ────────────────────────────────────────────────────────────────────────────
// Real Scottsdale-area lifestyle POIs for the /scottsdale-lifestyle-map page.
// Coordinates verified from public sources. Curated list — not exhaustive.
// ────────────────────────────────────────────────────────────────────────────
// ─── Golf courses ───────────────────────────────────────────────────────
// Public and private courses north of Loop 202 (and I-10 west of the 202),
// east of I-17 and west/north of SR 87, including Anthem, Cave Creek,
// Carefree, Rio Verde, Tonto Verde, Fountain Hills, Paradise Valley,
// Scottsdale, Phoenix and north Tempe.
// Coordinates: OpenStreetMap golf-course features (course centroid).
// Addresses and public/private status checked against the clubs' own sites
// and golf directories (Nov 2026). "public" = anyone can book a tee time
// (resort and semi-private courses included, noted in `detail`);
// "private" = members and their guests only. No phone numbers by design.
export const GOLF_COURSES = [
  { type: 'golf', access: 'private', name: 'Anthem Golf & Country Club', address: '2708 W Anthem Club Dr, Anthem, AZ 85086', lat: 33.86508, lng: -112.12093, detail: 'Persimmon + Ironwood courses' },
  { type: 'golf', access: 'public', name: 'Rancho Mañana Golf Club', address: '5734 E Rancho Manana Blvd, Cave Creek, AZ 85331', lat: 33.83534, lng: -111.96517 },
  { type: 'golf', access: 'public', name: 'Dove Valley Ranch Golf Club', address: '33750 N Dove Lakes Dr, Cave Creek, AZ 85331', lat: 33.7846, lng: -111.99043 },
  { type: 'golf', access: 'private', name: 'Tatum Ranch Golf Club', address: '29888 N Tatum Ranch Dr, Cave Creek, AZ 85331', lat: 33.76015, lng: -111.98423 },
  { type: 'golf', access: 'private', name: 'Desert Forest Golf Club', address: '37207 N Mule Train Rd, Carefree, AZ 85377', lat: 33.82192, lng: -111.90071 },
  { type: 'golf', access: 'public', name: 'The Boulders Golf Club', address: '34631 N Tom Darlington Dr, Carefree, AZ 85377', lat: 33.79523, lng: -111.92099, detail: 'Resort; South Course public, North Course members only' },
  { type: 'golf', access: 'private', name: 'Desert Mountain: Chiricahua', address: '37700 N Desert Mountain Pkwy, Scottsdale, AZ 85262', lat: 33.86863, lng: -111.86112 },
  { type: 'golf', access: 'private', name: 'Desert Mountain: Outlaw', address: '37700 N Desert Mountain Pkwy, Scottsdale, AZ 85262', lat: 33.8628, lng: -111.82662 },
  { type: 'golf', access: 'private', name: 'Desert Mountain: Apache', address: '37700 N Desert Mountain Pkwy, Scottsdale, AZ 85262', lat: 33.85813, lng: -111.84143 },
  { type: 'golf', access: 'private', name: 'Desert Mountain: Cochise', address: '37700 N Desert Mountain Pkwy, Scottsdale, AZ 85262', lat: 33.85552, lng: -111.85809 },
  { type: 'golf', access: 'private', name: 'Desert Mountain: Geronimo', address: '37700 N Desert Mountain Pkwy, Scottsdale, AZ 85262', lat: 33.8549, lng: -111.87396 },
  { type: 'golf', access: 'private', name: 'Desert Mountain: Renegade', address: '37700 N Desert Mountain Pkwy, Scottsdale, AZ 85262', lat: 33.83068, lng: -111.85991 },
  { type: 'golf', access: 'private', name: 'Mirabel Golf Club', address: '37100 N Mirabel Club Dr, Scottsdale, AZ 85262', lat: 33.82369, lng: -111.85289 },
  { type: 'golf', access: 'public', name: 'Legend Trail Golf Club', address: '9462 E Legendary Ln, Scottsdale, AZ 85262', lat: 33.79971, lng: -111.87732 },
  { type: 'golf', access: 'private', name: 'Terravita Golf Club', address: '34034 N 69th Way, Scottsdale, AZ 85266', lat: 33.78673, lng: -111.9305 },
  { type: 'golf', access: 'private', name: 'Whisper Rock Golf Club', address: '32000 N Old Bridge Rd, Scottsdale, AZ 85266', lat: 33.77888, lng: -111.91169, detail: 'Upper + Lower courses' },
  { type: 'golf', access: 'private', name: 'Scottsdale National Golf Club', address: '29001 N 122nd St, Scottsdale, AZ 85262', lat: 33.74846, lng: -111.81878 },
  { type: 'golf', access: 'public', name: 'Troon North Golf Club', address: '10320 E Dynamite Blvd, Scottsdale, AZ 85262', lat: 33.74656, lng: -111.86335, detail: 'Monument + Pinnacle courses' },
  { type: 'golf', access: 'private', name: 'The Estancia Club', address: '27998 N 99th Pl, Scottsdale, AZ 85262', lat: 33.73501, lng: -111.86166 },
  { type: 'golf', access: 'private', name: 'Desert Highlands Golf Club', address: '10040 E Happy Valley Rd, Scottsdale, AZ 85255', lat: 33.72143, lng: -111.87068 },
  { type: 'golf', access: 'private', name: 'Troon Country Club', address: '25000 N Windy Walk Dr, Scottsdale, AZ 85255', lat: 33.71917, lng: -111.85351 },
  { type: 'golf', access: 'private', name: 'Pinnacle Peak Country Club', address: '8701 E Pinnacle Peak Rd, Scottsdale, AZ 85255', lat: 33.6942, lng: -111.8991 },
  { type: 'golf', access: 'private', name: 'The Country Club at DC Ranch', address: '9290 E Thompson Peak Pkwy, Scottsdale, AZ 85255', lat: 33.68053, lng: -111.88409 },
  { type: 'golf', access: 'private', name: 'Silverleaf Club', address: '18701 N Silverleaf Dr, Scottsdale, AZ 85255', lat: 33.66567, lng: -111.85692 },
  { type: 'golf', access: 'public', name: 'Grayhawk Golf Club: Raptor', address: '8620 E Thompson Peak Pkwy, Scottsdale, AZ 85255', lat: 33.67907, lng: -111.89774 },
  { type: 'golf', access: 'public', name: 'Grayhawk Golf Club: Talon', address: '8620 E Thompson Peak Pkwy, Scottsdale, AZ 85255', lat: 33.66426, lng: -111.90016 },
  { type: 'golf', access: 'public', name: 'TPC Scottsdale: Stadium Course', address: '17020 N Hayden Rd, Scottsdale, AZ 85255', lat: 33.64014, lng: -111.91566 },
  { type: 'golf', access: 'public', name: 'TPC Scottsdale: Champions Course', address: '17020 N Hayden Rd, Scottsdale, AZ 85255', lat: 33.63615, lng: -111.89875 },
  { type: 'golf', access: 'public', name: 'McDowell Mountain Golf Club', address: '10690 E Sheena Dr, Scottsdale, AZ 85255', lat: 33.6082, lng: -111.85469 },
  { type: 'golf', access: 'public', name: 'Verde River Golf & Social Club', address: '29005 N Verde River Way, Rio Verde, AZ 85263', lat: 33.74903, lng: -111.69902, detail: 'Semi-private' },
  { type: 'golf', access: 'private', name: 'Tonto Verde Golf Club: Peaks', address: '18402 E El Circulo Dr, Rio Verde, AZ 85263', lat: 33.74089, lng: -111.68201 },
  { type: 'golf', access: 'private', name: 'Tonto Verde Golf Club: Ranch', address: '18402 E El Circulo Dr, Rio Verde, AZ 85263', lat: 33.7365, lng: -111.66968 },
  { type: 'golf', access: 'private', name: 'Rio Verde Country Club', address: '18731 E Four Peaks Blvd, Rio Verde, AZ 85263', lat: 33.71371, lng: -111.67649, detail: 'Quail Run + White Wing courses' },
  { type: 'golf', access: 'public', name: 'SunRidge Canyon Golf Club', address: '13100 N SunRidge Dr, Fountain Hills, AZ 85268', lat: 33.61154, lng: -111.74462 },
  { type: 'golf', access: 'public', name: 'Desert Canyon Golf Club', address: '10440 N Indian Wells Dr, Fountain Hills, AZ 85268', lat: 33.58496, lng: -111.71402 },
  { type: 'golf', access: 'public', name: 'Eagle Mountain Golf Club', address: '14915 E Eagle Mountain Pkwy, Fountain Hills, AZ 85268', lat: 33.57771, lng: -111.75816 },
  { type: 'golf', access: 'private', name: 'FireRock Country Club', address: '16000 E FireRock Country Club Dr, Fountain Hills, AZ 85268', lat: 33.57468, lng: -111.74978 },
  { type: 'golf', access: 'public', name: 'We-Ko-Pa Golf Club: Saguaro', address: '18200 E WeKoPa Way, Fort McDowell, AZ 85264', lat: 33.59299, lng: -111.6883 },
  { type: 'golf', access: 'public', name: 'We-Ko-Pa Golf Club: Cholla', address: '18200 E WeKoPa Way, Fort McDowell, AZ 85264', lat: 33.58343, lng: -111.69528 },
  { type: 'golf', access: 'private', name: 'Ancala Country Club', address: '11700 E Via Linda, Scottsdale, AZ 85259', lat: 33.59631, lng: -111.82951 },
  { type: 'golf', access: 'public', name: 'Starfire Golf Club', address: '11500 N Hayden Rd, Scottsdale, AZ 85260', lat: 33.5893, lng: -111.91162 },
  { type: 'golf', access: 'public', name: 'Kierland Golf Club', address: '15636 N Clubgate Dr, Scottsdale, AZ 85254', lat: 33.62877, lng: -111.93298, detail: 'Resort; Ironwood, Acacia + Mesquite nines' },
  { type: 'golf', access: 'private', name: 'Gainey Ranch Golf Club', address: '7600 E Gainey Club Dr, Scottsdale, AZ 85258', lat: 33.57097, lng: -111.91872 },
  { type: 'golf', access: 'public', name: 'McCormick Ranch Golf Club', address: '7505 E McCormick Pkwy, Scottsdale, AZ 85258', lat: 33.54919, lng: -111.91933 },
  { type: 'golf', access: 'public', name: 'Talking Stick Golf Club', address: '9998 E Talking Stick Way, Scottsdale, AZ 85256', lat: 33.54774, lng: -111.86435, detail: 'O\'odham + Piipaash courses' },
  { type: 'golf', access: 'public', name: 'Silverado Golf Club', address: '7605 E Indian Bend Rd, Scottsdale, AZ 85250', lat: 33.53086, lng: -111.91074 },
  { type: 'golf', access: 'public', name: 'The Phoenician Golf Club', address: '6000 E Camelback Rd, Scottsdale, AZ 85251', lat: 33.5067, lng: -111.95333, detail: 'Resort' },
  { type: 'golf', access: 'private', name: 'Scottsdale Shadows Golf Course', address: '7800 E Camelback Rd, Scottsdale, AZ 85251', lat: 33.504, lng: -111.9092, detail: 'Executive course for residents' },
  { type: 'golf', access: 'public', name: 'Continental Golf Club', address: '7920 E Osborn Rd, Scottsdale, AZ 85251', lat: 33.48757, lng: -111.91177 },
  { type: 'golf', access: 'public', name: 'Coronado Golf Course', address: '2829 N Miller Rd, Scottsdale, AZ 85257', lat: 33.47726, lng: -111.91454 },
  { type: 'golf', access: 'public', name: 'Camelback Golf Club', address: '7847 N Mockingbird Ln, Paradise Valley, AZ 85253', lat: 33.56606, lng: -111.9502, detail: 'Resort; Ambiente + Padre courses' },
  { type: 'golf', access: 'private', name: 'Paradise Valley Country Club', address: '7101 N Tatum Blvd, Paradise Valley, AZ 85253', lat: 33.54025, lng: -111.97085 },
  { type: 'golf', access: 'public', name: 'The Short Course at Mountain Shadows', address: '5445 E Lincoln Dr, Paradise Valley, AZ 85253', lat: 33.52768, lng: -111.96259, detail: 'Resort; par-3 course' },
  { type: 'golf', access: 'private', name: 'Paradise Peak West', address: '3901 E Pinnacle Peak Rd, Phoenix, AZ 85050', lat: 33.6959, lng: -111.99909, detail: '9-hole course for residents' },
  { type: 'golf', access: 'public', name: 'Wildfire Golf Club', address: '5350 E Marriott Dr, Phoenix, AZ 85054', lat: 33.6958, lng: -111.95931, detail: 'Resort; Palmer + Faldo courses' },
  { type: 'golf', access: 'public', name: 'Paradise Valley Golf Course', address: '3505 E Union Hills Dr, Phoenix, AZ 85050', lat: 33.65149, lng: -112.00491, detail: 'City of Phoenix' },
  { type: 'golf', access: 'public', name: 'Stonecreek Golf Club', address: '4435 E Paradise Village Pkwy S, Phoenix, AZ 85032', lat: 33.59096, lng: -111.97825 },
  { type: 'golf', access: 'public', name: 'Cave Creek Golf Course', address: '15202 N 19th Ave, Phoenix, AZ 85023', lat: 33.61822, lng: -112.10576, detail: 'City of Phoenix' },
  { type: 'golf', access: 'private', name: 'Moon Valley Country Club', address: '151 W Moon Valley Dr, Phoenix, AZ 85023', lat: 33.61487, lng: -112.08012 },
  { type: 'golf', access: 'public', name: 'Lookout Mountain Golf Club', address: '11111 N 7th St, Phoenix, AZ 85020', lat: 33.6135, lng: -112.05012, detail: 'Resort' },
  { type: 'golf', access: 'public', name: 'Orange Tree Golf Club', address: '10601 N 56th St, Scottsdale, AZ 85254', lat: 33.58962, lng: -111.95821 },
  { type: 'golf', access: 'public', name: 'Palo Verde Golf Course', address: '6215 N 15th Ave, Phoenix, AZ 85015', lat: 33.52943, lng: -112.08895, detail: 'City of Phoenix' },
  { type: 'golf', access: 'public', name: 'Arizona Biltmore Golf Club: Links', address: '2400 E Missouri Ave, Phoenix, AZ 85016', lat: 33.52035, lng: -112.01768, detail: 'Resort' },
  { type: 'golf', access: 'public', name: 'Arizona Biltmore Golf Club: Estates', address: '2400 E Missouri Ave, Phoenix, AZ 85016', lat: 33.51757, lng: -112.02144, detail: 'Resort' },
  { type: 'golf', access: 'private', name: 'Arizona Country Club', address: '5668 E Orange Blossom Ln, Phoenix, AZ 85018', lat: 33.48504, lng: -111.95637 },
  { type: 'golf', access: 'private', name: 'Phoenix Country Club', address: '2901 N 7th St, Phoenix, AZ 85014', lat: 33.48491, lng: -112.05988 },
  { type: 'golf', access: 'public', name: 'Encanto Golf Course', address: '2775 N 15th Ave, Phoenix, AZ 85007', lat: 33.47947, lng: -112.09687, detail: 'City of Phoenix' },
  { type: 'golf', access: 'public', name: 'Encanto 9 Golf Course', address: '2300 N 17th Ave, Phoenix, AZ 85007', lat: 33.47527, lng: -112.09717, detail: 'City of Phoenix; executive 9' },
  { type: 'golf', access: 'public', name: 'Papago Golf Course', address: '5595 E Moreland St, Phoenix, AZ 85008', lat: 33.45779, lng: -111.96028 },
  { type: 'golf', access: 'public', name: 'Rolling Hills Golf Course', address: '1415 N Mill Ave, Tempe, AZ 85281', lat: 33.44434, lng: -111.94458, detail: 'City of Tempe' }
];

export const LIFESTYLE_POIS = [
  // ─── Airports ───────────────────────────────────────────────────────────
  { type: 'airport', name: 'Phoenix Sky Harbor International Airport (PHX)', lat: 33.4373, lng: -112.0078, detail: 'Major hub, 30 min to N. Scottsdale' },
  { type: 'airport', name: 'Scottsdale Airport (SDL)', lat: 33.6228, lng: -111.9106, detail: 'General aviation, FBO services' },

  // ─── Hospitals ──────────────────────────────────────────────────────────
  { type: 'hospital', name: 'Mayo Clinic Hospital', lat: 33.6586, lng: -111.9559, detail: 'Top-ranked academic medical center' },
  { type: 'hospital', name: 'HonorHealth Scottsdale Shea Medical Center', lat: 33.5781, lng: -111.9006, detail: 'Level I trauma center' },
  { type: 'hospital', name: 'HonorHealth Scottsdale Thompson Peak Medical Center', lat: 33.6779, lng: -111.8851, detail: 'North Scottsdale acute care' },
  { type: 'hospital', name: 'HonorHealth Scottsdale Osborn Medical Center', lat: 33.4933, lng: -111.9217, detail: 'Old Town Scottsdale' },

  // ─── Top public/private schools ─────────────────────────────────────────
  { type: 'school', name: 'BASIS Scottsdale (charter, K–12)', lat: 33.6234, lng: -111.8809, detail: 'Top-ranked U.S. high school' },
  { type: 'school', name: 'Notre Dame Preparatory (private, 9–12)', lat: 33.6588, lng: -111.8569, detail: 'Catholic college-prep' },
  { type: 'school', name: 'Phoenix Country Day School (private, PK–12)', lat: 33.5474, lng: -111.9743, detail: 'Independent K–12' },
  { type: 'school', name: 'Chaparral High School', lat: 33.5667, lng: -111.8889, detail: 'Top-rated SUSD' },
  { type: 'school', name: 'Desert Mountain High School', lat: 33.6589, lng: -111.8581, detail: 'Top-rated SUSD, N. Scottsdale' },

  // ─── Dining ─────────────────────────────────────────────────────────────
  { type: 'dining', name: 'FnB Restaurant (Old Town)', lat: 33.4936, lng: -111.9264, detail: 'Acclaimed farm-to-table' },
  { type: 'dining', name: 'Mastro\u2019s City Hall Steakhouse', lat: 33.4944, lng: -111.9264, detail: 'Old Town flagship steakhouse' },
  { type: 'dining', name: 'Citizen Public House', lat: 33.4934, lng: -111.9234, detail: 'Old Town craft pub' },
  { type: 'dining', name: 'The Mission Old Town', lat: 33.4936, lng: -111.9242, detail: 'Modern Latin / margaritas' },
  { type: 'dining', name: 'Talavera at Four Seasons Troon', lat: 33.7264, lng: -111.8403, detail: 'Four Seasons fine dining' },

  // ─── Shopping / lifestyle ───────────────────────────────────────────────
  { type: 'retail', name: 'Scottsdale Fashion Square', lat: 33.5022, lng: -111.9286, detail: 'AZ\u2019s largest luxury mall' },
  { type: 'retail', name: 'Scottsdale Quarter', lat: 33.6256, lng: -111.9234, detail: 'Open-air retail + dining' },
  { type: 'retail', name: 'Kierland Commons', lat: 33.6263, lng: -111.9303, detail: 'Walkable village retail' },
  { type: 'retail', name: 'DC Ranch Marketplace', lat: 33.6628, lng: -111.8841, detail: 'Community-anchored daily retail' },
  { type: 'retail', name: 'The Boulders Resort & Spa', lat: 33.8121, lng: -111.9112, detail: 'Resort dining & spa' },

  ...GOLF_COURSES
];
