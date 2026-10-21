// Isolated process: a happy-dom document stands in for the browser so the real
// ArticleEnhancer can run against server-rendered article markup after
// hydration. Nothing here touches the network, the worker or real articles.
import { Window } from "happy-dom";

const browser = new Window({ url: "https://mlai.au/articles/featured/example" });
for (const key of Object.getOwnPropertyNames(browser)) {
  if (key in globalThis) continue;
  try {
    Object.defineProperty(globalThis, key, {
      configurable: true,
      writable: true,
      value: (browser as unknown as Record<string, unknown>)[key],
    });
  } catch {
    // A few window accessors cannot be copied; React does not need them.
  }
}
Object.assign(globalThis, { window: browser, document: browser.document, IS_REACT_ACT_ENVIRONMENT: true });

const consoleErrors: string[] = [];
console.error = (...args: unknown[]) => {
  consoleErrors.push(args.map(String).join(" "));
};

// React DOM decides whether it can use the DOM when it is first evaluated, so
// it must be imported after the globals above exist.
const { act } = await import("react");
const { renderToString } = await import("react-dom/server");
const { hydrateRoot } = await import("react-dom/client");
const { ArticleEnhancer } = await import("../../app/components/articles/ArticleEnhancer");
const { ArticleTocPlaceholder } = await import("../../app/components/articles/ArticleTocPlaceholder");
const { ArticleHydrationCommit, ArticleHydrationScope } = await import("../../app/components/articles/ArticleHydration");

type Item = { href: string; label: string };

const ITEMS: Item[] = [
  { href: "#choose-a-workflow", label: "Choose a workflow" },
  { href: "#write-the-prompt", label: "Write the prompt" },
];

function Article({ items, enableToc }: { items?: Item[]; enableToc: boolean }) {
  return (
    <ArticleHydrationScope>
      <div id="example-content">
        <ArticleEnhancer articleTitle="Example" contentSelector="#example-content" enableToc={enableToc} />
        <div data-article-content>
          <ArticleHydrationCommit>
            <ArticleTocPlaceholder className="bg-transparent" items={items} />
            <h2 id="choose-a-workflow">Choose a workflow</h2>
            <p>First section.</p>
            <h3>A detail</h3>
            <h2 id="write-the-prompt">Write the prompt</h2>
            <p>Second section.</p>
          </ArticleHydrationCommit>
        </div>
      </div>
    </ArticleHydrationScope>
  );
}

function snapshot(container: Element) {
  const navs = [...container.querySelectorAll('nav[aria-label="Table of contents"]')];
  const placeholder = container.querySelector("[data-article-toc-placeholder]");
  const hrefs = navs.flatMap((nav) => [...nav.querySelectorAll("a")].map((link) => link.getAttribute("href") ?? ""));
  return {
    navCount: navs.length,
    hrefs,
    unresolvedHrefs: hrefs.filter((href) => !href.startsWith("#") || !container.querySelector(`[id="${href.slice(1)}"]`)),
    placeholderChildCount: placeholder?.children.length ?? null,
    placeholderHiddenWhenEmpty: placeholder?.className.split(/\s+/).includes("empty:hidden") ?? null,
    serverRenderedMarker: placeholder?.getAttribute("data-article-toc-server-rendered") ?? null,
    headingIds: [...container.querySelectorAll("h2")].map((heading) => heading.id),
  };
}

async function scenario(name: string, props: { items?: Item[]; enableToc: boolean }) {
  consoleErrors.length = 0;
  const container = document.createElement("div");
  document.body.replaceChildren(container);
  const tree = <Article {...props} />;
  container.innerHTML = renderToString(tree);
  const server = snapshot(container);
  const recoverableErrors: string[] = [];
  let root: ReturnType<typeof hydrateRoot> | undefined;
  await act(async () => {
    root = hydrateRoot(container, tree, { onRecoverableError: (error) => recoverableErrors.push(String(error)) });
  });
  // Let the enhancer's effect, its MutationObserver callbacks and any portal settle.
  for (let pass = 0; pass < 5; pass += 1) {
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  }
  const hydrated = snapshot(container);
  await act(async () => root?.unmount());
  return { name, server, hydrated, errors: [...recoverableErrors, ...consoleErrors] };
}

const results = [
  await scenario("server-rendered entries", { items: ITEMS, enableToc: true }),
  await scenario("server-rendered entries with the client contents list switched off", { items: ITEMS, enableToc: false }),
  await scenario("legacy empty slot", { enableToc: true }),
  await scenario("legacy empty slot with the client contents list switched off", { enableToc: false }),
];
console.log(JSON.stringify(results));
await browser.happyDOM.close();
