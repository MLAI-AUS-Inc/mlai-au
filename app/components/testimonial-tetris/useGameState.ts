/**
 * Game State Hook
 * Manages Tetris game logic and state
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { GAME_CONFIG } from "./testimonialData";
import { createEmptyGrid, getCompletedLines, isGameOver, TETROMINO_SHAPES, rotateMatrix90 } from "./tetrisLogic";
import type {
  GameGrid,
  GameMode,
  GamePiece,
  GameState,
  GameStats,
  LockedCell,
  Testimonial,
  ShapeType,
} from "./types";
import { getRandomTestimonial } from "./utils";

// Get effective dimensions based on rotation
// Gets the rotated shape matrix and returns its dimensions
function getEffectiveDimensions(piece: GamePiece): {
  width: number;
  height: number;
} {
  const shapeType = piece.testimonial.shapeType;
  const normalizedRotation = piece.rotation % 4;

  // O shape doesn't rotate
  if (shapeType === "O") {
    return { width: 2, height: 2 };
  }

  // Get base matrix and apply rotation
  let matrix = TETROMINO_SHAPES[shapeType];
  for (let i = 0; i < normalizedRotation; i++) {
    matrix = rotateMatrix90(matrix);
  }

  return {
    width: matrix[0].length,
    height: matrix.length,
  };
}

/**
 * Get the shape matrix for a piece based on its shapeType
 * Returns a 2D array where 1 = filled, 0 = empty
 * Uses the TETROMINO_SHAPES matrices with rotation applied
 */
function getShapeMatrix(piece: GamePiece): number[][] {
  const shapeType = piece.testimonial.shapeType;
  const normalizedRotation = piece.rotation % 4;

  // O shape doesn't rotate
  if (shapeType === "O") {
    return TETROMINO_SHAPES.O;
  }

  // Get base matrix and apply rotation
  let matrix = TETROMINO_SHAPES[shapeType];
  for (let i = 0; i < normalizedRotation; i++) {
    matrix = rotateMatrix90(matrix);
  }

  return matrix;
}

// Collision check using shape matrix (supports L-shapes with empty cells)
// Only checks boundaries and collisions for filled cells (1s), not the bounding box
function isPositionValid(
  grid: GameGrid,
  piece: GamePiece,
  offsetX: number,
  offsetY: number
): boolean {
  const shapeMatrix = getShapeMatrix(piece);
  const height = shapeMatrix.length;
  const width = shapeMatrix[0].length;

  // Check boundaries AND collisions only for filled cells in shape
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      // Only check for filled cells (1s in the matrix)
      if (shapeMatrix[row][col] === 1) {
        const gridCol = piece.x + offsetX + col;
        const gridRow = piece.y + offsetY + row;

        // Check left/right boundaries for this cell
        if (gridCol < 0 || gridCol >= GAME_CONFIG.GRID_COLS) {
          return false;
        }

        // Check bottom boundary for this cell
        if (gridRow >= GAME_CONFIG.GRID_ROWS) {
          return false;
        }

        // Check collision with locked pieces (allow pieces above grid while falling)
        if (gridRow >= 0 && grid[gridRow]?.[gridCol]) {
          return false;
        }
      }
    }
  }

  return true;
}

// Lock piece to grid using shape matrix (supports L-shapes with empty cells)
function lockPiece(grid: GameGrid, piece: GamePiece): GameGrid {
  const newGrid = grid.map((row) => [...row]);
  const shapeMatrix = getShapeMatrix(piece);
  const height = shapeMatrix.length;
  const width = shapeMatrix[0].length;

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      // Only lock filled cells (1s in the matrix)
      if (shapeMatrix[row][col] === 1) {
        const gridRow = piece.y + row;
        const gridCol = piece.x + col;

        if (gridRow >= 0 && gridRow < GAME_CONFIG.GRID_ROWS) {
          newGrid[gridRow][gridCol] = {
            color: piece.testimonial.color,
            testimonialId: piece.testimonial.id,
            pieceId: piece.id, // Store unique piece ID
            rotation: piece.rotation, // Store rotation state
          };
        }
      }
    }
  }

  return newGrid;
}

// Smart line clearing: removes entire blocks touching cleared rows, then drops blocks down as intact pieces
function smartClearLines(grid: GameGrid, linesToClear: number[]): GameGrid {
  // Find all pieceIds that touch any of the cleared rows
  const pieceIdsToRemove = new Set<string>();

  linesToClear.forEach((rowIndex) => {
    grid[rowIndex].forEach((cell) => {
      if (cell) {
        pieceIdsToRemove.add(cell.pieceId);
      }
    });
  });

  // Remove all cells belonging to those pieces
  const gridAfterRemoval: GameGrid = grid.map((row) =>
    row.map((cell) =>
      cell && pieceIdsToRemove.has(cell.pieceId) ? null : cell
    )
  );

  // Group remaining cells by pieceId to keep blocks intact
  const pieceGroups = new Map<
    string,
    Array<{ row: number; col: number; cell: LockedCell }>
  >();

  for (let row = 0; row < GAME_CONFIG.GRID_ROWS; row++) {
    for (let col = 0; col < GAME_CONFIG.GRID_COLS; col++) {
      const cell = gridAfterRemoval[row][col];
      if (cell) {
        if (!pieceGroups.has(cell.pieceId)) {
          pieceGroups.set(cell.pieceId, []);
        }
        pieceGroups.get(cell.pieceId)!.push({ row, col, cell });
      }
    }
  }

  // Calculate info for each piece and sort by bottom row (process bottom-up)
  const piecesWithInfo = Array.from(pieceGroups.entries())
    .map(([pieceId, cells]) => {
      const rows = cells.map((c) => c.row);
      const maxRow = Math.max(...rows);
      // Create a set of actual filled cell positions for collision checking
      const filledCells = new Set(cells.map((c) => `${c.row},${c.col}`));
      // Get the bottom-most cells (cells that could collide when falling)
      const bottomCellsByCol = new Map<number, number>();
      for (const cell of cells) {
        const existing = bottomCellsByCol.get(cell.col);
        if (existing === undefined || cell.row > existing) {
          bottomCellsByCol.set(cell.col, cell.row);
        }
      }
      return {
        pieceId,
        cells,
        maxRow,
        filledCells,
        bottomCellsByCol, // Map of col -> bottommost row in that column
      };
    })
    .sort((a, b) => b.maxRow - a.maxRow); // Sort by bottom row, bottom-first

  // Create new grid and place pieces with gravity
  const droppedGrid: GameGrid = Array(GAME_CONFIG.GRID_ROWS)
    .fill(null)
    .map(() => Array(GAME_CONFIG.GRID_COLS).fill(null));

  // For each piece, calculate how far it can fall
  for (const piece of piecesWithInfo) {
    let fallDistance = 0;
    let canFall = true;

    while (canFall) {
      // Check each column's bottom cell to see if it can move down
      let collision = false;

      for (const [col, bottomRow] of piece.bottomCellsByCol) {
        const checkRow = bottomRow + fallDistance + 1;

        // Check grid boundary
        if (checkRow >= GAME_CONFIG.GRID_ROWS) {
          collision = true;
          break;
        }

        // Check collision with already-placed pieces (only check actual filled positions)
        if (droppedGrid[checkRow]?.[col] !== null) {
          collision = true;
          break;
        }
      }

      if (collision) {
        canFall = false;
      } else {
        fallDistance++;
      }
    }

    // Place the piece at its new position (shifted down by fallDistance)
    for (const { row, col, cell } of piece.cells) {
      const newRow = row + fallDistance;
      if (newRow >= 0 && newRow < GAME_CONFIG.GRID_ROWS) {
        droppedGrid[newRow][col] = cell;
      }
    }
  }

  return droppedGrid;
}

const initialStats: GameStats = {
  linesCleared: 0,
  piecesPlaced: 0,
  startTime: null,
};

interface UseGameStateReturn {
  gameState: GameState;
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  resetGame: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  moveDown: () => void;
  rotate: () => void;
}

export function useGameState(): UseGameStateReturn {
  const [mode, setMode] = useState<GameMode>("idle");
  const [grid, setGrid] = useState(createEmptyGrid());
  const [currentPiece, setCurrentPiece] = useState<GamePiece | null>(null);
  const [nextPiece, setNextPiece] = useState<GamePiece | null>(null);
  const [stats, setStats] = useState<GameStats>(initialStats);
  const [isAnimatingClear, setIsAnimatingClear] = useState(false);

  const fallTimerRef = useRef<number | undefined>(undefined);
  const recentTestimonialsRef = useRef<number[]>([]); // Track recent testimonial IDs to avoid repetition

  // ============================================
  // PIECE CREATION
  // ============================================

  const createPiece = useCallback((testimonial?: Testimonial): GamePiece => {
    let testim: Testimonial;

    if (testimonial) {
      testim = testimonial;
    } else {
      // Get random testimonial, avoiding recent ones
      const recentIds = recentTestimonialsRef.current;
      let attempts = 0;
      const maxAttempts = 10;

      do {
        testim = getRandomTestimonial();
        attempts++;
      } while (recentIds.includes(testim.id) && attempts < maxAttempts);

      // Track this testimonial (keep last 3)
      recentTestimonialsRef.current = [...recentIds, testim.id].slice(-3);
    }

    // Get piece dimensions from shape matrix
    const shapeMatrix = TETROMINO_SHAPES[testim.shapeType];
    const width = shapeMatrix[0].length;
    const height = shapeMatrix.length;

    // Center the piece horizontally (always start unrotated)
    const piece: GamePiece = {
      shape: {
        type: testim.shapeType as any, // Legacy field, kept for compatibility
        matrix: shapeMatrix,
        color: testim.color,
      },
      x: Math.floor((GAME_CONFIG.GRID_COLS - width) / 2),
      y: -height, // Start above grid
      rotation: 0, // Start unrotated
      testimonial: testim,
      id: `piece-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Unique ID
    };

    return piece;
  }, []);

  // ============================================
  // GAME FLOW
  // ============================================

  const spawnNextPiece = useCallback(() => {
    if (nextPiece) {
      setCurrentPiece(nextPiece);
      setNextPiece(createPiece());
    } else {
      setCurrentPiece(createPiece());
      setNextPiece(createPiece());
    }
  }, [nextPiece, createPiece]);

  const lockCurrentPiece = useCallback(() => {
    if (!currentPiece) return;

    // Lock piece to grid
    const newGrid = lockPiece(grid, currentPiece);

    // Smart line clearing - removes entire blocks touching cleared rows
    const completedLines = getCompletedLines(newGrid);

    if (completedLines.length > 0) {
      // Animate line clear
      setIsAnimatingClear(true);

      setTimeout(() => {
        // Remove entire testimonial blocks that touch any cleared row
        const clearedGrid = smartClearLines(newGrid, completedLines);
        setGrid(clearedGrid);
        setStats((prev) => ({
          ...prev,
          linesCleared: prev.linesCleared + completedLines.length,
          piecesPlaced: prev.piecesPlaced + 1,
        }));
        setIsAnimatingClear(false);

        // Check game over
        if (isGameOver(clearedGrid)) {
          setMode("gameOver");
        } else {
          spawnNextPiece();
        }
      }, 500);
    } else {
      setGrid(newGrid);
      setStats((prev) => ({
        ...prev,
        piecesPlaced: prev.piecesPlaced + 1,
      }));

      // Check game over
      if (isGameOver(newGrid)) {
        setMode("gameOver");
      } else {
        spawnNextPiece();
      }
    }
  }, [currentPiece, grid, spawnNextPiece]);

  // ============================================
  // MOVEMENT
  // ============================================

  const moveLeft = useCallback(() => {
    if (!currentPiece || mode !== "playing" || isAnimatingClear) return;

    if (isPositionValid(grid, currentPiece, -1, 0)) {
      setCurrentPiece({ ...currentPiece, x: currentPiece.x - 1 });
    }
  }, [currentPiece, grid, mode, isAnimatingClear]);

  const moveRight = useCallback(() => {
    if (!currentPiece || mode !== "playing" || isAnimatingClear) return;

    if (isPositionValid(grid, currentPiece, 1, 0)) {
      setCurrentPiece({ ...currentPiece, x: currentPiece.x + 1 });
    }
  }, [currentPiece, grid, mode, isAnimatingClear]);

  const moveDown = useCallback((): boolean => {
    if (!currentPiece || mode !== "playing" || isAnimatingClear) return false;

    if (isPositionValid(grid, currentPiece, 0, 1)) {
      setCurrentPiece({ ...currentPiece, y: currentPiece.y + 1 });
      return true;
    } else {
      // Can't move down, lock piece
      lockCurrentPiece();
      return false;
    }
  }, [currentPiece, grid, mode, isAnimatingClear, lockCurrentPiece]);

  // ============================================
  // ROTATION
  // ============================================

  /**
   * Try to rotate piece by 90° clockwise
   * Uses wall-kick to shift piece if rotation would cause collision
   */
  const tryRotatePiece = useCallback(
    (piece: GamePiece): GamePiece | null => {
      const shapeType = piece.testimonial.shapeType;

      // O shape doesn't rotate
      if (shapeType === "O") {
        return piece;
      }

      // All other shapes cycle through 4 rotations
      const newRotation = (piece.rotation + 1) % 4;

      const rotatedPiece: GamePiece = {
        ...piece,
        rotation: newRotation,
      };

      // Try basic position first
      if (isPositionValid(grid, rotatedPiece, 0, 0)) {
        return rotatedPiece;
      }

      // Wall-kick: try shifting left/right to fit
      const kicks = [-1, 1, -2, 2, -3, 3];
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
    },
    [grid]
  );

  const rotate = useCallback(() => {
    if (!currentPiece || mode !== "playing" || isAnimatingClear) return;

    const rotated = tryRotatePiece(currentPiece);
    if (rotated) {
      setCurrentPiece(rotated);
    }
  }, [currentPiece, mode, isAnimatingClear, tryRotatePiece]);

  // ============================================
  // GAME CONTROLS
  // ============================================

  const startGame = useCallback(() => {
    recentTestimonialsRef.current = []; // Clear repetition tracking
    setMode("playing");
    setGrid(createEmptyGrid());
    setStats({
      ...initialStats,
      startTime: Date.now(),
    });
    setCurrentPiece(createPiece());
    setNextPiece(createPiece());
    setIsAnimatingClear(false);
  }, [createPiece]);

  const pauseGame = useCallback(() => {
    if (mode === "playing") {
      setMode("paused");
    }
  }, [mode]);

  const resumeGame = useCallback(() => {
    if (mode === "paused") {
      setMode("playing");
    }
  }, [mode]);

  const resetGame = useCallback(() => {
    recentTestimonialsRef.current = []; // Clear repetition tracking
    setMode("idle");
    setGrid(createEmptyGrid());
    setCurrentPiece(null);
    setNextPiece(null);
    setStats(initialStats);
    setIsAnimatingClear(false);
  }, []);

  // ============================================
  // AUTO-FALL TIMER
  // ============================================

  useEffect(() => {
    if (mode !== "playing" || !currentPiece || isAnimatingClear) {
      if (fallTimerRef.current) {
        clearInterval(fallTimerRef.current);
        fallTimerRef.current = undefined;
      }
      return;
    }

    fallTimerRef.current = window.setInterval(() => {
      moveDown();
    }, GAME_CONFIG.FALL_SPEED);

    return () => {
      if (fallTimerRef.current) {
        clearInterval(fallTimerRef.current);
      }
    };
  }, [mode, currentPiece, isAnimatingClear, moveDown]);

  // ============================================
  // RETURN GAME STATE
  // ============================================

  const gameState: GameState = {
    mode,
    grid,
    currentPiece,
    nextPiece,
    stats,
    isAnimatingClear,
  };

  return {
    gameState,
    startGame,
    pauseGame,
    resumeGame,
    resetGame,
    moveLeft,
    moveRight,
    moveDown,
    rotate,
  };
}
