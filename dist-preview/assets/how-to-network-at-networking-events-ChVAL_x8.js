import { j as jsxRuntimeExports, F as ForwardRef$2 } from "./server-build-DGuowwjZ.js";
import { f as Link } from "./worker-entry-BTvr0DWh.js";
import { A as ArticleHeroHeader, a as ArticleTocPlaceholder, b as ArticleImageBlock, Q as QuoteBlock, c as ArticleFAQ, d as AuthorBio, e as ArticleFooterNav } from "./ArticleTocPlaceholder-Do4c2OpE.js";
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
const TOPIC = "How to network at networking events";
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails();
const AUTHOR = AUTHOR_PROFILE.name ?? "Dr Sam Donegan";
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? AUTHOR_PROFILE.credentials ?? "Founder";
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? "";
const AUTHOR_AVATAR = AUTHOR_PROFILE.avatarUrl ?? "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80";
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-ff43afe8-537f-4a5b-8796-c64d4545eec0.jpg?alt=media&token=0a60df5b-c2e8-4925-8ed0-abedc264838b";
const HERO_IMAGE_ALT = "People chatting at an evening tech meetup with name badges";
const faqItems = [
  { id: 1, question: "What do I say if I'm between roles?", answer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    "Keep it short and positive: “I\\'m between roles after working on MLOps at ",
    /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Acme" }),
    ". I\\'m exploring applied AI roles in health. What brings you to tonight\\'s event?” This frames your direction and invites a response without oversharing."
  ] }) },
  { id: 2, question: "Are business cards still used in Australia (2026)?", answer: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Optional. Most attendees swap LinkedIn via QR or a short follow‑up message. If you use cards, add a QR to your LinkedIn or portfolio. Prioritise a warm, specific follow‑up within 48 hours." }) },
  { id: 3, question: "How many people should I aim to meet at one event?", answer: "Three to five meaningful conversations beat a dozen quick pitches. Depth makes follow‑up easier and more genuine." },
  { id: 4, question: "How do I follow up if I forgot to exchange details?", answer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Try one or more of these:" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Check the event page or attendee list for names and socials." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Search LinkedIn with the person’s first name + company + event name." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Message the organiser: “Could you pass my details to [Name] from [Company] I spoke with by the demo table?”" })
    ] })
  ] }) },
  { id: 5, question: "What if I don't drink alcohol?", answer: "Completely fine. Order a zero‑alcohol option or water—social norms at AU tech events are inclusive. Focus on conversations, not drinks." },
  { id: 6, question: "What should I avoid doing at networking events?", answer: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Leading with a hard pitch or request." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Monopolising one person’s time—aim for 5–10 minutes unless it’s flowing." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Hovering in closed groups; look for open circles." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Sharing someone’s details or photos without consent." })
  ] }) }) }
];
const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro: "Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).",
  items: [
    {
      label: "What do you say when networking at an event?",
      description: "Use a 10‑second intro: name, role/focus, what you’re exploring, then ask an easy question."
    },
    {
      label: "How do you follow up after a networking event?",
      description: "Send a short note within 24–48 hours with context, a helpful link, and one clear next step."
    },
    {
      label: "How can shy people network effectively?",
      description: "Join open groups, use simple questions, aim for 2–3 quality chats, and volunteer next time."
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
          " is less about collecting contacts and more about starting useful conversations you can continue later. The approach below is tailored to AU tech/AI meetups in 2026—short intros, question‑led chats, and privacy‑aware follow‑ups.",
          " ",
          "Prefer a deeper dive? Explore more in the",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/articles", className: "underline underline-offset-4", children: "Community & Professional Development" }),
          " ",
          "pillar."
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "How to introduce yourself at a networking event" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Use a clear 10‑second intro that ends with a question. Formula: name + role (or focus) + what you\\'re exploring + an easy question. For example: “I\\'m Priya—product designer moving into AI safety. I\\'m exploring evaluation tools for small teams. What brings you to this meetup?” This keeps things human and opens the floor." }),
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleCallout,
          {
            title: "Lead with a question, not a pitch",
            variant: "brand",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "💡" }),
            children: "Make your last sentence a low‑pressure question (e.g., “What are you building?”, “Which talk are you here for?”). Questions lower nerves and invite natural conversation."
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Conversation starters that work at tech and AI meetups" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-8777a4e0-86e6-4bc0-a7bb-a6bb87bab79a.jpg?alt=media&token=624d4812-c501-4b3a-b08c-68eee2c149f1", alt: "Diverse group of professionals networking at a tech meetup with a nostalgic 90s film aesthetic.", className: "w-full rounded-lg my-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Keep openers short, specific, and kind. Five that travel well in AU events:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "“What\\'s the most interesting thing you\\'ve heard tonight?”" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "“I\\'m new to this group—how do people usually use the break time?”" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            "“I noticed your badge says ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Geelong" }),
            "; do you work with any local startups?”"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "“If someone\\'s new to LLMs at work, what\\'s a safe first project?”" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "“What problem are you hoping to solve with AI this year?”" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Reading the room: open vs closed circles" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Join groups that have a physical “gap” (open triangle) and make brief eye contact before stepping in. Avoid tight, closed circles or 1‑on‑1s that look intense. If you\\'re stuck, queue for a drink or snacks—queues create easy micro‑chats." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleStepList,
          {
            title: "Practical steps",
            steps: [
              "Draft your 10‑second intro and 3 event‑specific openers",
              "Aim for 3–5 quality chats (5–10 minutes each)",
              "Swap details or agree on a follow‑up topic",
              "Send follow‑ups within 48 hours"
            ],
            accent: "indigo"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(QuoteBlock, { title: "Evidence or expert insight", variant: "purple", children: "“People go to networking events to meet new people. A clear intro plus a genuine question beats a polished pitch almost every time.”" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "If you\\'re shy or new: low‑pressure ways to join" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-be9809ab-ca93-4437-ac14-3ed94fec8f43.jpg?alt=media&token=308e9e75-f2c3-493f-b1eb-5ad8a03d79fe", alt: "Diverse individuals in a 90s tech workspace, fostering connection in a relaxed, friendly atmosphere.", className: "w-full rounded-lg my-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Start with open groups, speaker lines, or tables with spare seats. Ask practical questions (“Is there a Slack for this group?”, “Where do project posts go?”). Consider volunteering on the door for a future event—you\\'ll meet everyone naturally." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Add value in the moment (without selling)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Share a pointer or perspective, not a pitch. Examples: “There\\'s an AU‑focused repo for that—happy to DM it,” or “We tried something similar; our lesson was to start with a tiny pilot.” Offer to send a link later rather than fishing through your phone on the spot." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Follow‑up that actually gets replies" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Follow up within 24–48 hours while the chat is fresh. Keep it short, include context, and suggest a tiny next step. Two simple templates:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            "LinkedIn DM: “Great to meet at ",
            TOPIC.toLowerCase(),
            " last night—loved your take on evaluation. Here\\'s the repo I mentioned. If useful, happy to swap notes on small‑team testing next week.”"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Email: “Hi [Name]—Sam from the AI meetup at [Venue]. We discussed data labelling. This 3‑step guide helped us avoid scope creep. If you\\'re exploring pilots, a 15‑minute call next week could save you time—no pressure.”" })
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(MLAITemplateResourceCTA, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Do\\'s and don\\'ts (AU context)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Do keep intros short; don\\'t hard‑pitch strangers." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Do ask consent before sharing photos or tagging people." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Do respect venue and organiser codes of conduct." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Don\\'t dominate a conversation—offer others space to join." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Do close politely: “Great chatting—shall we connect on LinkedIn and pick this up?”" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Take this plan to your next event" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Prepare your 10‑second intro, arrive with three openers, focus on 3–5 quality chats, and send concise follow‑ups within 48 hours. That\\'s it—repeatable, respectful, and effective for Australian AI/tech communities." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-gray-900 mb-4", children: "Your Next Steps" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600", children: "1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Draft your 10‑second intro and three openers." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600", children: "2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Aim for 3–5 quality chats; exchange details intentionally." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600", children: "3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Send follow‑ups within 48 hours with one clear next step." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleCompanyCTA,
          {
            title: `Need help with ${TOPIC}?`,
            body: "MLAI is a not‑for‑profit community empowering the Australian AI community. Join in and connect with peers across Australia.",
            buttonText: "Join the MLAI community",
            buttonHref: "/contact",
            note: "Community‑first, no hard sell—just people helping people."
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleFAQ, { items: faqItems }),
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
