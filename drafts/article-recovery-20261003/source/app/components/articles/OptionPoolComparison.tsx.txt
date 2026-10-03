import { useId, useState } from 'react';
import { compareOptionPoolDilution } from '~/lib/option-pool-dilution';

const defaults = { preMoney: '8', newMoney: '2', poolPercent: '10' };
const inputClass = 'mt-2 w-full min-w-0 rounded-lg border border-gray-500 bg-white px-3 py-3 text-base text-gray-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700';
const percent = (value: number) => `${value.toFixed(2)}%`;

export default function OptionPoolComparison({ headingId = 'option-pool-comparison' }: { headingId?: string }) {
  const id = useId();
  const [inputs, setInputs] = useState(defaults);
  const result = Object.values(inputs).some(value => value.trim() === '')
    ? { ok: false as const, error: 'Complete every field to show a comparison; a blank is not zero.' }
    : compareOptionPoolDilution({ preMoney: Number(inputs.preMoney), newMoney: Number(inputs.newMoney), poolPercent: Number(inputs.poolPercent) });

  return (
    <section aria-labelledby={headingId} className="not-prose my-10 rounded-3xl border-2 border-gray-950 bg-[#fefc22] p-5 text-gray-950 sm:p-8">
      <p className="text-xs font-black uppercase tracking-widest">MLAI dilution learning exercise</p>
      <h2 id={headingId} className="mt-3 scroll-mt-24 break-words text-3xl font-black tracking-tight">Compare where the option pool sits</h2>
      <p id={`${id}-assumptions`} className="mt-4 text-sm leading-6">
        Start with fictional A$8m pre-money, A$2m new cash and a 10% final ungranted pool.
        Assume no existing pool, granted options, SAFEs, notes, warrants, secondary sales, fees or different economic rights.
        The percentages count the ungranted reserve in the fully diluted total; they are not issued voting ownership or exit proceeds.
      </p>
      <p className="mt-3 text-sm leading-6">Change the assumptions to explore the arithmetic. This component does not save or submit the inputs. It cannot value a company or replace a transaction-specific cap table.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {([
          ['preMoney', 'Pre-money value (A$ millions)'],
          ['newMoney', 'New primary investment (A$ millions)'],
          ['poolPercent', 'Final ungranted pool (%)'],
        ] as const).map(([key, label]) => (
          <label key={key} className="min-w-0 text-sm font-bold">
            {label}
            <input type="number" min="0" max={key === 'poolPercent' ? 100 : undefined} step="any" value={inputs[key]}
              aria-describedby={`${id}-assumptions ${id}-status`} aria-invalid={!result.ok}
              onChange={event => setInputs(previous => ({ ...previous, [key]: event.target.value }))} className={inputClass} />
          </label>
        ))}
      </div>
      <p id={`${id}-status`} role="status" aria-live="polite" className="mt-5 text-sm font-semibold leading-6">
        {result.ok
          ? `Existing holders have ${result.existingDifferencePoints.toFixed(2)} percentage points more in the post-money-pool illustration than the pre-money-pool illustration. This is not a recommendation of either structure.`
          : result.error}
      </p>
      {result.ok ? (
        <div role="region" aria-label="Option pool allocation comparison" tabIndex={0} className="mt-4 overflow-x-auto rounded-xl border border-gray-400 bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700">
          <table className="w-full min-w-[560px] text-left text-sm">
            <caption className="p-3 text-left text-sm">Illustrative fully diluted allocation after all described steps. Display rounded to two decimals.</caption>
            <thead className="bg-gray-100"><tr>
              {['Scenario', 'Existing holders', 'New investor', 'Ungranted pool'].map(label => <th key={label} scope="col" className="p-3">{label}</th>)}
            </tr></thead>
            <tbody>{([
              ['No pool — reference only', result.noPool],
              ['Pool included in pre-money pricing', result.preMoneyPool],
              ['Pool created after the priced round', result.postMoneyPool],
            ] as const).map(([label, row]) => <tr key={label} className="border-t border-gray-200">
              <th scope="row" className="p-3 font-semibold">{label}</th>
              <td className="p-3">{percent(row.existingPercent)}</td><td className="p-3">{percent(row.investorPercent)}</td><td className="p-3">{percent(row.poolPercent)}</td>
            </tr>)}</tbody>
          </table>
        </div>
      ) : null}
      <p className="mt-4 text-sm leading-6">The target is measured after financing and pool creation in both cases. In the second case the new investor shares the pool dilution; no term protects its earlier percentage. Changing that term changes the answer. Pool size here is an assumption, not a hiring benchmark.</p>
      <button type="button" onClick={() => setInputs(defaults)} className="mt-5 rounded-full bg-gray-950 px-5 py-3 text-sm font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-700">Reset fictional example</button>
    </section>
  );
}
