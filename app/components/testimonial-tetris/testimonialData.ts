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
  author: { name: string; handle: string; imageUrl: string; website?: string };
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
      website: "https://www.stoneandchalk.com.au/",
    },
    color: "orange",
    shapeType: "L", // L-shaped
  },
  {
    id: 2,
    body: "As excitement about AI builds and the impacts spread into all our daily lives, a strong and diverse community of participants is vital to support positive outcomes for all. It's great to see the MLAI Aus crew working hard to build this community across Australia. Get off the couch, get involved!",
    author: {
      name: "Kendra Vant",
      handle: "Director - Europalabs",
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/kendra.png?alt=media&token=63333d01-f649-40e5-bbbc-b9239af80c0e",
      website: "https://europa-labs.com/",
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
      website: "https://mlai.au",
    },
    color: "purple",
    shapeType: "T", // T-shaped
  },
  {
    id: 8,
    body: "As we implement AI-powered features such as medication adherence tracking, the support from the MLAI community has been invaluable. The collaboration has helped accelerate our product development and provided opportunities to learn from leading AI practitioners in Australia.",
    author: {
      name: "Rachel Zhao",
      handle: "Woofya",
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/testimonials%2F1753688236159.jpeg?alt=media&token=e39a5559-eff3-41bf-a5d5-d80028d0c18f",
      website: "https://woofya.com.au",
    },
    color: "orange",
    shapeType: "T",
  },
  {
    id: 9,
    body: "MLAI saved my gut- and hence my life, thanks to the Kombucha",
    author: {
      name: "Shriabhay (Abhay) S",
      handle: "MLAI",
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/testimonials%2F1767874131620%20(1).png?alt=media&token=1c68163a-2792-4b21-8d73-8e90fa6df494",
      website: "https://mlai.au",
    },
    color: "mint",
    shapeType: "S",
  },
  {
    id: 10,
    body: "The free coffee lured me in but the MLAI community kept me coming back!",
    author: {
      name: "CJ Moss",
      handle: "MLAI",
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/testimonials%2FT05N9C1QSJC-U08SNPBTUJJ-6323b3f9e9f6-512.png?alt=media&token=54ac889a-5db4-4167-b64d-edd2fbc1392d",
      website: "https://mlai.au",
    },
    color: "yellow",
    shapeType: "O",
  },
  {
    id: 11,
    body: "My dog nearly got run over by a car but MLAI saved him, I will forever be grateful and in debt to MLAI",
    author: {
      name: "Ethan Lee",
      handle: "MLAI",
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/testimonials%2F1750860666754.jpeg?alt=media&token=125c7ea4-cf01-4e23-be89-08cabbaaa87b",
      website: "https://mlai.au",
    },
    color: "purple",
    shapeType: "J",
  },
  {
    id: 12,
    body: "Dr Sam and the team at MLAI have built a genuinely useful AI community. The knowledge sharing is practical, generous, and immediately applicable, and you come away with real clarity on what to do next. Their \"Hack your way to #1 in Google\" course is the standout. It's packed with tactics you can implement fast, and it gives startups a clear path to turning AI and search into a repeatable growth lever. If you're building anything and need traction, it's an easy yes.",
    author: {
      name: "Ronan Leonard",
      handle: "Intelligent Resourcing",
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/testimonials%2FScreenshot%202026-02-03%20at%205.00.04%E2%80%AFPM.png?alt=media&token=5f1fcaee-b467-4130-9088-a5a6a1d5a3fb",
      website: "https://www.intelligentresourcing.co",
    },
    color: "blue",
    shapeType: "I",
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

