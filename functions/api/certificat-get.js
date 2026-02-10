export const onRequestGet = async ({ request, env }) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return new Response("ID manquant", { status: 400 });
  }

  const result = await env.DB.prepare(
    "SELECT id, nom, mission, date FROM certificats WHERE id = ?"
  )
    .bind(id)
    .first();

  if (!result) {
    return new Response("Certificat introuvable", { status: 404 });
  }

  return new Response(JSON.stringify(result), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store"
    }
  });
};
