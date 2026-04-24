(function () {
  'use strict';

  const lb    = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  if (!lb || !lbImg) return;

  function open(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || '';
    lb.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.style.display = 'none';
    // Restore overflow — slider-page class keeps body scroll locked, others don't
    if (!document.body.classList.contains('slider-page')) {
      document.body.style.overflow = '';
    }
  }

  document.querySelectorAll('.zoomable').forEach(img => {
    img.addEventListener('click', () => open(img.src, img.alt));
  });

  lb.addEventListener('click', close);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lb.style.display === 'flex') close();
  });
})();
