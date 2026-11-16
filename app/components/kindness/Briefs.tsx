// The briefs (#briefs): the after-hours room. An ON AIR lamp sweeps its beam
// over sealed zines on a shelf, then the grand-final card, the countdown line
// and the pitch note. Server-rendered, no client state.
// Spec: 04-do-briefs.md. Styles: app/styles/kindness/do-briefs.css.
import { briefs, facts, sections } from "~/data/kindness";
import { HopHeading, ShoutEyebrow, Stamp, Tape, TextLink, cx, type Style } from "./ui";
import { PixelClipboard, SafetyPin } from "./do-art";

/** Intrinsic size of the four cover drawings (IMG-16). */
const COVER = { width: 480, height: 480 };

/**
 * Blurred placeholder lines on each sealed cover, cycled by index: word-shaped
 * groups of one repeated letter, never the real brief. Shorter zines get two.
 */
const HIDDEN_LINES = [
  ["XXXX XX XXXXXX", "XXX XXXXX XX"],
  ["XXXXX XXX XX", "XX XXXXXX XXX", "XXXX XXXXX"],
  ["XXX XXXXX XXXX", "XXXXXX XX XXX"],
  ["XX XXXXXX XXX", "XXXXX XXXX XX", "XXXXXX XXX"],
];

/** Cause areas longer than this wrap to two lines (rk-zine__cause--long). */
const CAUSE_NOWRAP_MAX = 18;

/** The copy deck writes "● SEALED"; the dot is drawn, so drop the glyph. */
function stripDot(text: string) {
  return text.replace(/^●\s*/, "");
}

function count(n: number, unit: string) {
  return `${n} ${unit}${n === 1 ? "" : "s"}`;
}

type Readout = { words: string; numbers: string | null; sr: string };

/**
 * The countdown line's text at render time. With no confirmed opening time it
 * shows the pending line (the day, never a time), or nothing when that is null.
 */
function readout(now: number): Readout | null {
  const { countdown } = briefs;
  const at = facts.fridayStartAt ? Date.parse(facts.fridayStartAt) : Number.NaN;
  if (Number.isNaN(at)) {
    return countdown.pendingLine
      ? { words: countdown.pendingLine, numbers: null, sr: countdown.pendingSr }
      : null;
  }
  const ms = at - now;
  if (ms <= 0) return { words: countdown.openedLine, numbers: null, sr: countdown.openedSr };
  const mins = Math.ceil(ms / 60000);
  const d = Math.floor(mins / 1440);
  const h = Math.floor((mins % 1440) / 60);
  const m = mins % 60;
  const pad = (v: number) => String(v).padStart(2, "0");
  return {
    words: countdown.prefix,
    numbers: `${d}d ${pad(h)}h ${pad(m)}m`,
    sr: `Briefs open in ${count(d, "day")}, ${count(h, "hour")} and ${count(m, "minute")}.`,
  };
}

function Countdown() {
  const r = readout(Date.now());
  if (!r) return null;
  // The numbers can differ by a minute between the server render and hydration;
  // the server's text stands (P2 rewrites it each minute).
  return (
    <p className="rk-briefs__countdown rk-reveal">
      <span aria-hidden="true">
        {r.words}
        {r.numbers ? (
          <>
            {" "}
            <span data-rk-countdown="" suppressHydrationWarning>
              {r.numbers}
            </span>
          </>
        ) : null}
        <span className="rk-briefs__cursor">_</span>
      </span>
      <span className="rk-sr" suppressHydrationWarning>
        {r.sr}
      </span>
    </p>
  );
}

function Zine({ item, i }: { item: (typeof briefs.items)[number]; i: number }) {
  const lines = HIDDEN_LINES[i % HIDDEN_LINES.length];
  return (
    <li className="rk-zine rk-reveal" style={{ "--rk-n": i } as Style}>
      <div className="rk-zine__shell">
        <div className="rk-zine__sleeve" aria-hidden="true" />
        <div className="rk-zine__cover">
          <img
            className="rk-zine__art"
            src={item.cover}
            width={COVER.width}
            height={COVER.height}
            alt=""
            loading="lazy"
            decoding="async"
          />
          <b className="rk-zine__no">{item.label}</b>
          {item.causeArea ? (
            <p className={cx("rk-zine__cause", item.causeArea.length > CAUSE_NOWRAP_MAX && "rk-zine__cause--long")}>
              {item.causeArea}
            </p>
          ) : null}
          <span className="rk-sr"> {briefs.statusSr}</span>
          <div className="rk-zine__body" aria-hidden="true">
            <div className="rk-zine__lines">
              {lines.map((line, li) => (
                <span className="rk-zine__line" key={li}>
                  {line}
                </span>
              ))}
              <i className="rk-zine__bar" />
              <i className="rk-zine__bar" />
            </div>
            <Stamp rot={-14} className="rk-zine__stamp">
              {briefs.stamp}
            </Stamp>
          </div>
        </div>
        <div className="rk-zine__tape" aria-hidden="true">
          <SafetyPin className="rk-zine__pin" />
        </div>
      </div>
    </li>
  );
}

export default function Briefs() {
  if (!sections.briefs.show) return null;
  const titleId = `${sections.briefs.id}-title`;
  const items = briefs.items;
  const cols = Math.min(items.length, 4);
  const wraps = items.length > 4;
  const { pitch } = briefs;

  return (
    <section id={sections.briefs.id} className="rk-sec rk-briefs" aria-labelledby={titleId}>
      {/* The lamp's beam: pivots on the sign's centre, sweeps over the zines. */}
      <i className="rk-onair__sweep" aria-hidden="true" />

      <div className="rk-briefs__wrap">
        <header className="rk-head rk-briefs__head">
          <span className="rk-onair" aria-hidden="true">
            <Tape cream small className="rk-onair__tape" />
            {briefs.onAir}
          </span>
          <ShoutEyebrow className="rk-briefs__eyebrow rk-reveal">
            <span>{briefs.eyebrow}</span>{" "}
            <span className="rk-briefs__status">
              <i className="rk-briefs__dot" aria-hidden="true" />
              {stripDot(briefs.sealedTag)}
            </span>
          </ShoutEyebrow>
          <div className="rk-briefs__title">
            <HopHeading lines={briefs.title} id={titleId} className="rk-reveal rk-reveal--cue" mark={1} />
            {/* The print-plate slip: the same lines with the same metrics, sliced in CSS. */}
            <span className="rk-briefs__misprint" aria-hidden="true">
              {briefs.title.map((line, li) => (
                <span className="rk-briefs__misprint-line" key={li}>
                  {line}
                </span>
              ))}
            </span>
          </div>
          <p className="rk-briefs__lede rk-reveal" style={{ "--rk-i": 1 } as Style}>
            {briefs.body}
          </p>
        </header>

        {items.length > 0 ? (
          <>
            <ul
              className={cx("rk-briefs__row", wraps && "rk-briefs__row--wrap")}
              style={{ "--rk-cols": cols } as Style}
            >
              {items.map((item, i) => (
                <Zine item={item} i={i} key={item.n} />
              ))}
            </ul>
            {wraps ? null : (
              <div className="rk-briefs__shelf" aria-hidden="true" style={{ "--rk-cols": cols } as Style} />
            )}
          </>
        ) : null}

        <p className="rk-briefs__grand rk-reveal">
          {briefs.grand.flatMap((part, i) => [
            i > 0 ? (
              <i className="rk-briefs__grand-dot" aria-hidden="true" key={`dot-${i}`}>
                ·
              </i>
            ) : null,
            <span key={i}>{part}</span>,
          ])}
        </p>

        <Countdown />

        {pitch.href ? (
          <p className="rk-briefs__pitch rk-reveal" style={{ "--rk-i": 1 } as Style}>
            <span className="rk-briefs__pitch-q">
              <PixelClipboard className="rk-briefs__pitch-icon" />
              {pitch.question}
            </span>
            <TextLink href={pitch.href} arrow={pitch.arrow} cta="pitch-a-problem" className="rk-briefs__pitch-link">
              {pitch.label}
            </TextLink>
          </p>
        ) : null}
      </div>
    </section>
  );
}
