import { readFile } from "fs/promises";
import path from "path";

const SITE_URL = process.env.SITE_URL ?? "https://mlai.au";
// The IndexNow key is public by design (it is served at `keyLocation` as the
// ownership proof), so this is config hygiene rather than a secret: it lets us
// rotate the key without a code edit. Set INDEXNOW_KEY in the build env. To
// rotate, also publish the matching `public/<key>.txt` verification file.
const API_KEY = process.env.INDEXNOW_KEY ?? "";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

async function submitToIndexNow() {
  if (!API_KEY) {
    console.log("IndexNow: INDEXNOW_KEY not set, skipping submission.");
    return;
  }

  const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
  const sitemapContent = await readFile(sitemapPath, "utf-8");

  const urlMatches = sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g);
  const urlList = Array.from(urlMatches, (match) => match[1]);

  if (urlList.length === 0) {
    console.log("IndexNow: No URLs found in sitemap, skipping.");
    return;
  }

  const payload = {
    host: "mlai.au",
    key: API_KEY,
    keyLocation: `${SITE_URL}/${API_KEY}.txt`,
    urlList,
  };

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log(
        `IndexNow: Submitted ${urlList.length} URLs (status ${response.status})`
      );
    } else {
      console.warn(
        `IndexNow: Submission returned status ${response.status} — ${response.statusText}`
      );
    }
  } catch (error) {
    // Don't fail the build on IndexNow errors
    console.warn("IndexNow: Submission failed, skipping.", error);
  }
}

await submitToIndexNow();
