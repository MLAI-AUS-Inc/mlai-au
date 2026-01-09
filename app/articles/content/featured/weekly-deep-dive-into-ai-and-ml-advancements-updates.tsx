import { Link, useLoaderData } from 'react-router'
import type { MetaFunction, LoaderFunctionArgs } from 'react-router'
import type { ReactNode } from 'react'

import { canonical } from '../../seo-config'
import { applyArticleRegistryDefaults } from '../../registry'
import { ArticleLayout } from '../../../components/articles/ArticleLayout'
import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
import { ArticleTocPlaceholder } from '../../../components/articles/ArticleTocPlaceholder'
import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
import { ImageWithFallback } from '../../../components/ImageWithFallback'
import AuthorBio from '../../../components/AuthorBio'
import type { FeaturedPersonProfile } from '../../../data/types'

/** ========== INPUTS (replace all placeholders) ========== */
const SERIES = 'Weekly Deep Dive into AI and ML Advancements & Updates'
const NEWSLETTER = 'AI Bits for Techies'

const TOPIC = SERIES
const CATEGORY = 'featured'
const SLUG = 'weekly-deep-dive-into-ai-and-ml-advancements-updates'
const AUTHOR = 'MLAI Editorial Team'
const AUTHOR_ROLE = 'Editorial Team'
const AUTHOR_BIO =
  'We monitor the Australian AI and machine learning ecosystem, translating technical shifts and policy updates into plain-English actions for founders, operators, and learners.'
const AUTHOR_AVATAR =
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80'
const DATE_MODIFIED = '2026-01-08T00:00:00.000Z'
const DESCRIPTION =
  'Issue #1: Gemini doing science with tiny labelled data, agent-ready models and tools, plus a practical weekly ritual to avoid surprise costs and governance faceplants.'
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=80'
const HERO_IMAGE_ALT = 'Abstract data visualisation representing AI and machine learning signals'
const FEATURED_FOCUS = 'ai'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

const faqs: FAQ[] = [
  // Issue #1 Specifics
  {
    id: 1,
    question: 'What is the "Journal Paper of the Week"?',
    answer:
      'It discusses a paper on "Textual interpretation of transient image classifications," showing how Gemini can classify astronomical images with high accuracy using just 15 labelled examples and text instructions.',
  },
  {
    id: 2,
    question: 'Which AI tools are worth checking out this week?',
    answer:
      'We highlight MiniMax M2.1 for coding agents, SCP for scientific experimentation contexts, DeepFabric for synthetic data generation, and NVIDIA Nemotron 3 for scalable reasoning.',
  },
  {
    id: 3,
    question: 'What book is recommended in this issue?',
    answer:
      'Max Tegmark’s "Life 3.0", which explores the future impact of superintelligence on society, work, and humanity itself.',
  },

  // Strategic / Framework Questions
  {
    id: 4,
    question: 'Do I need to change my privacy notices for new AI features?',
    answer:
      'If you introduce new AI features that process personal or sensitive information, update your privacy notice and consent flows. Reference the OAIC APPs and include a short, plain-English description of what the model does, inputs needed, retention, and human oversight.',
  },
  {
    id: 5,
    question: 'What is the safest way to start a pilot?',
    answer:
      'Begin with low-risk internal content (policies, FAQs), apply rate limits, log prompts/outputs, and perform red-team style testing. Use feature flags and role-based access. Run a DPIA/PIA if personal data is involved.',
  },
  {
    id: 6,
    question: 'How should teams validate model performance?',
    answer:
      'Create a small, labeled evaluation set that mirrors your domain. Track accuracy, hallucination rate, latency, and cost per request. Re-test after any model switch or prompt change, and record changes in a decision log.',
  },
  {
    id: 7,
    question: 'Are there grants or programs in Australia for AI experiments?',
    answer:
      'Check current state-based innovation vouchers, CSIRO Kick-Start, and university accelerator programs. Funding cycles shift, so confirm eligibility windows and co-contribution rules before committing spend.',
  },
]

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const { article } = data || {}
  const title =
    article?.title || `${SERIES} | ${NEWSLETTER} Issue #1 (Jan 2026)`
  const description = article?.description || DESCRIPTION
  const image = article?.image || HERO_IMAGE

  return [
    { title },
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: image },
    { property: 'og:url', content: canonical(`/articles/${CATEGORY}/${SLUG}`) },
    { property: 'og:type', content: 'article' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
    // Structured Data (Schema.org)
    {
      'script:ld+json': {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        image: image,
        author: {
          '@type': 'Person',
          name: AUTHOR,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Company',
          logo: {
            '@type': 'ImageObject',
            url: '/logo.png',
          },
        },
        datePublished: DATE_MODIFIED,
        dateModified: DATE_MODIFIED,
        description: description,
      },
    },
    {
      'script:ld+json': {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              typeof faq.answer === 'string'
                ? faq.answer
                : 'Refer to article content for details.',
          },
        })),
      },
    },
  ]
}

export async function loader({ params }: LoaderFunctionArgs) {
  const article = applyArticleRegistryDefaults({
    title: `${SERIES} | ${NEWSLETTER} Issue #1 (Jan 2026)`,
    dateModified: DATE_MODIFIED,
    description: DESCRIPTION,
    author: AUTHOR,
    slug: SLUG,
    image: HERO_IMAGE,
    imageAlt: HERO_IMAGE_ALT,
  })

  const featuredPeople: FeaturedPersonProfile[] = []
  return { article, featuredPeople }
}

type LoaderData = Awaited<ReturnType<typeof loader>>

export default function ArticlePage() {
  const { article, featuredPeople } = useLoaderData<LoaderData>()

  const authorDetails = {
    name: AUTHOR,
    role: AUTHOR_ROLE,
    bio: AUTHOR_BIO,
    avatarUrl: AUTHOR_AVATAR,
  }

  return (
    <div className="bg-white">
      <ArticleLayout
        article={article}
        summaryHighlights={{
          heading: `${NEWSLETTER} | Issue #1`,
          intro:
            'Three questions people are hammering into search and chat right now, plus the short answers you can steal.',
          items: [
            {
              label:
                'Can Gemini (or other LLMs) really classify scientific images with almost no training data?',
              description:
                'Yes. In this week’s paper, Gemini is given 15 labelled examples plus instructions and still hits around 93% accuracy across multiple astronomy datasets, with readable explanations for each call.',
            },
            {
              label:
                "What is an AI agent, and why are 'agentic coding' models suddenly everywhere?",
              description:
                'Agents are systems that can plan, use tools, and run multi-step work (not just answer one prompt). That is why models tuned for coding and tool-driven workflows are getting so much attention.',
            },
            {
              label:
                'If we are using GenAI at work in Australia, do we need to update our privacy notice or collection notice?',
              description:
                'Often, yes. If you start processing new kinds of personal data, using new vendors, or changing how outputs are used, your notices and comms should match reality in plain English.',
            },
          ],
        }}
        breadcrumb={
          <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-4">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/articles" className="hover:text-gray-900 transition-colors">
                  Articles
                </Link>
              </li>
              <li>/</li>
              <li>
                <span className="font-medium text-gray-900">{TOPIC}</span>
              </li>
            </ol>
          </nav>
        }
      >
        {/* 1) Intro alert - Clean, neutral style */}
        <div className="my-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-sm text-gray-700 flex gap-2">
            <span className="text-xl">💡</span>
            <span>
              This guide is part of our broader series on {SERIES}. Prefer to jump ahead?{' '}
              <Link to="/articles" className="font-semibold text-[--brand-ink] hover:underline">
                Browse related articles →
              </Link>
            </span>
          </p>
        </div>

        {/* 2) Persona Grid - Clean Cards, No Heavy Colors */}
        <div className="my-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4 h-10 w-10 rounded-lg bg-teal-50 flex items-center justify-center text-[--brand-ink]">
              {/* Icon: Rocket */}
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84v4.8m7.381-5.84a14.926 14.926 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold text-gray-900">Founders & Teams</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              For leaders validating ideas, seeking funding, or managing teams.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4 h-10 w-10 rounded-lg bg-teal-50 flex items-center justify-center text-[--brand-ink]">
              {/* Icon: Graduate */}
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold text-gray-900">Students & Switchers</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              For those building portfolios, learning new skills, or changing careers.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4 h-10 w-10 rounded-lg bg-teal-50 flex items-center justify-center text-[--brand-ink]">
              {/* Icon: Community */}
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold text-gray-900">Community Builders</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              For workshop facilitators, mentors, and ecosystem supporters.
            </p>
          </div>
        </div>

        {/* 3) Main content starts */}
        <div className="prose prose-lg prose-indigo max-w-none text-gray-600 prose-headings:text-gray-900 hover:prose-a:text-[--brand-ink]">
          <h2>{NEWSLETTER} | Issue #1 | 8 Jan 2026</h2>

          <p>
            Your weekly Aussie-flavoured deep dive into what changed in AI/ML, what matters, and what to do
            next (without living on release-note social media).
          </p>

          <p>
            <strong>This week in one breath:</strong> Gemini doing science with basically no training data,
            MiniMax shipping an agent-friendly model, and an evergreen ritual you can steal for your team so
            you stop getting surprised by costs, policy, and silent model updates.
          </p>

          <hr className="my-8 border-gray-100" />

          <h2>The one paper you should pretend you read at lunch</h2>
          <h3>Textual interpretation of transient image classifications from large language models</h3>

          <h4>What is the setup?</h4>
          <p>
            A lot of scientific ML still looks like: label a mountain of data, build a custom model, retrain
            when the universe changes its mind. This paper tries a different trick: use a foundation model
            like Gemini as a low-data classifier.
          </p>

          <h4>What they did (yes, really)</h4>
          <p>
            They gave Gemini <strong>15 labelled examples</strong> plus a short instruction set, then asked
            it to classify astronomical images. No fine-tuning. No custom architecture. No “we trained for
            three weeks on a GPU that costs more than my car.”
          </p>

          <h4>What happened</h4>
          <p>
            Across three datasets, they report <strong>around 93% accuracy</strong>, which is in the same
            ballpark as a traditional CNN pipeline.
          </p>

          <h4>Why it is interesting (beyond the number)</h4>
          <p>
            The model also gives a plain-English explanation for each prediction. That means you can audit
            what it thinks it is doing, instead of staring at a probability score like it is going to
            confess its sins.
          </p>

          <h4>The real question</h4>
          <p>
            Does this “prompted reasoning + tiny labelled set” approach generalise, or do we end up with
            hybrid systems where smaller models do the heavy lifting and LLMs handle orchestration and
            explanation? Either way, it is a strong signal that “LLMs in science” is graduating from vibes
            to workflows.
          </p>

          <p>
            <strong>Full paper:</strong>{' '}
            <a href="https://arxiv.org/pdf/2510.06931" target="_blank" rel="noopener noreferrer">
              https://arxiv.org/pdf/2510.06931
            </a>
          </p>

          <hr className="my-8 border-gray-100" />

          <h2>Tools worth poking this week (in a sandbox first)</h2>

          <h3>MiniMax M2.1</h3>
          <p>
            Fast, cheaper, geared for agent and coding workflows, with stronger instruction-following than
            the previous version.
          </p>
          <p>
            <strong>Best for:</strong> tool-using agents, multi-language code, app/web dev without paying
            enterprise-sadness prices.
            <br />
            <a href="https://www.minimax.io/news/minimax-m21" target="_blank" rel="noopener noreferrer">
              https://www.minimax.io/news/minimax-m21
            </a>
          </p>

          <h3>SCP (Scientific Context Protocol)</h3>
          <p>
            A protocol for connecting agents to scientific tools, datasets, models, and even lab
            instruments behind a unified interface.
          </p>
          <p>
            <strong>Best for:</strong> orchestrating end-to-end experiments from planning to execution with
            fewer glue scripts held together by hope.
            <br />
            <a href="https://github.com/InternScience/scp" target="_blank" rel="noopener noreferrer">
              https://github.com/InternScience/scp
            </a>
          </p>

          <h3>DeepFabric</h3>
          <p>Generate structured synthetic datasets using LLMs.</p>
          <p>
            <strong>Best for:</strong> training and stress-testing when real data is scarce, expensive, or
            legally annoying.
            <br />
            <a href="https://github.com/always-further/deepfabric" target="_blank" rel="noopener noreferrer">
              https://github.com/always-further/deepfabric
            </a>
          </p>

          <h3>NVIDIA Nemotron 3</h3>
          <p>
            An open family of large language models designed for reasoning, long context, and agentic
            workflows.
          </p>
          <p>
            <strong>Best for:</strong> teams that want customisable models and control over deployment at
            scale.
            <br />
            <a
              href="https://research.nvidia.com/labs/nemotron/Nemotron-3/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://research.nvidia.com/labs/nemotron/Nemotron-3/
            </a>
          </p>

          <hr className="my-8 border-gray-100" />

          <h2>Book recommendation (because your brain deserves more than changelogs)</h2>
          <h3>Life 3.0 (Max Tegmark)</h3>
          <p>
            This is not “AI will fold your laundry” optimism. It is “what happens if we build systems that
            can outthink us, redesign themselves, and change the rules” seriousness, explained in a way
            that does not feel like a policy briefing.
          </p>
          <p>
            If you build products, invest, or lead teams, this book forces one uncomfortable but useful
            thought: even if your roadmap is boring, the underlying game board might not be.
          </p>

          <hr className="my-8 border-gray-100" />

          <h2>Geeky thought of the day</h2>
          <p className="font-semibold">
            Have LLMs passed the Turing Test, or are we just extremely easy to impress?
          </p>
          <p>
            LLMs can convincingly impersonate a human in short bursts, especially when the conversation
            stays on rails. But pattern prediction is not the same thing as understanding, and long, messy
            conversations still expose cracks.
          </p>
          <p>
            Still, the wild part is not whether they are “human.” It is that they are already changing
            work, creativity, support, coding, research, and how people make decisions. The bar is not “is
            it conscious?” The bar is “is it useful, safe, and correctly governed for this job?”
          </p>

          <div className="my-12">
            <ArticleCompanyCTA
              title={`Join ${NEWSLETTER}`}
              body="Get these updates delivered to your inbox every week."
              buttonText="Subscribe"
              buttonHref="#"
              note="Join other tech professionals staying ahead."
            />
          </div>

          {/* --- TRANSITION TO GUIDE --- */}
          <hr className="my-12 border-gray-200" />

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-12">
            <p className="font-semibold text-lg text-slate-800 mb-2">
              Want to run your own weekly deep dive? Steal our framework.
            </p>
            <p className="text-slate-600">
              This is the weekly habit that helps teams track model changes, pricing, safety notes, eval
              results, and policy movement, without turning your brain into a browser tab graveyard.
            </p>
          </div>

          <h2>The Deep Dive Framework</h2>
          <p>
            <strong>{SERIES}</strong> helps Australian founders and teams avoid common pitfalls. It is built
            to be actionable, evidence-based, and sane enough to run every week.
          </p>

          <h2>What is {SERIES}?</h2>
          <p>
            A weekly deep dive summarises material AI and machine learning changes, like model releases,
            pricing, safety notes, evaluation results, and policy shifts, filtered for relevance to Aussie
            teams. Instead of scanning dozens of release notes or social threads, you get a concise view
            with links to primary sources and practical next steps.
          </p>
          <p>
            The aim is to help you keep products aligned with local expectations (privacy, procurement, and
            general “please do not be reckless” vibes), and to avoid surprise costs when models, defaults,
            or rate limits change. Caveats are included so you can speak honestly to stakeholders and
            customers.
          </p>

          {/* 4) Resource / Checklist CTA */}
          <div className="my-12 rounded-2xl bg-gray-50 p-8 sm:p-12 relative overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 relative z-10">
              <div>
                <span className="text-sm font-semibold uppercase tracking-wider text-[--brand-ink]">
                  Free download
                </span>
                <h3 className="mt-2 text-2xl font-bold text-gray-900 leading-tight">
                  {SERIES} <br className="hidden sm:inline" /> Checklist & Notes
                </h3>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  Capture goals, data sensitivity, use cases, risks, and pilot results. Includes prompts
                  for decision logs and a one-page summary for stakeholders.
                </p>
                <div className="mt-6 flex flex-wrap gap-4 items-center">
                  <a
                    href="#"
                    className="inline-flex items-center justify-center rounded-lg bg-[--brand] px-6 py-3 text-sm font-semibold text-[--accent] shadow-sm ring-1 ring-inset ring-[--brand] hover:brightness-95 transition-colors"
                  >
                    Download Checklist (PDF)
                  </a>
                </div>
              </div>

              {/* Document Preview Cards */}
              <div className="flex gap-4 justify-center lg:justify-end">
                <div className="w-40 rotate-[-3deg] transform transition-transform hover:rotate-0 hover:z-10 hover:scale-105 shadow-md">
                  <div className="rounded-lg bg-white p-4 border border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">Checklist Page 1</p>
                    <p className="text-xs text-gray-500">Page 1</p>
                  </div>
                </div>
                <div className="w-40 rotate-[3deg] transform transition-transform hover:rotate-0 hover:z-10 hover:scale-105 shadow-md">
                  <div className="rounded-lg bg-white p-4 border border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">Checklist Page 2</p>
                    <p className="text-xs text-gray-500">Page 2</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-teal-100/50 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-teal-50/80 blur-3xl" />
          </div>

          <h2>Why it matters in 2026</h2>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-bdbe603f-d16d-4949-afc1-6915177f76f0.jpg?alt=media&token=5c392e57-e210-4528-9866-fca5f8a23245"
            alt="Modern abstract illustration symbolizing significance and innovation for the year 2026."
            className="w-full rounded-lg my-8"
          />

          <p>
            Models and platforms are changing faster than most teams update documentation. The practical
            wins are rarely glamorous: lower latency, cheaper context, safer defaults, clearer tooling, and
            governance you can explain without sweating.
          </p>
          <p>
            A weekly review helps you avoid building on deprecated endpoints, spot regressions after silent
            model changes, and catch cost creep before your CFO does. It also makes your team look
            competent in front of customers, investors, and regulators, which is a nice bonus.
          </p>

          <div className="my-8 border-l-4 border-[--brand-ink] bg-teal-50/70 pl-6 py-4 pr-4 rounded-r-lg">
            <h4 className="font-semibold text-[--brand-ink] flex items-center gap-2">
              <span className="text-xl">💡</span> Pro Tip
            </h4>
            <p className="mt-1 text-gray-700">
              Maintain a 1-page “AI change log” with dates, sources, and decisions. Link it in sprint
              rituals so everyone knows what changed and why.
            </p>
          </div>

          <h2>Step-by-step: the 60-90 minute version</h2>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-fcfc94f3-66dc-43ae-966e-2a828760b4ca.jpg?alt=media&token=b35a90f7-cf7f-48cc-85ff-7e18b5016739"
            alt="Modern abstract illustration showcasing a step-by-step guide concept with dynamic shapes and technical elements."
            className="w-full rounded-lg my-8"
          />

          <h3>Step 1: Prep (10-15 mins)</h3>
          <ul>
            <li>Lock a weekly slot.</li>
            <li>
              Maintain a shortlist of sources: provider changelogs, trusted evaluations, OAIC/ACCC updates,
              plus 1-2 academic or industry feeds.
            </li>
            <li>Pre-pick 5-10 links so you do not disappear into the internet.</li>
          </ul>
          <p>
            Make a simple template: date, sources, changes, evidence, action this week, and “needs review”
            (legal/infosec).
          </p>

          <h3>Step 2: Execute (30-50 mins)</h3>
          <p>For each change, answer:</p>
          <ol>
            <li>What changed?</li>
            <li>Why does it matter for our use cases?</li>
            <li>What evidence do we trust?</li>
            <li>What are we doing next?</li>
          </ol>
          <p>
            Run quick trials with your eval set. Log accuracy, hallucinations, latency, and cost per
            request. If safety behaviour changes, re-test for over-blocking, refusals, and truncation.
          </p>
          <p>
            Capture integration effort too. Some upgrades are drop-in, others need SDK changes, prompt
            tweaks, or new guardrails. Track privacy and security impacts, especially regions, retention,
            logging, and third-party tools.
          </p>

          <h3>Step 3: Review + publish (10-20 mins)</h3>
          <p>
            Post a short update to your team channel: wins, risks, decisions, and actions with owners and
            due dates. Then update docs when it matters, like your AI disclosures, privacy notices,
            customer-facing FAQs, and incident runbooks.
          </p>

          <h2>Conclusion</h2>
          <p>
            A weekly deep dive keeps Australian teams responsive to change without chasing hype. Standardise
            sources, test with your own eval set, publish concise decisions, and you can move fast without
            breaking trust.
          </p>

          <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Your Next Steps</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-[--brand-ink]">
                  1
                </span>
                <span>Download the checklist mentioned above.</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-[--brand-ink]">
                  2
                </span>
                <span>Draft your initial goals based on the template.</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-[--brand-ink]">
                  3
                </span>
                <span>Discuss with your team or mentor.</span>
              </li>
            </ul>
          </div>

          <div className="my-12">
            <ArticleCompanyCTA
              title={`Need help with ${SERIES}?`}
              body="Get practical recommendations based on your goals, time, and experience level."
              buttonText="Get recommendations"
              buttonHref="#"
              note="Filter by topic, format (online/in-person), and experience level."
            />
          </div>

          <hr className="my-10 border-gray-100" />

          <h2>Housekeeping (so we stay honest)</h2>
          <p>
            This is general information, not legal advice. If you ship user-facing AI, be transparent about
            where AI is used, what it cannot do, and where humans stay in the loop.
          </p>
          <p>
            <strong>Authorship:</strong> Written by the {AUTHOR} (AI-assisted drafting, human-edited).
          </p>
        </div>

        {/* Author Bio & Footer */}
        <hr className="my-10 border-gray-100" />

        <AuthorBio author={authorDetails} />

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <ArticleFAQ items={faqs} />
        </div>

        {/* Final Breadcrumb/Nav */}
        <div className="mt-12 pt-6 border-t border-gray-100 text-sm text-gray-500 flex justify-between">
          <Link to="/articles" className="hover:text-[--brand-ink] transition-colors">
            ← Back to Articles
          </Link>
          <a href="#" className="hover:text-[--brand-ink] transition-colors">
            Top of page ↑
          </a>
        </div>
      </ArticleLayout>
    </div>
  )
}

