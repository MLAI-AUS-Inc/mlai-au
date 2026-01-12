/**
 * Testimonial Block Component
 * Reusable testimonial card matching original design
 */

import { TETRIS_COLORS } from "./testimonialData";
import type { Testimonial } from "./types";

interface TestimonialBlockProps {
  testimonial: Testimonial;
  gridCol: number; // Starting grid column
  gridRow: number; // Starting grid row
  cellSize: number; // Size of each grid cell in pixels
  isAnimating?: boolean; // Optional: for falling animation
  onClick?: () => void;
}

export function TestimonialBlock({
  testimonial,
  gridCol,
  gridRow,
  cellSize,
  isAnimating = false,
  onClick,
}: TestimonialBlockProps) {
  const width = testimonial.gridWidth * cellSize;
  const height = testimonial.gridHeight * cellSize;
  const left = gridCol * cellSize;
  const top = gridRow * cellSize;
  const backgroundColor = TETRIS_COLORS[testimonial.color];

  // Determine text color based on background
  const textColor = ["yellow", "mint"].includes(testimonial.color)
    ? "#1a1a1a"
    : "#ffffff";

  // Check if this is a decorative block (no text)
  const isDecorative = !testimonial.body && !testimonial.author.name;
  const isClickable = onClick && !isDecorative;

  // Handle keyboard activation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isClickable && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={`absolute rounded-3xl shadow-lg transition-all ${
        isAnimating ? "duration-100" : "duration-300"
      } ${isClickable ? "cursor-pointer hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white" : ""}`}
      style={{
        left: `${left}px`,
        top: `${top}px`,
        width: `${width - 4}px`, // Minimal gap (4px instead of 8px)
        height: `${height - 4}px`,
        backgroundColor,
        color: textColor,
      }}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={isClickable ? onClick : undefined}
      onKeyDown={isClickable ? handleKeyDown : undefined}
      aria-label={
        isClickable
          ? `View testimonial from ${testimonial.author.name}`
          : undefined
      }
    >
      {!isDecorative ? (
        <div className="p-2.5 h-full flex flex-col justify-between">
          {/* Quote - smaller font for better fit */}
          <p className="text-xs md:text-sm font-bold leading-tight line-clamp-6">
            "{testimonial.body}"
          </p>

          {/* Author - minimal gap */}
          <div className="flex items-center gap-1 mt-1">
            {testimonial.author.imageUrl && (
              <img
                src={testimonial.author.imageUrl}
                alt={testimonial.author.name}
                className="h-6 w-6 rounded-full object-cover flex-shrink-0"
              />
            )}
            <div className="text-[10px] min-w-0">
              <div className="font-semibold truncate">
                — {testimonial.author.name}
              </div>
              <div className="opacity-80 truncate">
                {testimonial.author.handle}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
