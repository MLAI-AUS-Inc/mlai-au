import { expect, type Page } from "@playwright/test";

/** Waits for the console to settle and puts the cartridge in.
 *  Where the 3D console runs it pulls its own cartridge once to show itself, which hides
 *  the team select until the cartridge goes back; the flat console starts with it seated. */
export async function seatCartridge(page: Page) {
  const console_ = page.locator(".team-console");
  await expect(console_).toHaveAttribute("data-console-ready", "true", { timeout: 30_000 });
  await expect(console_).toHaveAttribute("data-cart", /^(seated|out)$/, { timeout: 15_000 });
  if ((await console_.getAttribute("data-cart")) === "out") {
    await page.getByRole("button", { name: "Insert cartridge", exact: true }).click();
    await expect(console_).toHaveAttribute("data-cart", "seated", { timeout: 15_000 });
  }
}
