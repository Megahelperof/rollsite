
  function isLoggedIn() {
    try { return localStorage.getItem('rollbet_logged_in') === '1'; } catch (e) { return false; }
  }

  function setLoggedIn(value) {
    try {
      if (value) localStorage.setItem('rollbet_logged_in', '1');
      else localStorage.removeItem('rollbet_logged_in');
    } catch (e) {}
  }

  function openLogin() {
    setLoggedIn(true);
    applyAuthState();
  }

  function openRegister() {
    openLogin();
  }

  function logout() {
    setLoggedIn(false);
    applyAuthState();
  }

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

  function closeCashierOnOverlay(e) {
    if (e && e.target && e.target.id === 'cashierModal') closeCashier();
  }

  function applyAuthState() {
    var loggedIn = isLoggedIn();

    var signinButtons = document.querySelectorAll('.signin-btn, .nav-actions .btn-ghost, .mobile-menu .btn-ghost');
    signinButtons.forEach(function (btn) {
      if (btn.closest && btn.closest('#loggedInHeader')) return;
      btn.style.display = loggedIn ? 'none' : '';
    });

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

      var modal = document.getElementById('cashierModal');
      if (modal && modal.style.display !== 'none') closeCashier();
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyAuthState);
  } else {
    applyAuthState();
  }
