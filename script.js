/* ============================================================
   Sarun IT Service – script.js
   Features: Navbar scroll/active, Hamburger, FAQ Accordion,
             AOS (Animate on Scroll), Back to Top, Smooth scroll
   ============================================================ */

(function () {
  'use strict';

  /* ── DOM REFS ── */
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const backToTop = document.getElementById('backToTop');
  const allNavLinks = document.querySelectorAll('.nav-link');
  const sections  = document.querySelectorAll('section[id], footer[id]');

  /* ============================================================
     NAVBAR – scroll shadow + active link highlight
     ============================================================ */
  function onScroll() {
    const y = window.scrollY;

    /* Shadow on scroll */
    navbar.classList.toggle('scrolled', y > 20);

    /* Back-to-top button */
    backToTop.classList.toggle('show', y > 400);

    /* Active nav link */
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 90;
      if (y >= top) current = sec.id;
    });
    allNavLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', href === current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  /* ============================================================
     HAMBURGER MENU
     ============================================================ */
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'ปิดเมนู' : 'เปิดเมนู');
  });

  /* Close menu when a link is clicked */
  allNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'เปิดเมนู');
    });
  });

  /* Close menu when clicking outside */
  document.addEventListener('click', e => {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  /* ============================================================
     BACK TO TOP
     ============================================================ */
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ============================================================
     FAQ ACCORDION
     ============================================================ */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer  = btn.nextElementSibling;
      const isOpen  = btn.getAttribute('aria-expanded') === 'true';

      /* Close all others */
      document.querySelectorAll('.faq-q').forEach(other => {
        if (other !== btn) {
          other.setAttribute('aria-expanded', 'false');
          const otherAnswer = other.nextElementSibling;
          if (otherAnswer) otherAnswer.hidden = true;
        }
      });

      /* Toggle current */
      if (isOpen) {
        btn.setAttribute('aria-expanded', 'false');
        answer.hidden = true;
      } else {
        btn.setAttribute('aria-expanded', 'true');
        answer.hidden = false;
      }
    });
  });

  /* ============================================================
     AOS – Animate on Scroll (lightweight IntersectionObserver)
     ============================================================ */
  const aosItems = document.querySelectorAll('[data-aos]');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    aosItems.forEach((el, i) => {
      /* Stagger delay for grid children */
      el.style.transitionDelay = (i % 6) * 0.07 + 's';
      observer.observe(el);
    });
  } else {
    /* Fallback for old browsers */
    aosItems.forEach(el => el.classList.add('aos-animate'));
  }

  /* ============================================================
     SMOOTH SCROLL for anchor links
     ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-h')) || 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ============================================================
     AREA PILL – interactive toggle (UI only)
     ============================================================ */
  document.querySelectorAll('.area-pill:not(.area-pill--more)').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.area-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });

  /* ============================================================
     HERO STATS – count-up animation
     ============================================================ */
  function countUp(el, target, suffix, duration) {
    const start = performance.now();
    const isDecimal = String(target).includes('.');
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value = Math.round(eased * target);
      el.textContent = (isDecimal ? value.toFixed(1) : value) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) {
    const statNums = statsSection.querySelectorAll('.stat-num');
    let counted = false;
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !counted) {
        counted = true;
        const targets = [500, 5, 6];
        const suffixes = ['+', ' ★', '+'];
        statNums.forEach((el, i) => {
          countUp(el, targets[i], suffixes[i], 1400);
        });
      }
    }, { threshold: 0.5 });
    statsObserver.observe(statsSection);
  }

})();
