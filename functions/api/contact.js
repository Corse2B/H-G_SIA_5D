export const onRequestPost = async ({ request, env }) => {
  const formData = await request.formData();

  const token = formData.get("cf-turnstile-response");
  if (!token) {
    return new Response("Turnstile manquant", { status: 400 });
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
    return new Response("Échecs Turnstile", { status: 403 });
  }

  return Response.redirect(
    "https://chronographia5dsia.pages.dev/merci",
    302
  );
};
