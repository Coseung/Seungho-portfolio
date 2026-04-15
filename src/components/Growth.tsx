const growthCards = [
  {
    num: "01",
    title: "Spring Framework에 대해서",
    desc: "Spring의 핵심 개념과 IoC, DI, AOP를 중심으로 프레임워크 동작 원리를 정리했습니다.",
    href: "https://velog.io/@dreamdp01/Spring-Framework%EC%97%90-%EB%8C%80%ED%95%B4%EC%84%9C",
    image: "https://velog.velcdn.com/images/dreamdp01/post/16ff65f4-6a29-428a-8b07-30cac82ee79c/image.png",
  },
  {
    num: "02",
    title: "의존성 주입을 하는 이유",
    desc: "DI(Dependency Injection)가 왜 필요한지, 어떤 방식으로 적용하는지 학습한 내용을 기록했습니다.",
    href: "https://velog.io/@dreamdp01/%EC%9D%98%EC%A1%B4%EC%84%B1-%EC%A3%BC%EC%9E%85%EC%9D%84-%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0",
    image: "https://velog.velcdn.com/images/dreamdp01/post/a7027ab3-48f2-4a9f-8f52-d0d056178773/image.png",
  },
  {
    num: "03",
    title: "JVM에 대하여",
    desc: "JVM의 구조와 클래스 로딩, 실행 엔진, 런타임 데이터 영역의 동작 원리를 정리했습니다.",
    href: "https://velog.io/@dreamdp01/JVM%EC%97%90-%EB%8C%80%ED%95%B4%EC%84%9C",
    image: "https://velog.velcdn.com/images/dreamdp01/post/8c61932a-371f-4785-bb61-73b6d5ba5f14/image.png",
  },
  {
    num: "04",
    title: "GC (Garbage Collection) 알아가기",
    desc: "GC의 동작 원리, 다양한 GC 알고리즘과 메모리 누수 방지 전략에 대해 탐구했습니다.",
    href: "https://velog.io/@dreamdp01/GCGarbage-Collection-%EC%95%8C%EC%95%84%EA%B0%80%EA%B8%B0",
    image: "https://velog.velcdn.com/images/dreamdp01/post/08c37525-9626-4947-9c19-79e3dca68989/image.png",
  },
  {
    num: "05",
    title: "LinkedList가 삽입이 빠르다? 테스트했는데 ArrayList가 더 빠르던데요?",
    desc: "LinkedList가 삽입이 빠르다고 알려져 있지만, 실제 벤치마크 결과가 달랐던 이유를 분석했습니다.",
    href: "https://velog.io/@dreamdp01/LinkedList%EA%B0%80-%EC%82%BD%EC%9E%85%EC%9D%B4-%EB%B9%A0%EB%A5%B4%EB%8B%A4-%ED%85%8C%EC%8A%A4%ED%8A%B8%ED%96%88%EB%8A%94%EB%8D%B0-ArrayList%EA%B0%80-%EB%8D%94-%EB%B9%A0%EB%A5%B4%EB%8D%98%EB%8D%B0%EC%9A%94",
    image: "https://velog.velcdn.com/images/dreamdp01/post/e89bf9bc-a19b-4d55-9868-6f08641940e5/image.png",
  },
];



export default function Growth() {
  return (
    <section id="growth">
      <div className="section-label reveal">Blog</div>
      <h2 className="section-title reveal">성장 <span>기록</span></h2>

      <div className="blog-card-grid">
        {growthCards.map((card, i) => (
          <a
            key={card.num}
            href={card.href}
            target="_blank"
            rel="noreferrer"
            className="blog-card reveal"
            style={{ transitionDelay: `${i * 0.07}s` }}
          >
            {/* 커버 이미지 */}
            <div className="blog-card-img-wrap">
              <img src={card.image} alt={card.title} className="blog-card-img" />
              <div className="blog-card-img-overlay" />
            </div>

            {/* 바디 */}
            <div className="blog-card-body">
              <p className="blog-card-title">{card.title}</p>
              <p className="blog-card-desc">{card.desc}</p>
              <span className="blog-card-arrow">읽기 →</span>
            </div>
          </a>
        ))}

        {/* 전체 보기 CTA */}
        <a
          href="https://velog.io/@dreamdp01/posts"
          target="_blank"
          rel="noreferrer"
          className="blog-card blog-card-cta reveal"
          style={{ transitionDelay: `${growthCards.length * 0.07}s` }}
        >
          <div className="blog-card-cta-inner">
            <span className="blog-card-cta-arrow">→</span>
            <p className="blog-card-cta-label">전체 포스트 보기</p>
            <p className="blog-card-cta-sub">velog.io/@dreamdp01</p>
          </div>
        </a>
      </div>
    </section>
  );
}
