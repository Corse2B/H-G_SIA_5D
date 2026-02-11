const CERTIFICAT_IMAGE = "/certificat.jpg";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const inputNom = document.getElementById("nom");
const btn = document.getElementById("btnCertificat");

async function genererCertificat() {
  const nom = inputNom.value.trim();
  if (!nom) {
    alert("Nom manquant");
    return;
  }

  // 1️⃣ On envoie en base d'abord
  const fd = new FormData();
  fd.append("nom", nom);

  const response = await fetch("/api/certificat", {
    method: "POST",
    body: fd
  });

  const data = await response.json();

  if (!data.success) {
    alert("Erreur serveur");
    return;
  }

  const id = data.id;
  const date = new Date();
  const verificationURL =
    window.location.origin + "/certificat/" + id;

  // 2️⃣ Charger l'image
  const image = new Image();
  image.src = CERTIFICAT_IMAGE;

  image.onload = async () => {
    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage(image, 0, 0);

    // NOM
    ctx.font = "150px serif";
    ctx.fillStyle = "#e6ae47";
    ctx.textAlign = "center";
    ctx.fillText(nom, canvas.width / 2, canvas.height * 0.5);

    // DATE
    ctx.font = "70px serif";
    ctx.fillStyle = "#e6ae47";
    ctx.fillText(
      "Date : " + date.toLocaleDateString(),
      canvas.width / 2,
      canvas.height * 0.65
    );

    // ID discret
    ctx.font = "30px monospace";
    ctx.fillStyle = "#e6ae47";
    ctx.fillText(
      "ID: " + id,
      canvas.width / 2,
      canvas.height * 0.95
    );

    // QR CODE
    const qrDataURL = await QRCode.toDataURL(verificationURL);
    const qrImage = new Image();
    qrImage.src = qrDataURL;

    qrImage.onload = () => {
      ctx.drawImage(
        qrImage,
        canvas.width - 250,
        canvas.height - 250,
        200,
        200
      );

      // Télécharger seulement après le QR
      const lien = document.createElement("a");
      lien.download = "certificat_" + id + ".jpg";
      lien.href = canvas.toDataURL("image/jpeg");
      lien.click();
    };
  };
}

btn.addEventListener("click", genererCertificat);
