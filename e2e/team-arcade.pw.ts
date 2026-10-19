import { expect, test, type Page } from "@playwright/test";
import { FIGHTERS, FIGHTER_IDS, type FighterId } from "../app/games/team-arcade/roster";
import { ARENA_ASSET } from "../app/games/team-arcade/arena";

const sheetPaths = new Set<string>(FIGHTER_IDS.map((id) => FIGHTERS[id].sheet));
const sheetRequests = (requests: string[]) =>
  requests.map((url) => new URL(url).pathname).filter((path) => sheetPaths.has(path));
const arenaRequests = (requests: string[]) =>
  requests.filter((url) => new URL(url).pathname === ARENA_ASSET.url);
const SELECTION_MAP = "/games/team-arcade/v3/selection-world-map.jpg";

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
async function pick(page: Page, player: FighterId = "sam", opponent: FighterId = "sonia") {
  const selection = page.locator(".arcade-selection");
  if ((await selection.getAttribute("data-selection-step")) !== "player")
    await page.getByRole("button", { name: "CHANGE PLAYER", exact: true }).click();
  await page.getByRole("button", { name: `Play as ${FIGHTERS[player].name}`, exact: true }).click();
  await expect(selection).toHaveAttribute("data-selection-step", "opponent");
  await page.getByRole("button", { name: `Fight against ${FIGHTERS[opponent].name}`, exact: true }).click();
  await expect(selection).toHaveAttribute("data-selection-step", "ready");
}
async function confirm(page: Page) {
  if ((await page.locator(".arcade-selection").getAttribute("data-selection-step")) !== "ready")
    await pick(page);
  await page.getByRole("button", { name: "START MATCH", exact: true }).click();
}
async function enter(page: Page) {
  await confirm(page);
  if (await page.getByRole("dialog").getAttribute("data-layout-blocked") === "portrait")
    await page.setViewportSize({ width: 844, height: 390 });
  await expect(page.locator(".arcade-versus")).toBeVisible({
    timeout: 30000,
  });
  await expect(page.locator(".arcade-stage canvas")).toHaveCount(1);
}
async function start(page: Page, observeIntro = false) {
  await enter(page);
  if (observeIntro) {
    await expect(page.locator(".arcade-round-splash")).toHaveText("ROUND 1");
    expect(await page.locator(".arcade-round-splash").evaluate((element) => getComputedStyle(element).animationName)).not.toBe("none");
    await expect(page.locator(".arcade-fight-call")).toHaveText("FIGHT!");
    expect(await page.locator(".arcade-fight-call").evaluate((element) => getComputedStyle(element).fontFamily)).toContain("Arcade Pixel");
  }
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

test("one minimal roster selects all fifteen fighters in sequence and defers mirrored fight assets", async ({
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
  const mapResponse = page.waitForResponse((response) =>
    new URL(response.url()).pathname === SELECTION_MAP,
  );
  await open(page);
  expect(
    requests.filter((url) => /runtime\.client|phaser/.test(url)),
  ).toEqual([]);
  expect(sheetRequests(requests)).toEqual([]);
  expect(arenaRequests(requests)).toEqual([]);
  const dialog = page.getByRole("dialog");
  await expect(dialog).toHaveAttribute("data-mode", "select");
  const selectionStyle = await dialog.evaluate((element) => {
    const style = getComputedStyle(element);
    return { color: style.backgroundColor, image: style.backgroundImage };
  });
  const [red, green, blue] = selectionStyle.color.match(/[\d.]+/g)!.map(Number);
  expect(blue).toBeGreaterThan(150);
  expect(red).toBeLessThan(blue * 0.65);
  expect(green).toBeLessThan(blue * 0.65);
  expect(selectionStyle.image).toContain(SELECTION_MAP);
  const map = await mapResponse;
  expect(map.ok()).toBe(true);
  expect((await map.body()).subarray(0, 2)).toEqual(Buffer.from([0xff, 0xd8]));
  await expect(dialog.getByRole("searchbox")).toHaveCount(0);
  await expect(dialog.getByRole("combobox")).toHaveCount(0);
  await expect(dialog.locator("input")).toHaveCount(0);
  const selection = page.locator(".arcade-selection");
  await expect(selection).toHaveAttribute("data-selection-step", "player");
  await expect(page.getByRole("button", { name: "START MATCH", exact: true })).toBeDisabled();
  expect(await selection.evaluate((element) => getComputedStyle(element).fontFamily)).toContain("Arcade Pixel");
  expect(await page.evaluate(async () => {
    const loaded = await document.fonts.load('12px "Arcade Pixel"');
    return loaded.length > 0 && loaded.every((font) => font.status === "loaded") && document.fonts.check('12px "Arcade Pixel"');
  })).toBe(true);
  const samChoice = selection.getByRole("button", { name: "Play as Sam Donegan", exact: true });
  await samChoice.focus();
  await page.keyboard.press("ArrowRight");
  await expect(selection.getByRole("button", { name: "Play as Sonia Kaurah", exact: true })).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(selection.getByRole("button", { name: "Play as Dr Anu Ganugapati", exact: true })).toBeFocused();
  await page.keyboard.press("End");
  await expect(selection.getByRole("button", { name: "Play as Callum Holt", exact: true })).toBeFocused();
  await page.keyboard.press("Home");
  await expect(samChoice).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(selection).toHaveAttribute("data-selection-step", "opponent");
  await page.getByRole("button", { name: "CHANGE PLAYER", exact: true }).click();
  await expect(selection).toHaveAttribute("data-selection-step", "player");
  for (const [index, id] of FIGHTER_IDS.entries()) {
    const fighter = FIGHTERS[id];
    const preview = fighter.portrait.replace("/thumbnails/", "/pixel-art/").replace(".webp", "-pixel-still.webp");
    await expect(selection.locator(".arcade-choice-grid")).toHaveCount(1);
    await expect(selection.getByRole("button", { name: /^Play as / })).toHaveCount(15);
    await expect(selection.getByRole("button", { name: /^Fight against / })).toHaveCount(0);
    const choice = selection.getByRole("button", { name: `Play as ${fighter.name}`, exact: true });
    await expect(choice.locator("img")).toHaveAttribute("src", preview);
    await choice.click();
    await expect(selection).toHaveAttribute("data-selection-step", "opponent");
    await expect(page.getByTestId("player-selected-fighter")).toContainText(fighter.name);
    await expect(page.getByTestId("opponent-selected-fighter")).toContainText(FIGHTERS[index ? FIGHTER_IDS[index - 1] : "sonia"].name);
    await expect(selection.locator(".arcade-choice-grid")).toHaveCount(1);
    await expect(selection.getByRole("button", { name: /^Play as / })).toHaveCount(0);
    await expect(selection.getByRole("button", { name: /^Fight against / })).toHaveCount(15);
    await expect(page.getByRole("button", { name: "START MATCH", exact: true })).toBeDisabled();
    await selection.getByRole("button", { name: `Fight against ${fighter.name}`, exact: true }).click();
    await expect(selection).toHaveAttribute("data-selection-step", "ready");
    await expect(selection.getByRole("button", { name: /^Fight against / })).toHaveCount(15);
    for (const slot of ["player", "opponent"]) {
      const selected = page.getByTestId(`${slot}-selected-fighter`);
      await expect(selected).toContainText(fighter.name);
      await expect(selected.locator("img")).toHaveAttribute("src", preview);
    }
    await expect(page.getByRole("button", { name: "START MATCH", exact: true })).toBeEnabled();
    if (index < FIGHTER_IDS.length - 1) {
      await page.getByRole("button", { name: "CHANGE PLAYER", exact: true }).click();
      await expect(selection).toHaveAttribute("data-selection-step", "player");
    }
  }
  // CPU remains editable after both picks; P1 stays fixed, and mirrors work.
  await page.getByRole("button", { name: "Fight against Sam Donegan", exact: true }).click();
  await expect(page.getByTestId("player-selected-fighter")).toContainText("Callum Holt");
  await expect(page.getByTestId("opponent-selected-fighter")).toContainText("Sam Donegan");
  await page.getByRole("button", { name: "Fight against Callum Holt", exact: true }).click();
  await page.screenshot({ path: testInfo.outputPath("selection.png") });
  expect(arenaRequests(requests)).toEqual([]);
  await enter(page);
  await expect(page.locator(".arcade-versus")).toBeVisible();
  expect(await page.locator(".arcade-versus").evaluate((element) => getComputedStyle(element).animationName)).not.toBe("none");
  await page.waitForTimeout(250);
  await expect(page.locator(".arcade-cabinet")).toHaveAttribute("data-tick", "0");
  expect(arenaRequests(requests)).toHaveLength(1);
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
  await pick(page, "ryan", "pegah");
  await start(page, true);
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

test("reduced motion keeps the minimal menu, versus and round sequence playable", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Reduced-motion styling and lifecycle run once.");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await home(page);
  await open(page);
  await expect(page.getByRole("dialog")).toHaveAttribute("data-reduced-motion", "true");
  expect(await page.locator(".arcade-selection").evaluate((element) => getComputedStyle(element).animationName)).toBe("none");
  await pick(page, "sonia", "sonia");
  await enter(page);
  expect(await page.locator(".arcade-versus").evaluate((element) => getComputedStyle(element).animationName)).toBe("none");
  await expect(page.getByRole("button", { name: "FIGHT!", exact: true })).toHaveCount(0);
  await expect(page.locator(".arcade-round-splash")).toHaveText("ROUND 1");
  expect(await page.locator(".arcade-round-splash").evaluate((element) => getComputedStyle(element).animationName)).toBe("none");
  await expect(page.locator(".arcade-fight-call")).toHaveText("FIGHT!");
  expect(await page.locator(".arcade-fight-call").evaluate((element) => getComputedStyle(element).animationName)).toBe("none");
  await expect(page.locator(".arcade-cabinet")).toHaveAttribute("data-phase", "fight");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("heading", { name: "GAME PAUSED" })).toBeVisible();
  await page.getByRole("button", { name: "Change fighters" }).click();
  await expect(page.locator(".arcade-selection")).toHaveAttribute("data-selection-step", "player");
  await expect(page.locator(".arcade-stage canvas")).toHaveCount(0);
});

test("neutral Up crosses a nearby CPU and both fighters face their new sides", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Real keyboard crossover supplements deterministic jump tests.");
  await home(page);
  await open(page);
  await pick(page, "sam", "ryan");
  // Seed only the match-start event. Phaser still gets normal unique texture IDs.
  await page.getByRole("button", { name: "START MATCH", exact: true }).evaluate((button) => {
    button.addEventListener("click", () => {
      const original = Math.random;
      Math.random = () => { Math.random = original; return 0.421; };
      queueMicrotask(() => { Math.random = original; });
    }, { capture: true, once: true });
  });
  await start(page);
  const cabinet = page.locator(".arcade-cabinet");
  const position = () => cabinet.evaluate((element) => ({
    player: Number(element.getAttribute("data-player-x")),
    cpu: Number(element.getAttribute("data-cpu-x")),
    playerY: Number(element.getAttribute("data-player-y")),
    cpuY: Number(element.getAttribute("data-cpu-y")),
  }));
  let crossed = false, side = 1;
  // A live CPU can interrupt takeoff or jump away. Re-approach grounded range
  // before each attempt; require the player's own airborne travel to cross it.
  for (let attempt = 0; attempt < 3 && !crossed; attempt++) {
    for (let frame = 0; frame < 100; frame++) {
      const state = await position();
      if (Math.abs(state.cpu - state.player) <= 100 && state.playerY === 0 && state.cpuY === 0) break;
      const toward = state.player < state.cpu ? "d" : "a";
      await page.keyboard.up(toward === "d" ? "a" : "d");
      await page.keyboard.down(toward);
      await page.waitForTimeout(30);
    }
    await page.keyboard.up("a");
    await page.keyboard.up("d");
    const before = await position();
    if (Math.abs(before.cpu - before.player) > 135 || before.playerY !== 0 || before.cpuY !== 0) continue;
    side = Math.sign(before.cpu - before.player);
    await page.keyboard.down("ArrowUp");
    for (let frame = 0; frame < 80; frame++) {
      const state = await position();
      if (state.playerY > 20) await page.keyboard.up("ArrowUp");
      if (state.playerY > 0 && (state.player - before.player) * side > 54 && (state.cpu - state.player) * side < -10) {
        crossed = true;
        break;
      }
      await page.waitForTimeout(30);
    }
    await page.keyboard.up("ArrowUp");
    if (!crossed) await expect.poll(async () => (await position()).playerY, { timeout: 2500 }).toBe(0);
  }
  expect(crossed, "Neutral Up should carry a close airborne player past a grounded CPU").toBe(true);
  await expect(cabinet).toHaveAttribute("data-player-facing", String(-side));
  await page.screenshot({ path: testInfo.outputPath("jump-cross.png") });
  await expect.poll(async () => (await position()).playerY, { timeout: 2500 }).toBe(0);
  await expect(cabinet).toHaveAttribute("data-cpu-facing", String(side));
  const landed = await position();
  expect((landed.cpu - landed.player) * side).toBeLessThanOrEqual(-54);
});

test("versus countdown waits while the arena is scrolled away and resumes when visible", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Countdown visibility uses a real dialog scroll once.");
  await page.setViewportSize({ width: 320, height: 320 });
  await home(page);
  await open(page);
  await enter(page);
  await page.getByRole("button", { name: "Controls", exact: true }).click();
  const dialog = page.getByRole("dialog"), cabinet = page.locator(".arcade-cabinet");
  // Small windows can scroll the expanded controls below the whole arena.
  await dialog.evaluate((element) => element.scrollTo({ top: element.scrollHeight, behavior: "instant" }));
  await expect.poll(() => page.locator(".arcade-stage").evaluate((element) => {
    const stage = element.getBoundingClientRect(), container = element.closest("dialog")!.getBoundingClientRect();
    return stage.bottom <= Math.max(container.top, 0) || stage.top >= Math.min(container.bottom, innerHeight);
  })).toBe(true);
  await page.waitForTimeout(1800);
  await expect(dialog).toHaveAttribute("data-mode", "ready");
  await expect(cabinet).toHaveAttribute("data-tick", "0");
  await page.locator(".arcade-stage").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Close controls", exact: true }).click();
  await page.locator(".arcade-stage").scrollIntoViewIfNeeded();
  await expect(cabinet).toHaveAttribute("data-phase", "fight", { timeout: 15000 });
  await page.getByRole("button", { name: "Close arcade" }).click();
  await expect(page.locator(".arcade-stage canvas")).toHaveCount(0);
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
  await expect(page.locator(".arcade-versus")).toBeVisible();
  await expect(page.getByTestId("player-health")).toHaveText("100 HP");
  await expect(page.locator(".arcade-cabinet")).toHaveAttribute("data-phase", "fight");
  await page.getByRole("button", { name: "Ⅱ Pause", exact: true }).click();
  await page.getByRole("button", { name: "Change fighters" }).click();
  await expect(
    page.getByRole("button", { name: "START MATCH", exact: true }),
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
  await confirm(page);
  await expect(page.getByRole("alert")).toContainText(
    "Could not load SONIA artwork",
  );
  await page.waitForTimeout(500);
  await expect(page.locator(".arcade-versus")).toHaveCount(0);
  await page.unroute("**/games/team-arcade/v1/sonia.webp");
  await page.getByRole("button", { name: "RETRY →", exact: true }).click();
  await expect(page.locator(".arcade-versus")).toBeVisible();
});

test("missing office arena remains a clear error until retry restores the match", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "Required-stage failure recovery is engine independent.",
  );
  const requests: string[] = [];
  page.on("request", (request) => requests.push(request.url()));
  await home(page);
  await open(page);
  expect(arenaRequests(requests)).toEqual([]);
  const arenaRoute = `**${ARENA_ASSET.url}`;
  await page.route(arenaRoute, (route) => route.abort());
  await confirm(page);
  await expect(page.getByRole("alert").locator("p")).toHaveText(ARENA_ASSET.loadError);
  await page.waitForTimeout(500);
  await expect(page.getByRole("alert").locator("p")).toHaveText(ARENA_ASSET.loadError);
  await expect(page.locator(".arcade-versus")).toHaveCount(0);
  const failedAttempts = arenaRequests(requests).length;
  expect(failedAttempts).toBeGreaterThan(0);
  await page.unroute(arenaRoute);
  await page.getByRole("button", { name: "RETRY →", exact: true }).click();
  await expect(page.locator(".arcade-versus")).toBeVisible();
  await expect(page.getByRole("alert")).toHaveCount(0);
  await expect(page.locator(".arcade-stage canvas")).toHaveCount(1);
  expect(arenaRequests(requests)).toHaveLength(failedAttempts + 1);
  await expect(page.locator(".arcade-cabinet")).toHaveAttribute("data-phase", "fight");
  await page.screenshot({ path: testInfo.outputPath("office-retry.png") });
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
  await confirm(page);
  await page.getByRole("button", { name: "Back to selection" }).click();
  finish();
  await page.unroute("**/games/team-arcade/v1/*.webp");
  await page.waitForTimeout(300);
  await expect(page.locator(".arcade-stage canvas")).toHaveCount(0);
  for (let i = 0; i < 20; i++) {
    // Each of the fifteen real atlases is decoded by Phaser as P1 and CPU.
    // The remaining cycles also exercise replacement after every sheet is cached.
    await pick(page, FIGHTER_IDS[i % FIGHTER_IDS.length], FIGHTER_IDS[(i + 1) % FIGHTER_IDS.length]);
    await enter(page);
    await page.getByRole("button", { name: "Close arcade" }).click();
    await expect(page.locator(".arcade-stage canvas")).toHaveCount(0);
    await open(page);
  }
  // Let the last VS auto-start deadline expire after its owning game closed.
  await page.waitForTimeout(1600);
  await expect(page.getByRole("dialog")).toHaveAttribute("data-mode", "select");
  await expect(page.locator(".arcade-stage canvas")).toHaveCount(0);
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
  await start(page);
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
  // A captured thumb can slide to another button, then leave the pad. Each
  // transition releases the old action rather than leaving movement stuck.
  const jump = (await page.getByRole("button", { name: "Jump", exact: true }).boundingBox())!;
  await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [movement] });
  await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ ...movement, x: jump.x + jump.width / 2, y: jump.y + jump.height / 2 }] });
  await expect(page.locator('.arcade-touch[data-action="jump"]')).toHaveAttribute("data-held", "true");
  await expect(left).toHaveAttribute("data-held", "false");
  await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ ...movement, x: 200, y: 55 }] });
  await expect(page.locator('.arcade-touch[data-held="true"]')).toHaveCount(0);
  await cdp.send("Input.dispatchTouchEvent", { type: "touchCancel", touchPoints: [] });
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
