const CERTIFICAT_IMAGE = "certificat.jpg";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const inputNom = document.getElementById("nom");
const btn = document.getElementById("btnCertificat");
const zoneResultat = document.getElementById("resultat");

function genererCertificat() {
  const nom = inputNom.value.trim();

  if (!nom) {
    alert("Entre un nom");
    return;
  }

  const image = new Image();
  image.src = CERTIFICAT_IMAGE;

  image.onload = () => {
    canvas.width = image.width;
    canvas.height = image.height;

    // fond
    ctx.drawImage(image, 0, 0);

    // texte nom
    ctx.font = "48px serif";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.fillText(nom, canvas.width / 2, 380);

    // ID simple local
    const id = Math.floor(Math.random() * 100000);

    ctx.font = "20px monospace";
    ctx.fillText("ID : " + id, canvas.width / 2, 430);

    // téléchargement
    const a = document.createElement("a");
    a.download = `certificat_${id}.jpg`;
    a.href = canvas.toDataURL("image/jpeg", 0.95);
    a.click();

    zoneResultat.innerHTML = `✅ Certificat généré (ID ${id})`;
  };

  image.onerror = () => {
    alert("certificat.jpg introuvable");
  };
}

btn.addEventListener("click", genererCertificat);
