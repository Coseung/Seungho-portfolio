import type { CompanyConfig } from '../hooks/useCompany';

type ProjectsProps = {
  config: CompanyConfig | null;
};

export default function Projects({ config }: ProjectsProps) {
  const highlighted = config?.highlightedProjects ?? [];

  return (
    <section id="projects">
      <div className="section-label reveal">Work</div>
      <h2 className="section-title reveal">프로젝트 <span>경험</span></h2>

      <div className="projects-grid">

        {/* Creator-Flex */}
        <div
          className={`project-card reveal${highlighted.includes('creator-flex') ? ' highlighted' : ''}`}
          data-project-id="creator-flex"
        >
          <div className="project-header">
            <div className="project-header-left">
              <img src="/assets/img/MCNHR.png" alt="MCN HR" className="project-icon" />
              <div>
                <div className="project-name">Creator-Flex</div>
                <div className="project-desc">MCN HR SaaS 플랫폼 · 팀장 (6인)</div>
              </div>
            </div>
            <span className="project-date">2026.01 – 2026.02</span>
          </div>
          <p className="project-service">크리에이터 소속사 MCN의 직원과 크리에이터를 통합 관리하는 HR SaaS 플랫폼</p>
          <p className="tech-list">Java 17 · Spring Boot 3 · Spring Data JPA · MySQL · Redis · AWS S3 · React 18 · Vite</p>
          <div className="achievements-title">핵심 성과</div>
          <ul className="achievement-list">
            <li><span><strong>WebSocket + STOMP</strong> 프로토콜을 활용하여 사내 협업을 위한 1:1 및 단체 실시간 채팅 기능 구현</span></li>
            <li><span>채팅 브로드캐스트 시 중복 렌더링 문제를 <strong>clientUuid</strong> 식별자 도입으로 필터링하여 불필요한 클라이언트 렌더링 부하 방지</span></li>
            <li><span>마지막 메시지 ID 기준 페이징 도입으로 채팅 응답 시간 <strong>70ms → 14ms, 약 80% 단축</strong></span></li>
            <li><span><strong>JWT Access Token</strong> 검증 로직 구현 – 관리자/매니저/크리에이터 직급별 접근 권한 제어</span></li>
            <li><span>전사·개인 스케줄 및 인사 정보를 처리하는 <strong>RESTful API 설계 및 구현</strong></span></li>
          </ul>
        </div>

        {/* Threads 자동화 */}
        <div
          className={`project-card reveal${highlighted.includes('threads') ? ' highlighted' : ''}`}
          data-project-id="threads"
        >
          <div className="project-header">
            <div className="project-header-left">
              <img src="/assets/img/threadimage.png" alt="Threads" className="project-icon" />
              <div>
                <div className="project-name">스레드 자동화 프로그램</div>
                <div className="project-desc">SNS 자동화 툴 · 개인 제작 · 판매</div>
              </div>
            </div>
            <span className="project-date">2025.05 – 유지보수 진행중</span>
          </div>
          <p className="project-service">팔로우 증가를 위해 하루 수십 차례 반복되던 좋아요·리포스트·댓글·팔로우 작업을 자동화한 Python 프로그램</p>
          <p className="tech-list">Python · Selenium</p>
          <div className="achievements-title">핵심 성과</div>
          <ul className="achievement-list">
            <li><span>유튜브 영상으로 <strong>11만 조회수</strong> 달성, 실제 사용자 판매 경험으로 연결</span></li>
            <li><span>기계적 댓글 패턴 피드백을 수용해 <strong>무작위 조합 + 난수화 간격 로직</strong> 도입으로 안정성 확보</span></li>
            <li><span><strong>실시간 로그 모니터링 시스템</strong>과 JSON 기반 설정값 자동 저장 기능 구현 – 운영 효율 극대화</span></li>
            <li><span>고객 니즈를 기술로 구현해 <strong>실제 비즈니스 수익</strong>과 서비스 성장으로 연결</span></li>
          </ul>
        </div>

        {/* MediTag */}
        <div
          className={`project-card reveal${highlighted.includes('meditag') ? ' highlighted' : ''}`}
          data-project-id="meditag"
        >
          <div className="project-header">
            <div className="project-header-left">
              <img src="/assets/img/meditageImage.png" alt="MediTag" className="project-icon" />
              <div>
                <div className="project-name">메디태그</div>
                <div className="project-desc">NFC 기반 시각장애인 복약관리 앱 · 백엔드 &amp; 인프라</div>
              </div>
            </div>
            <span className="project-date">2024.07 – 2025.10</span>
          </div>
          <p className="project-service">시각장애인이 시간대별 복용해야 할 약의 종류를 혼동하는 문제를 해결하기 위한 NFC 기반 복약관리 프로그램 (5인)</p>
          <p className="tech-list">Spring Boot · Java · Flutter · AWS EC2 · AWS RDS · AWS S3 · Redis</p>
          <div className="achievements-title">핵심 성과</div>
          <ul className="achievement-list">
            <li><span>S3 <strong>Presigned URL</strong> 도입으로 서버 파일 처리 부하 <strong>100% → 0%</strong> 전환, 네트워크 I/O <strong>50% 감소</strong></span></li>
            <li><span>EC2 타임존 설정 오류 수정으로 알림 발송 <strong>9시간 지연 → 0초</strong> 정상화</span></li>
            <li><span><strong>SMS API</strong> 연동 – 복약 완료 시 보호자에게 즉시 문자 전송 기능 구현</span></li>
            <li><span>AWS EC2 기반 서버 배포로 실제 운영 환경에서 서비스 기능 검증</span></li>
          </ul>
        </div>

      </div>
    </section>
  );
}
