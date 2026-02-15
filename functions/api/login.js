export async function onRequestPost({ request, env }) {
  try {
    const formData = await request.formData();
    const password = formData.get("password");

    if (!password) {
      return new Response(
        JSON.stringify({ success: false, error: "No password" }),
        { status: 400 }
      );
    }

    // Hash SHA-256
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hash = Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");

    const user = await env.DB
      .prepare("SELECT id FROM users WHERE username = ? AND password_hash = ?")
      .bind("admin", hash)
      .first();

    return new Response(
      JSON.stringify({ success: !!user }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500 }
    );
  }
}
