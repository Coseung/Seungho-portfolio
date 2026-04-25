/**
 * app.js
 * 회사별 URL 라우팅 + 콘텐츠 동적 주입
 *
 * URL 규칙:
 *   기본 포트폴리오  →  /  또는  /index.html
 *   회사별 페이지    →  /kakao  또는  ?c=kakao  또는  #kakao
 *
 * 회사 설정 파일 위치: data/companies/{slug}.json
 *
 * JSON 스키마 (모든 필드 선택 사항):
 * {
 *   "meta": {
 *     "company": "카카오",         // 탭 타이틀, 배너에 표시
 *     "position": "Backend Engineer"
 *   },
 *   "hero": {
 *     "badge": "카카오 Backend 지원",
 *     "tagline": "커스텀 한 줄 소개"
 *   },
 *   "about": {
 *     "intro": "회사 맞춤 자기소개 (HTML 가능)"
 *   },
 *   "coverLetter": {
 *     "title": "지원 동기",
 *     "body":  "본문 텍스트 (줄바꿈 \\n 지원)"
 *   },
 *   "highlightedProjects": ["creator-flex"]  // project 카드 data-project-id 와 매칭
 * }
 */

// ─── URL에서 회사 slug 추출 ───────────────────────────
function getCompanySlug() {
  // 1순위: 경로명  /kakao  →  'kakao'
  // pathname이 /로 끝나면 slug가 없는 것 (GitHub Pages base path 오인식 방지)
  const { pathname } = window.location;
  if (!pathname.endsWith('/')) {
    const lastSeg = pathname.split('/').filter(Boolean).pop();
    if (lastSeg && lastSeg !== 'index.html' && !lastSeg.includes('.')) {
      return lastSeg;
    }
  }

  // 2순위: 쿼리 파라미터  ?c=kakao
  const qp = new URLSearchParams(window.location.search).get('c');
  if (qp) return qp;

  // 3순위: 해시  #kakao
  const hash = window.location.hash.replace(/^#/, '');
  if (hash) return hash;

  return null;
}

// ─── 회사 JSON 로드 ──────────────────────────────────
async function loadCompanyConfig(slug) {
  try {
    const url = `./data/companies/${slug}.json`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    // 개발 환경(file://)이나 파일 미존재 시 조용히 무시
    console.info(`[portfolio] No config for "${slug}" (${err.message}) — using defaults`);
    return null;
  }
}

// ─── 설정 적용 ───────────────────────────────────────
function applyConfig(config) {
  const { meta = {}, hero = {}, about = {}, coverLetter, highlightedProjects = [] } = config;

  // 탭 타이틀
  if (meta.company) {
    document.title = `최승호 | ${meta.company} ${meta.position ?? '지원'}`;
  }


  // Hero badge
  if (hero.badge) {
    const badge = document.getElementById('hero-badge');
    if (badge) {
      badge.textContent = hero.badge;
      badge.classList.add('company-mode');
    }
  }

  // Hero tagline
  if (hero.tagline) {
    const tagline = document.getElementById('hero-tagline');
    if (tagline) tagline.innerHTML = hero.tagline;
  }

  // About intro
  if (about.intro) {
    const intro = document.getElementById('about-intro');
    if (intro) intro.innerHTML = about.intro;
  }

  // Cover letter 섹션 주입
  if (coverLetter) renderCoverLetter(coverLetter, meta);

  // 프로젝트 하이라이트
  if (highlightedProjects.length) {
    highlightedProjects.forEach(id => {
      const card = document.querySelector(`[data-project-id="${id}"]`);
      if (card) card.classList.add('highlighted');
    });
  }
}

// ─── Cover Letter 섹션 렌더링 ─────────────────────────
function renderCoverLetter({ title, body }, meta = {}) {
  const section = document.getElementById('cover-letter');
  if (!section) return;

  section.querySelector('.cover-company-chip').textContent =
    meta.company ? `${meta.company} 지원` : '지원 동기';
  section.querySelector('.cover-letter-title').textContent = title;
  section.querySelector('.cover-letter-body').innerHTML =
    body.replace(/\n/g, '<br>');

  section.classList.add('visible');

  // 네비게이션에 항목 추가
  const navList = document.querySelector('.nav-links');
  if (navList && !navList.querySelector('[href="#cover-letter"]')) {
    const li = document.createElement('li');
    li.innerHTML = `<a href="#cover-letter">지원동기</a>`;
    // Projects 앞에 삽입
    const projectsLink = navList.querySelector('[href="#projects"]');
    navList.insertBefore(li, projectsLink);
  }
}

// ─── 진입점 ──────────────────────────────────────────
async function init() {
  const slug = getCompanySlug();
  if (!slug) return; // 기본 포트폴리오: 정적 HTML 그대로 표시

  // JSON fetch 전에 먼저 링크 업데이트 (fetch 대기 중 클릭해도 ?c= 유지)
  document.querySelectorAll('.project-detail-link').forEach(a => {
    const url = new URL(a.href, window.location.href);
    url.searchParams.set('c', slug);
    a.href = url.toString();
  });

  const config = await loadCompanyConfig(slug);
  if (config) applyConfig(config);
}

document.addEventListener('DOMContentLoaded', init);
