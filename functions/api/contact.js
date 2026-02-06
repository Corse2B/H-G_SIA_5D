export const onRequestPost = async ({ request, env }) => {
  try {
    const formData = await request.formData();

    const token = formData.get("cf-turnstile-response");
    if (!token) {
      return new Response("Turnstile manquant", { status: 400 });
    }

    if (!env.TURNSTILE_SECRET) {
      return new Response("Secret Turnstile manquant côté serveur", {
        status: 500,
      });
    }

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
      return new Response("Échec Turnstile", { status: 403 });
    }

    return Response.redirect("/merci", 302);
  } catch (err) {
    return new Response("Erreur serveur", { status: 500 });
  }
};
