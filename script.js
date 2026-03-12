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

  // --- Report Download Modal ---
  const reportModal = document.getElementById('reportModal');
  const downloadBtn = document.getElementById('downloadReportBtn');
  const modalClose = document.getElementById('modalClose');
  const reportForm = document.getElementById('reportForm');
  const modalStatus = document.getElementById('modalStatus');

  function openModal() {
    reportModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    reportModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  downloadBtn.addEventListener('click', openModal);
  modalClose.addEventListener('click', closeModal);

  reportModal.addEventListener('click', (e) => {
    if (e.target === reportModal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && reportModal.classList.contains('active')) {
      closeModal();
    }
  });

  reportForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('reportSubmitBtn');
    const email = document.getElementById('reportEmail').value.trim();
    const organisation = document.getElementById('reportOrg').value.trim();
    const reason = document.getElementById('reportReason').value.trim();

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    modalStatus.textContent = '';
    modalStatus.className = 'modal-status';

    try {
      const response = await fetch('/api/send-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, organisation, reason }),
      });

      const data = await response.json();

      if (response.ok) {
        modalStatus.textContent = 'Report sent! Check your inbox.';
        modalStatus.classList.add('success');
        reportForm.reset();
        setTimeout(closeModal, 2500);
      } else {
        modalStatus.textContent = data.error || 'Something went wrong. Please try again.';
        modalStatus.classList.add('error');
      }
    } catch (err) {
      modalStatus.textContent = 'Network error. Please try again.';
      modalStatus.classList.add('error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Me the Report';
    }
  });

});
