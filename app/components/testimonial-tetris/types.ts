/**
 * Type definitions for Testimonial Tetris Game
 */

export type GameMode = "idle" | "playing" | "paused" | "gameOver";

export type ColorKey =
  | "orange"
  | "purple"
  | "black"
  | "blue"
  | "pink"
  | "yellow"
  | "mint";

// Original Tetris shape types (I, O, T, S, Z, L, J)
export type ShapeType = "I" | "O" | "T" | "S" | "Z" | "L" | "J";

// Testimonial data structure
export interface Testimonial {
  id: number;
  body: string;
  author: {
    name: string;
    handle: string;
    imageUrl: string;
  };
  color: ColorKey;
  gridWidth: number; // How many grid columns this testimonial occupies
  gridHeight: number; // How many grid rows this testimonial occupies
  shapeType: ShapeType; // One of the 7 original Tetris shapes
}

// Tetromino shape types
// Original rectangular shapes: I, O, T, L (solid rectangles)
// Actual tetromino shapes: L_TETRIS, J_TETRIS (with empty cells)
export type TetrominoType = "I" | "O" | "T" | "L" | "L_TETRIS" | "J_TETRIS";

// Tetromino shape definition
export interface TetrominoShape {
  type: TetrominoType;
  matrix: number[][]; // 1 = filled, 0 = empty
  color: ColorKey;
}

// Active game piece
export interface GamePiece {
  shape: TetrominoShape;
  x: number; // grid column position
  y: number; // grid row position
  rotation: number; // 0 = normal, 1 = rotated 90° (swapped width/height)
  testimonial: Testimonial; // the testimonial this piece represents
  id: string; // Unique ID for this piece instance
}

// Locked cell on the grid
export interface LockedCell {
  color: ColorKey;
  testimonialId: number;
  pieceId: string; // Unique ID for each piece instance
  rotation: number; // Rotation state when locked (0 = normal, 1 = rotated 90°)
}

// Game grid (2D array)
export type GameGrid = (LockedCell | null)[][];

// Game statistics
export interface GameStats {
  linesCleared: number;
  piecesPlaced: number;
  startTime: number | null;
}

// Game state
export interface GameState {
  mode: GameMode;
  grid: GameGrid;
  currentPiece: GamePiece | null;
  nextPiece: GamePiece | null;
  stats: GameStats;
  isAnimatingClear: boolean;
}
