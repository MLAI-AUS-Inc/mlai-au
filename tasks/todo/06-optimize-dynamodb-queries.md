---
name: Task
about: Create a new task
title: "[TASK] Optimize DynamoDB queries for better performance"
labels: task, performance, database, high-priority
assignees: ''
---

## Description
The `getTopScores` API route uses an inefficient full table scan with filtering, which will become a performance bottleneck as data grows. This needs to be optimized using proper DynamoDB query patterns.

## Acceptance Criteria
- [ ] Replace scan operation with query operation where possible
- [ ] Add appropriate Global Secondary Indexes (GSI) to DynamoDB table
- [ ] Implement pagination for large result sets
- [ ] Add caching layer for frequently accessed data
- [ ] Remove the commented 10-minute delay code

## Technical Details
Current inefficient pattern:
```typescript
// Scans entire table - O(n) operation
const params = {
  TableName: "leaderboard",
  FilterExpression: "team_id BETWEEN :start_id AND :end_id",
  ExpressionAttributeValues: {
    ":start_id": 1,
    ":end_id": 50,
  }
};
```

Recommended approach:
1. **Add GSI on team_id**:
   - Partition key: team_id
   - Sort key: submitted_at

2. **Use Query instead of Scan**:
```typescript
// Query specific team IDs - O(1) operation per team
const queryPromises = Array.from({length: 50}, (_, i) => 
  docClient.query({
    TableName: "leaderboard",
    IndexName: "team_id-submitted_at-index",
    KeyConditionExpression: "team_id = :tid",
    ExpressionAttributeValues: { ":tid": i + 1 },
    ScanIndexForward: false,
    Limit: 1
  }).promise()
);
```

3. **Implement caching**:
   - Cache results for 1-5 minutes
   - Use Next.js built-in caching or Redis

## Related Issues
- Current approach won't scale beyond a few thousand records
- In-memory processing of all results uses excessive memory
- No pagination causes large response sizes

## Additional Notes
- Consider using DynamoDB Streams for real-time leaderboard updates
- Document the required DynamoDB table structure and indexes
- Add performance monitoring to track query times