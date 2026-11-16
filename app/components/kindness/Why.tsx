// Why (#why): back to night. The organisers' taped note with Roo peeking in at
// its corner, the four-line wood-type slogan with Cocky's megaphone, and the
// last ticket button. Server-rendered, no client state.
// Spec: 06-faq-why.md. Styles: app/styles/kindness/faq-why.css.
import { sections, ticketHref, why } from "~/data/kindness";
import { StickerButton, Sr, Tape, type Style } from "./ui";

/** Gig crowd (IMG-20): screen-blended and feathered by a radial mask. */
const CROWD = {
  width: 1456,
  height: 819,
  src: "/kindness/crowd-960.webp",
  srcSet: "/kindness/crowd-480.webp 480w, /kindness/crowd-960.webp 960w, /kindness/crowd.webp 1456w",
  // Mirrors the CSS widths: clamp(380px, 44vw, 700px) from 901px, clamp(420px, 56vw, 900px) below.
  sizes: "(min-width: 1591px) 700px, (min-width: 901px) 44vw, (min-width: 750px) 56vw, 420px",
};

/** Roo peek (IMG-19): a complete die-cut bust, square. */
const PEEK = {
  width: 480,
  height: 480,
  srcSet: "/kindness/roo-peek-160.webp 160w, /kindness/roo-peek-320.webp 320w, /kindness/roo-peek.webp 480w",
  // Mirrors clamp(84px, 8.5vw, 120px).
  sizes: "(min-width: 1412px) 120px, (min-width: 989px) 8.5vw, 84px",
};

/** Cocky's megaphone (IMG-04), side-on with the bell pointing left. */
const MEGAPHONE = { src: "/kindness/megaphone.webp", width: 660, height: 558 };

function Slogan() {
  let n = 0;
  return (
    <p className="rk-slogan rk-reveal rk-reveal--cue">
      <Sr>{why.slogan.sentence}</Sr>
      <img
        className="rk-slogan__mega"
        src={MEGAPHONE.src}
        width={MEGAPHONE.width}
        height={MEGAPHONE.height}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />
      <span className="rk-slogan__lines" aria-hidden="true">
        {why.slogan.lines.map(line => (
          <span className="rk-slogan__line" key={line.text} style={{ "--rk-w": line.w } as Style}>
            {Array.from(line.text).map((ch, ci) => (
              <span className="rk-slogan__ch" key={ci} style={{ "--rk-n": n++ } as Style}>
                {ch}
              </span>
            ))}
          </span>
        ))}
      </span>
    </p>
  );
}

function Note() {
  const signers = why.signers?.filter(Boolean) ?? [];
  return (
    <div className="rk-note rk-reveal">
      {/* The sticker precedes the paper: a sibling selector reveals the optional third name (P2). */}
      <span className="rk-peek" aria-hidden="true">
        <span className="rk-peek__in">
          <img
            className="rk-peek__img"
            src={why.peek.src}
            srcSet={PEEK.srcSet}
            sizes={PEEK.sizes}
            width={PEEK.width}
            height={PEEK.height}
            alt={why.peek.alt}
            loading="lazy"
            decoding="async"
          />
          <span className="rk-peek__say">{why.peekTag}</span>
        </span>
      </span>
      <div className="rk-note__paper">
        <Tape className="rk-note__tape rk-note__tape--l" />
        <Tape cream className="rk-note__tape rk-note__tape--r" />
        <blockquote className="rk-note__text">
          {why.note.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </blockquote>
        {signers.length > 0 ? (
          <p className="rk-note__by">
            {signers.map(name => (
              <span key={name}>{name}</span>
            ))}
            {why.peekSigns && why.peekName ? <small className="rk-note__third">{why.peekName}</small> : null}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default function Why() {
  if (!sections.why.show) return null;
  const labelId = `${sections.why.id}-label`;

  return (
    <section id={sections.why.id} className="rk-sec rk-haze rk-why" aria-labelledby={labelId}>
      <img
        className="rk-why__crowd"
        src={CROWD.src}
        srcSet={CROWD.srcSet}
        sizes={CROWD.sizes}
        width={CROWD.width}
        height={CROWD.height}
        alt={why.crowd.alt}
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />

      <div className="rk-why__poster">
        <h2 className="rk-why__label rk-reveal" id={labelId}>
          {why.label}
        </h2>
        <Note />
        <Slogan />
      </div>

      <div className="rk-why__go rk-reveal">
        <StickerButton href={ticketHref} variants={["hero", "halo"]} cta="why">
          {why.button}
        </StickerButton>
      </div>
    </section>
  );
}
