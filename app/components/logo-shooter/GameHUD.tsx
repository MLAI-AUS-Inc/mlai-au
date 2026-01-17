/**
 * Game HUD Component
 * Displays score and high score
 */

interface GameHUDProps {
  score: number;
  highScore: number;
}

export function GameHUD({ score, highScore }: GameHUDProps) {
  return (
    <div className="absolute bottom-28 right-6 text-[var(--brutalist-orange)] font-mono text-sm z-20">
      <div className="flex flex-col gap-1 items-end">
        <div className="flex items-center gap-2">
          <span className="text-[var(--brutalist-orange)]/60 text-xs uppercase tracking-wider">Score</span>
          <span className="text-xl font-bold tabular-nums">{score}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[var(--brutalist-orange)]/60 text-xs uppercase tracking-wider">High</span>
          <span className="text-lg tabular-nums">{highScore}</span>
        </div>
      </div>
    </div>
  );
}

