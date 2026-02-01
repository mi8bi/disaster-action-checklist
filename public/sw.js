// Service Worker for PWA
const CACHE_NAME = "disaster-action-checklist-v2";
const urlsToCache = [
  "/",
  "/contacts",
  "/earthquake",
  "/flood",
  "/stocks",
  "/typhoon",
  "/offline.html",
  "/icon-192x192.svg",
  "/icon-512x512.svg",
  "/icon-maskable-192x192.svg",
  "/icon-maskable-512x512.svg",
  "/badge-72x72.svg",
  "/screenshot-540x720.svg",
  "/screenshot-1280x720.svg",
];

// Install event - cache files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).catch((err) => {
        console.log("Cache addAll error:", err);
      });
    }),
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request)
        .then((response) => {
          // Don't cache if not a success response
          if (
            !response ||
            response.status !== 200 ||
            response.type === "error"
          ) {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          // Return offline page or default response
          return caches.match("/offline.html");
        });
    }),
  );
});

// Handle push notifications
self.addEventListener("push", (event) => {
  if (!event.data) {
    return;
  }

  const data = event.data.json();
  const options = {
    body: data.body || "新しい通知があります",
    icon: data.icon || "/icon-192x192.svg",
    badge: "/badge-72x72.svg",
    vibrate: [100, 50, 100],
    tag: "notification",
    requireInteraction: false,
  };

  event.waitUntil(
    self.registration.showNotification(data.title || "防災チェック", options),
  );
});

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      // Check if window is already open
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url === "/" && "focus" in client) {
          return client.focus();
        }
      }
      // If not open, open new window
      if (clients.openWindow) {
        return clients.openWindow("/");
      }
    }),
  );
});

// Handle message from client
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});