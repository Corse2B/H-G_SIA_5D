const header = document.querySelector("header");
const elements = document.querySelectorAll(".content, .photo, #MP");

window.addEventListener("scroll", () => {
  const headerBottom = header.getBoundingClientRect().bottom;

  elements.forEach(el => {
    const rect = el.getBoundingClientRect();

    // Si le haut de l'élément touche le header
    if (rect.top <= headerBottom) {
      el.classList.add("fade-out");
    } else {
      el.classList.remove("fade-out");
    }
  });
});
