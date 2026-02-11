export const onRequestPost = async ({ request, env }) => {
  try {
    // Vérifier que la DB existe
    if (!env.DB_CERTIFICATS) {
      return new Response("DB non configurée", { status: 500 });
    }

    const formData = await request.formData();

    const nom = formData.get("nom");
    const mission = formData.get("mission");

    // Sécurité : vérifier les champs
    if (!nom || !mission) {
      return new Response("Champs manquants", { status: 400 });
    }

    // Insertion dans D1
    const result = await env.DB_CERTIFICATS
      .prepare(
        `INSERT INTO certificats (nom, mission)
         VALUES (?, ?)`
      )
      .bind(nom, mission)
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
    return new Response(
      "ERREUR SERVEUR : " + err.message,
      { status: 500 }
    );
  }
};
