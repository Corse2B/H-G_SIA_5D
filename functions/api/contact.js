export const onRequestPost = async ({ request, env }) => {
  try {
    const formData = await request.formData();

    const token = formData.get("cf-turnstile-response");
    if (!token) {
      return new Response("Token Turnstile manquant", { status: 400 });
    }

    // Vérif Turnstile
    const verify = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: env.TURNSTILE_SECRET,
          response: token,
        }),
      }
    );

    const result = await verify.json();
    if (!result.success) {
      return new Response("Turnstile refusé", { status: 403 });
    }

    // Données formulaire
    const name = formData.get("name") || "";
    const email = formData.get("email") || "";
    const message = formData.get("message");
    const ip =
      request.headers.get("CF-Connecting-IP") ||
      request.headers.get("x-forwarded-for") ||
      "";

    // Insertion en base D1
    await env.DB.prepare(
      "INSERT INTO messages (name, email, message, ip) VALUES (?, ?, ?, ?)"
    ).bind(name, email, message, ip).run();

    return Response.redirect(
      "https://chronographia5dsia.pages.dev/merci",
      302
    );

  } catch (e) {
    return new Response("Erreur serveur : " + e.message, { status: 500 });
  }
};
