import { j as jsxRuntimeExports, F as ForwardRef$2 } from "./server-build-DGuowwjZ.js";
import { f as Link } from "./worker-entry-BTvr0DWh.js";
import { A as ArticleHeroHeader, a as ArticleTocPlaceholder, b as ArticleImageBlock, Q as QuoteBlock, d as AuthorBio, c as ArticleFAQ, e as ArticleFooterNav } from "./ArticleTocPlaceholder-Do4c2OpE.js";
import { A as ArticleStepList, a as ArticleCompanyCTA } from "./ArticleStepList-BURYQrdD.js";
import { A as AudienceGrid, F as ForwardRef } from "./AudienceGrid-Cv0i5y2N.js";
import { A as ArticleResourceCTA } from "./ArticleResourceCTA-PGgKzCy1.js";
import { A as ArticleCallout, M as MLAITemplateResourceCTA } from "./MLAITemplateResourceCTA-BdznCDV4.js";
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
const TOPIC = "Australian founders: from colonial beginnings to startup builders";
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails();
const AUTHOR = AUTHOR_PROFILE.name ?? "Dr Sam Donegan";
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? "Founder";
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? "";
const AUTHOR_AVATAR = AUTHOR_PROFILE.avatarUrl ?? "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80";
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-4ad6f4bb-7daf-483f-9011-70292f8e493e.jpg?alt=media&token=fd644fd0-5792-4824-acb2-4bb873b075d8";
const HERO_IMAGE_ALT = "Australian founders collaborating in a modern workspace";
const faqItems = [
  // ≥6 items; AU context; evidence-forward; answers can be strings or JSX.
  { id: 1, question: "Who are historically referred to as the “founders” of Australia?", answer: "The term often refers to early colonial leaders around the 1788 First Fleet and figures leading to Federation in 1901, but it is contested because it overlooks First Nations custodianship. Contemporary usage is shifting to acknowledge Indigenous sovereignty and avoid implying ownership." },
  { id: 2, question: "How is “Australian founder” used in startups today?", answer: "It typically means someone who establishes and leads an Australian-based company, often backed by local investors or headquartered in major hubs like Sydney or Melbourne. The focus is on value creation, compliance with Australian law, and contribution to the local economy." },
  { id: 3, question: "Which hubs matter most for founders in 2026?", answer: "Sydney, Melbourne, and Brisbane remain the largest, with growing activity in Perth and Adelaide. University-linked precincts and sector clusters (fintech in Sydney, AI/health in Melbourne/Brisbane) provide accelerators, labs, and meetups." },
  { id: 4, question: "What funding routes are common for Australian founders?", answer: "Angel syndicates, early-stage VCs, industry-linked accelerators, the R&D Tax Incentive, Export Market Development Grants, and equity crowdfunding. Each has eligibility rules; founders should check current guidance as at 2026 on government sites." },
  { id: 5, question: "Can overseas founders base themselves in Australia?", answer: "Yes, but they must meet visa requirements (e.g., Global Talent visa or Temporary Skill Shortage streams) and set up compliant entities. Legal advice and migration guidance are recommended to ensure status and payroll obligations are met." },
  { id: 6, question: "Where can AI-focused founders find community?", answer: "Sector meetups (e.g., AI/ML groups), university innovation hubs, Aussie Founders Network for general networking, and not-for-profit communities like MLAI for practitioners and enthusiasts across Australia." }
];
const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro: "Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).",
  items: [
    {
      label: "Who were the founders of modern Australia?",
      description: "Colonial leaders of the 1788 First Fleet and federation figures, though usage now notes Indigenous custodianship and avoids implying ownership."
    },
    {
      label: "What defines an Australian company founder today?",
      description: "Someone establishing and leading an Australian-based firm with compliant structures, local presence, and contribution to the economy."
    },
    {
      label: "Where do Australian founders get funding in 2026?",
      description: "Angels, early-stage VCs, accelerators, R&D Tax Incentive, Export Market Development Grants, and equity crowdfunding."
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-transparent", children: [
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
          " – Modern search results blur colonial history, company creation, and startup life. This 2026 guide separates those threads: acknowledging First Nations custodianship, outlining how “founder” is used in today’s startup economy, and mapping the Australian ecosystems where builders gather."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleImageBlock, { src: HERO_IMAGE, alt: HERO_IMAGE_ALT, width: 1200, height: 630 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Who gets called a “founder” of Australia? From 1788 to federation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Early colonial accounts often labelled First Fleet leaders and Federation architects as “founders”, but that framing overlooks more than 65,000 years of First Nations custodianship. In 2026, historians and community organisations increasingly emphasise that colonisation is not “founding”; instead, it marks the start of British settlement and the path to the 1901 Commonwealth. When using the term “founder”, be explicit about whether you mean colonial office-holders, federation framers, or modern company creators—and respect Indigenous sovereignty in your language." }),
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleCallout,
          {
            title: "Phrase with care",
            variant: "brand",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "💡" }),
            className: "not-prose",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-gray-800", children: "When discussing colonial figures, pair terms like “Governor Phillip” or “colonial administrators” instead of “founders”. For company builders, “startup founder” or “Australian company founder” is clearer and avoids historical ambiguity." })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Networks uniting Australian founders in 2026" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-c198b610-9621-43dc-938b-98f98231b211.jpg?alt=media&token=e27b0109-6a3b-4a6d-a3fd-d20952aaa083", alt: "A vibrant 90s film-style scene with diverse Australian founders collaborating in a tech startup environment.", className: "w-full rounded-lg my-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Today’s founders lean on community: Aussie Founders Network offers broad networking; university precincts host accelerators; sector-specific meetups (fintech, climate, AI) provide peer reviews and demo days. Not-for-profit groups—such as MLAI for AI practitioners—fill the gap for skills-sharing and local accountability, especially outside capital cities." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "What founders look for in a network" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Founders prioritise access to mentors, investor office hours, lightweight legal/accounting templates, and trusted referrals. In 2026, many hubs add responsible-AI guidance, data privacy primers, and export-readiness sessions to match evolving regulation." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleStepList,
          {
            title: "Practical steps",
            steps: [
              { label: "Map 3–5 active communities in your city (general + sector + stage-specific)." },
              { label: "Attend two events this month; schedule follow-ups with one mentor and one peer founder." },
              { label: "Join one values-aligned non-profit community (e.g., MLAI for AI builders) to keep learning affordably." }
            ],
            accent: "indigo"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(QuoteBlock, { title: "Expert insight", variant: "purple", children: "“Communities reduce founder isolation and sharpen judgment. A small, consistent peer circle often beats a long list of loose connections.”" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Startup pathways: funding, visas, and compliance for new founders" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-7ebdacea-8e7f-4524-ac4f-62bebd24797c.jpg?alt=media&token=ad904359-2eef-4264-bb18-4a4f0903caf5", alt: "Tech entrepreneurs collaborating in a vibrant 90s-inspired startup workspace, embodying innovation and creativity.", className: "w-full rounded-lg my-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Australian founders in 2026 typically mix angel capital, early-stage VCs, and government support. The R&D Tax Incentive remains central for tech-heavy builds, while Export Market Development Grants help outbound growth. Equity crowdfunding suits consumer-facing products with engaged audiences. Overseas founders considering Australia should assess visa options (e.g., Global Talent visa) and set up entities compliant with the Corporations Act, Fair Work obligations, and privacy rules (including the Privacy Act and sector-specific guidance for health or finance)." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleCallout, { variant: "info", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-800", children: "Always verify funding and visa settings on official Australian Government sites as at 2026; programs and thresholds can change year to year." }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Notable sectors and Australian company founders to watch" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Software remains strong—Atlassian (Mike Cannon-Brookes, Scott Farquhar) set an enduring playbook. Design-led tools like Canva (Melanie Perkins, Cliff Obrecht, Cameron Adams) showed global reach from Australia. SafetyCulture (Luke Anear) expanded industrial SaaS. In AI, newer companies focus on model evaluation, safety, and domain-specific copilots; health and climate AI ventures gain attention thanks to university research pipelines. Use these examples to benchmark governance, hiring pace, and capital efficiency rather than copy valuation narratives." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Signals of resilient Australian founders" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Look for disciplined burn, transparent governance, compliance-ready data practices, and early customer validation. These traits matter more than headline valuations in 2026’s funding climate." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Move from research to action in the Australian ecosystem" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Whether you’re clarifying historical language or mapping startup supports, anchor on evidence: official guidance for compliance, peer-reviewed community knowledge, and mentor feedback from local hubs. Small, consistent steps—joining a community, shipping a pilot, and tracking customer proof—beat waiting for perfect conditions." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100 not-prose", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-gray-900 mb-4", children: "Your Next Steps" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]", children: "1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Download the checklist mentioned above." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]", children: "2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Draft your initial goals based on the template." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]", children: "3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Discuss with your team or mentor." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MLAITemplateResourceCTA, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-12 not-prose", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleCompanyCTA,
          {
            title: `Need help with ${TOPIC}?`,
            body: "Join the MLAI community to collaborate with fellow AI practitioners in Australia.",
            buttonText: "Get recommendations",
            buttonHref: "https://mlai.au/contact",
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
