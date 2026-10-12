import { useContext } from "react";
import {
  isRouteErrorResponse,
  Meta,
  UNSAFE_FrameworkContext,
  type MetaDescriptor,
  type MetaFunction,
  type UNSAFE_RouteModules,
} from "react-router";
import { isPrivateSearchPath } from "./response-indexing-policy";

const SITE_DESCRIPTION =
  "MLAI is a not-for-profit community based in Australia that aims to empower the Australian AI Community";
const SITE_IMAGE =
  "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/MLAI-Logo.png?alt=media&token=9d844530-e3b5-4944-a1c7-5be3112d5d84";

function value(descriptor: MetaDescriptor | undefined, key: string): unknown {
  return descriptor && key in descriptor ? (descriptor as Record<string, unknown>)[key] : undefined;
}

function isRobots(descriptor: MetaDescriptor) {
  return String(value(descriptor, "name") ?? "").toLowerCase() === "robots";
}

function isCanonical(descriptor: MetaDescriptor) {
  return value(descriptor, "tagName") === "link" && String(value(descriptor, "rel")).toLowerCase() === "canonical";
}

function robotsDirective(descriptors: MetaDescriptor[], excluded: boolean) {
  const tokens = descriptors.filter(isRobots).flatMap(descriptor =>
    String(value(descriptor, "content") ?? "").toLowerCase().split(",").map(token => token.trim()).filter(Boolean),
  );
  if (tokens.includes("none")) tokens.push("noindex", "nofollow");
  if (tokens.includes("all")) tokens.push("index", "follow");
  if (excluded) tokens.push("noindex", "nofollow");
  if (!tokens.length) tokens.push("index", "follow");
  return [...new Set(tokens)].filter(token =>
    token !== "all" && token !== "none" &&
    !(token === "index" && tokens.includes("noindex")) &&
    !(token === "follow" && tokens.includes("nofollow")),
  ).join(", ");
}

/**
 * A route's own title, description, social data and schema remain authoritative.
 * Public review notices may retain an explicit self-canonical, but receive no
 * default canonical. Private documents and error documents have no canonical.
 */
export function applyDocumentMetadataPolicy(
  routeMetadata: MetaDescriptor[],
  { pathname, error }: { pathname: string; error?: unknown },
): MetaDescriptor[] {
  const hasError = error != null;
  const privateDocument = isPrivateSearchPath(pathname);
  const robots = robotsDirective(routeMetadata, hasError || privateDocument);
  const noindex = robots.split(",").some(value => value.trim() === "noindex");
  const declaredCanonical = routeMetadata.filter(isCanonical).at(-1);
  const canonicalPath = pathname.replace(/\/+$/, "") || "/";
  const canonical = !hasError && !privateDocument
    ? declaredCanonical ?? (!noindex ? { tagName: "link", rel: "canonical", href: `https://mlai.au${canonicalPath}` } : undefined)
    : undefined;

  let metadata = routeMetadata.filter(descriptor => !isRobots(descriptor) && !isCanonical(descriptor));
  if (hasError) {
    const notFound = isRouteErrorResponse(error) && error.status === 404;
    metadata = metadata.filter(descriptor =>
      !("title" in descriptor) && value(descriptor, "name") !== "description" &&
      !("script:ld+json" in descriptor) &&
      !String(value(descriptor, "property") ?? "").startsWith("og:") &&
      !String(value(descriptor, "property") ?? "").startsWith("article:") &&
      !String(value(descriptor, "name") ?? "").startsWith("twitter:"),
    );
    metadata.push(
      { title: notFound ? "Page Not Found | MLAI" : "Page Error | MLAI" },
      { name: "description", content: notFound ? "The requested page could not be found." : "This page is currently unavailable." },
    );
  } else if (privateDocument) {
    metadata = metadata.filter(descriptor => value(descriptor, "property") !== "og:url");
  }

  const addDefault = (descriptor: MetaDescriptor, key: "name" | "property" | "title") => {
    if (!metadata.some(existing => key === "title" ? "title" in existing : value(existing, key) === value(descriptor, key))) {
      metadata.push(descriptor);
    }
  };
  addDefault({ title: "MLAI" }, "title");
  addDefault({ name: "description", content: SITE_DESCRIPTION }, "name");
  addDefault({ name: "author", content: "MLAI Aus Inc." }, "name");
  const title = String(value(metadata.find(descriptor => "title" in descriptor), "title") ?? "MLAI");
  const description = String(value(metadata.find(descriptor => value(descriptor, "name") === "description"), "content") ?? SITE_DESCRIPTION);
  addDefault({ property: "og:title", content: title }, "property");
  addDefault({ property: "og:description", content: description }, "property");
  addDefault({ property: "og:type", content: "website" }, "property");
  if (!metadata.some(descriptor => value(descriptor, "property") === "og:image")) {
    metadata.push(
      { property: "og:image", content: SITE_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "MLAI Logo, a Kangaroo wearing sunglasses" },
    );
  }
  if (canonical) {
    metadata.push(canonical);
    addDefault({ property: "og:url", content: String(value(canonical, "href")) }, "property");
  }
  metadata.push({ name: "robots", content: robots });
  return metadata;
}

/**
 * React Router's public Meta API selects the deepest active route's descriptor
 * list. FrameworkContext is an exported UNSAFE API: scope an immutable copy to
 * Meta, rather than reimplementing its route/error selection or tag renderer.
 * The original route modules are never changed. Router/render regression tests
 * cover this dependency, including routes with absent/empty metadata and errors.
 */
export function DocumentMeta() {
  const framework = useContext(UNSAFE_FrameworkContext);
  if (!framework) throw new Error("DocumentMeta requires the React Router framework context");
  // Lazy navigation adds modules to this registry in place. Rebuild on each
  // render so new leaf exports participate even when its object identity stays.
  const routeModules = Object.fromEntries(
    Object.entries(framework.routeModules).map(([id, routeModule]) => {
      if (!routeModule) return [id, routeModule];
      const originalMeta = routeModule.meta;
      const meta: MetaFunction = args => {
        const inheritedMetadata = args.matches.slice(0, -1).at(-1)?.meta ?? [];
        const routeMetadata = typeof originalMeta === "function" ? originalMeta(args) ?? [] : Array.isArray(originalMeta) ? originalMeta : inheritedMetadata;
        return applyDocumentMetadataPolicy(routeMetadata, { pathname: args.location.pathname, error: args.error });
      };
      return [id, { ...routeModule, meta }];
    }),
  ) as UNSAFE_RouteModules;

  return (
    <UNSAFE_FrameworkContext.Provider value={{ ...framework, routeModules }}>
      <Meta />
    </UNSAFE_FrameworkContext.Provider>
  );
}
