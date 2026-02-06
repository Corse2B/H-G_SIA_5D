export const onRequestPost = async ({ request, env }) => {
  try {
    // 1. Vérif du secret
    if (!env.TURNSTILE_SECRET) {
      return new Response("SECRET ABSENT", { status: 500 });
    }

    // 2. Lecture du formulaire
    const formData = await request.formData();

    // 3. Voir TOUT ce qui arrive
    const keys = [...formData.keys()].join(", ");

    return new Response(
      "SECRET OK | CHAMPS: " + keys,
      { status: 200 }
    );
  } catch (e) {
    return new Response(
      "EXCEPTION: " + e.message,
      { status: 500 }
    );
  }
};
