(function () {
  'use strict';

  /* ── Constants ──────────────────────────────────────────────── */
  const TRACK_PADDING = 50;
  const GAP           = 20;

  /* ── DOM refs ──────────────────────────────────────────────── */
  const outer      = document.querySelector('.slider-outer');
  const track      = document.querySelector('.slider-track');
  const prevBtn    = document.querySelector('.slider-btn.slider-prev');
  const nextBtn    = document.querySelector('.slider-btn.slider-next');
  const pagination = document.querySelector('.slider-pagination');
  const counter    = document.querySelector('.slider-counter');

  if (!outer || !track) return;

  const slides = Array.from(track.querySelectorAll('.slider-slide'));
  if (!slides.length) return;

  let current = 0;
  let slideW  = 0;

  /* ── Build pagination dots ─────────────────────────────────── */
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'slider-dot';
    dot.setAttribute('aria-label', `${i + 1}번째 페이지`);
    dot.addEventListener('click', () => goTo(i));
    pagination.appendChild(dot);
  });

  /* ── Dimensions ────────────────────────────────────────────── */
  function setDimensions() {
    const W = outer.clientWidth;
    slideW = W - TRACK_PADDING * 2;

    slides.forEach(s => {
      s.style.width    = slideW + 'px';
      s.style.minWidth = slideW + 'px';
    });

    track.style.paddingLeft = TRACK_PADDING + 'px';
    track.style.gap         = GAP + 'px';

    const saved = track.style.transition;
    track.style.transition = 'none';
    applyTransform();

    requestAnimationFrame(() => { track.style.transition = saved; });
  }

  function applyTransform() {
    track.style.transform = `translateX(${-(current * (slideW + GAP))}px)`;
  }

  /* ── Navigation ────────────────────────────────────────────── */
  function goTo(index) {
    if (index < 0 || index >= slides.length) return;

    slides[current].classList.remove('is-active');
    current = index;
    slides[current].classList.add('is-active');

    // Reset scroll position of the new slide's inner
    const inner = slides[current].querySelector('.slide-inner');
    if (inner) inner.scrollTop = 0;

    applyTransform();
    updateUI();
  }

  function updateUI() {
    document.querySelectorAll('.slider-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });

    if (counter) {
      const pad = n => String(n).padStart(2, '0');
      counter.textContent = `${pad(current + 1)} / ${pad(slides.length)}`;
    }

    if (prevBtn) prevBtn.disabled = current === 0;
    if (nextBtn) nextBtn.disabled = current === slides.length - 1;
  }

  /* ── Keyboard ──────────────────────────────────────────────── */
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo(current + 1);
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   goTo(current - 1);
  });

  /* ── Buttons ───────────────────────────────────────────────── */
  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

  /* ── Touch swipe ───────────────────────────────────────────── */
  let touchStartX = 0;
  let touchStartY = 0;

  track.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 44) {
      goTo(dx < 0 ? current + 1 : current - 1);
    }
  }, { passive: true });

  /* ── Mouse drag ────────────────────────────────────────────── */
  let isDragging = false;
  let dragStartX = 0;
  let dragDeltaX = 0;

  track.addEventListener('mousedown', e => {
    isDragging = true;
    dragStartX = e.clientX;
    dragDeltaX = 0;
    track.classList.add('is-dragging');
    e.preventDefault();
  });

  document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    dragDeltaX = e.clientX - dragStartX;
    track.style.transform = `translateX(${-(current * (slideW + GAP)) + dragDeltaX}px)`;
  });

  document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    track.classList.remove('is-dragging');
    if (Math.abs(dragDeltaX) > 60) {
      goTo(dragDeltaX < 0 ? current + 1 : current - 1);
    } else {
      applyTransform();
    }
  });

  /* ── Resize ────────────────────────────────────────────────── */
  window.addEventListener('resize', setDimensions);

  /* ── Disable scroll-reveal (slide transition is the motion) ── */
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    el.classList.add('visible');
  });

  /* ── Init ──────────────────────────────────────────────────── */
  document.body.classList.add('slider-page');
  slides[0].classList.add('is-active');
  setDimensions();
  updateUI();

  requestAnimationFrame(() => outer.classList.add('js-ready'));
})();
