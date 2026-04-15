import type { CompanyConfig } from '../hooks/useCompany';
import { AnimatedText } from './ui/animated-underline-text-one';

type AboutProps = {
  config: CompanyConfig | null;
};

export default function About({ config }: AboutProps) {
  return (
    <section id="about">
      <div className="section-label reveal">About Me</div>
      <h2 className="section-title reveal">
        저는 이런{' '}
        <AnimatedText
          text="개발자"
          textClassName="text-[#2F2FE4]"
          underlineClassName="text-[#2F2FE4]"
          underlineDuration={1.8}
        />
        입니다
      </h2>

      <div className="about-grid">
        <div className="about-body reveal-left">
          {config?.about?.intro ? (
            <div id="about-intro" dangerouslySetInnerHTML={{ __html: config.about.intro }} />
          ) : (
            <>
              <p className="about-para">
                사용자가 반복적으로 겪는 불편함을 문제로 정의하고, 이를 해결하는 프로그램을 직접 개발해{' '}
                <span className="about-hl">11만 조회수</span>를 기록했으며,
                실제 사용자 <span className="about-hl">판매 경험</span>까지 이어졌습니다.
              </p>
              <p className="about-para">
                문제를 단순히 구현으로 끝내지 않고, 운영 과정에서 발생하는 이슈와 피드백을 개선하며{' '}
                <strong>사용되는 서비스로 완성하는 과정</strong>을 중요하게 생각합니다.
              </p>
              <ul className="about-traits">
                <li><span>문제를 마주하면 원인을 파악하고 <strong>해결하는 과정 자체</strong>를 중요하게 생각합니다</span></li>
                <li><span>새로 학습한 내용은 <strong>기록으로 남기며</strong>, 다시 꺼내 쓸 수 있도록 정리합니다</span></li>
                <li><span>부족함을 인지하고 <strong>하나씩 채워가는 과정</strong>에서 가장 큰 성장을 느낍니다</span></li>
              </ul>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
