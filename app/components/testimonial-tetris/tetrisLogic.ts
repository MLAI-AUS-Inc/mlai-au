/**
 * Core Tetris game logic
 * Handles collision detection, rotation, line clearing
 */

import type {
  GameGrid,
  GamePiece,
  TetrominoShape,
  TetrominoType,
  LockedCell,
  ColorKey,
} from './types';
import { GAME_CONFIG } from './testimonialData';

// ============================================
// TETROMINO SHAPES (Simplified - 4 shapes)
// ============================================

export const TETROMINO_SHAPES: Record<TetrominoType, number[][][]> = {
  // Small testimonial (3 wide x 2 tall) - no rotation
  I: [
    [
      [1, 1, 1],
      [1, 1, 1],
    ],
  ],
  // Medium testimonial (4 wide x 2 tall) - no rotation
  O: [
    [
      [1, 1, 1, 1],
      [1, 1, 1, 1],
    ],
  ],
  // Large square testimonial (3 wide x 3 tall) - no rotation
  T: [
    [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ],
  ],
  // Tall testimonial (2 wide x 3 tall) - no rotation
  L: [
    [
      [1, 1],
      [1, 1],
      [1, 1],
    ],
  ],
};

// ============================================
// GRID OPERATIONS
// ============================================

/**
 * Create empty game grid
 */
export function createEmptyGrid(): GameGrid {
  return Array.from({ length: GAME_CONFIG.GRID_ROWS }, () =>
    Array(GAME_CONFIG.GRID_COLS).fill(null)
  );
}

/**
 * Check if a position on the grid is valid (in bounds and empty)
 */
export function isPositionValid(
  grid: GameGrid,
  piece: GamePiece,
  offsetX = 0,
  offsetY = 0
): boolean {
  const shape = getRotatedShape(piece.shape.type, piece.rotation);
  
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col]) {
        const newX = piece.x + col + offsetX;
        const newY = piece.y + row + offsetY;

        // Check bounds
        if (
          newX < 0 ||
          newX >= GAME_CONFIG.GRID_COLS ||
          newY >= GAME_CONFIG.GRID_ROWS
        ) {
          return false;
        }

        // Allow pieces above the grid (y < 0) while falling
        if (newY >= 0 && grid[newY][newX]) {
          return false;
        }
      }
    }
  }
  return true;
}

/**
 * Lock the current piece into the grid
 */
export function lockPiece(grid: GameGrid, piece: GamePiece): GameGrid {
  const newGrid = grid.map((row) => [...row]);
  const shape = getRotatedShape(piece.shape.type, piece.rotation);

  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col]) {
        const y = piece.y + row;
        const x = piece.x + col;
        
        if (y >= 0 && y < GAME_CONFIG.GRID_ROWS) {
          newGrid[y][x] = {
            color: piece.shape.color,
            testimonialId: piece.testimonial.id,
          };
        }
      }
    }
  }

  return newGrid;
}

/**
 * Check for completed lines
 */
export function getCompletedLines(grid: GameGrid): number[] {
  const completedLines: number[] = [];

  for (let row = 0; row < grid.length; row++) {
    if (grid[row].every((cell) => cell !== null)) {
      completedLines.push(row);
    }
  }

  return completedLines;
}

/**
 * Clear completed lines and drop above blocks
 */
export function clearLines(grid: GameGrid, linesToClear: number[]): GameGrid {
  if (linesToClear.length === 0) return grid;

  let newGrid = grid.filter((_, index) => !linesToClear.includes(index));

  // Add empty rows at top
  const emptyRows = Array.from({ length: linesToClear.length }, () =>
    Array(GAME_CONFIG.GRID_COLS).fill(null)
  );

  return [...emptyRows, ...newGrid];
}

// ============================================
// ROTATION
// ============================================

/**
 * Get the shape matrix for a given rotation
 */
export function getRotatedShape(type: TetrominoType, rotation: number): number[][] {
  const shapes = TETROMINO_SHAPES[type];
  const normalizedRotation = rotation % shapes.length;
  return shapes[normalizedRotation];
}

/**
 * Attempt to rotate piece (with basic wall kick)
 */
export function tryRotate(grid: GameGrid, piece: GamePiece): GamePiece | null {
  const shapes = TETROMINO_SHAPES[piece.shape.type];
  const newRotation = (piece.rotation + 1) % shapes.length;
  
  const rotatedPiece = {
    ...piece,
    rotation: newRotation,
  };

  // Try basic position
  if (isPositionValid(grid, rotatedPiece)) {
    return rotatedPiece;
  }

  // Try wall kick (shift left or right if rotation fails)
  const kicks = [-1, 1, -2, 2]; // try left, right, further left, further right
  
  for (const kick of kicks) {
    if (isPositionValid(grid, rotatedPiece, kick, 0)) {
      return {
        ...rotatedPiece,
        x: rotatedPiece.x + kick,
      };
    }
  }

  // Rotation failed
  return null;
}

// ============================================
// UTILITY
// ============================================

/**
 * Check if game is over (pieces stacked to top)
 */
export function isGameOver(grid: GameGrid): boolean {
  // Check if any cells in the top 2 rows are filled
  return grid.slice(0, 2).some((row) => row.some((cell) => cell !== null));
}

/**
 * Get piece width for centering
 */
export function getPieceWidth(piece: GamePiece): number {
  const shape = getRotatedShape(piece.shape.type, piece.rotation);
  return shape[0].length;
}

