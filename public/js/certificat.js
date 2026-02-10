// === CONFIG ===
const API_POST = "/api/certificat";
const CERTIFICAT_IMAGE = "/certificat.jpg";

// === ELEMENTS ===
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const inputNom = document.getElementById("nom");
const btn = document.getElementById("btnCertificat");
const zoneResultat = document.getElementById("resultat");

// === ACTION PRINCIPALE ===
async function genererCertificat() {
  const nom = inputNom.value.trim();

  if (!nom || nom.length > 50) {
    alert("Veuillez entrer un nom valide");
    return;
  }

  // 1️⃣ Envoi à l'API (D1)
  const response = await fetch(API_POST, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nom: nom,
      mission: "Mission Far West"
    })
  });

  if (!response.ok) {
    alert("Erreur lors de la création du certificat");
    return;
  }

  const data = await response.json();
  const id = data.id;

  // 2️⃣ Génération du JPG
  const image = new Image();
  image.src = CERTIFICAT_IMAGE;

  image.onload = () => {
    canvas.width = image.width;
    canvas.height = image.height;

    // fond
    ctx.drawImage(image, 0, 0);

    // nom
    ctx.font = "48px serif";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.fillText(nom, canvas.width / 2, 380);

    // ID
    ctx.font = "20px monospace";
    ctx.fillText("ID : " + id, canvas.width / 2, 430);

    // téléchargement
    const a = document.createElement("a");
    a.download = `certificat_${id}.jpg`;
    a.href = canvas.toDataURL("image/jpeg");
    a.click();

    // affichage résultat
    if (zoneResultat) {
      zoneResultat.innerHTML = `
        ✅ Certificat généré<br>
        ID : <strong>${id}</strong><br>
        <a href="/certificat.html?id=${id}">Re-télécharger le certificat</a>
      `;
    }
  };

  image.onerror = () => {
    alert("Image du certificat introuvable");
  };
}

// === EVENT ===
btn.addEventListener("click", genererCertificat);
