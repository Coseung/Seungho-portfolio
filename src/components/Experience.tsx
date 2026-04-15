
export default function Experience() {
  return (
    <section id="experience">
      <div className="section-label reveal">Experience</div>
      <h2 className="section-title reveal">교육 <span>경험</span></h2>
      <div className="glass exp-card reveal">
        <div className="exp-grid">
          <div>
            <div className="exp-period">2025.07 – 2026.03</div>
            <div className="exp-org">KH 정보교육원</div>
            <div className="exp-role">AWS 클라우드 기반<br />DevOps 개발자 양성 과정</div>
          </div>
          <div>
            <div className="exp-detail-title">주요 내용</div>
            <ul className="exp-list">
              <li>웹 개발에 대한 기본 지식과 활용법 학습</li>
              <li>2번의 팀 프로젝트를 통한 협업 경험 (6인)</li>
              <li>사용 기술: Java, Spring Boot, JSP, React</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
