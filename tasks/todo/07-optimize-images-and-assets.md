---
name: Task
about: Create a new task
title: "[TASK] Optimize images and implement Next.js Image component"
labels: task, performance, frontend, seo
assignees: ''
---

## Description
The application uses standard HTML `<img>` tags instead of Next.js's optimized `<Image>` component. This misses out on automatic image optimization, lazy loading, and responsive images.

## Acceptance Criteria
- [ ] Replace all `<img>` tags with Next.js `<Image>` component
- [ ] Configure proper width and height for all images
- [ ] Implement responsive image sizes
- [ ] Add blur placeholders for better perceived performance
- [ ] Optimize all image files (compress, convert to WebP where appropriate)

## Technical Details
Files with img tags to update:
- `/src/app/page.tsx` - Sponsor logos
- `/src/components/events.tsx` - Event banner images
- `/src/components/team.tsx` - Team member photos
- `/src/components/testimonials.tsx` - Profile images
- `/src/components/hero.tsx` - Hero images
- `/src/components/flagshipevents.tsx` - Event images

Example conversion:
```typescript
// Before
<img src="sponsor_logos/nab.png" alt="NAB" className="h-8 w-auto" />

// After
import Image from 'next/image'
<Image 
  src="/sponsor_logos/nab.png" 
  alt="NAB" 
  width={120} 
  height={32}
  className="h-8 w-auto"
  loading="lazy"
/>
```

Additional optimizations:
1. Configure image domains in `next.config.mjs` for external images
2. Use `priority` prop for above-the-fold images
3. Implement responsive images with `sizes` prop
4. Consider using `placeholder="blur"` with `blurDataURL`

## Related Issues
- Improves Core Web Vitals (LCP, CLS)
- Reduces bandwidth usage
- Better mobile performance
- Improved SEO

## Additional Notes
- Consider setting up an image CDN for better global performance
- Document image optimization guidelines for future contributors
- Add image size validation to prevent layout shifts