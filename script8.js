// SALT (fixe)
const SALT = "chronographia5dsia3245684902";

// Hash SHA-256 de (mot + SALT)
const bonHash =
  "f20832f7adea64c6f6c6f9dd4c144810312436421c528cc1b85daebceb373834";

// Déjà connecté ?
if (localStorage.getItem("ok") === "true") {
  afficherSite();
}

async function verifier() {
  const input = document.getElementById("mdp").value;

  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(input + SALT)
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

function afficherSite() {
  document.getElementById("login").style.display = "none";
  document.getElementById("site").style.display = "block";
}

// Anti-flash
document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.style.visibility = "visible";
});

