// script.js - theme toggle, reveal, menu, animations, UX helpers
document.addEventListener('DOMContentLoaded', () => {

  /* ============================
     SMOOTH SCROLL ENLACES
  ============================ */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      const menu = document.querySelector('.nav');
      if (menu && menu.classList.contains('active')) menu.classList.remove('active');
    });
  });

  /* ============================
     REVEAL ANIMATION
  ============================ */
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  /* ============================
     THEME TOGGLE
  ============================ */
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.body;
  const saved = localStorage.getItem('site-theme');
  if (saved === 'light') root.classList.remove('dark');
  else root.classList.add('dark');

  themeToggle.addEventListener('click', () => {
    root.classList.toggle('dark');
    const now = root.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('site-theme', now);
  });

  /* ============================
     MENU MÓVIL
  ============================ */
  const menuBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => nav.classList.toggle('active'));
  }

  /* ============================
     HERO SLIDE-IN ANIMATION
     (nombre y foto entran de los lados)
  ============================ */
  const heroText = document.querySelector(".hero-text");
  const heroMedia = document.querySelector(".hero-media");

  if (heroText) {
    heroText.style.opacity = "0";
    heroText.style.transform = "translateX(-80px)";
  }

  if (heroMedia) {
    heroMedia.style.opacity = "0";
    heroMedia.style.transform = "translateX(80px)";
  }

  setTimeout(() => {
    if (heroText) {
      heroText.style.transition = "1s ease";
      heroText.style.opacity = "1";
      heroText.style.transform = "translateX(0)";
    }

    if (heroMedia) {
      heroMedia.style.transition = "1s ease";
      heroMedia.style.opacity = "1";
      heroMedia.style.transform = "translateX(0)";
    }
  }, 300);

  /* ============================
     TYPEWRITER (texto animado)
  ============================ */
  const typin
