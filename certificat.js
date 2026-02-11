const CERTIFICAT_IMAGE = "/certificat.jpg";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const inputNom = document.getElementById("nom");
const btn = document.getElementById("btnCertificat");

function genererCertificat() {
  const nom = inputNom.value.trim();
  if (!nom) {
    alert("Nom manquant");
    return;
  }

  const image = new Image();
  image.src = CERTIFICAT_IMAGE;

  image.onload = () => {
    canvas.width = image.width;
    canvas.height = image.height;

    // image entière, pas coupée
    ctx.drawImage(image, 0, 0);

    ctx.font = "150px serif";
    ctx.fillStyle = "#e6ae47";
    ctx.textAlign = "center";

    // ✅ SEUL CHANGEMENT ICI
    ctx.fillText(
      nom,
      canvas.width / 2,
      canvas.height * 6.2
    );

    const nomFichier = nom
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "_");

    const lien = document.createElement("a");
    lien.download = `certificat_${nomFichier}.jpg`;
    lien.href = canvas.toDataURL("image/jpeg");
    lien.click();
  };
}

btn.addEventListener("click", genererCertificat);


