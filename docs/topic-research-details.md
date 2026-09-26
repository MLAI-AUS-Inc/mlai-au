# Topic research details

The marketing topic picker keeps its compact list and expands a topic when its
title is clicked or activated with Enter/Space. Expansion does not select the
topic, charge points, submit the article form, or trigger research. Select,
Continue, and Ignore remain separate controls. The custom-research picker uses
the same detail component.

## Measurements

- Google monthly history shows the latest six calendar months available from
  DataForSEO, with dates, provider estimates, and an accessible values table.
  Missing observations remain gaps; no history or dates are invented.
- Google Trends fallback uses relative interest (0–100) and the actual observed
  period. It is not labelled as monthly search volume or a six-month series.
- Trend direction compares equally sized first/last halves of consecutive
  measurements, ignoring a middle sample for odd counts. At least 100% growth
  is labelled Breakout, more than 15% Growing, less than -15% Declining, and
  otherwise Stable. A zero starting baseline has no percentage. Gaps and
  all-zero history do not establish a direction. These are the product's
  classifications, not Google's separately defined “Breakout” related-query label.
- Difficulty accepts only a verified DataForSEO Labs/bulk score from 0–100.
  Zero is valid. Default scores, missing data, and failed lookups are never
  presented as verified difficulty. Guidance does not promise ranking timelines.
- Where supplied, market/language, provider update time, and the last lookup
  attempt appear separately. A recent lookup does not imply recent observations.

## Cross-service fixes

The frontend previously discarded history/trend fields during normalization.
The discovery worker fetched measured trends only for notification topics and
omitted difficulty provenance in selection callbacks. Backend extraction lost
nested history and valid zero values, and sparse upserts could erase previously
verified measurements.

The corresponding `content-factory` changes enrich every researched candidate,
including selected carryovers, with exact-keyword Google overview and difficulty
fallback calls. The `mlai-backend` changes preserve measurements and expose an
atomic history/source/unit contract. No database schema changes are required.

Deploy all three code changes together. Existing records that never received
measurements require another research run through the existing workflow.
Opening a detail card is read-only. Providers may legitimately have no coverage
for a keyword; that state is explained instead of remaining indefinitely pending.

See the companion contracts in `content-factory/contracts/topic-metrics.md` and
the backend Content Factory documentation. No deployment, production refresh,
or live paid provider requests were performed as part of this local change.

## Local validation

- Frontend metrics, normalization, component and marketing regression tests.
- Four actual backend extraction fixtures exercised through frontend
  normalization: six-month growth, zero difficulty, lookup failure, and relative
  interest fallback.
- Full frontend typecheck and article internal-link check.
- Provider/discovery/callback tests with mocked provider responses, and backend
  tests that prohibit database and network access.
- Browser fixture preview: desktop and 390px mobile, keyboard disclosure,
  separate Select/Continue/Ignore actions, exact-value table, no page overflow,
  and explicit lookup failure state. Fixtures are illustrative, not live data.
