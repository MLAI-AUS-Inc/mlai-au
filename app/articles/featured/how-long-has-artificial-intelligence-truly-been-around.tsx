import type { ReactNode } from 'react'
import { Home } from 'lucide-react'
import { RocketLaunchIcon, AcademicCapIcon, UsersIcon } from '@heroicons/react/24/solid'
import { DEFAULT_AUTHOR_KEY, getAuthorProfile, DEFAULT_AUTHOR_AVATAR_FALLBACK_URL } from '~/articles/authors'
import { ArticleFAQ } from '../../components/articles/ArticleFAQ'
import ArticleCompanyCTA from '../../components/articles/ArticleCompanyCTA'
import AuthorBio from '../../components/AuthorBio'
import { ArticleHeroHeader } from '../../components/articles/ArticleHeroHeader'
import { ArticleImageBlock } from '../../components/articles/ArticleImageBlock'
import { ArticleFooterNav } from '../../components/articles/ArticleFooterNav'
import QuoteBlock from '../../components/articles/QuoteBlock'
import ArticleTocPlaceholder from '../../components/articles/ArticleTocPlaceholder'
import AudienceGrid from '../../components/articles/AudienceGrid'
import { ArticleResourceCTA } from '../../components/articles/ArticleResourceCTA'
import { ArticleStepList } from '../../components/articles/ArticleStepList'
import MLAITemplateResourceCTA from '../../components/articles/MLAITemplateResourceCTA'
import { ArticleReferences } from '../../components/articles/ArticleReferences'
import ArticleDisclaimer from '../../components/articles/ArticleDisclaimer'

export const useCustomHeader = true

const TOPIC = "How Long Has Artificial Intelligence Truly Been Around?"
export const CATEGORY = "featured"
export const SLUG = "how-long-has-artificial-intelligence-truly-been-around"
export const DATE_PUBLISHED = "2026-03-23"
export const DATE_MODIFIED = "2026-03-23"
export const DESCRIPTION = "Wondering how long artificial intelligence has been around? Explore its history from early theory in the 1950s to the public rise of generative AI in the 2020s."
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-92eff22b-a7b0-42bb-bcaf-3fcd2ed794a1.jpg?alt=media&token=ad3a0ef0-13b4-46d9-8df7-1f89adadd99b"
const HERO_IMAGE_ALT = "How Long Has Artificial Intelligence Truly Been Around?"
export const FEATURED_FOCUS = "ai"

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
  { id: 1, question: "How old is artificial intelligence as a field of study?", answer: "If counted from the Dartmouth meeting in 1956, AI has been around for more than 70 years. If you include earlier conceptual work, its modern roots stretch back at least to 1950." },
  { id: 2, question: "Why does AI feel newer than it really is?", answer: "AI feels new because most people only encountered it directly once it became part of common software products and consumer tools. The research history is much older than its recent mainstream visibility." },
  { id: 3, question: "What were the AI winters?", answer: "The AI winters were periods in the 1970s and again in the late 1980s to early 1990s when funding and confidence dropped. Researchers had made big promises, but available technology could not yet meet many of those expectations." },
  { id: 4, question: "Did AI research stop during the slow periods?", answer: "No. Research continued in universities and labs, often with less money and less public attention. That quieter work helped lay foundations for later progress." },
  { id: 5, question: "Why is AI history useful for people in Australia today?", answer: "Knowing the timeline helps people judge new claims more carefully and understand that progress often comes in cycles. It also gives better context for learning, career planning, and practical adoption decisions." },
]

export const summaryHighlights = {
  heading: "Key facts: How Long Has Artificial Intelligence Truly Been Around?",
  intro: "Wondering how long artificial intelligence has been around? Explore its history from early theory in the 1950s to the public rise of generative AI in the 2020s.",
  items: [
    { label: "When was artificial intelligence founded?", description: "AI is usually dated to 1956 as a formal academic field, centred on the Dartmouth Summer Research Project. Its intellectual groundwork reaches back earlier, especially to Alan Turing's 1950 paper." },
    { label: "Who is the founder of AI?", description: "John McCarthy is most closely associated with founding AI as a named discipline and with organising the Dartmouth project. Early pioneers also included Alan Turing, Marvin Minsky, and Claude Shannon." },
    { label: "When did AI come out to the public?", description: "AI became visible to the public in stages, but broad everyday access arrived much later than its research origins. Many people only felt AI had truly become public in the early 2020s with easy-to-use generative tools." },
  ],
}

export const articleMeta = {
  title: "How Long Has Artificial Intelligence Truly Been Around?",
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

const faqSchemaItems = [
  { question: "When was artificial intelligence founded?", answer: "AI is usually dated to 1956 as a formal academic field, centred on the Dartmouth Summer Research Project. Its intellectual groundwork reaches back earlier, especially to Alan Turing's 1950 paper." },
  { question: "Who is the founder of AI?", answer: "John McCarthy is most closely associated with founding AI as a named discipline and with organising the Dartmouth project. Early pioneers also included Alan Turing, Marvin Minsky, and Claude Shannon." },
  { question: "When did AI come out to the public?", answer: "AI became visible to the public in stages, but broad everyday access arrived much later than its research origins. Many people only felt AI had truly become public in the early 2020s with easy-to-use generative tools." },
  { question: "How old is artificial intelligence as a field of study?", answer: "If counted from the Dartmouth meeting in 1956, AI has been around for more than 70 years. If you include earlier conceptual work, its modern roots stretch back at least to 1950." },
  { question: "Why does AI feel newer than it really is?", answer: "AI feels new because most people only encountered it directly once it became part of common software products and consumer tools. The research history is much older than its recent mainstream visibility." },
  { question: "What were the AI winters?", answer: "The AI winters were periods in the 1970s and again in the late 1980s to early 1990s when funding and confidence dropped. Researchers had made big promises, but available technology could not yet meet many of those expectations." },
  { question: "Did AI research stop during the slow periods?", answer: "No. Research continued in universities and labs, often with less money and less public attention. That quieter work helped lay foundations for later progress." },
  { question: "Why is AI history useful for people in Australia today?", answer: "Knowing the timeline helps people judge new claims more carefully and understand that progress often comes in cycles. It also gives better context for learning, career planning, and practical adoption decisions." },
]

const faqStructuredData = faqSchemaItems.length
  ? JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqSchemaItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
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
      {faqStructuredData ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqStructuredData }} />
      ) : null}
      <ArticleHeroHeader
        breadcrumbs={[
          { label: 'Home', href: '/', icon: Home },
          { label: 'Articles', href: "/articles" },
          { label: TOPIC, current: true },
        ]}
        title={TOPIC}
        titleHighlight={TOPIC}
        headerBgColor="cyan"
        summary={summaryHighlights}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      <ArticleTocPlaceholder className="bg-transparent" />

      <div className="prose prose-lg prose-slate max-w-none bg-transparent">
        <p><strong>{TOPIC}</strong> — {"Artificial intelligence has been around far longer than the current wave of chatbots and image tools might suggest. If you ask, \"how long has artificial intelligence been around,\" the safest short answer is: the idea is nearly a century old, while the formal field is usually traced to the mid-20th century. Some timeline-style histories point back to the 1920s for early conceptual roots, and broader histories place the field\u2019s real academic take-off in the 1940s and 1950s, when computing and mathematical logic started to converge."}</p>
        <p>{"That means AI is not a sudden invention of the last few years. Early work focused on whether machines could imitate reasoning. Today\u2019s systems sit on top of that long build-up. For the MLAI community, this history is worth knowing because it reminds us that progress in AI has always come from people sharing ideas, testing limits, and learning together over time."}</p>
        <p>{"In practice, the Decades-Long Journey of Artificial Intelligence works best when the section stays specific about what changes first, why it matters, and how the reader can apply the idea without filler."}</p>
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="Wondering how long artificial intelligence has been around? Explore its history from early theory in the 1950s to the public rise of generative AI in the 2020s."
          width={1600}
          height={1067}
        />

        <AudienceGrid
          heading="Who is this guide for?"
          cards={[
            {
              title: 'Founders & Builders',
              description: 'For operators validating demand, pitching a vision, and moving before momentum stalls.',
              icon: <RocketLaunchIcon className="h-6 w-6" />,
              variant: 'orange',
            },
            {
              title: 'Students & Switchers',
              description: 'For readers learning how strong technical partners evaluate traction, skills, and fit.',
              icon: <AcademicCapIcon className="h-6 w-6" />,
              variant: 'purple',
            },
            {
              title: 'Community Builders',
              description: 'For connectors, mentors, and organisers helping founders meet collaborators in the right rooms.',
              icon: <UsersIcon className="h-6 w-6" />,
              variant: 'yellow',
            },
          ]}
        />

        <QuoteBlock title="Key insight" variant="purple">
          {"AI is usually dated to 1956 as a formal academic field, centred on the Dartmouth Summer Research Project. Its intellectual groundwork reaches back earlier, especially to Alan Turing's 1950 paper."}
        </QuoteBlock>
          <h2>{"Early Foundations: When Was AI Founded?"}</h2>
          <p>{"If you ask when artificial intelligence began, there are two sensible answers. The intellectual roots go back earlier, but many histories start with Alan Turing in 1950. In his paper \"Computing Machinery and Intelligence,\" Turing asked whether machines can think and proposed a practical way to discuss that question. That idea later became known as the Turing Test. It did not create the whole field on its own, but it gave researchers a clear early framework for thinking about machine intelligence."}</p>
          <p>{"That year, the Dartmouth Summer Research Project is widely treated as the founding moment of artificial intelligence as an academic field. John McCarthy helped organise the event and is closely linked with the term \"artificial intelligence.\" The Dartmouth meeting brought together researchers who believed aspects of learning, reasoning, and intelligence could be described clearly enough for machines to simulate. That shift mattered because it moved AI from broad philosophical debate into a named research agenda."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-f71ac151-bdb1-499b-bf0b-ae1673558758.jpg?alt=media&token=5e3020fc-e1c2-4476-98c3-81ea3e3f3cee"
            alt="Worn notebook beside a typewritten Alan Turing page on a cluttered"
            caption="Early Foundations: When Was AI Founded?"
            width={1200}
            height={800}
          />
          <h3>{"Who shaped the field at Dartmouth?"}</h3>
          <p>{"Marvin Minsky is another major early figure associated with AI's early growth, and Claude Shannon is often listed among the important people connected with the Dartmouth project and its wider research context. Together, these names mark a turning point: AI was no longer only an idea about intelligent machines, but a community of researchers trying to build a new discipline."}</p>
          <p>{"So, how long has artificial intelligence been around? In a formal academic sense, just under seventy years if you count from Dartmouth in 1956. If you include the earlier conceptual groundwork, the modern story reaches back at least to Turing's 1950 paper."}</p>
          <h2>{"The AI Winters: Periods of Stagnation"}</h2>
          <p>{"AI has been around for many decades, but its history was not a smooth climb from idea to success. Histories of the field commonly describe two major \u201cAI winters\u201d: one in the 1970s and another in the late 1980s into the early 1990s. In both periods, investment slowed, confidence fell, and many outsiders began to question whether artificial intelligence could meet the high expectations set in earlier years. Researchers had promised systems that could reason, understand language, and solve broad real-world problems, but the results were often much narrower."}</p>
          <p>{"A central reason for these winters was that early optimism moved faster than the technology of the time. Many systems could perform well in controlled demos, yet struggled when the problem became messy or the environment changed. That gap made AI look less reliable than its supporters had hoped. Even so, the winters did not mean the field disappeared. Research continued in labs and universities, often with less publicity and less money. That quieter work mattered. In that sense, the AI winters were setbacks, but they also remind us that AI\u2019s long history includes pauses, resets, and slow rebuilding as much as breakthrough moments."}</p>
          <p>{"In practice, the AI Winters: Periods of Stagnation works best when the section stays specific about what changes first, why it matters, and how the reader can apply the idea without filler."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-e8d58182-aad7-46f6-97b4-71e91fdacc13.jpg?alt=media&token=fdf50e33-4255-4e40-a0e5-4ce74e17b6b1"
            alt="The AI Winters: Periods of Stagnation"
            caption="The AI Winters: Periods of Stagnation"
            width={1200}
            height={800}
          />

        <ArticleResourceCTA
          eyebrow="Free guide"
          title={"Get the how long has artificial intelligence been around checklist"}
          description="Use this article as a working guide: shortlist candidates, validate traction, and structure your next conversations."
          buttonLabel="Download now"
          buttonHref="/articles"
          accent="purple"
        />

        <ArticleStepList
          title="Practical next steps"
          steps={[
            "Early Foundations: When Was AI Founded?",
            "The AI Winters: Periods of Stagnation",
            "Machine Learning and Public Accessibility",
            "What the History of AI Means for Australia's Future",
          ]}
          accent="indigo"
        />
          <h2>{"Machine Learning and Public Accessibility"}</h2>
          <p>{"AI did not suddenly appear in public life all at once."}</p>
          <p>{"For the public, AI became visible in stages. A much bigger public shift arrived in the early 2020s, when generative AI tools became easy for non-specialists to use directly. That is the point when many people felt AI had truly \"come out to the public,\" even though the research history was already many decades old."}</p>
          <p>{"This change also mattered for small organisations, not just large tech companies. As AI tools became more accessible, small businesses could use them for financial, operational, and routine support tasks rather than build specialised systems from scratch. In plain terms, modern AI became useful when it stopped being only a lab concept and started fitting into common software products. That shift helps explain why today's AI feels newer than it really is: the underlying field is old, but broad public access is much more recent."}</p>
          <p>{"In practice, machine Learning and Public Accessibility works best when the section stays specific about what changes first, why it matters, and how the reader can apply the idea without filler."}</p>
          <p>{"The goal is to keep machine Learning and Public Accessibility concrete enough to guide action, while still tying each detail back to the main point of the section."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-11623532-2132-4f85-bd80-914a472ba5da.jpg?alt=media&token=2c9282ed-8be9-45c6-a331-373089752d0c"
            alt="Machine Learning and Public Accessibility"
            caption="Machine Learning and Public Accessibility"
            width={1200}
            height={800}
          />
          <h2>{"What the History of AI Means for Australia's Future"}</h2>
          <p>{"So, how long has artificial intelligence been around? Most modern timelines place the field in the 1950s, which means AI has been around for more than 70 years. Across that long span, it has grown from an academic research topic into a technology that shapes software, business, science, and daily digital life. That history also shows something important: AI does not move forward in a smooth straight line."}</p>
          <p>{"Several sources on AI history make the same broad point: understanding how the field developed helps us make sense of its future direction. When you know that AI has changed through many stages, from early theory to modern generative systems, it becomes easier to judge new claims with more perspective. Instead of treating every new tool as entirely new, you can ask better questions about capability, limits, timing, and real-world impact."}</p>
          <p>{"For Australia, that makes AI history more than an interesting timeline. It is a practical foundation for learning, career planning, and informed public discussion."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-9b9d91ce-4732-47ce-859d-dd17eb1c5cf2.jpg?alt=media&token=1f01db6d-5c34-4d16-8c80-671642532e02"
            alt="What the History of AI Means for Australia's Future"
            caption="What the History of AI Means for Australia's Future"
            width={1200}
            height={800}
          />

        <QuoteBlock title="Keep moving forward" variant="orange">
          {"AI became visible to the public in stages, but broad everyday access arrived much later than its research origins. Many people only felt AI had truly become public in the early 2020s with easy-to-use generative tools."}
        </QuoteBlock>

        <MLAITemplateResourceCTA />

      <ArticleReferences
        references={[
          {id: 1, href: "https://en.wikipedia.org/wiki/History_of_artificial_intelligence", title: "History of artificial intelligence - Wikipedia", publisher: "en.wikipedia.org", description: "Authoritative reference supporting History of artificial intelligence - Wikipedia.", category: "guide"},
          {id: 2, href: "https://www.coursera.org/articles/history-of-ai", title: "The History of AI: A Timeline of Artificial Intelligence | Coursera", publisher: "coursera.org", description: "Authoritative reference supporting The History of AI: A Timeline of Artificial Intelligence | Coursera.", category: "guide"},
          {id: 3, href: "https://nexthink.com/blog/the-history-of-ai-in-the-workplace", title: "The History of AI in the Digital Workplace | Nexthink", publisher: "nexthink.com", description: "Authoritative reference supporting The History of AI in the Digital Workplace | Nexthink.", category: "guide"},
          {id: 4, href: "https://www.bighuman.com/blog/history-of-artificial-intelligence", title: "How Long Has AI Been Around: The History of AI from 1920 to 2026 | Big Human", publisher: "bighuman.com", description: "Authoritative reference supporting How Long Has AI Been Around: The History of AI from 1920 to 2026 | Big Human.", category: "guide"},
          {id: 5, href: "https://swisscyberinstitute.com/blog/history-artificial-intelligence/", title: "The History of Artificial Intelligence: A Timeline from Turing to Today", publisher: "swisscyberinstitute.com", description: "Authoritative reference supporting The History of Artificial Intelligence: A Timeline from Turing to Today.", category: "guide"},
          {id: 6, href: "https://ourworldindata.org/brief-history-of-ai", title: "The brief history of artificial intelligence: the world has changed fast \u2014 what might be next? - Our World in Data", publisher: "ourworldindata.org", description: "Authoritative reference supporting The brief history of artificial intelligence: the world has changed fast \u2014 what might be next? - Our World in Data.", category: "guide"},
          {id: 7, href: "https://www.ibm.com/think/topics/history-of-artificial-intelligence", title: "The History of Artificial Intelligence | IBM", publisher: "ibm.com", description: "Authoritative reference supporting The History of Artificial Intelligence | IBM.", category: "guide"},
          {id: 8, href: "https://kenaninstitute.unc.edu/kenan-insight/artificial-intelligence-for-small-business-development-are-you-ready/", title: "Artificial Intelligence for Small Business Development: Are You Ready? - Frank Hawkins Kenan Institute of Private Enterprise", publisher: "kenaninstitute.unc.edu", description: "Authoritative reference supporting Artificial Intelligence for Small Business Development: Are You Ready? - Frank Hawkins Kenan Institute of Private Enterprise.", category: "guide"},
          {id: 9, href: "https://en.wikipedia.org/wiki/Timeline_of_artificial_intelligence", title: "Timeline of artificial intelligence - Wikipedia", publisher: "en.wikipedia.org", description: "Authoritative reference supporting Timeline of artificial intelligence - Wikipedia.", category: "guide"},
        ]}
        heading="Sources & further reading"
      />

        <ArticleDisclaimer />

        <div className="my-12 not-prose">
          <ArticleCompanyCTA
            title="Keep building your AI understanding"
            body="Explore more practical AI learning and connect with the Australian community following how the field is changing."
            buttonText="Explore MLAI resources"
            buttonHref="/australian-ai-ecosystem"
          />
        </div>
      </div>

        <AuthorBio author={authorDetails} />

        <div className="mt-12">
          <ArticleFAQ items={faqItems} />
        </div>

        <ArticleFooterNav backHref="/articles" topHref="#" />
    </>
  )
}
