const CERTIFICAT_IMAGE = "/certificat.jpg";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const inputNom = document.getElementById("nom");
const btnGenerer = document.getElementById("btnGenerer");
const btnTelecharger = document.getElementById("btnTelecharger");
const lienPartage = document.getElementById("lienPartage");

let imageGeneree = null; // stocke l'image finale
let currentId = null;

async function genererCertificat() {
  const nom = inputNom.value.trim();
  if (!nom) {
    alert("Nom manquant");
    return;
  }

  btnTelecharger.disabled = true;
  lienPartage.textContent = "";

  // 1️⃣ Enregistrer en base
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

  currentId = data.id;
  const date = new Date();
  const verificationURL =
    window.location.origin + "/certificat/" + currentId;

  // 2️⃣ Charger image
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
      "ID: " + currentId,
      canvas.width / 2,
      canvas.height * 0.95
    );

    // QR
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

      // Sauvegarde image finale
      imageGeneree = canvas.toDataURL("image/jpeg");

      // Activer bouton télécharger
      btnTelecharger.disabled = false;

      // Afficher lien sous le certificat
      lienPartage.innerHTML =
        'Lien de partage : <a href="' +
        verificationURL +
        '" target="_blank">' +
        verificationURL +
        "</a>";
    };
  };
}

function telechargerCertificat() {
  if (!imageGeneree) return;

  const lien = document.createElement("a");
  lien.download = "certificat_" + currentId + ".jpg";
  lien.href = imageGeneree;
  lien.click();
}

btnGenerer.addEventListener("click", genererCertificat);
btnTelecharger.addEventListener("click", telechargerCertificat);
