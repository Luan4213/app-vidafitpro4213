// Service Worker para VidaFitPro PWA
const CACHE_NAME = 'vidafitpro-v1';
const STATIC_CACHE = 'vidafitpro-static-v1';
const DYNAMIC_CACHE = 'vidafitpro-dynamic-v1';

// Recursos estáticos para cache
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/_next/static/css/app/layout.css',
  '/_next/static/chunks/webpack.js',
];

// Cache de recursos estáticos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Limpeza de caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Estratégia de cache: Cache First para recursos estáticos, Network First para dados dinâmicos
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Cache First para recursos estáticos
  if (STATIC_ASSETS.some(asset => request.url.includes(asset))) {
    event.respondWith(
      caches.match(request).then((response) => {
        return response || fetch(request).then((response) => {
          const responseClone = response.clone();
          caches.open(STATIC_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        });
      })
    );
  }
  // Network First para dados dinâmicos (API calls)
  else if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          return caches.match(request);
        })
    );
  }
  // Stale While Revalidate para outras páginas
  else {
    event.respondWith(
      caches.match(request).then((response) => {
        const fetchPromise = fetch(request).then((networkResponse) => {
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, networkResponse.clone());
          });
          return networkResponse;
        });
        return response || fetchPromise;
      })
    );
  }
});

// Notificações push (futuro)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1,
      },
    };
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Clique em notificação
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});