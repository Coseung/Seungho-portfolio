import type { CompanyConfig } from '../hooks/useCompany';

type CoverLetterProps = {
  config: CompanyConfig | null;
};

export default function CoverLetter({ config }: CoverLetterProps) {
  const isVisible = !!config?.coverLetter;

  return (
    <section id="cover-letter" className={isVisible ? 'visible' : ''}>
      <div className="section-label reveal">Cover Letter</div>
      <h2 className="section-title reveal">지원 <span>동기</span></h2>
      <div className="glass cover-letter-card reveal">
        <span className="cover-company-chip">
          {config?.meta?.company ? `${config.meta.company} 지원` : '지원 동기'}
        </span>
        <div className="cover-letter-title">
          {config?.coverLetter?.title ?? ''}
        </div>
        <div
          className="cover-letter-body"
          dangerouslySetInnerHTML={
            config?.coverLetter?.body
              ? { __html: config.coverLetter.body.replace(/\n/g, '<br>') }
              : { __html: '' }
          }
        />
      </div>
    </section>
  );
}
