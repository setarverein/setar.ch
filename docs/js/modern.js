/**
 * Modern JavaScript for Setar Association Website
 * Created: May 2025
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHeroSlider();
  initSmoothScroll();
  initLazyLoading();
  addAccessibility();
  initScrollAnimations(); // Added this function call to enable fade-in animations
});

/**
 * Initialize mobile navigation
 */
function initMobileNav() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (!navToggle || !navMenu) return;

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-menu') && !e.target.closest('.nav-toggle')) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
}

/**
 * Initialize hero slider
 */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');

  if (!slides.length) return;

  let currentSlide = 0;
  const slideInterval = 5000; // 5 seconds

  // Show initial slide
  showSlide(currentSlide);

  // Start autoplay
  let slideTimer = setInterval(nextSlide, slideInterval);

  // Add click event to dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      clearInterval(slideTimer);
      showSlide(index);
      slideTimer = setInterval(nextSlide, slideInterval);
    });
  });

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');

    currentSlide = index;
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]:not([href="#"])');

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Close mobile menu if open
        document.querySelector('.nav-menu')?.classList.remove('active');
        document.querySelector('.nav-toggle')?.classList.remove('active');

        // Smooth scroll to target
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for header height
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Initialize lazy loading for images
 */
function initLazyLoading() {
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
    });
  } else {
    // Use Intersection Observer for lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          imageObserver.unobserve(img);
        }
      });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  }
}

/**
 * Add accessibility enhancements
 */
function addAccessibility() {
  // Add ARIA roles and attributes
  const navMenu = document.querySelector('.nav-menu');
  if (navMenu) {
    navMenu.setAttribute('role', 'navigation');
    navMenu.setAttribute('aria-label', 'Main Navigation');
  }

  const navToggle = document.querySelector('.nav-toggle');
  if (navToggle) {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Toggle Navigation Menu');

    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
    });
  }

  // Make sure all interactive elements are keyboard accessible
  const buttons = document.querySelectorAll('button, [role="button"]');
  buttons.forEach(button => {
    if (!button.getAttribute('tabindex')) {
      button.setAttribute('tabindex', '0');
    }
  });
}

/**
 * Animation when elements come into view
 */
function initScrollAnimations() {
  const elementsToAnimate = document.querySelectorAll('.fade-in');

  if (!elementsToAnimate.length) return;

  const options = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, options);

  elementsToAnimate.forEach(element => {
    observer.observe(element);
  });
}