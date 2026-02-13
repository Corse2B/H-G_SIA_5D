// =======================
// CONFIGURATION
// =======================

// SALT (différent du mot de passe)
const SALT = "chronographia5dsia3245684902";


const bonHash =
  "bc7835aab1efed317a6fc2732f948d82d4ca23644bff0eb8c73d1f16fbcc8510";

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
// =======================
// ENTER = vérifier
// =======================
document.addEventListener("DOMContentLoaded", () => {
  const inputMdp = document.getElementById("mdp");

  inputMdp.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      verifier();
    }
  
  });
});
