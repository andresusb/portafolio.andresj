// script.js - theme toggle, reveal, menu, small UX helpers
document.addEventListener('DOMContentLoaded', () => {
  // Smooth internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const target = document.querySelector(a.getAttribute('href'));
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); }
      const menu = document.querySelector('.nav');
      if(menu && menu.classList.contains('active')) menu.classList.remove('active');
    });
  });

  // IntersectionObserver reveal
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add('visible');
    });
  }, {threshold: 0.15});
  document.querySelectorAll('.reveal').forEach(el=> obs.observe(el));

  // Theme toggle - persists in localStorage
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.body;
  const saved = localStorage.getItem('site-theme');
  if(saved === 'light') root.classList.remove('dark'); else root.classList.add('dark');

  themeToggle.addEventListener('click', ()=>{
    root.classList.toggle('dark');
    const now = root.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('site-theme', now);
  });

  // Mobile menu
  const menuBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if(menuBtn && nav){
    menuBtn.addEventListener('click', ()=> nav.classList.toggle('active'));
  }
});
