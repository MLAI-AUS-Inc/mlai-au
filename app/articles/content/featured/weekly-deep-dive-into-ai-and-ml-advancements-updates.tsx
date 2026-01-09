import { Link } from 'react-router'
import type { ReactNode } from 'react'

import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
import { ImageWithFallback } from '../../../components/ImageWithFallback'

/** ========== INPUTS (replace all placeholders) ========== */
const SERIES = 'Weekly Deep Dive into AI and ML Advancements & Updates'
const NEWSLETTER = 'AI Bits for Techies'

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

export default function ArticlePage() {
  return (
    <div>
      {/* 1) Intro alert - Clean, neutral style */}
      <div className="not-prose my-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
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
      <div className="not-prose my-10 grid grid-cols-1 gap-6 md:grid-cols-3">
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
      <div className="">
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

        <div className="my-12 max-w-3xl mx-auto">
          <ImageWithFallback
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2Fmlai.au%2Fimages%2FChatGPT%20Image%20Jan%209%2C%202026%2C%2001_07_03%20PM.png?alt=media&token=d143aea5-9ffa-4674-906b-4d7fe020e2df"
            alt="Scientific illustration of transient image classification"
            width={1200}
            height={630}
            className="w-full rounded-3xl shadow-2xl ring-1 ring-gray-900/10"
          />
        </div>

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

        <div className="my-12 max-w-3xl mx-auto">
          <ImageWithFallback
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2Fmlai.au%2Fimages%2FChatGPT%20Image%20Jan%209%2C%202026%2C%2001_01_56%20PM.png?alt=media&token=7aa355b9-1304-40cf-bba2-1808e9141a26"
            alt="Book cover of Life 3.0 by Max Tegmark"
            width={1200}
            height={630}
            className="w-full rounded-3xl shadow-2xl ring-1 ring-gray-900/10"
          />
        </div>

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
        {/* About the Authors */}
        <div className="not-prose mt-12 rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-[--brand-ink]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
            About the Authors
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            {/* Author 1: Dr Sam Donegan */}
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/1732146096971.jpeg?alt=media&token=8cbc3057-565b-48d0-be4f-e786332a6376"
                alt="Dr Sam Donegan"
                className="w-20 h-20 rounded-full object-cover ring-2 ring-gray-100 mb-4"
              />
              <h4 className="font-semibold text-gray-900">Dr Sam Donegan</h4>
              <p className="text-sm text-[--brand-ink] font-medium mb-2">Founder & Lead Editor</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Sam leads the MLAI editorial team, combining deep research in machine learning with practical guidance for Australian teams adopting AI responsibly.
              </p>
            </div>

            {/* Author 2: Jun Kai (Luc) Chang */}
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/1708509977925.jpeg?alt=media&token=57e9f02a-7209-4ff0-89d3-bd79e23cc8cb"
                alt="Jun Kai (Luc) Chang"
                className="w-20 h-20 rounded-full object-cover ring-2 ring-gray-100 mb-4"
              />
              <h4 className="font-semibold text-gray-900">Jun Kai (Luc) Chang</h4>
              <p className="text-sm text-[--brand-ink] font-medium mb-2">AI Software Developer</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Luc is an AI Software Developer at Monash AIM, building neural networks on FPGA boards. He's pursuing a Master of AI at Monash and co-founding a startup in the event space.
              </p>
            </div>

            {/* Author 3: Julia Ponder */}
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/1702549233653.jpeg?alt=media&token=9ae8a7a5-58a0-4b3d-be4a-5699d2ca3a7c"
                alt="Julia Ponder"
                className="w-20 h-20 rounded-full object-cover ring-2 ring-gray-100 mb-4"
              />
              <h4 className="font-semibold text-gray-900">Julia Ponder</h4>
              <p className="text-sm text-[--brand-ink] font-medium mb-2">Technical Writer</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Julia specialises in translating developer jargon into plain English. She creates clear, expertly formatted documentation and tests products before they go to market.
              </p>
            </div>
          </div>
          <p className="mt-6 text-xs text-gray-500 text-center">
            AI-assisted drafting, human-edited and reviewed.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12">
        <ArticleFAQ items={faqItems} />
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
    </div>
  )
}
