/**
 * Logo Shooter - Main Component
 * Ambient interactive experience for the logo cloud section
 * 
 * CURRENT MODE: Ambient Auto-Start Experience
 * ============================================
 * - Logos fly automatically when section enters viewport
 * - No start button, no scoreboard, no reset button
 * - Users discover they can click logos (delightful surprise!)
 * - Inspired by end credit sequences in films
 * 
 * TO SWITCH TO EXPLICIT GAME MODE:
 * ============================================
 * See inline comments in:
 * - useGameState.ts (change initial mode to 'idle')
 * - LogoShooter.tsx (comment out auto-start useEffect)
 * - GameControls.tsx (uncomment controls)
 * - GameHUD.tsx (uncomment scoreboard)
 */

import { useEffect, useRef } from 'react';
import { useGameState } from './useGameState';
import { useIntersectionPause } from './useIntersectionPause';
import { LogoShooterCanvas } from './LogoShooterCanvas';
import { GameHUD } from './GameHUD';
import { GameControls } from './GameControls';

export function LogoShooter() {
  const {
    gameState,
    startGame,
    pauseGame,
    resetGame,
    handleShoot,
    updateLogoPositions,
  } = useGameState();

  const [containerRef, isVisible] = useIntersectionPause({ threshold: 0.2 });
  const hasBeenVisible = useRef(false);

  // ============================================
  // AUTO-START: Game begins automatically when section enters viewport
  // ============================================
  // Decision: Make logos fly as soon as user sees this section (like end credit sequences)
  // 
  // To disable auto-start and use manual "Click to Play" button:
  // 1. Comment out the first useEffect below
  // 2. Uncomment the controls in GameControls.tsx
  // 3. Change initial mode in useGameState.ts from 'playing' to 'idle'
  // ============================================
  
  // Track visibility
  useEffect(() => {
    if (isVisible) {
      hasBeenVisible.current = true;
    }
  }, [isVisible]);

  // Handle visibility changes: pause when off-screen, resume when back on-screen
  useEffect(() => {
    if (isVisible) {
      // Resume if paused (user scrolled back to this section)
      if (gameState.mode === 'paused') {
        startGame(); // This will switch from 'paused' to 'playing'
      }
      // Start if idle (initial load with manual controls)
      else if (gameState.mode === 'idle') {
        startGame();
      }
    } else if (!isVisible && hasBeenVisible.current && gameState.mode === 'playing') {
      // Pause when scrolled away
      pauseGame();
    }
  }, [isVisible, gameState.mode, startGame, pauseGame]);

  const isPlaying = gameState.mode === 'playing' && isVisible;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] md:h-[500px] overflow-hidden"
      id="logoShooterGame"
    >
      {/* Canvas */}
      <LogoShooterCanvas
        logos={gameState.logos}
        isPlaying={isPlaying}
        onUpdate={updateLogoPositions}
        onClick={handleShoot}
      />

      {/* HUD */}
      {gameState.mode === 'playing' && (
        <GameHUD stats={gameState.stats} isPlaying={isPlaying} />
      )}

      {/* Controls */}
      <GameControls
        mode={gameState.mode}
        onStart={startGame}
        onReset={resetGame}
      />
    </div>
  );
}

