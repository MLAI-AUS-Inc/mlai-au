---
name: Task
about: Improve footer layout on mobile devices
title: "[TASK] Fix cramped footer column layout on mobile"
labels: task, mobile, ui, medium-priority
assignees: ''
---

## Description
The footer uses a multi-column layout that becomes too cramped on mobile devices. Column text is difficult to read and links are hard to tap due to insufficient spacing.

## Acceptance Criteria
- [ ] Readable text size and spacing on mobile
- [ ] Touch-friendly link spacing (44px minimum tap targets)
- [ ] Logical content grouping for mobile
- [ ] Clean visual hierarchy

## Technical Details
Current implementation in `src/components/footer.tsx`:
- Complex nested grid structure
- Multiple column groups with small text
- Uses `grid-cols-2` base layout

Suggested improvements:
1. Single column layout for smallest screens
2. Collapsible sections for mobile
3. Increase spacing between links
4. Larger touch targets
5. Reorganize content priority for mobile

## Related Issues
- Mobile accessibility
- Touch target compliance
- Footer usability

## Additional Notes
Consider implementing an accordion-style footer for mobile to reduce initial visible content while maintaining access to all links.