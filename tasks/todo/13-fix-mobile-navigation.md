---
name: Task
about: Create a new task
title: "[TASK] Fix mobile navigation and responsiveness issues"
labels: task, ui/ux, mobile, high-priority
assignees: ''
---

## Description
The events carousel and other navigation elements are not accessible on mobile devices. The logo grid also has layout issues. These problems significantly impact mobile user experience.

## Acceptance Criteria
- [ ] Add mobile-friendly navigation for events carousel (swipe gestures or visible buttons)
- [ ] Fix logo grid layout to avoid orphaned items on mobile
- [ ] Ensure all interactive elements have adequate touch targets (min 44x44px)
- [ ] Test navigation on actual mobile devices
- [ ] Add mobile menu with proper animations
- [ ] Fix header overlap issues on small screens

## Technical Details
1. **Fix Events Carousel for Mobile**:
```typescript
// Add touch/swipe support
import { useSwipeable } from 'react-swipeable';

const handlers = useSwipeable({
  onSwipedLeft: () => handleNext(),
  onSwipedRight: () => handlePrev(),
  trackMouse: true
});

// Make buttons visible on mobile with better positioning
<button 
  onClick={handlePrev} 
  className="absolute left-2 top-1/2 -translate-y-1/2 bg-teal-500 p-2 rounded-full lg:p-3"
  aria-label="Previous events"
>
  <ChevronLeftIcon className="w-5 h-5 lg:w-6 lg:h-6" />
</button>
```

2. **Fix Logo Grid**:
```typescript
// Use better responsive grid
<div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
  {/* This avoids orphaned logos */}
</div>
```

3. **Add Mobile Menu**:
```typescript
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

// Add hamburger button and slide-out menu
<button
  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  className="lg:hidden p-2"
  aria-label="Toggle menu"
>
  {mobileMenuOpen ? <XMarkIcon /> : <Bars3Icon />}
</button>
```

## Related Issues
- 60%+ of users are on mobile devices
- Current mobile experience drives users away
- Affects accessibility for touch-only users

## Additional Notes
- Consider using Headless UI for accessible mobile menu
- Test with Chrome DevTools device emulation
- Ensure smooth animations (60fps) on mobile