import { j as jsxRuntimeExports, F as ForwardRef$2, A as ArticleDisclaimer } from "./server-build-DGuowwjZ.js";
import { A as ArticleHeroHeader, a as ArticleTocPlaceholder, b as ArticleImageBlock, Q as QuoteBlock, c as ArticleFAQ, d as AuthorBio, e as ArticleFooterNav } from "./ArticleTocPlaceholder-Do4c2OpE.js";
import { A as ArticleStepList, a as ArticleCompanyCTA } from "./ArticleStepList-BURYQrdD.js";
import { A as AudienceGrid, F as ForwardRef } from "./AudienceGrid-Cv0i5y2N.js";
import { A as ArticleResourceCTA } from "./ArticleResourceCTA-PGgKzCy1.js";
import { A as ArticleCallout, M as MLAITemplateResourceCTA } from "./MLAITemplateResourceCTA-BdznCDV4.js";
import { A as ArticleReferences } from "./ArticleReferences-HQ7rjtnV.js";
import { g as getDefaultArticleAuthorDetails } from "./authors-DzySQTZP.js";
import { H as House } from "./house-C2Qzo5EV.js";
import { F as ForwardRef$1 } from "./AcademicCapIcon-CU_w7ImP.js";
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
const useCustomHeader = true;
const TOPIC = "How to get into venture capital";
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails();
const AUTHOR = AUTHOR_PROFILE.name ?? "Dr Sam Donegan";
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? AUTHOR_PROFILE.credentials ?? "Founder";
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? "";
const AUTHOR_AVATAR = AUTHOR_PROFILE.avatarUrl ?? "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80";
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-d23bd6be-5c90-4bb8-bc19-02189749e2c6.jpg?alt=media&token=97b584da-e610-47a2-b038-fc9c7ea3ce3f";
const HERO_IMAGE_ALT = "Small team reviewing an investment memo on a laptop with charts";
const faqItems = [
  {
    id: 1,
    question: "Do I need an MBA to get into VC in Australia?",
    answer: "No. Australian VC firms hire operators (product, engineering, data/AI), founders, analysts and consultants. An MBA can help with signalling and networks, but a visible track record (memos, thesis, founder references) matters more."
  },
  {
    id: 2,
    question: "What entry-level roles exist?",
    answer: "Analyst and Investment Associate roles are the most common. Some firms offer internships or fellowships. Platform roles (community, portfolio success, talent) can also be an entry point that later transitions into investing."
  },
  {
    id: 3,
    question: "How can I build “deal sense” without a VC job?",
    answer: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Publish short investment memos, construct a simple pipeline (e.g., 20–40 startups you follow), and run small founder interviews. If you can invest personally, be mindful of Australia’s wholesale investor rules under the Corporations Act 2001 (Cth) s708. If not, simulate: scorecards, theses, and public write‑ups." })
  },
  {
    id: 4,
    question: "Do I need a licence to work in VC?",
    answer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      "VC firms typically operate under an Australian Financial Services Licence (AFSL) or through authorised representatives. Individual junior investors generally don’t hold a personal AFSL, but you must follow firm policies and law. See ASIC’s AFSL guidance:",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://asic.gov.au/regulatory-resources/afsl/", target: "_blank", rel: "noreferrer", children: "asic.gov.au/regulatory-resources/afsl/" }),
      "."
    ] })
  },
  {
    id: 5,
    question: "Where do VC jobs get posted in Australia?",
    answer: "Fund websites, LinkedIn, university careers portals, and community newsletters. Many roles are networked first, so warm references from founders or portfolio operators materially increase your chances."
  },
  {
    id: 6,
    question: "How competitive is VC in Australia?",
    answer: "Very. Teams are small and roles open infrequently. Expect multi‑round interviews focused on your thesis, founder empathy, and written memos. A visible body of work often differentiates candidates with similar CVs."
  },
  {
    id: 7,
    question: "Is AI expertise useful to VC teams?",
    answer: "Yes. Funds increasingly value genuine product and ML/AI experience—especially the ability to evaluate use‑cases, moat, data advantages, and model/infra trade‑offs. Translate your technical depth into clear commercial assessments."
  }
];
const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro: "Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).",
  items: [
    {
      label: "Do you need an MBA to get into VC?",
      description: "No. Helpful for networks, but Australian firms prioritise a visible track record—memos, thesis, and founder references."
    },
    {
      label: "How to get VC experience without a fund job?",
      description: "Publish investment memos, join internships/fellowships, scout or simulate deals, and interview founders ethically."
    },
    {
      label: "How competitive are VC roles in Australia?",
      description: "Very. Teams are small and roles open rarely; strong writing, thesis depth, and credible references stand out."
    }
  ]
};
function ArticlePage() {
  const breadcrumbs = [
    { label: "Home", href: "/", icon: House },
    { label: "Articles", href: "/articles" },
    { label: TOPIC, current: true }
  ];
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
        breadcrumbs,
        title: `${TOPIC} (2026)`,
        titleHighlight: TOPIC,
        headerBgColor: "purple",
        summary: summaryHighlights,
        heroImage: HERO_IMAGE,
        heroImageAlt: HERO_IMAGE_ALT
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:absolute lg:right-0 lg:top-0 lg:w-72", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleTocPlaceholder, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "prose prose-lg prose-indigo max-w-3xl px-4 py-10 sm:px-6 lg:px-8 text-gray-700 prose-headings:text-gray-900 hover:prose-a:text-[--brand-ink]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: TOPIC }),
          " — Australia’s VC teams are small and roles open infrequently. Your advantage is a visible body of work: crisp memos, a focused thesis, and genuine founder empathy. This guide distils common hiring signals, Australian entry paths, and a 90‑day plan you can start today."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleImageBlock,
          {
            src: HERO_IMAGE,
            alt: HERO_IMAGE_ALT,
            width: 1200,
            height: 630,
            containerClassName: "my-10"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "What Australian VC firms actually hire for in 2026" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Patterns from public job ads and hiring updates are consistent: clear written thinking (investment memos), founder empathy, sector insight (often AI, climate, deep tech), and disciplined sourcing. Technical literacy helps—especially the ability to assess product, data advantages, and competitive moats—then translate that into a concise, defensible view." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Evidence of judgment: 5–10 public memos beat 5–10 generic coffee chats." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Networks that compound: warm intros from respected founders or operators." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Thesis depth: a 3–5 page, AU‑specific thesis with pipeline examples." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Craft: crisp writing, respectful outreach, confidentiality habits." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleResourceCTA,
          {
            eyebrow: "Download",
            title: `Get the checklist for ${TOPIC}`,
            description: "Practical template to apply the concepts immediately.",
            buttonLabel: "Download now",
            buttonHref: "#",
            accent: "purple"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleCallout, { title: "Make your work observable", variant: "brand", icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "💡" }), children: "Publish one short memo a week for 8–10 weeks. Keep a consistent structure (problem, product, market, moat, risks, verdict). Link your best three in applications." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Entry paths that actually work in Australia" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-94dc3c22-e744-4ba1-85ab-c70faddc97e1.jpg?alt=media&token=c1758f7b-a1d4-4b1f-a588-b697ad10dfe9", alt: "People collaborating in a vibrant 90s tech startup setting, showcasing innovative entry paths in Australia.", className: "w-full rounded-lg my-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "There isn’t one doorway into VC. In Australia, successful candidates typically come through one of four routes. Choose the path that aligns to your current experience and make your progress easy to verify." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Analyst/Associate via finance or consulting" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Classic entry: strong analytical skills, structured writing, and exposure to transactions or markets. Strengthen with a sector thesis (e.g., AI tooling for SMEs, climate software) and founder references." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Operator‑to‑investor (founder, product, engineering, data/AI)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "If you have shipped products or led teams, emphasise customer insight, speed, and your pattern recognition across launches. Translate build experience into investment signals and post‑investment support." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Scout/angel/investment club" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Some investors spot talent through quality referrals and memos. If you can legally invest, start tiny and document learning. If you can’t, simulate with public memos and diligence checklists; be mindful of Australia’s wholesale investor rules (Corporations Act s708)." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "University, accelerator, or CVC programmes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Fellowships, internships, accelerator ops, and corporate venture teams offer deal exposure and rigorous screening practice. Seek roles that let you interview founders, write memos, and sit in on IC discussions." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Build a track record without writing a cheque" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-8cade6f7-dfa0-416a-a8e7-40fad83ce82d.jpg?alt=media&token=4c60e24a-0a2e-4fa2-a691-eebccfc209f0", alt: "Nostalgic 90s film vibe featuring diverse people collaborating in a dynamic tech startup environment.", className: "w-full rounded-lg my-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "You don’t need a fund title to demonstrate judgment. Show your work: structured memos, a small pipeline, and founder conversations. Quality beats quantity." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleStepList,
          {
            title: "Practical steps",
            steps: [
              "Pick one AU‑relevant thesis (e.g., applied AI in healthcare) and outline 5–7 signals you believe matter.",
              "Publish 6–10 short memos using a consistent, comparable template; include risks and a verdict.",
              "Run 8–12 respectful founder interviews (off‑the‑record), summarising learnings without disclosing confidential info."
            ],
            accent: "indigo"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(QuoteBlock, { title: "Evidence over claims", variant: "purple", children: "Most Australian VC teams are small and roles open rarely. A public trail of thoughtful memos and founder references is the strongest differentiator." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Where to find roles and real deal flow in Australia" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Roles: check fund websites, LinkedIn, and university portals, and follow partners on social channels. Deal flow: attend local meetups, demo days, and technical communities; ask founders thoughtful, specific questions and follow up with concise notes. MLAI is a not‑for‑profit community that connects Australian AI builders—use communities like this to learn responsibly and meet peers." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Jobs: fund career pages, LinkedIn job alerts, university/accelerator newsletters." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Signals: GitHub activity, open‑source traction, early design partners, customer references." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Etiquette: always ask permission before sharing anything beyond public info." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AudienceGrid,
          {
            heading: "Who this helps",
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
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "MBA, masters or certificates: what actually helps?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Degrees can expand networks and signal commitment, but they’re neither necessary nor sufficient. Prioritise experiences that make your judgment legible: shipping products, conducting founder interviews, publishing memos, and contributing to a clear thesis. If you pursue study, anchor it to a concrete output (a portfolio of memos, a research project, or an internship)." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Compliance, ethics and conflicts (AU basics)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "VC firms operate within Australian financial services law and internal policies. Expect confidentiality obligations, conflict‑of‑interest disclosures, and careful handling of non‑public information. Many firms hold an AFSL (or operate via authorised reps). Junior investors focus on research and diligence under supervision. This article is general information—seek independent advice for your situation." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            "AFSL overview: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://asic.gov.au/regulatory-resources/afsl/", target: "_blank", rel: "noreferrer", children: "asic.gov.au/regulatory-resources/afsl/" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Wholesale investor concepts (Corporations Act 2001 (Cth) s708) if you ever invest personally—get legal advice first." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "VC programme context: Australia recognises venture capital limited partnership structures; see government resources for current settings." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MLAITemplateResourceCTA, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "A 90‑day plan to move toward VC" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Commit to a cadence you can keep. In three months you can build credible, visible momentum." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Weeks 1–2:" }),
            " Pick one thesis. Draft a 2–3 page brief and a memo template."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Weeks 3–8:" }),
            " Publish six memos (one per week). Do three structured founder interviews."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Weeks 9–12:" }),
            " Consolidate into a 4–5 page thesis update, include pipeline and learnings. Ask two founders and one operator for feedback and a short reference."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-gray-900 mb-4", children: "Your Next Steps" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600", children: "1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Download the checklist mentioned above." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600", children: "2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Draft your initial goals based on the template." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600", children: "3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Discuss with your team or mentor." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleCompanyCTA,
          {
            title: `Need help with ${TOPIC}?`,
            body: "Join the MLAI community to collaborate with fellow AI practitioners in Australia.",
            buttonText: "Get recommendations",
            buttonHref: "/contact",
            note: "You can filter by topic, format (online/in-person), and experience level."
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleFAQ, { items: faqItems }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ArticleReferences,
        {
          heading: "Sources",
          description: "Official and foundational references for Australian settings.",
          headingId: "references",
          references: [
            {
              id: 1,
              href: "https://asic.gov.au/regulatory-resources/afsl/",
              title: "Australian Financial Services Licence (AFSL) overview",
              publisher: "ASIC",
              category: "government",
              description: "Regulatory guidance on AFS licensing in Australia."
            },
            {
              id: 2,
              href: "https://www.legislation.gov.au/Series/C2004A01268",
              title: "Corporations Act 2001 (Cth), s708 – Offers without disclosure",
              publisher: "Federal Register of Legislation",
              category: "government",
              description: "Wholesale/sophisticated investor concepts relevant to private offers."
            },
            {
              id: 3,
              href: "https://www.industry.gov.au/",
              title: "Venture capital programs (overview)",
              publisher: "Department of Industry, Science and Resources",
              category: "government",
              description: "Background on Australian venture and innovation programs (overview page; check current settings)."
            }
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleDisclaimer, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AuthorBio, { author: authorDetails }),
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
