/**
 * Testimonial Block Component
 * Reusable testimonial card matching original design
 * Supports rectangular and L-shaped blocks using CSS Grid
 */

import { TETRIS_COLORS } from "./testimonialData";
import type { Testimonial, ShapeType } from "./types";

interface TestimonialBlockProps {
  testimonial: Testimonial;
  gridCol: number; // Starting grid column
  gridRow: number; // Starting grid row
  cellSize: number; // Size of each grid cell in pixels
  rotation?: number; // Rotation state (0 = normal, 1 = 90° clockwise)
  isAnimating?: boolean; // Optional: for falling animation
  onClick?: () => void;
  hideText?: boolean; // Hide text content (for mobile)
}

/**
 * Content component for testimonial (quote + author)
 * Simplified design that works well at any rotation - centered layout with avatar focus
 */
function TestimonialContent({
  testimonial,
  textColor,
  hideText = false,
}: {
  testimonial: Testimonial;
  textColor: string;
  hideText?: boolean;
}) {
  const isDecorative = !testimonial.body && !testimonial.author.name;

  if (isDecorative) return null;

  // On mobile, show only the avatar (no text)
  if (hideText) {
    if (!testimonial.author.imageUrl) return null;
    return (
      <div className="p-2 h-full flex items-center justify-center">
        <img
          src={testimonial.author.imageUrl}
          alt={testimonial.author.name}
          className="h-10 w-10 rounded-full object-cover border-2 border-white/30"
        />
      </div>
    );
  }

  // Get short quote (first sentence or first 50 chars)
  const firstSentence = testimonial.body.split(/[.!?]/)[0];
  const shortQuote = firstSentence.length > 50
    ? firstSentence.slice(0, 50) + "..."
    : firstSentence + (testimonial.body.length > firstSentence.length ? "..." : "");

  return (
    <div className="p-2 h-full flex flex-col justify-center items-center text-center gap-1" style={{ color: textColor }}>
      {/* Avatar - larger and centered for visual focus */}
      {testimonial.author.imageUrl && (
        <img
          src={testimonial.author.imageUrl}
          alt={testimonial.author.name}
          className="h-8 w-8 rounded-full object-cover flex-shrink-0 border-2 border-white/30"
        />
      )}

      {/* Name - prominent */}
      <div className="text-[11px] font-bold truncate max-w-full px-1">
        {testimonial.author.name}
      </div>

      {/* Short quote - 2 lines max */}
      <p className="text-[9px] leading-tight line-clamp-2 opacity-90 px-1">
        "{shortQuote}"
      </p>
    </div>
  );
}

/**
 * L-shaped block using overlapping divs with rounded corners
 * Supports 4 rotations (0°, 90°, 180°, 270°)
 *
 * Rotation 0:    Rotation 1:    Rotation 2:    Rotation 3:
 * [X][ ][ ]      [X][X][X]      [X][X][X]      [ ][ ][X]
 * [X][ ][ ]      [X][ ][ ]      [ ][ ][X]      [ ][ ][X]
 * [X][X][X]      [X][ ][ ]      [ ][ ][X]      [X][X][X]
 */
function LShapeBlock({
  testimonial,
  backgroundColor,
  textColor,
  rotation = 0,
  hideText = false,
}: {
  testimonial: Testimonial;
  cellSize: number;
  backgroundColor: string;
  textColor: string;
  rotation?: number;
  hideText?: boolean;
}) {
  const cols = testimonial.gridWidth;
  const rows = testimonial.gridHeight;
  const radius = "0.75rem"; // Consistent rounded corners
  const normalizedRotation = rotation % 4;

  // Define the two parts of the L for each rotation
  // Each rotation has a "main" part (where content goes) and an "extension" part
  const getGridStyles = () => {
    switch (normalizedRotation) {
      case 0: // Vertical left, horizontal bottom
        return {
          main: {
            gridColumn: "1",
            gridRow: `1 / ${rows + 1}`,
            borderRadius: `${radius} ${radius} 0 ${radius}`,
          },
          extension: {
            gridColumn: `2 / ${cols + 1}`,
            gridRow: rows.toString(),
            borderRadius: `0 ${radius} ${radius} 0`,
          },
        };
      case 1: // Horizontal top, vertical left
        return {
          main: {
            gridColumn: `1 / ${cols + 1}`,
            gridRow: "1",
            borderRadius: `${radius} ${radius} ${radius} 0`,
          },
          extension: {
            gridColumn: "1",
            gridRow: `2 / ${rows + 1}`,
            borderRadius: `0 0 ${radius} ${radius}`,
          },
        };
      case 2: // Horizontal top, vertical right
        return {
          main: {
            gridColumn: `1 / ${cols + 1}`,
            gridRow: "1",
            borderRadius: `${radius} ${radius} 0 ${radius}`,
          },
          extension: {
            gridColumn: cols.toString(),
            gridRow: `2 / ${rows + 1}`,
            borderRadius: `0 0 ${radius} ${radius}`,
          },
        };
      case 3: // Vertical right, horizontal bottom
        return {
          main: {
            gridColumn: cols.toString(),
            gridRow: `1 / ${rows + 1}`,
            borderRadius: `${radius} ${radius} ${radius} 0`,
          },
          extension: {
            gridColumn: `1 / ${cols}`,
            gridRow: rows.toString(),
            borderRadius: `${radius} 0 0 ${radius}`,
          },
        };
      default:
        return {
          main: { gridColumn: "1", gridRow: "1", borderRadius: radius },
          extension: { gridColumn: "1", gridRow: "1", borderRadius: radius },
        };
    }
  };

  const styles = getGridStyles();

  return (
    <div
      className="w-full h-full"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {/* Main part - contains the content */}
      <div
        className="shadow-lg overflow-hidden"
        style={{
          ...styles.main,
          backgroundColor,
        }}
      >
        <TestimonialContent testimonial={testimonial} textColor={textColor} hideText={hideText} />
      </div>

      {/* Extension part - just colored, no shadow for seamless connection */}
      <div
        style={{
          ...styles.extension,
          backgroundColor,
        }}
      />
    </div>
  );
}

/**
 * J-shaped block (mirror of L) using overlapping divs with rounded corners
 * Supports 4 rotations (0°, 90°, 180°, 270°)
 *
 * Rotation 0:    Rotation 1:    Rotation 2:    Rotation 3:
 * [ ][ ][X]      [X][ ][ ]      [X][X][X]      [X][X][X]
 * [ ][ ][X]      [X][ ][ ]      [X][ ][ ]      [ ][ ][X]
 * [X][X][X]      [X][X][X]      [X][ ][ ]      [ ][ ][X]
 */
function JShapeBlock({
  testimonial,
  backgroundColor,
  textColor,
  rotation = 0,
  hideText = false,
}: {
  testimonial: Testimonial;
  cellSize: number;
  backgroundColor: string;
  textColor: string;
  rotation?: number;
  hideText?: boolean;
}) {
  const cols = testimonial.gridWidth;
  const rows = testimonial.gridHeight;
  const radius = "0.75rem";
  const normalizedRotation = rotation % 4;

  const getGridStyles = () => {
    switch (normalizedRotation) {
      case 0: // Vertical right, horizontal bottom
        return {
          main: {
            gridColumn: cols.toString(),
            gridRow: `1 / ${rows + 1}`,
            borderRadius: `${radius} ${radius} ${radius} 0`,
          },
          extension: {
            gridColumn: `1 / ${cols}`,
            gridRow: rows.toString(),
            borderRadius: `${radius} 0 0 ${radius}`,
          },
        };
      case 1: // Vertical left, horizontal bottom
        return {
          main: {
            gridColumn: "1",
            gridRow: `1 / ${rows + 1}`,
            borderRadius: `${radius} ${radius} 0 ${radius}`,
          },
          extension: {
            gridColumn: `2 / ${cols + 1}`,
            gridRow: rows.toString(),
            borderRadius: `0 ${radius} ${radius} 0`,
          },
        };
      case 2: // Horizontal top, vertical left
        return {
          main: {
            gridColumn: `1 / ${cols + 1}`,
            gridRow: "1",
            borderRadius: `${radius} ${radius} ${radius} 0`,
          },
          extension: {
            gridColumn: "1",
            gridRow: `2 / ${rows + 1}`,
            borderRadius: `0 0 ${radius} ${radius}`,
          },
        };
      case 3: // Horizontal top, vertical right
        return {
          main: {
            gridColumn: `1 / ${cols + 1}`,
            gridRow: "1",
            borderRadius: `${radius} ${radius} 0 ${radius}`,
          },
          extension: {
            gridColumn: cols.toString(),
            gridRow: `2 / ${rows + 1}`,
            borderRadius: `0 0 ${radius} ${radius}`,
          },
        };
      default:
        return {
          main: { gridColumn: "1", gridRow: "1", borderRadius: radius },
          extension: { gridColumn: "1", gridRow: "1", borderRadius: radius },
        };
    }
  };

  const styles = getGridStyles();

  return (
    <div
      className="w-full h-full"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {/* Main part - contains the content */}
      <div
        className="shadow-lg overflow-hidden"
        style={{
          ...styles.main,
          backgroundColor,
        }}
      >
        <TestimonialContent testimonial={testimonial} textColor={textColor} hideText={hideText} />
      </div>

      {/* Extension part - just colored, no shadow for seamless connection */}
      <div
        style={{
          ...styles.extension,
          backgroundColor,
        }}
      />
    </div>
  );
}

/**
 * I-shaped block (long bar) - 4x1
 * Supports 2 rotations (horizontal and vertical)
 */
function IShapeBlock({
  testimonial,
  backgroundColor,
  textColor,
  hideText = false,
}: {
  testimonial: Testimonial;
  backgroundColor: string;
  textColor: string;
  hideText?: boolean;
}) {
  return (
    <div
      className="w-full h-full rounded-xl shadow-lg overflow-hidden"
      style={{
        backgroundColor,
        color: textColor,
      }}
    >
      <TestimonialContent testimonial={testimonial} textColor={textColor} hideText={hideText} />
    </div>
  );
}

/**
 * O-shaped block (square) - 2x2
 * No rotation needed (always looks the same)
 */
function OShapeBlock({
  testimonial,
  backgroundColor,
  textColor,
  hideText = false,
}: {
  testimonial: Testimonial;
  backgroundColor: string;
  textColor: string;
  hideText?: boolean;
}) {
  return (
    <div
      className="w-full h-full rounded-xl shadow-lg overflow-hidden"
      style={{
        backgroundColor,
        color: textColor,
      }}
    >
      <TestimonialContent testimonial={testimonial} textColor={textColor} hideText={hideText} />
    </div>
  );
}

/**
 * T-shaped block - 3x2
 * [X][X][X]
 * [ ][X][ ]
 * Supports 4 rotations
 * Uses overlapping divs - main bar gets all rounded corners, extension has only external corners rounded
 */
function TShapeBlock({
  testimonial,
  backgroundColor,
  textColor,
  rotation = 0,
  hideText = false,
}: {
  testimonial: Testimonial;
  backgroundColor: string;
  textColor: string;
  rotation?: number;
  hideText?: boolean;
}) {
  const radius = "0.75rem";
  const normalizedRotation = rotation % 4;

  // T-shape has different configurations for each rotation
  // Must match the collision matrix from rotateMatrix90 exactly!
  // Main bar always has all corners rounded (they all face outward or empty cells)
  // Extension only rounds corners that don't connect to main bar
  const getGridConfig = () => {
    switch (normalizedRotation) {
      case 0: // Top bar + middle bottom cell (3 cols x 2 rows)
        // Collision: [[1,1,1],[0,1,0]] - top row filled, bottom middle only
        return {
          cols: 3,
          rows: 2,
          main: { gridColumn: "1 / 4", gridRow: "1", borderRadius: radius },
          extension: { gridColumn: "2", gridRow: "2", borderRadius: `0 0 ${radius} ${radius}` },
        };
      case 1: // Right bar + middle left cell (2 cols x 3 rows)
        // Collision: [[0,1],[1,1],[0,1]] - right column filled, left middle only
        return {
          cols: 2,
          rows: 3,
          main: { gridColumn: "2", gridRow: "1 / 4", borderRadius: radius },
          extension: { gridColumn: "1", gridRow: "2", borderRadius: `${radius} 0 0 ${radius}` },
        };
      case 2: // Middle top cell + bottom bar (3 cols x 2 rows)
        // Collision: [[0,1,0],[1,1,1]] - top middle only, bottom row filled
        return {
          cols: 3,
          rows: 2,
          main: { gridColumn: "1 / 4", gridRow: "2", borderRadius: radius },
          extension: { gridColumn: "2", gridRow: "1", borderRadius: `${radius} ${radius} 0 0` },
        };
      case 3: // Left bar + middle right cell (2 cols x 3 rows)
        // Collision: [[1,0],[1,1],[1,0]] - left column filled, right middle only
        return {
          cols: 2,
          rows: 3,
          main: { gridColumn: "1", gridRow: "1 / 4", borderRadius: radius },
          extension: { gridColumn: "2", gridRow: "2", borderRadius: `0 ${radius} ${radius} 0` },
        };
      default:
        return {
          cols: 3,
          rows: 2,
          main: { gridColumn: "1 / 4", gridRow: "1", borderRadius: radius },
          extension: { gridColumn: "2", gridRow: "2", borderRadius: `0 0 ${radius} ${radius}` },
        };
    }
  };

  const config = getGridConfig();

  return (
    <div
      className="w-full h-full"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${config.cols}, 1fr)`,
        gridTemplateRows: `repeat(${config.rows}, 1fr)`,
      }}
    >
      <div
        className="shadow-lg overflow-hidden"
        style={{ ...config.main, backgroundColor }}
      >
        <TestimonialContent testimonial={testimonial} textColor={textColor} hideText={hideText} />
      </div>
      <div
        style={{ ...config.extension, backgroundColor }}
      />
    </div>
  );
}

/**
 * S-shaped block - 3x2
 * [ ][X][X]
 * [X][X][ ]
 * Supports 2 rotations (horizontal and vertical)
 * Corner radii are set so internal corners (where parts connect) are square
 */
function SShapeBlock({
  testimonial,
  backgroundColor,
  textColor,
  rotation = 0,
  hideText = false,
}: {
  testimonial: Testimonial;
  backgroundColor: string;
  textColor: string;
  rotation?: number;
  hideText?: boolean;
}) {
  const radius = "0.75rem";
  const normalizedRotation = rotation % 4;

  // S-shape alternates between horizontal and vertical
  const isHorizontal = normalizedRotation === 0 || normalizedRotation === 2;

  if (isHorizontal) {
    // [ ][X][X]  top part - bottom-left is internal
    // [X][X][ ]  bottom part - top-right is internal
    return (
      <div
        className="w-full h-full"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
        }}
      >
        {/* Top right part - bottom-left connects to bottom part */}
        <div
          style={{
            gridColumn: "2 / 4",
            gridRow: "1",
            backgroundColor,
            borderRadius: `${radius} ${radius} ${radius} 0`,
          }}
        />
        {/* Bottom left part with content - top-right connects to top part */}
        <div
          className="shadow-lg overflow-hidden"
          style={{
            gridColumn: "1 / 3",
            gridRow: "2",
            backgroundColor,
            borderRadius: `${radius} 0 ${radius} ${radius}`,
          }}
        >
          <TestimonialContent testimonial={testimonial} textColor={textColor} hideText={hideText} />
        </div>
      </div>
    );
  } else {
    // Vertical S
    // [X][ ]  left part rows 1-2, bottom-right is internal
    // [X][X]
    // [ ][X]  right part rows 2-3, top-left is internal
    return (
      <div
        className="w-full h-full"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
        }}
      >
        {/* Top left + middle part - bottom-right connects to right part */}
        <div
          className="shadow-lg overflow-hidden"
          style={{
            gridColumn: "1",
            gridRow: "1 / 3",
            backgroundColor,
            borderRadius: `${radius} ${radius} 0 ${radius}`,
          }}
        >
          <TestimonialContent testimonial={testimonial} textColor={textColor} hideText={hideText} />
        </div>
        {/* Middle + bottom right part - top-left connects to left part */}
        <div
          style={{
            gridColumn: "2",
            gridRow: "2 / 4",
            backgroundColor,
            borderRadius: `0 ${radius} ${radius} ${radius}`,
          }}
        />
      </div>
    );
  }
}

/**
 * Z-shaped block - 3x2
 * [X][X][ ]
 * [ ][X][X]
 * Supports 2 rotations (horizontal and vertical)
 * Corner radii are set so internal corners (where parts connect) are square
 */
function ZShapeBlock({
  testimonial,
  backgroundColor,
  textColor,
  rotation = 0,
  hideText = false,
}: {
  testimonial: Testimonial;
  backgroundColor: string;
  textColor: string;
  rotation?: number;
  hideText?: boolean;
}) {
  const radius = "0.75rem";
  const normalizedRotation = rotation % 4;

  // Z-shape alternates between horizontal and vertical
  const isHorizontal = normalizedRotation === 0 || normalizedRotation === 2;

  if (isHorizontal) {
    // [X][X][ ]  top part - bottom-right is internal
    // [ ][X][X]  bottom part - top-left is internal
    return (
      <div
        className="w-full h-full"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
        }}
      >
        {/* Top left part with content - bottom-right connects to bottom part */}
        <div
          className="shadow-lg overflow-hidden"
          style={{
            gridColumn: "1 / 3",
            gridRow: "1",
            backgroundColor,
            borderRadius: `${radius} ${radius} 0 ${radius}`,
          }}
        >
          <TestimonialContent testimonial={testimonial} textColor={textColor} hideText={hideText} />
        </div>
        {/* Bottom right part - top-left connects to top part */}
        <div
          style={{
            gridColumn: "2 / 4",
            gridRow: "2",
            backgroundColor,
            borderRadius: `0 ${radius} ${radius} ${radius}`,
          }}
        />
      </div>
    );
  } else {
    // Vertical Z
    // [ ][X]  right part rows 1-2, bottom-left is internal
    // [X][X]
    // [X][ ]  left part rows 2-3, top-right is internal
    return (
      <div
        className="w-full h-full"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
        }}
      >
        {/* Top right + middle part - bottom-left connects to left part */}
        <div
          style={{
            gridColumn: "2",
            gridRow: "1 / 3",
            backgroundColor,
            borderRadius: `${radius} ${radius} ${radius} 0`,
          }}
        />
        {/* Middle + bottom left part with content - top-right connects to right part */}
        <div
          className="shadow-lg overflow-hidden"
          style={{
            gridColumn: "1",
            gridRow: "2 / 4",
            backgroundColor,
            borderRadius: `${radius} 0 ${radius} ${radius}`,
          }}
        >
          <TestimonialContent testimonial={testimonial} textColor={textColor} hideText={hideText} />
        </div>
      </div>
    );
  }
}

export function TestimonialBlock({
  testimonial,
  gridCol,
  gridRow,
  cellSize,
  rotation = 0,
  isAnimating = false,
  onClick,
  hideText = false,
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

  const shapeType: ShapeType = testimonial.shapeType;

  // Render the appropriate shape
  const renderShape = () => {
    switch (shapeType) {
      case "I":
        return (
          <IShapeBlock
            testimonial={testimonial}
            backgroundColor={backgroundColor}
            textColor={textColor}
            hideText={hideText}
          />
        );
      case "O":
        return (
          <OShapeBlock
            testimonial={testimonial}
            backgroundColor={backgroundColor}
            textColor={textColor}
            hideText={hideText}
          />
        );
      case "T":
        return (
          <TShapeBlock
            testimonial={testimonial}
            backgroundColor={backgroundColor}
            textColor={textColor}
            rotation={rotation}
            hideText={hideText}
          />
        );
      case "S":
        return (
          <SShapeBlock
            testimonial={testimonial}
            backgroundColor={backgroundColor}
            textColor={textColor}
            rotation={rotation}
            hideText={hideText}
          />
        );
      case "Z":
        return (
          <ZShapeBlock
            testimonial={testimonial}
            backgroundColor={backgroundColor}
            textColor={textColor}
            rotation={rotation}
            hideText={hideText}
          />
        );
      case "L":
        return (
          <LShapeBlock
            testimonial={testimonial}
            cellSize={cellSize}
            backgroundColor={backgroundColor}
            textColor={textColor}
            rotation={rotation}
            hideText={hideText}
          />
        );
      case "J":
        return (
          <JShapeBlock
            testimonial={testimonial}
            cellSize={cellSize}
            backgroundColor={backgroundColor}
            textColor={textColor}
            rotation={rotation}
            hideText={hideText}
          />
        );
    }
  };

  return (
    <div
      className={`absolute transition-all ${
        isAnimating ? "duration-100" : "duration-300"
      } ${isClickable ? "cursor-pointer hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white" : ""}`}
      style={{
        left: `${left}px`,
        top: `${top}px`,
        width: `${width - 4}px`,
        height: `${height - 4}px`,
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
      {renderShape()}
    </div>
  );
}
