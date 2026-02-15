async function verifier() {
  const password = document.getElementById("mdp").value;
  const erreur = document.getElementById("erreur");

  erreur.textContent = "";

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
  } else {
    erreur.textContent = "Mot de passe incorrect";
  }
}

