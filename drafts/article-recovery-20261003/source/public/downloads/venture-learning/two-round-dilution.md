# Two-round dilution and capital-fit record

MLAI teaching aid — version 10 September 2026.

All figures below are fictional AUD examples. This is editable text, not an
automated spreadsheet, a valuation opinion or a transaction cap table.
Independent financial/legal review is pending. Do not use it to issue shares
or choose financing terms without appropriate advice.

## Model assumptions

- Founders initially own all 4,000 shares.
- Both financings are primary issues: the new cash goes to the company.
- All shares have identical economic rights in this model.
- No options, reserves, convertibles, fees, secondary sales or share splits.
- Existing holders do not invest more, sell shares or transfer holdings.
- All money inputs use AUD and the same units; pre-money values are assumed,
  not derived from market evidence. The round labels do not establish readiness.
- Ownership percentages do not model voting control, liquidation rights, tax,
  fees, exit distributions or cash that an existing holder can withdraw.

## First issue: A$4m pre-money plus A$1m new cash

Starting shares S0 = 4,000
Pre-money value V1 = A$4,000,000
New primary investment I1 = A$1,000,000
Price P1 = V1 / S0 = A$1,000 per share
New shares N1 = I1 / P1 = 1,000
Total S1 = S0 + N1 = 5,000
Post-money = V1 + I1 = A$5,000,000

Founders: 4,000 / 5,000 = 80%
Round-one investor: 1,000 / 5,000 = 20%

## Second issue: A$20m pre-money plus A$5m new cash

Pre-money value V2 = A$20,000,000
New primary investment I2 = A$5,000,000
Price P2 = V2 / S1 = A$4,000 per share
New shares N2 = I2 / P2 = 1,250
Total S2 = S1 + N2 = 6,250
Post-money = V2 + I2 = A$25,000,000

| Holder | Before funding | After first issue | After second issue |
| --- | --- | --- | --- |
| Founders | 4,000 / 100% | 4,000 / 80% | 4,000 / 64% |
| First investor | 0 / 0% | 1,000 / 20% | 1,000 / 16% |
| Second investor | 0 / 0% | 0 / 0% | 1,250 / 20% |
| Total | 4,000 / 100% | 5,000 / 100% | 6,250 / 100% |

Check: 4,000 + 1,000 + 1,250 = 6,250 shares.
Check: 64% + 16% + 20% = 100%.
The original holders keep their share counts; only the denominator grows.

## Formula and a changed-input exercise

For each issue, with strictly positive pre-money value V, new cash I and
existing total S, and the same exclusions as above:

Price per share = V / S
New shares = I / (V / S)
New total = S + new shares
New investor fraction = I / (V + I)
Each existing fraction afterward = previous fraction * V / (V + I)

Across the example's two issues:

Founder fraction = [V1 / (V1 + I1)] * [V2 / (V2 + I2)]
                 = 0.8 * 0.8 = 0.64 = 64%

Subtracting 20 percentage points twice from 100% would incorrectly give 60%.
The second 20% dilution acts on the ownership already remaining.

Practice: keep issue one unchanged, but assume issue two has A$15m pre-money
and A$5m new cash. Calculate the new investor fraction and both existing-holder
fractions before reading the answer.

Answer: new investor = 5 / (15 + 5) = 25%; founders = 80% * 75% = 60%;
first investor = 20% * 75% = 15%. They sum to 100%.
These changed inputs are not a suggested down/up round or acceptable price.
Algebra with other inputs can produce fractional share equivalents; actual
issuance, rounding and instrument terms require a transaction-specific model.
Zero/negative inputs and different instruments are outside this teaching model.

## Capital-fit discussion record

Milestone the business is trying to reach:
Evidence that milestone needs external capital:
Alternatives I still need to understand:
Assumptions about timing, cost and ownership:
Question for a general discussion:
Questions that need my own qualified adviser:

For every material input add: source/date, unit/currency, observed fact versus
assumption, exclusions and the evidence that could change your view. Do not
count a proposed investment as cash received. Keep confidential financials out
of open community discussions.

## Vocabulary source and next reading

- [Cooley GO: post-money valuation](https://www.cooleygo.com/glossary/post-money-valuation/), checked 10 September 2026. US-context vocabulary, not Australian legal advice. MLAI's numerical scenario is original and fictional.
- [MLAI capital-choice primer](https://mlai.au/articles/featured/venture-capital-how-does-it-work).
- [MLAI option-pool exercise](https://mlai.au/articles/featured/how-vcs-value-startups) adds a different, explicitly bounded reserve assumption; neither model handles your actual instruments automatically.

Reviewer name, qualification and actual reviewed scope: pending.
Reader's source/assumption questions for review:
