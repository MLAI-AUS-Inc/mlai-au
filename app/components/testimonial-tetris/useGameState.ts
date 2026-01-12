/**
 * Game State Hook
 * Manages Tetris game logic and state
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import type {
  GameState,
  GameMode,
  GamePiece,
  GameStats,
  TetrominoShape,
  Testimonial,
  GameGrid,
  LockedCell,
} from './types';
import {
  createEmptyGrid,
  getCompletedLines,
  clearLines,
  isGameOver,
} from './tetrisLogic';
import { GAME_CONFIG } from './testimonialData';
import { getRandomTestimonial } from './utils';

// Simple collision check using testimonial dimensions
function isPositionValid(grid: GameGrid, piece: GamePiece, offsetX: number, offsetY: number): boolean {
  const newX = piece.x + offsetX;
  const newY = piece.y + offsetY;
  const width = piece.testimonial.gridWidth;
  const height = piece.testimonial.gridHeight;

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

// Lock piece to grid using testimonial dimensions
function lockPiece(grid: GameGrid, piece: GamePiece): GameGrid {
  const newGrid = grid.map(row => [...row]);
  const width = piece.testimonial.gridWidth;
  const height = piece.testimonial.gridHeight;

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const gridRow = piece.y + row;
      const gridCol = piece.x + col;
      
      if (gridRow >= 0 && gridRow < GAME_CONFIG.GRID_ROWS) {
        newGrid[gridRow][gridCol] = {
          color: piece.testimonial.color,
          testimonialId: piece.testimonial.id,
          pieceId: piece.id, // Store unique piece ID
        };
      }
    }
  }

  return newGrid;
}

// Smart line clearing: removes entire blocks touching cleared rows, then drops blocks down
function smartClearLines(grid: GameGrid, linesToClear: number[]): GameGrid {
  // Find all pieceIds that touch any of the cleared rows
  const pieceIdsToRemove = new Set<string>();
  
  linesToClear.forEach(rowIndex => {
    grid[rowIndex].forEach(cell => {
      if (cell) {
        pieceIdsToRemove.add(cell.pieceId);
      }
    });
  });

  // Remove all cells belonging to those pieces
  const gridAfterRemoval: GameGrid = grid.map(row =>
    row.map(cell => (cell && pieceIdsToRemove.has(cell.pieceId) ? null : cell))
  );

  // Drop blocks down
  const droppedGrid: GameGrid = Array(GAME_CONFIG.GRID_ROWS)
    .fill(null)
    .map(() => Array(GAME_CONFIG.GRID_COLS).fill(null));

  // Process from bottom to top
  for (let col = 0; col < GAME_CONFIG.GRID_COLS; col++) {
    let writeRow = GAME_CONFIG.GRID_ROWS - 1;
    
    for (let readRow = GAME_CONFIG.GRID_ROWS - 1; readRow >= 0; readRow--) {
      if (gridAfterRemoval[readRow][col]) {
        droppedGrid[writeRow][col] = gridAfterRemoval[readRow][col];
        writeRow--;
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
  resetGame: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  moveDown: () => void;
}

export function useGameState(): UseGameStateReturn {
  const [mode, setMode] = useState<GameMode>('idle');
  const [grid, setGrid] = useState(createEmptyGrid());
  const [currentPiece, setCurrentPiece] = useState<GamePiece | null>(null);
  const [nextPiece, setNextPiece] = useState<GamePiece | null>(null);
  const [stats, setStats] = useState<GameStats>(initialStats);
  const [isAnimatingClear, setIsAnimatingClear] = useState(false);

  const fallTimerRef = useRef<number | undefined>(undefined);
  const lockTimerRef = useRef<number | undefined>(undefined);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
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
      type: 'I', // Dummy value, not used
      matrix: [], // Not used
      color: testim.color,
    };

    // Center the piece horizontally
    const piece: GamePiece = {
      shape,
      x: Math.floor((GAME_CONFIG.GRID_COLS - testim.gridWidth) / 2),
      y: -testim.gridHeight, // Start above grid
      rotation: 0, // Not used
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
          setMode('gameOver');
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
        setMode('gameOver');
      } else {
        spawnNextPiece();
      }
    }
  }, [currentPiece, grid, spawnNextPiece]);

  // ============================================
  // MOVEMENT
  // ============================================

  const moveLeft = useCallback(() => {
    if (!currentPiece || mode !== 'playing' || isAnimatingClear) return;

    if (isPositionValid(grid, currentPiece, -1, 0)) {
      setCurrentPiece({ ...currentPiece, x: currentPiece.x - 1 });
    }
  }, [currentPiece, grid, mode, isAnimatingClear]);

  const moveRight = useCallback(() => {
    if (!currentPiece || mode !== 'playing' || isAnimatingClear) return;

    if (isPositionValid(grid, currentPiece, 1, 0)) {
      setCurrentPiece({ ...currentPiece, x: currentPiece.x + 1 });
    }
  }, [currentPiece, grid, mode, isAnimatingClear]);

  const moveDown = useCallback((): boolean => {
    if (!currentPiece || mode !== 'playing' || isAnimatingClear) return false;

    if (isPositionValid(grid, currentPiece, 0, 1)) {
      setCurrentPiece({ ...currentPiece, y: currentPiece.y + 1 });
      return true;
    } else {
      // Can't move down, lock piece
      lockCurrentPiece();
      return false;
    }
  }, [currentPiece, grid, mode, isAnimatingClear, lockCurrentPiece]);

  // Rotation and hard drop removed - not needed for testimonial blocks

  // ============================================
  // GAME CONTROLS
  // ============================================

  const startGame = useCallback(() => {
    recentTestimonialsRef.current = []; // Clear repetition tracking
    setMode('playing');
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
    if (mode === 'playing') {
      setMode('paused');
    }
  }, [mode]);

  const resetGame = useCallback(() => {
    recentTestimonialsRef.current = []; // Clear repetition tracking
    setMode('idle');
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
    if (mode !== 'playing' || !currentPiece || isAnimatingClear) {
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
    resetGame,
    moveLeft,
    moveRight,
    moveDown,
  };
}

