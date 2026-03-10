const button = document.getElementById("send");
const textarea = document.getElementById("question");
const messages = document.getElementById("messages");

button.onclick = async () => {

  const question = textarea.value;

  const userMsg = document.createElement("div");
  userMsg.textContent = "👤 " + question;
  messages.appendChild(userMsg);

  const aiMsg = document.createElement("div");
  aiMsg.textContent = "🤖 ";
  messages.appendChild(aiMsg);

  const response = await fetch("https://chronograph-ia.tsilvain.workers.dev", {
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

    const { value, done } = await reader.read();

    if (done) break;

    const chunk = decoder.decode(value);

    const lines = chunk.split("\n");

    for (const line of lines) {

      if (line.startsWith("data:")) {

        const data = line.replace("data:", "").trim();

        if (data === "[DONE]") return;

        try {

          const json = JSON.parse(data);

          const token = json.choices[0].delta?.content;

          if (token) {
            aiMsg.textContent += token;
          }

        } catch {}
      }
    }
  }
};
