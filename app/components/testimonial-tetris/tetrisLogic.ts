/**
 * Core Tetris game logic
 * Handles collision detection, rotation, line clearing
 */

import { GAME_CONFIG } from "./testimonialData";
import type { GameGrid, GamePiece, ShapeType } from "./types";

// ============================================
// TETROMINO SHAPES - Original 7 Tetris pieces
// Each shape includes base rotation (rotation handled separately)
// ============================================

export const TETROMINO_SHAPES: Record<ShapeType, number[][]> = {
  // I-tetromino (long bar) - 4x1
  // [X][X][X][X]
  I: [
    [1, 1, 1, 1],
  ],

  // O-tetromino (square) - 2x2
  // [X][X]
  // [X][X]
  O: [
    [1, 1],
    [1, 1],
  ],

  // T-tetromino - 3x2
  // [X][X][X]
  // [ ][X][ ]
  T: [
    [1, 1, 1],
    [0, 1, 0],
  ],

  // S-tetromino - 3x2
  // [ ][X][X]
  // [X][X][ ]
  S: [
    [0, 1, 1],
    [1, 1, 0],
  ],

  // Z-tetromino - 3x2
  // [X][X][ ]
  // [ ][X][X]
  Z: [
    [1, 1, 0],
    [0, 1, 1],
  ],

  // L-tetromino - 3x3 (with empty cells)
  // [X][ ][ ]
  // [X][ ][ ]
  // [X][X][X]
  L: [
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 1],
  ],

  // J-tetromino (mirror of L) - 3x3
  // [ ][ ][X]
  // [ ][ ][X]
  // [X][X][X]
  J: [
    [0, 0, 1],
    [0, 0, 1],
    [1, 1, 1],
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
  const shape = getRotatedShape(piece.testimonial.shapeType, piece.rotation);

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
  const shape = getRotatedShape(piece.testimonial.shapeType, piece.rotation);

  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col]) {
        const y = piece.y + row;
        const x = piece.x + col;

        if (y >= 0 && y < GAME_CONFIG.GRID_ROWS) {
          newGrid[y][x] = {
            color: piece.testimonial.color,
            testimonialId: piece.testimonial.id,
            pieceId: piece.id,
            rotation: piece.rotation,
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
 * Rotate a matrix 90 degrees clockwise
 */
export function rotateMatrix90(matrix: number[][]): number[][] {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const rotated: number[][] = [];

  for (let col = 0; col < cols; col++) {
    const newRow: number[] = [];
    for (let row = rows - 1; row >= 0; row--) {
      newRow.push(matrix[row][col]);
    }
    rotated.push(newRow);
  }

  return rotated;
}

/**
 * Get the shape matrix for a given rotation
 * Applies 90° clockwise rotation for each rotation step
 */
export function getRotatedShape(
  type: ShapeType,
  rotation: number
): number[][] {
  let matrix = TETROMINO_SHAPES[type];
  const normalizedRotation = rotation % 4;

  // O shape doesn't rotate (always looks the same)
  if (type === "O") {
    return matrix;
  }

  // Apply rotations
  for (let i = 0; i < normalizedRotation; i++) {
    matrix = rotateMatrix90(matrix);
  }

  return matrix;
}

/**
 * Attempt to rotate piece (with basic wall kick)
 */
export function tryRotate(grid: GameGrid, piece: GamePiece): GamePiece | null {
  const shapeType = piece.testimonial.shapeType;

  // O shape doesn't rotate
  if (shapeType === "O") {
    return piece;
  }

  const newRotation = (piece.rotation + 1) % 4;

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
  const shape = getRotatedShape(piece.testimonial.shapeType, piece.rotation);
  return shape[0].length;
}
