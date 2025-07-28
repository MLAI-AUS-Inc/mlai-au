---
name: Task
about: Create a new task
title: "[TASK] Add .env.example file for environment variables"
labels: task, security, documentation
assignees: ''
---

## Description
The project uses environment variables but lacks a .env.example file to guide developers on required configuration. This makes onboarding difficult and can lead to runtime errors.

## Acceptance Criteria
- [ ] Create .env.example file with all required environment variables
- [ ] Include placeholder values and descriptions
- [ ] Update README.md with environment setup instructions

## Technical Details
Required environment variables found:
- `AWS_ACCESS_KEY_ID` - AWS credentials for DynamoDB access
- `AWS_SECRET_ACCESS_KEY` - AWS secret key for DynamoDB access  
- `PUBLIC_HUMANITIX_API_KEY` - API key for fetching events from Humanitix

## Related Issues
- Security: Ensures developers don't commit real credentials
- Developer experience: Makes setup easier

## Additional Notes
Consider adding .env to .gitignore if not already present