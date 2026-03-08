const input = document.getElementById("question");
const button = document.getElementById("send");

async function sendMessage() {

  const question = input.value.trim();
  if (!question) return;

  button.disabled = true;

  try {

    const res = await fetch("https://chronographia-ai.tsilvain.workers.dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: question
      })
    });

    console.log("status:", res.status);

    const data = await res.json();

    console.log("response worker:", data);

    if (data.response) {
      console.log("IA:", data.response);
    } else {
      console.log("Pas de champ response");
    }

  } catch (err) {
    console.error("Erreur fetch:", err);
  }

  button.disabled = false;
}

button.onclick = sendMessage;

input.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});
