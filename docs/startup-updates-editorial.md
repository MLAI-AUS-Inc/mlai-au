# Startup updates page

The updates home now features the newest update alongside three smaller stories. The heading uses the active startup's name. A See all updates link below the smaller stories opens the complete collection at the same route with `?view=all`. It shows 12 cards at a time, with a Show more updates button. Monthly and weekly updates share this collection.

Titles are calculated across the complete collection, grouped by reporting year and month. A single entry is June Update; multiple entries become 14th June Update, 21st June Update, and so on. Reporting cutoffs use the startup timezone, explicit weekly end dates take precedence, and later publication or edit dates cannot shift a historical update into another month. The same title is supplied to the full update view. Unknown days are not invented.

The optional financial section displays one frozen history from an identified, currently connected financial source. It never combines snapshots, currencies, Stripe receipts and Xero revenue. Partial periods are omitted, missing months remain gaps, and a Stripe-only history does not imply knowledge of costs. No connected source or no recorded positive income means the section is absent. Source-status failure also leaves updates usable.

The chart has a larger plot, a subtle income fill, a dashed cost line, exact-value tooltips, 6M/12M/All controls where applicable, keyboard support and an expandable data table. It provides historical context without health summaries, projections or recommendations.

Cover URLs are supported when supplied by the API. Updates without artwork use responsive typographic date covers; failed images fall back to the same treatment. This change does not add an image-upload workflow.

## Validation

- 37 tests across startup-updates-presentation, monthly-update-evidence, vibe-raising-financial-snapshot and vibe-raising-update-cadence passed.
- TypeScript and the article internal-link check passed.
- Production build passed.
- Browser checks at 1440px desktop and 390px mobile confirmed no horizontal overflow, working chart-range selection, all-updates navigation, dates for multiple June entries and the no-revenue layout.
- The local visual fixture uses existing MLAI reporting figures and illustrative excerpts. Authentication and live data remain handled by the real route loader.
