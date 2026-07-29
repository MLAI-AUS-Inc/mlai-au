import type { ReactNode } from "react";
import { Home } from "lucide-react";
import { Link } from "react-router";

import AiOrNotQuiz from "~/components/articles/AiOrNotQuiz";
import { ArticleFAQ } from "~/components/articles/ArticleFAQ";
import { ArticleHeroHeader } from "~/components/articles/ArticleHeroHeader";
import { ArticleReferences } from "~/components/articles/ArticleReferences";

export const useCustomHeader = true;

const TOPIC = "What Is Artificial Intelligence in Simple Words?";
export const CATEGORY = "featured";
export const SLUG = "what-is-artificial-intelligence-in-simple-words";
export const DATE_PUBLISHED = "2026-04-18";
export const DATE_MODIFIED = "2026-07-28";
export const DESCRIPTION =
  "A plain-English guide to AI, machine learning and generative AI, with an interactive AI-or-not exercise and a practical human-check workflow.";
const HERO_IMAGE =
  "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-aabcc5ca-e159-4024-b1c7-baf0b68dc947.jpg?alt=media&token=a5c618e2-f10a-4f7a-8bc3-5a0702cf9959";
const HERO_IMAGE_ALT =
  "Person using a voice assistant on a smartphone, an everyday example of an AI-enabled interface";

interface FAQ {
  id: number;
  question: string;
  answer: ReactNode;
}

export const faqItems: FAQ[] = [
  {
    id: 1,
    question: "What is artificial intelligence in one sentence?",
    answer:
      "AI is software that infers how to produce an output—such as a prediction, recommendation, decision or piece of content—from the input it receives.",
  },
  {
    id: 2,
    question: "Is all automation AI?",
    answer:
      "No. A fixed timer or an if-this-then-that workflow is automation without AI. A real system can combine fixed automation with an AI model.",
  },
  {
    id: 3,
    question: "Are AI and machine learning the same thing?",
    answer:
      "No. AI is the wider field. Machine learning is one family of methods that builds models from data rather than specifying every relationship by hand.",
  },
  {
    id: 4,
    question: "What makes generative AI different?",
    answer:
      "Generative AI produces new text, images, audio, video or code. Its output can sound convincing while still being wrong, so important claims need independent checks.",
  },
  {
    id: 5,
    question: "Does AI understand or think like a person?",
    answer:
      "Human-like wording is not evidence of human understanding, intention or consciousness. Current systems perform particular kinds of inference within limits set by their design, data and use.",
  },
  {
    id: 6,
    question: "What should I avoid putting into a public AI chatbot?",
    answer:
      "The OAIC recommends that organisations do not put personal information, especially sensitive information, into publicly available generative AI tools. Check the tool, account settings and your obligations before using real data.",
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
  imageAlt: HERO_IMAGE_ALT,
  featuredFocus: "ai",
};

const REFERENCES = [
  {
    id: 1,
    href: "https://oecd.ai/en/wonk/definition",
    title: "What is AI? The updated OECD AI system definition",
    publisher: "OECD.AI",
    description:
      "Definition, inference, objectives, autonomy and the relationship between models and systems.",
    category: "guide",
  },
  {
    id: 2,
    href: "https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-the-use-of-commercially-available-ai-products",
    title: "Guidance on privacy and commercially available AI products",
    publisher: "Office of the Australian Information Commissioner",
    description:
      "Australian privacy, accuracy, transparency and human-oversight considerations.",
    category: "government",
  },
  {
    id: 3,
    href: "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence",
    title: "AI RMF: Generative Artificial Intelligence Profile",
    publisher: "US National Institute of Standards and Technology",
    description:
      "Primary guidance on generative-AI risks, evaluation and confabulation.",
    category: "government",
  },
  {
    id: 4,
    href: "https://www.industry.gov.au/sites/default/files/2025-10/guidance-for-ai-adoption-implementation-practices.pdf",
    title: "Guidance for AI Adoption: Implementation practices",
    publisher: "Australian Government National AI Centre",
    description:
      "Six responsible-AI practices for organisations developing or deploying AI.",
    category: "government",
  },
] as const;

function ExternalSource({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer noopener">
      {children}
    </a>
  );
}

export default function ArticleContent() {
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
        summary={{
          heading: "The short answer",
          intro:
            "AI is not one product or a human mind inside a computer. It is a group of methods and systems that infer outputs from inputs for a particular objective.",
          items: [
            {
              label: "Input",
              description:
                "Text, images, audio, measurements, records or other signals enter a system.",
            },
            {
              label: "Inference",
              description:
                "A model works out how to produce a prediction, recommendation, decision or new content.",
            },
            {
              label: "Human responsibility",
              description:
                "People still choose the purpose, data, checks, permissions and action taken from the output.",
            },
          ],
        }}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      <div className="prose prose-lg prose-slate max-w-none bg-transparent">
        <section
          aria-labelledby="plain-answer-heading"
          className="not-prose my-8 rounded-[28px] border-2 border-gray-950 bg-[#fefc22] p-6 sm:p-8"
        >
          <p className="text-xs font-black uppercase tracking-[0.18em] text-gray-700">
            Plain-English answer
          </p>
          <h2
            id="plain-answer-heading"
            className="mt-3 text-3xl font-black tracking-tight text-gray-950"
          >
            AI uses input to infer an output.
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-900">
            A useful system has a purpose: flag a suspicious payment, recommend
            a song, recognise speech or draft text. It receives input, uses a
            model to infer an output, and passes that output to a person or
            another piece of software. That does not make the system conscious,
            correct or suitable for every use.
          </p>
        </section>

        <h2>What actually counts as AI?</h2>
        <p>
          The{" "}
          <ExternalSource href="https://oecd.ai/en/wonk/definition">
            OECD definition
          </ExternalSource>{" "}
          focuses on a machine-based system that <em>infers</em>, from its
          input, how to generate outputs such as predictions, content,
          recommendations or decisions. “Infers” is the important word: the
          answer is not always a single result typed into the program in
          advance.
        </p>
        <p>
          This definition is broader than machine learning. An AI system may
          use learned models, human-created knowledge and logic, or a
          combination. It may also contain ordinary software around the model:
          forms, databases, fixed safety rules, notifications and human approval
          steps.
        </p>

        <div className="not-prose my-10 grid gap-5 md:grid-cols-2">
          <section className="rounded-[26px] border-2 border-gray-950 bg-white p-6">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#4b1bd1]">
              Fixed instruction
            </p>
            <h3 className="mt-2 text-2xl font-black text-gray-950">
              Humans specify the condition
            </h3>
            <div className="mt-5 rounded-xl bg-gray-950 p-4 font-mono text-sm leading-6 text-white">
              IF invoice_total &gt; $5,000
              <br />
              THEN ask a manager
            </div>
            <p className="mt-4 text-sm leading-6 text-gray-700">
              The same input produces the result dictated by the rule. This is
              conventional automation.
            </p>
          </section>
          <section className="rounded-[26px] border-2 border-gray-950 bg-[#00ffd7] p-6">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-gray-700">
              Model inference
            </p>
            <h3 className="mt-2 text-2xl font-black text-gray-950">
              A model estimates a pattern
            </h3>
            <div className="mt-5 rounded-xl bg-white p-4 font-mono text-sm leading-6 text-gray-950">
              INPUT invoice + history
              <br />
              OUTPUT anomaly score
            </div>
            <p className="mt-4 text-sm leading-6 text-gray-800">
              The output is inferred from the model and input. A fixed rule can
              still require a manager to review a high score.
            </p>
          </section>
        </div>

        <p>
          The boundary is not always visible from the screen. Two products can
          look identical while one uses a fixed lookup and another uses a
          model. Ask what the system is doing, what data it uses and how its
          output is checked—not whether the interface feels “smart”.
        </p>

        <h2>How AI works: one transparent example</h2>
        <p>
          Imagine a small organisation wants help sorting messages sent to a
          shared support inbox. A responsible workflow could look like this:
        </p>

        <ol className="not-prose my-8 grid gap-4 p-0 md:grid-cols-2">
          {[
            {
              number: "1",
              title: "Input",
              text: "A message arrives. Before a pilot, use synthetic examples rather than copying real customer information into a public tool.",
              colour: "bg-[#fefc22]",
            },
            {
              number: "2",
              title: "Model",
              text: "A classifier infers a topic and urgency label. A generative model may draft a summary, but it does not decide the policy.",
              colour: "bg-[#00ffd7]",
            },
            {
              number: "3",
              title: "Output",
              text: "The system proposes a queue, label and draft. The output is a recommendation—not a verified fact or completed action.",
              colour: "bg-orange-100",
            },
            {
              number: "4",
              title: "Human check and action",
              text: "A person verifies sensitive or uncertain messages before replying. The system logs corrections so performance can be reviewed.",
              colour: "bg-purple-100",
            },
          ].map((step) => (
            <li
              key={step.number}
              className={`m-0 list-none rounded-[24px] border border-gray-400 p-5 ${step.colour}`}
            >
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-950 text-sm font-black text-white">
                  {step.number}
                </span>
                <div>
                  <h3 className="m-0 text-xl font-black text-gray-950">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-800">
                    {step.text}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <p>
          This example deliberately separates the model from the whole system.
          The model produces an estimate or draft. The surrounding workflow
          controls permissions, escalation, evaluation and who is accountable
          for the final action.
        </p>

        <h2>AI, machine learning and generative AI are not synonyms</h2>
        <div className="not-prose my-8 overflow-x-auto rounded-2xl border border-gray-300">
          <table className="w-full min-w-[680px] border-collapse bg-white text-left text-sm">
            <thead className="bg-gray-950 text-white">
              <tr>
                <th className="p-4 font-black">Term</th>
                <th className="p-4 font-black">Plain meaning</th>
                <th className="p-4 font-black">Example output</th>
                <th className="p-4 font-black">Common mistake</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-800">
              <tr>
                <th className="p-4 align-top font-black text-gray-950">AI</th>
                <td className="p-4 align-top">
                  The broad family of systems that infer outputs for explicit
                  or implicit objectives.
                </td>
                <td className="p-4 align-top">
                  A prediction, recommendation, decision or content.
                </td>
                <td className="p-4 align-top">
                  Assuming AI always means a chatbot or human-like intelligence.
                </td>
              </tr>
              <tr>
                <th className="p-4 align-top font-black text-gray-950">
                  Machine learning
                </th>
                <td className="p-4 align-top">
                  Methods that develop models from data and examples.
                </td>
                <td className="p-4 align-top">
                  A spam score or demand forecast.
                </td>
                <td className="p-4 align-top">
                  Assuming a learned pattern is automatically fair or causal.
                </td>
              </tr>
              <tr>
                <th className="p-4 align-top font-black text-gray-950">
                  Generative AI
                </th>
                <td className="p-4 align-top">
                  Models designed to generate new text, images, audio, video or
                  code.
                </td>
                <td className="p-4 align-top">
                  A draft, image or software change.
                </td>
                <td className="p-4 align-top">
                  Treating confident or fluent output as verified.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <AiOrNotQuiz />

        <h2>What AI is good at—and why context still matters</h2>
        <p>
          AI can be useful when a task contains repeatable patterns and the
          output can be evaluated: sorting a large queue, transcribing speech,
          finding candidates for review, forecasting within known conditions or
          drafting a first version. Performance on one task does not prove
          competence on another.
        </p>
        <p>
          Risk also depends on use. A poor movie recommendation is annoying. A
          wrong output about someone’s health, employment, credit or identity
          can cause serious harm. The Australian Government’s responsible-AI
          guidance therefore treats testing, risk management, transparency and
          human oversight as system practices, not decorative statements added
          after launch.
        </p>

        <h2>Four checks before you use an AI output</h2>
        <div className="not-prose my-8 grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "1. Check the input",
              text: "Do you have permission to use the data? Remove information the task does not need. For public generative tools, follow OAIC privacy guidance.",
            },
            {
              title: "2. Check the claim",
              text: "Verify names, numbers, dates, quotations and links against the original source. A generated citation may not exist.",
            },
            {
              title: "3. Check the consequence",
              text: "The greater the impact on a person, the stronger the evaluation, explanation, appeal and human control should be.",
            },
            {
              title: "4. Check the workflow",
              text: "Decide who reviews exceptions, how corrections are recorded and when the system should stop rather than guess.",
            },
          ].map((check) => (
            <section
              key={check.title}
              className="rounded-[22px] border border-gray-300 bg-white p-5"
            >
              <h3 className="m-0 text-lg font-black text-gray-950">
                {check.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-700">
                {check.text}
              </p>
            </section>
          ))}
        </div>

        <aside className="not-prose my-10 rounded-[28px] bg-gray-950 p-6 text-white sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00ffd7]">
            Method, limitations and disclosure
          </p>
          <h2 className="mt-3 text-2xl font-black">
            What this guide did—and did not—test
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-200">
            <li>
              <strong className="text-white">Source method:</strong> the
              definition and safety sections use OECD, OAIC, NIST and Australian
              Government primary guidance, checked 28 July 2026.
            </li>
            <li>
              <strong className="text-white">Original asset:</strong> MLAI
              created the eight-scenario exercise and the support-inbox system
              walkthrough for this page.
            </li>
            <li>
              <strong className="text-white">Limit:</strong> MLAI has not yet run
              the planned beginner comprehension study, so this revision does
              not claim that the explanation has been validated with readers.
            </li>
            <li>
              <strong className="text-white">AI assistance:</strong> this July
              2026 revision used AI-assisted research, drafting and code
              generation. Source links and limitations are exposed so a human
              editor can verify the work before declaring the page final.
            </li>
          </ul>
        </aside>

        <h2>Where to go next</h2>
        <p>
          To understand systems that can choose and perform steps, read{" "}
          <Link to="/articles/featured/what-is-an-agent-in-artificial-intelligence">
            what an AI agent is
          </Link>
          . To separate current tools from claims about broad human-level
          capability, read MLAI’s{" "}
          <Link to="/articles/featured/what-is-general-artificial-intelligence-and-why-it-matters">
            guide to artificial general intelligence
          </Link>
          . If you have a real workflow in mind, write down its input, desired
          output, human decision and success measure before choosing a model.
        </p>

        <ArticleReferences
          references={[...REFERENCES]}
          heading="Primary sources and further reading"
          description="Definitions and guidance used for this 28 July 2026 revision."
          previewCount={4}
        />

        <div className="mt-12">
          <ArticleFAQ items={faqItems} heading="Beginner questions about AI" />
        </div>
      </div>
    </>
  );
}
