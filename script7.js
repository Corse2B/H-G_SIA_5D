  document.addEventListener("DOMContentLoaded", () => {
    const videos = document.querySelectorAll(".zoomVideo");

    videos.forEach(video => {

      // Quand on entre ou sort du plein écran
      document.addEventListener("fullscreenchange", () => {
        if (document.fullscreenElement === video) {
          // Entrée en plein écran → lecture
          video.play();
        } else {
          // Sortie du plein écran → pause + retour au début
          video.pause();
          video.currentTime = 0;
        }
      });

    });
  });
