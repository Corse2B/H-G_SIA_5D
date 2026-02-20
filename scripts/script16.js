window.addEventListener("load", function() {
  const loader = document.getElementById("site-loader-screen");
  const content = document.getElementById("site-main-content");

  loader.style.opacity = "0";

  setTimeout(() => {
    loader.style.display = "none";
    content.style.display = "block";
  }, 600);
});
