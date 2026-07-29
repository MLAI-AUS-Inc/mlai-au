import { useMemo, useState } from "react";

type Currency = "AUD" | "USD";

function toSafeNumber(value: number) {
  return Number.isFinite(value) && value >= 0 ? value : 0;
}

function formatMoney(value: number, currency: Currency) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(value);
}

function escapeCsv(value: string | number) {
  const text = String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

export function calculatePrimaryRound({
  preMoney,
  newMoney,
  founderOwnership,
}: {
  preMoney: number;
  newMoney: number;
  founderOwnership: number;
}) {
  const safePreMoney = toSafeNumber(preMoney);
  const safeNewMoney = toSafeNumber(newMoney);
  const safeFounderOwnership = Math.min(
    100,
    toSafeNumber(founderOwnership),
  );
  const postMoney = safePreMoney + safeNewMoney;
  const existingHolderFactor = postMoney > 0 ? safePreMoney / postMoney : 0;
  const investorOwnership =
    postMoney > 0 ? (safeNewMoney / postMoney) * 100 : 0;
  const founderOwnershipAfter =
    safeFounderOwnership * existingHolderFactor;

  return {
    postMoney,
    investorOwnership,
    founderOwnershipAfter,
    founderDilutionPoints: safeFounderOwnership - founderOwnershipAfter,
  };
}

export default function UnicornValuationCalculator() {
  const [currency, setCurrency] = useState<Currency>("AUD");
  const [preMoney, setPreMoney] = useState(900);
  const [newMoney, setNewMoney] = useState(100);
  const [founderOwnership, setFounderOwnership] = useState(60);

  const result = useMemo(
    () =>
      calculatePrimaryRound({
        preMoney,
        newMoney,
        founderOwnership,
      }),
    [founderOwnership, newMoney, preMoney],
  );

  const downloadScenario = () => {
    if (typeof window === "undefined") return;

    const rows = [
      ["Scenario", "Simplified primary priced round"],
      ["Currency", currency],
      ["Pre-money valuation (millions)", preMoney],
      ["New primary investment (millions)", newMoney],
      ["Post-money valuation (millions)", result.postMoney],
      ["New investor ownership (%)", result.investorOwnership.toFixed(2)],
      ["Founder group before (%)", founderOwnership],
      ["Founder group after (%)", result.founderOwnershipAfter.toFixed(2)],
      [
        "Important limitation",
        "Excludes option-pool changes, SAFEs, notes, preferences, debt, tax and secondary sales. Obtain legal and financial advice.",
      ],
    ];
    const csv = rows.map((row) => row.map(escapeCsv).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "mlai-primary-round-scenario.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section
      aria-labelledby="valuation-calculator-heading"
      className="not-prose my-10 rounded-[30px] border-2 border-gray-950 bg-[#fefc22] p-5 shadow-[7px_7px_0_#111827] sm:p-8"
    >
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#4b1bd1]">
        MLAI founder worksheet
      </p>
      <h2
        id="valuation-calculator-heading"
        className="mt-2 text-3xl font-black tracking-tight text-gray-950"
      >
        Model a simple primary priced round
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-800">
        Enter amounts in millions. The worksheet performs one transparent
        ownership calculation in your browser; it does not submit or save the
        numbers.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <label className="text-sm font-black text-gray-900">
          Currency
          <select
            value={currency}
            onChange={(event) => setCurrency(event.target.value as Currency)}
            className="mt-2 w-full rounded-xl border border-gray-400 bg-white px-3 py-3 text-base text-gray-950 focus:border-[#4b1bd1] focus:outline-none focus:ring-4 focus:ring-purple-100"
          >
            <option value="AUD">Australian dollars</option>
            <option value="USD">US dollars</option>
          </select>
        </label>
        <label className="text-sm font-black text-gray-900">
          Pre-money valuation
          <input
            type="number"
            min="0"
            step="1"
            value={preMoney}
            onChange={(event) =>
              setPreMoney(toSafeNumber(event.currentTarget.valueAsNumber))
            }
            className="mt-2 w-full rounded-xl border border-gray-400 bg-white px-3 py-3 text-base text-gray-950 focus:border-[#4b1bd1] focus:outline-none focus:ring-4 focus:ring-purple-100"
          />
        </label>
        <label className="text-sm font-black text-gray-900">
          New primary investment
          <input
            type="number"
            min="0"
            step="1"
            value={newMoney}
            onChange={(event) =>
              setNewMoney(toSafeNumber(event.currentTarget.valueAsNumber))
            }
            className="mt-2 w-full rounded-xl border border-gray-400 bg-white px-3 py-3 text-base text-gray-950 focus:border-[#4b1bd1] focus:outline-none focus:ring-4 focus:ring-purple-100"
          />
        </label>
        <label className="text-sm font-black text-gray-900">
          Founder group before (%)
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={founderOwnership}
            onChange={(event) =>
              setFounderOwnership(
                Math.min(
                  100,
                  toSafeNumber(event.currentTarget.valueAsNumber),
                ),
              )
            }
            className="mt-2 w-full rounded-xl border border-gray-400 bg-white px-3 py-3 text-base text-gray-950 focus:border-[#4b1bd1] focus:outline-none focus:ring-4 focus:ring-purple-100"
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        {[
          {
            label: "Post-money valuation",
            value: `${formatMoney(result.postMoney, currency)}m`,
          },
          {
            label: "New investor",
            value: `${result.investorOwnership.toFixed(1)}%`,
          },
          {
            label: "Founder group after",
            value: `${result.founderOwnershipAfter.toFixed(1)}%`,
          },
          {
            label: "Founder dilution",
            value: `${result.founderDilutionPoints.toFixed(1)} points`,
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-gray-300 bg-white p-4"
          >
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-gray-600">
              {item.label}
            </p>
            <p className="mt-2 text-xl font-black text-gray-950">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl bg-gray-950 p-5 text-sm leading-6 text-gray-200">
        <p className="font-black text-white">What the formula assumes</p>
        <p className="mt-2">
          Post-money = pre-money + new primary cash. New investor ownership =
          new cash ÷ post-money. Existing holders are multiplied by pre-money ÷
          post-money. This is not valid for a secondary share sale and excludes
          option-pool changes, SAFEs, convertible notes, liquidation
          preferences, debt, tax and other rights.
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-4">
        <button
          type="button"
          onClick={downloadScenario}
          className="rounded-full bg-[#4b1bd1] px-5 py-3 text-sm font-black text-white transition hover:bg-purple-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-purple-200"
        >
          Download scenario as CSV
        </button>
        <button
          type="button"
          onClick={() => {
            setCurrency("AUD");
            setPreMoney(900);
            setNewMoney(100);
            setFounderOwnership(60);
          }}
          className="text-sm font-black text-[#4b1bd1] underline decoration-2 underline-offset-4 focus:outline-none focus-visible:ring-4 focus-visible:ring-purple-200"
        >
          Reset checked example
        </button>
      </div>
      <p className="mt-4 text-xs leading-5 text-gray-700">
        Educational worksheet only. Have qualified Australian legal, tax and
        financial advisers review your company’s documents and cap table.
      </p>
    </section>
  );
}
