/* LifePage Service Worker
   Scope: /app/
   © 2026 LAZLAB Creations. All Rights Reserved.

   Bump VERSION on every release. The app's visible version stamp reads it back from here,
   so the two can never drift apart. */

const VERSION = '1.4';
const CACHE_NAME = 'lifepage-app-v' + VERSION;
const FONT_CACHE = 'lifepage-fonts-v1';

const PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
];

/* ── INSTALL ──
   No automatic skipWaiting: an update waits until the person taps "Update" in the app,
   so a reload never lands in the middle of writing. (On the very first install there is
   no older worker, so this one activates immediately anyway.) */
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE)));
});

/* ── ACTIVATE — purge old app caches (fonts cache is kept) ── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k.startsWith('lifepage-app-') && k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

/* ── MESSAGES from the app ── */
self.addEventListener('message', event => {
  const d = event.data || {};
  if (d.type === 'SKIP_WAITING') self.skipWaiting();
  if (d.type === 'GET_VERSION' && event.source) event.source.postMessage({ type: 'VERSION', version: VERSION, cache: CACHE_NAME });
});

/* ── FETCH ── */
self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  // Google Fonts: stale-while-revalidate so the typography works offline after first load.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.open(FONT_CACHE).then(cache =>
        cache.match(request).then(cached => {
          const fresh = fetch(request).then(res => {
            if (res.ok || res.type === 'opaque') cache.put(request, res.clone());
            return res;
          }).catch(() => cached);
          return cached || fresh;
        })
      )
    );
    return;
  }

  // Everything else cross-origin (AI APIs etc.) goes straight to the network, untouched.
  if (url.origin !== self.location.origin) return;

  // HTML / navigations: network-first, fall back to the cached app shell when offline.
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then(res => {
          if (res.ok) { const copy = res.clone(); caches.open(CACHE_NAME).then(c => c.put(request, copy)); }
          return res;
        })
        .catch(() => caches.match(request).then(hit => hit || caches.match('./index.html')))
    );
    return;
  }

  // Static assets (icons, manifest): cache-first, fill the cache on a miss.
  event.respondWith(
    caches.match(request).then(hit => hit || fetch(request).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE_NAME).then(c => c.put(request, copy)); }
      return res;
    }))
  );
});
