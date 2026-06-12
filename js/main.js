/**
 * AYÓ — interactions & GSAP animation layer.
 * Tasteful vector-transform motion: scroll reveals, floating cans, card tilt,
 * magnetic CTAs, parallax fronds, and a slow-spinning sun.
 */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGSAP = typeof gsap !== 'undefined';

  /* --------------------------------------------------------
     Photography slots — if real imagery exists in assets/img/,
     fade it in over the vector scene automatically.
  -------------------------------------------------------- */
  function initPhotoSlots(root) {
    (root || document).querySelectorAll('img[data-photo]').forEach((img) => {
      const reveal = () => img.closest('.hero-scene, .product-media, .story-photo, .flavor-card-visual')?.classList.add('has-photo');
      if (img.complete) {
        // load/error already settled before this script ran
        if (img.naturalWidth > 0) reveal();
        else img.remove();
      } else {
        img.addEventListener('load', reveal, { once: true });
        img.addEventListener('error', () => img.remove(), { once: true });
      }
    });
  }
  initPhotoSlots();
  document.addEventListener('ayo:products-rendered', () => {
    initPhotoSlots(document.getElementById('product-grid'));
    if (hasGSAP && !reduceMotion) initCanFloat(document.getElementById('product-grid'));
  });

  /* --------------------------------------------------------
     Mobile nav
  -------------------------------------------------------- */
  const burger = document.getElementById('nav-burger');
  const nav = document.querySelector('.main-nav');
  burger?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => nav.classList.remove('open'))
  );

  /* --------------------------------------------------------
     Waitlist form
  -------------------------------------------------------- */
  const form = document.getElementById('waitlist-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('waitlist-email');
    if (!email.value || !email.checkValidity()) {
      email.focus();
      if (hasGSAP && !reduceMotion) {
        gsap.fromTo(email, { x: -6 }, { x: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' });
      }
      return;
    }
    // Swap this for your email provider (Shopify customer API, Klaviyo, Mailchimp…)
    try {
      const list = JSON.parse(localStorage.getItem('ayo-waitlist') || '[]');
      list.push({ email: email.value, at: Date.now() });
      localStorage.setItem('ayo-waitlist', JSON.stringify(list));
    } catch {}
    form.hidden = true;
    const confirm = document.getElementById('waitlist-confirm');
    confirm.hidden = false;
    if (hasGSAP && !reduceMotion) {
      gsap.from(confirm, { y: 10, opacity: 0, duration: 0.6, ease: 'power3.out' });
    }
  });

  if (!hasGSAP || reduceMotion) {
    document.body.classList.add('no-js');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* --------------------------------------------------------
     Scroll reveals
  -------------------------------------------------------- */
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      y: 36,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' },
    });
  });

  /* --------------------------------------------------------
     Hero intro — cans rise, glass & fruit settle in
  -------------------------------------------------------- */
  const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
  intro
    .from('.pedestal', { y: 60, opacity: 0, duration: 0.8 }, 0.1)
    .from('.can-red', { y: 120, opacity: 0, rotate: -4, duration: 1 }, 0.3)
    .from('.can-green', { y: 120, opacity: 0, rotate: 4, duration: 1 }, 0.45)
    .from('.glass-wrap', { y: 60, opacity: 0, duration: 0.8 }, 0.7)
    .from('.fruit-wrap', { scale: 0, opacity: 0, transformOrigin: '50% 100%', duration: 0.6, ease: 'back.out(2)' }, 0.9);

  /* --------------------------------------------------------
     Gentle idle float on every can
  -------------------------------------------------------- */
  function initCanFloat(root) {
    (root || document).querySelectorAll('[data-can-float]').forEach((can, i) => {
      if (can.dataset.floating) return;
      can.dataset.floating = '1';
      gsap.to(can, {
        y: '-=10',
        rotate: i % 2 ? 1.2 : -1.2,
        duration: 2.6 + i * 0.35,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    });
  }
  initCanFloat();

  /* --------------------------------------------------------
     Parallax fronds + hero scene drift
  -------------------------------------------------------- */
  gsap.utils.toArray('.hero .frond').forEach((f, i) => {
    gsap.to(f, {
      y: (i + 1) * -40,
      rotate: '+=8',
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });
  });
  gsap.utils.toArray('[data-parallax]').forEach((el) => {
    gsap.fromTo(
      el,
      { y: 40 },
      {
        y: -40,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      }
    );
  });

  /* --------------------------------------------------------
     Slow-spinning sun in the waitlist band
  -------------------------------------------------------- */
  gsap.to('[data-spin]', { rotate: 360, duration: 40, ease: 'none', repeat: -1, transformOrigin: '50% 50%' });

  /* --------------------------------------------------------
     Card tilt — subtle 3D lean following the cursor
  -------------------------------------------------------- */
  function bindTilt(card) {
    if (card.dataset.tiltBound) return;
    card.dataset.tiltBound = '1';
    const strength = 7;
    const setRX = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power3.out' });
    const setRY = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power3.out' });
    const setY = gsap.quickTo(card, 'y', { duration: 0.5, ease: 'power3.out' });
    gsap.set(card, { transformPerspective: 900 });

    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      setRY(px * strength);
      setRX(-py * strength);
      setY(-6);
    });
    card.addEventListener('mouseleave', () => {
      setRY(0);
      setRX(0);
      setY(0);
    });
  }
  const bindAllTilts = () => document.querySelectorAll('[data-tilt]').forEach(bindTilt);
  bindAllTilts();
  document.addEventListener('ayo:products-rendered', bindAllTilts);

  /* --------------------------------------------------------
     Magnetic buttons — CTAs lean toward the cursor
  -------------------------------------------------------- */
  function bindMagnetic(btn) {
    if (btn.dataset.magBound) return;
    btn.dataset.magBound = '1';
    const setX = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3.out' });
    const setY = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3.out' });
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      setX((e.clientX - (r.left + r.width / 2)) * 0.25);
      setY((e.clientY - (r.top + r.height / 2)) * 0.35);
    });
    btn.addEventListener('mouseleave', () => {
      setX(0);
      setY(0);
    });
  }
  const bindAllMagnetics = () => document.querySelectorAll('[data-magnetic]').forEach(bindMagnetic);
  bindAllMagnetics();
  document.addEventListener('ayo:products-rendered', bindAllMagnetics);

  /* --------------------------------------------------------
     Hero scene — slight pointer-led parallax of props
  -------------------------------------------------------- */
  const scene = document.getElementById('hero-scene');
  if (scene && matchMedia('(pointer: fine)').matches) {
    const layers = [
      { el: scene.querySelector('.can-red'), depth: 10 },
      { el: scene.querySelector('.can-green'), depth: 14 },
      { el: scene.querySelector('.glass-wrap'), depth: 20 },
      { el: scene.querySelector('.fruit-wrap'), depth: 24 },
    ].filter((l) => l.el);
    const quicks = layers.map((l) => ({
      x: gsap.quickTo(l.el, 'x', { duration: 0.8, ease: 'power3.out' }),
      depth: l.depth,
    }));
    scene.addEventListener('mousemove', (e) => {
      const r = scene.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      quicks.forEach((q) => q.x(px * q.depth));
    });
    scene.addEventListener('mouseleave', () => quicks.forEach((q) => q.x(0)));
  }

  /* --------------------------------------------------------
     Header — soften on scroll
  -------------------------------------------------------- */
  ScrollTrigger.create({
    start: 'top -60',
    onUpdate: (self) => {
      document.getElementById('site-header').style.boxShadow =
        self.scroll() > 60 ? '0 8px 30px rgba(27,58,45,.12)' : 'none';
    },
  });
})();
