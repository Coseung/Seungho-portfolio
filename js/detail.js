(function () {
  const slug = new URLSearchParams(window.location.search).get('c');
  if (!slug) return;

  // 뒤로가기 링크에 ?c=slug 추가하여 회사 컨텍스트 복원
  const backLink = document.querySelector('.nav-back');
  if (backLink) backLink.href = `../index.html?c=${slug}`;
})();
