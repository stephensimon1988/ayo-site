/**
 * AYÓ shop — renders the product grid, runs the cart drawer, and connects to
 * Shopify via the JS Buy SDK when credentials are present in shopify-config.js.
 * Without credentials it runs in demo mode (local cart, guided checkout note).
 */
(function () {
  'use strict';

  const cfg = window.AYO_SHOPIFY || {};
  const catalog = window.AYO_PRODUCTS || [];

  const isConfigured =
    cfg.domain &&
    cfg.storefrontAccessToken &&
    !/YOUR-STORE|YOUR_STOREFRONT/.test(cfg.domain + cfg.storefrontAccessToken);

  /** state */
  let shopifyClient = null;
  let shopifyCheckout = null;
  const shopifyVariants = {}; // catalog id -> variant id
  const cart = loadCart();

  /** elements */
  const grid = document.getElementById('product-grid');
  const note = document.getElementById('shop-note');
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  const itemsEl = document.getElementById('cart-items');
  const subtotalEl = document.getElementById('cart-subtotal');
  const countEl = document.getElementById('cart-count');

  /* --------------------------------------------------------
     Shopify
  -------------------------------------------------------- */
  async function initShopify() {
    if (!isConfigured || typeof ShopifyBuy === 'undefined') {
      if (note) {
        note.hidden = false;
        note.textContent =
          'Demo mode: add your Shopify domain and Storefront access token in js/shopify-config.js to enable live checkout.';
      }
      return;
    }
    try {
      shopifyClient = ShopifyBuy.buildClient({
        domain: cfg.domain,
        storefrontAccessToken: cfg.storefrontAccessToken,
      });
      const fetches = catalog.map(async (p) => {
        const product = await shopifyClient.product.fetchByHandle(p.handle);
        if (product && product.variants && product.variants.length) {
          shopifyVariants[p.id] = product.variants[0].id;
          const live = parseFloat(product.variants[0].price.amount);
          if (!Number.isNaN(live)) p.price = live;
        }
      });
      await Promise.allSettled(fetches);
      shopifyCheckout = await shopifyClient.checkout.create();
      renderProducts(); // refresh prices from Shopify
    } catch (err) {
      console.warn('[AYÓ] Shopify connection failed, staying in demo mode.', err);
    }
  }

  /* --------------------------------------------------------
     Product grid
  -------------------------------------------------------- */
  function canSVG(color) {
    const isGreen = color === 'green';
    return `
      <span class="pm-can" data-can-float style="position:relative;display:block">
        <svg class="can-svg ${isGreen ? 'can-svg-green' : ''}" style="width:100%"><use href="#tea-can"/></svg>
        ${isGreen ? `
          <span class="can-relabel can-relabel-1">PANDAN</span>
          <span class="can-relabel can-relabel-2">GREEN TEA</span>
          <span class="can-relabel can-relabel-3">PANDAN</span>` : ''}
      </span>`;
  }

  function renderProducts() {
    if (!grid) return;
    grid.innerHTML = catalog
      .map(
        (p) => `
      <article class="product-card" data-tilt data-reveal>
        <div class="product-media pm-${p.theme}">
          <img class="scene-photo" data-photo src="assets/img/product-${p.id}.jpg" alt="" />
          ${p.cans.map(canSVG).join('')}
          <span class="product-tag">${p.tag}</span>
        </div>
        <div class="product-body">
          <h3 class="product-name">${p.name}</h3>
          <p class="product-desc">${p.desc}</p>
          <div class="product-row">
            <span class="product-price">$${p.price.toFixed(2)}</span>
            <button class="btn btn-dark" data-add="${p.id}" data-magnetic>Add to Cart</button>
          </div>
        </div>
      </article>`
      )
      .join('');

    grid.querySelectorAll('[data-add]').forEach((btn) =>
      btn.addEventListener('click', () => addToCart(btn.dataset.add))
    );
    document.dispatchEvent(new CustomEvent('ayo:products-rendered'));
  }

  /* --------------------------------------------------------
     Cart
  -------------------------------------------------------- */
  function loadCart() {
    try {
      return JSON.parse(localStorage.getItem('ayo-cart') || '{}');
    } catch {
      return {};
    }
  }
  function saveCart() {
    localStorage.setItem('ayo-cart', JSON.stringify(cart));
  }

  function addToCart(id) {
    cart[id] = (cart[id] || 0) + 1;
    saveCart();
    renderCart();
    openCart();
  }

  function setQty(id, qty) {
    if (qty <= 0) delete cart[id];
    else cart[id] = qty;
    saveCart();
    renderCart();
  }

  function cartEntries() {
    return Object.entries(cart)
      .map(([id, qty]) => ({ product: catalog.find((p) => p.id === id), qty }))
      .filter((e) => e.product);
  }

  function renderCart() {
    const entries = cartEntries();
    const count = entries.reduce((n, e) => n + e.qty, 0);
    const subtotal = entries.reduce((n, e) => n + e.qty * e.product.price, 0);

    if (countEl) {
      countEl.hidden = count === 0;
      countEl.textContent = count;
    }
    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;

    if (!itemsEl) return;
    if (!entries.length) {
      itemsEl.innerHTML = '<p class="cart-empty">Your cart is empty — for now.</p>';
      return;
    }
    itemsEl.innerHTML = entries
      .map(({ product: p, qty }) => {
        const swatchBg =
          p.theme === 'red' ? '#7A1C1C' : p.theme === 'green' ? '#1E4A30' : '#8A6437';
        return `
        <div class="cart-line">
          <span class="cart-line-swatch" style="background:${swatchBg}">
            <svg style="--can-color:${swatchBg === '#8A6437' ? '#7A1C1C' : swatchBg}"><use href="#tea-can"/></svg>
          </span>
          <div>
            <p class="cart-line-name">${p.name}</p>
            <span class="cart-line-qty">
              <button data-dec="${p.id}" aria-label="Decrease quantity">−</button>
              ${qty}
              <button data-inc="${p.id}" aria-label="Increase quantity">+</button>
            </span><br/>
            <button class="cart-line-remove" data-rem="${p.id}">Remove</button>
          </div>
          <span class="cart-line-price">$${(p.price * qty).toFixed(2)}</span>
        </div>`;
      })
      .join('');

    itemsEl.querySelectorAll('[data-dec]').forEach((b) =>
      b.addEventListener('click', () => setQty(b.dataset.dec, (cart[b.dataset.dec] || 1) - 1))
    );
    itemsEl.querySelectorAll('[data-inc]').forEach((b) =>
      b.addEventListener('click', () => setQty(b.dataset.inc, (cart[b.dataset.inc] || 0) + 1))
    );
    itemsEl.querySelectorAll('[data-rem]').forEach((b) =>
      b.addEventListener('click', () => setQty(b.dataset.rem, 0))
    );
  }

  /* --------------------------------------------------------
     Drawer open / close
  -------------------------------------------------------- */
  function openCart() {
    overlay.hidden = false;
    requestAnimationFrame(() => overlay.classList.add('open'));
    drawer.setAttribute('aria-hidden', 'false');
    if (window.gsap) {
      gsap.to(drawer, { x: 0, duration: 0.5, ease: 'power3.out' });
    } else {
      drawer.style.transform = 'translateX(0)';
    }
  }

  function closeCart() {
    overlay.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    const done = () => (overlay.hidden = true);
    if (window.gsap) {
      gsap.to(drawer, { x: '100%', duration: 0.45, ease: 'power3.in', onComplete: done });
    } else {
      drawer.style.transform = 'translateX(100%)';
      done();
    }
  }

  async function checkout() {
    const entries = cartEntries();
    if (!entries.length) return;

    if (shopifyClient && shopifyCheckout) {
      const lineItems = entries
        .filter((e) => shopifyVariants[e.product.id])
        .map((e) => ({ variantId: shopifyVariants[e.product.id], quantity: e.qty }));
      if (lineItems.length) {
        const updated = await shopifyClient.checkout.addLineItems(
          shopifyCheckout.id,
          lineItems
        );
        window.location.href = updated.webUrl;
        return;
      }
    }
    alert(
      'Demo checkout — connect your Shopify store in js/shopify-config.js to take live orders. See README.md for the 2-minute setup.'
    );
  }

  /* --------------------------------------------------------
     Wire up
  -------------------------------------------------------- */
  document.getElementById('cart-toggle')?.addEventListener('click', openCart);
  document.getElementById('cart-close')?.addEventListener('click', closeCart);
  overlay?.addEventListener('click', closeCart);
  document.getElementById('cart-checkout')?.addEventListener('click', checkout);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.getAttribute('aria-hidden') === 'false') closeCart();
  });

  renderProducts();
  renderCart();
  initShopify();
})();
