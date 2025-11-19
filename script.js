// script.js - theme toggle, reveal, menu, small UX helpers

function animateName() {
  const nameElement = document.querySelector('.name-text');
  if (!nameElement) return;

  const text = nameElement.textContent.trim();
  const letters = text.split('');
  nameElement.innerHTML = '';

  letters.forEach((letter, index) => {
    const span = document.createElement('span');
    span.className = 'name-letter';
    span.textContent = letter === ' ' ? '\u00A0' : letter;
    span.style.opacity = '0';
    span.style.display = 'inline-block';
    span.style.transform = 'translateY(12px)';
    span.style.animation = `fadeIn 0.45s ease-out ${index * 0.06}s forwards`;
    nameElement.appendChild(span);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // smooth internal links (only anchors to IDs)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile nav if open
        const nav = document.querySelector('.nav');
        if (nav && nav.classList.contains('active')) {
          nav.classList.remove('active');
          const menuBtn = document.querySelector('.menu-toggle');
          if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // reveal observer
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  // theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.body;
  const saved = localStorage.getItem('site-theme');
  if (saved === 'light') root.classList.remove('dark'); else root.classList.add('dark');

  function updateThemeVars() {
    const isDark = root.classList.contains('dark');
    document.documentElement.style.setProperty('--stars-opacity', isDark ? '0.8' : '0.3');
    document.documentElement.style.setProperty('--twinkle-opacity', isDark ? '1' : '0.6');
  }
  updateThemeVars();

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      root.classList.toggle('dark');
      const now = root.classList.contains('dark') ? 'dark' : 'light';
      localStorage.setItem('site-theme', now);
      updateThemeVars();
    });
  }

  // mobile menu
  const menuBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const isActive = nav.classList.toggle('active');
      menuBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    // click outside to close
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !menuBtn.contains(e.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // esc to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('active')) {
        nav.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // start name animation
  animateName();
});

// small added styles for name letters
(function inject() {
  const s = document.createElement('style');
  s.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(18px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .name-letter { display:inline-block; opacity:0; transform:translateY(18px); }
  `;
  document.head.appendChild(s);
})();
