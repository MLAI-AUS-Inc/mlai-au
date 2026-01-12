/**
 * Logo Shooter Game - Type Definitions
 */

export interface Logo {
  id: string;
  name: string;
  imagePath: string;
  x: number; // Position as percentage (0-100)
  y: number; // Position as percentage (0-100)
  z: number; // Depth: 0 = far away, 100 = close to screen
  velocityZ: number; // Speed moving toward screen
  driftX: number; // Horizontal drift
  driftY: number; // Vertical drift
  scale: number; // Current scale (calculated from z)
  isHit: boolean;
  hitTime: number | null;
}

export interface GameStats {
  hits: number;
  totalShots: number;
  startTime: number;
  lastHitLogoName: string | null;
  lastHitTime: number | null;
}

export type GameMode = 'idle' | 'playing' | 'paused';

export interface GameState {
  mode: GameMode;
  logos: Logo[];
  stats: GameStats;
}

export interface SponsorLogoData {
  name: string;
  imagePath: string;
  size: 'small' | 'medium' | 'large';
}

