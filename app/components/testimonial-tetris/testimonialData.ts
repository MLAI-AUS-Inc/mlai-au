/**
 * Testimonial data extracted from existing TetrisTestimonials component
 */

import type { Testimonial, ColorKey } from './types';

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
 * Auto-calculate testimonial block dimensions based on text length
 * 
 * HOW TO ADJUST SIZING:
 * - Change the threshold numbers (80, 150, 250, 350) to adjust when blocks get bigger
 * - Change the { width, height } values to make blocks wider/taller
 * - Lower thresholds = blocks get bigger sooner (more text fits)
 * - Higher thresholds = blocks stay smaller longer (more compact)
 * 
 * Returns { width, height } in grid cells
 */
function calculateDimensions(text: string, id: number): { width: number; height: number } {
  const length = text.length;
  
  // Decorative blocks (no text) - variety based on ID
  if (length === 0) {
    const variants = [
      { width: 1, height: 1 },
      { width: 2, height: 1 },
      { width: 1, height: 2 },
    ];
    return variants[id % variants.length];
  }
  
  // Formula: longer text = bigger blocks
  if (length < 80) {
    return { width: 2, height: 2 };
  }
  
  if (length < 150) {
    return { width: 3, height: 2 };
  }
  
  if (length < 250) {
    return { width: 3, height: 3 };
  }
  
  if (length < 350) {
    return { width: 4, height: 3 };
  }
  
  // Very long testimonials
  return { width: 4, height: 4 };
}

// Base testimonial data (dimensions auto-calculated)
const BASE_TESTIMONIALS: Omit<Testimonial, 'gridWidth' | 'gridHeight'>[] = [
  {
    id: 1,
    body: "It was an absolute pleasure to work with the MLAI team at Ecosystem Drinks: Talent meets Startups. It was amazing to see so many engaging members of the MLAI community in it for the startup speed dating.",
    author: {
      name: "Eike Zoller",
      handle: "Ecosystems Director - Stone & Chalk",
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/eikezeller.jpg?alt=media&token=f184570d-27bf-4100-a53d-2a541d4f1fce",
    },
    color: "orange" as ColorKey,
  },
  {
    id: 2,
    body: "As excitement about AI builds and the impacts spread into all our daily lives, a strong and diverse community of participants is vital to support positive outcomes for all. It's great to see the MLAI Aus crew working hard to build this community across Australia. Get off the couch, get involved!",
    author: {
      name: "Kendra Vent",
      handle: "Director - Europalabs",
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/kendra.png?alt=media&token=63333d01-f649-40e5-bbbc-b9239af80c0e",
    },
    color: "black" as ColorKey,
  },
  {
    id: 3,
    body: "MLAI has been a fantastic community for connecting with like-minded, talented people. Everyone has been warm, welcoming, and eager to talk nitty-gritty tech details.",
    author: {
      name: "Xavier Andueza",
      handle: "Founding AI Engineer - Userdoc",
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/committee-photos%2Fxavier.png?alt=media&token=d803afb5-66ce-4dfe-8407-f284ab117f78",
    },
    color: "purple" as ColorKey,
  },
  {
    id: 4,
    body: "MLAI has been a fantastic community for connecting with like-minded, talented, and diverse people. Everyone has been warm, welcoming, and eager to talk about tech details.",
    author: {
      name: "Blair Seffer",
      handle: "Userdoc",
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/committee-photos%2Fxavier.png?alt=media&token=d803afb5-66ce-4dfe-8407-f284ab117f78",
    },
    color: "blue" as ColorKey,
  },
  {
    id: 5,
    body: "MLAI has been connecting cool people with incredible teams. Join in and meet amazing people!",
    author: {
      name: "Community Member",
      handle: "MLAI Volunteer",
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/kendra.png?alt=media&token=63333d01-f649-40e5-bbbc-b9239af80c0e",
    },
    color: "yellow" as ColorKey,
  },
  {
    id: 6,
    body: "MLAI has an amazing community!",
    author: {
      name: "Olata",
      handle: "MLAI Member",
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/kendra.png?alt=media&token=63333d01-f649-40e5-bbbc-b9239af80c0e",
    },
    color: "mint" as ColorKey,
  },
  {
    id: 7,
    body: "MLAI's community is built by passionate volunteers making Australia a hub for AI innovation.",
    author: {
      name: "MLAI Team",
      handle: "Community Volunteers",
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/eikezeller.jpg?alt=media&token=f184570d-27bf-4100-a53d-2a541d4f1fce",
    },
    color: "pink" as ColorKey,
  },
  // Small decorative blocks (no text)
  {
    id: 8,
    body: "",
    author: { name: "", handle: "", imageUrl: "" },
    color: "yellow" as ColorKey,
  },
  {
    id: 9,
    body: "",
    author: { name: "", handle: "", imageUrl: "" },
    color: "pink" as ColorKey,
  },
  {
    id: 10,
    body: "",
    author: { name: "", handle: "", imageUrl: "" },
    color: "blue" as ColorKey,
  },
];

// Auto-calculate dimensions and export processed testimonials
export const TESTIMONIALS: Testimonial[] = BASE_TESTIMONIALS.map(testimonial => {
  const dimensions = calculateDimensions(testimonial.body, testimonial.id);
  return {
    ...testimonial,
    gridWidth: dimensions.width,
    gridHeight: dimensions.height,
  };
});

// Game configuration - Matching original bold aesthetic
export const GAME_CONFIG = {
  GRID_COLS: 18, // More columns for wider layout (matches overlay width)
  GRID_ROWS: 8, // More rows now that we have full height
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

