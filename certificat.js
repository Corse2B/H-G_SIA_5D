console.log("JS chargé");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const btn = document.getElementById("btnCertificat");
const inputNom = document.getElementById("nom");

if (!canvas || !btn || !inputNom) {
  alert("ERREUR: élément HTML manquant");
}

btn.addEventListener("click", () => {
  console.log("Bouton cliqué");

  const image = new Image();
  image.src = "./certificat.jpg";

  image.onload = () => {
    console.log("Image chargée");

    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage(image, 0, 0);

    ctx.font = "48px serif";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(inputNom.value, canvas.width / 2, 300);

    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/jpeg");
    a.download = "test.jpg";
    a.click();

    console.log("Téléchargement lancé");
  };

  image.onerror = () => {
    alert("❌ certificat.jpg introuvable");
  };
});
