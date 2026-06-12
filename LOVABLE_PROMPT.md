# LOVABLE PROMPT — AYÓ Frontend

Copy everything below the line into Lovable after connecting/importing this
repository (`stephensimon1988/ayo-site`, branch `claude/wizardly-cannon-rxilvc`).

---

Build the complete frontend for **AYÓ — Filipino-inspired ready-to-drink tea**
by porting the reference implementation in this repository
(`index.html`, `css/styles.css`, `js/main.js`, `js/shop.js`,
`js/shopify-config.js`) into your React + Vite + TypeScript + Tailwind stack.
The repo is the single source of truth for layout, copy, and design — match it
pixel-for-pixel. Do not invent new copy, sections, or colors.

## Design tokens
- Colors: cream background `#F5EDD8`; primary forest green `#1B3A2D`; dark
  section/footer green `#162B1E`; gold CTA `#C9973A`; gold borders/text on
  dark `#D4A84B`; lemongrass card crimson `#7A1C1C`; pandan card bottle green
  `#1E4A30`; body text `#2C2C2C`; muted `#4A4A3A`; light cream text `#F0E6CC`.
- Fonts (Google Fonts): Cormorant Garamond (headlines, serif, weights
  400–700), Montserrat (labels/buttons, uppercase, wide tracking), Inter
  (body). Hero headline ~84px desktop, serif, green.
- 8px spacing system, 1200px max container, 6px button radius, 16px card
  radius. Section labels: 11–13px uppercase, very wide letter-spacing.

## Page sections, in order (copy verbatim from index.html)
1. **Sticky header** — AYÓ serif wordmark (green), nav: Our Story / The
   Flavors / Shop / FAQ, gold "Join the Waitlist" button, cart icon with
   count badge, mobile burger menu.
2. **Hero** — sun icon + "FILIPINO-INSPIRED TEA" eyebrow; "A hello in every
   sip."; gold "COMING SOON." with thin gold rule + diamond; two paragraphs;
   dark "Join the Waitlist" + outline "Learn Our Story" buttons; four circled
   line-icon badges (Naturally Sweetened / No Artificial Ingredients /
   Non-GMO / Ready-to-Drink Tea); dark pill "• BATCH 001 • SUMMER 2026 •".
   Right: product scene image on a rounded card with palm-leaf backdrop.
3. **Flavors** — label "SAME ROOTS. TWO EXPRESSIONS." then two rounded cards:
   crimson Lemongrass Black Tea (Calamansi • Honey — "Bright, citrusy, and
   smooth with a touch of honey.") and bottle-green Pandan Green Tea (Pandan —
   "Clean, aromatic, and lightly sweet."), each with "COMING SOON" kicker,
   can imagery, and a gold-outline "Learn More →" button.
4. **Shop** — "Reserve Batch 001." Product grid from `js/shopify-config.js`:
   Lemongrass 8-pack $34, Pandan 8-pack $34, Variety 12-pack $48. Cards have
   image, Batch 001/Best Value tag, name, description, price, "Add to Cart".
5. **Our Story** — "Inspired by the Philippines. Created by Filipinos to
   share with the world." + "AYÓ is a celebration of Filipino culture,
   connection, and the everyday moments that bring us together." + lifestyle
   photo right.
6. **Moments gallery** — "Wherever the day takes you." Five photo tiles, two
   rows (2 wide + 3 standard), uppercase captions: Golden hour coast road /
   Night market shared plates / Good ideas over tea / Rooftop salo-salo /
   Sunlit afternoons.
7. **FAQ** — four accordion items (copy in index.html).
8. **Waitlist band** — dark green, spinning gold sun, "Be First To Try Batch
   001.", "Limited quantities. Early access. Launch updates.", email input +
   gold submit, social links @drinkAYO (Instagram, TikTok).
9. **Footer** — dark green: gold AYÓ wordmark + tagline, Explore links,
   Connect (@drinkAYO ×2) + Contact (hello@drinkayo.com), © 2026 AYÓ Tea &
   Co. / A brand by Simon Tanaka Beverages.

## Images
Use the AYÓ campaign images already uploaded to this Lovable project. Rename
and place them as:
- Hero scene → two cans on stone plinth, palm shadows (`hero-cans`)
- Lemongrass flavor card → red can, lemongrass stalks, calamansi (`flavor-lemongrass`)
- Pandan flavor card → green can, crystal glass, palm leaves (`flavor-pandan`)
- Our Story → couple at woven table, golden hour (`story-lifestyle`)
- Shop cards → crops of the red can, green can, and two-can shots
- Moments tiles 1–5 → road-trip overlook / night market / moodboard studio /
  rooftop dinner / sunlit café, in that order
If any slot lacks a photo, keep the repo's SVG vector scene as fallback.

## Animations (GSAP + ScrollTrigger — keep tasteful, mirror js/main.js)
- Scroll reveals: fade + 36px rise on all `data-reveal` content.
- Hero intro timeline: pedestal then cans rise with slight rotation, glass
  and fruit settle with a back-ease pop.
- Idle float: cans gently bob/rotate (yoyo, sine ease).
- 3D tilt on flavor/product cards following cursor (±7°, perspective 900).
- Magnetic CTA buttons (lean toward cursor, spring back).
- Parallax palm fronds in hero and scrubbed parallax on the story photo.
- 40s continuous rotation on the waitlist sun.
- Cart drawer slides in with power3; respect `prefers-reduced-motion`
  (disable all motion) and degrade gracefully if GSAP fails to load.

## E-commerce (Shopify)
- Port `js/shop.js`: cart state persisted to localStorage, slide-out cart
  drawer (line items, qty +/−, remove, subtotal, checkout button).
- Shopify JS Buy SDK via `js/shopify-config.js` pattern: when a store domain
  + Storefront access token are set, fetch products by handle, sync live
  prices, and redirect checkout to Shopify's `webUrl`. Until configured, run
  demo mode with a visible setup note under the product grid.
- Product handles: `lemongrass-black-tea-8-pack`, `pandan-green-tea-8-pack`,
  `ayo-variety-12-pack`.

## Quality bar
Fully responsive (breakpoints ~1024px and ~720px per styles.css), semantic
HTML, keyboard-accessible cart and accordions, visible focus states, alt text
on all imagery, and Lighthouse-clean performance (lazy-load gallery images).
