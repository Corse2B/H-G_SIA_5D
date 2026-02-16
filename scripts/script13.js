const header = document.querySelector("header");
const elements = document.querySelectorAll(".content, .photo, #MP");

window.addEventListener("scroll", () => {
  const headerBottom = header.getBoundingClientRect().bottom;

  elements.forEach(el => {
    const rect = el.getBoundingClientRect();

    // Distance entre le haut de l’élément et le bas du header
    const distance = rect.top - headerBottom;

    const fadeDistance = 200; // 🔥 plus grand = plus progressif

    if (distance < fadeDistance) {
      let opacity = distance / fadeDistance;
      opacity = Math.min(Math.max(opacity, 0), 1);
      el.style.opacity = opacity;
    } else {
      el.style.opacity = 1;
    }
  });
});
