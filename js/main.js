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
