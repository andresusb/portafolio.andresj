// script.js - theme toggle, reveal, menu, small UX helpers
// Función para dividir el texto en letras y animarlas
function animateName() {
  const nameElement = document.querySelector('.name-text');
  if (!nameElement) return;

  const text = nameElement.textContent.trim();
  const letters = text.split('');
  
  // Limpiar el contenido actual
  nameElement.innerHTML = '';
  
  // Crear un span para cada letra
  letters.forEach((letter, index) => {
    const span = document.createElement('span');
    span.className = 'name-letter';
    span.textContent = letter === ' ' ? '\u00A0' : letter;
    span.style.animation = `fadeIn 0.5s ease-out ${index * 0.1}s forwards`;
    nameElement.appendChild(span);
  });
}

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

  function updateTheme() {
    const isDark = root.classList.contains('dark');
    document.documentElement.style.setProperty('--star-opacity', isDark ? '0.8' : '0.3');
    document.documentElement.style.setProperty('--twinkling-opacity', isDark ? '1' : '0.6');
  }

  themeToggle.addEventListener('click', () => {
    root.classList.toggle('dark');
    const now = root.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('site-theme', now);
    updateTheme();
  });

  // Aplicar tema guardado al cargar
  updateTheme();

  // Mobile menu
  const menuBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if(menuBtn && nav){
    menuBtn.addEventListener('click', ()=> nav.classList.toggle('active'));
  }
  
  // Iniciar animación del nombre
  animateName();
});

// Agregar estilos para la animación
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { 
      opacity: 0; 
      transform: translateY(20px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }
  
  .name-letter {
    display: inline-block;
    opacity: 0;
    transform: translateY(20px);
  }
`;
document.head.appendChild(style);
