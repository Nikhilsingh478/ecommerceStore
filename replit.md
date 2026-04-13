# SwiftCart PWA

A modern, mobile-first e-commerce Progressive Web Application (PWA) for grocery, beauty, and daily essentials.

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite with `@vitejs/plugin-react-swc`
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Zustand
- **Routing**: React Router v6
- **Data Fetching**: TanStack Query (React Query)
- **PWA**: vite-plugin-pwa (Workbox)
- **Package Manager**: npm

## Project Structure

- `src/components/` - Reusable UI components (shadcn/ui + custom)
- `src/pages/` - Route-level page components
- `src/store/` - Zustand global state stores
- `src/data/` - Mock product/category data
- `src/routes/` - Centralized routing config
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utility functions
- `public/` - Static assets and PWA icons

## Running the App

- **Dev**: `npm run dev` (port 5000)
- **Build**: `npm run build`
- **Test**: `npm test`

## Deployment

Configured as a static site deployment:
- Build command: `npm run build`
- Output directory: `dist`
