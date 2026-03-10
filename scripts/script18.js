const sendBtn = document.getElementById("send");
const textarea = document.getElementById("question");
const messages = document.getElementById("messages");

sendBtn.onclick = async () => {

  const question = textarea.value.trim();
  if (!question) return;

  const user = document.createElement("div");
  user.textContent = "Vous : " + question;
  messages.appendChild(user);

  const ai = document.createElement("div");
  ai.textContent = "Chronograph-IA : ";
  messages.appendChild(ai);

  textarea.value = "";

  const response = await fetch("https://TON-WORKER.workers.dev", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: question
    })
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {

    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);

    const lines = chunk.split("\n");

    for (const line of lines) {

      if (!line.startsWith("data:")) continue;

      const data = line.replace("data:", "").trim();

      if (data === "[DONE]") return;

      try {

        const json = JSON.parse(data);

        // Cloudflare AI streaming
        if (json.response) {
          ai.textContent += json.response;
        }

      } catch (e) {}

    }

  }

};
