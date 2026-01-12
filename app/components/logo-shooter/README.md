# Logo Shooter - Interactive Sponsor Section

An ambient, interactive experience for the sponsor logo section. Logos fly toward the viewer in a space-shooter style, and visitors can click to "shoot" them (changing them from grayscale to full color with a glow effect).

## 🎮 Current Status

**✅ FULLY FUNCTIONAL** - Currently using colored rectangle placeholders with sponsor names.

**⏳ PENDING** - Waiting for actual logo images to be added.

---

## 🖼️ How to Add Actual Logo Images

### Prerequisites
Ensure logo image files exist in: `mlai-au/public/sponsor_logos/`

Expected files:
```
public/sponsor_logos/
  ├── nab.png
  ├── v2digital.png
  ├── aws.png
  ├── mantel.png
  ├── humyn.png
  ├── cake.png
  ├── microsoft.png
  ├── wilsonai.png
  ├── uom.jpeg
  ├── squarepeg.png
  ├── airtree.jpeg
  ├── blackbird.png
  └── rampersand.png
```

### Code Changes (5 minutes)

**File:** `app/components/logo-shooter/LogoShooterCanvas.tsx`

#### Step 1: Enable Image Loading

Find this section (around line 30-34):
```typescript
// Load images - DISABLED FOR NOW, using text placeholders
useEffect(() => {
  // Skip image loading, we'll render text instead
  setImageCache(new Map());
}, [logos]);
```

**Replace with:**
```typescript
// Load images
useEffect(() => {
  const uniqueLogos = Array.from(new Set(logos.map(l => l.imagePath)));
  const loadPromises = uniqueLogos.map(async (path) => {
    try {
      const img = await loadImage(path);
      return [path, img] as const;
    } catch (error) {
      console.error(`Failed to load image: ${path}`, error);
      return null;
    }
  });

  Promise.all(loadPromises).then((results) => {
    const newCache = new Map<string, HTMLImageElement>();
    results.forEach((result) => {
      if (result) {
        newCache.set(result[0], result[1]);
      }
    });
    setImageCache(newCache);
  });
}, [logos]);
```

#### Step 2: Update Render Function

Find the `renderLogo` function (around line 150-224).

Find this section:
```typescript
// TEMPORARY: Using colored rectangles with text instead of images
```

**Replace the entire rectangle/text rendering block with:**
```typescript
// Try to load image from cache
const image = imageCache.get(logo.imagePath);

if (image && image.complete) {
  // Draw the image
  ctx.filter = logo.isHit 
    ? 'grayscale(0%) brightness(1.2)' 
    : 'grayscale(100%) brightness(0.8)';
  
  ctx.drawImage(
    image,
    screenX - size / 2,
    screenY - size / 2,
    size,
    size
  );
  
  ctx.filter = 'none';
} else {
  // Fallback: colored rectangle with text
  ctx.fillStyle = logo.isHit ? '#00ff88' : '#ffffff';
  ctx.fillRect(
    screenX - size / 2,
    screenY - size / 2,
    size,
    size
  );
  
  // Draw logo name text
  ctx.fillStyle = logo.isHit ? '#000000' : '#ff3d00';
  ctx.font = `bold ${Math.max(10, size / 6)}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(logo.name, screenX, screenY, size * 0.9);
}
```

**That's it!** The game will now use actual logo images with grayscale filter, and flash to full color when hit.

---

## 🎨 Features

### Current Implementation
- ✅ Ambient auto-start (no "Click to Play" button)
- ✅ Logos fly from back to front continuously
- ✅ 3-5 logos active at any time
- ✅ Anti-clustering spawn logic
- ✅ Click/tap to "shoot" logos
- ✅ Visual feedback: white → green with glow ring
- ✅ Custom crosshair cursor
- ✅ Auto-pause when scrolled off-screen
- ✅ Auto-resume when scrolled back
- ✅ Responsive design (mobile & desktop)

### Disabled Features (Commented Out)
The following UI elements are disabled for a cleaner, more ambient experience:
- ❌ "Click to Play" overlay
- ❌ HUD/Scoreboard (hits, accuracy)
- ❌ Reset button
- ❌ Game Over screen

**To re-enable:** See inline comments in:
- `GameControls.tsx`
- `GameHUD.tsx`
- `LogoShooter.tsx`
- `useGameState.ts`

---

## 📁 Project Structure

```
app/components/logo-shooter/
├── index.ts                    # Export file
├── LogoShooter.tsx            # Main wrapper component
├── LogoShooterCanvas.tsx      # Canvas rendering & animation
├── GameControls.tsx           # UI controls (commented out)
├── GameHUD.tsx                # Scoreboard (commented out)
├── useGameState.ts            # Game logic & state management
├── useIntersectionPause.ts    # Viewport detection hook
├── logoData.ts                # Sponsor logo data & config
├── utils.ts                   # Helper functions
├── types.ts                   # TypeScript interfaces
└── README.md                  # This file
```

---

## 🛠️ Configuration

**File:** `logoData.ts`

Adjust game behavior:
```typescript
export const GAME_CONFIG = {
  MIN_LOGOS: 3,              // Minimum logos on screen
  MAX_LOGOS: 5,              // Maximum logos on screen
  MIN_SPAWN_DISTANCE: 25,    // Anti-clustering distance (%)
  VELOCITY_Z_MIN: 0.6,       // Minimum speed toward viewer
  VELOCITY_Z_MAX: 1.2,       // Maximum speed toward viewer
  DRIFT_X_MIN: -0.3,         // Horizontal drift range
  DRIFT_X_MAX: 0.3,
  DRIFT_Y_MIN: -0.3,         // Vertical drift range
  DRIFT_Y_MAX: 0.3,
  Z_FAR: 0,                  // Starting depth
  Z_NEAR: 100,               // Disappear depth
  SCALE_MIN: 0.3,            // Smallest logo size
  SCALE_MAX: 1.5,            // Largest logo size
  BASE_LOGO_SIZE: 80,        // Base size in pixels
};
```

---

## 🚀 Usage

Already integrated in `app/routes/home.tsx`:

```tsx
import { LogoShooter } from "~/components/logo-shooter";

<div className="min-h-[400px] md:min-h-[500px]">
  <LogoShooter />
</div>
```

---

## 🐛 Known Issues / Future Enhancements

- [ ] Logo images not yet implemented (placeholders in use)
- [ ] Could add sound effects when hitting logos
- [ ] Could add particle effects on hit
- [ ] Could add difficulty levels (speed variations)

---

## 📝 Notes

- **No dependencies added** - Uses vanilla Canvas 2D API
- **Performance optimized** - Uses `requestAnimationFrame` and pauses when off-screen
- **TypeScript** - Fully typed
- **Responsive** - Canvas resizes automatically

