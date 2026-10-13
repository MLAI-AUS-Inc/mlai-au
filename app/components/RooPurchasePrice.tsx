export type RooPurchaseTax = {
  name: string;
  country: string;
  percentage: string;
  inclusive: boolean;
  currency: string;
  total_cents: number;
  subtotal_cents: number;
  amount_cents: number;
};

function money(cents: number, currency: string) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency", currency: currency.toUpperCase(),
  }).format(cents / 100);
}

export function RooPurchasePrice({ amountCents, currency, tax }: {
  amountCents: number;
  currency: string;
  tax?: RooPurchaseTax | null;
}) {
  // Legacy purchases without a recorded tax quote/snapshot retain their price
  // display. Do not retrospectively claim that their Stripe receipt included GST.
  const hasGst = tax?.name === "GST" && tax.country === "AU" && tax.percentage === "10"
    && tax.inclusive === true && tax.currency === currency.toLowerCase()
    && tax.total_cents === amountCents && Number.isInteger(tax.amount_cents)
    && tax.amount_cents > 0 && Number.isInteger(tax.subtotal_cents)
    && tax.subtotal_cents + tax.amount_cents === amountCents;

  return (
    <dl className="space-y-3">
      {hasGst && tax ? <>
        <div className="flex items-center justify-between text-sm">
          <dt className="text-black/58">Price before GST</dt>
          <dd className="font-semibold">{money(tax.subtotal_cents, currency)}</dd>
        </div>
        <div className="flex items-center justify-between text-sm">
          <dt className="text-black/58">GST (10%)</dt>
          <dd className="font-semibold">{money(tax.amount_cents, currency)}</dd>
        </div>
      </> : null}
      <div className="flex items-center justify-between text-base">
        <dt className="text-black/58">{hasGst ? "Total including GST" : "Price"}</dt>
        <dd className="text-2xl font-black">{money(amountCents, currency)}</dd>
      </div>
    </dl>
  );
}
