/**
 * animations.js
 * 스크롤 페이드인, 카운터 애니메이션, 네비게이션 효과
 */

// ─── Scroll Reveal ───────────────────────────────────────
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    .forEach(el => observer.observe(el));
}

// ─── Counter Animation ────────────────────────────────
function animateValue(el, target, suffix, isFloat = false) {
  let start = null;
  const duration = 1800;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = eased * target;
    el.textContent = isFloat ? value.toFixed(1) : Math.floor(value) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function initCounters() {
  const statsSection = document.querySelector('.hero-stats');
  if (!statsSection) return;

  const counters = [
    { suffix: '만',  target: 11,  float: false },
    { suffix: '',    target: 3,   float: false },
    { suffix: '%',   target: 80,  float: false },
    { suffix: '',    target: 3.8, float: true  },
  ];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const nums = entry.target.querySelectorAll('.hero-stat-num');
      nums.forEach((el, i) => {
        const c = counters[i];
        if (c) animateValue(el, c.target, c.suffix, c.float);
      });
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.5 });

  observer.observe(statsSection);
}

// ─── Nav: scroll opacity + active section highlight ──
function initNav() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  // Scroll opacity
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 80
      ? 'rgba(7,7,15,0.92)'
      : 'rgba(7,7,15,0.7)';
  }, { passive: true });

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === '#' + entry.target.id;
        link.classList.toggle('active', isActive);
      });
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));
}

// ─── Stagger project cards ────────────────────────────
function initProjectStagger() {
  document.querySelectorAll('.project-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
  });
}

// ─── Init all ────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initCounters();
  initNav();
  initProjectStagger();
});
