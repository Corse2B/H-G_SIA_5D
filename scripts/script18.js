const input = document.getElementById("question");
const button = document.getElementById("send");
const messages = document.getElementById("messages");

function typeWriter(element, text, speed = 15) {
  let i = 0;

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

function addMessage(author, text, animate=false) {

  const p = document.createElement("p");
  p.innerHTML = "<b>" + author + " :</b> ";

  const span = document.createElement("span");
  p.appendChild(span);

  messages.appendChild(p);

  if (animate) {
    typeWriter(span, text);
  } else {
    span.textContent = text;
  }

  messages.scrollTop = messages.scrollHeight;

  return span;
}

async function sendMessage() {

  const question = input.value.trim();
  if (!question) return;

  button.disabled = true;

  addMessage("Toi", question);

  const thinking = addMessage("Chronographia-AI", "⏳ réfléchit...");

  const res = await fetch("https://chronographia-ai.tsilvain.workers.dev", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: question })
  });

  const data = await res.json();

  thinking.textContent = "";

  typeWriter(thinking, data.response);

  input.value = "";
  button.disabled = false;
}

button.onclick = sendMessage;

input.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});
