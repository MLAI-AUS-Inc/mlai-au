import type { ReactNode } from 'react'
import { DEFAULT_AUTHOR_KEY, getAuthorProfile, DEFAULT_AUTHOR_AVATAR_FALLBACK_URL } from '../../authors'
import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
import AuthorBio from '../../../components/AuthorBio'

const TOPIC = "How to Find a Technical Co-Founder (And What to Do If You Can't)"
export const CATEGORY = "featured"
export const SLUG = "how-to-find-a-technical-co-founder-and-what-to-do-if-you-can-t"
export const DATE_PUBLISHED = "2026-03-13"
export const DATE_MODIFIED = "2026-03-13"
export const DESCRIPTION = "Struggling to find a technical cofounder? Learn where to look, how to pitch strong candidates, and what to do if you need to build without one."
const HERO_IMAGE = ''
const HERO_IMAGE_ALT = "How to Find a Technical Co-Founder (And What to Do If You Can't)"
const ARTICLE_URL = "/articles/featured/how-to-find-a-technical-co-founder-and-what-to-do-if-you-can-t"

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
  { id: 1, question: "Where can I find a technical co-founder?", answer: "Start with founder matching platforms, maker communities, LinkedIn outreach, local tech meetups, alumni networks, and hackathons." },
  { id: 2, question: "What do technical co-founders want to see from a non-technical founder?", answer: "They usually want more than an idea. Bring signs of execution, such as customer interviews, a waitlist, LOIs, or wireframes, and be clear about how you will handle sales, growth, or operations." },
  { id: 3, question: "Should I wait for the perfect technical co-founder before building?", answer: "Not always. If the search is slowing you down, another path is to build an MVP with a product studio so you can test the market and create traction." },
  { id: 4, question: "Can building an MVP first help me find a co-founder later?", answer: "Yes. A working MVP can make your startup easier to understand and may improve your chances of attracting a technical partner later." },
]

export const summaryHighlights = {
  heading: "Key facts: How to Find a Technical Co-Founder (And What to Do If You Can't)",
  intro: "Struggling to find a technical cofounder? Learn where to look, how to pitch strong candidates, and what to do if you need to build without one.",
  items: [
    { label: "Point 1", description: "Finding a technical co-founder works best when you treat it like a focused outreach process, not a lucky break. Look in founder matching platforms, maker communities, LinkedIn, and local networks. When you reach out, bring proof that you can execute on the business side, such as customer interviews, a waitlist, LOIs, or wireframes. If the search stalls, building an MVP with a product studio can help you gain traction and make future recruiting easier." },
  ],
}

export const articleMeta = {
  title: "How to Find a Technical Co-Founder (And What to Do If You Can't)",
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
      <section className="mx-auto max-w-4xl mt-10" id="where-to-look">
        <h2 className="text-3xl font-semibold">{"Where to Find a Technical Co-Founder"}</h2>
      </section>
      <section className="mx-auto max-w-4xl mt-10" id="how-to-pitch">
        <h2 className="text-3xl font-semibold">{"How to Pitch Top Technical Talent"}</h2>
      </section>
      <section className="mx-auto max-w-4xl mt-10" id="the-studio-alternative">
        <h2 className="text-3xl font-semibold">{"The Alternative: Building Without a Technical Co-Founder"}</h2>
      </section>
      <section className="mx-auto max-w-4xl mt-10" id="conclusion">
        <h2 className="text-3xl font-semibold">{"Keep Moving Forward"}</h2>
      </section>

      <div className="mt-12">
        <ArticleCompanyCTA
          title="Need to build before you find the right co-founder?"
          body="If your search is dragging on, consider building an MVP with a product team so you can validate demand and keep momentum."
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
