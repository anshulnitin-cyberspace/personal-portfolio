// ================================
// Core Navigation & Scroll Effects
// ================================

(function () {
  'use strict';

  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  function handleScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile nav toggle
  navToggle.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('active', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // ================================
  // Scroll Reveal Animations
  // ================================

  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  // ================================
  // Staggered Skill Card Animation
  // ================================

  const skillObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll
            ? entry.target.querySelectorAll('.skill-card')
            : [entry.target];
          cards.forEach(function (card, i) {
            card.style.transitionDelay = i * 0.06 + 's';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.skills-grid').forEach(function (grid) {
    grid.querySelectorAll('.skill-card').forEach(function (card) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s, box-shadow 0.3s';
    });
    skillObserver.observe(grid);
  });

  // ================================
  // Contact Form Feedback
  // ================================

  document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
    setTimeout(function () {
      btn.textContent = originalText;
      btn.style.background = '';
      e.target.reset();
    }, 2500);
  });

  // ================================
  // Active Nav Link on Scroll
  // ================================

  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navItems.forEach(function (item) {
            item.style.color = item.getAttribute('href') === '#' + id
              ? 'var(--accent-cyan)'
              : '';
          });
        }
      });
    },
    { threshold: 0.3, rootMargin: '-' + getComputedStyle(document.documentElement).getPropertyValue('--nav-height') + ' 0px -60% 0px' }
  );

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });
})();

