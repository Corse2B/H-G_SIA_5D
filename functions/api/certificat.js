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

    const id = result.meta.last_row_id;

    return new Response(
      JSON.stringify({
        success: true,
        id: id,
        url: `/certificat/${id}`
      }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    return new Response("Erreur serveur", { status: 500 });
  }
};
