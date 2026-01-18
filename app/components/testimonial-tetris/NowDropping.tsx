/**
 * Now Dropping Panel
 * Shows the current testimonial that's falling
 */

import type { GamePiece } from './types';
import { TETRIS_COLORS, getTextColor } from './testimonialData';

interface NowDroppingProps {
  piece: GamePiece | null;
}

export function NowDropping({ piece }: NowDroppingProps) {
  if (!piece) return null;

  const { testimonial } = piece;
  const bgColor = TETRIS_COLORS[testimonial.color];
  const textColor = getTextColor(testimonial.color);

  return (
    <div
      className="rounded-2xl p-4 shadow-lg"
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      <div className="text-xs font-bold mb-2 opacity-70">NOW DROPPING:</div>
      <div className="flex items-start gap-3">
        {testimonial.author.imageUrl && (
          <img
            src={testimonial.author.imageUrl}
            alt={testimonial.author.name}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm leading-tight mb-2 line-clamp-3">
            "{testimonial.body}"
          </p>
          <div className="text-xs font-semibold">{testimonial.author.name}</div>
          <div className="text-xs opacity-70">{testimonial.author.handle}</div>
        </div>
      </div>
    </div>
  );
}

