/**
 * Utility helper functions
 */

import type { Testimonial, TetrominoType, ColorKey } from './types';
import { TESTIMONIALS } from './testimonialData';

/**
 * Get random testimonial
 */
export function getRandomTestimonial(): Testimonial {
  return TESTIMONIALS[Math.floor(Math.random() * TESTIMONIALS.length)];
}

/**
 * Get random tetromino type
 */
export function getRandomTetrominoType(): TetrominoType {
  const types: TetrominoType[] = ['I', 'O', 'T', 'L'];
  return types[Math.floor(Math.random() * types.length)];
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get author initials for avatar placeholder
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Format time in MM:SS
 */
export function formatTime(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

/**
 * Clamp value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Get appropriate text color for a background color
 */
export function getTextColor(bgColor: ColorKey): string {
  // Light colors get dark text, dark colors get light text
  const lightBgColors: ColorKey[] = ['yellow', 'mint'];
  return lightBgColors.includes(bgColor) ? '#1a1a1a' : '#ffffff';
}

