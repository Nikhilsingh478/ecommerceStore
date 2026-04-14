import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 5000,
    allowedHosts: true,
    hmr: {
      overlay: false,
    },
    headers: {
      "Cache-Control": "no-store",
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
        type: "module",
      },
      workbox: {
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [/^\/~oauth/],
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg,gif,woff2}"],
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
        offlineGoogleAnalytics: false,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "unsplash-images",
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "google-fonts-stylesheets",
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-webfonts",
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: ({ request }: { request: Request }) =>
              request.destination === "document",
            handler: "NetworkFirst",
            options: {
              cacheName: "pages",
              networkTimeoutSeconds: 3,
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: ({ request }: { request: Request }) =>
              ["style", "script", "worker"].includes(request.destination),
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "static-resources",
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 7,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: ({ request }: { request: Request }) =>
              request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "images",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      manifest: {
        id: "/",
        name: "SwiftCart",
        short_name: "SwiftCart",
        description: "Shop groceries, beauty, and daily essentials — fast delivery, every day.",
        theme_color: "#0F172A",
        background_color: "#ffffff",
        display: "standalone",
        display_override: ["window-controls-overlay", "standalone", "browser"],
        orientation: "portrait",
        start_url: "/",
        scope: "/",
        lang: "en",
        dir: "ltr",
        categories: ["shopping", "lifestyle", "food"],
        iarc_rating_id: "e84b072d-71b3-4d3e-86ae-31a8ce4e53b7",
        prefer_related_applications: false,
        icons: [
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        screenshots: [
          {
            src: "/screenshot-mobile.png",
            sizes: "390x844",
            type: "image/png",
            form_factor: "narrow",
            label: "SwiftCart Home — mobile view",
          },
          {
            src: "/screenshot-desktop.png",
            sizes: "1280x800",
            type: "image/png",
            form_factor: "wide",
            label: "SwiftCart — desktop view",
          },
        ],
        shortcuts: [
          {
            name: "My Cart",
            short_name: "Cart",
            description: "View and manage your shopping cart",
            url: "/cart",
            icons: [{ src: "/icon-192.png", sizes: "192x192", type: "image/png" }],
          },
          {
            name: "All Products",
            short_name: "Products",
            description: "Browse all products",
            url: "/products",
            icons: [{ src: "/icon-192.png", sizes: "192x192", type: "image/png" }],
          },
          {
            name: "My Orders",
            short_name: "Orders",
            description: "Track your orders",
            url: "/orders",
            icons: [{ src: "/icon-192.png", sizes: "192x192", type: "image/png" }],
          },
          {
            name: "My Account",
            short_name: "Account",
            description: "Manage your account",
            url: "/account",
            icons: [{ src: "/icon-192.png", sizes: "192x192", type: "image/png" }],
          },
        ],
        launch_handler: {
          client_mode: "focus-existing",
        },
        share_target: {
          action: "/share-target",
          method: "GET",
          params: {
            title: "title",
            text: "text",
            url: "url",
          },
        },
        protocol_handlers: [
          {
            protocol: "web+swiftcart",
            url: "/?uri=%s",
          },
        ],
        edge_side_panel: {
          preferred_width: 400,
        },
        file_handlers: [
          {
            action: "/",
            accept: {
              "text/csv": [".csv"],
            },
          },
        ],
        scope_extensions: [
          {
            origin: "*.swiftcart.app",
          },
        ],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
}));
