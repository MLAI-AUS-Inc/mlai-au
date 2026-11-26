import { expect, test, type Page } from "@playwright/test";

// The console around the team select: cartridge, screen states and fallbacks.
// Never assert the 3D mode itself: it depends on the machine's WebGL.
const ARCADE_ASSET = /runtime\.client|phaser|\/games\/team-arcade\//;

async function ready(page: Page) {
  await page.goto("/?arcade-check=console", { waitUntil: "domcontentloaded" });
  const team = page.locator(".fighter-select-wrapper");
  await team.scrollIntoViewIfNeeded();
  await expect(page.locator(".team-console")).toHaveAttribute("data-console-ready", "true", { timeout: 30_000 });
  return team;
}
const start = (page: Page) => page.locator(".fighter-select-wrapper").getByRole("button", { name: "PRESS START", exact: true }).filter({ visible: true });

test.beforeEach(async ({ page }) => {
  // The console uses no external services; keep homepage embeds and analytics out of the results.
  await page.route(url => !/^(127\.0\.0\.1|localhost)$/.test(url.hostname), route => route.abort());
});

test("the cartridge ejects, turns the screen off, and plays again once it is back in", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "webkit-mobile", "Covered by the phone project.");
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(String(error)));
  const requests: string[] = [];
  page.on("request", request => requests.push(request.url()));
  const team = await ready(page);
  const console_ = page.locator(".team-console");
  await expect(console_).toHaveAttribute("data-cart", "seated");
  await expect(start(page)).toHaveCount(1);

  await page.getByRole("button", { name: "Eject cartridge", exact: true }).click();
  await expect(console_).toHaveAttribute("data-cart", "out");
  await expect(console_).toHaveAttribute("data-screen", "off");
  await expect(start(page)).toHaveCount(0);
  await expect(team.getByRole("button", { name: "Select Sam Donegan", exact: true }).filter({ visible: true })).toHaveCount(0);
  await expect(page.getByRole("status").filter({ hasText: "Cartridge out" })).toHaveCount(1);
  await expect(page.getByRole("dialog")).toHaveCount(0);

  // The cartridge button works from the keyboard, in the flat and the 3D console alike.
  const insert = page.getByRole("button", { name: "Insert cartridge", exact: true });
  await insert.focus();
  await page.keyboard.press("Enter");
  await expect(console_).toHaveAttribute("data-cart", "seated", { timeout: 10_000 });
  await expect(console_).toHaveAttribute("data-screen", "live");
  await expect(start(page)).toHaveCount(1);
  expect(requests.filter(url => ARCADE_ASSET.test(url)), "The console must not download the game").toEqual([]);

  await start(page).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  // The game owns the only WebGL context while it is open.
  await expect(page.locator(".team-console-canvas")).toHaveCount(0);
  await page.locator(".team-console-cart").dispatchEvent("click");
  await expect(console_).toHaveAttribute("data-cart", "seated");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Close arcade" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(start(page)).toBeFocused();
  expect(errors).toEqual([]);
});

test("reduced motion gets the flat console and an instant cartridge", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "webkit-mobile", "Covered by the phone project.");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await ready(page);
  const console_ = page.locator(".team-console");
  await expect(console_).toHaveAttribute("data-console", "flat");
  await expect(page.locator(".team-console-canvas")).toHaveCount(0);
  await page.getByRole("button", { name: "Eject cartridge", exact: true }).click();
  await expect(console_).toHaveAttribute("data-cart", "out");
  await page.getByRole("button", { name: "INSERT CART", exact: true }).click();
  await expect(console_).toHaveAttribute("data-cart", "seated");
  await expect(start(page)).toHaveCount(1);
});

test("phones get the flat console with a thumb-sized cartridge button", async ({ page }, testInfo) => {
  test.skip(!/mobile/.test(testInfo.project.name), "Phone projects only.");
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(String(error)));
  await ready(page);
  const console_ = page.locator(".team-console");
  await expect(console_).toHaveAttribute("data-console", "flat");
  await expect(page.locator(".team-console-canvas")).toHaveCount(0);
  const eject = page.getByRole("button", { name: "Eject cartridge", exact: true });
  const box = await eject.boundingBox();
  expect(box && box.width >= 44 && box.height >= 44).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await eject.click();
  await expect(console_).toHaveAttribute("data-cart", "out");
  await page.getByRole("button", { name: "INSERT CART", exact: true }).click();
  await expect(console_).toHaveAttribute("data-cart", "seated", { timeout: 10_000 });
  await expect(start(page)).toHaveCount(1);
  expect(errors).toEqual([]);
});
