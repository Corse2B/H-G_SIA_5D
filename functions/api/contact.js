export const onRequestPost = async ({ request, env }) => {
  try {
    const formData = await request.formData();
    const token = formData.get("cf-turnstile-response");

    if (!token) {
      return new Response("Token Turnstile manquant", { status: 400 });
    }

    const ip =
      request.headers.get("CF-Connecting-IP") ||
      request.headers.get("x-forwarded-for") ||
      "";

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
          remoteip: ip,
        }),
      }
    );

    const result = await verify.json();

    if (!result.success) {
      return new Response(
        "Turnstile refusé: " + JSON.stringify(result),
        { status: 403 }
      );
    }

return Response.redirect(
  "https://chronographia5dsia.pages.dev/merci",
  302
);

  } catch (e) {
    return new Response(
      "Exception: " + e.message,
      { status: 500 }
    );
  }
};
