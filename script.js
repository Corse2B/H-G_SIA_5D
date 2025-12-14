const contents = document.querySelectorAll(".content");
const overlay = document.getElementById("overlay");

contents.forEach(content => {
  content.addEventListener("click", () => {
    content.classList.add("active");
    overlay.style.display = "block";
  });
});

overlay.addEventListener("click", () => {
  document.querySelectorAll(".content.active").forEach(active => {
    active.classList.remove("active");
  });
  overlay.style.display = "none";
});
