export async function onRequestPost({ request, env }) {
  try {
    const formData = await request.formData();
    const password = formData.get("password");

    if (!password) {
      return json(false, "Mot de passe manquant", 400);
    }

    // 🔐 Hash SHA-256
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hash = Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");

    const user = await env.DB_CERTIFICATS
      .prepare("SELECT * FROM users WHERE username = ?")
      .bind("admin")
      .first();

    if (!user) {
      return json(false, "Utilisateur introuvable", 400);
    }

    const now = Date.now();

    // 🔒 Vérifie si bloqué
    if (user.lock_until && now < user.lock_until) {
      return json(false, "Compte bloqué temporairement", 403);
    }

    // ✅ Mot de passe correct
    if (user.password_hash === hash) {

      await env.DB_CERTIFICATS
        .prepare("UPDATE users SET failed_attempts = 0, lock_until = 0 WHERE id = ?")
        .bind(user.id)
        .run();

      return json(true, null, 200);
    }

    // ❌ Mauvais mot de passe
    let attempts = (user.failed_attempts || 0) + 1;

    if (attempts >= 5) {
      const lockTime = now + (15 * 60 * 1000); // 15 minutes

      await env.DB_CERTIFICATS
        .prepare("UPDATE users SET failed_attempts = ?, lock_until = ? WHERE id = ?")
        .bind(attempts, lockTime, user.id)
        .run();

      return json(false, "Trop d'essais. Bloqué 15 min.", 403);
    }

    await env.DB_CERTIFICATS
      .prepare("UPDATE users SET failed_attempts = ? WHERE id = ?")
      .bind(attempts, user.id)
      .run();

    return json(false, `Mot de passe incorrect (${attempts}/5)`, 401);

  } catch (err) {
    return json(false, err.message, 500);
  }
}


// Fonction helper
function json(success, error, status) {
  return new Response(
    JSON.stringify({ success, error }),
    {
      status,
      headers: { "Content-Type": "application/json" }
    }
  );
}

