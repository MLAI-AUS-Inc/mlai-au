// Fixed chrome for /kindness (shell part): the motion bootstrap, the hidden
// filter SVG, skip link, corner button, top links, frame, grain overlay and
// chapter rail. Server-rendered, no state; styles in app/styles/kindness/shell.css.
import { chrome, railOrder, sections, ticketHref } from "~/data/kindness";
import { MOTION_NOSCRIPT_CSS, motionBootstrap } from "~/lib/kindness/motion";
import { ChipLink, PIXEL_HEART_PATH, StickerButton } from "./ui";

/**
 * The motion bootstrap. Rendered as the first child of the page wrapper so it
 * runs before the sections paint; the noscript backstop sits beside it.
 */
export function MotionScript() {
  return (
    <>
      <script
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: motionBootstrap(chrome.motion) }}
      />
      <noscript dangerouslySetInnerHTML={{ __html: MOTION_NOSCRIPT_CSS }} />
    </>
  );
}

/** One displacement filter per Line boil drawing; only the seed differs. */
function BoilFilter({ n }: { n: 1 | 2 | 3 | 4 }) {
  return (
    <filter id={`rk-boil-${n}`} colorInterpolationFilters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves={1} seed={n} />
      <feDisplacementMap in="SourceGraphic" scale="3" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  );
}

/**
 * Worn ink filter: fractal noise moves edges by up to `scale / 2` px, and a
 * finer noise, thresholded into a hard alpha mask, knocks specks out of the ink
 * (`cut` 16.9 knocks out about 4% of the ink, 17.4 about 2%, measured).
 * The region is wider than the bible's 5% because each letter carries a 6px
 * hard shadow inside its own filter, and a narrow glyph would clip it.
 */
function InkFilter({ id, scale, cut }: { id: string; scale: number; cut: number }) {
  return (
    <filter id={id} x="-30%" y="-20%" width="190%" height="150%" colorInterpolationFilters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={2} seed={7} result="wobble" />
      <feDisplacementMap
        in="SourceGraphic"
        in2="wobble"
        scale={scale}
        xChannelSelector="R"
        yChannelSelector="G"
        result="moved"
      />
      <feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves={1} seed={3} result="fleck" />
      <feColorMatrix
        in="fleck"
        type="matrix"
        values={`0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -24 0 0 0 ${cut}`}
        result="holes"
      />
      <feComposite in="moved" in2="holes" operator="in" />
    </filter>
  );
}

/** The hidden inline SVG: Worn ink, Line boil and the shared pixel heart symbol. */
export function InkDefs() {
  return (
    <svg className="rk-defs" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        <InkFilter id="rk-ink" scale={2} cut={16.9} />
        <InkFilter id="rk-ink-s" scale={1.2} cut={17.4} />
        <BoilFilter n={1} />
        <BoilFilter n={2} />
        <BoilFilter n={3} />
        <BoilFilter n={4} />
        <symbol id="rk-heart" viewBox="0 0 7 6">
          <path d={PIXEL_HEART_PATH} shapeRendering="crispEdges" />
        </symbol>
      </defs>
    </svg>
  );
}

/** Skip link: the first focusable element; jumps past the chrome to the tickets. */
export function SkipLink() {
  const href = sections.hopIn.show ? chrome.skipLink.href : "#rk-main";
  return (
    <a className="rk-skip" href={href}>
      {chrome.skipLink.label}
    </a>
  );
}

/** Corner button: the ticket action one click away on every screen. */
export function CornerButton() {
  return (
    <StickerButton href={ticketHref} variants={["small", "corner"]} cta="corner">
      {chrome.cornerButton}
    </StickerButton>
  );
}

/** Top links: three side doors that scroll away with the hero. */
export function TopLinks() {
  const { society, problem, mlai } = chrome.topLinks;
  const links = [
    sections.crew.show ? { ...society, href: society.href, variant: undefined } : null,
    problem.href ? { ...problem, href: problem.href, variant: undefined } : null,
    mlai.href ? { ...mlai, href: mlai.href, variant: "quiet" as const } : null,
  ].filter(link => link !== null);
  if (links.length === 0) return null;
  return (
    <div className="rk-top-links">
      {links.map(link => (
        <ChipLink
          key={link.label}
          href={link.href}
          arrow={link.arrow}
          rot={link.rot}
          variant={link.variant}
          cta={`top-${link.label.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "")}`}
        >
          {link.label}
        </ChipLink>
      ))}
    </div>
  );
}

/** Frame: the viewport as a framed print. */
export function Frame() {
  return <div className="rk-frame" aria-hidden="true" />;
}

/** Grain overlay: still speckle over the whole viewport (IMG-09). */
export function GrainOverlay() {
  return <div className="rk-grain-overlay" aria-hidden="true" />;
}

/** Chapter rail: ticks on the right edge, in page order. Hidden at 960 and below. */
export function Rail() {
  const stops = railOrder.map(key => sections[key]).filter(stop => stop.show);
  if (stops.length === 0) return null;
  return (
    <nav className="rk-rail" aria-label={chrome.rail.label}>
      {stops.map(stop => (
        <a key={stop.id} href={`#${stop.id}`}>
          <span className="rk-rail__label">{stop.label}</span>
          <i className="rk-rail__tick" aria-hidden="true" />
        </a>
      ))}
    </nav>
  );
}
