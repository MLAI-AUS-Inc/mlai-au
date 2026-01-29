import { j as jsxRuntimeExports } from "./server-build-DGuowwjZ.js";
import { A as ArticleHeroHeader, Q as QuoteBlock, a as ArticleTocPlaceholder, b as ArticleImageBlock, d as AuthorBio, c as ArticleFAQ, e as ArticleFooterNav } from "./ArticleTocPlaceholder-Do4c2OpE.js";
import { A as AudienceGrid, F as ForwardRef } from "./AudienceGrid-Cv0i5y2N.js";
import { H as House } from "./house-C2Qzo5EV.js";
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
const TOPIC = "AI hackathons and events in Melbourne";
const AUTHOR = "Dr Sam Donegan";
const AUTHOR_ROLE = "Medical Doctor, AI Startup Founder & Lead Editor";
const AUTHOR_BIO = "Sam leads the MLAI editorial team, combining deep research in machine learning with practical guidance for Australian teams adopting AI responsibly.";
const AUTHOR_AVATAR = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/1732146096971.jpeg?alt=media&token=8cbc3057-565b-48d0-be4f-e786332a6376";
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-15a64fe7-880f-4170-80a8-2c3569c3e951.jpg?alt=media&token=0e40531f-09c8-41b6-9956-b5449ca38836";
const HERO_IMAGE_ALT = "Participants collaborating at an AI hackathon in Melbourne";
const faqItems = [
  { id: 1, question: "What types of AI hackathons run in Melbourne in 2026?", answer: "Most 2026 hackathons mix generative AI, data-for-good, and civic tech themes. Expect 24–48 hour sprints, with a few week-long online build phases for teams outside the CBD." },
  { id: 2, question: "How much do Melbourne AI hackathons cost to join?", answer: "Student and community events are often free or <$50. Corporate-run hackathons may charge $50–$120 to cover space, catering, and cloud credits. Always check inclusions (meals, Wi‑Fi, GPU credits)." },
  { id: 3, question: "Do I need to be an experienced developer to participate?", answer: "No. Teams usually welcome designers, data analysts, product managers, and subject-matter experts. Many events offer beginner workshops on day one covering APIs, model safety, and pitching." },
  { id: 4, question: "What should I bring to an in-person hackathon in Melbourne?", answer: "Bring your laptop, chargers, ID for venue access, reusable water bottle, and any adapters. Some venues require closed-toe shoes and have 11 pm building exits—check the event brief." },
  { id: 5, question: "How are AI projects judged?", answer: "Common criteria: problem clarity, working prototype, responsible AI approach (data sources, bias mitigation, safety), user validation, and pitch clarity. Panels often include industry engineers and domain experts." },
  {
    id: 6,
    question: "Are there Melbourne-specific considerations for data and privacy?",
    answer: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Yes. Follow the Privacy Act 1988 (Cth) and the Victorian Protective Data Security Standards when handling personal or government data. Use synthetic or de-identified datasets unless explicit consent and approvals exist." })
  },
  { id: 7, question: "Where can I find upcoming AI events in Melbourne?", answer: "Check platforms like Meetup, Eventbrite, university innovation hubs (RMIT, Monash, University of Melbourne), and local communities such as Melbourne AI, Hackathons Australia, and GovHack channels." }
];
const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro: "Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).",
  items: [
    {
      label: "How do Melbourne AI hackathon judging criteria work?",
      description: "Most events score problem clarity, working prototype, responsible AI approach, user validation, and pitch quality."
    },
    {
      label: "What does it cost to join an AI hackathon in Melbourne?",
      description: "Community events are often free or under $50, while corporate hackathons typically range from $50–$120 with catering and credits."
    },
    {
      label: "Do I need prior AI experience for Melbourne hackathons?",
      description: "No—teams welcome designers, product leads, and domain experts; many events offer beginner workshops and mentor support."
    }
  ]
};
const useCustomHeader = true;
function ArticlePage() {
  const authors = [
    {
      name: AUTHOR,
      role: AUTHOR_ROLE,
      bio: AUTHOR_BIO,
      avatarUrl: AUTHOR_AVATAR
    }
  ];
  const breadcrumbs = [
    { label: "Home", href: "/articles", icon: House },
    { label: TOPIC, current: true }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ArticleHeroHeader,
      {
        breadcrumbs,
        title: TOPIC,
        headerBgColor: "cyan",
        summary: {
          heading: summaryHighlights.heading,
          intro: summaryHighlights.intro,
          items: summaryHighlights.items
        },
        heroImage: HERO_IMAGE,
        heroImageAlt: HERO_IMAGE_ALT
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      QuoteBlock,
      {
        variant: "purple",
        title: "Quick note",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "💡" }),
        className: "my-6",
        children: [
          "This guide is part of our broader series on ",
          TOPIC,
          ". Prefer to jump ahead?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/articles", className: "font-semibold text-white underline-offset-4 hover:underline", children: "Browse related articles →" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleTocPlaceholder, { className: "mb-12" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AudienceGrid,
      {
        heading: "Read this if you are:",
        cards: [
          {
            title: "Founders & Teams",
            description: "For leaders validating ideas, seeking funding, or managing teams.",
            variant: "orange",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef, { className: "w-5 h-5 text-white", strokeWidth: 1.8 })
          },
          {
            title: "Students & Switchers",
            description: "For those building portfolios, learning new skills, or changing careers.",
            variant: "purple",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "svg",
              {
                className: "w-5 h-5 text-white",
                fill: "none",
                viewBox: "0 0 24 24",
                strokeWidth: 1.5,
                stroke: "currentColor",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                  }
                )
              }
            )
          },
          {
            title: "Community Builders",
            description: "For workshop facilitators, mentors, and ecosystem supporters.",
            variant: "yellow",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "svg",
              {
                className: "w-5 h-5 text-black",
                fill: "none",
                viewBox: "0 0 24 24",
                strokeWidth: 1.5,
                stroke: "currentColor",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                  }
                )
              }
            )
          }
        ],
        className: "my-10"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: TOPIC }),
        " helps Australian founders and teams avoid common pitfalls. This guide is designed to be actionable, evidence-based, and tailored to the 2026 landscape."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleImageBlock, { src: HERO_IMAGE, alt: HERO_IMAGE_ALT, width: 1200, height: 630 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
        "What is ",
        TOPIC,
        "?"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "AI hackathons are short, intensive build events where teams prototype AI-powered solutions—often using generative models, vector search, or computer vision—against a defined brief. In Melbourne, they commonly run at universities (RMIT Storey Hall, Monash Clayton), innovation hubs (Melbourne Connect), and coworking spaces (The Commons, Stone & Chalk). Formats range from 24-hour sprints to week-long hybrids that start online and finish with in-person demos." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Events are typically open to multidisciplinary teams. Organisers provide problem statements, datasets, and cloud credits (AWS, Azure, or GCP) along with mentor hours on data ethics, prompt engineering, and product validation. Most operate under a code of conduct aligned to the Australian Privacy Act 1988 and local venue safety rules." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Why it matters in 2026" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ArticleImageBlock,
        {
          src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-6c812263-ca23-4cc5-8427-906358a3341b.jpg?alt=media&token=67b0bc14-ce62-4d41-b4f0-6a1c3719848f",
          alt: "People collaborating in a retro tech startup setting, embodying the spirit of innovation in 2026."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Melbourne's AI ecosystem is expanding with new university research centres, state-backed innovation grants, and an influx of applied AI roles in health, fintech, and logistics. Hackathons are a practical way to pressure-test ideas, meet collaborators, and gain feedback from engineers and domain experts. Ignoring these events can mean missing partnership opportunities, datasets, and early user validation." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "In 2026, organisers increasingly emphasise responsible AI: teams are asked to document data provenance, bias considerations, and evaluation steps. Events that surface well-documented, safety-aware prototypes tend to perform better with judges and potential partners." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        QuoteBlock,
        {
          variant: "purple",
          title: "Pro Tip",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "💡" }),
          className: "my-8",
          children: "Arrive with a sketched user flow and pre-tested API keys so your team spends the first hour building, not debugging access."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Step-by-Step Guide" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ArticleImageBlock,
        {
          src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-e4e95bde-f9ee-41ea-918d-0a36a2f87325.jpg?alt=media&token=99c9450a-725d-48f6-b577-160176dccfe4",
          alt: "People collaborating in a vibrant tech startup, captured in a nostalgic 90s film aesthetic."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Step 1: Preparation" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Confirm the brief, judging criteria, and IP rules (many Melbourne events use open-source-friendly terms; corporate ones may retain showcase rights). Form a balanced team: at least one builder (backend or ML), one frontend or UX, and one person focused on user validation and pitch. Preload starter kits for common stacks (Next.js + serverless functions, Python + FastAPI) and ensure you have access to vector databases or embeddings APIs if needed." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Check venue logistics—Wi‑Fi reliability, power outlets, late-night access, and quiet rooms. Pack headphones, adapters, and consider offloading heavy training to managed endpoints or hosted notebooks to avoid local GPU constraints." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Step 2: Execution" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Spend the first 60–90 minutes refining the problem statement and who benefits. Build a thin vertical slice: data ingestion, minimal prompt/endpoint, evaluation loop, and a UI that proves the workflow. Use synthetic or de-identified data unless consented sources are provided. Keep a changelog and note model settings, safety filters, and fallback behaviour for downtime." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Book mentor slots early; Melbourne events often have limited AI safety and product mentors. Run quick user tests with nearby teams or mentors to validate the core interaction. If your solution handles personal data, include consent flow copy and explain storage locations (e.g., AU regions for compliance)." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Step 3: Review" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "With 2–3 hours left, freeze scope. Prioritise reliability over extra features: add input validation, guardrails, and simple analytics. Prepare a concise demo: problem, what you built, why AI is essential, evidence of user value, and how you mitigated risks. Rehearse a 3–5 minute pitch and a 1-minute backup version. Provide a short README with setup steps, dataset notes, and licensing." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "After the event, follow up within 48 hours with teammates, organisers, and judges. Share a link to the demo, source (if open), and next steps. Many Melbourne hackathons feed into accelerator intakes—being proactive keeps momentum." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Conclusion" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "AI hackathons and events in Melbourne offer fast feedback, credible mentors, and community connections. Prepare a balanced team, build a narrow but reliable slice, and foreground responsible AI choices. Doing so improves your odds of a strong demo and meaningful post-event opportunities." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(QuoteBlock, { variant: "purple", className: "mt-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "Your Next Steps" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-white/90", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white", children: "1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Find an upcoming hackathon or AI event in Melbourne that matches your skill level." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-white/90", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white", children: "2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Assemble a balanced team—one builder, one designer/UX, one pitch lead—before you register." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-white/90", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white", children: "3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Pre-test your API keys and prepare a starter kit so you can hit the ground running." })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "my-10 border-gray-100" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AuthorBio, { authors }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleFAQ, { items: faqItems }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleFooterNav, {})
  ] });
}
export {
  ArticlePage as default,
  faqItems,
  summaryHighlights,
  useCustomHeader
};
