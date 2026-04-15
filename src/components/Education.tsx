
export default function Education() {
  return (
    <section id="education">
      <div className="section-label reveal">Background</div>
      <h2 className="section-title reveal">학력 &amp; <span>자격증</span></h2>
      <div className="edu-grid">
        <div className="glass edu-card reveal-left">
          <div className="edu-card-label">Education</div>
          <div className="edu-item">
            <div className="edu-name">성결대학교</div>
            <div className="edu-sub">미디어소프트웨어학과</div>
            <div className="edu-meta">2020.03 – 2026.02 · GPA 3.8 / 4.5</div>
          </div>
          <div className="edu-item">
            <div className="edu-name">용호고등학교</div>
            <div className="edu-sub">이과계열</div>
            <div className="edu-meta">2017.03 – 2020.02</div>
          </div>
        </div>
        <div className="glass edu-card reveal-right">
          <div className="edu-card-label">Certificate &amp; Award</div>
          <div className="cert-item">
            <div className="cert-name">정보처리기사 필기</div>
            <div className="cert-org">한국산업인력공단</div>
            <div><span className="cert-date">2025.08</span></div>
          </div>
          <div className="cert-item">
            <div className="cert-name">소프트웨어 창의적문제해결프로젝트 (장려상)</div>
            <div className="cert-org">성결대학교</div>
            <div><span className="cert-date">2025.11</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
