document.addEventListener('DOMContentLoaded', function() {
  // Elementos del slider
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dots .dot');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  
  let currentSlide = 0;
  const totalSlides = slides.length;
  let slideInterval;
  const INTERVAL_TIME = 5000; // 5 segundos

  // Función para mostrar un slide específico
  function showSlide(index) {
    // Ocultar todos los slides
    slides.forEach(slide => {
      slide.classList.remove('active');
      slide.style.opacity = '0';
    });
    
    // Remover la clase active de todos los dots
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Mostrar el slide actual
    slides[index].classList.add('active');
    setTimeout(() => {
      slides[index].style.opacity = '1';
    }, 10);
    
    // Actualizar el dot activo
    dots[index].classList.add('active');
    
    // Actualizar el índice del slide actual
    currentSlide = index;
  }

  // Función para ir al siguiente slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
    resetInterval();
  }

  // Función para ir al slide anterior
  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
    resetInterval();
  }

  // Función para reiniciar el intervalo del autoplay
  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, INTERVAL_TIME);
  }

  // Event listeners para los botones de navegación
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // Event listeners para los dots de navegación
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      resetInterval();
    });
  });

  // Iniciar el autoplay
  function startAutoPlay() {
    slideInterval = setInterval(nextSlide, INTERVAL_TIME);
  }

  // Pausar el autoplay cuando el mouse está sobre el slider
  const slider = document.querySelector('.testimonial-slider');
  slider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });

  // Reanudar el autoplay cuando el mouse sale del slider
  slider.addEventListener('mouseleave', () => {
    startAutoPlay();
  });

  // Iniciar el slider
  showSlide(0);
  startAutoPlay();

  // Manejo de teclado para accesibilidad
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  });
});
