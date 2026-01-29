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
const TOPIC = "Startup incubator Melbourne";
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails();
const AUTHOR = AUTHOR_PROFILE.name ?? "Dr Sam Donegan";
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? "Founder";
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? "";
const AUTHOR_AVATAR = AUTHOR_PROFILE.avatarUrl ?? "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80";
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-69bbf9ce-161b-45e3-99ba-2a38429cc76d.jpg?alt=media&token=847ec6be-d4ed-4819-be4a-02922684166e";
const HERO_IMAGE_ALT = "Melbourne skyline at dusk";
const faqItems = [
  // ≥6 items; AU context; evidence-forward; answers can be strings or JSX.
  {
    id: 1,
    question: "Which incubators and accelerators operate in Melbourne (2026)?",
    answer: "Examples include LaunchVic-backed programs and operators, university-linked hubs (MAP at the University of Melbourne, RMIT Activator, Monash Generator), Boab AI (scale-up focused), Stone & Chalk (hub/coworking), and national operators that often run Melbourne cohorts (Startmate, Antler). Always check official pages for current status."
  },
  {
    id: 2,
    question: "What’s the difference between an incubator and an accelerator?",
    answer: "Incubators support earlier-stage founders (idea to prototype) over a longer period with mentoring, community and light structure; accelerators are fixed-term, more intense (e.g. 8–16 weeks), and may invest capital in exchange for equity. Terminology varies by operator – read the fine print."
  },
  {
    id: 3,
    question: "Are Melbourne incubators free or equity-based?",
    answer: "Many university and LaunchVic-backed initiatives are fee-free and equity-free. Commercial accelerators may offer funding for ~5–10% equity (ranges vary). Confirm fees, equity, and any follow-on rights directly with the operator."
  },
  {
    id: 4,
    question: "When do applications open, and how competitive are they?",
    answer: "Most run 1–2 intakes per year. Some accept rolling expressions of interest. Competitiveness varies; plan 6–8 weeks ahead to prepare your application. Track LaunchVic’s Programs page and each operator’s site/newsletter."
  },
  {
    id: 5,
    question: "Do I need to be a student to join university programs?",
    answer: "Not always. Several have streams for alumni or the broader community, while others require a current affiliation. Check MAP, RMIT Activator and Monash Generator eligibility pages for specifics."
  },
  {
    id: 6,
    question: "Are there AI-specific options in Melbourne?",
    answer: "Boab AI targets data-rich AI scale-ups; national accelerators often include AI startups; sector-specific cohorts appear periodically via LaunchVic-backed operators. Verify current scope, stage and sector fit."
  },
  {
    id: 7,
    question: "Can international founders apply to Melbourne programs?",
    answer: "Many accept interstate or overseas applicants, though some expect in-person participation in Victoria. Visa and work rights are your responsibility; this guide is general information only."
  }
];
const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro: "Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).",
  items: [
    {
      label: "Which startup incubators are in Melbourne?",
      description: "LaunchVic-backed programs, university hubs (MAP, RMIT Activator, Monash Generator) and sector operators like Boab AI; check each site for current intakes."
    },
    {
      label: "Are Melbourne incubators free or equity-based?",
      description: "Many uni/LaunchVic programs are equity-free; commercial accelerators may invest for ~5–10% equity. Always confirm fees and terms."
    },
    {
      label: "When do applications open?",
      description: "Most run 1–2 intakes per year. Track LaunchVic’s Programs directory and operator newsletters for dates."
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
          " is one of the most common searches Victorian founders make, but results can be a jumble of lists and dated pages. As at January 2026, here’s a structured way to navigate Melbourne’s incubators and accelerators—what they do, who they suit, and where to find current intakes."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleImageBlock, { src: HERO_IMAGE, alt: HERO_IMAGE_ALT, width: 1200, height: 630 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Incubator vs accelerator: what Melbourne operators actually mean" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Operators in Melbourne use these terms in slightly different ways, so confirm details on each program page. As a rule of thumb:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Incubators" }),
            ": earlier stage (idea → prototype), flexible timelines, mentoring, community and light structure; usually equity‑free."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Accelerators" }),
            ": fixed-term (e.g. 8–16 weeks), structured sprints, demo days; may provide capital and take equity."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Some hubs blend both (e.g. pre‑accelerators or founder fellowships). Always check eligibility, sector focus, equity and time commitment." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleResourceCTA,
          {
            title: `Download the ${TOPIC} checklist`,
            description: "Access a structured template to apply the steps in this guide.",
            buttonLabel: "Get the checklist",
            buttonHref: "/resources",
            accent: "purple"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleCallout,
          {
            title: "Quick tip: match program intent, not brand",
            variant: "brand",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "💡" }),
            className: "not-prose",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-gray-800", children: [
              "Shortlist programs by ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "stage fit" }),
              " (idea, MVP, growth), ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "sector fit" }),
              " (e.g. AI, climate, deep tech), and ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "constraints" }),
              " (equity, schedule, location). This avoids chasing well‑known brands that don’t match your needs."
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Melbourne programs to know in 2026 (check each operator for dates)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-765f5f42-a311-4492-ba22-e49fe1ace541.jpg?alt=media&token=bcbae9f1-0a4b-401b-a991-bd0785536fb8", alt: "Tech enthusiasts collaborate in a vibrant 90s film aesthetic, embodying Melbourne's innovative startup culture.", className: "w-full rounded-lg my-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "This overview isn’t exhaustive and programs change. Use it to build a shortlist, then verify details on the official sites (links below in Sources)." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "LaunchVic Program Finder" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "State-backed directory of current founder programs across Victoria (incubators, accelerators, courses). Best starting point to see what’s live." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Melbourne Accelerator Program (MAP) — University of Melbourne" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "A well-known accelerator with mentoring and alumni network. Streams and eligibility evolve—check current cohort focus and equity terms." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "RMIT Activator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Runs founder programs across stages (including pre‑accelerators). Some streams are open to broader community; others are university‑linked." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Monash Generator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Monash’s entrepreneurship hub with pathways from ideation through to accelerator‑style programs." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Boab AI (scale‑up)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "A Victoria‑based program focused on data‑rich AI companies at later (scale‑up) stages. Not aimed at first‑time idea validation." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Stone & Chalk (Melbourne)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "A startup hub/coworking community in Docklands. While not an incubator per se, it provides community, mentors and events that complement structured programs." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Startmate & Antler (national, often with Melbourne cohorts)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "National operators that periodically run Melbourne‑based or hybrid cohorts. Check current intake city, equity terms and sector focus." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "How to choose the right Melbourne program" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-0303a6d3-f5d1-42f4-80a7-99251af25958.jpg?alt=media&token=6e4687da-28ab-4889-b249-6bd43104a646", alt: "Diverse group collaborating in a tech startup, showcasing 90s film aesthetic and innovation in Melbourne.", className: "w-full rounded-lg my-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Use these decision filters before you apply:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Stage" }),
            ": idea/validation, MVP, or revenue/growth. Choose programs that explicitly support your stage."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Sector" }),
            ": generalist vs specialist (e.g. AI, climate, health). Sector alignment improves mentor relevance."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Equity and funding" }),
            ": equity‑free vs investment for equity; any fees; follow‑on rights."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Time/format" }),
            ": in‑person vs hybrid; days per week; conflict with study/work."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Network" }),
            ": alumni outcomes in your domain; access to local mentors and customers in Victoria."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleStepList,
          {
            title: "Practical steps",
            steps: [
              { label: "Map your stage, sector and constraints (equity/time/location)." },
              { label: "Build a shortlist (5–8 programs) from LaunchVic + operator sites." },
              { label: "Prepare an application pack: 1‑page problem/solution, lean traction, 10‑slide deck." }
            ],
            accent: "indigo"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(QuoteBlock, { title: "Expert insight", variant: "purple", children: "“Cohorts are accelerators, not substitutes for customer discovery. Do the work upfront—programs amplify momentum you already have.”" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Applications and timelines: where to find open cohorts" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Most operators run one or two intakes per year, with application windows 3–8 weeks long. To avoid missing out:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            "Monitor the ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "LaunchVic Programs" }),
            " directory and each operator’s website."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Subscribe to program newsletters and set calendar reminders one quarter ahead." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Keep an EOI draft ready (founder bios, 100‑word problem statement, traction bullets, links to demo/Notion)." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Funding, equity and IP: what to check before you apply" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Equity" }),
            ": commercial accelerators often invest for ~5–10% (varies). University/LaunchVic programs are commonly equity‑free."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Fees and perks" }),
            ": any program fees, cloud credits, coworking, or mentorship guarantees."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "IP and confidentiality" }),
            ": review participation terms; avoid sharing sensitive trade secrets outside safe contexts."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Eligibility" }),
            ": residency requirements for in‑person cohorts in Victoria; student/alumni constraints."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "For AI startups: compute, safety and data considerations" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "If you’re building with AI, expect questions about data provenance, privacy, model risks and evaluation. Be ready to show a responsible approach: document datasets, avoid production use of sensitive personal information without consent, and include a brief risk register (misuse, bias, security) with mitigations. This is general information only—seek independent advice for legal/privacy matters." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Not ready for a cohort? Community and coworking help" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "If you’re still validating, use Melbourne’s community to build momentum: attend local meetups, join hubs (e.g. Stone & Chalk) and connect with the MLAI community for peer support. A few weeks of customer discovery can materially improve your application quality." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Make your move: a simple 30‑day plan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Week 1" }),
            ": Define your ICP and problem statement. Book 10 discovery calls."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Week 2" }),
            ": Build a clickable demo or data‑backed prototype. Capture 3 learnings."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Week 3" }),
            ": Shortlist programs, draft your 10‑slide deck, collect 1–2 advisor references."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Week 4" }),
            ": Apply to 2–3 best‑fit programs and schedule follow‑ups."
          ] })
        ] }),
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
            body: "Get practical recommendations based on your goals, time, and experience level.",
            buttonText: "Get recommendations",
            buttonHref: "/contact",
            note: "You can filter by topic, format (online/in‑person), and experience level."
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleReferences,
          {
            heading: "Sources",
            description: "Curated references to verify current programs and intakes (as at Jan 2026).",
            headingId: "references",
            references: [
              {
                id: 1,
                href: "https://launchvic.org/programs/",
                title: "Startup Programs, Courses & Accelerators",
                publisher: "LaunchVic",
                category: "government",
                description: "Official directory of current Victorian founder programs."
              },
              {
                id: 2,
                href: "https://www.themap.co/",
                title: "Melbourne Accelerator Program (MAP)",
                publisher: "The University of Melbourne",
                category: "guide",
                description: "University of Melbourne’s accelerator, cohorts and eligibility."
              },
              {
                id: 3,
                href: "https://www.boab.ai/",
                title: "Boab AI",
                publisher: "Boab AI / Artesian",
                category: "industry",
                description: "Scale‑up program for data‑rich AI companies based in Victoria."
              },
              {
                id: 4,
                href: "https://www.growthmentor.com/location/melbourne/startup-accelerators/",
                title: "Top Startup Accelerators in Melbourne [2025]",
                publisher: "GrowthMentor",
                category: "analysis",
                description: "Third‑party list of accelerators operating in Melbourne."
              },
              {
                id: 5,
                href: "https://www.failory.com/startups/melbourne-accelerators-incubators",
                title: "Top Accelerators and Incubators in Melbourne (2026)",
                publisher: "Failory",
                category: "analysis",
                description: "Curated list with short summaries and links."
              },
              {
                id: 6,
                href: "https://www.rmit.edu.au/activator",
                title: "RMIT Activator",
                publisher: "RMIT University",
                category: "guide",
                description: "Programs and founder support from RMIT."
              },
              {
                id: 7,
                href: "https://www.monash.edu/entrepreneurship/generator",
                title: "Monash Generator",
                publisher: "Monash University",
                category: "guide",
                description: "Monash entrepreneurship hub and programs."
              },
              {
                id: 8,
                href: "https://www.stoneandchalk.com.au/",
                title: "Stone & Chalk (Melbourne)",
                publisher: "Stone & Chalk",
                category: "industry",
                description: "Innovation hub and community with a Melbourne location."
              },
              {
                id: 9,
                href: "https://www.startmate.com/accelerator",
                title: "Startmate Accelerator",
                publisher: "Startmate",
                category: "guide",
                description: "National accelerator with cohorts across AU/NZ (check city each intake)."
              },
              {
                id: 10,
                href: "https://www.antler.co/australia",
                title: "Antler Australia",
                publisher: "Antler",
                category: "guide",
                description: "Venture generator/accelerator operating in AU; check current city locations."
              }
            ]
          }
        ),
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
