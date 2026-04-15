import { SparklesCore } from './ui/sparkles';
import type { CompanyConfig } from '../hooks/useCompany';

type HeroProps = {
  config: CompanyConfig | null;
};

export default function Hero({ config }: HeroProps) {
  const badge = config?.hero?.badge ?? 'Backend Developer';
  const tagline = config?.hero?.tagline ?? null;

  return (
    <section id="hero" style={{ position: 'relative', overflow: 'hidden' }}>

      {/* Sparkles — hero 전체 배경 */}
      <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <SparklesCore
          id="hero-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={60}
          className="w-full h-full"
          particleColor="#7B9EFF"
          speed={1}
        />
      </div>

      {/* 콘텐츠 — sparkles 위 */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-layout">
          {/* 왼쪽: 프로필 사진 */}
          <div className="profile-frame reveal-left">
            <img
              src="/assets/img/민증+정장.jpg"
              alt="최승호 프로필사진"
              className="profile-img"
            />
          </div>

          {/* 오른쪽: 이름 + 소개 */}
          <div className="hero-text-col">
            <div
              id="hero-badge"
              className={`hero-badge reveal${config?.hero?.badge ? ' company-mode' : ''}`}
            >
              {badge}
            </div>

            <h1 className="hero-name reveal" style={{ transitionDelay: '.08s' }}>
              최승호
            </h1>

            {tagline ? (
              <p
                id="hero-tagline"
                className="hero-sub reveal"
                style={{ transitionDelay: '.14s' }}
                dangerouslySetInnerHTML={{ __html: tagline }}
              />
            ) : (
              <p
                id="hero-tagline"
                className="hero-sub reveal"
                style={{ transitionDelay: '.14s' }}
              >
                문제를 해결하는 과정이 <strong>실제 사용과 결과로 이어질 때</strong><br />
                가장 큰 보람을 느끼는 신입 개발자입니다.
              </p>
            )}
          </div>
        </div>

        <div className="scroll-indicator">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
          SCROLL
        </div>
      </div>
    </section>
  );
}
