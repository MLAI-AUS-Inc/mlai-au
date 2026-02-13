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
const TITLE = `${NEWSLETTER} | Issue #5 | 16 Feb 2026`
const HERO_IMAGE =
  'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2Fmlai.au%2Fimages%2FChatGPT%20Image%20Jan%209%2C%202026%2C%2001_07_03%20PM.png?alt=media&token=d143aea5-9ffa-4674-906b-4d7fe020e2df'
const HERO_IMAGE_ALT = 'Scientific illustration of transient image classification'
const GEEKY_THOUGHT_IMAGE =
  'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/Gemini_Generated_Image_ycdjkoycdjkoycdj.png?alt=media&token=db9a41d3-7abc-4238-af15-35313ab3487c'
const TOOLS_IMAGE =
  'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/Gemini_Generated_Image_bots7bots7bots7b.png?alt=media&token=46a1488c-6f8a-46ee-9813-157b68835128'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
  {
    id: 1,
    question: 'TODO: FAQ question 1',
    answer: 'TODO: Answer for FAQ question 1.',
  },
  {
    id: 2,
    question: 'TODO: FAQ question 2',
    answer: 'TODO: Answer for FAQ question 2.',
  },
  {
    id: 3,
    question: 'TODO: FAQ question 3',
    answer: 'TODO: Answer for FAQ question 3.',
  },
]

export const summaryHighlights = {
  heading: `${NEWSLETTER} | Issue #5`,
  intro: 'TODO: One-sentence overview of this issue (what changed, why it matters, and who should care).',
  items: [
    {
      label: 'TODO: Key highlight 1',
      description: 'TODO: 2–3 sentence description of highlight 1.',
    },
    {
      label: 'TODO: Key highlight 2',
      description: 'TODO: 2–3 sentence description of highlight 2.',
    },
    {
      label: 'TODO: Key highlight 3',
      description: 'TODO: 2–3 sentence description of highlight 3.',
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
      avatarUrl:
        'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/1732146096971.jpeg?alt=media&token=8cbc3057-565b-48d0-be4f-e786332a6376',
    },
    {
      name: 'Jun Kai (Luc) Chang',
      role: 'AI Software Developer',
      bio: 'Luc is an AI Software Developer at Monash AIM, building neural networks on FPGA boards. He is pursuing a Master of AI at Monash and co-founding a startup in the event space.',
      avatarUrl:
        'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/1708509977925.jpeg?alt=media&token=57e9f02a-7209-4ff0-89d3-bd79e23cc8cb',
    },
    {
      name: 'Julia Ponder',
      role: 'Technical Writer',
      bio: 'Julia specialises in translating developer jargon into plain English. She creates clear, expertly formatted documentation and tests products before they go to market.',
      avatarUrl:
        'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/1702549233653.jpeg?alt=media&token=9ae8a7a5-58a0-4b3d-be4a-5699d2ca3a7c',
    },
    {
      name: 'Shivang Shekhar',
      role: 'Technical Writer',
      bio: 'Shivang is a mechanical engineer and AI masters student at Monash University with a diverse science background. He is the main author for AI Bits for Techies each week.',
      avatarUrl:
        'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/Gemini_Generated_Image_hpeo86hpeo86hpeo.png?alt=media&token=d4672acb-a6a0-40ce-b626-b4ba9623249a',
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
        titleHighlight="Issue #5"
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
        TODO: One or two sentences explaining what this issue focuses on and how it fits into the {SERIES} series.
      </QuoteBlock>

      <ArticleTocPlaceholder className="mb-12">
        {/* Rendered via portal by ArticleEnhancer */}
      </ArticleTocPlaceholder>

      <AudienceGrid
        heading="Read this if you are:"
        cards={[
          {
            title: 'Founders & Teams',
            description: 'TODO: Why this issue matters for founders and teams.',
            variant: 'orange',
            icon: <RocketLaunchIcon className="w-5 h-5 text-white" strokeWidth={1.8} />,
          },
          {
            title: 'Students & Switchers',
            description: 'TODO: Why this issue matters for students and career switchers.',
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
            description: 'TODO: Why this issue matters for community builders and ecosystem supporters.',
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
          TODO: 1–2 sentence intro in the usual Aussie-flavoured tone summarising what this issue is about, without
          going into detail.
        </p>

        <p>
          <strong>This week in one breath:</strong> TODO: Short, punchy summary of the key papers, tools, and big
          idea for this issue.
        </p>

        <hr className="my-8 border-gray-100" />

        <ArticleImageBlock src={HERO_IMAGE} alt={HERO_IMAGE_ALT} />

        <h2>TODO: Papers or main theme headline</h2>
        <h3>TODO: Paper 1 title and source</h3>
        <h3>TODO: Paper 2 title and source (optional)</h3>

        <h4>What is the setup?</h4>
        <p>TODO: Explain the problem or question these papers or this theme is tackling.</p>

        <h4>What they did (yes, really)</h4>
        <p>TODO: Plain-English summary of the method or approach.</p>

        <h4>What happened</h4>
        <p>TODO: Key results or findings that matter to practitioners.</p>

        <h4>Why it is interesting (beyond the number)</h4>
        <p>TODO: Interpretation and why this matters specifically for your audience.</p>

        <h4>The real question</h4>
        <p>TODO: 1–2 paragraphs reframing the results into a practical question for builders, teams or students.</p>

        <p>
          <strong>Full papers:</strong>
          <br />
          TODO: Add links to the full papers or primary sources here.
        </p>

        <hr className="my-8 border-gray-100" />

        {TOOLS_IMAGE && (
          <ArticleImageBlock
            src={TOOLS_IMAGE}
            alt="Tools worth poking this week"
          />
        )}

        <h2>Tools worth poking this week (in a sandbox first)</h2>

        <h3>TODO: Tool 1 name</h3>
        <p>
          <strong>Best for:</strong> TODO: Brief description of what this tool is best at.
          <br />
          <a href="TODO: https://example.com/tool-1" target="_blank" rel="noopener noreferrer">
            TODO: https://example.com/tool-1
          </a>
        </p>

        <h3>TODO: Tool 2 name</h3>
        <p>
          <strong>Best for:</strong> TODO: Brief description of what this tool is best at.
          <br />
          <a href="TODO: https://example.com/tool-2" target="_blank" rel="noopener noreferrer">
            TODO: https://example.com/tool-2
          </a>
        </p>

        <h3>TODO: Tool 3 name</h3>
        <p>
          <strong>Best for:</strong> TODO: Brief description of what this tool is best at.
          <br />
          <a href="TODO: https://example.com/tool-3" target="_blank" rel="noopener noreferrer">
            TODO: https://example.com/tool-3
          </a>
        </p>

        <h3>TODO: Tool 4 name (optional)</h3>
        <p>
          <strong>Best for:</strong> TODO: Brief description of what this tool is best at.
          <br />
          <a href="TODO: https://example.com/tool-4" target="_blank" rel="noopener noreferrer">
            TODO: https://example.com/tool-4
          </a>
        </p>

        <ArticleImageBlock
          src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/Gemini_Generated_Image_3l01zo3l01zo3l01.png?alt=media&token=bf5897e2-be7f-4a65-98fc-8d1086380fe6"
          alt="Book cover"
        />

        <h2>Book recommendation (because your brain deserves more than changelogs)</h2>
        <h3>TODO: Book title and author</h3>
        <p>TODO: 1–2 paragraphs on why this book is relevant right now and what kind of reader will get the most from it.</p>

        <hr className="my-8 border-gray-100" />

        {GEEKY_THOUGHT_IMAGE && (
          <ArticleImageBlock
            src={GEEKY_THOUGHT_IMAGE}
            alt="Geeky thought of the day"
          />
        )}

        <h2>Geeky thought of the day</h2>
        <p className="font-semibold">
          TODO: One-sentence hook for the geeky thought.
        </p>
        <p>TODO: 1–3 short paragraphs expanding on the idea in the same voice as previous issues.</p>

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

