
export default function Contact() {
  return (
    <section id="contact">
      <div className="section-label reveal">Contact</div>
      <h2 className="section-title reveal"></h2>
      <div className="contact-card reveal">
        <p className="contact-desc">
          끝까지 읽어주셔서 감사합니다.<br />
          언제든지 연락 주시면 빠르게 답변드리겠습니다.
        </p>
        <div className="contact-items">
          <div className="contact-item">
            <div className="contact-label">Phone</div>
            <div className="contact-value">010-6534-9903</div>
          </div>
          <div className="contact-item">
            <div className="contact-label">Email</div>
            <div className="contact-value">
              <a href="mailto:dreamdpsh@gmail.com">dreamdpsh@gmail.com</a>
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-label">GitHub</div>
            <div className="contact-value">
              <a href="https://github.com/Coseung" target="_blank" rel="noreferrer">github.com/Coseung</a>
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-label">Tech Blog</div>
            <div className="contact-value">
              <a href="https://velog.io/@dreamdp01/posts" target="_blank" rel="noreferrer">velog.io/@dreamdp01</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
