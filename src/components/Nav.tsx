import { useEffect } from 'react';

type NavProps = {
  hasCoverLetter: boolean;
};

export default function Nav({ hasCoverLetter }: NavProps) {
  useEffect(() => {
    const nav = document.querySelector('nav');
    if (!nav) return;

    const handleScroll = () => {
      nav.style.background = window.scrollY > 80
        ? 'rgba(7,7,15,0.92)'
        : 'rgba(7,7,15,0.7)';
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          const isActive = link.getAttribute('href') === '#' + entry.target.id;
          link.classList.toggle('active', isActive);
        });
      });
    }, { threshold: 0.4 });

    sections.forEach(s => sectionObserver.observe(s));
    return () => sectionObserver.disconnect();
  }, [hasCoverLetter]);

  return (
    <nav>
      <span className="nav-logo">CHOI SEUNGHO</span>
      <ul className="nav-links">
        <li><a href="#hero">About</a></li>
        {hasCoverLetter && <li><a href="#cover-letter">지원동기</a></li>}
        <li><a href="#projects">Projects</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#education">Education</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <a href="#contact" className="nav-contact-btn">Contact</a>
    </nav>
  );
}
