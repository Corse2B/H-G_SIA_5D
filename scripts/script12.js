const images = [
  "images/bg1.jpg",
  "images/bg2.png",
  "images/bg3.jpg",
  "images/bg4.jpg",
  "images/bg5.jpg",
  "images/bg6.jpg",
  "images/bg7.jpg",
  "images/bg8.jpg",
  "images/bg9.jpg",
  "images/bg10.jpg"
];

const background = document.getElementById("background");

function changeBackground() {
  // Choix aléatoire
  const randomIndex = Math.floor(Math.random() * images.length);
  const newImage = images[randomIndex];

  // Fade out
  background.style.opacity = 0;

  setTimeout(() => {
    background.style.backgroundImage = `url('${newImage}')`;
    background.style.opacity = 1; // Fade in
  }, 1500); // doit correspondre au temps du transition CSS
}

// Image initiale
changeBackground();

// Toutes les 60 secondes
setInterval(changeBackground, 60000);
