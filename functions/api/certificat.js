export const onRequestPost = async ({ request, env }) => {
  const { nom, mission } = await request.json();

  const result = await env.DB.prepare(
    "INSERT INTO certificats (nom, mission, date) VALUES (?, ?, ?)"
  )
    .bind(nom, mission, new Date().toISOString())
    .run();

  return new Response(JSON.stringify({
    id: result.meta.last_row_id
  }), {
    headers: { "Content-Type": "application/json" }
  });
};
