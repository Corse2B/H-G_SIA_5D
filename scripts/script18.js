const input = document.getElementById("question");
const button = document.getElementById("send");
const messages = document.getElementById("messages");

let history = [
{
role: "system",
content: "Tu es Chronograph-IA, professeur d'histoire clair et pédagogique."
}
];

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

async function askAI(span) {

  const res = await fetch("https://chronographia-ai.tsilvain.workers.dev", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ messages: history })
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

      if (!line.startsWith("data:")) continue;

      const data = line.replace("data:", "").trim();

      if (data === "[DONE]") {
        return fullText;
      }

      try {

        const parsed = JSON.parse(data);

        if (parsed.response) {

          fullText += parsed.response;

          span.innerHTML = marked.parse(fullText);

          scrollBottom();
        }

      } catch {}

    }

  }

  return fullText;
}

async function sendMessage() {

  const question = input.value.trim();
  if (!question) return;

  input.value = "";
  input.focus();

  button.disabled = true;

  const user = addMessage("Vous");
  user.textContent = question;

  history.push({
    role: "user",
    content: question
  });

  const ai = addMessage("Chronograph-IA");
  ai.innerHTML = "Réflexion...";

  const text = await askAI(ai);

  history.push({
    role: "assistant",
    content: text
  });

  button.disabled = false;

}

button.onclick = sendMessage;

input.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});
