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

const TOPIC = "How Long Has Artificial Intelligence Been Around?"
export const CATEGORY = "featured"
export const SLUG = "the-history-of-ai-how-long-has-artificial-intelligence-been-around"
export const DATE_PUBLISHED = "2026-03-23"
export const DATE_MODIFIED = "2026-03-23"
export const DESCRIPTION = "Curious how long artificial intelligence has been around? Explore the complete history of AI, from Alan Turing's early theories to today's public tools."
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-fdc01a21-ea6e-4770-ac88-15744149f3d8.jpg?alt=media&token=b993880b-71c9-4891-a021-bb7b32c13658"
const HERO_IMAGE_ALT = "How Long Has Artificial Intelligence Been Around?"
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
  { id: 1, question: "How old is artificial intelligence if you include its earliest roots?", answer: "If you include the deeper ideas behind machine reasoning and early computing, AI's roots extend into the first half of the 20th century. As a named academic discipline, it is usually traced to 1956." },
  { id: 2, question: "Why is 1956 considered such an important date in AI history?", answer: "The 1956 Dartmouth workshop is widely treated as the formal starting point of AI because it gave the field a name and a clearer research agenda. It marked a shift from scattered ideas to a more defined discipline." },
  { id: 3, question: "What was Alan Turing's role in the history of AI?", answer: "Alan Turing helped establish the early theoretical basis for AI through his 1950 paper \"Computing Machinery and Intelligence.\" He also introduced the imitation game, later known as the Turing Test, as a way to discuss machine intelligence." },
  { id: 4, question: "What were the AI winters?", answer: "AI winters were periods when funding, confidence, and public excitement dropped after early expectations proved too ambitious for available technology. Major winters are commonly associated with the 1970s and the late 1980s." },
  { id: 5, question: "Did AI exist before tools like ChatGPT?", answer: "Yes. AI had been used for decades in research, business systems, and consumer technology before modern generative AI became widely known. The recent boom made AI more visible, but it did not create the field from scratch." },
]

export const summaryHighlights = {
  heading: "Key facts: How Long Has Artificial Intelligence Been Around?",
  intro: "Curious how long artificial intelligence has been around? Explore the complete history of AI, from Alan Turing's early theories to today's public tools.",
  items: [
    { label: "When was artificial intelligence founded?", description: "Artificial intelligence is usually dated as a formal academic field to 1956, at the Dartmouth Summer Research Project on Artificial Intelligence. Its intellectual roots reach back earlier into computing, mathematics, and machine reasoning." },
    { label: "Who is the founder of AI?", description: "There is no single uncontested founder of AI. John McCarthy is often credited because he coined the term at Dartmouth, while Alan Turing, Marvin Minsky, Claude Shannon, and others are also treated as key pioneers." },
    { label: "When did AI come out to the public?", description: "AI influenced public technology for years behind the scenes, but it became more visible in consumer products during the 2010s. It reached broad mainstream attention with generative AI tools in the early 2020s." },
  ],
}

export const articleMeta = {
  title: "How Long Has Artificial Intelligence Been Around?",
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
  { question: "When was artificial intelligence founded?", answer: "Artificial intelligence is usually dated as a formal academic field to 1956, at the Dartmouth Summer Research Project on Artificial Intelligence. Its intellectual roots reach back earlier into computing, mathematics, and machine reasoning." },
  { question: "Who is the founder of AI?", answer: "There is no single uncontested founder of AI. John McCarthy is often credited because he coined the term at Dartmouth, while Alan Turing, Marvin Minsky, Claude Shannon, and others are also treated as key pioneers." },
  { question: "When did AI come out to the public?", answer: "AI influenced public technology for years behind the scenes, but it became more visible in consumer products during the 2010s. It reached broad mainstream attention with generative AI tools in the early 2020s." },
  { question: "How old is artificial intelligence if you include its earliest roots?", answer: "If you include the deeper ideas behind machine reasoning and early computing, AI's roots extend into the first half of the 20th century. As a named academic discipline, it is usually traced to 1956." },
  { question: "Why is 1956 considered such an important date in AI history?", answer: "The 1956 Dartmouth workshop is widely treated as the formal starting point of AI because it gave the field a name and a clearer research agenda. It marked a shift from scattered ideas to a more defined discipline." },
  { question: "What was Alan Turing's role in the history of AI?", answer: "Alan Turing helped establish the early theoretical basis for AI through his 1950 paper \"Computing Machinery and Intelligence.\" He also introduced the imitation game, later known as the Turing Test, as a way to discuss machine intelligence." },
  { question: "What were the AI winters?", answer: "AI winters were periods when funding, confidence, and public excitement dropped after early expectations proved too ambitious for available technology. Major winters are commonly associated with the 1970s and the late 1980s." },
  { question: "Did AI exist before tools like ChatGPT?", answer: "Yes. AI had been used for decades in research, business systems, and consumer technology before modern generative AI became widely known. The recent boom made AI more visible, but it did not create the field from scratch." },
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
        <p><strong>{TOPIC}</strong> — {"Artificial intelligence can seem new because it has entered everyday life so quickly. That recent visibility, however, is not the same as a recent origin. The question \"how long has artificial intelligence been around\" has a longer answer than many people expect, because the field grew over decades rather than appearing all at once."}</p>
        <p>{"Most broad histories place AI as a formal field in the 1950s, but its roots reach further back into early computing, mathematics, and ideas about machine reasoning in the first half of the 20th century. Some overviews also connect its modern development to work that accelerated around and after World War II. So the short answer is that artificial intelligence has been around for many decades, while the deeper intellectual foundations are even older. Today's machine learning boom is best understood as the latest chapter in a long story of theory, experiments, breakthroughs, disappointments, and renewed progress."}</p>
        <p>{"In practice, the Decades-Long Journey of Artificial Intelligence works best when the section stays specific about what changes first, why it matters, and how the reader can apply the idea without filler."}</p>
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="Curious how long artificial intelligence has been around? Explore the complete history of AI, from Alan Turing's early theories to today's public tools."
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
          {"Artificial intelligence is usually dated as a formal academic field to 1956, at the Dartmouth Summer Research Project on Artificial Intelligence. Its intellectual roots reach back earlier into computing, mathematics, and machine reasoning."}
        </QuoteBlock>
          <h2>{"Alan Turing and the Theoretical Foundations of AI"}</h2>
          <p>{"If you ask how long artificial intelligence has been around as a serious intellectual project, Alan Turing is one of the clearest early reference points. In 1950, Turing published \"Computing Machinery and Intelligence,\" a paper that brought the question of machine intelligence into formal academic debate. That shift mattered. It turned AI from a vague idea in fiction and philosophy into something researchers could discuss, challenge, and eventually try to build."}</p>
          <p>{"Turing is also closely linked to the imitation game, which later became widely known as the Turing Test. What it did do was set an early standard for observable performance. That is why Turing still matters in the history of AI: he gave the field both a practical starting point and a philosophical tension that remains unresolved. Even now, many debates about AI still come back to the same core question Turing raised: is intelligence something a system is, or something it can convincingly do?"}</p>
          <p>{"In practice, alan Turing and the Theoretical Foundations of AI works best when the section stays specific about what changes first, why it matters, and how the reader can apply the idea without filler."}</p>
          <p>{"The goal is to keep alan Turing and the Theoretical Foundations of AI concrete enough to guide action, while still tying each detail back to the main point of the section."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-8c87ffb8-c1dc-4ba3-b366-410c1b12ceea.jpg?alt=media&token=25cb17f8-e836-4b57-ba8b-4fd6868dd957"
            alt="Alan Turing and the Theoretical Foundations of AI"
            caption="Alan Turing and the Theoretical Foundations of AI"
            width={1200}
            height={800}
          />
          <h2>{"When Was Artificial Intelligence Officially Founded?"}</h2>
          <p>{"If the question is when artificial intelligence became an official academic field, the usual answer is 1956. That year, a small group of researchers gathered for the Dartmouth Summer Research Project on Artificial Intelligence, a workshop that is widely treated as the formal starting point of AI as a named discipline. Earlier ideas about machine intelligence already existed, but Dartmouth gave the field a clearer identity and a shared research agenda."}</p>
          <p>{"People had been imagining artificial or mechanical minds long before 1956, and early computing work in the 1940s and 1950s helped make those ideas more practical. When people ask how long artificial intelligence has been around, historians of the field often use this event as the cleanest official milestone."}</p>
          <p>{"A practical way to think about when was artificial intelligence officially founded? is through Why the Dartmouth meeting is seen as the starting point."}</p>
          <p>{"In practice, when Was Artificial Intelligence Officially Founded works best when the section stays specific about what changes first, why it matters, and how the reader can apply the idea without filler."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-3d3cf716-b669-4f6b-a1ba-d5ecbd6c6607.jpg?alt=media&token=6c29c927-f7b9-442a-9d91-823765c77959"
            alt="When Was Artificial Intelligence Officially Founded?"
            caption="When Was Artificial Intelligence Officially Founded?"
            width={1200}
            height={800}
          />
          <h3>{"Why the Dartmouth meeting is seen as the starting point"}</h3>
          <p>{"The Dartmouth project is especially important because it is where the term artificial intelligence is commonly credited as being coined by John McCarthy. The event is also linked with several figures who are often described as early founders or defining pioneers of AI, including McCarthy, Marvin Minsky, Claude Shannon, and Nathaniel Rochester. Their work helped frame the idea that aspects of human intelligence might be described so clearly that a machine could simulate them."}</p>
          <p>{"So the shortest accurate answer is: artificial intelligence as an official field is usually dated to 1956, even though its intellectual roots go back earlier."}</p>

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
            "Alan Turing and the Theoretical Foundations of AI",
            "When Was Artificial Intelligence Officially Founded?",
            "Navigating the AI Winters and Technological Resurgence",
            "When Did AI Come Out to the Public?",
            "Learning From AI's History to Navigate the Future",
          ]}
          accent="indigo"
        />
          <h2>{"Navigating the AI Winters and Technological Resurgence"}</h2>
          <p>{"Artificial intelligence has been around for a long time, but its history is not a smooth story of constant progress. Standard histories of the field describe periods called \u201cAI winters,\u201d when funding, media attention, and confidence fell sharply. One major winter is usually linked to the 1970s, after early optimism from the 1950s and 1960s ran into slower real-world results. These winters matter because they show that AI did not simply keep advancing in a straight line from its early research era to today."}</p>
          <p>{"Researchers, governments, and companies became excited by what AI might achieve, but the available technology often could not support those ambitions. Early computers had limited processing power and memory compared with what later AI systems would need. Some early programs looked impressive in controlled settings, yet they struggled with messy real-world problems. In that sense, the AI winters were not signs that the whole idea of artificial intelligence had disappeared. They were signs that the field had reached the limits of the tools and methods available at the time."}</p>
          <p>{"One important revival was driven by expert systems, which aimed to capture specialist knowledge in rules that software could follow. Better hardware made it possible to train and run more demanding models, while improved methods helped AI move beyond some earlier bottlenecks. So, when people ask how long artificial intelligence has been around, the honest answer includes these boom-and-bust cycles: AI has existed for decades, but its path has been shaped by repeated setbacks as well as renewed momentum."}</p>
          <h2>{"When Did AI Come Out to the Public?"}</h2>
          <p>{"Artificial intelligence did not arrive all at once as a public product. The field has been around for decades, with many histories tracing it back to early 20th-century ideas and major research work from the 1940s and 1950s onward. For a long time, though, most people did not interact with AI directly."}</p>
          <p>{"People used systems shaped by machine intelligence without always calling them AI. As several history overviews note, the promise of AI had existed for many years, but practical technology only started to catch up in more recent decades."}</p>
          <p>{"Around the same period, businesses also began using AI more openly for operational and decision-support tasks, which made the technology feel less like a research topic and more like a mainstream tool."}</p>
          <p>{"The clearest mass-public moment came with the recent generative AI boom. So if the question is when AI became publicly available, the most accurate answer is: it had been influencing public technology for years, became more visible in consumer products during the 2010s, and reached broad mainstream attention with generative AI in the early 2020s."}</p>
          <p>{"In practice, when Did AI Come Out to the Public works best when the section stays specific about what changes first, why it matters, and how the reader can apply the idea without filler."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-4651fec4-4ab4-4a7c-835e-b8c22567b670.jpg?alt=media&token=e74fc29c-e886-47b4-b359-fc2bc223531e"
            alt="When Did AI Come Out to the Public?"
            caption="When Did AI Come Out to the Public?"
            width={1200}
            height={800}
          />
          <h2>{"Learning From AI's History to Navigate the Future"}</h2>
          <p>{"So, how long has artificial intelligence been around? In practical terms, the field took shape in the 1950s, even though some ideas and early thinking appeared earlier. Since then, AI has moved through long cycles of optimism, setbacks, and renewed progress. Recent years have felt especially fast, but that speed sits on top of decades of research, engineering, and experimentation. Looking at that longer timeline makes modern AI easier to judge with a clear head."}</p>
          <p>{"That history is useful because it helps people separate short-term hype from lasting value. AI has always carried big promises, but real progress tends to come when technology becomes reliable enough to solve practical problems. For businesses and professionals, that means focusing less on buzzwords and more on useful outcomes such as saving time, improving operations, and helping people do better work. For the MLAI community, the next step is simple: keep learning, test tools carefully, and discuss real-world use cases with others. A strong understanding of AI's past is one of the best guides for making smarter decisions about its future."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-22415261-83f1-4284-8461-59981af83021.jpg?alt=media&token=13bbfbbd-4f27-4e62-89d6-ad92b4bb3199"
            alt="Learning From AI's History to Navigate the Future"
            caption="Learning From AI's History to Navigate the Future"
            width={1200}
            height={800}
          />

        <QuoteBlock title="Keep moving forward" variant="orange">
          {"AI influenced public technology for years behind the scenes, but it became more visible in consumer products during the 2010s. It reached broad mainstream attention with generative AI tools in the early 2020s."}
        </QuoteBlock>

        <MLAITemplateResourceCTA />

      <ArticleReferences
        references={[
          {id: 1, href: "https://en.wikipedia.org/wiki/History_of_artificial_intelligence", title: "History of artificial intelligence - Wikipedia", publisher: "en.wikipedia.org", description: "Authoritative reference supporting History of artificial intelligence - Wikipedia.", category: "guide"},
          {id: 2, href: "https://www.coursera.org/articles/history-of-ai", title: "The History of AI: A Timeline of Artificial Intelligence | Coursera", publisher: "coursera.org", description: "Authoritative reference supporting The History of AI: A Timeline of Artificial Intelligence | Coursera.", category: "guide"},
          {id: 3, href: "https://www.deloitte.com/mt/en/services/consulting/perspectives/mt-age-of-ai-1-a-brief-history.html", title: "The Age of Artificial Intelligence: A brief history...", publisher: "deloitte.com", description: "Authoritative reference supporting The Age of Artificial Intelligence: A brief history....", category: "guide"},
          {id: 4, href: "https://nexthink.com/blog/the-history-of-ai-in-the-workplace", title: "The History of AI in the Digital Workplace | Nexthink", publisher: "nexthink.com", description: "Authoritative reference supporting The History of AI in the Digital Workplace | Nexthink.", category: "guide"},
          {id: 5, href: "https://swisscyberinstitute.com/blog/history-artificial-intelligence/", title: "The History of Artificial Intelligence: A Timeline from Turing to Today", publisher: "swisscyberinstitute.com", description: "Authoritative reference supporting The History of Artificial Intelligence: A Timeline from Turing to Today.", category: "guide"},
          {id: 6, href: "https://kenaninstitute.unc.edu/kenan-insight/artificial-intelligence-for-small-business-development-are-you-ready/", title: "Artificial Intelligence for Small Business Development: Are You Ready? - Frank Hawkins Kenan Institute of Private Enterprise", publisher: "kenaninstitute.unc.edu", description: "Authoritative reference supporting Artificial Intelligence for Small Business Development: Are You Ready? - Frank Hawkins Kenan Institute of Private Enterprise.", category: "guide"},
          {id: 7, href: "https://ourworldindata.org/brief-history-of-ai", title: "The brief history of artificial intelligence: the world has changed fast \u2014 what might be next? - Our World in Data", publisher: "ourworldindata.org", description: "Authoritative reference supporting The brief history of artificial intelligence: the world has changed fast \u2014 what might be next? - Our World in Data.", category: "guide"},
          {id: 8, href: "https://www.bighuman.com/blog/history-of-artificial-intelligence", title: "How Long Has AI Been Around: The History of AI from 1920 to 2026 | Big Human", publisher: "bighuman.com", description: "Authoritative reference supporting How Long Has AI Been Around: The History of AI from 1920 to 2026 | Big Human.", category: "guide"},
          {id: 9, href: "https://www.ibm.com/think/topics/history-of-artificial-intelligence", title: "The History of Artificial Intelligence | IBM", publisher: "ibm.com", description: "Authoritative reference supporting The History of Artificial Intelligence | IBM.", category: "guide"},
        ]}
        heading="Sources & further reading"
      />

        <ArticleDisclaimer />

        <div className="my-12 not-prose">
          <ArticleCompanyCTA
            title="Explore practical AI beyond the hype"
            body="Use AI's history as context for better decisions today. Review practical resources, real-world use cases, and learning paths for applying AI more carefully and effectively."
            buttonText="Explore AI resources"
            buttonHref="/ai-careers-learning"
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
