---
name: Task
about: Create a new task
title: "[TASK] Replace 'any' types with proper TypeScript interfaces"
labels: task, typescript, code-quality
assignees: ''
---

## Description
Multiple files use the 'any' type which defeats the purpose of TypeScript's type safety. These should be replaced with proper interfaces and types.

## Acceptance Criteria
- [ ] Replace all 'any' types with proper interfaces
- [ ] Create shared type definitions for common data structures
- [ ] Ensure no TypeScript errors after changes

## Technical Details
Files with 'any' usage:
- `src/components/footer.tsx` - icon props
- `src/components/testimonials.tsx` - testimonials array and function parameters
- `src/app/api/getTeamScores/route.ts` - response parameter and data type
- `src/app/api/getTeamSubmissions/route.ts` - likely similar issues
- `src/app/hackathon/page.tsx` - data mapping functions

Common interfaces needed:
- Testimonial interface
- IconProps interface
- DynamoDB response types
- Team/Score data structures

## Related Issues
- Type safety improvements
- Better IDE autocomplete
- Reduced runtime errors

## Additional Notes
Consider creating a `types/` directory for shared interfaces