// Render the same production Worker locally, without service credentials or
// network access. The browser refreshes live public feeds after hydration.
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { Miniflare } from "miniflare";
import { PUBLIC_DOCUMENTS, documentAssetPath } from "../app/lib/public-documents";

const root = path.resolve("build/server");
const files = ["index.js", ...(await readdir(path.join(root, "assets"))).filter(name => name.endsWith(".js")).map(name => "assets/" + name)];
const config = JSON.parse(await readFile(path.join(root, "wrangler.json"), "utf8"));
const renderer = new Miniflare({
  modulesRoot: root,
  modules: files.map(file => ({ type: "ESModule", path: path.join(root, file) })),
  compatibilityDate: config.compatibility_date,
  compatibilityFlags: config.compatibility_flags,
  outboundService: () => new Response(null, { status: 503 }),
});
try {
  for (const route of PUBLIC_DOCUMENTS) {
    const response = await renderer.dispatchFetch(new URL(route, "https://mlai.au"), { headers: { "User-Agent": "MLAI static site builder (bot)" } });
    if (response.status !== 200 || !response.headers.get("Content-Type")?.includes("text/html") || response.headers.has("Set-Cookie")) {
      throw Error("Expected a public document for " + route + ", received " + response.status);
    }
    const dest = path.join("build/client", documentAssetPath(route));
    await mkdir(path.dirname(dest), { recursive: true });
    await writeFile(dest, await response.text());
  }
  console.log("Built " + PUBLIC_DOCUMENTS.size + " public HTML documents.");
} finally {
  await renderer.dispose();
}
