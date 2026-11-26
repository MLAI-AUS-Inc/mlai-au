import { expect, test, type Page } from "@playwright/test";
import { seatCartridge } from "./team-console-helpers";

// The console around the team select: cartridge, screen states and fallbacks.
// Never assert the 3D mode itself: it depends on the machine's WebGL. Where it does run,
// the console starts with its cartridge out, and `ready` puts it back in.
const ARCADE_ASSET = /runtime\.client|phaser|\/games\/team-arcade\//;

async function ready(page: Page) {
  await page.goto("/?arcade-check=console", { waitUntil: "domcontentloaded" });
  const team = page.locator(".fighter-select-wrapper");
  await team.scrollIntoViewIfNeeded();
  await seatCartridge(page);
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

test("phones get a thumb-sized cartridge tab and never a sideways scroll", async ({ page }, testInfo) => {
  test.skip(!/mobile/.test(testInfo.project.name), "Phone projects only.");
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(String(error)));
  await ready(page);
  const console_ = page.locator(".team-console");
  const fits = () => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1);
  const eject = page.getByRole("button", { name: "Eject cartridge", exact: true });
  const box = await eject.boundingBox();
  expect(box && box.width >= 44 && box.height >= 44).toBe(true);
  expect(await fits()).toBe(true);
  await eject.click();
  await expect(console_).toHaveAttribute("data-cart", "out");
  expect(await fits()).toBe(true);
  // With a graphics card the console is the 3D one and is itself the button; without, the screen offers INSERT CART.
  const drawn = await console_.getAttribute("data-console");
  await page.getByRole("button", { name: drawn === "3d" ? "Insert cartridge" : "INSERT CART", exact: true }).click();
  await expect(console_).toHaveAttribute("data-cart", "seated", { timeout: 10_000 });
  await expect(start(page)).toHaveCount(1);
  expect(errors).toEqual([]);
});

test("the 3D console shows itself with the cartridge out and lands on the team select when it goes in", async ({ page }, testInfo) => {
  test.skip(!["desktop", "mobile"].includes(testInfo.project.name), "One WebGL engine is enough for the 3D console: wide and upright.");
  test.slow();
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(String(error)));
  // The check machines draw WebGL in software, where the 3D console normally steps aside.
  await page.addInitScript(() => {
    // Embedded frames without storage run this too.
    try { window.localStorage.setItem("mlai-console-3d", "force"); } catch { /* not the page under test */ }
  });
  await page.goto("/?arcade-check=console-3d", { waitUntil: "domcontentloaded" });
  await page.locator(".fighter-select-wrapper").scrollIntoViewIfNeeded();
  const console_ = page.locator(".team-console");
  await expect(console_).toHaveAttribute("data-console-ready", "true", { timeout: 30_000 });
  // Skip only where the browser has no WebGL at all; a scene that fails to build must fail the test.
  const hasWebGL = await page.evaluate(() => Boolean(document.createElement("canvas").getContext("webgl2")));
  test.skip(!hasWebGL, "No WebGL on this machine.");
  await expect(console_).toHaveAttribute("data-console", "3d");

  // It pulls its own cartridge once: the console is shown and the team select is out of reach.
  await expect(console_).toHaveAttribute("data-cart", "out", { timeout: 15_000 });
  await expect(page.locator(".team-console-canvas")).toHaveCount(1);
  await expect(start(page)).toHaveCount(0);
  // The team select has left the page for now, so say so.
  await expect(page.getByRole("status").filter({ hasText: "Cartridge out" })).toHaveCount(1);

  // The whole console is the insert button.
  const insert = page.getByRole("button", { name: "Insert cartridge", exact: true });
  const [button, screen] = await Promise.all([insert.boundingBox(), page.locator(".team-console-screen").boundingBox()]);
  expect(button && screen && Math.abs(button.width - screen.width) < 2 && Math.abs(button.height - screen.height) < 2).toBe(true);
  // The canvas reaches past the panel; the page must still not scroll sideways.
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await insert.click();
  await expect(console_).toHaveAttribute("data-cart", "seated", { timeout: 15_000 });
  await expect(start(page)).toHaveCount(1);
  await expect(page.locator(".team-console-canvas")).toHaveCSS("opacity", "0");
  await expect(page.getByRole("status").filter({ hasText: "Cartridge in" })).toHaveCount(1);

  await page.getByRole("button", { name: "Eject cartridge", exact: true }).click();
  await expect(console_).toHaveAttribute("data-cart", "out", { timeout: 15_000 });
  await expect(page.getByRole("status").filter({ hasText: "Cartridge out" })).toHaveCount(1);
  await expect(page.locator(".team-console-canvas")).toHaveCSS("opacity", "1");
  expect(errors).toEqual([]);
});
