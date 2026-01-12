import type { ReactNode } from 'react'
import { Home } from 'lucide-react'

import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
import AuthorBio from '../../../components/AuthorBio'
import { ArticleHeroHeader } from '../../../components/articles/ArticleHeroHeader'
import { ArticleImageBlock } from '../../../components/articles/blocks/ArticleImageBlock'
import { ArticleFooterNav } from '../../../components/articles/blocks/ArticleFooterNav'
import { QuoteBlock } from '../../../components/articles/QuoteBlock'
import { ArticleTocPlaceholder } from '../../../components/articles/ArticleTocPlaceholder'
import { AudienceGrid } from '../../../components/articles/AudienceGrid'
import { RocketLaunchIcon } from '@heroicons/react/24/outline'

/** ========== INPUTS (replace all placeholders) ========== */
const SERIES = 'Weekly Deep Dive into AI and ML Advancements & Updates'
const NEWSLETTER = 'AI Bits for Techies'
const TITLE = `${NEWSLETTER} | Issue #1 | 8 Jan 2026`
const HERO_IMAGE = 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2Fmlai.au%2Fimages%2FChatGPT%20Image%20Jan%209%2C%202026%2C%2001_07_03%20PM.png?alt=media&token=d143aea5-9ffa-4674-906b-4d7fe020e2df'
const HERO_IMAGE_ALT = 'Scientific illustration of transient image classification'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
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

export const summaryHighlights = {
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
}

export const useCustomHeader = true
export const useInlineToc = true

export default function ArticlePage() {
  const authors = [
    {
      name: 'Dr Sam Donegan',
      role: 'Founder & Lead Editor',
      bio: 'Sam leads the MLAI editorial team, combining deep research in machine learning with practical guidance for Australian teams adopting AI responsibly.',
      avatarUrl: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/1732146096971.jpeg?alt=media&token=8cbc3057-565b-48d0-be4f-e786332a6376',
    },
    {
      name: 'Jun Kai (Luc) Chang',
      role: 'AI Software Developer',
      bio: "Luc is an AI Software Developer at Monash AIM, building neural networks on FPGA boards. He is pursuing a Master of AI at Monash and co-founding a startup in the event space.",
      avatarUrl: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/1708509977925.jpeg?alt=media&token=57e9f02a-7209-4ff0-89d3-bd79e23cc8cb',
    },
    {
      name: 'Julia Ponder',
      role: 'Technical Writer',
      bio: 'Julia specialises in translating developer jargon into plain English. She creates clear, expertly formatted documentation and tests products before they go to market.',
      avatarUrl: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/1702549233653.jpeg?alt=media&token=9ae8a7a5-58a0-4b3d-be4a-5699d2ca3a7c',
    },
  ]

  const breadcrumbs = [
    { label: 'Home', href: '/articles', icon: Home },
    { label: NEWSLETTER, current: true },
  ]

  return (
    <div>
      <ArticleHeroHeader
        breadcrumbs={breadcrumbs}
        title={TITLE}
        titleHighlight="Issue #1"
        headerBgColor="cyan"
        summary={{
          heading: summaryHighlights.heading,
          intro: summaryHighlights.intro,
          items: summaryHighlights.items,
        }}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      <QuoteBlock
        variant="purple"
        title="Quick note"
        icon={<span className="text-xl">💡</span>}
        className="my-6"
      >
        This guide is part of our broader series on {SERIES}. Prefer to jump ahead?{' '}
        <a href="/articles" className="font-semibold text-white underline-offset-4 hover:underline">
          Browse related articles →
        </a>
      </QuoteBlock>

      <ArticleTocPlaceholder className="mb-12">
        {/* Rendered via portal by ArticleEnhancer */}
      </ArticleTocPlaceholder>

      <AudienceGrid
        heading="Read this if you are:"
        cards={[
          {
            title: 'Founders & Teams',
            description: 'For leaders validating ideas, seeking funding, or managing teams.',
            variant: 'orange',
            icon: <RocketLaunchIcon className="w-5 h-5 text-white" strokeWidth={1.8} />,
          },
          {
            title: 'Students & Switchers',
            description: 'For those building portfolios, learning new skills, or changing careers.',
            variant: 'purple',
            icon: (
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                />
              </svg>
            ),
          },
          {
            title: 'Community Builders',
            description: 'For workshop facilitators, mentors, and ecosystem supporters.',
            variant: 'yellow',
            icon: (
              <svg
                className="w-5 h-5 text-black"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
            ),
          },
        ]}
        className="my-10"
      />

      {/* Main content */}
      <div className="">
        <h2>{TITLE}</h2>

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

        <ArticleImageBlock src={HERO_IMAGE} alt={HERO_IMAGE_ALT} />

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

        <ArticleImageBlock
          src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2Fmlai.au%2Fimages%2FChatGPT%20Image%20Jan%209%2C%202026%2C%2001_01_56%20PM.png?alt=media&token=7aa355b9-1304-40cf-bba2-1808e9141a26"
          alt="Book cover of Life 3.0 by Max Tegmark"
        />

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

        <hr className="my-10 border-gray-100" />

        <h2>Housekeeping (so we stay honest)</h2>
        <p>
          This is general information, not legal advice. If you ship user-facing AI, be transparent about
          where AI is used, what it cannot do, and where humans stay in the loop.
        </p>

        <AuthorBio authors={authors} className="mt-8" />
      </div>

      <div className="mt-12">
        <ArticleFAQ items={faqItems} />
      </div>

      <ArticleFooterNav />
    </div>
  )
}
