import type { Route } from "./+types/watt-the-hack.resources";
import { redirect, useLoaderData } from "react-router";
import ReactMarkdown from "react-markdown";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { getCurrentUser } from "~/lib/auth";
import { getEnv } from "~/lib/env.server";
import { getGenericResources, type GenericHackathonResource } from "~/lib/generic-hackathon";
import { wattClasses } from "~/lib/watt-theme";

const FALLBACK_RESOURCES: GenericHackathonResource[] = [
  {
    id: -1,
    title: "Submission Guide",
    summary: "Submit a title, summary, and links that make the project easy to evaluate.",
    body: "Include the problem, who it helps, what you built, and how judges can try it. Repository, demo, and slide links are all optional but useful.",
    category: "Getting Started",
    order: 10,
  },
  {
    id: -2,
    title: "Team Formation",
    summary: "Create a team or join one with its team code.",
    body: "You need to belong to a team before submitting. A team can have up to six members.",
    category: "Getting Started",
    order: 20,
  },
  {
    id: -3,
    title: "Judging Criteria",
    summary: "Projects should be clear, useful, credible, and demonstrable.",
    body: "Focus on a well-defined problem, practical execution, impact, and a demo or evidence that the project works.",
    category: "Judging",
    order: 30,
  },
];

export async function loader({ request, context }: Route.LoaderArgs) {
  const env = getEnv(context);
  let user = null;
  try {
    user = await getCurrentUser(env, request);
  } catch (error) {
    console.warn("Treating Watt The Hack auth lookup failure as logged out.", error);
  }
  if (!user) {
    throw redirect("/platform/login?app=watt-the-hack&next=/watt-the-hack/resources");
  }
  const resources = await getGenericResources(env, request).catch(() => []);
  return { resources: resources.length > 0 ? resources : FALLBACK_RESOURCES };
}

export default function WattTheHackResources() {
  const { resources } = useLoaderData<typeof loader>();
  const grouped = resources.reduce<Record<string, GenericHackathonResource[]>>((acc, resource) => {
    const category = resource.category || "General";
    acc[category] = acc[category] || [];
    acc[category].push(resource);
    return acc;
  }, {});

  return (
    <div className={wattClasses.page}>
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <p className={wattClasses.eyebrow}>Resources</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-[#20231d]">Watt The Hack Resources</h1>
          <p className="mt-3 max-w-2xl text-[#6f756c]">
            Guides, references, and challenge material for participants.
          </p>
        </div>

        {Object.entries(grouped).map(([category, items]) => (
          <section key={category} className="space-y-4">
            <h2 className="text-xl font-black text-[#20231d]">{category}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {items.map((resource) => (
                <article key={resource.id} className={`${wattClasses.panel} p-6`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="text-lg font-black text-[#20231d]">{resource.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#6f756c]">{resource.summary}</p>
                    </div>
                    {resource.url && (
                      <a href={resource.url} target="_blank" rel="noopener noreferrer" className="shrink-0 rounded-full border border-[#c9dbb8] bg-[#dfead1] p-2 text-[#1f5b2c] transition hover:bg-[#b8d86b]">
                        <span className="sr-only">Open {resource.title}</span>
                        <ArrowTopRightOnSquareIcon className="h-5 w-5" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                  {resource.body && (
                    <div className="prose prose-sm mt-4 max-w-none text-[#394033] prose-a:text-[#1f5b2c] prose-strong:text-[#20231d]">
                      <ReactMarkdown>{resource.body}</ReactMarkdown>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
