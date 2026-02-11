export const onRequestPost = async ({ request, env }) => {
  try {
    const formData = await request.formData();
    const nom = formData.get("nom");

    if (!nom) {
      return new Response("Nom manquant", { status: 400 });
    }

    const result = await env.DB_CERTIFICATS
      .prepare("INSERT INTO certificats (nom) VALUES (?)")
      .bind(nom)
      .run();

    return new Response(
      JSON.stringify({ success: true, result }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    return new Response(
      "ERREUR SERVEUR : " + error.message,
      { status: 500 }
    );
  }
};
