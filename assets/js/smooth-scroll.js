// Smooth Scroll and Navigation Functionality

(function() {
  'use strict';

  // Smooth scroll to section
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Skip if it's just "#" or empty
      if (href === '#' || href === '') return;

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Update active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  let scrollTimeout;

  function updateActiveNav() {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      // Check if section is in viewport (with offset for fixed nav)
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href && href.slice(1) === current) {
        link.classList.add('active');
      }
    });
  }

  // Throttled scroll handler
  window.addEventListener('scroll', () => {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(updateActiveNav);
  });

  // Hide/show navigation on scroll
  let lastScrollTop = 0;
  const nav = document.getElementById('portfolio-nav');

  if (nav) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down & past threshold
        nav.classList.add('hidden');
      } else {
        // Scrolling up
        nav.classList.remove('hidden');
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, false);
  }

  // Initialize on load
  updateActiveNav();
})();
