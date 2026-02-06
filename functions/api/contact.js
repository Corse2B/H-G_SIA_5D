export const onRequestPost = async ({ request, env }) => {
  try {
    const formData = await request.formData();

    // --- Turnstile ---
    const token = formData.get("cf-turnstile-response");
    if (!token) {
      return new Response("Token Turnstile manquant", { status: 400 });
    }

    const verify = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
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

    // --- Données ---
    const name = formData.get("name") || "Anonyme";
    const email = formData.get("email") || "non fourni";
    const message = formData.get("message");
    const ip =
      request.headers.get("CF-Connecting-IP") ||
      request.headers.get("x-forwarded-for") ||
      "";

    // --- Stockage D1 ---
    await env.DB.prepare(
      "INSERT INTO messages (name, email, message, ip) VALUES (?, ?, ?, ?)"
    ).bind(name, email, message, ip).run();

    // --- ENVOI EMAIL ---
    await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: "tsilvain@lfitokyo.org" }]
          }
        ],
        from: {
          email: "no-reply@chronographia5dsia.pages.dev",
          name: "Chronographia 5DSIA"
        },
        subject: "Formulaire Chronographia",
        content: [
          {
            type: "text/plain",
            value:
`Nouveau message reçu :

Nom : ${name}
Email : ${email}
IP : ${ip}

Message :
${message}
`
          }
        ]
      }),
    });

    return Response.redirect(
      "https://chronographia5dsia.pages.dev/merci",
      302
    );

  } catch (e) {
    return new Response("Erreur serveur : " + e.message, { status: 500 });
  }
};
