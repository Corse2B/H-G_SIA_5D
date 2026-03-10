const input = document.getElementById("question");
const button = document.getElementById("send");
const messages = document.getElementById("messages");

function scrollBottom() {
  messages.scrollTop = messages.scrollHeight;
}

function addMessage(author) {

  const p = document.createElement("p");

  const bold = document.createElement("b");
  bold.textContent = author + " : ";

  const span = document.createElement("span");

  p.appendChild(bold);
  p.appendChild(span);

  messages.appendChild(p);

  scrollBottom();

  return span;
}

async function sendMessage() {

  const question = input.value.trim();
  if (!question) return;

  input.value = "";
  input.focus();

  button.disabled = true;

  const user = addMessage("Vous");
  user.textContent = question;

  const ai = addMessage("Chronograph-IA");
  ai.innerHTML = "Réflexion...";

  const res = await fetch(
    "https://chronographia-ai.tsilvain.workers.dev",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: question }),
      keepalive: true
    }
  );

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  let text = "";

  ai.innerHTML = "";

  while (true) {

    const { done, value } = await reader.read();

    if (done) break;

    const chunk = decoder.decode(value);

    const lines = chunk.split("\n");

    for (const line of lines) {

      if (!line.startsWith("data:")) continue;

      const json = line.replace("data:", "").trim();

      if (json === "[DONE]") break;

      try {

        const parsed = JSON.parse(json);

        if (parsed.response) {

          text += parsed.response;

          ai.innerHTML = marked.parse(text);

          scrollBottom();

        }

      } catch {}

    }

  }

  button.disabled = false;
}

button.onclick = sendMessage;

input.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});
