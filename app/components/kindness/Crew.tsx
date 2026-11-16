// Your crew (#crew): the pitch to societies and meetups, and the battle vest
// that community patches land on (03-win-crew.md). Server-rendered, no client
// state. Styles: app/styles/kindness/win-crew.css.
import type { ReactNode } from "react";
import { crew, sections } from "~/data/kindness";
import { Eyebrow, HopHeading, PixelHeartUse, Sr, StickerButton, Tape, TextLink, cx, type Style } from "./ui";

type Community = (typeof crew.communities)[number];
type Field = NonNullable<Community["field"]>;

/**
 * Logo slots on the 10:13 vest (Patch slots, layering and sequence): centre x
 * and y in % of the vest, width in cqw, tilt in degrees. `field` is the default
 * patch colour, `spare` the width a spare decorative patch takes in the slot.
 */
const SLOTS: ReadonlyArray<{
  n: number;
  x: number;
  y: number;
  w: number;
  r: number;
  field: Field;
  spare: number;
  pill?: boolean;
  bare?: boolean;
  pinned?: boolean;
}> = [
  { n: 5, x: 32, y: 33, w: 22, r: 4, field: "ink-2", spare: 17 },
  { n: 6, x: 63, y: 34, w: 31, r: 5, field: "cream", spare: 16 },
  { n: 7, x: 47, y: 76, w: 25, r: -6, field: "blue", spare: 17, pinned: true },
  { n: 8, x: 27, y: 76, w: 19, r: 6, field: "teal", spare: 15 },
  { n: 9, x: 72, y: 49, w: 19, r: 8, field: "ink", spare: 15, bare: true },
  { n: 10, x: 34, y: 48, w: 27, r: -4, field: "purple", spare: 16, pinned: true },
  { n: 11, x: 69, y: 89, w: 27, r: -10, field: "yellow", spare: 14, pill: true },
  { n: 12, x: 37, y: 89, w: 37, r: 3, field: "ink", spare: 14, pill: true },
  { n: 13, x: 70, y: 74, w: 26, r: 8, field: "cream-2", spare: 16, pinned: true },
  { n: 14, x: 34, y: 62, w: 29, r: -3, field: "blue", spare: 15 },
  { n: 15, x: 67, y: 61, w: 32, r: 4, field: "ink-2", spare: 16 },
];

/** The four decorative patches that are always on the vest: sheet cells 0 to 3. */
const DECOS = [
  { n: 1, x: 25, y: 19.5, w: 12, r: -12 },
  { n: 2, x: 76, y: 19.5, w: 11, r: 14 },
  { n: 3, x: 56, y: 47, w: 11, r: 9 },
  { n: 4, x: 52, y: 63, w: 9, r: -7 },
];

/** Sheet cells 4 to 7 fill empty logo slots, in slot order. */
const SPARE_CELLS = [4, 5, 6, 7];

function opensTab(href: string) {
  return /^https?:\/\//.test(href) && !href.startsWith("https://mlai.au/");
}

function patchStyle(p: { n: number; x: number; y: number; w: number | "auto"; r: number }, extra?: Style): Style {
  return {
    "--rk-patch-x": `${p.x}%`,
    "--rk-patch-y": `${p.y}%`,
    "--rk-patch-w": p.w === "auto" ? "max-content" : `${p.w}cqw`,
    "--rk-patch-r": `${p.r}deg`,
    "--rk-n": p.n,
    ...extra,
  } as Style;
}

function spriteStyle(cell: number): Style {
  return { "--rk-sprite-col": cell % 4, "--rk-sprite-row": Math.floor(cell / 4) } as Style;
}

/** A hand-drawn safety pin, one cream stroke, for pinned patches. */
function SafetyPin() {
  return (
    <svg className="rk-patch__pin" viewBox="0 0 72 24" width="72" height="24" aria-hidden="true" focusable="false">
      <path
        d="M61 5.5H23.5C15 5.5 7 7 6.5 12.5c-.4 4.6 6.2 5.6 9.2 2.4 2.6-2.8-.4-6.4-3.4-4.6M15.5 15.6c10.5 3.8 27 3.6 43 1.6M55 3.2h10.6c3.2 0 4.6 1.8 4.6 4.6v5.8c0 3-2 4.8-5.2 4.4l-7.6-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** One community patch: the logo file on a sewn field, linked when the community has a link. */
function CommunityPatch({ community, slot }: { community: Community; slot: (typeof SLOTS)[number] }) {
  const bare = community.bare ?? slot.bare ?? false;
  const shape = community.shape ?? (slot.pill ? "pill" : undefined);
  const field = community.field ?? slot.field;
  const logo = community.src ? (
    <img
      className="rk-patch__logo"
      src={community.src}
      width={community.width}
      height={community.height}
      alt={community.name}
      loading="lazy"
      decoding="async"
    />
  ) : (
    <span className="rk-patch__name">{community.name}</span>
  );
  const url = community.url ?? null;
  const external = url ? opensTab(url) : false;
  let content: ReactNode = logo;
  if (url) {
    content = (
      <a className="rk-patch__link" href={url} {...(external ? { target: "_blank", rel: "noopener" } : {})}>
        {logo}
        {external ? <Sr> (opens in a new tab)</Sr> : null}
      </a>
    );
  }
  return (
    <li
      className={cx(
        "rk-patch",
        !bare && `rk-patch--${field}`,
        shape && `rk-patch--${shape}`,
        community.mono && "rk-patch--mono",
        community.crop && "rk-patch--crop",
        bare && "rk-patch--bare",
        slot.pinned && "rk-patch--pinned",
        url && "rk-patch--linked"
      )}
      style={patchStyle(slot)}
    >
      {content}
      {slot.pinned ? <SafetyPin /> : null}
    </li>
  );
}

/** The vest's pieces in landing order: name tape, decorations, then the logo slots. */
function VestPieces() {
  const communities = crew.communities;
  const placed = new Map<number, Community>();
  const waiting: Community[] = [];

  // Communities that name a slot take it first; the rest fill free slots in order.
  for (const c of communities) {
    const slot = SLOTS[(c.slot ?? 0) - 1];
    if (slot && !placed.has(slot.n)) placed.set(slot.n, c);
    else waiting.push(c);
  }
  const extras: Community[] = [];
  for (const c of waiting) {
    const free = SLOTS.find(s => !placed.has(s.n));
    if (free) placed.set(free.n, c);
    else extras.push(c);
  }

  let spare = 0;
  const slots = SLOTS.map(slot => {
    const community = placed.get(slot.n);
    if (community) return <CommunityPatch key={slot.n} community={community} slot={slot} />;
    const cell = SPARE_CELLS[spare++];
    if (cell === undefined) return null;
    return (
      <li
        key={slot.n}
        className="rk-patch rk-patch--deco"
        aria-hidden="true"
        style={patchStyle({ ...slot, w: slot.spare }, spriteStyle(cell))}
      />
    );
  });

  return (
    <>
      <li
        className="rk-patch rk-patch--label"
        aria-hidden="true"
        style={patchStyle({ n: 0, x: 50, y: 20, w: "auto", r: -6 })}
      >
        {crew.vest.nameTape.map(line => (
          <span key={line}>{line}</span>
        ))}
      </li>
      {DECOS.map((deco, i) => (
        <li
          key={`deco-${deco.n}`}
          className="rk-patch rk-patch--deco"
          aria-hidden="true"
          style={patchStyle(deco, spriteStyle(i))}
        />
      ))}
      {slots}
      {extras.map(c => (
        <li key={`sr-${c.name}`} className="rk-sr">
          {c.name}
        </li>
      ))}
    </>
  );
}

export default function Crew() {
  if (!sections.crew.show) return null;

  const { eyebrow, title, body, button, note, vest, communities } = crew;
  const titleId = `${sections.crew.id}-title`;
  const href = button.href;
  const srcSet = vest.srcSet.map(v => `${v.src} ${v.width}w`).join(", ");

  return (
    <section id={sections.crew.id} className="rk-crew" aria-labelledby={titleId}>
      <div className="rk-crew__in">
        <div className="rk-crew__copy">
          <Eyebrow className="rk-reveal">{eyebrow}</Eyebrow>
          <HopHeading
            lines={title}
            id={titleId}
            mark={title.length > 1 ? title.length - 1 : undefined}
            className="rk-crew__title rk-reveal rk-reveal--cue"
          />
          <p className="rk-crew__body rk-reveal" style={{ "--rk-i": 1 } as Style}>
            {body}
          </p>
          {href ? (
            <>
              <StickerButton
                href={href}
                variants={["crew"]}
                cta="crew-vest"
                icon="arrow"
                newTab={opensTab(href)}
                className="rk-crew__btn"
              >
                {button.label}
              </StickerButton>
              <p className="rk-crew__note rk-reveal" style={{ "--rk-i": 2 } as Style}>
                {note.lead}{" "}
                <TextLink href={href} small cta="crew-ask">
                  {note.link}
                </TextLink>{" "}
                {note.tail}
              </p>
            </>
          ) : null}
        </div>

        <div className="rk-vest rk-reveal rk-reveal--cue">
          <img
            className="rk-vest__img"
            src={vest.src}
            srcSet={srcSet}
            sizes="(min-width: 901px) 500px, (min-width: 561px) 460px, calc(100vw - 56px)"
            width={vest.width}
            height={vest.height}
            alt={vest.alt}
            loading="lazy"
            decoding="async"
          />
          <PixelHeartUse className="rk-vest__heart" />
          <Tape className="rk-vest__tape rk-vest__tape--l" />
          <Tape className="rk-vest__tape rk-vest__tape--r" />
          <ul
            className="rk-vest__list"
            {...(communities.length > 0 ? { "aria-label": vest.listLabel } : { "aria-hidden": true })}
          >
            <VestPieces />
          </ul>
        </div>
      </div>
    </section>
  );
}
