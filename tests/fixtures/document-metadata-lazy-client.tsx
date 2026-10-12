import { createRoot } from "react-dom/client";
import { createMemoryRouter, Link, Outlet, RouterProvider, UNSAFE_FrameworkContext, useLocation } from "react-router";
import { DocumentMeta } from "../../app/lib/document-metadata";

const modules: Record<string, any> = {};
const originalRegistry = modules;
const framework = {
  routeModules: modules, isSpaMode: false, manifest: { routes: {} }, future: {}, ssr: true,
  routeDiscovery: { mode: "initial" },
} as any;
function Root() {
  // The real root Layout subscribes to location and retains its mounted head.
  useLocation();
  return <><DocumentMeta /><nav>
    <Link id="home-link" to="/">Home</Link>
    <Link id="login-link" to="/platform/login">Login</Link>
    <Link id="directory-link" to="/articles?page=2">Directory page 2</Link>
  </nav><Outlet /></>;
}
modules.root = { default: Root, meta: () => [{ title: "MLAI" }] };
modules.home = { default: () => <main>Public home</main>, meta: () => [{ title: "Home | MLAI" }] };
const router = createMemoryRouter([{ id: "root", path: "/", Component: Root, children: [
  { id: "home", index: true, Component: modules.home.default },
  { id: "login", path: "platform/login", lazy: async () => {
    const Component = () => <main>Lazy login content</main>;
    modules.login = { default: Component, meta: () => [{ title: "Sign In to the MLAI Platform | MLAI" }, { name: "robots", content: "noindex, nofollow" }] };
    return { Component };
  } },
  { id: "directory", path: "articles", lazy: async () => {
    const Component = () => <main>Lazy article directory</main>;
    modules.directory = { default: Component, meta: ({ data }: any) => [{ title: `Articles – Page ${data.page} | MLAI` }, { tagName: "link", rel: "canonical", href: `https://mlai.au/articles?page=${data.page}` }] };
    return { Component, loader: ({ request }: any) => ({ page: Number(new URL(request.url).searchParams.get("page")) }) };
  } },
] }], { initialEntries: ["/"] });
(window as any).metadataFixture = {
  registryIdentityStable: () => framework.routeModules === originalRegistry,
  moduleIds: () => Object.keys(modules),
};
createRoot(document.getElementById("fixture")!).render(
  <UNSAFE_FrameworkContext.Provider value={framework}><RouterProvider router={router} /></UNSAFE_FrameworkContext.Provider>,
);
