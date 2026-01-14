/**
 * Utility functions for the Logo Shooter game
 */

import type { Logo, SponsorLogoData } from './types';
import { GAME_CONFIG, SPONSOR_LOGOS } from './logoData';

/**
 * Generate a random number between min and max
 */
export function random(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Map a value from one range to another
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/**
 * Calculate distance between two points
 */
export function distance(
  p1: { x: number; y: number },
  p2: { x: number; y: number }
): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return `logo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get a random sponsor logo from the data
 */
export function getRandomSponsorLogo(): SponsorLogoData {
  return SPONSOR_LOGOS[Math.floor(Math.random() * SPONSOR_LOGOS.length)];
}

/**
 * Check if a new logo position is too close to existing logos (anti-clustering)
 */
export function isTooClose(
  newLogo: { x: number; y: number },
  existingLogos: Logo[]
): boolean {
  return existingLogos.some((logo) => {
    const dist = distance(
      { x: newLogo.x, y: newLogo.y },
      { x: logo.x, y: logo.y }
    );
    return dist < GAME_CONFIG.MIN_SPAWN_DISTANCE;
  });
}

/**
 * Create a new logo with random position and velocity
 */
export function createLogo(existingLogos: Logo[] = []): Logo {
  const sponsor = getRandomSponsorLogo();
  
  // Try to find a position that's not too close to existing logos
  let x: number, y: number;
  let attempts = 0;
  const maxAttempts = 10;
  
  do {
    x = random(15, 85); // Keep away from edges
    y = random(15, 85);
    attempts++;
  } while (
    attempts < maxAttempts &&
    isTooClose({ x, y }, existingLogos)
  );
  
  return {
    id: generateId(),
    name: sponsor.name,
    imagePath: sponsor.imagePath,
    category: sponsor.category,
    x,
    y,
    z: GAME_CONFIG.Z_FAR,
    velocityZ: random(GAME_CONFIG.VELOCITY_Z_MIN, GAME_CONFIG.VELOCITY_Z_MAX),
    driftX: random(GAME_CONFIG.DRIFT_X_MIN, GAME_CONFIG.DRIFT_X_MAX),
    driftY: random(GAME_CONFIG.DRIFT_Y_MIN, GAME_CONFIG.DRIFT_Y_MAX),
    scale: GAME_CONFIG.SCALE_MIN,
    isHit: false,
    hitTime: null,
  };
}

/**
 * Calculate accuracy percentage
 */
export function calculateAccuracy(hits: number, totalShots: number): number {
  if (totalShots === 0) return 0;
  return Math.round((hits / totalShots) * 100);
}

/**
 * Format time in MM:SS format
 */
export function formatTime(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

/**
 * Load an image and return a promise
 */
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

