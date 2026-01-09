import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://vsulevwocyonllrgoxgp.supabase.co",
  "sb_publishable_RVI2E0iuKr7Cto6QNGnFNQ_wwxaeMs6"
);

let mode = "login"; // ou "register"

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const authBox = document.getElementById("authBox");
const authTitle = document.getElementById("authTitle");
const submitAuth = document.getElementById("submitAuth");
const msg = document.getElementById("msg");

// 🔄 Met à jour l’interface
async function updateUI() {
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    loginBtn.textContent = "Déconnexion";
    registerBtn.style.display = "none";
    authBox.style.display = "none";
  } else {
    loginBtn.textContent = "Connexion";
    registerBtn.style.display = "inline";
  }
}

// 🔘 Bouton Connexion / Déconnexion
loginBtn.onclick = async () => {
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    await supabase.auth.signOut();
    updateUI();
  } else {
    mode = "login";
    authTitle.textContent = "Connexion";
    authBox.style.display = "block";
  }
};

// 🔘 Bouton Register
registerBtn.onclick = () => {
  mode = "register";
  authTitle.textContent = "Créer un compte";
  authBox.style.display = "block";
};

// 🔐 Soumission du formulaire
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  let result;

  if (mode === "login") {
    result = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    });
  } else {
    result = await supabase.auth.signUp({
      email: email.value,
      password: password.value
    });
  }

  if (result.error) {
    msg.textContent = result.error.message;
  } else {
    msg.textContent = "Connecté ✔️";
    authBox.style.display = "none";
    updateUI();
  }
};

// 🔁 Au chargement
updateUI();
