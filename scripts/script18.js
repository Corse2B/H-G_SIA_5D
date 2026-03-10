async function sendMessage() {

  const question = input.value.trim();
  if (!question) return;

  input.value = "";
  input.focus();

  button.disabled = true;

  const user = addMessage("Vous");
  user.textContent = question;

  const ai = addMessage("Chronograph-IA");
  ai.innerHTML = "Reflexion...";

  const res = await fetch("https://chronographia-ai.tsilvain.workers.dev", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: question })
  });

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  let text = "";

  ai.innerHTML = "";

  while (true) {

    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);

    const lines = chunk.split("\n");

    for (const line of lines) {

      if (!line.startsWith("data:")) continue;

      const data = line.replace("data:", "").trim();

      if (data === "[DONE]") {
        button.disabled = false;
        return;
      }

      try {

        const json = JSON.parse(data);

        if (json.response) {

          text += json.response;

          ai.innerHTML = marked.parse(text);

          scrollBottom();

        }

      } catch {}

    }

  }

  button.disabled = false;

}
