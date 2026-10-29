# MLAI: price, dilution and option-pool learning record

Version: 10 September 2026. Fictional arithmetic, not a market valuation,
term-sheet recommendation, share-issue instruction or legal/financial advice.
The calculations have automated tests; independent professional review is pending.

Article: https://mlai.au/articles/featured/how-vcs-value-startups

## 1. State the assumptions

All money is AUD. Pre-money equity value V = A$8,000,000. New primary investment
I = A$2,000,000. Existing ordinary shares S = 1,000,000. There is no existing pool,
no granted options, SAFEs, notes, warrants, secondary sales, fees or different
economic rights. Cash goes to the company. No later financing is modelled.

The hypothetical new ungranted pool is p = 10% of the fully diluted total AFTER
both the financing and pool creation. The reserve counts in this mathematical
denominator; it is not presently issued/voting ownership or money for employees.
10% is an assumption, not a recommended or standard pool size.

## 2. No-pool primary round

- Price/share = V / S = A$8.
- New shares = I / price = 250,000.
- Total issued shares = 1,250,000.
- New investor = 250,000 / 1,250,000 = 20%.
- Existing holders = 1,000,000 / 1,250,000 = 80%.
- Headline post-money equity value = V + I = A$10,000,000.

The existing shares were not removed. The denominator increased. Neither 80%
nor a headline equity value is cash that existing holders can withdraw.

## 3. Pool included in pre-money pricing

Let i = I / (V + I) = 20%. The new investor retains i after the pool is included
in the pre-money capitalisation used to set its purchase price. With a final
pool p = 10%, existing holders have 1 - i - p = 70%.

To check this using share-equivalent counts, let r = I / V = 0.25 and let Q be
the new reserve. Q / ((S + Q) * (1 + r)) = p, so:

Q = p * (1 + r) * S / (1 - p * (1 + r)).

In this example Q is approximately 142,857.142857 share-equivalents. Price/share
is V / (S + Q) = A$7, and I / A$7 is approximately 285,714.285714 new shares.
The fully diluted total is approximately 1,428,571.428571, yielding:

- Existing holders: 70%.
- New investor: 20%.
- Ungranted reserve: 10%.

Fractional results deliberately expose the algebra. They are not executable
share allocations: actual documents, share counts, rounding, grants and rights
need qualified review. The model has no finite positive existing-holder solution
if p is at least V / (V + I); do not clamp that case into an apparent result.

## 4. Pool created after the priced round

First perform section 2, then create an ungranted reserve of 10% of the new fully
diluted total. Assume BOTH the existing holders and the new investor bear the
pool dilution pro rata, with no protection or repricing for the investor.

- Existing holders: 80% * 90% = 72%.
- New investor: 20% * 90% = 18%.
- Ungranted reserve: 10%.

As a count check, Q = 1,250,000 * 10% / 90%, approximately 138,888.888889
share-equivalents. The total is approximately 1,388,888.888889. Do not round
these intermediate values to determine an actual issuance.

72% - 70% = 2 percentage points, not a 2% relative increase. The difference is
i * p = 20% * 10% = 2 percentage points. Pool treatment changes the allocation;
this exercise does not recommend either transaction structure or guarantee that
either is offered. A SAFE's post-money definition is a different calculation.

## 5. Inspect before interpreting

For an actual proposal, ask a qualified adviser to resolve these questions from
the documents. Unknowns stay unknown; this record is not a substitute cap table.

- What is the instrument and which document/version defines the terms?
- What share classes, options, reserve, warrants and convertibles already exist?
- Is the quoted value pre-money or post-money, in which currency and on what date?
- Is the pool target the unused reserve or the entire plan, and at what point?
- Which instruments count in the pricing denominator and in the final denominator?
- Who bears any pool increase, conversion, later round or other dilution?
- What rights affect voting, control or distributions rather than this percentage?
- What proceeds are available, and what priority/participation rules apply?
- What rounding/share-count and legal/tax issues require professional review?
- Which input is verified, assumed, disputed or unavailable?

## 6. Record one comparison

Claim or valuation input being discussed:
Source, date, currency and measurement period:
Verified fact, assumption or unknown:
Why the comparison is relevant and where it differs:
Terms or missing information that may change interpretation:
Question for a qualified adviser before any decision:
Reviewer actually consulted, scope, date and unresolved questions:

## Definitions and provenance

Checked 10 September 2026:

- Cooley GO, pre-money/post-money terminology:
  https://www.cooleygo.com/glossary/pre-money-valuation/
  https://www.cooleygo.com/glossary/post-money-valuation/
- Cooley GO, context-dependent fully diluted denominator:
  https://www.cooleygo.com/glossary/fully-diluted-shares/
- Cooley GO, pre-money treatment of an available option reserve (reviewed by the
  publisher 2 March 2023): https://www.cooleygo.com/negotiating-option-pool/

These sources have US legal context. The examples, equations and comparison
record above are MLAI's educational construction, not the source's sample deal,
Australian transaction documents, measured company outcomes or a reviewed offer.
MLAI events support learning and discussion; attendance is not valuation advice.
