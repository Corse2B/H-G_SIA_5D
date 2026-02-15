document.addEventListener("DOMContentLoaded", () => {

  // 🔓 Affiche la page
  document.body.style.display = "block";

  const main = document.getElementById("main");
  if (main) main.style.display = "block";

  // 🔁 Si déjà connecté
  if (localStorage.getItem("ok") === "true") {
    const login = document.getElementById("login");
    const secret = document.getElementById("secret");

    if (login) login.style.display = "none";
    if (secret) secret.style.display = "block";
  }
});

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
      document.getElementById("login").style.display = "none";
      document.getElementById("secret").style.display = "block";
      localStorage.setItem("ok", "true");
    } else {
      erreur.textContent = "Mot de passe incorrect";
    }

  } catch (err) {
    erreur.textContent = "Erreur serveur";
    console.error(err);
  }
}
