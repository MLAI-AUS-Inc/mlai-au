# Testimonial Tetris - Interactive Testimonial Game

An interactive Tetris-style game for the testimonial section. Testimonials fall as colorful blocks, and visitors can play while discovering community feedback.

## 🎮 Current Status

**✅ FULLY FUNCTIONAL** - Complete Tetris-style gameplay with smart auto-sizing and testimonial integration.

---

## Features

### Implemented ✅
- **Tetris-Style Gameplay**: Falling testimonial blocks with movement and soft drop
- **Smart Auto-Sizing**: Blocks automatically size based on text length (no manual configuration needed!)
- **Simplified Controls**: Left/right movement and soft drop (no rotation for easier gameplay)
- **Desktop Controls**: Arrow keys for movement
- **Mobile Support**: Touch-responsive (works on mobile devices)
- **Click-to-View**: Click any block to read full testimonial in modal
- **Smart Line Clearing**: Clears entire testimonial blocks when lines complete
- **Auto-Pause**: Game pauses when scrolled off-screen
- **Ambient Experience**: Auto-starts without UI clutter
- **Game Over**: Clean blue modal with stats and replay button
- **Fully Responsive**: Adapts to viewport size with dynamic cell sizing

### Visual Style
- Uses site's bold Tetris-block color palette (orange, purple, blue, pink, yellow, mint, black)
- DOM-based rendering with React components (not Canvas)
- Transparent background - blocks float on yellow section background
- Matches brutalist aesthetic of the site
- Full-width responsive layout

### Anti-Repetition Logic
- Tracks last 3 testimonials to ensure variety
- Prevents same testimonial appearing consecutively
- Creates natural variety in gameplay

---

## 🎯 How to Play

### Desktop
- **⬅️ ➡️** Move piece left/right
- **⬇️** Soft drop (move down faster)
- **Click block** View full testimonial
- **Auto-start** Game begins automatically when section is visible

### Mobile
- Works with touch/swipe gestures
- Tap blocks to view testimonials

---

## 📁 Project Structure

```
app/components/testimonial-tetris/
├── index.ts                      # Export file
├── TestimonialTetris.tsx        # Main wrapper component
├── TestimonialGrid.tsx          # Grid container with flood-fill rendering
├── TestimonialBlock.tsx         # Individual testimonial block component
├── TestimonialModal.tsx         # Full testimonial viewer
├── TetrisControls.tsx           # Mobile touch controls (hidden by default)
├── useGameState.ts              # Core game logic hook
├── useIntersectionPause.ts      # Viewport detection for auto-pause
├── testimonialData.ts           # Testimonial content & auto-sizing config
├── types.ts                     # TypeScript interfaces
├── utils.ts                     # Helper functions
├── README.md                    # This file
└── PR_DESCRIPTION.md            # Pull request documentation
```

---

## 🛠️ Technical Details

### Core Logic

**Grid System**: 18 columns × 8 rows (wider horizontal layout)  
**Auto-Sizing**: Blocks automatically size based on text length (80, 150, 250, 350 char thresholds)  
**Collision Detection**: Grid-based with unique piece IDs to prevent merging  
**Smart Line Clearing**: Removes entire testimonial blocks when any part touches cleared row  
**Fall Speed**: 1500ms per drop (slower for larger pieces)  
**Rendering**: DOM-based with TestimonialBlock components (not Canvas)

### Auto-Sizing Formula

```typescript
Text Length → Block Size (width × height)
-----------   --------------------------
< 80 chars  → 2×2 cells (small)
< 150 chars → 3×2 cells (medium)
< 250 chars → 3×3 cells (large)
< 350 chars → 4×3 cells (extra large)
> 350 chars → 4×4 cells (huge)

Decorative blocks: 1×1, 2×1, 1×2 (no text)
```

**How to Adjust**: Edit `calculateDimensions()` function in `testimonialData.ts`:
- Change thresholds (80, 150, 250, 350) to adjust when blocks get bigger
- Change { width, height } values to make blocks wider/taller
- Lower thresholds = blocks get bigger sooner (more text fits)

### Performance Optimizations
- DOM-based rendering with React components
- IntersectionObserver for auto-pause when off-screen
- Flood-fill algorithm to render contiguous blocks as single elements
- Unique piece IDs prevent visual merging of identical testimonials
- Responsive cell sizing based on viewport

### State Management
- Custom React hook (`useGameState`)
- Manages grid, current/next pieces, stats
- Handles all game logic (movement, collision, locking, line clearing)
- Tracks recent testimonials to prevent repetition

---

## 🎨 Customization

Edit `testimonialData.ts` to configure:

```typescript
export const GAME_CONFIG = {
  GRID_COLS: 18,              // Grid width (columns)
  GRID_ROWS: 8,               // Grid height (rows)
  CELL_SIZE: 150,             // Max cell size in pixels (auto-scales down)
  FALL_SPEED: 1500,           // ms per drop
  FAST_FALL_SPEED: 200,       // Soft drop speed
  LOCK_DELAY: 500,            // Lock delay ms
  BORDER_RADIUS: 20,          // Block corner rounding
};
```

**To adjust auto-sizing**, edit the `calculateDimensions()` function:
```typescript
// Make blocks bigger sooner:
if (length < 80) → if (length < 120)  // Blocks get taller earlier

// Make blocks taller:
{ width: 3, height: 2 } → { width: 3, height: 3 }

// General rule:
// - Decrease thresholds = bigger blocks
// - Increase thresholds = smaller, more compact blocks
```

Add/edit testimonials in `BASE_TESTIMONIALS` array (dimensions auto-calculate!).

---

## 🚀 Usage

Already integrated in `app/routes/home.tsx`:

```tsx
import { TestimonialTetris } from "~/components/testimonial-tetris";

// In component:
<TestimonialTetris />
```

---

## 🎯 Game Design Decisions

### Why No Rotation?
- **Simpler Gameplay**: Easier for casual players to pick up
- **Focus on Testimonials**: Less complex mechanics = more focus on content
- **Cleaner Code**: Simplified collision detection
- **Mobile-Friendly**: Fewer controls needed

### Why Auto-Sizing Instead of Fixed Shapes?
- **Dynamic**: Automatically adapts to any testimonial length
- **No Manual Config**: Add testimonials without specifying dimensions
- **Variety**: Natural variety based on actual content
- **Maintainable**: Easy to adjust with one formula

### Why DOM Instead of Canvas?
- **Styling**: Leverage TailwindCSS and React components
- **Accessibility**: Native HTML for text content
- **Rich Content**: Easy to display avatars, formatted text
- **Hover/Click**: Native browser interactions
- **Responsive**: CSS handles scaling naturally

### Why Transparent Background?
- **Visual Consistency**: Blocks float on section background
- **Modern Look**: Cleaner, less boxy appearance
- **Focus**: Emphasizes the colorful testimonial blocks

### Why Smart Line Clearing?
- **Testimonial Integrity**: Clears entire blocks, not just cells
- **Visual Coherence**: No partial testimonial fragments
- **Satisfying**: Whole blocks disappear and drop

---

## 🐛 Known Limitations

- **No Rotation**: Simplified for easier gameplay (intentional)
- **No Scoring System**: Focus on testimonial reading, not competition
- **No Hold Feature**: Keep controls minimal
- **No Ghost Piece**: Simpler UI

These are intentional design choices to keep the game accessible and focus on the testimonial experience.

---

## 🔮 Future Enhancements (Optional)

- [ ] Sound effects (with mute toggle)
- [ ] Particle effects on line clear
- [ ] Multiple difficulty levels (speed variations)
- [ ] Testimonial filter by topic/sentiment
- [ ] Share score on social media
- [ ] Add rotation as optional "hard mode"

---

## 📝 Notes

- **No dependencies added** - Uses React DOM components
- **TypeScript** - Fully typed with detailed interfaces
- **Responsive** - Auto-scales cells based on viewport
- **Accessible** - Keyboard navigation, semantic HTML
- **Performance** - Pauses when off-screen, efficient rendering
- **Smart** - Auto-sizes blocks, prevents repetition, unique piece tracking

---

## 🧪 Testing

Tested on:
- ✅ Chrome (Desktop & Mobile)
- ✅ Firefox (Desktop)
- ✅ Safari (Desktop & Mobile)
- ✅ Edge (Desktop)

Works with:
- ✅ Keyboard controls
- ✅ Touch/swipe gestures
- ✅ Mouse clicks
- ✅ Various screen sizes (320px - 4K)
- ✅ Different testimonial lengths

---

## 🎨 Color Theme

Game Over screen uses **blue** (`#3537dc`) to match the "People" section theme, creating visual consistency throughout the site.

