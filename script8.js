document.addEventListener("DOMContentLoaded", () => {

  // 🔓 Rend la page visible (car html est en visibility:hidden)
  document.documentElement.style.visibility = "visible";

  const login = document.getElementById("login");
  const site = document.getElementById("site");

  // 🔁 Si déjà connecté
  if (localStorage.getItem("ok") === "true") {
    if (login) login.style.display = "none";
    if (site) site.style.display = "block";
  } else {
    if (login) login.style.display = "block";
    if (site) site.style.display = "none";
  }

});


// 🔐 Fonction login
async function verifier() {

  const password = document.getElementById("mdp").value;

  if (!password) {
    alert("Entrez une phrase");
    return;
  }

  try {

    const fd = new FormData();
    fd.append("password", password);

    const res = await fetch("/api/login", {
      method: "POST",
      body: fd
    });

    const data = await res.json();

    if (data.success) {

      alert("Bravo ! \nVous avez trouvé la phrase");

      document.getElementById("login").style.display = "none";
      document.getElementById("site").style.display = "block";

      localStorage.setItem("ok", "true");

    } else {

      // 🔥 Affiche le message envoyé par le serveur
      alert(data.error || "Vous vous êtes trompé de phrase");

    }

  } catch (err) {

    alert("Erreur serveur");
    console.error("Erreur :", err);

  }
}

