---
name: Task
about: Create a new task
title: "[TASK] Implement structured logging and remove console.log statements"
labels: task, logging, monitoring, production
assignees: ''
---

## Description
The application uses `console.log` and `console.error` throughout, which is not suitable for production. Implement a proper logging solution with structured logging, log levels, and integration with monitoring services.

## Acceptance Criteria
- [ ] Implement a centralized logging utility
- [ ] Replace all console.* statements with structured logger
- [ ] Configure different log levels (debug, info, warn, error)
- [ ] Ensure sensitive data is not logged
- [ ] Integrate with LogRocket (already installed)
- [ ] Add request ID tracking for API calls

## Technical Details
Current issues:
- Mix of commented and uncommented console.logs
- Logging sensitive data (full request objects)
- No structured format for parsing
- No log levels or filtering

Recommended implementation:

1. **Create logging utility** (`/src/lib/logger.ts`):
```typescript
import LogRocket from 'logrocket';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class Logger {
  private context: string;

  constructor(context: string) {
    this.context = context;
  }

  private log(level: LogLevel, message: string, data?: any) {
    const timestamp = new Date().toISOString();
    const logData = {
      timestamp,
      level,
      context: this.context,
      message,
      ...data
    };

    // In production, send to monitoring service
    if (process.env.NODE_ENV === 'production') {
      LogRocket.captureMessage(message, { level, extra: data });
    } else {
      console[level](JSON.stringify(logData));
    }
  }

  debug(message: string, data?: any) {
    this.log('debug', message, data);
  }

  info(message: string, data?: any) {
    this.log('info', message, data);
  }

  warn(message: string, data?: any) {
    this.log('warn', message, data);
  }

  error(message: string, error?: Error, data?: any) {
    this.log('error', message, { 
      error: error?.message,
      stack: process.env.NODE_ENV !== 'production' ? error?.stack : undefined,
      ...data 
    });
  }
}

export const createLogger = (context: string) => new Logger(context);
```

2. **Usage example**:
```typescript
const logger = createLogger('api/getEvents');

logger.info('Fetching events from Humanitix');
logger.error('Failed to fetch events', error, { statusCode: response.status });
```

## Related Issues
- Improves debugging in production
- Enables proper monitoring and alerting
- Protects sensitive information
- Provides better observability

## Additional Notes
- Consider adding correlation IDs for distributed tracing
- Set up log aggregation (CloudWatch, Datadog, etc.)
- Document logging best practices for the team