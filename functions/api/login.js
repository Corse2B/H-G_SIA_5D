export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const formData = await request.formData();
    const password = formData.get("password");

    if (!password) {
      return new Response(JSON.stringify({ success: false }), { status: 400 });
    }

    // Hash SHA-256 simple
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hash = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

    const user = await env.DB.prepare(
      "SELECT * FROM users WHERE username = ? AND password_hash = ?"
    )
    .bind("admin", hash)
    .first();

    return new Response(
      JSON.stringify({ success: !!user }),
      { status: 200 }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500 }
    );
  }
}
