import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  testMatch: ["team-arcade.pw.ts", "team-arcade-mobile.pw.ts"],
  fullyParallel: false,
  workers: 1,
  timeout: 90_000,
  expect: { timeout: 15_000 },
  reporter: [["list"]],
  outputDir: ".local/arcade-browser-results",
  use: {
    baseURL: "http://127.0.0.1:4199",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    launchOptions: {
      args: [
        "--enable-webgl",
        "--use-gl=angle",
        "--use-angle=swiftshader",
        "--enable-unsafe-swiftshader",
      ],
    },
  },
  projects: [
    {
      name: "desktop",
      use: { browserName: "chromium", viewport: { width: 1440, height: 1000 } },
    },
    {
      name: "mobile",
      use: {
        browserName: "chromium",
        viewport: { width: 390, height: 844 },
        hasTouch: true,
        isMobile: true,
      },
    },
    {
      name: "webkit",
      use: {
        browserName: "webkit",
        viewport: { width: 1280, height: 900 },
        launchOptions: {},
      },
    },
    {
      name: "webkit-mobile",
      testMatch: "team-arcade-mobile.pw.ts",
      use: {
        browserName: "webkit",
        viewport: { width: 390, height: 844 },
        hasTouch: true,
        isMobile: true,
        launchOptions: {},
      },
    },
  ],
  webServer: {
    command: "bunx vite preview --host 127.0.0.1 --port 4199",
    url: "http://127.0.0.1:4199/?arcade-check=readiness",
    reuseExistingServer: true,
    timeout: 60_000,
    env: { CLOUDFLARE_INSPECTOR_PORT: "false", WRANGLER_SEND_METRICS: "false" },
  },
});
