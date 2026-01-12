/**
 * Game State Hook
 * Manages Tetris game logic and state
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { GAME_CONFIG } from "./testimonialData";
import { createEmptyGrid, getCompletedLines, isGameOver } from "./tetrisLogic";
import type {
  GameGrid,
  GameMode,
  GamePiece,
  GameState,
  GameStats,
  LockedCell,
  Testimonial,
  TetrominoShape,
} from "./types";
import { getRandomTestimonial } from "./utils";

// Get effective dimensions based on rotation (0 = normal, 1 = rotated 90°)
function getEffectiveDimensions(piece: GamePiece): {
  width: number;
  height: number;
} {
  const baseWidth = piece.testimonial.gridWidth;
  const baseHeight = piece.testimonial.gridHeight;

  // Rotation 0 = normal, 1 = swapped (90°)
  if (piece.rotation === 0) {
    return { width: baseWidth, height: baseHeight };
  } else {
    return { width: baseHeight, height: baseWidth };
  }
}

// Simple collision check using testimonial dimensions (with rotation support)
function isPositionValid(
  grid: GameGrid,
  piece: GamePiece,
  offsetX: number,
  offsetY: number
): boolean {
  const newX = piece.x + offsetX;
  const newY = piece.y + offsetY;
  const { width, height } = getEffectiveDimensions(piece);

  // Check boundaries
  if (newX < 0 || newX + width > GAME_CONFIG.GRID_COLS) return false;
  if (newY + height > GAME_CONFIG.GRID_ROWS) return false;

  // Check collision with locked pieces
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const gridRow = newY + row;
      const gridCol = newX + col;

      if (gridRow >= 0 && grid[gridRow]?.[gridCol]) {
        return false; // Collision with locked piece
      }
    }
  }

  return true;
}

// Lock piece to grid using testimonial dimensions (with rotation support)
function lockPiece(grid: GameGrid, piece: GamePiece): GameGrid {
  const newGrid = grid.map((row) => [...row]);
  const { width, height } = getEffectiveDimensions(piece);

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
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

  return newGrid;
}

// Smart line clearing: removes entire blocks touching cleared rows, then drops blocks down as intact rectangles
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

  // Calculate bounding boxes for each piece and sort by bottom row (process bottom-up)
  const piecesWithBounds = Array.from(pieceGroups.entries())
    .map(([pieceId, cells]) => {
      const rows = cells.map((c) => c.row);
      const cols = cells.map((c) => c.col);
      const minRow = Math.min(...rows);
      const maxRow = Math.max(...rows);
      const minCol = Math.min(...cols);
      const maxCol = Math.max(...cols);
      return {
        pieceId,
        cells,
        minRow,
        maxRow,
        minCol,
        maxCol,
        height: maxRow - minRow + 1,
        width: maxCol - minCol + 1,
      };
    })
    .sort((a, b) => b.maxRow - a.maxRow); // Sort by bottom row, bottom-first

  // Create new grid and place pieces with gravity
  const droppedGrid: GameGrid = Array(GAME_CONFIG.GRID_ROWS)
    .fill(null)
    .map(() => Array(GAME_CONFIG.GRID_COLS).fill(null));

  // For each piece, calculate how far it can fall
  for (const piece of piecesWithBounds) {
    // Find the lowest point this piece can fall to
    let fallDistance = 0;
    let canFall = true;

    while (canFall) {
      const newBottomRow = piece.maxRow + fallDistance + 1;
      if (newBottomRow >= GAME_CONFIG.GRID_ROWS) {
        canFall = false;
        break;
      }

      // Check if all cells in the piece's width can move down
      let collision = false;
      for (let col = piece.minCol; col <= piece.maxCol; col++) {
        const checkRow = newBottomRow;
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

    // Use testimonial's actual dimensions (no tetromino shapes!)
    const shape: TetrominoShape = {
      type: "I", // Dummy value, not used
      matrix: [], // Not used
      color: testim.color,
    };

    // Center the piece horizontally (always start unrotated)
    const piece: GamePiece = {
      shape,
      x: Math.floor((GAME_CONFIG.GRID_COLS - testim.gridWidth) / 2),
      y: -testim.gridHeight, // Start above grid
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
   * Try to rotate piece by swapping width/height (90° rotation)
   * Uses wall-kick to shift piece if rotation would cause collision
   */
  const tryRotateRectangle = useCallback(
    (piece: GamePiece): GamePiece | null => {
      const newRotation = piece.rotation === 0 ? 1 : 0; // Toggle between 0 and 1
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

    const rotated = tryRotateRectangle(currentPiece);
    if (rotated) {
      setCurrentPiece(rotated);
    }
  }, [currentPiece, mode, isAnimatingClear, tryRotateRectangle]);

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
