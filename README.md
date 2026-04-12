# Ecommerce Store PWA

Ecommerce Store is a modern, mobile-first e-commerce Progressive Web Application (PWA) tailored for grocery, beauty, and daily essential shopping. Built with React and Vite, the platform provides an ultra-fast, "soft aesthetics" premium frontend experience utilizing the beautiful **Inter** font. Ecommerce Store is fully installable as a PWA, meaning users can add it directly to their mobile home screens and use it like a native iOS or Android application.

## 🚀 Features

- **Progressive Web App (PWA):** Fully installable on devices with robust offline-capability support. Implements advanced Workbox `RuntimeCaching` utilizing a rigid `CacheFirst` protocol for Unsplash image fetching (retaining data strictly for 7 days offline!). Web manifests, `<apple-touch-icon>`, and custom `offline.html` UI bounds are perfectly native.
- **Category Browsing:** High-density, fast-scanning (4-column grid) categorized sections ensuring quick navigation.
- **Product Listing:** A clean 2-column mobile grid (expanding responsively to desktop) prioritizing image visibility and readable typography utilizing authentic Unsplash payloads.
- **Product Details:** Rich presentation with image carousels, pricing matrices, and dynamic, animated Add to Cart interactions.
- **Instant Global Cart & Checkout:** Zero-latency cart updates across all pages, synced seamlessly without prop-drilling, featuring a simulated animated checkout sequence.
- **Advanced Filter & Sort:** Instantaneous, client-side, dynamic filtering across price boundaries, discounts, brands, and categories.
- **Intelligent Dynamic Live Search:** Instant, deeply integrated `useMemo` search logic filtering live arrays. Provides a beautiful sliding absolute-positioned Dropdown on Desktop and a cascading live-refresh list replacing Mobile overlays instantly as you type!
- **Desktop Parity:** Clean responsive header integrating "Buy Again", "Orders", and "Cart" syncing perfectly to standard app behaviors.
- **Premium Aesthetics & Inter Typography:** The UI utilizes Google's **Inter** typeface (the industry standard for modern webapps), soft `1rem` radius corners, deeply layered contrasts (`99%` background lighting), and a strictly custom minimalistic WebKit Scrollbar.
- **100% White-Labeled & Future Proofed:** Entirely custom environment stripped of any scaffold metadata. We have preemptively implemented the highly anticipated **React Router DOM V7** `v7_startTransition` and `v7_relativeSplatPath` future flags ensuring zero deprecation errors down the road.

## 🛠 Tech Stack

- **Framework:** React 18, Vite
- **Styling:** Tailwind CSS (Vanilla utilities with custom "soft UI" design tokens)
- **State Management:** Zustand
- **Routing:** React Router v6
- **PWA Capabilities:** vite-plugin-pwa (Service Workers, Web App Manifest)
- **Icons:** Lucide React

## 📂 Folder Structure

```
src/
├── components/      # Modular, reusable UI components (Header, ProductCard, Navigation)
├── pages/           # Route-level components mapping directly to user URLs (Home, ProductDetail, Cart)
├── store/           # Global Zustand state management stores (useCartStore)
├── data/            # Local JSON-like databases serving mock application data (products, categories)
├── routes/          # Centralized route mapping and App architecture 
├── utils/           # Helper functions for price formatting, discount calculations
└── App.tsx          # Root application layout wrapping the routing system
```

## 🧩 Key Components Overview

- **`ProductCard`**: The most critical UI element. A state-aware component measuring local cart existence to instantly flip between "Add" and "Qty Control" modes.
- **`SectionGrid`**: A flexible grid abstraction used to render high-density lists of categories, brands, or horizontal product scroll boundaries.
- **`FilterDrawer` & `SortDrawer`**: Animated, off-canvas UI elements providing granular control over the displayed `ProductListing` data.
- **`Header` / `BottomNav`**: Context-aware navigation elements handling transitions seamlessly across desktop and mobile form factors.

## 💾 State Management

Ecommerce Store utilizes **Zustand**—a lightweight, un-opinionated state manager—for global UI sync:
- **Cart State (`useCartStore`)**: Stores an array of cart items with persistent modifications. By using Zustand, tapping "Add to Cart" on the `ProductDetail` page automatically updates the `ProductList` grid, the `BottomNav` notification badge, and the `Cart` page instantaneously without the need for prop drilling.

## 🚦 Routing Flow

The application leans on `React Router` to provide distinct view boundaries seamlessly mapping to semantic URLs:
- `/` -> `Home`
- `/search?q=` -> `ProductListing` (Dynamically fetches `useSearchParams`)
- `/category/:category/:subcategory` -> `ProductListing` (Dynamically parses `useParams`)
- `/product/:id` -> `ProductDetail`
- `/cart` -> `Cart` (Secure Checkout flow)

Currently, Ecommerce Store employs a **Backend-Ready Frontend Interface** by importing structured Typescript arrays (`src/data/*.ts`). This structure acts exactly like a NoSQL document database. When integrating a backend, one simply swaps the synchronous `.map` operations to asynchronous `fetch` calls, leaving the UI components completely untouched.

Through `vite-plugin-pwa`, Ecommerce Store ships with a generated `manifest.webmanifest`. We explicitly utilize `virtual:pwa-register` in the React lifecycle to enforce immediate proxy bootups tying directly into `navigateFallback: '/index.html'`.
A rigorous Service Worker proxies all network bandwidth natively:
- Eliminates "white screens of death" by strictly caching static HTML/JS/CSS logic using automated File Hash signatures.
- Re-routes offline navigation to a specialized, embedded `/offline.html` interface.
- Executes an advanced `CacheFirst` Workbox strategy over Unsplash Network CDNs, limiting data hoarding by enforcing a `maxEntries: 50` pool expiring every `7 days`.

## 💻 Getting Started

1. **Clone & Install Dependencies**
```bash
npm install
```

2. **Run Development Server**
```bash
npm run dev
```

3. **Build for Production**
```bash
npm run build
npm run preview
```

## 🔮 Future Improvements

1. **Backend Integration:** Migrate local `/data` arrays to a RESTful or GraphQL Postgres API.
2. **Authentication:** Bind `Cart` states to active OAuth/JWT authenticated profiles.
3. **Payments:** Incorporate Stripe/Razorpay directly into the Checkout completion hook.
