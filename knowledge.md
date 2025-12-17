# Inga Kaltak Portfolio - Project Knowledge Base

## Vision
Professional portfolio for AI policy researcher and applied AI engineer, featuring blog articles with AI-generated summaries and interactive AI chat functionality.

## Core Features

### Portfolio
- Hero section with 3D animations and mobile-first design
- About, Expertise, Experience, Qualifications, Projects sections
- Comprehensive accessibility (ARIA, keyboard navigation)
- Federal-grade TypeScript with strict patterns

### Blog
- Article categories: Wellness, Travel, Creativity, Growth
- AI-powered article summarization via Lovable AI
- Featured articles integration on portfolio

### AI Chat
- Streaming responses using google/gemini-2.5-flash
- JWT authentication required
- Rate limiting (50 requests/hour per user)

## Architecture

### Frontend
- React 18 with TypeScript
- Vite build system
- TailwindCSS with shadcn/ui components
- Feature-based folder structure

### Backend (Lovable Cloud)
- Supabase PostgreSQL database
- Edge Functions for AI integration
- Row Level Security policies

### Testing
- Vitest for unit tests
- Playwright for E2E tests

## Design System
- Dark theme with cyan/slate color palette
- Glassmorphism effects
- Mobile-first responsive design
- Memoized components for performance

## Security Standards
- JWT authentication for protected endpoints
- Rate limiting on AI endpoints
- Input validation and sanitization
- RLS policies on all tables
