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
<title>Chronographia5dsia Certificat ${id}</title>
<style>
body {
  text-align:center;
  font-family: serif;
  background:#f5f5f5;
}
canvas {
  margin-top:20px;
  max-width:90%;
}
button {
  margin-top:20px;
  padding:10px 20px;
  font-size:16px;
}
</style>
</head>
<body>

<h2>Voici le certificat de la quête des chateaux forts </h2>

<canvas id="canvas"></canvas>
<br>
<button onclick="telecharger()">Télécharger</button>

<script>
const nom = ${JSON.stringify(result.nom)};
const CERTIFICAT_IMAGE = "/certificat.jpg";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const image = new Image();
image.src = CERTIFICAT_IMAGE;

image.onload = () => {
  canvas.width = image.width;
  canvas.height = image.height;

  ctx.drawImage(image, 0, 0);

  ctx.font = "150px serif";
  ctx.fillStyle = "#e6ae47";
  ctx.textAlign = "center";

  ctx.fillText(
    nom,
    canvas.width / 2,
    canvas.height * 0.5
  );
};

function telecharger() {
  const lien = document.createElement("a");
  lien.download = "certificat_${id}.jpg";
  lien.href = canvas.toDataURL("image/jpeg");
  lien.click();
}
</script>

</body>
</html>
`, {
    headers: { "Content-Type": "text/html" }
  });
};
