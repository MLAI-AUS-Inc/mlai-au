import type { Route } from "./+types/kindness";
import KindnessPage from "~/components/kindness/KindnessPage";
import { meta as page } from "~/data/kindness";
import tokensCss from "~/styles/kindness/tokens.css?url";
import shellCss from "~/styles/kindness/shell.css?url";
import heroCss from "~/styles/kindness/hero.css?url";
import winCrewCss from "~/styles/kindness/win-crew.css?url";
import doBriefsCss from "~/styles/kindness/do-briefs.css?url";
import hopInCss from "~/styles/kindness/hop-in.css?url";
import faqWhyCss from "~/styles/kindness/faq-why.css?url";
import closingCss from "~/styles/kindness/closing.css?url";
import questCss from "~/styles/kindness/quest.css?url";

export function meta({}: Route.MetaArgs) {
  return [
    { title: page.title },
    { name: "description", content: page.description },
    { property: "og:title", content: page.title },
    { property: "og:description", content: page.description },
    { property: "og:type", content: "website" },
    { property: "og:image", content: page.image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: page.imageAlt },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: page.title },
    { name: "twitter:description", content: page.description },
    { name: "twitter:image", content: page.image },
    { name: "theme-color", content: page.themeColor },
  ];
}

// Route-scoped styles: tokens and shell first, then one file per section.
export const links: Route.LinksFunction = () => [
  ...[tokensCss, shellCss, heroCss, winCrewCss, doBriefsCss, hopInCss, faqWhyCss, closingCss, questCss].map(href => ({
    rel: "stylesheet",
    href,
  })),
  { rel: "preload", as: "image", href: "/kindness/grain.webp", type: "image/webp" },
  { rel: "preload", as: "image", href: "/kindness/wordmark.webp", type: "image/webp", fetchPriority: "high" },
  { rel: "preload", as: "image", href: "/kindness/roo-bust.webp", type: "image/webp" },
];

export default function KindnessRoute() {
  return <KindnessPage />;
}
