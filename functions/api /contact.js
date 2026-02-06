export async function onRequestPost(context) {
  try {
    const request = context.request;
    const formData = await request.formData();

    // 🔐 Token Turnstile
    const token = formData.get("cf_turnstile_token");
    if (!token) {
      return new Response("Turnstile manquant", { status: 400 });
    }

    // ✅ Vérification Turnstile
    const verify = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: new URLSearchParams({
          secret: context.env.TURNSTILE_SECRET,
          response: token,
        }),
      }
    );

    const result = await verify.json();
    if (!result.success) {
      return new Response("Échec Turnstile", { status: 403 });
    }

    // 📝 Données du formulaire
    const name = formData.get("name") || "Anonyme";
    const email = formData.get("email") || "Non fourni";
    const message = formData.get("message");

    console.log("Nouveau message :", { name, email, message });

    // ✅ Succès → redirection
    return Response.redirect(
      "https://chronographia5dsia.pages.dev/merci",
      302
    );
  } catch (e) {
    return new Response("Erreur serveur", { status: 500 });
  }
}

