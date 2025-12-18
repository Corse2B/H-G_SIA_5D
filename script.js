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

    content.addEventListener("click", (e) => {
      e.stopPropagation();

      if (content.classList.contains("active")) {
        closeAllContent();
      } else {
        closeAllContent();
        openContent(content);
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        closeAllContent();
      });
    }
  });

  overlay.addEventListener("click", closeAllContent);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllContent();
    }
  });

});
