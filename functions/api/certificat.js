export const onRequestPost = async ({ request, env }) => {
  const { nom, mission } = await request.json();

  if (!nom || nom.length > 50) {
    return new Response("Nom invalide", { status: 400 });
  }

  const result = await env.DB.prepare(
    "INSERT INTO certificats (nom, mission, date) VALUES (?, ?, ?)"
  )
  .bind(
    nom.trim(),
    mission,
    new Date().toISOString()
  )
  .run();

  return new Response(
    JSON.stringify({
      success: true,
      id: result.meta.last_row_id
    }),
    { headers: { "Content-Type": "application/json" } }
  );
};
