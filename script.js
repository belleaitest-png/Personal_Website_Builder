// ============================================
// Annabelle Body — Website Interactions
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Nav Toggle ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // --- Sticky Nav — transparent over title slide, solid once scrolled past ---
  const nav = document.getElementById('nav');
  const titleSlide = document.querySelector('.title-slide');
  const scrollThreshold = titleSlide ? titleSlide.offsetHeight - 100 : 50;

  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // --- Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll(
    '.section-eyebrow, .section-title, .verifood-card, .timeline-item, ' +
    '.writing-card, .about-content, .about-images, .value-quote, ' +
    '.contact-inner, .hero-content, .hero-image, .verifood-stats'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
