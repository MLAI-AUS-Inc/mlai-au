/**
 * Testimonial data extracted from existing TetrisTestimonials component
 */

import type { Testimonial, ColorKey, ShapeType } from './types';

export const TETRIS_COLORS = {
  orange: '#ff3d00',
  purple: '#4b0db3',
  black: '#1a1a1a',
  blue: '#3537dc',
  pink: '#ff003d',
  yellow: '#fefc22',
  mint: '#00ffd7',
};

/**
 * Get dimensions for each Tetris shape type
 * All shapes use original Tetris shapes:
 * - I: 4x1 (long bar)
 * - O: 2x2 (square)
 * - T: 3x2 (T-shape)
 * - S: 3x2 (S-shape)
 * - Z: 3x2 (Z-shape)
 * - L: 3x3 (L-shape with empty cells)
 * - J: 3x3 (J-shape with empty cells)
 */
function getShapeDimensions(shapeType: ShapeType): { width: number; height: number } {
  switch (shapeType) {
    case 'I':
      return { width: 4, height: 1 };
    case 'O':
      return { width: 2, height: 2 };
    case 'T':
    case 'S':
    case 'Z':
      return { width: 3, height: 2 };
    case 'L':
    case 'J':
      return { width: 3, height: 3 };
    default:
      return { width: 2, height: 2 };
  }
}

// Base testimonial data with assigned Tetris shapes
// Each testimonial gets one of the 7 original Tetris shapes: I, O, T, S, Z, L, J
interface BaseTestimonial {
  id: number;
  body: string;
  author: { name: string; handle: string; imageUrl: string };
  color: ColorKey;
  shapeType: ShapeType;
}

const BASE_TESTIMONIALS: BaseTestimonial[] = [
  {
    id: 1,
    body: "It was an absolute pleasure to work with the MLAI team at Ecosystem Drinks: Talent meets Startups. It was amazing to see so many engaging members of the MLAI community in it for the startup speed dating.",
    author: {
      name: "Eike Zoller",
      handle: "Ecosystems Director - Stone & Chalk",
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/eikezeller.jpg?alt=media&token=f184570d-27bf-4100-a53d-2a541d4f1fce",
    },
    color: "orange",
    shapeType: "L", // L-shaped
  },
  {
    id: 2,
    body: "As excitement about AI builds and the impacts spread into all our daily lives, a strong and diverse community of participants is vital to support positive outcomes for all. It's great to see the MLAI Aus crew working hard to build this community across Australia. Get off the couch, get involved!",
    author: {
      name: "Kendra Vent",
      handle: "Director - Europalabs",
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/kendra.png?alt=media&token=63333d01-f649-40e5-bbbc-b9239af80c0e",
    },
    color: "black",
    shapeType: "I", // I-shaped (long bar)
  },
  {
    id: 3,
    body: "MLAI has been a fantastic community for connecting with like-minded, talented people. Everyone has been warm, welcoming, and eager to talk nitty-gritty tech details.",
    author: {
      name: "Xavier Andueza",
      handle: "Founding AI Engineer - Userdoc",
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/committee-photos%2Fxavier.png?alt=media&token=d803afb5-66ce-4dfe-8407-f284ab117f78",
    },
    color: "purple",
    shapeType: "T", // T-shaped
  },
  {
    id: 4,
    body: "MLAI has been a fantastic community for connecting with like-minded, talented, and diverse people. Everyone has been warm, welcoming, and eager to talk about tech details.",
    author: {
      name: "Blair Seffer",
      handle: "Userdoc",
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/committee-photos%2Fxavier.png?alt=media&token=d803afb5-66ce-4dfe-8407-f284ab117f78",
    },
    color: "blue",
    shapeType: "J", // J-shaped (mirror of L)
  },
  {
    id: 5,
    body: "MLAI has been connecting cool people with incredible teams. Join in and meet amazing people!",
    author: {
      name: "Community Member",
      handle: "MLAI Volunteer",
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/kendra.png?alt=media&token=63333d01-f649-40e5-bbbc-b9239af80c0e",
    },
    color: "yellow",
    shapeType: "S", // S-shaped
  },
  {
    id: 6,
    body: "MLAI has an amazing community!",
    author: {
      name: "Olata",
      handle: "MLAI Member",
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/kendra.png?alt=media&token=63333d01-f649-40e5-bbbc-b9239af80c0e",
    },
    color: "mint",
    shapeType: "O", // O-shaped (square)
  },
  {
    id: 7,
    body: "MLAI's community is built by passionate volunteers making Australia a hub for AI innovation.",
    author: {
      name: "MLAI Team",
      handle: "Community Volunteers",
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/eikezeller.jpg?alt=media&token=f184570d-27bf-4100-a53d-2a541d4f1fce",
    },
    color: "pink",
    shapeType: "Z", // Z-shaped
  },
];

// Export processed testimonials with dimensions based on shape type
export const TESTIMONIALS: Testimonial[] = BASE_TESTIMONIALS.map(testimonial => {
  const dimensions = getShapeDimensions(testimonial.shapeType);
  return {
    ...testimonial,
    gridWidth: dimensions.width,
    gridHeight: dimensions.height,
  };
});

// Game configuration - Matching original bold aesthetic
export const GAME_CONFIG = {
  GRID_COLS: 10, // Standard Tetris width
  GRID_ROWS: 14, // More rows to fill the vertical space
  CELL_SIZE: 150, // Much larger cells for readable text (3x2 = 450x300px)
  FALL_SPEED: 1500, // milliseconds per drop (slower for larger pieces)
  FAST_FALL_SPEED: 200, // when pressing down
  LOCK_DELAY: 500, // delay before locking piece
  BORDER_RADIUS: 20, // Rounded corners like original (larger for bigger cells)
};

// Text color helper
export function getTextColor(colorKey: ColorKey): string {
  if (colorKey === 'yellow' || colorKey === 'mint') return '#1a1a1a';
  return '#ffffff';
}

