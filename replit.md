# Shoppermo - Hyper-local Shopping Platform

## Overview

Shoppermo is a hyper-local shopping and deals platform that connects shoppers with independent stores and big brands in their neighborhood. The application features a marketing website, merchant dashboard, and consumer app prototype, all built with a modern full-stack architecture.

The platform enables:
- **For Shoppers**: Discover personalized deals, flash sales, and AI-powered recommendations from nearby stores
- **For Merchants**: Broadcast in-store products and deals to nearby customers, manage inventory visibility, and track engagement
- **For Enterprise**: White-label solutions and API access for larger retail chains

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Tooling**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR and optimized production builds
- Wouter for lightweight client-side routing
- Tailwind CSS v4 with custom design tokens for consistent styling across the application

**UI Component System**
- Radix UI primitives for accessible, unstyled components (dialogs, dropdowns, forms, etc.)
- shadcn/ui configuration with "new-york" style preset
- Framer Motion for animations and transitions
- Custom component library organized under `@/components` with separate sections for landing pages, business pages, app UI, and dashboard

**State Management**
- TanStack Query (React Query) for server state management, caching, and data fetching
- React Hook Form with Zod validation for form state and validation
- No global client state management (relying on server state and local component state)

**Routing Strategy**
- Standard client-side routing using wouter with server-side fallback to index.html for SPA support
- Separate route trees for marketing site (`/`, `/business`, `/contact`, `/about`), merchant dashboard (`/dashboard/*`), consumer app (`/app/*`), and admin panel (`/admin`)

### Backend Architecture

**Server Framework**
- Express.js with TypeScript running on Node.js
- Middleware stack includes JSON parsing, URL encoding, and request logging
- HTTP server created with Node's built-in `http` module for potential WebSocket support

**Development vs Production**
- Development: Vite middleware integrated directly into Express for HMR
- Production: Static file serving from pre-built `dist/public` directory
- Build process uses esbuild to bundle server code with selective dependency bundling for faster cold starts

**API Design**
- RESTful endpoints under `/api` prefix
- Form submission endpoints: `/api/waitlist`, `/api/merchant-applications`, `/api/contact-sales`, `/api/contact`
- Zod schema validation on all incoming requests with friendly error messages via `zod-validation-error`
- Structured error handling with appropriate HTTP status codes

**Data Access Layer**
- Storage interface abstraction (`IStorage`) implemented by `DbStorage` class
- Repository pattern separating database concerns from route handlers
- All database operations return typed entities based on Drizzle schema

### Data Storage

**Database**
- PostgreSQL as the primary data store
- Connection pooling via `pg` library with connection string from `DATABASE_URL` environment variable
- Database fails fast on startup if `DATABASE_URL` is not configured

**ORM & Schema Management**
- Drizzle ORM for type-safe database queries and schema definitions
- Schema defined in `shared/schema.ts` and shared between client and server
- Drizzle Kit for migrations with output to `./migrations` directory
- Tables: `users`, `waitlist`, `merchant_applications`, `contact_sales`, `contact_inquiries`

**Type Safety**
- Drizzle Zod integration for automatic Zod schema generation from database schema
- Shared type definitions ensure consistency between database entities and API contracts

### External Dependencies

**Email Integration**
- Gmail API via Google APIs Node.js client
- OAuth2 authentication using Replit Connectors for credential management
- Connector hostname and identity tokens from environment variables (`REPLIT_CONNECTORS_HOSTNAME`, `REPL_IDENTITY`, `WEB_REPL_RENEWAL`)
- HTML email composition with inline styling for notification emails
- Email notifications sent for: waitlist signups, merchant applications, contact sales inquiries, general contact form submissions

**Replit-Specific Integrations**
- Vite plugins for Replit development environment:
  - `@replit/vite-plugin-runtime-error-modal` for better error visibility
  - `@replit/vite-plugin-cartographer` for code navigation (dev only)
  - `@replit/vite-plugin-dev-banner` for development indicators (dev only)
- Custom `metaImagesPlugin` to dynamically update OpenGraph image URLs based on Replit deployment domain
- Deployment URL detection from environment variables for meta tags

**Asset Management**
- Static assets served from `client/public` for favicons, manifests, app icons
- Generated images stored in `attached_assets` directory with Vite alias resolution
- Custom fonts loaded from Google Fonts (Inter, Poppins, Pacifico)

**Build & Deployment**
- Custom build script bundling both client (Vite) and server (esbuild)
- Selective server dependency bundling (allowlist includes core deps like drizzle-orm, express, pg, etc.)
- Production mode serves pre-built static files with fallback to index.html for SPA routing
- PWA manifest configured for mobile app experience

**Development Tools**
- TypeScript strict mode enabled across entire codebase
- Path aliases for cleaner imports: `@/*` (client), `@shared/*` (shared), `@assets/*` (attached_assets)
- PostCSS with Tailwind CSS and Autoprefixer for CSS processing