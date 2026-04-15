// ─── SwiftCart Service Worker v3 ───────────────────────────────────────────
// Strategy:
//   Navigation / HTML  → Network First  (always fresh UI after deploy)
//   Static assets      → Cache First    (fast loads, long-lived)
//   Everything else    → Network First  (safe default)
// ───────────────────────────────────────────────────────────────────────────

const CACHE_NAME = "swiftcart-v3";

// Core shell assets pre-cached on install
const PRECACHE_ASSETS = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/favicon.ico",
];

// ── INSTALL ─────────────────────────────────────────────────────────────────
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  // Activate immediately — don't wait for old tabs to close
  self.skipWaiting();
});

// ── ACTIVATE ─────────────────────────────────────────────────────────────────
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  // Take control of all open clients immediately
  self.clients.claim();
});

// ── HELPERS ──────────────────────────────────────────────────────────────────

function isNavigationRequest(request) {
  return request.mode === "navigate";
}

function isStaticAsset(url) {
  const ext = url.pathname.split(".").pop();
  return ["js", "css", "woff", "woff2", "ttf", "png", "jpg", "jpeg", "svg", "ico", "webp", "gif"].includes(ext);
}

// Network First — try network, fall back to cache
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    // Offline fallback for navigation — serve shell
    if (isNavigationRequest(request)) {
      return caches.match("/index.html") || caches.match("/");
    }
    return new Response("Offline", { status: 503, statusText: "Service Unavailable" });
  }
}

// Cache First — serve from cache, revalidate in background
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) {
    // Background revalidation (stale-while-revalidate)
    fetch(request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          caches.open(cacheName).then((cache) => cache.put(request, networkResponse));
        }
      })
      .catch(() => {});
    return cached;
  }
  // Not in cache — go to network
  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    return new Response("Offline", { status: 503, statusText: "Service Unavailable" });
  }
}

// ── FETCH ────────────────────────────────────────────────────────────────────
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin GET requests
  if (request.method !== "GET") return;
  if (url.origin !== self.location.origin) return;

  if (isNavigationRequest(request)) {
    // Navigation (page loads) — always Network First for fresh HTML
    event.respondWith(networkFirst(request, CACHE_NAME));
  } else if (isStaticAsset(url)) {
    // JS, CSS, fonts, images — Cache First (content-hashed filenames safe)
    event.respondWith(cacheFirst(request, CACHE_NAME));
  } else {
    // API calls, JSON, etc. — Network First
    event.respondWith(networkFirst(request, CACHE_NAME));
  }
});
