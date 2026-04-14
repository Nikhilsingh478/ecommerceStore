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

## PWA Manifest Fields

The manifest in `vite.config.ts` is fully enriched for PWABuilder compliance:
- `id`, `lang`, `dir`, `categories`, `iarc_rating_id`
- `display_override` (window-controls-overlay, standalone, browser)
- `shortcuts` — Cart, Products, Orders, Account
- `screenshots` — mobile (390x844) and desktop (1280x800) in `public/`
- `launch_handler` — focus-existing client mode
- `share_target` — GET handler via `/share-target` route
- `protocol_handlers` — `web+swiftcart:` custom protocol
- `edge_side_panel` — sidebar pinning support
- `file_handlers` — CSV file handling
- `scope_extensions` — wildcard subdomains

Service worker (Workbox) is enabled in both dev and production with:
- Precaching of all static assets
- Runtime caching for images, fonts, pages, static resources
- Offline fallback via `public/offline.html`
- NetworkFirst for HTML pages, CacheFirst for images/fonts

## Deployment

Configured as a static site deployment:
- Build command: `npm run build`
- Output directory: `dist`
