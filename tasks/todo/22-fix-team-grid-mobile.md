---
name: Task
about: Fix team section grid layout on mobile
title: "[TASK] Fix team grid showing only 1 column on mobile"
labels: task, mobile, ui, medium-priority
assignees: ''
---

## Description
The team section grid is configured to show 2 columns on mobile (`sm:grid-cols-2`) but is only displaying 1 column, wasting horizontal space and creating excessive vertical scrolling.

## Acceptance Criteria
- [ ] Display 2 columns on mobile devices (640px+)
- [ ] Proper spacing between team members
- [ ] Maintain readability of names and roles
- [ ] Responsive scaling for different screen sizes

## Technical Details
Current implementation in `src/components/team.tsx:43`:
- Grid configuration: `grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3`
- Issue: `sm:` breakpoint not working as expected
- May be overridden by parent container constraints

Debugging steps:
1. Check parent container width constraints
2. Verify Tailwind breakpoint configuration
3. Test grid behavior at different screen sizes
4. Consider container max-width issues

## Related Issues
- Mobile layout optimization
- Content density
- Scrolling reduction

## Additional Notes
Ensure team member photos and text remain properly aligned in 2-column layout. Test on various mobile devices.