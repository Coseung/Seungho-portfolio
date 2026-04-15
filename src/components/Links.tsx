
export default function Links() {
  return (
    <section id="links">
      <div className="section-label reveal">Links</div>
      <h2 className="section-title reveal">GitHub &amp; <span>Tech Blog</span></h2>
      <div className="links-grid">
        {/* GitHub Card */}
        <a href="https://github.com/Coseung" target="_blank" rel="noreferrer" className="link-card-og reveal">
          <div className="og-content">
            <div className="og-title">Coseung - Overview</div>
            <div className="og-desc">Coseung has 19 repositories available. Follow their code on GitHub.</div>
            <div className="og-meta">
              <svg className="og-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span className="og-url">github.com/Coseung</span>
            </div>
          </div>
          <div className="og-image">
            <img src="/assets/img/인형노트북.png" alt="GitHub" />
          </div>
        </a>

        {/* Velog Card */}
        <a
          href="https://velog.io/@dreamdp01/posts"
          target="_blank"
          rel="noreferrer"
          className="link-card-og reveal"
          style={{ transitionDelay: '.1s' }}
        >
          <div className="og-content">
            <div className="og-title">dreamdp01 (승호) / 작성글 - velog</div>
            <div className="og-desc">dreamdp01님이 작성한 포스트 시리즈들을 확인해보세요.</div>
            <div className="og-meta">
              <svg className="og-icon" width="16" height="16" viewBox="0 0 24 24" fill="#20c997">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-4v-2h4v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
              </svg>
              <span className="og-url">velog.io/@dreamdp01</span>
            </div>
          </div>
          <div className="og-image">
            <img src="/assets/img/포키노트북.png" alt="Velog" />
          </div>
        </a>
      </div>
    </section>
  );
}
