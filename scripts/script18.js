const input = document.getElementById("question");
const button = document.getElementById("send");
const messagesContainer = document.getElementById("messages");

function scrollBottom() {
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addMessage(author) {
  const p = document.createElement("p");
  const bold = document.createElement("b");
  bold.textContent = author + " : ";
  const span = document.createElement("span");
  p.appendChild(bold);
  p.appendChild(span);
  messagesContainer.appendChild(p);
  scrollBottom();
  return span;
}

async function sendMessage() {
  const question = input.value.trim();
  if (!question) return;

  input.value = "";
  input.focus();
  button.disabled = true;

  const userSpan = addMessage("Vous");
  userSpan.textContent = question;

  const aiSpan = addMessage("Chronograph-IA");
  aiSpan.textContent = "Réflexion...";

  try {
    const res = await fetch("https://apifreellm.com/api/v1/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "
      },
      body: JSON.stringify({
        prompt: question,
        stream: false // ou true si l’API supporte streaming côté navigateur
      })
    });

    const data = await res.json();

    // Si streaming = false, on récupère data.response directement
    aiSpan.textContent = data.response || "Aucune réponse";

  } catch (err) {
    aiSpan.textContent = "Erreur : " + err.message;
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
