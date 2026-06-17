/* AYÓ landing — waitlist modal + email capture
 * Vanilla JS, no dependencies. Loaded at the end of <body>.
 */
(function () {
  "use strict";

  var modal = document.getElementById("waitlist-modal");
  var openBtn = document.getElementById("open-waitlist");
  var form = document.getElementById("waitlist-form");
  var emailInput = document.getElementById("waitlist-email");
  var msg = document.getElementById("form-msg");
  var lastFocused = null;

  /* ------------------------------------------------------------------ *
   *  submitWaitlist(email) — SINGLE INTEGRATION POINT
   *
   *  Today this just persists the email to localStorage so nothing is
   *  lost before a backend exists. To connect a real backend (e.g. a
   *  Supabase table via Lovable), replace the body below with your
   *  insert call. Keep the signature `async function (email)`:
   *    - resolve  -> success message is shown
   *    - throw    -> error message is shown
   *
   *  Example Supabase replacement:
   *    const { error } = await supabase
   *      .from("waitlist").insert({ email: email });
   *    if (error) throw error;
   * ------------------------------------------------------------------ */
  async function submitWaitlist(email) {
    var KEY = "ayo_waitlist";
    var list = [];
    try {
      list = JSON.parse(localStorage.getItem(KEY)) || [];
    } catch (e) {
      list = [];
    }
    if (list.indexOf(email) === -1) {
      list.push(email);
      try {
        localStorage.setItem(KEY, JSON.stringify(list));
      } catch (e) {
        /* storage unavailable (private mode) — succeed silently */
      }
    }
  }
  // expose so a backend integration can override it if preferred
  window.submitWaitlist = submitWaitlist;

  function openModal() {
    if (!modal) return;
    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    if (msg) {
      msg.textContent = "";
      msg.className = "form-msg";
    }
    window.setTimeout(function () {
      if (emailInput) emailInput.focus();
    }, 60);
  }

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  if (openBtn) openBtn.addEventListener("click", openModal);

  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target.hasAttribute("data-close")) closeModal();
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal && !modal.hidden) closeModal();
  });

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      var email = (emailInput.value || "").trim();
      var submitBtn = form.querySelector('button[type="submit"]');

      // basic email sanity check (input is type=email but we don't rely on it)
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        msg.textContent = "Please enter a valid email address.";
        msg.className = "form-msg form-msg--err";
        emailInput.focus();
        return;
      }

      if (submitBtn) submitBtn.disabled = true;
      try {
        await window.submitWaitlist(email);
        form.reset();
        msg.textContent = "You're on the list — we'll send a hello at launch. ☕";
        msg.className = "form-msg form-msg--ok";
      } catch (err) {
        msg.textContent = "Something went wrong. Please try again.";
        msg.className = "form-msg form-msg--err";
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }
})();
