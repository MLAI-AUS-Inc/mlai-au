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
import { useScore } from './useScore';
import { useIntersectionPause } from './useIntersectionPause';
import { useMouseParallax } from './useMouseParallax';
import { LogoShooterCanvas } from './LogoShooterCanvas';
import { SpaceBackground } from './SpaceBackground';
import { StarfieldCanvas } from './StarfieldCanvas';
import { HudOverlay } from './HudOverlay';
import { GameHUD } from './GameHUD';
import { GameControls } from './GameControls';

interface LogoShooterProps {
  /** Pre-loaded image cache from parent (optional - will load internally if not provided) */
  imageCache?: Map<string, HTMLImageElement>;
}

export function LogoShooter({ imageCache }: LogoShooterProps) {
  const { score, highScore, incrementScore } = useScore();

  const {
    gameState,
    startGame,
    pauseGame,
    resetGame,
    handleShoot,
    updateLogoPositions,
  } = useGameState({ onHit: incrementScore });

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
        starCount={350}
        baseSpeed={0.003}
      />

      {/* Layer 2: Logo shooter canvas */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        <LogoShooterCanvas
          logos={gameState.logos}
          isPlaying={isPlaying}
          onUpdate={updateLogoPositions}
          onClick={handleShoot}
          parallaxOffset={parallaxOffset}
          externalImageCache={imageCache}
        />
      </div>

      {/* Layer 3: HUD overlay (SVG/CSS-based for responsiveness) */}
      <HudOverlay />

      {/* Layer 3.5: Sponsor Name Display (inside bottom panel) */}
      {gameState.stats.lastHitLogoName && gameState.stats.lastHitTime && (
        <div
          className="absolute pointer-events-none flex items-center justify-center"
          style={{
            zIndex: 4,
            bottom: 42,
            left: '25%',
            width: '50%',
            height: 70,
          }}
        >
          <div
            className="transition-opacity duration-500 text-center"
            style={{
              opacity:
                Date.now() - gameState.stats.lastHitTime < 2000
                  ? 1
                  : Math.max(0, 1 - (Date.now() - gameState.stats.lastHitTime - 2000) / 1000),
            }}
          >
            <div className="font-mono text-white text-xl sm:text-2xl md:text-3xl font-bold drop-shadow-lg uppercase tracking-wide">
              {gameState.stats.lastHitLogoName}
            </div>
          </div>
        </div>
      )}

      {/* Layer 5: Score HUD */}
      {gameState.mode === 'playing' && (
        <GameHUD score={score} highScore={highScore} />
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

