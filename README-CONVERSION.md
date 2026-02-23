# MEDVi QUAD → Next.js Conversion

This Next.js app is a direct port of the static HTML/CSS/JS MEDVi QUAD landing page.

## What was converted

- **HTML** – The main Framer-generated content (`<div id="main">` from `index.html`) is in `content/main.html` and rendered on the home page via `FramerContent` using `dangerouslySetInnerHTML`.
- **CSS** – The original `styles.css` is served as a static file from `public/styles.css` (linked in the layout).
- **JS** – The original `scripts.js` (Plausible, URL params, iOS viewport lock, EverFlow, etc.) is loaded from `public/scripts.js` with `next/script` (`afterInteractive`).

## Run locally

```bash
npm run dev    # http://localhost:3000
npm run build  # production build
npm start      # run production build
```

## Project layout

- `app/layout.tsx` – Root layout, metadata, and third-party scripts (Stripe, Plausible, VWO, Framer events, `scripts.js`).
- `app/page.tsx` – Server component that reads `content/main.html` and passes it to `FramerContent`.
- `app/FramerContent.tsx` – Client component that renders the full Framer HTML.
- `content/main.html` – Extracted body content (the main div and all content from the original `index.html`).
- `public/styles.css` – Original Framer styles (unchanged).
- `public/scripts.js` – Original tracking and behavior scripts (unchanged).

## Notes

- The page is statically generated at build time; the HTML in `content/main.html` is read when you run `next build`.
- To update the design, replace `content/main.html` and/or `public/styles.css` with new exports from Framer (or your static build), then rebuild.
