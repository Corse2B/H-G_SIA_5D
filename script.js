document.addEventListener("DOMContentLoaded", () => {

  const contents = document.querySelectorAll(".content");
  const overlay = document.getElementById("overlay");
  const page = document.getElementById("page");

  function openContent(content) {
    content.classList.add("active");
    overlay.style.display = "block";
    document.body.classList.add("no-scroll");
    page.classList.add("blur");
  }

  function closeAllContent() {
    contents.forEach(c => c.classList.remove("active"));
    overlay.style.display = "none";
    document.body.classList.remove("no-scroll");
    page.classList.remove("blur");
  }

  contents.forEach(content => {
    const closeBtn = content.querySelector(".close-btn");

    // 👉 OUVERTURE seulement si PAS actif
    content.addEventListener("click", (e) => {
      if (content.classList.contains("active")) return;
      e.stopPropagation();
      closeAllContent();
      openContent(content);
    });

    // bouton X
    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        closeAllContent();
      });
    }
  });

  // clic fond sombre
  overlay.addEventListener("click", closeAllContent);

  // touche ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllContent();
    }
  });

});
