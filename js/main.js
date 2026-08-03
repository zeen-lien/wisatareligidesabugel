/* ══════════════════════════════════════════
   WISATA RELIGI DESA BUGEL — main.js
   ══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  gsap.registerPlugin(ScrollTrigger);

  /* ─────────────────────────────────────
     1. NAVBAR — scroll state
  ───────────────────────────────────── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ─────────────────────────────────────
     2. MOBILE MENU
  ───────────────────────────────────── */
  const burger = document.getElementById('navBurger');
  const drawer = document.getElementById('navDrawer');

  burger.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  function closeMenu() {
    drawer.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function smoothScroll(targetId) {
    const el = document.getElementById(targetId);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  // Semua nav links — desktop + mobile + hero scroll
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        closeMenu();
        return;
      }
      const targetId = href.replace('#', '');
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        closeMenu();
        requestAnimationFrame(() => smoothScroll(targetId));
      }
    });
  });

  /* ─────────────────────────────────────
     3. ACTIVE NAV ON SCROLL
  ───────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link, .nav__drawer-link');

  function setActiveNav() {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY + 120 >= sec.offsetTop) current = sec.id;
    });
    navLinks.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
    });
  }
  window.addEventListener('scroll', setActiveNav, { passive: true });
  setActiveNav();

  /* ─────────────────────────────────────
     4. HERO INTRO ANIMATION
     Pisahkan hero elements dari reveal system
     — hero pakai class tersendiri, bukan .reveal-*
  ───────────────────────────────────── */

  // Set semua hero elements invisible SEBELUM animasi
  const heroEls = [
    '.hero__tag',
    '.hero__title .reveal-line',
    '.hero__sub',
    '.hero__desc',
    '.hero__meta',
    '.hero__cta'
  ];
  gsap.set(heroEls, { opacity: 0, y: 30 });
  // Title lines butuh clip dari bawah
  gsap.set('.hero__title .reveal-line', { y: 60 });

  // Jalankan animasi setelah sedikit delay biar font & icons load
  gsap.timeline({ delay: 0.15 })
    .to('.hero__tag',
      { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' })
    .to('.hero__title .reveal-line',
      { opacity: 1, y: 0, duration: 0.75, ease: 'power4.out', stagger: 0.15 }, '-=0.25')
    .to('.hero__sub',
      { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, '-=0.3')
    .to('.hero__desc',
      { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, '-=0.4')
    .to('.hero__meta',
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.4')
    .to('.hero__cta',
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.4');

  /* ─────────────────────────────────────
     5. HERO DECORATIVE PARALLAX
     Hanya elemen dekoratif — orb & glow
  ───────────────────────────────────── */
  gsap.to('.hero__orb', {
    y: -80, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 2 }
  });
  gsap.to('.hero__glow--1', {
    y: -60, x: -20, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 2.5 }
  });
  gsap.to('.hero__glow--2', {
    y: -40, x: 15, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 3 }
  });

  /* ─────────────────────────────────────
     6. SCROLL REVEAL
     Hanya untuk elemen di LUAR hero
     Elemen hero sudah di-handle di atas
  ───────────────────────────────────── */
  
  // Fungsi helper untuk register reveal per elemen
  function revealEl(el, fromVars) {
    // Set initial hidden state
    gsap.set(el, { opacity: 0, ...fromVars });
    
    // Animate in saat masuk viewport
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        const delay = parseFloat(
          el.style.getPropertyValue('--delay') || '0'
        );
        gsap.to(el, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.7,
          delay,
          ease: 'power3.out'
        });
      }
    });
  }

  // Pilih semua reveal elements di luar .hero
  document.querySelectorAll('.reveal-up').forEach(el => {
    if (!el.closest('.hero')) revealEl(el, { y: 36 });
  });
  document.querySelectorAll('.reveal-left').forEach(el => {
    if (!el.closest('.hero')) revealEl(el, { x: -40 });
  });
  document.querySelectorAll('.reveal-right').forEach(el => {
    if (!el.closest('.hero')) revealEl(el, { x: 40 });
  });

  /* ─────────────────────────────────────
     7. SECTION TITLES
  ───────────────────────────────────── */
  document.querySelectorAll('.section-title').forEach(title => {
    if (title.closest('.hero')) return; // skip hero title
    gsap.set(title, { opacity: 0, y: 28 });
    ScrollTrigger.create({
      trigger: title, start: 'top 90%', once: true,
      onEnter: () => gsap.to(title, { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' })
    });
  });

  /* ─────────────────────────────────────
     8. TIMELINE NODES
  ───────────────────────────────────── */
  document.querySelectorAll('.timeline__node').forEach(node => {
    gsap.set(node, { scale: 0, opacity: 0 });
    ScrollTrigger.create({
      trigger: node, start: 'top 88%', once: true,
      onEnter: () => gsap.to(node, {
        scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)'
      })
    });
  });

  /* ─────────────────────────────────────
     9. STAT CARDS
  ───────────────────────────────────── */
  document.querySelectorAll('.stat-card').forEach(card => {
    gsap.set(card, { opacity: 0, y: 24, scale: 0.95 });
    ScrollTrigger.create({
      trigger: card, start: 'top 88%', once: true,
      onEnter: () => gsap.to(card, {
        opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'back.out(1.4)',
        delay: parseFloat(card.style.getPropertyValue('--delay') || '0')
      })
    });
  });

  /* ─────────────────────────────────────
     10. ORNAMENT RING SPIN BURST
  ───────────────────────────────────── */
  const ring = document.querySelector('.ornament-ring');
  if (ring) {
    ScrollTrigger.create({
      trigger: ring, start: 'top 80%', once: true,
      onEnter: () => {
        ring.style.animationDuration = '5s';
        setTimeout(() => { ring.style.animationDuration = '30s'; }, 2200);
      }
    });
  }

  /* ─────────────────────────────────────
     11. GALLERY FILTER + LIGHTBOX
  ───────────────────────────────────── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery__item');

  // Gallery filter
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      galleryItems.forEach(item => {
        const show = filter === 'all' || item.dataset.cat === filter;
        if (show) {
          item.classList.remove('hidden');
          gsap.fromTo(item,
            { opacity: 0, scale: 0.94 },
            { opacity: 1, scale: 1, duration: 0.38, ease: 'power2.out' }
          );
        } else {
          gsap.to(item, {
            opacity: 0, scale: 0.94, duration: 0.28, ease: 'power2.in',
            onComplete: () => item.classList.add('hidden')
          });
        }
      });
    });
  });

  // Lightbox
  const lightbox      = document.getElementById('lightbox');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev  = document.getElementById('lightboxPrev');
  const lightboxNext  = document.getElementById('lightboxNext');
  const lightboxBackdrop   = document.getElementById('lightboxBackdrop');
  const lightboxTitle      = document.getElementById('lightboxTitle');
  const lightboxDesc       = document.getElementById('lightboxDesc');
  const lightboxCat        = document.getElementById('lightboxCat');
  const lightboxCounter    = document.getElementById('lightboxCounter');
  const lightboxPlaceholderText = document.getElementById('lightboxPlaceholderText');

  // Collect visible items (for prev/next)
  let currentIndex = 0;

  function getVisibleItems() {
    return Array.from(galleryItems).filter(i => !i.classList.contains('hidden'));
  }

  function openLightbox(item) {
    const visible = getVisibleItems();
    currentIndex = visible.indexOf(item);

    updateLightboxContent(item, visible.length);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightboxContent(item, total) {
    const visible = getVisibleItems();
    const idx = visible.indexOf(item);
    currentIndex = idx;

    lightboxTitle.textContent      = item.dataset.title   || '';
    lightboxDesc.textContent       = item.dataset.desc    || '';
    lightboxCat.textContent        = item.dataset.cat     ? item.dataset.cat.charAt(0).toUpperCase() + item.dataset.cat.slice(1) : '';
    lightboxCounter.textContent    = `${idx + 1} / ${visible.length}`;
    lightboxPlaceholderText.textContent = item.dataset.title || 'Foto belum tersedia';
  }

  function navigate(dir) {
    const visible = getVisibleItems();
    currentIndex = (currentIndex + dir + visible.length) % visible.length;
    updateLightboxContent(visible[currentIndex], visible.length);
  }

  // Open on click
  galleryItems.forEach(item => {
    item.addEventListener('click', () => openLightbox(item));
  });

  // Close on X or backdrop
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxBackdrop.addEventListener('click', closeLightbox);

  // Prev / Next
  lightboxPrev.addEventListener('click', () => navigate(-1));
  lightboxNext.addEventListener('click', () => navigate(1));

  // Keyboard
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   navigate(-1);
    if (e.key === 'ArrowRight')  navigate(1);
  });

  // Touch swipe
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend',   e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1);
  });

  /* ─────────────────────────────────────
     12. FOOTER REVEAL
  ───────────────────────────────────── */
  const footerCta = document.querySelector('.footer__cta-banner');
  if (footerCta) {
    gsap.set('.footer__cta-text', { opacity: 0, x: -30 });
    gsap.set('.footer__cta-actions', { opacity: 0, x: 30 });
    ScrollTrigger.create({
      trigger: footerCta, start: 'top 88%', once: true,
      onEnter: () => {
        gsap.to('.footer__cta-text',    { opacity: 1, x: 0, duration: 0.65, ease: 'power3.out' });
        gsap.to('.footer__cta-actions', { opacity: 1, x: 0, duration: 0.65, delay: 0.1, ease: 'power3.out' });
      }
    });
  }

  const footerMain = document.querySelector('.footer__main');
  if (footerMain) {
    const footerCols = footerMain.querySelectorAll('.footer__brand, .footer__info, .footer__quick');
    gsap.set(footerCols, { opacity: 0, y: 28 });
    ScrollTrigger.create({
      trigger: footerMain, start: 'top 88%', once: true,
      onEnter: () => gsap.to(footerCols, {
        opacity: 1, y: 0, duration: 0.65, stagger: 0.12, ease: 'power3.out'
      })
    });
  }

}); // end DOMContentLoaded
