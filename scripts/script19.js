console.log("chat chargé");

window.addEventListener("DOMContentLoaded", () => {

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

  const user = addMessage("Vous");
  user.textContent = question;

  const ai = addMessage("Chronograph-IA");
  ai.textContent = "Réflexion...";

  button.disabled = true;

  try {

    const res = await fetch("https://chronographia-ai.tsilvain.workers.dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: question })
    });

    const data = await res.json();

    ai.textContent = data.response;

  } catch (err) {

    ai.textContent = "Erreur : " + err;

  }

  button.disabled = false;

}

button.addEventListener("click", sendMessage);

input.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});

});
