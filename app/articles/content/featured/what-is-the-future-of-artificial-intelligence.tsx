import type { ReactNode } from 'react'
import { Home } from 'lucide-react'
import { AcademicCapIcon, RocketLaunchIcon, UsersIcon } from '@heroicons/react/24/outline'
import { DEFAULT_AUTHOR_AVATAR_FALLBACK_URL, DEFAULT_AUTHOR_KEY, getAuthorProfile } from '~/articles/authors'
import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
import AuthorBio from '../../../components/AuthorBio'
import { ArticleHeroHeader } from '../../../components/articles/ArticleHeroHeader'
import { ArticleImageBlock } from '../../../components/articles/ArticleImageBlock'
import { ArticleFooterNav } from '../../../components/articles/ArticleFooterNav'
import QuoteBlock from '../../../components/articles/QuoteBlock'
import ArticleTocPlaceholder from '../../../components/articles/ArticleTocPlaceholder'
import AudienceGrid from '../../../components/articles/AudienceGrid'
import { ArticleResourceCTA } from '../../../components/articles/ArticleResourceCTA'
import { ArticleStepList } from '../../../components/articles/ArticleStepList'
import MLAITemplateResourceCTA from '../../../components/articles/MLAITemplateResourceCTA'
import { ArticleReferences } from '../../../components/articles/ArticleReferences'
import ArticleDisclaimer from '../../../components/articles/ArticleDisclaimer'

export const useCustomHeader = true

const TOPIC = 'What Is the Future of Artificial Intelligence?'
export const CATEGORY = 'featured'
export const SLUG = 'what-is-the-future-of-artificial-intelligence'
export const DATE_PUBLISHED = '2026-04-28'
export const DATE_MODIFIED = '2026-04-28'
export const DESCRIPTION =
  'What is the future of artificial intelligence? Explore the main AI trends, biggest opportunities, key risks, and the practical skills worth learning now.'
const HERO_IMAGE =
  'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2Fmlai_user%3A1%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-1f8443da-ff58-4702-a9f2-ff636230d4e7.jpg?alt=media&token=c7a88c45-6b28-454b-947a-bd3c1a1492b9'
const HERO_IMAGE_ALT = 'Close-up of coworkers reviewing AI trend charts'
export const FEATURED_FOCUS = 'ai'

const AUTHOR_PROFILE = getAuthorProfile(DEFAULT_AUTHOR_KEY)
const AUTHOR = AUTHOR_PROFILE?.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE?.role ?? AUTHOR_PROFILE?.credentials ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE?.bio ?? ''
const AUTHOR_AVATAR = AUTHOR_PROFILE?.avatarUrl ?? DEFAULT_AUTHOR_AVATAR_FALLBACK_URL

interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
  {
    id: 1,
    question: 'Which industries are likely to benefit first from AI?',
    answer:
      'Healthcare, operations, customer service, and research are leading early domains because they combine large data flows with repeated decisions.',
  },
  {
    id: 2,
    question: 'Will AI replace most jobs soon?',
    answer:
      'The most likely near-term pattern is task automation and human augmentation, not wholesale job replacement.',
  },
  {
    id: 3,
    question: 'What skills matter most in an AI future?',
    answer:
      'AI literacy, practical tool usage, output evaluation, data awareness, and domain expertise are core durable skills.',
  },
  {
    id: 4,
    question: 'Why is governance important for AI adoption?',
    answer:
      'Trust, transparency, and oversight determine whether AI can be safely used in high-impact decisions and workflows.',
  },
]

export const summaryHighlights = {
  heading: 'Key facts: What Is the Future of Artificial Intelligence?',
  intro: DESCRIPTION,
  items: [
    {
      label: 'Wider adoption',
      description:
        'AI is moving into business, healthcare, science, and everyday software through practical workflow integration.',
    },
    {
      label: 'Human and AI collaboration',
      description:
        'Most value comes from systems that assist people with research, analysis, and repetitive tasks rather than replace judgment.',
    },
    {
      label: 'Capability plus trust',
      description:
        'Safety, governance, and reliability are becoming core requirements for real adoption at scale.',
    },
  ],
}

export const articleMeta = {
  title: TOPIC,
  topic: TOPIC,
  category: CATEGORY,
  slug: SLUG,
  description: DESCRIPTION,
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  author: AUTHOR,
  image: HERO_IMAGE,
  imageAlt: HERO_IMAGE_ALT,
  featuredFocus: FEATURED_FOCUS,
}

const faqStructuredData = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: typeof item.answer === 'string' ? item.answer : '',
    },
  })),
})

const articleStructuredData = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TOPIC,
  description: DESCRIPTION,
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  author: {
    '@type': 'Person',
    name: AUTHOR,
  },
  image: HERO_IMAGE,
})

export default function ArticleContent() {
  const authorDetails = {
    name: AUTHOR,
    role: AUTHOR_ROLE,
    bio: AUTHOR_BIO,
    avatarUrl: AUTHOR_AVATAR,
  }

  return (
    <>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: articleStructuredData }} />
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: faqStructuredData }} />

      <ArticleHeroHeader
        breadcrumbs={[
          { label: 'Home', href: '/', icon: Home },
          { label: 'Articles', href: '/articles' },
          { label: TOPIC, current: true },
        ]}
        title={TOPIC}
        titleHighlight={TOPIC}
        headerBgColor='cyan'
        summary={summaryHighlights}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      <ArticleTocPlaceholder className='bg-transparent' />

      <div className='prose prose-lg prose-slate max-w-none bg-transparent'>
        <p>
          The future of artificial intelligence is best understood as steady adoption plus improving capability. The most reliable trend is practical integration into real workflows.
        </p>

        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption={DESCRIPTION}
          width={1600}
          height={1067}
        />

        <AudienceGrid
          heading='Who is this guide for?'
          cards={[
            {
              title: 'Founders and builders',
              description: 'For teams deciding where AI can create measurable value first.',
              icon: <RocketLaunchIcon className='h-6 w-6' />,
              variant: 'orange',
            },
            {
              title: 'Students and career switchers',
              description: 'For readers building practical AI skills that map to real tasks.',
              icon: <AcademicCapIcon className='h-6 w-6' />,
              variant: 'purple',
            },
            {
              title: 'Community leaders',
              description: 'For people helping others adopt AI safely and usefully.',
              icon: <UsersIcon className='h-6 w-6' />,
              variant: 'yellow',
            },
          ]}
        />

        <QuoteBlock title='Key insight' variant='purple'>
          AI progress is no longer only about model benchmarks. Real impact now depends on fit, usability, and trust in day-to-day operations.
        </QuoteBlock>

        <ArticleStepList
          title='Practical next steps'
          accent='indigo'
          steps={[
            'Build baseline AI literacy and understand model limits.',
            'Test tools on one real workflow with clear quality checks.',
            'Track outcomes and add governance before scaling use.',
          ]}
        />

        <ArticleResourceCTA
          eyebrow='Free guide'
          title='Get a practical AI future checklist'
          description='Use this checklist to prioritise AI opportunities, risks, and capability building in a grounded way.'
          buttonLabel='Browse articles'
          buttonHref='/articles'
          accent='purple'
        />

        <MLAITemplateResourceCTA />

        <ArticleReferences
          heading='Sources and further reading'
          references={[
            {
              id: 1,
              href: 'https://builtin.com/artificial-intelligence/artificial-intelligence-future',
              title: 'The Future of AI: How AI Is Changing the World',
              publisher: 'Built In',
              description: 'Overview of near-term AI adoption patterns across industries.',
              category: 'guide',
            },
            {
              id: 2,
              href: 'https://www.ibm.com/think/insights/artificial-intelligence-future',
              title: 'The Future of Artificial Intelligence',
              publisher: 'IBM',
              description: 'Enterprise-focused perspective on AI capability and deployment.',
              category: 'guide',
            },
            {
              id: 3,
              href: 'https://business.uq.edu.au/momentum/4-ways-ai-will-revolutionise-the-world',
              title: 'Expert AI Predictions',
              publisher: 'University of Queensland',
              description: 'Practical predictions about AI effects in business and society.',
              category: 'guide',
            },
          ]}
        />

        <ArticleDisclaimer />

        <div className='my-12 not-prose'>
          <ArticleCompanyCTA
            title='Build practical AI skills with a clear starting point'
            body='Move from headlines to hands-on capability by learning core concepts and applying them to real projects.'
            buttonText='Explore practical AI learning'
            buttonHref='/articles/featured/how-to-get-started-with-ai-2026'
          />
        </div>
      </div>

      <AuthorBio author={authorDetails} />
      <div className='mt-12'>
        <ArticleFAQ items={faqItems} />
      </div>
      <ArticleFooterNav backHref='/articles' topHref='#' />
    </>
  )
}
