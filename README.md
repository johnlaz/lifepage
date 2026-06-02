<div align="center">

<img src="icons/icon-192x192.png" width="120" alt="LifePage Logo" />

# LifePage

### *A Letter to My Kids*

**A private autobiography engine that turns your memories into a polished first-person memoir — one chapter at a time.**

[![Live Site](https://img.shields.io/badge/Live%20Site-lifepage-5bc8e8?style=for-the-badge&logo=github)](https://johnlaz.github.io/lifepage/)
[![Open App](https://img.shields.io/badge/Open%20App-Launch%20LifePage-c9a84c?style=for-the-badge)](https://johnlaz.github.io/lifepage/app/)
[![Built by LAZLAB](https://img.shields.io/badge/Built%20by-LAZLAB%20Creations-a78bfa?style=for-the-badge)](https://lazlab.org)
[![PWA Ready](https://img.shields.io/badge/PWA-Install%20Ready-4ade80?style=for-the-badge&logo=pwa)](https://johnlaz.github.io/lifepage/app/)

---

*"No chapter needs to be complete. A few honest sentences is more than most people's children will ever have from them."*

</div>

---

## What is LifePage?

Most people intend to write their story. Almost nobody does.

Not because they don't have anything to say — but because a blank page is intimidating, life is busy, and nobody ever taught us how to capture forty years of memories in a way that actually means something to the people who come after us.

**LifePage changes that.**

It's a private, browser-based autobiography engine designed for real people — not writers. You don't need to start at the beginning. You don't need to finish. You just need to open a chapter and say something true. The app handles the rest — guiding you with AI-powered questions, transcribing your voice, connecting related memories across chapters, and compiling everything into a beautifully written first-person memoir when you're ready.

No account. No subscription. No data leaves your device without your action. Just your story, preserved for the people you love.

---

## Features

### ✦ AI Interview
Every chapter has an AI Interview button. Tap it and the AI opens a warm, guided conversation — asking thoughtful follow-up questions to pull out the details, emotions, and stories that make a chapter come alive. When you're done, your answers drop straight into the chapter with one tap. It feels like talking to a friend who genuinely wants to hear your story.

### 🎙 Voice to Story
Rather speak than type? Hit Record and narrate your memories out loud. With a free Groq API key, your voice is transcribed automatically using Whisper. On mobile, your keyboard's built-in dictation works too. Your voice, your words — no editing required.

### 📌 Memory Connections
Memory doesn't move in straight lines. While writing about your career you might remember something that belongs in *People Who Changed Everything*. Pin it. The AI quietly reads your entry, decides if anything genuinely belongs in the pinned chapter, and adds a warm note there — without touching a single word you wrote.

### ⚡ Draft A & Draft B
Each chapter can hold two separate compiled drafts. Write your notes, compile into Draft A — it locks automatically to protect it. Add more over time, unlock, and compile a fresh Draft B. Compare them side by side or flip between them. Mark your favorite as Final before publishing the full book.

### 🔐 Vault Privacy
Some chapters aren't ready to share yet. Mark them Private — they stay fully preserved in your browser but are scrubbed completely from any compiled output you choose to share with your family.

### 📖 Full Autobiography Compile
When you're ready, one click asks Google Gemini to weave all your chapters into a beautifully written first-person memoir — framed as a heartfelt letter to your children. It adds light transitions between chapters, pulls natural quotes as blockquotes, and preserves your voice throughout. Print it, share it, or keep it.

---

## Twelve Chapters

LifePage structures a lifetime into twelve carefully designed chapters — each with a rich opening prompt and AI follow-up questions built specifically around the *letter to my kids* framing.

| # | Chapter |
|---|---------|
| 1 | Roots & Where We Come From |
| 2 | The Neighborhood I Grew Up In |
| 3 | School Years & Real Lessons |
| 4 | The Leap — Standing on My Own |
| 5 | Career & The Grind |
| 6 | Love, Marriage & Family |
| 7 | Places That Shaped Me |
| 8 | The Hard Years |
| 9 | Things I Made & Left Behind |
| 10 | People Who Changed Everything |
| 11 | If I Were Doing It Over |
| 12 | What I Want You to Know |

Not every chapter needs to be completed. Some will be a page. Some will be a paragraph. That's fine — even one honest sentence per chapter is a gift your kids will carry for the rest of their lives.

---

## How It Works

**1. Choose a chapter** — Pick whichever one feels right today. There's no required order and nothing needs to be finished in one sitting.

**2. Write, talk, or let AI guide you** — Type freely in the editor, tap Record to narrate out loud, or open AI Interview and just answer questions. All three paths lead to the same place: your story, in your words.

**3. Connect memories across chapters** — Pin your entry to other chapters before saving. The AI reads your notes and quietly adds relevant memories where they belong — without changing what you wrote.

**4. Compile each chapter into a polished draft** — When a chapter feels complete, click Write Draft. Gemini turns your raw notes into flowing, first-person prose. Lock it as Draft A. Come back later and compile a Draft B. Compare and choose.

**5. Publish your full book** — When you're ready, compile the full autobiography. Gemini weaves all your chapters into one cohesive memoir — a letter your kids will read long after you're gone.

---

## Privacy First

LifePage is built on a simple principle: **your story belongs to you.**

- Everything is stored in your browser's `localStorage` — nothing is transmitted to any server
- AI features (interview, transcription, compile) use your own API keys, called directly from your browser
- No account, no login, no tracking
- Backup and restore via a simple JSON file you control completely

---

## PWA — Install on Any Device

LifePage is a fully installable Progressive Web App. Open the app in your browser and tap *Add to Home Screen* on iOS or *Install* on Android or Chrome desktop. It installs like a native app with:

- Full offline support via service worker
- Custom splash screens for all iPhone and iPad sizes
- Android adaptive icons with safe-zone maskable variants
- App shortcuts for quick access to your most-used chapters
- App Badging API support for future notification features

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla HTML, CSS, JavaScript — zero dependencies, zero build tools |
| AI Interview | [Groq](https://console.groq.com) — `llama-3.3-70b-versatile` |
| Voice Transcription | [Groq Whisper](https://console.groq.com) — `whisper-large-v3` |
| Chapter & Book Compile | [Google Gemini](https://aistudio.google.com) — `gemini-1.5-flash` |
| Storage | Browser `localStorage` |
| Deployment | GitHub Pages |
| PWA | Service Worker, Web App Manifest, App Badging API |

---

## Repo Structure

```
/
├── index.html          ← Landing page
├── favicon.ico
├── icons/              ← All PWA icons + Apple splash screens
└── app/
    ├── index.html      ← The LifePage app
    ├── manifest.json   ← PWA manifest (scoped to /app/)
    └── sw.js           ← Service worker (scoped to /app/)
```

The service worker and manifest live inside `/app/` intentionally — the SW scope is `/app/` only, so the landing page stays a fast, plain webpage with no PWA overhead.

---

## Getting Started (API Keys)

LifePage uses two free AI APIs. Both have generous free tiers.

**Groq** (AI Interview + Voice Transcription)
1. Go to [console.groq.com](https://console.groq.com)
2. Create a free account and generate an API key
3. Paste it into LifePage → ⚙️ Settings → Groq API Key

**Google Gemini** (Chapter & Book Compilation)
1. Go to [aistudio.google.com](https://aistudio.google.com)
2. Click *Get API Key* — free tier is more than enough
3. Paste it into LifePage → ⚙️ Settings → Google Gemini API Key

Keys are stored only in your browser's localStorage and are never transmitted anywhere except directly to the respective APIs.

---

<div align="center">

**[→ Open LifePage](https://johnlaz.github.io/lifepage/app/)**

---

*Built with care by [LAZLAB Creations](https://lazlab.org)*

© 2025 LAZLAB Creations · All rights reserved

</div>
