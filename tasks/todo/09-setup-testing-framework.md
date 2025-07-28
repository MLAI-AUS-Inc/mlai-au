---
name: Task
about: Create a new task
title: "[TASK] Set up testing framework and add tests"
labels: task, testing, quality, high-priority
assignees: ''
---

## Description
The project has no tests despite being a production application. Set up a testing framework and add comprehensive tests for components and API routes.

## Acceptance Criteria
- [ ] Set up Jest and React Testing Library
- [ ] Configure test environment for Next.js
- [ ] Add unit tests for all API routes
- [ ] Add component tests for key UI components
- [ ] Set up coverage reporting
- [ ] Add test script to package.json
- [ ] Document testing practices

## Technical Details
1. **Install testing dependencies**:
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom @types/jest
```

2. **Create Jest configuration** (`jest.config.js`):
```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/node_modules/**',
  ],
}

module.exports = createJestConfig(customJestConfig)
```

3. **Example API test** (`src/app/api/getEvents/route.test.ts`):
```typescript
import { GET } from './route';
import { NextRequest } from 'next/server';

describe('/api/getEvents', () => {
  it('should return 500 when API key is missing', async () => {
    process.env.PUBLIC_HUMANITIX_API_KEY = '';
    const request = new NextRequest('http://localhost:3000/api/getEvents');
    const response = await GET(request);
    
    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data.error).toBe('API key not found');
  });
});
```

4. **Example component test** (`src/components/events.test.tsx`):
```typescript
import { render, screen, waitFor } from '@testing-library/react';
import Events from './events';

describe('Events Component', () => {
  it('should display events after loading', async () => {
    render(<Events />);
    
    await waitFor(() => {
      expect(screen.getByText('Join us for upcoming events')).toBeInTheDocument();
    });
  });
});
```

## Related Issues
- Currently no way to catch regressions
- No confidence when refactoring
- Manual testing is time-consuming

## Additional Notes
- Consider adding E2E tests with Cypress or Playwright
- Set up CI/CD to run tests automatically
- Aim for 80% code coverage minimum