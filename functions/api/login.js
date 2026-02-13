export async function onRequestPost(context) {
  const { request, env } = context;

  const formData = await request.formData();
  const password = formData.get("password");

  const SALT = "chronohraphia5dsia";

  const encoder = new TextEncoder();
  const data = encoder.encode(password + " " + SALT);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hash = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

  return new Response(JSON.stringify({
    password,
    generated_hash: hash
  }), { status: 200 });
}


