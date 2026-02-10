export const onRequestPost = async ({ request, env }) => {
  const db = env.DB_CERTIFICATS; // 👈 NOUVEAU NOM

  if (!db) {
    return new Response("DB_CERT non bindée", { status: 500 });
  }

  const { nom, mission } = await request.json();

  const result = await db.prepare(
    "INSERT INTO certificats (nom, mission, date) VALUES (?, ?, ?)"
  ).bind(
    nom,
    mission,
    new Date().toISOString()
  ).run();

  return new Response(JSON.stringify({
    id: result.meta.last_row_id
  }), {
    headers: { "Content-Type": "application/json" }
  });
};
