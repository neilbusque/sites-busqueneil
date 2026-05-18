(function () {
  'use strict';

  // Scroll reveal — fade in sections as they enter the viewport.
  const revealTargets = document.querySelectorAll(
    'section.section, .hero__inner, .card, .process-step, .example, .risk-card, .pricing-card, .quote-form'
  );

  revealTargets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
  );

  revealTargets.forEach(el => observer.observe(el));

  // Auto-close other FAQ items when one opens.
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach(other => {
          if (other !== item) other.open = false;
        });
      }
    });
  });

  // Smooth-scroll polyfill safety for anchor links (CSS handles modern browsers).
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      if (targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Form submit UX — show pending state, let Netlify Forms handle the rest.
  const form = document.querySelector('.quote-form');
  if (form) {
    form.addEventListener('submit', () => {
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Sending…';
      }
    });
  }
})();
