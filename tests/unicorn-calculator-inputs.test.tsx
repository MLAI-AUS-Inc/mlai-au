import { expect, test } from 'bun:test';
import { calculatePrimaryRound, primaryRoundCsv } from '../app/components/articles/UnicornValuationCalculator';

test('invalid and missing inputs cannot become a plausible round or CSV', () => {
  for (const preMoney of [NaN, Infinity, -1, 0]) {
    expect(calculatePrimaryRound({ preMoney, newMoney: 100, founderOwnership: 60 })).toBeNull();
    expect(primaryRoundCsv('AUD', preMoney, 100, 60)).toBeNull();
  }
  for (const newMoney of [NaN, Infinity, -1]) expect(calculatePrimaryRound({ preMoney: 900, newMoney, founderOwnership: 60 })).toBeNull();
  for (const founderOwnership of [NaN, Infinity, -1, 101]) expect(calculatePrimaryRound({ preMoney: 900, newMoney: 100, founderOwnership })).toBeNull();
  expect(calculatePrimaryRound({ preMoney: Number.MAX_VALUE, newMoney: Number.MAX_VALUE, founderOwnership: 60 })).toBeNull();
});

test('no new money preserves ownership and boundary ownership stays finite', () => {
  expect(calculatePrimaryRound({ preMoney: 900, newMoney: 0, founderOwnership: 60 })).toEqual({ postMoney: 900, investorOwnership: 0, founderOwnershipAfter: 60, founderDilutionPoints: 0 });
  expect(calculatePrimaryRound({ preMoney: 900, newMoney: 100, founderOwnership: 0 })!.founderOwnershipAfter).toBe(0);
  expect(calculatePrimaryRound({ preMoney: 900, newMoney: 100, founderOwnership: 100 })!.founderOwnershipAfter).toBe(90);
});

test('exported scenario uses the checked arithmetic, chosen currency and exclusions', () => {
  const csv = primaryRoundCsv('USD', 900, 100, 60)!;
  expect(csv).toContain('"Currency","USD"');
  expect(csv).toContain('"Post-money valuation (millions)","1000"');
  expect(csv).toContain('"New investor ownership (%)","10.00"');
  expect(csv).toContain('"Founder group after (%)","54.00"');
  expect(csv).toContain('secondary sales');
  expect(csv.split('\n')).toHaveLength(9);
});
