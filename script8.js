// =======================
// CONFIGURATION
// =======================

// SALT (différent du mot de passe)
const SALT = "chronographia5dsia3245684902";


const bonHash =
  "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9";

// =======================
// AUTO-LOGIN
// =======================
if (localStorage.getItem("ok") === "true") {
  afficherSite();
}

// =======================
// VÉRIFICATION
// =======================
async function verifier() {
  const input = document.getElementById("mdp").value;

  // ⚠️ IMPORTANT : séparateur ESPACE
  const data = `${input} ${SALT}`;

  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(data)
  );

  const hashHex = [...new Uint8Array(hashBuffer)]
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");

  if (hashHex === bonHash) {
    localStorage.setItem("ok", "true");
    afficherSite();
  } else {
    document.getElementById("erreur").textContent = "Mot incorrect";
  }
}

// =======================
// AFFICHAGE
// =======================
function afficherSite() {
  document.getElementById("login").style.display = "none";
  document.getElementById("site").style.display = "block";
}

// =======================
// ANTI-FLASH
// =======================
document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.style.visibility = "visible";
});
