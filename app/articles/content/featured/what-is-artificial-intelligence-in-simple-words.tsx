import type { ReactNode } from 'react'
import { Home } from 'lucide-react'
import { AcademicCapIcon, RocketLaunchIcon, UsersIcon } from '@heroicons/react/24/outline'
import { DEFAULT_AUTHOR_KEY, getAuthorProfile, DEFAULT_AUTHOR_AVATAR_FALLBACK_URL } from '~/articles/authors'
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

const TOPIC = "What Is Artificial Intelligence in Simple Words?"
export const CATEGORY = "featured"
export const SLUG = "what-is-artificial-intelligence-in-simple-words"
export const DATE_PUBLISHED = "2026-04-18"
export const DATE_MODIFIED = "2026-04-18"
export const DESCRIPTION = "Learn what artificial intelligence means in simple words, how it works, where you use it every day, and what it can and cannot do."
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-aabcc5ca-e159-4024-b1c7-baf0b68dc947.jpg?alt=media&token=a5c618e2-f10a-4f7a-8bc3-5a0702cf9959"
const HERO_IMAGE_ALT = "Close-up of a person using an AI voice assistant on a smartphone during a casual everyday moment"
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
  { id: 1, question: "How is AI different from normal software?", answer: "Traditional software follows fixed rules written in advance for each situation. AI is built to find patterns in data and use those patterns to make predictions, recommendations, or responses." },
  { id: 2, question: "How does AI work in simple steps?", answer: "A common flow is collecting data, training a model to find patterns, testing the results, and then using the system on new input. Different tools work on different inputs such as text, images, or speech." },
  { id: 3, question: "Does AI think like a human?", answer: "A simple way to think about AI is this: it learns from examples, then uses what it learned to respond to new inputs. In many modern systems, the first step is gathering data. A machine learning model is then trained to find patterns in that information, such as common words in sentences, shapes in images, or trends in past behaviour. This is why machine lear." },
  { id: 4, question: "Where do people use AI in everyday life?", answer: "People use AI in phones, maps, email, streaming apps, customer support chat, translation tools, and voice assistants. Much of it works in the background rather than appearing as a robot." },
  { id: 5, question: "What is narrow AI?", answer: "Narrow AI is AI designed for one kind of task or a small set of related tasks. Most AI people use today, such as recommendations or face recognition, is narrow AI." },
  { id: 6, question: "What are the limits of AI?", answer: "AI can be fast and useful, but it can also be wrong, miss context, and reflect flaws in its training data. Its outputs should still be checked by people." },
]

export const summaryHighlights = {
  heading: "Key facts: What Is Artificial Intelligence in Simple Words?",
  intro: "Learn what artificial intelligence means in simple words, how it works, where you use it every day, and what it can and cannot do.",
  items: [
    { label: "What are examples of artificial intelligence?", description: "Examples include face unlock on phones, streaming recommendations, chatbots, translation tools, voice assistants, and spam filters. These systems handle specific tasks that involve recognising patterns, language, or preferences." },
    { label: "What is AI in 4 words?", description: "A simple four-word version is: computers doing smart tasks. It means software can perform some jobs that usually need human thinking, such as recognising speech or making recommendations." },
    { label: "What are the 4 types of AI?", description: "A common basic grouping is reactive machines, limited memory systems, theory of mind, and self-aware AI. In everyday life, most current tools fit narrow, task-specific AI rather than human-like general intelligence." },
  ],
}

export const articleMeta = {
  title: "What Is Artificial Intelligence in Simple Words?",
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
  { question: "What are examples of artificial intelligence?", answer: "Examples include face unlock on phones, streaming recommendations, chatbots, translation tools, voice assistants, and spam filters. These systems handle specific tasks that involve recognising patterns, language, or preferences." },
  { question: "What is AI in 4 words?", answer: "A simple four-word version is: computers doing smart tasks. It means software can perform some jobs that usually need human thinking, such as recognising speech or making recommendations." },
  { question: "What are the 4 types of AI?", answer: "A common basic grouping is reactive machines, limited memory systems, theory of mind, and self-aware AI. In everyday life, most current tools fit narrow, task-specific AI rather than human-like general intelligence." },
  { question: "How is AI different from normal software?", answer: "Traditional software follows fixed rules written in advance for each situation. AI is built to find patterns in data and use those patterns to make predictions, recommendations, or responses." },
  { question: "How does AI work in simple steps?", answer: "A common flow is collecting data, training a model to find patterns, testing the results, and then using the system on new input. Different tools work on different inputs such as text, images, or speech." },
  { question: "Does AI think like a human?", answer: "A simple way to think about AI is this: it learns from examples, then uses what it learned to respond to new inputs. In many modern systems, the first step is gathering data. A machine learning model is then trained to find patterns in that information, such as common words in sentences, shapes in images, or trends in past behaviour. This is why machine lear." },
  { question: "Where do people use AI in everyday life?", answer: "People use AI in phones, maps, email, streaming apps, customer support chat, translation tools, and voice assistants. Much of it works in the background rather than appearing as a robot." },
  { question: "What is narrow AI?", answer: "Narrow AI is AI designed for one kind of task or a small set of related tasks. Most AI people use today, such as recommendations or face recognition, is narrow AI." },
  { question: "What are the limits of AI?", answer: "AI can be fast and useful, but it can also be wrong, miss context, and reflect flaws in its training data. Its outputs should still be checked by people." },
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
        <p><strong>{TOPIC}</strong> — {"In simple words, artificial intelligence, or AI, means technology that helps computers and machines do tasks that usually need human intelligence. The source descriptions consistently frame AI this way: as systems that can handle work linked to reasoning, problem solving, decision-making, learning, or understanding."}</p>
        <p>{"AI can show up in everyday tools in simple, practical ways. Sources point to examples like phones recognising faces, systems understanding and responding to human language, streaming services suggesting what to watch next, chatbots answering questions, and software making recommendations. These examples matter because they show AI is not just about futuristic robots."}</p>
        <p>{"It also helps to think of AI as a broad field, not one single product. Different AI systems do different kinds of jobs, and some newer systems can generate text or images from a prompt. That means AI is an umbrella term for a range of computer technologies rather than one machine with a human-like mind. In the rest of this article, we will keep the explanation simple and use everyday examples so the idea of AI feels clear instead of technical."}</p>
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="Learn what artificial intelligence means in simple words, how it works, where you use it every day, and what it can and cannot do."
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
          {"Examples include face unlock on phones, streaming recommendations, chatbots, translation tools, voice assistants, and spam filters. These systems handle specific tasks that involve recognising patterns, language, or preferences."}
        </QuoteBlock>
          <h2>{"What makes AI different from normal software"}</h2>
          <p>{"In simple terms, it works like a clear rule book: if this happens, do that. AI is different because it is designed to work with patterns in data. Instead of needing every rule spelled out for every situation, AI systems can be trained on many examples and then use what they learned to make a prediction, recommendation, or response."}</p>
          <p>{"That does not mean AI thinks like a person. The major beginner-friendly sources describe AI as a set of technologies that let computers do tasks that usually seem to need human abilities, such as recognising objects, understanding language, making recommendations, or solving certain kinds of problems. In practice, most AI today is useful because it can learn from new information or large amounts of data, not because it has human understanding. So the key difference is not that AI is magical. It is that AI can handle jobs where patterns matter more than a fixed list of instructions."}</p>
          <p>{"This is why AI is often used for messy real-world input. A phone recognising a face, a chatbot responding to language, or a streaming service suggesting what to watch next all fit this pattern-based approach."}</p>
          <p>{"In practice, what makes AI different from normal software works best when the section stays specific about what changes first, why it matters, and how the reader can apply the idea without filler."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-cc725545-9a61-41e0-be73-530a8401072b.jpg?alt=media&token=20a3e5e0-ff39-43a2-b905-277abf72d91c"
            alt="What makes AI different from normal software"
            caption="What makes AI different from normal software"
            width={1200}
            height={800}
          />
          <h2>{"How AI works in simple steps"}</h2>
          <p>{"A simple way to think about AI is this: it learns from examples, then uses what it learned to respond to new inputs. In many modern systems, the first step is gathering data. A machine learning model is then trained to find patterns in that information, such as common words in sentences, shapes in images, or trends in past behaviour. This is why machine learning is often described as a common way AI improves from examples rather than being programmed for every single rule."}</p>
          <p>{"If the results are useful enough, the system is put into real use, where it can make predictions, classify information, answer questions, recommend items, or generate new content. The same basic flow applies across different kinds of AI, but the input changes: one system may work with written language, another with photos, and another with speech or sound."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-dc2241f4-8974-412e-9d14-88f81af634b3.jpg?alt=media&token=69998738-bebe-4e82-990b-95f0dee65966"
            alt="Candid desk scene with"
            caption="How AI works in simple steps"
            width={1200}
            height={800}
          />
          <h3>{"The basic flow at a glance"}</h3>
          <p>{"In plain terms, most AI follows a short chain: collect examples, train on patterns, test the results, and then use the system on new input. That does not mean every AI tool works in exactly the same way, but it is a helpful mental model for understanding how many modern AI systems are built and used."}</p>

        <ArticleResourceCTA
          eyebrow="Free guide"
          title={"Get the what is artificial intelligence in simple words checklist"}
          description="Use this article as a working guide: shortlist candidates, validate traction, and structure your next conversations."
          buttonLabel="Download now"
          buttonHref="/articles"
          accent="purple"
        />

        <ArticleStepList
          title="Practical next steps"
          steps={[
            "What makes AI different from normal software",
            "How AI works in simple steps",
            "Where you already use AI every day",
            "What AI can do well and where it still falls short",
            "A simple way to think about AI from here",
          ]}
          accent="indigo"
        />
          <h2>{"Where you already use AI every day"}</h2>
          <p>{"A simple way to spot artificial intelligence is to look for tools that seem to recognise, sort, suggest, or respond. Your phone using face unlock is a common example. A streaming service suggesting what to watch next is another. Voice assistants, translation tools, and customer support chatbots also fit."}</p>
          <p>{"That matters because everyday AI usually does not look like a robot from a movie. Most of the time, it works quietly in the background of apps, websites, and devices you already use. So when people ask what artificial intelligence is in simple words, one useful answer is this: it is software that helps machines do specific tasks that normally need some human thinking."}</p>
          <p>{"A practical way to think about where you already use ai every day is through In your personal apps and devices and In messages, email, and support."}</p>
          <h3>{"In your personal apps and devices"}</h3>
          <p>{"Many familiar AI examples are built into everyday consumer tools. Face recognition on a phone compares what it sees with stored patterns. These are practical examples of AI because each system is focused on one kind of job."}</p>
          <h3>{"In messages, email, and support"}</h3>
          <p>{"AI also appears in routine communication and work tools. Chatbots handle common support questions in real time. These systems are useful because they can process large amounts of text quickly and respond in consistent ways. They also show an important point for beginners: most AI you use every day is narrow AI, meaning it is designed to do one task well rather than think like a person in every situation."}</p>
          <h2>{"What AI can do well and where it still falls short"}</h2>
          <p>{"AI is very good at handling large amounts of information fast. It can spot patterns, sort content, recognise objects, respond to language, make recommendations, and help summarise long text. That is why people often use AI for things like search, recommendations, chat support, drafting, and other routine tasks where speed and scale matter."}</p>
          <p>{"But AI still has clear limits. It can give wrong answers, miss important context, and reflect problems in the data it learned from. It does not understand the world in the same way a person does, even when its output sounds confident. Current AI is usually narrow AI, which means it is built for specific kinds of tasks. That is different from the idea of artificial general intelligence, which would be more like broad human-level intelligence. For everyday use, the safest way to think about AI is as a helpful tool, not a human replacement, so its work should still be checked by people."}</p>
          <p>{"In practice, what AI can do well and where it still falls short works best when the section stays specific about what changes first, why it matters, and how the reader can apply the idea without filler."}</p>
          <p>{"The goal is to keep what AI can do well and where it still falls short concrete enough to guide action, while still tying each detail back to the main point of the section."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-0824130f-2194-4bb6-9fa3-96121fe66c65.jpg?alt=media&token=8a1b003c-3e38-47c6-829c-32507092672f"
            alt="What AI can do well and where it still falls short"
            caption="What AI can do well and where it still falls short"
            width={1200}
            height={800}
          />
          <h2>{"A simple way to think about AI from here"}</h2>
          <p>{"In simple words, artificial intelligence is software that can do some tasks that normally need human intelligence. The sources describe AI as technology that can handle things like learning, reasoning, problem-solving, decision-making, and understanding language. That does not mean AI is magic or that it thinks exactly like a person. It means computers can now perform some complex tasks in ways that feel smart to us."}</p>
          <p>{"First, many AI systems learn from data or improve their results from patterns in data. Second, AI already appears in everyday tools, such as recommendation systems, language tools, and features that recognise images or speech. Third, AI works best when people use judgment alongside it, because AI can be useful without being perfect. A practical next step is to notice where AI already shows up in tools you use each day, then keep learning through clear, hands-on education and community spaces where you can ask questions and test ideas safely."}</p>
          <p>{"In practice, a simple way to think about AI from here works best when the section stays specific about what changes first, why it matters, and how the reader can apply the idea without filler."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-5b119ef0-2d1b-41fa-a791-24c8c9bcaa83.jpg?alt=media&token=87109013-66e7-49a6-8a49-b94a9c00d7cc"
            alt="A simple way to think about AI from here"
            caption="A simple way to think about AI from here"
            width={1200}
            height={800}
          />

        <QuoteBlock title="Keep moving forward" variant="orange">
          {"A common basic grouping is reactive machines, limited memory systems, theory of mind, and self-aware AI. In everyday life, most current tools fit narrow, task-specific AI rather than human-like general intelligence."}
        </QuoteBlock>

        <MLAITemplateResourceCTA />

      <ArticleReferences
        references={[
          {id: 1, href: "https://www.ibm.com/think/topics/artificial-intelligence", title: "What Is Artificial Intelligence (AI)? | IBM", publisher: "ibm.com", description: "Authoritative reference supporting What Is Artificial Intelligence (AI)? | IBM.", category: "guide"},
          {id: 2, href: "https://en.wikipedia.org/wiki/Artificial_intelligence", title: "Artificial intelligence - Wikipedia", publisher: "en.wikipedia.org", description: "Authoritative reference supporting Artificial intelligence - Wikipedia.", category: "guide"},
          {id: 3, href: "https://capsulecrm.com/blog/how-to-get-started-with-ai-a-beginner-s-guide-for-small-businesses/", title: "How to get started with AI: A beginner's guide for small businesses", publisher: "capsulecrm.com", description: "Authoritative reference supporting How to get started with AI: A beginner's guide for small businesses.", category: "guide"},
          {id: 4, href: "https://www.98thpercentile.com/blog/what-is-ai", title: "What is AI? Artificial Intelligence Explained for Kids", publisher: "98thpercentile.com", description: "Authoritative reference supporting What is AI? Artificial Intelligence Explained for Kids.", category: "guide"},
          {id: 5, href: "https://cloud.google.com/learn/what-is-artificial-intelligence", title: "What is Artificial Intelligence (AI)? | Google Cloud", publisher: "cloud.google.com", description: "Authoritative reference supporting What is Artificial Intelligence (AI)? | Google Cloud.", category: "guide"},
          {id: 6, href: "https://learning.nd.edu/resource-library/ai-overview-and-definitions/", title: "AI Overview and Definitions | Resource Library | Notre Dame Learning | University of Notre Dame", publisher: "learning.nd.edu", description: "Authoritative reference supporting AI Overview and Definitions | Resource Library | Notre Dame Learning | University of Notre Dame.", category: "guide"},
          {id: 7, href: "https://business.gov.au/online-and-digital/artificial-intelligence", title: "Artificial intelligence (AI) | business.gov.au", publisher: "business.gov.au", description: "Authoritative reference supporting Artificial intelligence (AI) | business.gov.au.", category: "guide"},
          {id: 8, href: "https://www.myzeller.com/au/blog/ai-for-small-business-3-essential-tools", title: "A Guide to AI for Small Business: 3 Essential Tools and How to Use Them | 2025", publisher: "myzeller.com", description: "Authoritative reference supporting A Guide to AI for Small Business: 3 Essential Tools and How to Use Them | 2025.", category: "guide"},
          {id: 9, href: "https://www.digital.nsw.gov.au/policy/artificial-intelligence/artificial-intelligence-strategy", title: "Artificial Intelligence Strategy | Digital NSW", publisher: "digital.nsw.gov.au", description: "Authoritative reference supporting Artificial Intelligence Strategy | Digital NSW.", category: "guide"},
          {id: 10, href: "https://www.coursera.org/articles/what-is-artificial-intelligence", title: "What Is Artificial Intelligence? Definition, Uses, and Types | Coursera", publisher: "coursera.org", description: "Authoritative reference supporting What Is Artificial Intelligence? Definition, Uses, and Types | Coursera.", category: "guide"},
        ]}
        heading="Sources & further reading"
      />

        <ArticleDisclaimer />

        <div className="my-12 not-prose">
          <ArticleCompanyCTA
            title="Keep learning AI in practical terms"
            body="If you want a beginner-friendly next step, explore practical AI learning for beginners and builders. It is a simple way to keep building confidence after the basics in this article."
            buttonText="Explore practical AI learning"
            buttonHref="/practical-ai-learning-beginners-builders"
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
