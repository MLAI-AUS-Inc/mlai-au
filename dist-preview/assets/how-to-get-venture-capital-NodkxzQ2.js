import { j as jsxRuntimeExports, F as ForwardRef$2, A as ArticleDisclaimer } from "./server-build-DGuowwjZ.js";
import { f as Link } from "./worker-entry-BTvr0DWh.js";
import { A as ArticleHeroHeader, a as ArticleTocPlaceholder, b as ArticleImageBlock, Q as QuoteBlock, d as AuthorBio, c as ArticleFAQ, e as ArticleFooterNav } from "./ArticleTocPlaceholder-Do4c2OpE.js";
import { A as ArticleStepList, a as ArticleCompanyCTA } from "./ArticleStepList-BURYQrdD.js";
import { A as AudienceGrid, F as ForwardRef } from "./AudienceGrid-Cv0i5y2N.js";
import { A as ArticleResourceCTA } from "./ArticleResourceCTA-PGgKzCy1.js";
import { A as ArticleCallout, M as MLAITemplateResourceCTA } from "./MLAITemplateResourceCTA-BdznCDV4.js";
import { A as ArticleReferences } from "./ArticleReferences-HQ7rjtnV.js";
import { g as getDefaultArticleAuthorDetails } from "./authors-DzySQTZP.js";
import { H as House } from "./house-C2Qzo5EV.js";
import { F as ForwardRef$1 } from "./AcademicCapIcon-CU_w7ImP.js";
import "util";
import "stream";
import "path";
import "node:net";
import "node:stream";
import "node:events";
import "url";
import "crypto";
import "assert";
import "zlib";
import "events";
import "node:path";
import "node:url";
const useCustomHeader = true;
const TOPIC = "How to get venture capital in Australia";
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails();
const AUTHOR = AUTHOR_PROFILE.name ?? "Dr Sam Donegan";
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? "Founder";
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? "";
const AUTHOR_AVATAR = AUTHOR_PROFILE.avatarUrl ?? "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80";
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-580e89c1-855d-4835-baa3-8eab4f785974.jpg?alt=media&token=8a2a0190-3a1b-43b6-a90e-88d8b730a7ef";
const HERO_IMAGE_ALT = "Founder pitching to a room of venture capital investors";
const faqItems = [
  {
    id: 1,
    question: "How much equity do VCs typically take at seed in Australia?",
    answer: "As at 2026, dilution of 10–25% for a priced seed round is common, depending on round size, valuation, and the size of your option pool. SAFEs or convertible notes defer pricing but still dilute when they convert."
  },
  {
    id: 2,
    question: "Do I need revenue to raise venture capital?",
    answer: "Not always at pre-seed. For seed and beyond, investors typically want evidence of demand (e.g., early revenue, pilots, meaningful active users, strong waitlists, or design partner traction). The later the round, the more metrics matter."
  },
  {
    id: 3,
    question: "Can I cold email Australian VCs?",
    answer: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Yes. Keep it short: what you do, the problem, early traction, why now, and a clear ask. Include a one‑page overview or deck link. A warm intro via advisors, founders, or community (e.g., MLAI) often improves response rates." })
  },
  {
    id: 4,
    question: "What legal structure should I have before raising?",
    answer: "Most Australian VCs expect a Pty Ltd company with a clean cap table, a shareholders agreement, and an employee option plan (ESOP) either in place or planned. Get independent legal advice to suit your situation."
  },
  {
    id: 5,
    question: "SAFE vs convertible note vs priced round—what’s the difference?",
    answer: "A SAFE is a simple agreement for future equity that converts later, typically with a valuation cap/discount. A convertible note adds interest/maturity. A priced round sets valuation now and issues shares. Speak to a lawyer—terms have real dilution and control implications."
  },
  {
    id: 6,
    question: "How long does a raise take?",
    answer: "From first meetings to money in the bank, 6–16 weeks is common if you have materials ready and momentum. Include extra time for due diligence and legal docs. Start with at least 6 months runway remaining."
  },
  {
    id: 7,
    question: "Are there alternatives to VC in Australia?",
    answer: "Yes—R&D Tax Incentive, grants via business.gov.au, angel investors, crowdfunding (ASIC CSF), revenue‑based financing, and bootstrapping. VC fits high‑growth businesses seeking to scale quickly."
  }
];
const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro: "Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).",
  items: [
    {
      label: "What do VCs look for at seed in Australia?",
      description: "Team–market fit, early traction (revenue/users/pilots), clear GTM, capital efficiency, and a credible path to scale."
    },
    {
      label: "How long does a seed raise take?",
      description: "Typically 6–16 weeks from first meetings to close if materials are ready; start with 6+ months runway."
    },
    {
      label: "How much equity is typical to give up?",
      description: "Commonly 10–25% per priced round; SAFEs/notes convert later. Dilution varies by valuation, round size, and option pool."
    }
  ]
};
function ArticlePage() {
  const authorDetails = {
    name: AUTHOR,
    role: AUTHOR_ROLE,
    bio: AUTHOR_BIO,
    avatarUrl: AUTHOR_AVATAR
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ArticleHeroHeader,
      {
        breadcrumbs: [
          { label: "Home", href: "/", icon: House },
          { label: "Articles", href: "/articles" },
          { label: TOPIC, current: true }
        ],
        title: TOPIC,
        titleHighlight: "(2026)",
        headerBgColor: "cyan",
        summary: summaryHighlights,
        heroImage: HERO_IMAGE,
        heroImageAlt: HERO_IMAGE_ALT
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleTocPlaceholder, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleCallout, { variant: "info", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-800", children: [
        "This guide is part of our broader series on ",
        TOPIC,
        ". Prefer to jump ahead?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/articles", className: "font-semibold text-[--brand] underline-offset-4 hover:underline", children: "Browse related articles →" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AudienceGrid,
        {
          cards: [
            {
              title: "Founders & Teams",
              description: "For leaders validating ideas, seeking funding, or managing teams.",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef, { className: "h-6 w-6" }),
              variant: "orange"
            },
            {
              title: "Students & Switchers",
              description: "For those building portfolios, learning new skills, or changing careers.",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$1, { className: "h-6 w-6" }),
              variant: "purple"
            },
            {
              title: "Community Builders",
              description: "For workshop facilitators, mentors, and ecosystem supporters.",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$2, { className: "h-6 w-6" }),
              variant: "yellow"
            }
          ],
          className: "my-10"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 hover:prose-a:text-[--brand]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: TOPIC }),
          " — If you’re building a high‑growth startup in Australia, venture capital (VC) can accelerate product, hiring, and go‑to‑market. As at 2026, investors emphasise clear traction, capital efficiency, and clean governance. This guide distils what leading resources cover (e.g., investor fit, materials, process) and adds AU‑specific notes on timelines, diligence, and alternatives."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleImageBlock, { src: HERO_IMAGE, alt: HERO_IMAGE_ALT, width: 1200, height: 630 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Is venture capital right for your startup?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "VC suits companies aiming for outsized outcomes within 7–10 years. In practice, that means a large addressable market, strong founder–market fit, and evidence your product can scale. If your growth is steady but not explosive, grants, revenue‑based finance, or angels may be better than institutional VC. Before engaging investors, be clear on why you need capital now, how it extends runway, and the milestones it funds (e.g., shipping v1, 10 enterprise pilots, or $1m ARR)." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Signals of VC readiness include: weekly active users trending upward; paid pilots or LOIs; a repeatable way to acquire and retain customers; and a defensible edge (in AI, this can be proprietary data, model performance on meaningful evaluations, or distribution advantages)." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleResourceCTA,
          {
            title: `Download the ${TOPIC} checklist`,
            description: "Access a structured template to apply the steps in this guide.",
            buttonLabel: "Get the checklist",
            buttonHref: "#",
            accent: "purple"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleCallout, { title: "Quick fit check", variant: "brand", icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "💡" }), className: "not-prose", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-gray-800", children: "If you can’t describe how $1–3m would turn into a clear, testable milestone within 12–18 months, you may be too early for institutional VC. Consider angels or grants while you de‑risk." }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "What Australian investors look for in 2026" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-2d12f2f1-b63b-49e1-9e3e-9408162c59a6.jpg?alt=media&token=70ff7c10-fc47-4d1f-8121-00915505b875", alt: "Investors discuss startups in a vibrant 90s film aesthetic tech setting, showcasing innovation and collaboration.", className: "w-full rounded-lg my-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Across Stripe’s guidance and AU investor pages, common themes emerge: strong team, evidence of demand, capital efficiency, and a credible plan to a large outcome. Translate that into metrics: retention cohorts, growth rate, unit economics (LTV/CAC), sales velocity, and a bottom‑up go‑to‑market model. For AI startups, expect extra scrutiny on data rights, model licensing, evals tied to real‑world tasks, and safety/observability in production." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Team: founder‑market fit, execution pace, clear roles, and reliable references." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Traction: paying users or pilots, expanding usage, and credible pipeline." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Economics: gross margins, early CAC signals, and a plan for efficient scale." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Governance: clean cap table, ESOP, basic policies (privacy, security), and simple terms." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "AI specifics: data provenance, model/IP licences, benchmarked performance, and safety processes." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(QuoteBlock, { title: "Expert insight", variant: "purple", children: "“Investors back momentum and clarity. A concise plan that shows how new capital converts into specific, measurable milestones will outperform a long story every time.”" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Prepare your materials: deck, model, and data room" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-67ecd405-ff66-49c1-bcf6-344fe3e00b31.jpg?alt=media&token=acc4eb2a-97f1-41f1-9e05-41e7bd8b47b7", alt: "Team collaborating in a retro 90s tech space, preparing materials for a startup project.", className: "w-full rounded-lg my-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Most AU funds expect a 10–14 slide deck: problem, solution, product demo, traction, market, business model, go‑to‑market, competition/edge, roadmap/milestones, team, and the raise (amount, use of funds, round mechanics). Keep it visual and specific—screenshots, charts, credible numbers." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Data room essentials" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Corporate: constitution, shareholders agreement, cap table, ESOP details." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Financial: historicals, 18–24 month forecast, assumptions, cash plan." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Commercial: pipeline, key contracts, LOIs, churn/retention metrics." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Product/Tech: architecture, security practices, uptime/observability." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "AI: data sources and rights, model licences, evaluation methodology, safety controls." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Legal/Compliance: privacy policy, terms of use, IP ownership, any regulatory approvals." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleStepList,
          {
            title: "Practical steps",
            steps: [
              { label: "Draft a tight 12‑slide deck with a real product demo" },
              { label: "Build a bottoms‑up model and milestone plan" },
              { label: "Assemble a data room with legal, financial, and product docs" },
              { label: "Line up 2–3 customer references ready to speak" },
              { label: "Dry‑run Q&A with trusted founders or mentors" }
            ],
            accent: "indigo"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Find and research investors (AU and abroad)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Start with funds that match your stage, cheque size, and sector. Map portfolios to identify who understands your space. Build a list from Australian Investment Council member directories, fund websites, and community intel. Use warm intros where possible (founders in portfolio companies, ecosystem mentors, or MLAI). Cold emails can work when they are focused and respectful." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Targeting: stage fit (pre‑seed, seed, Series A), typical round sizes, geography, and lead vs follow‑on behaviour." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Signals: recent fund size (dry powder), partner interests, and relevant portfolio outcomes." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Channels: events, demo days, community meetups, and direct outreach." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleCallout, { title: "Outreach tip", variant: "brand", icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "📬" }), className: "not-prose", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-gray-800", children: "A concise note + one‑pager beats a heavy deck on first contact. Lead with the problem, traction, and “why now.” Include the specific ask (e.g., “seeking a $2m seed with 18‑month runway to hit $1m ARR”)." }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Run a tight fundraising process" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Treat fundraising like a product launch: create a target list, time‑box outreach (e.g., 2–3 weeks for first meetings), and keep momentum with clear updates. Track conversations in a simple CRM. Share progress (new pilot signed, metric moved) to build urgency. Aim to identify a lead investor who anchors terms and helps fill the round." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Typical Australian timelines and round sizes (indicative, 2026)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Pre‑seed: A$250k–A$1.5m; timeline 4–12 weeks once materials are ready." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Seed: A$1m–A$5m; plan 6–16 weeks including diligence and legals." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Series A: A$5m–A$20m+; deeper diligence, longer cycles. Ranges vary by sector and market conditions." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Instruments often include SAFEs/notes at early stages and priced rounds from seed/Series A. Keep terms simple; complexity slows processes and can deter follow‑on investors." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Term sheets, valuation, and dilution basics" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Key terms to understand: valuation (pre/post‑money), option pool size, liquidation preference (often 1x non‑participating), pro‑rata rights, board structure, and information rights. Model dilution across multiple rounds so you know what the cap table looks like at Series A/B if you hit plan." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Model the option pool “pre vs post” impact—investors may ask to top up before closing." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Ensure vesting and IP assignment are in place for all team members." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Use plain‑English summaries for major clauses alongside the legal docs." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Due diligence: what to expect" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Diligence typically covers corporate, financial, commercial, technical, and legal tracks. Be ready with clean documents, fast responses, and customer references who can speak to value. For AI companies, expect deeper review of data provenance, model evaluation, and safety/observability practices. Align your privacy and security posture with Australian expectations (note: privacy law reforms may update obligations—check the latest official guidance)." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "AI‑specific diligence checklist (AU)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Data rights and provenance for training/evaluation; third‑party licences documented." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Model evaluations tied to real user tasks; reproducible results and monitoring." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Risk management: abuse/harm controls, red‑teaming, and incident response." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Privacy and security: clear policies, role‑based access, and audit trails." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "R&D Tax: ensure evidence for any claims aligns with program requirements." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Alternatives to venture capital in Australia" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "VC is not the only path. Many Australian teams combine non‑dilutive support with early angel funding to reach stronger traction before approaching VCs. Explore the federal R&D Tax Incentive, grants (via business.gov.au), crowd‑sourced funding (ASIC‑regulated), revenue‑based finance, and strategic partnerships." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100 not-prose", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-gray-900 mb-4", children: "Your Next Steps" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]", children: "1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Decide if VC is the right fit for your goals and runway." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]", children: "2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Create a 12‑slide deck, build a simple model, and assemble a data room." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]", children: "3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Build a targeted investor list and time‑box outreach to 2–3 weeks." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MLAITemplateResourceCTA, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleReferences,
          {
            heading: "Sources",
            description: "Selected references for further reading (check for updates as at 2026).",
            headingId: "references",
            references: [
              {
                id: 1,
                href: "https://stripe.com/au/resources/more/how-to-get-venture-capital-funding",
                title: "How to Get Venture Capital Funding",
                publisher: "Stripe",
                category: "guide",
                description: "Overview of preparing, pitching, and closing VC rounds."
              },
              {
                id: 2,
                href: "https://asic.gov.au/regulatory-resources/crowd-sourced-funding/",
                title: "Crowd‑sourced funding (CSF)",
                publisher: "ASIC",
                category: "government",
                description: "Regulatory information on CSF as an alternative to VC."
              },
              {
                id: 3,
                href: "https://www.business.gov.au/grants-and-programs/research-and-development-tax-incentive",
                title: "Research and Development (R&D) Tax Incentive",
                publisher: "Australian Government",
                category: "government",
                description: "Non‑dilutive support that many startups combine with early funding."
              },
              {
                id: 4,
                href: "https://www.ycombinator.com/documents",
                title: "SAFE Financing Documents",
                publisher: "Y Combinator",
                category: "guide",
                description: "Widely used early‑stage financing docs (seek local legal advice)."
              }
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-12 not-prose", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleCompanyCTA,
          {
            title: `Need help with ${TOPIC}?`,
            body: "Join the MLAI community to connect with peers and mentors in Australia.",
            buttonText: "Get recommendations",
            buttonHref: "/contact",
            note: "Friendly, community‑first support—no hard sell."
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleDisclaimer, {})
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AuthorBio, { author: authorDetails }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleFAQ, { items: faqItems }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleFooterNav, { backHref: "/articles", topHref: "#" })
    ] })
  ] });
}
export {
  ArticlePage as default,
  faqItems,
  summaryHighlights,
  useCustomHeader
};
