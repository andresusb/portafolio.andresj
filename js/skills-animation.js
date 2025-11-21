// Función para animar las barras de habilidades cuando son visibles
function animateSkillsOnScroll() {
  const skillBars = document.querySelectorAll('.skill-progress');
  const skillsSection = document.querySelector('.skills');
  
  // Verificar si la sección de habilidades está en el viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  // Función para animar las barras
  function animateBars() {
    skillBars.forEach(bar => {
      if (isInViewport(bar) && !bar.classList.contains('animated')) {
        bar.style.width = bar.parentElement.getAttribute('data-level');
        bar.classList.add('animated');
      }
    });
  }

  // Animar las barras cuando la página carga
  animateBars();

  // Animar las barras al hacer scroll
  window.addEventListener('scroll', animateBars);
}

// Inicializar la animación cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar animación de habilidades
  animateSkillsOnScroll();
  
  // Asegurarse de que las animaciones se activen correctamente
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  // Observar la sección de habilidades
  const skillsSection = document.querySelector('.skills');
  if (skillsSection) {
    observer.observe(skillsSection);
  }
});
