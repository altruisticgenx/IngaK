# Inga Kaltak Portfolio - AI Policy & Engineering

Professional portfolio for an AI policy researcher and applied AI engineer, featuring a blog with AI-generated summaries and interactive chat functionality.

## Features

- **Portfolio**: Hero, About, Expertise, Experience, Qualifications, Projects sections
- **Blog**: Article categories with AI-powered summarization
- **AI Chat**: Streaming responses with authentication and rate limiting
- **Accessibility**: ARIA attributes, keyboard navigation, screen reader support

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, TailwindCSS, shadcn/ui
- **Backend**: Lovable Cloud (Supabase), Edge Functions
- **AI**: Lovable AI with google/gemini-2.5-flash
- **Testing**: Vitest (unit), Playwright (E2E)

## Quick Start

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

## Project Structure

```
src/
├── components/     # UI components (navigation, ui, layout)
├── sections/       # Page sections (Hero, About, etc.)
├── pages/          # Route pages
├── hooks/          # Custom React hooks
├── lib/            # Utilities and AI integration
├── types/          # TypeScript type definitions
└── tests/          # Test files
supabase/
├── functions/      # Edge functions (chat, summarize)
└── config.toml     # Supabase configuration
```

## Development

- **Lovable**: Visit [Lovable Project](https://lovable.dev/projects/7410f81b-8218-4f2d-bb32-1ba1f84eabb2)
- **Local IDE**: Clone repo and push changes
- **GitHub Codespaces**: Launch from repository

## Deployment

Open [Lovable](https://lovable.dev/projects/7410f81b-8218-4f2d-bb32-1ba1f84eabb2) and click Share → Publish.

## Security

- JWT authentication on protected endpoints
- Rate limiting (50 req/hour per user)
- Input validation and sanitization
- Row Level Security on database tables
