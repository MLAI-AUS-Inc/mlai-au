# MLAI community arcade

The homepage team section launches a local 15-character fighting game. Every member can be selected independently as the human or CPU fighter, including mirror matches. Press Start carries the currently viewed team member into the player slot. The original team profiles and profile links remain available.

Selection keeps the homepage's royal-blue pixel-world-map setting. One roster progresses from choosing the player to choosing the CPU, then enables Start Match; Change Player returns to the first step. Mirrors remain supported. Names, small pixel previews and special names replace search fields, difficulty settings and long descriptions. Normal CPU difficulty is the default. Opening the menu does not download combat sheets, the office arena or the game engine. Native buttons, focused step headings and live selection summaries support keyboard and screen-reader navigation, with touch targets at least 44 pixels wide.

Start Match loads the assets, then automatically plays a brief animated versus splash followed by Round and Fight calls. No second confirmation is required. Losing focus, hiding the document or scrolling the arena out of view defers the versus countdown; leaving selection or closing the game cancels it. Visibility follows the newest observer entry when the browser batches several, so a quick scroll away and back resumes the countdown rather than stranding it. Menus, fighter entrances and round/result announcements use stepped CSS animation, square borders and a locally served pixel font. The OS reduced-motion preference and the optional Less Motion setting disable decorative animation. Combat timing stays unchanged. Sound never blocks the automatic start if a browser requires another gesture to enable audio.

`team.tsx` loads `ArcadeShell.tsx` only after Press Start. Match confirmation imports `runtime.client.ts` and Phaser. The `.client` suffix excludes the engine from Worker execution. The runtime loads the selected character sheets, deduplicating mirror matches, and one shared office-stage image. `arena.ts` provides its path and dimensions. A failed required fighter or office asset keeps a specific error screen visible until retry or cancellation.

Touch devices use a viewport-sized cabinet with safe-area padding and a height-aware arena. Phones (coarse pointer, usable short side under 600 CSS pixels) can select fighters in either orientation but play in landscape. Start in portrait preserves both picks and defers combat imports until rotation; landscape below 560×300 usable pixels shows a larger-screen prompt. Tablets with sufficient room support both orientations. This uses `visualViewport` resize events rather than a user-agent list, fullscreen permission or orientation locking. Browser zoom stays enabled. The landscape picker keeps its action row visible while only the roster scrolls when necessary.

Landscape phone fights reserve two 2×2 thumb zones outside the arena, with 48×52 pixel buttons and held feedback. Independent pointers support moving and attacking together; sliding a captured thumb changes the action and sliding away releases it. Touch help uses action names instead of keyboard bindings. Rotation to portrait, insufficient viewport space, focus loss or hiding the document pauses an active match and clears input. Returning to a playable viewport requires explicit Resume and retains the same canvas. Rotation while loading/ready holds the initial countdown. Controls also defers the countdown and pauses active play.

The game uses a 60 Hz TypeScript simulation, independent of React rendering. `roster.ts` holds stable fighter IDs, profile identity, selected-sheet paths and movement/reach tuning. `specials.ts` is the single source for each move's name, description, mechanics and frame data; selection, CPU combat and rendering consume it. `core/combat.ts` owns movement, frame data, collision, hit/block stun, meter, projectiles, rounds and delayed-observation CPU decisions. `core/input.ts` retains short button presses until a simulation tick consumes them. React receives HUD snapshots at a limited rate and owns accessible menus and touch controls.

Each round lasts 60 seconds. The first fighter to win two rounds wins the match. Equal-health timeouts and double KOs replay the round; three drawn rounds finish the match as a draw. Meter resets each round. Normal hits earn 10 meter, blocked normal attacks earn four, and taking an unblocked hit earns five. Specials cost 50, and their chip damage cannot cause a KO.

Every fighter has a mechanically distinct special. All cost 50 meter and share the same input, so choosing a new character changes strategy without adding extra controls:

| Fighter | Special | Strategy |
| --- | --- | --- |
| Sam Donegan | Community Wave | Broad ground projectile |
| Sonia Kaurah | Neural Spark | Two separate quick bursts |
| Ryan Mouritz | Summit Breaker | Close rising uppercut |
| Pegah Khaleghi | Ledger Lock | Delayed low ground snare |
| Yana Lin | Signal Boost | High arcing projectile |
| Anjali Singh | Spotlight Rush | Three advancing strikes |
| Dr Anu Ganugapati | Vital Pulse | Close pulse with healing on an unblocked hit |
| Daniel Malkinson | Partner Pull | Tether that draws a hit opponent closer |
| Jun Kai Chang | Sky Bridge | Diagonal flying kick |
| Alisa Belova | Welcome Ring | Expanding ring from a fixed position |
| Shan Yang | Quantum Step | Telegraphed blink followed by a strike |
| Kang Tan | Iron Guard | Timed counter stance |
| Juan Bernal | Code Cascade | Three falling bolts with floor markers |
| Alan Philip | Vector Drive | Committed ground dash |
| Callum Holt | Compile Storm | Slow orb that tracks the opponent's height |

Keyboard controls are A/D or arrows for movement, W/Up/Space for jump, S/Down for crouch, J for punch, K for kick, L for special, Shift for guard and Escape for pause. Up near a grounded opponent carries a forward hop over them; farther away it jumps vertically. Left/right input overrides the carry for directional air control. Grounded bodies block each other; airborne lower-body clearance allows crossing and free fighters turn to face the new side. Active attacks retain their original direction, and landing resolves overlap inside the arena bounds. Crouch plus punch is a low attack; aerial attacks are overheads. Movement, attack and guard also have independent touch pointers. The arena and fight buttons share input focus, so repeated taps, clicks and focus transfers between them keep the match running. Pointer presses return keyboard focus to the arena without scrolling. Moving focus to a menu clears held input without pausing; Pause and Controls remain explicit pause actions. Window focus loss, hidden documents and leaving the viewport pause the match and clear held inputs. Resume is explicit. The compact toolbar provides Pause, Controls and Sound; detailed help and Less Motion are tucked into Controls.

`arcade-focus.ts` coordinates the fighter with the other homepage games. Tetris releases its active controls while the arcade is open; its hook-based interactive implementation is separate from its reduced-motion fallback. Exiting or changing matches aborts the old runtime and invalidates late downloads. One shared host sits outside the team's responsive desktop/mobile branches.

All 15 character sheets are original AI-generated artwork with 16 action keyframes each: two idle, two walk, punch windup/extension, kick windup/extension, crouch/low attack, high guard, jump, hurt, defeat, special and victory. Simulation timing drives their playback. Sprite cells are 256 by 256, with a feet origin at y=230. Sound cues are synthesised by the game code. Use `scripts/prepare-team-arcade-assets.py` to repack Sam/Sonia and build homepage thumbnails/reduced-motion previews. Use `scripts/prepare-team-arcade-roster.py --manifest <local-manifest.json>` for the other 13 sheets; its manifest is a list of `{ "id": "ryan", "source": "/absolute/path/to/generated-sheet.png" }` records. Alpha components preserve complete extended kicks and defeated poses when artwork strays across a nominal source cell. Both packers use Python and Pillow. Generated source sheets and working prompts belong in local task files; served assets are versioned under `public/games/team-arcade/v1/` (Sam and Sonia) and `public/games/team-arcade/v2/` (the remaining team). Sheet requests use the roster path rather than deriving an asset version from the fighter ID.

The fight stage is an original pixel-art interpretation of the MLAI office, generated from supplied office photographs: brown sofas, plants, coworking desks, pendant lights, a merch pegboard and community banner. It lives at `public/games/team-arcade/v3/mlai-office.webp`, exported at 960×540 with nearest-neighbour sampling and lossless WebP. Furniture stays behind a clear fighting floor; the existing simulation floor at y=440 is unchanged. Phaser renders the static image as one cached nearest-filtered texture. The blue selection map is `public/games/team-arcade/v3/selection-world-map.jpg`. Both are served locally, with no third-party image dependency in the game.

The menu and canvas labels use the locally bundled Latin subset of [Press Start 2P](https://github.com/google/fonts/tree/main/ofl/pressstart2p) by its project authors, served as `public/games/team-arcade/v3/press-start-2p-latin.woff2` under the CSS alias Arcade Pixel. The unmodified Google Fonts asset is accompanied by its SIL Open Font License in `press-start-2p-OFL.txt`. Font loading begins with the lazy menu, not the initial homepage, and requires no external font service.

Set `VITE_TEAM_ARCADE_ENABLED=false` at build time to remove the Start actions. Profile links remain available. Changing this Vite flag requires a rebuild.

Run checks from the project root:

```sh
bun install --frozen-lockfile
bun run test:arcade
bun run typecheck
bun run build
bun run test:arcade:browser
```

The dedicated browser suite runs the production Worker preview and covers Chromium desktop, a Chromium phone viewport with actual multi-touch protocol events, and WebKit desktop/phone contexts. Mobile journeys cover portrait gating, seven phone/tablet sizes, rotation during combat and loading, explicit resume, touch-target visibility, unclipped arenas and input cancellation. It checks lazy network requests, the one-roster selection sequence and edits, all roster choices, mirrors, pixel typography and intro animations, reduced motion, jumping past the CPU, human and CPU damage, a real complete match, pause/resume, results/rematch, asset retry, cancelled loading and 20 start/exit cycles. The article suite excludes these JavaScript-dependent journeys; CI installs both browsers and runs each suite with its own configuration. Install the matching Playwright Chromium and WebKit browsers before first use. Browser captures remain in `.local/`. Emulated phone and WebKit tests do not replace testing on physical phones.

Local Worker homepage caching uses the `local` build revision. For repeated preview rebuilds, use a query such as `/?arcade-check=browser` to fetch a fresh SSR document. Deployment builds receive their source revision through the existing Workers CI configuration.
