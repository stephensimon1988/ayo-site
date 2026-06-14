// AYÓ — shared site interactions
(function () {
  // Mobile nav toggle
  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var mobile = document.querySelector('.mobile-nav');
    if (toggle && mobile) {
      toggle.addEventListener('click', function () {
        var open = mobile.style.display === 'flex';
        mobile.style.display = open ? 'none' : 'flex';
        toggle.setAttribute('aria-expanded', String(!open));
      });
    }
  }

  // Reveal on scroll
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach(function (e) { e.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (e) { io.observe(e); });
  }

  // FAQ accordion
  function initFaq() {
    var items = document.querySelectorAll('.faq-item');
    items.forEach(function (item) {
      var btn = item.querySelector('.faq-q');
      if (!btn) return;
      btn.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');
        // close siblings in same group
        var group = item.closest('.faq-group') || document;
        group.querySelectorAll('.faq-item.open').forEach(function (other) {
          if (other !== item) other.classList.remove('open');
        });
        item.classList.toggle('open', !isOpen);
      });
    });
  }

  // Waitlist form feedback
  function initForms() {
    document.querySelectorAll('.cta-form, .js-form').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = form.querySelector('input[type="email"]');
        var btn = form.querySelector('button');
        if (input && !input.value) { input.focus(); return; }
        if (btn) {
          var old = btn.textContent;
          btn.textContent = 'You\u2019re on the list \u2713';
          btn.disabled = true;
          if (input) input.value = '';
          setTimeout(function () { btn.textContent = old; btn.disabled = false; }, 2600);
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initReveal();
    initFaq();
    initForms();
  });
})();
