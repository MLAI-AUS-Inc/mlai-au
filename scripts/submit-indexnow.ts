import { readFile } from "fs/promises";
import path from "path";

const SITE_URL = "https://mlai.au";
const API_KEY = "ba9667289a340eef21f8adbd892cfa24";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

async function submitToIndexNow() {
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
