import { useCallback, useEffect, useRef, useState } from "react";
import type { LinksFunction, MetaFunction } from "react-router";
import {
  PK_ASSETS, PK_BOILER_LONG, PK_BOILER_SHORT, PK_CONTACT, PK_DOS, PK_DONTS,
  PK_EVENTS, PK_FACTS, PK_FACTS_ROWS, PK_FONTS, PK_PALETTE, PK_PRESS,
  PK_QUOTE, PK_SOCIAL, PK_TEAM, PK_ZIP_README,
  type PkAsset, type PkColor,
} from "~/data/press-kit";

/* ============================================================
   MLAI PRESS KIT — Media & Brand Kit page (/press-kit)
   Ported from the Claude Design handoff (design_handoff_press_kit).
   Embeds inside the site shell (global sidebar + site footer stay);
   the page itself has no nav/footer — a sticky JUMP TO rail and a
   centered download CTA instead. Styles scoped under `.pk-scope`
   in app/styles/press-kit.css. Content in app/data/press-kit.ts.
   ============================================================ */

const SITE = "https://mlai.au";
const PAGE_URL = `${SITE}/press-kit`;
const DESCRIPTION =
  "The official MLAI media & brand kit — copy-paste boilerplate, key facts, downloadable logos and Roo mascot assets, brand colours, typography, team, press mentions and contact details.";

export const meta: MetaFunction = () => [
  { title: "Press Kit — MLAI Media & Brand Kit | MLAI" },
  { name: "description", content: DESCRIPTION },
  { name: "robots", content: "index, follow, max-image-preview:large" },
  { property: "og:type", content: "website" },
  { property: "og:site_name", content: "MLAI" },
  { property: "og:url", content: PAGE_URL },
  { property: "og:title", content: "MLAI Press Kit — logos, boilerplate, facts & contacts" },
  { property: "og:description", content: DESCRIPTION },
  { property: "og:image", content: `${SITE}/press-kit/mascot-teal.png` },
  { property: "og:locale", content: "en_AU" },
  { name: "twitter:card", content: "summary" },
  {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: "MLAI Press Kit — Media & Brand Kit",
      description: DESCRIPTION,
      inLanguage: "en-AU",
      about: {
        "@type": "Organization",
        name: "MLAI",
        url: SITE,
        email: PK_CONTACT.email,
        foundingDate: "2023",
        location: { "@type": "Place", name: "Melbourne, VIC, Australia" },
        description:
          "Not-for-profit, volunteer-run AI community of 12,000+ builders on a mission to help create 1,000 Australian startups by 2030.",
        sameAs: PK_SOCIAL.map((s) => s.href),
      },
    },
  },
];

/* Source Serif 4 (pull-quotes) — loaded only on this route. */
export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@1,8..60,400..600&display=swap",
  },
];

const asset = (file: string) => `/press-kit/${file}`;

/* ---------- toast system ---------- */
type Toast = { id: string; msg: string };

function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const push = useCallback((msg: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((x) => [...x, { id, msg }]);
    setTimeout(() => setToasts((x) => x.filter((i) => i.id !== id)), 2200);
  }, []);
  return { toasts, push };
}

/* ---------- clipboard / download utils ---------- */
function copyText(text: string, done: () => void) {
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
  } else {
    fallbackCopy(text, done);
  }
}
function fallbackCopy(text: string, done: () => void) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand("copy"); done(); } catch { /* ignore */ }
  document.body.removeChild(ta);
}

/* ---------- icons (monoline, on-brand) ---------- */
function Ico({ name, size = 16, stroke = 2.4 }: { name: string; size?: number; stroke?: number }) {
  const paths: Record<string, React.ReactNode> = {
    copy: <><rect x="9" y="9" width="11" height="11" rx="2.5" /><path d="M5 15V6a2 2 0 0 1 2-2h8" /></>,
    download: <><path d="M12 4v11" /><path d="M7 11l5 5 5-5" /><path d="M5 20h14" /></>,
    arrow: <><path d="M5 12h13" /><path d="M12 5l7 7-7 7" /></>,
    check: <path d="M5 12.5l4.5 4.5L19 7" />,
    x: <><path d="M6 6l12 12" /><path d="M18 6L6 18" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      {paths[name] || null}
    </svg>
  );
}

/* ---------- section scaffold ---------- */
function Section({
  id, eyebrow, title, sub, dark, children,
}: {
  id: string; eyebrow: string; title: string; sub: string; dark?: boolean; children: React.ReactNode;
}) {
  return (
    <section id={id} className={`pk-section${dark ? " band-ink" : ""}`}>
      <div className="pk-wrap">
        <div className="eyebrow">{eyebrow}</div>
        <div className="sec-head"><h2 className="disp">{title}</h2></div>
        <p className="sec-sub">{sub}</p>
        <div style={{ marginTop: 24 }}>{children}</div>
      </div>
    </section>
  );
}

function CopyBtn({
  text, label, copyLabel, variant = "ghost", size, onCopied,
}: {
  text: string; label?: string; copyLabel: string;
  variant?: string; size?: string; onCopied: (msg: string) => void;
}) {
  return (
    <button
      className={`btn btn--${variant}${size ? ` btn--${size}` : ""}`}
      onClick={() => copyText(text, () => onCopied(`${copyLabel} ✓`))}
      type="button"
    >
      <Ico name="copy" /> {label || "Copy"}
    </button>
  );
}

/* ---------- JUMP TO rail (position-based scroll-spy) ---------- */
const PK_JUMP = [
  { id: "about", label: "About MLAI" },
  { id: "facts", label: "Key facts" },
  { id: "logos", label: "Logos & mascot" },
  { id: "colours", label: "Colours & type" },
  { id: "team", label: "The team" },
  { id: "press", label: "Press & mentions" },
  { id: "events", label: "Events" },
  { id: "contact", label: "Contact" },
];

function jumpTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function JumpTo() {
  const [active, setActive] = useState("about");
  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * 0.28;
      let current = PK_JUMP[0].id;
      for (const j of PK_JUMP) {
        const el = document.getElementById(j.id);
        if (el && el.getBoundingClientRect().top <= line) current = j.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <aside className="pk-jumpto">
      <div className="jt-kicker">Jump to</div>
      <nav>
        {PK_JUMP.map((j) => (
          <a
            key={j.id}
            href={`#${j.id}`}
            className={active === j.id ? "active" : ""}
            onClick={(e) => { e.preventDefault(); jumpTo(j.id); }}
          >
            {j.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}

/* ---------- HERO (arcade) ---------- */
const HERO_PILLS = ["#ff3c00", "#00ffd7", "#4b0db3", "#ff003d", "#3637dc", "#fefc22"];

function Hero({ onDownloadAll }: { onDownloadAll: () => void }) {
  return (
    <section className="band-ink" style={{ paddingTop: 56, paddingBottom: 64, overflow: "hidden" }}>
      <div className="pk-wrap pk-hero-grid">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22, flexWrap: "wrap" }}>
            <span className="pill pill--teal">
              <span style={{ width: 7, height: 7, borderRadius: 99, background: "var(--ink)", display: "inline-block" }} />
              {" "}Media &amp; Brand Kit
            </span>
            <span style={{ fontFamily: "var(--fb)", fontWeight: 700, fontSize: 12.5, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--cream-soft)" }}>
              Come for the AI · Stay for the community
            </span>
          </div>
          <h1 className="disp" style={{ fontSize: "clamp(64px, 12vw, 168px)", color: "var(--cream)", letterSpacing: "-.02em" }}>
            Press<br /><span style={{ color: "var(--pk-accent)" }}>Kit</span>
          </h1>
          <p style={{ fontFamily: "var(--fb)", fontSize: 18, lineHeight: 1.55, color: "var(--cream-soft)", maxWidth: "52ch", marginTop: 22 }}>
            Everything you need to write about <strong style={{ color: "var(--cream)" }}>MLAI</strong> — logos,
            the Roo, colours, boilerplate, facts and contacts. Grab it, remix it, ship it.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 30 }}>
            <button className="btn btn--hot btn--lg" onClick={onDownloadAll} type="button">
              <Ico name="download" size={19} /> Download all assets
            </button>
            <a className="btn btn--ghost btn--lg" href="#contact" onClick={(e) => { e.preventDefault(); jumpTo("contact"); }}>
              Contact <Ico name="arrow" size={19} />
            </a>
          </div>
          <div style={{ marginTop: 30, display: "flex", gap: 6 }}>
            {HERO_PILLS.map((c, i) => (
              <span key={c} className="coin-blink" style={{ width: 30, height: 14, borderRadius: 99, background: c, animationDelay: `${i * 0.12}s` }} />
            ))}
          </div>
        </div>
        <div className="pk-hero-mascot" style={{ position: "relative", width: "min(40vw, 420px)", flexShrink: 0 }}>
          <div style={{ position: "absolute", inset: "-6%", borderRadius: "50%", background: "radial-gradient(circle at 50% 45%, rgba(0,255,215,.18), transparent 62%)" }} />
          <img src={asset("mascot-teal.png")} alt="Roo — the MLAI mascot" className="roo-float" style={{ width: "100%", position: "relative" }} />
        </div>
      </div>
    </section>
  );
}

/* ---------- ABOUT / BOILERPLATE ---------- */
function AboutSection({ toast }: { toast: (m: string) => void }) {
  return (
    <Section id="about" eyebrow="Boilerplate" title="Who is MLAI?"
      sub="Copy-paste-ready descriptions. Hit copy, drop it in your article.">
      <div className="grid cols-2" style={{ alignItems: "start" }}>
        <div className="card" style={{ background: "var(--ink)", color: "var(--cream)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 14 }}>
            <span className="pill pill--teal">Short · ~80 words</span>
            <CopyBtn text={PK_BOILER_SHORT} copyLabel="Short bio copied" variant="cream" size="sm" onCopied={toast} />
          </div>
          <p style={{ fontFamily: "var(--fb)", fontSize: 16.5, lineHeight: 1.62, color: "var(--cream-soft)", margin: 0 }}>{PK_BOILER_SHORT}</p>
        </div>
        <div className="card" style={{ background: "var(--cream)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 14 }}>
            <span className="pill pill--ink">Long · ~160 words</span>
            <CopyBtn text={PK_BOILER_LONG} copyLabel="Long bio copied" variant="ink" size="sm" onCopied={toast} />
          </div>
          {PK_BOILER_LONG.split("\n\n").map((p, i) => (
            <p key={i} style={{ fontFamily: "var(--fb)", fontSize: 15.5, lineHeight: 1.6, color: "var(--ink3)", margin: "0 0 12px" }}>{p}</p>
          ))}
        </div>
      </div>
      <div className="card" style={{ background: "var(--yellow)", marginTop: 18, display: "flex", gap: 22, alignItems: "center", flexWrap: "wrap" }}>
        <blockquote className="pk-quote" style={{ margin: 0, flex: 1, minWidth: 280, fontSize: 24, lineHeight: 1.35 }}>
          &ldquo;{PK_QUOTE.text}&rdquo;
        </blockquote>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-start" }}>
          <span style={{ fontFamily: "var(--fb)", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: ".06em" }}>{PK_QUOTE.who}</span>
          <CopyBtn text={PK_QUOTE.text} label="Copy quote" copyLabel="Quote copied" variant="ink" size="sm" onCopied={toast} />
        </div>
      </div>
    </Section>
  );
}

/* ---------- KEY FACTS ---------- */
function FactsSection() {
  return (
    <Section id="facts" eyebrow="Key facts" title="The numbers" dark
      sub="The fast facts — and the one mission everything ladders up to.">
      <div className="grid cols-4">
        {PK_FACTS.map((f) => (
          <div key={f.big} style={{ background: f.c, color: f.t, borderRadius: "var(--radius)", padding: "26px 24px 22px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 178 }}>
            <div className="disp" style={{ fontSize: "clamp(34px, 6vw, 56px)", color: f.t, minWidth: 0, letterSpacing: "-0.02em" }}>{f.big}</div>
            <div style={{ fontFamily: "var(--fb)", fontWeight: 600, fontSize: 14.5, lineHeight: 1.3, marginTop: 12 }}>{f.label}</div>
          </div>
        ))}
      </div>
      <div className="card" style={{ background: "var(--ink2)", marginTop: 18, padding: 0, overflow: "hidden" }}>
        {PK_FACTS_ROWS.map((r, i) => (
          <div key={r[0]} style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 16, padding: "16px 26px", borderTop: i ? "1.5px solid rgba(245,240,230,.1)" : "none", alignItems: "baseline" }}>
            <span style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: 15, textTransform: "uppercase", letterSpacing: ".03em", color: "var(--teal)" }}>{r[0]}</span>
            <span style={{ fontFamily: "var(--fb)", fontSize: 15.5, color: "var(--cream-soft)" }}>{r[1]}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- LOGOS & MASCOT ---------- */
function LogoCard({ a, onDownload }: { a: PkAsset; onDownload: (file: string) => void }) {
  return (
    <div className="card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ background: a.bg === "ink" ? "var(--ink)" : "var(--cream)", padding: 26, minHeight: 178, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={asset(a.file)} alt={a.name} style={{ maxHeight: 130, maxWidth: "82%", objectFit: "contain" }} loading="lazy" />
      </div>
      <div style={{ padding: "16px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <div>
          <div style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: 16, textTransform: "uppercase", color: "var(--ink)" }}>{a.name}</div>
          <div style={{ fontFamily: "var(--fb)", fontSize: 12.5, color: "var(--ink3)", marginTop: 2 }}>{a.note} · PNG</div>
        </div>
        <button className="btn btn--ink btn--sm" onClick={() => onDownload(a.file)} aria-label={`Download ${a.name}`} type="button">
          <Ico name="download" /> PNG
        </button>
      </div>
    </div>
  );
}

function LogosSection({ onDownloadAll, onDownload }: { onDownloadAll: () => void; onDownload: (file: string) => void }) {
  return (
    <Section id="logos" eyebrow="Logos & mascot" title="Grab the Roo"
      sub="Nine ready-to-use assets — transparent PNGs. Click to download, or take the lot.">
      <div style={{ display: "flex", gap: 12, marginBottom: 22, flexWrap: "wrap" }}>
        <button className="btn btn--hot" onClick={onDownloadAll} type="button"><Ico name="download" /> Download all (.zip)</button>
      </div>
      <div className="grid cols-3">
        {PK_ASSETS.map((a) => <LogoCard key={a.file} a={a} onDownload={onDownload} />)}
      </div>

      <div className="grid cols-2" style={{ marginTop: 22 }}>
        <div className="card" style={{ background: "var(--teal)" }}>
          <div className="disp" style={{ fontSize: 26, display: "flex", alignItems: "center", gap: 10, color: "var(--ink)" }}><Ico name="check" size={22} /> Do</div>
          <ul style={{ listStyle: "none", padding: 0, margin: "14px 0 0", display: "flex", flexDirection: "column", gap: 11 }}>
            {PK_DOS.map((d) => (
              <li key={d} style={{ display: "flex", gap: 10, fontFamily: "var(--fb)", fontSize: 15, lineHeight: 1.45, color: "var(--ink)" }}>
                <Ico name="check" size={18} /> <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card" style={{ background: "var(--ink)", color: "var(--cream)" }}>
          <div className="disp" style={{ fontSize: 26, display: "flex", alignItems: "center", gap: 10, color: "var(--red)" }}><Ico name="x" size={22} /> Don&apos;t</div>
          <ul style={{ listStyle: "none", padding: 0, margin: "14px 0 0", display: "flex", flexDirection: "column", gap: 11 }}>
            {PK_DONTS.map((d) => (
              <li key={d} style={{ display: "flex", gap: 10, fontFamily: "var(--fb)", fontSize: 15, lineHeight: 1.45, color: "var(--cream-soft)" }}>
                <span style={{ color: "var(--red)", display: "flex" }}><Ico name="x" size={18} /></span> <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* ---------- COLOURS & TYPE ---------- */
function Swatch({ c, toast }: { c: PkColor; toast: (m: string) => void }) {
  const [lifted, setLifted] = useState(false);
  return (
    <button
      onClick={() => copyText(c.hex.toUpperCase(), () => toast(`${c.hex.toUpperCase()} copied ✓`))}
      onMouseEnter={() => setLifted(true)}
      onMouseLeave={() => setLifted(false)}
      style={{ textAlign: "left", border: "none", cursor: "pointer", padding: 0, background: "transparent", borderRadius: "var(--radius-sm)" }}
      type="button"
    >
      <div style={{
        background: c.hex, color: c.t, borderRadius: "var(--radius-sm)", padding: "20px 18px", minHeight: 124,
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        border: c.hex === "#f5f0e6" ? "1.5px solid var(--cream2)" : "none",
        transition: "transform .12s ease", transform: lifted ? "translateY(-3px)" : "none",
      }}>
        <span style={{ fontFamily: "var(--fb)", fontSize: 12, fontWeight: 700, opacity: .85 }}>{c.role}</span>
        <div>
          <div style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: 18, textTransform: "uppercase", lineHeight: 1 }}>{c.name}</div>
          <div style={{ fontFamily: "var(--fb)", fontSize: 13.5, marginTop: 4, display: "flex", alignItems: "center", gap: 6, opacity: .9 }}>
            <Ico name="copy" size={13} /> {c.hex.toUpperCase()}
          </div>
        </div>
      </div>
    </button>
  );
}

function ColoursSection({ toast }: { toast: (m: string) => void }) {
  const allHex = PK_PALETTE.map((c) => `${c.name}: ${c.hex.toUpperCase()}`).join("\n");
  return (
    <Section id="colours" eyebrow="Colours & type" title="The palette"
      sub="Flat colour, no gradients. Click any swatch to copy its hex.">
      <div style={{ display: "flex", gap: 12, marginBottom: 22, flexWrap: "wrap" }}>
        <CopyBtn text={allHex} label="Copy all hex" copyLabel="All hex copied" variant="ink" onCopied={toast} />
      </div>
      <div className="grid cols-4">
        {PK_PALETTE.map((c) => <Swatch key={c.hex} c={c} toast={toast} />)}
      </div>

      <div className="sec-head" style={{ marginTop: 44 }}>
        <div className="eyebrow">Typefaces</div>
        <h3 className="disp" style={{ fontSize: "clamp(28px,4vw,40px)", marginTop: 12 }}>Three fonts, one voice</h3>
      </div>
      <div className="grid cols-3" style={{ marginTop: 8 }}>
        {PK_FONTS.map((f) => (
          <div key={f.name} className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 220 }}>
            <div style={{ fontFamily: f.ff, fontWeight: f.weight, fontStyle: f.style, fontSize: f.size, textTransform: f.tt, lineHeight: 1.04, color: "var(--ink)" }}>{f.sample}</div>
            <div style={{ marginTop: 18 }}>
              <div style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: 20, textTransform: "uppercase", color: "var(--ink)" }}>{f.name}</div>
              <div style={{ fontFamily: "var(--fb)", fontSize: 13, color: "var(--ink3)", marginTop: 3 }}>{f.role}</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- TEAM ---------- */
function TeamSection() {
  return (
    <Section id="team" eyebrow="The crew" title="Meet the team"
      sub="The volunteer crew keeping MLAI running, building and shipping across Australia.">
      <div className="grid cols-3">
        {PK_TEAM.map((m) => (
          <div key={m.name} className="card" style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <img src={asset(m.img)} alt={m.name} style={{ width: 76, height: 76, borderRadius: 999, objectFit: "cover", flexShrink: 0 }} loading="lazy" />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: 19, textTransform: "uppercase", color: "var(--ink)" }}>{m.name}</div>
              <div style={{ fontFamily: "var(--fb)", fontWeight: 700, fontSize: 12.5, textTransform: "uppercase", letterSpacing: ".05em", color: "var(--orange)", marginTop: 2 }}>{m.role}</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- PRESS & MENTIONS ---------- */
function PressSection({ toast }: { toast: (m: string) => void }) {
  return (
    <Section id="press" eyebrow="In the wild" title="Press & mentions"
      sub="Selected media coverage and mentions of MLAI. For interviews, quotes or data, contact our press inbox.">
      <div className="grid cols-3">
        {PK_PRESS.map((p) => (
          <div key={p.outlet} className="card" style={{ display: "flex", flexDirection: "column", gap: 16, minHeight: 200 }}>
            <img src={asset(p.img)} alt={p.outlet} style={{ width: 48, height: 48, borderRadius: 999, objectFit: "cover" }} loading="lazy" />
            <p className="pk-quote" style={{ margin: 0, fontSize: 18, lineHeight: 1.4, flex: 1 }}>&ldquo;{p.quote}&rdquo;</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <span style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: 16, textTransform: "uppercase", color: "var(--ink)" }}>{p.outlet}</span>
              <CopyBtn text={`“${p.quote}” — ${p.outlet}`} copyLabel="Quote copied" variant="ghost" size="sm" onCopied={toast} />
            </div>
          </div>
        ))}
      </div>
      <div className="card" style={{ background: "var(--ink)", color: "var(--cream)", marginTop: 16, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <span style={{ fontFamily: "var(--fb)", fontSize: 15, color: "var(--cream-soft)" }}>
          Writing about MLAI? We&apos;d love to help — quotes, data, interviews.
        </span>
        <a className="btn btn--accent btn--sm" href="#contact" onClick={(e) => { e.preventDefault(); jumpTo("contact"); }}>
          Get in touch <Ico name="arrow" />
        </a>
      </div>
    </Section>
  );
}

/* ---------- EVENTS ---------- */
function EventsSection() {
  return (
    <Section id="events" eyebrow="Community" title="What we run" dark
      sub="MLAI is built in the room — here's where the community shows up.">
      <div className="grid cols-2">
        {PK_EVENTS.map((e) => (
          <div key={e.title} style={{ background: e.c, color: e.t, borderRadius: "var(--radius)", padding: 28, display: "flex", flexDirection: "column", gap: 10, minHeight: 168 }}>
            <span style={{ alignSelf: "flex-start", fontFamily: "var(--fb)", fontWeight: 800, fontSize: 11.5, letterSpacing: ".12em", textTransform: "uppercase", opacity: .8 }}>{e.tag}</span>
            <div className="disp" style={{ fontSize: 30, color: e.t }}>{e.title}</div>
            <p style={{ fontFamily: "var(--fb)", fontSize: 15, lineHeight: 1.5, margin: 0, opacity: .92 }}>{e.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- CONTACT & SOCIALS ---------- */
function ContactSection({ toast }: { toast: (m: string) => void }) {
  const [lifted, setLifted] = useState<string | null>(null);
  return (
    <Section id="contact" eyebrow="Say hi" title="Contact & socials"
      sub="Press enquiries, partnerships, or just keen to jump aboard the pirate ship.">
      <div className="grid cols-2" style={{ alignItems: "stretch" }}>
        <div style={{ background: "var(--ink)", color: "var(--cream)", borderRadius: "var(--radius)", padding: 30, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 18 }}>
          <div>
            <div className="eyebrow" style={{ color: "var(--teal)" }}>Press contact</div>
            <div className="disp" style={{ fontSize: 30, color: "var(--cream)", marginTop: 10 }}>{PK_CONTACT.name}</div>
            <a href={`mailto:${PK_CONTACT.email}`} style={{ fontFamily: "var(--fb)", fontWeight: 700, fontSize: 19, color: "var(--cream)", textDecoration: "underline", display: "inline-block", marginTop: 8 }}>
              {PK_CONTACT.email}
            </a>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a className="btn btn--accent btn--sm" href={`mailto:${PK_CONTACT.email}?subject=Press%20Inquiry`}>
              <Ico name="arrow" /> Email us
            </a>
            <CopyBtn text={PK_CONTACT.email} label="Copy email" copyLabel="Email copied" variant="cream" size="sm" onCopied={toast} />
          </div>
        </div>
        <div className="grid cols-2" style={{ gap: 14 }}>
          {PK_SOCIAL.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setLifted(s.label)}
              onMouseLeave={() => setLifted(null)}
              style={{
                background: s.c, color: s.t, borderRadius: "var(--radius)", padding: "20px 22px", textDecoration: "none",
                display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 14, minHeight: 118,
                transition: "transform .12s ease", transform: lifted === s.label ? "translateY(-3px)" : "none",
              }}
            >
              <span className="disp" style={{ fontSize: "clamp(13px, 2.8vw, 19px)", color: s.t, minWidth: 0, whiteSpace: "nowrap", letterSpacing: "-0.02em" }}>{s.label}</span>
              <span style={{ fontFamily: "var(--fb)", fontWeight: 600, fontSize: 13.5, opacity: .92, wordBreak: "break-word" }}>{s.handle}</span>
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- PAGE ---------- */
export default function PressKit() {
  const { toasts, push } = useToasts();
  const busy = useRef(false);

  const downloadAsset = (file: string) => {
    const a = document.createElement("a");
    a.href = asset(file);
    a.download = file;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    push(`Downloading ${file}`);
  };

  const downloadAll = async () => {
    if (busy.current) return;
    busy.current = true;
    push("Zipping assets…");
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();
      const folder = zip.folder("MLAI-brand-assets")!;
      await Promise.all(PK_ASSETS.map(async (a) => {
        const res = await fetch(asset(a.file));
        folder.file(a.file, await res.blob());
      }));
      folder.file("README.txt", PK_ZIP_README);
      const out = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(out);
      const a = document.createElement("a");
      a.href = url;
      a.download = "MLAI-brand-assets.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      push(`Downloaded ${PK_ASSETS.length} assets ✓`);
    } catch {
      push("Zip failed — grab single files");
    } finally {
      busy.current = false;
    }
  };

  return (
    <div className="pk-scope">
      <div className="pk-page">
        <div className="pk-shell">
          <div className="pk-hero-box">
            <Hero onDownloadAll={downloadAll} />
          </div>
          <div className="pk-cols">
            <main className="pk-main">
              <AboutSection toast={push} />
              <FactsSection />
              <LogosSection onDownloadAll={downloadAll} onDownload={downloadAsset} />
              <ColoursSection toast={push} />
              <TeamSection />
              <PressSection toast={push} />
              <EventsSection />
              <ContactSection toast={push} />
              <div className="pk-dl-cta">
                <div className="disp" style={{ fontSize: "clamp(26px,3.4vw,40px)" }}>Grab the whole kit</div>
                <p>Logos, the Roo, colours and boilerplate — bundled and ready to ship.</p>
                <button className="btn btn--hot btn--lg" onClick={downloadAll} type="button">
                  <Ico name="download" size={19} /> Download all assets
                </button>
              </div>
            </main>
            <JumpTo />
          </div>
        </div>
      </div>
      <div className="pk-scope-toasts">
        {toasts.map((t) => (
          <div className="toast" key={t.id}><span className="dot" />{t.msg}</div>
        ))}
      </div>
    </div>
  );
}
