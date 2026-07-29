import { Link, redirect } from "react-router";

import MlaiStudioProjectForm from "~/components/MlaiStudioProjectForm";
import type { Route } from "./+types/mlai-studio.start-project";

const PAGE_URL = "https://mlai.au/mlai-studio/start-project";
const DESCRIPTION =
  "Brief MLAI Studio on an AI harness, workflow, agent, automation, integration or MVP your team needs built.";

export const meta: Route.MetaFunction = () => [
  { title: "Start an AI Project With MLAI Studio | MLAI" },
  { name: "description", content: DESCRIPTION },
  { name: "robots", content: "index, follow, max-image-preview:large" },
  { tagName: "link", rel: "canonical", href: PAGE_URL },
  { property: "og:type", content: "website" },
  { property: "og:title", content: "Start an AI Project With MLAI Studio" },
  { property: "og:description", content: DESCRIPTION },
  { property: "og:url", content: PAGE_URL },
];

export function loader({ request }: Route.LoaderArgs) {
  if (new URL(request.url).pathname !== "/mlai-studio/start-project") {
    throw redirect("/mlai-studio/start-project", 301);
  }

  return null;
}

const PROJECT_TYPES = [
  "AI agents and multi-step workflows",
  "Internal harnesses and automations",
  "Data and software integrations",
  "AI-enabled MVPs and prototypes",
  "Evaluation, guardrails and human approval",
  "Production handover and documentation",
];

export default function MlaiStudioStartProject() {
  return (
    <main className="min-h-screen bg-[var(--brutalist-beige)] px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <section className="overflow-hidden rounded-[36px] bg-gray-950 px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-14">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#00ffd7]">
            MLAI Studio for organisations
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
            Start with the outcome. We’ll help scope the AI system.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Use this brief when you need an AI harness, workflow, agent, automation,
            integration or MVP built. A human from MLAI reviews every complete brief
            before discussing scope or matching a builder.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECT_TYPES.map((projectType) => (
              <div
                key={projectType}
                className="rounded-2xl border border-white/15 bg-white/5 p-4 text-sm font-bold text-gray-100"
              >
                {projectType}
              </div>
            ))}
          </div>
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <section className="rounded-[32px] border border-gray-300 bg-white p-6 sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#4b1bd1]">
              Project brief
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950">
              Give us enough context to assess the work
            </h2>
            <p className="mt-3 mb-8 max-w-2xl leading-7 text-gray-600">
              You do not need a technical specification. Clear constraints and a
              measurable outcome are more useful than naming a model or framework.
            </p>
            <MlaiStudioProjectForm />
          </section>

          <aside className="space-y-5">
            <section className="rounded-[28px] bg-[#fefc22] p-6 text-gray-950">
              <h2 className="text-xl font-black">What happens next</h2>
              <ol className="mt-4 space-y-4 text-sm leading-6">
                <li><strong>1. Review:</strong> MLAI checks fit, constraints and missing information.</li>
                <li><strong>2. Scope:</strong> We clarify deliverables, ownership, evaluation and handover.</li>
                <li><strong>3. Match:</strong> If suitable, MLAI proposes builders and a project approach.</li>
              </ol>
            </section>
            <section className="rounded-[28px] border border-gray-300 bg-white p-6 text-gray-950">
              <h2 className="text-xl font-black">Looking for paid project work?</h2>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                The builder application is a separate process for people who want
                to deliver Studio projects.
              </p>
              <Link
                to="/mlai-studio#apply"
                className="mt-5 inline-flex text-sm font-black text-[#4b1bd1] underline decoration-2 underline-offset-4"
              >
                Apply as a builder →
              </Link>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
