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
    <div className="absolute inset-0 flex flex-col items-center justify-center z-30 animate-fade-in">
      {/* Progress bar */}
      <div className="w-48 h-2 bg-white/30 rounded-full overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-4 text-white text-sm font-mono">
        Loading sponsors... {loaded}/{total}
      </p>
    </div>
  );
}
