import type { ReactNode } from 'react'
import { DEFAULT_AUTHOR_KEY, getAuthorProfile, DEFAULT_AUTHOR_AVATAR_FALLBACK_URL } from '../../authors'
import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
import AuthorBio from '../../../components/AuthorBio'

const TOPIC = "The Non-Technical Founder's Guide to Finding a Technical Co-Founder"
export const CATEGORY = "featured"
export const SLUG = "the-non-technical-founder-s-guide-to-finding-a-technical-co-founder"
export const DATE_PUBLISHED = "2026-03-13"
export const DATE_MODIFIED = "2026-03-13"
export const DESCRIPTION = "Struggling to find a technical cofounder? Learn practical ways to meet engineers, pitch your startup, show traction, and keep building while you search."
const HERO_IMAGE = ''
const HERO_IMAGE_ALT = "The Non-Technical Founder's Guide to Finding a Technical Co-Founder"
const ARTICLE_URL = "/articles/featured/the-non-technical-founder-s-guide-to-finding-a-technical-co-founder"

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
  { id: 1, question: "How do I find a technical cofounder if I do not know engineers personally?", answer: "Start with founder matching platforms, local startup meetups, hackathons, tech conferences, LinkedIn, and alumni networks. Warm introductions are helpful, but they are not the only path." },
  { id: 2, question: "What makes an engineer take a startup pitch seriously?", answer: "Clear proof that you have done more than come up with an idea. Customer interviews, wireframes, waitlists, pre-sales, or other early traction signals make your pitch stronger." },
  { id: 3, question: "What should I offer a technical cofounder?", answer: "Be clear about the business value you bring, the problem you are solving, the stage of the company, and the expected role. Equity and expectations should be discussed openly and early." },
  { id: 4, question: "Should I wait for a cofounder before building anything?", answer: "Not necessarily. You can test demand with no-code tools, hire freelancers, work with a fractional CTO, or partner with a product studio to keep learning and moving." },
  { id: 5, question: "What if I never find the right technical cofounder?", answer: "You can still build traction and launch a first version through other support models. The key is to keep validating the business while staying disciplined about technical decisions and budget." },
]

export const summaryHighlights = {
  heading: "Key facts: The Non-Technical Founder's Guide to Finding a Technical Co-Founder",
  intro: "Struggling to find a technical cofounder? Learn practical ways to meet engineers, pitch your startup, show traction, and keep building while you search.",
  items: [
    { label: "Point 1", description: "If you need to find a technical cofounder, focus on two things at once: meeting the right people and proving your startup is worth joining. This guide covers where to look, how to pitch an engineer, and what to do if the right partner does not appear right away." },
  ],
}

export const articleMeta = {
  title: "The Non-Technical Founder's Guide to Finding a Technical Co-Founder",
  topic: TOPIC,
  category: CATEGORY,
  slug: SLUG,
  description: DESCRIPTION,
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  author: AUTHOR,
  image: HERO_IMAGE,
  imageAlt: HERO_IMAGE_ALT,
}

const articleStructuredData = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: articleMeta.title,
  description: articleMeta.description,
  datePublished: articleMeta.datePublished,
  dateModified: articleMeta.dateModified,
  author: {
    '@type': 'Person',
    name: articleMeta.author,
  },
  mainEntityOfPage: ARTICLE_URL,
})

const faqStructuredData = faqItems.length
  ? JSON.stringify({
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
  : null

export default function ArticleContent() {
  const authorDetails = {
    name: AUTHOR,
    role: AUTHOR_ROLE,
    bio: AUTHOR_BIO,
    avatarUrl: AUTHOR_AVATAR,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleStructuredData }} />
      {faqStructuredData ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqStructuredData }} />
      ) : null}
      <section className="mx-auto max-w-4xl mt-6">
      </section>
      <section className="mx-auto max-w-4xl mt-10" id="prose-01">
        <h2 className="text-3xl font-semibold">{"Where to Find Technical Cofounder Candidates"}</h2>
      </section>
      <section className="mx-auto max-w-4xl mt-10" id="prose-02">
        <h2 className="text-3xl font-semibold">{"How to Pitch Your Startup to an Engineer"}</h2>
      </section>
      <section className="mx-auto max-w-4xl mt-10" id="prose-03">
        <h2 className="text-3xl font-semibold">{"What to Do When You Can't Find One Immediately"}</h2>
      </section>
      <section className="mx-auto max-w-4xl mt-10" id="conclusion-01">
        <h2 className="text-3xl font-semibold">{"Keep Your Momentum Going"}</h2>
      </section>

      <div className="mt-12">
        <ArticleCompanyCTA
          title="Need to build before you find the right co-founder?"
          body="If you have a validated idea and need a technical team to help you launch, MLAI can support your MVP so you can keep momentum while you search for the right long-term partner."
          buttonText="Learn more"
          buttonHref="/contact"
        />
      </div>

      <AuthorBio author={authorDetails} />

      <div className="mt-12">
        <ArticleFAQ items={faqItems} />
      </div>
    </>
  )
}
