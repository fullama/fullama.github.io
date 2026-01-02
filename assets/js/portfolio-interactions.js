// Portfolio Interactive Features

(function() {
  'use strict';

  // =========================================================================
  // Typing Animation
  // =========================================================================
  function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        // Remove cursor when done
        setTimeout(() => {
          element.classList.add('typing-complete');
        }, 500);
      }
    }
    type();
  }

  // =========================================================================
  // Counter Animation
  // =========================================================================
  function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target.toLocaleString();
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current).toLocaleString();
      }
    }, 16);
  }

  // =========================================================================
  // Particle Canvas Animation (Simple)
  // =========================================================================
  function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(74, 144, 226, 0.5)';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(74, 144, 226, ${0.2 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    // Resize handler
    window.addEventListener('resize', () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    });
  }

  // =========================================================================
  // Publication Filtering
  // =========================================================================
  function initPublicationFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const publicationCards = document.querySelectorAll('.publication-card');

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;

        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter cards
        publicationCards.forEach(card => {
          if (filter === 'all') {
            card.style.display = 'flex';
          } else if (filter === 'first-author') {
            card.style.display = card.dataset.firstAuthor === 'true' ? 'flex' : 'none';
          } else {
            const tags = card.dataset.tags ? card.dataset.tags.split(' ') : [];
            card.style.display = tags.includes(filter) ? 'flex' : 'none';
          }
        });
      });
    });

    // Publication search
    const searchInput = document.querySelector('.publication-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        publicationCards.forEach(card => {
          const title = card.querySelector('.publication-title').textContent.toLowerCase();
          card.style.display = title.includes(searchTerm) ? 'flex' : 'none';
        });

        // Reset filter buttons when searching
        if (searchTerm) {
          filterButtons.forEach(btn => btn.classList.remove('active'));
        }
      });
    }
  }

  // =========================================================================
  // Scroll Animations (Intersection Observer)
  // =========================================================================
  function initScrollAnimations() {
    const animateOnScroll = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe all animatable elements
    document.querySelectorAll('.project-card, .publication-card, .skill-category, .timeline-item')
      .forEach(el => animateOnScroll.observe(el));
  }

  // =========================================================================
  // Initialize Everything on DOM Load
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    // Typing animation
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
      const text = typingText.dataset.text;
      typeWriter(typingText, text, 30);
    }

    // Counter animations when hero metrics are visible
    const heroMetrics = document.querySelector('.hero-metrics');
    if (heroMetrics) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const metrics = entry.target.querySelectorAll('.metric-number');
            metrics.forEach(metric => {
              const target = parseInt(metric.dataset.count);
              animateCounter(metric, target);
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      observer.observe(heroMetrics);
    }

    // Initialize particle animation
    initParticles();

    // Initialize publication filters
    initPublicationFilters();

    // Initialize scroll animations
    initScrollAnimations();
  });
})();
