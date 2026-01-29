import { j as jsxRuntimeExports, a as ForwardRef, F as ForwardRef$3 } from "./server-build-DGuowwjZ.js";
import { A as ArticleHeroHeader, a as ArticleTocPlaceholder, b as ArticleImageBlock, Q as QuoteBlock, d as AuthorBio, c as ArticleFAQ, e as ArticleFooterNav } from "./ArticleTocPlaceholder-Do4c2OpE.js";
import { A as ArticleStepList, a as ArticleCompanyCTA } from "./ArticleStepList-BURYQrdD.js";
import { A as AudienceGrid, F as ForwardRef$1 } from "./AudienceGrid-Cv0i5y2N.js";
import { F as ForwardRef$2 } from "./AcademicCapIcon-CU_w7ImP.js";
import "./worker-entry-BTvr0DWh.js";
import "node:events";
import "node:stream";
import "util";
import "stream";
import "path";
import "node:net";
import "url";
import "crypto";
import "assert";
import "zlib";
import "events";
import "node:path";
import "node:url";
const TOPIC = "I've vibe-coded my startup—now what? How to get your MVP in front of users";
const AUTHOR = "Dr Sam Donegan";
const AUTHOR_ROLE = "Medical Doctor, AI Startup Founder & Lead Editor";
const AUTHOR_BIO = "Sam leads the MLAI editorial team, combining deep research in machine learning with practical guidance for Australian teams adopting AI responsibly.";
const AUTHOR_AVATAR = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/1732146096971.jpeg?alt=media&token=8cbc3057-565b-48d0-be4f-e786332a6376";
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-a8f7d8bc-9e4a-4112-8b69-729f16129e61.jpg?alt=media&token=4ba2d150-2aa5-4945-9c4a-69013546d9ba";
const HERO_IMAGE_ALT = "Founder testing a mobile MVP with early users in a coworking space";
const faqItems = [
  // ≥6 items; AU context; evidence-forward; answers can be strings or JSX.
  { id: 1, question: "What makes an MVP “good enough” to test in Australia?", answer: "It should solve one painful user job, run reliably for a narrow cohort, and comply with local privacy rules (e.g. OAIC Australian Privacy Principles). Polish can wait—signal and safety cannot." },
  { id: 2, question: "Do I need legal terms before my first pilot?", answer: "Yes. Provide clear Terms of Use and a Privacy Policy that explains data handling, retention, and third-party services. For AI features, disclose model use and known limitations." },
  { id: 3, question: "How many users do I need to validate?", answer: "Aim for 8–12 structured pilot users first. That’s usually enough to find ~80% of critical usability issues, provided you capture evidence and iterate weekly." },
  { id: 4, question: "Can I charge for a pilot?", answer: "You can, but be transparent. A small fee or commitment (e.g. prepaid month) improves signal. For regulated sectors (health/finance), check if your pilot scope triggers licensing or clinical oversight." },
  { id: 5, question: "How do I collect feedback without bias?", answer: "Use consistent prompts, record sessions (with consent), and separate “observation” from “interpretation.” Avoid leading questions; ask users to show how they’d complete tasks." },
  {
    id: 6,
    question: "Where do I find my first Australian users?",
    answer: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc pl-6 space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Existing LinkedIn contacts filtered by role and industry." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Local meetups (e.g. meetup.com) and university societies with aligned problems." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Communities like Fishburners, Stone & Chalk, and accelerator alumni channels." })
    ] })
  }
];
const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro: "Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).",
  items: [
    {
      label: "How many users do I need to validate an MVP?",
      description: "8–12 structured pilot users usually surface ~80% of critical issues when you iterate weekly."
    },
    {
      label: "Do I need a Privacy Policy before testing?",
      description: "Yes. Publish Terms and a Privacy Policy that explain data handling and AI model use per OAIC APPs."
    },
    {
      label: "Should I charge for early pilots?",
      description: "A small, transparent fee or commitment improves signal; check sector rules if handling regulated data."
    }
  ]
};
const useCustomHeader = true;
const breadcrumbs = [
  { label: "Home", href: "/", icon: ForwardRef },
  { label: "Articles", href: "/articles" },
  { label: TOPIC, current: true }
];
function ArticlePage() {
  const authorDetails = {
    name: AUTHOR,
    role: AUTHOR_ROLE,
    bio: AUTHOR_BIO,
    avatarUrl: AUTHOR_AVATAR
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "bg-transparent", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ArticleHeroHeader,
      {
        breadcrumbs,
        title: TOPIC,
        headerBgColor: "cyan",
        summary: summaryHighlights,
        heroImage: HERO_IMAGE,
        heroImageAlt: HERO_IMAGE_ALT
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleTocPlaceholder, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "prose prose-lg prose-indigo max-w-none text-gray-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: TOPIC }),
          " – You’ve shipped a working build from late nights and lots of intuition. The fastest way to real traction in 2026 Australia is to move from “it runs” to “it proves one clear outcome” with paying, consenting users and a short learning loop."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleImageBlock, { src: HERO_IMAGE, alt: HERO_IMAGE_ALT }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Define one measurable outcome and user job" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Anchor your MVP to a single job-to-be-done with a measurable outcome. For example: “Reduce weekly reporting time for finance managers by 30%.” Document the success metric, the target role, and the environment (desktop/mobile, in-office/on-site). This lets you judge progress in days, not months." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(QuoteBlock, { variant: "orange", title: "Fast validation tip", icon: "💡", children: "Write a one-sentence win condition: “A <role> can <task> in <time> without help.” Use it to prioritise fixes and to decide if a feature ships or waits." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Set up consent, privacy, and reliability guardrails" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-f4095424-42c2-4fe9-9456-90aeb986efba.jpg?alt=media&token=1f7865ee-1cd6-457d-a677-1849705be738", alt: "People in a tech startup setting, showcasing 90s film aesthetic and collaboration on privacy and consent strategies.", className: "w-full rounded-lg my-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Before adding more features, ensure your pilot is safe to run. Publish clear Terms of Use and a Privacy Policy that match how you actually process data. If you use AI services, disclose the model provider and data flows. Avoid production secrets in client-side code, and keep logs minimal. For personal information, align with the Australian Privacy Principles (APPs) from the Office of the Australian Information Commissioner (OAIC). Reliability: add basic monitoring (uptime + errors), a single rollback path, and clear in-product status messaging." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Recruit 8–12 pilot users with structured sessions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-32d7ab6a-f3ff-42b7-ad38-721f192cf8e2.jpg?alt=media&token=3bb0ee21-6ae1-48e9-9cb4-42897d5d54a9", alt: "Diverse group collaborating in a 90s tech startup, preparing for structured user recruitment sessions.", className: "w-full rounded-lg my-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Start with warm networks: LinkedIn 2nd-degree searches, local meetups, and university clubs tied to your problem domain. Offer a short incentive (gift card or early pricing) and block 45-minute moderated sessions. Use a repeatable script: context questions, 2–3 core tasks, time-on-task measurement, and open feedback. Record sessions with consent. After each session, capture observations (what happened), interpretations (what it might mean), and decisions (what to change this week)." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Format your pilot" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Run a two-week sprint: 3–5 users in week one, iterate, then 3–7 users in week two to confirm improvements. Keep your change log public to pilots so they see momentum." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Price testing: earn signal, not perfect revenue" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Introduce pricing early to test willingness-to-pay. Choose one simple offer (e.g. monthly subscription or per-seat) and one anchor discount for early adopters. If you work in regulated industries, confirm whether charging makes you a service provider under relevant rules (e.g. health data handling). Capture objections verbatim; they inform both product and positioning." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Instrument learning loops (evidence over opinions)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Add lightweight analytics focused on the core job: task completion rate, time to complete, error/retry counts, and retention after first week. Pair numbers with qualitative notes from sessions. Ship weekly releases and share a short pilot report covering metric movement, top issues, and the next bet. This rhythm builds credibility with early customers and future investors." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Prep a lean “MVP packet” for partners and investors" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Create a single page that includes: the user/job, the win condition, 2–3 screenshots, your metric baseline, quotes from pilot users (with permission), pricing test results, and your next 4-week plan. Keep claims cautious—note known gaps, AI limitations, and risk mitigations. This packet accelerates conversations with accelerators, grant programs, and seed investors." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AudienceGrid,
          {
            heading: "Who this helps",
            cards: [
              {
                title: "Founders & Teams",
                description: "For leaders validating ideas, seeking funding, or managing teams.",
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$1, { className: "h-6 w-6" }),
                variant: "orange"
              },
              {
                title: "Students & Switchers",
                description: "For those building portfolios, learning new skills, or changing careers.",
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$2, { className: "h-6 w-6" }),
                variant: "purple"
              },
              {
                title: "Community Builders",
                description: "For workshop facilitators, mentors, and ecosystem supporters.",
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$3, { className: "h-6 w-6" }),
                variant: "yellow"
              }
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Move from vibe-coded to validated in four weeks" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Keep your MVP narrow, safe, and measurable. Run two pilot cycles, report progress weekly, and ship visible changes. With a clear win condition, evidence from 8–12 users, and transparent privacy practices, you will have the traction story needed for early revenue, partnerships, or a compelling pre-seed discussion." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleStepList,
          {
            title: "Your Next Steps",
            accent: "indigo",
            steps: [
              "Write your one-sentence win condition and publish your pilot scope.",
              "Schedule 8–12 pilot sessions with a consistent script and consent flow.",
              "Ship weekly, publish a short pilot report, and update your MVP packet."
            ],
            className: "not-prose"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-12 not-prose", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleCompanyCTA,
          {
            title: `Need help with ${TOPIC}?`,
            body: "Get practical recommendations based on your goals, time, and experience level.",
            buttonText: "Get recommendations",
            buttonHref: "#",
            note: "You can filter by topic, format (online/in‑person), and experience level."
          }
        ) })
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
