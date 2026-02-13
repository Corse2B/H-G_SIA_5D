async function verifier() {
  const password = document.getElementById("mdp").value;

  const fd = new FormData();
  fd.append("password", password);

  const response = await fetch("/api/login", {
    method: "POST",
    body: fd
  });

  const data = await response.json();

  if (data.success) {
    localStorage.setItem("ok", "true");
    afficherSite();
  } else {
    document.getElementById("erreur").textContent = "Mot incorrect";
  }
}

