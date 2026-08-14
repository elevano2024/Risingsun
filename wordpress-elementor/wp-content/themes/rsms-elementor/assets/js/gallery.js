/**
 * Gallery lightbox — mirrors Next.js src/app/gallery/page.tsx
 * Works with legacy HTML tiles and native Elementor Image widgets.
 */
(() => {
  const root = document.querySelector(".gallery");
  if (!root) return;

  const items = [
    ...root.querySelectorAll(
      ".gallery-image-container, .elementor-widget-image.gallery-image, .elementor-widget-image.gallery-image-container"
    ),
  ];
  if (!items.length) return;

  const srcs = items.map((el) => {
    const img = el.matches("img") ? el : el.querySelector("img");
    return img?.getAttribute("src") || "";
  }).filter(Boolean);

  if (!srcs.length) return;

  let activeIndex = null;
  let modal = null;

  function ensureModal() {
    if (modal) return modal;
    modal = document.createElement("div");
    modal.className = "gallery-modal";
    modal.hidden = true;
    modal.innerHTML = `
      <div class="overlay" data-close="1"></div>
      <img class="modal-image" alt="" />
      <button type="button" class="nav-btn left" aria-label="Previous image">&#10094;</button>
      <button type="button" class="nav-btn right" aria-label="Next image">&#10095;</button>
    `;
    document.body.appendChild(modal);
    modal.querySelector(".overlay").addEventListener("click", close);
    modal.querySelector(".nav-btn.left").addEventListener("click", (e) => {
      e.stopPropagation();
      prev();
    });
    modal.querySelector(".nav-btn.right").addEventListener("click", (e) => {
      e.stopPropagation();
      next();
    });
    return modal;
  }

  function open(i) {
    activeIndex = i;
    const m = ensureModal();
    const img = m.querySelector(".modal-image");
    img.src = srcs[activeIndex];
    img.alt = `Selected Image ${activeIndex + 1}`;
    m.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function close() {
    if (!modal) return;
    modal.hidden = true;
    activeIndex = null;
    document.body.style.overflow = "";
  }

  function next() {
    if (activeIndex === null) return;
    open((activeIndex + 1) % srcs.length);
  }

  function prev() {
    if (activeIndex === null) return;
    open((activeIndex - 1 + srcs.length) % srcs.length);
  }

  items.forEach((el, i) => {
    if (!srcs[i]) return;
    el.style.cursor = "pointer";
    el.addEventListener("click", () => open(i));
    el.setAttribute("role", "button");
    el.setAttribute("tabindex", "0");
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open(i);
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (activeIndex === null) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });
})();
