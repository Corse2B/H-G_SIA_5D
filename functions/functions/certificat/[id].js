export const onRequestGet = async ({ params, env }) => {
  const id = params.id;

  const result = await env.DB_CERTIFICATS
    .prepare("SELECT nom FROM certificats WHERE id = ?")
    .bind(id)
    .first();

  if (!result) {
    return new Response("Certificat introuvable", { status: 404 });
  }

  return new Response(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Certificat</title>
</head>
<body>

<h1>Certificat pour ${result.nom}</h1>

</body>
</html>
`, {
    headers: { "Content-Type": "text/html" }
  });
};
