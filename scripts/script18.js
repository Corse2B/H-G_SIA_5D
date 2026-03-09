const input = document.getElementById("question");
const button = document.getElementById("send");
const messages = document.getElementById("messages");

function parseMarkdown(text) {

  return text
    .replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br>");
}

function addMessage(author, text) {

  const p = document.createElement("p");

  const bold = document.createElement("b");
  bold.textContent = author + " : ";

  const span = document.createElement("span");

  // transformation markdown
  span.innerHTML = parseMarkdown(text);

  p.appendChild(bold);
  p.appendChild(span);

  messages.appendChild(p);
}

async function sendMessage() {

  const question = input.value.trim();
  if (!question) return;

  button.disabled = true;

  addMessage("Toi", question);

  const res = await fetch("https://chronographia-ai.tsilvain.workers.dev", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: question })
  });

  const data = await res.json();

  addMessage("Chronographia-AI", data.response);

  input.value = "";
  button.disabled = false;
}

button.onclick = sendMessage;

input.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});
