document.addEventListener("DOMContentLoaded", () => {

  const contents = document.querySelectorAll(".content");
  const overlay = document.getElementById("overlay");
  const pageContent = document.getElementById("page-content");

  function openContent(content) {
    content.classList.add("active");
    overlay.style.display = "block";
    document.body.classList.add("no-scroll");
    pageContent.classList.add("blur");
  }

  function closeAllContent() {
    contents.forEach(c => c.classList.remove("active"));
    overlay.style.display = "none";
    document.body.classList.remove("no-scroll");
    pageContent.classList.remove("blur");
  }

  contents.forEach(content => {
    const closeBtn = content.querySelector(".close-btn");

    content.addEventListener("click", (e) => {
      if (content.classList.contains("active")) return;
      e.stopPropagation();
      closeAllContent();
      openContent(content);
    });

    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeAllContent();
    });
  });

  overlay.addEventListener("click", closeAllContent);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllContent();
    }
  });

});
