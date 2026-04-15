import { useEffect } from 'react';
import './index.css';
import '../css/style.css';
import { useCompany } from './hooks/useCompany';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import CoverLetter from './components/CoverLetter';
import Projects from './components/Projects';
import Links from './components/Links';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Growth from './components/Growth';
import Contact from './components/Contact';

function App() {
  const { config } = useCompany();

  // 스크롤 reveal 애니메이션
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    const observe = () => {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
        .forEach(el => observer.observe(el));
    };

    observe();
    const timer = setTimeout(observe, 100);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [config]);

  // 프로젝트 카드 stagger
  useEffect(() => {
    document.querySelectorAll('.project-card').forEach((card, i) => {
      (card as HTMLElement).style.transitionDelay = `${i * 0.08}s`;
    });
  }, []);

  // 회사 배너 및 타이틀 설정
  useEffect(() => {
    if (!config?.meta?.company) return;
    document.title = `최승호 | ${config.meta.company} ${config.meta.position ?? '지원'}`;
    const hero = document.getElementById('hero');
    if (hero) hero.style.paddingTop = '108px';
  }, [config]);

  const bannerText = config?.meta?.company
    ? `${config.meta.company}${config.meta.position ? ` · ${config.meta.position}` : ''} 지원용 포트폴리오입니다`
    : '';

  return (
    <>
      <div className="gradient-bg"></div>

      <div
        id="company-banner"
        className={`company-banner${bannerText ? ' visible' : ''}`}
      >
        {bannerText}
      </div>

      <Nav hasCoverLetter={!!config?.coverLetter} />

      <main>
        <Hero config={config} />
        <About config={config} />
        <CoverLetter config={config} />
        <Projects config={config} />
        <Links />
        <Skills />
        <Experience />
        <Education />
        <Growth />
        <Contact />
      </main>

      <footer>
        <p>© 2026 <span>최승호</span> · Backend Developer</p>
      </footer>
    </>
  );
}

export default App;
