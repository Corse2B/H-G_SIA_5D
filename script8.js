import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://vsulevwocyonllrgoxgp.supabase.co";
const SUPABASE_ANON_KEY =
  "sb_publishable_RVI2E0iuKr7Cto6QNGnFNQ_wwxaeMs6";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 🔐 CONNEXION
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    });

    msg.textContent = error ? error.message : "Connecté ✔️";
    if (!error) location.href = "private.html";
  });
}

// 🆕 INSCRIPTION
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value
    });

    msg.textContent = error ? error.message : "Compte créé ✔️";
  });
}

// 🛑 PROTECTION DES PAGES PRIVÉES
const checkAuth = async () => {
  const { data } = await supabase.auth.getUser();

  if (!data.user && location.pathname.includes("private")) {
    location.href = "login.html";
  }
};
checkAuth();

// 🚪 DÉCONNEXION
const logoutBtn = document.getElementById("logout");
if (logoutBtn) {
  logoutBtn.onclick = async () => {
    await supabase.auth.signOut();
    location.href = "login.html";
  };
}
