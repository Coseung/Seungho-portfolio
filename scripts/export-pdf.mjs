import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT = path.resolve(__dirname, '../portfolio-최승호.pdf');

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

// 1920px 기준 렌더링 (데스크톱)
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

console.log('페이지 로딩 중...');
await page.goto('http://localhost:5173', {
  waitUntil: 'networkidle0',
  timeout: 30000,
});

// 애니메이션 완료 대기
await new Promise(r => setTimeout(r, 2000));

// 전체 페이지 높이 측정
const pageHeight = await page.evaluate(() => document.body.scrollHeight);

// 스크롤하며 reveal 애니메이션 트리거
await page.evaluate(async () => {
  await new Promise(resolve => {
    let scrolled = 0;
    const step = 300;
    const timer = setInterval(() => {
      window.scrollBy(0, step);
      scrolled += step;
      if (scrolled >= document.body.scrollHeight) {
        window.scrollTo(0, 0);
        clearInterval(timer);
        setTimeout(resolve, 800);
      }
    }, 80);
  });
});

// reveal 클래스 강제 적용 (숨겨진 요소 없애기)
await page.evaluate(() => {
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    .forEach(el => el.classList.add('visible'));
  // sparkles canvas 숨기기 (PDF에서 빈 박스로 나옴)
  document.querySelectorAll('canvas').forEach(c => c.style.display = 'none');
  // 스크롤 인디케이터 숨기기
  const si = document.querySelector('.scroll-indicator');
  if (si) si.style.display = 'none';
});

await new Promise(r => setTimeout(r, 500));

console.log(`전체 높이: ${pageHeight}px → PDF 생성 중...`);

await page.pdf({
  path: OUTPUT,
  width: '1440px',
  height: `${pageHeight + 40}px`,
  printBackground: true,   // 배경색·이미지 포함
  pageRanges: '1',
});

await browser.close();
console.log(`✓ 저장 완료: ${OUTPUT}`);
