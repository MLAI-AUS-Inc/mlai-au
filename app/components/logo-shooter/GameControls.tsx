/**
 * Game Controls Component
 * Start, pause, reset buttons and click-to-play overlay
 */

import type { GameMode } from './types';

interface GameControlsProps {
  mode: GameMode;
  onStart: () => void;
  onReset: () => void;
}

export function GameControls({ mode, onStart, onReset }: GameControlsProps) {
  return (
    <>
      {/* ============================================
          GAME CONTROLS - CURRENTLY DISABLED
          ============================================
          Decision: Auto-start experience for more natural, ambient interaction
          Users can just click logos without explicit "game" UI (inspired by end credit sequences)
          
          To re-enable game controls:
          1. Uncomment the sections below
          2. Update useGameState.ts: Change initial mode from 'playing' to 'idle'
          3. Remove or comment out auto-start useEffect in LogoShooter.tsx
          ============================================ */}
      
      {/* Click to Play Overlay - Glassmorphism */}
      {/* {mode === 'idle' && (
        <div
          onClick={onStart}
          className="absolute inset-0 flex items-center justify-center backdrop-blur-md bg-black/40 cursor-pointer hover:bg-black/50 transition-all z-20"
        >
          <div className="text-center">
            <div className="bg-white/95 text-[#ff3d00] font-bold text-2xl md:text-3xl px-8 py-4 rounded-2xl shadow-2xl border-2 border-white/50 hover:scale-105 transition-transform backdrop-blur-sm">
              🎮 Click to Play
            </div>
            <p className="text-white text-sm md:text-base mt-4 font-semibold drop-shadow-lg">
              Shoot the sponsor logos as they fly toward you!
            </p>
          </div>
        </div>
      )} */}

      {/* Reset Button - Bottom Right (Subtle) */}
      {/* {mode === 'playing' && (
        <div className="absolute bottom-4 right-4 z-10">
          <button
            onClick={onReset}
            className="bg-white/90 text-[#ff3d00] font-semibold text-sm px-3 py-2 rounded-lg shadow-md backdrop-blur-sm hover:bg-white hover:scale-105 transition-all"
          >
            Reset Game
          </button>
        </div>
      )} */}
    </>
  );
}

