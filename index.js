
  // Simulated login state (frontend only — no backend).
  // Persists across page reloads using localStorage.
  function isLoggedIn() {
    try { return localStorage.getItem('rollbet_logged_in') === '1'; } catch (e) { return false; }
  }

  function setLoggedIn(value) {
    try {
      if (value) localStorage.setItem('rollbet_logged_in', '1');
      else localStorage.removeItem('rollbet_logged_in');
    } catch (e) {}
  }

  // When the "Sign in" button is clicked we simulate a successful login:
  // all Sign in / Sign In buttons are hidden and the logged-in header
  // (Wallet, Notifications, User Dropdown) is revealed.
  function openLogin() {
    setLoggedIn(true);
    applyAuthState();
  }

  function openRegister() {
    // Reuse the same flow — there's no real backend.
    openLogin();
  }

  function logout() {
    setLoggedIn(false);
    applyAuthState();
  }

  // --- Cashier modal ---------------------------------------------------
  function openCashier() {
    var modal = document.getElementById('cashierModal');
    if (!modal) return;
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');
  }

  function closeCashier() {
    var modal = document.getElementById('cashierModal');
    if (!modal) return;
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
  }

  // Close the cashier if the user clicks the dark overlay (outside the modal body).
  function closeCashierOnOverlay(e) {
    if (e && e.target && e.target.id === 'cashierModal') closeCashier();
  }

  // Shows / hides header elements based on the current (simulated) auth state.
  function applyAuthState() {
    var loggedIn = isLoggedIn();

    // Hide every Sign in / Sign In button on the page when logged in.
    var signinButtons = document.querySelectorAll('.signin-btn, .nav-actions .btn-ghost, .mobile-menu .btn-ghost');
    signinButtons.forEach(function (btn) {
      // Skip buttons that live inside the logged-in header itself.
      if (btn.closest && btn.closest('#loggedInHeader')) return;
      btn.style.display = loggedIn ? 'none' : '';
    });

    // Show the logged-in header parts:
    //   - #loggedInCenter : centered wallet + balance
    //   - #loggedInHeader : notifications bell (sits inside nav-actions before chat)
    //   - #loggedInPfp    : avatar circle (sits inside nav-actions after chat)
    var center = document.getElementById('loggedInCenter');
    if (center) center.style.display = loggedIn ? 'flex' : 'none';

    var header = document.getElementById('loggedInHeader');
    if (header) header.style.display = loggedIn ? 'flex' : 'none';

    var pfp = document.getElementById('loggedInPfp');
    if (pfp) pfp.style.display = loggedIn ? 'flex' : 'none';
  }

  function toggleChat() {
    const chat = document.getElementById('sideChat');
    const btn = document.getElementById('chatToggleBtn');
    const isOpen = chat.classList.toggle('open');
    btn.classList.toggle('active', isOpen);
  }

  function toggleMenu() {
    const m = document.getElementById('mobileMenu');
    m.classList.toggle('open');
  }

  function togglePlayMenu(e) {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    document.getElementById('playDropdownWrap').classList.toggle('open');
  }

  // PFP (user) dropdown works the same way as the Play menu:
  // it toggles on click (not hover) and closes on outside-click / Escape.
  function togglePfpMenu(e) {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    var pfp = document.getElementById('loggedInPfp');
    if (pfp) pfp.classList.toggle('open');
  }

  document.addEventListener('click', function(e) {

    const menu = document.getElementById('mobileMenu');
    const hamburger = document.getElementById('hamburger');
    if (menu && hamburger && !menu.contains(e.target) && !hamburger.contains(e.target)) {
      menu.classList.remove('open');
    }

    const playWrap = document.getElementById('playDropdownWrap');
    if (playWrap && !playWrap.contains(e.target)) {
      playWrap.classList.remove('open');
    }

    var pfp = document.getElementById('loggedInPfp');
    if (pfp && !pfp.contains(e.target)) {
      pfp.classList.remove('open');
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const playWrap = document.getElementById('playDropdownWrap');
      if (playWrap) playWrap.classList.remove('open');

      var pfp = document.getElementById('loggedInPfp');
      if (pfp) pfp.classList.remove('open');

      // Also close the cashier modal on Escape.
      var modal = document.getElementById('cashierModal');
      if (modal && modal.style.display !== 'none') closeCashier();
    }
  });

  // On page load, apply the (possibly persisted) auth state.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyAuthState);
  } else {
    applyAuthState();
  }
