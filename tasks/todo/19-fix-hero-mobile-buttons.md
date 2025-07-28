---
name: Task
about: Fix hero section button overflow on mobile
title: "[TASK] Fix hero section buttons overflow on mobile screens"
labels: task, mobile, ui, high-priority
assignees: ''
---

## Description
The hero section contains three CTA buttons that overflow horizontally on mobile devices. The buttons need to be stacked vertically on smaller screens for better mobile UX.

## Acceptance Criteria
- [ ] Buttons stack vertically on mobile screens (< 640px)
- [ ] Appropriate spacing between stacked buttons
- [ ] Buttons remain full-width on mobile
- [ ] Desktop layout remains unchanged (horizontal alignment)

## Technical Details
Current implementation in `src/components/hero.tsx:47-72`:
- Three ButtonLink components in a flex container
- Using `flex items-center justify-center gap-x-6`
- Need to add responsive classes for mobile stacking

Suggested approach:
- Change to `flex flex-col sm:flex-row` 
- Adjust gap to `gap-4 sm:gap-x-6`
- Consider button width on mobile (`w-full sm:w-auto`)

## Related Issues
- Mobile user experience
- Conversion optimization
- Responsive design consistency

## Additional Notes
Test on various mobile devices and screen sizes to ensure proper stacking and spacing