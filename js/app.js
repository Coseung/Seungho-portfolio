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
  const segments = window.location.pathname.split('/').filter(Boolean);
  const lastSeg = segments[segments.length - 1];
  if (lastSeg && lastSeg !== 'index.html' && !lastSeg.includes('.')) {
    return lastSeg;
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
    // 상대 경로: 어느 depth에서도 data/companies/ 를 찾을 수 있도록
    const base = window.location.pathname.endsWith('/')
      ? window.location.pathname
      : window.location.pathname.replace(/\/[^/]*$/, '/');
    // 루트 기준으로 절대 경로 구성
    const url = `/data/companies/${slug}.json`;

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

  // 회사 배너
  if (meta.company) {
    const banner = document.getElementById('company-banner');
    if (banner) {
      banner.textContent = `${meta.company}${meta.position ? ` · ${meta.position}` : ''} 지원용 포트폴리오입니다`;
      banner.classList.add('visible');
      // 배너 높이만큼 첫 섹션 padding 조정
      document.querySelector('#hero').style.paddingTop = '108px';
    }
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

  const config = await loadCompanyConfig(slug);
  if (config) applyConfig(config);
}

document.addEventListener('DOMContentLoaded', init);
