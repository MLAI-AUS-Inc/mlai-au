/**
 * Sponsor Logo Data
 * Extracted from the existing logo cloud section
 */

import type { SponsorLogoData } from './types';

export const SPONSOR_LOGOS: SponsorLogoData[] = [
  // Government & Public Sector
  { name: 'eSafety Commissioner', imagePath: 'sponsor_logos/esafety.png', size: 'large', category: 'Government & Public Sector' },
  { name: 'City of Melbourne', imagePath: 'sponsor_logos/melbourne.png', size: 'medium', category: 'Government & Public Sector' },
  { name: 'CSIRO', imagePath: 'sponsor_logos/csiro.png', size: 'medium', category: 'Government & Public Sector' },
  
  // Universities
  { name: 'University of Melbourne', imagePath: 'sponsor_logos/uom.jpeg', size: 'large', category: 'Universities' },
  { name: 'Monash (MIME)', imagePath: 'sponsor_logos/monash.png', size: 'large', category: 'Universities' },
  { name: 'Swinburne University', imagePath: 'sponsor_logos/swinburne.png', size: 'medium', category: 'Universities' },
  { name: 'RMIT University', imagePath: 'sponsor_logos/rmit.png', size: 'medium', category: 'Universities' },
  
  // Major Tech & Cloud
  { name: 'AWS', imagePath: 'sponsor_logos/aws.png', size: 'large', category: 'Major Tech & Cloud' },
  { name: 'Google Cloud', imagePath: 'sponsor_logos/google-cloud.png', size: 'large', category: 'Major Tech & Cloud' },
  { name: 'Alibaba Cloud', imagePath: 'sponsor_logos/alibaba.png', size: 'medium', category: 'Major Tech & Cloud' },
  { name: 'ByteDance', imagePath: 'sponsor_logos/bytedance.png', size: 'medium', category: 'Major Tech & Cloud' },
  
  // Financial & Banking
  { name: 'NAB', imagePath: 'sponsor_logos/nab.png', size: 'large', category: 'Financial & Banking' },
  { name: 'BoQ Specialist', imagePath: 'sponsor_logos/boq.png', size: 'medium', category: 'Financial & Banking' },
  { name: 'Telstra', imagePath: 'sponsor_logos/telstra.png', size: 'large', category: 'Financial & Banking' },
  { name: 'PwC', imagePath: 'sponsor_logos/pwc.png', size: 'large', category: 'Financial & Banking' },
  
  // VCs & Accelerators
  { name: 'AirTree', imagePath: 'sponsor_logos/airtree.jpeg', size: 'large', category: 'VCs & Accelerators' },
  { name: 'Squarepeg', imagePath: 'sponsor_logos/squarepeg.png', size: 'medium', category: 'VCs & Accelerators' },
  { name: 'Blackbird', imagePath: 'sponsor_logos/blackbird.png', size: 'medium', category: 'VCs & Accelerators' },
  { name: 'Antler', imagePath: 'sponsor_logos/antler.png', size: 'medium', category: 'VCs & Accelerators' },
  { name: 'Boson Ventures', imagePath: 'sponsor_logos/boson.png', size: 'small', category: 'VCs & Accelerators' },
  { name: 'LaunchVic', imagePath: 'sponsor_logos/launchvic.png', size: 'medium', category: 'VCs & Accelerators' },
  { name: 'Stone & Chalk', imagePath: 'sponsor_logos/stone-chalk.png', size: 'medium', category: 'VCs & Accelerators' },
  { name: 'MedTech Actuator', imagePath: 'sponsor_logos/medtech.png', size: 'small', category: 'VCs & Accelerators' },
  { name: 'Luna Startup Studio', imagePath: 'sponsor_logos/luna.png', size: 'small', category: 'VCs & Accelerators' },
  { name: 'Cremorne Digital Hub', imagePath: 'sponsor_logos/cremorne.png', size: 'small', category: 'VCs & Accelerators' },
  { name: 'StartSpace', imagePath: 'sponsor_logos/startspace.png', size: 'small', category: 'VCs & Accelerators' },
  
  // AI & Tech Startups
  { name: 'Eucalyptus', imagePath: 'sponsor_logos/eucalyptus.png', size: 'medium', category: 'AI & Tech Startups' },
  { name: 'Helfie.ai', imagePath: 'sponsor_logos/helfie.png', size: 'medium', category: 'AI & Tech Startups' },
  { name: 'V2 Digital', imagePath: 'sponsor_logos/v2digital.png', size: 'medium', category: 'AI & Tech Startups' },
  { name: 'MIGA', imagePath: 'sponsor_logos/miga.png', size: 'small', category: 'AI & Tech Startups' },
  { name: 'Heidi Health', imagePath: 'sponsor_logos/heidi.png', size: 'medium', category: 'AI & Tech Startups' },
  { name: 'Lyrebird Health', imagePath: 'sponsor_logos/lyrebird.png', size: 'medium', category: 'AI & Tech Startups' },
  { name: 'Lyra Technologies', imagePath: 'sponsor_logos/lyra.png', size: 'small', category: 'AI & Tech Startups' },
  { name: 'Gumnut.dev', imagePath: 'sponsor_logos/gumnut.png', size: 'small', category: 'AI & Tech Startups' },
  { name: 'SupportSorted', imagePath: 'sponsor_logos/supportsorted.png', size: 'small', category: 'AI & Tech Startups' },
  { name: 'Boab AI', imagePath: 'sponsor_logos/boab.png', size: 'medium', category: 'AI & Tech Startups' },
  { name: 'Amber Electric', imagePath: 'sponsor_logos/amber.png', size: 'medium', category: 'AI & Tech Startups' },
  { name: 'Relevance.ai', imagePath: 'sponsor_logos/relevance.png', size: 'medium', category: 'AI & Tech Startups' },
  { name: 'Lovable', imagePath: 'sponsor_logos/lovable.png', size: 'small', category: 'AI & Tech Startups' },
  { name: 'Vercel', imagePath: 'sponsor_logos/vercel.png', size: 'medium', category: 'AI & Tech Startups' },
  { name: 'Wonki', imagePath: 'sponsor_logos/wonki.png', size: 'small', category: 'AI & Tech Startups' },
  { name: 'Standard Ledger', imagePath: 'sponsor_logos/standard-ledger.png', size: 'small', category: 'AI & Tech Startups' },
  { name: 'The Product Bus', imagePath: 'sponsor_logos/product-bus.png', size: 'small', category: 'AI & Tech Startups' },
  { name: 'AskSia', imagePath: 'sponsor_logos/asksia.png', size: 'small', category: 'AI & Tech Startups' },
  { name: 'StarPlan', imagePath: 'sponsor_logos/starplan.png', size: 'small', category: 'AI & Tech Startups' },
  { name: 'Fableration', imagePath: 'sponsor_logos/fableration.png', size: 'small', category: 'AI & Tech Startups' },
  { name: 'JR Academy', imagePath: 'sponsor_logos/jracademy.png', size: 'small', category: 'AI & Tech Startups' },
  { name: 'Acase', imagePath: 'sponsor_logos/acase.png', size: 'small', category: 'AI & Tech Startups' },
  { name: 'Stile Education', imagePath: 'sponsor_logos/stile.png', size: 'medium', category: 'AI & Tech Startups' },
];

// Game configuration constants
export const GAME_CONFIG = {
  MIN_LOGOS: 4,
  MAX_LOGOS: 6,
  MIN_SPAWN_DISTANCE: 20, // Minimum distance between logos (percentage)
  VELOCITY_Z_MIN: 0.5,
  VELOCITY_Z_MAX: 1.0,
  DRIFT_X_MIN: -0.15,
  DRIFT_X_MAX: 0.15,
  DRIFT_Y_MIN: -0.15,
  DRIFT_Y_MAX: 0.15,
  Z_FAR: 0, // Far from screen
  Z_NEAR: 100, // Close to screen (past this, logo disappears)
  SCALE_MIN: 0.15, // Start very small (far away)
  SCALE_MAX: 2.5, // Grow very large (close up)
  BASE_LOGO_SIZE: 80, // Base size in pixels
  HIT_FEEDBACK_DURATION: 2000, // ms
};

