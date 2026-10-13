import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { RooPurchasePrice, type RooPurchaseTax } from "../app/components/RooPurchasePrice";

function tax(total: number, gst: number): RooPurchaseTax {
  return { name: "GST", country: "AU", percentage: "10", inclusive: true,
    currency: "aud", total_cents: total, subtotal_cents: total - gst, amount_cents: gst };
}

describe("Roo purchase prices", () => {
  test.each([[1999, 182, "18.17", "1.82", "19.99"], [3699, 336, "33.63", "3.36", "36.99"], [6399, 582, "58.17", "5.82", "63.99"]] as const)(
    "shows inclusive GST without increasing the %i-cent pack total",
    (total, gst, netText, gstText, totalText) => {
      const html = renderToStaticMarkup(<RooPurchasePrice amountCents={total} currency="aud" tax={tax(total, gst)} />);
      expect(html).toContain("Price before GST");
      expect(html).toContain("GST (10%)");
      expect(html).toContain("Total including GST");
      for (const amount of [netText, gstText, totalText]) expect(html).toContain(amount);
    }
  );
  test("does not relabel historical receipts without a tax snapshot", () => {
    const html = renderToStaticMarkup(<RooPurchasePrice amountCents={1999} currency="aud" tax={null} />);
    expect(html).toContain("Price");
    expect(html).toContain("19.99");
    expect(html).not.toContain("GST");
  });
  test.each([{ total_cents: 2099 }, { subtotal_cents: 1900 }, { currency: "usd" }, { inclusive: false }])(
    "does not display inconsistent tax evidence: %j", (changes) => {
      const html = renderToStaticMarkup(<RooPurchasePrice amountCents={1999} currency="aud" tax={{ ...tax(1999, 182), ...changes }} />);
      expect(html).not.toContain("GST");
      expect(html).toContain("19.99");
    }
  );
});
