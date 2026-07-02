import { useCallback, useEffect, useState } from "react";
import type { LinksFunction, MetaFunction } from "react-router";
import {
  ACTIVITIES, APPROVAL_STEPS, BENEFITS, ESTIMATOR_DEFAULT, FAQS, JUMP_ITEMS,
  PERKS, ROLES, ROO_URL, SLACK_INVITE, STATS, STEPS, unlockText,
} from "~/data/volunteers";

/* ============================================================
   MLAI VOLUNTEERS — /volunteers
   Ported from the Claude Design handoff. Embeds in the site shell
   (global left sidebar + site footer stay); the page brings its own
   right-hand "JUMP TO" rail. Styles scoped under `.vol-scope` in
   app/styles/volunteers.css; content in app/data/volunteers.ts.
   ============================================================ */

const SITE = "https://mlai.au";
const PAGE_URL = `${SITE}/volunteers`;
const DESCRIPTION =
  "Volunteer with MLAI — Australia's volunteer-run AI community. Pick a role, help run events, content, mentoring or builds, and earn Roo Points. No experience required.";

export const meta: MetaFunction = () => [
  { title: "Volunteer with MLAI — Pick a role, press start | MLAI" },
  { name: "description", content: DESCRIPTION },
  { name: "robots", content: "index, follow, max-image-preview:large" },
  { property: "og:type", content: "website" },
  { property: "og:site_name", content: "MLAI" },
  { property: "og:url", content: PAGE_URL },
  { property: "og:title", content: "Volunteer with MLAI — Pick a role. Press start." },
  { property: "og:description", content: DESCRIPTION },
  { property: "og:image", content: `${SITE}/volunteers/assets/roo-icon.png` },
  { property: "og:locale", content: "en_AU" },
  { name: "twitter:card", content: "summary" },
  {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  },
];

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@1,8..60,400..600&display=swap",
  },
];

/* custom eased smooth-scroll (easeInOutQuint) matching the design */
function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const scroller = document.scrollingElement || document.documentElement;
  const startY = scroller.scrollTop;
  const targetY = Math.max(0, startY + el.getBoundingClientRect().top - 20);
  const dist = targetY - startY;
  if (Math.abs(dist) < 2) return;
  const dur = Math.min(1400, Math.max(650, Math.abs(dist) * 0.62));
  const t0 = performance.now();
  const ease = (t: number) => (t < 0.5 ? 16 * t ** 5 : 1 - ((-2 * t + 2) ** 5) / 2);
  const step = (now: number) => {
    const p = Math.min(1, (now - t0) / dur);
    scroller.scrollTop = startY + dist * ease(p);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const OSWALD = "'Oswald', 'Arial Narrow', sans-serif";
const KICKER: React.CSSProperties = { fontWeight: 700, fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase" };

export default function Volunteers() {
  const [active, setActive] = useState("why");
  const [faqOpen, setFaqOpen] = useState(-1);
  const [selected, setSelected] = useState<Set<string>>(new Set(ESTIMATOR_DEFAULT));

  // scroll-spy: last section whose top has passed 160px
  useEffect(() => {
    const onScroll = () => {
      let current = JUMP_ITEMS[0].id;
      for (const j of JUMP_ITEMS) {
        const el = document.getElementById(j.id);
        if (el && el.getBoundingClientRect().top <= 160) current = j.id;
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

  const toggle = useCallback((key: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const total = ACTIVITIES.reduce((sum, a) => (selected.has(a.key) ? sum + a.pts : sum), 0);

  const anchor = (id: string) => (e: React.MouseEvent) => { e.preventDefault(); scrollToId(id); };

  return (
    <div className="vol-scope" style={{ minHeight: "100vh" }}>
      <main id="top" className="vol-main">
        {/* HERO */}
        <section
          className="vol-hero"
          style={{ position: "relative", overflow: "hidden", background: "radial-gradient(120% 130% at 78% 8%,#2c2c2c 0%,#1a1a1a 55%)", borderRadius: 32, padding: "64px 60px 70px", minHeight: 520 }}
        >
          <div style={{ position: "relative", zIndex: 2, maxWidth: 580 }}>
            <span style={{ display: "inline-block", padding: "8px 16px", borderRadius: 999, background: "rgba(255,255,255,.08)", color: "var(--teal)", fontWeight: 700, fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase" }}>
              Volunteer with MLAI
            </span>
            <h1 className="vol-disp" style={{ lineHeight: 0.88, color: "#fff", fontSize: 78, margin: "22px 0 0" }}>
              Pick a role.<br />Press start.
            </h1>
            <p style={{ fontSize: 20, lineHeight: 1.5, color: "#d8d2c6", margin: "24px 0 0", maxWidth: 500 }}>
              Help run Australia's AI community — and earn <b style={{ color: "#fff" }}>Roo Points</b> for every meaningful contribution. No experience required. Just show up and build.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 34 }}>
              <a href="#join" onClick={anchor("join")} className="vol-btn" style={{ background: "var(--orange)", color: "#fff", padding: "17px 28px", fontSize: 16 }}>I want to volunteer →</a>
              <a href="#roles" onClick={anchor("roles")} className="vol-btn" style={{ background: "var(--yellow)", color: "var(--ink)", padding: "17px 28px", fontSize: 16 }}>See volunteer roles</a>
            </div>
          </div>

          {/* floating arcade cards */}
          <div className="vol-hero-cards">
            <div className="vol-floatA" style={{ position: "absolute", top: 54, right: 54, zIndex: 1, width: 188, padding: "18px 20px", borderRadius: 22, background: "var(--teal)", color: "var(--ink)" }}>
              <div style={{ fontWeight: 700, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", opacity: 0.7 }}>Player 1</div>
              <div className="vol-disp" style={{ fontSize: 30, lineHeight: 1, marginTop: 8 }}>You</div>
              <div style={{ fontSize: 13, marginTop: 6, opacity: 0.85 }}>Ready to join the crew</div>
            </div>
            <div className="vol-floatB" style={{ position: "absolute", top: 208, right: 208, zIndex: 3, width: 158, padding: "18px 20px", borderRadius: 22, background: "var(--orange)", color: "#fff" }}>
              <div className="vol-disp" style={{ fontSize: 46, lineHeight: 0.9 }}>+14</div>
              <div style={{ fontSize: 13, marginTop: 4, opacity: 0.92 }}>Roo Points / event shift</div>
            </div>
            <div className="vol-floatC" style={{ position: "absolute", top: 336, right: 60, zIndex: 2, width: 210, padding: 20, borderRadius: 22, background: "var(--yellow)", color: "var(--ink)" }}>
              <div style={{ fontWeight: 700, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", opacity: 0.6 }}>Unlocked</div>
              <div className="vol-disp" style={{ fontSize: 30, lineHeight: 1, marginTop: 8 }}>Hot-desk day</div>
              <div style={{ fontSize: 13, marginTop: 6, opacity: 0.8 }}>Redeem with Roo Points</div>
            </div>
          </div>
        </section>

        {/* TWO-COLUMN BODY */}
        <div className="vol-body">
          <div className="vol-col">
            {/* WHY */}
            <section id="why" className="vol-panel" style={{ scrollMarginTop: 24, background: "#fff", borderRadius: 32, padding: "56px 56px 60px" }}>
              <h2 className="vol-disp" style={{ fontSize: 46, lineHeight: 0.95, margin: 0 }}>Why volunteer?</h2>
              <p style={{ fontSize: 18, lineHeight: 1.55, color: "#4a4a4a", margin: "16px 0 0", maxWidth: 680 }}>
                MLAI is 100% volunteer-run. The people who help out are the reason it exists — and they get the most out of it. Here's what's in it for you.
              </p>
              <div className="vol-g2" style={{ marginTop: 34 }}>
                {BENEFITS.map((b) => (
                  <div key={b.title} style={{ background: b.bg, borderRadius: 22, padding: 30 }}>
                    <div style={{ fontSize: 30 }}>{b.emoji}</div>
                    <h3 className="vol-disp" style={{ fontSize: 24, margin: "14px 0 8px", color: b.fg }}>{b.title}</h3>
                    <p style={{ fontSize: 16, lineHeight: 1.55, color: b.bodyFg, margin: 0 }}>
                      {b.highlight
                        ? (() => {
                            const [pre, post] = b.body.split(b.highlight);
                            return (<>{pre}<span style={{ color: "var(--teal)", fontWeight: 700 }}>{b.highlight}</span>{post}</>);
                          })()
                        : b.body}
                    </p>
                  </div>
                ))}
              </div>
              <div className="vol-stat4" style={{ marginTop: 18 }}>
                {STATS.map((s) => (
                  <div key={s.label} style={{ background: s.bg, color: s.fg, borderRadius: 18, padding: 24 }}>
                    <div className="vol-disp" style={{ fontSize: 40, lineHeight: 0.9 }}>{s.n}</div>
                    <div style={{ fontSize: 13, marginTop: 6, opacity: s.dim }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* JOIN */}
            <section id="join" style={{ scrollMarginTop: 72, background: "var(--ink)", borderRadius: 32, padding: 56, marginTop: 24 }} className="vol-panel">
              <span style={{ display: "inline-block", color: "var(--teal)", ...KICKER }}>Get started</span>
              <h2 className="vol-disp" style={{ fontSize: 46, lineHeight: 0.95, margin: "12px 0 0", color: "#fff" }}>How to become a volunteer</h2>
              <p style={{ fontSize: 18, lineHeight: 1.55, color: "#b8b2a4", margin: "16px 0 0", maxWidth: 680 }}>
                No applications to agonise over. The fastest path in is small, useful and visible — start helping and the rest follows.
              </p>
              <div className="vol-g4" style={{ marginTop: 36 }}>
                {STEPS.map((s) => (
                  <div key={s.n} style={{ background: s.bg, color: s.fg, borderRadius: 22, padding: 26, minHeight: 230, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "inline-flex", width: "fit-content", padding: "5px 12px", borderRadius: 999, background: s.pillBg, fontWeight: 700, fontSize: 12, letterSpacing: ".08em" }}>{s.n}</div>
                    <h3 className="vol-disp" style={{ fontSize: 23, margin: "18px 0 8px" }}>{s.title}</h3>
                    <p style={{ fontSize: 15, lineHeight: 1.5, margin: 0 }}>{s.body}</p>
                  </div>
                ))}
              </div>
              <div style={{ background: "var(--ink2)", borderRadius: 18, padding: "22px 26px", marginTop: 20, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18, flexWrap: "wrap" }}>
                <span style={{ fontSize: 15, lineHeight: 1.5, color: "#b8b2a4", maxWidth: 620 }}>
                  That's it — no CV, no interview. Reliability beats credentials. Pick something small first and build momentum.
                </span>
                <a href={SLACK_INVITE} target="_blank" rel="noopener noreferrer" className="vol-btn" style={{ background: "var(--orange)", color: "#fff", padding: "14px 24px", fontSize: 15 }}>Join Slack &amp; say hi →</a>
              </div>
            </section>

            {/* ROLES */}
            <section id="roles" style={{ scrollMarginTop: 72, marginTop: 24 }}>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap", padding: "0 8px" }}>
                <div>
                  <span style={{ display: "inline-block", color: "#4a4a4a", ...KICKER }}>Choose your fighter</span>
                  <h2 className="vol-disp" style={{ fontSize: 46, lineHeight: 0.95, margin: "12px 0 0" }}>What volunteers do</h2>
                </div>
                <p style={{ fontSize: 16, lineHeight: 1.55, color: "#4a4a4a", margin: 0, maxWidth: 380 }}>
                  Six ways to plug in — most volunteers mix a couple. Each role is a different way to show up.
                </p>
              </div>
              <div className="vol-g3" style={{ marginTop: 30 }}>
                {ROLES.map((r) => (
                  <div key={r.name} style={{ background: r.color, color: r.fg, borderRadius: 22, padding: "28px 26px" }}>
                    <div style={{ fontSize: 30 }}>{r.emoji}</div>
                    <h3 className="vol-disp" style={{ fontSize: 25, margin: "16px 0 6px" }}>{r.name}</h3>
                    <p style={{ fontSize: 15, lineHeight: 1.5, margin: "0 0 16px", opacity: 0.92 }}>{r.blurb}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                      {r.tasks.map((t) => (
                        <span key={t} style={{ padding: "6px 11px", borderRadius: 999, background: r.chipBg, fontSize: 12.5, fontWeight: 500 }}>{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* EARN */}
            <section id="earn" className="vol-panel" style={{ scrollMarginTop: 72, background: "#fff", borderRadius: 32, padding: 56, marginTop: 24 }}>
              <span style={{ display: "inline-block", color: "#4a4a4a", ...KICKER }}>The reward loop</span>
              <h2 className="vol-disp" style={{ fontSize: 46, lineHeight: 0.95, margin: "12px 0 0" }}>How you earn Roo Points</h2>
              <p style={{ fontSize: 18, lineHeight: 1.55, color: "#4a4a4a", margin: "16px 0 0", maxWidth: 720 }}>
                Roo Points are MLAI's internal thank-you for meaningful contribution — about <b>1 point ≈ 10 minutes</b> of useful work. They're recognition you can spend, not a wage.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginTop: 20 }}>
                {["Not money", "Not a wage", "No cash value", "Non-transferable"].map((t) => (
                  <span key={t} style={{ padding: "8px 15px", borderRadius: 999, background: "var(--cream)", fontWeight: 600, fontSize: 13, color: "#4a4a4a" }}>{t}</span>
                ))}
              </div>

              <div className="vol-earn-grid" style={{ marginTop: 34 }}>
                {/* estimator */}
                <div style={{ background: "var(--ink)", borderRadius: 24, padding: 32, color: "#fff" }}>
                  <h3 className="vol-disp" style={{ fontSize: 24, margin: 0 }}>Estimate your first month</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.5, color: "#b8b2a4", margin: "10px 0 22px" }}>Tap what you reckon you'll do. Just a rough guide.</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {ACTIVITIES.map((a) => {
                      const on = selected.has(a.key);
                      return (
                        <button
                          key={a.key}
                          type="button"
                          onClick={() => toggle(a.key)}
                          className="vol-est-row"
                          style={{ background: on ? "var(--teal)" : "var(--ink2)", color: on ? "var(--ink)" : "#e6e2d8" }}
                          aria-pressed={on}
                        >
                          <span style={{ display: "flex", alignItems: "center", gap: 11 }}>
                            <span style={{ width: 20, height: 20, borderRadius: 6, background: on ? "var(--ink)" : "rgba(255,255,255,.14)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "var(--teal)" }}>{on ? "✓" : ""}</span>
                            {a.label}
                          </span>
                          <span style={{ fontFamily: OSWALD, fontWeight: 700, fontSize: 18 }}>+{a.pts}</span>
                        </button>
                      );
                    })}
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginTop: 24, paddingTop: 22, borderTop: "1px solid #3a3a3a" }}>
                    <div>
                      <div style={{ fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: "#b8b2a4" }}>Estimated total</div>
                      <div style={{ fontSize: 13, color: "var(--teal)", marginTop: 6, maxWidth: 240 }}>{unlockText(total)}</div>
                    </div>
                    <div className="vol-disp" style={{ fontSize: 60, lineHeight: 0.85, color: "var(--teal)" }}>{total}</div>
                  </div>
                </div>
                {/* approval */}
                <div style={{ background: "var(--cream)", borderRadius: 24, padding: 32 }}>
                  <h3 className="vol-disp" style={{ fontSize: 24, margin: 0 }}>How approval works</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 20 }}>
                    {APPROVAL_STEPS.map((s, i) => (
                      <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                        <span style={{ flex: "none", width: 26, height: 26, borderRadius: 999, background: "var(--ink)", color: "#fff", fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
                        <span style={{ fontSize: 15, lineHeight: 1.45, color: "var(--ink)" }}>{s}</span>
                      </div>
                    ))}
                  </div>
                  <a href={ROO_URL} style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 24, color: "var(--ink)", fontWeight: 700, fontSize: 15, borderBottom: "3px solid var(--teal)", paddingBottom: 3 }}>See the full Roo Points system →</a>
                </div>
              </div>
            </section>

            {/* PERKS */}
            <section id="perks" style={{ scrollMarginTop: 72, marginTop: 24, padding: "0 8px" }}>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
                <h2 className="vol-disp" style={{ fontSize: 40, lineHeight: 0.95, margin: 0 }}>What points unlock</h2>
                <a href={ROO_URL} style={{ color: "var(--ink)", fontWeight: 700, fontSize: 15, borderBottom: "3px solid var(--orange)", paddingBottom: 3 }}>All rewards →</a>
              </div>
              <div className="vol-g4" style={{ marginTop: 24 }}>
                {PERKS.map((p) => (
                  <div key={p.title} style={{ background: p.bg, color: p.fg, borderRadius: 22, padding: 26 }}>
                    <div style={{ fontSize: 26 }}>{p.emoji}</div>
                    <h3 className="vol-disp" style={{ fontSize: 21, margin: "12px 0 4px" }}>{p.title}</h3>
                    <div style={{ fontSize: 14, opacity: p.dim }}>{p.sub}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="vol-panel" style={{ scrollMarginTop: 72, background: "#fff", borderRadius: 32, padding: 56, marginTop: 24 }}>
              <h2 className="vol-disp" style={{ fontSize: 46, lineHeight: 0.95, margin: 0 }}>Volunteer FAQ</h2>
              <p style={{ fontSize: 18, lineHeight: 1.55, color: "#4a4a4a", margin: "16px 0 0" }}>
                New volunteers should leave this page knowing exactly what to do next.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 30 }}>
                {FAQS.map((f, i) => {
                  const open = faqOpen === i;
                  return (
                    <div key={f.q} style={{ background: "var(--cream)", borderRadius: 18, overflow: "hidden" }}>
                      <button type="button" className="vol-faq-q" aria-expanded={open} onClick={() => setFaqOpen(open ? -1 : i)}>
                        <span>{f.q}</span>
                        <span className="vol-faq-chev" style={{ transform: open ? "rotate(180deg)" : "none" }}>⌄</span>
                      </button>
                      {open && (
                        <div style={{ padding: "0 26px 24px", fontSize: 16, lineHeight: 1.6, color: "#4a4a4a", maxWidth: 840 }}>{f.a}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* JUMP TO SIDEBAR */}
          <aside className="vol-aside">
            <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--purple)", padding: "0 14px", marginBottom: 14 }}>Jump to</div>
            <nav className="vol-jump" style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {JUMP_ITEMS.map((j) => (
                <a key={j.id} href={`#${j.id}`} className={active === j.id ? "active" : ""} onClick={anchor(j.id)}>{j.label}</a>
              ))}
            </nav>
          </aside>
        </div>

        {/* FINAL CTA */}
        <section className="vol-final" style={{ position: "relative", overflow: "hidden", background: "var(--orange)", borderRadius: 32, padding: "64px 56px", marginTop: 24, textAlign: "center" }}>
          <span style={{ fontFamily: "var(--fq)", fontStyle: "italic", fontSize: 24, color: "#ffd9cc" }}>Keen to jump aboard the pirate ship?</span>
          <h2 className="vol-disp" style={{ fontSize: 62, lineHeight: 0.92, margin: "14px 0 0", color: "#fff" }}>Wait no longer,<br />click the button sailor.</h2>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginTop: 34 }}>
            <a href="#roles" onClick={anchor("roles")} className="vol-btn vol-btn--big" style={{ background: "var(--ink)", color: "#fff", padding: "18px 32px", fontSize: 17 }}>I want to volunteer →</a>
            <a href={ROO_URL} className="vol-btn" style={{ background: "var(--yellow)", color: "var(--ink)", padding: "18px 32px", fontSize: 17 }}>See the Roo Points system</a>
          </div>
        </section>

        <div style={{ height: 24 }} />
      </main>
    </div>
  );
}
