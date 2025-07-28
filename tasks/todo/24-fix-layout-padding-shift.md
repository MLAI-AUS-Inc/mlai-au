---
name: Task
about: Fix content shift when sidebar appears/disappears
title: "[TASK] Fix layout padding causing content shift with sidebar"
labels: task, ui, layout, medium-priority
assignees: ''
---

## Description
The main layout uses `lg:pl-20` padding to accommodate the sidebar, but this causes content to shift when transitioning between mobile and desktop views or when the sidebar appears/disappears.

## Acceptance Criteria
- [ ] No content shift when resizing window
- [ ] Smooth transitions between mobile and desktop layouts
- [ ] Consistent content positioning
- [ ] Maintain sidebar functionality

## Technical Details
Current implementation in `src/app/layout.tsx:107`:
- Fixed left padding: `lg:pl-20`
- Sidebar width changes on hover (expanded state)
- No transition or placeholder space

Potential solutions:
1. Use CSS Grid with fixed sidebar column
2. Implement proper transition animations
3. Reserve space for sidebar consistently
4. Consider using transform instead of padding
5. Implement proper responsive breakpoints

## Related Issues
- Layout stability
- User experience
- Visual polish

## Additional Notes
This issue affects the perceived performance and polish of the site. Test transitions at various viewport sizes and with sidebar interactions.