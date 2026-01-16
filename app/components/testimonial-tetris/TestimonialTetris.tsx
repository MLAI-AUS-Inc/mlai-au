/**
 * Testimonial Tetris - Main Component
 * Interactive Tetris-style testimonial game
 *
 * Features:
 * - Falling testimonial blocks (Tetris gameplay)
 * - Keyboard controls (desktop) + touch controls (mobile)
 * - Click blocks to view full testimonials
 * - Auto-pause when off-screen
 * - Line clearing with animation
 */

import { useEffect, useRef, useState } from "react";
import TetrisTestimonials from "../TetrisTestimonials";
import { NextBlockPanel } from "./NextBlockPanel";
import { TESTIMONIALS, TETRIS_COLORS } from "./testimonialData";
import { TestimonialGrid } from "./TestimonialGrid";
import { TestimonialModal } from "./TestimonialModal";
import { TetrisControls } from "./TetrisControls";
import type { Testimonial } from "./types";
import { useGameState } from "./useGameState";
import { useIntersectionPause } from "./useIntersectionPause";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export function TestimonialTetris() {
  const prefersReducedMotion = usePrefersReducedMotion();

  // If user prefers reduced motion, render static fallback
  if (prefersReducedMotion) {
    return <TetrisTestimonials />;
  }

  const {
    gameState,
    startGame,
    pauseGame,
    resumeGame,
    resetGame,
    moveLeft,
    moveRight,
    moveDown,
    rotate,
  } = useGameState();

  const [containerRef, isVisible] = useIntersectionPause({ threshold: 0.2 });
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<Testimonial | null>(null);
  const hasBeenVisible = useRef(false);

  // Track visibility for auto-pause
  useEffect(() => {
    if (isVisible) {
      hasBeenVisible.current = true;
    }
  }, [isVisible]);

  // Auto-start when visible
  useEffect(() => {
    if (isVisible && gameState.mode === "idle") {
      startGame();
    }
  }, [isVisible, gameState.mode, startGame]);

  // Auto-pause when not visible
  useEffect(() => {
    if (!isVisible && hasBeenVisible.current && gameState.mode === "playing") {
      pauseGame();
    }
  }, [isVisible, gameState.mode, pauseGame]);

  // Resume when visible again (don't reset game state)
  useEffect(() => {
    if (isVisible && gameState.mode === "paused") {
      resumeGame();
    }
  }, [isVisible, gameState.mode, resumeGame]);

  // Keyboard controls (desktop: arrow keys + rotate)
  useEffect(() => {
    if (gameState.mode !== "playing") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          moveLeft();
          break;
        case "ArrowRight":
          e.preventDefault();
          moveRight();
          break;
        case "ArrowDown":
          e.preventDefault();
          moveDown(); // Soft drop - move down one step
          break;
        case "ArrowUp":
        case " ": // Space bar
          e.preventDefault();
          rotate();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState.mode, moveLeft, moveRight, moveDown, rotate]);

  // Handle cell click to show testimonial
  const handleCellClick = (testimonialId: number) => {
    const testimonial = TESTIMONIALS.find((t) => t.id === testimonialId);
    if (testimonial) {
      setSelectedTestimonial(testimonial);
    }
  };

  const isPlaying = gameState.mode === "playing";

  return (
    <div
      ref={containerRef}
      className="relative bg-[var(--brutalist-beige)] p-2 lg:p-3"
    >
      <div
        className="w-full rounded-[2.5rem] p-3 lg:p-4 relative overflow-hidden"
        style={{
          backgroundColor: "var(--brutalist-beige)",
          border: "1px solid #1a1a1a",
        }}
      >
        {/* Desktop Layout - Side by Side */}
        <div className="hidden lg:flex gap-4 items-stretch" style={{ height: "min(80vh, 750px)" }}>
          {/* Game Area - Left Side */}
          <div className="relative h-full min-w-0 flex-1 overflow-visible">
            <TestimonialGrid
              gameState={gameState}
              onTestimonialClick={handleCellClick}
            />

            {/* Start/Game Over Overlay */}
            {gameState.mode === "idle" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-2xl">
                <button
                  onClick={startGame}
                  className="bg-white text-[#ff3d00] font-bold text-xl px-6 py-3 rounded-2xl shadow-2xl hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff3d00]"
                >
                  Start Game
                </button>
              </div>
            )}

            {gameState.mode === "gameOver" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-2xl">
                <div
                  className="rounded-2xl p-10 text-center shadow-2xl max-w-sm mx-4 transform transition-all"
                  style={{
                    backgroundColor: TETRIS_COLORS.blue,
                  }}
                >
                  <h3 className="text-5xl font-bold text-white mb-6">
                    Game Over!
                  </h3>

                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
                    <p className="text-white/90 text-sm font-semibold mb-2">
                      Lines Cleared
                    </p>
                    <p className="text-white text-7xl font-bold">
                      {gameState.stats.linesCleared}
                    </p>
                  </div>

                  <button
                    onClick={resetGame}
                    className="w-full bg-white text-[#3537dc] font-bold text-xl px-8 py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                  >
                    Play Again
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Side Panel - Next Block Preview (Desktop) */}
          <div className="w-72 flex-shrink-0 h-full">
            <NextBlockPanel nextPiece={gameState.nextPiece} />
          </div>
        </div>

        {/* Mobile Layout - Stacked */}
        <div className="lg:hidden flex flex-col">
          {/* Game Area - Top */}
          <div className="relative overflow-visible" style={{ height: "min(60vh, 500px)" }}>
            <TestimonialGrid
              gameState={gameState}
              onTestimonialClick={handleCellClick}
              isMobile={true}
            />

            {/* Start/Game Over Overlay (Mobile) */}
            {gameState.mode === "idle" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-2xl">
                <button
                  onClick={startGame}
                  className="bg-white text-[#ff3d00] font-bold text-lg px-5 py-2 rounded-xl shadow-2xl hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff3d00]"
                >
                  Start Game
                </button>
              </div>
            )}

            {gameState.mode === "gameOver" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-2xl">
                <div
                  className="rounded-xl p-6 text-center shadow-2xl max-w-xs mx-4 transform transition-all"
                  style={{
                    backgroundColor: TETRIS_COLORS.blue,
                  }}
                >
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Game Over!
                  </h3>

                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-4">
                    <p className="text-white/90 text-xs font-semibold mb-1">
                      Lines Cleared
                    </p>
                    <p className="text-white text-4xl font-bold">
                      {gameState.stats.linesCleared}
                    </p>
                  </div>

                  <button
                    onClick={resetGame}
                    className="w-full bg-white text-[#3537dc] font-bold text-base px-6 py-3 rounded-lg hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                  >
                    Play Again
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Controls - Right below game area */}
          <div className="mt-3">
            <TetrisControls
              onMoveLeft={moveLeft}
              onMoveRight={moveRight}
              onSoftDrop={moveDown}
              onRotate={rotate}
              disabled={!isPlaying}
            />
          </div>

          {/* Next Block Panel - Below controls on mobile */}
          <div className="mt-4">
            <NextBlockPanel nextPiece={gameState.nextPiece} isMobile={true} />
          </div>
        </div>

        {/* Desktop Controls Hint */}
        <div className="hidden lg:block mt-4">
          <p className="text-xs text-gray-500 text-center">
            Use arrow keys to move (⬅️ ➡️ ⬇️) and ↑ or Space to rotate
          </p>
        </div>
      </div>

      {/* Testimonial Modal */}
      <TestimonialModal
        testimonial={selectedTestimonial}
        onClose={() => setSelectedTestimonial(null)}
      />
    </div>
  );
}
