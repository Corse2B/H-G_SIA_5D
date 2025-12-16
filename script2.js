document.addEventListener("DOMContentLoaded", () => {

  const photos = document.querySelectorAll(".photo");
  const overlay = document.getElementById("overlay");

  function openPhoto(photo) {
    photo.classList.add("active");
    overlay.style.display = "block";
    document.body.classList.add("no-scroll");
  }

  function closeAll() {
    photos.forEach(photo => photo.classList.remove("active"));
    overlay.style.display = "none";
    document.body.classList.remove("no-scroll");
  }

  photos.forEach(photo => {
    photo.addEventListener("click", (e) => {
      e.stopPropagation();

      if (photo.classList.contains("active")) {
        closeAll();
      } else {
        closeAll();
        openPhoto(photo);
      }
    });
  });

  overlay.addEventListener("click", closeAll);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAll();
    }
  });

});
