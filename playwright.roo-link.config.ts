import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  testMatch: "roo-account-link.pw.ts",
  workers: 1,
  retries: 0,
  timeout: 30_000,
  use: {
    baseURL: "http://127.0.0.1:4209",
    browserName: "chromium",
    javaScriptEnabled: false,
    trace: "retain-on-failure",
  },
  webServer: {
    command: "bun tests/fixtures/roo-link-document.tsx --serve",
    url: "http://127.0.0.1:4209/founder-tools/link-roo",
    reuseExistingServer: false,
    env: { ROO_LINK_TEST_PORT: "4209" },
  },
});
