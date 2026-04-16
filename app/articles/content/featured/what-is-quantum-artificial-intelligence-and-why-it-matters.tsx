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

const TOPIC = "What Is Quantum Artificial Intelligence and Why It Matters"
export const CATEGORY = "featured"
export const SLUG = "what-is-quantum-artificial-intelligence-and-why-it-matters"
export const DATE_PUBLISHED = "2026-04-16"
export const DATE_MODIFIED = "2026-04-16"
export const DESCRIPTION = "What is quantum artificial intelligence? Learn what it means, how hybrid quantum-classical AI works, where it may help first, and what current limits still keep it experimental."
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-8ec589c4-7eb1-4e71-af6f-0dafb9c8b26d.jpg?alt=media&token=3dc716aa-c439-4281-811f-6e3389496134"
const HERO_IMAGE_ALT = "What Is Quantum Artificial Intelligence and Why It Matters"
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
  { id: 1, question: "What is quantum artificial intelligence in simple terms?", answer: "Quantum artificial intelligence is the overlap between AI and quantum computing. It studies whether quantum systems can improve selected parts of AI workflows, especially for hard optimisation, simulation, or search problems." },
  { id: 2, question: "Is quantum AI the same as quantum machine learning?", answer: "Not exactly. Quantum AI is the broader umbrella term, while quantum machine learning usually refers more specifically to machine learning methods or algorithms that use quantum computing." },
  { id: 3, question: "Does quantum computing automatically make AI faster or better?", answer: "No. Any advantage is task-specific, not universal, and depends on the problem, algorithm, and hardware rather than the simple addition of quantum computing to an AI stack." },
  { id: 4, question: "What kinds of problems may benefit from quantum AI first?", answer: "The strongest near-term candidates are optimisation, simulation, structured search, and pattern discovery in physically complex or highly combinatorial systems. Examples often discussed include logistics, scheduling, materials discovery, drug research, and some finance tasks." },
  { id: 5, question: "What are the main limits holding quantum AI back today?", answer: "Current quantum hardware is noisy, resource-constrained, and still developing. On top of that, some quantum models are hard to train, and many claimed advantages remain theoretical or limited to narrow benchmarks." },
  { id: 6, question: "How should teams evaluate a possible quantum AI use case?", answer: "Start with the business problem, not the technology. Then test whether the workload has a real optimisation, simulation, or search bottleneck and compare small hybrid experiments against strong classical baselines." },
]

export const summaryHighlights = {
  heading: "Key facts: What Is Quantum Artificial Intelligence and Why It Matters",
  intro: "What is quantum artificial intelligence? Learn what it means, how hybrid quantum-classical AI works, where it may help first, and what current limits still keep it experimental.",
  items: [
    { label: "What does Elon Musk say about quantum computing?", description: "This article does not cover individual public comments. It explains quantum artificial intelligence as the overlap of AI and quantum computing, with most current work happening in hybrid systems." },
    { label: "Which country is no. 1 in quantum computing?", description: "This explainer does not rank countries or national programs. It focuses on what quantum AI is, where it may help first, and why current hardware still limits real-world use." },
    { label: "What did Elon Musk say about quantum computing?", description: "The piece is not about quotations or personalities. Its main point is that quantum AI is a real but early research field, with selective potential rather than broad near-term superiority." },
  ],
}

export const articleMeta = {
  title: "What Is Quantum Artificial Intelligence and Why It Matters",
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
  { question: "What does Elon Musk say about quantum computing?", answer: "This article does not cover individual public comments. It explains quantum artificial intelligence as the overlap of AI and quantum computing, with most current work happening in hybrid systems." },
  { question: "Which country is no. 1 in quantum computing?", answer: "This explainer does not rank countries or national programs. It focuses on what quantum AI is, where it may help first, and why current hardware still limits real-world use." },
  { question: "What did Elon Musk say about quantum computing?", answer: "The piece is not about quotations or personalities. Its main point is that quantum AI is a real but early research field, with selective potential rather than broad near-term superiority." },
  { question: "What is quantum artificial intelligence in simple terms?", answer: "Quantum artificial intelligence is the overlap between AI and quantum computing. It studies whether quantum systems can improve selected parts of AI workflows, especially for hard optimisation, simulation, or search problems." },
  { question: "Is quantum AI the same as quantum machine learning?", answer: "Not exactly. Quantum AI is the broader umbrella term, while quantum machine learning usually refers more specifically to machine learning methods or algorithms that use quantum computing." },
  { question: "Does quantum computing automatically make AI faster or better?", answer: "No. Any advantage is task-specific, not universal, and depends on the problem, algorithm, and hardware rather than the simple addition of quantum computing to an AI stack." },
  { question: "What kinds of problems may benefit from quantum AI first?", answer: "The strongest near-term candidates are optimisation, simulation, structured search, and pattern discovery in physically complex or highly combinatorial systems. Examples often discussed include logistics, scheduling, materials discovery, drug research, and some finance tasks." },
  { question: "What are the main limits holding quantum AI back today?", answer: "Current quantum hardware is noisy, resource-constrained, and still developing. On top of that, some quantum models are hard to train, and many claimed advantages remain theoretical or limited to narrow benchmarks." },
  { question: "How should teams evaluate a possible quantum AI use case?", answer: "Start with the business problem, not the technology. Then test whether the workload has a real optimisation, simulation, or search bottleneck and compare small hybrid experiments against strong classical baselines." },
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
        <p><strong>{TOPIC}</strong> — {"Quantum artificial intelligence, often shortened to quantum AI or QAI, means using ideas from quantum computing together with artificial intelligence. In simple terms, it is the overlap between two fields: AI, which learns from data and makes predictions or decisions, and quantum computing, which uses quantum mechanics to process some kinds of problems differently from classical computers."}</p>
        <p>{"Quantum AI is the umbrella concept for AI work that involves quantum computing, while quantum machine learning usually refers more specifically to quantum algorithms used for machine learning tasks. In practice, most current work is hybrid, not fully quantum. That means a classical computer still does much of the workload, while a quantum device is used for selected subproblems where researchers hope it may offer an advantage. So when people ask what quantum artificial intelligence is, the most accurate answer is that it is an early-stage, mostly hybrid approach that explores how quantum computing could improve parts of AI."}</p>
        <p>{"In practice, what quantum artificial intelligence actually means works best when the section stays specific about what changes first, why it matters, and how the reader can apply the idea without filler."}</p>
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="What is quantum artificial intelligence? Learn what it means, how hybrid quantum-classical AI works, where it may help first, and what current limits still keep it experimental."
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
          {"This article does not cover individual public comments. It explains quantum artificial intelligence as the overlap of AI and quantum computing, with most current work happening in hybrid systems."}
        </QuoteBlock>
          <h2>{"How quantum computing changes the AI toolkit"}</h2>
          <p>{"Quantum computing changes the AI toolkit by changing how some calculations are represented and explored. A classical computer stores information in bits that are either 0 or 1. A quantum computer uses qubits and quantum operations, and qubits can make use of superposition. In quantum machine learning, the idea is not that quantum hardware replaces all of AI. It is that certain learning tasks or hard subroutines might be handled differently, sometimes in hybrid systems where a classical computer manages most of the workflow and a quantum device is used for the part that is hardest to compute."}</p>
          <p>{"The important limit is that quantum advantage is task-specific, not universal. The strongest claims in this area are usually about improving the space or time complexity of some machine learning problems, not about making every model instantly faster or more accurate. In practice, that means the value depends on the problem, the algorithm, and the hardware. Some approaches may help with particular optimisation, sampling, or data-processing tasks, while many everyday AI workloads still fit classical systems better. Researchers also remain cautious because quantum machine learning is still experimental and current hardware has real constraints. So when people talk about quantum AI, the practical takeaway is simple: quantum computing may expand the set of tools available to AI teams, but it does not automatically make AI better just by being added to the stack."}</p>
          <ul>
            <li>{"Qubits give a different way to represent and process information than classical bits."}</li>
            <li>{"Most realistic near-term setups are hybrid, with classical and quantum parts working together."}</li>
            <li>{"Any advantage depends on the specific task, not on AI as a whole."}</li>
          </ul>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-ded743d5-269a-40cc-a347-e9f9054576b6.jpg?alt=media&token=fc2134ca-9d1c-4fff-b2fd-df23a81d9564"
            alt="How quantum computing changes the AI toolkit"
            caption="How quantum computing changes the AI toolkit"
            width={1200}
            height={800}
          />
          <h2>{"Where quantum AI could be useful first"}</h2>
          <p>{"The first realistic uses for quantum AI are likely to appear in problems that are hard because they have too many possible combinations or because the underlying system is physically complex. The source material repeatedly points to optimisation, simulation, and difficult problem-solving as the strongest fit. In simple terms, quantum AI looks more plausible where teams already face search spaces that grow very fast, or where classical computing is too slow to explore enough options."}</p>
          <p>{"That matters because many business problems do not need quantum methods at all. A normal prediction model, chatbot, or reporting workflow is still better handled with classical AI in most cases. Early value is more likely in targeted experiments, often using hybrid setups where classical systems do most of the work and quantum methods are tested on a narrow hard subproblem. This makes near-term quantum AI more of a specialist tool than a general replacement for today\u2019s AI stack."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-a440ff0c-1b9e-4f39-95d6-8b74384f2f0c.jpg?alt=media&token=694a4dd2-f704-41e0-9eb4-c2fcced4f90a"
            alt="Where quantum AI could be useful first"
            caption="Where quantum AI could be useful first"
            width={1200}
            height={800}
          />
          <h3>{"Likely early-use problem types"}</h3>
          <p>{"One promising area is optimisation. Sources describe quantum computing as useful for problems that are too complex for classical systems or too slow to solve at scale, which lines up with tasks like route planning, portfolio-style decision models, and scheduling. In these cases, the goal is not magic accuracy."}</p>
          <p>{"Another likely area is simulation and discovery work. The research sources connect quantum computing with physically complex systems, which is why examples like materials discovery and drug research come up so often. Quantum AI is therefore often discussed as a way to help researchers search large candidate spaces or analyse patterns inside simulation-heavy workflows."}</p>
          <h3>{"What to expect in the near term"}</h3>
          <p>{"Near-term projects are more likely to be proofs of concept around narrow optimisation or research problems than full production systems that remake an industry overnight. The business-oriented source explicitly frames quantum AI as early stage, and the quantum computing source also stresses that the technology is still developing."}</p>
          <p>{"If the answer is yes, quantum AI may be worth watching or piloting. If not, classical AI will usually remain the more practical option. That distinction helps keep expectations grounded while still showing where quantum AI could become genuinely useful first."}</p>

        <ArticleResourceCTA
          eyebrow="Free guide"
          title={"Get the what is quantum artificial intelligence checklist"}
          description="Use this article as a working guide: shortlist candidates, validate traction, and structure your next conversations."
          buttonLabel="Download now"
          buttonHref="/articles"
          accent="purple"
        />

        <ArticleStepList
          title="Practical next steps"
          steps={[
            "Qubits give a different way to represent and process information than classical bits.",
            "Most realistic near-term setups are hybrid, with classical and quantum parts working together.",
            "Any advantage depends on the specific task, not on AI as a whole.",
          ]}
          accent="indigo"
        />
          <h2>{"What is possible now versus what is still hype"}</h2>
          <p>{"A useful starting point is that quantum AI is still an early-stage field, not a mature business standard. The sources describe quantum computing itself as still in development, and they frame quantum AI as an emerging mix of quantum computing and AI rather than a finished replacement for conventional machine learning. That means today\u2019s work is shaped by practical limits in hardware as much as by algorithm design. Contemporary quantum systems are resource-constrained, and some sources explicitly note the inherent constraints of current hardware, including noisy behaviour. In real terms, this narrows what can be tested and how reliably results can be reproduced."}</p>
          <p>{"Quantum machine learning studies explore whether quantum methods could improve the time or space complexity of some machine learning tasks, and hybrid approaches often send only specific subroutines to a quantum device while keeping the rest of the workflow classical. That is very different from showing that quantum AI already outperforms standard AI across common production workloads. Business-oriented coverage also presents many benefits in future-facing language, which is a clue that the strongest claims are often still conditional."}</p>
          <p>{"There are also optimisation problems inside the models themselves. The research literature on quantum machine learning discusses the barren plateau problem, where training can become difficult in some quantum models because optimisation signals flatten out. This is one reason why promising theory does not always turn into easy implementation."}</p>
          <h2>{"How teams can assess quantum AI opportunities sensibly"}</h2>
          <p>{"A sensible starting point is to look at the business problem before looking at the technology. Quantum AI is still an early-stage field, and the strongest source material describes it as a mix of AI methods, quantum computing, and hybrid quantum-classical workflows rather than a ready-made replacement for normal machine learning. That means teams should first ask whether they have a problem that is genuinely hard under current methods, not just a desire to use a new tool. If the current system already performs well enough with classical computing, there may be little reason to add quantum complexity yet."}</p>
          <p>{"The next screen is fit. The most supportable candidates are workloads linked to optimisation, simulation, or structured search, because quantum computing is often framed as most useful for certain complex problems that are difficult for classical systems. A good evaluation question is simple: does this use case have a clear bottleneck in time, scale, or computational difficulty that might justify trying a quantum approach in the future?"}</p>
          <p>{"If a use case passes that first filter, compare small hybrid experiments against strong classical baselines. This matters because quantum machine learning research includes active skepticism as well as practical experiments, and many current approaches combine classical and quantum processing rather than relying on a pure quantum system. In practice, that means teams should measure whether a pilot improves something concrete, such as runtime, model behaviour, or problem coverage, instead of assuming the word quantum means better results."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-05763cc9-bfe5-4438-ac1d-56cb30e70af4.jpg?alt=media&token=12c3751e-38ab-45e3-b83d-fb94e7fb7f21"
            alt="How teams can assess quantum AI opportunities sensibly"
            caption="How teams can assess quantum AI opportunities sensibly"
            width={1200}
            height={800}
          />
          <h2>{"The practical takeaway for readers today"}</h2>
          <p>{"Quantum artificial intelligence is a real research field, not just a catchy label. The core idea is simple: combine AI methods with quantum computing to explore whether some hard problems can be solved more efficiently than with classical systems alone. But the most useful takeaway today is not that quantum AI has already changed everything. It is that the field is still emerging, quantum computing itself is still in development, and most near-term progress is likely to come from carefully chosen hybrid approaches rather than a full replacement for today\u2019s AI tools."}</p>
          <p>{"First, hybrid is the practical model today: researchers are combining classical AI workflows with quantum hardware and algorithms where it may help. Second, any future advantage is likely to be selective, not universal, with benefits showing up in specific problem types rather than every AI task. A smart next step is to build the fundamentals, stay close to trustworthy updates, and experiment through learning communities and small-scale trials instead of making oversized claims or bets."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-86a51e36-61ea-4a32-8e03-f08657eb968d.jpg?alt=media&token=3c3c5a13-3397-4ef3-886a-eea14bd1a0c1"
            alt="The practical takeaway for readers today"
            caption="The practical takeaway for readers today"
            width={1200}
            height={800}
          />

        <QuoteBlock title="Keep moving forward" variant="orange">
          {"The piece is not about quotations or personalities. Its main point is that quantum AI is a real but early research field, with selective potential rather than broad near-term superiority."}
        </QuoteBlock>

        <MLAITemplateResourceCTA />

      <ArticleReferences
        references={[
          {id: 1, href: "https://www.coursera.org/articles/what-is-quantum-ai", title: "What Is Quantum AI? | Coursera", publisher: "coursera.org", description: "Authoritative reference supporting What Is Quantum AI? | Coursera.", category: "guide"},
          {id: 2, href: "https://www.ibm.com/think/topics/quantum-computing", title: "What Is Quantum Computing? | IBM", publisher: "ibm.com", description: "Authoritative reference supporting What Is Quantum Computing? | IBM.", category: "guide"},
          {id: 3, href: "https://en.wikipedia.org/wiki/Quantum_machine_learning", title: "Quantum machine learning - Wikipedia", publisher: "en.wikipedia.org", description: "Authoritative reference supporting Quantum machine learning - Wikipedia.", category: "guide"},
          {id: 4, href: "https://testrigor.com/blog/what-is-quantum-ai/", title: "What is Quantum AI? - testRigor AI-Based Automated Testing Tool", publisher: "testrigor.com", description: "Authoritative reference supporting What is Quantum AI? - testRigor AI-Based Automated Testing Tool.", category: "guide"},
          {id: 5, href: "https://www.rancholabs.com/post/what-is-quantum-ai-a-beginner-s-guide-to-the-future-of-computing-and-intelligence", title: "What is Quantum AI? A Beginner\u2019s Guide to the Future of Computing and Intelligence", publisher: "rancholabs.com", description: "Authoritative reference supporting What is Quantum AI? A Beginner\u2019s Guide to the Future of Computing and Intelligence.", category: "guide"},
          {id: 6, href: "https://vivatech.com/news/quantum-ai-definitions-and-use-cases", title: "Quantum AI: Use Cases Business Owners Need To Know", publisher: "vivatech.com", description: "Authoritative reference supporting Quantum AI: Use Cases Business Owners Need To Know.", category: "guide"},
          {id: 7, href: "https://www.ibm.com/think/insights/10-ai-dangers-and-risks-and-how-to-manage-them", title: "10 AI dangers and risks and how to manage them | IBM", publisher: "ibm.com", description: "Authoritative reference supporting 10 AI dangers and risks and how to manage them | IBM.", category: "guide"},
          {id: 8, href: "https://www.quantum-australia.com/news/five-reasons-businesses-need-to-start-preparing-for-quantum", title: "Five reasons businesses need to start preparing for quantum \u2014 Quantum Australia", publisher: "quantum-australia.com", description: "Authoritative reference supporting Five reasons businesses need to start preparing for quantum \u2014 Quantum Australia.", category: "guide"},
          {id: 9, href: "https://research.csiro.au/ss/science/projects/quantum-ai/", title: "Quantum AI Pattern Catalogue \u2013 Software Systems", publisher: "research.csiro.au", description: "Authoritative reference supporting Quantum AI Pattern Catalogue \u2013 Software Systems.", category: "guide"},
          {id: 10, href: "https://www.usdsi.org/data-science-insights/quantum-ai-empowering-modern-businesses-in-2026", title: "Quantum-AI: Empowering Modern Businesses in 2026", publisher: "usdsi.org", description: "Authoritative reference supporting Quantum-AI: Empowering Modern Businesses in 2026.", category: "guide"},
        ]}
        heading="Sources & further reading"
      />

        <ArticleDisclaimer />

        <div className="my-12 not-prose">
          <ArticleCompanyCTA
            title="Keep learning with grounded AI discussions"
            body="If you want practical, evidence-led explainers on emerging AI topics, explore the community resources, events, and learning pathways linked with this article."
            buttonText="Explore AI learning resources"
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
