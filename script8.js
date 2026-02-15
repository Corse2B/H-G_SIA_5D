// 🔓 Affiche la page si elle est cachée (body ou container principal)
window.addEventListener("DOMContentLoaded", () => {
  document.body.style.display = "block";

  const main = document.getElementById("main");
  if (main) {
    main.style.display = "block";
  }
});


// 🔐 Fonction de vérification du mot de passe
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

    const data = await res.json();

    if (data.success) {
      // Cache la zone login
      document.getElementById("login").style.display = "none";

      // Affiche la zone secrète
      const secret = document.getElementById("secret");
      if (secret) {
        secret.style.display = "block";
      }

      // Optionnel : garde en mémoire la connexion
      localStorage.setItem("ok", "true");

    } else {
      erreur.textContent = "Mot de passe incorrect";
    }

  } catch (err) {
    erreur.textContent = "Erreur serveur";
    console.error(err);
  }
}


// 🔁 Si déjà connecté (localStorage), on affiche direct le secret
window.addEventListener("load", () => {
  if (localStorage.getItem("ok") === "true") {
    const login = document.getElementById("login");
    const secret = document.getElementById("secret");

    if (login) login.style.display = "none";
    if (secret) secret.style.display = "block";
  }
});
