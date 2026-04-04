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

const TOPIC = "What Is AGI in Artificial Intelligence and Why It Matters"
export const CATEGORY = "featured"
export const SLUG = "what-is-agi-in-artificial-intelligence-and-why-it-matters"
export const DATE_PUBLISHED = "2026-04-04"
export const DATE_MODIFIED = "2026-04-04"
export const DESCRIPTION = "What is AGI in artificial intelligence explained simply, including how it differs from today\u2019s AI systems and how to assess AGI claims without hype."
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-dcfb46e7-19b3-43bb-b1c9-a386be22de5c.jpg?alt=media&token=e798046f-9e1d-439b-b156-ae2f2fc51f46"
const HERO_IMAGE_ALT = "What Is AGI in Artificial Intelligence and Why It Matters"
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
  { id: 1, question: "What capabilities would an AGI system need?", answer: "The grounded sections point to broad generalisation, transfer across domains, reasoning, adaptation, planning, memory, and problem-solving on unfamiliar tasks. They also note that researchers still debate which capabilities are essential and how to measure them." },
  { id: 2, question: "Why is AGI so hard to define?", answer: "AGI is hard to define because there is no single accepted benchmark or test for general intelligence. Experts also differ on whether human-level performance, self-teaching, autonomy, or other traits should be part of the definition." },
  { id: 3, question: "Why do researchers still debate whether AGI is close?", answer: "The debate continues because progress in language, coding, and multimodal AI does not by itself prove general intelligence. If the field does not fully agree on what counts as AGI, it will also disagree on timelines." },
  { id: 4, question: "How can readers evaluate AGI claims responsibly?", answer: "Look for evidence of transfer to unfamiliar tasks, adaptation across contexts, and repeatable performance beyond polished demos. Independent verification matters more than marketing language or a strong result in one narrow workflow." },
  { id: 5, question: "Is generative AI the same as AGI?", answer: "No. Generative AI can produce text, images, code, and other outputs from learned patterns, but that does not mean it has broad, human-like intelligence across virtually all cognitive tasks." },
]

export const summaryHighlights = {
  heading: "Key facts: What Is AGI in Artificial Intelligence and Why It Matters",
  intro: "What is AGI in artificial intelligence explained simply, including how it differs from today\u2019s AI systems and how to assess AGI claims without hype.",
  items: [
    { label: "Is ChatGPT considered AGI?", description: "No. The grounded sections describe ChatGPT as a powerful current AI system, but not AGI, because AGI would need broader and more reliable cross-domain learning, reasoning, and transfer." },
    { label: "Does AGI exist yet?", description: "The article treats AGI as theoretical rather than established fact. The sources cited in the grounded sections say there is still no single agreed test or consensus that any current system qualifies." },
    { label: "What is the difference between AI and AGI?", description: "AI is a broad category that includes narrow systems built for defined tasks. AGI refers to a hypothetical form of AI with flexible, human-like capability across many different cognitive tasks." },
  ],
}

export const articleMeta = {
  title: "What Is AGI in Artificial Intelligence and Why It Matters",
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
  { question: "Is ChatGPT considered AGI?", answer: "No. The grounded sections describe ChatGPT as a powerful current AI system, but not AGI, because AGI would need broader and more reliable cross-domain learning, reasoning, and transfer." },
  { question: "Does AGI exist yet?", answer: "The article treats AGI as theoretical rather than established fact. The sources cited in the grounded sections say there is still no single agreed test or consensus that any current system qualifies." },
  { question: "What is the difference between AI and AGI?", answer: "AI is a broad category that includes narrow systems built for defined tasks. AGI refers to a hypothetical form of AI with flexible, human-like capability across many different cognitive tasks." },
  { question: "What capabilities would an AGI system need?", answer: "The grounded sections point to broad generalisation, transfer across domains, reasoning, adaptation, planning, memory, and problem-solving on unfamiliar tasks. They also note that researchers still debate which capabilities are essential and how to measure them." },
  { question: "Why is AGI so hard to define?", answer: "AGI is hard to define because there is no single accepted benchmark or test for general intelligence. Experts also differ on whether human-level performance, self-teaching, autonomy, or other traits should be part of the definition." },
  { question: "Why do researchers still debate whether AGI is close?", answer: "The debate continues because progress in language, coding, and multimodal AI does not by itself prove general intelligence. If the field does not fully agree on what counts as AGI, it will also disagree on timelines." },
  { question: "How can readers evaluate AGI claims responsibly?", answer: "Look for evidence of transfer to unfamiliar tasks, adaptation across contexts, and repeatable performance beyond polished demos. Independent verification matters more than marketing language or a strong result in one narrow workflow." },
  { question: "Is generative AI the same as AGI?", answer: "No. Generative AI can produce text, images, code, and other outputs from learned patterns, but that does not mean it has broad, human-like intelligence across virtually all cognitive tasks." },
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
        <p><strong>{TOPIC}</strong> — {"Artificial general intelligence, or AGI, usually means a hypothetical AI system that can match or exceed human ability across a very wide range of cognitive tasks. In plain English, it is the idea of a machine that would not just do one job well, but could learn, reason, adapt, and apply knowledge in many different situations. Sources such as IBM and Google Cloud describe AGI as the point where AI could handle any intellectual task a human can. That is very different from today\u2019s narrow AI systems, which are built for specific tasks like writing text, classifying images, or answering questions in a defined workflow."}</p>
        <p>{"A system can feel impressive or broadly useful without being AGI. Current AI tools may combine many capabilities, but that is not the same as proven human-level general intelligence across virtually all domains. Another reason for confusion is that AGI is still theoretical, and there is no single agreed test for when a system has truly reached it. So in this article, it helps to treat AGI as a research goal and concept, not as a settled label for today\u2019s AI products."}</p>
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="What is AGI in artificial intelligence explained simply, including how it differs from today\u2019s AI systems and how to assess AGI claims without hype."
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
          {"No. The grounded sections describe ChatGPT as a powerful current AI system, but not AGI, because AGI would need broader and more reliable cross-domain learning, reasoning, and transfer."}
        </QuoteBlock>
          <h2>{"How AGI Differs From Today\u2019s AI Systems"}</h2>
          <p>{"Artificial general intelligence, or AGI, is usually described as a hypothetical kind of AI that could handle a very wide range of intellectual tasks at a human-like level. The key idea is flexibility. An AGI system would not be limited to one narrow job or one fixed domain. It would be able to learn, adapt, transfer knowledge between areas, and deal with new problems without needing separate task-specific design each time. By contrast, most AI in use today is narrow AI: systems built to do particular kinds of work well inside defined boundaries."}</p>
          <p>{"But that does not automatically make it AGI. These systems still rely on patterns learned from training data and are used inside bounded task setups. In simple terms, a chatbot that is good at conversation is still not the same as a system that can independently understand and perform any intellectual task across domains. In the same way, an image model may generate strong visuals, but that does not mean it can plan a business strategy, run a scientific experiment, or move confidently into a totally new kind of problem on its own."}</p>
          <p>{"For how agi differs from today\u2019s ai systems, focus on Works well on defined tasks or domains and Would need broad, transferable ability across many tasks, including new ones."}</p>
          <ul>
            <li>{"Works well on defined tasks or domains."}</li>
            <li>{"Would need broad, transferable ability across many tasks, including new ones."}</li>
          </ul>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-0351f604-a5e1-45e8-aa15-2e428a428f66.jpg?alt=media&token=b3970eb7-214d-4969-9914-2b81d27b6a42"
            alt="Notebook listing many tasks beside a laptop"
            caption="How AGI Differs From Today\u2019s AI Systems"
            width={1200}
            height={800}
          />
          <h2>{"What Capabilities an AGI System Would Need"}</h2>
          <p>{"Most definitions of AGI set a much higher bar than sounding fluent or completing a narrow task well. An AGI system would need to generalise across domains, carry useful knowledge from one problem to another, and handle new tasks without being rebuilt or narrowly retrained for each one. That is a key difference from narrow AI, which can be strong in one area but limited outside its design scope."}</p>
          <p>{"Researchers also often connect AGI with reasoning, adaptation, and the ability to solve unfamiliar problems. A generally intelligent system would likely need to keep relevant context, learn from new situations, plan across multiple steps, and adjust when conditions change. At the same time, the sources note that there is still no full agreement on exactly which abilities are required or how they should be measured, so these capabilities are best seen as a working set of expectations rather than a final checklist."}</p>
          <ul>
            <li>{"Broad performance across many tasks, not one specialised task"}</li>
            <li>{"Transfer of knowledge from one domain to another"}</li>
            <li>{"Learning or adapting to new tasks without task-specific reprogramming"}</li>
            <li>{"Reasoning and problem-solving on unfamiliar situations"}</li>
          </ul>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-e06f80bd-cbae-4afd-9304-5e9ccd1245b3.jpg?alt=media&token=2c32d034-b44e-4324-b406-54dbde806193"
            alt="What Capabilities an AGI System Would Need"
            caption="What Capabilities an AGI System Would Need"
            width={1200}
            height={800}
          />
          <h3>{"Breadth and transfer matter most"}</h3>
          <p>{"The strongest recurring theme is breadth. Sources describe AGI as a hypothetical system that could match or exceed human cognitive ability across virtually all tasks, or across any intellectual task, rather than in one narrow domain. That means the system would need flexible intelligence that carries over between contexts. If it learns a concept, strategy, or skill in one area, it should be able to apply that knowledge elsewhere when the problem changes."}</p>
          <p>{"This is why transfer learning and generalisation are central to AGI discussions. A system that performs well only after task-specific tuning is still closer to narrow AI. The AGI idea assumes less dependence on custom reprogramming and more ability to approach unfamiliar work with broadly useful knowledge."}</p>
          <h3>{"Reasoning, planning, and adaptation"}</h3>
          <p>{"Many AGI descriptions also imply a system that can reason through problems instead of only recalling likely outputs."}</p>
          <p>{"Some researchers may treat it as part of practical general intelligence, while others focus more on broad cognitive competence itself. The more stable point across the sources is that AGI remains debated: the field does not yet share one accepted test or one complete list of required abilities."}</p>

        <ArticleResourceCTA
          eyebrow="Free guide"
          title={"Get the what is agi in artificial intelligence checklist"}
          description="Use this article as a working guide: shortlist candidates, validate traction, and structure your next conversations."
          buttonLabel="Download now"
          buttonHref="/articles"
          accent="purple"
        />

        <ArticleStepList
          title="Practical next steps"
          steps={[
            "Works well on defined tasks or domains.",
            "Would need broad, transferable ability across many tasks, including new ones.",
          ]}
          accent="indigo"
        />
          <h2>{"Why Researchers Still Debate Whether AGI Is Close"}</h2>
          <p>{"Researchers still argue about AGI because the target itself is not settled. AWS describes AGI as a theoretical form of AI with human-like intelligence that can self-teach and handle tasks beyond its original training. IBM similarly calls AGI a hypothetical stage where a system could match or exceed human cognitive ability across any task, while also noting there is no academic consensus on exactly what qualifies as AGI. That means debates about timelines are also debates about definitions: if experts do not fully agree on what counts as general intelligence, they will not agree on how close we are to reaching it."}</p>
          <p>{"Fast progress in language models, coding assistants, and multimodal systems makes the question feel urgent, but those gains do not settle the AGI issue on their own. Both source pages contrast AGI with today\u2019s narrower systems, which still operate within limits even when they look flexible. A model may write text, answer questions, or help with code, yet that does not prove it has broad human-level understanding across unfamiliar tasks. This is also why tools like ChatGPT are usually not described as AGI in careful definitions: they are powerful current AI systems, but AGI would require a more general and reliable ability to learn, reason, and transfer skills across domains without being confined to a narrower operating frame."}</p>
          <h2>{"How to Evaluate AGI Claims Without Getting Caught in Hype"}</h2>
          <p>{"A good first test is to ask whether the system shows broad, transferable ability or just strong performance on a narrow task. The core idea behind AGI in the cited sources is not that a model is impressive in one benchmark, one product workflow, or one demo. It is that the system can generalise knowledge, apply skills across very different tasks, and handle problems it was not specifically trained or programmed for. So when someone says a tool is AGI, ask a simple question: can it move from one kind of task to another unfamiliar one without being rebuilt for each case? If the claim depends on a single domain, that is much closer to narrow AI than to AGI."}</p>
          <p>{"The second phase is to look for signs of learning, adaptation, and independent problem-solving across contexts. Several of the sources describe AGI as theoretical human-like intelligence that could learn new tasks, self-teach to some degree, and operate beyond fixed parameters. That means an AGI claim should involve more than polished outputs."}</p>
          <p>{"AGI is still described in these sources as hypothetical or theoretical, and there is no single agreed test that proves it has arrived. In practice, the more a claim relies on excitement and the less it shows cross-domain, repeatable performance, the more cautious you should be."}</p>
          <ul>
            <li>{"Ask if the system transfers skills across unfamiliar tasks."}</li>
          </ul>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-a4f6f81d-4f70-4cd5-b235-58623a37f4a3.jpg?alt=media&token=718c5df1-30f0-490c-a705-e1d50b6b1b3a"
            alt="How to Evaluate AGI Claims Without Getting Caught in Hype"
            caption="How to Evaluate AGI Claims Without Getting Caught in Hype"
            width={1200}
            height={800}
          />
          <h2>{"The Practical Takeaway for Anyone Following AI"}</h2>
          <p>{"The simplest way to think about AGI is this: it is still a hypothetical idea about AI that can handle a very wide range of tasks at a human-like level, rather than just a strong tool for one category of work. That matters because many current systems look flexible in conversation, but that does not automatically make them generally intelligent. Across the main definitions, AGI is tied to broad capability, transfer across domains, and the ability to handle new problems without narrow task-specific setup."}</p>
          <p>{"Can the system reliably transfer what it learns to very different tasks? You do not need to predict when AGI will arrive to follow the field well. It is more useful to understand what AGI would actually mean, recognise that today\u2019s AI is still mostly specialised, and stay curious without treating every impressive product launch as proof that AGI is here."}</p>
          <p>{"For the practical takeaway for anyone following ai, focus on Treat AGI as a hypothetical form of broad intelligence, not a label for every advanced AI product, Assume current AI is powerful but mostly specialised unless there is strong evidence of cross-domain transfer, and Judge AGI claims by adaptability, transfer, and independent verification rather than excitement alone."}</p>
          <ul>
            <li>{"Treat AGI as a hypothetical form of broad intelligence, not a label for every advanced AI product."}</li>
            <li>{"Assume current AI is powerful but mostly specialised unless there is strong evidence of cross-domain transfer."}</li>
            <li>{"Judge AGI claims by adaptability, transfer, and independent verification rather than excitement alone."}</li>
          </ul>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-6987acaa-8602-4811-8bd8-6f024796aba6.jpg?alt=media&token=80398f96-24fe-4b03-b3fc-df2d2ebe846a"
            alt="The Practical Takeaway for Anyone Following AI"
            caption="The Practical Takeaway for Anyone Following AI"
            width={1200}
            height={800}
          />

        <QuoteBlock title="Keep moving forward" variant="orange">
          {"AI is a broad category that includes narrow systems built for defined tasks. AGI refers to a hypothetical form of AI with flexible, human-like capability across many different cognitive tasks."}
        </QuoteBlock>

        <MLAITemplateResourceCTA />

      <ArticleReferences
        references={[
          {id: 1, href: "https://www.ibm.com/think/topics/artificial-general-intelligence", title: "What is Artificial General Intelligence (AGI)? | IBM", publisher: "ibm.com", description: "Authoritative reference supporting What is Artificial General Intelligence (AGI)? | IBM.", category: "guide"},
          {id: 2, href: "https://nmu.edu/ai-literacy-initiative/general-intelligence-ai", title: "General - Artificial General Intelligence | NMU AI Literacy Initiative", publisher: "nmu.edu", description: "Authoritative reference supporting General - Artificial General Intelligence | NMU AI Literacy Initiative.", category: "guide"},
          {id: 3, href: "https://cloud.google.com/discover/what-is-artificial-general-intelligence", title: "What Is Artificial General Intelligence? | Google Cloud", publisher: "cloud.google.com", description: "Authoritative reference supporting What Is Artificial General Intelligence? | Google Cloud.", category: "guide"},
          {id: 4, href: "https://www.databricks.com/blog/what-is-artificial-general-intelligence", title: "What is Artificial General Intelligence (AGI)? | Databricks", publisher: "databricks.com", description: "Authoritative reference supporting What is Artificial General Intelligence (AGI)? | Databricks.", category: "guide"},
          {id: 5, href: "https://www.imd.org/blog/digital-transformation/artificial-general-intelligence-agi/", title: "What Is Artificial General Intelligence (AGI)? Learn all about it!", publisher: "imd.org", description: "Authoritative reference supporting What Is Artificial General Intelligence (AGI)? Learn all about it!.", category: "guide"},
          {id: 6, href: "https://en.wikipedia.org/wiki/Artificial_general_intelligence", title: "Artificial general intelligence - Wikipedia", publisher: "en.wikipedia.org", description: "Authoritative reference supporting Artificial general intelligence - Wikipedia.", category: "guide"},
          {id: 7, href: "https://www.forrester.com/blogs/demystifying-artificial-general-intelligence/", title: "Demystifying Artificial General Intelligence", publisher: "forrester.com", description: "Authoritative reference supporting Demystifying Artificial General Intelligence.", category: "guide"},
          {id: 8, href: "https://thedecisionlab.com/reference-guide/computer-science/artificial-general-intelligence", title: "Artificial General Intelligence - The Decision Lab", publisher: "thedecisionlab.com", description: "Authoritative reference supporting Artificial General Intelligence - The Decision Lab.", category: "guide"},
          {id: 9, href: "https://ainowinstitute.org/publications/ai-generated-business", title: "AI Generated Business: The Rise of AGI and the Rush to Find a Working Revenue Model - AI Now Institute", publisher: "ainowinstitute.org", description: "Authoritative reference supporting AI Generated Business: The Rise of AGI and the Rush to Find a Working Revenue Model - AI Now Institute.", category: "guide"},
          {id: 10, href: "https://kineticcs.com/future-of-business-preparing-for-general-artifical-intelligencer/", title: "The Future of Business: Preparing for AGI", publisher: "kineticcs.com", description: "Authoritative reference supporting The Future of Business: Preparing for AGI.", category: "guide"},
          {id: 11, href: "https://aws.amazon.com/what-is/artificial-general-intelligence/", title: "What is AGI? - Artificial General Intelligence Explained - AWS", publisher: "aws.amazon.com", description: "Authoritative reference supporting What is AGI? - Artificial General Intelligence Explained - AWS.", category: "guide"},
        ]}
        heading="Sources & further reading"
      />

        <ArticleDisclaimer />

        <div className="my-12 not-prose">
          <ArticleCompanyCTA
            title="Keep learning AI without the hype"
            body="Explore practical resources, events, and community pathways to build a grounded understanding of AI and how current systems are actually used."
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
