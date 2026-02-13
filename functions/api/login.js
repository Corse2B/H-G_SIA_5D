export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    // 🔹 Récupération du mot de passe envoyé
    const formData = await request.formData();
    const password = formData.get("password");

    if (!password) {
      return new Response(
        JSON.stringify({ success: false }),
        { status: 400 }
      );
    }

    // 🔹 Ton SALT (DOIT être EXACTEMENT le même que celui utilisé pour générer le hash en base)
    const SALT = "chronographia5dsia3245684902";

    // 🔹 Création du hash SHA-256
    const encoder = new TextEncoder();
    const data = encoder.encode(password + " " + SALT);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hash = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

    // 🔹 Vérification en base D1
    const result = await env.DB.prepare(
      "SELECT * FROM users WHERE username = ? AND password_hash = ?"
    )
    .bind("admin", hash)
    .first();

    if (result) {
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ success: false }),
        { status: 200 }
      );
    }

  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500 }
    );
  }
}

