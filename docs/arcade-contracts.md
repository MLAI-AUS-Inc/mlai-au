# Arcade roster handoff

The homepage team selector is a directory styled like an arcade character selector. This change establishes contracts for a future game; it adds no game loop or playable fight.

`app/data/team-roster.ts` owns all 15 profiles and permanent IDs. Never regenerate an ID after a rename, reorder or role change. `resolveTeamMember` resolves untrusted selections to Callum, or the first member of a custom roster. Empty rosters are rejected. Arrow navigation follows current roster order and wraps. `Team` accepts an initial ID and calls `onFighterSelect` for desktop/mobile selections and arrows.

`app/lib/arcade/contracts.ts` separates identity from artwork and combat defaults. The shell captures keyboard/touch actions, including release events, and renders simulation state. The simulation advances rules using elapsed milliseconds. The keyboard map uses KeyboardEvent.code; the future shell must manage held keys and avoid capturing inputs in editable fields. Touch controls should emit the same actions. Rendering, audio, frame scheduling and engine choice remain future work.

## Pilot and artwork

Start with two pilot fighters before expanding unique artwork to the full roster. The pair remains undecided pending team agreement. All 15 current mappings explicitly have placeholder status. The existing directory GIF is bundled at `/arcade/fighter-placeholder.gif`; the original background is bundled at `/arcade/world-map.jpg`. These assets use local paths so the selector does not expose Firebase download tokens. Previously published tokens still require revocation by a Firebase owner; removing the URLs does not invalidate historical copies. The GIF is a shared preview, not a combat sprite sheet. Animation mappings are empty; consumers must not assume animation assets exist. Generic combat fallback approval remains pending. Artwork volunteers should supply approved animation mappings keyed by permanent fighter ID. Health, movement and attack numbers are illustrative prototype defaults and require gameplay review.

## Verification

Unit tests exercise unique IDs, default and invalid selection, reorder stability, wraparound and placeholder coverage. Browser review should confirm all 15 members on desktop/mobile, Callum as the initial selection, arrows, profile links and unchanged hackathon destinations. Social-link cleanup and press-kit content extraction are separate tasks.
