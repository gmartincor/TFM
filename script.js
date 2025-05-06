/**
 * Script principal para la presentación TimeOverflow
 * Maneja la navegación entre diapositivas, animaciones y funcionalidades interactivas
 */
document.addEventListener('DOMContentLoaded', function() {
  // Obtener todas las diapositivas
  const slides = document.querySelectorAll('.slide-container');
  let currentSlide = 0;
  
  // Mostrar la primera diapositiva al cargar la página
  slides[currentSlide].classList.add('active');
  updateProgressBar();
  
  // Animar los elementos de la lista con delay
  animateListItems();
  
  // Función para navegar a la diapositiva anterior
  function goToPrevSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide > 0) ? currentSlide - 1 : 0;
    slides[currentSlide].classList.add('active');
    updateProgressBar();
    animateListItems();
    scrollToTop();
  }
  
  // Función para navegar a la diapositiva siguiente
  function goToNextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : slides.length - 1;
    slides[currentSlide].classList.add('active');
    updateProgressBar();
    animateListItems();
    scrollToTop();
  }
  
  // Actualizar la barra de progreso
  function updateProgressBar() {
    const progressPercentage = ((currentSlide + 1) / slides.length) * 100;
    document.getElementById('progress-bar').style.width = `${progressPercentage}%`;
  }
  
  // Animar los elementos de la lista
  function animateListItems() {
    const activeSlide = slides[currentSlide];
    const listItems = activeSlide.querySelectorAll('li');
    
    listItems.forEach((item, index) => {
      item.classList.remove('animated');
      setTimeout(() => {
        item.classList.add('animated');
      }, 100 * index);
    });
  }
  
  // Volver al inicio de la página al cambiar diapositiva
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  // Eventos para los botones de navegación
  document.getElementById('prev-button').addEventListener('click', goToPrevSlide);
  document.getElementById('next-button').addEventListener('click', goToNextSlide);
  
  // Navegación con teclado
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      goToPrevSlide();
    } else if (e.key === 'ArrowRight') {
      goToNextSlide();
    }
  });
  
  // Cambiar al modo oscuro
  document.getElementById('dark-mode-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
  });
  
  // Crear tooltips para términos técnicos
  createTooltips();
  function createTooltips() {
    const terms = {
      'accesibilidad': 'Diseño inclusivo que permite a todas las personas, independientemente de sus capacidades, utilizar una aplicación.',
      'interoperabilidad': 'Capacidad de diferentes sistemas para trabajar juntos y compartir información.',
      'TimeOverflow': 'Software de código abierto para gestionar bancos de tiempo desarrollado por la Asociación ADBdT.',
      'bancos de tiempo': 'Sistemas de intercambio de servicios donde la unidad de valor es el tiempo, no el dinero.',
      'código abierto': 'Software cuyo código fuente está disponible públicamente y puede ser modificado y compartido libremente.',
      'WCAG 2.2': 'Web Content Accessibility Guidelines - Estándares internacionales que definen cómo hacer que el contenido web sea más accesible para personas con discapacidad.',
      'Multi-tenant': 'Arquitectura de software donde una única instancia de la aplicación sirve a múltiples clientes u organizaciones.'
    };
    
    document.querySelectorAll('p, li').forEach(element => {
      Object.keys(terms).forEach(term => {
        if (element.innerHTML.includes(term)) {
          element.innerHTML = element.innerHTML.replace(
            new RegExp(`(${term})`, 'gi'),
            `<span class="tooltip">$1<span class="tooltip-text">${terms[term]}</span></span>`
          );
        }
      });
    });
  }

  // Funcionalidad de pantalla completa para el video
  const demoVideo = document.getElementById('demoVideo');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  
  if (fullscreenBtn && demoVideo) {
    fullscreenBtn.addEventListener('click', function() {
      if (demoVideo.requestFullscreen) {
        demoVideo.requestFullscreen();
      } else if (demoVideo.webkitRequestFullscreen) { /* Safari */
        demoVideo.webkitRequestFullscreen();
      } else if (demoVideo.msRequestFullscreen) { /* IE11 */
        demoVideo.msRequestFullscreen();
      }
    });
  }
});
