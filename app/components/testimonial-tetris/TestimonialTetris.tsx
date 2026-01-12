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

import { useEffect, useState, useRef } from 'react';
import { useGameState } from './useGameState';
import { useIntersectionPause } from './useIntersectionPause';
import { TestimonialGrid } from './TestimonialGrid';
import { TetrisControls } from './TetrisControls';
import { TestimonialModal } from './TestimonialModal';
import { TESTIMONIALS, TETRIS_COLORS } from './testimonialData';
import type { Testimonial } from './types';

export function TestimonialTetris() {
  const {
    gameState,
    startGame,
    pauseGame,
    resetGame,
    moveLeft,
    moveRight,
    moveDown,
  } = useGameState();

  const [containerRef, isVisible] = useIntersectionPause({ threshold: 0.2 });
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const hasBeenVisible = useRef(false);

  // Track visibility for auto-pause
  useEffect(() => {
    if (isVisible) {
      hasBeenVisible.current = true;
    }
  }, [isVisible]);

  // Auto-start when visible
  useEffect(() => {
    if (isVisible && gameState.mode === 'idle') {
      startGame();
    }
  }, [isVisible, gameState.mode, startGame]);

  // Auto-pause when not visible
  useEffect(() => {
    if (!isVisible && hasBeenVisible.current && gameState.mode === 'playing') {
      pauseGame();
    }
  }, [isVisible, gameState.mode, pauseGame]);

  // Resume when visible again
  useEffect(() => {
    if (isVisible && gameState.mode === 'paused') {
      startGame();
    }
  }, [isVisible, gameState.mode, startGame]);

  // Keyboard controls (simplified - no rotation)
  useEffect(() => {
    if (gameState.mode !== 'playing') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          moveLeft();
          break;
        case 'ArrowRight':
          e.preventDefault();
          moveRight();
          break;
        case 'ArrowDown':
          e.preventDefault();
          moveDown(); // Soft drop - move down one step
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState.mode, moveLeft, moveRight, moveDown]);

  // Handle cell click to show testimonial
  const handleCellClick = (testimonialId: number) => {
    const testimonial = TESTIMONIALS.find((t) => t.id === testimonialId);
    if (testimonial) {
      setSelectedTestimonial(testimonial);
    }
  };

  const isPlaying = gameState.mode === 'playing';

  return (
    <div
      ref={containerRef}
      className="relative bg-[var(--brutalist-beige)] p-2 lg:p-3"
    >
      <div
        className="w-full rounded-[2.5rem] p-3 lg:p-4 relative overflow-hidden"
        style={{
          backgroundColor: 'var(--brutalist-beige)',
          border: '1px solid #1a1a1a',
        }}
      >
        {/* Header - Matching Original */}
        <div className="mb-3">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Everyone is a{' '}
            <span style={{ color: TETRIS_COLORS.orange }}>Volunteer</span>
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Play Tetris with testimonials! Use arrow keys or buttons below.
          </p>
        </div>

        {/* Game Area - Fully Responsive Height */}
        <div className="relative w-full" style={{ height: 'min(75vh, 700px)' }}>
          <TestimonialGrid
            gameState={gameState}
            onTestimonialClick={handleCellClick}
          />

          {/* Start/Game Over Overlay */}
          {gameState.mode === 'idle' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-2xl">
              <button
                onClick={startGame}
                className="bg-white text-[#ff3d00] font-bold text-xl px-6 py-3 rounded-2xl shadow-2xl hover:scale-105 transition-transform"
              >
                🎮 Start Game
              </button>
            </div>
          )}

          {gameState.mode === 'gameOver' && (
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
                  <p className="text-white/90 text-sm font-semibold mb-2">Lines Cleared</p>
                  <p className="text-white text-7xl font-bold">{gameState.stats.linesCleared}</p>
                </div>
                
                <button
                  onClick={resetGame}
                  className="w-full bg-white text-[#3537dc] font-bold text-xl px-8 py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg"
                >
                  🎮 Play Again
                </button>
              </div>
            </div>
          )}
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

