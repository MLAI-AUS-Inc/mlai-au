// Fair questions (#faq): the teal slab with torn edges, a giant misregistered
// question mark, the wall of pinned question cards and the "ask a human" strip
// with Cocky. Server-rendered, no client state.
// Spec: 06-faq-why.md. Styles: app/styles/kindness/faq-why.css.
import { faq, sections } from "~/data/kindness";
import { HopHeading, ShoutEyebrow, type Style } from "./ui";

/**
 * Card looks by position among the cards that render (header colour, header
 * text colour, tilt), so a hidden card leaves no gap in the pattern.
 */
const CARD_LOOKS = [
  { c: "var(--rk-yellow)", ct: "var(--rk-ink)", r: -1.2 },
  { c: "var(--rk-blue)", ct: "var(--rk-cream)", r: 1 },
  { c: "var(--rk-cream)", ct: "var(--rk-ink)", r: -0.6 },
  { c: "var(--rk-purple)", ct: "var(--rk-cream)", r: 1.4 },
  { c: "var(--rk-yellow)", ct: "var(--rk-ink)", r: -1.6 },
  { c: "var(--rk-blue)", ct: "var(--rk-cream)", r: 0.8 },
];

/** Cocky with the pixel-heart balloon (IMG-18), a 3:4 transparent sticker. */
const COCKY = {
  width: 480,
  height: 640,
  srcSet: "/kindness/cocky-balloon-100.webp 100w, /kindness/cocky-balloon-200.webp 200w, /kindness/cocky-balloon.webp 480w",
  sizes: "(max-width: 560px) 80px, 98px",
};

/** The hand-drawn "?" in a 200 by 300 box: a hook and a square dot. */
function QuestionMark() {
  return (
    <svg
      className="rk-faq__mark"
      viewBox="0 0 200 300"
      width="200"
      height="300"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M44 96C41 58 66 28 100 26C138 24 162 53 158 92C155 119 133 129 117 137C108 142 104 146 104 153L104 204"
        fill="none"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <rect x="88" y="244" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="12" />
    </svg>
  );
}

function AskStrip({ email }: { email: string }) {
  const { ask } = faq;
  return (
    <div className="rk-ask rk-reveal">
      <p className="rk-ask__strip">
        <img
          className="rk-ask__cocky"
          src={ask.cocky.src}
          srcSet={COCKY.srcSet}
          sizes={COCKY.sizes}
          width={COCKY.width}
          height={COCKY.height}
          alt={ask.cocky.alt}
          aria-hidden="true"
          loading="lazy"
          decoding="async"
        />
        <span className="rk-ask__label">
          {ask.label} <span aria-hidden="true">{ask.arrow}</span>
        </span>
        <a className="rk-ask__chip" href={`mailto:${email}`} data-rk-cta="faq-email">
          {email}
        </a>
      </p>
    </div>
  );
}

export default function Faq() {
  if (!sections.faq.show) return null;
  const titleId = `${sections.faq.id}-title`;
  // A card whose answer is unconfirmed (null) is not rendered at all.
  const cards = faq.items.filter((item): item is { q: string; a: string; extra?: string | null } => item.a !== null);

  return (
    <section
      id={sections.faq.id}
      className="rk-sec rk-torn rk-grain rk-grain--dark rk-grain--before rk-faq"
      aria-labelledby={titleId}
    >
      <QuestionMark />

      <header className="rk-faq__head">
        <ShoutEyebrow className="rk-faq__eyebrow rk-reveal">{faq.eyebrow}</ShoutEyebrow>
        <HopHeading lines={faq.title} id={titleId} className="rk-faq__title rk-reveal rk-reveal--cue" />
      </header>

      <div className="rk-faq__wall">
        {cards.map((item, i) => {
          const look = CARD_LOOKS[i % CARD_LOOKS.length];
          const answer = item.extra ? `${item.a} ${item.extra}` : item.a;
          return (
            <details
              className="rk-qa rk-reveal"
              open
              key={item.q}
              style={{ "--rk-i": i, "--rk-c": look.c, "--rk-ct": look.ct, "--rk-r": `${look.r}deg` } as Style}
            >
              <summary className="rk-qa__q">
                <span className="rk-qa__row">
                  <span className="rk-qa__n" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="rk-qa__text">{item.q}</span>
                  <span className="rk-qa__mark" aria-hidden="true" />
                </span>
              </summary>
              <p className="rk-qa__a">{answer}</p>
            </details>
          );
        })}
      </div>

      {faq.ask.email ? <AskStrip email={faq.ask.email} /> : null}
    </section>
  );
}
