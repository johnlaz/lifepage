# LifePage — PWA Deployment Package

© LAZLAB Creations. All rights reserved.

---

## Repo Structure

```
/ (root)
├── index.html                      ← Landing page (no manifest, no SW)
├── favicon.ico                     ← Browser favicon
├── icons/                          ← Shared icons used by both pages
│   ├── icon-16x16.png
│   ├── icon-32x32.png
│   ├── icon-48x48.png
│   ├── icon-72x72.png
│   ├── icon-96x96.png
│   ├── icon-128x128.png
│   ├── icon-144x144.png
│   ├── icon-152x152.png
│   ├── icon-180x180.png
│   ├── icon-192x192.png
│   ├── icon-384x384.png
│   ├── icon-512x512.png
│   ├── icon-192x192-maskable.png   ← Android adaptive icon
│   ├── icon-512x512-maskable.png   ← Android adaptive icon (large)
│   ├── apple-splash-750x1334.jpg   ← iPhone SE / 8
│   ├── apple-splash-1125x2436.jpg  ← iPhone X / 11 Pro
│   ├── apple-splash-1179x2556.jpg  ← iPhone 14 Pro
│   ├── apple-splash-1284x2778.jpg  ← iPhone 14 Plus / Pro Max
│   ├── apple-splash-1668x2388.jpg  ← iPad Pro 11"
│   └── apple-splash-2048x2732.jpg  ← iPad Pro 12.9"
└── app/
    ├── index.html                  ← LifePage app
    ├── manifest.json               ← PWA manifest (scoped to /app/)
    └── sw.js                       ← Service worker (scoped to /app/)
```

---

## Why the manifest and SW live in /app/

A service worker's scope is determined by where the file lives.
A SW at `/sw.js` would control all requests under `/` — including the
landing page — which is unnecessary and wasteful.

By placing `sw.js` and `manifest.json` inside `/app/`, the SW scope is
automatically `/app/`, meaning it only intercepts requests for the PWA
itself. The landing page stays a fast, plain webpage with no SW overhead.

---

## GitHub Pages Deployment

1. Push all files to your repo root
2. Enable GitHub Pages from `main` branch root
3. Your URLs:
   - Landing: `https://yourusername.github.io/repo-name/`
   - App:     `https://yourusername.github.io/repo-name/app/`

The manifest `start_url` is `"./"` (relative), which resolves correctly
to `/app/` regardless of the repo name or subdirectory.

---

## PWA Icon Coverage

| Size       | Usage                                      |
|------------|--------------------------------------------|
| 16×16      | Browser tab favicon                        |
| 32×32      | Browser tab favicon (retina)               |
| 48×48      | Windows taskbar / Chrome web store         |
| 72×72      | Android home screen (mdpi)                 |
| 96×96      | Android home screen (hdpi) / Badge icon    |
| 128×128    | Chrome Web Store                           |
| 144×144    | Windows 8 tile / Android hdpi              |
| 152×152    | iOS iPad home screen                       |
| 180×180    | iOS iPhone home screen (recommended)       |
| 192×192    | Android home screen (standard PWA)         |
| 384×384    | Android home screen (high-res)             |
| 512×512    | Android splash + PWA install prompt        |
| 192 mask   | Android adaptive icon (safe-zone padded)   |
| 512 mask   | Android adaptive icon large                |

---

## App Badging API

Show a notification count badge on the app icon:

```js
// From anywhere in the app:
navigator.setAppBadge(3);   // Show badge with count
navigator.clearAppBadge();  // Remove badge

// Or message the SW:
navigator.serviceWorker.ready.then(reg => {
  reg.active.postMessage({ type: 'SET_BADGE', count: 3 });
  reg.active.postMessage({ type: 'CLEAR_BADGE' });
});
```

---

Built by LAZLAB Creations · [lazlab.org](https://lazlab.org)
