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

const TOPIC = "What Is General Artificial Intelligence and Why It Matters"
export const CATEGORY = "featured"
export const SLUG = "what-is-general-artificial-intelligence-and-why-it-matters"
export const DATE_PUBLISHED = "2026-04-12"
export const DATE_MODIFIED = "2026-04-12"
export const DESCRIPTION = "What is general artificial intelligence? Learn how AGI differs from narrow AI, why it remains theoretical, and what the term means in practical discussions today."
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-6929c81e-098b-48a5-8302-f26c732f8c65.jpg?alt=media&token=cf84b2aa-8393-44a0-a444-257dae974703"
const HERO_IMAGE_ALT = "Close-up of two coworkers discussing general artificial intelligence concepts over a laptop in a candid office moment"
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
  { id: 1, question: "Is AGI the same as narrow AI?", answer: "No. Narrow AI is designed for specific tasks or domains, while AGI refers to a hypothetical system with broad, transferable ability across many kinds of cognitive work." },
  { id: 2, question: "Why do experts say AGI has not been achieved?", answer: "The sources describe AGI as hypothetical and note there is no single, universally accepted benchmark or consensus threshold that proves it exists. Strong results in selected tasks do not by themselves show fully general intelligence." },
  { id: 3, question: "What capabilities are usually linked to AGI?", answer: "AGI is usually associated with generalisation across tasks, transferring knowledge between domains, learning from experience, reasoning, planning, abstraction, and adapting to unfamiliar problems. These traits are discussed as a bundle rather than one test." },
  { id: 4, question: "How should teams talk about AGI responsibly?", answer: "Use the term for broad, human-like or human-level capability across many tasks, not for a model that is simply impressive in one area. It helps to ask whether a system can generalise, transfer skills, and adapt without task-specific rebuilding." },
  { id: 5, question: "What could AGI change if it were developed?", answer: "Discussions often point to broader automation, more flexible decision support, faster research, and stronger problem solving across domains. However, those effects remain speculative because AGI has not been achieved." },
]

export const summaryHighlights = {
  heading: "Key facts: What Is General Artificial Intelligence and Why It Matters",
  intro: "What is general artificial intelligence? Learn how AGI differs from narrow AI, why it remains theoretical, and what the term means in practical discussions today.",
  items: [
    { label: "What is meant by general artificial intelligence?", description: "General artificial intelligence usually means a hypothetical AI system that could match or exceed human cognitive ability across a very wide range of tasks. It implies broad learning, reasoning, and adaptation rather than skill in one narrow domain." },
    { label: "What is the difference between general intelligence and AI?", description: "In this article, AI usually refers to today\u2019s narrow systems built for specific tasks, while general intelligence refers to broad capability across many tasks and settings. AGI is the idea of applying that general intelligence to machines." },
    { label: "What is an example of general AI?", description: "There is no confirmed real-world example of general AI in the grounded sources because AGI is still described as theoretical. Current tools may be powerful, but they are not broadly accepted as true AGI." },
  ],
}

export const articleMeta = {
  title: "What Is General Artificial Intelligence and Why It Matters",
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
  { question: "What is meant by general artificial intelligence?", answer: "General artificial intelligence usually means a hypothetical AI system that could match or exceed human cognitive ability across a very wide range of tasks. It implies broad learning, reasoning, and adaptation rather than skill in one narrow domain." },
  { question: "What is the difference between general intelligence and AI?", answer: "In this article, AI usually refers to today\u2019s narrow systems built for specific tasks, while general intelligence refers to broad capability across many tasks and settings. AGI is the idea of applying that general intelligence to machines." },
  { question: "What is an example of general AI?", answer: "There is no confirmed real-world example of general AI in the grounded sources because AGI is still described as theoretical. Current tools may be powerful, but they are not broadly accepted as true AGI." },
  { question: "Is AGI the same as narrow AI?", answer: "No. Narrow AI is designed for specific tasks or domains, while AGI refers to a hypothetical system with broad, transferable ability across many kinds of cognitive work." },
  { question: "Why do experts say AGI has not been achieved?", answer: "The sources describe AGI as hypothetical and note there is no single, universally accepted benchmark or consensus threshold that proves it exists. Strong results in selected tasks do not by themselves show fully general intelligence." },
  { question: "What capabilities are usually linked to AGI?", answer: "AGI is usually associated with generalisation across tasks, transferring knowledge between domains, learning from experience, reasoning, planning, abstraction, and adapting to unfamiliar problems. These traits are discussed as a bundle rather than one test." },
  { question: "How should teams talk about AGI responsibly?", answer: "Use the term for broad, human-like or human-level capability across many tasks, not for a model that is simply impressive in one area. It helps to ask whether a system can generalise, transfer skills, and adapt without task-specific rebuilding." },
  { question: "What could AGI change if it were developed?", answer: "Discussions often point to broader automation, more flexible decision support, faster research, and stronger problem solving across domains. However, those effects remain speculative because AGI has not been achieved." },
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
        <p><strong>{TOPIC}</strong> — {"General artificial intelligence, or AGI, usually refers to a hypothetical form of AI that could match or exceed human cognitive ability across a very wide range of tasks. The key idea is breadth. Instead of being built for one narrow job, an AGI system would be expected to understand, learn, and apply knowledge in many different settings. Sources describe this as the ability to handle virtually any intellectual task a human can do, not just one specialised function."}</p>
        <p>{"That makes AGI different from the task-specific AI people use today. Current AI systems can be impressive at defined jobs such as language generation, image recognition, or translation, but they are still narrow in scope. AGI implies broader generalisation, transferable skills, and the ability to adapt to unfamiliar problems without needing separate task-by-task programming. In simple terms, narrow AI is good at selected tasks, while AGI is meant to move across domains more like a human can."}</p>
        <p>{"It is also important to set expectations early: AGI remains theoretical. Multiple sources note that there is no single, universally accepted definition or benchmark that proves AGI has been achieved. This article treats AGI as a concept to understand clearly, so readers can separate the underlying idea from hype and loose claims."}</p>
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="What is general artificial intelligence? Learn how AGI differs from narrow AI, why it remains theoretical, and what the term means in practical discussions today."
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
          {"General artificial intelligence usually means a hypothetical AI system that could match or exceed human cognitive ability across a very wide range of tasks. It implies broad learning, reasoning, and adaptation rather than skill in one narrow domain."}
        </QuoteBlock>
          <h2>{"How AGI differs from the AI people use today"}</h2>
          <p>{"The main contrast is between narrow AI and general AI. The AI tools people use today are usually narrow AI systems. They can be very capable, but their competence is still centred on defined tasks or domains, such as language work, image recognition, or translation. By comparison, AGI is described in the sources as a theoretical or hypothetical form of AI that could match or exceed human cognitive ability across virtually all tasks, rather than performing well in one slice of work."}</p>
          <p>{"That is why the word general matters so much. An AGI system would need broad, transferable intelligence. Instead of needing task-specific rebuilding or reprogramming for each new area, it would be expected to generalise knowledge, transfer skills between domains, and handle unfamiliar problems. It would carry learning from one context into another and adapt in a more human-like way when the situation changes."}</p>
          <p>{"Current AI products can look flexible because one system may answer questions, summarise text, or help with coding. But strong performance across several related tasks is not the same as true general intelligence. The sources consistently describe AGI as something beyond today\u2019s specialised systems, not simply a more polished version of them. So when people ask whether current AI is already AGI, the grounded answer here is no: today\u2019s systems may be powerful, but AGI would require much broader reasoning and transfer across unrelated domains."}</p>
          <ul>
            <li>{"Narrow AI is built for specific tasks or domains, even when it seems highly capable."}</li>
            <li>{"AGI would need to work across virtually all cognitive tasks."}</li>
            <li>{"A key test is whether knowledge and skills can transfer to unfamiliar domains without task-specific rebuilding."}</li>
            <li>{"Powerful current AI is not the same as general intelligence."}</li>
          </ul>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-b8753b72-1803-4c5f-a956-e946a2eba579.jpg?alt=media&token=235b1aa2-fadc-45c4-bbb8-fb2ec7002f9b"
            alt="How AGI differs from the AI people use today"
            caption="How AGI differs from the AI people use today"
            width={1200}
            height={800}
          />
          <h2>{"The core capabilities researchers usually associate with AGI"}</h2>
          <p>{"Researchers usually describe AGI as a bundle of abilities rather than one passing test. The central idea is broad competence across many kinds of intellectual work, not excellence at one narrow task. In the sources here, AGI is framed as a hypothetical system that can understand, learn, and apply knowledge across a wide range of tasks, including tasks it was not built for in advance. That is why generalisation matters so much in AGI discussions: the system would need to carry what it learns from one setting into another without needing task-specific reprogramming each time."}</p>
          <p>{"If a system performs well only in familiar conditions, that is closer to narrow AI. AGI, by contrast, is usually described as being able to face unfamiliar problems, learn from experience, and respond in a more human-like way across domains."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-ae87af56-8f9d-4ea5-aa35-aa9af5966c61.jpg?alt=media&token=b53d29fd-f889-409b-873f-421761d6a0c3"
            alt="The core capabilities researchers usually associate with AGI"
            caption="The core capabilities researchers usually associate with AGI"
            width={1200}
            height={800}
          />
          <h3>{"Generalisation, transfer, and learning"}</h3>
          <p>{"One core capability is generalisation across tasks. In plain English, that means using knowledge or skills learned in one area to help with another area. The priority sources repeatedly contrast this with narrow AI, which is built for specific jobs such as image recognition or translation. AGI is usually defined as something broader: it could transfer skills between domains and deal with new tasks without being rebuilt for each one."}</p>
          <p>{"Researchers also connect AGI with learning that is not locked to huge amounts of task-specific setup. This is why terms like broad, flexible, and transferable intelligence appear so often in AGI definitions."}</p>
          <h3>{"Reasoning, planning, and adapting to the unfamiliar"}</h3>
          <p>{"The sources describe AGI as aiming to match human cognitive abilities across tasks, which implies more than pattern matching on one benchmark. It suggests the ability to work through problems, connect ideas, and apply knowledge in situations that were not seen before. This is where abstraction matters: the system would need to form useful higher-level understanding, not just repeat narrow behaviours."}</p>
          <p>{"Adaptation to unfamiliar situations is the real stress test for this bundle of abilities. Researchers usually reserve the AGI label for systems that can handle novel problems, move across domains, and continue operating with a broad level of competence. That is why AGI is generally discussed as a combination of reasoning, learning, transfer, and adaptation, not as one isolated benchmark score."}</p>

        <ArticleResourceCTA
          eyebrow="Free guide"
          title={"Get the what is general artificial intelligence checklist"}
          description="Use this article as a working guide: shortlist candidates, validate traction, and structure your next conversations."
          buttonLabel="Download now"
          buttonHref="/articles"
          accent="purple"
        />

        <ArticleStepList
          title="Practical next steps"
          steps={[
            "Narrow AI is built for specific tasks or domains, even when it seems highly capable.",
            "AGI would need to work across virtually all cognitive tasks.",
            "A key test is whether knowledge and skills can transfer to unfamiliar domains without task-specific rebuilding.",
            "Powerful current AI is not the same as general intelligence.",
          ]}
          accent="indigo"
        />
          <h2>{"Why experts still say AGI does not exist yet"}</h2>
          <p>{"Experts still describe artificial general intelligence as hypothetical, not achieved. Across the sources, AGI is framed as a system that can match or exceed human cognitive ability across any task, or perform the full range of human-level intellectual work with broad, transferable skill. That high bar matters. A model can look very capable in language, coding, image analysis, or other pattern-heavy tasks and still fall short of what many people mean by general intelligence. IBM also notes there is no academic consensus on exactly what would qualify as AGI, which makes claims of arrival even harder to defend."}</p>
          <p>{"Another reason the debate remains open is that current systems are usually described as narrow or task-bound compared with AGI. Sources distinguish AGI from today\u2019s AI by stressing generalisation, transfer across domains, and the ability to handle novel problems without task-specific reprogramming. IBM separates AGI from strong AI and from artificial superintelligence, while Wikipedia notes that superintelligence would go beyond human ability across every domain by a wide margin. So when people point to a powerful large model and call it AGI, experts often push back for a simple reason: strong performance in selected tests is evidence of capability, but not proof of fully general, human-level intelligence across virtually all cognitive tasks."}</p>
          <ul>
            <li>{"AGI is still described as a hypothetical stage, not a confirmed reality."}</li>
            <li>{"There is no clear academic or industry-wide consensus on what exact threshold would count as AGI."}</li>
            <li>{"Current AI can be highly impressive while still lacking broad transfer across domains and tasks."}</li>
            <li>{"AGI, strong AI, and artificial superintelligence are related but not identical ideas."}</li>
          </ul>
          <h2>{"What AGI could change for work, products, and society"}</h2>
          <p>{"If AGI were achieved, the main change would be breadth. Today\u2019s AI tools are usually built for narrower tasks, but AGI is commonly described as a system that could learn, reason, and apply knowledge across many different kinds of work at a human-like level. That is why discussions about AGI often focus on broader decision support, more flexible automation, faster research, and better handling of unfamiliar problems. In practical terms, people imagine systems that could move between planning, analysis, communication, and problem solving without needing a separate tool for each step."}</p>
          <p>{"That said, these impacts are still hypothetical because AGI does not exist today. Several sources describe AGI as a theoretical goal rather than a deployed reality, and there is still no clear consensus on what would fully qualify as AGI. AGI may be discussed as a future shift in products, jobs, and institutions, but current teams are still working with narrow AI systems that have clearer limits and narrower strengths."}</p>
          <p>{"For businesses, governments, and community organisations, the more grounded response is not to plan around science-fiction scenarios. It is to build AI literacy, test current tools responsibly, and improve governance now. Existing AI already supports pattern finding, data analysis, workflow support, and some forms of decision-making assistance. That makes present-day capability, human oversight, and clear accountability more important than speculative forecasts about fully general machine intelligence."}</p>
          <p>{"They can help people think about opportunity and risk at the same time: better problem solving and new services on one side, and safety, misuse, and trust concerns on the other. A sensible approach is to stay informed, separate current AI from hypothetical AGI, and support responsible experimentation that keeps human judgment, transparency, and public understanding in view."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-5ab8f4b2-aeed-4b19-a826-a51a607507c5.jpg?alt=media&token=e11fc3ea-a2f5-4471-9e1c-dccbe192a141"
            alt="Ultra-close candid of a worker\u2019s hands switching between sketches, code, and chat on"
            caption="What AGI could change for work, products, and society"
            width={1200}
            height={800}
          />
          <h2>{"How to talk about AGI accurately right now"}</h2>
          <p>{"A careful way to use the term AGI today is to reserve it for a system with broad, human-like or human-level ability across many cognitive tasks. The cited sources describe AGI as hypothetical or theoretical, not as something that has clearly been achieved. They also draw a clear line between AGI and narrow AI. Narrow AI can be excellent at a defined task, but AGI would need to understand, learn, and apply knowledge across many kinds of problems."}</p>
          <p>{"Instead of asking whether it performs well in one area, ask whether it can generalise to unfamiliar problems, transfer skills across domains, and adapt without task-specific reprogramming."}</p>
          <p>{"In practice, the most useful stance is to treat AGI as an important research goal and public concept while making present decisions based on current AI systems as they actually exist. For teaching, strategy, or everyday discussion, that means separating exciting progress from claims of general intelligence. Build AI literacy, compare claims against the definition being used, and stay precise about the difference between powerful specialised systems and truly general ones."}</p>
          <ul>
            <li>{"Use AGI to mean broad capability across many tasks, not excellence in one task."}</li>
            <li>{"Keep current decisions grounded in the limits of today\u2019s AI systems."}</li>
            <li>{"Separate clear terminology from hype when discussing future AI."}</li>
          </ul>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-92c13584-7c59-47d7-9221-7f5227f0117c.jpg?alt=media&token=a0f7f098-b8c0-479f-becd-539b1d20b433"
            alt="How to talk about AGI accurately right now"
            caption="How to talk about AGI accurately right now"
            width={1200}
            height={800}
          />

        <QuoteBlock title="Keep moving forward" variant="orange">
          {"There is no confirmed real-world example of general AI in the grounded sources because AGI is still described as theoretical. Current tools may be powerful, but they are not broadly accepted as true AGI."}
        </QuoteBlock>

        <MLAITemplateResourceCTA />

      <ArticleReferences
        references={[
          {id: 1, href: "https://www.databricks.com/blog/what-is-artificial-general-intelligence", title: "What is Artificial General Intelligence (AGI)? | Databricks", publisher: "databricks.com", description: "Authoritative reference supporting What is Artificial General Intelligence (AGI)? | Databricks.", category: "guide"},
          {id: 2, href: "https://nmu.edu/ai-literacy-initiative/general-intelligence-ai", title: "General - Artificial General Intelligence | NMU AI Literacy Initiative", publisher: "nmu.edu", description: "Authoritative reference supporting General - Artificial General Intelligence | NMU AI Literacy Initiative.", category: "guide"},
          {id: 3, href: "https://cloud.google.com/discover/what-is-artificial-general-intelligence", title: "What Is Artificial General Intelligence? | Google Cloud", publisher: "cloud.google.com", description: "Authoritative reference supporting What Is Artificial General Intelligence? | Google Cloud.", category: "guide"},
          {id: 4, href: "https://aws.amazon.com/what-is/artificial-general-intelligence/", title: "What is AGI? - Artificial General Intelligence Explained - AWS", publisher: "aws.amazon.com", description: "Authoritative reference supporting What is AGI? - Artificial General Intelligence Explained - AWS.", category: "guide"},
          {id: 5, href: "https://www.ovhcloud.com/en-au/learn/what-is-artificial-general-intelligence/", title: "What is artificial general intelligence? | OVHcloud Australia", publisher: "ovhcloud.com", description: "Authoritative reference supporting What is artificial general intelligence? | OVHcloud Australia.", category: "guide"},
          {id: 6, href: "https://www.ibm.com/think/topics/artificial-general-intelligence", title: "What is Artificial General Intelligence (AGI)? | IBM", publisher: "ibm.com", description: "Authoritative reference supporting What is Artificial General Intelligence (AGI)? | IBM.", category: "guide"},
          {id: 7, href: "https://business.gov.au/online-and-digital/artificial-intelligence", title: "Artificial intelligence (AI) | business.gov.au", publisher: "business.gov.au", description: "Authoritative reference supporting Artificial intelligence (AI) | business.gov.au.", category: "guide"},
          {id: 8, href: "https://en.wikipedia.org/wiki/Artificial_general_intelligence", title: "Artificial general intelligence - Wikipedia", publisher: "en.wikipedia.org", description: "Authoritative reference supporting Artificial general intelligence - Wikipedia.", category: "guide"},
          {id: 9, href: "https://www.ibm.com/think/topics/artificial-intelligence-business", title: "What is Artificial Intelligence (AI) in Business? | IBM", publisher: "ibm.com", description: "Authoritative reference supporting What is Artificial Intelligence (AI) in Business? | IBM.", category: "guide"},
          {id: 10, href: "https://www.finance.gov.au/government/public-data/data-and-digital-ministers-meeting/national-framework-assurance-artificial-intelligence-government", title: "National framework for the assurance of artificial intelligence in government | Department of Finance", publisher: "finance.gov.au", description: "Authoritative reference supporting National framework for the assurance of artificial intelligence in government | Department of Finance.", category: "guide"},
          {id: 11, href: "https://www.digital.nsw.gov.au/policy/artificial-intelligence/artificial-intelligence-strategy", title: "Artificial Intelligence Strategy | Digital NSW", publisher: "digital.nsw.gov.au", description: "Authoritative reference supporting Artificial Intelligence Strategy | Digital NSW.", category: "guide"},
        ]}
        heading="Sources & further reading"
      />

        <ArticleDisclaimer />

        <div className="my-12 not-prose">
          <ArticleCompanyCTA
            title="Build practical AI literacy first"
            body="If you are sorting hype from reality, focus on how current AI systems work, where they help, and where they still need human oversight. Grounded AI knowledge is more useful than guessing about future AGI timelines."
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
