/* LifePage Service Worker — v1.0
   Scope: /app/
   © LAZLAB Creations
*/

const CACHE_NAME = 'lifepage-app-v1';

const PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  '../icons/icon-192x192.png',
  '../icons/icon-512x512.png',
];

/* ── INSTALL ── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

/* ── ACTIVATE — purge old caches ── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

/* ── FETCH — network first, cache fallback ── */
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;
  if (url.origin !== self.location.origin) return;
  if (url.protocol === 'chrome-extension:') return;

  event.respondWith(
    fetch(request)
      .then(response => {
        // Cache successful responses
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        }
        return response;
      })
      .catch(() =>
        caches.match(request).then(cached => {
          if (cached) return cached;
          // Navigation fallback — serve app shell
          if (request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        })
      )
  );
});

/* ── PUSH NOTIFICATIONS ── */
self.addEventListener('push', event => {
  if (!event.data) return;
  let data = {};
  try { data = event.data.json(); } catch(e) { data = { title: 'LifePage', body: event.data.text() }; }

  event.waitUntil(
    self.registration.showNotification(data.title || 'LifePage', {
      body: data.body || 'Your story is waiting.',
      icon: '../icons/icon-192x192.png',
      badge: '../icons/icon-96x96.png',
      tag: 'lifepage',
      renotify: true,
      data: { url: data.url || './' },
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const target = event.notification.data?.url || './';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const client of list) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(target);
    })
  );
});

/* ── APP BADGE API ── */
self.addEventListener('message', event => {
  if (event.data?.type === 'SET_BADGE') {
    self.registration.setAppBadge?.(event.data.count).catch(() => {});
  }
  if (event.data?.type === 'CLEAR_BADGE') {
    self.registration.clearAppBadge?.().catch(() => {});
  }
});
