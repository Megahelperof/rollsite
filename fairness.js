
  (function(){
    var gameNames = ['Case Battles','Loot Cases','Roll','Blackjack','Mines','Towers','Dice Duels','Crash'];
    window.fairShow = function(idx, btn) {
      // Update active tab button
      var buttons = document.querySelectorAll('.Fairness_article-options_Kj0ED button');
      buttons.forEach(function(b, i) {
        b.classList.toggle('Fairness_expand_AFO9x', i === idx);
        var span = b.querySelector('span');
        if (span) span.classList.toggle('fade-green', i === idx);
      });
      // Update game title link
      var title = document.getElementById('fairGameTitle');
      if (title) title.textContent = gameNames[idx];
      // Show only the selected code block
      var blocks = document.querySelectorAll('.Fairness_article-code_nsZ8b');
      blocks.forEach(function(blk, i) {
        blk.classList.toggle('Fairness_active_lUOUe', i === idx);
      });
    };
  })();


  function openLogin() { alert('Login modal — connect to your backend here.'); }
  function openRegister() { alert('Register modal — connect to your backend here.'); }

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
  });

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const playWrap = document.getElementById('playDropdownWrap');
      if (playWrap) playWrap.classList.remove('open');
    }
  });
