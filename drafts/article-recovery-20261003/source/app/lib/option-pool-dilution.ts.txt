export type OptionPoolScenario = {
  preMoney: number;
  newMoney: number;
  poolPercent: number;
};

type Allocation = {
  existingPercent: number;
  investorPercent: number;
  poolPercent: number;
};

export type OptionPoolComparison =
  | { ok: false; error: string }
  | {
      ok: true;
      noPool: Allocation;
      preMoneyPool: Allocation;
      postMoneyPool: Allocation;
      existingDifferencePoints: number;
    };

/**
 * Educational fully diluted allocations, not a transaction cap table.
 * Both money inputs use the same currency/unit. There is no existing pool or
 * other dilutive instrument. poolPercent is the ungranted reserve AFTER both
 * steps. Pre-money inclusion leaves the new investor's fraction unchanged;
 * post-money creation dilutes that investor and existing holders pro rata.
 */
export function compareOptionPoolDilution({ preMoney, newMoney, poolPercent }: OptionPoolScenario): OptionPoolComparison {
  if (![preMoney, newMoney, poolPercent].every(Number.isFinite)) {
    return { ok: false, error: 'Enter a finite number in every field.' };
  }
  if (preMoney <= 0 || newMoney <= 0) {
    return { ok: false, error: 'Pre-money value and new investment must both be greater than zero.' };
  }
  if (poolPercent < 0 || poolPercent >= 100) {
    return { ok: false, error: 'The final pool must be at least 0% and less than 100%.' };
  }
  const total = preMoney + newMoney;
  const investor = newMoney / total;
  const existing = preMoney / total;
  if (!Number.isFinite(total) || investor <= 0 || existing <= 0 || investor >= 1 || existing >= 1) {
    return { ok: false, error: 'These amounts are outside the numerical range of this simple illustration.' };
  }
  const pool = poolPercent / 100;
  // Equality would leave no positive existing-holder allocation at a positive
  // pre-money price; there is no finite share-count solution in this model.
  if (pool >= existing) {
    return { ok: false, error: 'This pool target leaves no positive allocation for existing holders in the pre-money-pool case. Reduce the target to compare both cases.' };
  }
  return {
    ok: true,
    noPool: { existingPercent: existing * 100, investorPercent: investor * 100, poolPercent: 0 },
    preMoneyPool: { existingPercent: (existing - pool) * 100, investorPercent: investor * 100, poolPercent },
    postMoneyPool: { existingPercent: existing * (1 - pool) * 100, investorPercent: investor * (1 - pool) * 100, poolPercent },
    existingDifferencePoints: investor * pool * 100,
  };
}
