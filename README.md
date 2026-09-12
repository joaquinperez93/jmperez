# Portfolio — scaffold

Sitio estático (HTML + CSS + JS puro, sin build) listo para GitHub Pages.

## Estructura

```
index.html            → Home
proyectos.html         → Índice completo de proyectos (con filtro por disciplina)
proyectos/proyecto-ejemplo.html   → Template de página de proyecto individual
bio.html
contacto.html
css/style.css          → Todo el diseño vive acá
js/main.js              → Año dinámico del footer + filtro de proyectos
images/                 → Poné tus imágenes acá
```

## Cómo personalizar

1. **Buscá y reemplazá** todos los `[Tu Nombre]` por tu nombre real (aparece en cada `<title>`, en el header y en el footer de cada página).
2. **Textos**: en `index.html` (hero), `bio.html` y `contacto.html` hay párrafos de ejemplo — reemplazalos por tu contenido.
3. **Proyectos**:
   - Cada proyecto es un `<li class="catalogue-item">` dentro de `index.html` (los primeros 3) y `proyectos.html` (el listado completo).
   - Para agregar un proyecto nuevo: copiá `proyectos/proyecto-ejemplo.html`, renombralo (p. ej. `proyectos/piel-de-la-ciudad.html`) y editá título, año, técnica y texto.
   - Agregá el link correspondiente en `proyectos.html` y, si querés que aparezca destacado, también en `index.html`.
4. **Imágenes**: cada `<div class="plate-frame">` es un placeholder. Para poner una imagen real, reemplazá:
   ```html
   <div class="plate-frame">
     <span class="placeholder-label">Imagen 01</span>
   </div>
   ```
   por:
   ```html
   <div class="plate-frame">
     <img src="../images/nombre-proyecto/01.jpg" alt="Descripción de la obra">
   </div>
   ```
   Organizá `images/` en una subcarpeta por proyecto para no perderte (`images/piel-de-la-ciudad/01.jpg`, `02.jpg`...).
5. **Filtro por disciplina** (opcional): en `proyectos.html`, cada `<li>` tiene `data-discipline="fotografia"` (o `pintura`, `instalacion`). Agregá o cambiá categorías ahí y en los botones `#filters`. Si no te sirve, borrá el `<div id="filters">` y listo — `main.js` no hace nada si no encuentra los botones.
6. **Contacto**: cambiá el email e Instagram en `contacto.html`.

## Publicar en GitHub Pages

1. Creá un repositorio en GitHub (puede llamarse `tu-usuario.github.io` para que quede en la raíz de tu dominio de GitHub, o cualquier otro nombre).
2. Subí estos archivos a la raíz del repo:
   ```bash
   cd site
   git init
   git add .
   git commit -m "Primer commit del sitio"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
   git push -u origin main
   ```
3. En GitHub: **Settings → Pages → Source** → elegí la rama `main` y la carpeta `/ (root)`.
4. A los pocos minutos el sitio queda publicado en:
   - `https://TU_USUARIO.github.io/` (si el repo se llama `TU_USUARIO.github.io`), o
   - `https://TU_USUARIO.github.io/TU_REPO/` (para cualquier otro nombre de repo).
5. Cada vez que quieras actualizar el sitio: editás los archivos y hacés `git add . && git commit -m "..." && git push`.

## Dominio propio (opcional)

Si más adelante comprás un dominio (p. ej. `tunombre.com`), en **Settings → Pages → Custom domain** lo cargás ahí y GitHub te da los registros DNS que tenés que configurar en tu proveedor de dominio.
