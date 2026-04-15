import { useState, useEffect } from 'react';

export type CompanyConfig = {
  meta?: { company?: string; position?: string };
  hero?: { badge?: string; tagline?: string };
  about?: { intro?: string };
  coverLetter?: { title?: string; body?: string };
  highlightedProjects?: string[];
};

export function useCompany() {
  const [config, setConfig] = useState<CompanyConfig | null>(null);
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    function getSlug() {
      const segments = window.location.pathname.split('/').filter(Boolean);
      const last = segments[segments.length - 1];
      if (last && last !== 'index.html' && !last.includes('.')) return last;
      const qp = new URLSearchParams(window.location.search).get('c');
      if (qp) return qp;
      const hash = window.location.hash.replace(/^#/, '');
      if (hash) return hash;
      return null;
    }

    const s = getSlug();
    setSlug(s);
    if (!s) return;

    fetch(`/data/companies/${s}.json`)
      .then(r => r.ok ? r.json() : null)
      .catch(() => null)
      .then(data => setConfig(data));
  }, []);

  return { config, slug };
}
