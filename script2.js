document.addEventListener("DOMContentLoaded", () => {

  // Sélection des éléments
  const photos = document.querySelectorAll(".photo");
  const overlay = document.getElementById("overlay");
  const page = document.getElementById("page");

  function openPhoto(photo) {
    photo.classList.add("active");
    overlay.style.display = "block";
    document.body.classList.add("no-scroll");
    page.classList.add("blur");
  }

  function closeAll() {
    photos.forEach(photo => {
      photo.classList.remove("active");
    });
    overlay.style.display = "none";
    document.body.classList.remove("no-scroll");
    page.classList.remove("blur");
  }

  photos.forEach(photo => {
    photo.addEventListener("click", (e) => {
      e.stopPropagation();
      openPhoto(photo);
    });
  });

  overlay.addEventListener("click", closeAll);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAll();
    }
  });

});
