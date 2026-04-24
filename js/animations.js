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


// ─── Stagger project cards ────────────────────────────
function initProjectStagger() {
  document.querySelectorAll('.project-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
  });
}

// ─── Hero Sparkles (Canvas) ──────────────────────────
function initSparkles() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;';
  hero.style.position = 'relative';
  hero.style.overflow = 'hidden';
  hero.insertBefore(canvas, hero.firstChild);

  const ctx = canvas.getContext('2d');
  const COLOR = '180, 200, 255';
  const DENSITY = 80;

  let particles = [];

  function resize() {
    canvas.width  = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }

  function createParticle() {
    return {
      x:       Math.random() * canvas.width,
      y:       Math.random() * canvas.height,
      r:       Math.random() * 0.8 + 0.4,
      alpha:   Math.random(),
      da:      (Math.random() * 0.008 + 0.003) * (Math.random() < 0.5 ? 1 : -1),
      vx:      (Math.random() - 0.5) * 0.25,
      vy:      (Math.random() - 0.5) * 0.25,
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: DENSITY }, createParticle);
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.alpha += p.da;
      if (p.alpha <= 0 || p.alpha >= 1) p.da *= -1;
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width)  p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${COLOR},${Math.max(0, Math.min(1, p.alpha))})`;
      ctx.fill();
    });
    requestAnimationFrame(tick);
  }

  window.addEventListener('resize', () => {
    resize();
    particles = Array.from({ length: DENSITY }, createParticle);
  }, { passive: true });

  init();
  tick();
}

// ─── Animated Underline ───────────────────────────────
function initAnimatedUnderline() {
  const el = document.querySelector('.underline-text-wrap');
  if (!el) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        el.classList.add('underline-visible');
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.8 });
  observer.observe(el);
}

// ─── TOC Nav highlight ───────────────────────────────
function initTocNav() {
  const tocNav = document.getElementById('toc-nav');
  if (!tocNav) return;

  // cover-letter TOC 항목은 섹션이 보일 때만 표시
  const coverLetterSection = document.getElementById('cover-letter');
  const coverLetterItem = tocNav.querySelector('.toc-cover-letter');
  if (coverLetterSection && coverLetterItem) {
    const syncVisibility = () => {
      coverLetterItem.style.display = coverLetterSection.classList.contains('visible') ? '' : 'none';
    };
    syncVisibility();
    new MutationObserver(syncVisibility).observe(coverLetterSection, { attributes: true, attributeFilter: ['class'] });
  }

  const tocLinks = tocNav.querySelectorAll('.toc-item');
  const sections = document.querySelectorAll('section[id]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      tocLinks.forEach(link => {
        link.classList.toggle('toc-active', link.getAttribute('href') === '#' + entry.target.id);
      });
    });
  }, { threshold: 0, rootMargin: '-10% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
}

// ─── Init all ────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initSparkles();
  initScrollReveal();
  initAnimatedUnderline();
  initCounters();
  initProjectStagger();
  initTocNav();
});
