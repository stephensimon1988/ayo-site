# AYÓ — Filipino-Inspired Tea

Single-page "coming soon" landing for AYÓ — a static site (no build step).

## Run locally

Any static server works:

```bash
npx serve .
# or
python3 -m http.server 8000
```

Then open http://localhost:8000.

## How it works

The page is real HTML/CSS laid over a photographic background, so the text,
buttons, social icons, and waitlist form are live elements (not baked into an
image):

```
index.html                 The landing page (inline CSS, real DOM content)
assets/site.js             Waitlist modal + email capture
assets/img/bg-desktop.jpg  Desktop / landscape background (cans on the right)
assets/img/bg-mobile.jpg   Mobile / tablet background (vertical) — see note
assets/img/logo.png        AYÓ wordmark
assets/favicon.svg
```

A media query swaps the background photo and content layout by viewport:

- **Desktop / landscape** (`min-width:900px` and landscape): horizontal photo,
  content in a left-hand column over the empty cream area.
- **Mobile / tablet** (default, mobile-first): vertical photo with the content
  stacked up top over a soft cream wash; sizes scale with `clamp()` so a tablet
  is the same layout, just wider.

The headline has a slow white shimmer wave (CSS `background-clip:text`, disabled
under `prefers-reduced-motion`).

### Waitlist form

"Join the Waitlist" opens a modal with an email field. Submissions go through
**`submitWaitlist(email)`** in `assets/site.js` — the single integration point.
It currently stores emails in `localStorage`; replace the function body with a
real backend call (e.g. a Supabase insert) to capture signups for production.
That function is the only place that needs to change.

### `bg-mobile.jpg` note

`assets/img/bg-mobile.jpg` is a placeholder portrait crop. Replace it with the
final vertical product photo (same path/filename) — the layout already expects
content at the top with the cans below.

## Previous version

The earlier multi-page site (Home, Our Story, Flavors, Products, FAQ with a
shared design system) is archived in `business-mode.zip` at the repo root.

## Deploy

Pushes to `main` publish the repo to the `gh-pages` branch via
`.github/workflows/deploy.yml` (GitHub Pages serves it from there).
