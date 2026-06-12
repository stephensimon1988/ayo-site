# AYÓ — Filipino-Inspired Tea

Marketing site + e-commerce storefront for AYÓ, built as a fast static site
(no build step) with GSAP motion and a Shopify Storefront integration.

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
index.html            All sections (hero, flavors, shop, story, FAQ, waitlist, footer)
css/styles.css        Full design system (palette + type per brand spec)
js/shopify-config.js  ← Shopify credentials + product catalog (edit this)
js/shop.js            Product grid, cart drawer, Shopify checkout
js/main.js            GSAP animations, photo slots, nav, waitlist form
assets/img/           Drop brand photography here (see below)
```

## Connect Shopify (2 minutes)

1. Shopify admin → **Settings → Apps and sales channels → Develop apps → Create an app**.
2. Configure **Storefront API** scopes: `unauthenticated_read_product_listings`,
   `unauthenticated_write_checkouts`. Install the app and copy the
   **Storefront access token**.
3. Edit `js/shopify-config.js`:
   - `domain`: `your-store.myshopify.com`
   - `storefrontAccessToken`: the token from step 2
   - update each product's `handle` to match your Shopify product handles.
4. Done. Prices sync from Shopify and Checkout redirects to your live
   Shopify checkout. Until then the shop runs in **demo mode** (cart works,
   checkout shows a setup note).

## Brand photography

The site renders vector product scenes by default. To use the real photos,
drop them into `assets/img/` with these names — they fade in automatically,
no code changes needed:

| File                          | Where it appears                          |
|-------------------------------|-------------------------------------------|
| `hero-cans.jpg`               | Hero — two cans on the stone plinth        |
| `flavor-lemongrass.jpg`       | Red flavor card visual                     |
| `flavor-pandan.jpg`           | Green flavor card visual                   |
| `story-lifestyle.jpg`         | Our Story — couple at the woven table      |
| `product-lemongrass-8.jpg`    | Shop — Lemongrass 8-pack card              |
| `product-pandan-8.jpg`        | Shop — Pandan 8-pack card                  |
| `product-variety-12.jpg`      | Shop — Variety pack card                   |
| `gallery-1.jpg`               | Moments — coast road trip at golden hour   |
| `gallery-2.jpg`               | Moments — night market with friends        |
| `gallery-3.jpg`               | Moments — creative studio / moodboard      |
| `gallery-4.jpg`               | Moments — rooftop dinner, city skyline     |
| `gallery-5.jpg`               | Moments — sunlit café workspace            |

## Waitlist

The form currently stores signups in `localStorage` as a placeholder. Point it
at your email provider (Shopify customer API, Klaviyo, Mailchimp) in
`js/main.js` → the `waitlist-form` submit handler.
