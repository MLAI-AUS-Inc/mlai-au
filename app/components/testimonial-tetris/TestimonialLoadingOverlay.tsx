/**
 * Blue loading overlay shown while Tetris game is loading
 * Styled with white UI elements on blue background
 * (mirrors the orange logo shooter loading overlay)
 */

interface TestimonialLoadingOverlayProps {
  message?: string;
}

export function TestimonialLoadingOverlay({
  message = "Loading game...",
}: TestimonialLoadingOverlayProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-30 animate-fade-in">
      {/* Animated loader */}
      <div className="flex gap-2 mb-6">
        <div
          className="w-4 h-4 bg-white rounded-sm animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <div
          className="w-4 h-4 bg-white rounded-sm animate-bounce"
          style={{ animationDelay: "150ms" }}
        />
        <div
          className="w-4 h-4 bg-white rounded-sm animate-bounce"
          style={{ animationDelay: "300ms" }}
        />
        <div
          className="w-4 h-4 bg-white rounded-sm animate-bounce"
          style={{ animationDelay: "450ms" }}
        />
      </div>

      {/* Progress bar */}
      <div className="w-48 h-2 bg-white/30 rounded-full overflow-hidden">
        <div className="h-full bg-white animate-pulse w-full" />
      </div>

      {/* Loading text */}
      <p className="mt-4 text-white text-sm font-mono">{message}</p>
    </div>
  );
}
