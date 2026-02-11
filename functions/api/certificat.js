export const onRequestPost = async ({ request, env }) => {
  try {
    const formData = await request.formData();
    const nom = formData.get("nom");

    if (!nom) {
      return new Response("Nom manquant", { status: 400 });
    }

    const date = new Date().toISOString();

    const result = await env.DB_CERTIFICATS
      .prepare("INSERT INTO certificats (nom, date) VALUES (?, ?)")
      .bind(nom, date)
      .run();

    return new Response(
      JSON.stringify({
        success: true,
        id: result.meta.last_row_id
      }),
      {
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (err) {
    return new Response("ERREUR SERVEUR : " + err.message, {
      status: 500
    });
  }
};
