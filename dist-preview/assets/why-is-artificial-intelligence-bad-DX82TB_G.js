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
const TOPIC = "Why is artificial intelligence bad?";
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails();
const AUTHOR = AUTHOR_PROFILE.name ?? "Dr Sam Donegan";
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? "Founder";
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? "";
const AUTHOR_AVATAR = AUTHOR_PROFILE.avatarUrl ?? "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80";
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-f9e5b8be-754b-4be7-90f9-0cfe7f226d5d.jpg?alt=media&token=83d585bc-f5e8-4536-9079-a6e146abf01a";
const HERO_IMAGE_ALT = "Abstract AI circuitry with a cautionary tone";
const faqItems = [
  {
    id: 1,
    question: "Is AI illegal in Australia?",
    answer: "No. AI isn't illegal in Australia, but some uses can be unlawful if they breach existing laws (e.g., privacy, consumer, discrimination, IP). Whether a use is allowed depends on the context and controls you put in place."
  },
  {
    id: 2,
    question: "Does using public AI tools put my data at risk?",
    answer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      "Yes, potentially. Avoid pasting confidential or personal information into public tools. Check the provider\\'s data retention and training settings, use enterprise controls where possible, and apply minimisation and redaction. For Australian context, see the",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.oaic.gov.au/privacy/australian-privacy-principles", target: "_blank", rel: "noreferrer noopener", children: "Australian Privacy Principles (APPs)" }),
      " and your organisation\\'s security policies."
    ] })
  },
  {
    id: 3,
    question: "Are deepfakes illegal in Australia?",
    answer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      "Harmful deepfakes can breach existing laws (e.g., image‑based abuse offences at state/territory level, defamation, harassment). The",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.esafety.gov.au/", target: "_blank", rel: "noreferrer noopener", children: "eSafety Commissioner" }),
      " has takedown powers for some content. Rules are evolving—check current guidance and seek legal advice for specific cases."
    ] })
  },
  {
    id: 4,
    question: "Will AI take my job?",
    answer: "AI usually automates tasks within roles rather than entire occupations. Impact varies by sector. In practice, redesigning work, reskilling, and using AI as a copilot can offset displacement for many workers."
  },
  {
    id: 5,
    question: "Is AI always biased?",
    answer: "AI can amplify biases present in data or in how systems are designed and deployed. Rigorous data practices, testing, diverse evaluation sets, and human review can reduce (not eliminate) bias risk."
  },
  {
    id: 6,
    question: "What frameworks should teams in Australia use to manage AI risk?",
    answer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      "Start with recognised frameworks:",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.nist.gov/itl/ai-risk-management-framework", target: "_blank", rel: "noreferrer noopener", children: "NIST AI RMF 1.0" }),
      ",",
      " ",
      "ISO/IEC 23894 (AI risk management) and ISO/IEC 42001 (AI management systems). Align with the APPs for privacy, and maintain auditable processes (impact assessments, testing, logging, human‑in‑the‑loop)."
    ] })
  },
  {
    id: 7,
    question: "How should we handle First Nations data and AI?",
    answer: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Apply Indigenous Data Sovereignty principles (e.g., CARE with FAIR), obtain proper consent, and ensure meaningful governance and benefit sharing. See guidance from bodies like AIATSIS and relevant community organisations." })
  },
  {
    id: 8,
    question: "Where can I report harmful or scam AI content?",
    answer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      "Use platform reporting tools first. In Australia, you can also engage the",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.esafety.gov.au/", target: "_blank", rel: "noreferrer noopener", children: "eSafety Commissioner" }),
      " for online harms, the",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.oaic.gov.au/", target: "_blank", rel: "noreferrer noopener", children: "OAIC" }),
      " for serious privacy issues, and the",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.accc.gov.au/", target: "_blank", rel: "noreferrer noopener", children: "ACCC" }),
      " for scams and misleading conduct."
    ] })
  }
];
const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro: "A balanced view for Australia in 2026: privacy expectations under the APPs, risk‑based governance is emerging, and practical controls can reduce harm in real deployments.",
  items: [
    {
      label: "Is AI always harmful?",
      description: "No—risk depends on the use case and controls. With guardrails, oversight, and testing, many applications are low risk."
    },
    {
      label: "Will AI take my job?",
      description: "AI automates tasks more than whole jobs. Impacts vary by role; redesign and reskilling can offset displacement."
    },
    {
      label: "Is AI regulated in Australia?",
      description: "Yes via existing laws (privacy, consumer, discrimination) with risk‑based guidance emerging. Check OAIC and government updates."
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
          " — If you\\'ve searched this, you\\'re likely seeing headlines about deepfakes, job losses, and biased algorithms. This article separates signal from noise: the real risks, what Australia is doing about them, and practical ways to use AI safely."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleImageBlock, { src: HERO_IMAGE, alt: HERO_IMAGE_ALT, width: 1200, height: 630 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Why do people say AI is bad?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Most concerns fall into a few buckets: privacy leaks and misuse of personal data; unfair or biased outcomes; misinformation and deepfakes; safety, reliability and security failures; environmental and compute costs; and concentration of power. These are not theoretical—each has real-world examples. The good news: many risks can be reduced with better design, guardrails, and oversight." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Importantly, ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "“AI” is not one thing" }),
          ". Risk depends on the use case, model type, data, and context. A content assistant for drafting emails has a different risk profile to an AI system screening rental applications or triaging health queries."
        ] }),
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
            title: "Tip: Separate ‘capability’ from ‘harm’",
            variant: "brand",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "💡" }),
            className: "not-prose",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-gray-800", children: "Ask two questions: 1) What can this model do? 2) What could go wrong for people if we deploy it? The second question drives your mitigations and review process." })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "What are the biggest risks right now?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-15c7e783-7498-45e8-98eb-315e5624a333.jpg?alt=media&token=644cd72c-1009-4168-9220-f16699472dde", alt: "Vibrant 90s film aesthetic capturing a dynamic tech startup team in an innovative workspace.", className: "w-full rounded-lg my-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Bias and discrimination: models learn from data that reflect society\\'s historical patterns. Without careful curation and testing, outputs can skew against protected groups. Use diverse evaluation sets, document limitations, and require human review for high-stakes decisions." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Privacy and data protection: sensitive inputs can be retained or inferred. Under Australia\\'s ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.oaic.gov.au/privacy/australian-privacy-principles", target: "_blank", rel: "noreferrer noopener", children: "APPs" }),
          ", organisations must collect only what\\'s necessary, get appropriate consent, secure personal information, and be transparent about use."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Misinformation and deepfakes: generative models can produce persuasive but false content at scale. Watermarking, provenance tools, and platform policies help, but your best defence is layered verification and human oversight for high-impact content." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Safety, reliability and security: hallucinations, prompt injection, data poisoning, and model theft are active threats. Use threat modelling, adversarial testing, content filters, rate limiting, and retrieval strategies to bound behaviour." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Power concentration and access: a small number of firms control advanced models and compute, which can create dependency risks for governments, schools, and SMEs. Prefer portable patterns (standardised interfaces, data export) and avoid single-vendor lock-in." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Risks that often get overlooked" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Environmental footprint: training and running models consumes energy and water; the impact varies by data centre mix, efficiency, and workload. Measure before you scale—smaller or distilled models can often meet the need with far less cost and carbon." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Indigenous data and cultural harms: data scraped from the web can include cultural knowledge that requires consent and governance. Apply Indigenous Data Sovereignty principles and seek community-led guidance." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleStepList,
          {
            title: "Practical steps",
            steps: [
              { label: "Define the outcome and risk level for the use case" },
              { label: "Minimise data: remove personal/sensitive info where possible" },
              { label: "Choose lower‑risk patterns (e.g., RAG with citations, not open‑ended generation) — use content filters" },
              { label: "Test for bias, reliability and security; keep an audit trail" },
              { label: "Keep a human in the loop for high‑impact decisions" }
            ],
            accent: "indigo"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(QuoteBlock, { title: "Expert insight", variant: "purple", children: "“Treat AI like any powerful tool: start small, measure risks, and scale only when you can show it\\'s safe, fair, and useful for people.”" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Will AI take jobs in Australia?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-6b96f637-e3ea-4a68-b97c-523b23cb22a0.jpg?alt=media&token=763364f1-81d9-46aa-ae40-815889390b15", alt: "90s film-style photo of diverse professionals collaborating in a tech startup office setting.", className: "w-full rounded-lg my-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: 'In the near term, AI reassigns tasks more than it removes entire occupations. Roles heavy on routine information processing are most exposed; roles centred on interpersonal work, safety-critical judgement, or hands-on care see augmentation first. Organisations that pair AI with training and job redesign usually see better outcomes than \\"replace-first\\" approaches.' }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Short‑term vs long‑term" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Short‑term: productivity tools shift how work is done (drafting, summarising, coding assistance). Long‑term: some roles will change substantially, but new roles emerge around data, oversight, and integration. For individuals, focus on durable skills: domain expertise, critical thinking, and the ability to supervise AI systems." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Is AI regulated in Australia?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Australia currently manages many AI risks through existing laws: privacy (APPs), consumer law (misleading and deceptive conduct), discrimination law, IP, and online safety. Government has consulted on additional, risk‑based measures for high‑risk AI. As at early 2026, check current updates from the Department of Industry, Science and Resources and the OAIC before making policy decisions." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "For organisations, a practical approach is to adopt recognised frameworks (e.g., NIST AI RMF, ISO/IEC 23894 and 42001), run impact assessments, and keep documentation (data lineage, evaluation results, incident logs) so you can demonstrate responsible practice under scrutiny." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Is AI bad for students and schools?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Not inherently, but unmanaged use can enable cheating, expose student data, or normalise inaccurate content. Australia\\'s education sector has published guidance (e.g., a generative AI framework for schools). Practical controls include clear classroom rules, privacy‑respecting tools, watermark/provenance checks, and assessments that value process as much as product." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "If you\\'re worried about harm, here\\'s how to respond" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Start with a small, low‑risk pilot and measure outcomes. Write down the risks you care about (privacy, bias, reliability, safety), choose technical and process mitigations, and assign clear accountability. Review frequently—models, guidance, and threats evolve quickly." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100 not-prose", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-gray-900 mb-4", children: "Your Next Steps" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]", children: "1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Download the checklist mentioned above." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]", children: "2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Run a quick risk screen on your highest‑impact use case." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]", children: "3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Set a small pilot with human oversight and clear success criteria." })
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
            buttonHref: "/contact",
            note: "We\\'re a not‑for‑profit community—friendly, practical support."
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
