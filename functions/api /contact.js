exportexport const onRequest = async ({ request, env }) => {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const formData = await request.formData();

  const token = formData.get("cf_turnstile_token");
  if (!token) {
    return new Response("Turnstile manquant", { status: 400 });
  }

  const verify = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
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

  return Response.redirect(
    "https://chronographia5dsia.pages.dev/merci",
    302
  );
};
