// Año en el footer
document.querySelectorAll('#year').forEach(function (el) {
  el.textContent = new Date().getFullYear();
});

// Filtro por disciplina en proyectos.html
// (si borraste el bloque #filters en el HTML, este código simplemente no hace nada)
(function () {
  var filterButtons = document.querySelectorAll('.filter-btn');
  var items = document.querySelectorAll('.catalogue-item');
  var countEl = document.getElementById('item-count');

  if (!filterButtons.length || !items.length) return;

  function applyFilter(filter) {
    var visible = 0;
    items.forEach(function (item) {
      var show = filter === 'all' || item.dataset.discipline === filter;
      item.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    if (countEl) countEl.textContent = visible + ' proyecto' + (visible === 1 ? '' : 's');
  }

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      applyFilter(btn.dataset.filter);
    });
  });

  applyFilter('all');
})();

// Carrusel de imágenes en páginas de proyecto
// (busca cada <div class="carousel" data-carousel>; si no hay ninguno, no hace nada)
document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
  var slides = carousel.querySelectorAll('.carousel-slide');
  var dotsWrap = carousel.querySelector('[data-carousel-dots]');
  var countEl = carousel.querySelector('.carousel-count');
  var prevBtn = carousel.querySelector('[data-carousel-prev]');
  var nextBtn = carousel.querySelector('[data-carousel-next]');
  var current = 0;

  if (!slides.length) return;

  // Generar los puntitos
  var dots = [];
  if (dotsWrap) {
    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', 'Ir a imagen ' + (i + 1));
      dot.addEventListener('click', function () { goTo(i); });
      dotsWrap.appendChild(dot);
      dots.push(dot);
    });
  }

  function goTo(index) {
    slides[current].classList.remove('is-active');
    if (dots[current]) dots[current].classList.remove('is-active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('is-active');
    if (dots[current]) dots[current].classList.add('is-active');
    if (countEl) countEl.textContent = (current + 1) + ' / ' + slides.length;
  }

  if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); });

  // Swipe táctil (celular)
  var touchStartX = null;
  carousel.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  carousel.addEventListener('touchend', function (e) {
    if (touchStartX === null) return;
    var diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 40) goTo(current + (diff < 0 ? 1 : -1));
    touchStartX = null;
  });

  goTo(0);
});

// Lightbox: clic en la imagen activa del carrusel para ampliarla.
// Reutiliza los botones prev/next del carrusel para no duplicar el estado.
(function () {
  var lightbox = document.querySelector('[data-lightbox]');
  var carousel = document.querySelector('[data-carousel]');
  if (!lightbox || !carousel) return;

  var lightboxImg = lightbox.querySelector('[data-lightbox-img]');
  var closeBtn = lightbox.querySelector('[data-lightbox-close]');
  var lightboxPrev = lightbox.querySelector('[data-lightbox-prev]');
  var lightboxNext = lightbox.querySelector('[data-lightbox-next]');
  var carouselPrev = carousel.querySelector('[data-carousel-prev]');
  var carouselNext = carousel.querySelector('[data-carousel-next]');

  function activeImg() {
    var active = carousel.querySelector('.carousel-slide.is-active img');
    return active || null;
  }

  function sync() {
    var img = activeImg();
    if (!img || !lightboxImg) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
  }

  function open() {
    sync();
    lightbox.classList.add('is-open');
  }

  function close() {
    lightbox.classList.remove('is-open');
  }

  carousel.addEventListener('click', function (e) {
    if (e.target.tagName === 'IMG' && e.target.closest('.carousel-slide.is-active')) {
      open();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) close(); // clic fuera de la imagen
  });
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight' && carouselNext) carouselNext.click();
    if (e.key === 'ArrowLeft' && carouselPrev) carouselPrev.click();
  });

  if (lightboxPrev) lightboxPrev.addEventListener('click', function () {
    if (carouselPrev) carouselPrev.click();
    sync();
  });
  if (lightboxNext) lightboxNext.addEventListener('click', function () {
    if (carouselNext) carouselNext.click();
    sync();
  });
})();

// Ajusta el alto de la imagen de portada (home) para que header + hero + pie
// entren siempre en una sola pantalla, sin scroll — solo desde 700px de ancho.
// Por debajo de eso, la imagen vuelve a su tamaño natural (se adapta al ancho),
// aceptando que puede haber algo de scroll en mobile.
(function () {
  var heroFrame = document.querySelector('.hero-frame');
  if (!heroFrame) return;

  var header = document.querySelector('.site-header');
  var footer = document.querySelector('.site-footer');
  var caption = document.querySelector('.hero-caption');

  function ajustarHero() {
    if (window.innerWidth < 700) {
      heroFrame.style.height = ''; // mobile: tamaño natural
      return;
    }
    var usado = (header ? header.offsetHeight : 0) +
                (footer ? footer.offsetHeight : 0) +
                (caption ? caption.offsetHeight : 0);
    var disponible = window.innerHeight - usado;
    heroFrame.style.height = Math.max(disponible, 240) + 'px';
  }

  window.addEventListener('resize', ajustarHero);
  window.addEventListener('load', ajustarHero);
  ajustarHero();
})();