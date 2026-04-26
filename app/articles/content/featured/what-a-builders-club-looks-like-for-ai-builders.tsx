import { useEffect } from 'react'
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

const TOPIC = 'What a Builders Club Looks Like for AI Builders'
export const CATEGORY = 'featured'
export const SLUG = 'what-a-builders-club-looks-like-for-ai-builders'
export const DATE_PUBLISHED = '2026-04-26'
export const DATE_MODIFIED = '2026-04-26'
export const DESCRIPTION = 'Learn what a builders club looks like in AI, how it works in practice, and why shared feedback, short build cycles, and community momentum help people build faster.'
const HERO_IMAGE = 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2Fmlai_user%3A1%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-73ed5eef-5158-4589-855a-78541d91cbcd.jpg?alt=media&token=92288c4c-abb1-4909-bf9b-dc6cd768b875'
const HERO_IMAGE_ALT = 'What a Builders Club Looks Like for AI Builders'
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
    question: 'What makes an AI builders club different from a networking group?',
    answer:
      'A builders club is focused on making and shipping projects. Discussion supports execution rather than replacing it.'
  },
  {
    id: 2,
    question: 'How does a builders club help members move faster?',
    answer:
      'Members get quick feedback loops, clearer next steps, and accountability from peers who are also actively building.'
  },
  {
    id: 3,
    question: 'What should I look for before joining?',
    answer:
      'Look for regular demos, active project sharing, practical guidance, and visible progress from members over time.'
  },
  {
    id: 4,
    question: 'Can beginners join a builders club?',
    answer:
      'Yes. Strong clubs support different levels with clear entry points while still giving advanced builders room to ship.'
  }
]

export const summaryHighlights = {
  heading: 'Key facts: What a Builders Club Looks Like for AI Builders',
  intro: DESCRIPTION,
  items: [
    {
      label: 'What is a builders club?',
      description:
        'A builders club is a practical community where people learn by making real projects and improving them in public.'
    },
    {
      label: 'Why does it work?',
      description:
        'It shortens the path from idea to prototype using feedback, shared examples, and repeatable build cycles.'
    },
    {
      label: 'What does a good one include?',
      description:
        'Structured learning, project reviews, mentor access, and a visible culture of shipping work.'
    }
  ]
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
  featuredFocus: FEATURED_FOCUS
}

const faqSchemaItems = faqItems.map((item) => ({
  question: item.question,
  answer: typeof item.answer === 'string' ? item.answer : ''
}))

const faqStructuredData = faqSchemaItems.length
  ? JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqSchemaItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    })
  : null

const CONTENT_FACTORY_INSPECTOR_SCRIPT = 'window.__cfArticleInspectorInstalled=true;'

function ContentFactoryInspectorBridge() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!new URLSearchParams(window.location.search).has('cfInspector')) return

    const inspectorScript = document.createElement('script')
    inspectorScript.dataset.contentFactoryInspector = 'true'
    inspectorScript.textContent = CONTENT_FACTORY_INSPECTOR_SCRIPT
    document.body.appendChild(inspectorScript)

    return () => {
      inspectorScript.remove()
    }
  }, [])

  return null
}

export default function ArticleContent() {
  const authorDetails = {
    name: AUTHOR,
    role: AUTHOR_ROLE,
    bio: AUTHOR_BIO,
    avatarUrl: AUTHOR_AVATAR
  }

  return (
    <>
      {faqStructuredData ? (
        <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: faqStructuredData }} />
      ) : null}

      <ContentFactoryInspectorBridge />

      <ArticleHeroHeader
        breadcrumbs={[
          { label: 'Home', href: '/', icon: Home },
          { label: 'Articles', href: '/articles' },
          { label: TOPIC, current: true }
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
          A builders club in AI is a learning community built around output. People share work in progress,
          get practical feedback, and improve quickly through short build cycles.
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
              title: 'Founders and Builders',
              description: 'For people turning ideas into early prototypes and customer tests.',
              icon: <RocketLaunchIcon className='h-6 w-6' />,
              variant: 'orange'
            },
            {
              title: 'Students and Career Switchers',
              description: 'For learners who want practical, project-based growth in AI.',
              icon: <AcademicCapIcon className='h-6 w-6' />,
              variant: 'purple'
            },
            {
              title: 'Community Leaders',
              description: 'For organisers building useful spaces for collaboration and shipping.',
              icon: <UsersIcon className='h-6 w-6' />,
              variant: 'yellow'
            }
          ]}
        />

        <QuoteBlock title='Key insight' variant='purple'>
          Builders clubs create momentum. The goal is not to consume more information. The goal is to turn
          ideas into working results with support from peers.
        </QuoteBlock>

        <ArticleStepList
          title='Practical next steps'
          accent='indigo'
          steps={[
            'Choose communities that show visible project progress.',
            'Prioritise clubs with regular feedback and demo cycles.',
            'Join places where learning and shipping happen together.'
          ]}
        />

        <ArticleResourceCTA
          eyebrow='Free guide'
          title='Get the builders club checklist'
          description='Use this checklist to evaluate communities before you commit your time.'
          buttonLabel='Explore articles'
          buttonHref='/articles'
          accent='purple'
        />

        <MLAITemplateResourceCTA />

        <ArticleReferences
          heading='Sources & further reading'
          references={[
            {
              id: 1,
              href: 'https://www.aibuilderclub.com/',
              title: 'AI Builder Club',
              publisher: 'aibuilderclub.com',
              description: 'Reference community example with practical build-first positioning.',
              category: 'guide'
            },
            {
              id: 2,
              href: 'https://buildclub.ai/',
              title: 'Build Club',
              publisher: 'buildclub.ai',
              description: 'Reference community centred on building and feedback loops.',
              category: 'guide'
            },
            {
              id: 3,
              href: 'https://www.smartcompany.com.au/startupsmart/ai-builder-club-free-residency-program-australia/',
              title: 'AI Builder Club residency coverage',
              publisher: 'smartcompany.com.au',
              description: 'Reference covering a short, project-focused residency model.',
              category: 'guide'
            }
          ]}
        />

        <ArticleDisclaimer />

        <div className='my-12 not-prose'>
          <ArticleCompanyCTA
            title='Find a builders club that helps you ship'
            body='Use this article as a checklist: practical learning, visible project sharing, regular feedback, and clear build cycles.'
            buttonText='Explore practical AI resources'
            buttonHref='/articles'
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
