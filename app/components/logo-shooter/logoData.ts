/**
 * Sponsor Logo Data
 * Extracted from the existing logo cloud section
 */

import type { SponsorLogoData } from './types';

export const SPONSOR_LOGOS: SponsorLogoData[] = [
  { name: 'NAB', imagePath: 'sponsor_logos/nab.png', size: 'large' },
  { name: 'V2 Digital', imagePath: 'sponsor_logos/v2digital.png', size: 'medium' },
  { name: 'AWS Startups', imagePath: 'sponsor_logos/aws.png', size: 'medium' },
  { name: 'Mantel Group', imagePath: 'sponsor_logos/mantel.png', size: 'small' },
  { name: 'Humyn.ai', imagePath: 'sponsor_logos/humyn.png', size: 'medium' },
  { name: 'Cake', imagePath: 'sponsor_logos/cake.png', size: 'medium' },
  { name: 'Microsoft', imagePath: 'sponsor_logos/microsoft.png', size: 'medium' },
  { name: 'Wilson A.I.', imagePath: 'sponsor_logos/wilsonai.png', size: 'small' },
  { name: 'University of Melbourne', imagePath: 'sponsor_logos/uom.jpeg', size: 'large' },
  { name: 'Squarepeg', imagePath: 'sponsor_logos/squarepeg.png', size: 'small' },
  { name: 'AirTree', imagePath: 'sponsor_logos/airtree.jpeg', size: 'large' },
  { name: 'Blackbird', imagePath: 'sponsor_logos/blackbird.png', size: 'small' },
  { name: 'Rampersand', imagePath: 'sponsor_logos/rampersand.png', size: 'small' },
];

// Game configuration constants
export const GAME_CONFIG = {
  MIN_LOGOS: 3,
  MAX_LOGOS: 5,
  MIN_SPAWN_DISTANCE: 25, // Minimum distance between logos (percentage)
  VELOCITY_Z_MIN: 0.6,
  VELOCITY_Z_MAX: 1.2,
  DRIFT_X_MIN: -0.3,
  DRIFT_X_MAX: 0.3,
  DRIFT_Y_MIN: -0.3,
  DRIFT_Y_MAX: 0.3,
  Z_FAR: 0, // Far from screen
  Z_NEAR: 100, // Close to screen (past this, logo disappears)
  SCALE_MIN: 0.3,
  SCALE_MAX: 1.5,
  BASE_LOGO_SIZE: 80, // Base size in pixels
  HIT_FEEDBACK_DURATION: 2000, // ms
};

