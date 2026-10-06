import type { ReactNode } from "react";
import { Home } from "lucide-react";
import { Link } from "react-router";

import { BASE_ARTICLE_SEO_CONFIG } from "~/articles/seo-config";
import AiOrNotQuiz from "~/components/articles/AiOrNotQuiz";
import ArticleConversionCTA from "~/components/articles/ArticleConversionCTA";
import { ArticleFAQ } from "~/components/articles/ArticleFAQ";
import { ArticleHeroHeader } from "~/components/articles/ArticleHeroHeader";
import { ArticleReferences } from "~/components/articles/ArticleReferences";

export const useCustomHeader = true;

const TOPIC = "What Is Artificial Intelligence in Simple Words?";
export const CATEGORY = "featured";
export const SLUG = "what-is-artificial-intelligence-in-simple-words";
export const DATE_PUBLISHED = "2026-04-18";
export const DATE_MODIFIED = "2026-10-06";
export const DESCRIPTION =
  "Understand AI with everyday examples, a short quiz and a step-by-step look at how it works, where it goes wrong, and what to check before using it.";
const HERO_IMAGE =
  "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-aabcc5ca-e159-4024-b1c7-baf0b68dc947.jpg?alt=media&token=a5c618e2-f10a-4f7a-8bc3-5a0702cf9959";
const ARTICLE_PATH = `/articles/${CATEGORY}/${SLUG}`;
const AUTHOR_URL = "https://www.linkedin.com/in/samueldonegan";

interface FAQ {
  id: number;
  question: string;
  answer: ReactNode;
}

export const faqItems: FAQ[] = [
  {
    id: 1,
    question: "What is artificial intelligence in one sentence?",
    answer: "AI is technology that uses information to work out an answer, make a prediction, or create something, such as a reply or an image.",
  },
  {
    id: 2,
    question: "Is all automation AI?",
    answer: "No. A timer that turns a light on at 7 pm follows a fixed instruction. It doesn't need AI. An app can also use both: AI might suggest a reply, while an ordinary rule stops it being sent until you approve it.",
  },
  {
    id: 3,
    question: "Are AI and machine learning the same thing?",
    answer: "No. AI is the wider field. Machine learning is one way to build it, by finding patterns in examples. A spam filter, for instance, can learn from messages already marked as spam.",
  },
  {
    id: 4,
    question: "What makes generative AI different?",
    answer: "Generative AI creates text, images, audio, video or code. A chatbot drafting an email is one example. A convincing answer can still contain mistakes or made-up details.",
  },
  {
    id: 5,
    question: "Does AI think like a person?",
    answer: "A chatbot can sound like a person, but that doesn't show that it understands or has feelings. You can judge whether its answer is useful without assuming there's a human-like mind behind it.",
  },
  {
    id: 6,
    question: "What should I avoid putting into a public AI chatbot?",
    answer: "Keep other people's personal information and confidential work out of public chatbots. The OAIC advises organisations not to enter personal information, especially sensitive information, into publicly available generative AI tools. Use made-up examples when you're learning.",
  },
];

export const articleMeta = {
  title: TOPIC,
  topic: TOPIC,
  category: CATEGORY,
  slug: SLUG,
  description: DESCRIPTION,
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  image: HERO_IMAGE,
  imageAlt: "Illustrative image of two people",
  featuredFocus: "ai",
};

const REFERENCES = [
  {
    id: 1,
    href: "https://oecd.ai/en/wonk/definition",
    title: "What is AI? Can you make a clear distinction between AI and non-AI systems?",
    publisher: "OECD.AI",
    description: "A closer look at the definition of AI, including machine learning and knowledge-based approaches.",
    category: "guide",
  },
  {
    id: 2,
    href: "https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-the-use-of-commercially-available-ai-products",
    title: "Guidance on privacy and commercially available AI products",
    publisher: "Office of the Australian Information Commissioner",
    description: "What Australian organisations should check before using personal information with AI.",
    category: "government",
  },
  {
    id: 3,
    href: "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence",
    title: "AI RMF: Generative Artificial Intelligence Profile",
    publisher: "US National Institute of Standards and Technology",
    description: "Guidance on risks such as made-up answers, and ways to test AI systems.",
    category: "government",
  },
  {
    id: 4,
    href: "https://www.ai.gov.au/staying-safe-and-responsible/essential-ai-practices/guidance-ai-adoption-implementation-guidance",
    title: "Guidance for AI adoption: implementation guidance",
    publisher: "Australian Government National AI Centre",
    description: "Practical steps for testing AI, managing risks and keeping people responsible for its use.",
    category: "government",
  },
] as const;

export default function ArticleContent() {
  const eventCta = BASE_ARTICLE_SEO_CONFIG[ARTICLE_PATH].conversion;

  return (
    <>
      <ArticleHeroHeader
        breadcrumbs={[
          { label: "Home", href: "/", icon: Home },
          { label: "Articles", href: "/articles" },
          { label: TOPIC, current: true },
        ]}
        title={TOPIC}
        titleHighlight="Artificial Intelligence"
        headerBgColor="cyan"
      />

      <p className="not-prose mb-6 text-sm leading-6 text-gray-700">
        By <a href={AUTHOR_URL} className="font-semibold underline underline-offset-4">Dr Sam Donegan</a>
        {" · "}MLAI{" · "}Updated <time dateTime={DATE_MODIFIED}>6 October 2026</time>
      </p>

      <div className="prose prose-lg prose-slate max-w-none bg-transparent">
        <section aria-labelledby="plain-answer-heading" className="not-prose rounded-3xl bg-[#ff3d00] p-6 text-black sm:p-8">
          <h2 id="plain-answer-heading" className="text-2xl font-bold">The short answer</h2>
          <p className="mt-4 text-lg leading-8">
            Artificial intelligence, or AI, is technology that uses information
            to work out an answer, make a prediction, or create something.
            It helps phones turn speech into text, email services spot spam,
            and chatbots draft replies. Its answers can still be wrong.
          </p>
          <a href="#ai-or-not-heading" className="mt-5 inline-flex rounded-full bg-gray-950 px-5 py-3 text-base font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">
            Test your understanding →
          </a>
        </section>

        <nav aria-label="In this guide" className="not-prose my-6 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold">
          <a href="#everyday-ai" className="underline underline-offset-4">Everyday examples</a>
          <a href="#how-ai-works" className="underline underline-offset-4">How it works</a>
          <a href="#ai-or-not-heading" className="underline underline-offset-4">Try the quiz</a>
          <a href="#check-ai-answers" className="underline underline-offset-4">Check an answer</a>
        </nav>

        <h2 id="everyday-ai">You probably use AI already</h2>
        <p>You don't need a robot or a complicated app to come across AI. Think about:</p>
        <ul>
          <li><strong>Your inbox:</strong> a spam filter spots patterns in messages and decides which look suspicious.</li>
          <li><strong>Your phone:</strong> speech recognition turns what you say into written words.</li>
          <li><strong>Your music app:</strong> a recommendation system suggests songs based on listening patterns.</li>
          <li><strong>A chatbot:</strong> a writing tool drafts a reply from your instructions.</li>
        </ul>
        <p>
          Each does a particular job. Being good at suggesting a song doesn't
          mean a system can give reliable advice about your health or finances.
        </p>

        <h2>What makes it AI?</h2>
        <p>
          A simple timer follows a rule: turn the light on at 7 pm. A spam
          filter has a different task. It has to work out whether a new message
          looks like spam, even if it hasn't seen that exact message before.
        </p>
        <p>
          That step of working out an answer is called <strong>inference</strong>.
          The <a href="https://oecd.ai/en/wonk/definition">OECD's explanation of AI</a>{" "}
          uses this idea to describe systems that make predictions, recommendations,
          decisions or new content from the information they receive.
        </p>
        <p>
          Many AI tools learn patterns from examples. Others use knowledge and
          logic put together by people. An app can combine AI with ordinary
          software, such as a rule that asks you to approve a reply before it's sent.
        </p>

        <h2 id="how-ai-works">How AI works, with one example</h2>
        <p>
          Imagine you run a small online shop and want help sorting customer
          emails. Here's a made-up message and one way an AI tool might handle it.
          This is an illustration, not a result from a tested product.
        </p>

        <ol className="not-prose my-8 grid list-none gap-4 p-0 md:grid-cols-3">
          {[
            { title: "1. A message comes in", term: "Input", text: "“My order arrived, but one of the two mugs is missing. Can you send the other one?”", colour: "bg-[#fefc22]" },
            { title: "2. AI suggests a category", term: "Model and output", text: "The tool suggests “delivery problem” so the message can go to the right person. The model is the part of the tool that works out this suggestion.", colour: "bg-[#00ffd7]" },
            { title: "3. A person checks", term: "Human check", text: "You read the message, check the order and decide what to do. The AI suggestion hasn't checked your stock or sent a replacement.", colour: "bg-purple-100" },
          ].map((step) => (
            <li key={step.title} className={`m-0 rounded-3xl border border-gray-300 p-5 ${step.colour}`}>
              <h3 className="text-xl font-bold text-gray-950">{step.title}</h3>
              <p className="mt-3 text-base leading-7 text-gray-900">{step.text}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-gray-700">{step.term}</p>
            </li>
          ))}
        </ol>

        <h3>What could go wrong?</h3>
        <p>
          The tool might label the message “order not delivered”. That sounds
          close, but the parcel did arrive. Only one mug is missing. If you
          trust the label without reading the email, you could give the customer
          an unhelpful answer about tracking their parcel.
        </p>
        <p>
          You correct the label to “missing item” and check what was packed.
          Keeping a record of mistakes helps you decide whether the tool is
          useful. It doesn't automatically teach the model; someone has to
          decide how those corrections are used.
        </p>

        <h2>AI, machine learning and generative AI: what's the difference?</h2>
        <p>You'll hear these terms together, but they mean different things.</p>
        <dl className="not-prose my-8 space-y-4">
          {[
            { term: "Artificial intelligence", meaning: "The broad field. It includes systems that recognise speech, suggest songs, make predictions or create content.", example: "Example: your phone turning speech into text." },
            { term: "Machine learning", meaning: "One way to build AI: use examples to find patterns, instead of writing an instruction for every possible case.", example: "Example: a spam filter trained on messages people have already labelled." },
            { term: "Generative AI", meaning: "AI that creates text, images, audio, video or code. Today's generative AI tools use machine learning.", example: "Example: a chatbot drafting a product description from your notes." },
          ].map((item) => (
            <div key={item.term} className="rounded-2xl border border-gray-300 bg-white p-5 sm:p-6">
              <dt className="text-xl font-bold text-gray-950">{item.term}</dt>
              <dd className="mt-2 text-base leading-7 text-gray-800">
                <p>{item.meaning}</p>
                <p className="mt-2 text-gray-600">{item.example}</p>
              </dd>
            </div>
          ))}
        </dl>

        <AiOrNotQuiz />

        {eventCta ? <ArticleConversionCTA articleSlug={`${CATEGORY}/${SLUG}`} config={eventCta} events={[]} placement="article-inline" className="my-10" /> : null}

        <h2>What is AI good at?</h2>
        <p>
          AI can help with jobs such as sorting lots of messages, transcribing
          a recording, spotting patterns and getting a first draft on the page.
          It's most useful when you can check whether it did the job well.
        </p>
        <p>
          It can also miss details, repeat unfair patterns in its training data,
          or make up an answer. A confident tone doesn't tell you whether it's
          right. The <a href="https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence">NIST guide to generative AI risks</a>{" "}
          explains why plausible but false answers need attention.
        </p>

        <h2 id="check-ai-answers">Four questions to ask before using an AI answer</h2>
        <ol>
          <li><strong>Is this information okay to share?</strong> Use made-up details while you learn. Keep personal information and confidential work out of public chatbots. The <a href="https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-the-use-of-commercially-available-ai-products">OAIC's privacy guidance</a> explains what organisations should check.</li>
          <li><strong>Can I check the answer?</strong> Look up names, numbers, dates and quotes in the original source. Open any links: a chatbot can invent a reference.</li>
          <li><strong>What happens if it's wrong?</strong> A bad song suggestion is easy to skip. A decision about someone's health, money or job needs much more care and qualified help.</li>
          <li><strong>Who makes the final decision?</strong> Be clear about who checks the work, fixes mistakes and can stop the tool from taking an action.</li>
        </ol>
        <p>
          If you're using AI at work, the <a href="https://www.ai.gov.au/staying-safe-and-responsible/essential-ai-practices/guidance-ai-adoption-implementation-guidance">Australian Government's AI adoption guide</a>{" "}
          goes into more detail on testing tools and deciding who is responsible.
        </p>

        <h2>Try a small task</h2>
        <p>
          Write three made-up customer messages: one asking about opening hours,
          one reporting a missing item, and one asking to change an order. Ask a
          chatbot to sort them by topic and explain its choices. Then read each
          message yourself. Did it miss anything? Would you use its suggestions?
        </p>
        <p>
          This gives you a first look at how a tool behaves. Three examples
          aren't enough to decide whether it's ready for real customers.
        </p>

        <h2>Keep exploring</h2>
        <p>
          For more familiar examples, read <Link to="/articles/featured/what-is-artificial-intelligence-used-for-in-everyday-work-and-life">how AI is used in everyday work and life</Link>.
          If you've heard about tools that take actions for you, our <Link to="/articles/featured/what-is-an-agent-in-artificial-intelligence">guide to AI agents</Link>{" "}
          explains what changes when software can do more than suggest an answer.
        </p>

        <ArticleFAQ items={faqItems} heading="A few common questions" />

        <details className="not-prose my-8 rounded-2xl border border-gray-300 p-5 text-sm leading-6 text-gray-700">
          <summary className="cursor-pointer font-bold text-gray-950">About this guide</summary>
          <p className="mt-3">The shop example and quiz are made up to help explain the ideas. They aren't product tests or a formal assessment. AI tools helped with research, writing and code. The sources below explain the definitions and advice in more detail.</p>
          <p className="mt-3">Published <time dateTime={DATE_PUBLISHED}>18 April 2026</time>. Updated <time dateTime={DATE_MODIFIED}>6 October 2026</time> with simpler explanations, a worked example and clearer next steps.</p>
        </details>

        <ArticleReferences references={[...REFERENCES]} heading="Sources and further reading" description="For a closer look at the ideas in this guide." previewCount={4} />
      </div>
    </>
  );
}
