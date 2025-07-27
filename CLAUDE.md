# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the MLAI (Machine Learning & AI Australia) website - a Next.js application for a not-for-profit community based in Australia that aims to empower the Australian AI Community. The project is located in the `mlai-frontend` directory.

## Common Development Commands

```bash
# Install dependencies
npm install

# Run development server (localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## Architecture Overview

### Technology Stack
- **Framework**: Next.js 14.1.0 with App Router
- **UI**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Backend**: AWS SDK for DynamoDB integration
- **Analytics**: Google Analytics, Meta Pixel, LogRocket

### Project Structure

The application follows Next.js App Router conventions:

- **`src/app/`**: Contains all pages and API routes
  - Each subdirectory represents a route (e.g., `/about`, `/hackathon`, `/contact`)
  - `api/` contains server-side API routes that interact with DynamoDB
  - `layout.tsx` defines the root layout with header/footer and analytics
  - `page.tsx` files define page components

- **`src/components/`**: Reusable React components used across pages
  - Common components: `header.tsx`, `footer.tsx`, `hero.tsx`, `team.tsx`, etc.

### Key Features

1. **Main Website** (`src/app/page.tsx`): Landing page with sponsor logos, features, events, testimonials
2. **Hackathon Section** (`src/app/hackathon/`): Dedicated hackathon functionality with:
   - Leaderboard system fetching from DynamoDB
   - Team submissions viewer
   - Schedule, speakers, sponsors components
   - Real-time activity updates

3. **API Routes** (`src/app/api/`): Server-side endpoints for:
   - `getTopScores`: Fetches team leaderboard data from DynamoDB
   - `getTeamScores`: Gets specific team scores
   - `getTeamSubmissions`: Retrieves team submissions
   - `getEvents`: Fetches event data

### Database Integration

The application uses AWS DynamoDB for data persistence:
- Configured via AWS SDK with credentials from environment variables
- Primary table: `leaderboard` for hackathon team scores
- Uses scanning with filters to retrieve and group team data

### Environment Variables

Required environment variables (set in `.env.local`):
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- Region is hardcoded to `ap-southeast-2` (Sydney)

### Component Patterns

- Most components are client-side (`'use client'` directive)
- Components follow a modular structure with separate files
- Heavy use of Tailwind CSS utility classes for styling
- Responsive design with mobile-first approach