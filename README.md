# AYÓ — Filipino-Inspired Tea

Pre-launch landing page for AYÓ, a self-contained static site (no build step).
Recreated from the Claude Design handoff.

## Run locally

Any static server works:

```bash
npx serve .
# or
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Structure

```
index.html        Full page (inline CSS) — header, hero, flavors, story, waitlist CTA, footer
assets/img/       Brand photography and logos
assets/favicon.svg
```

The page is intentionally a single self-contained `index.html`: all styles are
inline and it pulls only the photographic assets from `assets/img/` plus the
Playfair Display + Montserrat web fonts.

## Assets

| File                          | Where it appears                                |
|-------------------------------|-------------------------------------------------|
| `logo-green.png`              | Header logo                                     |
| `logo-gold.png`               | Footer logo                                     |
| `hero.jpg`                    | Hero — two cans on the stone plinth             |
| `card-lemongrass.jpg`         | Lemongrass flavor card                          |
| `card-pandan.jpg`             | Pandan flavor card                              |
| `story.jpg`                   | Our Story — couple at the outdoor table         |

Source images were resized/compressed for the web (photos → 1600px-wide JPG,
logos → 480px PNG with transparency).

## Waitlist

The CTA email form is a static placeholder (`onsubmit` is disabled). Wire it to
your email provider (Klaviyo, Mailchimp, Shopify customer API) when ready.

## Deploy

Pushes to `main` publish the repo to the `gh-pages` branch via
`.github/workflows/deploy.yml` (GitHub Pages serves it from there).
