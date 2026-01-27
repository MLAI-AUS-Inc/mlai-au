import type { ReactNode } from 'react'
import { Home } from 'lucide-react'

import { ArticleFAQ } from '~/components/articles/ArticleFAQ'
import { getAuthorProfile } from '../../authors'
import AuthorBio from '../../../components/AuthorBio'
import { ArticleHeroHeader } from '../../../components/articles/ArticleHeroHeader'
import { ArticleImageBlock } from '../../../components/articles/ArticleImageBlock'
import { ArticleFooterNav } from '../../../components/articles/ArticleFooterNav'
import { QuoteBlock } from '../../../components/articles/QuoteBlock'
import { ArticleTocPlaceholder } from '../../../components/articles/ArticleTocPlaceholder'
import { AudienceGrid } from '../../../components/articles/AudienceGrid'
import { RocketLaunchIcon } from '@heroicons/react/24/outline'

/** ========== INPUTS (replace all placeholders) ========== */
const SERIES = 'Weekly Deep Dive into AI and ML Advancements & Updates'
const NEWSLETTER = 'AI Bits for Techies'
const TITLE = `${NEWSLETTER} | Issue #2 | 15 Jan 2026`
const HERO_IMAGE = 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-d712d9d4-9358-43a8-a5c1-be38741f4d8e.jpg?alt=media&token=a4aa21de-513d-4d48-82d9-c7ef58e21268'
const HERO_IMAGE_ALT = 'AI and ML advancements visualization'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
  // Issue #2 Specifics
  {
    id: 1,
    question: 'What is the "Journal Paper of the Week"?',
    answer:
      'It discusses "Personality Matters: User Traits Predict LLM Preferences in Multi-Turn Collaborative Tasks," showing how different personality types (Rationals, Idealists, Guardians, Artisans) have distinct preferences for GPT-4 vs Claude 3.5, proving that aggregated benchmarks mask the reality that usability is subjective.',
  },
  {
    id: 2,
    question: 'Which AI tools are worth checking out this week?',
    answer:
      'We highlight T3 Chat for comparing multiple LLM outputs side-by-side, LTX Studio for AI video generation and editing, and Auralix for emotional voice synthesis in 100+ languages.',
  },
  {
    id: 3,
    question: 'What book is recommended in this issue?',
    answer:
      'Brian Christian\'s "The Alignment Problem," which explores how even well-intentioned AI systems drift when optimization targets miss what humans actually care about, and raises the question of what alignment means in a world of diverse users with different personalities.',
  },
  {
    id: 4,
    question: 'What does your choice of LLM say about you?',
    answer:
      'Different models optimize for different things: precision, creativity, tone, or structure. If you prefer one over another, you\'re often selecting for how you think and work, not raw intelligence. The model becomes a mirror of your cognitive style and goals.',
  },
  {
    id: 5,
    question: 'Why do two equally powerful LLMs feel so different to use?',
    answer:
      'Small differences in response style, verbosity, and reasoning transparency compound over multi-turn conversations. Over time, these differences shape trust, frustration, and perceived intelligence more than benchmark scores.',
  },
  {
    id: 6,
    question: 'Are some LLMs better for engineers and others for creators?',
    answer:
      'Yes. Some models excel at structured reasoning and deterministic tasks, while others feel more natural in open-ended or creative workflows. The "best" model depends on whether you value correctness, exploration, or collaboration.',
  },
  {
    id: 7,
    question: 'Does model "helpfulness" mean the same thing for everyone?',
    answer:
      'No. Some users define helpfulness as speed and accuracy, others as clarity, empathy, or guidance. This makes aggregate ratings misleading unless you segment by task type or user profile.',
  },
  {
    id: 8,
    question: 'Are we measuring AI intelligence or user–AI fit?',
    answer:
      'Most current evaluations mix the two. What we often call "model quality" is often the result of compatibility between the user, the task, and the interaction style, not just the model itself.',
  },
  {
    id: 9,
    question: 'What is the practical takeaway for builders this week?',
    answer:
      'Stop asking "Which LLM is best?" and start asking "Best for whom, and for what?" Design experiments around real users, real workflows, and real friction — not just leaderboard scores.',
  },

  // Strategic / Framework Questions
  {
    id: 10,
    question: 'Do I need to change my privacy notices for new AI features?',
    answer:
      'If you introduce new AI features that process personal or sensitive information, update your privacy notice and consent flows. Reference the OAIC APPs and include a short, plain-English description of what the model does, inputs needed, retention, and human oversight.',
  },
  {
    id: 11,
    question: 'What is the safest way to start a pilot?',
    answer:
      'Begin with low-risk internal content (policies, FAQs), apply rate limits, log prompts/outputs, and perform red-team style testing. Use feature flags and role-based access. Run a DPIA/PIA if personal data is involved.',
  },
  {
    id: 12,
    question: 'How should teams validate model performance?',
    answer:
      'Create a small, labeled evaluation set that mirrors your domain. Track accuracy, hallucination rate, latency, and cost per request. Re-test after any model switch or prompt change, and record changes in a decision log.',
  },
  {
    id: 13,
    question: 'Are there grants or programs in Australia for AI experiments?',
    answer:
      'Check current state-based innovation vouchers, CSIRO Kick-Start, and university accelerator programs. Funding cycles shift, so confirm eligibility windows and co-contribution rules before committing spend.',
  },
]

export const summaryHighlights = {
  heading: `${NEWSLETTER} | Issue #2`,
  intro:
    'Three questions people are hammering into search and chat right now, plus the short answers you can steal.',
  items: [
    {
      label:
        'Is RAG dead now that context windows are 10M+ tokens?',
      description:
        'No. Long context is for synthesis; RAG is for precision. Throwing a 500-page manual into Gemini 3 Pro is great if you want a summary of the whole thing. But if you need to query that manual 10,000 times a day for specific error codes, long context is too slow and too expensive. RAG is still the king of cost-effective retrieval; Long Context is the king of "reading the book."',
    },
    {
      label:
        'Why is everyone obsessed with DeepSeek R1 / "Thinking" models?',
      description:
        'Because we finally realized that speed isn\'t intelligence. "Thinking" models (like o3 or DeepSeek R1) use "test-time compute"—they essentially brainstorm and critique their own logic before answering. Use standard models (GPT-4o, Claude Sonnet) for creative writing or quick tasks. Use Thinking models for complex math, architecture decisions, or debugging code where the first guess is usually wrong.',
    },
    {
      label:
        'Can I actually run a useful LLM on my laptop in 2026?',
      description:
        'Yes, if you accept the \'dumber but private\' trade-off. With the new Llama 4 (quantized) releases and Apple\'s M-series chips, local inference is finally usable for coding assistants and sensitive data analysis. It won\'t write a novel as well as Claude Opus, but for autocomplete and querying private SQL databases without leaking data to the cloud, it is the only safe option.',
    },
  ],
}

export const useCustomHeader = true

export default function ArticlePage() {
  const authors = [
    getAuthorProfile('samDonegan'),
    getAuthorProfile('junKaiChang'),
    getAuthorProfile('juliaPonder'),
    getAuthorProfile('shivangShekhar'),
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
        titleHighlight="Issue #2"
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
          <strong>This week in one breath:</strong> Personality types predict which LLM you'll actually like working with (Rationals prefer GPT-4, Idealists prefer Claude 3.5), new tools for comparing models and generating video/voice content, and the uncomfortable question of whether "best model" leaderboards are measuring intelligence or just user–model compatibility.
        </p>

        <hr className="my-8 border-gray-100" />

        <ArticleImageBlock src={HERO_IMAGE} alt={HERO_IMAGE_ALT} />

        <h2>The one paper you should pretend you read at lunch</h2>
        <h3>Personality Matters: User Traits Predict LLM Preferences in Multi-Turn Collaborative Tasks</h3>

        <h4>What is the setup?</h4>
        <p>
          Most AI benchmarks treat humans as "Standardized User Units"—interchangeable inputs who all want the same thing. This paper asks the obvious but ignored question: Does your specific personality type determine which AI you can actually stand working with?
        </p>

        <h4>What they did (yes, really)</h4>
        <p>
          They recruited 32 participants across the four Keirsey personality archetypes (Rationals, Idealists, Guardians, Artisans) and put them to work with GPT-4 and Claude 3.5 on real-world multi-turn tasks (data analysis, writing, retrieval).
        </p>

        <h4>What happened</h4>
        <p>
          If you looked at the average scores, the models looked identical. But when they split the data by personality, the tribes emerged. "Rationals" (the logic-first crowd) strongly preferred GPT-4. "Idealists" (the vibes/meaning crowd) flocked to Claude 3.5. The "average user" doesn't exist; only specific personality matches do.
        </p>

        <h4>Why it is interesting (beyond the number)</h4>
        <p>
          It proves that the "Leaderboard" is a lie. There is no single "Best Model." Aggregated benchmarks mask the reality that usability is subjective. We don't just need better models; we need models that fit specific cognitive styles.
        </p>

        <h4>The real question</h4>
        <p>
          If "Idealists" prefer Claude and "Rationals" prefer GPT, is your choice of LLM actually just a digital Myers-Briggs test?
        </p>

        <p>
          <strong>Full paper:</strong>{' '}
          <a href="https://arxiv.org/abs/2508.21628" target="_blank" rel="noopener noreferrer">
            https://arxiv.org/abs/2508.21628
          </a>
        </p>

        <hr className="my-8 border-gray-100" />

        <h2>Tools worth poking this week (in a sandbox first)</h2>

        <h3>T3 Chat</h3>
        <p>
          A platform for comparing multiple LLM outputs side-by-side in one conversation interface.
        </p>
        <p>
          <strong>Best for:</strong> Comparing multiple LLM outputs side-by-side in one conversation — ideal for experimentation, prototyping, and A/B testing different model behaviors.
          <br />
          <a href="https://t3.chat/" target="_blank" rel="noopener noreferrer">
            https://t3.chat/
          </a>
        </p>

        <h3>LTX Studio</h3>
        <p>
          AI-powered video generation and editing platform that creates scenes, motion graphics, and video content from text prompts.
        </p>
        <p>
          <strong>Best for:</strong> AI video generation and editing — create scenes, motion graphics, and video content from text prompts with manual controls for framing, camera direction, and storytelling.
          <br />
          <a href="https://ltx.studio/" target="_blank" rel="noopener noreferrer">
            https://ltx.studio/
          </a>
        </p>

        <h3>Auralix</h3>
        <p>
          Emotional voice synthesis platform that produces human-grade, emotionally nuanced audio in 100+ languages.
        </p>
        <p>
          <strong>Best for:</strong> Emotional voice synthesis — produces human-grade, emotionally nuanced audio for podcasts, audiobooks, and voiceovers in 100+ languages, ideal for creators and educators.
          <br />
          <a href="https://www.auralix.ai/" target="_blank" rel="noopener noreferrer">
            https://www.auralix.ai/
          </a>
        </p>

        <hr className="my-8 border-gray-100" />

        <ArticleImageBlock
          src="[TODO: Add book cover image URL]"
          alt="Book cover of The Alignment Problem by Brian Christian"
        />

        <h2>Book recommendation (because your brain deserves more than changelogs)</h2>
        <h3>The Alignment Problem (Brian Christian)</h3>
        <p>
          As LLMs become collaborators rather than tools, the real challenge is not raw capability but alignment with human goals, values, and expectations. Brian Christian traces how even well-intentioned systems drift when optimization targets miss what humans actually care about.
        </p>
        <p>
          Reading alongside this week's paper, it sharpens the question: if models already "misalign" differently for different personalities, what does alignment even mean in a world of diverse users?
        </p>

        <hr className="my-8 border-gray-100" />

        <h2>Geeky thought of the day</h2>
        <p className="font-semibold">
          Is LLM evaluation measuring model intelligence… or user–model compatibility?
        </p>
        <p>
          Two models can score the same on benchmarks and still feel radically different to different people. What looks like "better reasoning" to one user might feel rigid or frustrating to another.
        </p>
        <p>
          The uncomfortable idea is that LLM performance may not be a single objective property at all. It may emerge from the interaction — shaped by the user's goals, personality, and expectations as much as the model itself.
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

