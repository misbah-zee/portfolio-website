// script.js - High-end portfolio animations with GSAP and Lenis

// 1. Initialize Lenis Smooth Scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
});

// Sync Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// 2. Custom Magnetic Cursor
const cursor = document.querySelector('.cursor');
const hoverElements = document.querySelectorAll('[data-cursor="hover"]');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

// Update mouse coordinates
window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Animate cursor using GSAP for smooth trailing
gsap.ticker.add(() => {
  // LERP for smooth follow
  cursorX += (mouseX - cursorX) * 0.2;
  cursorY += (mouseY - cursorY) * 0.2;
  
  gsap.set(cursor, {
    x: cursorX,
    y: cursorY
  });
});

// Hover states for links
hoverElements.forEach((el) => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
});

// 3. Preloader Logic
const preloaderCounter = document.querySelector('.preloader-counter');
const preloader = document.querySelector('.preloader');

let progress = 0;
const interval = setInterval(() => {
  progress += Math.floor(Math.random() * 10) + 1; // Increment randomly
  if (progress > 100) progress = 100;
  
  preloaderCounter.textContent = progress + '%';
  
  if (progress === 100) {
    clearInterval(interval);
    initSiteAnimations();
  }
}, 40);

// 4. Main Animation Initialization (Runs after preloader)
function initSiteAnimations() {
  const tl = gsap.timeline();

  // Hide Preloader
  tl.to(preloaderCounter, {
    y: 50,
    opacity: 0,
    duration: 0.6,
    ease: "power3.in"
  })
  .to(preloader, {
    yPercent: -100,
    duration: 1,
    ease: "power4.inOut"
  }, "-=0.2");

  // Prepare text splits for Hero
  const splitTextElements = document.querySelectorAll('.split-text');
  
  splitTextElements.forEach(el => {
    new SplitType(el, { types: 'lines, words', tagName: 'span' });
    // Wrap lines for overflow hidden effect
    const lines = el.querySelectorAll('.line');
    lines.forEach(line => {
      const wrapper = document.createElement('div');
      wrapper.style.overflow = 'hidden';
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });
  });

  // Hero Animations
  const heroLines = document.querySelectorAll('.hero .line .word');
  
  tl.from(heroLines, {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.05,
    ease: "power4.out"
  }, "-=0.4")
  .from('.eyebrow', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: "power2.out"
  }, "-=0.8")
  .from('.hero-actions .button', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    stagger: 0.1,
    ease: "power2.out"
  }, "-=0.8");

  initScrollTriggers();
}

// 5. ScrollTrigger Animations
function initScrollTriggers() {
  
  // Header Blend mode change on scroll (optional effect)
  ScrollTrigger.create({
    start: 'top -80',
    end: 99999,
    toggleClass: {className: 'is-scrolled', targets: '.site-header'}
  });

  // About Section Stagger text
  const aboutText = document.querySelectorAll('.stagger-text');
  gsap.from(aboutText, {
    scrollTrigger: {
      trigger: '.about-section',
      start: 'top 70%',
    },
    y: 40,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out"
  });

  // Section Titles Reveal
  const sectionTitles = document.querySelectorAll('section:not(.hero) .section-title .word');
  sectionTitles.forEach(titleWord => {
    gsap.from(titleWord, {
      scrollTrigger: {
        trigger: titleWord.closest('.section'),
        start: 'top 80%',
      },
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.05,
      ease: "power4.out"
    });
  });

  // Projects Parallax & Fade
  const projects = document.querySelectorAll('.project-item');
  projects.forEach((proj) => {
    
    // Fade in project info
    gsap.from(proj.querySelector('.project-info'), {
      scrollTrigger: {
        trigger: proj,
        start: 'top 80%',
      },
      x: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    // Parallax on image placeholder
    gsap.to(proj.querySelector('.visual-placeholder'), {
      scrollTrigger: {
        trigger: proj,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      },
      y: 100,
      ease: "none"
    });
  });

  // CV Timeline Stagger
  const cvItems = document.querySelectorAll('.timeline-item');
  gsap.from(cvItems, {
    scrollTrigger: {
      trigger: '.cv-section',
      start: 'top 70%',
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "power2.out"
  });

  // Footer Reveal
  const footerTitleWords = document.querySelectorAll('.footer-title .word');
  gsap.from(footerTitleWords, {
    scrollTrigger: {
      trigger: '.site-footer',
      start: 'top 80%',
    },
    y: 150,
    opacity: 0,
    duration: 1.2,
    stagger: 0.1,
    ease: "power4.out"
  });
}
