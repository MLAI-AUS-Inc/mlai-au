import { expect, test, type Locator, type Page } from "@playwright/test";

const combatAsset = (url: string) => /runtime\.client|phaser|\/games\/team-arcade\/v[12]\/|mlai-office\.webp/.test(url);
async function open(page: Page) {
  await page.goto("/?arcade-check=mobile", { waitUntil: "domcontentloaded" });
  const team = page.locator(".fighter-select-wrapper");
  await team.scrollIntoViewIfNeeded();
  await team.getByRole("button", { name: "Select Sam Donegan", exact: true }).filter({ visible: true }).click();
  await team.getByRole("button", { name: "PRESS START", exact: true }).filter({ visible: true }).click();
  await expect(page.locator(".arcade-selection")).toBeVisible();
}
async function pick(page: Page) {
  await page.getByRole("button", { name: "Play as Kang Tan", exact: true }).click();
  await page.getByRole("button", { name: "Fight against Shan Yang", exact: true }).click();
}
async function fits(locator: Locator, min = 44) {
  expect(await locator.evaluate((e, minimum) => {
    const r = e.getBoundingClientRect();
    const center = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
    return r.width >= minimum && r.height >= minimum && r.left >= 0 && r.top >= 0 &&
      r.right <= innerWidth + 1 && r.bottom <= innerHeight + 1 && !!center && e.contains(center);
  }, min), `Usable, unobstructed target: ${await locator.getAttribute("aria-label") ?? await locator.textContent()}`).toBe(true);
}
async function noScroll(page: Page) {
  await expect.poll(() => page.getByRole("dialog").evaluate(e => e.scrollHeight <= e.clientHeight + 1 && e.scrollWidth <= e.clientWidth + 1)).toBe(true);
}

test.beforeEach(async ({ page }, info) => {
  test.skip(!["mobile", "webkit-mobile"].includes(info.project.name), "Touch layout is verified in Chromium and WebKit phone contexts.");
  await page.route(url => !/^(127\.0\.0\.1|localhost)$/.test(url.hostname), route => route.abort());
});

test("repeated fight-button taps and focus transfers keep the match running", async ({ page }) => {
  await page.setViewportSize({ width: 844, height: 390 });
  await open(page);
  await pick(page);
  await page.getByRole("button", { name: "START MATCH", exact: true }).tap();
  const cabinet = page.locator(".arcade-cabinet");
  await expect(cabinet).toHaveAttribute("data-phase", "fight", { timeout: 30000 });
  const tick = Number(await cabinet.getAttribute("data-tick"));
  for (const name of ["Punch", "Kick", "Special", "Guard", "Jump", "Left", "Right", "Crouch"]) {
    const button = page.getByRole("button", { name, exact: true });
    // Native browsers/assistive navigation can focus a button after a pointer
    // gesture. Exercise that real focus transition rather than relying on one
    // engine's preventDefault compatibility-mouse behavior.
    await button.focus();
    await expect(cabinet).toHaveAttribute("data-mode", "playing");
    for (let tap = 0; tap < 6; tap++) {
      await button.tap();
      await expect(cabinet).toHaveAttribute("data-mode", "playing");
    }
  }
  await expect(page.locator('.arcade-touch[data-held="true"]')).toHaveCount(0);
  await expect.poll(async () => Number(await cabinet.getAttribute("data-tick"))).toBeGreaterThan(tick);
  await page.getByRole("button", { name: "Mute sound", exact: true }).tap();
  await expect(cabinet).toHaveAttribute("data-mode", "playing");
  await page.getByRole("button", { name: "Ⅱ Pause", exact: true }).tap();
  await expect(cabinet).toHaveAttribute("data-mode", "paused");
});

test("portrait defers combat; rotation pauses and preserves a fight until explicit resume", async ({ page }, info) => {
  const requests: string[] = [], errors: string[] = [];
  page.on("request", r => { if (combatAsset(r.url())) requests.push(r.url()); });
  page.on("pageerror", e => errors.push(e.message));
  await open(page);
  await pick(page);
  await page.getByRole("button", { name: "START MATCH", exact: true }).click();
  await expect(page.getByText("ROTATE TO PLAY", { exact: true })).toBeVisible();
  await expect(page.locator("canvas").filter({ visible: true })).toHaveCount(0);
  await page.waitForTimeout(500);
  expect(requests).toEqual([]);
  await fits(page.getByRole("button", { name: "Change fighters", exact: true }));
  await fits(page.getByRole("button", { name: "Close arcade", exact: true }));
  await page.screenshot({ path: info.outputPath("rotate.png") });
  await page.setViewportSize({ width: 540, height: 280 });
  await expect(page.getByText("A LITTLE MORE ROOM", { exact: true })).toBeVisible();
  expect(requests).toEqual([]);
  await page.setViewportSize({ width: 844, height: 390 });
  const cabinet = page.locator(".arcade-cabinet");
  await expect(cabinet).toHaveAttribute("data-phase", "fight", { timeout: 30000 });
  const canvas = await page.locator(".arcade-stage canvas").elementHandle();
  let cdp;
  if (info.project.name === "mobile") {
    const left = await page.getByRole("button", { name: "Left", exact: true }).boundingBox();
    cdp = await page.context().newCDPSession(page);
    await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: left!.x + 24, y: left!.y + 26, id: 1 }] });
    await expect(page.locator('.arcade-touch[data-action="left"]')).toHaveAttribute("data-held", "true");
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(cabinet).toHaveAttribute("data-mode", "paused");
  const tick = await cabinet.getAttribute("data-tick");
  await page.waitForTimeout(800);
  await expect(cabinet).toHaveAttribute("data-tick", tick!);
  await expect(page.locator('.arcade-touch[data-held="true"]')).toHaveCount(0);
  if (cdp) await cdp.send("Input.dispatchTouchEvent", { type: "touchCancel", touchPoints: [] });
  await page.setViewportSize({ width: 844, height: 390 });
  await page.waitForTimeout(800);
  await expect(cabinet).toHaveAttribute("data-mode", "paused");
  await expect(cabinet).toHaveAttribute("data-tick", tick!);
  expect(await canvas?.evaluate(e => e === document.querySelector(".arcade-stage canvas"))).toBe(true);
  await page.getByRole("button", { name: "RESUME →", exact: true }).tap();
  await expect(cabinet).toHaveAttribute("data-mode", "playing");
  await expect.poll(() => cabinet.getAttribute("data-tick")).not.toBe(tick);
  await page.getByRole("button", { name: "Controls", exact: true }).tap();
  await expect(cabinet).toHaveAttribute("data-mode", "paused");
  await expect(page.locator(".arcade-controls-help")).toContainText("Left thumb");
  await fits(page.getByRole("button", { name: "Close controls", exact: true }));
  await page.getByRole("button", { name: "Close controls", exact: true }).tap();
  await page.getByRole("button", { name: "Close arcade", exact: true }).tap();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("phone and tablet selection, arena and thumb controls fit without page scrolling", async ({ page }, info) => {
  const measurements: unknown[] = [];
  await open(page);
  await pick(page);
  const sizes = [[320, 568], [390, 664], [568, 320], [667, 375], [844, 390], [1024, 768], [768, 1024]];
  for (const [width, height] of sizes) {
    await page.setViewportSize({ width, height });
    await expect(page.getByRole("dialog")).toHaveAttribute("data-touch", "true");
    await noScroll(page);
    await fits(page.getByRole("button", { name: "START MATCH", exact: true }));
    await fits(page.getByRole("button", { name: "CHANGE PLAYER", exact: true }));
    await fits(page.getByRole("button", { name: "Close arcade", exact: true }));
    await expect(page.locator(".arcade-choice-grid")).toHaveCount(1);
    await page.getByRole("button", { name: "Fight against Callum Holt", exact: true }).scrollIntoViewIfNeeded();
    await fits(page.getByRole("button", { name: "Fight against Callum Holt", exact: true }));
    await page.screenshot({ path: info.outputPath(`selection-${width}.png`) });
  }
  await page.setViewportSize({ width: 844, height: 390 });
  await page.getByRole("button", { name: "START MATCH", exact: true }).tap();
  await expect(page.locator(".arcade-cabinet")).toHaveAttribute("data-phase", "fight", { timeout: 30000 });
  await page.getByRole("button", { name: "Ⅱ Pause", exact: true }).tap();
  for (const [width, height] of sizes.slice(2)) {
    await page.setViewportSize({ width, height });
    await noScroll(page);
    // Disabled paused controls still need to fit and stay clear of the arena.
    const arena = await page.locator(".arcade-stage").boundingBox();
    measurements.push({ viewport: { width, height }, arena });
    expect(arena!.width).toBeGreaterThanOrEqual(width < 600 ? 300 : 400);
    expect(arena!.width / arena!.height).toBeCloseTo(16 / 9, 1);
    for (const label of ["Jump", "Left", "Crouch", "Right", "Punch", "Kick", "Special", "Guard"]) {
      const button = page.getByRole("button", { name: label, exact: true });
      await fits(button, 48);
      const box = (await button.boundingBox())!;
      expect(box.x >= arena!.x + arena!.width || box.x + box.width <= arena!.x || box.y >= arena!.y + arena!.height).toBe(true);
    }
    for (const name of ["Close arcade", "Controls", "Mute sound", "RESUME →"])
      await fits(page.getByRole("button", { name, exact: true }));
    await page.screenshot({ path: info.outputPath(`arena-${width}.png`) });
  }
  await info.attach("layout-measurements", { body: JSON.stringify(measurements, null, 2), contentType: "application/json" });
});

test("rotation during asset loading defers the ready countdown without creating another arena", async ({ page }) => {
  await page.setViewportSize({ width: 844, height: 390 });
  let release!: () => void;
  const hold = new Promise<void>(resolve => { release = resolve; });
  await page.route("**/games/team-arcade/v2/kang.webp", async route => { await hold; await route.continue(); });
  await open(page);
  await pick(page);
  await page.getByRole("button", { name: "START MATCH", exact: true }).tap();
  await expect(page.getByRole("dialog")).toHaveAttribute("data-mode", "loading");
  await page.setViewportSize({ width: 390, height: 844 });
  release();
  await expect(page.getByRole("dialog")).toHaveAttribute("data-mode", "ready", { timeout: 30000 });
  await page.waitForTimeout(1800);
  await expect(page.locator(".arcade-cabinet")).toHaveAttribute("data-tick", "0");
  await expect(page.getByText("ROTATE TO PLAY", { exact: true })).toBeVisible();
  await page.setViewportSize({ width: 844, height: 390 });
  await expect(page.locator(".arcade-cabinet")).toHaveAttribute("data-phase", "fight", { timeout: 15000 });
  await expect(page.locator(".arcade-stage canvas")).toHaveCount(1);
});
