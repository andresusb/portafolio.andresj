// script.js - Menú móvil simplificado
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const body = document.body;

  if (menuToggle && nav) {
    // Mostrar/ocultar menú
    function toggleMenu() {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      nav.classList.toggle('show');
      
      // Bloquear el scroll cuando el menú está abierto
      if (!isExpanded) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }
    }

    // Cerrar menú al hacer clic en un enlace
    function closeMenu() {
      menuToggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('show');
      body.style.overflow = '';
    }

    // Manejar clic en el botón del menú
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleMenu();
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav a').forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 1024) {
          closeMenu();
        }
      });
    });

    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', function(e) {
      if (nav.classList.contains('show') && 
          !nav.contains(e.target) && 
          e.target !== menuToggle) {
        closeMenu();
      }
    });

    // Manejar cambios de tamaño de pantalla
    function handleResize() {
      if (window.innerWidth > 1024) {
        // En pantallas grandes, asegurarse de que el menú esté visible
        nav.style.display = 'flex';
        nav.classList.remove('show');
        body.style.overflow = '';
      } else if (menuToggle.getAttribute('aria-expanded') === 'false') {
        // En móviles, ocultar el menú si está cerrado
        nav.style.display = 'none';
      } else {
        nav.style.display = 'flex';
      }
    }

    // Inicializar el menú según el tamaño de pantalla
    handleResize();
    window.addEventListener('resize', handleResize);
  }
});

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
