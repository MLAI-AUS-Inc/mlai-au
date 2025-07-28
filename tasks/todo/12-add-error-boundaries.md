---
name: Task
about: Create a new task
title: "[TASK] Add error boundaries and better error handling"
labels: task, error-handling, ux, production
assignees: ''
---

## Description
The application lacks error boundaries which means any component error could crash the entire app. Add proper error boundaries and fallback UI for better user experience.

## Acceptance Criteria
- [ ] Create global error boundary component
- [ ] Add error boundaries around major sections
- [ ] Implement custom error pages (404, 500)
- [ ] Add loading states for async operations
- [ ] Implement retry mechanisms for failed API calls
- [ ] Add user-friendly error messages

## Technical Details
1. **Create error boundary** (`src/components/ErrorBoundary.tsx`):
```typescript
'use client'

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Send to monitoring service
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-4">We're sorry for the inconvenience.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-teal-500 text-white px-4 py-2 rounded"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

2. **Create error.tsx files**:
   - `src/app/error.tsx` - Global error handler
   - `src/app/not-found.tsx` - 404 page
   - Section-specific error handlers

3. **Add loading states**:
```typescript
// src/app/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
    </div>
  );
}
```

4. **Implement retry logic**:
```typescript
async function fetchWithRetry(url: string, options?: RequestInit, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return response;
      if (i === retries - 1) throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
    }
  }
}
```

## Related Issues
- Prevents white screen of death
- Better user experience during errors
- Easier debugging in production
- Graceful degradation

## Additional Notes
- Consider implementing offline support with service workers
- Add error tracking to monitor production issues
- Document error handling patterns for the team