import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const repoRoot = join(import.meta.dir, "..");

function source(path: string) {
  return readFileSync(join(repoRoot, path), "utf8");
}

describe("homepage donation modal", () => {
  test("places a Donate action between the Slack and Events actions", () => {
    const hero = source("app/components/hero.tsx");

    expect(hero).toContain('import DonationModal from "~/components/DonationModal"');
    expect(hero.indexOf("Join Slack")).toBeLessThan(hero.indexOf("<DonationModal"));
    expect(hero.indexOf("<DonationModal")).toBeLessThan(hero.indexOf("See Events"));
    expect(hero).toContain("lg:grid-cols-[1fr_auto_1fr]");
  });

  test("uses an accessible Headless UI dialog and Stripe's supported buy button", () => {
    const modal = source("app/components/DonationModal.tsx");

    expect(modal).toContain('from "@headlessui/react"');
    expect(modal).toContain("<Dialog");
    expect(modal).toContain("<Dialog.Title");
    expect(modal).toContain("initialFocus={closeButtonRef}");
    expect(modal).toContain('https://js.stripe.com/v3/buy-button.js');
    expect(modal).toContain('React.createElement("stripe-buy-button"');
    expect(modal).toContain('customElements.whenDefined("stripe-buy-button")');
    expect(modal).toContain("STRIPE_LOAD_TIMEOUT_MS");
    expect(modal).toContain("stripeBuyButtonLoad = undefined");
    expect(modal).toContain("?.remove()");
  });

  test("reads only public Vite configuration and handles missing configuration", () => {
    const modal = source("app/components/DonationModal.tsx");
    const exampleEnv = source(".dev.vars.example");

    expect(modal).toContain("import.meta.env.VITE_STRIPE_DONATION_BUY_BUTTON_ID");
    expect(modal).toContain("import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY");
    expect(modal).not.toMatch(/STRIPE_SECRET|process\.env/);
    expect(modal).toContain("/^buy_btn_[A-Za-z0-9]+$/");
    expect(modal).toContain("/^pk_(test|live)_[A-Za-z0-9]+$/");
    expect(modal).toContain("Donations are temporarily unavailable");
    expect(exampleEnv).toContain("VITE_STRIPE_DONATION_BUY_BUTTON_ID=");
    expect(exampleEnv).toContain("VITE_STRIPE_PUBLISHABLE_KEY=");
  });
});
