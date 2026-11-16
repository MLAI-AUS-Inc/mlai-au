// Small hand-drawn inline SVGs for Hop in (#hop-in): the pen on the pledge's
// signature line, the pixel paw print on its stamp and the "opens in a new
// tab" arrow on the city buttons. All decorative and hidden from assistive
// technology; colour comes from CSS through currentColor.

/** Pen, nib down, on a 24 by 24 grid. The card tilts it -30 degrees toward the line. */
export function HopPen({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="24"
      height="24"
      aria-hidden="true"
      focusable="false"
      shapeRendering="crispEdges"
    >
      <path
        fill="currentColor"
        d="M10 1h4v2h-4zM9 3h6v8H9zM9 12h6v3H9zM9 16h6v2H9zM10 18h4v2h-4zM11 20h2v3h-2z"
      />
    </svg>
  );
}

/** Pixel paw print: one pad and four toes on a 15 by 15 grid. */
export function HopPaw({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 15 15"
      width="15"
      height="15"
      aria-hidden="true"
      focusable="false"
      shapeRendering="crispEdges"
    >
      <path
        fill="currentColor"
        d="M4 1h3v4H4zM8 1h3v4H8zM0 4h3v4H0zM12 4h3v4h-3zM5 8h5v1H5zM4 9h7v1H4zM3 10h9v3H3zM4 13h3v1H4zM8 13h3v1H8z"
      />
    </svg>
  );
}

/** The "leaves the page" arrow on the city buttons. */
export function HopOutArrow({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 12 12"
      width="12"
      height="12"
      aria-hidden="true"
      focusable="false"
    >
      <path fill="currentColor" d="M3 1h8v8H9V4.4L2.4 11 1 9.6 7.6 3H3z" />
    </svg>
  );
}
