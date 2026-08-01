import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const repoRoot = join(import.meta.dir, "..");

function source(path: string) {
  return readFileSync(join(repoRoot, path), "utf8");
}

describe("MLAI Chat community entry point", () => {
  test("registers the public route and sitemap entry", () => {
    expect(source("app/routes.ts")).toContain(
      'route("/community", "routes/community.tsx")',
    );
    expect(source("scripts/generate-sitemap.ts")).toContain(
      '{ path: "/community", changefreq: "weekly", priority: 0.8 }',
    );
  });

  test("keeps every distribution destination operator-configurable", () => {
    const page = source("app/routes/community.tsx");

    expect(page).toContain("VITE_MLAI_CHAT_WEB_URL");
    expect(page).toContain("VITE_MLAI_CHAT_DESKTOP_URL");
    expect(page).toContain("VITE_MLAI_CHAT_IOS_URL");
    expect(page).toContain("VITE_MLAI_CHAT_ANDROID_URL");
    expect(page).toContain("https://chat.mlai.au/chat");
  });

  test("states the bridge trust and privacy boundary", () => {
    const page = source("app/routes/community.tsx");

    expect(page).toContain("MLAI Chat is the source of truth");
    expect(page).toContain(
      "Direct messages, private channels, secrets, bot chatter",
    );
    expect(page).toContain("Slack is convenient, but it does not own your MLAI Chat");
    expect(page).toMatch(
      /Your private\s+identity key stays on your device/,
    );
    expect(page).toContain(
      "Block, Square, Builderlab, or public Buzz account",
    );
  });
});
