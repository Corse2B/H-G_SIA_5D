document.addEventListener("DOMContentLoaded", () => {

  // 🔓 Rend la page visible (car html est en visibility:hidden)
  document.documentElement.style.visibility = "visible";

  const login = document.getElementById("login");
  const site = document.getElementById("site");

  // 🔁 Si déjà connecté (localStorage)
  if (localStorage.getItem("ok") === "true") {
    if (login) login.style.display = "none";
    if (site) site.style.display = "block";
  } else {
    if (login) login.style.display = "block";
    if (site) site.style.display = "none";
  }
});


// 🔐 Fonction appelée par le bouton
async function verifier() {
  const password = document.getElementById("mdp").value;
  const erreur = document.getElementById("erreur");

  erreur.textContent = "";

  try {
    const fd = new FormData();
    fd.append("password", password);

    const res = await fetch("/api/login", {
      method: "POST",
      body: fd
    });

    if (!res.ok) {
      throw new Error("Erreur HTTP");
    }

    const data = await res.json();

    if (data.success) {

      // Cache login
      document.getElementById("login").style.display = "none";

      // Affiche le site
      document.getElementById("site").style.display = "block";

      // Sauvegarde connexion
      localStorage.setItem("ok", "true");

    } else {
      erreur.textContent = "Mot de passe incorrect";
    }

  } catch (err) {
    erreur.textContent = "Erreur serveur";
    console.error("Erreur :", err);
  }
}
