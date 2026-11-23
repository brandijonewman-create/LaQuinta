// Listings imported from DataForSEO pulls, one JSON file per category, kept
// in the repo so they are backed up and exportable. Imported listings are
// free listings. A MongoDB record with the same slug (an upgrade or a claimed
// listing) takes its place.
import acAndHeating from '@/data/directory/ac-and-heating.json';
import architectsAndStructuralEngineers from '@/data/directory/architects-and-structural-engineers.json';
import artFramingInstallationAndShipping from '@/data/directory/art-framing-installation-and-shipping.json';
import artGalleries from '@/data/directory/art-galleries.json';
import artificialTurf from '@/data/directory/artificial-turf.json';
import butchersAndGourmetMarkets from '@/data/directory/butchers-and-gourmet-markets.json';
import cabinetryAndBuiltIns from '@/data/directory/cabinetry-and-built-ins.json';
import classicCarRestoration from '@/data/directory/classic-car-restoration.json';
import coffeeShops from '@/data/directory/coffee-shops.json';
import commercialAndInvestmentRealEstate from '@/data/directory/commercial-and-investment-real-estate.json';
import concreteAndFoundationRepair from '@/data/directory/concrete-and-foundation-repair.json';
import customHomeBuilders from '@/data/directory/custom-home-builders.json';
import demolitionAndExcavation from '@/data/directory/demolition-and-excavation.json';
import electricians from '@/data/directory/electricians.json';
import fencingBlockWallsAndPoolFencing from '@/data/directory/fencing-block-walls-and-pool-fencing.json';
import flooring from '@/data/directory/flooring.json';
import furnitureRugsAndAntiques from '@/data/directory/furniture-rugs-and-antiques.json';
import garageDoors from '@/data/directory/garage-doors.json';
import generalContractorsAndRemodelers from '@/data/directory/general-contractors-and-remodelers.json';
import glassMirrorsAndShowerDoors from '@/data/directory/glass-mirrors-and-shower-doors.json';
import hairSalonsAndBlowoutBars from '@/data/directory/hair-salons-and-blowout-bars.json';
import handyman from '@/data/directory/handyman.json';
import hardscapePaversAndDriveways from '@/data/directory/hardscape-pavers-and-driveways.json';
import homeInspectors from '@/data/directory/home-inspectors.json';
import homeWatch from '@/data/directory/home-watch.json';
import houseCleaning from '@/data/directory/house-cleaning.json';
import insulation from '@/data/directory/insulation.json';
import interiorDesigners from '@/data/directory/interior-designers.json';
import ironGatesRailingsAndStairs from '@/data/directory/iron-gates-railings-and-stairs.json';
import irrigationAndRainwater from '@/data/directory/irrigation-and-rainwater.json';
import jewelryAndWatches from '@/data/directory/jewelry-and-watches.json';
import kitchenAndBathRemodeling from '@/data/directory/kitchen-and-bath-remodeling.json';
import landSurveyors from '@/data/directory/land-surveyors.json';
import landscaping from '@/data/directory/landscaping.json';
import lightingShowrooms from '@/data/directory/lighting-showrooms.json';
import locksmiths from '@/data/directory/locksmiths.json';
import luxuryAppliancesAndRepair from '@/data/directory/luxury-appliances-and-repair.json';
import luxuryConsignment from '@/data/directory/luxury-consignment.json';
import luxuryRentals from '@/data/directory/luxury-rentals.json';
import marketingAndWebDesign from '@/data/directory/marketing-and-web-design.json';
import moldAndWaterDamageRestoration from '@/data/directory/mold-and-water-damage-restoration.json';
import mortgageLenders from '@/data/directory/mortgage-lenders.json';
import newHomeCommunities from '@/data/directory/new-home-communities.json';
import outdoorFurniture from '@/data/directory/outdoor-furniture.json';
import outdoorLighting from '@/data/directory/outdoor-lighting.json';
import paintingAndWallFinishes from '@/data/directory/painting-and-wall-finishes.json';
import plantNurseryAndPlantService from '@/data/directory/plant-nursery-and-plant-service.json';
import plumbers from '@/data/directory/plumbers.json';
import poolBuildersAndRemodeling from '@/data/directory/pool-builders-and-remodeling.json';
import poolService from '@/data/directory/pool-service.json';
import propertyManagement from '@/data/directory/property-management.json';
import realtors from '@/data/directory/realtors.json';
import resortsAndHotels from '@/data/directory/resorts-and-hotels.json';
import roofingAndGutters from '@/data/directory/roofing-and-gutters.json';
import seniorLivingAndMemoryCare from '@/data/directory/senior-living-and-memory-care.json';
import smartHomeAudioAndHomeTheater from '@/data/directory/smart-home-audio-and-home-theater.json';
import stucco from '@/data/directory/stucco.json';
import tileAndStone from '@/data/directory/tile-and-stone.json';
import titleAndEscrow from '@/data/directory/title-and-escrow.json';
import waterTreatment from '@/data/directory/water-treatment.json';
import windowCoveringsShadesAndTint from '@/data/directory/window-coverings-shades-and-tint.json';
import windowsAndDoors from '@/data/directory/windows-and-doors.json';
import wineCellarsAndHomeBars from '@/data/directory/wine-cellars-and-home-bars.json';

// Latest import date across the files, used as the sitemap lastmod for directory pages.
export const IMPORTED_AT = [
  acAndHeating.importedAt,
  architectsAndStructuralEngineers.importedAt,
  artFramingInstallationAndShipping.importedAt,
  artGalleries.importedAt,
  artificialTurf.importedAt,
  butchersAndGourmetMarkets.importedAt,
  cabinetryAndBuiltIns.importedAt,
  classicCarRestoration.importedAt,
  coffeeShops.importedAt,
  commercialAndInvestmentRealEstate.importedAt,
  concreteAndFoundationRepair.importedAt,
  customHomeBuilders.importedAt,
  demolitionAndExcavation.importedAt,
  electricians.importedAt,
  fencingBlockWallsAndPoolFencing.importedAt,
  flooring.importedAt,
  furnitureRugsAndAntiques.importedAt,
  garageDoors.importedAt,
  generalContractorsAndRemodelers.importedAt,
  glassMirrorsAndShowerDoors.importedAt,
  hairSalonsAndBlowoutBars.importedAt,
  handyman.importedAt,
  hardscapePaversAndDriveways.importedAt,
  homeInspectors.importedAt,
  homeWatch.importedAt,
  houseCleaning.importedAt,
  insulation.importedAt,
  interiorDesigners.importedAt,
  ironGatesRailingsAndStairs.importedAt,
  irrigationAndRainwater.importedAt,
  jewelryAndWatches.importedAt,
  kitchenAndBathRemodeling.importedAt,
  landSurveyors.importedAt,
  landscaping.importedAt,
  lightingShowrooms.importedAt,
  locksmiths.importedAt,
  luxuryAppliancesAndRepair.importedAt,
  luxuryConsignment.importedAt,
  luxuryRentals.importedAt,
  marketingAndWebDesign.importedAt,
  moldAndWaterDamageRestoration.importedAt,
  mortgageLenders.importedAt,
  newHomeCommunities.importedAt,
  outdoorFurniture.importedAt,
  outdoorLighting.importedAt,
  paintingAndWallFinishes.importedAt,
  plantNurseryAndPlantService.importedAt,
  plumbers.importedAt,
  poolBuildersAndRemodeling.importedAt,
  poolService.importedAt,
  propertyManagement.importedAt,
  realtors.importedAt,
  resortsAndHotels.importedAt,
  roofingAndGutters.importedAt,
  seniorLivingAndMemoryCare.importedAt,
  smartHomeAudioAndHomeTheater.importedAt,
  stucco.importedAt,
  tileAndStone.importedAt,
  titleAndEscrow.importedAt,
  waterTreatment.importedAt,
  windowCoveringsShadesAndTint.importedAt,
  windowsAndDoors.importedAt,
  wineCellarsAndHomeBars.importedAt,
].sort().pop();

export const IMPORTED_BUSINESSES = [
  ...acAndHeating.businesses,
  ...architectsAndStructuralEngineers.businesses,
  ...artFramingInstallationAndShipping.businesses,
  ...artGalleries.businesses,
  ...artificialTurf.businesses,
  ...butchersAndGourmetMarkets.businesses,
  ...cabinetryAndBuiltIns.businesses,
  ...classicCarRestoration.businesses,
  ...coffeeShops.businesses,
  ...commercialAndInvestmentRealEstate.businesses,
  ...concreteAndFoundationRepair.businesses,
  ...customHomeBuilders.businesses,
  ...demolitionAndExcavation.businesses,
  ...electricians.businesses,
  ...fencingBlockWallsAndPoolFencing.businesses,
  ...flooring.businesses,
  ...furnitureRugsAndAntiques.businesses,
  ...garageDoors.businesses,
  ...generalContractorsAndRemodelers.businesses,
  ...glassMirrorsAndShowerDoors.businesses,
  ...hairSalonsAndBlowoutBars.businesses,
  ...handyman.businesses,
  ...hardscapePaversAndDriveways.businesses,
  ...homeInspectors.businesses,
  ...homeWatch.businesses,
  ...houseCleaning.businesses,
  ...insulation.businesses,
  ...interiorDesigners.businesses,
  ...ironGatesRailingsAndStairs.businesses,
  ...irrigationAndRainwater.businesses,
  ...jewelryAndWatches.businesses,
  ...kitchenAndBathRemodeling.businesses,
  ...landSurveyors.businesses,
  ...landscaping.businesses,
  ...lightingShowrooms.businesses,
  ...locksmiths.businesses,
  ...luxuryAppliancesAndRepair.businesses,
  ...luxuryConsignment.businesses,
  ...luxuryRentals.businesses,
  ...marketingAndWebDesign.businesses,
  ...moldAndWaterDamageRestoration.businesses,
  ...mortgageLenders.businesses,
  ...newHomeCommunities.businesses,
  ...outdoorFurniture.businesses,
  ...outdoorLighting.businesses,
  ...paintingAndWallFinishes.businesses,
  ...plantNurseryAndPlantService.businesses,
  ...plumbers.businesses,
  ...poolBuildersAndRemodeling.businesses,
  ...poolService.businesses,
  ...propertyManagement.businesses,
  ...realtors.businesses,
  ...resortsAndHotels.businesses,
  ...roofingAndGutters.businesses,
  ...seniorLivingAndMemoryCare.businesses,
  ...smartHomeAudioAndHomeTheater.businesses,
  ...stucco.businesses,
  ...tileAndStone.businesses,
  ...titleAndEscrow.businesses,
  ...waterTreatment.businesses,
  ...windowCoveringsShadesAndTint.businesses,
  ...windowsAndDoors.businesses,
  ...wineCellarsAndHomeBars.businesses,
];
