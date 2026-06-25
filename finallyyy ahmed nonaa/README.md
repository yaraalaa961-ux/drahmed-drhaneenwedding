# 💍 Dr. Ahmed & Dr. Haneen — Wedding Invitation Website

## Setup Instructions

### 1. Open in VS Code
Drop this entire folder into VS Code.

### 2. Add Music
Place your romantic background music file at:
```
music/main-theme.mp3
```

### 3. Open the Site
- Use **Live Server** extension in VS Code (right-click `index.html` → Open with Live Server)
- Or double-click `index.html` to open in your browser

### 4. RSVP Email Setup (IMPORTANT)
The "Leave a Message" section sends RSVP responses directly to an email inbox
using FormSubmit.co — a free relay service that keeps your email address
**hidden from the page source and UI**.

To activate it for YOUR email:
1. Open `script.js` and find the line:
   ```js
   const RSVP_ENDPOINT = 'https://formsubmit.co/8f3a61c2b9d4e7f10a5c3b8e2d6f9a4c';
   ```
2. Replace the hash with your own — go to https://formsubmit.co, and use:
   ```
   https://formsubmit.co/YOUR-EMAIL@gmail.com
   ```
   On the **first submission**, FormSubmit emails you a confirmation link —
   click it once to activate. After activation, FormSubmit gives you a
   hashed endpoint URL you can swap in to keep the email hidden permanently.
3. Save — done. No backend, no API keys, nothing exposed in the UI.

### 5. File Structure
```
wedding/
├── index.html          ← Main page (Envelope → Language → Story)
├── style.css            ← All styles
├── script.js            ← All JavaScript
├── music/
│   └── main-theme.mp3   ← Background music
└── images/
    ├── logo_transparent.png ← Envelope logo (background removed)
    ├── intro_new.png     ← Childhood photo (intro slide + language screen)
    ├── hero_new.png      ← Couple photo (hero + final slide)
    ├── bg.png            ← Blurred background (swans)
    ├── moment1.png … moment6.png ← Gallery photos
```

### 6. Features
- 💌 **Full-screen envelope entry** — tap to open, reveals the invitation with a cinematic flap animation
- 🌐 **Bilingual** — English & Arabic with full RTL support
- 🌙 **Dark/Light mode** toggle (bottom-left moon/sun button)
- 🎵 **Music player** (bottom-right note button) with autoplay
- ⏱️ **Live countdown** to July 14, 2026 7:00 PM
- 🗺️ **Google Maps** link to venue
- 📝 **Luxury RSVP** — Accept 🌸 "With you in the moment" / Decline 🕊️ "With you in spirit", glowing glass selectors, sent privately to email
- ✨ **Realistic global butterflies** — organic flight paths, layered wings, visible across the entire site
- 💫 **Magic sparkle particles** + floating gold/mint petals
- 📱 **Fully responsive** — mobile, tablet, desktop, no overflow

---
*Wedding: Tuesday, 14 July 2026 · 7:00 PM · Mountain Rose — One View Hall*

