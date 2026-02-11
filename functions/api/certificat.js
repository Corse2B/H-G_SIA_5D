export const onRequestPost = async ({ request, env }) => {
  try {
    if (!env.DB_CERTIFICATS) {
      return new Response("DB non configurée", { status: 500 });
    }

    const formData = await request.formData();
    const nom = formData.get("nom");

    if (!nom) {
      return new Response("Nom manquant", { status: 400 });
    }

    // Date automatique
    const date = new Date().toISOString();

    const result = await env.DB_CERTIFICATS
      .prepare(`
        INSERT INTO certificats (nom, date)
        VALUES (?, ?)
      `)
      .bind(nom, date)
      .run();

    return new Response(
      JSON.stringify({
        success: true,
        id: result.meta.last_row_id
      }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    return new Response(
      "ERREUR SERVEUR : " + err.message,
      { status: 500 }
    );
  }
};
