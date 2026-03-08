const input = document.getElementById("question");
const button = document.getElementById("send");
const messages = document.getElementById("messages");

button.onclick = async () => {

  const question = input.value;

  if (!question) return;

  // afficher la question
  messages.innerHTML += "<p><strong>Toi :</strong> " + question + "</p>";

  // requête vers ton worker cloudflare
  const res = await fetch("https://chronographia-ai.tsilvain.workers.dev", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: question
    })
  });

  const data = await res.json();

  // afficher la réponse IA
  messages.innerHTML += "<p><strong>IA :</strong> " + data.response + "</p>";

  input.value = "";
};


