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

  image.onload = async () => {
    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage(image, 0, 0);

    ctx.font = "150px serif";
    ctx.fillStyle = "#e6ae47";
    ctx.textAlign = "center";

    ctx.fillText(
      nom,
      canvas.width / 2,
      canvas.height * 0.5
    );

    // 🔥 1️⃣ On envoie le nom à l’API
    const formData = new FormData();
    formData.append("nom", nom);

    const response = await fetch("/api/certificat", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    // 🔥 2️⃣ On télécharge l'image (comme avant)
    const nomFichier = nom
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "_");

    const lien = document.createElement("a");
    lien.download = `certificat_${nomFichier}.jpg`;
    lien.href = canvas.toDataURL("image/jpeg");
    lien.click();

    // 🔥 3️⃣ On affiche le lien partage
    alert("Lien de partage : " + window.location.origin + "/certificat/" + data.id);
  };
}

btn.addEventListener("click", genererCertificat);

