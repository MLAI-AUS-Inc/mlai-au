---
name: Task
about: Optimize floating social buttons for mobile
title: "[TASK] Reduce size of floating social buttons on mobile"
labels: task, mobile, ui, low-priority
assignees: ''
---

## Description
The floating social buttons are quite large on mobile devices (56px/14 tailwind units), taking up significant screen real estate. They should be smaller on mobile while remaining touch-friendly.

## Acceptance Criteria
- [ ] Smaller button size on mobile screens
- [ ] Maintain 44px minimum touch target
- [ ] Preserve functionality and visibility
- [ ] Smooth size transitions

## Technical Details
Current implementation in `src/components/floating-socials.tsx`:
- Button size: `w-14 h-14` (56px)
- Fixed position: `right-4 bottom-20`
- No responsive sizing

Suggested improvements:
- Mobile size: `w-12 h-12` (48px)
- Adjust positioning for mobile
- Consider auto-hide on scroll
- Smaller icons on mobile
- Optimize expanded state for mobile

## Related Issues
- Mobile screen real estate
- Touch accessibility
- Visual balance

## Additional Notes
Balance between visibility/accessibility and screen space usage. Consider user testing to find optimal size.