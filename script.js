/* =========================================================
   Louckmane SAWADOGO — Portfolio
   Interactions : navigation, langue FR/EN, animations au scroll, formulaire
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Année du footer ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Header : ombre au scroll ---------- */
  const header = document.getElementById('header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Menu mobile ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');

  const closeNav = () => {
    mainNav.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  /* ---------- Bascule de langue FR / EN / TR ---------- */
  const LANGS = ['fr', 'en', 'tr'];
  const langButtons = document.querySelectorAll('.lang-btn');
  const html = document.documentElement;

  function applyLang(lang) {
    if (!LANGS.includes(lang)) lang = 'fr';

    html.setAttribute('lang', lang);
    html.setAttribute('data-lang', lang);

    LANGS.forEach(l => {
      document.querySelectorAll(`[data-lang="${l}"]`).forEach(el => {
        el.hidden = lang !== l;
      });
    });

    langButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.setLang === lang);
    });

    localStorage.setItem('ls-portfolio-lang', lang);
  }

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.setLang));
  });

  const savedLang = localStorage.getItem('ls-portfolio-lang');
  applyLang(LANGS.includes(savedLang) ? savedLang : 'fr');

  /* ---------- Animation au scroll (fade-in) ---------- */
  const revealItems = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('in-view'));
  }

  /* ---------- Formulaire de contact (mailto) ---------- */
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    const body = `Nom / Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailtoLink = `mailto:louckmanesawadogo858@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  });

});
