# Testimonial Tetris - Interactive Testimonial Game

An interactive Tetris-style game for the testimonial section. Testimonials fall as Tetris pieces, and visitors can play while reading community feedback.

## 🎮 Current Status

**✅ FULLY FUNCTIONAL** - Complete Tetris gameplay with testimonial integration.

---

## Features

### Implemented ✅
- **Tetris Gameplay**: Full Tetris mechanics (movement, rotation, line clearing)
- **4 Tetromino Shapes**: I, O, T, L pieces (simplified from classic 7)
- **Desktop Controls**: Arrow keys for movement and rotation
- **Mobile Controls**: On-screen touch buttons
- **Now Dropping Panel**: Shows current falling testimonial
- **Click-to-View**: Click any locked block to read full testimonial in modal
- **Line Clearing**: Animated line clears with flash effect
- **Auto-Pause**: Game pauses when scrolled off-screen
- **Game Over**: Shows stats and offers replay
- **Responsive**: Works on mobile and desktop

### Visual Style
- Uses site's bold Tetris-block color palette
- Canvas-based rendering for smooth performance
- Matches brutalist aesthetic of the site

---

## 🎯 How to Play

### Desktop
- **⬅️ ➡️** Move piece left/right
- **⬆️ / Space** Rotate piece
- **⬇️** Hard drop (instant placement)
- **Click block** View full testimonial

### Mobile
- Use on-screen buttons
- Tap blocks to view testimonials

---

## 📁 Project Structure

```
app/components/testimonial-tetris/
├── index.ts                      # Export file
├── TestimonialTetris.tsx        # Main wrapper component
├── TetrisCanvas.tsx             # Canvas game board renderer
├── TetrisControls.tsx           # Mobile touch controls
├── NowDropping.tsx              # Current testimonial panel
├── TestimonialModal.tsx         # Full testimonial viewer
├── useGameState.ts              # Core game logic hook
├── useIntersectionPause.ts      # Viewport detection
├── tetrisLogic.ts               # Grid, collision, rotation logic
├── testimonialData.ts           # Testimonial content & config
├── types.ts                     # TypeScript interfaces
├── utils.ts                     # Helper functions
└── README.md                    # This file
```

---

## 🛠️ Technical Details

### Core Logic

**Grid System**: 10 columns × 20 rows
**Tetromino Shapes**: 4 simplified shapes with basic rotation
**Collision Detection**: Grid-based with boundary checking
**Line Clearing**: Full row detection + drop animation
**Fall Speed**: 800ms per cell (configurable)

### Performance Optimizations
- Canvas 2D for efficient rendering
- IntersectionObserver for auto-pause
- `requestAnimationFrame` not needed (timer-based falling)
- Minimal DOM updates

### State Management
- Custom React hook (`useGameState`)
- Manages grid, current/next pieces, stats
- Handles all game logic (movement, rotation, locking)

---

## 🎨 Customization

Edit `testimonialData.ts` to configure:

```typescript
export const GAME_CONFIG = {
  GRID_COLS: 10,              // Grid width
  GRID_ROWS: 20,              // Grid height
  CELL_SIZE: 30,              // Cell size in pixels
  FALL_SPEED: 800,            // ms per drop
  FAST_FALL_SPEED: 100,       // Hard drop speed
  LOCK_DELAY: 500,            // Lock delay ms
};
```

Add/edit testimonials in `TESTIMONIALS` array.

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

### Why 4 Shapes Instead of 7?
- Simpler rotation logic
- Easier collision detection
- Still provides variety
- Faster development

### Why Timer-Based Instead of requestAnimationFrame?
- Tetris traditionally uses fixed time steps
- Easier to control fall speed
- More predictable gameplay
- Lower CPU usage when tab is inactive

### Why Canvas Instead of DOM?
- Better performance for grid rendering
- Smooth animations
- Easy hit detection
- Scalable to different screen sizes

---

## 🐛 Known Limitations

- **Rotation**: Basic rotation without advanced wall kicks
- **No Scoring**: Focus on testimonial reading, not competition
- **No Hold Feature**: Keep it simple
- **No Ghost Piece**: Simpler UI

These are intentional simplifications to keep the code maintainable and focus on the testimonial experience.

---

## 🔮 Future Enhancements (Optional)

- [ ] Sound effects (with mute toggle)
- [ ] Particle effects on line clear
- [ ] Leaderboard (would need backend)
- [ ] More piece shapes (S, Z, J)
- [ ] Ghost piece preview
- [ ] Hold piece feature
- [ ] Difficulty levels (speed variations)

---

## 📝 Notes

- **No dependencies added** - Uses vanilla Canvas 2D
- **TypeScript** - Fully typed
- **Responsive** - Auto-scales canvas
- **Accessible** - Keyboard navigation, labeled buttons
- **Performance** - Pauses when off-screen

---

## 🧪 Testing

Tested on:
- ✅ Chrome (Desktop & Mobile)
- ✅ Firefox (Desktop)
- ✅ Safari (Desktop & Mobile)

Works with:
- ✅ Keyboard controls
- ✅ Touch controls
- ✅ Mouse clicks
- ✅ Various screen sizes

