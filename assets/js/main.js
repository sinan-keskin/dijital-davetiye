/**
 * DİJİTAL DAVETİYE — ANA SAYFA JS
 * main.js
 */

document.addEventListener('DOMContentLoaded', function () {

  /* ════════════════════════════════
     1. PARTICLE CANVAS
  ════════════════════════════════ */
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let W, H;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function createParticle() {
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.4 + 0.1,
        opacity: Math.random() * 0.6 + 0.1,
        color: Math.random() > 0.5 ? '#c9a84c' : '#ffffff',
        drift: (Math.random() - 0.5) * 0.3,
        flicker: Math.random() * 0.02 + 0.005,
        flickerDir: 1,
      };
    }

    for (let i = 0; i < 120; i++) particles.push(createParticle());

    function animateParticles() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(function (p) {
        p.y -= p.speed;
        p.x += p.drift;
        p.opacity += p.flicker * p.flickerDir;
        if (p.opacity >= 0.7 || p.opacity <= 0.05) p.flickerDir *= -1;
        if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
        if (p.x < -10 || p.x > W + 10) p.x = Math.random() * W;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  /* ════════════════════════════════
     2. NAV SCROLL EFFECT
  ════════════════════════════════ */
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  });

  /* ════════════════════════════════
     3. HAMBURGER MENU
  ════════════════════════════════ */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
      });
    });
  }

  /* ════════════════════════════════
     4. SCROLL REVEAL ANIMATION
  ════════════════════════════════ */
  const revealElements = document.querySelectorAll('[data-reveal]');

  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || 0;
        setTimeout(function () {
          el.classList.add('revealed');
        }, parseInt(delay));
        revealObserver.unobserve(el);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(function (el) {
    el.classList.add('reveal-init');
    revealObserver.observe(el);
  });

  // Add reveal CSS dynamically
  const revealStyle = document.createElement('style');
  revealStyle.textContent = `
    .reveal-init { opacity: 0; transform: translateY(40px); transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.23,1,0.32,1); }
    .reveal-init.revealed { opacity: 1; transform: translateY(0); }
    .reveal-init[data-reveal="left"] { transform: translateX(-40px); }
    .reveal-init[data-reveal="left"].revealed { transform: translateX(0); }
    .reveal-init[data-reveal="right"] { transform: translateX(40px); }
    .reveal-init[data-reveal="right"].revealed { transform: translateX(0); }
    .reveal-init[data-reveal="scale"] { transform: scale(0.85); }
    .reveal-init[data-reveal="scale"].revealed { transform: scale(1); }
  `;
  document.head.appendChild(revealStyle);

  /* ════════════════════════════════
     5. COUNTER ANIMATION
  ════════════════════════════════ */
  function animateCounter(el, target, duration) {
    let start = 0;
    const step = (target / duration) * 16;
    const timer = setInterval(function () {
      start += step;
      if (start >= target) { start = target; clearInterval(timer); }
      el.textContent = Math.floor(start) + (el.dataset.suffix || '');
    }, 16);
  }

  const counters = document.querySelectorAll('[data-counter]');
  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target, parseInt(entry.target.dataset.counter), 1500);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function (c) { counterObserver.observe(c); });

  /* ════════════════════════════════
     6. 3D TILT EFFECT ON CARDS
  ════════════════════════════════ */
  document.querySelectorAll('.template-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const tiltX = ((y - cy) / cy) * 6;
      const tiltY = ((cx - x) / cx) * 6;
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });

  /* ════════════════════════════════
     7. PREVIEW MODAL
  ════════════════════════════════ */
  const modal = document.getElementById('preview-modal');
  const modalIframe = document.getElementById('modal-iframe');
  const modalTitle = document.getElementById('modal-title');
  const modalTemplateName = document.getElementById('modal-template-name');
  const modalQuoteBtn = document.getElementById('modal-quote-btn');
  const modalBackdrop = document.querySelector('.modal-backdrop');
  const modalClose = document.querySelector('.modal-close');

  function openModal(sablonId, sablonName) {
    if (!modal) return;
    modalIframe.src = '../' + sablonId + '/index.html';
    if (modalTitle) modalTitle.textContent = sablonName + ' — Önizleme';
    if (modalTemplateName) modalTemplateName.textContent = sablonName;
    const msg = 'Merhaba! ' + sablonName + ' şablonu hakkında fiyat almak istiyorum. 🎉';
    if (modalQuoteBtn) modalQuoteBtn.href = 'https://t.me/sinankeeeee?text=' + encodeURIComponent(msg);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(function () { if (modalIframe) modalIframe.src = ''; }, 400);
  }

  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
  if (modalClose) modalClose.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  // Attach to preview buttons
  document.querySelectorAll('[data-preview]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const sablonId = btn.dataset.preview;
      const sablonName = btn.dataset.name;
      openModal(sablonId, sablonName);
    });
  });

  document.querySelectorAll('.template-card[data-preview]').forEach(function (card) {
    card.addEventListener('click', function () {
      openModal(card.dataset.preview, card.dataset.name);
    });
  });

  /* ════════════════════════════════
     8. SMOOTH ANCHOR SCROLL
  ════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ════════════════════════════════
     9. NAV ACTIVE LINK
  ════════════════════════════════ */
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-links a[href^="#"]');

  window.addEventListener('scroll', function () {
    let current = '';
    sections.forEach(function (s) {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinksAll.forEach(function (a) {
      a.classList.remove('active-link');
      if (a.getAttribute('href') === '#' + current) a.classList.add('active-link');
    });
  });

});
