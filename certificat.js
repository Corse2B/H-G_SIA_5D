document.addEventListener("DOMContentLoaded", () => {

const CERTIFICAT_IMAGE = "/certificat.jpg";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const inputNom = document.getElementById("nom");
const btnGenerer = document.getElementById("btnGenerer");
const btnTelecharger = document.getElementById("btnTelecharger");
const lienPartage = document.getElementById("lienPartage");

let imageGeneree = null;
let currentId = null;

async function genererCertificat() {

  const nom = inputNom.value.trim();
  if (!nom) {
    alert("Nom manquant");
    return;
  }

  btnTelecharger.disabled = true;
  lienPartage.innerHTML = "";

  try {

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

    const image = new Image();
    image.src = CERTIFICAT_IMAGE;

    image.onload = async () => {

      canvas.width = image.width;
      canvas.height = image.height;

      ctx.drawImage(image, 0, 0);

      ctx.font = "150px serif";
      ctx.fillStyle = "#e6ae47";
      ctx.textAlign = "center";
      ctx.fillText(nom, canvas.width / 2, canvas.height * 0.5);

      ctx.font = "70px serif";
      ctx.fillText(
        "Attribué le " + date.toLocaleDateString(),
        canvas.width / 2,
        canvas.height * 0.65
      );

      ctx.font = "30px monospace";
      ctx.fillText(
        "Vous êtes " + currentId,
        canvas.width / 2,
        canvas.height * 0.95
      );

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

        imageGeneree = canvas.toDataURL("image/jpeg");
        btnTelecharger.disabled = false;

        lienPartage.innerHTML =
          'Lien de partage : <a href="' +
          verificationURL +
          '" target="_blank">' +
          verificationURL +
          "</a>";
      };
    };

  } catch (err) {
    console.error(err);
    alert("Erreur JS");
  }
}

function telechargerCertificat() {
  if (!imageGeneree) return;

  const lien = document.createElement("a");
  lien.download = "certificat_" + currentId + ".jpg";
  lien.href = imageGeneree;
  lien.click();
}

/* EVENTS EN BAS */
btnGenerer.addEventListener("click", genererCertificat);
btnTelecharger.addEventListener("click", telechargerCertificat);

inputNom.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    genererCertificat();
  }
});

});
