/**
 * Next Block Panel
 * Shows the upcoming piece preview and testimonial on the right sidebar
 * Styled like classic Tetris side panel
 */

import type { GamePiece, ShapeType } from "./types";
import { TETRIS_COLORS, getTextColor } from "./testimonialData";
import { TETROMINO_SHAPES } from "./tetrisLogic";

interface NextBlockPanelProps {
  nextPiece: GamePiece | null;
  isMobile?: boolean;
}

/**
 * Renders a mini preview of the tetromino shape
 */
function ShapePreview({ shapeType, color }: { shapeType: ShapeType; color: string }) {
  const matrix = TETROMINO_SHAPES[shapeType];
  const bgColor = TETRIS_COLORS[color as keyof typeof TETRIS_COLORS] || color;

  // Find the actual bounds of the shape (remove empty rows/cols)
  let minRow = matrix.length, maxRow = -1;
  let minCol = matrix[0].length, maxCol = -1;

  matrix.forEach((row, rowIdx) => {
    row.forEach((cell, colIdx) => {
      if (cell === 1) {
        minRow = Math.min(minRow, rowIdx);
        maxRow = Math.max(maxRow, rowIdx);
        minCol = Math.min(minCol, colIdx);
        maxCol = Math.max(maxCol, colIdx);
      }
    });
  });

  const trimmedMatrix = matrix.slice(minRow, maxRow + 1).map(row => row.slice(minCol, maxCol + 1));
  const rows = trimmedMatrix.length;
  const cols = trimmedMatrix[0]?.length || 1;

  // Calculate cell size to fit in preview area
  const cellSize = Math.min(40, 120 / Math.max(rows, cols));

  return (
    <div
      className="flex items-center justify-center p-4"
      style={{ minHeight: "100px" }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
          gap: "2px",
        }}
      >
        {trimmedMatrix.map((row, rowIdx) =>
          row.map((cell, colIdx) => (
            <div
              key={`${rowIdx}-${colIdx}`}
              style={{
                width: cellSize,
                height: cellSize,
                backgroundColor: cell === 1 ? bgColor : "transparent",
                borderRadius: cell === 1 ? "6px" : "0",
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

export function NextBlockPanel({ nextPiece, isMobile = false }: NextBlockPanelProps) {
  const testimonial = nextPiece?.testimonial;
  const bgColor = testimonial ? TETRIS_COLORS[testimonial.color] : "#666";
  const textColor = testimonial ? getTextColor(testimonial.color) : "#fff";

  // Mobile layout - horizontal, compact
  if (isMobile) {
    return (
      <div className="flex gap-3 w-full">
        {/* Next Block Preview Card - Compact */}
        <div
          className="rounded-xl overflow-hidden shadow-lg flex-shrink-0"
          style={{
            backgroundColor: "#1a1a1a",
          }}
        >
          <div className="px-3 pt-2 pb-1">
            <span className="text-[10px] font-bold tracking-wider" style={{ color: bgColor }}>
              NEXT
            </span>
          </div>
          {testimonial ? (
            <div className="p-2">
              <ShapePreview shapeType={testimonial.shapeType} color={testimonial.color} />
            </div>
          ) : (
            <div className="flex items-center justify-center p-3" style={{ minHeight: "60px" }}>
              <span className="text-gray-500 text-xs">-</span>
            </div>
          )}
        </div>

        {/* Testimonial Preview Card - Compact horizontal */}
        <div
          className="rounded-xl p-3 shadow-lg flex-1 flex items-center gap-3"
          style={{
            backgroundColor: testimonial ? bgColor : "#1a1a1a",
            color: textColor,
          }}
        >
          {testimonial ? (
            <>
              {testimonial.author.imageUrl && (
                <img
                  src={testimonial.author.imageUrl}
                  alt={testimonial.author.name}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
              )}
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold truncate" style={{ color: textColor }}>
                  {testimonial.author.name}
                </div>
                <p className="text-xs opacity-80 line-clamp-2" style={{ color: textColor }}>
                  "{testimonial.body.length > 80
                    ? testimonial.body.slice(0, 80) + "..."
                    : testimonial.body}"
                </p>
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-xs">
              Testimonial preview
            </p>
          )}
        </div>
      </div>
    );
  }

  // Desktop layout - vertical, full
  return (
    <div className="flex flex-col gap-4 h-full w-full">
      {/* Next Block Preview Card */}
      <div
        className="rounded-2xl overflow-hidden shadow-lg"
        style={{
          backgroundColor: "#1a1a1a",
        }}
      >
        {/* Header */}
        <div className="px-4 pt-4 pb-2">
          <span className="text-xs font-bold tracking-wider" style={{ color: bgColor }}>
            NEXT BLOCK
          </span>
        </div>

        {/* Shape Preview */}
        {testimonial ? (
          <ShapePreview shapeType={testimonial.shapeType} color={testimonial.color} />
        ) : (
          <div className="flex items-center justify-center p-4" style={{ minHeight: "100px" }}>
            <span className="text-gray-500 text-sm">Start game to see next block</span>
          </div>
        )}
      </div>

      {/* Testimonial Preview Card - Changes color based on next block */}
      <div
        className="rounded-2xl p-4 shadow-lg flex-1 flex flex-col"
        style={{
          backgroundColor: testimonial ? bgColor : "#1a1a1a",
          color: textColor,
        }}
      >
        {testimonial ? (
          <>
            {/* Quote */}
            <p className="text-sm md:text-base font-medium leading-relaxed mb-4 flex-1"
               style={{ color: textColor }}>
              "{testimonial.body.length > 150
                ? testimonial.body.slice(0, 150) + "..."
                : testimonial.body}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 mt-auto">
              {testimonial.author.imageUrl && (
                <img
                  src={testimonial.author.imageUrl}
                  alt={testimonial.author.name}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
              )}
              <div>
                <div className="text-sm font-semibold" style={{ color: textColor }}>
                  — {testimonial.author.name}
                </div>
                <div className="text-xs opacity-70" style={{ color: textColor }}>
                  {testimonial.author.handle}
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-sm flex-1 flex items-center justify-center">
            Testimonial preview will appear here
          </p>
        )}
      </div>
    </div>
  );
}
