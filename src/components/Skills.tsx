
export default function Skills() {
  return (
    <section id="skills">
      <div className="section-label reveal">Tech</div>
      <h2 className="section-title reveal">기술 <span>스택</span></h2>
      <div className="skills-grid">
        <div className="glass skill-group reveal">
          <div className="skill-group-label">Backend</div>
          <div className="skill-item">
            <div className="skill-name">Java</div>
            <div className="skill-desc">컬렉션, 스트림, 람다 등을 활용하여 비즈니스 로직을 구현했습니다. 자료구조·알고리즘을 자바 기반으로 학습했습니다.</div>
          </div>
          <div className="skill-item">
            <div className="skill-name">Spring Boot</div>
            <div className="skill-desc">RESTful API 설계·구현, Spring Security 기반 JWT 인증, OAuth 2.0 소셜 로그인, WebSocket + STOMP 실시간 채팅 구현 경험이 있습니다.</div>
          </div>
          <div className="skill-item">
            <div className="skill-name">MySQL</div>
            <div className="skill-desc">서비스 요구사항에 맞는 테이블 직접 설계, MyBatis를 활용한 SQL 직접 작성 경험이 있습니다.</div>
          </div>
          <div className="skill-item">
            <div className="skill-name">Spring Data JPA</div>
            <div className="skill-desc">엔티티 설계, 연관관계 매핑, JPQL 커스텀 쿼리 작성, @Transactional 트랜잭션 처리 경험이 있습니다.</div>
          </div>
        </div>
        <div className="glass skill-group reveal" style={{ transitionDelay: '.1s' }}>
          <div className="skill-group-label">Infra</div>
          <div className="skill-item">
            <div className="skill-name">AWS</div>
            <div className="skill-desc">EC2 서버 배포, RDS 데이터베이스 구축, S3 파일 스토리지 연동, CloudFront CDN, Route 53 도메인 연결. S3 Presigned URL을 활용한 직접 업로드 구조 적용 경험이 있습니다.</div>
          </div>
        </div>
        <div className="glass skill-group reveal" style={{ transitionDelay: '.2s' }}>
          <div className="skill-group-label">Frontend</div>
          <div className="skill-item">
            <div className="skill-name">React</div>
            <div className="skill-desc">React + Vite 기반 프론트엔드 구성, 컴포넌트 단위 UI 설계 및 백엔드 API 연동 경험이 있습니다.</div>
          </div>
          <div className="skill-item">
            <div className="skill-name">HTML / CSS / JS</div>
            <div className="skill-desc">화면 구조 설계, 이벤트 처리, 비동기 통신 구현. Thymeleaf 템플릿 엔진 활용 경험이 있습니다.</div>
          </div>
          <div className="skill-item">
            <div className="skill-name">JSP</div>
            <div className="skill-desc">MVC 패턴 프로젝트에서 JSP로 뷰 레이어 구성, Controller → JSP 데이터 흐름을 이해하고 있습니다.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
