import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";

import type {
  ArticleConversionConfig,
  ArticleConversionType,
} from "~/articles/seo-config";
import {
  trackArticleCtaClick,
} from "~/lib/article-conversions";
import type { Event } from "~/lib/events";

import UpcomingEventsCTA from "./UpcomingEventsCTA";

type ConversionContent = {
  title: string;
  body: string;
  button: string;
  destination: string;
  background: string;
  foreground: string;
  buttonClass: string;
};

const CONTENT: Record<ArticleConversionType, ConversionContent> = {
  events: {
    title: "Meet Australia’s AI community",
    body: "Join practical talks, workshops, build sessions and community events in person or online.",
    button: "Browse upcoming events",
    destination: "/events",
    background: "bg-[#4b1bd1]",
    foreground: "text-white",
    buttonClass: "bg-[#ff3d00] text-white hover:bg-[#e93700]",
  },
  "studio-builder": {
    title: "Build real AI systems with MLAI Studio",
    body: "Work on scoped, paid startup projects spanning AI agents, workflows, integrations, automations and MVPs.",
    button: "Apply to the builder pool",
    destination: "/mlai-studio#apply",
    background: "bg-[#00ffd7]",
    foreground: "text-gray-950",
    buttonClass: "bg-gray-950 text-white hover:bg-black",
  },
  "studio-project": {
    title: "Need an AI workflow, harness or agent built?",
    body: "Tell MLAI Studio what outcome you need, what systems are involved and how success should be measured.",
    button: "Start a Studio project brief",
    destination: "/mlai-studio/start-project",
    background: "bg-[#ff3d00]",
    foreground: "text-white",
    buttonClass: "bg-white text-gray-950 hover:bg-gray-100",
  },
  "founder-tools": {
    title: "Turn founder evidence into momentum",
    body: "Use MLAI Founder Tools to organise company evidence, create investor updates and build search-ready marketing.",
    button: "Explore Founder Tools",
    destination: "/founder-tools/start",
    background: "bg-gray-950",
    foreground: "text-white",
    buttonClass: "bg-[#fefc22] text-gray-950 hover:bg-yellow-300",
  },
  "vibe-raising": {
    title: "Build investor trust before you raise",
    body: "Use Vibe Raising to turn real milestones, metrics, risks and asks into a clear monthly founder update.",
    button: "Explore Vibe Raising",
    destination: "/vibe-raising",
    background: "bg-[#4b1bd1]",
    foreground: "text-white",
    buttonClass: "bg-[#00ffd7] text-gray-950 hover:bg-teal-200",
  },
};

function trackedClick(
  articleSlug: string,
  ctaType: ArticleConversionType,
  destination: string,
  version: string,
  placement: "article-bottom" | "article-secondary",
) {
  return () => {
    trackArticleCtaClick({
      articleSlug,
      ctaType,
      placement,
      destination,
      version,
    });
  };
}

function SecondaryConversion({
  articleSlug,
  type,
  version,
}: {
  articleSlug: string;
  type: ArticleConversionType;
  version: string;
}) {
  const content = CONTENT[type];

  return (
    <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-gray-300 bg-white/70 p-5 text-gray-950 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-black">{content.title}</p>
        <p className="mt-1 text-sm text-gray-600">{content.body}</p>
      </div>
      <Link
        to={content.destination}
        onClick={trackedClick(
          articleSlug,
          type,
          content.destination,
          version,
          "article-secondary",
        )}
        className="inline-flex shrink-0 items-center gap-2 text-sm font-black text-[#4b1bd1] underline decoration-2 underline-offset-4"
      >
        {content.button}
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </div>
  );
}

export default function ArticleConversionCTA({
  articleSlug,
  config,
  events,
  className = "",
}: {
  articleSlug: string;
  config: ArticleConversionConfig;
  events: Event[];
  className?: string;
}) {
  const version = config.version ?? "article-conversion-v1";
  const primary = CONTENT[config.primary];

  if (config.primary === "events") {
    return (
      <div className={className}>
        <UpcomingEventsCTA
          events={events}
          maxEvents={3}
          onCtaClick={(destination) => {
            trackArticleCtaClick({
              articleSlug,
              ctaType: "events",
              placement: "article-bottom",
              destination,
              version,
            });
          }}
        />
        {config.secondary ? (
          <SecondaryConversion
            articleSlug={articleSlug}
            type={config.secondary}
            version={version}
          />
        ) : null}
      </div>
    );
  }

  return (
    <section
      data-article-conversion={config.primary}
      className={`overflow-hidden rounded-[32px] p-7 shadow-[0_25px_80px_-35px_rgba(0,0,0,0.55)] sm:p-10 ${primary.background} ${primary.foreground} ${className}`}
    >
      <p className="text-xs font-black uppercase tracking-[0.2em] opacity-70">
        A practical next step with MLAI
      </p>
      <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">
        {primary.title}
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-7 opacity-85 sm:text-lg">
        {primary.body}
      </p>
      <Link
        to={primary.destination}
        onClick={trackedClick(
          articleSlug,
          config.primary,
          primary.destination,
          version,
          "article-bottom",
        )}
        className={`mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-black transition ${primary.buttonClass}`}
      >
        {primary.button}
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
      {config.secondary ? (
        <SecondaryConversion
          articleSlug={articleSlug}
          type={config.secondary}
          version={version}
        />
      ) : null}
    </section>
  );
}
