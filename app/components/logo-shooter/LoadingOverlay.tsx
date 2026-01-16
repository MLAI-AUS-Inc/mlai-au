/**
 * Loading overlay shown while logo images are preloading
 */

interface LoadingOverlayProps {
  loaded: number;
  total: number;
}

export function LoadingOverlay({ loaded, total }: LoadingOverlayProps) {
  const progress = total > 0 ? Math.round((loaded / total) * 100) : 0;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-30">
      {/* Progress bar */}
      <div className="w-48 h-2 bg-white/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--brutalist-orange)] transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-4 text-white/70 text-sm font-mono">
        Loading sponsors... {loaded}/{total}
      </p>
    </div>
  );
}
