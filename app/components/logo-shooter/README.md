# Logo Shooter - Interactive Sponsor Section

A **hover-activated** interactive experience for the sponsor logo section. When visitors hover over the sponsor area, the background smoothly transitions from orange to black, static logos fade out, and an immersive space-shooter game fades in where sponsor logos fly toward the viewer and can be clicked to "shoot" them.

## 🎮 Current Status

**✅ FULLY FUNCTIONAL** - Currently using colored rectangle placeholders with sponsor names.

**⏳ PENDING** - Waiting for actual logo images to be added.

---

## 🎨 Key Features

### Hover-to-Activate Design
- **Default State:** Orange background with static sponsor logos (grayscale, inverted)
- **On Hover:** 
  - Background smoothly transitions to black (0.5s)
  - Cursor changes to crosshair
  - Static logos fade out
  - Game canvas fades in with flying logos
- **On Mouse Leave or Scroll Away:**
  - Background transitions back to orange (0.5s)
  - Game fades out
  - Static logos fade back in

### Game Mechanics
- ✅ **Space-shooter style:** Logos spawn far away and fly toward the viewer
- ✅ **3-5 logos active** at any time
- ✅ **Anti-clustering logic:** New logos spawn away from existing ones
- ✅ **Boundary clamping:** Logos stay within visible area (5-95% range)
- ✅ **Click/tap to shoot:** Hit logos change from white to green with glow
- ✅ **Custom crosshair cursor**
- ✅ **Auto-pause/resume:** Pauses when scrolled off-screen, resumes when back
- ✅ **Fully responsive** (mobile & desktop)

### Ambient Experience (No UI Clutter)
The following UI elements are **commented out** for a cleaner, more ambient experience:
- ❌ "Click to Play" overlay
- ❌ HUD/Scoreboard (hits, accuracy)
- ❌ Reset button
- ❌ Game Over screen

**To re-enable:** See inline comments in `GameControls.tsx`, `GameHUD.tsx`, `LogoShooter.tsx`, and `useGameState.ts`

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

Find this section (around line 36-63):
```typescript
useEffect(() => {
  // TEMPORARY: Skip image loading, using text placeholders
  setImageCache(new Map());
  
  // UNCOMMENT THIS CODE BLOCK TO ENABLE ACTUAL LOGO IMAGES:
  /*
  const uniqueLogos = Array.from(new Set(logos.map(l => l.imagePath)));
  ...
  */
}, [logos]);
```

**Uncomment the image loading code block** inside the `useEffect`.

#### Step 2: Update Render Function

Find the `renderLogo` function (around line 181-240).

**Replace the rectangle/text rendering section with:**
```typescript
// Try to load image from cache
const image = imageCache.get(logo.imagePath);

if (image && image.complete) {
  // Draw the image with grayscale filter (unless hit)
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
  ctx.shadowBlur = 0;
  
  // Wrap text if needed
  const maxWidth = size * 0.9;
  const words = logo.name.split(' ');
  if (words.length > 1 && ctx.measureText(logo.name).width > maxWidth) {
    const lineHeight = size / 6;
    words.forEach((word, index) => {
      const yOffset = (index - words.length / 2 + 0.5) * lineHeight;
      ctx.fillText(word, screenX, screenY + yOffset, maxWidth);
    });
  } else {
    ctx.fillText(logo.name, screenX, screenY, maxWidth);
  }
}
```

**That's it!** The game will now use actual logo images with grayscale filter, and flash to full color when hit.

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

## 🚀 Integration

**File:** `app/routes/home.tsx`

The game is integrated into the Logo Cloud section with hover activation:

```tsx
import { useState, useEffect, useRef } from "react";
import { LogoShooter } from "~/components/logo-shooter";

export default function Home() {
  const [isGameActive, setIsGameActive] = useState(false);
  const logoCloudRef = useRef<HTMLDivElement>(null);
  const [logoCloudIsVisible, setLogoCloudIsVisible] = useState(false);

  // IntersectionObserver for scroll detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setLogoCloudIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (logoCloudRef.current) observer.observe(logoCloudRef.current);
    return () => { if (logoCloudRef.current) observer.unobserve(logoCloudRef.current); };
  }, []);

  // Deactivate game when scrolled away
  useEffect(() => {
    if (!logoCloudIsVisible && isGameActive) {
      setIsGameActive(false);
    }
  }, [logoCloudIsVisible, isGameActive]);

  return (
    <div
      ref={logoCloudRef}
      className={`transition-all duration-500 ${
        isGameActive ? 'bg-black cursor-crosshair' : 'bg-[var(--brutalist-orange)] cursor-default'
      }`}
      onMouseEnter={() => setIsGameActive(true)}
      onMouseLeave={() => setIsGameActive(false)}
    >
      {/* Static Logos - Fade out when game active */}
      <div className={`transition-opacity duration-500 ${
        isGameActive ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        {/* Static sponsor logo grid here */}
      </div>

      {/* Game - Fade in when active */}
      {isGameActive && (
        <div className="absolute inset-0 overflow-hidden">
          <LogoShooter />
        </div>
      )}
    </div>
  );
}
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
  Z_FAR: 0,                  // Starting depth (far away)
  Z_NEAR: 100,               // Disappear depth (flew past viewer)
  SCALE_MIN: 0.3,            // Smallest logo size
  SCALE_MAX: 1.5,            // Largest logo size
  BASE_LOGO_SIZE: 80,        // Base size in pixels
};
```

**Note:** Logo positions are clamped to 5-95% range to prevent escaping the visible area.

---

## 🐛 Known Issues / Future Enhancements

- [ ] Logo images not yet implemented (placeholders in use)
- [ ] Could add sound effects when hitting logos (with mute toggle)
- [ ] Could add particle effects on hit
- [ ] Could add subtle score counter (fades in only on first hit)
- [ ] Could add difficulty levels (speed variations)

---

## 📝 Technical Notes

- **No dependencies added** - Uses vanilla Canvas 2D API
- **Performance optimized** - Uses `requestAnimationFrame` and `IntersectionObserver`
- **TypeScript** - Fully typed
- **Responsive** - Canvas resizes automatically to fit container
- **Accessibility** - Hover area is large, works with touch on mobile
- **Smooth transitions** - 500ms CSS transitions for background and opacity
- **Boundary safety** - Logos clamped to 5-95% range to prevent visual bugs

---

## 🔧 Troubleshooting

**Q: Logos escaping the black area?**  
A: Ensure `overflow-hidden` is applied to the game container in `home.tsx`, and boundary clamping is active in `useGameState.ts` (lines 105-106).

**Q: Game not activating on hover?**  
A: Check that `onMouseEnter` and `onMouseLeave` are properly attached to the Logo Cloud container in `home.tsx`.

**Q: Background not transitioning smoothly?**  
A: Ensure `transition-all duration-500` is applied to the main container in `home.tsx`.

**Q: Game not pausing when scrolled away?**  
A: Verify `IntersectionObserver` is properly set up and `logoCloudIsVisible` state is connected to the deactivation logic.
