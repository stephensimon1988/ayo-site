# AYÓ — Filipino-Inspired Tea

Single-page "coming soon" landing for AYÓ — a static site (no build step).
Recreated from the Claude Design handoff.

## Run locally

Any static server works:

```bash
npx serve .
# or
python3 -m http.server 8000
```

Then open http://localhost:8000.

## How it works

The page is a single full-bleed composite artwork with clickable CTA hotspots
laid over the buttons in the image:

```
index.html                          The landing page (inline CSS, no JS)
assets/img/AYO_PL_Horizontal_01.jpg Desktop / landscape artwork (1672×941)
assets/img/AYO_PL_Vertical.jpg      Mobile / portrait artwork (941×1672)
assets/favicon.svg
```

A media query swaps the horizontal artwork for the vertical one below a 1:1
aspect ratio, and each `.frame` keeps the artwork's exact aspect ratio while
fitting the viewport. The hotspots are percentage-positioned `<a>` overlays
("Join the waitlist" → `#waitlist`, "Follow @drinkAYO" → Instagram).

## Previous version

The earlier multi-page site (Home, Our Story, Flavors, Products, FAQ with a
shared design system) is archived in `business-mode.zip` at the repo root.

## Deploy

Pushes to `main` publish the repo to the `gh-pages` branch via
`.github/workflows/deploy.yml` (GitHub Pages serves it from there).
