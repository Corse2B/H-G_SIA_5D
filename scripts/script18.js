const chat = document.getElementById("chat");

function addMessage(text, type) {

  const div = document.createElement("div");
  div.className = "message " + type;
  div.innerText = text;

  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;

  return div;

}

// effet écriture progressive
function typeWriter(text, element, speed = 15) {

  let i = 0;

  function typing() {

    if (i < text.length) {

      element.innerHTML += text.charAt(i);
      i++;

      chat.scrollTop = chat.scrollHeight;

      setTimeout(typing, speed);

    }

  }

  typing();

}

async function send() {

  const input = document.getElementById("message");
  const text = input.value.trim();

  if (!text) return;

  // message utilisateur
  addMessage(text, "user");

  input.value = "";

  // message IA "réflexion"
  const thinking = addMessage("🤔 Réflexion...", "ai");

  try {

    const res = await fetch("https://chronographia-ai.tsilvain.workers.dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: text })
    });

    const data = await res.json();

    // efface "réflexion"
    thinking.innerHTML = "";

    // écrit la réponse progressivement
    typeWriter(data.reply, thinking);

  } catch (err) {

    thinking.innerText = "Erreur de connexion à l'IA.";

  }

}

// envoyer avec Entrée
document.getElementById("message").addEventListener("keypress", function(e) {

  if (e.key === "Enter") {
    send();
  }

});
