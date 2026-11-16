// Actual workerd request contexts, with the production feed cache bundled in.
// No network, credentials or production resources are used.
import { Miniflare } from "miniflare";
import { build } from "esbuild";

const { outputFiles } = await build({
  stdin: {
    contents: `import { getCachedValue } from "./app/lib/server-cache";
      export default { async fetch(request) {
        const slow = new URL(request.url).pathname === "/slow";
        const value = await getCachedValue("feed", 60000, async () => {
          if (slow) await new Promise(resolve => setTimeout(resolve, 500));
          return slow ? "slow" : "healthy";
        }, "empty");
        return new Response(value);
      } };`,
    resolveDir: process.cwd(),
    loader: "ts",
  },
  bundle: true,
  write: false,
  format: "esm",
  platform: "browser",
});
const worker = new Miniflare({ modules: true, script: outputFiles[0].text, compatibilityDate: "2025-04-04" });
try {
  await worker.ready;
  const slow = worker.dispatchFetch("https://fixture.invalid/slow");
  await new Promise(resolve => setTimeout(resolve, 50));
  const independent = await Promise.race([
    worker.dispatchFetch("https://fixture.invalid/healthy").then(response => response.text()),
    new Promise(resolve => setTimeout(() => resolve("blocked by another request"), 200)),
  ]);
  const slowValue = await (await slow).text();
  const cached = await (await worker.dispatchFetch("https://fixture.invalid/cached")).text();
  console.log(JSON.stringify({ independent, slow: slowValue, cached }));
} finally {
  await worker.dispose();
}
