# AYÓ — Filipino-Inspired Tea

Pre-launch marketing site for AYÓ — a static, multi-page site (no build step).
Recreated from the Claude Design handoff.

## Run locally

Any static server works:

```bash
npx serve .
# or
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Pages

```
index.html        Home — hero, flavor cards, story teaser, waitlist CTA
our-story.html    Our Story — origin, values, journey timeline, gallery
flavors.html      The Flavors — both teas, comparison table, "made for moments"
products.html     The Teas — per-flavor detail (ingredients, specs, pairings)
faq.html          FAQ — searchable accordion + contact band
```

## Structure

```
assets/site.css   Shared design system for subpages (header, hero, sections, CTA, footer)
assets/site.js    Shared interactions (mobile nav, scroll-reveal, FAQ accordion, form feedback)
assets/img/       Brand photography and logos
assets/favicon.svg
```

`index.html` keeps its own inline CSS for the bespoke split-hero layout; the
subpages share `assets/site.css` + `assets/site.js`. All pages use the same
palette and the Playfair Display + Montserrat web fonts.

## Assets

Source images were resized/compressed for the web (photos → progressive JPG,
logos → PNG with transparency). They live in `assets/img/`: brand logos
(`logo-green`, `logo-gold`), product/hero shots (`hero`, `card-lemongrass`,
`card-pandan`, `story`, `couple-night`, `moodboard`), and lifestyle gallery
photos (`group-*`).

## Waitlist

The CTA email forms are static placeholders — `assets/site.js` shows a
confirmation state on submit but does not persist anything. Wire them to your
email provider (Klaviyo, Mailchimp, Shopify customer API) when ready.

## Deploy

Pushes to `main` publish the repo to the `gh-pages` branch via
`.github/workflows/deploy.yml` (GitHub Pages serves it from there).
