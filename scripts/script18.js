const input = document.getElementById("question");
const button = document.getElementById("send");
const messagesContainer = document.getElementById("messages");

// Scroll automatique vers le bas
function scrollBottom() {
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Crée un nouveau message dans le chat
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

// Envoie le message à l'IA et récupère la réponse en streaming
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
    const res = await fetch("https://chronograph-ia.tsilvain.workers.dev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: question }),
      keepalive: true
    });

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let text = "";
    aiSpan.textContent = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop(); // garde la dernière ligne incomplète

      for (const line of lines) {
        if (!line.startsWith("data:")) continue;
        const json = line.replace("data:", "").trim();
        if (json === "[DONE]") break;

        try {
          const parsed = JSON.parse(json);
          if (parsed.response) {
            text += parsed.response;
            aiSpan.textContent = text; // mise à jour progressive
            scrollBottom();
          }
        } catch (e) {
          console.error("Erreur parsing JSON SSE :", e);
        }
      }
    }

  } catch (err) {
    aiSpan.textContent = "Erreur : " + err.message;
  }

  button.disabled = false;
}

// Gestion des événements
button.onclick = sendMessage;
input.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});
