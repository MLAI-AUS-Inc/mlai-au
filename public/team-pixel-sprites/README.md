# Team Pixel Sprites - "Choose Your Fighter"

Retro pixel-art character sprites for the team roster selection screen.

## Overview

This folder contains animated GIF sprites for all 10 team members displayed in the "Choose Your Fighter" team selection interface.

## Specifications

- **Format:** Animated GIF with transparency
- **Size:** ~200x200px base size per frame
- **Animation:** 4-frame idle loops (breathing/bobbing motion)
- **Frame Rate:** ~5 FPS (20ms delay per frame)
- **Background:** Transparent
- **Style:** Retro 16-bit pixel art with thick black outlines

## Files

```
xavier_andueza_gif.gif         - President
michael_reitzenstein_gif.gif   - Vice President
pegah_khaleghi_gif.gif         - Treasurer
lukas_wesemann_gif.gif         - Secretary
sam_donegan_gif.gif            - Head of Marketing
tom_mckenzie_gif.gif           - Head of Technology
jasmine_raj_gif.gif            - Co-Head of Community
ethan_lee_gif.gif              - Co-Head of Community
alisa_belova_gif.gif           - Head of People
```

**Note:** Callum Holt's sprite is hosted on Firebase Storage (pre-existing asset).

## Usage

These sprites are referenced in `app/components/team.tsx` via:

```typescript
pixelImageUrl: "/team-pixel-sprites/[filename].gif"
```

When a team member is selected from the roster grid, their sprite displays in the center preview area with smooth transitions.

### Selection Methods

- **Mouse:** Click any portrait tile or use arrow buttons (◀ ▶)
- **Keyboard:** Arrow keys navigate the 3-column grid
  - **Right/Left arrows:** Next/previous member
  - **Down arrow:** Move down in same column (Xavier → Lukas → Tom → Alisa)
  - **Up arrow:** Move up in same column (wraps to bottom)
  - Arrow keys only work when Team section is in viewport
  - Selection starts at Xavier Andueza when section loads

## Generation Process

1. **AI Generation:** Created using ChatGPT Plus with custom pixel art prompts
2. **Style Reference:** Matched to existing Callum Holt sprite aesthetic
3. **Conversion:** Sprite sheets split into frames and converted to animated GIFs via ezgif.com
4. **Optimization:** Configured for web with global colormap and transparent backgrounds

## File Size

- Individual sprite: ~100-300KB each
- Total folder size: <2MB

## Future Migration

These local files are intended for development and PR review. Authorized team members will migrate them to Firebase Storage for production deployment.

## Credits

Generated for Project 3: "Choose Your Fighter" Pixel Characters
Part of the MLAI-AU website redesign (design-overhaul branch)
