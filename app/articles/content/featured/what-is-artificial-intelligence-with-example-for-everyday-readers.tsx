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

const TOPIC = "What Is Artificial Intelligence With Example for Everyday Readers"
export const CATEGORY = "featured"
export const SLUG = "what-is-artificial-intelligence-with-example-for-everyday-readers"
export const DATE_PUBLISHED = "2026-04-04"
export const DATE_MODIFIED = "2026-04-04"
export const DESCRIPTION = "What is artificial intelligence with example explained simply"
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-7f3951a9-ecc4-465c-b320-fc43c8053e7e.jpg?alt=media&token=df271f37-1457-45a7-8273-a10c00bc8933"
const HERO_IMAGE_ALT = "Close-up of a woman using an AI chatbot on her phone while a friend watches"
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
  { id: 1, question: "How does artificial intelligence work in simple terms?", answer: "A basic model is that data goes in, the system finds patterns, and then it produces an output such as a prediction, recommendation, answer, or decision support." },
  { id: 2, question: "Is machine learning the same as artificial intelligence?", answer: "Not exactly. AI is the broader field, while machine learning is one common way to build AI systems by training models on data to improve at a task." },
  { id: 3, question: "Is the AI used in everyday products usually narrow or general?", answer: "Most AI in current products is narrow AI. It is designed for specific tasks such as recognising faces, recommending content, translating text, or helping sort information." },
  { id: 4, question: "Where do people commonly encounter AI day to day?", answer: "People often meet AI through search, maps, translation, spam filters, streaming recommendations, phone face unlock, virtual assistants, and chatbots built into websites or apps." },
  { id: 5, question: "Does AI always replace human decision-making?", answer: "No. Many systems are designed to support people rather than replace them, especially in work settings where outputs still need human review, judgment, or oversight." },
]

export const summaryHighlights = {
  heading: "Key facts: What Is Artificial Intelligence With Example for Everyday Readers",
  intro: "What is artificial intelligence with example explained simply",
  items: [
    { label: "What is AI with example?", description: "Artificial intelligence is software that performs tasks linked to human-style intelligence, such as recognising patterns, understanding language, or making recommendations. A common example is a streaming app suggesting shows based on what you watched before." },
    { label: "What are the 4 types of AI?", description: "In this article, the practical groups are language AI, vision AI, recommendation AI, and decision-support systems. Most everyday tools fit one of these narrow, task-specific categories." },
    { label: "Which is the best AI stock to buy?", description: "This article does not assess investments or rank companies. Its focus is explaining what AI is, how it works at a basic level, and where people already use it." },
  ],
}

export const articleMeta = {
  title: "What Is Artificial Intelligence With Example for Everyday Readers",
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
  { question: "What is AI with example?", answer: "Artificial intelligence is software that performs tasks linked to human-style intelligence, such as recognising patterns, understanding language, or making recommendations. A common example is a streaming app suggesting shows based on what you watched before." },
  { question: "What are the 4 types of AI?", answer: "In this article, the practical groups are language AI, vision AI, recommendation AI, and decision-support systems. Most everyday tools fit one of these narrow, task-specific categories." },
  { question: "Which is the best AI stock to buy?", answer: "This article does not assess investments or rank companies. Its focus is explaining what AI is, how it works at a basic level, and where people already use it." },
  { question: "How does artificial intelligence work in simple terms?", answer: "A basic model is that data goes in, the system finds patterns, and then it produces an output such as a prediction, recommendation, answer, or decision support." },
  { question: "Is machine learning the same as artificial intelligence?", answer: "Not exactly. AI is the broader field, while machine learning is one common way to build AI systems by training models on data to improve at a task." },
  { question: "Is the AI used in everyday products usually narrow or general?", answer: "Most AI in current products is narrow AI. It is designed for specific tasks such as recognising faces, recommending content, translating text, or helping sort information." },
  { question: "Where do people commonly encounter AI day to day?", answer: "People often meet AI through search, maps, translation, spam filters, streaming recommendations, phone face unlock, virtual assistants, and chatbots built into websites or apps." },
  { question: "Does AI always replace human decision-making?", answer: "No. Many systems are designed to support people rather than replace them, especially in work settings where outputs still need human review, judgment, or oversight." },
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
        <p><strong>{TOPIC}</strong> — {"Artificial intelligence, or AI, means computer systems doing tasks that usually need human-style intelligence. That can include learning from data, recognising patterns, understanding language, solving problems, and helping with decisions. In simple terms, AI is a way to make software or machines respond more intelligently instead of only following fixed rules."}</p>
        <p>{"A useful way to think about AI is as a broad group of technologies, not one single tool. It includes things people already use every day, such as phone face recognition, streaming recommendations, search, virtual assistants, and customer support chatbots. So when people ask, \"what is artificial intelligence with example,\" a simple answer is this: AI is technology that helps computers perform tasks linked to human intelligence, and one common example is a streaming app suggesting shows based on what you watched before. In the rest of this article, we will keep the explanation plain and practical, using familiar examples before looking at how AI works and where it appears."}</p>
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="What is artificial intelligence with example explained simply"
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
          {"Artificial intelligence is software that performs tasks linked to human-style intelligence, such as recognising patterns, understanding language, or making recommendations. A common example is a streaming app suggesting shows based on what you watched before."}
        </QuoteBlock>
          <h2>{"One clear example of AI in everyday life"}</h2>
          <p>{"A clear everyday example of artificial intelligence is a streaming service recommending what to watch or listen to next. Sources from Google Cloud, IBM, and Coursera all point to recommendation features as a common real-world use of AI."}</p>
          <p>{"It compares those patterns with other data it has and then ranks likely matches. This is considered AI because the system is doing more than following one fixed rule for every person. It is learning from data, making predictions, and adjusting its suggestions as it gets new information."}</p>
          <p>{"Google Cloud uses examples like face recognition on phones, and IBM describes AI systems that can make recommendations and learn from new information. Coursera also notes that AI powers many everyday services, from apps that recommend shows to chatbots that respond in real time. So while these tools feel different on the surface, they share a common pattern: they use data to recognise patterns, predict an outcome, or respond in a useful way. That is why a recommendation system is such a good example when someone asks what artificial intelligence is."}</p>
          <p>{"In practice, one clear example of AI in everyday life works best when the section stays specific about what changes first, why it matters, and how the reader can apply the idea without filler."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-2e5743b9-ac68-4df6-9acd-f4c36824af12.jpg?alt=media&token=a725f955-3335-4135-8571-08d89ef9cbd9"
            alt="One clear example of AI in everyday life"
            caption="One clear example of AI in everyday life"
            width={1200}
            height={800}
          />
          <h2>{"How AI works without the technical overload"}</h2>
          <p>{"A simple way to think about AI is this: information goes in, the system looks for patterns, and then it produces an output such as a prediction, recommendation, answer, or decision support. Instead of following only fixed hand-written rules, many AI systems are built to learn useful patterns from examples. This is why AI can help with tasks like recognising objects in images, understanding language, or suggesting what a user may want next."}</p>
          <p>{"Machine learning is one of the main ways modern AI works. In plain English, machine learning means training a model on data so it gets better at a specific task. During training, developers give the system large amounts of data and refine it against a goal, such as improving accuracy or producing more useful responses. This does not mean the system 'understands' things like a person does, but it can still perform tasks that look intelligent because it has learned patterns connected to an objective."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-2232e25b-2c38-4983-afeb-a3257b04f0ca.jpg?alt=media&token=9d7d3a11-a05a-48c7-b61c-20733bf58962"
            alt="Desk with notes linking data, patterns, and outputs beside a laptop, explaining how"
            caption="How AI works without the technical overload"
            width={1200}
            height={800}
          />
          <h3>{"AI often supports people rather than replacing them"}</h3>
          <p>{"It also helps to drop the idea that every AI system is fully autonomous. Some systems can act with limited independence, but many are designed to assist human decisions instead of replacing them outright. A recommendation engine suggests content, a virtual assistant responds to questions, and a workplace tool may help sort information faster."}</p>
          <p>{"So the practical mental model is: humans define the task, data is used to train or guide the system, the model learns patterns tied to that task, and the output is then used by a person, a product, or another system. That keeps AI easier to understand."}</p>

        <ArticleResourceCTA
          eyebrow="Free guide"
          title={"Get the what is artificial intelligence with example checklist"}
          description="Use this article as a working guide: shortlist candidates, validate traction, and structure your next conversations."
          buttonLabel="Download now"
          buttonHref="/articles"
          accent="purple"
        />

        <ArticleStepList
          title="Practical next steps"
          steps={[
            "One clear example of AI in everyday life",
            "How AI works without the technical overload",
            "Common types of AI people usually mean",
            "Where artificial intelligence shows up in real work and daily life",
            "How to recognise AI and start learning it with confidence",
          ]}
          accent="indigo"
        />
          <h2>{"Common types of AI people usually mean"}</h2>
          <p>{"People often use AI as a catch-all term, but it helps to separate the big field from the specific methods inside it. Artificial intelligence is the broad idea of computers doing tasks that usually need human-like abilities such as understanding language, spotting patterns, making recommendations, or helping with decisions. Machine learning sits inside that broader field. It is a common way to build AI systems by training models on data so they can improve at a task over time."}</p>
          <p>{"That distinction matters because many everyday products described as AI are not general human-like minds. A chatbot that answers customer questions, a phone that recognises a face, and a streaming app that suggests shows may all be called AI, but they belong to different practical categories."}</p>
          <h3>{"Useful categories in everyday tools"}</h3>
          <p>{"One common group is language AI. These systems work with text or speech, such as chatbots, virtual assistants, translation tools, or software that summarises documents. Another group is vision AI, which works with images or video. Face unlock on a phone or software that identifies objects in a picture are familiar examples."}</p>
          <p>{"A third group is recommendation AI. This is the kind that suggests movies, products, music, or other content based on patterns in data. There are also decision-support systems, which help people analyse information and make choices rather than fully replacing them."}</p>
          <h3>{"Capability labels vs real-world AI"}</h3>
          <p>{"You will also see articles divide AI into capability levels, often contrasting narrow AI with more advanced ideas such as general AI. For most readers, the key point is simple: nearly all AI used in everyday products today is narrow AI."}</p>
          <p>{"So when someone says a tool uses AI, the most useful follow-up question is not whether it is \"real AI,\" but what kind of AI it is. Is it mainly learning from data, understanding language, recognising images, making recommendations, or supporting decisions?"}</p>
          <h2>{"Where artificial intelligence shows up in real work and daily life"}</h2>
          <p>{"Artificial intelligence often appears inside tools people already use, not as a separate robot or futuristic machine. Common examples include web search, translation, navigation, virtual assistants, chatbots, and recommendation systems that suggest films, music, or other content. Phones can also use AI for tasks like face recognition, while some vehicles use it to support automated driving features. In daily life, AI is usually part of software that helps users find information faster, understand language, or make a choice from many options."}</p>
          <p>{"At work, AI is often used to support narrow tasks rather than run a whole business by itself. It can help sort customer requests, classify documents, analyse images, generate recommendations, and support forecasting based on past patterns in data. In healthcare, AI is also used in image analysis at a high level, although those systems still need careful review and oversight. Across both consumer and business settings, AI is most useful when the data is good, the system is designed well, and people stay involved in checking important decisions."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-f053b208-62d1-4e28-8163-f7f77cb3963b.jpg?alt=media&token=846f7a93-ef64-4448-b78a-cf3fcac15d7d"
            alt="Where artificial intelligence shows up in real work and daily life"
            caption="Where artificial intelligence shows up in real work and daily life"
            width={1200}
            height={800}
          />
          <h3>{"Everyday examples people already know"}</h3>
          <p>{"Many well-known AI examples feel ordinary because they are built into familiar products. Search engines use AI to improve results. Maps and navigation apps help estimate routes and travel times. Streaming and shopping platforms use recommendation systems to personalise what each user sees, and virtual assistants or chatbots respond to spoken or typed requests."}</p>
          <h3>{"Business uses behind the scenes"}</h3>
          <p>{"In business software, AI often works quietly in the background. An operations team might use it to classify documents or detect patterns in records. Some organisations also use AI for forecasting or image analysis, especially when there is too much data for people to review quickly on their own. Even then, these tools work best as decision support, not as a complete replacement for human judgment."}</p>
          <h2>{"How to recognise AI and start learning it with confidence"}</h2>
          <p>{"Artificial intelligence is best understood as software that uses data and computing power to do tasks that people often connect with human intelligence. Across the sources, that includes things like recognising patterns, understanding language, making recommendations, solving problems, or supporting decisions. A simple example is a streaming service suggesting what to watch next. It is not magic. In many everyday products, AI works as a pattern-recognition system running quietly in the background."}</p>
          <p>{"If you want a quick way to recognise AI in the real world, ask a few plain questions. Does the system learn from data or improve from examples? Does it predict, rank, recommend, identify objects, or respond to natural language? If the answer is yes, AI may be involved. The best next step is to keep learning through practical examples and trusted education rather than hype. Start with the tools you already use, notice what they automate or predict, and build your understanding from there."}</p>
          <p>{"In practice, how to recognise AI and start learning it with confidence works best when the section stays specific about what changes first, why it matters, and how the reader can apply the idea without filler."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-b5e3cf44-de42-4329-9d90-957e6b7bfe3b.jpg?alt=media&token=269808e4-f96d-497c-a731-7c1f4cffe3ec"
            alt="How to recognise AI and start learning it with confidence"
            caption="How to recognise AI and start learning it with confidence"
            width={1200}
            height={800}
          />

        <QuoteBlock title="Keep moving forward" variant="orange">
          {"This article does not assess investments or rank companies. Its focus is explaining what AI is, how it works at a basic level, and where people already use it."}
        </QuoteBlock>

        <MLAITemplateResourceCTA />

      <ArticleReferences
        references={[
          {id: 1, href: "https://www.coursera.org/articles/what-is-artificial-intelligence", title: "What Is Artificial Intelligence? Definition, Uses, and Types | Coursera", publisher: "coursera.org", description: "Authoritative reference supporting What Is Artificial Intelligence? Definition, Uses, and Types | Coursera.", category: "guide"},
          {id: 2, href: "https://en.wikipedia.org/wiki/Artificial_intelligence", title: "Artificial intelligence - Wikipedia", publisher: "en.wikipedia.org", description: "Authoritative reference supporting Artificial intelligence - Wikipedia.", category: "guide"},
          {id: 3, href: "https://www.ibm.com/think/topics/artificial-intelligence", title: "What Is Artificial Intelligence (AI)? | IBM", publisher: "ibm.com", description: "Authoritative reference supporting What Is Artificial Intelligence (AI)? | IBM.", category: "guide"},
          {id: 4, href: "https://cloud.google.com/learn/what-is-artificial-intelligence", title: "What is Artificial Intelligence (AI)? | Google Cloud", publisher: "cloud.google.com", description: "Authoritative reference supporting What is Artificial Intelligence (AI)? | Google Cloud.", category: "guide"},
          {id: 5, href: "https://www.iso.org/artificial-intelligence", title: "ISO - Artificial intelligence: What it is, how it works and why it matters", publisher: "iso.org", description: "Authoritative reference supporting ISO - Artificial intelligence: What it is, how it works and why it matters.", category: "guide"},
          {id: 6, href: "https://cloud.google.com/transform/how-to-build-an-effective-ai-strategy", title: "An effective AI strategy: How to build one | Google Cloud Blog", publisher: "cloud.google.com", description: "Authoritative reference supporting An effective AI strategy: How to build one | Google Cloud Blog.", category: "guide"},
          {id: 7, href: "https://www.digital.nsw.gov.au/policy/artificial-intelligence/artificial-intelligence-strategy", title: "Artificial Intelligence Strategy | Digital NSW", publisher: "digital.nsw.gov.au", description: "Authoritative reference supporting Artificial Intelligence Strategy | Digital NSW.", category: "guide"},
          {id: 8, href: "https://business.gov.au/online-and-digital/artificial-intelligence", title: "Artificial intelligence (AI) | business.gov.au", publisher: "business.gov.au", description: "Authoritative reference supporting Artificial intelligence (AI) | business.gov.au.", category: "guide"},
          {id: 9, href: "https://www.thesmallbusinessexpo.com/blog/use-ai-in-your-small-business/", title: "10 Ways To Use AI In Your Small Business", publisher: "thesmallbusinessexpo.com", description: "Authoritative reference supporting 10 Ways To Use AI In Your Small Business.", category: "guide"},
          {id: 10, href: "https://vivaldigroup.com/artificial-intelligence-strategy/", title: "Artificial Intelligence Strategy Examples - Vivaldi Group", publisher: "vivaldigroup.com", description: "Authoritative reference supporting Artificial Intelligence Strategy Examples - Vivaldi Group.", category: "guide"},
          {id: 11, href: "https://www.salesforce.com/ap/hub/technology/artificial-intelligence-small-business/", title: "What is artificial intelligence and how can small businesses use it? - Salesforce", publisher: "salesforce.com", description: "Authoritative reference supporting What is artificial intelligence and how can small businesses use it? - Salesforce.", category: "guide"},
          {id: 12, href: "https://www.microchannel.com.au/articles/7-examples-of-how-ai-is-helping-small-businesses/", title: "7 Ways AI for Small Business Is Driving Growth and Efficiency", publisher: "microchannel.com.au", description: "Authoritative reference supporting 7 Ways AI for Small Business Is Driving Growth and Efficiency.", category: "guide"},
        ]}
        heading="Sources & further reading"
      />

        <ArticleDisclaimer />

        <div className="my-12 not-prose">
          <ArticleCompanyCTA
            title="Keep learning AI through practical examples"
            body="If this explanation helped, explore beginner-friendly resources and community pathways that focus on real tools, plain language, and hands-on learning."
            buttonText="Start practical AI learning"
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
