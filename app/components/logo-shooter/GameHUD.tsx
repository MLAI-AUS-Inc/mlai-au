/**
 * Game HUD Component
 * Displays game statistics (hits, accuracy, time, last hit)
 */

import type { GameStats } from './types';
import { calculateAccuracy } from './utils';

interface GameHUDProps {
  stats: GameStats;
  isPlaying: boolean;
}

export function GameHUD({ stats, isPlaying }: GameHUDProps) {
  const accuracy = calculateAccuracy(stats.hits, stats.totalShots);

  return (
    <>
      {/* ============================================
          SCOREBOARD - CURRENTLY DISABLED
          ============================================
          Decision: Make the experience more ambient and natural
          without explicit game UI (inspired by end credit sequences)
          
          To re-enable scoreboard:
          1. Uncomment the <div> below
          2. The HUD will show in top-right corner when game is playing
          ============================================ */}
      
      {/* Main HUD - Top Right (Simplified) */}
      {/* <div className="absolute top-4 right-4 bg-black/50 text-white rounded-lg px-3 py-2 font-mono text-sm backdrop-blur-md z-10">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[#00ff88]">🎯</span>
            <span className="text-xs">
              Hits: <strong className="text-base">{stats.hits}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#ff3d00]">📊</span>
            <span className="text-xs">
              Accuracy: <strong className="text-base">{accuracy}%</strong>
            </span>
          </div>
        </div>
      </div> */}
    </>
  );
}

