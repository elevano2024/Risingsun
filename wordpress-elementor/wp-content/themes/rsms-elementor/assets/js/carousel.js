(() => {
  const slides = window.rsmsCarousel?.homeSlides;
  if (!slides?.length) return;

  const img = document.getElementById("rsms-carousel-image");
  const title = document.getElementById("rsms-carousel-title");
  const subtitle = document.getElementById("rsms-carousel-subtitle");
  const cta = document.getElementById("rsms-carousel-cta");
  const dots = document.getElementById("rsms-carousel-dots");
  if (!img || !title || !subtitle || !cta || !dots) return;

  let index = 0;

  dots.innerHTML = slides
    .map((_, i) => `<div class="carousel__dot${i === 0 ? " active" : ""}" data-i="${i}"></div>`)
    .join("");

  function show(i, animate = true) {
    const slide = slides[i];
    if (!slide) return;

    if (animate) {
      img.classList.remove("is-active");
      img.classList.add("is-exit");
      window.setTimeout(() => {
        img.classList.remove("is-exit");
        img.classList.add("is-enter");
        apply(slide);
        requestAnimationFrame(() => {
          img.classList.remove("is-enter");
          img.classList.add("is-active");
        });
      }, 500);
    } else {
      apply(slide);
      img.classList.add("is-active");
    }

    dots.querySelectorAll(".carousel__dot").forEach((d, di) => {
      d.classList.toggle("active", di === i);
    });
  }

  function apply(slide) {
    img.src = slide.image;
    img.alt = slide.title;
    title.textContent = slide.title;
    subtitle.textContent = slide.subTitle;
    cta.onclick = () => {
      window.location.href = slide.link;
    };
  }

  dots.addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof Element)) return;
    const i = t.getAttribute("data-i");
    if (i == null) return;
    index = Number(i);
    show(index);
  });

  show(0, false);
  window.setInterval(() => {
    index = (index + 1) % slides.length;
    show(index);
  }, 5000);
})();
