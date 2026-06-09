/* ============================================================
   TA-CHALOM COMPUTER – script.js
   Handles: Tab navigation, mobile menu, shop filter
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Tab Navigation ───────────────────────────────────────── */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  function activateTab(tabId) {
    tabBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
    tabContents.forEach(s => {
      const active = s.id === `tab-${tabId}`;
      s.classList.toggle('active', active);
      if (active) s.style.animation = 'fadeUp 0.4s ease both';
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // close mobile menu if open
    document.querySelector('.nav-tabs').classList.remove('open');
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => activateTab(btn.dataset.tab));
  });

  // expose globally for inline onclick="" calls
  window.switchTab = activateTab;


  /* ── Hamburger / Mobile Menu ──────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navTabs   = document.querySelector('.nav-tabs');

  hamburger.addEventListener('click', () => {
    navTabs.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    const open  = navTabs.classList.contains('open');
    spans[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
    spans[1].style.opacity   = open ? '0' : '';
    spans[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
  });

  // close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
      navTabs.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity = '';
      });
    }
  });


  /* ── Shop Category Filter ─────────────────────────────────── */
  const catBtns     = document.querySelectorAll('.cat-btn');
  const productCards = document.querySelectorAll('.product-card');

  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      productCards.forEach(card => {
        const match = cat === 'all' || card.dataset.cat === cat;
        card.classList.toggle('hidden', !match);
        if (match) {
          card.style.animation = 'fadeUp 0.35s ease both';
        }
      });
    });
  });


  /* ── Cart Inquiry Buttons ─────────────────────────────────── */
  const cartBtns = document.querySelectorAll('.btn-cart');
  cartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.product-card');
      const name = card.querySelector('h4').textContent;
      // In a real site, this would open Line or a form.
      // For now, show a friendly alert.
      showToast(`📩 สนใจ "${name}" — กำลังเปิด Line เพื่อสอบถาม…`);
      // Uncomment below to actually open Line:
      // window.open('https://line.me/ti/p/@tachalom', '_blank');
    });
  });


  /* ── Sticky Navbar Shadow on Scroll ──────────────────────── */
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    navbar.style.boxShadow = window.scrollY > 10
      ? '0 4px 20px rgba(0,0,0,0.35)'
      : '0 2px 12px rgba(0,0,0,0.25)';
  });


  /* ── Toast Notification ───────────────────────────────────── */
  function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%) translateY(0);
      background: #0D1B3E;
      color: #fff;
      padding: 0.75rem 1.75rem;
      border-radius: 50px;
      font-family: 'Sarabun', sans-serif;
      font-size: 0.9rem;
      font-weight: 600;
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
      z-index: 9999;
      border: 2px solid #F5A623;
      animation: toastIn 0.3s ease;
    `;

    document.head.insertAdjacentHTML('beforeend', `
      <style>
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      </style>
    `);

    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
  }

});
