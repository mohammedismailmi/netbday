# 🎬 KOLIFLIX — Rakshitha's Birthday Interactive Website 🎂

A fully interactive, cinematic Netflix-clone website built with **React** & **Vite** specially crafted for Rakshitha's birthday on **15th November**.

---

## ✨ Features & Interactivity

1. **Authentic Netflix Boot Animation & "TA-DUM" Sound**:
   - Iconic cinematic opening animation with Web Audio API synthesized "TA-DUM" sound (works without needing any external audio file).
   - Skip Intro button & Sound toggle.

2. **"Who's Watching?" Profile Selector**:
   - Rakshitha's VIP Profile with glowing border, golden crown badge 👑, and celebration chime on click.
   - Interactive squad profiles ("The Squad", "Cake Monster", "Add Profile").

3. **Authentic Netflix Home & Billboard**:
   - Massive cinematic hero billboard for **"Koli's Life"** (with "#1 in Birthday Series Today" Top 10 badge).
   - Interactive **▶ Play Ep 1** button.
   - Interactive **ⓘ More Info** button.
   - Interactive **+ My List** toggle with counter badge in the navbar.
   - Interactive **👍 Like & Love** button that showers celebratory birthday confetti 🎊 across the screen!

4. **Episode Details Modal**:
   - Comprehensive Netflix-style modal with Season 1 episodes.
   - Detailed episode overview with runtime and descriptions.
   - **Direct "▶ Watch" button** for both episodes.
   - **Direct "⬇ Download to Laptop" button** for both episodes so Rakshitha can easily save them!
   - Critic reviews & birthday ratings from friends ⭐.

5. **Cinematic Netflix Video Player**:
   - Custom in-browser video player with auto-hiding controls.
   - Play/Pause, Rewind 10s, Fast-Forward 10s.
   - Timeline scrubber with live timestamps.
   - Volume slider & mute toggle.
   - Playback speed controller (0.75x, 1x, 1.25x, 1.5x).
   - "Next Episode" shortcut button.
   - Fullscreen toggle.
   - Built-in "⬇ Download Episode" button directly in the player.
   - Graceful fallback preview if your `.mp4` video files are not yet added.

6. **Interactive Search Bar**:
   - Live search across episodes and moments directly from the navbar.

7. **Interactive Birthday Wishes & Guestbook**:
   - Interactive birthday message wall where friends can leave personalized wishes and send confetti bursts.

---

## 🚀 How to Run the App

Open your terminal in this folder and run:

```bash
npm run dev
```

Then open the URL displayed in your terminal (usually [http://localhost:3000](http://localhost:3000)) in your browser!

To build for production (to host on Vercel, Netlify, or GitHub Pages):
```bash
npm run build
```

---

## ✏️ How to Customize Names, Episodes & Media

All text, episode names, descriptions, and media links are cleanly organized in one single file:

### 👉 **`src/birthdayConfig.js`**

Open `src/birthdayConfig.js` to change:
- **Series Title**: Change `"Koli's Life"` to whatever title you want anytime!
- **Birthday Girl Name & Date**: `"Rakshitha"`, `"November 15"`.
- **Episode Titles & Descriptions**:
  ```javascript
  episodes: [
    {
      id: 1,
      number: 1,
      title: "Your Episode 1 Title Here",
      duration: "12m",
      description: "Your description for Episode 1...",
      src: "media/ep1.mp4",
      thumbnail: "media/ep1.jpg"
    },
    {
      id: 2,
      number: 2,
      title: "Your Episode 2 Title Here",
      duration: "15m",
      description: "Your description for Episode 2...",
      src: "media/ep2.mp4",
      thumbnail: "media/ep2.jpg"
    }
  ]
  ```

---

## 📁 Where to Put Photos & Videos

Place your media files inside the **`public/media/`** folder:
- **`public/media/koli_pic.png`** → Rakshitha's photo for profile & avatar.
- **`public/media/banner.jpg`** → Wide hero backdrop photo.
- **`public/media/ep1.mp4`** → Video file for Episode 1.
- **`public/media/ep1.jpg`** → Thumbnail for Episode 1.
- **`public/media/ep2.mp4`** → Video file for Episode 2.
- **`public/media/ep2.jpg`** → Thumbnail for Episode 2.

*(Note: Even before you drop your real videos/photos, the website includes beautiful placeholders and animated preview fallbacks so it works seamlessly right out of the box!)*
