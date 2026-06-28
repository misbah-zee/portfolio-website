<<<<<<< HEAD
﻿const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const header = document.querySelector('.site-header');
const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
const sections = [...document.querySelectorAll('main section[id], main .section[id], section[id]')];

function updateHeader() {
  header?.classList.toggle('is-scrolled', window.scrollY > 18);
}

function updateGlow(event) {
  if (prefersReducedMotion) return;
  const x = Math.round((event.clientX / window.innerWidth) * 100);
  const y = Math.round((event.clientY / window.innerHeight) * 100);
  document.documentElement.style.setProperty('--glow-x', `${x}%`);
  document.documentElement.style.setProperty('--glow-y', `${y}%`);
}

function markRevealTargets() {
  const selectors = [
    '.section > .section-heading',
    '.profile-card',
    '.stat-card',
    '.project-card',
    '.skill-card',
    '.education-card',
    '.contact-card'
  ];

  document.querySelectorAll(selectors.join(',')).forEach((element, index) => {
    element.classList.add('reveal');
    element.style.setProperty('--stagger', index % 6);
  });
}

function observeReveals() {
  const revealTargets = document.querySelectorAll('.reveal');
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });

  revealTargets.forEach((element) => observer.observe(element));
}

function observeActiveSection() {
  if (!navLinks.length || !sections.length || !('IntersectionObserver' in window)) return;

  const byId = new Map(navLinks.map((link) => [link.getAttribute('href').slice(1), link]));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const link = byId.get(entry.target.id);
      if (!link || !entry.isIntersecting) return;
      navLinks.forEach((item) => item.classList.remove('is-active'));
      link.classList.add('is-active');
    });
  }, { threshold: 0.45 });

  sections.forEach((section) => observer.observe(section));
}

markRevealTargets();
observeReveals();
observeActiveSection();
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });
window.addEventListener('pointermove', updateGlow, { passive: true });
=======
// script.js – initialize AOS and smooth scrolling for navigation links

document.addEventListener('DOMContentLoaded', function () {
  // Initialize AOS (Animate on Scroll) library
  if (typeof AOS !== 'undefined') {
    AOS.init({
      // Global settings for AOS animations
      duration: 800, // animation duration in ms
      easing: 'ease-out',
      once: true, // whether animation should happen only once while scrolling down
      offset: 120, // offset (in px) from the original trigger point
    });
  }

  // Smooth scrolling for internal navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        const topOffset = targetEl.offsetTop - 70; // Adjust for sticky header height
        window.scrollTo({ top: topOffset, behavior: 'smooth' });
      }
    });
  });
});
>>>>>>> 4f799d5 (Add premium AOS animations and 3D card hover)
