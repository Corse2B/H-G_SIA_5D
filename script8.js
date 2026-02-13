// =======================
// AUTO-LOGIN AU CHARGEMENT
// =======================
document.addEventListener("DOMContentLoaded", () => {

  // Si déjà connecté
  if (localStorage.getItem("ok") === "true") {
    afficherSite();
  }

  // Anti-flash
  document.documentElement.style.visibility = "visible";

  // ENTER = vérifier
  const inputMdp = document.getElementById("mdp");
  inputMdp.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      verifier();
    }
  });
});


// =======================
// VÉRIFICATION
// =======================
async function verifier() {

  const password = document.getElementById("mdp").value;
  const erreur = document.getElementById("erreur");

  erreur.textContent = "";

  const fd = new FormData();
  fd.append("password", password);

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      body: fd
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem("ok", "true");
      afficherSite();
    } else {
      erreur.textContent = "Mot incorrect";
    }

  } catch (err) {
    erreur.textContent = "Erreur serveur";
  }
}


// =======================
// AFFICHAGE
// =======================
function afficherSite() {
  document.getElementById("login").style.display = "none";
  document.getElementById("site").style.display = "block";
}
