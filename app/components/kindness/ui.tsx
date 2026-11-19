// Shared building blocks for the Hacks of Kindness page. The shell spec
// defines them; every section uses them by these names. Server-rendered only:
// no state and no effects. Styles live in app/styles/kindness/shell.css.
import type { CSSProperties, ReactNode } from "react";

type Style = CSSProperties & Record<`--${string}`, string | number>;

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function isExternal(href: string) {
  return /^https?:\/\//.test(href) && !href.startsWith("https://mlai.au/");
}

/** Visually hidden text that screen readers still read. */
export function Sr({ children }: { children: ReactNode }) {
  return <span className="rk-sr">{children}</span>;
}

/** The 7 by 6 pixel heart as one path of whole-pixel rectangles. */
export const PIXEL_HEART_PATH = "M1 0h2v1H1zM4 0h2v1H4zM0 1h7v2H0zM1 3h5v1H1zM2 4h3v1H2zM3 5h1v1H3z";

/**
 * The 7 by 6 pixel heart, drawn as rectangles in `currentColor`. Inside a
 * Sticker button it beats (`rk-beat`, a CSS transform) while hovered.
 */
export function PixelHeart({ className, style }: { className?: string; style?: Style }) {
  return (
    <svg
      className={cx("rk-heart", className)}
      style={style}
      viewBox="0 0 7 6"
      width="7"
      height="6"
      aria-hidden="true"
      focusable="false"
      shapeRendering="crispEdges"
    >
      <path d={PIXEL_HEART_PATH} fill="currentColor" />
    </svg>
  );
}

/**
 * The same heart drawn from the page's shared `<symbol id="rk-heart">` (in the
 * hidden SVG at the top of the page wrapper). Its fill comes from CSS: set
 * `fill` (or `color`, the default fill is `currentColor`) on the svg.
 */
export function PixelHeartUse({ className, style }: { className?: string; style?: Style }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 7 6"
      width="7"
      height="6"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <use href="#rk-heart" />
    </svg>
  );
}

export type StickerVariant = "small" | "hero" | "corner" | "crew" | "halo";

/**
 * Sticker button (`rk-btn`). An `<a>` for links, a `<button>` when `onClickAction`
 * is used for in-page actions (not in release 1). `cta` is the analytics label.
 */
export function StickerButton({
  href,
  children,
  variants = [],
  cta,
  className,
  icon = "heart",
  newTab,
  style,
}: {
  href: string;
  children: ReactNode;
  variants?: StickerVariant[];
  cta: string;
  className?: string;
  /** "heart" (default), "arrow" (↗, for buttons that leave the page) or "none". */
  icon?: "heart" | "arrow" | "none";
  /** Opens in a new tab and adds the hidden " (opens in a new tab)" suffix. */
  newTab?: boolean;
  style?: Style;
}) {
  return (
    <a
      href={href}
      className={cx("rk-btn", ...variants.map(v => `rk-btn--${v}`), className)}
      data-rk-cta={cta}
      style={style}
      {...(newTab ? { target: "_blank", rel: "noopener" } : {})}
    >
      <span className="rk-btn__label">{children}</span>
      {icon === "heart" ? <PixelHeart className="rk-btn__icon" /> : null}
      {icon === "arrow" ? (
        <span className="rk-btn__icon rk-btn__arrow" aria-hidden="true">
          ↗
        </span>
      ) : null}
      {newTab ? <Sr> (opens in a new tab)</Sr> : null}
    </a>
  );
}

/** Chip link (`rk-chip`): small secondary links that look stuck on by hand. */
export function ChipLink({
  href,
  children,
  arrow,
  variant,
  rot,
  cta,
  className,
  newTab,
}: {
  href: string;
  children: ReactNode;
  arrow?: string;
  variant?: "quiet" | "outline";
  /** Resting tilt in degrees, between -2.5 and 2.5. */
  rot?: number;
  cta?: string;
  className?: string;
  newTab?: boolean;
}) {
  const opensTab = newTab ?? isExternal(href);
  return (
    <a
      href={href}
      className={cx("rk-chip", variant && `rk-chip--${variant}`, className)}
      style={rot === undefined ? undefined : ({ "--rk-rot": `${rot}deg` } as Style)}
      data-rk-cta={cta}
      {...(opensTab ? { target: "_blank", rel: "noopener" } : {})}
    >
      <span>{children}</span>
      {arrow ? (
        <span className="rk-chip__arrow" aria-hidden="true">
          {arrow}
        </span>
      ) : null}
      {opensTab ? <Sr> (opens in a new tab)</Sr> : null}
    </a>
  );
}

/** Text link (`rk-link`): a typed label with a hand-ruled underline. */
export function TextLink({
  href,
  children,
  arrow,
  small,
  cta,
  className,
  newTab,
}: {
  href: string;
  children: ReactNode;
  /** The glyph decides the hover nudge: ↓, →, ↗. */
  arrow?: "↓" | "→" | "↗";
  small?: boolean;
  cta?: string;
  className?: string;
  newTab?: boolean;
}) {
  const opensTab = newTab ?? isExternal(href);
  const dir = arrow === "↓" ? "down" : arrow === "→" ? "right" : arrow === "↗" ? "out" : undefined;
  return (
    <a
      href={href}
      className={cx("rk-link", small && "rk-link--small", className)}
      data-rk-cta={cta}
      {...(opensTab ? { target: "_blank", rel: "noopener" } : {})}
    >
      <span>{children}</span>
      {arrow ? (
        <span className={cx("rk-link__arrow", dir && `rk-link__arrow--${dir}`)} aria-hidden="true">
          {arrow}
        </span>
      ) : null}
      {opensTab ? <Sr> (opens in a new tab)</Sr> : null}
    </a>
  );
}

/**
 * Plain eyebrow (`rk-eyebrow`). Pass phrases as an array to get the "·"
 * separators, or a string that is split on " · ".
 */
export function Eyebrow({
  children,
  tone,
  className,
}: {
  children: string | string[];
  tone?: "teal";
  className?: string;
}) {
  const parts = Array.isArray(children) ? children : children.split(" · ");
  return (
    <p className={cx("rk-eyebrow", tone && `rk-eyebrow--${tone}`, className)}>
      {parts.map((part, i) => (
        <span key={i}>
          {i > 0 ? <i aria-hidden="true">·</i> : null}
          {part}
        </span>
      ))}
    </p>
  );
}

/** Shout eyebrow (`rk-eyebrow--shout`): the loud yellow kicker above a section title. */
export function ShoutEyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cx("rk-eyebrow", "rk-eyebrow--shout", className)}>{children}</p>;
}

/**
 * Hop heading (`rk-hop`). The server splits each authored line into words and
 * letters; `--rk-n` counts letters across the whole heading (spaces not counted).
 * A hidden span carries the plain text so the accessible name keeps its spaces.
 */
export function HopHeading({
  lines,
  as: Tag = "h2",
  className,
  id,
  mark,
}: {
  lines: readonly string[];
  as?: "h1" | "h2" | "h3";
  className?: string;
  id?: string;
  /** Index of a line to print in yellow (wrapped in `<mark>`). */
  mark?: number;
}) {
  let n = 0;
  return (
    <Tag className={cx("rk-hop", className)} id={id}>
      <span className="rk-sr">{lines.join(" ")}</span>
      <span className="rk-hop__lines" aria-hidden="true">
        {lines.map((line, li) => {
          const words = line.split(" ").map((word, wi) => (
            <span className="rk-hop__word" key={wi}>
              {Array.from(word).map((ch, ci) => (
                <span className="rk-hop__ch" key={ci} style={{ "--rk-n": n++ } as Style}>
                  {ch}
                </span>
              ))}
            </span>
          ));
          const spaced = words.flatMap((w, i) => (i === 0 ? [w] : [" ", w]));
          return (
            <span className="rk-hop__line" key={li}>
              {mark === li ? <mark>{spaced}</mark> : spaced}
            </span>
          );
        })}
      </span>
    </Tag>
  );
}

/** Stamp (`rk-stamp`): a rubber-stamp impression. `ink` for paper, cream, yellow and teal grounds. */
export function Stamp({
  children,
  ink,
  rot,
  className,
  style,
}: {
  children: ReactNode;
  ink?: boolean;
  /** Tilt in degrees, -14 to 14. Default -6. */
  rot?: number;
  className?: string;
  style?: Style;
}) {
  return (
    <span
      className={cx("rk-stamp", ink && "rk-stamp--ink", className)}
      style={{ ...(rot === undefined ? {} : { "--rk-rot": `${rot}deg` }), ...style } as Style}
    >
      {children}
    </span>
  );
}

/** Tape strip (`rk-tape`): gaffer tape over a corner. Position it with a class or style. */
export function Tape({
  cream,
  small,
  className,
  style,
}: {
  cream?: boolean;
  small?: boolean;
  className?: string;
  style?: Style;
}) {
  return (
    <i
      aria-hidden="true"
      className={cx("rk-tape", cream && "rk-tape--cream", small && "rk-tape--s", className)}
      style={style}
    />
  );
}

export { cx };
export type { Style };
