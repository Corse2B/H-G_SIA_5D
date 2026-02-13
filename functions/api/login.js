export const onRequestPost = async ({ request, env }) => {

  const SALT = "chronographia5dsia3245684902";

  try {
    const formData = await request.formData();
    const password = formData.get("password");

    if (!password) {
      return Response.json({ success: false });
    }

    // Hash côté serveur
    const data = `${password} ${SALT}`;

    const buffer = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(data)
    );

    const hashHex = [...new Uint8Array(buffer)]
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");

    // Vérification en base
    const stmt = env.DB.prepare(
      "SELECT * FROM users WHERE username = ? AND password_hash = ?"
    );

    const user = await stmt.bind("admin", hashHex).first();

    if (!user) {
      return Response.json({ success: false });
    }

    return Response.json({ success: true });

  } catch (err) {
    return Response.json({ success: false });
  }
};
