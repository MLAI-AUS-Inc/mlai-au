import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  // Keep browser journeys out of Bun's unit-test discovery.
  testMatch: '**/*.pw.ts',
  fullyParallel: true,
  workers: process.env.CI ? 2 : 4,
  retries: 0,
  timeout: 45_000,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:4198',
    browserName: 'chromium',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 1000 } } },
    { name: 'mobile', use: { viewport: { width: 320, height: 844 } } },
    { name: 'without-javascript', use: { viewport: { width: 390, height: 844 }, javaScriptEnabled: false } },
  ],
  webServer: {
    command: 'bunx vite preview --host 127.0.0.1 --port 4198',
    url: 'http://127.0.0.1:4198/articles',
    reuseExistingServer: false,
    timeout: 60_000,
    env: { CLOUDFLARE_INSPECTOR_PORT: 'false', WRANGLER_SEND_METRICS: 'false' },
  },
});
