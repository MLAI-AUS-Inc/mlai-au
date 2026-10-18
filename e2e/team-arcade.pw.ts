import { expect, test, type Page } from "@playwright/test";
import { FIGHTERS, FIGHTER_IDS } from "../app/games/team-arcade/roster";
import { SPECIAL_MOVES } from "../app/games/team-arcade/specials";

const sheetPaths = new Set<string>(FIGHTER_IDS.map((id) => FIGHTERS[id].sheet));
const sheetRequests = (requests: string[]) =>
  requests.map((url) => new URL(url).pathname).filter((path) => sheetPaths.has(path));

async function home(page: Page) {
  // Local Worker caches use a constant 'local' revision. A query forces the
  // current build's SSR document rather than a previous local build's HTML.
  await page.goto("/?arcade-check=browser", { waitUntil: "domcontentloaded" });
  await page.locator(".fighter-select-wrapper").scrollIntoViewIfNeeded();
  await page
    .locator(".fighter-select-wrapper")
    .getByRole("button", { name: "Select Sam Donegan", exact: true })
    .filter({ visible: true })
    .click();
}
async function open(page: Page) {
  await page
    .locator(".fighter-select-wrapper")
    .getByRole("button", { name: "PRESS START", exact: true })
    .filter({ visible: true })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
}
async function enter(page: Page) {
  await page.getByRole("button", { name: "ENTER THE ARENA" }).click();
  await expect(page.getByRole("button", { name: "FIGHT!" })).toBeVisible({
    timeout: 30000,
  });
  await expect(page.locator(".arcade-stage canvas")).toHaveCount(1);
}
async function start(page: Page) {
  await enter(page);
  await page.getByRole("button", { name: "FIGHT!" }).click();
  await expect(page.locator(".arcade-cabinet")).toHaveAttribute(
    "data-phase",
    "fight",
    { timeout: 15000 },
  );
}
const hp = async (page: Page, side: "player" | "cpu") =>
  Number(
    (await page.getByTestId(`${side}-health`).textContent())?.replace(
      /\D/g,
      "",
    ),
  );

test.beforeEach(async ({ page }) => {
  // The feature uses no external services. Avoid unrelated homepage embeds and
  // analytics creating test noise; local assets and the real Worker remain live.
  await page.route(
    (url) => !url.hostname.match(/^(127\.0\.0\.1|localhost)$/),
    (route) => route.abort(),
  );
});

test("homepage defers fight assets; all fifteen fighters select independently and support mirrors", async ({
  page,
}, testInfo) => {
  const requests: string[] = [];
  page.on("request", (request) => requests.push(request.url()));
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await home(page);
  expect(
    requests.filter((url) =>
      /runtime\.client|phaser|\/games\/team-arcade\//.test(url),
    ),
  ).toEqual([]);
  await open(page);
  expect(
    requests.filter((url) => /runtime\.client|phaser/.test(url)),
  ).toEqual([]);
  expect(sheetRequests(requests)).toEqual([]);
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("button", { name: /^Play as / })).toHaveCount(15);
  await expect(dialog.getByRole("button", { name: /^Fight against / })).toHaveCount(15);
  for (const [index, id] of FIGHTER_IDS.entries()) {
    const fighter = FIGHTERS[id], special = SPECIAL_MOVES[id];
    for (const [label, slot] of [["Play as", "player"], ["Fight against", "opponent"]] as const) {
      const choice = dialog.getByRole("button", { name: `${label} ${fighter.name}`, exact: true });
      await choice.click();
      await expect(choice).toHaveAttribute("aria-pressed", "true");
      const selected = page.getByTestId(`${slot}-selected-fighter`);
      await expect(selected).toContainText(fighter.name);
      await expect(selected).toContainText(special.name);
      await expect(selected).toContainText(special.description);
      await expect(dialog.locator(`.${slot}.arcade-fighter-select button[aria-pressed="true"]`)).toHaveCount(1);
      const otherName = slot === "player"
        ? FIGHTERS[index ? FIGHTER_IDS[index - 1] : "sonia"].name
        : fighter.name;
      await expect(dialog.getByRole("button", {
        name: `${slot === "player" ? "Fight against" : "Play as"} ${otherName}`,
        exact: true,
      })).toHaveAttribute("aria-pressed", "true");
    }
  }
  // Both slots end on a newly added character; one sheet serves the mirror.
  await page.getByRole("button", { name: "Play as Callum Holt", exact: true }).click();
  await page
    .getByRole("button", { name: "Fight against Callum Holt", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Play as Callum Holt", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.getByRole("button", { name: "Fight against Callum Holt", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.screenshot({ path: testInfo.outputPath("selection.png") });
  await enter(page);
  if (testInfo.project.name === "desktop") {
    const canvas = await page.locator(".arcade-stage canvas").elementHandle();
    await page.setViewportSize({ width: 390, height: 844 });
    expect(
      await canvas?.evaluate(
        (node) =>
          node.isConnected &&
          node === document.querySelector(".arcade-stage canvas"),
      ),
    ).toBe(true);
    await expect(page.locator(".arcade-stage canvas")).toHaveCount(1);
  }
  expect(sheetRequests(requests)).toEqual([FIGHTERS.callum.sheet]);
  await page.getByRole("button", { name: "Close arcade" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("new fighters attack a local CPU using only their selected art; pause and focus remain stable", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name === "mobile",
    "Keyboard journey runs on desktop engines; mobile has a multi-pointer journey.",
  );
  const errors: string[] = [];
  const requests: string[] = [];
  page.on("request", (request) => requests.push(request.url()));
  page.on("pageerror", (error) => errors.push(error.message));
  await home(page);
  await open(page);
  await page.getByRole("button", { name: "Play as Ryan Mouritz", exact: true }).click();
  await page.getByRole("button", { name: "Fight against Pegah Khaleghi", exact: true }).click();
  await page.getByLabel("CPU difficulty").selectOption("easy");
  await start(page);
  expect(sheetRequests(requests).sort()).toEqual([FIGHTERS.pegah.sheet, FIGHTERS.ryan.sheet].sort());
  // Play with real keyboard events, steering from the rendered fighter positions.
  for (let i = 0; i < 28 && (await hp(page, "cpu")) === 100; i++) {
    const cabinet = page.locator(".arcade-cabinet");
    const x = Number(await cabinet.getAttribute("data-player-x")),
      cpu = Number(await cabinet.getAttribute("data-cpu-x"));
    const toward = x < cpu ? "d" : "a";
    if (Math.abs(cpu - x) > 72) await page.keyboard.down(toward);
    else {
      await page.keyboard.up("a");
      await page.keyboard.up("d");
    }
    await page.keyboard.press(i % 3 === 0 ? "k" : "j");
    await page.waitForTimeout(160);
  }
  await page.keyboard.up("a");
  await page.keyboard.up("d");
  expect(await hp(page, "cpu")).toBeLessThan(100);
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("heading", { name: "GAME PAUSED" }),
  ).toBeVisible();
  const tick = await page.locator(".arcade-cabinet").getAttribute("data-tick");
  await page.waitForTimeout(600);
  expect(await page.locator(".arcade-cabinet").getAttribute("data-tick")).toBe(
    tick,
  );
  await page.getByRole("button", { name: "RESUME" }).click();
  await expect
    .poll(() => hp(page, "player"), { timeout: 18000 })
    .toBeLessThan(100);
  await page.screenshot({ path: testInfo.outputPath("fight.png") });
  await page.getByRole("button", { name: "Close arcade" }).click();
  await expect(page.locator(".arcade-stage canvas")).toHaveCount(0);
  await expect(
    page
      .locator(".fighter-select-wrapper")
      .getByRole("button", { name: "PRESS START", exact: true })
      .filter({ visible: true }),
  ).toBeFocused();
  expect(errors).toEqual([]);
});

test("a real CPU match reaches results, supports rematch and returns to selection", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "One full real-time match supplements deterministic simulation coverage.",
  );
  await home(page);
  await open(page);
  await page.getByLabel("CPU difficulty").selectOption("hard");
  await start(page);
  await expect(page.getByRole("button", { name: "REMATCH" })).toBeVisible({
    timeout: 70000,
  });
  await expect(page.locator(".arcade-cabinet")).toHaveAttribute(
    "data-phase",
    "match-end",
  );
  await page.screenshot({ path: testInfo.outputPath("result.png") });
  await page.getByRole("button", { name: "REMATCH" }).click();
  await expect(page.getByRole("button", { name: "FIGHT!" })).toBeVisible();
  await expect(page.getByTestId("player-health")).toHaveText("100 HP");
  await page.getByRole("button", { name: "FIGHT!" }).click();
  await page.getByRole("button", { name: "Ⅱ Pause", exact: true }).click();
  await page.getByRole("button", { name: "Change fighters" }).click();
  await expect(
    page.getByRole("button", { name: "ENTER THE ARENA" }),
  ).toBeVisible();
  await expect(page.locator(".arcade-stage canvas")).toHaveCount(0);
});

test("missing required art reports a durable error and retries successfully", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "Failure recovery is engine independent.",
  );
  await home(page);
  await open(page);
  await page.route("**/games/team-arcade/v1/sonia.webp", (route) =>
    route.abort(),
  );
  await page.getByRole("button", { name: "ENTER THE ARENA" }).click();
  await expect(page.getByRole("alert")).toContainText(
    "Could not load SONIA artwork",
  );
  await page.waitForTimeout(500);
  await expect(page.getByRole("button", { name: "FIGHT!" })).toHaveCount(0);
  await page.unroute("**/games/team-arcade/v1/sonia.webp");
  await page.getByRole("button", { name: "RETRY →", exact: true }).click();
  await expect(page.getByRole("button", { name: "FIGHT!" })).toBeVisible();
});

test("cancelled loading cannot resurrect a game; all fighter atlases survive repeated start and exit", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "Repeated WebGL lifecycle coverage runs once.",
  );
  const errors: string[] = [];
  const requests: string[] = [];
  page.on("request", (request) => requests.push(request.url()));
  page.on("pageerror", (error) => errors.push(error.message));
  await home(page);
  await open(page);
  let finish: () => void = () => {};
  const release = new Promise<void>((resolve) => {
    finish = resolve;
  });
  await page.route("**/games/team-arcade/v1/*.webp", async (route) => {
    await release;
    await route.continue();
  });
  await page.getByRole("button", { name: "ENTER THE ARENA" }).click();
  await page.getByRole("button", { name: "Back to selection" }).click();
  finish();
  await page.unroute("**/games/team-arcade/v1/*.webp");
  await page.waitForTimeout(300);
  await expect(page.locator(".arcade-stage canvas")).toHaveCount(0);
  for (let i = 0; i < 20; i++) {
    // Each of the fifteen real atlases is decoded by Phaser as P1 and CPU.
    // The remaining cycles also exercise replacement after every sheet is cached.
    const player = FIGHTERS[FIGHTER_IDS[i % FIGHTER_IDS.length]];
    const opponent = FIGHTERS[FIGHTER_IDS[(i + 1) % FIGHTER_IDS.length]];
    await page.getByRole("button", { name: `Play as ${player.name}`, exact: true }).click();
    await page.getByRole("button", { name: `Fight against ${opponent.name}`, exact: true }).click();
    await enter(page);
    await page.getByRole("button", { name: "Close arcade" }).click();
    await expect(page.locator(".arcade-stage canvas")).toHaveCount(0);
    await open(page);
  }
  expect([...new Set(sheetRequests(requests))].sort()).toEqual(FIGHTER_IDS.map((id) => FIGHTERS[id].sheet).sort());
  expect(errors).toEqual([]);
});

test("touch supports simultaneous movement/attack and releases cancelled pointers", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "mobile",
    "Multi-touch uses the phone layout.",
  );
  await home(page);
  await open(page);
  await enter(page);
  await page.getByRole("button", { name: "FIGHT!" }).click();
  await expect(page.locator(".arcade-cabinet")).toHaveAttribute(
    "data-phase",
    "fight",
  );
  // Retreat into open space so a CPU hit/push cannot be mistaken for held input.
  // Keep the exact position assertion after cancellation; no timing tolerance.
  const left = page.getByRole("button", { name: "Left", exact: true }),
    punch = page.getByRole("button", { name: "Punch", exact: true });
  const before = Number(
    await page.locator(".arcade-cabinet").getAttribute("data-player-x"),
  );
  const r = await left.boundingBox(),
    p = await punch.boundingBox();
  if (!r || !p) throw new Error("Touch controls must be visible");
  const cdp = await page.context().newCDPSession(page);
  const movement = { x: r.x + r.width / 2, y: r.y + r.height / 2, id: 2 };
  const attack = { x: p.x + p.width / 2, y: p.y + p.height / 2, id: 3 };
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [movement],
  });
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [movement, attack],
  });
  await page.waitForTimeout(500);
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchCancel",
    touchPoints: [],
  });
  await page.waitForTimeout(100);
  const stoppedX = Number(
    await page.locator(".arcade-cabinet").getAttribute("data-player-x"),
  );
  await page.waitForTimeout(150);
  expect(
    Number(await page.locator(".arcade-cabinet").getAttribute("data-player-x")),
  ).toBe(stoppedX);
  expect(
    Number(await page.locator(".arcade-cabinet").getAttribute("data-player-x")),
  ).toBeLessThan(before);
  await page.getByRole("button", { name: "Ⅱ Pause", exact: true }).click();
  await page.screenshot({ path: testInfo.outputPath("mobile.png") });
  expect(
    await page
      .locator("dialog")
      .evaluate((el) => el.scrollWidth <= el.clientWidth + 1),
  ).toBe(true);
  await page.setViewportSize({ width: 844, height: 390 });
  await expect
    .poll(async () => {
      const box = await page
        .getByRole("button", { name: "Jump", exact: true })
        .boundingBox();
      const punchBox = await page
        .getByRole("button", { name: "Punch", exact: true })
        .boundingBox();
      return (
        !!box &&
        !!punchBox &&
        box.y >= 0 &&
        box.y + box.height <= 390 &&
        punchBox.y >= 0 &&
        punchBox.y + punchBox.height <= 390
      );
    })
    .toBe(true);
  await expect(page.locator(".arcade-stage canvas")).toHaveCount(1);
  await page.screenshot({ path: testInfo.outputPath("landscape.png") });
});
