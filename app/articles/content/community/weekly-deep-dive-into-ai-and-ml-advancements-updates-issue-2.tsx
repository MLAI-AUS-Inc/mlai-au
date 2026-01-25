import type { ReactNode } from 'react'
import { Home } from 'lucide-react'

import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
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
const TITLE = `${NEWSLETTER} | Issue #2 | 19 Jan 2026`
const HERO_IMAGE = 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2Fmlai.au%2Fimages%2FChatGPT%20Image%20Jan%209%2C%202026%2C%2001_07_03%20PM.png?alt=media&token=d143aea5-9ffa-4674-906b-4d7fe020e2df'
const HERO_IMAGE_ALT = 'Scientific illustration of transient image classification'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
  {
    id: 1,
    question: 'What does your choice of LLM say about you?',
    answer:
      'Different models optimize for different things: precision, creativity, tone, or structure. If you prefer one over another, you\'re often selecting for how you think and work, not raw intelligence. The model becomes a mirror of your cognitive style and goals.',
  },
  {
    id: 2,
    question: 'Why do two equally powerful LLMs feel so different to use?',
    answer:
      'Small differences in response style, verbosity, and reasoning transparency compound over multi-turn conversations. Over time, these differences shape trust, frustration, and perceived intelligence more than benchmark scores.',
  },
  {
    id: 3,
    question: 'Are some LLMs better for engineers and others for creators?',
    answer:
      'Yes. Some models excel at structured reasoning and deterministic tasks, while others feel more natural in open-ended or creative workflows. The "best" model depends on whether you value correctness, exploration, or collaboration.',
  },
  {
    id: 4,
    question: 'Does model "helpfulness" mean the same thing for everyone?',
    answer:
      'No. Some users define helpfulness as speed and accuracy, others as clarity, empathy, or guidance. This makes aggregate ratings misleading unless you segment by task type or user profile.',
  },
  {
    id: 5,
    question: 'Are we measuring AI intelligence or user–AI fit?',
    answer:
      'Most current evaluations mix the two. What we often call "model quality" is often the result of compatibility between the user, the task, and the interaction style, not just the model itself.',
  },
  {
    id: 6,
    question: 'What is the practical takeaway for builders this week?',
    answer:
      'Stop asking "Which LLM is best?" and start asking "Best for whom, and for what?" Design experiments around real users, real workflows, and real friction, not just leaderboard scores.',
  },
]

export const summaryHighlights = {
  heading: `${NEWSLETTER} | Issue #2`,
  intro:
    'Three questions people are hammering into search and chat right now, plus the short answers you can steal.',
  items: [
    {
      label:
        'Do different personality types actually prefer different LLMs?',
      description:
        'Yes. This week\'s paper shows Rationals tend to favor GPT-4 while Idealists prefer Claude 3.5, even when overall helpfulness scores are nearly identical. Personality-stratified analysis reveals preferences that aggregate ratings hide.',
    },
    {
      label:
        'Are we measuring model intelligence or user–model compatibility?',
      description:
        'Most evaluations mix the two. What we call "model quality" often reflects compatibility between the user, task, and interaction style—not just the model itself. Two equally powerful models can feel radically different to different people.',
    },
    {
      label:
        'Should we stop asking "Which LLM is best?"',
      description:
        'Yes. Start asking "Best for whom, and for what?" Design experiments around real users, workflows, and friction—not just leaderboard scores. This shifts from model-centric thinking to user-centric design.',
    },
  ],
}

export const useCustomHeader = true

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
    {
      name: 'Shivang Shekhar',
      role: 'Technical Writer',
      bio: 'Shivang is a mechanical engineer and AI masters student at Monash University with a diverse science background. He is the main author for AI Bits for Techies each week.',
      avatarUrl: '🔬',
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
          <strong>This week in one breath:</strong> A paper showing personality types predict LLM preferences (Rationals favor GPT-4, Idealists prefer Claude 3.5), tools for comparing models and generating video/voice content, and a shift in thinking: "best LLM" isn't one answer—it depends on who you are and what you're doing.
        </p>

        <hr className="my-8 border-gray-100" />

        <ArticleImageBlock src={HERO_IMAGE} alt={HERO_IMAGE_ALT} />

        <h2>The one paper you should pretend you read at lunch</h2>
        <h3>Personality Matters: User Traits Predict LLM Preferences in Multi-Turn Collaborative Tasks</h3>

        <h4>What is the setup?</h4>
        <p>
          Most LLM evals treat users as basically interchangeable and report an average "helpfulness" score. This paper flips it: it asks whether different personality types systematically prefer different models during real, multi-turn collaboration.
        </p>

        <h4>What they did (yes, really)</h4>
        <p>
          They ran a user study with 32 participants, evenly split across four Keirsey personality types, and had them complete four collaborative tasks (data analysis, creative writing, information retrieval, writing assistance) using either GPT-4 or Claude 3.5.
        </p>

        <h4>What happened</h4>
        <p>
          On the surface, the models looked tied: overall helpfulness ratings were nearly identical. But once they segmented by personality, strong preferences popped out. Rationals tended to prefer GPT-4 (especially on goal-oriented work), while Idealists tended to prefer Claude 3.5 (notably on creative and analytical tasks). Other types varied by task.
        </p>

        <h4>Why it is interesting (beyond the number)</h4>
        <p>
          It's a clean example of how "best model" can be an illusion created by averaging across people. If you only look at aggregate ratings, you miss real usability differences that show up once you account for who is using the system and what they are trying to do.
        </p>

        <h4>The real question</h4>
        <p>
          If personality (and likely other user traits) changes what "helpful" even means, should we stop treating LLM evaluation as one leaderboard and start treating it like product fit? That pushes builders toward personalization, segmentation, and task-specific rollout decisions, not just model swaps.
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
          <strong>Best for:</strong> Comparing multiple LLM outputs side-by-side in one conversation — ideal for experimentation,
          prototyping, and A/B testing different model behaviors.
          <br />
          <a href="https://t3.chat/" target="_blank" rel="noopener noreferrer">
            https://t3.chat/
          </a>
        </p>

        <h3>LTX Studio</h3>
        <p>
          <strong>Best for:</strong> AI video generation and editing — create scenes, motion graphics, and video content from text
          prompts with manual controls for framing, camera direction, and storytelling
          <br />
          <a href="https://ltx.studio/" target="_blank" rel="noopener noreferrer">
            https://ltx.studio/
          </a>
        </p>

        <h3>Auralix</h3>
        <p>
          <strong>Best for:</strong> Emotional voice synthesis — produces human-grade, emotionally nuanced audio for podcasts,
          audiobooks, and voiceovers in 100+ languages, ideal for creators and educators
          <br />
          <a href="https://www.auralix.ai/" target="_blank" rel="noopener noreferrer">
            https://www.auralix.ai/
          </a>
        </p>

        <ArticleImageBlock
          src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2Fmlai.au%2Fimages%2FChatGPT%20Image%20Jan%209%2C%202026%2C%2001_01_56%20PM.png?alt=media&token=7aa355b9-1304-40cf-bba2-1808e9141a26"
          alt="Book cover"
        />

        <h2>Book recommendation (because your brain deserves more than changelogs)</h2>
        <h3>The Alignment Problem – Brian Christian</h3>
        <p>
          As LLMs become collaborators rather than tools, the real challenge is not raw capability but alignment
          with human goals, values, and expectations. Brian Christian traces how even well-intentioned systems
          drift when optimization targets miss what humans actually care about.
        </p>
        <p>
          Reading alongside this week's paper, it sharpens the question: if models already "misalign" differently for different personalities, what
          does alignment even mean in a world of diverse users?
        </p>

        <hr className="my-8 border-gray-100" />

        <h2>Geeky thought of the day</h2>
        <p className="font-semibold">
          Is LLM evaluation measuring model intelligence… or user–model compatibility?
        </p>
        <p>
          Two models can score the same on benchmarks and still feel radically different to different people. What
          looks like "better reasoning" to one user might feel rigid or frustrating to another.
        </p>
        <p>
          The uncomfortable idea is that LLM performance may not be a single objective property at all. It may
          emerge from the interaction — shaped by the user's goals, personality, and expectations as much as the
          model itself.
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
