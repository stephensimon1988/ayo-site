/**
 * AYÓ — Shopify connection settings.
 *
 * To go live:
 *  1. In Shopify admin: Settings → Apps and sales channels → Develop apps →
 *     create an app with Storefront API access (unauthenticated_read_product_listings,
 *     unauthenticated_write_checkouts) and copy the Storefront access token.
 *  2. Fill in `domain` (your-store.myshopify.com) and `storefrontAccessToken` below.
 *  3. Optionally map each product's Shopify handle in PRODUCTS so the buttons
 *     resolve to the right variants.
 *
 * Until a token is provided the shop runs in demo mode: the full cart UX works
 * locally and checkout explains how to connect Shopify.
 */
window.AYO_SHOPIFY = {
  domain: 'YOUR-STORE.myshopify.com',
  storefrontAccessToken: 'YOUR_STOREFRONT_ACCESS_TOKEN',
};

/** Catalog. `handle` must match the product handle in Shopify. */
window.AYO_PRODUCTS = [
  {
    id: 'lemongrass-8',
    handle: 'lemongrass-black-tea-8-pack',
    name: 'Lemongrass Black Tea',
    desc: 'Calamansi • Honey — bright, citrusy, and smooth. 8 × 12 fl oz cans.',
    price: 34.0,
    tag: 'Batch 001',
    theme: 'red',
    cans: ['red'],
  },
  {
    id: 'pandan-8',
    handle: 'pandan-green-tea-8-pack',
    name: 'Pandan Green Tea',
    desc: 'Pandan — clean, aromatic, and lightly sweet. 8 × 12 fl oz cans.',
    price: 34.0,
    tag: 'Batch 001',
    theme: 'green',
    cans: ['green'],
  },
  {
    id: 'variety-12',
    handle: 'ayo-variety-12-pack',
    name: 'The Variety Pack',
    desc: 'Six of each flavor. The full AYÓ welcome. 12 × 12 fl oz cans.',
    price: 48.0,
    tag: 'Best Value',
    theme: 'mixed',
    cans: ['red', 'green'],
  },
];
