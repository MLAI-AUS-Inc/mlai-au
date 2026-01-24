import { parseFeed } from "@rowanmanning/feed-parser";

export interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  image?: string;
}

export function extractImageFromContent(content: string): string | undefined {
  // Try multiple approaches to extract images from Substack content

  // First try to find images in the content HTML
  const imgMatches = content.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi);
  if (imgMatches && imgMatches.length > 0) {
    // Extract the src from the first image
    const srcMatch = imgMatches[0].match(/src=["']([^"']+)["']/);
    if (srcMatch) {
      let imageUrl = srcMatch[1];
      // Normalize protocol-relative URLs
      if (imageUrl.startsWith("//")) {
        imageUrl = "https:" + imageUrl;
      }
      return imageUrl;
    }
  }

  // Try to find Substack CDN images specifically
  const substackImgMatch = content.match(
    /https:\/\/substackcdn\.com\/image\/[^"'\s]+/i,
  );
  if (substackImgMatch) {
    return substackImgMatch[0];
  }

  // Try to find any https image URL
  const httpsImgMatch = content.match(
    /https:\/\/[^"'\s]+\.(jpg|jpeg|png|gif|webp)/i,
  );
  if (httpsImgMatch) {
    return httpsImgMatch[0];
  }

  return undefined;
}

export async function fetchSubstackPosts(
  count: number = 3,
): Promise<SubstackPost[]> {
  try {
    const content = await fetch("https://mlaiaus.substack.com/feed");
    const feed = parseFeed(await content.text());

    const posts: SubstackPost[] = feed.items
      .slice(0, count)
      .map((item) => {
        // Try the full HTML content first, preferring content:encoded if provided
        const html =
          // (item["content:encoded"] as string | undefined) ||
          item.content || "";

        return {
          title: item.title || "",
          link: item.url || "",
          pubDate: item.published
            ? new Date(item.published).toLocaleString("en-AU", {
                timeZone: "Australia/Melbourne",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })
            : "",
          contentSnippet: item.description || "",
          // Try to extract image from enclosure or content
          image: item.image?.url || extractImageFromContent(html),
        };
      })
      .sort(
        (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime(),
      );

    return posts;
  } catch (error) {
    console.error("Error fetching Substack feed:", error);
    return [];
  }
}
