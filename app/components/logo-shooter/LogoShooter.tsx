/**
 * Logo Shooter - Main Component
 * Ambient interactive experience for the logo cloud section
 *
 * CURRENT MODE: Ambient Auto-Start Experience
 * ============================================
 * - Logos fly automatically when section enters viewport
 * - No start button, no scoreboard, no reset button
 * - Users discover they can click logos (delightful surprise!)
 * - Inspired by end credit sequences in films (Super Smash Bros N64 style!)
 *
 * SPACE BACKGROUND FEATURES:
 * ============================================
 * - Multi-layer parallax nebula background
 * - Procedural starfield that flies toward the viewer
 * - Mouse-controlled camera movement effect
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
import { useMouseParallax } from './useMouseParallax';
import { LogoShooterCanvas } from './LogoShooterCanvas';
import { SpaceBackground } from './SpaceBackground';
import { StarfieldCanvas } from './StarfieldCanvas';
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

  const [intersectionRef, isVisible] = useIntersectionPause({ threshold: 0.2 });
  const hasBeenVisible = useRef(false);

  // Mouse parallax for space background effect
  const { containerRef: parallaxContainerRef, offset: parallaxOffset, handlers: parallaxHandlers } = useMouseParallax({
    smoothing: 0.08,
    enabled: isVisible,
  });

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

  // Combine refs for intersection observer and parallax container
  const setRefs = (el: HTMLDivElement | null) => {
    // Set intersection observer ref (it's a RefObject, so assign to .current)
    (intersectionRef as React.RefObject<HTMLDivElement | null>).current = el;
    // Set parallax container ref
    (parallaxContainerRef as React.RefObject<HTMLDivElement | null>).current = el;
  };

  return (
    <div
      ref={setRefs}
      className="relative w-full h-full overflow-hidden bg-black"
      id="logoShooterGame"
      {...parallaxHandlers}
    >
      {/* Layer 0: Space nebula background with parallax */}
      <SpaceBackground parallaxOffset={parallaxOffset} isPlaying={isPlaying} />

      {/* Layer 1: Procedural starfield flying toward viewer */}
      <StarfieldCanvas
        isPlaying={isPlaying}
        parallaxOffset={parallaxOffset}
        starCount={250}
        baseSpeed={0.002}
      />

      {/* Layer 2: Logo shooter canvas */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        <LogoShooterCanvas
          logos={gameState.logos}
          isPlaying={isPlaying}
          onUpdate={updateLogoPositions}
          onClick={handleShoot}
          parallaxOffset={parallaxOffset}
        />
      </div>

      {/* Layer 3: HUD image overlay */}
      <div
        className="absolute pointer-events-none"
        style={{
          zIndex: 3,
          inset: '0', // Fill the container
          backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/HUD.png?alt=media&token=a93ef104-5723-4ebc-8190-e5b7da6a91ec)',
          backgroundSize: 'cover', // Always fill the container, cropping height if needed
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Layer 4: Game stats HUD */}
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

