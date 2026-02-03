// Hash SHA-256 du mot de passe ("hello")
const bonHash =
  "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824";

// Vérifie si déjà connecté
if (localStorage.getItem("ok") === "true") {
  afficherSite();
}

async function verifier() {
  const input = document.getElementById("mdp").value;

  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(input)
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
} // ✅ ICI l’accolade manquante

function afficherSite() {
  document.getElementById("login").style.display = "none";
  document.getElementById("site").style.display = "block";
}

// Cache le flash au chargement (anti-FOUC)
document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.style.visibility = "visible";
});

