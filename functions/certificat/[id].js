export const onRequestGet = async ({ params, env, request }) => {
  const id = params.id;

  const result = await env.DB_CERTIFICATS
    .prepare("SELECT nom, date FROM certificats WHERE id = ?")
    .bind(id)
    .first();

  if (!result) {
    return new Response("Certificat introuvable", { status: 404 });
  }

  const url = new URL(request.url);
  const fullURL = url.origin + "/certificat/" + id;

  return new Response(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Chronographia 5D SIA Certificat ${id}</title>
<script src="https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js"></script>

<link rel="preload" href="/style.css" as="style">
<link rel="stylesheet" href="/style.css">

</head>
<body>
<header>
<h1>Voici le certificat de la Quete des chataux-chateaux forts</h1>
<h2>Ce blog a été créé par les élèves, pour les élèves </h2>
<div class="top-controls">
<a href=index.html class=LienPage>Retour au Blog</a>

</div>
</header>
<canvas id="canvas"></canvas>
<br>
<button id="BTMessage" onclick="telecharger()">Télécharger</button>

<script>
const nom = ${JSON.stringify(result.nom)};
const date = ${JSON.stringify(result.date)};
const id = ${JSON.stringify(id)};
const verificationURL = ${JSON.stringify(fullURL)};

const CERTIFICAT_IMAGE = "/certificat.jpg";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const image = new Image();
image.src = CERTIFICAT_IMAGE;

image.onload = async () => {
  canvas.width = image.width;
  canvas.height = image.height;

  ctx.drawImage(image, 0, 0);

  // NOM
  ctx.font = "150px serif";
  ctx.fillStyle = "#e6ae47";
  ctx.textAlign = "center";
  ctx.fillText(nom, canvas.width / 2, canvas.height * 0.5);

  // DATE
  ctx.font = "70px serif";
  ctx.fillStyle = "#e6ae47";
  ctx.fillText(
    "Créé le" + new Date(date).toLocaleDateString(),
    canvas.width / 2,
    canvas.height * 0.65
  );

  // ID discret en bas
  ctx.font = "30px monospace";
  ctx.fillStyle = "#e6ae47";
  ctx.fillText(
    "Vous êtes" + id,
    canvas.width / 2,
    canvas.height * 0.95
  );

  // QR CODE
  const qrDataURL = await QRCode.toDataURL(verificationURL);
  const qrImage = new Image();
  qrImage.src = qrDataURL;

  qrImage.onload = () => {
    ctx.drawImage(
      qrImage,
      canvas.width - 250,
      canvas.height - 250,
      200,
      200
    );
  };
};

function telecharger() {
  const lien = document.createElement("a");
  lien.download = "certificat_" + id + ".jpg";
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
