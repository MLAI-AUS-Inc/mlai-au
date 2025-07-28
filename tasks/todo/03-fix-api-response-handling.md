---
name: Task
about: Create a new task
title: "[TASK] Fix incorrect API response handling in team routes"
labels: task, bug, api, high-priority
assignees: ''
---

## Description
The `getTeamScores` and `getTeamSubmissions` API routes use incorrect response patterns (`res.status(400).json()`) which don't work with Next.js 13+ App Router. This needs to be fixed to use `NextResponse`.

## Acceptance Criteria
- [ ] Replace `res.status(400).json()` with proper `NextResponse` in getTeamScores
- [ ] Replace `res.status(400).json()` with proper `NextResponse` in getTeamSubmissions
- [ ] Test both endpoints to ensure they return proper error responses
- [ ] Ensure consistent response format across all API routes

## Technical Details
Current incorrect pattern:
```typescript
return res.status(400).json({ error: 'teamId is required' });
```

Should be:
```typescript
return new NextResponse(JSON.stringify({ error: 'teamId is required' }), {
  status: 400,
  headers: { 'Content-Type': 'application/json' }
});
```

Files to fix:
- `/src/app/api/getTeamScores/route.ts` (lines 23-24)
- `/src/app/api/getTeamSubmissions/route.ts` (lines 23-24)

## Related Issues
- This is causing runtime errors when validation fails
- Inconsistent with other API routes

## Additional Notes
This is a high-priority bug fix as it affects API functionality