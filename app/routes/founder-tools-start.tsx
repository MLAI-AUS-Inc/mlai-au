import {
  ArrowRightIcon,
  ChartBarSquareIcon,
  CircleStackIcon,
  DocumentTextIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/outline";
import { Link, redirect } from "react-router";

import type { Route } from "./+types/founder-tools-start";

const PAGE_URL = "https://mlai.au/founder-tools/start";
const DESCRIPTION =
  "Explore MLAI Founder Tools for evidence-based investor updates, marketing workflows and a shared company profile.";

export const meta: Route.MetaFunction = () => [
  { title: "MLAI Founder Tools | Start With Your Company Evidence" },
  { name: "description", content: DESCRIPTION },
  { name: "robots", content: "index, follow, max-image-preview:large" },
  { tagName: "link", rel: "canonical", href: PAGE_URL },
  { property: "og:type", content: "website" },
  { property: "og:title", content: "MLAI Founder Tools" },
  { property: "og:description", content: DESCRIPTION },
  { property: "og:url", content: PAGE_URL },
];

export function loader({ request }: Route.LoaderArgs) {
  if (new URL(request.url).pathname !== "/founder-tools/start") {
    throw redirect("/founder-tools/start", 301);
  }

  return null;
}

const PRODUCTS = [
  {
    name: "Vibe Raising",
    description:
      "Turn real milestones, metrics, risks and asks into a clear monthly founder update before you raise.",
    icon: DocumentTextIcon,
    accent: "bg-[#4b1bd1] text-white",
    action: "See Vibe Raising",
    href: "/vibe-raising",
    publicPreview: true,
  },
  {
    name: "Vibe Marketing",
    description:
      "Use your approved company evidence to research topics, prepare useful content and monitor published performance.",
    icon: MegaphoneIcon,
    accent: "bg-[#00ffd7] text-gray-950",
    action: "Open Vibe Marketing",
    href: "/founder-tools/marketing",
    publicPreview: false,
  },
  {
    name: "Shared company profile",
    description:
      "Maintain one company profile and approved data-source context across Founder Tools instead of re-entering it in every workflow.",
    icon: CircleStackIcon,
    accent: "bg-[#fefc22] text-gray-950",
    action: "Set up your company",
    href: "/founder-tools",
    publicPreview: false,
  },
];

export default function FounderToolsStart() {
  return (
    <main className="min-h-screen bg-[var(--brutalist-beige)] px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <section className="overflow-hidden rounded-[38px] bg-gray-950 px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-16">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fefc22]">
            MLAI Founder Tools
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
            Start with evidence your company can stand behind.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Founder Tools helps Australian founders organise company context, publish
            consistent investor updates and create marketing from approved evidence.
            Creating or opening a workspace requires an MLAI account.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/founder-tools"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#fefc22] px-6 py-3 text-sm font-black text-gray-950 transition hover:bg-yellow-300"
            >
              Create or open Founder Tools
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              to="/vibe-raising"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-black text-white transition hover:bg-white/10"
            >
              Preview Vibe Raising first
            </Link>
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-3" aria-labelledby="founder-products-heading">
          <h2 id="founder-products-heading" className="sr-only">
            Founder Tools products
          </h2>
          {PRODUCTS.map((product) => {
            const Icon = product.icon;
            return (
              <article
                key={product.name}
                className="flex flex-col rounded-[30px] border border-gray-300 bg-white p-6 text-gray-950 sm:p-8"
              >
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${product.accent}`}>
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-2xl font-black tracking-tight">{product.name}</h3>
                <p className="mt-3 flex-1 leading-7 text-gray-600">{product.description}</p>
                <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-gray-400">
                  {product.publicPreview ? "Public preview available" : "Account required"}
                </p>
                <Link
                  to={product.href}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#4b1bd1] underline decoration-2 underline-offset-4"
                >
                  {product.action}
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </article>
            );
          })}
        </section>

        <section className="mt-8 grid gap-6 rounded-[34px] bg-[#ff3d00] p-7 text-white sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
              <ChartBarSquareIcon className="h-6 w-6" />
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-tight">
              Need the AI system built as well?
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-white/85">
              Founder Tools helps organise and communicate the evidence. MLAI Studio
              is the separate route for scoping and building agents, workflows,
              automations, integrations and MVPs.
            </p>
          </div>
          <Link
            to="/mlai-studio/start-project"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-black text-gray-950 transition hover:bg-gray-100"
          >
            Start a Studio project brief →
          </Link>
        </section>
      </div>
    </main>
  );
}
