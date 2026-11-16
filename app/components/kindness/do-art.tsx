// Hand-drawn inline SVGs for What you do and The briefs (04-do-briefs.md, Asset
// requests): the pixel sparkle pair, the safety pin with a pixel-heart clasp and
// Wombat's pixel clipboard. All decorative and hidden from assistive tech.
import { PIXEL_HEART_PATH } from "./ui";

/** One plus-shaped pixel sparkle with a smaller one beside it, about 60% of the box, in teal. */
export function DoSparkle({ className }: { className?: string }) {
  return (
    <span className={className} aria-hidden="true">
      <svg viewBox="0 0 24 24" width="24" height="24" focusable="false" shapeRendering="crispEdges">
        <path
          fill="currentColor"
          d="M9 8h2v10H9zM5 12h10v2H5zM8 11h4v4H8zM16 4h2v4h-2zM15 5h4v2h-4z"
        />
      </svg>
    </span>
  );
}

/**
 * Safety pin across a zine's tape: cream wire with an ink outline (an ink stroke
 * under a narrower cream stroke) and a red pixel-heart clasp.
 */
export function SafetyPin({ className }: { className?: string }) {
  const wire = "M7.5 33.5L32 9M14.5 40.5L39 16";
  return (
    <span className={className} aria-hidden="true">
      <svg viewBox="0 0 48 48" width="48" height="48" focusable="false">
        <g fill="none" strokeLinecap="round">
          <g style={{ stroke: "var(--rk-ink)" }} strokeWidth="5.5">
            <path d={wire} />
            <circle cx="11" cy="37" r="5" />
          </g>
          <g style={{ stroke: "var(--rk-cream)" }} strokeWidth="2.5">
            <path d={wire} />
            <circle cx="11" cy="37" r="5" />
          </g>
        </g>
        <path
          d={PIXEL_HEART_PATH}
          transform="translate(35.5 12.5) rotate(45) scale(1.9) translate(-3.5 -3)"
          style={{ fill: "var(--rk-red)", stroke: "var(--rk-ink)" }}
          strokeWidth=".6"
          strokeLinejoin="miter"
          paintOrder="stroke"
        />
      </svg>
    </span>
  );
}

/** Wombat's clipboard as a pixel icon with a heart on it, drawn in currentColor. */
export function PixelClipboard({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 11 14"
      width="11"
      height="14"
      aria-hidden="true"
      focusable="false"
      shapeRendering="crispEdges"
    >
      <path fill="currentColor" d="M0 2h11v12H0zM3 0h5v3H3z" />
      <path className="rk-briefs__pitch-heart" d={PIXEL_HEART_PATH} transform="translate(2 5)" />
    </svg>
  );
}
