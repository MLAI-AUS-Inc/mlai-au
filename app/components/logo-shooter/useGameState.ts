/**
 * Game State Hook
 * Manages the core game logic: logo spawning, movement, hit detection
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import type { GameState, GameStats, Logo, GameMode } from './types';
import { GAME_CONFIG } from './logoData';
import { createLogo, mapRange } from './utils';

interface UseGameStateReturn {
  gameState: GameState;
  startGame: () => void;
  pauseGame: () => void;
  resetGame: () => void;
  handleShoot: (x: number, y: number, canvasWidth: number, canvasHeight: number) => boolean;
  updateLogoPositions: (deltaTime: number) => void;
}

const initialStats: GameStats = {
  hits: 0,
  totalShots: 0,
  startTime: 0,
  lastHitLogoName: null,
  lastHitTime: null,
};

export function useGameState(): UseGameStateReturn {
  // ============================================
  // AUTO-START MODE: Starts as 'playing' for ambient experience
  // ============================================
  // To enable manual start with "Click to Play" button:
  // Change 'playing' to 'idle' and uncomment GameControls
  // ============================================
  const [mode, setMode] = useState<GameMode>('playing');
  const [logos, setLogos] = useState<Logo[]>([]);
  const [stats, setStats] = useState<GameStats>(initialStats);
  
  const animationFrameRef = useRef<number | undefined>(undefined);
  const hasInitialized = useRef(false);

  // ============================================
  // AUTO-START: Initialize logos on mount when starting in 'playing' mode
  // ============================================
  useEffect(() => {
    if (mode === 'playing' && logos.length === 0 && !hasInitialized.current) {
      hasInitialized.current = true;
      const initialLogos: Logo[] = [];
      for (let i = 0; i < GAME_CONFIG.MIN_LOGOS; i++) {
        initialLogos.push(createLogo(initialLogos));
      }
      setLogos(initialLogos);
      setStats({
        ...initialStats,
        startTime: Date.now(),
      });
    }
  }, [mode, logos.length]);

  /**
   * Start the game
   */
  const startGame = useCallback(() => {
    setMode('playing');
    setStats({
      ...initialStats,
      startTime: Date.now(),
    });
    
    // Spawn initial logos
    const initialLogos: Logo[] = [];
    for (let i = 0; i < GAME_CONFIG.MIN_LOGOS; i++) {
      initialLogos.push(createLogo(initialLogos));
    }
    setLogos(initialLogos);
  }, []);

  /**
   * Pause the game
   */
  const pauseGame = useCallback(() => {
    setMode('paused');
  }, []);

  /**
   * Reset the game
   */
  const resetGame = useCallback(() => {
    setMode('idle');
    setLogos([]);
    setStats(initialStats);
  }, []);

  /**
   * Update logo positions (called every animation frame)
   */
  const updateLogoPositions = useCallback((deltaTime: number) => {
    setLogos((currentLogos) => {
      const updatedLogos = currentLogos
        .map((logo) => {
          // Move logo toward screen
          const newZ = logo.z + logo.velocityZ * deltaTime;
          
          // Apply drift with boundary clamping
          const newX = Math.max(5, Math.min(95, logo.x + logo.driftX * deltaTime));
          const newY = Math.max(5, Math.min(95, logo.y + logo.driftY * deltaTime));
          
          // Calculate scale based on depth
          const newScale = mapRange(
            newZ,
            GAME_CONFIG.Z_FAR,
            GAME_CONFIG.Z_NEAR,
            GAME_CONFIG.SCALE_MIN,
            GAME_CONFIG.SCALE_MAX
          );
          
          return {
            ...logo,
            x: newX,
            y: newY,
            z: newZ,
            scale: newScale,
          };
        })
        .filter((logo) => logo.z <= GAME_CONFIG.Z_NEAR); // Remove logos that flew past
      
      // Maintain minimum number of logos
      const logosToAdd = GAME_CONFIG.MIN_LOGOS - updatedLogos.length;
      if (logosToAdd > 0) {
        for (let i = 0; i < logosToAdd; i++) {
          updatedLogos.push(createLogo(updatedLogos));
        }
      }
      
      // Don't exceed maximum
      return updatedLogos.slice(0, GAME_CONFIG.MAX_LOGOS);
    });
  }, []);

  /**
   * Handle shoot action (click/tap)
   * Returns true if a logo was hit
   */
  const handleShoot = useCallback(
    (
      clickX: number,
      clickY: number,
      canvasWidth: number,
      canvasHeight: number
    ): boolean => {
      let hitDetected = false;
      
      setLogos((currentLogos) => {
        return currentLogos.map((logo) => {
          // Skip if already hit
          if (logo.isHit) return logo;
          
          // Convert logo position (percentage) to screen coordinates
          const logoScreenX = (logo.x / 100) * canvasWidth;
          const logoScreenY = (logo.y / 100) * canvasHeight;
          
          // Calculate hit radius based on current scale
          const logoSize = GAME_CONFIG.BASE_LOGO_SIZE * logo.scale;
          const hitRadius = logoSize / 2;
          
          // Check if click is within logo bounds
          const dx = clickX - logoScreenX;
          const dy = clickY - logoScreenY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < hitRadius) {
            // Hit!
            hitDetected = true;
            
            setStats((currentStats) => ({
              ...currentStats,
              hits: currentStats.hits + 1,
              totalShots: currentStats.totalShots + 1,
              lastHitLogoName: logo.name,
              lastHitTime: Date.now(),
            }));
            
            return {
              ...logo,
              isHit: true,
              hitTime: Date.now(),
            };
          }
          
          return logo;
        });
      });
      
      // If no hit detected, still count as a shot
      if (!hitDetected) {
        setStats((currentStats) => ({
          ...currentStats,
          totalShots: currentStats.totalShots + 1,
        }));
      }
      
      return hitDetected;
    },
    []
  );

  // Cleanup
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return {
    gameState: { mode, logos, stats },
    startGame,
    pauseGame,
    resetGame,
    handleShoot,
    updateLogoPositions,
  };
}

