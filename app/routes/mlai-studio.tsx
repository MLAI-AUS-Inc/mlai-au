import { useState } from "react";
import type { MetaFunction } from "react-router";
import ApplicationForm from "~/components/MlaiStudioForm";

/* ============================================================
   MLAI STUDIO — Builder recruitment landing page
   Ported from the Claude Design handoff (v5). Accent fixed to
   teal; hero fixed to the "split" layout; the preview-only
   Tweaks panel was intentionally dropped. All styles live in
   app/styles/mlai-studio.css, scoped under `.ms-scope`.

   PHASE 1 (this file): all marketing sections + SEO/AEO.
   PHASE 2 (todo): replace the Apply placeholder with the real
   multi-step <ApplicationForm /> (UI only, no backend yet).
   ============================================================ */

const SITE = "https://mlai.au";
const PAGE_URL = `${SITE}/mlai-studio`;
const OG_IMAGE = `${SITE}/mlai-studio/mascot-teal.png`;
const DESCRIPTION =
  "MLAI Studio matches vetted Australian AI builders with real, paid startup projects — AI, automation, MVPs, integrations and product work. Apply to join Australia's AI builder network.";

/* ---------- SEO + AEO (structured data for AI search) ---------- */
const FAQS = [
  {
    q: "What is MLAI Studio?",
    a: "MLAI Studio is a builder network run by MLAI, Australia's AI community. It matches vetted Australian AI builders with real, paid startup projects across AI, automation, product, integrations and MVPs.",
  },
  {
    q: "Is the work paid?",
    a: "Yes. MLAI Studio matches builders to scoped, paid project work with startups, founders, VCs and portfolio companies.",
  },
  {
    q: "Who can join MLAI Studio?",
    a: "Builders who have shipped real projects, communicate clearly, work independently, care about quality, are comfortable with AI tools, and are based in Australia or can work Australian timezones.",
  },
  {
    q: "How does it work?",
    a: "Three steps: apply with your details and links, get vetted by MLAI for technical fit and communication, then get matched to scoped paid work when a startup needs your skillset.",
  },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "MLAI",
      alternateName: "Machine Learning & AI",
      url: SITE,
      description:
        "Australia's AI community — a not-for-profit empowering AI and machine learning builders, founders and researchers, from Melbourne outward.",
      areaServed: "AU",
    },
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: "MLAI Studio — Get paid to build what startups actually need",
      description: DESCRIPTION,
      isPartOf: { "@id": `${SITE}/#organization` },
      about: { "@id": `${PAGE_URL}#service` },
      inLanguage: "en-AU",
    },
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      name: "MLAI Studio builder network",
      serviceType: "AI builder matching for startup projects",
      provider: { "@id": `${SITE}/#organization` },
      areaServed: { "@type": "Country", name: "Australia" },
      audience: {
        "@type": "Audience",
        audienceType: "AI builders, software engineers, automation specialists",
      },
      description: DESCRIPTION,
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export const meta: MetaFunction = () => [
  { title: "MLAI Studio — Get paid to build what startups actually need | MLAI" },
  { name: "description", content: DESCRIPTION },
  {
    name: "keywords",
    content:
      "MLAI Studio, AI builders Australia, paid startup projects, AI developer jobs Australia, freelance AI engineer, MLAI, automation builder, MVP developer, Australian AI community",
  },
  { name: "robots", content: "index, follow, max-image-preview:large" },
  { property: "og:type", content: "website" },
  { property: "og:site_name", content: "MLAI" },
  { property: "og:url", content: PAGE_URL },
  {
    property: "og:title",
    content: "MLAI Studio — Get paid to build what startups actually need",
  },
  { property: "og:description", content: DESCRIPTION },
  { property: "og:image", content: OG_IMAGE },
  { property: "og:locale", content: "en_AU" },
  { name: "twitter:card", content: "summary_large_image" },
  {
    name: "twitter:title",
    content: "MLAI Studio — Get paid to build what startups actually need",
  },
  { name: "twitter:description", content: DESCRIPTION },
  { name: "twitter:image", content: OG_IMAGE },
  { "script:ld+json": JSON_LD },
];

/* ---------- helpers ---------- */
const asset = (file: string) => `/mlai-studio/${file}`;

const scrollToApply = () => {
  const el = document.getElementById("apply");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

/* Smooth-scroll for the in-page nav anchors (same animation as the
   Apply button) instead of the browser's instant hash jump. */
const scrollToId = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

/* Always-visible reveal wrapper (SSR/print/reduced-motion safe — base
   state must never depend on an animation timeline). */
function Reveal({
  children,
  as: Tag = "div",
  className = "",
  style,
}: {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <Tag className={`reveal in ${className}`} style={style}>
      {children}
    </Tag>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <header id="top" className="hero band cream-band">
      <div className="wrap">
        <div className="hero-grid split">
          <div>
            <Reveal as="p" className="eyebrow">
              MLAI Studio · Australia's AI builder network
            </Reveal>
            <Reveal>
              <h1 className="hero-h1">
                Get paid to <span className="mark-box">build</span> what startups actually need.
              </h1>
            </Reveal>
            <Reveal as="p" className="lead">
              MLAI Studio matches vetted Australian AI builders with real startup projects across
              AI, automation, product, integrations and MVPs.
            </Reveal>
            <Reveal>
              <div className="hero-cta-row">
                <button className="btn btn-orange btn-lg" onClick={scrollToApply}>
                  Apply to join →
                </button>
                <a className="btn btn-outline btn-lg" href="#work" onClick={scrollToId("work")}>See the work</a>
              </div>
            </Reveal>
            <Reveal>
              <div className="hero-micro">
                <span className="chip">Flexible project work</span>
                <span className="chip">Real clients</span>
                <span className="chip">Local startup ecosystem</span>
                <span className="chip">No endless job boards</span>
              </div>
            </Reveal>
          </div>
          <Reveal className="hero-mascot-wrap">
            <img className="hero-mascot" src={asset("mascot-teal.png")} alt="The MLAI Roo mascot" />
          </Reveal>
        </div>
      </div>
    </header>
  );
}

/* ---------- WHY JOIN (fanned deck) ---------- */
const WHY = [
  { n: "01", t: "Real startup projects", d: "Work with founders, VCs and portfolio companies building real products.", c: "orange", icon: "🚀" },
  { n: "02", t: "Paid builder hours", d: "Get paid for scoped technical delivery.", c: "teal", icon: "💸" },
  { n: "03", t: "Flexible work", d: "Take on projects that match your skills, availability and interests.", c: "purple", icon: "🧩" },
  { n: "04", t: "Community-backed", d: "Be part of MLAI's Australian AI builder community.", c: "yellow", icon: "🤝" },
];

function WhyJoin() {
  return (
    <section id="why" className="band ink-band">
      <div className="wrap">
        <Reveal as="p" className="eyebrow">Why join</Reveal>
        <Reveal>
          <h2 className="section-title">For builders<br />who want to ship</h2>
        </Reveal>
        <Reveal as="p" className="lead" style={{ marginTop: 18 }}>
          Four reasons builders pick MLAI Studio.
        </Reveal>
        <div className="deck">
          {WHY.map((c) => (
            <div key={c.n} className={`deck-card deck-${c.c}`}>
              <div className="deck-top">
                <div className="deck-badge">{c.icon}</div>
              </div>
              <h3 className="deck-title">{c.t}</h3>
              <div className="deck-slot">
                <span className="deck-hint">See what's inside →</span>
                <p className="deck-desc">{c.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- WHAT YOU MIGHT BUILD ---------- */
const BUILD = [
  "AI workflow automation", "MVPs & prototypes", "API integrations", "Internal tools",
  "Dashboards", "Data cleaning & mapping", "AI agents & assistants", "Prompt / workflow systems",
  "CRM & ops tooling", "Technical debugging", "Product design & UX support",
];

function WhatBuild() {
  return (
    <section id="work" className="band cream-band">
      <div className="wrap">
        <div className="grid-2" style={{ alignItems: "end", gap: 24 }}>
          <div>
            <Reveal as="p" className="eyebrow">The work</Reveal>
            <Reveal>
              <h2 className="section-title">What kind of work<br />comes through?</h2>
            </Reveal>
          </div>
          <Reveal as="p" className="lead" style={{ marginBottom: 6 }}>
            Scoped, shippable, and the kind of thing a startup actually needs done this quarter — not busywork.
          </Reveal>
        </div>
        <Reveal>
          <div className="tag-cloud" style={{ marginTop: 44 }}>
            {BUILD.map((b) => <span key={b} className="build-tag">{b}</span>)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- HOW IT WORKS (interactive) ---------- */
const STEPS = [
  { t: "Apply", icon: "📝", d: "Submit your details, GitHub, LinkedIn, portfolio and availability." },
  { t: "Get vetted", icon: "🔍", d: "MLAI reviews your work, communication, technical fit and project experience." },
  { t: "Get matched", icon: "🤝", d: "When a startup needs your skillset, we match you to scoped paid work." },
];

function HowItWorks() {
  const [active, setActive] = useState(0);
  return (
    <section id="how" className="band ink-band">
      <div className="wrap">
        <Reveal as="p" className="eyebrow">How it works</Reveal>
        <Reveal>
          <h2 className="section-title">Three steps to<br />paid project work</h2>
        </Reveal>
        <Reveal as="p" className="lead" style={{ marginTop: 18 }}>
          From application to your first paid project.
        </Reveal>
        <Reveal>
          <div className="flow" onMouseLeave={() => setActive(0)}>
            <div className="flow-line">
              <div className="flow-line-fill" style={{ width: `${active * 50}%` }} />
            </div>
            {STEPS.map((s, i) => {
              const state = i < active ? "done" : i === active ? "active" : "";
              return (
                <div
                  key={s.t}
                  className={`flow-step ${state}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  <div className="flow-node">{i < active ? "✓" : i + 1}</div>
                  <div className="flow-card">
                    <span className="flow-icon">{s.icon}</span>
                    <h3>{s.t}</h3>
                    <p>{s.d}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- MENTORSHIP PROGRAM ---------- */
function MentorshipProgram() {
  return (
    <section id="mentors" className="band cream-band">
      <div className="wrap">
        <div className="mentors-head">
          <Reveal as="p" className="eyebrow">Mentorship program</Reveal>
          <Reveal>
            <h2 className="section-title mentors-title">
              Learn from people with experience from{" "}
              <span className="hl hl-blue">Canva</span>,{" "}
              <span className="hl hl-purple">Atlassian</span> &amp;{" "}
              <span className="hl hl-red">MIT</span>.
            </h2>
          </Reveal>
          <Reveal as="p" className="lead mentors-lead">
            Get hands-on help from MLAI mentors — code reviews, architecture calls and a second set
            of eyes whenever a technical challenge has you stuck.
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- WHO WE'RE LOOKING FOR ---------- */
const FIT = [
  "You have built real projects",
  "You can communicate clearly",
  "You can work independently",
  "You care about quality",
  "You are comfortable with AI tools",
  "You can scope, build, test and hand over work",
];

function WhoWeWant() {
  return (
    <section id="fit" className="band ink-band">
      <div className="wrap grid-2" style={{ alignItems: "start", gap: 56 }}>
        <div>
          <Reveal as="p" className="eyebrow">Who we're looking for</Reveal>
          <Reveal>
            <h2 className="section-title">You might be a fit if you can actually ship.</h2>
          </Reveal>
          <Reveal>
            <button className="btn btn-accent btn-lg" style={{ marginTop: 32 }} onClick={scrollToApply}>
              Apply to join →
            </button>
          </Reveal>
        </div>
        <div className="checklist" style={{ gridTemplateColumns: "1fr" }}>
          {FIT.map((f, i) => (
            <Reveal key={i}>
              <div className="check"><span className="tick">✓</span><span>{f}</span></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- APPLY (Phase 1 placeholder — Phase 2 swaps in the form) ---------- */
function ApplySection() {
  return (
    <section id="apply" className="band cream-band">
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <Reveal as="p" className="eyebrow">Apply</Reveal>
          <Reveal>
            <h2 className="section-title" style={{ marginBottom: 16 }}>Join the builder pool</h2>
          </Reveal>
          <Reveal as="p" className="lead" style={{ margin: "0 auto" }}>
            A few quick steps. Real humans review every application. Get matched to scoped, paid startup work.
          </Reveal>
        </div>
        <Reveal>
          <ApplicationForm />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- SOCIAL PROOF ---------- */
function SocialProof() {
  return (
    <section className="band ink-band">
      <div className="wrap">
        <Reveal as="p" className="eyebrow">Backed by a community</Reveal>
        <Reveal as="p" className="section-title" style={{ maxWidth: "20ch" }}>
          Built from MLAI's Australian AI community.
        </Reveal>
        <div className="stat-row" style={{ marginTop: 48 }}>
          <Reveal>
            <div className="stat">
              <div className="n">2,000+</div>
              <div className="l">Builders, founders, researchers, operators and AI-curious people.</div>
            </div>
          </Reveal>
          <Reveal>
            <div className="stat">
              <div className="n">1,000</div>
              <div className="l">Australian startups we're helping create by 2030.</div>
            </div>
          </Reveal>
          <Reveal>
            <div className="stat">
              <div className="n">Mentors</div>
              <div className="l">Get support and guidance from mentors with experience at Canva, Atlassian and MIT.</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- FINAL CTA ---------- */
function FinalCTA() {
  return (
    <section className="band">
      <div className="wrap">
        <div className="panel final-cta" style={{ background: "var(--accent)", color: "var(--mlai-ink)" }}>
          <Reveal>
            <img
              src={asset("mascot-teal.png")}
              alt=""
              aria-hidden="true"
              style={{ width: 92, margin: "0 auto 22px" }}
            />
          </Reveal>
          <Reveal>
            <h2>If you can build,<br />we want to know you.</h2>
          </Reveal>
          <Reveal>
            <button className="btn btn-ink btn-lg" onClick={scrollToApply}>
              Apply to join →
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- PAGE ---------- */
export default function MlaiStudio() {
  return (
    <div className="ms-scope">
      <Hero />
      <WhyJoin />
      <WhatBuild />
      <HowItWorks />
      <MentorshipProgram />
      <WhoWeWant />
      <ApplySection />
      <SocialProof />
      <FinalCTA />
    </div>
  );
}
