const send = document.getElementById("send");
const question = document.getElementById("question");
const messages = document.getElementById("messages");

send.onclick = async () => {

  const text = question.value;

  const user = document.createElement("div");
  user.textContent = "👤 " + text;
  messages.appendChild(user);

  const ai = document.createElement("div");
  ai.textContent = "🤖 ";
  messages.appendChild(ai);

  const response = await fetch("https://chronograph-ia.tsilvain.workers.dev", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: text
    })
  });

  const data = await response.json();

  const reply = data.reply;

  // effet streaming fake
  let i = 0;

  const interval = setInterval(() => {

    ai.textContent += reply[i];

    i++;

    if (i >= reply.length) {
      clearInterval(interval);
    }

  }, 20);
};
