---
name: Task
about: Create a new task
title: "[TASK] Create shared utilities for API routes"
labels: task, refactoring, api, code-quality
assignees: ''
---

## Description
There's significant code duplication across API routes. Create shared utilities to improve maintainability and consistency.

## Acceptance Criteria
- [ ] Create `/src/lib/aws/dynamodb.ts` with shared DynamoDB configuration
- [ ] Create `/src/lib/api/responses.ts` with response helper functions
- [ ] Create `/src/lib/api/errors.ts` with error handling utilities
- [ ] Refactor all API routes to use shared utilities
- [ ] Remove all code duplication

## Technical Details
Shared utilities needed:

1. **DynamoDB Client** (`/src/lib/aws/dynamodb.ts`):
```typescript
export const getDynamoDBClient = () => {
  return new DynamoDB.DocumentClient({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'ap-southeast-2'
  });
};
```

2. **Response Helpers** (`/src/lib/api/responses.ts`):
```typescript
export const jsonResponse = (data: any, status = 200, cacheControl = 's-maxage=1') => {
  return new NextResponse(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': cacheControl
    }
  });
};

export const errorResponse = (message: string, status = 500) => {
  return jsonResponse({ error: message }, status);
};
```

3. **Error Handler** (`/src/lib/api/errors.ts`):
```typescript
export const handleApiError = (error: unknown) => {
  console.error('API Error:', error);
  return errorResponse('An unexpected error occurred', 500);
};
```

## Related Issues
- Reduces code duplication
- Improves maintainability
- Standardizes error handling
- Makes AWS region configurable

## Additional Notes
Consider adding JSDoc comments for all utility functions