const input = document.getElementById("question");
const button = document.getElementById("send");
const messages = document.getElementById("messages");

async function sendMessage() {

  const question = input.value.trim();
  if (!question) return;

  button.disabled = true;

  // afficher la question
  messages.innerHTML += "<p><b>Toi :</b> " + question + "</p>";

  const res = await fetch("https://chronographia-ai.tsilvain.workers.dev", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: question })
  });

  const data = await res.json();

  // afficher la réponse IA
  messages.innerHTML += "<p><b>Chronographia-AI :</b> " + data.response + "</p>";

  input.value = "";
  button.disabled = false;
}

button.onclick = sendMessage;

input.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});
