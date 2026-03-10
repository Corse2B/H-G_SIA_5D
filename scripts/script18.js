const sendBtn = document.getElementById("send");
const textarea = document.getElementById("question");
const messages = document.getElementById("messages");

sendBtn.onclick = async () => {

  const question = textarea.value.trim();
  if (!question) return;

  // message utilisateur
  const user = document.createElement("div");
  user.textContent = "Vous : " + question;
  messages.appendChild(user);

  // message IA
  const ai = document.createElement("div");
  ai.textContent = "Chronograph-IA : ";
  messages.appendChild(ai);

  textarea.value = "";

  try {

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

    let buffer = "";

    while (true) {

      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n");
      buffer = lines.pop();

      for (const line of lines) {

        if (line.startsWith("data:")) {

          const json = line.replace("data:", "").trim();

          if (json === "[DONE]") return;

          try {

            const parsed = JSON.parse(json);

            const token =
              parsed.response ||
              parsed.delta ||
              parsed.choices?.[0]?.delta?.content;

            if (token) {
              ai.textContent += token;
              messages.scrollTop = messages.scrollHeight;
            }

          } catch {}
        }
      }
    }

  } catch (err) {

    ai.textContent = "Erreur : " + err.message;

  }

};
