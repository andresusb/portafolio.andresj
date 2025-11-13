document.addEventListener('DOMContentLoaded', () => {

  // Reveal animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Mobile menu toggle
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-links');

  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
  });
});
