const cards = document.querySelectorAll(".card");
const carousel = document.querySelector(".carousel");

function updateCards() {
  const center = window.innerWidth / 2;

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const cardCenter = rect.left + rect.width / 2;

    const distance = Math.abs(center - cardCenter);
    const maxDistance = window.innerWidth / 2;

    let scale = 1 - (distance / maxDistance);
    scale = Math.max(0.6, scale);

    card.style.transform = `scale(${scale})`;
    card.style.opacity = scale;
  });
}

carousel.addEventListener("scroll", updateCards);
window.addEventListener("load", updateCards);
window.addEventListener("resize", updateCards);
