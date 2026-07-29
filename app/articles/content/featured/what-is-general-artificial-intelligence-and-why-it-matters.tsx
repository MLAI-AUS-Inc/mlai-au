import type { ReactNode } from "react";
import { Home } from "lucide-react";
import { Link } from "react-router";

import AgiClaimEvaluator from "~/components/articles/AgiClaimEvaluator";
import { ArticleFAQ } from "~/components/articles/ArticleFAQ";
import { ArticleHeroHeader } from "~/components/articles/ArticleHeroHeader";
import { ArticleReferences } from "~/components/articles/ArticleReferences";

export const useCustomHeader = true;

const TOPIC =
  "What Is General Artificial Intelligence? An Evidence Guide to AGI";
export const CATEGORY = "featured";
export const SLUG =
  "what-is-general-artificial-intelligence-and-why-it-matters";
export const DATE_PUBLISHED = "2026-04-12";
export const DATE_MODIFIED = "2026-07-28";
export const DESCRIPTION =
  "A plain-English guide to artificial general intelligence, how AGI definitions differ, and an interactive worksheet for testing AGI claims against real evidence.";
const HERO_IMAGE =
  "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-6929c81e-098b-48a5-8302-f26c732f8c65.jpg?alt=media&token=cf84b2aa-8393-44a0-a444-257dae974703";
const HERO_IMAGE_ALT =
  "Two people comparing evidence and definitions for artificial general intelligence";

interface FAQ {
  id: number;
  question: string;
  answer: ReactNode;
}

export const faqItems: FAQ[] = [
  {
    id: 1,
    question: "What does AGI stand for?",
    answer:
      "AGI usually stands for artificial general intelligence. “General artificial intelligence” is a common word-order variation, but artificial general intelligence is the standard expansion used by the sources in this guide.",
  },
  {
    id: 2,
    question: "Is general-purpose AI the same as AGI?",
    answer:
      "No. General-purpose AI can perform a wide variety of tasks, but that does not establish human-level breadth, transfer, reliability or autonomy. The International AI Safety Report uses general-purpose AI for present systems without treating the term as proof of AGI.",
  },
  {
    id: 3,
    question: "Has AGI been achieved?",
    answer:
      "There is no shared operational definition or single external test that settles that question for every researcher and organisation. A responsible claim must name its definition and evidence instead of presenting a disputed label as a universal fact.",
  },
  {
    id: 4,
    question: "Does passing one benchmark prove AGI?",
    answer:
      "No. A benchmark samples particular capabilities under particular conditions. Useful evidence also reports task breadth, novelty, baselines, repeated trials, failures, assistance, contamination risks and independent replication.",
  },
  {
    id: 5,
    question: "Is an autonomous AI agent necessarily AGI?",
    answer:
      "No. Autonomy describes how independently a system pursues goals or performs actions. Generality describes the breadth of capability. A narrowly capable system can be highly autonomous, while a broad model can still require frequent human direction.",
  },
  {
    id: 6,
    question: "What should Australian teams do about AGI now?",
    answer:
      "Make decisions using the capabilities and risks of the system being deployed today. Define the use case, test it, assign accountability, keep appropriate human control and document limitations rather than relying on an AGI label or forecast.",
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
    href: "https://deepmind.google/research/publications/66938/",
    title: "Levels of AGI for Operationalizing Progress on the Path to AGI",
    publisher: "Google DeepMind, ICML 2024",
    description:
      "Research framework separating breadth or generality, performance depth and deployment factors such as autonomy and risk.",
    category: "analysis",
  },
  {
    id: 2,
    href: "https://openai.com/charter/",
    title: "OpenAI Charter",
    publisher: "OpenAI",
    description:
      "An organisation-specific AGI definition centred on highly autonomous systems and economically valuable work.",
    category: "industry",
  },
  {
    id: 3,
    href: "https://internationalaisafetyreport.org/publication/2026-report-executive-summary",
    title: "International AI Safety Report 2026: Executive Summary",
    publisher: "International AI Safety Report",
    description:
      "Independent expert synthesis on current general-purpose AI capabilities, risks and uncertainty about progress.",
    category: "analysis",
  },
  {
    id: 4,
    href: "https://oecd.ai/en/ai-publications/explanatory-memorandum-on-the-updated-oecd-definition-of-an-ai-system",
    title: "Explanatory memorandum on the updated definition of an AI system",
    publisher: "OECD.AI",
    description:
      "Policy definition of an AI system, useful for separating the broad category of AI from claims about AGI.",
    category: "government",
  },
  {
    id: 5,
    href: "https://arcprize.org/media/ARC_AGI_3_Technical_Report.pdf",
    title: "ARC-AGI-3: A New Challenge for Frontier Agentic Intelligence",
    publisher: "ARC Prize Foundation, 2026",
    description:
      "Technical report for an interactive benchmark focused on adaptation to novel environments, including its stated scope and results.",
    category: "analysis",
  },
  {
    id: 6,
    href: "https://www.ai.gov.au/staying-safe-and-responsible/essential-ai-practices/guidance-ai-adoption-foundations",
    title: "Guidance for AI adoption: foundations",
    publisher: "Australian Government National AI Centre",
    description:
      "Current Australian guidance on accountability, risk, transparency, testing and appropriate human control.",
    category: "government",
  },
] as const;

function DefinitionRow({
  term,
  source,
  meaning,
  doesNotEstablish,
}: {
  term: string;
  source: string;
  meaning: string;
  doesNotEstablish: string;
}) {
  return (
    <tr>
      <th className="p-4 align-top font-black text-gray-950">{term}</th>
      <td className="p-4 align-top">{source}</td>
      <td className="p-4 align-top">{meaning}</td>
      <td className="p-4 align-top">{doesNotEstablish}</td>
    </tr>
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
        titleHighlight="Artificial General Intelligence"
        headerBgColor="cyan"
        summary={{
          heading: "The short answer",
          intro:
            "AGI is a proposed threshold for broad machine intelligence—not a synonym for a chatbot, agent or general-purpose model.",
          items: [
            {
              label: "Definition first",
              description:
                "Different organisations set different thresholds. A claim is meaningless until it names the definition.",
            },
            {
              label: "Evidence across dimensions",
              description:
                "Breadth, depth, transfer, reliability and test conditions matter more than a single headline score.",
            },
            {
              label: "Act on present systems",
              description:
                "Australian teams still need use-case governance, testing and human control whether or not a vendor uses the AGI label.",
            },
          ],
        }}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      <div className="prose prose-lg prose-slate max-w-none bg-transparent">
        <section
          aria-labelledby="agi-direct-answer"
          className="not-prose my-8 rounded-[28px] border-2 border-gray-950 bg-[#fefc22] p-6 sm:p-8"
        >
          <p className="text-xs font-black uppercase tracking-[0.18em] text-gray-700">
            Direct answer
          </p>
          <h2
            id="agi-direct-answer"
            className="mt-3 text-3xl font-black tracking-tight text-gray-950"
          >
            AGI means broad capability—but the threshold is disputed.
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-900">
            Artificial general intelligence usually describes a proposed AI
            system with strong capability across a wide range of cognitive
            tasks, including unfamiliar ones. There is no single operational
            definition accepted by every lab, researcher and government. That
            is why “this is AGI” is a claim to evaluate, not a self-proving
            product category.
          </p>
        </section>

        <p>
          A terminology note matters here: <strong>AGI</strong> conventionally
          expands to <strong>artificial general intelligence</strong>.
          “General artificial intelligence” is a common word-order variation
          and the search phrase used in this page’s original title. Both usually
          point to the same debate.
        </p>

        <h2>Four terms that should not be collapsed into one</h2>
        <p>
          The clearest way through the hype is to separate the category of
          system, the breadth of its uses, the proposed capability threshold
          and the way it operates.
        </p>

        <div className="not-prose my-8 overflow-x-auto rounded-2xl border border-gray-300">
          <table className="w-full min-w-[940px] border-collapse bg-white text-left text-sm">
            <thead className="bg-gray-950 text-white">
              <tr>
                <th className="p-4 font-black">Term</th>
                <th className="p-4 font-black">Source or lens</th>
                <th className="p-4 font-black">What it means here</th>
                <th className="p-4 font-black">What the label does not prove</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-800">
              <DefinitionRow
                term="AI system"
                source="OECD policy definition"
                meaning="A machine-based system that infers how to produce outputs such as predictions, content, recommendations or decisions."
                doesNotEstablish="Human-level ability, broad competence or autonomy."
              />
              <DefinitionRow
                term="General-purpose AI"
                source="International AI Safety Report 2026"
                meaning="Models and systems able to perform a wide variety of tasks."
                doesNotEstablish="That performance is human-level, reliable across every domain or AGI."
              />
              <DefinitionRow
                term="AGI"
                source="OpenAI Charter"
                meaning="OpenAI’s threshold refers to highly autonomous systems outperforming humans at most economically valuable work."
                doesNotEstablish="Industry-wide agreement; it is one influential organisation’s definition."
              />
              <DefinitionRow
                term="Levels of AGI"
                source="Google DeepMind research framework"
                meaning="A proposed classification using performance depth and capability breadth, considered separately from autonomy and deployment risk."
                doesNotEstablish="That a single benchmark result fixes a system’s level across all tasks."
              />
              <DefinitionRow
                term="AI agent"
                source="System-design lens"
                meaning="A system that can select and perform steps toward a goal with some degree of independence."
                doesNotEstablish="Generality: a narrow agent may still act autonomously inside one workflow."
              />
            </tbody>
          </table>
        </div>

        <p>
          These definitions answer different questions. The OECD definition
          helps policy makers decide what counts as an AI system. The 2026
          International AI Safety Report discusses the capabilities and risks
          of today’s most capable <em>general-purpose</em> systems. OpenAI’s
          Charter states a mission-specific AGI threshold. DeepMind’s framework
          tries to make progress more measurable by separating breadth from
          performance. None should be silently substituted for another.
        </p>

        <h2>What evidence would make an AGI claim meaningful?</h2>
        <p>
          Start with <strong>breadth</strong>: which materially different tasks
          and domains are represented? A model completing code, prose and
          questions through the same text interface may be broadly useful, but
          the test still needs to show what population of human work those tasks
          represent.
        </p>
        <p>
          Then ask about <strong>depth</strong>: compared with whom, at what
          performance level and with what reliability? “Human-level” could mean
          an untrained participant, a typical worker or a domain expert. Average
          performance can also hide catastrophic failures that matter in a real
          deployment.
        </p>
        <p>
          Finally, look for <strong>transfer and adaptation</strong>. An
          important test uses unfamiliar, held-out problems and discloses what
          training, prompting, tools, examples and human intervention were
          allowed. Otherwise a result may measure preparation for a test rather
          than the ability to acquire a new skill.
        </p>

        <AgiClaimEvaluator />

        <h2>Why one benchmark cannot settle the question</h2>
        <p>
          A benchmark is an instrument, not a verdict. It samples particular
          abilities using a particular interface, dataset, scoring rule and
          budget. Strong performance can be genuine progress while still
          leaving other definitions of AGI unresolved.
        </p>
        <p>
          ARC-AGI is a useful example because its designers deliberately focus
          on skill acquisition and novel problems rather than accumulated
          knowledge. The 2026 ARC-AGI-3 technical report introduces interactive
          environments that require exploration, goal inference and planning.
          It reports that humans in its study solved all tested environments
          while evaluated frontier systems scored below one per cent as of
          March 2026. That is evidence about those systems on that benchmark
          under its protocol—not a universal measurement of every component of
          intelligence.
        </p>

        <h3>Minimum questions for any benchmark headline</h3>
        <ol>
          <li>
            Was the task set held out, and how was possible training-data
            exposure investigated?
          </li>
          <li>
            Which prompts, tools, memory, retries, time and human help were
            allowed?
          </li>
          <li>
            Is the reported result an average, best run or selected
            demonstration?
          </li>
          <li>
            What do humans score under comparable time, information and
            interface conditions?
          </li>
          <li>
            Which failure modes, costs and safety constraints disappear from
            the headline number?
          </li>
          <li>
            Can independent evaluators reproduce the protocol and challenge the
            conclusion?
          </li>
        </ol>

        <h2>What can be said responsibly in July 2026?</h2>
        <p>
          The International AI Safety Report 2026 says general-purpose AI
          capabilities have continued to improve, including through techniques
          applied after initial training. It also describes several plausible
          paths to 2030: progress could slow, continue at recent rates or
          accelerate. That range is a useful antidote to treating one forecast
          as settled fact.
        </p>
        <p>
          This guide therefore does not declare that a particular product is or
          is not AGI for every possible definition. It makes a narrower claim:
          no shared label removes the need to define the threshold, publish the
          test conditions and examine contrary evidence. An organisation may
          announce that its own threshold has been reached while independent
          researchers reasonably reject the definition or evidence.
        </p>

        <div className="not-prose my-8 grid gap-4 md:grid-cols-2">
          <section className="rounded-[24px] border border-gray-300 bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-800">
              Responsible statement
            </p>
            <p className="mt-3 text-base font-black leading-7 text-gray-950">
              “Under definition D and protocol P, the system exceeded baseline
              B on these task groups; these failures and open questions remain.”
            </p>
          </section>
          <section className="rounded-[24px] border border-gray-300 bg-orange-100 p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-orange-900">
              Weak statement
            </p>
            <p className="mt-3 text-base font-black leading-7 text-gray-950">
              “It reasoned in our demo, so AGI is here.”
            </p>
          </section>
        </div>

        <h2>What this means for an Australian builder today</h2>
        <p>
          A team does not need an AGI forecast to make a useful AI decision.
          Start with a real workflow, accountable owner, permitted data,
          measurable outcome and human intervention point. Test the system that
          will actually be deployed, including predictable failures, rather
          than borrowing a frontier-model headline.
        </p>
        <p>
          The Australian Government National AI Centre’s current foundations
          guidance recommends accountability, risk management, transparency and
          human control appropriate to the use. Those controls follow from what
          the system does and whom it affects—not from whether marketing calls
          it AI, an agent or AGI.
        </p>
        <ul>
          <li>
            Learn the basic distinction first in MLAI’s{" "}
            <Link to="/articles/featured/what-is-artificial-intelligence-in-simple-words">
              plain-English guide to AI
            </Link>
            .
          </li>
          <li>
            If the system takes actions, map its boundaries using the guide to{" "}
            <Link to="/articles/featured/what-is-an-agent-in-artificial-intelligence">
              AI agents
            </Link>
            .
          </li>
          <li>
            Bring disputed claims and methods to an{" "}
            <Link to="/events">MLAI event</Link> for discussion with the
            Australian community.
          </li>
          <li>
            When you have a defined workflow and success measure, scope the
            practical system through{" "}
            <Link to="/mlai-studio/start-project">MLAI Studio</Link>.
          </li>
        </ul>

        <aside className="not-prose my-10 rounded-[28px] bg-gray-950 p-6 text-white sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00ffd7]">
            Method, limitations and disclosure
          </p>
          <h2 className="mt-3 text-2xl font-black">
            This page evaluates claims; it does not certify AGI
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-200">
            <li>
              <strong className="text-white">Source method:</strong> definitions,
              capability statements and Australian governance handoffs were
              checked against the linked primary or official sources on 28 July
              2026.
            </li>
            <li>
              <strong className="text-white">Original asset:</strong> MLAI built
              the eight-part claim evaluator and definition matrix for this
              revision. The worksheet does not submit or save its contents.
            </li>
            <li>
              <strong className="text-white">Limit:</strong> the framework is a
              reading aid, not a validated scientific scale. Its score measures
              disclosure completeness, not intelligence.
            </li>
            <li>
              <strong className="text-white">Review gate:</strong> MLAI has not
              yet run the planned Australian expert roundtable on contested AGI
              definitions. A named human subject reviewer is still required
              before this article is declared final or scored 80+.
            </li>
            <li>
              <strong className="text-white">AI assistance:</strong> this July
              2026 revision used AI-assisted research, drafting and code
              generation. Links, distinctions and attributed claims were
              checked against the sources listed below.
            </li>
          </ul>
        </aside>

        <ArticleReferences
          references={[...REFERENCES]}
          heading="Primary definitions and evidence"
          description="Sources checked for this 28 July 2026 revision."
          previewCount={4}
        />

        <div className="mt-12">
          <ArticleFAQ items={faqItems} heading="AGI questions, answered carefully" />
        </div>
      </div>
    </>
  );
}
