coconst header = document.querySelector("header");
const elements = document.querySelectorAll(".content, .photo, #MP");

window.addEventListener("scroll", () => {
  const headerBottom = header.getBoundingClientRect().bottom;

  elements.forEach(el => {
    const rect = el.getBoundingClientRect();

    const elementTop = rect.top;
    const elementBottom = rect.bottom;
    const elementHeight = rect.height;

    // Zone de transition = hauteur de l’élément
    const fadeStart = headerBottom;
    const fadeEnd = headerBottom - elementHeight;

    if (elementBottom <= fadeStart && elementTop >= fadeEnd) {
      const progress = (elementBottom - fadeEnd) / elementHeight;
      el.style.opacity = Math.max(0, Math.min(1, progress));
    } else if (elementBottom < fadeEnd) {
      el.style.opacity = 0;
    } else {
      el.style.opacity = 1;
    }
  });
});
