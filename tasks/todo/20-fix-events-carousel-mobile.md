---
name: Task
about: Fix events carousel navigation on mobile
title: "[TASK] Fix events carousel navigation controls on mobile"
labels: task, mobile, ui, high-priority
assignees: ''
---

## Description
The events carousel navigation buttons and indicators are hidden on mobile devices (`hidden lg:flex`), making it impossible for mobile users to navigate through events. Mobile users need an alternative navigation method.

## Acceptance Criteria
- [ ] Mobile users can navigate through all events
- [ ] Touch-friendly navigation controls
- [ ] Clear visual indicators of current position
- [ ] Smooth scrolling/swiping experience

## Technical Details
Current implementation in `src/components/events.tsx`:
- Navigation buttons hidden on mobile (lines 144-159)
- Carousel indicators hidden on mobile (line 135)
- No touch/swipe functionality implemented

Suggested approaches:
1. Enable swipe gestures for mobile
2. Show compact navigation dots on mobile
3. Implement horizontal scroll with snap points
4. Add touch-friendly prev/next buttons

## Related Issues
- Mobile accessibility
- Event discovery
- User engagement

## Additional Notes
Consider using a mobile-first carousel library or implementing native touch events. Test on various mobile devices for smooth performance.