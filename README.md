# MLAI Australia Website

The official website for MLAI Australia - empowering the Australian AI community through events, networking, and resources.

## Quick Start

This website is built with React Router v7 and deployed on Cloudflare.

### Prerequisites

- **Bun** (recommended) or Node.js
- **Wrangler CLI** for deployment

### Installation

1. **Install Bun** (if you don't have it):
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

2. **Install dependencies**:
   ```bash
   bun install
   ```

### Development

Start the development server:
```bash
bun run dev
```

Your site will be available at `http://localhost:5173` with hot reloading enabled.

If you update `.dev.vars`, any service bindings, or page routes outside of dev server, you'll need to regenerate routes:

```bash
bun run typegen
```

### Building & Deployment

1. **Build for production**:
   ```bash
   bun run build
   ```

2. **Deploy to Cloudflare**:
   ```bash
   bun run deploy
   ```

   This builds the project and deploys it using Wrangler.

## Project Structure

- `/app/routes/` - Page routes and API endpoints
- `/app/components/` - Reusable React components
- `/public/` - Static assets

## Key Features

- 🏠 Homepage with events and community info
- 📅 Luma Events integration (`/luma-events`)
- 📝 Contact form (`/contact`)
- 🤝 Sponsor information (`/sponsors`)
- 🏆 Hackathon pages (`/hackathon`)
- 🔗 Social media integration
- 📱 Responsive design with TailwindCSS

## Development Notes

- Uses React Router v7 with server-side rendering
- API routes handle Notion and Luma integrations
- TypeScript throughout for type safety
- Cloudflare Workers runtime compatible

## Community

- **Slack**: [Join our community](https://join.slack.com/t/mlai-aus/shared_invite/zt-39tsn9a8w-9g8UOitrnCTjRj~5e7iomg)
- **LinkedIn**: [Follow us](https://www.linkedin.com/company/mlai-aus-inc)
- **Instagram**: [@mlai_aus](https://www.instagram.com/mlai_aus/)

Built with ❤️ for the Australian AI community.
