const input = document.getElementById("question");
const button = document.getElementById("send");
const messages = document.getElementById("messages");

function addMessage(author) {

  const p = document.createElement("p");

  const bold = document.createElement("b");
  bold.textContent = author + " : ";

  const span = document.createElement("span");

  p.appendChild(bold);
  p.appendChild(span);

  messages.appendChild(p);

  return span;
}

async function sendMessage() {

  const question = input.value.trim();
  if (!question) return;

  button.disabled = true;

  const user = addMessage("Toi");
  user.textContent = question;

  const ai = addMessage("Chronographia-AI");

  const res = await fetch("https://chronographia-ai.tsilvain.workers.dev", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: question })
  });

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  let fullText = "";

  while (true) {

    const { done, value } = await reader.read();

    if (done) break;

    const chunk = decoder.decode(value);

    const lines = chunk.split("\n");

    for (const line of lines) {

      if (line.startsWith("data:")) {

        const json = line.replace("data:", "").trim();

        if (json === "[DONE]") return;

        try {

          const parsed = JSON.parse(json);

          if (parsed.response) {
            fullText += parsed.response;
            ai.textContent = fullText;
          }

        } catch {}

      }

    }

  }

  button.disabled = false;
  input.value = "";
}

button.onclick = sendMessage;

input.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});
