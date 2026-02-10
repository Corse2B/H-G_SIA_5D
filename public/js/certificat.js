const API_POST = "/api/certificat";
const CERTIFICAT_IMAGE = "/certificat.jpg";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const inputNom = document.getElementById("nom");
const btn = document.getElementById("btnCertificat");
const zoneResultat = document.getElementById("resultat");

async function genererCertificat() {
  const nom = inputNom.value.trim();

  if (!nom || nom.length > 50) {
    alert("Nom invalide");
    return;
  }

  const response = await fetch(API_POST, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nom,
      mission: "Mission Chateaux Forts"
    })
  });

  if (!response.ok) {
    alert("Erreur API");
    return;
  }

  const { id } = await response.json();

  const image = new Image();
  image.src = CERTIFICAT_IMAGE;

  image.onload = () => {
    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage(image, 0, 30);
    ctx.font = "65px Gothic";
    ctx.textAlign = "center";
    ctx.fillStyle = "#e6ae47";
    ctx.fillText(nom, canvas.width / 2, 380);

    ctx.font = "20px monospace";
    ctx.fillText("ID : " + id, canvas.width / 2, 430);

    const a = document.createElement("a");
    a.download = `certificat_${id}.jpg`;
    a.href = canvas.toDataURL("image/jpeg");
    a.click();

    zoneResultat.innerHTML = `
      ✅ Certificat généré<br>
      ID : <b>${id}</b>
    `;
  };
}

btn.addEventListener("click", genererCertificat);
